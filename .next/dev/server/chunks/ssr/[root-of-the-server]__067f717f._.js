module.exports = [
"[project]/aitdl4/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
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
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('dark');
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('aitdl_theme') || 'dark';
        setTheme(saved);
    }, []);
    const changeTheme = (t)=>{
        setTheme(t);
        localStorage.setItem('aitdl_theme', t);
        document.documentElement.setAttribute('data-theme', t);
    };
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        style: {
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--bg)',
            borderBottom: '0.5px solid var(--border)',
            padding: '0 24px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 1200,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 56
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        textDecoration: 'none'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 16
                            },
                            children: "⚡"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: 'var(--text)',
                                        letterSpacing: '0.05em'
                                    },
                                    children: "AITDL"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/components/Header.js",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9,
                                        color: 'var(--text3)',
                                        letterSpacing: '0.1em'
                                    },
                                    children: "COMMAND CENTER"
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/components/Header.js",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aitdl4/components/Header.js",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                background: 'var(--bg3)',
                                borderRadius: 20,
                                padding: 3,
                                gap: 2,
                                border: '0.5px solid var(--border)'
                            },
                            children: [
                                'en',
                                'hi',
                                'sa'
                            ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setLang(l);
                                        localStorage.setItem('aitdl_lang', l);
                                    },
                                    style: {
                                        padding: '5px 12px',
                                        borderRadius: 16,
                                        border: 'none',
                                        fontSize: 11,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        background: lang === l ? 'var(--accent)' : 'transparent',
                                        color: lang === l ? '#fff' : 'var(--text3)'
                                    },
                                    children: l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'सं'
                                }, l, false, {
                                    fileName: "[project]/aitdl4/components/Header.js",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                background: 'var(--bg3)',
                                borderRadius: 20,
                                padding: 3,
                                gap: 2
                            },
                            children: [
                                'dark',
                                'light',
                                'glass',
                                'midnight'
                            ].map((th)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>changeTheme(th),
                                    style: {
                                        padding: '4px 10px',
                                        borderRadius: 16,
                                        border: 'none',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        background: theme === th ? 'var(--bg2)' : 'transparent',
                                        color: theme === th ? 'var(--text)' : 'var(--text3)'
                                    },
                                    children: th === 'midnight' ? '🌌 Midnight' : th.charAt(0).toUpperCase() + th.slice(1)
                                }, th, false, {
                                    fileName: "[project]/aitdl4/components/Header.js",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/ai-battle",
                            style: {
                                fontSize: 13,
                                color: 'var(--text2)',
                                textDecoration: 'none',
                                padding: '6px 12px',
                                borderRadius: 8,
                                border: '0.5px solid var(--border)'
                            },
                            children: [
                                "⚔️ ",
                                t.battle
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/compare",
                            style: {
                                fontSize: 13,
                                color: 'var(--text2)',
                                textDecoration: 'none',
                                padding: '6px 12px',
                                borderRadius: 8,
                                border: '0.5px solid var(--border)'
                            },
                            children: [
                                "🔄 ",
                                t.compare
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/about",
                            style: {
                                fontSize: 13,
                                color: 'var(--text2)',
                                textDecoration: 'none',
                                padding: '6px 12px',
                                borderRadius: 8,
                                border: '0.5px solid var(--border)'
                            },
                            children: t.about
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Header.js",
                            lineNumber: 213,
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
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/aitdl4/components/Header.js",
        lineNumber: 66,
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
        rights: '© 2025 AITDL — All Rights Reserved'
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
        rights: '© 2025 AITDL — सर्वाधिकार सुरक्षित'
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
        rights: '© २०२५ AITDL — सर्वे अधिकाराः सुरक्षिताः'
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
                                    fontSize: 24,
                                    fontWeight: 900,
                                    color: 'var(--text)',
                                    letterSpacing: '0.05em'
                                },
                                children: [
                                    "AITDL",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--accent)'
                                        },
                                        children: "."
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/Footer.js",
                                        lineNumber: 104,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 14,
                                    color: 'var(--text3)',
                                    lineHeight: 1.8,
                                    maxWidth: 300
                                },
                                children: t.desc
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 97,
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
                                lineNumber: 117,
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
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 116,
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
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/Footer.js",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/Footer.js",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid var(--border)',
                    paddingTop: 32,
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 12,
                        color: 'var(--text3)',
                        lineHeight: 2
                    },
                    children: [
                        t.built,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--text)',
                                fontWeight: 700,
                                marginLeft: 6
                            },
                            children: "JRM"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        t.dev,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                opacity: 0.6
                            },
                            children: t.rights
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/Footer.js",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aitdl4/components/Footer.js",
                    lineNumber: 175,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/aitdl4/components/Footer.js",
                lineNumber: 170,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/Footer.js",
        lineNumber: 82,
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
;
;
function ToolCard({ tool, onCompare, isSelected }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--bg2)',
            border: tool.featured ? '1px solid var(--accent)' : '0.5px solid var(--border)',
            borderRadius: 16,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            transition: 'all 0.2s ease',
            animation: 'fadeIn 0.3s ease',
            cursor: 'pointer'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 6,
                    flexWrap: 'wrap'
                },
                children: [
                    tool.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: 'rgba(255,107,53,0.15)',
                            color: 'var(--accent)',
                            fontWeight: 600
                        },
                        children: "FEATURED"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    tool.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: 'rgba(34,197,94,0.15)',
                            color: '#22C55E',
                            fontWeight: 600
                        },
                        children: "✓ Verified"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: tool.pricing === 'free' ? 'rgba(34,197,94,0.15)' : tool.pricing === 'freemium' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)',
                            color: tool.pricing === 'free' ? '#22C55E' : tool.pricing === 'freemium' ? '#FBBF24' : '#EF4444',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                        },
                        children: tool.pricing
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    tool.hindi_support && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: 'rgba(99,102,241,0.15)',
                            color: '#818CF8',
                            fontWeight: 600
                        },
                        children: "हिंदी"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 24,
                            marginBottom: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: tool.emoji
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: 'var(--text)',
                                    margin: 0
                                },
                                children: tool.name
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text2)',
                            lineHeight: 1.5,
                            marginBottom: 16,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        },
                        children: tool.description
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 6,
                            flexWrap: 'wrap',
                            marginBottom: 16
                        },
                        children: tool.category.slice(0, 3).map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text3)',
                                    textTransform: 'capitalize',
                                    border: '0.5px solid var(--border)'
                                },
                                children: cat
                            }, cat, false, {
                                fileName: "[project]/aitdl4/components/ToolCard.js",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 8,
                    marginTop: 'auto'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/tools/${tool.slug}`,
                        style: {
                            flex: 1,
                            padding: '8px',
                            background: 'var(--bg3)',
                            border: '0.5px solid var(--border)',
                            borderRadius: 8,
                            fontSize: 12,
                            color: 'var(--text2)',
                            textDecoration: 'none',
                            textAlign: 'center'
                        },
                        children: "Details →"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onCompare(tool),
                        style: {
                            padding: '8px 12px',
                            background: isSelected ? 'rgba(255,107,53,0.2)' : 'var(--bg3)',
                            border: isSelected ? '0.5px solid var(--accent)' : '0.5px solid var(--border)',
                            borderRadius: 8,
                            fontSize: 12,
                            color: isSelected ? 'var(--accent)' : 'var(--text2)',
                            cursor: 'pointer'
                        },
                        children: isSelected ? '✓ Added' : '+ Compare'
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ToolCard.js",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ToolCard.js",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/ToolCard.js",
        lineNumber: 31,
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
        let W, H;
        let particles = [];
        const pColor = [
            255,
            107,
            53
        ]; // Orange accent (#FF6B35 in RGB: 255, 107, 53)
        const resize = ()=>{
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        class Particle {
            constructor(){
                this.reset();
            }
            reset() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.s = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.o = Math.random() * 0.5 + 0.1;
                this.sp = Math.random() > 0.85;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
            }
            draw() {
                const [r, g, b] = pColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
                ctx.fillStyle = this.sp ? `rgba(${r},${g},${b},${this.o})` : `rgba(255,255,255,${this.o * 0.2})`;
                ctx.fill();
            }
        }
        const init = ()=>{
            resize();
            particles = [];
            for(let i = 0; i < 80; i++){
                particles.push(new Particle());
            }
        };
        const drawLines = ()=>{
            const [r, g, b] = pColor;
            for(let i = 0; i < particles.length; i++){
                for(let j = i + 1; j < particles.length; j++){
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${r},${g},${b},${0.08 * (1 - d / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };
        const animate = ()=>{
            ctx.clearRect(0, 0, W, H);
            particles.forEach((p)=>{
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        };
        init();
        animate();
        window.addEventListener('resize', resize);
        return ()=>window.removeEventListener('resize', resize);
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
            opacity: 0.6
        }
    }, void 0, false, {
        fileName: "[project]/aitdl4/components/NeuralNetwork.js",
        lineNumber: 108,
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
        hero: 'India\'s AI Command Center',
        sub: 'Empowering 1.4 Billion minds',
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
        }
    },
    hi: {
        hero: 'भारत का AI कमांड सेंटर',
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
            tools: 'AI टूल्स',
            visited: 'छात्र आए',
            free: 'मुफ्त',
            india: 'भारत प्रथम'
        }
    },
    sa: {
        hero: 'भारतस्य AI कमांड केंद्रम्',
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
        }
    }
};
// Neural network background component
const NeuralBackground = ()=>{
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const canvas = document.getElementById('neural-bg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const nodes = Array.from({
            length: 50
        }, ()=>({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 3 + 1,
                color: Math.random() > 0.5 ? '#FF6B35' : '#00B4D8'
            }));
        const animate = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw connections
            nodes.forEach((n, i)=>{
                nodes.slice(i + 1).forEach((m)=>{
                    const dist = Math.hypot(n.x - m.x, n.y - m.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,107,53,${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(m.x, m.y);
                        ctx.stroke();
                    }
                });
            });
            // Draw nodes
            nodes.forEach((n)=>{
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = n.color + '80';
                ctx.fill();
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            });
            requestAnimationFrame(animate);
        };
        animate();
        const resize = ()=>{
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        return ()=>window.removeEventListener('resize', resize);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
        id: "neural-bg",
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none'
        }
    }, void 0, false, {
        fileName: "[project]/aitdl4/pages/index.js",
        lineNumber: 176,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function Home({ tools }) {
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('en');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('All');
    const [exam, setExam] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('All');
    const [pricing, setPricing] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('All');
    const [compareList, setCompareList] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [filtered, setFiltered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(tools);
    const [visitorCount, setVisitorCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(8506);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const t = LANG_TEXT[lang];
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('aitdl_lang') || 'en';
        setLang(saved);
        const savedVisitors = localStorage.getItem('aitdl_visitors');
        const count = savedVisitors ? parseInt(savedVisitors) + 1 : 8506;
        setVisitorCount(count);
        localStorage.setItem('aitdl_visitors', count);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let result = tools;
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
        tools
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
                padding: '6px 16px',
                borderRadius: 20,
                border: current === val ? '1.5px solid var(--accent)' : '0.5px solid var(--border)',
                background: current === val ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: current === val ? '#fff' : 'rgba(240,237,232,0.75)',
                fontSize: 12,
                fontWeight: current === val ? 700 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s ease'
            },
            children: val === 'india' ? '🇮🇳 Made in India' : val
        }, val, false, {
            fileName: "[project]/aitdl4/pages/index.js",
            lineNumber: 264,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "AITDL — Right AI Tool At The Right Time"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "India's AI Command Center — Explore 100+ AI tools for every need."
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NeuralBackground, {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '0 16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '80px 16px 40px',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'inline-block',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    color: 'var(--accent)',
                                    border: '1px solid var(--accent)',
                                    borderRadius: 20,
                                    padding: '5px 16px',
                                    marginBottom: 24
                                },
                                children: "INDIA'S #1 AI TOOLS PLATFORM"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 'clamp(36px, 8vw, 72px)',
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--text)'
                                        },
                                        children: "Right AI Tool"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--accent)'
                                        },
                                        children: "At The Right Time"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 16,
                                    color: 'var(--text2)',
                                    marginBottom: 40,
                                    maxWidth: 500,
                                    margin: '0 auto 40px'
                                },
                                children: "JEE, NEET, UPSC — best free AI tools for every exam, in one place."
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                    gap: "clamp(8px, 2vw, 16px)",
                                    margin: "24px auto",
                                    maxWidth: 640,
                                    width: "100%",
                                    padding: "0 16px",
                                    boxSizing: "border-box"
                                },
                                children: [
                                    {
                                        num: '100+',
                                        label: t.stats.tools
                                    },
                                    {
                                        num: visitorCount.toLocaleString(lang === 'hi' ? 'en-IN' : 'en-US'),
                                        label: t.stats.visited
                                    },
                                    {
                                        num: '100%',
                                        label: t.stats.free
                                    },
                                    {
                                        num: '🇮🇳',
                                        label: t.stats.india
                                    }
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "rgba(255,255,255,0.05)",
                                            borderRadius: 12,
                                            padding: "clamp(12px, 3vw, 20px)",
                                            textAlign: "center",
                                            border: "0.5px solid rgba(255,255,255,0.08)",
                                            minWidth: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "clamp(18px, 4vw, 28px)",
                                                    fontWeight: 700,
                                                    color: "#FF6B35",
                                                    lineHeight: 1.2
                                                },
                                                children: s.num
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "clamp(10px, 2vw, 12px)",
                                                    color: "rgba(240,237,232,0.4)",
                                                    marginTop: 4,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                },
                                                children: s.label
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/pages/index.js",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.label, true, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 24,
                            flexWrap: 'wrap',
                            padding: '16px 24px',
                            background: 'var(--bg2)',
                            border: '0.5px solid var(--border)',
                            borderRadius: 12,
                            marginBottom: 32,
                            fontSize: 12,
                            color: 'var(--text2)'
                        },
                        children: [
                            '✓ AITDL Verified Tools',
                            '🔒 No signup required',
                            '🆓 Free tools first',
                            '🇮🇳 Made for India'
                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: item
                            }, item, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 429,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 600,
                            margin: '0 auto 32px',
                            position: 'relative'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            placeholder: t.search,
                            style: {
                                width: '100%',
                                padding: '16px 24px',
                                background: '#0D0D15',
                                border: '1px solid var(--border)',
                                borderRadius: 12,
                                fontSize: 14,
                                color: 'var(--text)',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/pages/index.js",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--border)',
                            borderRadius: 16,
                            padding: '24px',
                            marginBottom: 32,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 600,
                                            letterSpacing: '0.08em',
                                            color: 'var(--text3)',
                                            marginBottom: 8
                                        },
                                        children: t.category.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            overflowX: 'auto',
                                            scrollbarWidth: 'none',
                                            paddingBottom: 4
                                        },
                                        children: CATEGORIES.map((c)=>filterBtn(c, category, setCategory))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 480,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 470,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 600,
                                            letterSpacing: '0.08em',
                                            color: 'var(--text3)',
                                            marginBottom: 8
                                        },
                                        children: t.exam.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 495,
                                        columnNumber: 13
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
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 600,
                                            letterSpacing: '0.08em',
                                            color: 'var(--text3)',
                                            marginBottom: 8
                                        },
                                        children: t.pricing.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/pages/index.js",
                                        lineNumber: 517,
                                        columnNumber: 13
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
                                        lineNumber: 526,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 516,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 459,
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
                                lineNumber: 544,
                                columnNumber: 11
                            }, this),
                            " ",
                            t.found
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 539,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 16
                        },
                        children: filtered.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ToolCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                tool: tool,
                                onCompare: handleCompare,
                                isSelected: compareList.some((t)=>t.id === tool.id)
                            }, tool.id, false, {
                                fileName: "[project]/aitdl4/pages/index.js",
                                lineNumber: 560,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 553,
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
                                    letterSpacing: '0.1em',
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
                                lineNumber: 580,
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
                                lineNumber: 593,
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
                                lineNumber: 601,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/pages/index.js",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 302,
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
                        lineNumber: 629,
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
                        lineNumber: 635,
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
                        lineNumber: 651,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 615,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/index.js",
                lineNumber: 667,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/index.js",
        lineNumber: 293,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__067f717f._.js.map