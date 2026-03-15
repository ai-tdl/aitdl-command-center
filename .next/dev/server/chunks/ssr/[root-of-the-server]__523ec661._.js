module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/aitdl4/components/SettingsPanel.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
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
const DENSITIES = [
    {
        id: 'compact',
        label: 'Compact',
        padding: '12px',
        gap: '8px'
    },
    {
        id: 'comfortable',
        label: 'Comfortable',
        padding: '24px',
        gap: '16px'
    },
    {
        id: 'spacious',
        label: 'Spacious',
        padding: '40px',
        gap: '24px'
    }
];
const ACCENTS = [
    '#FF6B35',
    '#00B4D8',
    '#22C55E',
    '#A855F7',
    '#EF4444'
];
const LANGS = [
    {
        id: 'en',
        label: 'English',
        short: 'EN'
    },
    {
        id: 'hi',
        label: 'Hindi',
        short: 'हि'
    },
    {
        id: 'sa',
        label: 'Sanskrit',
        short: 'सं'
    }
];
function SettingsPanel({ isOpen, onClose, lang, setLang }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('dark');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('grid');
    const [density, setDensity] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('comfortable');
    const [accent, setAccent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('#FF6B35');
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Load initial settings
        const sTheme = localStorage.getItem('aitdl_theme') || 'dark';
        const sView = localStorage.getItem('aitdl_viewmode') || 'grid';
        const sDensity = localStorage.getItem('aitdl_density') || 'comfortable';
        const sAccent = localStorage.getItem('aitdl_accent') || '#FF6B35';
        const sOrigin = localStorage.getItem('aitdl_origin') || 'all';
        setTheme(sTheme);
        setViewMode(sView);
        setDensity(sDensity);
        setAccent(sAccent);
        setOrigin(sOrigin);
        applyTheme(sTheme);
        applyDensity(sDensity);
        applyAccent(sAccent);
    }, []);
    const applyTheme = (t)=>{
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('aitdl_theme', t);
        setTheme(t);
        window.dispatchEvent(new Event('storage'));
    };
    const applyDensity = (d)=>{
        const config = DENSITIES.find((item)=>item.id === d);
        if (config) {
            document.documentElement.style.setProperty('--card-padding', config.padding);
            document.documentElement.style.setProperty('--card-gap', config.gap);
        }
        localStorage.setItem('aitdl_density', d);
        setDensity(d);
        window.dispatchEvent(new Event('storage'));
    };
    const applyAccent = (a)=>{
        document.documentElement.style.setProperty('--accent', a);
        // Create glow version (25% opacity)
        const glow = a + '40'; // Simple hex opacity
        document.documentElement.style.setProperty('--accent-glow', glow);
        localStorage.setItem('aitdl_accent', a);
        setAccent(a);
        window.dispatchEvent(new Event('storage'));
    };
    const toggleViewMode = (mode)=>{
        setViewMode(mode);
        localStorage.setItem('aitdl_viewmode', mode);
        window.dispatchEvent(new Event('storage'));
    };
    const toggleOrigin = ()=>{
        const next = origin === 'all' ? 'bharat' : 'all';
        setOrigin(next);
        localStorage.setItem('aitdl_origin', next);
        window.dispatchEvent(new Event('storage'));
    };
    const resetDefaults = ()=>{
        applyTheme('dark');
        applyDensity('comfortable');
        applyAccent('#FF6B35');
        toggleViewMode('grid');
        setOrigin('all');
        localStorage.setItem('aitdl_origin', 'all');
        setLang('en');
        localStorage.setItem('aitdl_lang', 'en');
        window.dispatchEvent(new Event('storage'));
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        onClick: onClose,
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '80px 24px'
        },
        className: "jsx-4671455dbd45ca6f" + " " + "settings-overlay",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                style: {
                    width: 320,
                    height: 'fit-content',
                    borderRadius: 24,
                    padding: 32,
                    animation: 'slide-up 0.4s var(--ease)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
                },
                className: "jsx-4671455dbd45ca6f" + " " + "settings-panel glass",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        className: "jsx-4671455dbd45ca6f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 900,
                                    margin: 0
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: "Command Center"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text3)',
                                    cursor: 'pointer',
                                    fontSize: 20
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "jsx-4671455dbd45ca6f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-4671455dbd45ca6f" + " " + "label",
                                children: "Language Preference"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    marginTop: 12
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: LANGS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setLang(l.id);
                                            localStorage.setItem('aitdl_lang', l.id);
                                        },
                                        className: "jsx-4671455dbd45ca6f" + " " + `opt-btn ${lang === l.id ? 'active' : ''}`,
                                        children: l.short
                                    }, l.id, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "jsx-4671455dbd45ca6f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-4671455dbd45ca6f" + " " + "label",
                                children: "Interface Theme"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 8,
                                    marginTop: 12
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: THEMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>applyTheme(t.id),
                                        className: "jsx-4671455dbd45ca6f" + " " + `opt-btn ${theme === t.id ? 'active' : ''}`,
                                        children: [
                                            t.icon,
                                            " ",
                                            t.label
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "jsx-4671455dbd45ca6f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-4671455dbd45ca6f" + " " + "label",
                                children: "Layout & Origin"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    marginTop: 12
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleViewMode('grid'),
                                        className: "jsx-4671455dbd45ca6f" + " " + `opt-btn ${viewMode === 'grid' ? 'active' : ''}`,
                                        children: "🗂 Grid"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleViewMode('list'),
                                        className: "jsx-4671455dbd45ca6f" + " " + `opt-btn ${viewMode === 'list' ? 'active' : ''}`,
                                        children: "📝 List"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: toggleOrigin,
                                        style: {
                                            flex: 1.5
                                        },
                                        className: "jsx-4671455dbd45ca6f" + " " + `opt-btn ${origin === 'bharat' ? 'active' : ''}`,
                                        children: "🇮🇳 Bharat Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "jsx-4671455dbd45ca6f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-4671455dbd45ca6f" + " " + "label",
                                children: "Information Density"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    marginTop: 12
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: DENSITIES.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>applyDensity(d.id),
                                        className: "jsx-4671455dbd45ca6f" + " " + `opt-btn ${density === d.id ? 'active' : ''}`,
                                        children: d.label
                                    }, d.id, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "jsx-4671455dbd45ca6f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-4671455dbd45ca6f" + " " + "label",
                                children: "Brand Accent"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 12,
                                    marginTop: 12
                                },
                                className: "jsx-4671455dbd45ca6f",
                                children: ACCENTS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        onClick: ()=>applyAccent(a),
                                        style: {
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            background: a,
                                            cursor: 'pointer',
                                            border: accent === a ? '3px solid #fff' : 'none',
                                            boxShadow: accent === a ? `0 0 15px ${a}` : 'none'
                                        },
                                        className: "jsx-4671455dbd45ca6f"
                                    }, a, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: resetDefaults,
                        style: {
                            marginTop: 12,
                            padding: 12,
                            borderRadius: 12,
                            border: '1px solid var(--border)',
                            background: 'none',
                            color: 'var(--text3)',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 700
                        },
                        className: "jsx-4671455dbd45ca6f",
                        children: "Reset to Factory Defaults"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "4671455dbd45ca6f",
                children: ".label.jsx-4671455dbd45ca6f{color:var(--text3);text-transform:uppercase;letter-spacing:.1em;font-size:11px;font-weight:800}.opt-btn.jsx-4671455dbd45ca6f{border:1px solid var(--border);background:var(--bg3);color:var(--text2);cursor:pointer;border-radius:12px;flex:1;padding:10px;font-size:12px;font-weight:700;transition:all .2s}.opt-btn.jsx-4671455dbd45ca6f:hover{background:var(--bg2);border-color:var(--accent)}.opt-btn.active.jsx-4671455dbd45ca6f{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 4px 12px var(--accent-glow)}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/SettingsPanel.js",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
}),
"[project]/aitdl4/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SettingsPanel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/SettingsPanel.js [ssr] (ecmascript)");
;
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
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [uiMode, setUiMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('directory');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleStorage = ()=>{
            const mode = localStorage.getItem('aitdl_uimode') || 'directory';
            setUiMode(mode);
        };
        handleStorage();
        window.addEventListener('storage', handleStorage);
        return ()=>window.removeEventListener('storage', handleStorage);
    }, []);
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            textDecoration: 'none'
                        },
                        title: "Artificial Intelligence Technology & Deep Learning",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.5s var(--ease)'
                                },
                                className: "jsx-3d7db80926d399fc" + " " + "logo-glow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
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
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-3d7db80926d399fc" + " " + "logo-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--accent)'
                                                },
                                                className: "jsx-3d7db80926d399fc",
                                                children: "."
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/Header.js",
                                                lineNumber: 112,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Header.js",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 24
                        },
                        className: "jsx-3d7db80926d399fc",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 16,
                                    alignItems: 'center'
                                },
                                className: "jsx-3d7db80926d399fc",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 1,
                                    height: 24,
                                    background: 'var(--border)'
                                },
                                className: "jsx-3d7db80926d399fc"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                },
                                className: "jsx-3d7db80926d399fc",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: '8px 20px',
                                            background: 'linear-gradient(to bottom, #FF8E64, #FF6B35)',
                                            color: '#fff',
                                            borderRadius: 12,
                                            fontSize: 13,
                                            fontWeight: 900,
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 20px var(--accent-glow)',
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase'
                                        },
                                        className: "jsx-3d7db80926d399fc",
                                        children: uiMode === 'command' ? 'Sign Up' : 'Log In'
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/Header.js",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Header.js",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Header.js",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/Header.js",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SettingsPanel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: settingsOpen,
                onClose: ()=>setSettingsOpen(false),
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/Header.js",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "3d7db80926d399fc",
                children: ".nav-link.jsx-3d7db80926d399fc:hover{color:var(--accent);background:#ffffff08}.gear-btn.jsx-3d7db80926d399fc:hover{border-color:var(--accent);box-shadow:0 0 15px var(--accent-glow);transform:rotate(45deg)}@media (width<=768px){.logo-text.jsx-3d7db80926d399fc,nav.jsx-3d7db80926d399fc{display:none}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/Header.js",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
"[project]/aitdl4/components/Footer.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
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
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
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
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('aitdl_lang') || 'en';
        setLang(saved);
        // Listen for storage changes to sync across tabs/components
        const handleStorage = ()=>{
            setLang(localStorage.getItem('aitdl_lang') || 'en');
        };
        window.addEventListener('storage', handleStorage);
        return ()=>window.removeEventListener('storage', handleStorage);
    }, []);
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        style: {
            borderTop: '1px solid var(--border)',
            padding: '64px 24px',
            marginTop: 80,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 48,
                    marginBottom: 64
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 20
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/logo-horizontal.svg",
                                    alt: "AITDL Branding",
                                    style: {
                                        height: 60,
                                        width: 'auto',
                                        filter: 'drop-shadow(0 0 10px rgba(0, 180, 216, 0.2))'
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 14,
                                    color: 'var(--text3)',
                                    lineHeight: 1.8,
                                    maxWidth: 300
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                ].map(([label, href])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid var(--border)',
                    paddingTop: 48,
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 13,
                        color: 'var(--text3)',
                        lineHeight: 2,
                        fontWeight: 500
                    },
                    children: [
                        t.built,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--text)',
                                fontWeight: 800,
                                marginLeft: 6,
                                fontFamily: 'Outfit',
                                letterSpacing: '0.05em'
                            },
                            children: "Jawahar Ramkripal Mallah"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
}),
"[project]/aitdl4/components/ToolCard.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
function ToolCard({ tool, onCompare, isSelected, viewMode = 'grid' }) {
    const cardRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: cardRef,
        onMouseMove: handleMouseMove,
        style: {
            background: 'var(--bg2)',
            border: tool.featured ? '1.5px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: 16,
            padding: 'var(--card-padding)',
            display: 'flex',
            flexDirection: isList ? 'row' : 'column',
            alignItems: isList ? 'center' : 'stretch',
            gap: 'var(--card-gap)',
            transition: 'transform 0.3s var(--ease), box-shadow 0.3s var(--ease), padding 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            animation: 'slide-up 0.4s var(--ease) forwards'
        },
        className: "jsx-9000fd305d0d9108" + " " + "premium-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 53, 0.08), transparent 80%)`,
                    pointerEvents: 'none',
                    zIndex: 0
                },
                className: "jsx-9000fd305d0d9108"
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-9000fd305d0d9108",
                children: [
                    tool.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '4px 10px',
                            borderRadius: 12,
                            background: 'var(--accent)',
                            color: '#fff',
                            fontWeight: 700,
                            letterSpacing: '0.02em'
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: "FEATURED"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    tool.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '4px 10px',
                            borderRadius: 12,
                            background: 'rgba(34,197,94,0.1)',
                            color: '#4ADE80',
                            fontWeight: 600,
                            border: '1px solid rgba(74, 222, 128, 0.2)'
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: "✓ Verified"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '4px 10px',
                            borderRadius: 12,
                            background: tool.pricing === 'free' ? 'rgba(34,197,94,0.1)' : tool.pricing === 'freemium' ? 'rgba(251,191,36,0.1)' : 'rgba(239,68,68,0.1)',
                            color: tool.pricing === 'free' ? '#4ADE80' : tool.pricing === 'freemium' ? '#FBBF24' : '#F87171',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            border: `1px solid ${tool.pricing === 'free' ? 'rgba(74, 222, 128, 0.2)' : tool.pricing === 'freemium' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: tool.pricing
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-9000fd305d0d9108",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 32,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                },
                                className: "jsx-9000fd305d0d9108",
                                children: tool.emoji
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 800,
                                    color: 'var(--text)',
                                    margin: 0,
                                    lineHeight: 1.2
                                },
                                className: "jsx-9000fd305d0d9108",
                                children: tool.name
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 14,
                            color: 'var(--text2)',
                            lineHeight: 1.6,
                            marginBottom: 20,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: tool.description
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap',
                            marginBottom: 20
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: tool.category.slice(0, 3).map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    padding: '3px 10px',
                                    borderRadius: 8,
                                    background: 'var(--bg3)',
                                    color: 'var(--text3)',
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                    border: '1px solid var(--border)'
                                },
                                className: "jsx-9000fd305d0d9108",
                                children: cat
                            }, cat, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 12,
                    marginTop: 'auto',
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-9000fd305d0d9108",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/tools/${tool.slug}`,
                        style: {
                            flex: 1.5,
                            padding: '10px',
                            background: 'var(--bg3)',
                            border: '1px solid var(--border)',
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 600,
                            color: 'var(--text)',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'all 0.2s var(--ease)'
                        },
                        className: "btn-secondary",
                        children: "Details →"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onCompare(tool);
                        },
                        style: {
                            flex: 1,
                            padding: '10px 14px',
                            background: isSelected ? 'var(--accent)' : 'transparent',
                            border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 600,
                            color: isSelected ? '#fff' : 'var(--text2)',
                            cursor: 'pointer',
                            transition: 'all 0.2s var(--ease)'
                        },
                        className: "jsx-9000fd305d0d9108",
                        children: isSelected ? '✓ Added' : '+ Compare'
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "9000fd305d0d9108",
                children: ".premium-card.jsx-9000fd305d0d9108:hover{border-color:#ff6b354d;transform:translateY(-4px)scale(1.01);box-shadow:0 12px 40px #0009}.btn-secondary.jsx-9000fd305d0d9108:hover{background:var(--bg2);border-color:var(--accent);color:var(--accent)}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/ToolCard.js",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/aitdl4/components/NeuralNetwork.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
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
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const NeuralNetwork = ()=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
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
        const init = ()=>{
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
        };
        init();
        let mouse = {
            x: -1000,
            y: -1000
        };
        const handleMouseMove = (e)=>{
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        const animate = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach((n, i)=>{
                nodes.slice(i + 1).forEach((m)=>{
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
                });
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
            });
            requestAnimationFrame(animate);
        };
        animate();
        window.addEventListener('resize', init);
        return ()=>{
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
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
const __TURBOPACK__default__export__ = NeuralNetwork;
}),
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
"[project]/aitdl4/data/tools.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"_metadata\":{\"author\":\"Jawahar Ramkripal Mallah\",\"designation\":\"Software Developer & Service Provider since 2007, Published Author, Tech Entrepreneur\",\"website\":\"https://aitdl.com\",\"email\":\"hello@aitdl.com\",\"copyright\":\"© 2025 All Rights Reserved\",\"version\":\"4.6.2\",\"lastUpdated\":\"2025-03-14\",\"totalTools\":100},\"tools\":[{\"id\":1,\"name\":\"ChatGPT\",\"slug\":\"chatgpt\",\"description\":\"OpenAI's powerful AI assistant for writing, coding, and problem solving.\",\"category\":[\"study\",\"writing\",\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://chatgpt.com\",\"emoji\":\"🤖\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":2,\"name\":\"Google Gemini\",\"slug\":\"gemini\",\"description\":\"Google's multimodal AI — text, image, code sab handle karta hai.\",\"category\":[\"study\",\"writing\",\"coding\"],\"pricing\":\"free\",\"url\":\"https://gemini.google.com\",\"emoji\":\"✨\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":3,\"name\":\"Claude\",\"slug\":\"claude\",\"description\":\"Anthropic's AI — long documents, analysis, aur safe responses ke liye best.\",\"category\":[\"study\",\"writing\",\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://claude.ai\",\"emoji\":\"🧠\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":4,\"name\":\"Microsoft Copilot\",\"slug\":\"copilot\",\"description\":\"Microsoft ka AI — Word, Excel, PowerPoint mein seedha kaam karta hai.\",\"category\":[\"study\",\"writing\",\"productivity\"],\"pricing\":\"free\",\"url\":\"https://copilot.microsoft.com\",\"emoji\":\"💼\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":5,\"name\":\"Perplexity AI\",\"slug\":\"perplexity\",\"description\":\"AI search engine — real-time web search ke saath accurate answers deta hai.\",\"category\":[\"study\",\"research\"],\"pricing\":\"freemium\",\"url\":\"https://perplexity.ai\",\"emoji\":\"🔍\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"JEE\",\"NEET\"],\"featured\":true,\"verified\":true},{\"id\":6,\"name\":\"Wolfram Alpha\",\"slug\":\"wolfram-alpha\",\"description\":\"Maths, physics, chemistry — step by step solutions. JEE ke liye gold.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://wolframalpha.com\",\"emoji\":\"🔢\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":7,\"name\":\"Photomath\",\"slug\":\"photomath\",\"description\":\"Camera se photo lo — maths solve ho jaata hai step by step.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://photomath.com\",\"emoji\":\"📸\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":8,\"name\":\"Quizlet AI\",\"slug\":\"quizlet\",\"description\":\"Flashcards aur AI-powered revision. Exam prep ke liye best tool.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://quizlet.com\",\"emoji\":\"📚\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"NEET\",\"JEE\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":9,\"name\":\"Grammarly\",\"slug\":\"grammarly\",\"description\":\"English writing improve karo — grammar, tone, clarity sab fix karta hai.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://grammarly.com\",\"emoji\":\"✍️\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":10,\"name\":\"Google NotebookLM\",\"slug\":\"notebooklm\",\"description\":\"PDF aur notes upload karo — AI padh ke sawaalon ke jawab dega.\",\"category\":[\"study\",\"research\"],\"pricing\":\"free\",\"url\":\"https://notebooklm.google.com\",\"emoji\":\"📔\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":11,\"name\":\"Sarvam AI — Indus\",\"slug\":\"sarvam-ai\",\"description\":\"India ka apna AI! 22 Indian languages mein baat karo. Made in India.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://www.sarvam.ai\",\"emoji\":\"🇮🇳\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":12,\"name\":\"Krutrim AI\",\"slug\":\"krutrim-ai\",\"description\":\"Ola founder ka Indian AI — Hindi aur regional languages ke liye best.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://krutrim.com\",\"emoji\":\"⚡\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":13,\"name\":\"BHASHINI\",\"slug\":\"bhashini\",\"description\":\"Government of India ka official AI — 22 Indian languages mein translation.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://bhashini.gov.in\",\"emoji\":\"🏛️\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":14,\"name\":\"BharatGPT\",\"slug\":\"bharatgpt\",\"description\":\"India ka apna GPT — 22 languages mein text aur 12 mein voice support.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://bharatgpt.ai\",\"emoji\":\"🇮🇳\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":15,\"name\":\"AI4Bharat\",\"slug\":\"ai4bharat\",\"description\":\"IIT Madras ka research AI — Hindi, Tamil, Telugu, Bengali tools.\",\"category\":[\"study\",\"india\"],\"pricing\":\"free\",\"url\":\"https://ai4bharat.iitm.ac.in\",\"emoji\":\"🎓\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":16,\"name\":\"Anuvadini\",\"slug\":\"anuvadini\",\"description\":\"AICTE ka AI — Engineering, Medical, Law books ko Indian languages mein translate karta hai.\",\"category\":[\"study\",\"india\"],\"pricing\":\"free\",\"url\":\"https://anuvadini.aicte-india.org\",\"emoji\":\"📚\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":17,\"name\":\"GitHub Copilot\",\"slug\":\"github-copilot\",\"description\":\"Code likhte waqt AI suggestions — developers ka best friend.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://github.com/features/copilot\",\"emoji\":\"👨‍💻\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":true,\"verified\":true},{\"id\":18,\"name\":\"Cursor AI\",\"slug\":\"cursor\",\"description\":\"AI-powered code editor — poora codebase samjhta hai aur suggest karta hai.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://cursor.sh\",\"emoji\":\"⌨️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":19,\"name\":\"Replit AI\",\"slug\":\"replit\",\"description\":\"Browser mein code karo — AI help ke saath. No setup needed.\",\"category\":[\"coding\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://replit.com\",\"emoji\":\"🔧\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":20,\"name\":\"Midjourney\",\"slug\":\"midjourney\",\"description\":\"World's best AI image generator — photorealistic aur artistic images.\",\"category\":[\"image\"],\"pricing\":\"paid\",\"url\":\"https://midjourney.com\",\"emoji\":\"🎨\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":21,\"name\":\"Canva AI\",\"slug\":\"canva-ai\",\"description\":\"Design + AI — posters, presentations, social media graphics minutes mein.\",\"category\":[\"image\",\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://canva.com\",\"emoji\":\"🖼️\",\"hindi_support\":true,\"india_score\":5,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":22,\"name\":\"Adobe Firefly\",\"slug\":\"adobe-firefly\",\"description\":\"Adobe ka AI image generator — commercially safe, high quality.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://firefly.adobe.com\",\"emoji\":\"🔥\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":23,\"name\":\"DALL-E 3\",\"slug\":\"dalle\",\"description\":\"OpenAI ka image AI — text se realistic images banao.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://openai.com/dall-e-3\",\"emoji\":\"🖌️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":24,\"name\":\"Stable Diffusion\",\"slug\":\"stable-diffusion\",\"description\":\"Open source image AI — free mein apne computer pe chalao.\",\"category\":[\"image\"],\"pricing\":\"free\",\"url\":\"https://stability.ai\",\"emoji\":\"🌊\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":25,\"name\":\"Notion AI\",\"slug\":\"notion-ai\",\"description\":\"Notes, docs, projects — sab ek jagah, AI ke saath.\",\"category\":[\"productivity\",\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://notion.so\",\"emoji\":\"📝\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":26,\"name\":\"Otter.ai\",\"slug\":\"otter-ai\",\"description\":\"Lectures aur meetings record karo — AI automatically transcript banata hai.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://otter.ai\",\"emoji\":\"🎙️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":27,\"name\":\"Consensus\",\"slug\":\"consensus\",\"description\":\"Research papers mein se AI answers dhundho — UPSC aur research ke liye best.\",\"category\":[\"research\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://consensus.app\",\"emoji\":\"📊\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":28,\"name\":\"Elicit\",\"slug\":\"elicit\",\"description\":\"AI research assistant — academic papers summarize karta hai.\",\"category\":[\"research\"],\"pricing\":\"freemium\",\"url\":\"https://elicit.com\",\"emoji\":\"🔬\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":29,\"name\":\"SciSpace\",\"slug\":\"scispace\",\"description\":\"Research papers padhna easy karo — AI explain karta hai complex concepts.\",\"category\":[\"research\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://typeset.io\",\"emoji\":\"🔭\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\"],\"featured\":true,\"verified\":true},{\"id\":30,\"name\":\"Runway ML\",\"slug\":\"runway\",\"description\":\"AI video editor — text se video banao, background remove karo.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://runwayml.com\",\"emoji\":\"🎬\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":31,\"name\":\"ElevenLabs\",\"slug\":\"elevenlabs\",\"description\":\"Text to speech — natural human voice mein convert karo. Hindi support.\",\"category\":[\"video\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://elevenlabs.io\",\"emoji\":\"🔊\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":32,\"name\":\"Descript\",\"slug\":\"descript\",\"description\":\"Video/podcast edit karo text ki tarah — AI se filler words remove karo.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://descript.com\",\"emoji\":\"✂️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":33,\"name\":\"Pictory\",\"slug\":\"pictory\",\"description\":\"Text ya script se automatically video banao — content creators ke liye.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://pictory.ai\",\"emoji\":\"📹\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":34,\"name\":\"Resume.io\",\"slug\":\"resume-io\",\"description\":\"AI se professional resume banao — job seekers ke liye best.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://resume.io\",\"emoji\":\"📄\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":35,\"name\":\"LinkedIn AI\",\"slug\":\"linkedin-ai\",\"description\":\"LinkedIn profile optimize karo, cover letters likho AI se.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://linkedin.com\",\"emoji\":\"💼\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":36,\"name\":\"Interviewing.io\",\"slug\":\"interviewing-io\",\"description\":\"AI mock interviews — coding aur system design practice karo.\",\"category\":[\"career\",\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://interviewing.io\",\"emoji\":\"🎯\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":37,\"name\":\"Khan Academy Khanmigo\",\"slug\":\"khanmigo\",\"description\":\"Khan Academy ka AI tutor — students ke saath step by step problem solve karta hai.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://khanacademy.org\",\"emoji\":\"🏫\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":38,\"name\":\"Duolingo AI\",\"slug\":\"duolingo\",\"description\":\"Language learning AI — English improve karo gamified way mein.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://duolingo.com\",\"emoji\":\"🦜\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"Boards\",\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":39,\"name\":\"Socratic by Google\",\"slug\":\"socratic\",\"description\":\"Google ka student AI — photo lo sawaal ka, explanation milega.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://socratic.org\",\"emoji\":\"📱\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":40,\"name\":\"Brainly AI\",\"slug\":\"brainly\",\"description\":\"Students ke sawaalon ke AI answers — community + AI combined.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://brainly.com\",\"emoji\":\"🧩\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":41,\"name\":\"Copy.ai\",\"slug\":\"copy-ai\",\"description\":\"Marketing copy, blogs, social media posts AI se likho seconds mein.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://copy.ai\",\"emoji\":\"✍️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":42,\"name\":\"Jasper AI\",\"slug\":\"jasper\",\"description\":\"Long form content AI — blogs, articles, marketing copy ke liye.\",\"category\":[\"writing\"],\"pricing\":\"paid\",\"url\":\"https://jasper.ai\",\"emoji\":\"📰\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":43,\"name\":\"QuillBot\",\"slug\":\"quillbot\",\"description\":\"Paraphrasing AI — content rewrite karo, summarize karo.\",\"category\":[\"writing\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://quillbot.com\",\"emoji\":\"🖊️\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":44,\"name\":\"Hemingway Editor\",\"slug\":\"hemingway\",\"description\":\"Writing clear aur simple banao — readability score ke saath.\",\"category\":[\"writing\"],\"pricing\":\"free\",\"url\":\"https://hemingwayapp.com\",\"emoji\":\"📖\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":45,\"name\":\"Tabnine\",\"slug\":\"tabnine\",\"description\":\"AI code completion — sabhi languages mein, privacy-first.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://tabnine.com\",\"emoji\":\"💻\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":46,\"name\":\"Codeium\",\"slug\":\"codeium\",\"description\":\"Free AI code assistant — 70+ languages support karta hai.\",\"category\":[\"coding\"],\"pricing\":\"free\",\"url\":\"https://codeium.com\",\"emoji\":\"🚀\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":true,\"verified\":true},{\"id\":47,\"name\":\"Blackbox AI\",\"slug\":\"blackbox\",\"description\":\"Code search aur completion — developers ke liye fast AI tool.\",\"category\":[\"coding\"],\"pricing\":\"free\",\"url\":\"https://blackbox.ai\",\"emoji\":\"⬛\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":48,\"name\":\"Miro AI\",\"slug\":\"miro-ai\",\"description\":\"Visual collaboration + AI — mind maps, flowcharts, diagrams banao.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://miro.com\",\"emoji\":\"🗺️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":49,\"name\":\"Todoist AI\",\"slug\":\"todoist\",\"description\":\"AI smart task manager — priorities automatically set karta hai.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://todoist.com\",\"emoji\":\"✅\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":50,\"name\":\"Motion AI\",\"slug\":\"motion\",\"description\":\"AI schedule planner — automatically meetings aur tasks plan karta hai.\",\"category\":[\"productivity\"],\"pricing\":\"paid\",\"url\":\"https://usemotion.com\",\"emoji\":\"📅\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":51,\"name\":\"Mathway\",\"slug\":\"mathway\",\"description\":\"Step by step maths solver — algebra se calculus tak sab.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://mathway.com\",\"emoji\":\"➗\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":52,\"name\":\"Symbolab\",\"slug\":\"symbolab\",\"description\":\"Maths AI — calculus, algebra, trigonometry step by step.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://symbolab.com\",\"emoji\":\"🔣\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":53,\"name\":\"GeoGebra AI\",\"slug\":\"geogebra\",\"description\":\"Geometry, graphs, 3D visualization — maths visually samjho.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"free\",\"url\":\"https://geogebra.org\",\"emoji\":\"📐\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":54,\"name\":\"Desmos\",\"slug\":\"desmos\",\"description\":\"Free graphing calculator — functions plot karo instantly.\",\"category\":[\"maths\"],\"pricing\":\"free\",\"url\":\"https://desmos.com\",\"emoji\":\"📈\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":55,\"name\":\"Pika Labs\",\"slug\":\"pika\",\"description\":\"Text se short videos banao — AI video generation.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://pika.art\",\"emoji\":\"🎥\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":56,\"name\":\"Suno AI\",\"slug\":\"suno\",\"description\":\"Text se music banao — AI generated songs in seconds.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://suno.ai\",\"emoji\":\"🎵\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":57,\"name\":\"Udio\",\"slug\":\"udio\",\"description\":\"AI music generator — professional quality songs banao free mein.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://udio.com\",\"emoji\":\"🎶\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":58,\"name\":\"Murf AI\",\"slug\":\"murf\",\"description\":\"Hindi voiceover AI — 20+ Indian voices, presentations ke liye.\",\"category\":[\"video\",\"india\"],\"pricing\":\"freemium\",\"url\":\"https://murf.ai\",\"emoji\":\"🎤\",\"hindi_support\":true,\"india_score\":5,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":59,\"name\":\"Tome AI\",\"slug\":\"tome\",\"description\":\"AI presentation maker — slides automatically banata hai topic se.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://tome.app\",\"emoji\":\"🎭\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\",\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":60,\"name\":\"Beautiful.ai\",\"slug\":\"beautiful-ai\",\"description\":\"Smart presentation tool — AI auto-design karta hai slides.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://beautiful.ai\",\"emoji\":\"💎\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":61,\"name\":\"Gamma AI\",\"slug\":\"gamma\",\"description\":\"Presentations, docs, webpages — AI se minutes mein banao.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://gamma.app\",\"emoji\":\"⚡\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":62,\"name\":\"Writesonic\",\"slug\":\"writesonic\",\"description\":\"AI writer — blogs, ads, product descriptions fast likhta hai.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://writesonic.com\",\"emoji\":\"🖋️\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":63,\"name\":\"Anyword\",\"slug\":\"anyword\",\"description\":\"Marketing copy AI — conversion optimize karta hai automatically.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://anyword.com\",\"emoji\":\"📣\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":64,\"name\":\"Scite AI\",\"slug\":\"scite\",\"description\":\"Research citations verify karo — papers support ya contradict karte hain.\",\"category\":[\"research\"],\"pricing\":\"freemium\",\"url\":\"https://scite.ai\",\"emoji\":\"📑\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":65,\"name\":\"Research Rabbit\",\"slug\":\"research-rabbit\",\"description\":\"Academic papers discover karo — related papers automatically milte hain.\",\"category\":[\"research\"],\"pricing\":\"free\",\"url\":\"https://researchrabbit.ai\",\"emoji\":\"🐰\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":66,\"name\":\"Semantic Scholar\",\"slug\":\"semantic-scholar\",\"description\":\"AI-powered academic search — free research papers dhundho.\",\"category\":[\"research\"],\"pricing\":\"free\",\"url\":\"https://semanticscholar.org\",\"emoji\":\"🔎\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"JEE\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":67,\"name\":\"Scholarcy\",\"slug\":\"scholarcy\",\"description\":\"Research papers ko flashcards mein convert karo — quick revision.\",\"category\":[\"research\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://scholarcy.com\",\"emoji\":\"🎓\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":68,\"name\":\"Woebot\",\"slug\":\"woebot\",\"description\":\"Mental health AI chatbot — exam stress aur anxiety ke liye.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://woebot.io\",\"emoji\":\"💚\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\"],\"featured\":true,\"verified\":true},{\"id\":69,\"name\":\"Forest App\",\"slug\":\"forest\",\"description\":\"Focus timer + AI — phone addiction rokta hai, study time badhata hai.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://forestapp.cc\",\"emoji\":\"🌳\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\"],\"featured\":true,\"verified\":true},{\"id\":70,\"name\":\"Anki AI\",\"slug\":\"anki\",\"description\":\"Spaced repetition flashcards — scientifically proven memory technique.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://apps.ankiweb.net\",\"emoji\":\"🃏\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":71,\"name\":\"Explain Everything\",\"slug\":\"explain-everything\",\"description\":\"Interactive whiteboard AI — teachers aur students ke liye.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://explaineverything.com\",\"emoji\":\"📋\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":72,\"name\":\"Lumosity\",\"slug\":\"lumosity\",\"description\":\"Brain training AI games — concentration aur memory improve karo.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://lumosity.com\",\"emoji\":\"🧠\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":73,\"name\":\"Codecademy AI\",\"slug\":\"codecademy\",\"description\":\"Coding sikhao AI tutor ke saath — beginners ke liye best.\",\"category\":[\"coding\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://codecademy.com\",\"emoji\":\"👨‍🏫\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":74,\"name\":\"Leetcode AI\",\"slug\":\"leetcode\",\"description\":\"Coding interview prep — AI hints aur solutions ke saath.\",\"category\":[\"coding\",\"career\"],\"pricing\":\"freemium\",\"url\":\"https://leetcode.com\",\"emoji\":\"🏆\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":true,\"verified\":true},{\"id\":75,\"name\":\"Hugging Face\",\"slug\":\"hugging-face\",\"description\":\"Open source AI models — developers aur researchers ke liye.\",\"category\":[\"coding\",\"research\"],\"pricing\":\"free\",\"url\":\"https://huggingface.co\",\"emoji\":\"🤗\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":76,\"name\":\"Ideogram\",\"slug\":\"ideogram\",\"description\":\"AI image generator — text ke saath accurate images banata hai.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://ideogram.ai\",\"emoji\":\"🎭\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":77,\"name\":\"Leonardo AI\",\"slug\":\"leonardo\",\"description\":\"Game assets aur creative images AI se banao — free credits daily.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://leonardo.ai\",\"emoji\":\"🦁\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":78,\"name\":\"Remove.bg\",\"slug\":\"remove-bg\",\"description\":\"Background remove karo instantly — AI se, free mein.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://remove.bg\",\"emoji\":\"✂️\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":79,\"name\":\"Upscayl\",\"slug\":\"upscayl\",\"description\":\"Blurry images ko HD karo — free, open source AI upscaler.\",\"category\":[\"image\"],\"pricing\":\"free\",\"url\":\"https://upscayl.org\",\"emoji\":\"🔍\",\"hindi_support\":false,\"india_score\":5,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":80,\"name\":\"D-ID\",\"slug\":\"d-id\",\"description\":\"Photo se talking avatar banao — presentations ke liye.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://d-id.com\",\"emoji\":\"👤\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":81,\"name\":\"HeyGen\",\"slug\":\"heygen\",\"description\":\"AI avatar videos — apni likhai ko video mein convert karo.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://heygen.com\",\"emoji\":\"🎙️\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":82,\"name\":\"Loom AI\",\"slug\":\"loom\",\"description\":\"Screen record karo + AI summary — teachers ke liye perfect.\",\"category\":[\"video\",\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://loom.com\",\"emoji\":\"📹\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":83,\"name\":\"Notta AI\",\"slug\":\"notta\",\"description\":\"Meeting aur lecture transcription — Hindi bhi support karta hai.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://notta.ai\",\"emoji\":\"📝\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":84,\"name\":\"Taskade AI\",\"slug\":\"taskade\",\"description\":\"AI project management + notes + tasks ek jagah.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://taskade.com\",\"emoji\":\"📌\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":85,\"name\":\"Reclaim AI\",\"slug\":\"reclaim\",\"description\":\"Calendar AI — automatically study time block karta hai.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://reclaim.ai\",\"emoji\":\"🗓️\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":86,\"name\":\"Glasp AI\",\"slug\":\"glasp\",\"description\":\"Web highlights + AI summary — online padhte waqt notes banao.\",\"category\":[\"research\",\"study\"],\"pricing\":\"free\",\"url\":\"https://glasp.co\",\"emoji\":\"🖊️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":87,\"name\":\"Humata AI\",\"slug\":\"humata\",\"description\":\"PDF chatbot — koi bhi document upload karo, sawaal poochho.\",\"category\":[\"study\",\"research\"],\"pricing\":\"freemium\",\"url\":\"https://humata.ai\",\"emoji\":\"📄\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"NEET\"],\"featured\":true,\"verified\":true},{\"id\":88,\"name\":\"Tactiq\",\"slug\":\"tactiq\",\"description\":\"Google Meet aur Zoom mein AI notes — lectures capture karo.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://tactiq.io\",\"emoji\":\"🎧\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":90,\"name\":\"Wix AI\",\"slug\":\"wix-ai\",\"description\":\"AI website builder — bina coding ke professional site banao.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://wix.com\",\"emoji\":\"🌐\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":91,\"name\":\"Framer AI\",\"slug\":\"framer\",\"description\":\"AI website design — text se beautiful websites instantly.\",\"category\":[\"coding\",\"image\"],\"pricing\":\"freemium\",\"url\":\"https://framer.com\",\"emoji\":\"🖥️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":92,\"name\":\"Interviews.ai\",\"slug\":\"interviews-ai\",\"description\":\"AI mock interview practice — HR aur technical dono.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://interviews.ai\",\"emoji\":\"🤝\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":93,\"name\":\"Kickresume\",\"slug\":\"kickresume\",\"description\":\"AI resume builder — ATS-friendly professional resumes.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://kickresume.com\",\"emoji\":\"📋\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":94,\"name\":\"Jobscan AI\",\"slug\":\"jobscan\",\"description\":\"Resume ko job description se match karo — ATS score badhao.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://jobscan.co\",\"emoji\":\"🎯\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":95,\"name\":\"Rytr\",\"slug\":\"rytr\",\"description\":\"Affordable AI writer — emails, blogs, social posts Hindi mein bhi.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://rytr.me\",\"emoji\":\"✒️\",\"hindi_support\":true,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":96,\"name\":\"Sudowrite\",\"slug\":\"sudowrite\",\"description\":\"Creative writing AI — stories aur novels likhne mein help.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://sudowrite.com\",\"emoji\":\"📚\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":97,\"name\":\"Magic School AI\",\"slug\":\"magic-school\",\"description\":\"Teachers ke liye AI — lesson plans, quizzes, assignments banao.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://magicschool.ai\",\"emoji\":\"🏫\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":98,\"name\":\"Diffit AI\",\"slug\":\"diffit\",\"description\":\"Reading materials AI se adapt karo — students ke level ke hisaab se.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://diffit.me\",\"emoji\":\"📖\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":99,\"name\":\"BharatGen AI\",\"slug\":\"bharatgen\",\"description\":\"IIT Bombay ka AI — June 2026 tak 22 Indian languages cover karega.\",\"category\":[\"study\",\"india\"],\"pricing\":\"free\",\"url\":\"https://bharatgen.gov.in\",\"emoji\":\"🏛️\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":100,\"name\":\"iMerit AI\",\"slug\":\"imerit\",\"description\":\"India ka AI data company — Indian languages ke liye AI solutions.\",\"category\":[\"india\"],\"pricing\":\"free\",\"url\":\"https://imerit.net\",\"emoji\":\"🇮🇳\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":101,\"name\":\"Zoho AI\",\"slug\":\"zoho-ai\",\"description\":\"India ka apna business AI — CRM, email, projects sab mein AI.\",\"category\":[\"productivity\",\"india\"],\"pricing\":\"freemium\",\"url\":\"https://zoho.com\",\"emoji\":\"🏢\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[],\"featured\":true,\"verified\":true}]}"));}),
"[project]/aitdl4/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
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
 * Updated: 2026-03-14 - Final UI Restoration Verified
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Footer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/ToolCard.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$NeuralNetwork$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/NeuralNetwork.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/router.js [ssr] (ecmascript)");
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
function Home({ tools }) {
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('en');
    const [uiMode, setUiMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('directory');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('grid');
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('All');
    const [exam, setExam] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('All');
    const [pricing, setPricing] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('All');
    const [compareList, setCompareList] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [filtered, setFiltered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(tools || []);
    const [visitorCount, setVisitorCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(8506);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const t = LANG_TEXT[lang] || LANG_TEXT.en;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Initial load from storage
        const savedLang = localStorage.getItem('aitdl_lang') || 'en';
        setLang(savedLang);
        const savedUi = localStorage.getItem('aitdl_uimode') || 'directory';
        setUiMode(savedUi);
        const savedView = localStorage.getItem('aitdl_viewmode') || 'grid';
        setViewMode(savedView);
        const savedOrigin = localStorage.getItem('aitdl_origin') || 'all';
        setOrigin(savedOrigin);
        // Stats
        const savedVisitors = localStorage.getItem('aitdl_visitors');
        const count = savedVisitors ? parseInt(savedVisitors) + 1 : 8506;
        setVisitorCount(count);
        localStorage.setItem('aitdl_visitors', count);
        const handleStorage = ()=>{
            setLang(localStorage.getItem('aitdl_lang') || 'en');
            setUiMode(localStorage.getItem('aitdl_uimode') || 'directory');
            setViewMode(localStorage.getItem('aitdl_viewmode') || 'grid');
            setOrigin(localStorage.getItem('aitdl_origin') || 'all');
        };
        window.addEventListener('storage', handleStorage);
        return ()=>window.removeEventListener('storage', handleStorage);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let result = tools || [];
        if (origin === 'bharat') {
            result = result.filter((tool)=>tool.category.includes('india'));
        }
        if (category !== 'All') {
            result = result.filter((tool)=>tool.category.includes(category));
        }
        if (exam !== 'All') {
            result = result.filter((tool)=>tool.exam_tags.includes(exam));
        }
        if (pricing !== 'All') {
            result = result.filter((tool)=>tool.pricing === pricing.toLowerCase());
        }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((tool)=>tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.exam_tags.some((tag)=>tag.toLowerCase().includes(q)) || tool.category.some((cat)=>cat.toLowerCase().includes(q)));
        }
        setFiltered(result);
    }, [
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
    const filterBtn = (val, current, setter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
            lineNumber: 205,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: 'var(--bg)',
            color: 'var(--text)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "AITDL — India's AI Command Center"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Artificial Intelligence Technology & Deep Learning - Empowering India's Future with Advanced AI"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '64px 24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$NeuralNetwork$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1,
                            marginBottom: 80
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 24,
                                    display: 'flex',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 120,
                                        height: 120,
                                        filter: 'drop-shadow(0 0 30px var(--accent-glow))'
                                    },
                                    className: "logo-glow",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/logo-singularity.svg",
                                        alt: "AITDL Singularity",
                                        style: {
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/pages/index.js",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'inline-block',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    letterSpacing: '0.15em',
                                    color: 'var(--accent)',
                                    background: 'rgba(255,107,53,0.08)',
                                    border: '1px solid rgba(255,107,53,0.2)',
                                    borderRadius: 30,
                                    padding: '6px 20px',
                                    marginBottom: 32
                                },
                                children: "INDIA'S #1 AI TOOLS PLATFORM"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: uiMode === 'command' ? 'clamp(48px, 10vw, 112px)' : 'clamp(42px, 10vw, 84px)',
                                    fontWeight: 950,
                                    lineHeight: 0.95,
                                    marginBottom: 24,
                                    letterSpacing: '-0.05em'
                                },
                                children: uiMode === 'command' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: "Right AI Tool"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--accent)',
                                                background: 'linear-gradient(to bottom, #FF8E64, #FF6B35)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: "At The Right Time"
                                        }, void 0, false, {
                                            fileName: "[project]/aitdl4/pages/index.js",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: uiMode === 'command' ? 20 : 18,
                                    color: 'var(--text2)',
                                    maxWidth: uiMode === 'command' ? 700 : 540,
                                    margin: '0 auto 48px',
                                    lineHeight: 1.6
                                },
                                children: uiMode === 'command' ? t.cmdSub : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: "JEE, NEET, UPSC — the definitive collection of free AI tools for India's future leaders."
                                }, void 0, false)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            uiMode === 'command' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 20,
                                    justifyContent: 'center',
                                    marginBottom: 64
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        style: {
                                            padding: '20px 48px',
                                            background: 'linear-gradient(135deg, #FF8E64, #FF6B35)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 50,
                                            fontSize: 13,
                                            fontWeight: 900,
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 40px rgba(255,107,53,0.4)'
                                        },
                                        className: "btn-primary-glow",
                                        children: t.explore
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                val: '🇮🇳 IN',
                                color: '#FF6B35'
                            }
                        ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    uiMode === 'directory' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 640,
                            margin: '0 auto 48px',
                            position: 'relative'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
                            lineNumber: 349,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 10,
                                            overflowX: 'auto',
                                            paddingBottom: 4
                                        },
                                        children: CATEGORIES.map((c)=>filterBtn(c, category, setCategory))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 369,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                                lineNumber: 375,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8,
                                                    flexWrap: 'wrap'
                                                },
                                                children: EXAMS.map((e)=>filterBtn(e, exam, setExam))
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 376,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 374,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                                lineNumber: 381,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                                lineNumber: 382,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 380,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text3)',
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'var(--accent)',
                                    fontWeight: 700
                                },
                                children: filtered.length
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this),
                            " ",
                            t.found
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 'var(--grid-gap)'
                        },
                        children: filtered.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                tool: tool,
                                viewMode: viewMode,
                                onCompare: handleCompare,
                                isSelected: compareList.some((t)=>t.id === tool.id)
                            }, tool.id, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                lineNumber: 413,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: 'var(--text)',
                                    marginBottom: 10
                                },
                                children: "200+ tools being added"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 414,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: 'var(--text2)',
                                    lineHeight: 1.7
                                },
                                children: "Curating best AI tools across design, productivity, coding, research — verified for Indian users."
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            compareList.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                        lineNumber: 424,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                        lineNumber: 425,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                        lineNumber: 426,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 423,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 430,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/index.js",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
async function getStaticProps() {
    const data = __turbopack_context__.r("[project]/aitdl4/data/tools.json (json)");
    const tools = data.tools || data;
    return {
        props: {
            tools
        }
    };
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__523ec661._.js.map