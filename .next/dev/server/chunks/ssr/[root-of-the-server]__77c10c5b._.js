module.exports = [
"[project]/aitdl4/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/aitdl4/components/Header.js'\n\nExpected '</', got 'jsx text'");
e.code = 'MODULE_UNPARSABLE';
throw e;
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
"[project]/aitdl4/pages/ai-battle.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIBattle
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/Footer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
const LANG = {
    en: {
        title: 'AI Battle ⚔️',
        desc: 'Which AI is better for your specific task? Real-world tests and benchmarks.',
        loading: 'Battle Arena loading...'
    },
    hi: {
        title: 'AI युद्ध ⚔️',
        desc: 'आपके विशिष्ठ कार्य के लिए कौन सी AI बेहतर है? वास्तविक दुनिया के परीक्षण और बेंचमार्क।',
        loading: 'युद्ध क्षेत्र लोड हो रहा है...'
    },
    sa: {
        title: 'AI युद्धम् ⚔️',
        desc: 'भवतः विशिष्टकार्याय कतमः AI उत्तमः? वास्तविकजगतः परीक्षणानि मानदण्डाः च।',
        loading: 'युद्धक्षेत्रं लोड् भवति...'
    }
};
function AIBattle() {
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('aitdl_lang') || 'en';
        setLang(saved);
    }, []);
    const t = LANG[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                lang: lang,
                setLang: setLang
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/ai-battle.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '60px 20px',
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: 32,
                            marginBottom: 20
                        },
                        children: t.title
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/ai-battle.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            color: 'var(--text2)'
                        },
                        children: t.desc
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/ai-battle.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 40,
                            padding: 40,
                            border: '0.5px dashed var(--border)',
                            borderRadius: 12
                        },
                        children: t.loading
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/ai-battle.js",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/ai-battle.js",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/ai-battle.js",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__77c10c5b._.js.map