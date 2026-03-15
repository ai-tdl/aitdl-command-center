const VS_2082_MONTHS = [
  { name:'Chaitra',      sk:'चैत्र',      
    start:'2025-03-30', end:'2025-04-27', 
    ritu:'Vasant' },
  { name:'Vaishakha',    sk:'वैशाख',      
    start:'2025-04-28', end:'2025-05-26', 
    ritu:'Vasant' },
  { name:'Jyeshtha',     sk:'ज्येष्ठ',    
    start:'2025-05-27', end:'2025-06-25', 
    ritu:'Grishma' },
  { name:'Ashadha',      sk:'आषाढ़',      
    start:'2025-06-26', end:'2025-07-24', 
    ritu:'Grishma' },
  { name:'Shravana',     sk:'श्रावण',     
    start:'2025-07-25', end:'2025-08-22', 
    ritu:'Varsha' },
  { name:'Bhadrapada',   sk:'भाद्रपद',    
    start:'2025-08-23', end:'2025-09-21', 
    ritu:'Varsha' },
  { name:'Ashvina',      sk:'अश्विन',     
    start:'2025-09-22', end:'2025-10-20', 
    ritu:'Sharad' },
  { name:'Kartika',      sk:'कार्तिक',    
    start:'2025-10-21', end:'2025-11-19', 
    ritu:'Sharad' },
  { name:'Margashirsha', sk:'मार्गशीर्ष', 
    start:'2025-11-20', end:'2025-12-18', 
    ritu:'Hemant' },
  { name:'Pausha',       sk:'पौष',        
    start:'2025-12-19', end:'2026-01-16', 
    ritu:'Hemant' },
  { name:'Magha',        sk:'माघ',        
    start:'2026-01-17', end:'2026-02-15', 
    ritu:'Shishir' },
  { name:'Phalguna',     sk:'फाल्गुन',    
    start:'2026-02-16', end:'2026-03-18', 
    ritu:'Shishir' },
];

const VS_2083_MONTHS = [
  { name:'Chaitra',        sk:'चैत्र',         
    start:'2026-03-19', end:'2026-04-16', 
    ritu:'Vasant', navVarsh:true },
  { name:'Vaishakha',      sk:'वैशाख',         
    start:'2026-04-17', end:'2026-05-15', 
    ritu:'Vasant' },
  { name:'Adhik Jyeshtha', sk:'अधिक ज्येष्ठ', 
    start:'2026-05-16', end:'2026-06-13', 
    ritu:'Grishma', adhik:true },
  { name:'Nija Jyeshtha',  sk:'निज ज्येष्ठ',  
    start:'2026-06-14', end:'2026-07-13', 
    ritu:'Grishma' },
  { name:'Ashadha',        sk:'आषाढ़',         
    start:'2026-07-14', end:'2026-08-11', 
    ritu:'Varsha' },
  { name:'Shravana',       sk:'श्रावण',        
    start:'2026-08-12', end:'2026-09-09', 
    ritu:'Varsha' },
  { name:'Bhadrapada',     sk:'भाद्रपद',       
    start:'2026-09-10', end:'2026-10-08', 
    ritu:'Varsha' },
  { name:'Ashvina',        sk:'अश्विन',        
    start:'2026-10-09', end:'2026-11-07', 
    ritu:'Sharad' },
  { name:'Kartika',        sk:'कार्तिक',       
    start:'2026-11-08', end:'2026-12-06', 
    ritu:'Sharad' },
  { name:'Margashirsha',   sk:'मार्गशीर्ष',    
    start:'2026-12-07', end:'2027-01-05', 
    ritu:'Hemant' },
  { name:'Pausha',         sk:'पौष',           
    start:'2027-01-06', end:'2027-02-03', 
    ritu:'Hemant' },
  { name:'Magha',          sk:'माघ',           
    start:'2027-02-04', end:'2027-03-04', 
    ritu:'Shishir' },
  { name:'Phalguna',       sk:'फाल्गुन',       
    start:'2027-03-05', end:'2027-03-29', 
    ritu:'Shishir' },
];

export const VS_RITUS = [
  { name:'Vasant',  hi:'वसंत',  en:'Spring',
    months:'Chaitra–Vaishakha',   icon:'🌸' },
  { name:'Grishma', hi:'ग्रीष्म',en:'Summer',
    months:'Jyeshtha–Ashadha',    icon:'☀️' },
  { name:'Varsha',  hi:'वर्षा',  en:'Monsoon',
    months:'Shravana–Bhadrapada', icon:'🌧️' },
  { name:'Sharad',  hi:'शरद',   en:'Autumn',
    months:'Ashvina–Kartika',     icon:'🍂' },
  { name:'Hemant',  hi:'हेमंत',  en:'Pre-Winter',
    months:'Margashirsha–Pausha', icon:'🌿' },
  { name:'Shishir', hi:'शिशिर', en:'Winter',
    months:'Magha–Phalguna',      icon:'❄️' },
];

export const VS_FESTIVALS = {
  'Chaitra':      ['Gudi Padwa 🚩','Ugadi',
                   'Ram Navami','Navratri'],
  'Vaishakha':    ['Akshaya Tritiya',
                   'Baisakhi','Buddha Purnima'],
  'Jyeshtha':     ['Ganga Dussehra',
                   'Nirjala Ekadashi'],
  'Ashadha':      ['Guru Purnima','Rath Yatra'],
  'Shravana':     ['Raksha Bandhan 🪢',
                   'Janmashtami 🙏'],
  'Bhadrapada':   ['Ganesh Chaturthi 🐘','Onam'],
  'Ashvina':      ['Navratri 🎊','Dussehra',
                   'Karwa Chauth'],
  'Kartika':      ['Diwali 🪔','Dhanteras',
                   'Bhai Dooj'],
  'Margashirsha': ['Gita Jayanti'],
  'Pausha':       ['Makar Sankranti 🪁',
                   'Lohri 🔥','Pongal'],
  'Magha':        ['Basant Panchami 🌼',
                   'Maha Shivaratri 🔱'],
  'Phalguna':     ['Holika Dahan 🔥',
                   'Holi 🎨'],
};

const DD = ['०','१','२','३','४','५','६','७','८','९'];
const toDev = n => String(n).split('')
  .map(d=>DD[parseInt(d)]??d).join('');

const EN_M = ['January','February','March',
  'April','May','June','July','August',
  'September','October','November','December'];
const HI_M = ['जनवरी','फ़रवरी','मार्च','अप्रैल',
  'मई','जून','जुलाई','अगस्त','सितंबर',
  'अक्टूबर','नवंबर','दिसंबर'];

const TITHI_EN = ['Pratipada','Dwitiya',
  'Tritiya','Chaturthi','Panchami','Shashthi',
  'Saptami','Ashtami','Navami','Dashami',
  'Ekadashi','Dwadashi','Trayodashi',
  'Chaturdashi','Purnima'];
const TITHI_HI = ['प्रतिपदा','द्वितीया',
  'तृतीया','चतुर्थी','पञ्चमी','षष्ठी',
  'सप्तमी','अष्टमी','नवमी','दशमी',
  'एकादशी','द्वादशी','त्रयोदशी',
  'चतुर्दशी','पूर्णिमा'];

export function getVikramSamvatFull() {
  const today = new Date();
  today.setHours(0,0,0,0);

  const ny2082 = new Date('2025-03-30');
  const ny2083 = new Date('2026-03-19');

  let vsYear, months;
  if (today >= ny2083) {
    vsYear=2083; months=VS_2083_MONTHS;
  } else if (today >= ny2082) {
    vsYear=2082; months=VS_2082_MONTHS;
  } else {
    vsYear=2081; months=VS_2082_MONTHS;
  }

  let curMonth = months[months.length-1];
  for (const m of months) {
    const s=new Date(m.start);
    const e=new Date(m.end);
    e.setHours(23,59,59);
    if (today>=s && today<=e) {
      curMonth=m; break;
    }
  }

  const knownAmavasya = new Date('2026-03-29');
  const diffDays = (today-knownAmavasya)
    /(1000*60*60*24);
  const LC = 29.53059;
  const cp = ((diffDays%LC)+LC)%LC;

  let paksha,pakshaHi,tithiEn,tithiHi,tNum;
  if (cp<0.5||cp>=29.0) {
    paksha='Amavasya'; pakshaHi='अमावस्या';
    tithiEn=''; tithiHi=''; tNum=30;
  } else if (cp>=14.5&&cp<15.5) {
    paksha='Shukla'; pakshaHi='शुक्ल';
    tithiEn='Purnima'; tithiHi='पूर्णिमा';
    tNum=15;
  } else if (cp<15) {
    paksha='Shukla'; pakshaHi='शुक्ल';
    tNum=Math.min(Math.floor(cp)+1,14);
    tithiEn=TITHI_EN[tNum-1];
    tithiHi=TITHI_HI[tNum-1];
  } else {
    paksha='Krishna'; pakshaHi='कृष्ण';
    tNum=Math.min(Math.floor(cp-15)+1,14);
    tithiEn=TITHI_EN[tNum-1];
    tithiHi=TITHI_HI[tNum-1];
  }

  const tNumStr = tNum<=14 ? String(tNum) : '';
  const tNumDev = tNum<=14 ? toDev(tNum) : '';
  const adhikEn = curMonth.adhik?'Adhik ':'';
  const adhikHi = curMonth.adhik?'अधिक ':'';

  const d=today.getDate();
  const mon=today.getMonth();
  const yr=today.getFullYear();
  const daysToNY=Math.ceil(
    (ny2083-today)/(1000*60*60*24));
  const ritu=VS_RITUS.find(
    r=>r.name===curMonth.ritu)||VS_RITUS[5];
  const festivals=VS_FESTIVALS[
    curMonth.name]||[];

  return {
    line1:`${adhikHi}${curMonth.sk} `+
      `${pakshaHi}${tNumDev?' '+tNumDev:''}, `+
      `विक्रम संवत् ${toDev(vsYear)}`,
    line2:`${adhikEn}${curMonth.name} `+
      `${paksha}${tNumStr?' '+tNumStr:''}, `+
      `VS ${vsYear}`,
    line3:`${d} ${EN_M[mon]} ${yr}`+
      `  |  ${toDev(d)} ${HI_M[mon]} `+
      `${toDev(yr)}`,
    ritu, festivals, vsYear,
    daysToNavVarsh: daysToNY,
    isNavVarsh: curMonth.navVarsh||false,
    isAdhikMaas: curMonth.adhik||false,
  };
}
