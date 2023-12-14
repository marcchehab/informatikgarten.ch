
document
    .querySelectorAll("blockquote.callout-foldable .callout-title")
    .forEach((elem) => {
        elem.addEventListener("click", function (e) {
            elem.parentElement.classList.toggle("callout-folded");
            e.stopPropagation();
        });
    });
