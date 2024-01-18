import { useSession } from 'next-auth/react'
import log from "../logger";

const HISTORY_THRESHOLD = 10;
const HISTORY_SIZE = 100;

// Reset code to original
export const resetCode = (c) => {
    if (c.codeeditorRef.current) {
        c.codeeditorRef.current.setValue(c.initCode);
        c.historyRef.current.unshift({ timestamp: Date.now(), code: c.initCode });
        c.historyIndexRef.current = -1;
        c.setUndo(c.historyRef.current.length > 1);
        c.setRedo(false);
    }
};

export const autosaveHandler = (c, currentcode=null) => {
    // If browsing history, don't autosave
    if (c.historyIndexRef.current !== -1) { return; };

    // Get current code if no value passed
    if (currentcode === null && c.codeeditorRef.current) {
        currentcode = c.codeeditorRef.current.getValue();
    }
    // Autosaving in first history item
    const history = c.historyRef.current;
    if (c.autosaveCounterRef.current === 0) {
        history[0] = { timestamp: Date.now(), code: currentcode };
    }
    c.autosaveCounterRef.current++;

    // Every nr of HISTORY_THRESHOLD, save to history
    if (c.autosaveCounterRef.current % HISTORY_THRESHOLD === 0) {
        history.unshift({ timestamp: Date.now(), code: currentcode });
        history.length > HISTORY_SIZE ?? history.pop();
        c.setUndo(history.length > 1);
        log('INFO', "Stored in history", history.length);
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
        // result.sort((a, b) => b.timestamp - a.timestamp);
        log("INFO", "History restored from localStorage", localHistory.length);
        c.setUndo(localHistory.length > 1);
        c.setRedo(false);
    } else {
        log("INFO", "No history found in localStorage");
        localHistory.push({ timestamp: 0, code: c.initCode });
    }
    c.historyRef.current = localHistory;

    if (c.session) loadFromRemote(c);
};

export const saveToRemote = async (c) => {
    // Filter timestamps that are already on remote, add new ones to remoteTimestampsRef
    console.time("saveToRemote");
    const localUniqueHistory = c.historyRef.current.filter(item => {
        const newItem = !c.remoteTimestampsRef.current.has(item.timestamp);
        c.remoteTimestampsRef.current.add(item.timestamp);
        return newItem;
    });
    const editorId = c.idRef.current;

    console.time("query to remote");
    fetch('/api/savecode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ editorId, history: localUniqueHistory }),
    }).then(() => console.timeEnd("query to remote"));

    log("INFO", "New items saved to remote", localUniqueHistory.length);
    console.timeEnd("saveToRemote");
};

export const loadFromRemote = async (c) => {
    log("DEBUG2", "Loading from remote");
    const editorId = c.idRef.current;
    const res = await fetch(`/api/loadcode?editorId=${encodeURIComponent(editorId)}`);
    const withRemoteHistory = await res.json();
    
    // check if response is an array
    if (!Array.isArray(withRemoteHistory)) {
        log("ERROR", "Received a remote history that isn't an array.");
        return;
    }
    
    // check if there are any items in the array
    if (withRemoteHistory.length === 0) {
        log("INFO", "No remote history found");
        return;
    }
    
    // cache all remote timestamps
    withRemoteHistory.forEach(item => c.remoteTimestampsRef.current.add(item.timestamp));

    // merge with local history
    withRemoteHistory.push(...c.historyRef.current);
    withRemoteHistory.sort((a, b) => b.timestamp - a.timestamp);

    // remove duplicates
    const seen = new Set();
    const newHistory = withRemoteHistory.filter(item => {
        const duplicate = seen.has(item.timestamp);
        if (duplicate) { log("WARNING", "Duplicate detected!", item.timestamp); }
        seen.add(item.timestamp);
        return !duplicate;
    });

    c.historyIndexRef.current = 999; // prevent autosave
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

export const getLastTimestampPromise = async (id) => {
    const session = useSession();
    log("INFO", "getLastTimestampPromise", id, session);
    // if (session) {
    //     console.error('ERROR: Error in useSession response', error);
    //     return null;
    // }
    // if (session) return fetch(`/api/lasttimestamp?editorId=${encodeURIComponent(id)}`);
};
