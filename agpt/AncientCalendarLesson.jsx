import { useState } from "react";

// ─── Author / Org ─────────────────────────────────────────────────────────────
// Author : Jawahar R. Mallah
// Org    : AITDL Network — Artificial Intelligence Technology & Deep Learning
// Website: aitdl.com
// All rights reserved © AITDL Network 2026

// ─── Lesson Data ─────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "origins",
    title: "Origins of the Ancient Calendar",
    subtitle: "5,000 Years of Sky Science — From Rig Veda to Rashtriya Panchang",
    category: "Chapter 1",
    emoji: "🌅",
    accentColor: "#C2763A",
    date: "3000 BCE – 1957 CE",
    readTime: "5 min read",
    heroFact:
      "India's calendar science predates every other known lunisolar almanac. The Rig Veda (1700–1100 BCE) describes the year as a 12-part wheel with 360 spokes — a solar calendar encoded in poetry.",
    article: `Long before clocks, computers, or satellites, the people of ancient India were measuring time with extraordinary precision by watching the sky. This was not guesswork — it was systematic, mathematical, and scientific observation built over thousands of years.

The oldest evidence comes from the Rig Veda (c. 1700–1100 BCE), which describes time as a wheel with 12 parts and 360 spokes — a 360-day solar calendar with a 5-day remainder. The same text identifies four cardinal directions used to orient astronomical altars. This was not poetry. This was astronomy encoded in verse.

The Vedanga Jyotisha (~1400–1200 BCE) is the oldest surviving astronomical text. It tracks the Sun, Moon, and 27 Nakshatras (star sectors), and records the lunisolar calendar with a precision that was unmatched anywhere in the ancient world at the time.

By 499 CE, Aryabhata would take this tradition and produce calculations accurate to within seconds of modern atomic clock measurements — using nothing but observation and mathematics.`,
    timeline: [
      { year: "~3000 BCE", event: "Indus Valley Civilisation — standardised weights, measures, and solar-oriented city planning", source: "Indian Culture, Govt. of India" },
      { year: "~1500 BCE", event: "Vedanga Jyotisha — oldest astronomical text; tracks Sun, Moon, 27 nakshatras", source: "Indian Astronomy, Wikipedia" },
      { year: "~800 BCE", event: "Baudhayana's Sulba Sutras — Pythagorean theorem 300 years before Pythagoras", source: "RASC History of Astronomy in India" },
      { year: "499 CE", event: "Aryabhata's Aryabhatiya — year length accurate to within 3 min 20 sec of modern value", source: "Britannica / Wikipedia" },
      { year: "628 CE", event: "Brahmagupta formalises arithmetic with zero and negative numbers", source: "Indian Astronomy, Wikipedia" },
      { year: "1957 CE", event: "India's government launches the Rashtriya Panchang — computed on modern computers using Aryabhata's framework", source: "Positional Astronomy Centre, India" },
    ],
    facts: [
      "Rig Veda describes a 360-day solar year with 5-day remainder — matching our modern value",
      "Vedanga Jyotisha documents 62 synodic months in a 5-year cycle — the same as Greece's Metonic Cycle",
      "India's first national calendar was launched in 1957, using the same maths Aryabhata wrote in 499 CE",
      "The Sulba Sutras used the Pythagorean theorem ~800 BCE — 300 years before Pythagoras",
    ],
    evidence: [
      { label: "Evidence 1 — Rig Veda (~1700–1100 BCE)", text: "Rig Veda 1.164 describes time as a 12-part wheel with 360 spokes and a 5-day remainder — a clear reference to the solar year's structure. The same text identifies four cardinal points used to orient astronomical altars. Source: Indian Astronomy, Wikipedia / Subhash Kak, LSU." },
      { label: "Evidence 2 — Vedanga Jyotisha (~1400–1200 BCE)", text: "Records: 'In a yuga (5-year era), there are 5 solar years, 67 lunar sidereal cycles, 1,830 days, 1,835 sidereal days, and 62 synodic months.' This is precise orbital mechanics verified by modern astronomy. Source: Indian Astronomy, Wikipedia." },
    ],
  },
  {
    id: "how-it-worked",
    title: "How the Ancient Indian Calendar Worked",
    subtitle: "A Lunisolar Engine More Complex Than Anything Else in the Ancient World",
    category: "Chapter 2",
    emoji: "⚙️",
    accentColor: "#2563EB",
    date: "Vedic Period – 5th Century CE",
    readTime: "6 min read",
    heroFact:
      "While Egypt tracked only the Sun and Babylon only the Moon, India tracked both simultaneously — plus 27 star sectors — creating a triple-layered astronomical system with no ancient equal.",
    article: `Most ancient civilisations chose one thing to track — either the Sun (solar calendar) or the Moon (lunar calendar). Ancient India chose both, plus 27 star sectors. This created a triple-layered system far more information-dense than any other ancient calendar.

The fundamental problem every calendar must solve: the Moon's year is 354 days, the Sun's year is 365 days — an 11-day gap every year. Left unresolved, festivals drift across seasons within decades. Indian astronomers solved this with an intercalary month called Adhika Masa, added every 32.5 months — the same mathematics as Greece's Metonic Cycle, but documented centuries earlier in India.

The Nakshatra system divided the sky into 27 sectors of 13.33° each. As the Moon moves through the sky, it occupies roughly one Nakshatra per day over its 27.3-day sidereal orbit. This gave Indian astronomers a precise daily position for the Moon — centuries before decimal coordinates existed.

The Surya Siddhanta (4th–5th century CE) contains planetary diameter calculations accurate to within 1% of modern NASA measurements — for Mercury, Saturn, and Earth.`,
    timeline: [
      { year: "~1000 BCE", event: "Atharvaveda references 28 lunar constellations — earliest stellar catalogue in India", source: "David Pingree / Surya Siddhanta, Wikipedia" },
      { year: "~500 BCE", event: "Five-limb Panchang system formalised: Tithi, Nakshatra, Yoga, Karana, Vara", source: "Indian Calendar System, BAPS" },
      { year: "~400 CE", event: "Surya Siddhanta written — planetary diameters accurate to within 1% of modern values", source: "Surya Siddhanta analysis, myzodiaq.in" },
      { year: "~600 CE", event: "Katapayadi encoding system invented — astronomical constants hidden in Sanskrit verse", source: "Kerala School of Astronomy" },
    ],
    facts: [
      "The Surya Siddhanta gives Saturn's diameter as 73,882 miles — modern value is 74,580 miles (error < 1%)",
      "The Surya Siddhanta gives Mercury's diameter as 3,008 miles — modern value is 3,032 miles (error < 1%)",
      "The sidereal year in Surya Siddhanta: 365.2563627 days — modern: 365.256363004 (difference: 0.000001%)",
      "The Adhika Masa intercalary month was used centuries before the Greek Metonic Cycle of 432 BCE",
    ],
    evidence: [
      { label: "Evidence 3 — Surya Siddhanta (4th–5th century CE)", text: "The Surya Siddhanta gives Earth's diameter as 8,000 miles (modern: 7,918 miles), Saturn's as 73,882 miles (modern: 74,580 miles), and Mercury's as 3,008 miles (modern: 3,032 miles). All under 1% error. The sidereal year value differs from the modern figure by less than 0.000001%. Source: Surya Siddhanta analysis, myzodiaq.in." },
      { label: "Evidence 4 — Atharvaveda stellar catalogue", text: "According to mathematician David Pingree, the Atharvaveda already contains references to 28 constellations and the movement of astronomical bodies — making India's Nakshatra system one of the oldest documented stellar catalogues in the world. Source: Surya Siddhanta, Wikipedia." },
    ],
  },
  {
    id: "aryabhata",
    title: "Aryabhata: The 23-Year-Old Who Rewrote Science",
    subtitle: "In 499 CE, a Young Mathematician from Patna Computed the Universe With His Bare Mind",
    category: "Chapter 3",
    emoji: "🧮",
    accentColor: "#7C3AED",
    date: "476 CE – 550 CE",
    readTime: "7 min read",
    heroFact:
      "Aryabhata's sidereal day calculation (23h 56m 4.1s) deviates from today's atomic clock measurement by just 0.009 seconds — computed in 499 CE without any instruments beyond naked-eye observation.",
    article: `Aryabhata was born in 476 CE, likely in the region of modern-day Bihar. At the age of 23, he wrote the Aryabhatiya — 121 verses in Sanskrit that contained more accurate astronomy than anything produced anywhere else in the world at that time. He did this without telescopes, without calculus, without a computer. He used observation, mathematics, and reasoning alone.

His most remarkable statement was in the Golapada section: "Just as a person in a moving boat sees stationary objects moving backward, the stars appear to move — but it is the Earth that rotates." He described Earth's axial rotation in 499 CE. Copernicus would independently reach the same conclusion in 1543 — over a thousand years later.

Aryabhata calculated the length of a sidereal year as 365 days, 6 hours, 12 minutes, and 30 seconds. The modern value is 365 days, 6 hours, 9 minutes, and 10 seconds — a difference of just 3 minutes and 20 seconds across a year.

His sidereal day: 23 hours, 56 minutes, 4.1 seconds. Modern value: 23 hours, 56 minutes, 4.091 seconds. Error: 0.009 seconds. In the 5th century. With no instruments.

The Aryabhatiya was translated into Arabic around 800 CE. Al-Khwarizmi studied it directly — and his work on algebra and algorithms, which gave Europe its mathematical foundations, built on Aryabhata's system.`,
    timeline: [
      { year: "476 CE", event: "Aryabhata born — likely in Kusumapura (modern Patna, Bihar)", source: "Britannica / Wikipedia" },
      { year: "499 CE", event: "Writes Aryabhatiya at age 23 — 121 Sanskrit verses covering mathematics and astronomy", source: "Aryabhatiya, Wikipedia" },
      { year: "499 CE", event: "States Earth rotates on its axis; explains eclipses as shadows, not Rahu/Ketu", source: "Aryabhatiya, Golapada section" },
      { year: "~800 CE", event: "Aryabhatiya translated into Arabic as Zij al-Arjabhar — influences Al-Khwarizmi", source: "Aryabhatiya Wikipedia / Britannica" },
      { year: "1543 CE", event: "Copernicus independently proposes Earth's rotation — 1,044 years after Aryabhata", source: "De Revolutionibus, Copernicus" },
      { year: "1975 CE", event: "India's first satellite named 'Aryabhata' in his honour", source: "ISRO archives" },
    ],
    facts: [
      "Aryabhata's sidereal day is off by just 0.009 seconds from modern atomic clock measurements",
      "He stated Earth rotates on its axis in 499 CE — Copernicus rediscovered this in 1543 CE",
      "His value of pi (3.1416) is correct to 4 decimal places",
      "His year length error of 3 min 20 sec is less than 0.001% of the actual value",
    ],
    evidence: [
      { label: "Evidence 5 — Aryabhatiya (499 CE), multiple verified sources", text: "Aryabhata's year length (365d 6h 12m 30s) deviates from the modern value by 3 minutes 20 seconds — confirmed by Britannica, Wikipedia's Aryabhatiya article, and the Royal Astronomical Society of Canada. His sidereal day calculation deviates by less than 0.01 seconds from atomic clock measurements. Source: Britannica / RASC / Wikipedia." },
      { label: "Evidence 6 — Global mathematical transmission", text: "The Aryabhatiya was translated into Arabic (~800 CE) under the title Zij al-Arjabhar. Al-Khwarizmi studied it directly. His foundational work on algebra and algorithms — which later gave Europe its mathematical foundations — built on Aryabhata's decimal system and astronomical methods. Source: Aryabhatiya Wikipedia / Britannica." },
    ],
  },
  {
    id: "numbers",
    title: "India's Mathematical Gifts to the World",
    subtitle: "Without Zero, Decimal Notation, and the Katapayadi System — Modern Science Would Not Exist",
    category: "Chapter 4",
    emoji: "🔢",
    accentColor: "#059669",
    date: "~628 CE – 1400 CE",
    readTime: "5 min read",
    heroFact:
      "Ancient Indian astronomers had a name for time intervals as small as one 34,000th of a second — called a Truti (29.63 microseconds). To compute such precision required inventing the decimal place-value system and zero.",
    article: `The Indian calendar system required something no other ancient civilisation had built: a way to write and compute very large numbers precisely. Calendrical astronomy deals in millions of years, billions of Earth rotations, and time intervals smaller than a millisecond. This necessity drove the most important mathematical inventions in human history.

Brahmagupta (628 CE) formally defined zero as both a number and a placeholder in the Brahmasphutasiddhanta — also establishing rules for arithmetic with negative numbers. This system is the foundation of all modern computing, finance, and science.

The Katapayadi system (c. 600 CE, Kerala) was even more elegant. Indian scholars assigned digits 0–9 to Sanskrit consonants. By reading the consonants of any Sanskrit verse, you could decode a sequence of numbers. The devotional phrase "Gopi Bhagya Madhuvrata" — a prayer to Lord Krishna — encodes the first 32 digits of pi when decoded using Katapayadi. Computer scientists have formally recognised this as a proto-cryptographic hash function, invented 1,300 years before computers.

The Mahayuga (4.32 million year cycle) used by Aryabhata was not mysticism — it was a mathematical device. By using such a large time base, the orbital ratios could be expressed as whole integers, avoiding the rounding errors that plagued other ancient calendar systems. This is the same technique modern astronomers use when defining Julian Date systems.`,
    timeline: [
      { year: "~500 BCE", event: "Pingala's Chandashstra — binary number sequences, combinatorics, and Pascal's triangle (2,000 years before Pascal)", source: "Indian Mathematics, Wikipedia" },
      { year: "~200 BCE", event: "Bakshali manuscript — earliest known use of zero as a placeholder in positional notation", source: "Oxford University Bodleian Library" },
      { year: "628 CE", event: "Brahmagupta defines zero as a number; rules for negative arithmetic in Brahmasphutasiddhanta", source: "Brahmagupta, Britannica" },
      { year: "~600 CE", event: "Katapayadi system invented — digits 0–9 encoded as Sanskrit consonants; pi hidden in prayer", source: "Kerala School of Astronomy records" },
      { year: "~1350 CE", event: "Madhava of Kerala — infinite series for sine, cosine, and pi (250 years before Newton/Leibniz)", source: "Kerala School, Wikipedia" },
      { year: "2023 CE", event: "Oxford researchers formally date Bakshali manuscript's zero to ~300 BCE using carbon dating", source: "University of Oxford, 2017" },
    ],
    facts: [
      "Truti — smallest Indian time unit — equals 29.63 microseconds, close to modern microsecond accuracy",
      "Bakshali manuscript (carbon-dated ~300 BCE) contains the world's oldest written zero",
      "Madhava's infinite series for pi (c. 1350 CE) predates Gregory-Leibniz series by 250 years",
      "The Mahayuga cycle of 4.32 million years was used to derive orbital constants as whole integers — avoiding rounding error",
    ],
    evidence: [
      { label: "Evidence 7 — Bakshali Manuscript (~300 BCE)", text: "Oxford University's Bodleian Library conducted radiocarbon dating on the Bakshali manuscript in 2017, placing its zero-symbol pages at approximately 300 BCE — making it the world's oldest confirmed zero. Source: University of Oxford 2017 radiocarbon study." },
      { label: "Evidence 8 — Katapayadi as proto-hash function", text: "The Katapayadi system assigns digits 0–9 to Sanskrit consonants. The phrase 'Gopi Bhagya Madhuvrata' decodes to the first 32 digits of pi. Modern computer scientists have formally recognised this as equivalent to a cryptographic hash function — structured data encoded inside human-readable text. Source: Kerala School of Astronomy records / AITDL Network research." },
    ],
  },
  {
    id: "world-comparison",
    title: "India vs the World — A Fair Comparison",
    subtitle: "Evidence-Based, Honest, and Complete — What India Contributed and What It Shared",
    category: "Chapter 5",
    emoji: "🌍",
    accentColor: "#DC2626",
    date: "3000 BCE – 1582 CE",
    readTime: "5 min read",
    heroFact:
      "The Julian Calendar (46 BCE) had a year 11 minutes too long — by 1582 CE it had drifted 13 full days and had to be corrected. India's calendar never needed this correction. Aryabhata's year was more accurate from the start.",
    article: `India's calendar science did not develop in isolation. There was genuine exchange with Babylonian, Greek, and Persian astronomers. An honest understanding includes both what India gave the world and what different traditions contributed to each other.

Egypt (3000 BCE) pioneered the solar year but tracked only the Sun. Babylon (~600 BCE) independently developed a lunisolar system and the Metonic cycle. Greece produced Hipparchos (~150 BCE), who discovered the precession of the equinoxes. Rome's Julian Calendar (46 BCE) introduced the leap year — but with a 11-minute-per-year error that accumulated to 13 days by 1582 CE, requiring the Gregorian correction.

India's system, by contrast, was lunisolar and sidereal simultaneously. It tracked five data streams at once — Tithi, Nakshatra, Yoga, Karana, and Vara — updated throughout each day. It was more information-dense and more accurate than any contemporary system.

The honest scholarly note: historians including David Pingree have documented Hellenistic influence on some aspects of later Indian texts after Alexander's Indian campaign (~325 BCE). The Greek and Indian traditions genuinely influenced each other. India's contribution is enormous — it does not need exaggeration. The verified facts are impressive enough.`,
    timeline: [
      { year: "3000 BCE", event: "Egypt — 365-day solar year; Nile flood prediction", source: "Egyptian Calendar, Wikipedia" },
      { year: "~600 BCE", event: "Babylon — Metonic cycle (19-year lunisolar correction) documented", source: "Babylonian Astronomy, Wikipedia" },
      { year: "~432 BCE", event: "Meton of Athens — 19-year cycle; India had the equivalent centuries earlier in Vedanga Jyotisha", source: "Metonic Cycle, Wikipedia" },
      { year: "46 BCE", event: "Rome — Julian Calendar (365.25 days); correct but 11 min/year too long", source: "Julian Calendar, Britannica" },
      { year: "499 CE", event: "India — Aryabhata's year (365d 6h 12m 30s): more accurate than Julian by 8 min 40 sec", source: "Aryabhatiya / Britannica" },
      { year: "1582 CE", event: "Europe — Gregorian Calendar corrects 13-day Julian drift by skipping days", source: "Gregorian Calendar, Britannica" },
    ],
    facts: [
      "Julian Calendar had a year 11 min too long — drifted 13 days by 1582 CE; India never needed this correction",
      "Aryabhata's year was more accurate than the Julian Calendar by 8 minutes 40 seconds",
      "India's calendar system spread to Nepal, Tibet, Thailand, Java, and Southeast Asia",
      "Indian astronomical texts were translated into Arabic (~800 CE) and Chinese (~600 CE), shaping Islamic and European science",
    ],
    evidence: [
      { label: "Evidence 9 — Cross-cultural transmission (800 CE onward)", text: "Indian astronomical texts were translated into Chinese during the Sui and Tang Dynasties (581–907 CE). The Aryabhatiya was translated into Arabic (~800 CE). Al-Khwarizmi's foundational work on algebra and algorithms built directly on Indian decimal mathematics. Source: BAPS Indian Calendar System / Indian Astronomy Wikipedia." },
      { label: "Evidence 10 — Gregorian drift proves Julian inaccuracy", text: "The Julian Calendar's 11-minute-per-year error accumulated to 13 full days by 1582 CE, requiring Pope Gregory XIII to remove 10 days from October 1582. Aryabhata's year length (499 CE) was more accurate than the Julian Calendar, which was introduced over 500 years earlier. Source: Gregorian Calendar, Britannica." },
    ],
  },
  {
    id: "quiz",
    title: "Test Your Knowledge",
    subtitle: "5 Questions — Every Answer Has an Evidence Citation",
    category: "Chapter 6 — Quiz",
    emoji: "✏️",
    accentColor: "#C2763A",
    date: "Take the test",
    readTime: "3 min",
    heroFact:
      "A student who can explain Indian calendar science with evidence is not just learning history — they are learning how science, mathematics, and observation interact across civilisations.",
    article: "",
    timeline: [],
    facts: [],
    evidence: [],
    isQuiz: true,
  },
];

const QUIZ = [
  {
    q: "Aryabhata calculated the sidereal day as 23h 56m 4.1s. How close is this to today's atomic clock value?",
    opts: ["Off by about 10 minutes", "Off by less than 0.01 seconds", "Off by about 1 minute", "Off by 3 hours"],
    correct: 1,
    feedback: "Correct! Aryabhata's sidereal day differs from the modern value (23h 56m 4.091s) by just 0.009 seconds — computed in 499 CE with no instruments. Source: Aryabhatiya Wikipedia / Academic Block.",
    wrongFeedback: "The answer is: off by less than 0.01 seconds. Aryabhata's value (23h 56m 4.1s) vs modern (23h 56m 4.091s) = 0.009 second difference. Source: Aryabhatiya Wikipedia.",
  },
  {
    q: "What does 'Panchang' literally mean in Sanskrit?",
    opts: ["Five Planets", "Sacred Calendar", "Five Limbs", "Moon Science"],
    correct: 2,
    feedback: "Correct! Pancha (पञ्च) = Five + Anga (अंग) = Limb. The five limbs are: Tithi, Nakshatra, Yoga, Karana, and Vara — each a real astronomical measurement.",
    wrongFeedback: "Panchang = Pancha (five) + Anga (limb) = Five Limbs. The five limbs are Tithi, Nakshatra, Yoga, Karana, and Vara — each tracking a different astronomical measurement.",
  },
  {
    q: "Aryabhata proposed Earth rotates on its axis in 499 CE. When did Europe independently reach the same conclusion?",
    opts: ["1200 CE by Roger Bacon", "1687 CE by Isaac Newton", "1610 CE by Galileo", "1543 CE by Copernicus"],
    correct: 3,
    feedback: "Correct! Copernicus published De Revolutionibus in 1543 — a full 1,044 years after Aryabhata stated Earth's rotation. Aryabhata even used an analogy: 'Just as a person in a moving boat sees stationary objects moving backward.' Source: Aryabhatiya Wikipedia.",
    wrongFeedback: "Copernicus (1543 CE) independently proposed Earth's rotation — 1,044 years after Aryabhata. Aryabhata described it in 499 CE with the analogy of a person on a moving boat. Source: Aryabhatiya Wikipedia.",
  },
  {
    q: "The Julian Calendar (46 BCE) was 11 minutes too long per year. By how much had it drifted by 1582 CE?",
    opts: ["1 day", "5 days", "1 month", "13 days"],
    correct: 3,
    feedback: "Correct! Over ~1,626 years, the 11-minute error accumulated to 13 days. Pope Gregory XIII corrected this in 1582 by removing 10 days from October. India's more accurate calendar never needed such a correction. Source: Gregorian Calendar, Britannica.",
    wrongFeedback: "The Julian Calendar drifted 13 days by 1582 CE. The 11-minute-per-year error × ~1,626 years = 13 days. Pope Gregory XIII corrected this by removing 10 days in October 1582. Source: Gregorian Calendar, Britannica.",
  },
  {
    q: "The Katapayadi system encodes pi into the Sanskrit phrase 'Gopi Bhagya Madhuvrata'. What modern concept is this equivalent to?",
    opts: ["A digital compression algorithm", "A cryptographic hash function", "A binary encoding system", "A random number generator"],
    correct: 1,
    feedback: "Correct! The Katapayadi system encodes structured numerical data (pi to 32 digits) inside human-readable Sanskrit text. Computer scientists have formally recognised this as a proto-cryptographic hash function — invented ~600 CE, over 1,300 years before modern computing. Source: Kerala School of Astronomy / AITDL Network.",
    wrongFeedback: "The answer is a cryptographic hash function. Katapayadi encodes numerical data inside readable text — the exact definition of a hash. It was invented ~600 CE, 1,300 years before modern computers. Source: Kerala School of Astronomy records.",
  },
];

const PANCHANG_TODAY = {
  tithi: "Phalguna Krishna Ekadashi",
  ritu: "Shishira (Winter)",
  festival: "Holika Dahan",
  nakshatra: "Uttara Phalguni",
  yoga: "Shukla",
  vara: "Mangalavar (Tuesday)",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Shared style helpers ─────────────────────────────────────────────────────
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes pageIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeSlide { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d4cfc6; border-radius: 3px; }
`;

// ─── Panchang Widget ──────────────────────────────────────────────────────────
function PanchangWidget() {
  return (
    <div style={{
      background: "linear-gradient(135deg,#fef9f0,#fdf4e3)",
      border: "1px solid #f0d9b0",
      borderRadius: "14px",
      padding: "16px",
      marginTop: "20px",
    }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "11px", fontWeight: 700, color: "#92400e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
        📅 Aaj ka Panchang
      </div>
      {Object.entries(PANCHANG_TODAY).map(([key, val]) => (
        <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px", borderBottom: "1px dashed #f0d9b0", paddingBottom: "5px" }}>
          <span style={{ fontSize: "10px", color: "#a36b2b", fontFamily: "Georgia,serif", textTransform: "capitalize" }}>
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <span style={{ fontSize: "11px", color: "#78350f", fontWeight: 600, fontFamily: "Georgia,serif", textAlign: "right", maxWidth: "58%" }}>
            {val}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Sidebar Chapter Card ─────────────────────────────────────────────────────
function SidebarCard({ chapter, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onClick(chapter)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", textAlign: "left",
        background: isActive ? `${chapter.accentColor}18` : hovered ? "#f5f3ee" : "transparent",
        border: isActive ? `1.5px solid ${chapter.accentColor}60` : `1.5px solid ${hovered ? "#e5e3de" : "transparent"}`,
        borderRadius: "12px", padding: "12px 14px", cursor: "pointer",
        transition: "all 0.2s ease", display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px",
      }}
    >
      <span style={{ fontSize: "18px", lineHeight: 1, marginTop: "2px", flexShrink: 0 }}>{chapter.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "12px", fontWeight: 700, color: "#1a1714", lineHeight: 1.3, marginBottom: "3px" }}>
          {chapter.title.length > 42 ? chapter.title.slice(0, 42) + "…" : chapter.title}
        </div>
        <div style={{ fontSize: "10px", color: "#9a8f7e", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
          {chapter.category} · {chapter.date}
        </div>
      </div>
      {isActive && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: chapter.accentColor, marginTop: "5px", flexShrink: 0 }} />}
    </button>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total, accentColor }) {
  return (
    <div style={{ height: "3px", background: "#ede8df", borderRadius: "999px", marginBottom: "28px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${((current + 1) / total) * 100}%`, background: accentColor, borderRadius: "999px", transition: "width 0.4s ease" }} />
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({ events, accentColor }) {
  return (
    <div style={{ position: "relative", paddingLeft: "26px" }}>
      <div style={{ position: "absolute", left: "9px", top: 0, bottom: 0, width: "1.5px", background: `${accentColor}30` }} />
      {events.map((ev, i) => (
        <div key={i} style={{ position: "relative", marginBottom: "18px", animation: "fadeSlide 0.4s ease both", animationDelay: `${i * 0.07}s` }}>
          <div style={{
            position: "absolute", left: "-19px", top: "4px", width: "10px", height: "10px",
            borderRadius: "50%",
            background: i === 0 || i === events.length - 1 ? accentColor : "#fff",
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 0 3px ${accentColor}20`,
          }} />
          <div style={{ fontSize: "10px", color: accentColor, fontFamily: "Georgia,serif", fontWeight: 700, marginBottom: "2px", letterSpacing: "0.04em" }}>{ev.year}</div>
          <div style={{ fontSize: "13px", color: "#2d2926", fontFamily: "Georgia,serif", lineHeight: 1.55, marginBottom: "2px" }}>{ev.event}</div>
          {ev.source && (
            <div style={{ fontSize: "10px", color: "#a09080", fontFamily: "Georgia,serif", fontStyle: "italic" }}>Source: {ev.source}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Evidence Box ─────────────────────────────────────────────────────────────
function EvidenceBox({ label, text, accentColor }) {
  return (
    <div style={{
      background: `${accentColor}08`,
      border: `1px solid ${accentColor}25`,
      borderLeft: `4px solid ${accentColor}`,
      borderRadius: "0 10px 10px 0",
      padding: "14px 18px",
      marginBottom: "14px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
        <span style={{ color: accentColor, flexShrink: 0 }}><ShieldIcon /></span>
        <span style={{ fontSize: "10px", fontFamily: "Georgia,serif", color: accentColor, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{label}</span>
      </div>
      <p style={{ fontFamily: "Georgia,serif", fontSize: "12px", color: "#5c5448", lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  );
}

// ─── Quiz Section ─────────────────────────────────────────────────────────────
function QuizSection({ accentColor }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswer = (qi, oi) => {
    if (answers[qi] !== undefined) return;
    const next = { ...answers, [qi]: oi };
    setAnswers(next);
    if (Object.keys(next).length === QUIZ.length) {
      setScore(QUIZ.filter((q, i) => next[i] === q.correct).length);
    }
  };

  return (
    <div>
      {QUIZ.map((q, qi) => {
        const answered = answers[qi] !== undefined;
        const isCorrect = answered && answers[qi] === q.correct;
        return (
          <div key={qi} style={{ marginBottom: "28px", animation: "fadeSlide 0.4s ease both", animationDelay: `${qi * 0.08}s` }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "14px", fontWeight: 600, color: "#1a1714", lineHeight: 1.5, marginBottom: "12px" }}>
              <span style={{ color: accentColor, fontFamily: "Georgia,serif", fontStyle: "italic", marginRight: "6px" }}>Q{qi + 1}.</span>
              {q.q}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {q.opts.map((opt, oi) => {
                let bg = "#f9f7f3", border = "1px solid #e8e3da", color = "#3d3730";
                if (answered) {
                  if (oi === q.correct) { bg = "#ecfdf5"; border = "1px solid #6ee7b7"; color = "#065f46"; }
                  else if (oi === answers[qi] && !isCorrect) { bg = "#fef2f2"; border = "1px solid #fca5a5"; color = "#991b1b"; }
                }
                return (
                  <button key={oi} onClick={() => handleAnswer(qi, oi)} disabled={answered}
                    style={{ display: "flex", alignItems: "center", gap: "10px", background: bg, border, borderRadius: "10px", padding: "10px 14px", cursor: answered ? "default" : "pointer", transition: "all 0.2s", textAlign: "left", width: "100%" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: answered && oi === q.correct ? "#059669" : answered && oi === answers[qi] && !isCorrect ? "#dc2626" : `${accentColor}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {answered && oi === q.correct ? <CheckIcon /> : answered && oi === answers[qi] && !isCorrect ? <XIcon /> : <span style={{ fontFamily: "Georgia,serif", fontSize: "11px", color: accentColor, fontWeight: 700 }}>{String.fromCharCode(65 + oi)}</span>}
                    </span>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: "13px", color, lineHeight: 1.4 }}>{opt}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <div style={{
                marginTop: "10px", padding: "10px 14px",
                background: isCorrect ? "#ecfdf5" : "#fef2f2",
                border: `1px solid ${isCorrect ? "#6ee7b7" : "#fca5a5"}`,
                borderRadius: "10px", fontFamily: "Georgia,serif", fontSize: "12px",
                color: isCorrect ? "#065f46" : "#991b1b", lineHeight: 1.65,
                animation: "popIn 0.25s ease both",
              }}>
                {isCorrect ? q.feedback : q.wrongFeedback}
              </div>
            )}
          </div>
        );
      })}

      {score !== null && (
        <div style={{
          background: score >= 4 ? "#ecfdf5" : score >= 3 ? "#fef9f0" : "#fef2f2",
          border: `2px solid ${score >= 4 ? "#6ee7b7" : score >= 3 ? accentColor : "#fca5a5"}`,
          borderRadius: "14px", padding: "20px 24px", textAlign: "center",
          animation: "popIn 0.3s ease both", marginTop: "8px",
        }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "28px", fontWeight: 700, color: "#1a1714", marginBottom: "6px" }}>
            {score} / {QUIZ.length}
          </div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: "14px", color: "#5c5448", lineHeight: 1.6 }}>
            {score === 5 ? "Perfect score! You can now explain Indian calendar science with evidence. Jai Hind! 🇮🇳" : score >= 3 ? "Good work! Review the chapters where you got it wrong and check the evidence boxes." : "Keep learning! Go back through the chapters and focus on the evidence citations."}
          </div>
          <div style={{ marginTop: "10px", fontSize: "10px", color: "#a09080", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
            AITDL Network · Jawahar R. Mallah · aitdl.com
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Detail / Lesson Page ─────────────────────────────────────────────────────
function LessonPage({ chapter, chapterIndex, total, onBack, onNext, onPrev }) {
  return (
    <div style={{ flex: 1, minWidth: 0, animation: "pageIn 0.35s ease both" }}>
      <style>{FONTS}</style>

      {/* Back button */}
      <button onClick={onBack}
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#7a6e5e", fontSize: "12px", fontFamily: "Georgia,serif", padding: "0 0 18px 0", transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = chapter.accentColor}
        onMouseLeave={e => e.currentTarget.style.color = "#7a6e5e"}
      >
        <ArrowLeft /> Back to lesson map
      </button>

      {/* Progress */}
      <ProgressBar current={chapterIndex} total={total} accentColor={chapter.accentColor} />

      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg,${chapter.accentColor}16,${chapter.accentColor}07)`,
        border: `1px solid ${chapter.accentColor}28`,
        borderRadius: "18px", padding: "28px 30px", marginBottom: "26px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: "18px", top: "14px", fontSize: "56px", opacity: 0.12, lineHeight: 1 }}>{chapter.emoji}</div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          <span style={{ background: chapter.accentColor, color: "#fff", fontSize: "9px", fontFamily: "Georgia,serif", padding: "3px 10px", borderRadius: "999px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
            {chapter.category}
          </span>
          <span style={{ color: "#a09080", fontSize: "11px", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", gap: "3px" }}>
            <CalendarIcon /> {chapter.date}
          </span>
          <span style={{ color: "#a09080", fontSize: "11px", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", gap: "3px" }}>
            <ClockIcon /> {chapter.readTime}
          </span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "24px", fontWeight: 700, color: "#1a1714", margin: "0 0 8px", lineHeight: 1.25 }}>
          {chapter.title}
        </h1>
        <p style={{ fontFamily: "Georgia,serif", fontSize: "14px", color: "#5c5448", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
          {chapter.subtitle}
        </p>
      </div>

      {/* Key Insight callout */}
      <div style={{ borderLeft: `4px solid ${chapter.accentColor}`, padding: "12px 18px", background: `${chapter.accentColor}08`, borderRadius: "0 10px 10px 0", marginBottom: "26px" }}>
        <div style={{ fontSize: "9px", fontFamily: "Georgia,serif", color: chapter.accentColor, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: "5px" }}>✦ Key Insight</div>
        <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: "14px", color: "#2d2926", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>{chapter.heroFact}</p>
      </div>

      {/* Quiz or Article */}
      {chapter.isQuiz ? (
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, color: "#1a1714", marginBottom: "18px", paddingBottom: "8px", borderBottom: `2px solid ${chapter.accentColor}28` }}>
            Answer all 5 questions
          </h2>
          <QuizSection accentColor={chapter.accentColor} />
        </section>
      ) : (
        <>
          {/* Article */}
          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, color: "#1a1714", marginBottom: "14px", paddingBottom: "8px", borderBottom: `2px solid ${chapter.accentColor}28` }}>
              Full Lesson
            </h2>
            {chapter.article.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontFamily: "'Lora',Georgia,serif", fontSize: "14px", color: "#3d3730", lineHeight: 1.8, marginBottom: "14px", animation: "fadeSlide 0.4s ease both", animationDelay: `${i * 0.06}s` }}>
                {para}
              </p>
            ))}
          </section>

          {/* Evidence */}
          {chapter.evidence.length > 0 && (
            <section style={{ marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, color: "#1a1714", marginBottom: "14px", paddingBottom: "8px", borderBottom: `2px solid ${chapter.accentColor}28` }}>
                Evidence & Sources
              </h2>
              {chapter.evidence.map((ev, i) => (
                <EvidenceBox key={i} label={ev.label} text={ev.text} accentColor={chapter.accentColor} />
              ))}
            </section>
          )}

          {/* Timeline */}
          {chapter.timeline.length > 0 && (
            <section style={{ marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, color: "#1a1714", marginBottom: "16px", paddingBottom: "8px", borderBottom: `2px solid ${chapter.accentColor}28` }}>
                Timeline
              </h2>
              <Timeline events={chapter.timeline} accentColor={chapter.accentColor} />
            </section>
          )}

          {/* Quick Facts */}
          {chapter.facts.length > 0 && (
            <section style={{ marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, color: "#1a1714", marginBottom: "14px", paddingBottom: "8px", borderBottom: `2px solid ${chapter.accentColor}28` }}>
                Quick Facts
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
                {chapter.facts.map((fact, i) => (
                  <div key={i} style={{ background: "#f9f7f3", borderRadius: "10px", padding: "11px 13px", display: "flex", alignItems: "flex-start", gap: "8px", animation: "fadeSlide 0.4s ease both", animationDelay: `${i * 0.08}s` }}>
                    <span style={{ color: chapter.accentColor, marginTop: "1px", flexShrink: 0 }}><StarIcon /></span>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: "12px", color: "#3d3730", lineHeight: 1.5 }}>{fact}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Panchang */}
          <section>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, color: "#1a1714", marginBottom: "14px", paddingBottom: "8px", borderBottom: `2px solid ${chapter.accentColor}28` }}>
              Aaj ka Panchang
            </h2>
            <PanchangWidget />
          </section>
        </>
      )}

      {/* Chapter navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", paddingTop: "18px", borderTop: "1px solid #e8e3da" }}>
        <button onClick={onPrev} disabled={chapterIndex === 0}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: `1px solid ${chapterIndex === 0 ? "#e8e3da" : chapter.accentColor + "40"}`, borderRadius: "10px", padding: "8px 16px", cursor: chapterIndex === 0 ? "default" : "pointer", fontFamily: "Georgia,serif", fontSize: "12px", color: chapterIndex === 0 ? "#c0b8a8" : chapter.accentColor, transition: "all 0.2s" }}>
          <ArrowLeft /> Previous
        </button>
        <span style={{ fontFamily: "Georgia,serif", fontSize: "11px", color: "#a09080", fontStyle: "italic" }}>
          {chapterIndex + 1} of {total}
        </span>
        <button onClick={onNext} disabled={chapterIndex === total - 1}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: chapterIndex === total - 1 ? "transparent" : chapter.accentColor, border: `1px solid ${chapter.accentColor}`, borderRadius: "10px", padding: "8px 16px", cursor: chapterIndex === total - 1 ? "default" : "pointer", fontFamily: "Georgia,serif", fontSize: "12px", color: chapterIndex === total - 1 ? "#c0b8a8" : "#fff", transition: "all 0.2s" }}>
          {chapterIndex === total - 1 ? "Completed" : "Next"} <ArrowRight />
        </button>
      </div>

      {/* Author footer */}
      <div style={{ marginTop: "28px", paddingTop: "14px", borderTop: "1px solid #e8e3da", textAlign: "right" }}>
        <span style={{ fontFamily: "Georgia,serif", fontSize: "10px", color: "#b0a898", fontStyle: "italic" }}>
          AITDL Network — Jawahar R. Mallah · aitdl.com
        </span>
      </div>
    </div>
  );
}

// ─── Welcome / Landing State ──────────────────────────────────────────────────
function WelcomeState({ onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", animation: "pageIn 0.4s ease both" }}>
      <style>{FONTS}</style>
      <div style={{ fontSize: "64px", marginBottom: "18px", opacity: 0.55 }}>📜</div>
      <div style={{ fontFamily: "Georgia,serif", fontSize: "10px", color: "#c2763a", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "10px" }}>AITDL · History Lesson</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "26px", fontWeight: 700, color: "#1a1714", marginBottom: "10px", lineHeight: 1.25 }}>
        Ancient Calendar of India
      </h2>
      <p style={{ fontFamily: "Georgia,serif", fontSize: "14px", color: "#7a6e5e", maxWidth: "380px", lineHeight: 1.7, fontStyle: "italic", marginBottom: "28px" }}>
        6 chapters with evidence citations — from the Rig Veda to Aryabhata to the world. Select a chapter or start from the beginning.
      </p>
      <button onClick={() => onSelect(0)}
        style={{ display: "flex", alignItems: "center", gap: "8px", background: "#C2763A", border: "none", borderRadius: "12px", padding: "12px 28px", cursor: "pointer", fontFamily: "'Playfair Display',serif", fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "22px", transition: "opacity 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        Start Lesson <ArrowRight />
      </button>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        {CHAPTERS.map((ch, i) => (
          <button key={ch.id} onClick={() => onSelect(i)}
            style={{ background: `${ch.accentColor}10`, border: `1px solid ${ch.accentColor}35`, borderRadius: "999px", padding: "7px 16px", cursor: "pointer", fontFamily: "Georgia,serif", fontSize: "12px", color: ch.accentColor, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${ch.accentColor}22`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${ch.accentColor}10`; }}
          >
            {ch.emoji} {ch.category}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function AncientCalendarLesson() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selected = selectedIndex !== null ? CHAPTERS[selectedIndex] : null;

  return (
    <div style={{ fontFamily: "Georgia,serif", background: "#faf8f4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{FONTS}</style>

      {/* Top Bar */}
      <div style={{ background: "#1a1714", padding: "13px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", color: "#f5f0e8", fontWeight: 700, letterSpacing: "0.02em" }}>
          🇮🇳 AITDL · Bharat Knowledge
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
          <div style={{ fontSize: "11px", color: "#9a8f7e", fontFamily: "Georgia,serif" }}>
            Ancient Calendar · History Lesson
          </div>
          <div style={{ fontSize: "9px", color: "#6b6055", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
            Jawahar R. Mallah · aitdl.com
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, maxWidth: "1100px", width: "100%", margin: "0 auto" }}>

        {/* Sidebar */}
        <div style={{ width: "272px", flexShrink: 0, background: "#fff", borderRight: "1px solid #e8e3da", padding: "22px 14px", overflowY: "auto", minHeight: "calc(100vh - 50px)" }}>

          <div style={{ fontSize: "9px", color: "#b0a898", fontFamily: "Georgia,serif", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "12px", paddingLeft: "4px" }}>
            Lesson Chapters
          </div>

          <div style={{ fontSize: "10px", color: "#c0b8a8", fontFamily: "Georgia,serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", paddingLeft: "4px" }}>
            📚 History Lessons
          </div>
          {CHAPTERS.filter(c => !c.isQuiz).map((ch, i) => (
            <SidebarCard key={ch.id} chapter={ch} isActive={selected?.id === ch.id} onClick={() => setSelectedIndex(i)} />
          ))}

          <div style={{ height: "14px" }} />
          <div style={{ fontSize: "10px", color: "#c0b8a8", fontFamily: "Georgia,serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", paddingLeft: "4px" }}>
            ✏️ Assessment
          </div>
          {CHAPTERS.filter(c => c.isQuiz).map((ch) => (
            <SidebarCard key={ch.id} chapter={ch} isActive={selected?.id === ch.id} onClick={() => setSelectedIndex(CHAPTERS.indexOf(ch))} />
          ))}

          <PanchangWidget />

          {/* Author credit */}
          <div style={{ marginTop: "20px", padding: "10px 8px", borderTop: "1px dashed #e8e3da", textAlign: "center" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "9px", color: "#c0b8a8", lineHeight: 1.6 }}>
              Created by<br />
              <span style={{ fontWeight: 700, color: "#a09080" }}>Jawahar R. Mallah</span><br />
              AITDL Network · aitdl.com
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", minHeight: "calc(100vh - 50px)" }}>
          {selected ? (
            <LessonPage
              chapter={selected}
              chapterIndex={selectedIndex}
              total={CHAPTERS.length}
              onBack={() => setSelectedIndex(null)}
              onNext={() => selectedIndex < CHAPTERS.length - 1 && setSelectedIndex(selectedIndex + 1)}
              onPrev={() => selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)}
            />
          ) : (
            <WelcomeState onSelect={setSelectedIndex} />
          )}
        </div>
      </div>
    </div>
  );
}
