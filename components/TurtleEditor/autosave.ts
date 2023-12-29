const HISTORY_THRESHOLD = 10;
const HISTORY_SIZE = 500;

export const autosaveHandler = (configRef) => {
    // If browsing history, don't autosave
    if (configRef.current.historyIndexRef.current !== -1) { return; };

    configRef.current.autosaveCounterRef.current++;
    const currentCode = configRef.current.codeeditorRef.current.getValue();
    const history = configRef.current.historyRef.current;

    // console.log("autosaved", history.length);
    history[0] = { timestamp: Date.now(), code: currentCode };

    if (configRef.current.autosaveCounterRef.current % HISTORY_THRESHOLD === 1) {
        history.unshift({ timestamp: Date.now(), code: currentCode });
        history.length > HISTORY_SIZE ?? history.pop();
        console.log("stored in history", history.length);
    }
};

export const saveBeforeUnload = (configRef) => {
    const currentCode = configRef.current.codeeditorRef.current.getValue();
    const history = configRef.current.historyRef.current;
    // Check if code was changed from initcode
    if (history.length === 1 && history[0].code === currentCode) {
        return;
    }
    history[0] = { timestamp: Date.now(), code: currentCode };
    localStorage.setItem(configRef.current.idRef.current, JSON.stringify(history));
    console.log("History saved to localStorage", history.length);
};

export const restoreHandler = (configRef) => {
    let result = [];
    const localString = localStorage.getItem(configRef.current.idRef.current);
    if (localString) {
        result.push(...JSON.parse(localString));
        result.sort((a, b) => b.timestamp - a.timestamp);
        console.log("History restored from localStorage", history.length);
    }
    loadFromCloud(configRef);
    return result;
};

export const saveToCloud = async (configRef) => {
    // const currentCode = configRef.current.codeeditorRef.current.getValue();
    const history = configRef.current.historyRef.current;
    // history.unshift({timestamp: Date.now(), code: currentCode});

    const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({history}),
    });

    console.log(`History saved to cloud`, history.length);
};

export const loadFromCloud = async (configRef) => {

    const res = await fetch('/api/load');
    const withRemoteHistory = await res.json();

    if (!Array.isArray(withRemoteHistory)) {
        console.error('Error: /api/load did not return an array');
        return;
    }

    withRemoteHistory.push(...configRef.current.historyRef.current);
    withRemoteHistory.sort((a, b) => b.timestamp - a.timestamp);
    // remove duplicates
    const seen = new Set();
    const newHistory = withRemoteHistory.filter(item => {
        const duplicate = seen.has(item.timestamp);
        seen.add(item.timestamp);
        return !duplicate;
    });


    configRef.current.historyIndexRef.current = -1;
    configRef.current.historyRef.current = newHistory;
    // setRedoDisabled(true);
};
