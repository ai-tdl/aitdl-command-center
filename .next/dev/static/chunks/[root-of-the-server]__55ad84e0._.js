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
"[project]/aitdl4/lib/seo.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalSEO",
    ()=>GlobalSEO,
    "PageSEO",
    ()=>PageSEO,
    "ToolSEO",
    ()=>ToolSEO
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$2f$dist$2f$pages$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next-seo/dist/pages.mjs [client] (ecmascript)");
;
const SITE_URL = 'https://aitdl.com';
const SITE_NAME = 'AITDL';
const AUTHOR = 'Jawahar Ramkripal Mallah';
const TWITTER = '@aitdl';
const DEFAULT_SEO = {
    title: "AITDL — India's #1 AI Command Center",
    titleTemplate: "%s | AITDL",
    description: "100+ verified AI tools for Indian students. JEE, NEET, UPSC ke liye best free AI tools — ek jagah. Artificial Intelligence Technology & Deep Learning.",
    canonical: SITE_URL,
    additionalMetaTags: [
        {
            name: 'author',
            content: AUTHOR
        },
        {
            name: 'keywords',
            content: 'AI tools India, free AI tools JEE NEET UPSC, Indian AI platform, Hindi AI tools, best AI tools students India, AITDL, artificial intelligence tools'
        },
        {
            name: 'theme-color',
            content: '#0A0A1F'
        },
        {
            name: 'application-name',
            content: SITE_NAME
        }
    ],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: SITE_URL,
        title: "AITDL — India's #1 AI Command Center",
        description: "100+ verified AI tools for Indian students. JEE, NEET, UPSC ke liye best free AI tools.",
        images: [
            {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'AITDL — India AI Command Center',
                type: 'image/png'
            }
        ],
        site_name: SITE_NAME
    },
    twitter: {
        handle: TWITTER,
        site: TWITTER,
        cardType: 'summary_large_image'
    }
};
const GlobalSEO = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$2f$dist$2f$pages$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["generateDefaultSeo"])(DEFAULT_SEO);
_c = GlobalSEO;
const PageSEO = ({ title, description, slug, image })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$2f$dist$2f$pages$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["generateNextSeo"])({
        title,
        description,
        canonical: `${SITE_URL}${slug}`,
        openGraph: {
            url: `${SITE_URL}${slug}`,
            title,
            description,
            images: image ? [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ] : undefined
        }
    });
_c1 = PageSEO;
const ToolSEO = ({ tool })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$2f$dist$2f$pages$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["generateNextSeo"])({
        title: `${tool.name} — Free AI Tool`,
        description: `${tool.description} India Score: ${tool.india_score}/5. ${tool.pricing} tool for Indian students. Best for: ${tool.exam_tags.join(', ')}.`,
        canonical: `${SITE_URL}/tools/${tool.slug}`,
        openGraph: {
            url: `${SITE_URL}/tools/${tool.slug}`,
            title: tool.name,
            description: tool.description,
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: tool.name
                }
            ]
        }
    });
_c2 = ToolSEO;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "GlobalSEO");
__turbopack_context__.k.register(_c1, "PageSEO");
__turbopack_context__.k.register(_c2, "ToolSEO");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
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
// ─── Config ────────────────────────────────────────────────────────────────
const THEMES = [
    {
        id: 'dark',
        label: 'Dark',
        icon: '🌙',
        preview: [
            '#030306',
            '#080812',
            '#FF6B35'
        ],
        desc: 'Classic dark mode'
    },
    {
        id: 'midnight',
        label: 'Midnight',
        icon: '🌌',
        preview: [
            '#000000',
            '#05050A',
            '#FF6B35'
        ],
        desc: 'Pure black OLED'
    },
    {
        id: 'glass',
        label: 'Glass',
        icon: '💎',
        preview: [
            '#030306',
            'rgba(255,255,255,0.05)',
            '#FF6B35'
        ],
        desc: 'Frosted glass'
    },
    {
        id: 'light',
        label: 'Light',
        icon: '☀️',
        preview: [
            '#F8F7F4',
            '#FFFFFF',
            '#FF6B35'
        ],
        desc: 'Clean & bright'
    }
];
const LANGUAGES = [
    {
        id: 'en',
        label: 'English',
        flag: '🇬🇧'
    },
    {
        id: 'hi',
        label: 'हिंदी',
        flag: '🇮🇳'
    },
    {
        id: 'sa',
        label: 'संस्कृत',
        flag: '🕉️'
    }
];
const FONT_SIZES = [
    {
        id: 'small',
        label: 'A',
        size: '13px',
        scale: 0.87
    },
    {
        id: 'medium',
        label: 'A',
        size: '15px',
        scale: 1
    },
    {
        id: 'large',
        label: 'A',
        size: '17px',
        scale: 1.13
    }
];
const VIEWS = [
    {
        id: 'grid',
        icon: '⊞',
        label: 'Grid'
    },
    {
        id: 'list',
        icon: '☰',
        label: 'List'
    }
];
const MODES = [
    {
        id: 'directory',
        icon: '📂',
        label: 'Directory'
    },
    {
        id: 'command',
        icon: '⚡',
        label: 'Command'
    }
];
const ACCENTS = [
    {
        hex: '#FF6B35',
        name: 'Ember'
    },
    {
        hex: '#00B4D8',
        name: 'Cyan'
    },
    {
        hex: '#34C759',
        name: 'Leaf'
    },
    {
        hex: '#FFD700',
        name: 'Gold'
    },
    {
        hex: '#BF5AF2',
        name: 'Violet'
    },
    {
        hex: '#FF2D55',
        name: 'Rose'
    },
    {
        hex: '#ffffff',
        name: 'White'
    }
];
// ─── Helpers ───────────────────────────────────────────────────────────────
const ls = {
    get: (k, def)=>{
        try {
            return localStorage.getItem(k) || def;
        } catch  {
            return def;
        }
    },
    set: (k, v)=>{
        try {
            localStorage.setItem(k, v);
        } catch  {}
    }
};
function SettingsPanel({ isOpen, onClose, lang, setLang }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('grid');
    const [uiMode, setUiMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('directory');
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('medium');
    const [indiaMode, setIndiaMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accent, setAccent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('#FF6B35');
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('appearance') // appearance | language | more
    ;
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Load from storage ──────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPanel.useEffect": ()=>{
            const sTheme = ls.get('aitdl_theme', 'light');
            const sLang = ls.get('aitdl_lang', 'en');
            const sView = ls.get('aitdl_view', 'grid');
            const sUiMode = ls.get('aitdl_ui_mode', 'directory');
            const sFontSize = ls.get('aitdl_fontsize', 'medium');
            const sIndia = ls.get('aitdl_india_mode', 'false') === 'true';
            const sAccent = ls.get('aitdl_accent', '#FF6B35');
            setTheme(sTheme);
            applyTheme(sTheme, false);
            setLang(sLang);
            setView(sView);
            setUiMode(sUiMode);
            setFontSize(sFontSize);
            applyFontSize(sFontSize, false);
            setIndiaMode(sIndia);
            setAccent(sAccent);
            applyAccent(sAccent, false);
        }
    }["SettingsPanel.useEffect"], []);
    // ── ESC to close ──────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPanel.useEffect": ()=>{
            const fn = {
                "SettingsPanel.useEffect.fn": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["SettingsPanel.useEffect.fn"];
            if (isOpen) window.addEventListener('keydown', fn);
            return ({
                "SettingsPanel.useEffect": ()=>window.removeEventListener('keydown', fn)
            })["SettingsPanel.useEffect"];
        }
    }["SettingsPanel.useEffect"], [
        isOpen
    ]);
    // ── Apply fns ─────────────────────────────────────────────────────────
    const applyTheme = (t, save = true)=>{
        document.documentElement.setAttribute('data-theme', t);
        setTheme(t);
        if (save) {
            ls.set('aitdl_theme', t);
            dispatch();
        }
    };
    const applyFontSize = (fs, save = true)=>{
        const conf = FONT_SIZES.find((f)=>f.id === fs);
        if (conf) document.documentElement.style.setProperty('--font-base', conf.size);
        setFontSize(fs);
        if (save) {
            ls.set('aitdl_fontsize', fs);
            dispatch();
        }
    };
    const applyAccent = (a, save = true)=>{
        const glow = a === '#ffffff' ? 'rgba(255,255,255,0.2)' : a + '40';
        document.documentElement.style.setProperty('--accent', a);
        document.documentElement.style.setProperty('--accent-glow', glow);
        setAccent(a);
        if (save) {
            ls.set('aitdl_accent', a);
            dispatch();
        }
    };
    const applyLang = (l)=>{
        setLang(l);
        ls.set('aitdl_lang', l);
        dispatch();
    };
    const applyView = (v)=>{
        setView(v);
        ls.set('aitdl_view', v);
        dispatch();
    };
    const applyUiMode = (m)=>{
        setUiMode(m);
        ls.set('aitdl_ui_mode', m);
        dispatch();
    };
    const applyIndiaMode = (val)=>{
        setIndiaMode(val);
        ls.set('aitdl_india_mode', val);
        ls.set('aitdl_origin', val ? 'bharat' : 'all');
        dispatch();
    };
    const dispatch = ()=>window.dispatchEvent(new Event('storage'));
    const resetAll = ()=>{
        applyTheme('dark');
        applyLang('en');
        applyView('grid');
        applyUiMode('directory');
        applyFontSize('medium');
        applyIndiaMode(false);
        applyAccent('#FF6B35');
    };
    if (!isOpen) return null;
    // ── Render ────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClose,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Settings",
        className: "jsx-d4ec30e04add670" + " " + "sp-overlay",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                ref: panelRef,
                className: "jsx-d4ec30e04add670" + " " + "sp-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d4ec30e04add670" + " " + "sp-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d4ec30e04add670" + " " + "sp-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-d4ec30e04add670" + " " + "sp-title-icon",
                                        children: "⚙️"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-d4ec30e04add670",
                                        children: "Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d4ec30e04add670" + " " + "sp-header-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: resetAll,
                                        title: "Reset all to defaults",
                                        className: "jsx-d4ec30e04add670" + " " + "sp-reset",
                                        children: "↺ Reset"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        "aria-label": "Close settings",
                                        className: "jsx-d4ec30e04add670" + " " + "sp-close",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d4ec30e04add670" + " " + "sp-tabs",
                        children: [
                            {
                                id: 'appearance',
                                icon: '🎨',
                                label: 'Theme'
                            },
                            {
                                id: 'language',
                                icon: '🌐',
                                label: 'Language'
                            },
                            {
                                id: 'more',
                                icon: '⊞',
                                label: 'More'
                            }
                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab(t.id),
                                className: "jsx-d4ec30e04add670" + " " + `sp-tab ${tab === t.id ? 'active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-d4ec30e04add670",
                                        children: t.icon
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-d4ec30e04add670",
                                        children: t.label
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, t.id, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d4ec30e04add670" + " " + "sp-content",
                        children: [
                            tab === 'appearance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-d4ec30e04add670",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                                children: "Interface Theme"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 209,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-theme-grid",
                                                children: THEMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>applyTheme(t.id),
                                                        title: t.desc,
                                                        className: "jsx-d4ec30e04add670" + " " + `sp-theme-card ${theme === t.id ? 'active' : ''}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    background: t.preview[0]
                                                                },
                                                                className: "jsx-d4ec30e04add670" + " " + "sp-theme-preview",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            background: t.preview[1]
                                                                        },
                                                                        className: "jsx-d4ec30e04add670" + " " + "sp-prev-bar",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    background: t.preview[2]
                                                                                },
                                                                                className: "jsx-d4ec30e04add670" + " " + "sp-prev-dot"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                                lineNumber: 221,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    background: t.preview[2],
                                                                                    opacity: 0.4
                                                                                },
                                                                                className: "jsx-d4ec30e04add670" + " " + "sp-prev-dot"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                                lineNumber: 222,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                        lineNumber: 220,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            background: t.preview[1]
                                                                        },
                                                                        className: "jsx-d4ec30e04add670" + " " + "sp-prev-card"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                        lineNumber: 224,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            background: t.preview[1]
                                                                        },
                                                                        className: "jsx-d4ec30e04add670" + " " + "sp-prev-card"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                        lineNumber: 225,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                lineNumber: 219,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-d4ec30e04add670" + " " + "sp-theme-card-footer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d4ec30e04add670" + " " + "sp-theme-icon",
                                                                        children: t.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                        lineNumber: 228,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d4ec30e04add670" + " " + "sp-theme-label",
                                                                        children: t.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                        lineNumber: 229,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    theme === t.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d4ec30e04add670" + " " + "sp-check",
                                                                        children: "✓"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                        lineNumber: 230,
                                                                        columnNumber: 44
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                lineNumber: 227,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, t.id, true, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 212,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-d4ec30e04add670",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                                children: "Font Size"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 239,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-font-row",
                                                children: FONT_SIZES.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>applyFontSize(f.id),
                                                        style: {
                                                            fontSize: 12 + i * 3
                                                        },
                                                        title: f.size,
                                                        className: "jsx-d4ec30e04add670" + " " + `sp-font-btn ${fontSize === f.id ? 'active' : ''}`,
                                                        children: [
                                                            f.label,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-d4ec30e04add670" + " " + "sp-font-size-hint",
                                                                children: f.size
                                                            }, void 0, false, {
                                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                                lineNumber: 250,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, f.id, true, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 242,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-d4ec30e04add670",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                                children: "Accent Color"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-accent-row",
                                                children: ACCENTS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        style: {
                                                            background: a.hex
                                                        },
                                                        onClick: ()=>applyAccent(a.hex),
                                                        title: a.name,
                                                        "aria-label": `Accent: ${a.name}`,
                                                        className: "jsx-d4ec30e04add670" + " " + `sp-accent-dot ${accent === a.hex ? 'active' : ''}`,
                                                        children: accent === a.hex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-d4ec30e04add670" + " " + "sp-dot-check",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                            lineNumber: 269,
                                                            columnNumber: 44
                                                        }, this)
                                                    }, a.hex, false, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 261,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-accent-name",
                                                children: ACCENTS.find((a)=>a.hex === accent)?.name || 'Custom'
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            tab === 'language' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "jsx-d4ec30e04add670",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                            children: "Display Language"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d4ec30e04add670" + " " + "sp-lang-list",
                                            children: LANGUAGES.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>applyLang(l.id),
                                                    className: "jsx-d4ec30e04add670" + " " + `sp-lang-card ${lang === l.id ? 'active' : ''}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-d4ec30e04add670" + " " + "sp-lang-flag",
                                                            children: l.flag
                                                        }, void 0, false, {
                                                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                            lineNumber: 292,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-d4ec30e04add670" + " " + "sp-lang-label",
                                                            children: l.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                            lineNumber: 293,
                                                            columnNumber: 23
                                                        }, this),
                                                        lang === l.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-d4ec30e04add670" + " " + "sp-check-right",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                            lineNumber: 294,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, l.id, true, {
                                                    fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                            lineNumber: 285,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false),
                            tab === 'more' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-d4ec30e04add670",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                                children: "Card View"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-pill-row",
                                                children: VIEWS.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>applyView(v.id),
                                                        className: "jsx-d4ec30e04add670" + " " + `sp-pill ${view === v.id ? 'active' : ''}`,
                                                        children: [
                                                            v.icon,
                                                            " ",
                                                            v.label
                                                        ]
                                                    }, v.id, true, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-d4ec30e04add670",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                                children: "Platform Mode"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 323,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-pill-row",
                                                children: MODES.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>applyUiMode(m.id),
                                                        className: "jsx-d4ec30e04add670" + " " + `sp-pill ${uiMode === m.id ? 'active' : ''}`,
                                                        children: [
                                                            m.icon,
                                                            " ",
                                                            m.label
                                                        ]
                                                    }, m.id, true, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 326,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 324,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-d4ec30e04add670" + " " + "sp-toggle-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d4ec30e04add670",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            marginBottom: 2
                                                        },
                                                        className: "jsx-d4ec30e04add670" + " " + "sp-section-label",
                                                        children: "🇮🇳 India Mode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 340,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-d4ec30e04add670" + " " + "sp-toggle-desc",
                                                        children: "Show only India-optimized tools"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 341,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 339,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-d4ec30e04add670" + " " + "sp-switch",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: indiaMode,
                                                        onChange: (e)=>applyIndiaMode(e.target.checked),
                                                        className: "jsx-d4ec30e04add670"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 344,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-d4ec30e04add670" + " " + "sp-slider"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                        lineNumber: 349,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d4ec30e04add670" + " " + "sp-footer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resetAll,
                            className: "jsx-d4ec30e04add670" + " " + "sp-full-reset",
                            children: "↺ Reset all to defaults"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/SettingsPanel.js",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "d4ec30e04add670",
                children: '.sp-overlay.jsx-d4ec30e04add670{z-index:2000;-webkit-backdrop-filter:blur(6px);background:#00000080;justify-content:flex-end;align-items:flex-start;padding:16px;animation:.18s forwards sp-fade;display:flex;position:fixed;inset:0}@keyframes sp-fade{0%{opacity:0}to{opacity:1}}.sp-panel.jsx-d4ec30e04add670{background:var(--bg-secondary);border:1px solid var(--border);transform-origin:100% 0;border-radius:20px;flex-direction:column;width:340px;max-height:calc(100vh - 32px);animation:.2s cubic-bezier(.34,1.56,.64,1) forwards sp-slide;display:flex;overflow:hidden;box-shadow:0 24px 80px #0009,0 0 0 1px #ffffff0a}@keyframes sp-slide{0%{opacity:0;transform:scale(.92)translateY(-8px)}to{opacity:1;transform:scale(1)translateY(0)}}.sp-header.jsx-d4ec30e04add670{border-bottom:1px solid var(--border);flex-shrink:0;justify-content:space-between;align-items:center;padding:18px 20px 14px;display:flex}.sp-title.jsx-d4ec30e04add670{color:var(--text-primary);letter-spacing:-.02em;align-items:center;gap:10px;font-size:16px;font-weight:800;display:flex}.sp-title-icon.jsx-d4ec30e04add670{font-size:18px}.sp-header-actions.jsx-d4ec30e04add670{align-items:center;gap:8px;display:flex}.sp-reset.jsx-d4ec30e04add670{border:1px solid var(--border);color:var(--text-tertiary);cursor:pointer;letter-spacing:.02em;background:0 0;border-radius:8px;padding:5px 10px;font-size:11px;font-weight:700;transition:all .2s}.sp-reset.jsx-d4ec30e04add670:hover{color:var(--accent);border-color:var(--accent)}.sp-close.jsx-d4ec30e04add670{background:var(--bg-tertiary);border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;border-radius:8px;justify-content:center;align-items:center;width:28px;height:28px;font-size:12px;transition:all .2s;display:flex}.sp-close.jsx-d4ec30e04add670:hover{color:#f44;background:#ff00001a;border-color:#f003}.sp-tabs.jsx-d4ec30e04add670{flex-shrink:0;gap:4px;padding:10px 12px 4px;display:flex}.sp-tab.jsx-d4ec30e04add670{color:var(--text-tertiary);cursor:pointer;letter-spacing:.02em;background:0 0;border:1px solid #0000;border-radius:12px;flex-direction:column;flex:1;align-items:center;gap:2px;padding:8px 4px;font-size:11px;font-weight:700;transition:all .2s;display:flex}.sp-tab.jsx-d4ec30e04add670 span.jsx-d4ec30e04add670:first-child{font-size:16px}.sp-tab.jsx-d4ec30e04add670:hover{color:var(--text-secondary);background:var(--bg-tertiary)}.sp-tab.active.jsx-d4ec30e04add670{background:var(--bg-tertiary);border-color:var(--border);color:var(--accent);box-shadow:0 2px 8px #0003}.sp-content.jsx-d4ec30e04add670{flex-direction:column;flex:1;gap:24px;padding:16px;display:flex;overflow-y:auto}.sp-content.jsx-d4ec30e04add670::-webkit-scrollbar{width:4px}.sp-content.jsx-d4ec30e04add670::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}.sp-section-label.jsx-d4ec30e04add670{color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.12em;margin-bottom:10px;font-size:10px;font-weight:800}.sp-theme-grid.jsx-d4ec30e04add670{grid-template-columns:1fr 1fr;gap:8px;display:grid}.sp-theme-card.jsx-d4ec30e04add670{background:var(--bg-tertiary);border:2px solid var(--border);cursor:pointer;text-align:left;border-radius:14px;padding:0;transition:all .2s;overflow:hidden}.sp-theme-card.jsx-d4ec30e04add670:hover{border-color:#ffffff26;transform:translateY(-2px);box-shadow:0 8px 20px #0000004d}.sp-theme-card.active.jsx-d4ec30e04add670{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),0 8px 24px var(--accent-glow)}.sp-theme-preview.jsx-d4ec30e04add670{border-radius:12px 12px 0 0;flex-direction:column;gap:4px;height:64px;padding:6px;display:flex}.sp-prev-bar.jsx-d4ec30e04add670{border-radius:4px;align-items:center;gap:3px;height:10px;padding:0 5px;display:flex}.sp-prev-dot.jsx-d4ec30e04add670{border-radius:50%;flex-shrink:0;width:4px;height:4px}.sp-prev-card.jsx-d4ec30e04add670{opacity:.7;border-radius:4px;height:12px}.sp-theme-card-footer.jsx-d4ec30e04add670{align-items:center;gap:6px;padding:8px 10px;display:flex}.sp-theme-icon.jsx-d4ec30e04add670{font-size:14px}.sp-theme-label.jsx-d4ec30e04add670{color:var(--text-secondary);flex:1;font-size:12px;font-weight:700}.sp-theme-card.active.jsx-d4ec30e04add670 .sp-theme-label.jsx-d4ec30e04add670{color:var(--accent)}.sp-check.jsx-d4ec30e04add670{color:var(--accent);font-size:11px;font-weight:900}.sp-font-row.jsx-d4ec30e04add670{gap:8px;display:flex}.sp-font-btn.jsx-d4ec30e04add670{background:var(--bg-tertiary);border:1.5px solid var(--border);color:var(--text-secondary);cursor:pointer;border-radius:12px;flex-direction:column;flex:1;align-items:center;gap:2px;padding:12px 8px;font-family:serif;font-weight:800;line-height:1;transition:all .2s;display:flex}.sp-font-btn.jsx-d4ec30e04add670:hover{border-color:#fff3}.sp-font-btn.active.jsx-d4ec30e04add670{border-color:var(--accent);background:var(--accent-glow);color:var(--accent)}.sp-font-size-hint.jsx-d4ec30e04add670{opacity:.5;letter-spacing:.05em;font-family:monospace;font-size:9px;font-weight:600}.sp-accent-row.jsx-d4ec30e04add670{flex-wrap:wrap;gap:8px;display:flex}.sp-accent-dot.jsx-d4ec30e04add670{cursor:pointer;color:#000;border:2px solid #0000;border-radius:50%;justify-content:center;align-items:center;width:32px;height:32px;font-size:11px;font-weight:900;transition:all .2s;display:flex;box-shadow:0 2px 8px #0000004d}.sp-accent-dot.jsx-d4ec30e04add670:hover{transform:scale(1.15)}.sp-accent-dot.active.jsx-d4ec30e04add670{border-color:#fff;transform:scale(1.15);box-shadow:0 0 0 4px #ffffff26,0 4px 12px #0006}.sp-dot-check.jsx-d4ec30e04add670{color:#000;mix-blend-mode:difference;font-size:10px}.sp-accent-name.jsx-d4ec30e04add670{color:var(--accent);letter-spacing:.04em;margin-top:6px;font-size:11px;font-weight:700}.sp-lang-list.jsx-d4ec30e04add670{flex-direction:column;gap:6px;display:flex}.sp-lang-card.jsx-d4ec30e04add670{background:var(--bg-tertiary);border:1.5px solid var(--border);cursor:pointer;text-align:left;border-radius:12px;align-items:center;gap:12px;padding:12px 14px;transition:all .2s;display:flex}.sp-lang-card.jsx-d4ec30e04add670:hover{border-color:#ffffff26}.sp-lang-card.active.jsx-d4ec30e04add670{border-color:var(--accent);background:var(--accent-glow)}.sp-lang-flag.jsx-d4ec30e04add670{font-size:20px}.sp-lang-label.jsx-d4ec30e04add670{color:var(--text-secondary);flex:1;font-size:14px;font-weight:700}.sp-lang-card.active.jsx-d4ec30e04add670 .sp-lang-label.jsx-d4ec30e04add670{color:var(--accent)}.sp-check-right.jsx-d4ec30e04add670{color:var(--accent);font-size:14px;font-weight:900}.sp-pill-row.jsx-d4ec30e04add670{gap:8px;display:flex}.sp-pill.jsx-d4ec30e04add670{background:var(--bg-tertiary);border:1.5px solid var(--border);color:var(--text-secondary);cursor:pointer;border-radius:12px;flex:1;justify-content:center;align-items:center;gap:5px;padding:10px;font-size:12px;font-weight:700;transition:all .2s;display:flex}.sp-pill.jsx-d4ec30e04add670:hover{border-color:#fff3}.sp-pill.active.jsx-d4ec30e04add670{border-color:var(--accent);background:var(--accent-glow);color:var(--accent)}.sp-toggle-row.jsx-d4ec30e04add670{justify-content:space-between;align-items:center;gap:16px;display:flex}.sp-toggle-desc.jsx-d4ec30e04add670{color:var(--text-tertiary);font-size:11px}.sp-switch.jsx-d4ec30e04add670{flex-shrink:0;width:44px;height:24px;display:inline-block;position:relative}.sp-switch.jsx-d4ec30e04add670 input.jsx-d4ec30e04add670{opacity:0;width:0;height:0}.sp-slider.jsx-d4ec30e04add670{cursor:pointer;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:34px;transition:all .3s;position:absolute;inset:0}.sp-slider.jsx-d4ec30e04add670:before{content:"";background:var(--text-tertiary);border-radius:50%;width:16px;height:16px;transition:all .3s;position:absolute;bottom:3px;left:3px}input.jsx-d4ec30e04add670:checked+.sp-slider.jsx-d4ec30e04add670{background:var(--accent);border-color:var(--accent)}input.jsx-d4ec30e04add670:checked+.sp-slider.jsx-d4ec30e04add670:before{background:#fff;transform:translate(20px)}.sp-footer.jsx-d4ec30e04add670{border-top:1px solid var(--border);flex-shrink:0;padding:12px 16px}.sp-full-reset.jsx-d4ec30e04add670{border:1px solid var(--border);width:100%;color:var(--text-tertiary);cursor:pointer;background:0 0;border-radius:10px;padding:10px;font-size:12px;font-weight:700;transition:all .2s}.sp-full-reset.jsx-d4ec30e04add670:hover{color:#f44;background:#ff44440d;border-color:#f44}@media (width<=480px){.sp-overlay.jsx-d4ec30e04add670{justify-content:stretch;align-items:flex-end;padding:0}.sp-panel.jsx-d4ec30e04add670{border-radius:20px 20px 0 0;width:100%;max-height:80vh;animation:.25s cubic-bezier(.34,1.56,.64,1) forwards sp-slide-up}@keyframes sp-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/SettingsPanel.js",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s(SettingsPanel, "2+0OVRHO6zNYS53X+FIyahStZRQ=");
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
 * @copyright © 2026 All Rights Reserved
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
            background: 'var(--bg-primary-blur)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '0 var(--header-px, 24px)',
            transition: 'background 0.3s ease, border-color 0.3s ease'
        },
        className: "jsx-f0fc774571372071",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 'var(--header-height, 80px)'
                },
                className: "jsx-f0fc774571372071",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            textDecoration: 'none'
                        },
                        title: "AITDL — India's AI Command Center Home",
                        "aria-label": "AITDL Home",
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
                                className: "jsx-f0fc774571372071" + " " + "logo-glow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo-singularity.svg",
                                    alt: "AITDL Singularity",
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 0 10px var(--accent-glow))'
                                    },
                                    className: "jsx-f0fc774571372071"
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
                                className: "jsx-f0fc774571372071" + " " + "logo-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 22,
                                            fontWeight: 950,
                                            color: 'var(--text-primary)',
                                            letterSpacing: '-0.03em',
                                            fontFamily: 'Outfit',
                                            lineHeight: 1
                                        },
                                        className: "jsx-f0fc774571372071",
                                        children: [
                                            "AITDL",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--accent)'
                                                },
                                                className: "jsx-f0fc774571372071",
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
                                            color: 'var(--text-tertiary)',
                                            letterSpacing: '0.08em',
                                            marginTop: 4,
                                            textTransform: 'uppercase'
                                        },
                                        className: "jsx-f0fc774571372071",
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
                            gap: 'var(--nav-gap, 24px)'
                        },
                        className: "jsx-f0fc774571372071",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 'var(--nav-gap, 16px)',
                                    alignItems: 'center'
                                },
                                className: "jsx-f0fc774571372071",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/ai-battle",
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: 'var(--text-secondary)',
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
                                            color: 'var(--text-secondary)',
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
                                            color: 'var(--text-secondary)',
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
                                className: "jsx-f0fc774571372071",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSettingsOpen(true),
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        fontSize: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s var(--ease)'
                                    },
                                    "aria-label": "Open Settings",
                                    className: "jsx-f0fc774571372071" + " " + "gear-btn",
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
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "f0fc774571372071",
                children: ".nav-link.jsx-f0fc774571372071:hover{color:var(--accent);background:#ffffff08}.gear-btn.jsx-f0fc774571372071:hover{border-color:var(--accent);box-shadow:0 0 15px var(--accent-glow);transform:rotate(45deg)}@media (width<=768px){.jsx-f0fc774571372071:root{--header-height:64px;--header-px:12px;--nav-gap:8px}.logo-text.jsx-f0fc774571372071{display:none}.nav-link.jsx-f0fc774571372071{padding:6px 8px!important;font-size:12px!important}.gear-btn.jsx-f0fc774571372071{width:36px!important;height:36px!important;font-size:16px!important}}"
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
"[project]/aitdl4/data/techHistory.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BHARAT_LEGACY",
    ()=>BHARAT_LEGACY,
    "TECH_HISTORY",
    ()=>TECH_HISTORY,
    "getRandomBharatFact",
    ()=>getRandomBharatFact,
    "getTodayFact",
    ()=>getTodayFact
]);
const BHARAT_LEGACY = [
    {
        era: '3rd Century BCE',
        person: 'Acharya Pingala',
        title: 'Father of Binary Logic',
        fact: 'Pingala described the world\'s first binary system in Chandahshastra — Laghu (0) and Guru (1). This IS the 0 and 1 inside every computer chip on Earth today.',
        connection: 'Every transistor switching ON/OFF is Pingala\'s binary in silicon. 3 billion transistors per chip — all Pingala\'s logic.'
    },
    {
        era: '4th Century BCE',
        person: 'Acharya Panini',
        title: 'World\'s First Programmer',
        fact: 'Panini\'s Ashtadhyayi contains ~4,000 sutras working as an algorithm to generate every valid Sanskrit word. NASA researcher Rick Briggs (1985) proved Sanskrit grammar is identical to Semantic Nets in AI.',
        connection: 'Backus-Naur Form used in C, Java, Python is now called Panini-Backus Form by scholars.'
    },
    {
        era: '499 CE',
        person: 'Aryabhata',
        title: 'Pioneer of Zero & Recursion',
        fact: 'Aryabhata formalized Zero (Shunya) with defined arithmetic. His Kuttaka algorithm is a direct ancestor of modern cryptographic recursive algorithms.',
        connection: 'Without zero, binary is impossible. Every bit in every computer is built on Aryabhata\'s zero.'
    },
    {
        era: '628 CE',
        person: 'Brahmagupta',
        title: 'Defined Zero\'s Arithmetic',
        fact: 'Brahmasphutasiddhanta gave the world formal rules for arithmetic with zero. Al-Khwarizmi — whose name gave us "Algorithm" — directly translated this work.',
        connection: 'The word Algorithm traces to Al-Khwarizmi who was translating Indian mathematical texts.'
    },
    {
        era: 'Ancient Vedic Age',
        person: 'Vedic Sutras',
        title: 'Ancient Sutra in Modern Chips',
        fact: 'Urdhva-Tiryagbhyam (Vertically and Crosswise) is actively used in VLSI chip design today. Vedic Multipliers are faster than Booth multipliers with lower power consumption.',
        connection: 'Used in DSP processors, FFT chips and AI accelerators in modern CPUs and GPUs worldwide.'
    },
    {
        era: 'Ancient India',
        person: 'Ancient Mathematicians',
        title: 'World\'s First Hash Function',
        fact: 'The Katapayadi system encoded numbers into Sanskrit words — making astronomical data memorable and verifiable. Direct precursor to modern hashing and encryption.',
        connection: 'SHA-256, MD5 and all modern hash functions mirror Katapayadi\'s encode-and-verify principle.'
    },
    {
        era: '3rd Century BCE',
        person: 'Acharya Pingala',
        title: 'Pascal\'s Triangle 1800 Years Early',
        fact: 'Pingala\'s Meru-Prastaara calculated all combinations of syllables — identical to Pascal\'s Triangle. Modern combinatorics and data structures trace back here.',
        connection: 'Hash tables, binary trees, sorting algorithms — all use combinatorics from Meru-Prastaara.'
    },
    {
        era: '2022 CE',
        person: 'Rishi Rajpopat — Cambridge',
        title: '2500-Year Algorithm Solved',
        fact: 'Rajpopat solved a 2,500-year-old rule conflict in Panini\'s grammar. A computer can now calculate any Sanskrit word — the world\'s oldest working algorithm.',
        connection: 'Rule-based NLP models combining human logic with machine learning — built on Panini\'s foundation.'
    },
    {
        era: '1960',
        person: 'TIFR Mumbai',
        title: 'India\'s First Indigenous Computer',
        fact: 'TIFRAC was India\'s first indigenous digital computer — built entirely by Indian scientists without foreign assistance.',
        connection: 'Proved India could build its own computing future — foundation of India\'s tech identity.'
    },
    {
        era: '1991',
        person: 'C-DAC India',
        title: 'Supercomputer After US Sanctions',
        fact: 'When the US denied India access to Cray supercomputers, India built PARAM 8000 in 3 years — one of the world\'s fastest computers at launch.',
        connection: 'PARAM series continues today — PARAM Siddhi AI is India\'s fastest AI supercomputer.'
    }
];
const TECH_HISTORY = {
    "01-01": {
        year: 1983,
        fact: "ARPANET switched to TCP/IP — the modern internet was born."
    },
    "01-02": {
        year: 1920,
        fact: "Karel Čapek introduced the word 'Robot' — the word that would define an era."
    },
    "01-03": {
        year: 1977,
        fact: "Apple Computer Inc. incorporated — Jobs and Wozniak changed personal computing forever."
    },
    "01-07": {
        year: 1956,
        fact: "IBM introduced its first hard disk — RAMAC 305 — storing 5MB across 50 spinning disks."
    },
    "01-09": {
        year: 2007,
        fact: "Steve Jobs unveiled the first iPhone — merging computer, phone and internet into one device."
    },
    "01-10": {
        year: 1946,
        fact: "ENIAC — world's first general-purpose computer — announced, weighing 30 tonnes."
    },
    "01-11": {
        year: 1787,
        fact: "Charles Babbage born — inventor of the Difference Engine, first mechanical computer concept."
    },
    "01-13": {
        year: 1966,
        fact: "ELIZA — first conversational AI chatbot — created by Joseph Weizenbaum at MIT."
    },
    "01-14": {
        year: 1952,
        fact: "Grace Hopper found the first computer bug — a real moth in the Harvard Mark II."
    },
    "01-15": {
        year: 2001,
        fact: "Wikipedia launched by Jimmy Wales — world's largest collaboratively-edited knowledge base."
    },
    "01-17": {
        year: 1920,
        fact: "Isaac Asimov born — his Three Laws of Robotics became foundation of AI ethics."
    },
    "01-22": {
        year: 1984,
        fact: "Apple Macintosh introduced — the iconic '1984' ad aired just once during the Super Bowl."
    },
    "01-24": {
        year: 1984,
        fact: "Apple Macintosh went on sale — Steve Jobs said it was 'insanely great.' It was."
    },
    "01-25": {
        year: 1961,
        fact: "First industrial robot Unimate installed at General Motors — factory automation began."
    },
    "01-26": {
        year: 1950,
        fact: "India became a Republic 🇮🇳 — a nation that would grow into the world's largest developer community."
    },
    "01-28": {
        year: 1986,
        fact: "Space Shuttle Challenger disaster — computers failed to flag O-ring data, a lesson in AI safety."
    },
    "01-30": {
        year: 1969,
        fact: "First ARPANET connection established between UCLA and Stanford Research Institute."
    },
    "02-04": {
        year: 2004,
        fact: "Facebook launched — algorithm-driven social network changed human communication forever."
    },
    "02-07": {
        year: 2011,
        fact: "IBM Watson defeated Jeopardy! champions — AI beat humans at general knowledge for the first time."
    },
    "02-10": {
        year: 1996,
        fact: "IBM Deep Blue defeated Kasparov in game 1 — first computer win against world chess champion."
    },
    "02-11": {
        year: 1847,
        fact: "Thomas Edison born — his invention philosophy of iteration mirrors modern AI training."
    },
    "02-12": {
        year: 1809,
        fact: "Charles Darwin born — his evolution theory directly inspired genetic algorithms in AI."
    },
    "02-15": {
        year: 1946,
        fact: "ENIAC formally dedicated at University of Pennsylvania — electronic computer age began."
    },
    "02-16": {
        year: 2011,
        fact: "IBM Watson won Jeopardy! grand championship — beating both human champions decisively."
    },
    "02-21": {
        year: 1965,
        fact: "Gordon Moore published Moore's Law — transistor count doubles every 2 years. Still holds."
    },
    "02-23": {
        year: 1955,
        fact: "Steve Jobs born — his obsession with simplicity changed how humans interact with computers."
    },
    "02-26": {
        year: 1993,
        fact: "Marc Andreessen released Mosaic — first graphical web browser, making internet visual."
    },
    "03-01": {
        year: 1954,
        fact: "IBM shipped its first commercial computer — the IBM 650 — to a paying customer."
    },
    "03-07": {
        year: 1876,
        fact: "Bell received patent for the telephone — the most valuable patent in history at the time."
    },
    "03-12": {
        year: 1989,
        fact: "Tim Berners-Lee proposed the World Wide Web to CERN — 'Vague but exciting.'"
    },
    "03-14": {
        year: 1879,
        fact: "Albert Einstein born — his equations are computed daily by GPS satellites worldwide."
    },
    "03-15": {
        year: 1956,
        fact: "Arthur Samuel's checkers program at IBM demonstrated machine learning for the first time."
    },
    "03-17": {
        year: 1948,
        fact: "Shockley, Bardeen and Brattain demonstrated the transistor at Bell Labs — computing changed forever."
    },
    "03-19": {
        year: 2026,
        fact: "AITDL launched on Hindu Nav Varsh VS 2083 — India's AI Tools Platform for 1.4 billion minds. 🇮🇳🙏"
    },
    "03-20": {
        year: 2023,
        fact: "GPT-4 released by OpenAI — multimodal AI that could see images and reason at human level."
    },
    "03-21": {
        year: 2006,
        fact: "Twitter founded — Jack Dorsey sent first tweet, creating real-time information network."
    },
    "03-30": {
        year: 1842,
        fact: "Ada Lovelace wrote the first computer algorithm for Babbage's Analytical Engine."
    },
    "03-31": {
        year: 1991,
        fact: "Linux kernel 0.01 compiled by Linus Torvalds — open source software revolution began."
    },
    "04-01": {
        year: 1976,
        fact: "Apple Computer founded by Jobs, Wozniak and Wayne in a garage in Los Altos."
    },
    "04-04": {
        year: 1975,
        fact: "Microsoft founded by Bill Gates and Paul Allen — 'A computer on every desk and in every home.'"
    },
    "04-10": {
        year: 2019,
        fact: "First black hole image released — processed by AI from petabytes of telescope data."
    },
    "04-12": {
        year: 1961,
        fact: "Gagarin became first human in space — Vostok 1's computer autonomously managed reentry."
    },
    "04-19": {
        year: 1965,
        fact: "Gordon Moore published Moore's Law — predicting exponential growth in computing power."
    },
    "04-22": {
        year: 1993,
        fact: "CERN announced the World Wide Web would be free and open — greatest gift in computing history."
    },
    "04-23": {
        year: 2005,
        fact: "First YouTube video uploaded — 'Me at the zoo.' The video AI era had begun."
    },
    "04-30": {
        year: 1993,
        fact: "CERN put the World Wide Web in the public domain — biggest open source decision in history."
    },
    "05-11": {
        year: 1997,
        fact: "IBM Deep Blue defeated Kasparov — first computer to win a full match against world chess champion."
    },
    "05-22": {
        year: 1973,
        fact: "Ethernet invented by Robert Metcalfe at Xerox PARC — local area networks were born."
    },
    "05-23": {
        year: 1995,
        fact: "Java released by Sun Microsystems — 'Write once, run anywhere.'"
    },
    "05-24": {
        year: 1844,
        fact: "First telegraph message sent: 'What hath God wrought' — digital communication began."
    },
    "05-29": {
        year: 1974,
        fact: "Cerf and Kahn published TCP/IP — the technical foundation of the modern internet."
    },
    "05-30": {
        year: 1854,
        fact: "George Boole published 'Laws of Thought' — Boolean algebra became basis of all digital logic."
    },
    "06-07": {
        year: 1954,
        fact: "Alan Turing died — the father of computer science and AI. He was only 41 years old."
    },
    "06-08": {
        year: 1955,
        fact: "Tim Berners-Lee born — he would grow up to invent the World Wide Web at age 34."
    },
    "06-10": {
        year: 1943,
        fact: "Colossus — first programmable electronic computer — became operational at Bletchley Park."
    },
    "06-23": {
        year: 1912,
        fact: "Alan Turing born — the man who conceived modern computing and asked 'Can machines think?'"
    },
    "06-29": {
        year: 2007,
        fact: "First iPhone went on sale — Steve Jobs called it '5 years ahead of anything else.' He was right."
    },
    "07-04": {
        year: 1997,
        fact: "NASA's Pathfinder rover landed on Mars — AI navigation drove autonomously on another planet."
    },
    "07-18": {
        year: 1968,
        fact: "Intel founded by Gordon Moore and Robert Noyce — Moore's Law made the digital world possible."
    },
    "07-20": {
        year: 1969,
        fact: "Apollo 11 landed on Moon — guided by a computer with less power than a modern calculator."
    },
    "08-06": {
        year: 1991,
        fact: "Tim Berners-Lee posted the first public description of the World Wide Web on Usenet."
    },
    "08-12": {
        year: 1981,
        fact: "IBM launched the IBM PC — standardizing personal computing and launching the software industry."
    },
    "08-15": {
        year: 1947,
        fact: "India gained independence 🇮🇳 — today India has the world's largest developer community."
    },
    "08-20": {
        year: 1977,
        fact: "Voyager 1 launched — still the most distant human-made object, computer still responds to Earth."
    },
    "08-24": {
        year: 1995,
        fact: "Windows 95 launched — millions queued outside stores. The GUI era had truly arrived."
    },
    "08-29": {
        year: 1997,
        fact: "Skynet 'becomes self-aware' in Terminator universe — the fictional date that haunts AI researchers."
    },
    "09-04": {
        year: 1998,
        fact: "Google founded by Page and Brin in a garage — the internet would never be the same."
    },
    "09-09": {
        year: 1947,
        fact: "Grace Hopper found the first computer bug — a real moth in the Harvard Mark II relay."
    },
    "09-12": {
        year: 1958,
        fact: "Jack Kilby demonstrated the first integrated circuit at Texas Instruments — the microchip was born."
    },
    "09-19": {
        year: 1982,
        fact: "First emoticon :-) proposed by Scott Fahlman — digital emotion began on Carnegie Mellon BBS."
    },
    "10-04": {
        year: 1957,
        fact: "Sputnik 1 launched — space race created the computing revolution that followed."
    },
    "10-05": {
        year: 2011,
        fact: "Steve Jobs died — he transformed personal computers, music, phones and tablets forever."
    },
    "10-09": {
        year: 2006,
        fact: "Google acquired YouTube for $1.65 billion — video platform would train AI on human behavior."
    },
    "10-29": {
        year: 1969,
        fact: "'LO' — first message sent over ARPANET. System crashed after just 2 letters."
    },
    "11-14": {
        year: 2022,
        fact: "ChatGPT launched by OpenAI — the AI revolution that changed everything began."
    },
    "11-15": {
        year: 1971,
        fact: "Intel 4004 — world's first commercial microprocessor — released. Personal computer era began."
    },
    "11-20": {
        year: 1985,
        fact: "Microsoft Windows 1.0 released — the OS that would define computing for 40 years."
    },
    "11-24": {
        year: 1859,
        fact: "Darwin published On The Origin of Species — evolutionary algorithms in AI inspired by this."
    },
    "11-30": {
        year: 2022,
        fact: "ChatGPT made public — in 5 days it reached 1 million users. Nothing was ever the same."
    },
    "12-04": {
        year: 2023,
        fact: "Google launched Gemini AI — multimodal AI that could see, hear and reason simultaneously."
    },
    "12-09": {
        year: 1968,
        fact: "Engelbart's Mother of All Demos showed mouse, hypertext, video conferencing — 50 years ahead."
    },
    "12-10": {
        year: 1815,
        fact: "Ada Lovelace born — world's first programmer, who envisioned AI could compose music."
    },
    "12-17": {
        year: 1903,
        fact: "Wright Brothers made first powered flight — aviation computers today run 100% autonomously."
    },
    "12-23": {
        year: 1947,
        fact: "Transistor invented at Bell Labs by Shockley, Bardeen, Brattain — foundation of all electronics."
    },
    "12-25": {
        year: 1990,
        fact: "Berners-Lee made first HTTP communication — the World Wide Web was born on Christmas Day."
    },
    "12-31": {
        year: 1999,
        fact: "Y2K — the world held its breath as midnight approached, fearing computers would fail. They didn't."
    }
};
function getTodayFact() {
    const t = new Date();
    const k = String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    return TECH_HISTORY[k] || {
        year: 1936,
        fact: "Alan Turing published 'On Computable Numbers' — theoretical foundation of every computer ever built."
    };
}
function getRandomBharatFact() {
    return BHARAT_LEGACY[Math.floor(Math.random() * BHARAT_LEGACY.length)];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/lib/vikramSamvat.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VS_FESTIVALS",
    ()=>VS_FESTIVALS,
    "VS_RITUS",
    ()=>VS_RITUS,
    "getVikramSamvatFull",
    ()=>getVikramSamvatFull
]);
const VS_2082_MONTHS = [
    {
        name: 'Chaitra',
        sk: 'चैत्र',
        start: '2025-03-30',
        end: '2025-04-27',
        ritu: 'Vasant'
    },
    {
        name: 'Vaishakha',
        sk: 'वैशाख',
        start: '2025-04-28',
        end: '2025-05-26',
        ritu: 'Vasant'
    },
    {
        name: 'Jyeshtha',
        sk: 'ज्येष्ठ',
        start: '2025-05-27',
        end: '2025-06-25',
        ritu: 'Grishma'
    },
    {
        name: 'Ashadha',
        sk: 'आषाढ़',
        start: '2025-06-26',
        end: '2025-07-24',
        ritu: 'Grishma'
    },
    {
        name: 'Shravana',
        sk: 'श्रावण',
        start: '2025-07-25',
        end: '2025-08-22',
        ritu: 'Varsha'
    },
    {
        name: 'Bhadrapada',
        sk: 'भाद्रपद',
        start: '2025-08-23',
        end: '2025-09-21',
        ritu: 'Varsha'
    },
    {
        name: 'Ashvina',
        sk: 'अश्विन',
        start: '2025-09-22',
        end: '2025-10-20',
        ritu: 'Sharad'
    },
    {
        name: 'Kartika',
        sk: 'कार्तिक',
        start: '2025-10-21',
        end: '2025-11-19',
        ritu: 'Sharad'
    },
    {
        name: 'Margashirsha',
        sk: 'मार्गशीर्ष',
        start: '2025-11-20',
        end: '2025-12-18',
        ritu: 'Hemant'
    },
    {
        name: 'Pausha',
        sk: 'पौष',
        start: '2025-12-19',
        end: '2026-01-16',
        ritu: 'Hemant'
    },
    {
        name: 'Magha',
        sk: 'माघ',
        start: '2026-01-17',
        end: '2026-02-15',
        ritu: 'Shishir'
    },
    {
        name: 'Phalguna',
        sk: 'फाल्गुन',
        start: '2026-02-16',
        end: '2026-03-18',
        ritu: 'Shishir'
    }
];
const VS_2083_MONTHS = [
    {
        name: 'Chaitra',
        sk: 'चैत्र',
        start: '2026-03-19',
        end: '2026-04-16',
        ritu: 'Vasant',
        navVarsh: true
    },
    {
        name: 'Vaishakha',
        sk: 'वैशाख',
        start: '2026-04-17',
        end: '2026-05-15',
        ritu: 'Vasant'
    },
    {
        name: 'Adhik Jyeshtha',
        sk: 'अधिक ज्येष्ठ',
        start: '2026-05-16',
        end: '2026-06-13',
        ritu: 'Grishma',
        adhik: true
    },
    {
        name: 'Nija Jyeshtha',
        sk: 'निज ज्येष्ठ',
        start: '2026-06-14',
        end: '2026-07-13',
        ritu: 'Grishma'
    },
    {
        name: 'Ashadha',
        sk: 'आषाढ़',
        start: '2026-07-14',
        end: '2026-08-11',
        ritu: 'Varsha'
    },
    {
        name: 'Shravana',
        sk: 'श्रावण',
        start: '2026-08-12',
        end: '2026-09-09',
        ritu: 'Varsha'
    },
    {
        name: 'Bhadrapada',
        sk: 'भाद्रपद',
        start: '2026-09-10',
        end: '2026-10-08',
        ritu: 'Varsha'
    },
    {
        name: 'Ashvina',
        sk: 'अश्विन',
        start: '2026-10-09',
        end: '2026-11-07',
        ritu: 'Sharad'
    },
    {
        name: 'Kartika',
        sk: 'कार्तिक',
        start: '2026-11-08',
        end: '2026-12-06',
        ritu: 'Sharad'
    },
    {
        name: 'Margashirsha',
        sk: 'मार्गशीर्ष',
        start: '2026-12-07',
        end: '2027-01-05',
        ritu: 'Hemant'
    },
    {
        name: 'Pausha',
        sk: 'पौष',
        start: '2027-01-06',
        end: '2027-02-03',
        ritu: 'Hemant'
    },
    {
        name: 'Magha',
        sk: 'माघ',
        start: '2027-02-04',
        end: '2027-03-04',
        ritu: 'Shishir'
    },
    {
        name: 'Phalguna',
        sk: 'फाल्गुन',
        start: '2027-03-05',
        end: '2027-03-29',
        ritu: 'Shishir'
    }
];
const VS_RITUS = [
    {
        name: 'Vasant',
        hi: 'वसंत',
        en: 'Spring',
        months: 'Chaitra–Vaishakha',
        icon: '🌸'
    },
    {
        name: 'Grishma',
        hi: 'ग्रीष्म',
        en: 'Summer',
        months: 'Jyeshtha–Ashadha',
        icon: '☀️'
    },
    {
        name: 'Varsha',
        hi: 'वर्षा',
        en: 'Monsoon',
        months: 'Shravana–Bhadrapada',
        icon: '🌧️'
    },
    {
        name: 'Sharad',
        hi: 'शरद',
        en: 'Autumn',
        months: 'Ashvina–Kartika',
        icon: '🍂'
    },
    {
        name: 'Hemant',
        hi: 'हेमंत',
        en: 'Pre-Winter',
        months: 'Margashirsha–Pausha',
        icon: '🌿'
    },
    {
        name: 'Shishir',
        hi: 'शिशिर',
        en: 'Winter',
        months: 'Magha–Phalguna',
        icon: '❄️'
    }
];
const VS_FESTIVALS = {
    'Chaitra': [
        'Gudi Padwa 🚩',
        'Ugadi',
        'Ram Navami',
        'Navratri'
    ],
    'Vaishakha': [
        'Akshaya Tritiya',
        'Baisakhi',
        'Buddha Purnima'
    ],
    'Jyeshtha': [
        'Ganga Dussehra',
        'Nirjala Ekadashi'
    ],
    'Ashadha': [
        'Guru Purnima',
        'Rath Yatra'
    ],
    'Shravana': [
        'Raksha Bandhan 🪢',
        'Janmashtami 🙏'
    ],
    'Bhadrapada': [
        'Ganesh Chaturthi 🐘',
        'Onam'
    ],
    'Ashvina': [
        'Navratri 🎊',
        'Dussehra',
        'Karwa Chauth'
    ],
    'Kartika': [
        'Diwali 🪔',
        'Dhanteras',
        'Bhai Dooj'
    ],
    'Margashirsha': [
        'Gita Jayanti'
    ],
    'Pausha': [
        'Makar Sankranti 🪁',
        'Lohri 🔥',
        'Pongal'
    ],
    'Magha': [
        'Basant Panchami 🌼',
        'Maha Shivaratri 🔱'
    ],
    'Phalguna': [
        'Holika Dahan 🔥',
        'Holi 🎨'
    ]
};
const DD = [
    '०',
    '१',
    '२',
    '३',
    '४',
    '५',
    '६',
    '७',
    '८',
    '९'
];
const toDev = (n)=>String(n).split('').map((d)=>DD[parseInt(d)] ?? d).join('');
const EN_M = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const HI_M = [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर'
];
const TITHI_EN = [
    'Pratipada',
    'Dwitiya',
    'Tritiya',
    'Chaturthi',
    'Panchami',
    'Shashthi',
    'Saptami',
    'Ashtami',
    'Navami',
    'Dashami',
    'Ekadashi',
    'Dwadashi',
    'Trayodashi',
    'Chaturdashi',
    'Purnima'
];
const TITHI_HI = [
    'प्रतिपदा',
    'द्वितीया',
    'तृतीया',
    'चतुर्थी',
    'पञ्चमी',
    'षष्ठी',
    'सप्तमी',
    'अष्टमी',
    'नवमी',
    'दशमी',
    'एकादशी',
    'द्वादशी',
    'त्रयोदशी',
    'चतुर्दशी',
    'पूर्णिमा'
];
function getVikramSamvatFull() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ny2082 = new Date('2025-03-30');
    const ny2083 = new Date('2026-03-19');
    let vsYear, months;
    if (today >= ny2083) {
        vsYear = 2083;
        months = VS_2083_MONTHS;
    } else if (today >= ny2082) {
        vsYear = 2082;
        months = VS_2082_MONTHS;
    } else {
        vsYear = 2081;
        months = VS_2082_MONTHS;
    }
    let curMonth = months[months.length - 1];
    for (const m of months){
        const s = new Date(m.start);
        const e = new Date(m.end);
        e.setHours(23, 59, 59);
        if (today >= s && today <= e) {
            curMonth = m;
            break;
        }
    }
    const knownAmavasya = new Date('2026-03-29');
    const diffDays = (today - knownAmavasya) / (1000 * 60 * 60 * 24);
    const LC = 29.53059;
    const cp = (diffDays % LC + LC) % LC;
    let paksha, pakshaHi, tithiEn, tithiHi, tNum;
    if (cp < 0.5 || cp >= 29.0) {
        paksha = 'Amavasya';
        pakshaHi = 'अमावस्या';
        tithiEn = '';
        tithiHi = '';
        tNum = 30;
    } else if (cp >= 14.5 && cp < 15.5) {
        paksha = 'Shukla';
        pakshaHi = 'शुक्ल';
        tithiEn = 'Purnima';
        tithiHi = 'पूर्णिमा';
        tNum = 15;
    } else if (cp < 15) {
        paksha = 'Shukla';
        pakshaHi = 'शुक्ल';
        tNum = Math.min(Math.floor(cp) + 1, 14);
        tithiEn = TITHI_EN[tNum - 1];
        tithiHi = TITHI_HI[tNum - 1];
    } else {
        paksha = 'Krishna';
        pakshaHi = 'कृष्ण';
        tNum = Math.min(Math.floor(cp - 15) + 1, 14);
        tithiEn = TITHI_EN[tNum - 1];
        tithiHi = TITHI_HI[tNum - 1];
    }
    const tNumStr = tNum <= 14 ? String(tNum) : '';
    const tNumDev = tNum <= 14 ? toDev(tNum) : '';
    const adhikEn = curMonth.adhik ? 'Adhik ' : '';
    const adhikHi = curMonth.adhik ? 'अधिक ' : '';
    const d = today.getDate();
    const mon = today.getMonth();
    const yr = today.getFullYear();
    const daysToNY = Math.ceil((ny2083 - today) / (1000 * 60 * 60 * 24));
    const ritu = VS_RITUS.find((r)=>r.name === curMonth.ritu) || VS_RITUS[5];
    const festivals = VS_FESTIVALS[curMonth.name] || [];
    return {
        line1: `${adhikHi}${curMonth.sk} ` + `${pakshaHi}${tNumDev ? ' ' + tNumDev : ''}, ` + `विक्रम संवत् ${toDev(vsYear)}`,
        line2: `${adhikEn}${curMonth.name} ` + `${paksha}${tNumStr ? ' ' + tNumStr : ''}, ` + `VS ${vsYear}`,
        line3: `${d} ${EN_M[mon]} ${yr}` + `  |  ${toDev(d)} ${HI_M[mon]} ` + `${toDev(yr)}`,
        ritu,
        festivals,
        vsYear,
        daysToNavVarsh: daysToNY,
        isNavVarsh: curMonth.navVarsh || false,
        isAdhikMaas: curMonth.adhik || false
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/aitdl4/components/FooterHistory.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FooterHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$data$2f$techHistory$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/data/techHistory.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$vikramSamvat$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/vikramSamvat.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function FooterHistory() {
    _s();
    const [vs, setVs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fact, setFact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bh, setBh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FooterHistory.useEffect": ()=>{
            setVs((0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$vikramSamvat$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getVikramSamvatFull"])());
            setFact((0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$data$2f$techHistory$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTodayFact"])());
            setBh((0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$data$2f$techHistory$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRandomBharatFact"])());
        }
    }["FooterHistory.useEffect"], []);
    if (!vs || !fact || !bh) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-800    pt-5 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium    text-gray-500 uppercase    tracking-widest mb-3",
                        children: "🇮🇳 Bharat Computing Legacy"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-l-2    border-amber-600/60 pl-3    bg-amber-500/5 rounded-r-lg    py-3 pr-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start    justify-between gap-2 mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm    font-medium    text-amber-300",
                                                children: bh.person
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 39,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs    text-amber-600/70 ml-2",
                                                children: [
                                                    "— ",
                                                    bh.title
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 44,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs    text-amber-700/60    flex-shrink-0    border border-amber-700/30    px-2 py-0.5 rounded-full",
                                        children: bh.era
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs    text-gray-400    leading-relaxed mb-2",
                                children: bh.fact
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2    items-start border-t    border-amber-800/20 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-teal-400    text-xs flex-shrink-0 mt-0.5",
                                        children: "⚡"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs    text-teal-400/70    leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: "Modern connection:"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            bh.connection
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/FooterHistory.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t    border-gray-800/60 pt-4 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium    text-gray-500 uppercase    tracking-widest mb-2",
                        children: "On This Day in Tech History"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm    text-gray-300 leading-relaxed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-amber-400    font-medium",
                                children: fact.year
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            " — ",
                            fact.fact
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/FooterHistory.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t    border-gray-800/60 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cursor-pointer group    text-center select-none",
                        onClick: ()=>setOpen(!open),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium    text-amber-400 leading-relaxed",
                                children: vs.line1
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs    text-amber-500/70 mt-0.5",
                                children: vs.line2
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs    text-gray-600 my-1.5    tracking-widest",
                                children: "━━━━━"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs    text-gray-400",
                                children: vs.line3
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs    text-gray-500 mt-1.5",
                                children: [
                                    vs.ritu?.icon,
                                    " ",
                                    vs.ritu?.name,
                                    " Ritu",
                                    vs.isAdhikMaas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-400    ml-2",
                                        children: "· Adhik Maas ✨"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    vs.daysToNavVarsh > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-400/70    ml-2",
                                        children: [
                                            "· ",
                                            vs.daysToNavVarsh,
                                            " days to VS 2083 🙏"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    vs.daysToNavVarsh === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-300    ml-2 font-medium",
                                        children: "🎊 नव वर्षाभिनन्दनम्!"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-700    ml-2    group-hover:text-gray-500    transition-colors",
                                        children: open ? '▲' : '▼'
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 pt-3    border-t border-gray-800/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs    text-gray-600 uppercase    tracking-widest    text-center mb-2",
                                children: "षड् ऋतु — Six Seasons"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3    gap-1.5 mb-3    sm:grid-cols-6",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$vikramSamvat$2e$js__$5b$client$5d$__$28$ecmascript$29$__["VS_RITUS"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-center 
                    p-2 rounded-lg border 
                    text-xs transition-colors
                    ${vs.ritu?.name === r.name ? 'border-amber-600/50 bg-amber-500/10' : 'border-gray-800/60'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-base    mb-1",
                                                children: r.icon
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 180,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `font-medium
                    ${vs.ritu?.name === r.name ? 'text-amber-400' : 'text-gray-500'}`,
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: r.en
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 191,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, r.name, true, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            vs.festivals?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs    text-gray-600    text-center mb-1.5",
                                        children: "🎊 Upcoming Festivals"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex    flex-wrap gap-1.5    justify-center",
                                        children: vs.festivals.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs    px-2.5 py-0.5    rounded-full    border    border-amber-700/30    text-amber-500/80",
                                                children: f
                                            }, f, false, {
                                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                                lineNumber: 209,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 199,
                                columnNumber: 15
                            }, this),
                            vs.daysToNavVarsh > 0 && vs.daysToNavVarsh <= 30 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center    text-xs text-amber-500/50    mb-2",
                                children: "✨ VS 2083 has 13 months (Adhika Maas) — first time in 3 years"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center    text-xs text-gray-700",
                                children: [
                                    "Founded by Emperor Vikramaditya of Ujjain · 57 BCE ·",
                                    vs.vsYear,
                                    " years of unbroken tradition 🇮🇳"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/FooterHistory.js",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/FooterHistory.js",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/FooterHistory.js",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/FooterHistory.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(FooterHistory, "NoSQLmH9qDPiHP/IG5WVkK9RRqk=");
_c = FooterHistory;
var _c;
__turbopack_context__.k.register(_c, "FooterHistory");
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
 * @copyright © 2026 All Rights Reserved
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
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$FooterHistory$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/FooterHistory.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
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
        dev: 'Software Developer & Service Provider since 2007 | Published Author',
        rights: '© 2026 AITDL — All Rights Reserved',
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
        rights: '© 2026 AITDL — सर्वाधिकार सुरक्षित',
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
            background: 'var(--bg-primary)',
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
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 14,
                                    color: 'var(--text-tertiary)',
                                    lineHeight: 1.8,
                                    maxWidth: 300
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--text-secondary)',
                                            fontWeight: 600,
                                            display: 'block',
                                            marginBottom: 4
                                        },
                                        children: "Artificial Intelligence Technology & Deep Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    t.desc
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 101,
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
                                lineNumber: 123,
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
                                    ],
                                    [
                                        'About Founder',
                                        '/about-founder'
                                    ]
                                ].map(([label, href])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: href,
                                        style: {
                                            fontSize: 14,
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s'
                                        },
                                        className: "footer-link",
                                        children: label
                                    }, label, false, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 122,
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
                                lineNumber: 150,
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
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://forms.gle/aitdl-beta-suggest",
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
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid var(--border)',
                    paddingTop: 48,
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 16,
                            color: 'var(--text-primary)',
                            fontWeight: 800,
                            marginBottom: 12,
                            fontFamily: 'Outfit',
                            letterSpacing: '0.1em'
                        },
                        children: "AITDL"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 8,
                            justifyContent: 'center',
                            marginBottom: 24
                        },
                        children: [
                            'Built with ❤️ for Bharat',
                            'MIT License 2026',
                            'aitdl.com'
                        ].map((pill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: '4px 12px',
                                    borderRadius: 100,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                },
                                children: pill
                            }, pill, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 11,
                            color: 'var(--text-tertiary)',
                            opacity: 0.5
                        },
                        children: "© 2026 AITDL"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$FooterHistory$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/Footer.js",
        lineNumber: 86,
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
 * @copyright © 2026 All Rights Reserved
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
        className: "jsx-3e61cdff78f049f4" + " " + "premium-glass-card",
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
                className: "jsx-3e61cdff78f049f4" + " " + "spotlight"
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
                className: "jsx-3e61cdff78f049f4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap'
                        },
                        className: "jsx-3e61cdff78f049f4",
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
                                className: "jsx-3e61cdff78f049f4",
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
                                className: "jsx-3e61cdff78f049f4",
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
                            color: 'var(--bg-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            fontWeight: 900
                        },
                        title: "Verified Tool",
                        className: "jsx-3e61cdff78f049f4",
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
                className: "jsx-3e61cdff78f049f4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16
                        },
                        className: "jsx-3e61cdff78f049f4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 42,
                                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                                    background: 'var(--card-bg)',
                                    padding: 12,
                                    borderRadius: 16,
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.3s ease'
                                },
                                "aria-hidden": "true",
                                className: "jsx-3e61cdff78f049f4" + " " + "emoji-box",
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
                                    color: 'var(--text-primary)',
                                    margin: 0,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em'
                                },
                                className: "jsx-3e61cdff78f049f4",
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
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: 24,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: 500
                        },
                        className: "jsx-3e61cdff78f049f4",
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
                        className: "jsx-3e61cdff78f049f4",
                        children: tool.category.slice(0, 3).map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    padding: '4px 14px',
                                    borderRadius: 12,
                                    background: 'var(--card-bg)',
                                    color: 'var(--text-tertiary)',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    border: '1px solid var(--border)'
                                },
                                className: "jsx-3e61cdff78f049f4",
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
                className: "jsx-3e61cdff78f049f4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/tools/${tool.slug}`,
                        style: {
                            flex: 1.5,
                            padding: '14px',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border)',
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
                            border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: 14,
                            fontSize: 13,
                            fontWeight: 800,
                            color: isSelected ? '#fff' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.3s var(--ease)'
                        },
                        className: "jsx-3e61cdff78f049f4",
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
                id: "3e61cdff78f049f4",
                children: ".premium-glass-card.jsx-3e61cdff78f049f4:hover{box-shadow:0 20px 60px #0009,0 0 20px var(--accent-glow);transform:translateY(-8px)scale(1.02);border-color:var(--accent)!important}.premium-glass-card.jsx-3e61cdff78f049f4:hover .spotlight.jsx-3e61cdff78f049f4{opacity:1!important}.premium-glass-card.jsx-3e61cdff78f049f4:hover .emoji-box.jsx-3e61cdff78f049f4{background:var(--accent-glow);border-color:var(--accent);transform:scale(1.1)rotate(5deg)}.btn-details.jsx-3e61cdff78f049f4:hover{border-color:var(--accent);color:var(--accent);background:#ffffff14}"
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
 * @copyright © 2026 All Rights Reserved
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
 * @copyright © 2026 All Rights Reserved
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
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 20,
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 2
        },
        className: "jsx-9696cfc19449475e" + " " + "trust-bar",
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
                    className: "jsx-9696cfc19449475e",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 18
                            },
                            className: "jsx-9696cfc19449475e",
                            children: item.icon
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/TrustBar.js",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-9696cfc19449475e",
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
                id: "9696cfc19449475e",
                children: ".trust-bar.jsx-9696cfc19449475e{animation:slide-up .8s var(--ease)forwards}@media (width<=768px){.trust-bar.jsx-9696cfc19449475e{justify-content:center}}"
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
 * @copyright © 2026 AITDL - Artificial Intelligence Technology & Deep Learning
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/seo.js [client] (ecmascript)");
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
const SkeletonCard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--card-bg)',
            borderRadius: 24,
            padding: 'var(--card-padding)',
            height: 280,
            animation: 'pulse 1.5s infinite ease-in-out',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 40,
                    width: 40,
                    background: 'var(--border)',
                    borderRadius: 12
                }
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 139,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 24,
                    width: '60%',
                    background: 'var(--text-tertiary)',
                    borderRadius: 4
                }
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 140,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 16,
                    width: '90%',
                    background: 'var(--border)',
                    borderRadius: 4
                }
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 141,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 16,
                    width: '70%',
                    background: 'var(--border)',
                    borderRadius: 4
                }
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 142,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 'auto',
                    height: 44,
                    width: '100%',
                    background: 'var(--border)',
                    borderRadius: 12
                }
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 143,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/index.js",
        lineNumber: 128,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = SkeletonCard;
var __N_SSG = true;
function Home({ tools }) {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [uiMode, setUiMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('directory');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('grid');
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedSearch, setDebouncedSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [exam, setExam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [pricing, setPricing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [compareList, setCompareList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filtered, setFiltered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // TODO: Replace with real Vercel Analytics pageview count via API when available
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
            const savedUiMode = localStorage.getItem('aitdl_ui_mode') || 'directory';
            setUiMode(savedUiMode);
            const savedOrigin = localStorage.getItem('aitdl_origin') || 'all';
            setOrigin(savedOrigin);
            // Stats
            const savedVisitors = localStorage.getItem('aitdl_visitors');
            // TODO: Replace with real Vercel Analytics pageview count via API when available
            const count = savedVisitors ? parseInt(savedVisitors) + 1 : 8506;
            setVisitorCount(count);
            localStorage.setItem('aitdl_visitors', count);
            const handleStorage = {
                "Home.useEffect.handleStorage": ()=>{
                    setLang(localStorage.getItem('aitdl_lang') || 'en');
                    setViewMode(localStorage.getItem('aitdl_view') || 'grid');
                    setUiMode(localStorage.getItem('aitdl_ui_mode') || 'directory');
                    setOrigin(localStorage.getItem('aitdl_origin') || 'all');
                }
            }["Home.useEffect.handleStorage"];
            window.addEventListener('storage', handleStorage);
            // Initial loading simulation
            const timer = setTimeout({
                "Home.useEffect.timer": ()=>setLoading(false)
            }["Home.useEffect.timer"], 800);
            return ({
                "Home.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorage);
                    clearTimeout(timer);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const timer = setTimeout({
                "Home.useEffect.timer": ()=>{
                    setDebouncedSearch(search);
                }
            }["Home.useEffect.timer"], 300);
            return ({
                "Home.useEffect": ()=>clearTimeout(timer)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        search
    ]);
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
            if (debouncedSearch) {
                const q = debouncedSearch.toLowerCase();
                result = result.filter({
                    "Home.useEffect": (t)=>t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.exam_tags.some({
                            "Home.useEffect": (tag)=>tag.toLowerCase().includes(q)
                        }["Home.useEffect"]) || t.category.some({
                            "Home.useEffect": (cat)=>cat.toLowerCase().includes(q)
                        }["Home.useEffect"])
                }["Home.useEffect"]);
            }
            setFiltered(result);
        }
    }["Home.useEffect"], [
        debouncedSearch,
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
                borderColor: current === val ? 'var(--accent)' : 'var(--border)',
                background: current === val ? 'var(--accent-glow)' : 'var(--card-bg)',
                color: current === val ? 'var(--accent)' : 'var(--text-secondary)',
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
            lineNumber: 245,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "AITDL — Best Free AI Tools for JEE, NEET, UPSC Students India"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "India's #1 free AI tools directory for students. 100+ verified AI tools for JEE, NEET, UPSC, CBSE. No signup required. Made for Bharat."
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://aitdl.com"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "AITDL — Right AI Tool At The Right Time"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "India's #1 free AI tools platform for students. 100+ tools for JEE, NEET, UPSC."
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://aitdl.com"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 282,
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
                        lineNumber: 285,
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
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/index.js",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 289,
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
                                lineNumber: 295,
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
                                        color: 'var(--text-primary)',
                                        background: 'linear-gradient(to bottom, var(--text-primary), var(--text-tertiary))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    },
                                    children: t.cmdHero
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/index.js",
                                    lineNumber: 318,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-primary)'
                                            },
                                            children: "Right AI Tool"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 329,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--accent)',
                                                background: 'linear-gradient(to bottom, var(--text-primary), var(--accent))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: "At The Right Time"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 330,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 20,
                                    color: 'var(--text-secondary)',
                                    maxWidth: 700,
                                    margin: '0 auto 48px',
                                    lineHeight: 1.6
                                },
                                children: t.cmdSub
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 340,
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
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            padding: '20px 48px',
                                            background: 'transparent',
                                            color: 'var(--text-primary)',
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
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$TrustBar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 360,
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
                                val: `${tools.length}+`,
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
                                    background: 'var(--bg-secondary)',
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
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: 'var(--text-tertiary)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        },
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 377,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 363,
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
                                background: 'var(--search-bg)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--border)',
                                borderRadius: 16,
                                fontSize: 16,
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'all 0.3s var(--ease)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                            },
                            className: "premium-search"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/pages/index.js",
                            lineNumber: 394,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 393,
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
                                            color: 'var(--text-tertiary)',
                                            marginBottom: 12,
                                            textTransform: 'uppercase'
                                        },
                                        children: t.category
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 10,
                                            overflowX: 'auto',
                                            paddingBottom: 8,
                                            WebkitOverflowScrolling: 'touch'
                                        },
                                        children: CATEGORIES.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setCategory(c),
                                                style: {
                                                    padding: '8px 20px',
                                                    borderRadius: 12,
                                                    border: '1px solid',
                                                    borderColor: category === c ? 'var(--accent)' : 'var(--border)',
                                                    background: category === c ? 'var(--accent-glow)' : 'var(--card-bg)',
                                                    color: category === c ? 'var(--accent)' : 'var(--text-secondary)',
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    flexShrink: 0,
                                                    transition: 'all 0.3s var(--ease)'
                                                },
                                                className: "premium-filter-btn",
                                                children: c
                                            }, c, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 412,
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
                                                    color: 'var(--text-tertiary)',
                                                    marginBottom: 12,
                                                    textTransform: 'uppercase'
                                                },
                                                children: t.exam
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 448,
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
                                                lineNumber: 449,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 447,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    color: 'var(--text-tertiary)',
                                                    marginBottom: 12,
                                                    textTransform: 'uppercase'
                                                },
                                                children: t.pricing
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 454,
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
                                                lineNumber: 455,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 453,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text-tertiary)',
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
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            " ",
                            t.found
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 463,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 'var(--grid-gap)'
                        },
                        children: loading ? Array(6).fill(0).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, i, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 474,
                                columnNumber: 44
                            }, this)) : filtered.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                tool: tool,
                                viewMode: viewMode,
                                onCompare: handleCompare,
                                isSelected: compareList.some((t)=>t.id === tool.id)
                            }, tool.id, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 477,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 468,
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
                            background: 'var(--bg-secondary)'
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
                                lineNumber: 490,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    marginBottom: 10
                                },
                                children: "200+ tools being added"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 491,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.7
                                },
                                children: "Curating best AI tools across design, productivity, coding, research — verified for Indian users."
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 492,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 489,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            compareList.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--bg-secondary)',
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
                            color: 'var(--text-secondary)'
                        },
                        children: [
                            compareList.length,
                            " tools selected"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 501,
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
                        lineNumber: 502,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCompareList([]),
                        style: {
                            padding: '8px 12px',
                            background: 'transparent',
                            color: 'var(--text-tertiary)',
                            border: '0.5px solid var(--border)',
                            borderRadius: 8,
                            fontSize: 12,
                            cursor: 'pointer'
                        },
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 500,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 507,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/index.js",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
_s(Home, "YxMqmXP5cZSSmJVNTlW9n5/KQsg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "SkeletonCard");
__turbopack_context__.k.register(_c1, "Home");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__55ad84e0._.js.map