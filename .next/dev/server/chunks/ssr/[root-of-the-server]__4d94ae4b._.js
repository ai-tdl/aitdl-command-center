module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/aitdl4/lib/firebase.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "emailProvider",
    ()=>emailProvider,
    "githubProvider",
    ()=>githubProvider,
    "googleProvider",
    ()=>googleProvider
]);
/**
 * AITDL — India's AI Command Center
 * @author Jawahar Ramkripal Mallah
 * @copyright © 2026 All Rights Reserved
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$app__$5b$external$5d$__$28$firebase$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__ = __turbopack_context__.i("[externals]/firebase/app [external] (firebase/app, esm_import, [project]/aitdl4/node_modules/firebase)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import, [project]/aitdl4/node_modules/firebase)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__ = __turbopack_context__.i("[externals]/firebase/firestore [external] (firebase/firestore, esm_import, [project]/aitdl4/node_modules/firebase)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$app__$5b$external$5d$__$28$firebase$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$app__$5b$external$5d$__$28$firebase$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyDTVVGIjuL_fP5xA709LVi93pTMfkefLHs"),
    authDomain: ("TURBOPACK compile-time value", "aitdl-83536321-fd75b.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "aitdl-83536321-fd75b"),
    storageBucket: ("TURBOPACK compile-time value", "aitdl-83536321-fd75b.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "826189370678"),
    appId: ("TURBOPACK compile-time value", "1:826189370678:web:cf902e77fe8ff6d8ad8f97")
};
const app = !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$app__$5b$external$5d$__$28$firebase$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$app__$5b$external$5d$__$28$firebase$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$app__$5b$external$5d$__$28$firebase$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getApps"])()[0];
const auth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getFirestore"])(app);
const googleProvider = new __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["GoogleAuthProvider"]();
const githubProvider = new __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["GithubAuthProvider"]();
const emailProvider = new __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["EmailAuthProvider"]();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/aitdl4/lib/userProfile.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "addSearchHistory",
    ()=>addSearchHistory,
    "getUserProfile",
    ()=>getUserProfile,
    "removeTool",
    ()=>removeTool,
    "savePreferences",
    ()=>savePreferences,
    "saveTool",
    ()=>saveTool,
    "saveUserProfile",
    ()=>saveUserProfile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__ = __turbopack_context__.i("[externals]/firebase/firestore [external] (firebase/firestore, esm_import, [project]/aitdl4/node_modules/firebase)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/firebase.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function saveUserProfile(user) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', user.uid);
    const snap = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getDoc"])(ref);
    if (!snap.exists()) {
        // New user — create profile
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["setDoc"])(ref, {
            uid: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            photo: user.photoURL || '',
            provider: user.providerData[0]?.providerId || '',
            savedTools: [],
            toolLists: [],
            searchHistory: [],
            preferences: {
                theme: 'light',
                lang: 'en',
                fontSize: 'medium',
                accent: '#FF6B35'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    } else {
        // Existing user — update last seen
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["updateDoc"])(ref, {
            updatedAt: new Date().toISOString(),
            name: user.displayName || snap.data().name,
            photo: user.photoURL || snap.data().photo
        });
    }
    return (await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getDoc"])(ref)).data();
}
async function getUserProfile(uid) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', uid));
    return snap.exists() ? snap.data() : null;
}
async function saveTool(uid, toolId) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', uid);
    const snap = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getDoc"])(ref);
    if (!snap.exists()) return;
    const saved = snap.data().savedTools || [];
    if (saved.includes(toolId)) return;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["updateDoc"])(ref, {
        savedTools: [
            ...saved,
            toolId
        ],
        updatedAt: new Date().toISOString()
    });
}
async function removeTool(uid, toolId) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', uid);
    const snap = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getDoc"])(ref);
    if (!snap.exists()) return;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["updateDoc"])(ref, {
        savedTools: snap.data().savedTools.filter((id)=>id !== toolId),
        updatedAt: new Date().toISOString()
    });
}
async function savePreferences(uid, prefs) {
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', uid), {
        preferences: prefs,
        updatedAt: new Date().toISOString()
    });
}
async function addSearchHistory(uid, query) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', uid);
    const snap = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["getDoc"])(ref);
    if (!snap.exists()) return;
    const history = snap.data().searchHistory || [];
    const updated = [
        query,
        ...history.filter((q)=>q !== query)
    ].slice(0, 20) // keep last 20
    ;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["updateDoc"])(ref, {
        searchHistory: updated,
        updatedAt: new Date().toISOString()
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/aitdl4/pages/login.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import, [project]/aitdl4/node_modules/firebase)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/firebase.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$userProfile$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/userProfile.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$userProfile$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$userProfile$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('login');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [pass, setPass] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [reset, setReset] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const afterLogin = async (user)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$userProfile$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["saveUserProfile"])(user);
        router.push(router.query.from || '/profile');
    };
    const handleGoogle = async ()=>{
        setLoading(true);
        setError('');
        try {
            const r = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["googleProvider"]);
            await afterLogin(r.user);
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    };
    const handleGithub = async ()=>{
        setLoading(true);
        setError('');
        try {
            const r = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["githubProvider"]);
            await afterLogin(r.user);
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    };
    const handleEmail = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let r;
            if (tab === 'login') {
                r = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["signInWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], email, pass);
            } else {
                r = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["createUserWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], email, pass);
            }
            await afterLogin(r.user);
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    };
    const handleReset = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$firebase$29$__["sendPasswordResetEmail"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], email);
            setReset(true);
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Login — AITDL"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/login.js",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Login to AITDL — Save your favourite AI tools, sync preferences."
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/login.js",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://aitdl.com/login/"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/login.js",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/login.js",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    background: 'var(--bg-primary)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        width: '100%',
                        maxWidth: 400,
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 20,
                        padding: 32
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginBottom: 28
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 28,
                                        fontWeight: 800,
                                        color: 'var(--accent)',
                                        letterSpacing: '-0.02em',
                                        fontFamily: 'Outfit'
                                    },
                                    children: "⚡ AITDL"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: 'var(--text-tertiary)',
                                        marginTop: 4
                                    },
                                    children: "India's AI Command Center"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 10,
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleGoogle,
                                    disabled: loading,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 10,
                                        padding: '12px 20px',
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 10,
                                        color: 'var(--text-secondary)',
                                        fontSize: 14,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "🟡"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/login.js",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        "Continue with Google"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleGithub,
                                    disabled: loading,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 10,
                                        padding: '12px 20px',
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 10,
                                        color: 'var(--text-secondary)',
                                        fontSize: 14,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "⚫"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/login.js",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this),
                                        "Continue with GitHub"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        height: 1,
                                        background: 'var(--border)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 11,
                                        color: 'var(--text-tertiary)'
                                    },
                                    children: "or"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        height: 1,
                                        background: 'var(--border)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                background: 'var(--bg-tertiary)',
                                borderRadius: 10,
                                padding: 4,
                                marginBottom: 20
                            },
                            children: [
                                'login',
                                'register'
                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setTab(t);
                                        setError('');
                                    },
                                    style: {
                                        flex: 1,
                                        padding: '8px',
                                        background: tab === t ? 'var(--bg-secondary)' : 'transparent',
                                        border: tab === t ? '1px solid var(--border)' : '1px solid transparent',
                                        borderRadius: 8,
                                        color: tab === t ? 'var(--accent)' : 'var(--text-tertiary)',
                                        fontSize: 13,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        transition: 'all 0.2s'
                                    },
                                    children: t === 'login' ? '🔑 Login' : '✨ Register'
                                }, t, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        reset ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '20px',
                                color: 'var(--text-secondary)',
                                fontSize: 13
                            },
                            children: [
                                "✅ Reset email sent to ",
                                email,
                                "!",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setReset(false),
                                    style: {
                                        marginTop: 12,
                                        color: 'var(--accent)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: 13,
                                        fontWeight: 700
                                    },
                                    children: "Back to Login"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 253,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleEmail,
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12
                            },
                            children: [
                                tab === 'register' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Full Name",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    required: true,
                                    style: {
                                        padding: '12px 14px',
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 10,
                                        color: 'var(--text-primary)',
                                        fontSize: 14,
                                        outline: 'none'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 284,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "Email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    required: true,
                                    style: {
                                        padding: '12px 14px',
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 10,
                                        color: 'var(--text-primary)',
                                        fontSize: 14,
                                        outline: 'none'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "Password",
                                    value: pass,
                                    onChange: (e)=>setPass(e.target.value),
                                    required: true,
                                    minLength: 6,
                                    style: {
                                        padding: '12px 14px',
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 10,
                                        color: 'var(--text-primary)',
                                        fontSize: 14,
                                        outline: 'none'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        color: '#ff4444',
                                        padding: '8px 12px',
                                        background: 'rgba(255,68,68,0.1)',
                                        borderRadius: 8,
                                        border: '1px solid rgba(255,68,68,0.2)'
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 339,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    style: {
                                        padding: '13px',
                                        background: 'var(--accent)',
                                        border: 'none',
                                        borderRadius: 10,
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: loading ? 0.7 : 1
                                    },
                                    children: loading ? '...' : tab === 'login' ? '🔑 Login' : '✨ Create Account'
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this),
                                tab === 'login' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleReset,
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-tertiary)',
                                        fontSize: 12,
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    },
                                    children: "Forgot password?"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/login.js",
                                    lineNumber: 374,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 277,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginTop: 20
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "/",
                                style: {
                                    fontSize: 12,
                                    color: 'var(--text-tertiary)',
                                    textDecoration: 'none'
                                },
                                children: "← Back to AITDL"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/login.js",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/pages/login.js",
                            lineNumber: 393,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aitdl4/pages/login.js",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/login.js",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4d94ae4b._.js.map