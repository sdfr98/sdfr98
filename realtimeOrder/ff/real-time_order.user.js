// ==UserScript==
// @name           Real-time Order
// @version        v1.0.3
// @author         SDF_R98
// @namespace      SDF_R98
// @include        http://www.erepublik.com/en
// ==/UserScript==
var version = '1.0.3';
var countryname = {
	1: "Romania",
	9: "Brazil",
	10: "Italy",
	11: "France",
	12: "Germany",
	13: "Hungary",
	14: "China",
	15: "Spain",
	23: "Canada",
	24: "USA",
	26: "Mexico",
	27: "Argentina",
	28: "Venezuela",
	29: "United Kingdom",
	30: "Switzerland",
	31: "Netherlands",
	32: "Belgium",
	33: "Austria",
	34: "Czech Republic",
	35: "Poland",
	36: "Slovakia",
	37: "Norway",
	38: "Sweden",
	39: "Finland",
	40: "Ukraine",
	41: "Russia",
	42: "Bulgaria",
	43: "Turkey",
	44: "Greece",
	45: "Japan",
	47: "South Korea",
	48: "India",
	49: "Indonesia",
	50: "Australia",
	51: "South Africa",
	52: "Republic of Moldova",
	53: "Portugal",
	54: "Ireland",
	55: "Denmark",
	56: "Iran",
	57: "Pakistan",
	58: "Israel",
	59: "Thailand",
	61: "Slovenia",
	63: "Croatia",
	64: "Chile",
	65: "Serbia",
	66: "Malaysia",
	67: "Philippines",
	68: "Singapore",
	69: "Bosnia and Herzegovina",
	70: "Estonia",
	71: "Latvia",
	72: "Lithuania",
	73: "North Korea",
	74: "Uruguay",
	75: "Paraguay",
	76: "Bolivia",
	77: "Peru",
	78: "Colombia",
	79: "Republic of Macedonia (FYROM)",
	80: "Montenegro",
	81: "Republic of China (Taiwan)",
	82: "Cyprus",
	83: "Belarus",
	84: "New Zealand",
	164: "Saudi Arabia",
	165: "Egypt",
	166: "United Arab Emirates",
	167: "Albania"
};
var regionname = {
	3: "Dobrogea",
	5: "Muntenia",
	9: "Oltenia",
	11: "Banat",
	35: "Transilvania",
	36: "Crisana",
	37: "Moldova",
	38: "Maramures",
	39: "Bucovina",
	40: "Alabama",
	41: "Alaska",
	42: "Arizona",
	43: "Arkansas",
	44: "California",
	45: "Colorado",
	46: "Connecticut",
	47: "Delaware",
	48: "Florida",
	49: "Georgia",
	50: "Hawaii",
	51: "Idaho",
	52: "Illinois",
	53: "Indiana",
	54: "Iowa",
	55: "Kansas",
	56: "Kentucky",
	57: "Louisiana",
	58: "Maine",
	59: "Maryland",
	60: "Massachusetts",
	61: "Michigan",
	62: "Minnesota",
	63: "Mississippi",
	64: "Missouri",
	65: "Montana",
	66: "Nebraska",
	67: "Nevada",
	68: "New Hampshire",
	69: "New Jersey",
	70: "New Mexico",
	71: "New York",
	72: "North Carolina",
	73: "North Dakota",
	74: "Ohio",
	75: "Oklahoma",
	76: "Oregon",
	77: "Pennsylvania",
	78: "Rhode Island",
	79: "South Carolina",
	80: "South Dakota",
	81: "Tennessee",
	82: "Texas",
	83: "Utah",
	84: "Vermont",
	85: "Virginia",
	86: "Washington",
	87: "West Virginia",
	88: "Wisconsin",
	89: "Wyoming",
	90: "District of Columbia",
	91: "Northern Basarabia",
	92: "Chisinau",
	93: "Southern Basarabia",
	94: "Transnistria",
	95: "Ontario",
	96: "Prince Edward Island",
	97: "Alberta",
	98: "New Brunswick",
	99: "Nova Scotia",
	100: "Quebec",
	101: "Saskatchewan",
	102: "Newfoundland and Labrador",
	103: "British Columbia",
	104: "Yukon",
	105: "Manitoba",
	106: "Northwest Territories",
	107: "Nunavut",
	108: "Western Transdanubia",
	109: "Southern Transdanubia",
	110: "Central Transdanubia",
	111: "Central Hungary",
	112: "Northern Hungary",
	113: "Northern Great Plain",
	114: "Southern Great Plain",
	115: "Valley of Mexico",
	116: "Baja",
	117: "Northwest of Mexico",
	118: "Pacific Coast of Mexico",
	119: "Oaxaca",
	120: "Gulf of Mexico",
	121: "Southeast of Mexico",
	122: "Northeast of Mexico",
	123: "Venezuelan Andean",
	124: "Venezuelan Capital",
	125: "Central Venezuela",
	126: "Central Western Venezuela",
	127: "Guayana",
	129: "Llanos",
	130: "North Eastern Venezuela",
	131: "Zulian",
	132: "Subcarpathia",
	133: "Galicia and Lodomeria",
	134: "Volhynia",
	135: "Polisia",
	136: "Podolia",
	137: "Bukovina",
	138: "Dnipro",
	139: "Siveria",
	140: "Bassarabia",
	141: "Zaporozhia",
	142: "Sloboda",
	143: "Donbas",
	144: "Taurida",
	146: "Center West of Brazil",
	147: "North of Brazil",
	148: "Northeast of Brazil",
	149: "Southeast of Brazil",
	150: "Parana and Santa Catarina",
	151: "Pampas",
	152: "Argentine Northwest",
	153: "South East Chaco",
	154: "Mesopotamia",
	155: "Cuyo",
	156: "Patagonia",
	157: "Lisboa",
	158: "Norte",
	159: "Centro",
	160: "Alentejo",
	161: "Algarve",
	162: "Azores",
	163: "Madeira",
	166: "Madrid",
	167: "Andalucia",
	168: "Aragon",
	169: "Asturias",
	170: "Basque Country",
	171: "Cantabria",
	173: "Castilla y Leon",
	174: "Catalonia",
	175: "Extremadura",
	176: "Galicia",
	177: "Murcia",
	178: "Navarra",
	179: "La Rioja",
	180: "Valencian Community",
	181: "Castilla La Mancha",
	183: "Canary Islands",
	184: "Balearic Islands",
	185: "Alsace",
	186: "Aquitaine",
	187: "Auvergne",
	188: "Brittany",
	189: "Burgundy",
	190: "Loire Valley",
	191: "Champagne Ardenne",
	192: "Corsica",
	193: "Franche-comte",
	194: "Languedoc Roussillon",
	195: "Limousin",
	196: "Lorraine",
	197: "Lower Normandy",
	198: "Midi-Pyrenees",
	199: "Paris Isle of France",
	200: "Pays de la Loire",
	201: "Picardy",
	202: "Poitou Charentes",
	203: "Provence Alpes Azur",
	204: "Rhone Alps",
	205: "Upper Normandy",
	207: "North Calais",
	208: "Dublin",
	209: "Cork",
	210: "Shannon",
	212: "Mayo",
	213: "Wexford",
	215: "Louth",
	216: "London",
	217: "Scotland",
	218: "Wales",
	219: "Northern Ireland",
	220: "South East of England",
	221: "South West of England",
	222: "East Midlands",
	223: "West Midlands",
	224: "East of England",
	225: "Yorkshire & Humberside",
	226: "North East of England",
	227: "North West of England",
	228: "Brussels",
	229: "Flanders",
	230: "Wallonia",
	231: "Hovedstaden",
	232: "Midtjylland",
	233: "Nordjylland",
	235: "Sjaelland",
	236: "Syddanmark",
	237: "Southern Finland",
	238: "Western Finland",
	239: "Eastern Finland",
	240: "Oulu",
	241: "Lapland",
	242: "Aland",
	243: "Baden-Wurttemberg",
	244: "Bavaria",
	246: "Brandenburg and Berlin",
	249: "Hesse",
	250: "Mecklenburg-Western Pomerania",
	251: "Lower Saxony and Bremen",
	252: "North Rhine-Westphalia",
	253: "Rhineland-Palatinate",
	254: "Saarland",
	255: "Saxony",
	256: "Saxony-Anhalt",
	257: "Schleswig-Holstein and Hamburg",
	258: "Thuringia",
	259: "Abruzzo",
	260: "Aosta Valley",
	261: "Apulia",
	262: "Basilicata",
	263: "Calabria",
	264: "Campania",
	265: "Emilia-Romagna",
	266: "Friuli-Venezia Giulia",
	267: "Lazio",
	268: "Liguria",
	269: "Lombardy",
	270: "Marche",
	271: "Molise",
	272: "Piedmont",
	273: "Sardinia",
	274: "Sicily",
	275: "Trentino-South Tyrol",
	276: "Tuscany",
	277: "Umbria",
	278: "Veneto",
	291: "Nord-Norge",
	292: "Sorlandet",
	293: "Trondelag",
	294: "Vestlandet",
	295: "Ostlandet",
	306: "Pomerania",
	307: "Silesia",
	312: "Bratislava",
	315: "Western Slovakia",
	316: "Central Slovakia",
	319: "Eastern Slovakia",
	320: "Svealand",
	321: "Norrland and Sameland",
	322: "Jamtland Harjedalen",
	323: "Bohus",
	324: "Scania",
	325: "Gotaland",
	326: "Smaland",
	328: "New South Wales",
	329: "Queensland",
	330: "South Australia",
	331: "Tasmania",
	332: "Victoria",
	333: "Western Australia",
	334: "Northern Territory",
	336: "Deutschschweiz",
	337: "Romandie",
	338: "Svizzera italiana",
	339: "Graubunden",
	340: "Burgenland",
	341: "Carinthia",
	342: "Lower Austria",
	343: "Upper Austria",
	344: "Salzburg",
	345: "Styria",
	346: "Tyrol",
	347: "Vorarlberg",
	349: "Burgas",
	352: "Vidin",
	353: "Plovdiv",
	355: "Sofia",
	356: "Varna",
	358: "Ruse",
	361: "Anhui",
	362: "Fujian",
	363: "Gansu",
	364: "Guangdong",
	368: "Heilongjiang",
	370: "Hubei",
	371: "Hunan",
	372: "Jiangsu",
	373: "Jiangxi",
	375: "Liaoning",
	377: "Shaanxi",
	378: "Shandong",
	379: "Shanxi",
	380: "Sichuan",
	381: "Yunnan",
	382: "Zhejiang",
	384: "Guizhou",
	385: "Hainan",
	386: "Henan",
	387: "Jilin",
	389: "Qinghai",
	390: "Guangxi",
	391: "Inner Mongolia",
	392: "Ningxia",
	393: "Xinjiang",
	394: "Tibet",
	395: "Beijing",
	396: "Chongqing",
	397: "Shanghai",
	413: "Thrace",
	414: "Macedonia",
	415: "Thessaly",
	416: "Epirus",
	417: "Central Greece",
	418: "Attica",
	419: "Peloponnese",
	420: "Aegean Islands",
	421: "Ionian Islands",
	422: "Crete",
	423: "Mazuria",
	424: "Mazovia",
	425: "Little Poland",
	426: "Great Poland",
	437: "Southern Bohemia",
	440: "Moravia",
	442: "Northern Bohemia",
	443: "Northern India",
	445: "Uttar Pradesh",
	446: "Rajasthan",
	447: "Madhya Pradesh",
	448: "Gujarat",
	449: "Maharashtra",
	450: "Andhra Pradesh",
	451: "Karnataka",
	452: "Tamil Nadu",
	453: "Kerala",
	454: "Orissa",
	455: "Chhattisgarh",
	456: "Jharkhand",
	457: "West Bengal",
	458: "Bihar",
	459: "North Eastern India",
	460: "Sumatra",
	461: "Java",
	462: "Kalimantan",
	463: "Lesser Sunda Islands",
	464: "Sulawesi",
	465: "Maluku islands",
	466: "Papua",
	467: "Jerusalem district",
	468: "Nazareth North District",
	469: "Haifa district",
	470: "Tel Aviv Center District",
	471: "Beersheba South District",
	472: "Kerman Province",
	473: "Sistan and Baluchistan",
	474: "South Khorasan",
	475: "Razavi Khorasan",
	476: "Yazd",
	477: "Semnan",
	478: "Esfahan",
	479: "Fars",
	480: "Hormozgan",
	481: "Southwestern Iran",
	482: "Northwestern Iran",
	483: "Mazandaran and Golistan",
	484: "Hokkaido",
	485: "Tohoku",
	486: "Kanto",
	487: "Chubu",
	488: "Kinki",
	489: "Chugoku",
	490: "Shikoku",
	491: "Kyushu",
	492: "Balochistan",
	493: "North-West Frontier Province",
	494: "Punjab",
	495: "Sindh",
	497: "Eastern Cape",
	498: "Free State",
	499: "Gauteng",
	500: "KwaZulu Natal",
	501: "Limpopo",
	502: "Mpumalanga",
	503: "North West Province",
	504: "Northern Cape",
	505: "Western Cape",
	507: "Central Thailand",
	508: "Northern Thailand",
	509: "Eastern Thailand",
	510: "Southern Thailand",
	511: "North-Eastern Thailand",
	512: "Aegean Coast of Turkey",
	513: "Black Sea Coast of Turkey",
	514: "Central Anatolia",
	515: "Eastern Anatolia",
	516: "Marmara",
	517: "Mediterranean Coast of Turkey",
	518: "Southeastern Anatolia",
	519: "Gyeonggi-do",
	520: "Gangwon-do",
	521: "Chungcheongbuk-do",
	522: "Chungcheongnam-do",
	523: "Jeollabuk-do",
	524: "Jeollanam-do",
	525: "Gyeongsangbuk-do",
	526: "Gyeongsangnam-do",
	527: "Jeju",
	528: "Western Netherlands",
	529: "Southern Netherlands",
	530: "Eastern Netherlands",
	531: "Northern Netherlands",
	532: "Moscow and Central Russia",
	533: "Central Black Earth",
	534: "Eastern Siberia",
	535: "Far Eastern Russia",
	536: "Northern Russia",
	537: "North Caucasus",
	538: "Leningrad Oblast",
	540: "Urals",
	541: "Volga Vyatka",
	542: "Western Siberia",
	543: "Kaliningrad",
	544: "Volga",
	549: "Gotland",
	561: "Jammu and Kashmir",
	562: "Svalbard & Jan Mayen",
	571: "Slovenian Littoral",
	581: "Inner Carniola",
	591: "Upper Carniola",
	601: "Styria and Carinthia",
	611: "Lower Carniola",
	621: "Prekmurje",
	622: "Slavonia",
	623: "Central Croatia",
	624: "Northwest Croatia",
	625: "Lika and Gorski Kotar",
	626: "Istria and Kvarner",
	627: "North Dalmatia",
	628: "South Dalmatia",
	629: "Norte Grande",
	630: "Norte Chico",
	631: "Zona Central",
	632: "Zona Sur",
	633: "Zona Austral",
	634: "Vojvodina",
	635: "Belgrade",
	636: "Sumadija",
	637: "Eastern Serbia",
	638: "Western Serbia",
	639: "Raska",
	640: "Southern Serbia",
	641: "Sabah",
	642: "Sarawak",
	643: "Peninsular Malaysia",
	644: "Luzon",
	645: "Visayas",
	646: "Mindanao",
	647: "Palawan",
	648: "Singapore City",
	649: "West Srpska Republic",
	650: "East Srpska Republic",
	651: "Brčko District",
	652: "Federation of BiH",
	653: "Rio Grande do Sul",
	654: "Pohja-Eesti",
	655: "Kirde-Eesti",
	656: "Kesk-Eesti",
	657: "Laane-Eesti",
	658: "Louna-Eesti",
	659: "Vidzeme",
	660: "Latgale",
	661: "Zemgale",
	662: "Kurzeme",
	663: "Lithuania Minor",
	664: "Samogitia",
	665: "Lithuanian Highland",
	666: "Dainava",
	667: "Sudovia",
	668: "Chagang",
	669: "Pyongan",
	670: "Hwangae",
	671: "Kangwon",
	672: "Hamgyong",
	673: "Ryanggang",
	674: "Charrua",
	675: "Paranena",
	676: "Central East Chaco",
	677: "Chuquisaca and Tarija",
	678: "Beni and Cochabamba",
	679: "Santa Cruz",
	680: "Bolivian Altiplano",
	681: "Pando",
	682: "Great Andes",
	683: "Mid Andes",
	684: "Low Andes",
	685: "Chimor",
	686: "Northern Low Amazon",
	687: "Southern Low Amazon",
	688: "Lima",
	689: "Amazonica",
	690: "Andina",
	691: "Caribe e Insular",
	692: "Orinoquia",
	693: "Pacifica",
	694: "Cundiboyacense",
	695: "Povardarie",
	696: "Western Macedonia",
	697: "Eastern Macedonia",
	698: "North Montenegrin Mountains",
	699: "Central Montenegro",
	700: "Montenegrin Coast",
	701: "Northern Taiwan",
	702: "Central Taiwan",
	703: "Eastern Taiwan",
	704: "Southern Taiwan",
	705: "Southern Cyprus",
	706: "Northern Cyprus",
	707: "Brestskaya",
	708: "Homelskaya",
	709: "Hrodzienskaya",
	710: "Minskaya",
	711: "Mahilyowskaya",
	712: "Vitsebskaya",
	713: "Auckland",
	714: "Wellington",
	715: "Canterbury",
	716: "Otago",
	717: "Al Riyadh",
	718: "Al Bahah",
	719: "Northern Borders",
	720: "Al Jawf",
	721: "Al Madinah",
	722: "Al Qasim",
	723: "Ha'il",
	724: "Asir",
	725: "Eastern Province",
	726: "Tabuk",
	727: "Najran",
	728: "Makkah",
	729: "Jizan",
	730: "Sinai",
	731: "Lower Egypt",
	732: "Western Desert",
	733: "Middle Egypt",
	734: "Upper Egypt",
	735: "Red Sea Coast",
	736: "Abu Dhabi",
	737: "Dubai",
	738: "Sharjah",
	739: "Ajman",
	740: "Ras al-Khaimah",
	741: "Umm al Quwain",
	742: "Fujairah",
	743: "Kosovo",
	744: "Tirana",
	745: "Albanian Coast",
	746: "Southeastern Albania"
};
var countryid = {
	Romania: 1,
	Brazil: 9,
	Italy: 10,
	France: 11,
	Germany: 12,
	Hungary: 13,
	China: 14,
	Spain: 15,
	Canada: 23,
	USA: 24,
	Mexico: 26,
	Argentina: 27,
	Venezuela: 28,
	"United Kingdom": 29,
	Switzerland: 30,
	Netherlands: 31,
	Belgium: 32,
	Austria: 33,
	"Czech Republic": 34,
	Poland: 35,
	Slovakia: 36,
	Norway: 37,
	Sweden: 38,
	Finland: 39,
	Ukraine: 40,
	Russia: 41,
	Bulgaria: 42,
	Turkey: 43,
	Greece: 44,
	Japan: 45,
	"South Korea": 47,
	India: 48,
	Indonesia: 49,
	Australia: 50,
	"South Africa": 51,
	"Republic of Moldova": 52,
	Portugal: 53,
	Ireland: 54,
	Denmark: 55,
	Iran: 56,
	Pakistan: 57,
	Israel: 58,
	Thailand: 59,
	Slovenia: 61,
	Croatia: 63,
	Chile: 64,
	Serbia: 65,
	Malaysia: 66,
	Philippines: 67,
	Singapore: 68,
	"Bosnia and Herzegovina": 69,
	Estonia: 70,
	Latvia: 71,
	Lithuania: 72,
	"North Korea": 73,
	Uruguay: 74,
	Paraguay: 75,
	Bolivia: 76,
	Peru: 77,
	Colombia: 78,
	"Republic of Macedonia (FYROM)": 79,
	Montenegro: 80,
	"Republic of China (Taiwan)": 81,
	Cyprus: 82,
	Belarus: 83,
	"New Zealand": 84,
	"Saudi Arabia": 164,
	Egypt: 165,
	"United Arab Emirates": 166,
	Albania: 167
};
var regionid = {
	Dobrogea: 3,
	Muntenia: 5,
	Oltenia: 9,
	Banat: 11,
	Transilvania: 35,
	Crisana: 36,
	Moldova: 37,
	Maramures: 38,
	Bucovina: 39,
	Alabama: 40,
	Alaska: 41,
	Arizona: 42,
	Arkansas: 43,
	California: 44,
	Colorado: 45,
	Connecticut: 46,
	Delaware: 47,
	Florida: 48,
	Georgia: 49,
	Hawaii: 50,
	Idaho: 51,
	Illinois: 52,
	Indiana: 53,
	Iowa: 54,
	Kansas: 55,
	Kentucky: 56,
	Louisiana: 57,
	Maine: 58,
	Maryland: 59,
	Massachusetts: 60,
	Michigan: 61,
	Minnesota: 62,
	Mississippi: 63,
	Missouri: 64,
	Montana: 65,
	Nebraska: 66,
	Nevada: 67,
	"New Hampshire": 68,
	"New Jersey": 69,
	"New Mexico": 70,
	"New York": 71,
	"North Carolina": 72,
	"North Dakota": 73,
	Ohio: 74,
	Oklahoma: 75,
	Oregon: 76,
	Pennsylvania: 77,
	"Rhode Island": 78,
	"South Carolina": 79,
	"South Dakota": 80,
	Tennessee: 81,
	Texas: 82,
	Utah: 83,
	Vermont: 84,
	Virginia: 85,
	Washington: 86,
	"West Virginia": 87,
	Wisconsin: 88,
	Wyoming: 89,
	"District of Columbi...": 90,
	"Northern Basarabia": 91,
	Chisinau: 92,
	"Southern Basarabia": 93,
	Transnistria: 94,
	Ontario: 95,
	"Prince Edward Islan...": 96,
	Alberta: 97,
	"New Brunswick": 98,
	"Nova Scotia": 99,
	Quebec: 100,
	Saskatchewan: 101,
	"Newfoundland and La...": 102,
	"British Columbia": 103,
	Yukon: 104,
	Manitoba: 105,
	"Northwest Territori...": 106,
	Nunavut: 107,
	"Western Transdanubi...": 108,
	"Southern Transdanub...": 109,
	"Central Transdanubi...": 110,
	"Central Hungary": 111,
	"Northern Hungary": 112,
	"Northern Great Plai...": 113,
	"Southern Great Plai...": 114,
	"Valley of Mexico": 115,
	Baja: 116,
	"Northwest of Mexico": 117,
	"Pacific Coast of Me...": 118,
	Oaxaca: 119,
	"Gulf of Mexico": 120,
	"Southeast of Mexico": 121,
	"Northeast of Mexico": 122,
	"Venezuelan Andean": 123,
	"Venezuelan Capital": 124,
	"Central Venezuela": 125,
	"Central Western Ven...": 126,
	Guayana: 127,
	Llanos: 129,
	"North Eastern Venez...": 130,
	Zulian: 131,
	Subcarpathia: 132,
	"Galicia and Lodomer...": 133,
	Volhynia: 134,
	Polisia: 135,
	Podolia: 136,
	Bukovina: 137,
	Dnipro: 138,
	Siveria: 139,
	Bassarabia: 140,
	Zaporozhia: 141,
	Sloboda: 142,
	Donbas: 143,
	Taurida: 144,
	"Center West of Braz...": 146,
	"North of Brazil": 147,
	"Northeast of Brazil": 148,
	"Southeast of Brazil": 149,
	"Parana and Santa Ca...": 150,
	Pampas: 151,
	"Argentine Northwest": 152,
	"South East Chaco": 153,
	Mesopotamia: 154,
	Cuyo: 155,
	Patagonia: 156,
	Lisboa: 157,
	Norte: 158,
	Centro: 159,
	Alentejo: 160,
	Algarve: 161,
	Azores: 162,
	Madeira: 163,
	Madrid: 166,
	Andalucia: 167,
	Aragon: 168,
	Asturias: 169,
	"Basque Country": 170,
	Cantabria: 171,
	"Castilla y Leon": 173,
	Catalonia: 174,
	Extremadura: 175,
	Galicia: 176,
	Murcia: 177,
	Navarra: 178,
	"La Rioja": 179,
	"Valencian Community": 180,
	"Castilla La Mancha": 181,
	"Canary Islands": 183,
	"Balearic Islands": 184,
	Alsace: 185,
	Aquitaine: 186,
	Auvergne: 187,
	Brittany: 188,
	Burgundy: 189,
	"Loire Valley": 190,
	"Champagne Ardenne": 191,
	Corsica: 192,
	"Franche-comte": 193,
	"Languedoc Roussillo...": 194,
	Limousin: 195,
	Lorraine: 196,
	"Lower Normandy": 197,
	"Midi-Pyrenees": 198,
	"Paris Isle of Franc...": 199,
	"Pays de la Loire": 200,
	Picardy: 201,
	"Poitou Charentes": 202,
	"Provence Alpes Azur": 203,
	"Rhone Alps": 204,
	"Upper Normandy": 205,
	"North Calais": 207,
	Dublin: 208,
	Cork: 209,
	Shannon: 210,
	Mayo: 212,
	Wexford: 213,
	Louth: 215,
	London: 216,
	Scotland: 217,
	Wales: 218,
	"Northern Ireland": 219,
	"South East of Engla...": 220,
	"South West of Engla...": 221,
	"East Midlands": 222,
	"West Midlands": 223,
	"East of England": 224,
	"Yorkshire & Humbers...": 225,
	"North East of Engla...": 226,
	"North West of Engla...": 227,
	Brussels: 228,
	Flanders: 229,
	Wallonia: 230,
	Hovedstaden: 231,
	Midtjylland: 232,
	Nordjylland: 233,
	Sjaelland: 235,
	Syddanmark: 236,
	"Southern Finland": 237,
	"Western Finland": 238,
	"Eastern Finland": 239,
	Oulu: 240,
	Lapland: 241,
	Aland: 242,
	"Baden-Wurttemberg": 243,
	Bavaria: 244,
	"Brandenburg and Ber...": 246,
	Hesse: 249,
	"Mecklenburg-Western...": 250,
	"Lower Saxony and Br...": 251,
	"North Rhine-Westpha...": 252,
	"Rhineland-Palatinat...": 253,
	Saarland: 254,
	Saxony: 255,
	"Saxony-Anhalt": 256,
	"Schleswig-Holstein ...": 257,
	Thuringia: 258,
	Abruzzo: 259,
	"Aosta Valley": 260,
	Apulia: 261,
	Basilicata: 262,
	Calabria: 263,
	Campania: 264,
	"Emilia-Romagna": 265,
	"Friuli-Venezia Giul...": 266,
	Lazio: 267,
	Liguria: 268,
	Lombardy: 269,
	Marche: 270,
	Molise: 271,
	Piedmont: 272,
	Sardinia: 273,
	Sicily: 274,
	"Trentino-South Tyro...": 275,
	Tuscany: 276,
	Umbria: 277,
	Veneto: 278,
	"Nord-Norge": 291,
	Sorlandet: 292,
	Trondelag: 293,
	Vestlandet: 294,
	Ostlandet: 295,
	Pomerania: 306,
	Silesia: 307,
	Bratislava: 312,
	"Western Slovakia": 315,
	"Central Slovakia": 316,
	"Eastern Slovakia": 319,
	Svealand: 320,
	"Norrland and Samela...": 321,
	"Jamtland Harjedalen": 322,
	Bohus: 323,
	Scania: 324,
	Gotaland: 325,
	Smaland: 326,
	"New South Wales": 328,
	Queensland: 329,
	"South Australia": 330,
	Tasmania: 331,
	Victoria: 332,
	"Western Australia": 333,
	"Northern Territory": 334,
	Deutschschweiz: 336,
	Romandie: 337,
	"Svizzera italiana": 338,
	Graubunden: 339,
	Burgenland: 340,
	Carinthia: 341,
	"Lower Austria": 342,
	"Upper Austria": 343,
	Salzburg: 344,
	Styria: 345,
	Tyrol: 346,
	Vorarlberg: 347,
	Burgas: 349,
	Vidin: 352,
	Plovdiv: 353,
	Sofia: 355,
	Varna: 356,
	Ruse: 358,
	Anhui: 361,
	Fujian: 362,
	Gansu: 363,
	Guangdong: 364,
	Heilongjiang: 368,
	Hubei: 370,
	Hunan: 371,
	Jiangsu: 372,
	Jiangxi: 373,
	Liaoning: 375,
	Shaanxi: 377,
	Shandong: 378,
	Shanxi: 379,
	Sichuan: 380,
	Yunnan: 381,
	Zhejiang: 382,
	Guizhou: 384,
	Hainan: 385,
	Henan: 386,
	Jilin: 387,
	Qinghai: 389,
	Guangxi: 390,
	"Inner Mongolia": 391,
	Ningxia: 392,
	Xinjiang: 393,
	Tibet: 394,
	Beijing: 395,
	Chongqing: 396,
	Shanghai: 397,
	Thrace: 413,
	Macedonia: 414,
	Thessaly: 415,
	Epirus: 416,
	"Central Greece": 417,
	Attica: 418,
	Peloponnese: 419,
	"Aegean Islands": 420,
	"Ionian Islands": 421,
	Crete: 422,
	Mazuria: 423,
	Mazovia: 424,
	"Little Poland": 425,
	"Great Poland": 426,
	"Southern Bohemia": 437,
	Moravia: 440,
	"Northern Bohemia": 442,
	"Northern India": 443,
	"Uttar Pradesh": 445,
	Rajasthan: 446,
	"Madhya Pradesh": 447,
	Gujarat: 448,
	Maharashtra: 449,
	"Andhra Pradesh": 450,
	Karnataka: 451,
	"Tamil Nadu": 452,
	Kerala: 453,
	Orissa: 454,
	Chhattisgarh: 455,
	Jharkhand: 456,
	"West Bengal": 457,
	Bihar: 458,
	"North Eastern India": 459,
	Sumatra: 460,
	Java: 461,
	Kalimantan: 462,
	"Lesser Sunda Island...": 463,
	Sulawesi: 464,
	"Maluku islands": 465,
	Papua: 466,
	"Jerusalem district": 467,
	"Nazareth North Dist...": 468,
	"Haifa district": 469,
	"Tel Aviv Center Dis...": 470,
	"Beersheba South Dis...": 471,
	"Kerman Province": 472,
	"Sistan and Baluchis...": 473,
	"South Khorasan": 474,
	"Razavi Khorasan": 475,
	Yazd: 476,
	Semnan: 477,
	Esfahan: 478,
	Fars: 479,
	Hormozgan: 480,
	"Southwestern Iran": 481,
	"Northwestern Iran": 482,
	"Mazandaran and Goli...": 483,
	Hokkaido: 484,
	Tohoku: 485,
	Kanto: 486,
	Chubu: 487,
	Kinki: 488,
	Chugoku: 489,
	Shikoku: 490,
	Kyushu: 491,
	Balochistan: 492,
	"North-West Frontier...": 493,
	Punjab: 494,
	Sindh: 495,
	"Eastern Cape": 497,
	"Free State": 498,
	Gauteng: 499,
	"KwaZulu Natal": 500,
	Limpopo: 501,
	Mpumalanga: 502,
	"North West Province": 503,
	"Northern Cape": 504,
	"Western Cape": 505,
	"Central Thailand": 507,
	"Northern Thailand": 508,
	"Eastern Thailand": 509,
	"Southern Thailand": 510,
	"North-Eastern Thail...": 511,
	"Aegean Coast of Tur...": 512,
	"Black Sea Coast of ...": 513,
	"Central Anatolia": 514,
	"Eastern Anatolia": 515,
	Marmara: 516,
	"Mediterranean Coast...": 517,
	"Southeastern Anatol...": 518,
	"Gyeonggi-do": 519,
	"Gangwon-do": 520,
	"Chungcheongbuk-do": 521,
	"Chungcheongnam-do": 522,
	"Jeollabuk-do": 523,
	"Jeollanam-do": 524,
	"Gyeongsangbuk-do": 525,
	"Gyeongsangnam-do": 526,
	Jeju: 527,
	"Western Netherlands": 528,
	"Southern Netherland...": 529,
	"Eastern Netherlands": 530,
	"Northern Netherland...": 531,
	"Moscow and Central ...": 532,
	"Central Black Earth": 533,
	"Eastern Siberia": 534,
	"Far Eastern Russia": 535,
	"Northern Russia": 536,
	"North Caucasus": 537,
	"Leningrad Oblast": 538,
	Urals: 540,
	"Volga Vyatka": 541,
	"Western Siberia": 542,
	Kaliningrad: 543,
	Volga: 544,
	Gotland: 549,
	"Jammu and Kashmir": 561,
	"Svalbard & Jan Maye...": 562,
	"Slovenian Littoral": 571,
	"Inner Carniola": 581,
	"Upper Carniola": 591,
	"Styria and Carinthi...": 601,
	"Lower Carniola": 611,
	Prekmurje: 621,
	Slavonia: 622,
	"Central Croatia": 623,
	"Northwest Croatia": 624,
	"Lika and Gorski Kot...": 625,
	"Istria and Kvarner": 626,
	"North Dalmatia": 627,
	"South Dalmatia": 628,
	"Norte Grande": 629,
	"Norte Chico": 630,
	"Zona Central": 631,
	"Zona Sur": 632,
	"Zona Austral": 633,
	Vojvodina: 634,
	Belgrade: 635,
	Sumadija: 636,
	"Eastern Serbia": 637,
	"Western Serbia": 638,
	Raska: 639,
	"Southern Serbia": 640,
	Sabah: 641,
	Sarawak: 642,
	"Peninsular Malaysia": 643,
	Luzon: 644,
	Visayas: 645,
	Mindanao: 646,
	Palawan: 647,
	"Singapore City": 648,
	"West Srpska Republi...": 649,
	"East Srpska Republi...": 650,
	"Brčko District": 651,
	"Federation of BiH": 652,
	"Rio Grande do Sul": 653,
	"Pohja-Eesti": 654,
	"Kirde-Eesti": 655,
	"Kesk-Eesti": 656,
	"Laane-Eesti": 657,
	"Louna-Eesti": 658,
	Vidzeme: 659,
	Latgale: 660,
	Zemgale: 661,
	Kurzeme: 662,
	"Lithuania Minor": 663,
	Samogitia: 664,
	"Lithuanian Highland": 665,
	Dainava: 666,
	Sudovia: 667,
	Chagang: 668,
	Pyongan: 669,
	Hwangae: 670,
	Kangwon: 671,
	Hamgyong: 672,
	Ryanggang: 673,
	Charrua: 674,
	Paranena: 675,
	"Central East Chaco": 676,
	"Chuquisaca and Tari...": 677,
	"Beni and Cochabamba": 678,
	"Santa Cruz": 679,
	"Bolivian Altiplano": 680,
	Pando: 681,
	"Great Andes": 682,
	"Mid Andes": 683,
	"Low Andes": 684,
	Chimor: 685,
	"Northern Low Amazon": 686,
	"Southern Low Amazon": 687,
	Lima: 688,
	Amazonica: 689,
	Andina: 690,
	"Caribe e Insular": 691,
	Orinoquia: 692,
	Pacifica: 693,
	Cundiboyacense: 694,
	Povardarie: 695,
	"Western Macedonia": 696,
	"Eastern Macedonia": 697,
	"North Montenegrin M...": 698,
	"Central Montenegro": 699,
	"Montenegrin Coast": 700,
	"Northern Taiwan": 701,
	"Central Taiwan": 702,
	"Eastern Taiwan": 703,
	"Southern Taiwan": 704,
	"Southern Cyprus": 705,
	"Northern Cyprus": 706,
	Brestskaya: 707,
	Homelskaya: 708,
	Hrodzienskaya: 709,
	Minskaya: 710,
	Mahilyowskaya: 711,
	Vitsebskaya: 712,
	Auckland: 713,
	Wellington: 714,
	Canterbury: 715,
	Otago: 716,
	"Al Riyadh": 717,
	"Al Bahah": 718,
	"Northern Borders": 719,
	"Al Jawf": 720,
	"Al Madinah": 721,
	"Al Qasim": 722,
	"Ha'il": 723,
	Asir: 724,
	"Eastern Province": 725,
	Tabuk: 726,
	Najran: 727,
	Makkah: 728,
	Jizan: 729,
	Sinai: 730,
	"Lower Egypt": 731,
	"Western Desert": 732,
	"Middle Egypt": 733,
	"Upper Egypt": 734,
	"Red Sea Coast": 735,
	"Abu Dhabi": 736,
	Dubai: 737,
	Sharjah: 738,
	Ajman: 739,
	"Ras al-Khaimah": 740,
	"Umm al Quwain": 741,
	Fujairah: 742,
	Kosovo: 743,
	Tirana: 744,
	"Albanian Coast": 745,
	"Southeastern Albani...": 746
};

function convertImgName(name) {
	if (name == 'Bosnia and Herzegovina') {
		name = 'Bosnia-Herzegovina';
	} else if (name == 'Republic of China (Taiwan)') {
		name = 'Republic-of-China-Taiwan';
	} else if (name == 'Republic of Macedonia (FYROM)') {
		name = 'Republic-of-Macedonia-FYROM';
	} else {
		name = name.replace(/ /g, '-');
	}
	return name;
}

function getOrder() {
	GM_xmlhttpRequest({
		method:	'GET',
		url: 'http://cosyhh.aliapp.com/api.php',
		onload:	function (response) {
			var v1, v2, rosd, rosd_list, msg, tmp, i, len, suffix, aimg, dimg,
				data = JSON.parse(response.responseText);
			if (data.message == 'success') {
				if (data.rosd == null) {
					$j('#rosd_h4').html('Real-time Order - none');
					return;
				}
				v1 = parseInt(version.replace(/\./g, ''), 10);
				v2 = parseInt(data.version.replace(/\./g, ''), 10);
				if (v1 < v2) {
					$j('#rosd_h4').html('Real-time Order - <a href="http://userscripts.org/scripts/source/117988.user.js">A newer version is available!</a>');
				} else {
					$j('#rosd_h4').html('Real-time Order');
				}
				rosd = data.rosd.sort();
				rosd_list = $j('#rosd_list');
				msg = [];
				for (i = 0, len = rosd.length; i < len; i++) {
					if (rosd[i][3] == null) {
						rosd[i][3] = '';
					}
					switch (rosd[i][2]) {
					case '1':
						tmp = ' ';
						break;
					case '2':
						tmp = '-起义-';
						break;
					case '3':
						tmp = '-镇压-';
						break;
					}
					suffix = '</strong><a href="/en/military/battlefield/' + rosd[i][1] + '" title="' + rosd[i][3] + '"><span>Fight</span></a></li>';
					if (rosd[i][4] == 0) {
						msg.push('<li>');
						tmp += rosd[i][3];
					} else {
						tmp += regionname[rosd[i][6]];
						aimg = convertImgName(countryname[rosd[i][4]]);
						dimg = convertImgName(countryname[rosd[i][5]]);
						switch (rosd[i][2]) {
						case '1':
							msg.push('<li><img class="side_flags" src="/images/flags_png/M/' + aimg + '.png" alt="' + countryname[rosd[i][4]] + '" title="' + countryname[rosd[i][4]] + '" /><small>vs</small><img class="side_flags" src="/images/flags_png/M/' + dimg + '.png" title="' + countryname[rosd[i][5]] + '" alt="' + countryname[rosd[i][5]] + '" />');
							break;
						case '2':
							msg.push('<li><img class="side_flags" src="/images/flags_png/M/' + aimg + '.png" alt="' + countryname[rosd[i][4]] + '" title="' + countryname[rosd[i][4]] + '" /><img class="resistance_sign one" src="/images/modules/_icons/small_resistance.png" title="' + countryname[rosd[i][4]] + '" alt=""><small>vs</small><img class="side_flags" src="/images/flags_png/M/' + dimg + '.png" title="' + countryname[rosd[i][5]] + '" alt="' + countryname[rosd[i][5]] + '" />');
							suffix = '</strong><a href="/en/military/battlefield-choose-side/' + rosd[i][1] + '/' + rosd[i][4] + '" title="' + rosd[i][3] + '"><span>Fight</span></a></li>';
							break;
						case '3':
							msg.push('<li><img class="side_flags" src="/images/flags_png/M/' + aimg + '.png" alt="' + countryname[rosd[i][4]] + '" title="' + countryname[rosd[i][4]] + '" /><img class="resistance_sign one" src="/images/modules/_icons/small_resistance.png" title="' + countryname[rosd[i][4]] + '" alt=""><small>vs</small><img class="side_flags" src="/images/flags_png/M/' + dimg + '.png" title="' + countryname[rosd[i][5]] + '" alt="' + countryname[rosd[i][5]] + '" />');
							suffix = '</strong><a href="/en/military/battlefield-choose-side/' + rosd[i][1] + '/' + rosd[i][5] + '" title="' + rosd[i][3] + '"><span>Fight</span></a></li>';
							break;
						}
					}
					switch (rosd[i][0]) {
					case '0':
						msg.push('<strong style="color:Tomato">');
						tmp = '夯' + tmp;
						break;
					case '6':
						msg.push('<strong style="color:Gray">');
						tmp = '禁止' + tmp;
						suffix = '</strong><a title="' + rosd[i][3] + '"><span><del>Fight</del></span></a></li>';
						break;
					default:
						msg.push('<strong>');
						tmp = rosd[i][0] + tmp;
						break;
					}
					if (tmp.length > 20) {
						tmp = tmp.substring(0, 20);
					}
					msg.push(tmp);
					msg.push(suffix);
				}
				rosd_list.append(msg.join(''));
			}
		}
	});
}

function updateOrder() {
	GM_xmlhttpRequest({
		method:	'GET',
		url: 'http://www.erepublik.com/en/military/campaigns',
		onload:	function (response) {
			var battle, attack, defend, region, postInfo,
				data = response.responseText,
				tmp = data.split('full_width">')[1].split('</div>\n	\t<ul class="v')[0],
				up_list = $j('<div>' + tmp + '</div>'),
				s = [];
			$j('#rosd_h4').html('Real-time Order - update 40%');
			tmp = up_list.find('ul.bod_listing');
			if (tmp.length > 0) {
				battle = tmp.find('li').attr('id').substr(7);
				attack = countryid[tmp.find('li').children('strong').html()];
				defend = countryid[tmp.find('div.opponent_holder').text()];
				region = regionid[tmp.find('a.county').text()];
				s.push('["' + battle + '","' + attack + '","' + defend + '","' + region + '"]');
			}
			tmp = up_list.find('ul.country_battles');
			if (tmp.length > 0) {
				tmp.find('li').each(function () {
					battle = $j(this).attr('id').substr(7);
					attack = countryid[$j(this).children('strong').html()];
					defend = countryid[$j(this).find('div.opponent_holder').text()];
					region = regionid[$j(this).find('a.county').text()];
					s.push('["' + battle + '","' + attack + '","' + defend + '","' + region + '"]');
				});
			}
			tmp = up_list.find('ul.allies_battles');
			if (tmp.length > 0) {
				tmp.find('li').each(function () {
					battle = $j(this).attr('id').substr(7);
					attack = countryid[$j(this).children('strong').html()];
					defend = countryid[$j(this).find('div.opponent_holder').text()];
					region = regionid[$j(this).find('a.county').text()];
					s.push('["' + battle + '","' + attack + '","' + defend + '","' + region + '"]');
				});
			}
			tmp = up_list.find('ul.all_battles');
			if (tmp.length > 0) {
				tmp.find('li').each(function () {
					battle = $j(this).attr('id').substr(7);
					attack = countryid[$j(this).children('strong').html()];
					defend = countryid[$j(this).find('div.opponent_holder').text()];
					region = regionid[$j(this).find('a.county').text()];
					s.push('["' + battle + '","' + attack + '","' + defend + '","' + region + '"]');
				});
			}
			$j('#rosd_h4').html('Real-time Order - update 50%');
			postInfo = 'upinfo=0&info=[' + s.join(',') + ']';
			setTimeout(function () {
				GM_xmlhttpRequest({
					method:	'POST',
					url: 'http://cosyhh.aliapp.com/api.php',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: postInfo,
					onload:	function (response) {
						var data = response.responseText;
						if (data.message == 'success') {
							$j('#rosd_h4').html('Real-time Order - update 100%');
						} else if (data.message == 'error') {
							$j('#rosd_h4').html('Real-time Order - update error');
						}
						setTimeout(function () {
							$j('#rosd_list').empty();
							getOrder();
						}, 1000);
					}
				});
			}, 0);
		}
	});
}

function add_rosd() {
	var battle_listing = $j('#battle_listing');
	battle_listing.find('div').eq(-2).before('<h4 id="rosd_h4">Real-time Order</h4><ul id="rosd_list"></ul>');
	setTimeout(getOrder, 0);
	battle_listing.find('div.rest').append('<a href="javascript:;"  id="info_a">Update orders</a>');
	$j('#info_a').click(function () {
		$j('#rosd_h4').html('Real-time Order - update 10%');
		setTimeout(updateOrder, 0);
	});
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$j = unsafeWindow.jQuery;
		add_rosd();
	}
}

GM_wait();