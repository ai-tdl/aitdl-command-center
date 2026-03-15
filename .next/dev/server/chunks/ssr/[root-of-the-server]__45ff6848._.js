module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/aitdl4/components/ErrorBoundary.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Component {
    state = {
        hasError: false
    };
    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    padding: '100px 20px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: 32,
                            marginBottom: 16
                        },
                        children: "Kuch galat hua 😕"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ErrorBoundary.js",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            color: 'var(--text-secondary)',
                            marginBottom: 32
                        },
                        children: "Technical error ki wajah se page load nahi ho saka."
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ErrorBoundary.js",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        style: {
                            padding: '16px 40px',
                            background: 'var(--accent)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 50,
                            fontSize: 14,
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px var(--accent-glow)'
                        },
                        children: "Reload karo"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/ErrorBoundary.js",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/ErrorBoundary.js",
                lineNumber: 14,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
const __TURBOPACK__default__export__ = ErrorBoundary;
}),
"[project]/aitdl4/lib/vikramSamvat.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/aitdl4/data/techHistory.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/aitdl4/components/SidebarCard.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SidebarCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$vikramSamvat$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/vikramSamvat.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$data$2f$techHistory$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/data/techHistory.js [ssr] (ecmascript)");
'use client';
;
;
;
;
function SidebarCard() {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(5);
    const [showCt, setShowCt] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [vsOpen, setVsOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [vs, setVs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [fact, setFact] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [bh, setBh] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const ctRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const fillRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setMounted(true);
        setVs((0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$vikramSamvat$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getVikramSamvatFull"])());
        setFact((0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$data$2f$techHistory$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getTodayFact"])());
        setBh((0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$data$2f$techHistory$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getRandomBharatFact"])());
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!mounted) return;
        const handleLoad = ()=>{
            setTimeout(()=>{
                setVisible(true);
                setTimeout(()=>{
                    setOpen(true);
                    setShowCt(true);
                    setCountdown(5);
                    let ct = 5;
                    if (fillRef.current) {
                        fillRef.current.style.transition = 'none';
                        fillRef.current.style.width = '100%';
                        setTimeout(()=>{
                            if (fillRef.current) {
                                fillRef.current.style.transition = 'width 5s linear';
                                fillRef.current.style.width = '0%';
                            }
                        }, 50);
                    }
                    ctRef.current = setInterval(()=>{
                        ct--;
                        setCountdown(ct);
                        if (ct <= 0) {
                            clearInterval(ctRef.current);
                            setOpen(false);
                            setShowCt(false);
                        }
                    }, 1000);
                }, 100);
            }, 2000);
        };
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return ()=>window.removeEventListener('load', handleLoad);
        }
    }, [
        mounted
    ]);
    const handleTabClick = ()=>{
        if (ctRef.current) clearInterval(ctRef.current);
        setShowCt(false);
        setOpen((prev)=>!prev);
    };
    if (!mounted || !vs || !fact || !bh) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `fixed right-0 top-1/2 
      -translate-y-1/2 z-50 flex items-center 
      transition-all duration-500
      ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: handleTabClick,
                className: "bg-white dark:bg-gray-900    border border-r-0    border-gray-200 dark:border-gray-700    rounded-l-lg px-2 py-3    flex flex-col items-center gap-1.5    cursor-pointer    hover:bg-gray-50 dark:hover:bg-gray-800    transition-colors flex-shrink-0    focus:outline-none",
                "aria-label": "Toggle info panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '14px'
                        },
                        children: "🇮🇳"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-0.5    items-center",
                        children: [
                            0,
                            1,
                            2
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-1 h-1    rounded-full bg-gray-400    dark:bg-gray-600"
                            }, i, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: `text-xs text-gray-400 
          transition-transform duration-300 
          ${open ? 'rotate-0' : 'rotate-180'}`,
                        children: "▶"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/SidebarCard.js",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "overflow-hidden bg-white    dark:bg-gray-900 border border-r-0    border-gray-200 dark:border-gray-700    rounded-l-lg",
                style: {
                    width: open ? '210px' : '0px',
                    opacity: open ? 1 : 0,
                    transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1),' + 'opacity 0.35s ease'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2 border-b    border-gray-100 dark:border-gray-800    flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium    text-gray-400 uppercase    tracking-widest whitespace-nowrap",
                                style: {
                                    fontSize: '9px'
                                },
                                children: "Bharat · History · Calendar"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-1.5 h-1.5 rounded-full    bg-green-400 animate-pulse    flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2.5 border-b    border-gray-100 dark:border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center    gap-1.5 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '11px'
                                        },
                                        children: "🇮🇳"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium    px-1.5 py-0.5 rounded-full    bg-amber-50 dark:bg-amber-900/20   text-amber-700 dark:text-amber-400   border border-amber-200/60   whitespace-nowrap",
                                        style: {
                                            fontSize: '9px'
                                        },
                                        children: bh.era
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold    text-gray-800 dark:text-gray-200    mb-0.5 leading-tight",
                                children: bh.person
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-1.5    leading-tight",
                                style: {
                                    fontSize: '10px'
                                },
                                children: bh.title
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-gray-500    dark:text-gray-400 leading-relaxed    mb-2",
                                style: {
                                    fontSize: '10px'
                                },
                                children: bh.fact.length > 90 ? bh.fact.slice(0, 90) + '…' : bh.fact
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5 p-1.5    rounded-md bg-teal-50    dark:bg-teal-900/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-teal-500    flex-shrink-0 mt-0.5",
                                        style: {
                                            fontSize: '10px'
                                        },
                                        children: "⚡"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-teal-700    dark:text-teal-400 leading-relaxed",
                                        style: {
                                            fontSize: '9px'
                                        },
                                        children: bh.connection.length > 80 ? bh.connection.slice(0, 80) + '…' : bh.connection
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2.5 border-b    border-gray-100 dark:border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setVsOpen(!vsOpen),
                                className: "w-full text-left    focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold    text-amber-500 leading-snug mb-0.5",
                                        children: vs.line1
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-amber-600/70 mb-1",
                                        style: {
                                            fontSize: '10px'
                                        },
                                        children: vs.line2
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center    gap-1 my-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-px    bg-gray-100 dark:bg-gray-800"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-gray-300",
                                                style: {
                                                    fontSize: '8px'
                                                },
                                                children: "✦"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 213,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-px    bg-gray-100 dark:bg-gray-800"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500    dark:text-gray-400",
                                        style: {
                                            fontSize: '10px'
                                        },
                                        children: vs.line3.split('|')[0].trim()
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        style: {
                                            fontSize: '9px'
                                        },
                                        children: vs.line3.split('|')[1]?.trim()
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center    gap-1.5 mt-1.5 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5    rounded-full border    border-gray-200    dark:border-gray-700    text-gray-400 whitespace-nowrap",
                                                style: {
                                                    fontSize: '9px'
                                                },
                                                children: [
                                                    vs.ritu?.icon,
                                                    " ",
                                                    vs.ritu?.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 229,
                                                columnNumber: 15
                                            }, this),
                                            vs.daysToNavVarsh > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-amber-500    whitespace-nowrap",
                                                style: {
                                                    fontSize: '9px'
                                                },
                                                children: [
                                                    vs.daysToNavVarsh,
                                                    "d to VS 2083 🙏"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, this),
                                            vs.daysToNavVarsh === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-amber-500    font-medium",
                                                style: {
                                                    fontSize: '9px'
                                                },
                                                children: "🎊 नव वर्षाभिनन्दनम्!"
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-gray-400 ml-auto",
                                                style: {
                                                    fontSize: '9px'
                                                },
                                                children: vsOpen ? '▲' : '▼'
                                            }, void 0, false, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 251,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            vsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mt-2 pt-2 border-t    border-gray-100 dark:border-gray-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3    gap-1 mb-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$vikramSamvat$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["VS_RITUS"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: `text-center p-1 
                      rounded border
                      ${vs.ritu?.name === r.name ? 'border-amber-400/50 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-100 dark:border-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '11px'
                                                        },
                                                        children: r.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                        lineNumber: 272,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: `font-medium 
                      ${vs.ritu?.name === r.name ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}`,
                                                        style: {
                                                            fontSize: '8px'
                                                        },
                                                        children: r.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, r.name, true, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    vs.festivals?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap    gap-1",
                                        children: vs.festivals.slice(0, 3).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5    rounded-full border    border-amber-300/50    text-amber-600    dark:text-amber-400",
                                                style: {
                                                    fontSize: '8px'
                                                },
                                                children: f
                                            }, f, false, {
                                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                                lineNumber: 292,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2.5 border-b    border-gray-100 dark:border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center    gap-2 mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "font-medium    px-1.5 py-0.5 rounded    bg-amber-50 dark:bg-amber-900/20   text-amber-700 dark:text-amber-400   whitespace-nowrap",
                                        style: {
                                            fontSize: '10px'
                                        },
                                        children: fact.year
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-gray-400",
                                        style: {
                                            fontSize: '9px'
                                        },
                                        children: "On This Day"
                                    }, void 0, false, {
                                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-gray-500    dark:text-gray-400 leading-relaxed",
                                style: {
                                    fontSize: '10px'
                                },
                                children: fact.fact.length > 100 ? fact.fact.slice(0, 100) + '…' : fact.fact
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "w-full text-gray-300    hover:text-amber-500    transition-colors flex items-center    justify-center gap-1    focus:outline-none",
                            style: {
                                fontSize: '9px'
                            },
                            children: "📖 View Full History →"
                        }, void 0, false, {
                            fileName: "[project]/aitdl4/components/SidebarCard.js",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    showCt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "px-3 py-1.5 border-t    border-gray-100 dark:border-gray-800    flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-0.5    bg-gray-200 dark:bg-gray-700    rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    ref: fillRef,
                                    className: "h-0.5 bg-amber-500    rounded-full",
                                    style: {
                                        width: '100%'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aitdl4/components/SidebarCard.js",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-gray-400    min-w-[14px] text-right",
                                style: {
                                    fontSize: '10px'
                                },
                                children: countdown
                            }, void 0, false, {
                                fileName: "[project]/aitdl4/components/SidebarCard.js",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aitdl4/components/SidebarCard.js",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/components/SidebarCard.js",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/components/SidebarCard.js",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
"[project]/aitdl4/lib/seo.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GlobalSEO",
    ()=>GlobalSEO,
    "PageSEO",
    ()=>PageSEO,
    "ToolSEO",
    ()=>ToolSEO
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$29$__ = __turbopack_context__.i("[externals]/next-seo/pages [external] (next-seo/pages, esm_import, [project]/aitdl4/node_modules/next-seo)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
const GlobalSEO = ()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$29$__["generateDefaultSeo"])(DEFAULT_SEO);
const PageSEO = ({ title, description, slug, image })=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$29$__["generateNextSeo"])({
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
const ToolSEO = ({ tool })=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2d$seo$29$__["generateNextSeo"])({
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/aitdl4/lib/jsonld.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeJsonLD",
    ()=>HomeJsonLD,
    "ToolJsonLD",
    ()=>ToolJsonLD
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const HomeJsonLD = ({ toolCount })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
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
const ToolJsonLD = ({ tool })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
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
}),
"[project]/aitdl4/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>App
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ErrorBoundary$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/ErrorBoundary.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SidebarCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/components/SidebarCard.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/seo.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$jsonld$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aitdl4/lib/jsonld.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$vercel$2f$analytics$2f$react__$5b$external$5d$__$2840$vercel$2f$analytics$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f40$vercel$2f$analytics$29$__ = __turbopack_context__.i("[externals]/@vercel/analytics/react [external] (@vercel/analytics/react, esm_import, [project]/aitdl4/node_modules/@vercel/analytics)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$vercel$2f$analytics$2f$react__$5b$external$5d$__$2840$vercel$2f$analytics$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f40$vercel$2f$analytics$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$vercel$2f$analytics$2f$react__$5b$external$5d$__$2840$vercel$2f$analytics$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f40$vercel$2f$analytics$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
function App({ Component, pageProps }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('theme');
        // No saved preference → follow OS
        if (!saved) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-theme', 'dark');
                setTheme('dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'light');
                setTheme('light');
            }
            return;
        }
        // Apply saved theme
        setTheme(saved);
        document.documentElement.classList.remove('dark', 'glass', 'midnight');
        document.documentElement.setAttribute('data-theme', saved);
        if (saved === 'dark' || saved === 'midnight') {
            document.documentElement.classList.add('dark');
        }
        if (saved === 'glass') {
            document.documentElement.setAttribute('data-theme', 'glass');
        }
        if (saved === 'midnight') {
            document.documentElement.setAttribute('data-theme', 'midnight');
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Only auto-follow OS if no saved preference
        const saved = localStorage.getItem('theme');
        if (saved) return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e)=>{
            if (e.matches) {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-theme', 'dark');
                setTheme('dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'light');
                setTheme('light');
            }
        };
        mediaQuery.addEventListener('change', handler);
        return ()=>mediaQuery.removeEventListener('change', handler);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$ErrorBoundary$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$seo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["GlobalSEO"])(),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/_app.js",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://aitdl.com"
                    }, void 0, false, {
                        fileName: "[project]/aitdl4/pages/_app.js",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aitdl4/pages/_app.js",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$lib$2f$jsonld$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["HomeJsonLD"], {
                toolCount: 100
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/_app.js",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/aitdl4/pages/_app.js",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aitdl4$2f$components$2f$SidebarCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/_app.js",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$vercel$2f$analytics$2f$react__$5b$external$5d$__$2840$vercel$2f$analytics$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$aitdl4$2f$node_modules$2f40$vercel$2f$analytics$29$__["Analytics"], {}, void 0, false, {
                fileName: "[project]/aitdl4/pages/_app.js",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aitdl4/pages/_app.js",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/aitdl4/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/aitdl4/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/aitdl4/node_modules/next/dist/shared/lib/side-effect.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[externals]/react [external] (react, cjs)");
const isServer = ("TURBOPACK compile-time value", "undefined") === 'undefined';
const useClientOnlyLayoutEffect = ("TURBOPACK compile-time truthy", 1) ? ()=>{} : "TURBOPACK unreachable";
const useClientOnlyEffect = ("TURBOPACK compile-time truthy", 1) ? ()=>{} : "TURBOPACK unreachable";
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements));
        }
    }
    if ("TURBOPACK compile-time truthy", 1) {
        headManager?.mountedInstances?.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect(()=>{
        headManager?.mountedInstances?.add(props.children);
        return ()=>{
            headManager?.mountedInstances?.delete(props.children);
        };
    });
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect(()=>{
        if (headManager) {
            headManager._pendingUpdate = emitChange;
        }
        return ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
        };
    });
    useClientOnlyEffect(()=>{
        if (headManager && headManager._pendingUpdate) {
            headManager._pendingUpdate();
            headManager._pendingUpdate = null;
        }
        return ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
        };
    });
    return null;
} //# sourceMappingURL=side-effect.js.map
}),
"[project]/aitdl4/node_modules/next/dist/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)");
        } else //TURBOPACK unreachable
        ;
    } else //TURBOPACK unreachable
    ;
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/aitdl4/node_modules/next/dist/server/route-modules/pages/vendored/contexts/head-manager-context.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/aitdl4/node_modules/next/dist/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)").vendored['contexts'].HeadManagerContext; //# sourceMappingURL=head-manager-context.js.map
}),
"[project]/aitdl4/node_modules/next/dist/shared/lib/utils/warn-once.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "warnOnce", {
    enumerable: true,
    get: function() {
        return warnOnce;
    }
});
let warnOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const warnings = new Set();
    warnOnce = (msg)=>{
        if (!warnings.has(msg)) {
            console.warn(msg);
        }
        warnings.add(msg);
    };
} //# sourceMappingURL=warn-once.js.map
}),
"[project]/aitdl4/node_modules/next/dist/shared/lib/head.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/aitdl4/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [ssr] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/aitdl4/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [ssr] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[externals]/react [external] (react, cjs)"));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/aitdl4/node_modules/next/dist/shared/lib/side-effect.js [ssr] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/aitdl4/node_modules/next/dist/server/route-modules/pages/vendored/contexts/head-manager-context.js [ssr] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/aitdl4/node_modules/next/dist/shared/lib/utils/warn-once.js [ssr] (ecmascript)");
function defaultHead() {
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"),
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")
    ];
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements) {
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead().reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            // omit JSON-LD structured data snippets from the warning
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? `<script> tag with src="${c.props['src']}"` : `inline <script>`;
                (0, _warnonce.warnOnce)(`Do not add <script> tags using next/head (see ${srcMessage}). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)(`Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="${c.props['href']}"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
            }
        }
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head({ children }) {
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map
}),
"[project]/aitdl4/node_modules/next/head.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/aitdl4/node_modules/next/dist/shared/lib/head.js [ssr] (ecmascript)");
}),
"[externals]/next-seo/pages [external] (next-seo/pages, esm_import, [project]/aitdl4/node_modules/next-seo)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("next-seo-41ad22c7aa0e442d/pages");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@vercel/analytics/react [external] (@vercel/analytics/react, esm_import, [project]/aitdl4/node_modules/@vercel/analytics)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@vercel/analytics-54be2a8cd935289a/react");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__45ff6848._.js.map