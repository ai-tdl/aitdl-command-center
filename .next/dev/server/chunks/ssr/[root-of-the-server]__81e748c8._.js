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
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('dark');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('grid');
    const [density, setDensity] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('comfortable');
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('medium');
    const [indiaMode, setIndiaMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [accent, setAccent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('#FF6B35');
    const panelRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
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
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleEsc = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return ()=>window.removeEventListener('keydown', handleEsc);
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        onClick: onClose,
        className: "jsx-3405a1cd63eb9e91" + " " + "overlay",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                ref: panelRef,
                className: "jsx-3405a1cd63eb9e91" + " " + "panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-3405a1cd63eb9e91" + " " + "mobile-handle"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "jsx-3405a1cd63eb9e91",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: "⚙️ Settings"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-3405a1cd63eb9e91" + " " + "content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Interface Theme"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "grid-btns",
                                        children: THEMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Language"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: LANGUAGES.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "View Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>applyView('grid'),
                                                className: "jsx-3405a1cd63eb9e91" + " " + ((view === 'grid' ? 'active' : '') || ""),
                                                children: "🗂 Grid"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Density"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: DENSITIES.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Font Size"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "row-btns",
                                        children: FONT_SIZES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91" + " " + "flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "India Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "switch",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: indiaMode,
                                                onChange: (e)=>applyIndiaMode(e.target.checked),
                                                className: "jsx-3405a1cd63eb9e91"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-3405a1cd63eb9e91",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-3405a1cd63eb9e91",
                                        children: "Accent Colour"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SettingsPanel.js",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-3405a1cd63eb9e91" + " " + "color-row",
                                        children: ACCENTS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
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
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.5s var(--ease)'
                                },
                                className: "jsx-58f550ce9ff0c3dd" + " " + "logo-glow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-58f550ce9ff0c3dd" + " " + "logo-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--nav-gap, 24px)'
                        },
                        className: "jsx-58f550ce9ff0c3dd",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 'var(--nav-gap, 16px)',
                                    alignItems: 'center'
                                },
                                className: "jsx-58f550ce9ff0c3dd",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                },
                                className: "jsx-58f550ce9ff0c3dd",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SettingsPanel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: settingsOpen,
                onClose: ()=>setSettingsOpen(false),
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/Header.js",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
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
            background: 'var(--bg-primary)',
            backdropFilter: 'blur(20px)'
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 14,
                                    color: 'var(--text-tertiary)',
                                    lineHeight: 1.8,
                                    maxWidth: 300
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap'
                        },
                        className: "jsx-a86005ed30a24079",
                        children: [
                            tool.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                    tool.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-a86005ed30a24079",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16
                        },
                        className: "jsx-a86005ed30a24079",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap',
                            marginBottom: 24
                        },
                        className: "jsx-a86005ed30a24079",
                        children: tool.category.slice(0, 3).map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 16,
                    marginTop: 'auto',
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-a86005ed30a24079",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
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
}),
"[project]/aitdl4/data/tools.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"_metadata\":{\"author\":\"Jawahar Ramkripal Mallah\",\"designation\":\"Software Developer & Service Provider since 2007, Published Author, Tech Entrepreneur\",\"website\":\"https://aitdl.com\",\"email\":\"hello@aitdl.com\",\"copyright\":\"© 2025 AITDL - Artificial Intelligence Technology & Deep Learning\",\"version\":\"4.6.2\",\"lastUpdated\":\"2025-03-14\",\"totalTools\":100},\"tools\":[{\"id\":1,\"name\":\"ChatGPT\",\"slug\":\"chatgpt\",\"description\":\"OpenAI's powerful AI assistant for writing, coding, and problem solving.\",\"category\":[\"study\",\"writing\",\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://chatgpt.com\",\"emoji\":\"🤖\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":2,\"name\":\"Google Gemini\",\"slug\":\"gemini\",\"description\":\"Google's multimodal AI — text, image, code sab handle karta hai.\",\"category\":[\"study\",\"writing\",\"coding\"],\"pricing\":\"free\",\"url\":\"https://gemini.google.com\",\"emoji\":\"✨\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":3,\"name\":\"Claude\",\"slug\":\"claude\",\"description\":\"Anthropic's AI — long documents, analysis, aur safe responses ke liye best.\",\"category\":[\"study\",\"writing\",\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://claude.ai\",\"emoji\":\"🧠\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":4,\"name\":\"Microsoft Copilot\",\"slug\":\"copilot\",\"description\":\"Microsoft ka AI — Word, Excel, PowerPoint mein seedha kaam karta hai.\",\"category\":[\"study\",\"writing\",\"productivity\"],\"pricing\":\"free\",\"url\":\"https://copilot.microsoft.com\",\"emoji\":\"💼\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":5,\"name\":\"Perplexity AI\",\"slug\":\"perplexity\",\"description\":\"AI search engine — real-time web search ke saath accurate answers deta hai.\",\"category\":[\"study\",\"research\"],\"pricing\":\"freemium\",\"url\":\"https://perplexity.ai\",\"emoji\":\"🔍\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"JEE\",\"NEET\"],\"featured\":true,\"verified\":true},{\"id\":6,\"name\":\"Wolfram Alpha\",\"slug\":\"wolfram-alpha\",\"description\":\"Maths, physics, chemistry — step by step solutions. JEE ke liye gold.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://wolframalpha.com\",\"emoji\":\"🔢\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":7,\"name\":\"Photomath\",\"slug\":\"photomath\",\"description\":\"Camera se photo lo — maths solve ho jaata hai step by step.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://photomath.com\",\"emoji\":\"📸\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":8,\"name\":\"Quizlet AI\",\"slug\":\"quizlet\",\"description\":\"Flashcards aur AI-powered revision. Exam prep ke liye best tool.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://quizlet.com\",\"emoji\":\"📚\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"NEET\",\"JEE\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":9,\"name\":\"Grammarly\",\"slug\":\"grammarly\",\"description\":\"English writing improve karo — grammar, tone, clarity sab fix karta hai.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://grammarly.com\",\"emoji\":\"✍️\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":10,\"name\":\"Google NotebookLM\",\"slug\":\"notebooklm\",\"description\":\"PDF aur notes upload karo — AI padh ke sawaalon ke jawab dega.\",\"category\":[\"study\",\"research\"],\"pricing\":\"free\",\"url\":\"https://notebooklm.google.com\",\"emoji\":\"📔\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":11,\"name\":\"Sarvam AI — Indus\",\"slug\":\"sarvam-ai\",\"description\":\"India ka apna AI! 22 Indian languages mein baat karo. Made in India.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://www.sarvam.ai\",\"emoji\":\"🇮🇳\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":12,\"name\":\"Krutrim AI\",\"slug\":\"krutrim-ai\",\"description\":\"Ola founder ka Indian AI — Hindi aur regional languages ke liye best.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://krutrim.com\",\"emoji\":\"⚡\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":13,\"name\":\"BHASHINI\",\"slug\":\"bhashini\",\"description\":\"Government of India ka official AI — 22 Indian languages mein translation.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://bhashini.gov.in\",\"emoji\":\"🏛️\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":14,\"name\":\"BharatGPT\",\"slug\":\"bharatgpt\",\"description\":\"India ka apna GPT — 22 languages mein text aur 12 mein voice support.\",\"category\":[\"study\",\"writing\",\"india\"],\"pricing\":\"free\",\"url\":\"https://bharatgpt.ai\",\"emoji\":\"🇮🇳\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":15,\"name\":\"AI4Bharat\",\"slug\":\"ai4bharat\",\"description\":\"IIT Madras ka research AI — Hindi, Tamil, Telugu, Bengali tools.\",\"category\":[\"study\",\"india\"],\"pricing\":\"free\",\"url\":\"https://ai4bharat.iitm.ac.in\",\"emoji\":\"🎓\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":16,\"name\":\"Anuvadini\",\"slug\":\"anuvadini\",\"description\":\"AICTE ka AI — Engineering, Medical, Law books ko Indian languages mein translate karta hai.\",\"category\":[\"study\",\"india\"],\"pricing\":\"free\",\"url\":\"https://anuvadini.aicte-india.org\",\"emoji\":\"📚\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":17,\"name\":\"GitHub Copilot\",\"slug\":\"github-copilot\",\"description\":\"Code likhte waqt AI suggestions — developers ka best friend.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://github.com/features/copilot\",\"emoji\":\"👨‍💻\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":true,\"verified\":true},{\"id\":18,\"name\":\"Cursor AI\",\"slug\":\"cursor\",\"description\":\"AI-powered code editor — poora codebase samjhta hai aur suggest karta hai.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://cursor.sh\",\"emoji\":\"⌨️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":19,\"name\":\"Replit AI\",\"slug\":\"replit\",\"description\":\"Browser mein code karo — AI help ke saath. No setup needed.\",\"category\":[\"coding\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://replit.com\",\"emoji\":\"🔧\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":20,\"name\":\"Midjourney\",\"slug\":\"midjourney\",\"description\":\"World's best AI image generator — photorealistic aur artistic images.\",\"category\":[\"image\"],\"pricing\":\"paid\",\"url\":\"https://midjourney.com\",\"emoji\":\"🎨\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":21,\"name\":\"Canva AI\",\"slug\":\"canva-ai\",\"description\":\"Design + AI — posters, presentations, social media graphics minutes mein.\",\"category\":[\"image\",\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://canva.com\",\"emoji\":\"🖼️\",\"hindi_support\":true,\"india_score\":5,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":22,\"name\":\"Adobe Firefly\",\"slug\":\"adobe-firefly\",\"description\":\"Adobe ka AI image generator — commercially safe, high quality.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://firefly.adobe.com\",\"emoji\":\"🔥\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":23,\"name\":\"DALL-E 3\",\"slug\":\"dalle\",\"description\":\"OpenAI ka image AI — text se realistic images banao.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://openai.com/dall-e-3\",\"emoji\":\"🖌️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":24,\"name\":\"Stable Diffusion\",\"slug\":\"stable-diffusion\",\"description\":\"Open source image AI — free mein apne computer pe chalao.\",\"category\":[\"image\"],\"pricing\":\"free\",\"url\":\"https://stability.ai\",\"emoji\":\"🌊\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":25,\"name\":\"Notion AI\",\"slug\":\"notion-ai\",\"description\":\"Notes, docs, projects — sab ek jagah, AI ke saath.\",\"category\":[\"productivity\",\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://notion.so\",\"emoji\":\"📝\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":26,\"name\":\"Otter.ai\",\"slug\":\"otter-ai\",\"description\":\"Lectures aur meetings record karo — AI automatically transcript banata hai.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://otter.ai\",\"emoji\":\"🎙️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":27,\"name\":\"Consensus\",\"slug\":\"consensus\",\"description\":\"Research papers mein se AI answers dhundho — UPSC aur research ke liye best.\",\"category\":[\"research\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://consensus.app\",\"emoji\":\"📊\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":28,\"name\":\"Elicit\",\"slug\":\"elicit\",\"description\":\"AI research assistant — academic papers summarize karta hai.\",\"category\":[\"research\"],\"pricing\":\"freemium\",\"url\":\"https://elicit.com\",\"emoji\":\"🔬\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":29,\"name\":\"SciSpace\",\"slug\":\"scispace\",\"description\":\"Research papers padhna easy karo — AI explain karta hai complex concepts.\",\"category\":[\"research\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://typeset.io\",\"emoji\":\"🔭\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\"],\"featured\":true,\"verified\":true},{\"id\":30,\"name\":\"Runway ML\",\"slug\":\"runway\",\"description\":\"AI video editor — text se video banao, background remove karo.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://runwayml.com\",\"emoji\":\"🎬\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":31,\"name\":\"ElevenLabs\",\"slug\":\"elevenlabs\",\"description\":\"Text to speech — natural human voice mein convert karo. Hindi support.\",\"category\":[\"video\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://elevenlabs.io\",\"emoji\":\"🔊\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":32,\"name\":\"Descript\",\"slug\":\"descript\",\"description\":\"Video/podcast edit karo text ki tarah — AI se filler words remove karo.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://descript.com\",\"emoji\":\"✂️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":33,\"name\":\"Pictory\",\"slug\":\"pictory\",\"description\":\"Text ya script se automatically video banao — content creators ke liye.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://pictory.ai\",\"emoji\":\"📹\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":34,\"name\":\"Resume.io\",\"slug\":\"resume-io\",\"description\":\"AI se professional resume banao — job seekers ke liye best.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://resume.io\",\"emoji\":\"📄\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":35,\"name\":\"LinkedIn AI\",\"slug\":\"linkedin-ai\",\"description\":\"LinkedIn profile optimize karo, cover letters likho AI se.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://linkedin.com\",\"emoji\":\"💼\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":36,\"name\":\"Interviewing.io\",\"slug\":\"interviewing-io\",\"description\":\"AI mock interviews — coding aur system design practice karo.\",\"category\":[\"career\",\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://interviewing.io\",\"emoji\":\"🎯\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":37,\"name\":\"Khan Academy Khanmigo\",\"slug\":\"khanmigo\",\"description\":\"Khan Academy ka AI tutor — students ke saath step by step problem solve karta hai.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://khanacademy.org\",\"emoji\":\"🏫\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":38,\"name\":\"Duolingo AI\",\"slug\":\"duolingo\",\"description\":\"Language learning AI — English improve karo gamified way mein.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://duolingo.com\",\"emoji\":\"🦜\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"Boards\",\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":39,\"name\":\"Socratic by Google\",\"slug\":\"socratic\",\"description\":\"Google ka student AI — photo lo sawaal ka, explanation milega.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://socratic.org\",\"emoji\":\"📱\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":40,\"name\":\"Brainly AI\",\"slug\":\"brainly\",\"description\":\"Students ke sawaalon ke AI answers — community + AI combined.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://brainly.com\",\"emoji\":\"🧩\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":41,\"name\":\"Copy.ai\",\"slug\":\"copy-ai\",\"description\":\"Marketing copy, blogs, social media posts AI se likho seconds mein.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://copy.ai\",\"emoji\":\"✍️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":42,\"name\":\"Jasper AI\",\"slug\":\"jasper\",\"description\":\"Long form content AI — blogs, articles, marketing copy ke liye.\",\"category\":[\"writing\"],\"pricing\":\"paid\",\"url\":\"https://jasper.ai\",\"emoji\":\"📰\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":43,\"name\":\"QuillBot\",\"slug\":\"quillbot\",\"description\":\"Paraphrasing AI — content rewrite karo, summarize karo.\",\"category\":[\"writing\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://quillbot.com\",\"emoji\":\"🖊️\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":44,\"name\":\"Hemingway Editor\",\"slug\":\"hemingway\",\"description\":\"Writing clear aur simple banao — readability score ke saath.\",\"category\":[\"writing\"],\"pricing\":\"free\",\"url\":\"https://hemingwayapp.com\",\"emoji\":\"📖\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":45,\"name\":\"Tabnine\",\"slug\":\"tabnine\",\"description\":\"AI code completion — sabhi languages mein, privacy-first.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://tabnine.com\",\"emoji\":\"💻\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":46,\"name\":\"Codeium\",\"slug\":\"codeium\",\"description\":\"Free AI code assistant — 70+ languages support karta hai.\",\"category\":[\"coding\"],\"pricing\":\"free\",\"url\":\"https://codeium.com\",\"emoji\":\"🚀\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":true,\"verified\":true},{\"id\":47,\"name\":\"Blackbox AI\",\"slug\":\"blackbox\",\"description\":\"Code search aur completion — developers ke liye fast AI tool.\",\"category\":[\"coding\"],\"pricing\":\"free\",\"url\":\"https://blackbox.ai\",\"emoji\":\"⬛\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":48,\"name\":\"Miro AI\",\"slug\":\"miro-ai\",\"description\":\"Visual collaboration + AI — mind maps, flowcharts, diagrams banao.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://miro.com\",\"emoji\":\"🗺️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":49,\"name\":\"Todoist AI\",\"slug\":\"todoist\",\"description\":\"AI smart task manager — priorities automatically set karta hai.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://todoist.com\",\"emoji\":\"✅\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":50,\"name\":\"Motion AI\",\"slug\":\"motion\",\"description\":\"AI schedule planner — automatically meetings aur tasks plan karta hai.\",\"category\":[\"productivity\"],\"pricing\":\"paid\",\"url\":\"https://usemotion.com\",\"emoji\":\"📅\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":51,\"name\":\"Mathway\",\"slug\":\"mathway\",\"description\":\"Step by step maths solver — algebra se calculus tak sab.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://mathway.com\",\"emoji\":\"➗\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":52,\"name\":\"Symbolab\",\"slug\":\"symbolab\",\"description\":\"Maths AI — calculus, algebra, trigonometry step by step.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://symbolab.com\",\"emoji\":\"🔣\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":53,\"name\":\"GeoGebra AI\",\"slug\":\"geogebra\",\"description\":\"Geometry, graphs, 3D visualization — maths visually samjho.\",\"category\":[\"maths\",\"study\"],\"pricing\":\"free\",\"url\":\"https://geogebra.org\",\"emoji\":\"📐\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":54,\"name\":\"Desmos\",\"slug\":\"desmos\",\"description\":\"Free graphing calculator — functions plot karo instantly.\",\"category\":[\"maths\"],\"pricing\":\"free\",\"url\":\"https://desmos.com\",\"emoji\":\"📈\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":55,\"name\":\"Pika Labs\",\"slug\":\"pika\",\"description\":\"Text se short videos banao — AI video generation.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://pika.art\",\"emoji\":\"🎥\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":56,\"name\":\"Suno AI\",\"slug\":\"suno\",\"description\":\"Text se music banao — AI generated songs in seconds.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://suno.ai\",\"emoji\":\"🎵\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":57,\"name\":\"Udio\",\"slug\":\"udio\",\"description\":\"AI music generator — professional quality songs banao free mein.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://udio.com\",\"emoji\":\"🎶\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":58,\"name\":\"Murf AI\",\"slug\":\"murf\",\"description\":\"Hindi voiceover AI — 20+ Indian voices, presentations ke liye.\",\"category\":[\"video\",\"india\"],\"pricing\":\"freemium\",\"url\":\"https://murf.ai\",\"emoji\":\"🎤\",\"hindi_support\":true,\"india_score\":5,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":59,\"name\":\"Tome AI\",\"slug\":\"tome\",\"description\":\"AI presentation maker — slides automatically banata hai topic se.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://tome.app\",\"emoji\":\"🎭\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\",\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":60,\"name\":\"Beautiful.ai\",\"slug\":\"beautiful-ai\",\"description\":\"Smart presentation tool — AI auto-design karta hai slides.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://beautiful.ai\",\"emoji\":\"💎\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":61,\"name\":\"Gamma AI\",\"slug\":\"gamma\",\"description\":\"Presentations, docs, webpages — AI se minutes mein banao.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://gamma.app\",\"emoji\":\"⚡\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":62,\"name\":\"Writesonic\",\"slug\":\"writesonic\",\"description\":\"AI writer — blogs, ads, product descriptions fast likhta hai.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://writesonic.com\",\"emoji\":\"🖋️\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":63,\"name\":\"Anyword\",\"slug\":\"anyword\",\"description\":\"Marketing copy AI — conversion optimize karta hai automatically.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://anyword.com\",\"emoji\":\"📣\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":64,\"name\":\"Scite AI\",\"slug\":\"scite\",\"description\":\"Research citations verify karo — papers support ya contradict karte hain.\",\"category\":[\"research\"],\"pricing\":\"freemium\",\"url\":\"https://scite.ai\",\"emoji\":\"📑\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":65,\"name\":\"Research Rabbit\",\"slug\":\"research-rabbit\",\"description\":\"Academic papers discover karo — related papers automatically milte hain.\",\"category\":[\"research\"],\"pricing\":\"free\",\"url\":\"https://researchrabbit.ai\",\"emoji\":\"🐰\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":66,\"name\":\"Semantic Scholar\",\"slug\":\"semantic-scholar\",\"description\":\"AI-powered academic search — free research papers dhundho.\",\"category\":[\"research\"],\"pricing\":\"free\",\"url\":\"https://semanticscholar.org\",\"emoji\":\"🔎\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"JEE\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":67,\"name\":\"Scholarcy\",\"slug\":\"scholarcy\",\"description\":\"Research papers ko flashcards mein convert karo — quick revision.\",\"category\":[\"research\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://scholarcy.com\",\"emoji\":\"🎓\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":68,\"name\":\"Woebot\",\"slug\":\"woebot\",\"description\":\"Mental health AI chatbot — exam stress aur anxiety ke liye.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://woebot.io\",\"emoji\":\"💚\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\"],\"featured\":true,\"verified\":true},{\"id\":69,\"name\":\"Forest App\",\"slug\":\"forest\",\"description\":\"Focus timer + AI — phone addiction rokta hai, study time badhata hai.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://forestapp.cc\",\"emoji\":\"🌳\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\",\"UPSC\"],\"featured\":true,\"verified\":true},{\"id\":70,\"name\":\"Anki AI\",\"slug\":\"anki\",\"description\":\"Spaced repetition flashcards — scientifically proven memory technique.\",\"category\":[\"study\"],\"pricing\":\"free\",\"url\":\"https://apps.ankiweb.net\",\"emoji\":\"🃏\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"NEET\",\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":71,\"name\":\"Explain Everything\",\"slug\":\"explain-everything\",\"description\":\"Interactive whiteboard AI — teachers aur students ke liye.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://explaineverything.com\",\"emoji\":\"📋\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":72,\"name\":\"Lumosity\",\"slug\":\"lumosity\",\"description\":\"Brain training AI games — concentration aur memory improve karo.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://lumosity.com\",\"emoji\":\"🧠\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[\"JEE\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":73,\"name\":\"Codecademy AI\",\"slug\":\"codecademy\",\"description\":\"Coding sikhao AI tutor ke saath — beginners ke liye best.\",\"category\":[\"coding\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://codecademy.com\",\"emoji\":\"👨‍🏫\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":74,\"name\":\"Leetcode AI\",\"slug\":\"leetcode\",\"description\":\"Coding interview prep — AI hints aur solutions ke saath.\",\"category\":[\"coding\",\"career\"],\"pricing\":\"freemium\",\"url\":\"https://leetcode.com\",\"emoji\":\"🏆\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":true,\"verified\":true},{\"id\":75,\"name\":\"Hugging Face\",\"slug\":\"hugging-face\",\"description\":\"Open source AI models — developers aur researchers ke liye.\",\"category\":[\"coding\",\"research\"],\"pricing\":\"free\",\"url\":\"https://huggingface.co\",\"emoji\":\"🤗\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"JEE\"],\"featured\":false,\"verified\":true},{\"id\":76,\"name\":\"Ideogram\",\"slug\":\"ideogram\",\"description\":\"AI image generator — text ke saath accurate images banata hai.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://ideogram.ai\",\"emoji\":\"🎭\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":77,\"name\":\"Leonardo AI\",\"slug\":\"leonardo\",\"description\":\"Game assets aur creative images AI se banao — free credits daily.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://leonardo.ai\",\"emoji\":\"🦁\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":78,\"name\":\"Remove.bg\",\"slug\":\"remove-bg\",\"description\":\"Background remove karo instantly — AI se, free mein.\",\"category\":[\"image\"],\"pricing\":\"freemium\",\"url\":\"https://remove.bg\",\"emoji\":\"✂️\",\"hindi_support\":false,\"india_score\":5,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":79,\"name\":\"Upscayl\",\"slug\":\"upscayl\",\"description\":\"Blurry images ko HD karo — free, open source AI upscaler.\",\"category\":[\"image\"],\"pricing\":\"free\",\"url\":\"https://upscayl.org\",\"emoji\":\"🔍\",\"hindi_support\":false,\"india_score\":5,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":80,\"name\":\"D-ID\",\"slug\":\"d-id\",\"description\":\"Photo se talking avatar banao — presentations ke liye.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://d-id.com\",\"emoji\":\"👤\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":81,\"name\":\"HeyGen\",\"slug\":\"heygen\",\"description\":\"AI avatar videos — apni likhai ko video mein convert karo.\",\"category\":[\"video\"],\"pricing\":\"freemium\",\"url\":\"https://heygen.com\",\"emoji\":\"🎙️\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":82,\"name\":\"Loom AI\",\"slug\":\"loom\",\"description\":\"Screen record karo + AI summary — teachers ke liye perfect.\",\"category\":[\"video\",\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://loom.com\",\"emoji\":\"📹\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":83,\"name\":\"Notta AI\",\"slug\":\"notta\",\"description\":\"Meeting aur lecture transcription — Hindi bhi support karta hai.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://notta.ai\",\"emoji\":\"📝\",\"hindi_support\":true,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":84,\"name\":\"Taskade AI\",\"slug\":\"taskade\",\"description\":\"AI project management + notes + tasks ek jagah.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://taskade.com\",\"emoji\":\"📌\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":85,\"name\":\"Reclaim AI\",\"slug\":\"reclaim\",\"description\":\"Calendar AI — automatically study time block karta hai.\",\"category\":[\"productivity\"],\"pricing\":\"freemium\",\"url\":\"https://reclaim.ai\",\"emoji\":\"🗓️\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[\"JEE\",\"NEET\"],\"featured\":false,\"verified\":true},{\"id\":86,\"name\":\"Glasp AI\",\"slug\":\"glasp\",\"description\":\"Web highlights + AI summary — online padhte waqt notes banao.\",\"category\":[\"research\",\"study\"],\"pricing\":\"free\",\"url\":\"https://glasp.co\",\"emoji\":\"🖊️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":true,\"exam_tags\":[\"UPSC\"],\"featured\":false,\"verified\":true},{\"id\":87,\"name\":\"Humata AI\",\"slug\":\"humata\",\"description\":\"PDF chatbot — koi bhi document upload karo, sawaal poochho.\",\"category\":[\"study\",\"research\"],\"pricing\":\"freemium\",\"url\":\"https://humata.ai\",\"emoji\":\"📄\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"UPSC\",\"NEET\"],\"featured\":true,\"verified\":true},{\"id\":88,\"name\":\"Tactiq\",\"slug\":\"tactiq\",\"description\":\"Google Meet aur Zoom mein AI notes — lectures capture karo.\",\"category\":[\"productivity\",\"study\"],\"pricing\":\"freemium\",\"url\":\"https://tactiq.io\",\"emoji\":\"🎧\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":90,\"name\":\"Wix AI\",\"slug\":\"wix-ai\",\"description\":\"AI website builder — bina coding ke professional site banao.\",\"category\":[\"coding\"],\"pricing\":\"freemium\",\"url\":\"https://wix.com\",\"emoji\":\"🌐\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":91,\"name\":\"Framer AI\",\"slug\":\"framer\",\"description\":\"AI website design — text se beautiful websites instantly.\",\"category\":[\"coding\",\"image\"],\"pricing\":\"freemium\",\"url\":\"https://framer.com\",\"emoji\":\"🖥️\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":92,\"name\":\"Interviews.ai\",\"slug\":\"interviews-ai\",\"description\":\"AI mock interview practice — HR aur technical dono.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://interviews.ai\",\"emoji\":\"🤝\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":93,\"name\":\"Kickresume\",\"slug\":\"kickresume\",\"description\":\"AI resume builder — ATS-friendly professional resumes.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://kickresume.com\",\"emoji\":\"📋\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":94,\"name\":\"Jobscan AI\",\"slug\":\"jobscan\",\"description\":\"Resume ko job description se match karo — ATS score badhao.\",\"category\":[\"career\"],\"pricing\":\"freemium\",\"url\":\"https://jobscan.co\",\"emoji\":\"🎯\",\"hindi_support\":false,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":95,\"name\":\"Rytr\",\"slug\":\"rytr\",\"description\":\"Affordable AI writer — emails, blogs, social posts Hindi mein bhi.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://rytr.me\",\"emoji\":\"✒️\",\"hindi_support\":true,\"india_score\":4,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":96,\"name\":\"Sudowrite\",\"slug\":\"sudowrite\",\"description\":\"Creative writing AI — stories aur novels likhne mein help.\",\"category\":[\"writing\"],\"pricing\":\"freemium\",\"url\":\"https://sudowrite.com\",\"emoji\":\"📚\",\"hindi_support\":false,\"india_score\":2,\"low_data\":false,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":97,\"name\":\"Magic School AI\",\"slug\":\"magic-school\",\"description\":\"Teachers ke liye AI — lesson plans, quizzes, assignments banao.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://magicschool.ai\",\"emoji\":\"🏫\",\"hindi_support\":false,\"india_score\":4,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":98,\"name\":\"Diffit AI\",\"slug\":\"diffit\",\"description\":\"Reading materials AI se adapt karo — students ke level ke hisaab se.\",\"category\":[\"study\"],\"pricing\":\"freemium\",\"url\":\"https://diffit.me\",\"emoji\":\"📖\",\"hindi_support\":false,\"india_score\":3,\"low_data\":false,\"exam_tags\":[\"Boards\"],\"featured\":false,\"verified\":true},{\"id\":99,\"name\":\"BharatGen AI\",\"slug\":\"bharatgen\",\"description\":\"IIT Bombay ka AI — June 2026 tak 22 Indian languages cover karega.\",\"category\":[\"study\",\"india\"],\"pricing\":\"free\",\"url\":\"https://bharatgen.gov.in\",\"emoji\":\"🏛️\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[\"UPSC\",\"Boards\"],\"featured\":true,\"verified\":true},{\"id\":100,\"name\":\"iMerit AI\",\"slug\":\"imerit\",\"description\":\"India ka AI data company — Indian languages ke liye AI solutions.\",\"category\":[\"india\"],\"pricing\":\"free\",\"url\":\"https://imerit.net\",\"emoji\":\"🇮🇳\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[],\"featured\":false,\"verified\":true},{\"id\":101,\"name\":\"Zoho AI\",\"slug\":\"zoho-ai\",\"description\":\"India ka apna business AI — CRM, email, projects sab mein AI.\",\"category\":[\"productivity\",\"india\"],\"pricing\":\"freemium\",\"url\":\"https://zoho.com\",\"emoji\":\"🏢\",\"hindi_support\":true,\"india_score\":5,\"low_data\":true,\"exam_tags\":[],\"featured\":true,\"verified\":true}]}"));}),
"[project]/aitdl4/pages/tools/[slug].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ToolPage,
    "getStaticPaths",
    ()=>getStaticPaths,
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/seo.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$jsonld$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/jsonld.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Footer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/ToolCard.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
function ToolPage({ tool, similarTools }) {
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('aitdl_lang') || 'en';
        setLang(saved);
    }, []);
    if (!tool) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            textAlign: 'center',
            padding: 60,
            color: 'var(--text2)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                children: "Tool not found"
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ToolSEO"])({
                    tool
                })
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$jsonld$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ToolJsonLD"], {
                tool: tool
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: 800,
                    margin: '0 auto',
                    padding: '32px 16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--bg2)',
                            border: '0.5px solid var(--border)',
                            borderRadius: 16,
                            padding: 32,
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 20,
                                    alignItems: 'flex-start',
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 48
                                        },
                                        children: tool.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/tools/[slug].js",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8,
                                                    flexWrap: 'wrap'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                                                    tool.hindi_support && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                            tool.exam_tags?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    flexWrap: 'wrap',
                                    marginBottom: 24
                                },
                                children: tool.exam_tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                    similarTools?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: 16
                                },
                                children: similarTools.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/tools/[slug].js",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
async function getStaticPaths() {
    const data = __turbopack_context__.r("[project]/aitdl4/data/tools.json (json)");
    const tools = data.tools || data;
    return {
        paths: tools.map((t)=>({
                params: {
                    slug: t.slug
                }
            })),
        fallback: false
    };
}
async function getStaticProps({ params }) {
    const data = __turbopack_context__.r("[project]/aitdl4/data/tools.json (json)");
    const tools = data.tools || data;
    const tool = tools.find((t)=>t.slug === params.slug);
    if (!tool) return {
        notFound: true
    };
    const similarTools = tools.filter((t)=>t.category.some((c)=>tool.category.includes(c)) && t.slug !== tool.slug).slice(0, 3);
    return {
        props: {
            tool,
            similarTools
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__81e748c8._.js.map