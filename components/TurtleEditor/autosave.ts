let autosaveCounter = 0;
const HISTORY_THRESHOLD = 10;
const HISTORY_SIZE = 500;

export const autosaveHandler = (config) => {
    // If browsing history, don't autosave
    if (config.historyIndexRef.current === -1) { return; };

    autosaveCounter++;
    const currentCode = config.codeeditorRef.current.getValue();
    const history = config.historyRef.current;

    console.log("autosaved");
    history[0] = currentCode;

    if (autosaveCounter % HISTORY_THRESHOLD === 0) {
        console.log("stored in history");
        history.unshift(currentCode);
        history.length > HISTORY_SIZE ?? history.pop();
    }
};

export const saveBeforeUnload = (config) => {

    const currentCode = config.codeeditorRef.current.getValue();
    const history = config.historyRef.current;
    history.unshift(currentCode);
    localStorage.setItem(config.idRef.current, JSON.stringify(history));
    console.log("history saved to local storage");
};

export const restoreHandler = (id: string) => {
    const savedString = localStorage.getItem(id);
    if (savedString) {
        const savedHistory = JSON.parse(savedString) as string[];
        console.log("history restored from local storage");
        return savedHistory;
    }
    return [] as string[];
};

export const browseHistory = (config, delta: number) => {

    const history = config.historyRef.current;
    const newIndex = Math.max(config.historyIndexRef.current, 0) + delta;
    console.log("browsing history", history, newIndex);

    if (newIndex >= 0 && newIndex < history.length-1 ) {
        config.historyIndexRef.current = newIndex;
        config.codeeditorRef.current.setValue(history[newIndex]);
        // config.codeeditorRef.current.focus();
    }
}