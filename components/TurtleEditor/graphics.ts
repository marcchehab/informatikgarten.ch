import GUI from "./gui";

declare global {
  interface Window {
    MathJax?: any;
  }
}

export default class Graphics {
  private _gui: GUI;
  private _elem = document.getElementById("graphics");

  public constructor(gui: GUI) {
    this._gui = gui;
  }

  /**
   * Getter for DOM element.
   */
  public get domElement() {
    return this._elem;
  }

  /**
   * Initialize the graphics output.
   */
  public async init() {
    this._gui.kernelLoader.kernelAvailable().then(() => {
      this._gui.kernel?.addEventListener("eval.display", (data) =>
        this.display(data)
      );
    });
  }

  /**
   * Cleaning graphics.
   */
  public clean() {
    // textContent seems faster than innerHTML...
    if (this._elem != null) this._elem.textContent = "";
  }

  /**
   * Same as that.innerHTML = html but with script execution support.
   */
  public setInnerHTML(html: string, runScripts: boolean = false) {
    if (this._elem == null) return;
    this._elem.innerHTML = html;
    if (!runScripts) return;
    for (const oldScript of this._elem.querySelectorAll("script")) {
      const newScript = document.createElement("script");
      for (const attr of oldScript.attributes)
        newScript.setAttribute(attr.name, attr.value);
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    }
  }

  /**
   * Display an element from Basthon data.
   */
  public display(data: any) {
    this.clean();
    switch (data.display_type) {
      case "p5":
        var root = data.content;
        root.style.width = "100%";
        root.style.height = "100%";
        root.style.display = "flex";
        root.style.justifyContent = "center";
        root.style.alignItems = "center";

        const autoFit = function (node: HTMLElement) {
          node.style.width = "auto";
          node.style.height = "auto";
          node.style.maxWidth = "100%";
          node.style.maxHeight = "100%";
        };

        // some canvas nodes can be added later so we observe...
        const observer = new MutationObserver(function (
          mutationsList: MutationRecord[],
          observer: MutationObserver
        ) {
          mutationsList.forEach((mutation) =>
            mutation.addedNodes.forEach((node) => {
              const elem = node as HTMLElement;
              if (
                elem.tagName != null &&
                ["canvas", "video"].includes(elem.tagName.toLowerCase())
              )
                autoFit(elem);
            })
          );
        });
        observer.observe(root, { childList: true });

        root.querySelectorAll("canvas,video").forEach(autoFit);
        this._elem?.appendChild(root);
        break;
      case "matplotlib":
        var root = data.content;
        const canvas = root.querySelector("canvas");
        if (canvas) root = canvas;
        root.style.width = "";
        root.style.height = "";
        root.style.maxWidth = "100%";
        root.style.maxHeight = "100%";
        this._elem?.appendChild(root);
        break;
      case "ocaml-canvas":
        var root = data.content;
        root.style.width = "";
        root.style.height = "";
        root.style.maxWidth = "100%";
        root.style.maxHeight = "100%";
        this._elem?.appendChild(root);
        break;
      case "turtle":
        // Turtle result
        window.setTimeout(() => {
          const root = data.content;
          root.setAttribute("width", "100%");
          root.setAttribute("height", "100%");
          this.setInnerHTML(root.outerHTML);
        }, 1);
        break;
      case "sympy":
        this.setInnerHTML(data.content);
        if (typeof window.MathJax === "undefined") {
          // dynamically loading MathJax
          console.log("Loading MathJax (Sympy expression needs it).");
          (function () {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
              "https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-mml-chtml.js";
            document.getElementsByTagName("head")[0].appendChild(script);
          })();
        } else {
          // otherwise, render it
          window.MathJax.typeset();
        }
        break;
      case "multiple":
        /* typically dispached by display() */
        for (let mime of [
          "image/svg+xml",
          "image/png",
          "text/html",
          "text/plain",
        ]) {
          if (mime in data.content) {
            let content = data.content[mime];
            if (mime === "image/png") {
              content =
                '<img src="data:image/png;base64,' +
                content +
                '" style="max-width: 100%; max-height: 100%;">';
            }
            this.setInnerHTML(content, true);
            break;
          }
        }
        break;
      case "tutor":
        // hacky but iframe.document.body.style require to wait for
        // iframe loading
        this.setInnerHTML(
          data.content.replace("overflow-y%3A%20hidden%3B", "")
        );
        const iframe = this._elem?.getElementsByTagName("iframe")[0];
        if (iframe == null) return;
        // trick to avoid taking height update into account
        iframe.style.maxHeight = iframe.style.minHeight = "100%";

        // force rendering when visible,
        // otherwise, strange things happends
        // since PythonTutor check for visibility at some point
        new IntersectionObserver((entries, observer) => {
          const entry = entries[0];
          if (entry && !entry.isIntersecting) return;
          iframe.contentWindow?.postMessage({ type: "redraw" }, "*");
          observer.disconnect();
        }).observe(iframe);

        break;
      default:
        console.error(
          `Not supported node type '${data.display_type}' in eval.display result processing.`
        );
    }

    // blink button in case graphics is not visible
    if (this._elem?.style.display === "none") this.notifyContent();
  }

  /**
   * Making a surounding blinking eye catcher around the button
   * tha toogle graph display.
   */
  public notifyContent() {
    const button = document.getElementById("btn_graph_view");
    const eyeClass = "btn-eye-catcher";
    const blinkDuration = 2000;
    button?.classList.add(eyeClass);
    setTimeout(function () {
      button?.classList.remove(eyeClass);
    }, blinkDuration);
  }

  /**
   * Hide graphics view.
   */
  public hide() {
    if (this._elem != null) this._elem.style.display = "none";
  }

  /**
   * Show graphics view.
   */
  public show() {
    if (this._elem != null) this._elem.style.display = "flex";
  }
}
