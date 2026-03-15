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
"[project]/aitdl4/lib/jsonld.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeJsonLD",
    ()=>HomeJsonLD,
    "ToolJsonLD",
    ()=>ToolJsonLD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const HomeJsonLD = ({ toolCount })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "AITDL",
                "url": "https://aitdl.com",
                "description": "India's #1 AI Tools Platform",
                "author": {
                    "@type": "Person",
                    "name": "Jawahar Ramkripal Mallah",
                    "jobTitle": "Software Developer & Published Author",
                    "url": "https://aitdl.com/about"
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://aitdl.com/?q={search_term}"
                    },
                    "query-input": "required name=search_term"
                }
            })
        }
    }, void 0, false, {
        fileName: "[project]/aitdl4/lib/jsonld.js",
        lineNumber: 2,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = HomeJsonLD;
const ToolJsonLD = ({ tool })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": tool.name,
                "description": tool.description,
                "url": tool.url,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web, Android, iOS",
                "offers": {
                    "@type": "Offer",
                    "price": tool.pricing === 'free' ? "0" : "varies",
                    "priceCurrency": "INR"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": tool.india_score,
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "100"
                },
                "author": {
                    "@type": "Person",
                    "name": "Jawahar Ramkripal Mallah"
                }
            })
        }
    }, void 0, false, {
        fileName: "[project]/aitdl4/lib/jsonld.js",
        lineNumber: 33,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = ToolJsonLD;
var _c, _c1;
__turbopack_context__.k.register(_c, "HomeJsonLD");
__turbopack_context__.k.register(_c1, "ToolJsonLD");
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
        className: "jsx-3405a1cd63eb9e91" + " " + "overlay",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                ref: panelRef,
                className: "jsx-3405a1cd63eb9e91" + " " + "panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3405a1cd63eb9e91" + " " + "mobile-handle"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "jsx-3405a1cd63eb9e91",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: "⚙️ Settings"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetAll,
                                className: "jsx-3405a1cd63eb9e91" + " " + "reset-link",
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
                        className: "jsx-3405a1cd63eb9e91" + " " + "content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Interface Theme"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "grid-btns",
                                        children: THEMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyTheme(t.id),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((theme === t.id ? 'active' : '') || ""),
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
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Language"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: LANGUAGES.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyLang(l.id),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((lang === l.id ? 'active' : '') || ""),
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
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "View Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyView('grid'),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((view === 'grid' ? 'active' : '') || ""),
                                                children: "🗂 Grid"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyView('list'),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((view === 'list' ? 'active' : '') || ""),
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
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Density"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: DENSITIES.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyDensity(d.id),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((density === d.id ? 'active' : '') || ""),
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
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Font Size"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: FONT_SIZES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyFontSize(f.id),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((fontSize === f.id ? 'active' : '') || ""),
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
                                className: "jsx-3405a1cd63eb9e91" + " " + "flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "India Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "switch",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: indiaMode,
                                                onChange: (e)=>applyIndiaMode(e.target.checked),
                                                className: "jsx-3405a1cd63eb9e91"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-3405a1cd63eb9e91" + " " + "slider"
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
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Accent Colour"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "color-row",
                                        children: ACCENTS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: a
                                                },
                                                onClick: ()=>applyAccent(a),
                                                className: "jsx-3405a1cd63eb9e91" + " " + `color-dot ${accent === a ? 'active' : ''}`
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
                                className: "jsx-3405a1cd63eb9e91" + " " + "full-reset",
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
                id: "3405a1cd63eb9e91",
                children: '.overlay.jsx-3405a1cd63eb9e91{z-index:2000;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;background:#0006;justify-content:flex-end;padding:20px;animation:.2s forwards fade-in;display:flex;position:fixed;inset:0}@keyframes fade-in{to{opacity:1}}.panel.jsx-3405a1cd63eb9e91{background:var(--bg-secondary);border:1px solid var(--border);border-radius:24px;flex-direction:column;width:280px;max-height:85vh;animation:.2s forwards slide-in;display:flex;overflow:hidden;transform:translateY(-8px);box-shadow:0 20px 60px #00000080}@keyframes slide-in{to{opacity:1;transform:translateY(0)}}.mobile-handle.jsx-3405a1cd63eb9e91{display:none}header.jsx-3405a1cd63eb9e91{border-bottom:1px solid var(--border);justify-content:space-between;align-items:center;padding:20px 24px;display:flex}header.jsx-3405a1cd63eb9e91 h3.jsx-3405a1cd63eb9e91{margin:0;font-size:16px;font-weight:800}.reset-link.jsx-3405a1cd63eb9e91{color:var(--accent);cursor:pointer;background:0 0;border:none;font-size:12px;font-weight:700}.content.jsx-3405a1cd63eb9e91{flex-direction:column;gap:24px;padding:24px;display:flex;overflow-y:auto}section.jsx-3405a1cd63eb9e91 h4.jsx-3405a1cd63eb9e91{color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;font-size:10px;font-weight:800}.grid-btns.jsx-3405a1cd63eb9e91{grid-template-columns:1fr 1fr;gap:8px;display:grid}.row-btns.jsx-3405a1cd63eb9e91{gap:8px;display:flex}button.jsx-3405a1cd63eb9e91:not(:is(.reset-link,.full-reset)){border:1px solid var(--border);background:var(--bg-tertiary);color:var(--text-secondary);cursor:pointer;border-radius:12px;flex:1;padding:10px;font-size:12px;font-weight:700;transition:all .2s}button.active.jsx-3405a1cd63eb9e91{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 4px 12px var(--accent-glow)}.flex-row.jsx-3405a1cd63eb9e91{justify-content:space-between;align-items:center;display:flex}.flex-row.jsx-3405a1cd63eb9e91 h4.jsx-3405a1cd63eb9e91{margin:0}.switch.jsx-3405a1cd63eb9e91{width:44px;height:24px;display:inline-block;position:relative}.switch.jsx-3405a1cd63eb9e91 input.jsx-3405a1cd63eb9e91{opacity:0;width:0;height:0}.slider.jsx-3405a1cd63eb9e91{cursor:pointer;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:34px;transition:all .4s;position:absolute;inset:0}.slider.jsx-3405a1cd63eb9e91:before{content:"";background-color:#fff;border-radius:50%;width:16px;height:16px;transition:all .4s;position:absolute;bottom:3px;left:4px}input.jsx-3405a1cd63eb9e91:checked+.slider.jsx-3405a1cd63eb9e91{background-color:var(--accent);border-color:var(--accent)}input.jsx-3405a1cd63eb9e91:checked+.slider.jsx-3405a1cd63eb9e91:before{transform:translate(18px)}.color-row.jsx-3405a1cd63eb9e91{flex-wrap:wrap;gap:8px;display:flex}.color-dot.jsx-3405a1cd63eb9e91{cursor:pointer;border:2px solid #0000;border-radius:50%;width:24px;height:24px;transition:transform .2s}.color-dot.active.jsx-3405a1cd63eb9e91{border-color:#fff;transform:scale(1.1);box-shadow:0 0 10px #ffffff4d}.full-reset.jsx-3405a1cd63eb9e91{border:1px solid var(--border);color:var(--text3);cursor:pointer;background:0 0;border-radius:12px;margin-top:12px;padding:12px;font-size:12px;font-weight:700}@media (width<=768px){.overlay.jsx-3405a1cd63eb9e91{align-items:flex-end;padding:0}.panel.jsx-3405a1cd63eb9e91{border-radius:20px 20px 0 0;width:100%;max-height:70vh;animation:.3s forwards slide-up-mobile;transform:translateY(100%)}@keyframes slide-up-mobile{to{opacity:1;transform:translateY(0)}}.mobile-handle.jsx-3405a1cd63eb9e91{background:var(--border);border-radius:2px;width:40px;height:4px;margin:12px auto 0;display:block}}'
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
            background: 'var(--bg-primary-blur, rgba(3, 3, 6, 0.7))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '0 var(--header-px, 24px)',
            transition: 'all 0.3s var(--ease)'
        },
        className: "jsx-58f550ce9ff0c3dd",
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
                className: "jsx-58f550ce9ff0c3dd",
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
                                className: "jsx-58f550ce9ff0c3dd" + " " + "logo-glow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo-singularity.svg",
                                    alt: "AITDL Singularity",
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 0 10px var(--accent-glow))'
                                    },
                                    className: "jsx-58f550ce9ff0c3dd"
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
                                className: "jsx-58f550ce9ff0c3dd" + " " + "logo-text",
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
                                        className: "jsx-58f550ce9ff0c3dd",
                                        children: [
                                            "AITDL",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--accent)'
                                                },
                                                className: "jsx-58f550ce9ff0c3dd",
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
                                        className: "jsx-58f550ce9ff0c3dd",
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
                        className: "jsx-58f550ce9ff0c3dd",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 'var(--nav-gap, 16px)',
                                    alignItems: 'center'
                                },
                                className: "jsx-58f550ce9ff0c3dd",
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
                                className: "jsx-58f550ce9ff0c3dd",
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
                                    className: "jsx-58f550ce9ff0c3dd" + " " + "gear-btn",
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
                id: "58f550ce9ff0c3dd",
                children: ".nav-link.jsx-58f550ce9ff0c3dd:hover{color:var(--accent);background:#ffffff08}.gear-btn.jsx-58f550ce9ff0c3dd:hover{border-color:var(--accent);box-shadow:0 0 15px var(--accent-glow);transform:rotate(45deg)}@media (width<=768px){.jsx-58f550ce9ff0c3dd:root{--header-height:64px;--header-px:12px;--nav-gap:8px}.logo-text.jsx-58f550ce9ff0c3dd{display:none}.nav-link.jsx-58f550ce9ff0c3dd{padding:6px 8px!important;font-size:12px!important}.gear-btn.jsx-58f550ce9ff0c3dd{width:36px!important;height:36px!important;font-size:16px!important}}"
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
                                            color: 'var(--text-secondary)',
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
                                color: 'var(--text-primary)',
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
                            color: 'var(--bg-primary)',
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
                                "aria-hidden": "true",
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
                                    color: 'var(--text-primary)',
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
                            color: 'var(--text-secondary)',
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
                                    color: 'var(--text-tertiary)',
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
                            color: isSelected ? '#fff' : 'var(--text-secondary)',
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
"[project]/aitdl4/pages/tools/[slug].js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__N_SSG",
    ()=>__N_SSG,
    "default",
    ()=>ToolPage
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/seo.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$jsonld$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/jsonld.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Header.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Footer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/ToolCard.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/react/index.js [client] (ecmascript)");
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
var __N_SSG = true;
function ToolPage({ tool, similarTools }) {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToolPage.useEffect": ()=>{
            const saved = localStorage.getItem('aitdl_lang') || 'en';
            setLang(saved);
        }
    }["ToolPage.useEffect"], []);
    if (!tool) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            textAlign: 'center',
            padding: 60,
            color: 'var(--text2)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Tool not found"
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                children: "← Back to home"
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/tools/[slug].js",
        lineNumber: 43,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ToolSEO"])({
                    tool
                })
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$jsonld$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ToolJsonLD"], {
                tool: tool
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: 800,
                    margin: '0 auto',
                    padding: '32px 16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            fontSize: 13,
                            color: 'var(--text3)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            marginBottom: 24
                        },
                        children: "← All Tools"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--bg2)',
                            border: '0.5px solid var(--border)',
                            borderRadius: 16,
                            padding: 32,
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 20,
                                    alignItems: 'flex-start',
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 48
                                        },
                                        children: tool.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    fontSize: 28,
                                                    fontWeight: 800,
                                                    color: 'var(--text)',
                                                    marginBottom: 8
                                                },
                                                children: tool.name
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8,
                                                    flexWrap: 'wrap'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            padding: '3px 10px',
                                                            borderRadius: 10,
                                                            background: tool.pricing === 'free' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)',
                                                            color: tool.pricing === 'free' ? '#22C55E' : '#FBBF24',
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: tool.pricing
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                                        lineNumber: 111,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            padding: '3px 10px',
                                                            borderRadius: 10,
                                                            background: 'rgba(255,107,53,0.15)',
                                                            color: 'var(--accent)',
                                                            fontWeight: 600
                                                        },
                                                        children: [
                                                            "India ",
                                                            tool.india_score,
                                                            "/5 ⭐"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                                        lineNumber: 125,
                                                        columnNumber: 17
                                                    }, this),
                                                    tool.hindi_support && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            padding: '3px 10px',
                                                            borderRadius: 10,
                                                            background: 'rgba(99,102,241,0.15)',
                                                            color: '#818CF8',
                                                            fontWeight: 600
                                                        },
                                                        children: "हिंदी Support"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                                        lineNumber: 136,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 15,
                                    color: 'var(--text2)',
                                    lineHeight: 1.7,
                                    marginBottom: 20
                                },
                                children: tool.description
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            tool.exam_tags?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    flexWrap: 'wrap',
                                    marginBottom: 24
                                },
                                children: tool.exam_tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            padding: '4px 12px',
                                            borderRadius: 8,
                                            background: 'var(--bg3)',
                                            color: 'var(--text2)',
                                            border: '0.5px solid var(--border)'
                                        },
                                        children: tag
                                    }, tag, false, {
                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: tool.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    display: 'inline-block',
                                    padding: '12px 28px',
                                    background: 'var(--accent)',
                                    color: '#fff',
                                    borderRadius: 10,
                                    textDecoration: 'none',
                                    fontSize: 15,
                                    fontWeight: 700
                                },
                                children: [
                                    "Visit ",
                                    tool.name,
                                    " →"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    similarTools?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: 'var(--text)',
                                    marginBottom: 16
                                },
                                children: "Similar Tools"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: 16
                                },
                                children: similarTools.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        tool: t,
                                        onCompare: ()=>{},
                                        isSelected: false
                                    }, t.id, false, {
                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ToolPage, "IZSnqxuBuRjfXmXvrAq3O0uY2vU=");
_c = ToolPage;
var _c;
__turbopack_context__.k.register(_c, "ToolPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/aitdl4/pages/tools/[slug].js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/tools/[slug]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/aitdl4/pages/tools/[slug].js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/aitdl4/pages/tools/[slug].js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/aitdl4/pages/tools/[slug].js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__3ac012d0._.js.map