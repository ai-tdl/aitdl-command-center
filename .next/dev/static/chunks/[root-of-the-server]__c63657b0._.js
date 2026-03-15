(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/aitdl4/components/SettingsPanel.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const THEMES = [
    {
        id: 'dark',
        label: 'Dark',
        icon: '🌙'
    },
    {
        id: 'light',
        label: 'Light',
        icon: '☀️'
    },
    {
        id: 'glass',
        label: 'Glass',
        icon: '💎'
    },
    {
        id: 'midnight',
        label: 'Midnight',
        icon: '🌌'
    }
];
const LANGUAGES = [
    {
        id: 'en',
        label: 'EN'
    },
    {
        id: 'hi',
        label: 'हि'
    },
    {
        id: 'sa',
        label: 'सं'
    }
];
const DENSITIES = [
    {
        id: 'compact',
        label: 'Compact',
        padding: '12px'
    },
    {
        id: 'comfortable',
        label: 'Comfortable',
        padding: '24px'
    },
    {
        id: 'spacious',
        label: 'Spacious',
        padding: '40px'
    }
];
const FONT_SIZES = [
    {
        id: 'small',
        label: 'A-',
        size: '13px'
    },
    {
        id: 'medium',
        label: 'A',
        size: '15px'
    },
    {
        id: 'large',
        label: 'A+',
        size: '17px'
    }
];
const ACCENTS = [
    '#FF6B35',
    '#00B4D8',
    '#34C759',
    '#FFD700',
    '#BF5AF2',
    '#FF2D55',
    '#ffffff'
];
function SettingsPanel({ isOpen, onClose, lang, setLang }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('grid');
    const [density, setDensity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('comfortable');
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('medium');
    const [indiaMode, setIndiaMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accent, setAccent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('#FF6B35');
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPanel.useEffect": ()=>{
            // Initial Load
            const sTheme = localStorage.getItem('aitdl_theme') || 'dark';
            const sLang = localStorage.getItem('aitdl_lang') || 'en';
            const sView = localStorage.getItem('aitdl_view') || 'grid';
            const sDensity = localStorage.getItem('aitdl_density') || 'comfortable';
            const sFontSize = localStorage.getItem('aitdl_fontsize') || 'medium';
            const sIndiaMode = localStorage.getItem('aitdl_india_mode') === 'true';
            const sAccent = localStorage.getItem('aitdl_accent') || '#FF6B35';
            setTheme(sTheme);
            setLang(sLang);
            setView(sView);
            setDensity(sDensity);
            setFontSize(sFontSize);
            setIndiaMode(sIndiaMode);
            setAccent(sAccent);
            // Apply immediately
            applyTheme(sTheme);
            applyDensity(sDensity);
            applyFontSize(sFontSize);
            applyAccent(sAccent);
        }
    }["SettingsPanel.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPanel.useEffect": ()=>{
            const handleEsc = {
                "SettingsPanel.useEffect.handleEsc": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["SettingsPanel.useEffect.handleEsc"];
            if (isOpen) window.addEventListener('keydown', handleEsc);
            return ({
                "SettingsPanel.useEffect": ()=>window.removeEventListener('keydown', handleEsc)
            })["SettingsPanel.useEffect"];
        }
    }["SettingsPanel.useEffect"], [
        isOpen
    ]);
    const applyTheme = (t)=>{
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('aitdl_theme', t);
        setTheme(t);
        window.dispatchEvent(new Event('storage'));
    };
    const applyLang = (l)=>{
        setLang(l);
        localStorage.setItem('aitdl_lang', l);
        window.dispatchEvent(new Event('storage'));
    };
    const applyView = (v)=>{
        setView(v);
        localStorage.setItem('aitdl_view', v);
        window.dispatchEvent(new Event('storage'));
    };
    const applyDensity = (d)=>{
        const conf = DENSITIES.find((x)=>x.id === d);
        if (conf) document.documentElement.style.setProperty('--card-padding', conf.padding);
        setDensity(d);
        localStorage.setItem('aitdl_density', d);
        window.dispatchEvent(new Event('storage'));
    };
    const applyFontSize = (fs)=>{
        const conf = FONT_SIZES.find((x)=>x.id === fs);
        if (conf) document.documentElement.style.setProperty('--font-base', conf.size);
        setFontSize(fs);
        localStorage.setItem('aitdl_fontsize', fs);
        window.dispatchEvent(new Event('storage'));
    };
    const applyIndiaMode = (val)=>{
        setIndiaMode(val);
        localStorage.setItem('aitdl_india_mode', val);
        // Synchronize with origin for index.js logic
        localStorage.setItem('aitdl_origin', val ? 'bharat' : 'all');
        window.dispatchEvent(new Event('storage'));
    };
    const applyAccent = (a)=>{
        document.documentElement.style.setProperty('--accent', a);
        setAccent(a);
        localStorage.setItem('aitdl_accent', a);
        window.dispatchEvent(new Event('storage'));
    };
    const resetAll = ()=>{
        applyTheme('dark');
        applyLang('en');
        applyView('grid');
        applyDensity('comfortable');
        applyFontSize('medium');
        applyIndiaMode(false);
        applyAccent('#FF6B35');
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClose,
        className: "jsx-43428b1125a02691" + " " + "overlay",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                ref: panelRef,
                className: "jsx-43428b1125a02691" + " " + "panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-43428b1125a02691" + " " + "mobile-handle"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "jsx-43428b1125a02691",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-43428b1125a02691",
                                children: "⚙️ Settings"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetAll,
                                className: "jsx-43428b1125a02691" + " " + "reset-link",
                                children: "↺ Reset all"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-43428b1125a02691" + " " + "content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "Interface Theme"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-43428b1125a02691" + " " + "grid-btns",
                                        children: THEMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyTheme(t.id),
                                                className: "jsx-43428b1125a02691" + " " + ((theme === t.id ? 'active' : '') || ""),
                                                children: [
                                                    t.icon,
                                                    " ",
                                                    t.label
                                                ]
                                            }, t.id, true, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "Language"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-43428b1125a02691" + " " + "row-btns",
                                        children: LANGUAGES.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyLang(l.id),
                                                className: "jsx-43428b1125a02691" + " " + ((lang === l.id ? 'active' : '') || ""),
                                                children: l.label
                                            }, l.id, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "View Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-43428b1125a02691" + " " + "row-btns",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyView('grid'),
                                                className: "jsx-43428b1125a02691" + " " + ((view === 'grid' ? 'active' : '') || ""),
                                                children: "🗂 Grid"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyView('list'),
                                                className: "jsx-43428b1125a02691" + " " + ((view === 'list' ? 'active' : '') || ""),
                                                children: "📝 List"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 182,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "Density"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-43428b1125a02691" + " " + "row-btns",
                                        children: DENSITIES.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyDensity(d.id),
                                                className: "jsx-43428b1125a02691" + " " + ((density === d.id ? 'active' : '') || ""),
                                                children: d.label
                                            }, d.id, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "Font Size"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-43428b1125a02691" + " " + "row-btns",
                                        children: FONT_SIZES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyFontSize(f.id),
                                                className: "jsx-43428b1125a02691" + " " + ((fontSize === f.id ? 'active' : '') || ""),
                                                children: f.label
                                            }, f.id, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691" + " " + "flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "India Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-43428b1125a02691" + " " + "switch",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: indiaMode,
                                                onChange: (e)=>applyIndiaMode(e.target.checked),
                                                className: "jsx-43428b1125a02691"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-43428b1125a02691" + " " + "slider"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-43428b1125a02691",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-43428b1125a02691",
                                        children: "Accent Colour"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-43428b1125a02691" + " " + "color-row",
                                        children: ACCENTS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: a
                                                },
                                                onClick: ()=>applyAccent(a),
                                                className: "jsx-43428b1125a02691" + " " + `color-dot ${accent === a ? 'active' : ''}`
                                            }, a, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetAll,
                                className: "jsx-43428b1125a02691" + " " + "full-reset",
                                children: "↺ Reset all to default"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "43428b1125a02691",
                children: '.overlay.jsx-43428b1125a02691{z-index:2000;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;background:#0006;justify-content:flex-end;padding:20px;animation:.2s forwards fade-in;display:flex;position:fixed;inset:0}@keyframes fade-in{to{opacity:1}}.panel.jsx-43428b1125a02691{background:var(--bg2);border:1px solid var(--border);border-radius:24px;flex-direction:column;width:280px;max-height:85vh;animation:.2s forwards slide-in;display:flex;overflow:hidden;transform:translateY(-8px);box-shadow:0 20px 60px #00000080}@keyframes slide-in{to{opacity:1;transform:translateY(0)}}.mobile-handle.jsx-43428b1125a02691{display:none}header.jsx-43428b1125a02691{border-bottom:1px solid var(--border);justify-content:space-between;align-items:center;padding:20px 24px;display:flex}header.jsx-43428b1125a02691 h3.jsx-43428b1125a02691{margin:0;font-size:16px;font-weight:800}.reset-link.jsx-43428b1125a02691{color:var(--accent);cursor:pointer;background:0 0;border:none;font-size:12px;font-weight:700}.content.jsx-43428b1125a02691{flex-direction:column;gap:24px;padding:24px;display:flex;overflow-y:auto}section.jsx-43428b1125a02691 h4.jsx-43428b1125a02691{color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;font-size:10px;font-weight:800}.grid-btns.jsx-43428b1125a02691{grid-template-columns:1fr 1fr;gap:8px;display:grid}.row-btns.jsx-43428b1125a02691{gap:8px;display:flex}button.jsx-43428b1125a02691:not(:is(.reset-link,.full-reset)){border:1px solid var(--border);background:var(--bg3);color:var(--text2);cursor:pointer;border-radius:12px;flex:1;padding:10px;font-size:12px;font-weight:700;transition:all .2s}button.active.jsx-43428b1125a02691{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 4px 12px var(--accent-glow)}.flex-row.jsx-43428b1125a02691{justify-content:space-between;align-items:center;display:flex}.flex-row.jsx-43428b1125a02691 h4.jsx-43428b1125a02691{margin:0}.switch.jsx-43428b1125a02691{width:44px;height:24px;display:inline-block;position:relative}.switch.jsx-43428b1125a02691 input.jsx-43428b1125a02691{opacity:0;width:0;height:0}.slider.jsx-43428b1125a02691{cursor:pointer;background:var(--bg3);border:1px solid var(--border);border-radius:34px;transition:all .4s;position:absolute;inset:0}.slider.jsx-43428b1125a02691:before{content:"";background-color:#fff;border-radius:50%;width:16px;height:16px;transition:all .4s;position:absolute;bottom:3px;left:4px}input.jsx-43428b1125a02691:checked+.slider.jsx-43428b1125a02691{background-color:var(--accent);border-color:var(--accent)}input.jsx-43428b1125a02691:checked+.slider.jsx-43428b1125a02691:before{transform:translate(18px)}.color-row.jsx-43428b1125a02691{flex-wrap:wrap;gap:8px;display:flex}.color-dot.jsx-43428b1125a02691{cursor:pointer;border:2px solid #0000;border-radius:50%;width:24px;height:24px;transition:transform .2s}.color-dot.active.jsx-43428b1125a02691{border-color:#fff;transform:scale(1.1);box-shadow:0 0 10px #ffffff4d}.full-reset.jsx-43428b1125a02691{border:1px solid var(--border);color:var(--text3);cursor:pointer;background:0 0;border-radius:12px;margin-top:12px;padding:12px;font-size:12px;font-weight:700}@media (width<=768px){.overlay.jsx-43428b1125a02691{align-items:flex-end;padding:0}.panel.jsx-43428b1125a02691{border-radius:20px 20px 0 0;width:100%;max-height:70vh;animation:.3s forwards slide-up-mobile;transform:translateY(100%)}@keyframes slide-up-mobile{to{opacity:1;transform:translateY(0)}}.mobile-handle.jsx-43428b1125a02691{background:var(--border);border-radius:2px;width:40px;height:4px;margin:12px auto 0;display:block}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/SettingsPanel.js",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(SettingsPanel, "TGr2gXXQgStI9zjiF/eA+LKSwms=");
_c = SettingsPanel;
var _c;
__turbopack_context__.k.register(_c, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/components/Header.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/styled-jsx/style.js [client] (ecmascript)");
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 All Rights Reserved
 * ============================================
 * @books
 * - When Code Learned to Feel:
 *   The Day Code Took a Breath (Kindle)
 * - Code Without Limits:
 *   The End of Human Coding (Upcoming)
 * - Gaṇitsūtram:
 *   Golden Book of Vedic Mathematics (Upcoming)
 * ============================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SettingsPanel$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/SettingsPanel.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const LANG = {
    en: {
        battle: 'AI Battle',
        compare: 'Compare',
        about: 'About'
    },
    hi: {
        battle: 'AI युद्ध',
        compare: 'तुलना',
        about: 'हमारे बारे में'
    },
    sa: {
        battle: 'AI युद्धम्',
        compare: 'तुलना',
        about: 'अस्माकं विषये'
    }
};
function Header({ lang, setLang }) {
    _s();
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(3, 3, 6, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '0 24px',
            transition: 'all 0.3s var(--ease)'
        },
        className: "jsx-3d7db80926d399fc",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 80
                },
                className: "jsx-3d7db80926d399fc",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            textDecoration: 'none'
                        },
                        title: "Artificial Intelligence Technology & Deep Learning",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.5s var(--ease)'
                                },
                                className: "jsx-3d7db80926d399fc" + " " + "logo-glow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo-singularity.svg",
                                    alt: "AITDL Singularity",
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 0 10px var(--accent-glow))'
                                    },
                                    className: "jsx-3d7db80926d399fc"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/components/Header.js",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-3d7db80926d399fc" + " " + "logo-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 22,
                                            fontWeight: 950,
                                            color: 'var(--text)',
                                            letterSpacing: '-0.03em',
                                            fontFamily: 'Outfit',
                                            lineHeight: 1
                                        },
                                        className: "jsx-3d7db80926d399fc",
                                        children: [
                                            "AITDL",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--accent)'
                                                },
                                                className: "jsx-3d7db80926d399fc",
                                                children: "."
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/Header.js",
                                                lineNumber: 101,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 9,
                                            fontWeight: 800,
                                            color: 'var(--text3)',
                                            letterSpacing: '0.08em',
                                            marginTop: 4,
                                            textTransform: 'uppercase'
                                        },
                                        className: "jsx-3d7db80926d399fc",
                                        children: "Artificial Intelligence Technology & Deep Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Header.js",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 24
                        },
                        className: "jsx-3d7db80926d399fc",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 16,
                                    alignItems: 'center'
                                },
                                className: "jsx-3d7db80926d399fc",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/ai-battle",
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: 'var(--text2)',
                                            textDecoration: 'none',
                                            padding: '8px 16px',
                                            borderRadius: 12,
                                            transition: 'all 0.2s'
                                        },
                                        className: "nav-link",
                                        children: [
                                            "⚔️ ",
                                            t.battle
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/compare",
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: 'var(--text2)',
                                            textDecoration: 'none',
                                            padding: '8px 16px',
                                            borderRadius: 12,
                                            transition: 'all 0.2s'
                                        },
                                        className: "nav-link",
                                        children: [
                                            "🔄 ",
                                            t.compare
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/about",
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: 'var(--text2)',
                                            textDecoration: 'none',
                                            padding: '8px 16px',
                                            borderRadius: 12,
                                            transition: 'all 0.2s'
                                        },
                                        className: "nav-link",
                                        children: [
                                            "✨ ",
                                            t.about
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                },
                                className: "jsx-3d7db80926d399fc",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSettingsOpen(true),
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg3)',
                                        color: 'var(--text)',
                                        cursor: 'pointer',
                                        fontSize: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s var(--ease)'
                                    },
                                    className: "jsx-3d7db80926d399fc" + " " + "gear-btn",
                                    children: "⚙️"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/components/Header.js",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Header.js",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/Header.js",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SettingsPanel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: settingsOpen,
                onClose: ()=>setSettingsOpen(false),
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/Header.js",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "3d7db80926d399fc",
                children: ".nav-link.jsx-3d7db80926d399fc:hover{color:var(--accent);background:#ffffff08}.gear-btn.jsx-3d7db80926d399fc:hover{border-color:var(--accent);box-shadow:0 0 15px var(--accent-glow);transform:rotate(45deg)}@media (width<=768px){.logo-text.jsx-3d7db80926d399fc,nav.jsx-3d7db80926d399fc{display:none}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/Header.js",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(Header, "m81HakmNoKD3gYVAhn9M4p62/Ow=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/components/Footer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 All Rights Reserved
 * ============================================
 * @books
 * - When Code Learned to Feel:
 *   The Day Code Took a Breath (Kindle)
 * - Code Without Limits:
 *   The End of Human Coding (Upcoming)
 * - Gaṇitsūtram:
 *   Golden Book of Vedic Mathematics (Upcoming)
 * ============================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const LANG = {
    en: {
        desc: "India's most versatile AI technology ecosystem. Empowering 1.4 Billion minds with the right tools.",
        platform: 'Platform',
        tools: 'Explore Tools',
        battle: 'AI Battle',
        compare: 'Comparison Engine',
        about: 'About the Project',
        connect: 'Connect',
        built: 'Built with ❤️ for Bharat by',
        dev: 'Software Developer since 2007 | Published Author',
        rights: '© 2025 AITDL — All Rights Reserved',
        suggest: 'Suggest a Tool'
    },
    hi: {
        desc: "भारत का सबसे बहुमुखी AI तकनीक पारिस्थितिकी तंत्र। 1.4 अरब दिमागों को सही उपकरणों के साथ सशक्त बनाना।",
        platform: 'प्लेटफॉर्म',
        tools: 'टूल्स देखें',
        battle: 'AI युद्ध',
        compare: 'तुलना इंजन',
        about: 'परियोजना के बारे में',
        connect: 'संपर्क',
        built: 'भारत के लिए ❤️ के साथ निर्मित',
        dev: '2007 से सॉफ्टवेयर डेवलपर | प्रकाशित लेखक',
        rights: '© 2025 AITDL — सर्वाधिकार सुरक्षित',
        suggest: 'टूल का सुझाव दें'
    },
    sa: {
        desc: "भारतस्य सर्वाधिकं बहुमुखी AI तन्त्रज्ञानव्यवस्था। १.४ अरब मेधाविनाम् उचितसाधनैः शक्तिकरणम्।",
        platform: 'मञ्चः',
        tools: 'उपकरणानि अन्वेषयन्तु',
        battle: 'AI युद्धम्',
        compare: 'तुलना यन्त्रम्',
        about: 'परियोजनायाः विषये',
        connect: 'सम्पर्कः',
        built: 'भारताय ❤️ सह निर्मितम्',
        dev: '२००७ तः सॉफ्टवेयर विकसकः | प्रकाशितः लेखकः',
        rights: '© २०२५ AITDL — सर्वे अधिकाराः सुरक्षिताः',
        suggest: 'उपकरणं सूचयन्तु'
    }
};
function Footer() {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            const saved = localStorage.getItem('aitdl_lang') || 'en';
            setLang(saved);
            // Listen for storage changes to sync across tabs/components
            const handleStorage = {
                "Footer.useEffect.handleStorage": ()=>{
                    setLang(localStorage.getItem('aitdl_lang') || 'en');
                }
            }["Footer.useEffect.handleStorage"];
            window.addEventListener('storage', handleStorage);
            return ({
                "Footer.useEffect": ()=>window.removeEventListener('storage', handleStorage)
            })["Footer.useEffect"];
        }
    }["Footer.useEffect"], []);
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: {
            borderTop: '1px solid var(--border)',
            padding: '64px 24px',
            marginTop: 80,
            background: 'var(--bg)',
            backdropFilter: 'blur(20px)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 48,
                    marginBottom: 64
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 20
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo-horizontal.svg",
                                    alt: "AITDL Branding",
                                    style: {
                                        height: 60,
                                        width: 'auto',
                                        filter: 'drop-shadow(0 0 10px var(--accent-glow))'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/components/Footer.js",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 14,
                                    color: 'var(--text3)',
                                    lineHeight: 1.8,
                                    maxWidth: 300
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--text2)',
                                            fontWeight: 600,
                                            display: 'block',
                                            marginBottom: 4
                                        },
                                        children: "Artificial Intelligence Technology & Deep Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    t.desc
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 800,
                                    color: 'var(--text)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    marginBottom: 24
                                },
                                children: t.platform
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12
                                },
                                children: [
                                    [
                                        t.tools,
                                        '/'
                                    ],
                                    [
                                        t.battle,
                                        '/ai-battle'
                                    ],
                                    [
                                        t.compare,
                                        '/compare'
                                    ],
                                    [
                                        t.about,
                                        '/about'
                                    ]
                                ].map(([label, href])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: href,
                                        style: {
                                            fontSize: 14,
                                            color: 'var(--text2)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s'
                                        },
                                        className: "footer-link",
                                        children: label
                                    }, label, false, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 800,
                                    color: 'var(--text)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    marginBottom: 24
                                },
                                children: t.connect
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "mailto:hello@aitdl.com",
                                        style: {
                                            fontSize: 14,
                                            color: 'var(--accent)',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            padding: '12px 20px',
                                            border: '1px solid var(--border)',
                                            borderRadius: 8,
                                            textAlign: 'center',
                                            display: 'inline-block',
                                            transition: 'all 0.3s'
                                        },
                                        className: "contact-btn",
                                        children: "hello@aitdl.com"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://forms.gle/aitdl-suggest",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        style: {
                                            fontSize: 12,
                                            color: 'var(--text)',
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                            padding: '10px 20px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: 8,
                                            textAlign: 'center',
                                            display: 'inline-block',
                                            border: '1px dashed var(--border)',
                                            transition: 'all 0.3s'
                                        },
                                        children: [
                                            "➕ ",
                                            t.suggest
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid var(--border)',
                    paddingTop: 48,
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 13,
                        color: 'var(--text3)',
                        lineHeight: 2,
                        fontWeight: 500
                    },
                    children: [
                        t.built,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--text)',
                                fontWeight: 800,
                                marginLeft: 6,
                                fontFamily: 'Outfit',
                                letterSpacing: '0.05em'
                            },
                            children: "JRM"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 11,
                                opacity: 0.8
                            },
                            children: t.dev
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 11,
                                opacity: 0.5,
                                marginTop: 12,
                                display: 'block'
                            },
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " AITDL — Artificial Intelligence Technology & Deep Learning | All Rights Reserved"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aitdl4/components/Footer.js",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 190,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/Footer.js",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(Footer, "IZSnqxuBuRjfXmXvrAq3O0uY2vU=");
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/components/ToolCard.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/styled-jsx/style.js [client] (ecmascript)");
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 All Rights Reserved
 * ============================================
 * @books
 * - When Code Learned to Feel:
 *   The Day Code Took a Breath (Kindle)
 * - Code Without Limits:
 *   The End of Human Coding (Upcoming)
 * - Gaṇitsūtram:
 *   Golden Book of Vedic Mathematics (Upcoming)
 * ============================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ToolCard({ tool, onCompare, isSelected, viewMode = 'grid' }) {
    _s();
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const handleMouseMove = (e)=>{
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };
    const isList = viewMode === 'list';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        onMouseMove: handleMouseMove,
        style: {
            borderRadius: 20,
            padding: 'var(--card-padding)',
            display: 'flex',
            flexDirection: isList ? 'row' : 'column',
            alignItems: isList ? 'center' : 'stretch',
            gap: 'var(--card-gap, 24px)',
            transition: 'all 0.4s var(--ease)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'slide-up 0.5s var(--ease) forwards',
            border: tool.featured ? '1.5px solid var(--accent)' : '1px solid var(--border)'
        },
        className: "jsx-a86005ed30a24079" + " " + "premium-glass-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-glow), transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0,
                    transition: 'opacity 0.4s ease'
                },
                className: "jsx-a86005ed30a24079" + " " + "spotlight"
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-a86005ed30a24079",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap'
                        },
                        className: "jsx-a86005ed30a24079",
                        children: [
                            tool.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    padding: '5px 12px',
                                    borderRadius: 30,
                                    background: 'var(--accent)',
                                    color: '#fff',
                                    fontWeight: 800,
                                    letterSpacing: '0.05em',
                                    boxShadow: '0 4px 12px var(--accent-glow)'
                                },
                                className: "jsx-a86005ed30a24079",
                                children: "FEATURED"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    padding: '5px 12px',
                                    borderRadius: 30,
                                    background: tool.pricing === 'free' ? 'rgba(34,197,94,0.08)' : tool.pricing === 'freemium' ? 'rgba(251,191,36,0.08)' : 'rgba(239,68,68,0.08)',
                                    color: tool.pricing === 'free' ? '#4ADE80' : tool.pricing === 'freemium' ? '#FBBF24' : '#F87171',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    border: `1px solid ${tool.pricing === 'free' ? 'rgba(74, 222, 128, 0.2)' : tool.pricing === 'freemium' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                                },
                                className: "jsx-a86005ed30a24079",
                                children: tool.pricing
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    tool.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: '#4ADE80',
                            color: '#030306',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            fontWeight: 900
                        },
                        title: "Verified Tool",
                        className: "jsx-a86005ed30a24079",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-a86005ed30a24079",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16
                        },
                        className: "jsx-a86005ed30a24079",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 42,
                                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: 12,
                                    borderRadius: 16,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s ease'
                                },
                                className: "jsx-a86005ed30a24079" + " " + "emoji-box",
                                children: tool.emoji
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 22,
                                    fontWeight: 900,
                                    color: 'var(--text)',
                                    margin: 0,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em'
                                },
                                className: "jsx-a86005ed30a24079",
                                children: tool.name
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15,
                            color: 'var(--text2)',
                            lineHeight: 1.7,
                            marginBottom: 24,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: 500
                        },
                        className: "jsx-a86005ed30a24079",
                        children: tool.description
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap',
                            marginBottom: 24
                        },
                        className: "jsx-a86005ed30a24079",
                        children: tool.category.slice(0, 3).map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    padding: '4px 14px',
                                    borderRadius: 12,
                                    background: 'rgba(255,255,255,0.03)',
                                    color: 'var(--text3)',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                },
                                className: "jsx-a86005ed30a24079",
                                children: cat
                            }, cat, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 16,
                    marginTop: 'auto',
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-a86005ed30a24079",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/tools/${tool.slug}`,
                        style: {
                            flex: 1.5,
                            padding: '14px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 14,
                            fontSize: 14,
                            fontWeight: 800,
                            color: 'var(--text)',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'all 0.3s var(--ease)'
                        },
                        className: "btn-details",
                        children: "View Concept →"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onCompare(tool);
                        },
                        style: {
                            flex: 1,
                            padding: '14px',
                            background: isSelected ? 'var(--accent)' : 'transparent',
                            border: `1px solid ${isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 14,
                            fontSize: 13,
                            fontWeight: 800,
                            color: isSelected ? '#fff' : 'var(--text2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s var(--ease)'
                        },
                        className: "jsx-a86005ed30a24079",
                        children: isSelected ? '✓ Ready' : 'Compare'
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "a86005ed30a24079",
                children: ".premium-glass-card.jsx-a86005ed30a24079:hover{box-shadow:0 20px 60px #0009,0 0 20px var(--accent-glow);transform:translateY(-8px)scale(1.02);border-color:var(--accent)!important}.premium-glass-card.jsx-a86005ed30a24079:hover .spotlight.jsx-a86005ed30a24079{opacity:1!important}.premium-glass-card.jsx-a86005ed30a24079:hover .emoji-box.jsx-a86005ed30a24079{background:var(--accent-glow);border-color:var(--accent);transform:scale(1.1)rotate(5deg)}.btn-details.jsx-a86005ed30a24079:hover{border-color:var(--accent);color:var(--accent);background:#ffffff14}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/ToolCard.js",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(ToolCard, "oZ0wLP3H2eRbzix1B1kdx8KVzJ0=");
_c = ToolCard;
var _c;
__turbopack_context__.k.register(_c, "ToolCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/components/NeuralNetwork.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 All Rights Reserved
 * ============================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const NeuralNetwork = ()=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeuralNetwork.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let nodes = [];
            const nodeCount = 60;
            const colors = [
                '#FF6B35',
                '#00B4D8',
                '#FF8E64',
                '#48CAE4'
            ];
            const init = {
                "NeuralNetwork.useEffect.init": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    nodes = [];
                    for(let i = 0; i < nodeCount; i++){
                        nodes.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            vx: (Math.random() - 0.5) * 0.4,
                            vy: (Math.random() - 0.5) * 0.4,
                            r: Math.random() * 2 + 1,
                            color: colors[Math.floor(Math.random() * colors.length)],
                            depth: Math.random(),
                            pulse: 0
                        });
                    }
                }
            }["NeuralNetwork.useEffect.init"];
            init();
            let mouse = {
                x: -1000,
                y: -1000
            };
            const handleMouseMove = {
                "NeuralNetwork.useEffect.handleMouseMove": (e)=>{
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                }
            }["NeuralNetwork.useEffect.handleMouseMove"];
            window.addEventListener('mousemove', handleMouseMove);
            const animate = {
                "NeuralNetwork.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    nodes.forEach({
                        "NeuralNetwork.useEffect.animate": (n, i)=>{
                            nodes.slice(i + 1).forEach({
                                "NeuralNetwork.useEffect.animate": (m)=>{
                                    const dx = n.x - m.x;
                                    const dy = n.y - m.y;
                                    const dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < 180) {
                                        ctx.beginPath();
                                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 180)})`;
                                        ctx.lineWidth = 0.5;
                                        ctx.moveTo(n.x, n.y);
                                        ctx.lineTo(m.x, m.y);
                                        ctx.stroke();
                                        // Random "Data Pulse"
                                        if (Math.random() > 0.998) {
                                            const pulsePos = Math.random();
                                            const px = n.x + (m.x - n.x) * pulsePos;
                                            const py = n.y + (m.y - n.y) * pulsePos;
                                            ctx.beginPath();
                                            ctx.arc(px, py, 2, 0, Math.PI * 2);
                                            ctx.fillStyle = '#fff';
                                            ctx.shadowBlur = 15;
                                            ctx.shadowColor = '#fff';
                                            ctx.fill();
                                            ctx.shadowBlur = 0;
                                        }
                                    }
                                }
                            }["NeuralNetwork.useEffect.animate"]);
                            // Mouse interaction: Pushing nodes
                            const mdx = n.x - mouse.x;
                            const mdy = n.y - mouse.y;
                            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                            if (mdist < 150) {
                                const angle = Math.atan2(mdy, mdx);
                                const force = (150 - mdist) / 1500;
                                n.vx += Math.cos(angle) * force;
                                n.vy += Math.sin(angle) * force;
                            }
                            // Draw node
                            ctx.beginPath();
                            ctx.arc(n.x, n.y, n.r * (1 + n.depth), 0, Math.PI * 2);
                            ctx.fillStyle = n.color;
                            ctx.shadowBlur = 15;
                            ctx.shadowColor = n.color;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            // Motion physics
                            n.x += n.vx;
                            n.y += n.vy;
                            n.vx *= 0.99; // Dampen
                            n.vy *= 0.99;
                            // Bounds check
                            if (n.x < -10) n.x = canvas.width + 10;
                            if (n.x > canvas.width + 10) n.x = -10;
                            if (n.y < -10) n.y = canvas.height + 10;
                            if (n.y > canvas.height + 10) n.y = -10;
                        }
                    }["NeuralNetwork.useEffect.animate"]);
                    requestAnimationFrame(animate);
                }
            }["NeuralNetwork.useEffect.animate"];
            animate();
            window.addEventListener('resize', init);
            return ({
                "NeuralNetwork.useEffect": ()=>{
                    window.removeEventListener('resize', init);
                    window.removeEventListener('mousemove', handleMouseMove);
                }
            })["NeuralNetwork.useEffect"];
        }
    }["NeuralNetwork.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.8
        }
    }, void 0, false, {
        fileName: "[project]/aitdl4/components/NeuralNetwork.js",
        lineNumber: 131,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NeuralNetwork, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = NeuralNetwork;
const __TURBOPACK__default__export__ = NeuralNetwork;
var _c;
__turbopack_context__.k.register(_c, "NeuralNetwork");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/components/TrustBar.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @copyright © 2025 All Rights Reserved
 * ============================================
 */ __turbopack_context__.s([
    "default",
    ()=>TrustBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/styled-jsx/style.js [client] (ecmascript)");
;
;
function TrustBar() {
    const items = [
        {
            icon: '🚀',
            text: '100+ Verified AI Tools'
        },
        {
            icon: '🇮🇳',
            text: 'Built for Bharat'
        },
        {
            icon: '💎',
            text: 'Premium Experience'
        },
        {
            icon: '🔒',
            text: 'Secure & Verified'
        },
        {
            icon: '✨',
            text: 'Free Forever'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            margin: '0 auto 64px',
            maxWidth: 1000,
            padding: '20px',
            borderRadius: 24,
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 20,
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 2
        },
        className: "jsx-93493a8b5548c9f0" + " " + "trust-bar",
        children: [
            items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--text2)',
                        letterSpacing: '0.02em'
                    },
                    className: "jsx-93493a8b5548c9f0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 18
                            },
                            className: "jsx-93493a8b5548c9f0",
                            children: item.icon
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/TrustBar.js",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-93493a8b5548c9f0",
                            children: item.text
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/TrustBar.js",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/aitdl4/components/TrustBar.js",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "93493a8b5548c9f0",
                children: ".trust-bar.jsx-93493a8b5548c9f0{animation:slide-up .8s var(--ease)forwards}@media (width<=768px){.trust-bar.jsx-93493a8b5548c9f0{justify-content:center}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/TrustBar.js",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = TrustBar;
var _c;
__turbopack_context__.k.register(_c, "TrustBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__N_SSG",
    ()=>__N_SSG,
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 AITDL - Artificial Intelligence Technology & Deep Learning
 * ============================================
 * @books
 * - When Code Learned to Feel:
 *   The Day Code Took a Breath (Kindle)
 * - Code Without Limits:
 *   The End of Human Coding (Upcoming)
 * - Gaṇitsūtram:
 *   Golden Book of Vedic Mathematics (Upcoming)
 * ============================================
 * Updated: 2026-03-14 - Final UI Restoration Verified
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Header.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Footer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/ToolCard.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$NeuralNetwork$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/NeuralNetwork.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$TrustBar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/TrustBar.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/router.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
const CATEGORIES = [
    'All',
    'study',
    'writing',
    'coding',
    'productivity',
    'research',
    'maths',
    'india',
    'image',
    'video',
    'career'
];
const EXAMS = [
    'All',
    'JEE',
    'NEET',
    'UPSC',
    'SSC',
    'CBSE',
    'Boards'
];
const LANG_TEXT = {
    en: {
        hero: "India's No. 1 AI Command Center",
        sub: "Artificial Intelligence Technology & Deep Learning",
        search: 'Search 100+ AI tools...',
        category: 'Category',
        exam: 'Target Exam',
        pricing: 'Pricing',
        found: 'tools found',
        all: 'All',
        free: 'Free',
        freemium: 'Freemium',
        paid: 'Paid',
        stats: {
            tools: 'AI Tools',
            visited: 'Students Visited',
            free: 'Free',
            india: 'India First'
        },
        cmdHero: "EMPOWERING INDIA'S FUTURE WITH ADVANCED AI",
        cmdSub: "Command, Control, and Scale your AI potential with India's leading AI Command Center.",
        explore: 'EXPLORE PLATFORM',
        learn: 'LEARN MORE',
        originAll: 'All AI',
        originBharat: 'Bharat AI',
        originGlobal: 'Global AI'
    },
    hi: {
        hero: 'भारत का No. 1 AI कमांड सेंटर',
        sub: '1.4 अरब दिमागों को सशक्त बनाना',
        search: '100+ AI टूल्स खोजें...',
        category: 'श्रेणी',
        exam: 'परीक्षा',
        pricing: 'मूल्य',
        found: 'टूल्स मिले',
        all: 'सभी',
        free: 'मुफ्त',
        freemium: 'फ्रीमियम',
        paid: 'पेड',
        stats: {
            tools: 'AI Tools',
            visited: 'छात्र आए',
            free: 'मुफ्त',
            india: 'भारत प्रथम'
        },
        cmdHero: 'उन्नत AI के साथ भारत के भविष्य को सशक्त बनाना',
        cmdSub: 'भारत के अग्रणी AI कमांड सेंटर के साथ अपनी AI क्षमता को कमांड, कंट्रोल और स्केल करें।',
        explore: 'प्लेटफॉर्म देखें',
        learn: 'अधिक जानें',
        originAll: 'सभी AI',
        originBharat: 'भारत AI',
        originGlobal: 'वैश्विक AI'
    },
    sa: {
        hero: 'भारतस्य No. 1 AI कमांड केंद्रम्',
        sub: '१.४ अरब मेधाविनाम् शक्तिकरणम्',
        search: '100+ AI उपकरणानि अन्विष्यतु...',
        category: 'वर्गः',
        exam: 'परीक्षा',
        pricing: 'मूल्यम्',
        found: 'उपकरणानि',
        all: 'सर्वे',
        free: 'निःशुल्कम्',
        freemium: 'फ्रीमियम्',
        paid: 'सशुल्कम्',
        stats: {
            tools: 'AI उपकरणानि',
            visited: 'छात्राः आगताः',
            free: 'निःशुल्कम्',
            india: 'भारतम् प्रथमम्'
        },
        cmdHero: 'प्रगत-AI-तन्त्रेण भारतस्य भविष्यं सक्षमीकरणम्',
        cmdSub: 'भारतस्य प्रमुख-एआइ-आदेशकेन्द्रेण सह स्वकीय-एआइ-क्षमतायाः आदेशं, नियन्त्रणं, मापनं च कुर्वन्तु।',
        explore: 'मञ्चं अन्वेषयन्तु',
        learn: 'अधिकं जानन्तु',
        originAll: 'सर्वाणि AI',
        originBharat: 'भारत AI',
        originGlobal: 'वैश्विक AI'
    }
};
var __N_SSG = true;
function Home({ tools }) {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [uiMode, setUiMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('directory');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('grid');
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [exam, setExam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [pricing, setPricing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [compareList, setCompareList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filtered, setFiltered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(tools || []);
    const [visitorCount, setVisitorCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(8506);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const t = LANG_TEXT[lang] || LANG_TEXT.en;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Initial load from storage
            const savedLang = localStorage.getItem('aitdl_lang') || 'en';
            setLang(savedLang);
            const savedView = localStorage.getItem('aitdl_view') || 'grid';
            setViewMode(savedView);
            const savedOrigin = localStorage.getItem('aitdl_origin') || 'all';
            setOrigin(savedOrigin);
            // Stats
            const savedVisitors = localStorage.getItem('aitdl_visitors');
            const count = savedVisitors ? parseInt(savedVisitors) + 1 : 8506;
            setVisitorCount(count);
            localStorage.setItem('aitdl_visitors', count);
            const handleStorage = {
                "Home.useEffect.handleStorage": ()=>{
                    setLang(localStorage.getItem('aitdl_lang') || 'en');
                    setViewMode(localStorage.getItem('aitdl_view') || 'grid');
                    setOrigin(localStorage.getItem('aitdl_origin') || 'all');
                }
            }["Home.useEffect.handleStorage"];
            window.addEventListener('storage', handleStorage);
            return ({
                "Home.useEffect": ()=>window.removeEventListener('storage', handleStorage)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            let result = tools || [];
            if (origin === 'bharat') {
                result = result.filter({
                    "Home.useEffect": (tool)=>tool.category.includes('india')
                }["Home.useEffect"]);
            }
            if (category !== 'All') {
                result = result.filter({
                    "Home.useEffect": (tool)=>tool.category.includes(category)
                }["Home.useEffect"]);
            }
            if (exam !== 'All') {
                result = result.filter({
                    "Home.useEffect": (tool)=>tool.exam_tags.includes(exam)
                }["Home.useEffect"]);
            }
            if (pricing !== 'All') {
                result = result.filter({
                    "Home.useEffect": (tool)=>tool.pricing === pricing.toLowerCase()
                }["Home.useEffect"]);
            }
            if (search) {
                const q = search.toLowerCase();
                result = result.filter({
                    "Home.useEffect": (tool)=>tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.exam_tags.some({
                            "Home.useEffect": (tag)=>tag.toLowerCase().includes(q)
                        }["Home.useEffect"]) || tool.category.some({
                            "Home.useEffect": (cat)=>cat.toLowerCase().includes(q)
                        }["Home.useEffect"])
                }["Home.useEffect"]);
            }
            setFiltered(result);
        }
    }["Home.useEffect"], [
        search,
        category,
        exam,
        pricing,
        tools,
        origin
    ]);
    const handleCompare = (tool)=>{
        setCompareList((prev)=>{
            if (prev.find((t)=>t.id === tool.id)) {
                return prev.filter((t)=>t.id !== tool.id);
            }
            if (prev.length >= 3) return prev;
            return [
                ...prev,
                tool
            ];
        });
    };
    const filterBtn = (val, current, setter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>setter(val),
            style: {
                padding: '8px 20px',
                borderRadius: 12,
                border: '1px solid',
                borderColor: current === val ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                background: current === val ? 'rgba(255,107,53,0.1)' : 'rgba(255,255,255,0.03)',
                color: current === val ? 'var(--accent)' : 'var(--text2)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.3s var(--ease)'
            },
            className: "premium-filter-btn",
            children: val
        }, val, false, {
            fileName: "[project]/aitdl4/pages/index.js",
            lineNumber: 203,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: 'var(--bg)',
            color: 'var(--text)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "AITDL — India's AI Command Center"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Artificial Intelligence Technology & Deep Learning - Empowering India's Future with Advanced AI"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '64px 24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$NeuralNetwork$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1,
                            marginBottom: 80
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 24,
                                    display: 'flex',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 120,
                                        height: 120,
                                        filter: 'drop-shadow(0 0 30px var(--accent-glow))'
                                    },
                                    className: "logo-glow",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/logo-singularity.svg",
                                        alt: "AITDL Singularity",
                                        style: {
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/index.js",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'inline-block',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    letterSpacing: '0.15em',
                                    color: 'var(--accent)',
                                    background: 'var(--accent-glow)',
                                    border: '1px solid var(--accent)',
                                    borderRadius: 30,
                                    padding: '6px 20px',
                                    marginBottom: 32
                                },
                                children: "INDIA'S NO. 1 AI COMMAND CENTER"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: uiMode === 'command' ? 'clamp(48px, 10vw, 112px)' : 'clamp(42px, 10vw, 84px)',
                                    fontWeight: 950,
                                    lineHeight: 0.95,
                                    marginBottom: 24,
                                    letterSpacing: '-0.05em'
                                },
                                children: uiMode === 'command' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "pulse-glow",
                                    style: {
                                        color: 'var(--text)',
                                        background: 'linear-gradient(to bottom, #fff, #888)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    },
                                    children: t.cmdHero
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/index.js",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: "Right AI Tool"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--accent)',
                                                background: 'linear-gradient(to bottom, var(--text), var(--accent))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: "At The Right Time"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 20,
                                    color: 'var(--text2)',
                                    maxWidth: 700,
                                    margin: '0 auto 48px',
                                    lineHeight: 1.6
                                },
                                children: t.cmdSub
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 20,
                                    justifyContent: 'center',
                                    marginBottom: 64
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            padding: '20px 48px',
                                            background: 'var(--accent)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 50,
                                            fontSize: 13,
                                            fontWeight: 900,
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 40px var(--accent-glow)'
                                        },
                                        className: "btn-primary-glow",
                                        children: t.explore
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            padding: '20px 48px',
                                            background: 'transparent',
                                            color: 'var(--text)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 50,
                                            fontSize: 13,
                                            fontWeight: 800,
                                            cursor: 'pointer'
                                        },
                                        className: "btn-secondary-border",
                                        children: t.learn
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$TrustBar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 24,
                            marginBottom: 80,
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            {
                                label: t.stats.tools,
                                val: '100+',
                                color: 'var(--accent)'
                            },
                            {
                                label: t.stats.visited,
                                val: visitorCount.toLocaleString(),
                                color: '#00B4D8'
                            },
                            {
                                label: t.stats.free,
                                val: 'FREE',
                                color: '#22C55E'
                            },
                            {
                                label: t.stats.india,
                                val: '🇮🇳 BHARAT',
                                color: '#FF6B35'
                            }
                        ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-card",
                                style: {
                                    padding: 32,
                                    background: 'var(--bg2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 24,
                                    textAlign: 'center',
                                    transition: 'all 0.4s var(--ease)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 36,
                                            fontWeight: 950,
                                            color: stat.color,
                                            marginBottom: 8,
                                            fontFamily: 'Outfit'
                                        },
                                        children: stat.val
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: 'var(--text3)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        },
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    uiMode === 'directory' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 640,
                            margin: '0 auto 48px',
                            position: 'relative'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            placeholder: t.search,
                            style: {
                                width: '100%',
                                padding: '20px 28px',
                                background: 'rgba(13, 13, 21, 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 16,
                                fontSize: 16,
                                color: 'var(--text)',
                                outline: 'none',
                                transition: 'all 0.3s var(--ease)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            },
                            className: "premium-search"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/pages/index.js",
                            lineNumber: 345,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "floating-dock",
                        style: {
                            maxWidth: 900,
                            margin: '0 auto 48px',
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: 800,
                                            color: 'var(--text3)',
                                            marginBottom: 12,
                                            textTransform: 'uppercase'
                                        },
                                        children: t.category
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 364,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 10,
                                            overflowX: 'auto',
                                            paddingBottom: 4
                                        },
                                        children: CATEGORIES.map((c)=>filterBtn(c, category, setCategory))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 365,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    color: 'var(--text3)',
                                                    marginBottom: 12,
                                                    textTransform: 'uppercase'
                                                },
                                                children: t.exam
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 371,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8,
                                                    flexWrap: 'wrap'
                                                },
                                                children: EXAMS.map((e)=>filterBtn(e, exam, setExam))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 372,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 370,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    color: 'var(--text3)',
                                                    marginBottom: 12,
                                                    textTransform: 'uppercase'
                                                },
                                                children: t.pricing
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8
                                                },
                                                children: [
                                                    'All',
                                                    'Free',
                                                    'Freemium',
                                                    'Paid'
                                                ].map((p)=>filterBtn(p, pricing, setPricing))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 378,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 369,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text3)',
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'var(--accent)',
                                    fontWeight: 700
                                },
                                children: filtered.length
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            " ",
                            t.found
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 'var(--grid-gap)'
                        },
                        children: filtered.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                tool: tool,
                                viewMode: viewMode,
                                onCompare: handleCompare,
                                isSelected: compareList.some((t)=>t.id === tool.id)
                            }, tool.id, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            margin: '48px auto',
                            maxWidth: 600,
                            textAlign: 'center',
                            padding: '36px 32px',
                            borderRadius: 16,
                            border: '0.5px solid var(--border)',
                            background: 'var(--bg2)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: 'var(--accent)',
                                    border: '0.5px solid var(--accent)',
                                    borderRadius: 20,
                                    padding: '4px 14px',
                                    display: 'inline-block',
                                    marginBottom: 16
                                },
                                children: "Coming Soon"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 409,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: 'var(--text)',
                                    marginBottom: 10
                                },
                                children: "200+ tools being added"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 410,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: 'var(--text2)',
                                    lineHeight: 1.7
                                },
                                children: "Curating best AI tools across design, productivity, coding, research — verified for Indian users."
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            compareList.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--bg2)',
                    borderTop: '1px solid var(--accent)',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    zIndex: 200
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text2)'
                        },
                        children: [
                            compareList.length,
                            " tools selected"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 420,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/compare'),
                        style: {
                            padding: '8px 20px',
                            background: 'var(--accent)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer'
                        },
                        children: "Compare Now →"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 421,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCompareList([]),
                        style: {
                            padding: '8px 12px',
                            background: 'transparent',
                            color: 'var(--text3)',
                            border: '0.5px solid var(--border)',
                            borderRadius: 8,
                            fontSize: 12,
                            cursor: 'pointer'
                        },
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 422,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 419,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 426,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/index.js",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_s(Home, "iV1RBCEvAxZkqXc2Wi/PVABJfCs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/aitdl4/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/aitdl4/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/aitdl4/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/aitdl4/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c63657b0._.js.map