import log from "../logger";


const HISTORY_THRESHOLD = 10;
const HISTORY_SIZE = 100;

// Reset code to original
export const resetCode = (c) => {
    if (c.codeeditorRef.current) {
        c.codeeditorRef.current.setValue(c.initCode);
        c.historyRef.current.unshift({ timestamp: Date.now(), code: c.initCode, sendRemote: false });
        c.historyIndexRef.current = -1;
        c.setUndo(c.historyRef.current.length > 1);
        c.setRedo(false);
    }
};

export const autosaveHandler = (c) => {
    // If browsing history, don't autosave
    if (c.historyIndexRef.current !== -1) { return; };

    // Get current code
    const currentcode = c.codeeditorRef.current.getValue();

    // Autosaving in first history item
    const history = c.historyRef.current;
    history[0] = { timestamp: Date.now(), code: currentcode, sendRemote: false };
    c.autosaveCounterRef.current++;

    // Every nr of HISTORY_THRESHOLD, save to history
    if (c.autosaveCounterRef.current % HISTORY_THRESHOLD === 0) {
        history[0].sendRemote = true;
        history.unshift({ timestamp: Date.now(), code: currentcode, sendRemote: false });
        history.length > HISTORY_SIZE ?? history.pop();
        c.setUndo(history.length > 1);
        log('INFO', "Stored in history", history.length);

        if (c.sessionRef.current) saveToRemote(c);
    }
};

export const saveBeforeUnload = (c) => {
    log("INFO", "saveBeforeUnload");
    const history = c.historyRef.current;
    // Check if code was changed from last time
    if (c.autosaveCounterRef.current === 0) {
        log("INFO", "unchanged code in", c.idRef.current);
        return;
    }
    localStorage.setItem(c.idRef.current, JSON.stringify(history));
    log("INFO", "History saved to localStorage", history.length);
};

export const restoreHandler = (c) => {
    let localHistory = [];
    const localString = localStorage.getItem(c.idRef.current);
    if (localString !== null && localString !== undefined && localString !== "[]") {
        localHistory.push(...JSON.parse(localString));
        localHistory = localHistory.filter(item => typeof item.code === 'string');
        log("INFO", "History restored from localStorage", localHistory.length);
        c.setUndo(localHistory.length > 1);
        c.setRedo(false);
    } else {
        log("INFO", "No history found in localStorage");
        localHistory.push({ timestamp: 0, code: c.initCode, sendRemote: false });
    }
    c.historyRef.current = localHistory;
    log("DEBUG3", "localHistory", localHistory);

    // Remember: restoreFromRemote is called after session is ready
};

export const saveToRemote = async (c) => {
    // Sanitize entries without sendRemote
    c.historyRef.current = c.historyRef.current.map( item => { return { sendRemote: true, ...item }})
    // Filter entries with sendRemote true    
    const sendRemoteList = c.historyRef.current.filter(item => item.sendRemote === true);
    log("DEBUG", `Sending ${sendRemoteList.length} items to remote.`);
    if (sendRemoteList.length === 0) return;

    const editorId = c.idRef.current;
    const queryStart = performance.now()
    fetch('/api/savecode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ editorId, history: sendRemoteList }),
    }).then(() => log("DEBUG2", `The query took ${performance.now() - queryStart}ms`));

    // Setting sendRemote to false
    c.historyRef.current = c.historyRef.current.map(item => { return { ...item, sendRemote: false } })

    log("INFO", "New items saved to remote", sendRemoteList.length);
};

export const loadFromRemote = async (c) => {
    const editorId = c.idRef.current;
    // list of locally stored timestamps
    const localTimestamps = c.historyRef.current.map(item => item.timestamp);
    log("DEBUG", "localTimestamps", localTimestamps.length);
    log("DEBUG3", "localTimestamps", localTimestamps);

    // pass local timestamps to remote
    const res = await fetch(`/api/loadcode?editorId=${encodeURIComponent(editorId)}&localTimestamps=${encodeURIComponent(localTimestamps)}`);
    const withRemoteHistory = (await res.json()).map(item => ({ ...item, sendRemote: false }));

    // check if response is an array
    if (!Array.isArray(withRemoteHistory)) {
        log("ERROR", "Received a remote history that isn't an array.");
        return;
    }

    // Logging
    log("INFO", "History received from remote:", withRemoteHistory.length);
    log("DEBUG3", "History received from remote:", withRemoteHistory);

    // check if there are any items in the array
    if (withRemoteHistory.length === 0) {
        return;
    }

    // merge with local history
    withRemoteHistory.push(...c.historyRef.current);
    withRemoteHistory.sort((a, b) => b.timestamp - a.timestamp);

    // remove duplicates (shouldn't happen)
    const seen = new Set();
    const newHistory = withRemoteHistory.filter(item => {
        const duplicate = seen.has(item.timestamp);
        if (duplicate) { log("WARNING", "Duplicate detected!", item.timestamp); }
        seen.add(item.timestamp);
        return !duplicate;
    });

    c.historyIndexRef.current = 999; // prevent new autosave
    c.historyRef.current = newHistory;
    if (c.codeeditorRef && c.codeeditorRef.current) {
        c.codeeditorRef.current.setValue(newHistory[0].code);
    }
    c.setUndo(newHistory.length > 1);
    c.setRedo(false);
    c.historyIndexRef.current = -1; // re-enable autosave
    c.autosaveCounterRef.current = 100; // make sure it's saved to localStorage
    log("INFO", "Merged remote and local histories.");
};