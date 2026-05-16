const { useState, useEffect, useCallback, useMemo } = React;

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

// ─── JOHTO DEX (256) ─────────────────────────────────────────────────────────
// id = National Pokédex number (used for sprites)
// johtoId = Johto regional number (used for display)
const DEX = [
  // ── Johto starters ──────────────────────────────────────────────────────
  {johtoId:1,  id:152,name:"Chikorita"},  {johtoId:2,  id:153,name:"Bayleef"},    {johtoId:3,  id:154,name:"Meganium"},
  {johtoId:4,  id:155,name:"Cyndaquil"}, {johtoId:5,  id:156,name:"Quilava"},    {johtoId:6,  id:157,name:"Typhlosion"},
  {johtoId:7,  id:158,name:"Totodile"},  {johtoId:8,  id:159,name:"Croconaw"},   {johtoId:9,  id:160,name:"Feraligatr"},
  // ── Early routes ─────────────────────────────────────────────────────────
  {johtoId:10, id:16, name:"Pidgey"},    {johtoId:11, id:17, name:"Pidgeotto"},  {johtoId:12, id:18, name:"Pidgeot"},
  {johtoId:13, id:21, name:"Spearow"},   {johtoId:14, id:22, name:"Fearow"},
  {johtoId:15, id:163,name:"Hoothoot"},  {johtoId:16, id:164,name:"Noctowl"},
  {johtoId:17, id:19, name:"Rattata"},   {johtoId:18, id:20, name:"Raticate"},
  {johtoId:19, id:161,name:"Sentret"},   {johtoId:20, id:162,name:"Furret"},
  {johtoId:21, id:172,name:"Pichu"},     {johtoId:22, id:25, name:"Pikachu"},    {johtoId:23, id:26, name:"Raichu"},
  {johtoId:24, id:10, name:"Caterpie"},  {johtoId:25, id:11, name:"Metapod"},    {johtoId:26, id:12, name:"Butterfree"},
  {johtoId:27, id:13, name:"Weedle"},    {johtoId:28, id:14, name:"Kakuna"},     {johtoId:29, id:15, name:"Beedrill"},
  {johtoId:30, id:165,name:"Ledyba",   ssOnly:true}, {johtoId:31, id:166,name:"Ledian",   ssOnly:true},
  {johtoId:32, id:167,name:"Spinarak", hgOnly:true}, {johtoId:33, id:168,name:"Ariados",  hgOnly:true},
  {johtoId:34, id:74, name:"Geodude"},   {johtoId:35, id:75, name:"Graveler"},   {johtoId:36, id:76, name:"Golem"},
  {johtoId:37, id:41, name:"Zubat"},     {johtoId:38, id:42, name:"Golbat"},     {johtoId:39, id:169,name:"Crobat"},
  {johtoId:40, id:173,name:"Cleffa"},    {johtoId:41, id:35, name:"Clefairy"},   {johtoId:42, id:36, name:"Clefable"},
  {johtoId:43, id:174,name:"Igglybuff"}, {johtoId:44, id:39, name:"Jigglypuff"},{johtoId:45, id:40, name:"Wigglytuff"},
  {johtoId:46, id:175,name:"Togepi"},    {johtoId:47, id:176,name:"Togetic"},
  {johtoId:48, id:27, name:"Sandshrew", ssOnly:true}, {johtoId:49, id:28, name:"Sandslash", ssOnly:true},
  {johtoId:50, id:23, name:"Ekans",    hgOnly:true},  {johtoId:51, id:24, name:"Arbok",    hgOnly:true},
  // ── Johto mid-game ────────────────────────────────────────────────────────
  {johtoId:52, id:206,name:"Dunsparce"},
  {johtoId:53, id:179,name:"Mareep"},    {johtoId:54, id:180,name:"Flaaffy"},    {johtoId:55, id:181,name:"Ampharos"},
  {johtoId:56, id:194,name:"Wooper"},    {johtoId:57, id:195,name:"Quagsire"},
  {johtoId:58, id:92, name:"Gastly"},    {johtoId:59, id:93, name:"Haunter"},    {johtoId:60, id:94, name:"Gengar"},
  {johtoId:61, id:201,name:"Unown"},
  {johtoId:62, id:95, name:"Onix"},      {johtoId:63, id:208,name:"Steelix"},
  {johtoId:64, id:69, name:"Bellsprout",hgOnly:true}, {johtoId:65, id:70, name:"Weepinbell",hgOnly:true}, {johtoId:66, id:71, name:"Victreebel",hgOnly:true},
  {johtoId:67, id:187,name:"Hoppip"},    {johtoId:68, id:188,name:"Skiploom"},   {johtoId:69, id:189,name:"Jumpluff"},
  {johtoId:70, id:46, name:"Paras"},     {johtoId:71, id:47, name:"Parasect"},
  {johtoId:72, id:60, name:"Poliwag"},   {johtoId:73, id:61, name:"Poliwhirl"},  {johtoId:74, id:62, name:"Poliwrath"},
  {johtoId:75, id:186,name:"Politoed"},
  {johtoId:76, id:129,name:"Magikarp"},  {johtoId:77, id:130,name:"Gyarados"},
  {johtoId:78, id:118,name:"Goldeen"},   {johtoId:79, id:119,name:"Seaking"},
  {johtoId:80, id:79, name:"Slowpoke"},  {johtoId:81, id:80, name:"Slowbro"},    {johtoId:82, id:199,name:"Slowking"},
  {johtoId:83, id:43, name:"Oddish",   ssOnly:true}, {johtoId:84, id:44, name:"Gloom",    ssOnly:true}, {johtoId:85, id:45, name:"Vileplume", ssOnly:true},
  {johtoId:86, id:182,name:"Bellossom"},
  {johtoId:87, id:96, name:"Drowzee"},   {johtoId:88, id:97, name:"Hypno"},
  {johtoId:89, id:63, name:"Abra"},      {johtoId:90, id:64, name:"Kadabra"},    {johtoId:91, id:65, name:"Alakazam"},
  {johtoId:92, id:132,name:"Ditto"},
  {johtoId:93, id:204,name:"Pineco"},    {johtoId:94, id:205,name:"Forretress"},
  {johtoId:95, id:29, name:"Nidoran♀"}, {johtoId:96, id:30, name:"Nidorina"},    {johtoId:97, id:31, name:"Nidoqueen"},
  {johtoId:98, id:32, name:"Nidoran♂"}, {johtoId:99, id:33, name:"Nidorino"},    {johtoId:100,id:34, name:"Nidoking"},
  {johtoId:101,id:193,name:"Yanma"},     {johtoId:102,id:469,name:"Yanmega"},
  {johtoId:103,id:191,name:"Sunkern"},   {johtoId:104,id:192,name:"Sunflora"},
  {johtoId:105,id:102,name:"Exeggcute"},{johtoId:106,id:103,name:"Exeggutor"},
  {johtoId:107,id:185,name:"Sudowoodo"},{johtoId:108,id:202,name:"Wobbuffet"},
  {johtoId:109,id:48, name:"Venonat"},   {johtoId:110,id:49, name:"Venomoth"},
  {johtoId:111,id:123,name:"Scyther",  hgOnly:true}, {johtoId:112,id:212,name:"Scizor"},
  {johtoId:113,id:127,name:"Pinsir",   ssOnly:true}, {johtoId:114,id:214,name:"Heracross"},
  {johtoId:115,id:109,name:"Koffing"},   {johtoId:116,id:110,name:"Weezing"},
  {johtoId:117,id:88, name:"Grimer"},    {johtoId:118,id:89, name:"Muk"},
  {johtoId:119,id:81, name:"Magnemite"}, {johtoId:120,id:82, name:"Magneton"},
  {johtoId:121,id:100,name:"Voltorb"},   {johtoId:122,id:101,name:"Electrode"},
  {johtoId:123,id:190,name:"Aipom"},     {johtoId:124,id:424,name:"Ambipom"},
  {johtoId:125,id:209,name:"Snubbull"},  {johtoId:126,id:210,name:"Granbull"},
  {johtoId:127,id:37, name:"Vulpix",   ssOnly:true}, {johtoId:128,id:38, name:"Ninetales", ssOnly:true},
  {johtoId:129,id:58, name:"Growlithe", hgOnly:true},{johtoId:130,id:59, name:"Arcanine",  hgOnly:true},
  {johtoId:131,id:234,name:"Stantler"},
  {johtoId:132,id:183,name:"Marill",   ssOnly:true}, {johtoId:133,id:184,name:"Azumarill", ssOnly:true},
  {johtoId:134,id:50, name:"Diglett"},   {johtoId:135,id:51, name:"Dugtrio"},
  {johtoId:136,id:56, name:"Mankey",   hgOnly:true}, {johtoId:137,id:57, name:"Primeape", hgOnly:true},
  {johtoId:138,id:52, name:"Meowth",   ssOnly:true}, {johtoId:139,id:53, name:"Persian",  ssOnly:true},
  {johtoId:140,id:54, name:"Psyduck"},   {johtoId:141,id:55, name:"Golduck"},
  {johtoId:142,id:66, name:"Machop"},    {johtoId:143,id:67, name:"Machoke"},    {johtoId:144,id:68, name:"Machamp"},
  {johtoId:145,id:236,name:"Tyrogue"},   {johtoId:146,id:106,name:"Hitmonlee"},  {johtoId:147,id:107,name:"Hitmonchan"}, {johtoId:148,id:237,name:"Hitmontop"},
  {johtoId:149,id:203,name:"Girafarig"}, {johtoId:150,id:128,name:"Tauros"},
  {johtoId:151,id:241,name:"Miltank"},
  {johtoId:152,id:240,name:"Magby"},     {johtoId:153,id:126,name:"Magmar"},
  {johtoId:154,id:238,name:"Smoochum"},  {johtoId:155,id:124,name:"Jynx"},
  {johtoId:156,id:239,name:"Elekid"},    {johtoId:157,id:125,name:"Electabuzz"},
  {johtoId:158,id:122,name:"Mr. Mime"},  {johtoId:159,id:235,name:"Smeargle"},
  {johtoId:160,id:83, name:"Farfetch'd"},
  {johtoId:161,id:177,name:"Natu"},      {johtoId:162,id:178,name:"Xatu"},
  {johtoId:163,id:211,name:"Qwilfish"},
  {johtoId:164,id:72, name:"Tentacool"}, {johtoId:165,id:73, name:"Tentacruel"},
  {johtoId:166,id:98, name:"Krabby"},    {johtoId:167,id:99, name:"Kingler"},
  {johtoId:168,id:213,name:"Shuckle"},
  {johtoId:169,id:120,name:"Staryu"},    {johtoId:170,id:121,name:"Starmie"},
  {johtoId:171,id:90, name:"Shellder"},  {johtoId:172,id:91, name:"Cloyster"},
  {johtoId:173,id:222,name:"Corsola"},   {johtoId:174,id:223,name:"Remoraid"},   {johtoId:175,id:224,name:"Octillery"},
  {johtoId:176,id:170,name:"Chinchou"},  {johtoId:177,id:171,name:"Lanturn"},
  {johtoId:178,id:86, name:"Seel"},      {johtoId:179,id:87, name:"Dewgong"},
  {johtoId:180,id:108,name:"Lickitung"}, {johtoId:181,id:463,name:"Lickilicky"},
  {johtoId:182,id:114,name:"Tangela"},   {johtoId:183,id:465,name:"Tangrowth"},
  {johtoId:184,id:133,name:"Eevee"},
  {johtoId:185,id:134,name:"Vaporeon"},  {johtoId:186,id:135,name:"Jolteon"},    {johtoId:187,id:136,name:"Flareon"},
  {johtoId:188,id:196,name:"Espeon"},    {johtoId:189,id:197,name:"Umbreon"},
  {johtoId:190,id:116,name:"Horsea"},    {johtoId:191,id:117,name:"Seadra"},     {johtoId:192,id:230,name:"Kingdra"},
  {johtoId:193,id:207,name:"Gligar",   hgOnly:true},
  {johtoId:194,id:225,name:"Delibird", ssOnly:true},
  {johtoId:195,id:220,name:"Swinub"},    {johtoId:196,id:221,name:"Piloswine"},  {johtoId:197,id:473,name:"Mamoswine"},
  {johtoId:198,id:216,name:"Teddiursa", hgOnly:true},{johtoId:199,id:217,name:"Ursaring",  hgOnly:true},
  {johtoId:200,id:231,name:"Phanpy",   hgOnly:true}, {johtoId:201,id:232,name:"Donphan",  hgOnly:true},
  {johtoId:202,id:226,name:"Mantine",  hgOnly:true}, {johtoId:203,id:227,name:"Skarmory", ssOnly:true},
  {johtoId:204,id:84, name:"Doduo"},     {johtoId:205,id:85, name:"Dodrio"},
  {johtoId:206,id:77, name:"Ponyta"},    {johtoId:207,id:78, name:"Rapidash"},
  {johtoId:208,id:104,name:"Cubone"},    {johtoId:209,id:105,name:"Marowak"},    {johtoId:210,id:115,name:"Kangaskhan"},
  {johtoId:211,id:111,name:"Rhyhorn"},   {johtoId:212,id:112,name:"Rhydon"},
  {johtoId:213,id:198,name:"Murkrow",  hgOnly:true},
  {johtoId:214,id:228,name:"Houndour", ssOnly:true}, {johtoId:215,id:229,name:"Houndoom", ssOnly:true},
  {johtoId:216,id:218,name:"Slugma"},    {johtoId:217,id:219,name:"Magcargo"},
  {johtoId:218,id:215,name:"Sneasel"},   {johtoId:219,id:200,name:"Misdreavus", ssOnly:true},
  {johtoId:220,id:137,name:"Porygon"},   {johtoId:221,id:233,name:"Porygon2"},
  {johtoId:222,id:113,name:"Chansey"},   {johtoId:223,id:242,name:"Blissey"},
  {johtoId:224,id:131,name:"Lapras"},
  {johtoId:225,id:138,name:"Omanyte"},   {johtoId:226,id:139,name:"Omastar"},
  {johtoId:227,id:140,name:"Kabuto"},    {johtoId:228,id:141,name:"Kabutops"},
  {johtoId:229,id:142,name:"Aerodactyl"},{johtoId:230,id:143,name:"Snorlax"},
  // ── Kanto starters (post-game via Prof. Oak) ─────────────────────────────
  {johtoId:231,id:1,  name:"Bulbasaur"}, {johtoId:232,id:2,  name:"Ivysaur"},    {johtoId:233,id:3,  name:"Venusaur"},
  {johtoId:234,id:4,  name:"Charmander"},{johtoId:235,id:5,  name:"Charmeleon"}, {johtoId:236,id:6,  name:"Charizard"},
  {johtoId:237,id:7,  name:"Squirtle"},  {johtoId:238,id:8,  name:"Wartortle"},  {johtoId:239,id:9,  name:"Blastoise"},
  // ── Legendaries ───────────────────────────────────────────────────────────
  {johtoId:240,id:144,name:"Articuno"},  {johtoId:241,id:145,name:"Zapdos"},     {johtoId:242,id:146,name:"Moltres"},
  {johtoId:243,id:243,name:"Raikou",  warn:true},{johtoId:244,id:244,name:"Entei",   warn:true},{johtoId:245,id:245,name:"Suicune", warn:true},
  {johtoId:246,id:147,name:"Dratini"},   {johtoId:247,id:148,name:"Dragonair"},  {johtoId:248,id:149,name:"Dragonite"},
  {johtoId:249,id:246,name:"Larvitar"},  {johtoId:250,id:247,name:"Pupitar"},    {johtoId:251,id:248,name:"Tyranitar"},
  {johtoId:252,id:249,name:"Lugia",   warn:true},{johtoId:253,id:250,name:"Ho-Oh",   warn:true},
  {johtoId:254,id:150,name:"Mewtwo"},
  {johtoId:255,id:151,name:"Mew",     warn:true,event:true},
  {johtoId:256,id:251,name:"Celebi",  warn:true,event:true},
];

// ─── NATIONAL DEX (Gen III/IV obtainable in HGSS) ────────────────────────────
const NATIONAL_DEX = [
  // ── Gen III ─────────────────────────────────────────────────────────────────
  // Pokéwalker: Torchic line
  {id:255,name:"Torchic"},{id:256,name:"Combusken"},{id:257,name:"Blaziken"},
  // Pokéwalker
  {id:263,name:"Zigzagoon"},{id:264,name:"Linoone"},
  // Pokéwalker + Bug Contest (post-Nat Dex)
  {id:265,name:"Wurmple"},
  {id:266,name:"Silcoon"},{id:267,name:"Beautifly"},
  {id:268,name:"Cascoon"},{id:269,name:"Dustox"},
  // Safari Zone
  {id:270,name:"Lotad"},{id:271,name:"Lombre"},{id:272,name:"Ludicolo"},
  {id:273,name:"Seedot"},{id:274,name:"Nuzleaf"},{id:275,name:"Shiftry"},
  // Pokéwalker: Wingull → Pelipper
  {id:278,name:"Wingull"},{id:279,name:"Pelipper"},
  // Safari Zone
  {id:283,name:"Surskit"},{id:284,name:"Masquerain"},
  {id:285,name:"Shroomish"},{id:286,name:"Breloom"},
  {id:287,name:"Slakoth"},{id:288,name:"Vigoroth"},{id:289,name:"Slaking"},
  // Bug Contest (post-Nat Dex)
  {id:290,name:"Nincada"},{id:291,name:"Ninjask"},{id:292,name:"Shedinja"},
  // Pokéwalker
  {id:298,name:"Azurill"},
  // Safari Zone
  {id:299,name:"Nosepass"},
  // Pokéwalker: Skitty → Delcatty
  {id:300,name:"Skitty"},{id:301,name:"Delcatty"},
  // Pokéwalker
  {id:302,name:"Sableye"},
  // Safari Zone: Aron line
  {id:304,name:"Aron"},{id:305,name:"Lairon"},{id:306,name:"Aggron"},
  // Pokéwalker: Meditite → Medicham
  {id:307,name:"Meditite"},{id:308,name:"Medicham"},
  // Safari Zone: Electrike line
  {id:309,name:"Electrike"},{id:310,name:"Manectric"},
  // Pokéwalker
  {id:313,name:"Volbeat"},{id:314,name:"Illumise"},
  // Safari Zone (also Budew evolution chain)
  {id:315,name:"Roselia"},
  // SS swarm (Route 35)
  {id:316,name:"Gulpin"},{id:317,name:"Swalot"},
  // Pokéwalker: Carvanha → Sharpedo
  {id:318,name:"Carvanha"},{id:319,name:"Sharpedo"},
  // Pokéwalker: Wailmer → Wailord
  {id:320,name:"Wailmer"},{id:321,name:"Wailord"},
  // Safari Zone
  {id:324,name:"Torkoal"},
  {id:327,name:"Spinda"},
  {id:328,name:"Trapinch"},{id:329,name:"Vibrava"},{id:330,name:"Flygon"},
  {id:331,name:"Cacnea"},{id:332,name:"Cacturne"},
  {id:335,name:"Zangoose"},
  {id:336,name:"Seviper"},
  {id:337,name:"Lunatone"},
  {id:338,name:"Solrock"},
  {id:339,name:"Barboach"},{id:340,name:"Whiscash"},
  {id:341,name:"Corphish"},{id:342,name:"Crawdaunt"},
  // HG swarm (Vermilion City area); Museum fossils HG: Claw, SS: Root
  {id:343,name:"Baltoy"},{id:344,name:"Claydol"},
  {id:345,name:"Lileep"},{id:346,name:"Cradily"},
  {id:347,name:"Anorith"},{id:348,name:"Armaldo"},
  // Pokéwalker: Feebas → Milotic
  {id:349,name:"Feebas"},{id:350,name:"Milotic"},
  // Pokéwalker
  {id:351,name:"Castform"},
  {id:352,name:"Kecleon"},
  // Safari Zone: Shuppet → Banette
  {id:353,name:"Shuppet"},{id:354,name:"Banette"},
  // Pokéwalker: Duskull → Dusclops → Dusknoir (Gen IV)
  {id:355,name:"Duskull"},{id:356,name:"Dusclops"},
  // Pokéwalker
  {id:357,name:"Tropius"},
  // Safari Zone (also Chingling → Chimecho)
  {id:358,name:"Chimecho"},
  // Pokéwalker: Snorunt → Glalie or Froslass (Gen IV)
  {id:361,name:"Snorunt"},{id:362,name:"Glalie"},
  // Safari Zone: Spheal line
  {id:363,name:"Spheal"},{id:364,name:"Sealeo"},{id:365,name:"Walrein"},
  // Route 19 swarm + evolutions (Deep Sea Tooth → Huntail, Deep Sea Scale → Gorebyss)
  {id:366,name:"Clamperl"},{id:367,name:"Huntail"},{id:368,name:"Gorebyss"},
  // Safari Zone: Bagon line
  {id:371,name:"Bagon"},{id:372,name:"Shelgon"},{id:373,name:"Salamence"},
  // Pokéwalker: Beldum → Metang → Metagross
  {id:374,name:"Beldum"},{id:375,name:"Metang"},{id:376,name:"Metagross"},
  // ── Gen IV ──────────────────────────────────────────────────────────────────
  // Pokéwalker: Bidoof → Bibarel
  {id:399,name:"Bidoof"},{id:400,name:"Bibarel"},
  // Bug Contest: Kricketot → Kricketune
  {id:401,name:"Kricketot"},{id:402,name:"Kricketune"},
  // Pokéwalker: Shinx → Luxio → Luxray
  {id:403,name:"Shinx"},{id:404,name:"Luxio"},{id:405,name:"Luxray"},
  // Pokéwalker: Budew → Roselia → Roserade (Shiny Stone via Pokéathlon/Bug Contest)
  {id:406,name:"Budew"},{id:407,name:"Roserade"},
  // Bug Contest: Combee → Vespiquen
  {id:415,name:"Combee"},{id:416,name:"Vespiquen"},
  // Pokéwalker
  {id:417,name:"Pachirisu"},
  // Pokéwalker: Buizel → Floatzel
  {id:418,name:"Buizel"},{id:419,name:"Floatzel"},
  // Pokéwalker: Shellos → Gastrodon
  {id:422,name:"Shellos"},{id:423,name:"Gastrodon"},
  // Pokéwalker: Buneary → Lopunny
  {id:427,name:"Buneary"},{id:428,name:"Lopunny"},
  // Pokéwalker: Chingling → Chimecho (Gen III, above)
  {id:433,name:"Chingling"},
  // Pokéwalker: Bronzor → Bronzong
  {id:436,name:"Bronzor"},{id:437,name:"Bronzong"},
  // Pokéwalker baby events
  {id:438,name:"Bonsly"},{id:439,name:"Mime Jr."},{id:440,name:"Happiny"},
  // Pokéwalker events
  {id:441,name:"Chatot"},{id:442,name:"Spiritomb"},
  // Safari Zone: Gible → Gabite → Garchomp
  {id:443,name:"Gible"},{id:444,name:"Gabite"},{id:445,name:"Garchomp"},
  // Pokéwalker event
  {id:446,name:"Munchlax"},
  // Safari Zone: Riolu → Lucario
  {id:447,name:"Riolu"},{id:448,name:"Lucario"},
  // Safari Zone: Hippopotas → Hippowdon
  {id:449,name:"Hippopotas"},{id:450,name:"Hippowdon"},
  // Safari Zone: Skorupi → Drapion
  {id:451,name:"Skorupi"},{id:452,name:"Drapion"},
  // Pokéwalker: Croagunk → Toxicroak
  {id:453,name:"Croagunk"},{id:454,name:"Toxicroak"},
  // Safari Zone
  {id:455,name:"Carnivine"},
  // Pokéwalker: Finneon → Lumineon
  {id:456,name:"Finneon"},{id:457,name:"Lumineon"},
  // Baby Mantine — breed Mantine + Remoraid in party (HG only)
  {id:458,name:"Mantyke"},
  // Pokéwalker: Snover → Abomasnow
  {id:459,name:"Snover"},{id:460,name:"Abomasnow"},
  // HG-exclusive evolution (Gligar + Razor Fang at night)
  {id:472,name:"Gliscor"},
  // Gen III evolutions requiring items available in HGSS
  {id:477,name:"Dusknoir"},   // Dusclops + Reaper Cloth (trade)
  {id:478,name:"Froslass"},   // Snorunt ♀ + Dawn Stone (Pokéathlon)
];

// ─── AREA DATA ────────────────────────────────────────────────────────────────
// Populated part-by-part during the audit pipeline (Phase 3 onward).
// Each area: { part, id, name, note, pokemon[], items[], trainers[] }
// Floored areas use: { part, id, name, note, floors:[{ label, pokemon[], items[], trainers[] }] }
// New fields vs FRLG: time ("morning"|"day"|"night"), hgOnly, ssOnly, rematch[] on trainers
const AREAS = [
  // ─── PART 1 ────────────────────────────────────────────────────────────────
  { part:"Part 1", id:"new-bark-town", name:"New Bark Town",
    note:"Choose your first partner Pokémon from Professor Elm.",
    pokemon:[
      {name:"Chikorita", method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"johto-starter", choiceId:"chikorita"},
      {name:"Cyndaquil", method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"johto-starter", choiceId:"cyndaquil"},
      {name:"Totodile",  method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"johto-starter", choiceId:"totodile"},
    ],
    items:[
      {name:"Potion ×5",   hidden:false, note:"From Elm's aide"},
      {name:"Potion",      hidden:true,  note:"On the spot Silver was standing"},
      {name:"Pokégear",    hidden:false, note:"From Mom after receiving first partner Pokémon"},
    ],
    trainers:[] },

  { part:"Part 1", id:"route-29", name:"Route 29",
    pokemon:[
      {name:"Pidgey",   method:"Grass", levels:"2–4", rate:"55%", time:"morning"},
      {name:"Pidgey",   method:"Grass", levels:"2–4", rate:"55%", time:"day"},
      {name:"Sentret",  method:"Grass", levels:"2–3", rate:"40%", time:"morning"},
      {name:"Sentret",  method:"Grass", levels:"2–3", rate:"40%", time:"day"},
      {name:"Rattata",  method:"Grass", levels:"4",   rate:"5%",  time:"morning"},
      {name:"Rattata",  method:"Grass", levels:"4",   rate:"5%",  time:"day"},
      {name:"Rattata",  method:"Grass", levels:"2–4", rate:"15%", time:"night"},
      {name:"Hoothoot", method:"Grass", levels:"2–4", rate:"85%", time:"night"},
    ],
    items:[
      {name:"Potion",         hidden:false, note:"E of the NE grass patch"},
      {name:"Poké Ball ×5",   hidden:false, note:"From Lyra/Ethan after catching tutorial"},
      {name:"Green Apricorn", hidden:false, note:"NW hill tree, daily (requires Apricorn Box)"},
    ],
    trainers:[] },

  // ─── PART 2 ────────────────────────────────────────────────────────────────
  { part:"Part 2", id:"cherrygrove-city", name:"Cherrygrove City",
    pokemon:[],
    items:[
      {name:"Running Shoes", hidden:false, note:"From Guide Gent after city tour"},
      {name:"Map Card",      hidden:false, note:"From Guide Gent at Route 30 exit"},
    ],
    trainers:[
      {class:"Rival", name:"Silver",
       note:"Ambushes you returning from Route 30. Team is the starter that beats yours (Lv5).",
       team:[{name:"Cyndaquil", level:5}]},
    ] },

  { part:"Part 2", id:"route-30", name:"Route 30",
    pokemon:[
      {name:"Caterpie",  method:"Grass", levels:"3–4", rate:"50%", time:"morning", hgOnly:true},
      {name:"Caterpie",  method:"Grass", levels:"3–4", rate:"35%", time:"day",     hgOnly:true},
      {name:"Metapod",   method:"Grass", levels:"4",   rate:"10%", time:"morning", hgOnly:true},
      {name:"Metapod",   method:"Grass", levels:"4",   rate:"15%", time:"day",     hgOnly:true},
      {name:"Weedle",    method:"Grass", levels:"3–4", rate:"50%", time:"morning", ssOnly:true},
      {name:"Weedle",    method:"Grass", levels:"3–4", rate:"35%", time:"day",     ssOnly:true},
      {name:"Kakuna",    method:"Grass", levels:"4",   rate:"10%", time:"morning", ssOnly:true},
      {name:"Kakuna",    method:"Grass", levels:"4",   rate:"15%", time:"day",     ssOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"2–4", rate:"HG 40%/SS 10%", time:"morning"},
      {name:"Pidgey",    method:"Grass", levels:"3–4", rate:"50%",            time:"day"},
      {name:"Spinarak",  method:"Grass", levels:"2",   rate:"30%", time:"night",   hgOnly:true},
      {name:"Ledyba",    method:"Grass", levels:"3",   rate:"30%", time:"morning", ssOnly:true},
      {name:"Rattata",   method:"Grass", levels:"3–4", rate:"40%", time:"night"},
      {name:"Hoothoot",  method:"Grass", levels:"3–4", rate:"HG 30%/SS 60%", time:"night"},
    ],
    items:[
      {name:"Potion",          hidden:false, note:"E of S grass patch"},
      {name:"Potion",          hidden:true,  note:"W branch flowerbed near Trainer Tips sign"},
      {name:"Apricorn Box",    hidden:false, note:"From man in S house"},
      {name:"Green Apricorn",  hidden:false, note:"S house tree, daily"},
      {name:"Antidote",        hidden:false, note:"Between S house and fork"},
      {name:"Pink Apricorn",   hidden:false, note:"E branch tree by Mr. Pokémon's house, daily"},
      {name:"Mystery Egg",     hidden:false, note:"From Mr. Pokémon"},
      {name:"Pokédex",         hidden:false, note:"From Prof. Oak at Mr. Pokémon's house"},
    ],
    trainers:[
      {class:"Youngster",  name:"Joey",  team:[{name:"Rattata",level:4}],
       rematch:[{team:[{name:"Rattata",level:10}]},{team:[{name:"Rattata",level:15}]},{team:[{name:"Rattata",level:17}]},{team:[{name:"Raticate",level:30}]}]},
      {class:"Youngster",  name:"Mikey", team:[{name:"Pidgey",level:2},{name:"Rattata",level:4}]},
      {class:"Bug Catcher",name:"Don",   team:[{name:"Caterpie",level:3},{name:"Caterpie",level:3}]},
    ] },

  // ─── PART 3 ────────────────────────────────────────────────────────────────
  { part:"Part 3", id:"route-31", name:"Route 31",
    pokemon:[
      {name:"Caterpie",  method:"Grass", levels:"4–5", rate:"35%", time:"morning", hgOnly:true},
      {name:"Caterpie",  method:"Grass", levels:"4–5", rate:"35%", time:"day",     hgOnly:true},
      {name:"Metapod",   method:"Grass", levels:"5",   rate:"15%", time:"morning", hgOnly:true},
      {name:"Metapod",   method:"Grass", levels:"5",   rate:"15%", time:"day",     hgOnly:true},
      {name:"Weedle",    method:"Grass", levels:"4",   rate:"30%", time:"morning", ssOnly:true},
      {name:"Weedle",    method:"Grass", levels:"4–5", rate:"35%", time:"day",     ssOnly:true},
      {name:"Kakuna",    method:"Grass", levels:"5",   rate:"10%", time:"morning", ssOnly:true},
      {name:"Kakuna",    method:"Grass", levels:"5",   rate:"15%", time:"day",     ssOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"3–5", rate:"HG 30%/SS 10%", time:"morning"},
      {name:"Pidgey",    method:"Grass", levels:"3–4", rate:"30%",            time:"day"},
      {name:"Bellsprout",method:"Grass", levels:"3",   rate:"20%"},
      {name:"Spinarak",  method:"Grass", levels:"3",   rate:"30%", time:"night",   hgOnly:true},
      {name:"Ledyba",    method:"Grass", levels:"4",   rate:"30%", time:"morning", ssOnly:true},
      {name:"Rattata",   method:"Grass", levels:"4–5", rate:"40%", time:"night"},
      {name:"Hoothoot",  method:"Grass", levels:"4–5", rate:"HG 10%/SS 40%", time:"night"},
    ],
    items:[
      {name:"Potion",       hidden:false, note:"Near the sign outside Dark Cave"},
      {name:"Blk Apricorn", hidden:false, note:"SW side of pond tree, daily"},
      {name:"Poké Ball",    hidden:false, note:"S of pond and ledge"},
      {name:"Vs. Recorder", hidden:false, note:"From Lyra/Ethan in the gate"},
    ],
    trainers:[
      {class:"Bug Catcher", name:"Wade",
       team:[{name:"Caterpie",level:2},{name:"Caterpie",level:2},{name:"Caterpie",level:2},{name:"Weedle",level:3}],
       rematch:[{team:[{name:"Caterpie",level:5},{name:"Caterpie",level:7},{name:"Caterpie",level:9}]},{team:[{name:"Metapod",level:10},{name:"Butterfree",level:12}]}]},
    ] },

  { part:"Part 3", id:"violet-city", name:"Violet City",
    note:"Trade a Bellsprout for Onix at the SW house. Primo gives Eggs at the Pokémon Center.",
    pokemon:[
      {name:"Togepi",    method:"Egg",   levels:"1", rate:"One", note:"From Elm's aide at Poké Mart, after Zephyr Badge"},
      {name:"Mareep",    method:"Egg",   levels:"1", rate:"One", note:"From Primo at Pokémon Center (secret code)"},
      {name:"Wooper",    method:"Egg",   levels:"1", rate:"One", note:"From Primo at Pokémon Center (secret code)"},
      {name:"Slugma",    method:"Egg",   levels:"1", rate:"One", note:"From Primo at Pokémon Center (secret code)"},
      {name:"Onix",      method:"Trade", levels:"Varies", rate:"One", note:"Trade a Bellsprout at SW house"},
    ],
    items:[
      {name:"Persim Berry",hidden:false, note:"Held by Rocky the traded Onix"},
      {name:"Ylw Apricorn",hidden:false, note:"S exit clearing tree, daily"},
      {name:"Poké Ball",   hidden:true,  note:"W side of island in front of Sprout Tower"},
      {name:"TM51 Roost",  hidden:false, note:"From Gym Leader Falkner after defeating him"},
    ],
    trainers:[] },

  { part:"Part 3", id:"sprout-tower", name:"Sprout Tower",
    floors:[
      { label:"1F", pokemon:[], items:[
          {name:"Parlyz Heal", hidden:false, note:"N, S of NE stairway"},
        ], trainers:[
          {class:"Sage", name:"Chow",   team:[{name:"Bellsprout",level:3},{name:"Bellsprout",level:3},{name:"Bellsprout",level:3}]},
        ] },
      { label:"2F", pokemon:[
          {name:"Rattata", method:"Cave", levels:"3–6", rate:"100%", time:"morning"},
          {name:"Rattata", method:"Cave", levels:"3–6", rate:"100%", time:"day"},
          {name:"Rattata", method:"Cave", levels:"3,5", rate:"15%",  time:"night"},
          {name:"Gastly",  method:"Cave", levels:"3–6", rate:"85%",  time:"night"},
        ], items:[
          {name:"X Accuracy", hidden:false, note:"SW, N of W stairway"},
        ], trainers:[
          {class:"Sage", name:"Nico",   team:[{name:"Bellsprout",level:3},{name:"Bellsprout",level:3},{name:"Bellsprout",level:3}]},
          {class:"Sage", name:"Edmond", team:[{name:"Bellsprout",level:3},{name:"Bellsprout",level:3},{name:"Bellsprout",level:3}]},
        ] },
      { label:"3F", pokemon:[
          {name:"Rattata", method:"Cave", levels:"3–6", rate:"100%", time:"morning"},
          {name:"Rattata", method:"Cave", levels:"3–6", rate:"100%", time:"day"},
          {name:"Rattata", method:"Cave", levels:"3,5", rate:"15%",  time:"night"},
          {name:"Gastly",  method:"Cave", levels:"3–6", rate:"85%",  time:"night"},
        ], items:[
          {name:"Potion",      hidden:false, note:"W of stairway"},
          {name:"Escape Rope", hidden:false, note:"NE of pillar"},
          {name:"TM70 Flash",  hidden:false, note:"From Elder Li after defeating him"},
        ], trainers:[
          {class:"Sage",  name:"Jin",  team:[{name:"Bellsprout",level:6}]},
          {class:"Sage",  name:"Neal", team:[{name:"Bellsprout",level:6}]},
          {class:"Sage",  name:"Troy", team:[{name:"Bellsprout",level:7},{name:"Hoothoot",level:7}]},
          {class:"Elder", name:"Li",   team:[{name:"Bellsprout",level:7},{name:"Bellsprout",level:7},{name:"Hoothoot",level:10}]},
        ] },
    ] },

  { part:"Part 3", id:"violet-gym", name:"Violet Gym",
    note:"Specialty: Flying. Weak to Electric, Ice, Rock.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Bird Keeper", name:"Abe",     team:[{name:"Spearow",level:9}]},
      {class:"Bird Keeper", name:"Rod",     team:[{name:"Pidgey",level:7},{name:"Pidgey",level:7}]},
      {class:"Leader",      name:"Falkner", note:"Zephyr Badge · TM51 Roost",
       team:[{name:"Pidgey",level:9},{name:"Pidgeotto",level:13}]},
    ] },

  // ─── PART 4 ────────────────────────────────────────────────────────────────
  { part:"Part 4", id:"route-32", name:"Route 32",
    note:"Old Rod from Fishing Guru at Pokémon Center. Ruins of Alph accessible from north.",
    pokemon:[
      {name:"Rattata",   method:"Grass", levels:"4–6",  rate:"HG 35%/SS 5%",  time:"morning"},
      {name:"Rattata",   method:"Grass", levels:"4–6",  rate:"HG 40%/SS 10%", time:"day"},
      {name:"Rattata",   method:"Grass", levels:"4",    rate:"30%",            time:"night",   hgOnly:true},
      {name:"Ekans",     method:"Grass", levels:"4",    rate:"30%",                 ssOnly:true},
      {name:"Zubat",     method:"Grass", levels:"4",    rate:"5%",  time:"morning"},
      {name:"Zubat",     method:"Grass", levels:"4",    rate:"5%",  time:"night"},
      {name:"Bellsprout",method:"Grass", levels:"6",    rate:"30%"},
      {name:"Mareep",    method:"Grass", levels:"6",    rate:"20%"},
      {name:"Hoppip",    method:"Grass", levels:"6",    rate:"10%"},
      {name:"Wooper",    method:"Grass", levels:"6",    rate:"35%", time:"night"},
      {name:"Magikarp",  method:"Old Rod",levels:"10",  rate:"85%"},
      {name:"Goldeen",   method:"Old Rod",levels:"10",  rate:"15%"},
    ],
    items:[
      {name:"Miracle Seed",     hidden:false, note:"NE, from man N of first grass patch"},
      {name:"Repel",            hidden:false, note:"SW of hill, W of Picnicker Liz"},
      {name:"Great Ball",       hidden:false, note:"SW of pier in tall grass"},
      {name:"Great Ball",       hidden:true,  note:"Outside Union Cave entrance"},
      {name:"TM09 Bullet Seed", hidden:false, note:"SW cliff"},
      {name:"Poison Barb",      hidden:false, note:"From Frieda (Fri) behind Pokémon Center"},
      {name:"Old Rod",          hidden:false, note:"From the Fishing Guru at the Pokémon Center"},
      {name:"Lure Ball ×2",     hidden:false, note:"From Apricorn enthusiast at Pokémon Center"},
    ],
    trainers:[
      {class:"Youngster",  name:"Albert", team:[{name:"Rattata",level:6},{name:"Zubat",level:8}]},
      {class:"Picnicker",  name:"Liz",    team:[{name:"Nidoran♀",level:8}],
       rematch:[{team:[{name:"Nidoran♀",level:10}]},{team:[{name:"Nidoran♀",level:15},{name:"Nidorina",level:17}]}]},
      {class:"Camper",     name:"Roland", team:[{name:"Nidoran♂",level:9}]},
      {class:"Fisherman",  name:"Henry",  team:[{name:"Poliwag",level:8},{name:"Poliwag",level:8}]},
      {class:"Fisherman",  name:"Justin", team:[{name:"Magikarp",level:5},{name:"Magikarp",level:5},{name:"Magikarp",level:15},{name:"Magikarp",level:5}]},
      {class:"Fisherman",  name:"Ralph",  team:[{name:"Goldeen",level:10}],
       rematch:[{team:[{name:"Goldeen",level:15}]},{team:[{name:"Goldeen",level:20},{name:"Seaking",level:22}]}]},
      {class:"Youngster",  name:"Gordon", team:[{name:"Wooper",level:10}]},
      {class:"Bird Keeper",name:"Peter",  team:[{name:"Pidgey",level:6},{name:"Pidgey",level:6},{name:"Spearow",level:8}]},
    ] },

  { part:"Part 4", id:"ruins-of-alph", name:"Ruins of Alph",
    note:"4 tile puzzles unlock all 28 Unown forms. North chamber accessible on first visit; other chambers require HMs.",
    pokemon:[
      {name:"Natu",    method:"Grass",   levels:"18–24", rate:"90%"},
      {name:"Smeargle",method:"Grass",   levels:"20,22", rate:"10%"},
      {name:"Unown",   method:"Cave",    levels:"5",     rate:"100%", note:"After solving puzzles; 26 letters + ? and !"},
      {name:"Poliwag", method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Magikarp",method:"Old Rod", levels:"10",    rate:"85%"},
    ],
    items:[
      {name:"Potion",          hidden:false, note:"NE buildings area"},
      {name:"Great Ball",      hidden:true,  note:"Near E gate, lone rock S of path"},
      {name:"TinyMushroom",    hidden:true,  note:"Two steps E of W pond"},
      {name:"Unown Report",    hidden:false, note:"From Scientist after solving first puzzle"},
      {name:"Nugget",          hidden:true,  note:"SW hill via Union Cave"},
      {name:"Big Mushroom",    hidden:true,  note:"SW hill via Union Cave"},
      {name:"Oran Berry",      hidden:false, note:"North chamber hidden room"},
      {name:"Pecha Berry",     hidden:false, note:"North chamber hidden room"},
      {name:"Heal Powder",     hidden:false, note:"North chamber hidden room"},
      {name:"EnergyPowder",    hidden:false, note:"North chamber hidden room"},
    ],
    trainers:[] },

  { part:"Part 4", id:"union-cave", name:"Union Cave",
    floors:[
      { label:"1F", pokemon:[
          {name:"Rattata",   method:"Cave", levels:"4–6", rate:"HG 10%/SS 40%"},
          {name:"Sandshrew", method:"Cave", levels:"6",   rate:"30%", hgOnly:true},
          {name:"Zubat",     method:"Cave", levels:"5,7", rate:"25%"},
          {name:"Geodude",   method:"Cave", levels:"6",   rate:"30%"},
          {name:"Onix",      method:"Cave", levels:"6",   rate:"5%"},
          {name:"Magikarp",  method:"Old Rod", levels:"10", rate:"85%"},
          {name:"Goldeen",   method:"Old Rod", levels:"10", rate:"15%"},
        ], items:[
          {name:"X Attack",    hidden:false, note:"NW area"},
          {name:"Great Ball",  hidden:true,  note:"Between two rocks SE of Hiker Russel"},
          {name:"Great Ball",  hidden:false, note:"E-central near Firebreather Bill"},
          {name:"Potion",      hidden:false, note:"W-central, N side of largest pool"},
          {name:"Parlyz Heal", hidden:true,  note:"E of largest pool on a stalagmite"},
          {name:"Awakening",   hidden:false, note:"SE near Route 33 exit"},
        ], trainers:[
          {class:"Firebreather", name:"Ray",    team:[{name:"Vulpix",level:9}]},
          {class:"Hiker",        name:"Daniel", team:[{name:"Onix",level:11}]},
          {class:"Hiker",        name:"Russel", team:[{name:"Geodude",level:4},{name:"Geodude",level:6},{name:"Geodude",level:8}]},
          {class:"Firebreather", name:"Bill",   team:[{name:"Koffing",level:6},{name:"Koffing",level:6}]},
          {class:"Poké Maniac",  name:"Larry",  team:[{name:"Slowpoke",level:11}]},
        ] },
      { label:"B1F", pokemon:[
          {name:"Rattata",   method:"Cave", levels:"6–8", rate:"HG 5%/SS 35%"},
          {name:"Sandshrew", method:"Cave", levels:"8",   rate:"30%", hgOnly:true},
          {name:"Zubat",     method:"Cave", levels:"7,9", rate:"25%"},
          {name:"Geodude",   method:"Cave", levels:"8",   rate:"30%"},
          {name:"Onix",      method:"Cave", levels:"8",   rate:"10%"},
          {name:"Magikarp",  method:"Old Rod", levels:"10", rate:"85%"},
          {name:"Goldeen",   method:"Old Rod", levels:"10", rate:"15%"},
        ], items:[
          {name:"X Defend",         hidden:false, note:"N, N of stairs from 1F"},
          {name:"X Speed",          hidden:true,  note:"N, lone rock near S wall"},
          {name:"TM39 Rock Tomb",   hidden:false, note:"N, SW corner"},
        ], trainers:[
          {class:"Hiker",       name:"Leonard", note:"N section", team:[{name:"Geodude",level:23},{name:"Machop",level:25}]},
          {class:"Hiker",       name:"Phillip", note:"N section", team:[{name:"Geodude",level:23},{name:"Graveler",level:25}]},
        ] },
    ] },

  { part:"Part 4", id:"route-33", name:"Route 33",
    pokemon:[
      {name:"Rattata",  method:"Grass", levels:"6–7",   rate:"HG 40%/SS 10%", time:"morning"},
      {name:"Rattata",  method:"Grass", levels:"4–7",   rate:"HG 45%/SS 15%", time:"day"},
      {name:"Rattata",  method:"Grass", levels:"6–7",   rate:"HG 60%/SS 30%", time:"night"},
      {name:"Ekans",    method:"Grass", levels:"7",     rate:"30%",                 ssOnly:true},
      {name:"Spearow",  method:"Grass", levels:"6",     rate:"20%", time:"morning"},
      {name:"Spearow",  method:"Grass", levels:"6",     rate:"20%", time:"day"},
      {name:"Hoppip",   method:"Grass", levels:"6,8",   rate:"35%", time:"morning"},
      {name:"Hoppip",   method:"Grass", levels:"6,8",   rate:"35%", time:"day"},
      {name:"Zubat",    method:"Grass", levels:"4",     rate:"5%",  time:"morning"},
      {name:"Zubat",    method:"Grass", levels:"4,6,8", rate:"40%", time:"night"},
    ],
    items:[
      {name:"Pnk Apricorn",hidden:false, note:"SE of Union Cave exit, W tree (daily)"},
      {name:"Blk Apricorn",hidden:false, note:"SE of Union Cave exit, E tree (daily)"},
    ],
    trainers:[
      {class:"Hiker", name:"Anthony",
       team:[{name:"Geodude",level:11},{name:"Machop",level:11}],
       rematch:[{team:[{name:"Geodude",level:12},{name:"Machop",level:14}]},{team:[{name:"Graveler",level:18},{name:"Machop",level:18}]},{team:[{name:"Graveler",level:21},{name:"Machoke",level:22}]}]},
    ] },

  // ─── PART 5 ────────────────────────────────────────────────────────────────
  { part:"Part 5", id:"azalea-town", name:"Azalea Town",
    note:"Team Rocket is in Slowpoke Well. Kurt makes Apricorn Balls — give him Apricorns.",
    pokemon:[],
    items:[
      {name:"Full Heal",    hidden:true,  note:"On pile of logs in front of Charcoal Kiln"},
      {name:"Wht Apricorn", hidden:false, note:"Behind Kurt's house NW tree (daily)"},
      {name:"Fast Ball",    hidden:false, note:"From Kurt after chasing Team Rocket away"},
      {name:"TM89 U-turn",  hidden:false, note:"From Gym Leader Bugsy after defeating him"},
    ],
    trainers:[
      {class:"Rival", name:"Silver",
       note:"Rival Battle 2 — battles you at the W side of town after Bugsy. Team varies by starter.",
       team:[{name:"Gastly",level:14},{name:"Zubat",level:16},{name:"Quilava",level:18}]},
    ] },

  { part:"Part 5", id:"slowpoke-well", name:"Slowpoke Well",
    note:"Team Rocket has been cutting Slowpoke Tails for profit. Defeat them all including Executive Proton.",
    floors:[
      { label:"Entrance", pokemon:[], items:[], trainers:[] },
      { label:"B1F", pokemon:[
          {name:"Zubat",    method:"Cave",    levels:"5–8", rate:"85%"},
          {name:"Slowpoke", method:"Cave",    levels:"6,8", rate:"15%"},
          {name:"Magikarp", method:"Old Rod", levels:"10",  rate:"85%"},
          {name:"Goldeen",  method:"Old Rod", levels:"10",  rate:"15%"},
        ], items:[
          {name:"Super Potion",    hidden:false, note:"NE ridge"},
          {name:"Super Potion",    hidden:true,  note:"Lower central area, lone rock"},
        ], trainers:[
          {class:"Team Rocket Grunt",name:"", team:[{name:"Rattata",level:9},{name:"Rattata",level:9}]},
          {class:"Team Rocket Grunt",name:"", team:[{name:"Zubat",level:9},{name:"Ekans",level:11}]},
          {class:"Team Rocket Grunt",name:"", team:[{name:"Rattata",level:7},{name:"Zubat",level:9},{name:"Zubat",level:9}]},
          {class:"Executive",       name:"Proton", note:"Team Rocket Executive",
           team:[{name:"Zubat",level:8},{name:"Koffing",level:12}]},
        ] },
    ] },

  { part:"Part 5", id:"azalea-gym", name:"Azalea Gym",
    note:"Specialty: Bug. Weak to Fire, Flying, Rock.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Bug Catcher",name:"Al",       team:[{name:"Caterpie",level:12},{name:"Weedle",level:12}]},
      {class:"Bug Catcher",name:"Benny",    team:[{name:"Weedle",level:7},{name:"Kakuna",level:9},{name:"Beedrill",level:12}]},
      {class:"Bug Catcher",name:"Josh",     team:[{name:"Paras",level:13}]},
      {class:"Twins",      name:"Amy & Mimi",team:[{name:"Ledyba",level:10},{name:"Spinarak",level:10}]},
      {class:"Leader",     name:"Bugsy",    note:"Hive Badge · TM89 U-turn",
       team:[{name:"Scyther",level:17},{name:"Metapod",level:15},{name:"Kakuna",level:15}]},
    ] },

  { part:"Part 5", id:"ilex-forest", name:"Ilex Forest",
    note:"Find two lost Farfetch'd to get HM01 Cut. Move Tutor teaches Headbutt here.",
    pokemon:[
      {name:"Caterpie",  method:"Grass",   levels:"5–6", rate:"50%", time:"morning", hgOnly:true},
      {name:"Caterpie",  method:"Grass",   levels:"5–6", rate:"60%", time:"day",     hgOnly:true},
      {name:"Metapod",   method:"Grass",   levels:"5",   rate:"30%", time:"morning", hgOnly:true},
      {name:"Metapod",   method:"Grass",   levels:"5–6", rate:"30%", time:"day",     hgOnly:true},
      {name:"Weedle",    method:"Grass",   levels:"5–6", rate:"50%", time:"morning", ssOnly:true},
      {name:"Weedle",    method:"Grass",   levels:"5–6", rate:"60%", time:"day",     ssOnly:true},
      {name:"Kakuna",    method:"Grass",   levels:"5–6", rate:"30%", time:"morning", ssOnly:true},
      {name:"Kakuna",    method:"Grass",   levels:"5–6", rate:"30%", time:"day",     ssOnly:true},
      {name:"Paras",     method:"Grass",   levels:"5–6", rate:"15%", time:"morning"},
      {name:"Paras",     method:"Grass",   levels:"5–6", rate:"5%",  time:"day"},
      {name:"Paras",     method:"Grass",   levels:"5–6", rate:"15%", time:"night"},
      {name:"Zubat",     method:"Grass",   levels:"5",   rate:"5%",  time:"morning"},
      {name:"Zubat",     method:"Grass",   levels:"5",   rate:"5%",  time:"day"},
      {name:"Zubat",     method:"Grass",   levels:"5,6", rate:"25%", time:"night"},
      {name:"Oddish",    method:"Grass",   levels:"5–6", rate:"60%", time:"night"},
      {name:"Hoothoot",  method:"Headbutt",levels:"3–5", rate:"60%", note:"Group A trees"},
      {name:"Caterpie",  method:"Headbutt",levels:"3–5", rate:"30%", note:"Group A trees", hgOnly:true},
      {name:"Weedle",    method:"Headbutt",levels:"3–5", rate:"30%", note:"Group A trees", ssOnly:true},
      {name:"Metapod",   method:"Headbutt",levels:"3–5", rate:"10%", note:"Group A trees", hgOnly:true},
      {name:"Kakuna",    method:"Headbutt",levels:"3–5", rate:"10%", note:"Group A trees", ssOnly:true},
      {name:"Hoothoot",  method:"Headbutt",levels:"6–8", rate:"50%", note:"Group B trees"},
      {name:"Butterfree",method:"Headbutt",levels:"6–8", rate:"10%", note:"Group B trees", hgOnly:true},
      {name:"Beedrill",  method:"Headbutt",levels:"6–8", rate:"10%", note:"Group B trees", ssOnly:true},
      {name:"Noctowl",   method:"Headbutt",levels:"6–8", rate:"10%", note:"Group B trees"},
      {name:"Pineco",    method:"Headbutt",levels:"6–8", rate:"30%", note:"Group B trees"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",  rate:"85%"},
      {name:"Poliwag",   method:"Old Rod", levels:"10",  rate:"15%"},
    ],
    items:[
      {name:"Revive",       hidden:false, note:"SE dead-end path"},
      {name:"TinyMushroom", hidden:true,  note:"SE corner of N flowerbed"},
      {name:"HM01 Cut",     hidden:false, note:"From Charcoal Kiln owner after returning both Farfetch'd"},
      {name:"Antidote",     hidden:true,  note:"SW of pond (requires Cut)"},
      {name:"Antidote",     hidden:false, note:"E side of pond (requires Cut)"},
      {name:"X Attack",     hidden:false, note:"Dead-end E of Trainer Tips sign (requires Cut)"},
      {name:"Repel",        hidden:true,  note:"E of pond in flowerbed (requires Cut)"},
      {name:"Super Potion", hidden:true,  note:"SW alcove of N ledge (requires Cut)"},
      {name:"TinyMushroom", hidden:true,  note:"Corner opposite E-wall flowerbed (requires Cut)"},
      {name:"TinyMushroom", hidden:true,  note:"NE area, SE of S isolated tree (requires Cut)"},
      {name:"Ether",        hidden:false, note:"NE area, E of isolated trees (requires Cut)"},
      {name:"Ether",        hidden:true,  note:"NE area, W side of N isolated tree (requires Cut)"},
      {name:"Full Heal",    hidden:true,  note:"NE area, W of N flowerbed (requires Cut)"},
    ],
    trainers:[] },

  { part:"Part 5", id:"route-34", name:"Route 34",
    note:"Pokémon Day Care is on the north side. Ditto here is useful for breeding.",
    pokemon:[
      {name:"Rattata",   method:"Grass",   levels:"11,13", rate:"35%"},
      {name:"Abra",      method:"Grass",   levels:"10",    rate:"10%"},
      {name:"Drowzee",   method:"Grass",   levels:"10,12", rate:"50%"},
      {name:"Ditto",     method:"Grass",   levels:"10",    rate:"5%"},
      {name:"Hoothoot",  method:"Headbutt",levels:"9–10",  rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt",levels:"9–10",  rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt",levels:"9–10",  rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt",levels:"11–12", rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt",levels:"11–12", rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt",levels:"11–12", rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt",levels:"11–12", rate:"20%", note:"Group B trees"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Krabby",    method:"Old Rod", levels:"10",    rate:"15%"},
    ],
    items:[
      {name:"TM12 Taunt",   hidden:false, note:"From woman in the gate"},
      {name:"Super Potion", hidden:true,  note:"SE of Day Care, N of grass patch in tree"},
      {name:"TM63 Embargo", hidden:false, note:"Northernmost grass patch"},
    ],
    trainers:[
      {class:"Youngster",  name:"Samuel",  team:[{name:"Rattata",level:7},{name:"Sandshrew",level:10},{name:"Spearow",level:8},{name:"Spearow",level:8}]},
      {class:"Pokéfan",    name:"Brandon", team:[{name:"Snubbull",level:13},{name:"Mareep",level:13}]},
      {class:"Picnicker",  name:"Gina",    team:[{name:"Hoppip",level:9},{name:"Hoppip",level:9},{name:"Bulbasaur",level:12}],
       rematch:[{team:[{name:"Hoppip",level:15},{name:"Bulbasaur",level:18}]},{team:[{name:"Skiploom",level:20},{name:"Ivysaur",level:22}]}]},
      {class:"Youngster",  name:"Ian",     team:[{name:"Mankey",level:10},{name:"Diglett",level:12}],
       rematch:[{team:[{name:"Mankey",level:15},{name:"Diglett",level:17}]},{team:[{name:"Primeape",level:20},{name:"Dugtrio",level:20}]}]},
      {class:"Policeman",  name:"Keith",   note:"Night only", team:[{name:"Growlithe",level:17}]},
      {class:"Camper",     name:"Todd",    team:[{name:"Psyduck",level:14}],
       rematch:[{team:[{name:"Psyduck",level:18}]},{team:[{name:"Golduck",level:25}]}]},
    ] },

  // ─── PART 6 ────────────────────────────────────────────────────────────────
  { part:"Part 6", id:"goldenrod-city", name:"Goldenrod City",
    note:"Largest city in Johto. Dept Store, Radio Tower, Game Corner, Goldenrod Tunnel.",
    pokemon:[
      {name:"Machop", method:"Trade", levels:"Varies", rate:"One", note:"Trade a Drowzee at Dept Store 5F"},
    ],
    items:[
      {name:"Ultra Ball",     hidden:false, note:"Dept Store B1F SE room (from Black Belt)"},
      {name:"Burn Heal",      hidden:false, note:"Dept Store B1F NW area (from Black Belt)"},
      {name:"Ether",          hidden:false, note:"Dept Store B1F S-central (from Black Belt)"},
      {name:"Antidote",       hidden:true,  note:"Dept Store B1F, lone box SE of elevator"},
      {name:"Super Potion",   hidden:true,  note:"Dept Store B1F SW corner of right crate"},
      {name:"Parlyz Heal",    hidden:true,  note:"Dept Store B1F SW corner of W crate"},
      {name:"TM27 Return",    hidden:false, note:"Dept Store 5F (Sundays; friendly lead Pokémon)"},
      {name:"TM21 Frustration",hidden:false,note:"Dept Store 5F (Sundays; unfriendly lead Pokémon)"},
      {name:"Macho Brace",    hidden:false, note:"Held by Muscle the traded Machop"},
      {name:"Bicycle",        hidden:false, note:"From the Bike Shop in the SE district"},
      {name:"Super Potion",   hidden:true,  note:"S of Bike Shop, NW of lamppost"},
      {name:"Radio Card",     hidden:false, note:"Radio Tower 1F, from passing the quiz"},
      {name:"Blue Card",      hidden:false, note:"Radio Tower 2F, from Buena"},
      {name:"TM45 Attract",   hidden:false, note:"From Gym Leader Whitney after defeating her"},
      {name:"SquirtBottle",   hidden:false, note:"From Flower Shop after earning Plain Badge"},
      {name:"Fashion Case",   hidden:false, note:"From Lyra/Ethan upon entering Goldenrod Tunnel"},
    ],
    trainers:[
      {class:"Poké Maniac",name:"Donald", note:"Goldenrod Tunnel (N)", team:[{name:"Slowpoke",level:11},{name:"Slowpoke",level:11}]},
      {class:"Super Nerd", name:"Teru",   note:"Goldenrod Tunnel (N)", team:[{name:"Magnemite",level:7},{name:"Magnemite",level:7},{name:"Magnemite",level:9},{name:"Voltorb",level:11}]},
      {class:"Poké Maniac",name:"Issac",  note:"Goldenrod Tunnel (S)", team:[{name:"Lickitung",level:12}]},
      {class:"Super Nerd", name:"Eric",   note:"Goldenrod Tunnel (S)", team:[{name:"Grimer",level:11},{name:"Grimer",level:11}]},
    ] },

  { part:"Part 6", id:"goldenrod-gym", name:"Goldenrod Gym",
    note:"Specialty: Normal. Weak to Fighting only. Whitney's Miltank with Rollout is notorious.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Beauty", name:"Victoria", team:[{name:"Sentret",level:9},{name:"Sentret",level:13},{name:"Sentret",level:16}]},
      {class:"Beauty", name:"Samantha", team:[{name:"Meowth",level:16},{name:"Meowth",level:16}]},
      {class:"Lass",   name:"Carrie",   team:[{name:"Snubbull",level:17}]},
      {class:"Lass",   name:"Cathy",    team:[{name:"Jigglypuff",level:15},{name:"Jigglypuff",level:15},{name:"Jigglypuff",level:15}]},
      {class:"Leader", name:"Whitney",  note:"Plain Badge · TM45 Attract",
       team:[{name:"Clefairy",level:17},{name:"Miltank",level:19}]},
    ] },

  // ─── PART 7 ────────────────────────────────────────────────────────────────
  { part:"Part 7", id:"route-35", name:"Route 35",
    note:"Deliver Kenya the Spearow (from S gate guard) to the sleepy man on Route 31 for TM44 Rest + HP Up.",
    pokemon:[
      {name:"Nidoran♀", method:"Grass",   levels:"12",   rate:"30%"},
      {name:"Nidoran♂", method:"Grass",   levels:"12",   rate:"30%"},
      {name:"Drowzee",  method:"Grass",   levels:"14",   rate:"20%"},
      {name:"Abra",     method:"Grass",   levels:"10",   rate:"10%"},
      {name:"Ditto",    method:"Grass",   levels:"10",   rate:"4%"},
      {name:"Yanma",    method:"Grass",   levels:"12",   rate:"1%"},
      {name:"Pidgey",   method:"Grass",   levels:"14",   rate:"5%",  time:"morning"},
      {name:"Pidgey",   method:"Grass",   levels:"14",   rate:"5%",  time:"day"},
      {name:"Hoothoot", method:"Grass",   levels:"14",   rate:"5%",  time:"night"},
      {name:"Hoothoot", method:"Headbutt",levels:"9–10", rate:"50%", note:"Group A trees"},
      {name:"Pineco",   method:"Headbutt",levels:"9–10", rate:"30%", note:"Group A trees"},
      {name:"Exeggcute",method:"Headbutt",levels:"9–10", rate:"20%", note:"Group A trees"},
      {name:"Hoothoot", method:"Headbutt",levels:"10–11",rate:"50%", note:"Group B trees"},
      {name:"Spinarak", method:"Headbutt",levels:"13–14",rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",   method:"Headbutt",levels:"13–14",rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute",method:"Headbutt",levels:"10–11",rate:"20%", note:"Group B trees"},
      {name:"Magikarp", method:"Old Rod", levels:"10",   rate:"85%"},
      {name:"Poliwag",  method:"Old Rod", levels:"10",   rate:"15%"},
    ],
    items:[
      {name:"Grass Mail",    hidden:false, note:"Held by Kenya the Spearow (from gate guard Webster)"},
      {name:"Parlyz Heal",   hidden:false, note:"W of tall grass in tree grove corner"},
      {name:"TM66 Payback",  hidden:false, note:"SE corner clearing"},
      {name:"HP Up",         hidden:false, note:"From Webster (S gate guard) after delivering Kenya to Route 31"},
    ],
    trainers:[
      {class:"Picnicker",   name:"Kim",    team:[{name:"Vulpix",level:15}]},
      {class:"Camper",      name:"Elliot", team:[{name:"Sandshrew",level:13},{name:"Marill",level:15}]},
      {class:"Picnicker",   name:"Brooke", team:[{name:"Pikachu",level:16}]},
      {class:"Camper",      name:"Ivan",   team:[{name:"Diglett",level:10},{name:"Diglett",level:14},{name:"Zubat",level:10}]},
      {class:"Juggler",     name:"Irwin",  team:[{name:"Voltorb",level:2},{name:"Voltorb",level:6},{name:"Voltorb",level:10},{name:"Voltorb",level:14}],
       rematch:[{team:[{name:"Voltorb",level:10},{name:"Voltorb",level:14},{name:"Electrode",level:16}]},{team:[{name:"Electrode",level:23},{name:"Electrode",level:23}]}]},
      {class:"Firebreather",name:"Walt",   team:[{name:"Magmar",level:11},{name:"Magmar",level:16}],
       rematch:[{team:[{name:"Magmar",level:20}]},{team:[{name:"Magmar",level:24}]},{team:[{name:"Magmar",level:28}]}]},
      {class:"Policeman",   name:"Dirk",   note:"Night only", team:[{name:"Growlithe",level:14},{name:"Growlithe",level:14}]},
      {class:"Bug Catcher", name:"Arnie",  team:[{name:"Venonat",level:15}],
       rematch:[{team:[{name:"Venonat",level:18}]},{team:[{name:"Venomoth",level:22}]}]},
      {class:"Bird Keeper", name:"Bryan",  team:[{name:"Pidgey",level:12},{name:"Pidgeotto",level:14}]},
    ] },

  { part:"Part 7", id:"pokeathlon-dome", name:"Pokéathlon Dome",
    note:"Athletic competitions west of Route 35. Unlocks after defeating Whitney. Athlete Shop sells evolution stones/items daily for Athlete Points (earn AP by competing). Vending machine inside sells Fresh Water/Soda Pop/Lemonade with money or AP.",
    pokemon:[],
    items:[
      {name:"PP Up",       hidden:true,  note:"E side of building near smaller fence"},
      {name:"Protein",     hidden:true,  note:"S of Aprijuice stand, S grass field"},
      {name:"Apriblender", hidden:false, note:"From attendant at Aprijuice stand"},
      {name:"Jersey",      hidden:false, note:"From Whitney at reception desk (first visit)"},
      {name:"Rare Candy",  hidden:false, note:"From woman outside after 1,000 dashes"},
      {name:"Rare Candy",  hidden:false, note:"From elderly man inside after 1,000 jumps"},
      {name:"Rare Candy",  hidden:false, note:"From blond man inside after 2,000 tackles"},
      {name:"Dragon Scale",  hidden:false, note:"Athlete Shop: Fri 2,500 pts (also Wed/Fri post-Nat Dex) — for Seadra → Kingdra (trade)"},
      {name:"Metal Coat",    hidden:false, note:"Athlete Shop: Fri 2,500 pts (also Tue/Fri/Sat post-Nat Dex) — for Scyther → Scizor / Onix → Steelix (trade)"},
      {name:"King's Rock",   hidden:false, note:"Athlete Shop: Sun 3,000 pts (also Mon/Thu/Sun post-Nat Dex) — for Poliwhirl → Politoed / Slowpoke → Slowking (trade)"},
      {name:"Fire Stone",    hidden:false, note:"Athlete Shop: Tue 2,500 pts"},
      {name:"Water Stone",   hidden:false, note:"Athlete Shop: Wed 2,500 pts"},
      {name:"Thunder Stone", hidden:false, note:"Athlete Shop: Thu 2,500 pts"},
      {name:"Leaf Stone",    hidden:false, note:"Athlete Shop: Sat 2,500 pts"},
      {name:"Moon Stone",    hidden:false, note:"Athlete Shop: Mon 3,000 pts"},
      {name:"Sun Stone",     hidden:false, note:"Athlete Shop: post-Nat Dex only — Mon/Fri/Sun 3,000 pts"},
      {name:"Shiny Stone",   hidden:false, note:"Athlete Shop: post-Nat Dex only — Mon/Wed/Thu/Sat/Sun 3,000 pts — for Togekiss / Roserade"},
      {name:"Dusk Stone",    hidden:false, note:"Athlete Shop: post-Nat Dex only — Mon/Tue/Thu/Fri/Sat 3,000 pts — for Honchkrow / Mismagius"},
      {name:"Dawn Stone",    hidden:false, note:"Athlete Shop: post-Nat Dex only — Tue/Wed/Fri/Sat/Sun 3,000 pts — for Gallade / Froslass"},
      {name:"Heart Scale",   hidden:false, note:"Athlete Shop: Wed/Sun 1,000 pts — for Move Reminder"},
    ],
    trainers:[] },

  { part:"Part 7", id:"national-park", name:"National Park",
    note:"Bug-Catching Contest: Tue/Thu/Sat, 10am–3:30pm. See the Bug-Catching Contest entry below for contest Pokémon and prizes.",
    pokemon:[
      {name:"Caterpie",  method:"Grass",    levels:"10,12", rate:"50%", time:"morning", hgOnly:true},
      {name:"Caterpie",  method:"Grass",    levels:"10",    rate:"30%", time:"day",     hgOnly:true},
      {name:"Metapod",   method:"Grass",    levels:"10",    rate:"30%", time:"morning", hgOnly:true},
      {name:"Metapod",   method:"Grass",    levels:"10",    rate:"30%", time:"day",     hgOnly:true},
      {name:"Weedle",    method:"Grass",    levels:"10,12", rate:"50%", time:"morning", ssOnly:true},
      {name:"Weedle",    method:"Grass",    levels:"10",    rate:"30%", time:"day",     ssOnly:true},
      {name:"Kakuna",    method:"Grass",    levels:"10",    rate:"30%", time:"morning", ssOnly:true},
      {name:"Kakuna",    method:"Grass",    levels:"10",    rate:"30%", time:"day",     ssOnly:true},
      {name:"Pidgey",    method:"Grass",    levels:"10–14", rate:"20%", time:"morning"},
      {name:"Pidgey",    method:"Grass",    levels:"12,14", rate:"15%", time:"day"},
      {name:"Sunkern",   method:"Grass",    levels:"10,12", rate:"25%", time:"day"},
      {name:"Hoothoot",  method:"Grass",    levels:"10–14", rate:"100%",time:"night"},
      {name:"Hoothoot",  method:"Headbutt", levels:"10–12", rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt", levels:"10–12", rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt", levels:"10–12", rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt", levels:"13–15", rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt", levels:"13–15", rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt", levels:"13–15", rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt", levels:"13–15", rate:"20%", note:"Group B trees"},
    ],
    items:[
      {name:"Quick Claw",   hidden:false, note:"SE area from woman with Persian"},
      {name:"Soothe Bell",  hidden:false, note:"Outside fence, N of E gate"},
      {name:"TM28 Dig",     hidden:false, note:"Outside fence, SW tree-lined path end"},
      {name:"Full Heal",    hidden:true,  note:"Two steps N of smaller S fountain"},
      {name:"Full Heal",    hidden:true,  note:"Outside fence, N of S gate narrow path"},
      {name:"Sport Ball ×20",hidden:false,note:"Loaned for Bug-Catching Contest (unused balls returned)"},
      {name:"Sun Stone",    hidden:false, note:"1st place Bug Contest prize (pre-National Dex)"},
    ],
    trainers:[
      {class:"Pokéfan",   name:"Beverly", team:[{name:"Snubbull",level:16}],
       rematch:[{team:[{name:"Snubbull",level:20}]},{team:[{name:"Granbull",level:25}]}]},
      {class:"Pokéfan",   name:"William", team:[{name:"Raichu",level:16}]},
      {class:"School Kid",name:"Jack",    team:[{name:"Oddish",level:12},{name:"Voltorb",level:15}],
       rematch:[{team:[{name:"Gloom",level:20},{name:"Electrode",level:22}]}]},
      {class:"Lass",      name:"Krise",   team:[{name:"Oddish",level:14},{name:"Cubone",level:17}],
       rematch:[{team:[{name:"Oddish",level:18},{name:"Marowak",level:20}]}]},
    ] },

  { part:"Part 7", id:"bug-catching-contest", name:"Bug-Catching Contest",
    note:"Held Tue/Thu/Sat in National Park, 10am–3:30pm. No entry fee. Given 20 Sport Balls; only one Pokémon from your party allowed. Contest ends when all balls are used, 20 min elapsed, or you leave. Only the best catch is judged; runner-up kept after judging. Post-National Dex: Tuesday still uses the pre-Nat Dex pool (levels 24–36); Thu/Sat switch to the Gen IV pool below.",
    floors:[
      { label:"Pre-National Dex (Tue/Thu/Sat)", trainers:[], items:[
          {name:"Sun Stone",    hidden:false, note:"1st place prize (also listed in National Park entry)"},
          {name:"Everstone",    hidden:false, note:"2nd place prize"},
          {name:"Sitrus Berry", hidden:false, note:"3rd place prize"},
          {name:"Shed Shell",   hidden:false, note:"Consolation prize"},
        ], pokemon:[
          {name:"Caterpie",   method:"Bug Contest", levels:"7–18",  rate:"20%"},
          {name:"Weedle",     method:"Bug Contest", levels:"7–18",  rate:"20%"},
          {name:"Metapod",    method:"Bug Contest", levels:"9–18",  rate:"10%"},
          {name:"Kakuna",     method:"Bug Contest", levels:"9–18",  rate:"10%"},
          {name:"Paras",      method:"Bug Contest", levels:"10–17", rate:"10%"},
          {name:"Venonat",    method:"Bug Contest", levels:"10–16", rate:"10%"},
          {name:"Butterfree", method:"Bug Contest", levels:"12–15", rate:"5%"},
          {name:"Beedrill",   method:"Bug Contest", levels:"12–15", rate:"5%"},
          {name:"Scyther",    method:"Bug Contest", levels:"13–14", rate:"5%"},
          {name:"Pinsir",     method:"Bug Contest", levels:"13–14", rate:"5%"},
        ]},
      { label:"Post-National Dex (Thu/Sat)", trainers:[], items:[
          {name:"Random Evolution Stone", hidden:false, note:"1st place prize (Fire/Water/Thunder/Leaf/Moon/Sun/Shiny/Dusk/Dawn/Oval — random)"},
          {name:"Everstone",    hidden:false, note:"2nd place prize"},
          {name:"Sitrus Berry", hidden:false, note:"3rd place prize"},
          {name:"Shed Shell",   hidden:false, note:"Consolation prize"},
        ], pokemon:[
          {name:"Scyther",    method:"Bug Contest", levels:"27–28", rate:"5%"},
          {name:"Pinsir",     method:"Bug Contest", levels:"27–28", rate:"5%"},
          {name:"Wurmple",    method:"Bug Contest", levels:"24–36", rate:"20%"},
          {name:"Silcoon",    method:"Bug Contest", levels:"24–36", rate:"10%", note:"Thursday only"},
          {name:"Beautifly",  method:"Bug Contest", levels:"25–32", rate:"5%",  note:"Saturday only"},
          {name:"Cascoon",    method:"Bug Contest", levels:"24–36", rate:"10%", note:"Saturday only"},
          {name:"Dustox",     method:"Bug Contest", levels:"25–32", rate:"5%",  note:"Thursday only"},
          {name:"Nincada",    method:"Bug Contest", levels:"26–36", rate:"20%"},
          {name:"Volbeat",    method:"Bug Contest", levels:"26–36", rate:"10%", note:"Thursday only"},
          {name:"Illumise",   method:"Bug Contest", levels:"26–36", rate:"10%", note:"Saturday only"},
          {name:"Kricketot",  method:"Bug Contest", levels:"27–30", rate:"10%"},
          {name:"Kricketune", method:"Bug Contest", levels:"27–30", rate:"10%"},
          {name:"Combee",     method:"Bug Contest", levels:"27–34", rate:"5%"},
        ]},
    ] },

  { part:"Part 7", id:"route-36", name:"Route 36",
    note:"Sudowoodo (Lv20, Rock) blocks the road. Use SquirtBottle to battle it. Gives Berry Pots + HM06 Rock Smash.",
    pokemon:[
      {name:"Nidoran♀",  method:"Grass",  levels:"12–13", rate:"30%"},
      {name:"Nidoran♂",  method:"Grass",  levels:"12–13", rate:"30%"},
      {name:"Growlithe",  method:"Grass",  levels:"13",    rate:"10%", time:"morning", hgOnly:true},
      {name:"Growlithe",  method:"Grass",  levels:"13",    rate:"10%", time:"night",   hgOnly:true},
      {name:"Growlithe",  method:"Grass",  levels:"13,15", rate:"15%", time:"day",     hgOnly:true},
      {name:"Vulpix",     method:"Grass",  levels:"13",    rate:"10%", time:"morning", ssOnly:true},
      {name:"Vulpix",     method:"Grass",  levels:"13",    rate:"10%", time:"night",   ssOnly:true},
      {name:"Vulpix",     method:"Grass",  levels:"13–15", rate:"15%", time:"day",     ssOnly:true},
      {name:"Pidgey",     method:"Grass",  levels:"12–15", rate:"25%", time:"morning"},
      {name:"Pidgey",     method:"Grass",  levels:"13",    rate:"20%", time:"day"},
      {name:"Stantler",   method:"Grass",  levels:"13",    rate:"5%"},
      {name:"Hoothoot",   method:"Grass",  levels:"13–15", rate:"25%", time:"night"},
      {name:"Sudowoodo",  method:"Event",  levels:"20",    rate:"One", warn:true, note:"Use SquirtBottle to trigger battle"},
      {name:"Hoothoot",   method:"Headbutt",levels:"4–5",  rate:"50%", note:"Group A trees"},
      {name:"Pineco",     method:"Headbutt",levels:"4–5",  rate:"30%", note:"Group A trees"},
      {name:"Exeggcute",  method:"Headbutt",levels:"4–5",  rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",   method:"Headbutt",levels:"6–7",  rate:"50%", note:"Group B trees"},
      {name:"Spinarak",   method:"Headbutt",levels:"6–7",  rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",     method:"Headbutt",levels:"6–7",  rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute",  method:"Headbutt",levels:"6–7",  rate:"20%", note:"Group B trees"},
    ],
    items:[
      {name:"Blu Apricorn",   hidden:false, note:"NE of National Park gate, tree (daily)"},
      {name:"Awakening",      hidden:true,  note:"N of tall grass, SW of 3rd tree from W"},
      {name:"Berry Pots",     hidden:false, note:"From Floria after removing Sudowoodo"},
      {name:"Oran Berry ×3",  hidden:false, note:"From Floria after removing Sudowoodo"},
      {name:"Pecha Berry ×3", hidden:false, note:"From Floria after removing Sudowoodo"},
      {name:"HM06 Rock Smash",hidden:false, note:"From man E of Sudowoodo's location"},
      {name:"Hard Stone",     hidden:false, note:"From Arthur (Thu)"},
      {name:"Hyper Potion",   hidden:false, note:"NW of Sudowoodo's location, SW of grove"},
    ],
    trainers:[
      {class:"Psychic",    name:"Mark", team:[{name:"Abra",level:14},{name:"Abra",level:14},{name:"Kadabra",level:16}]},
      {class:"School Kid", name:"Alan", team:[{name:"Tangela",level:17}],
       rematch:[{team:[{name:"Tangela",level:20}]},{team:[{name:"Tangela",level:25}]}]},
    ] },

  { part:"Part 7", id:"route-37", name:"Route 37",
    pokemon:[
      {name:"Stantler",  method:"Grass",  levels:"15",    rate:"30%"},
      {name:"Pidgey",    method:"Grass",  levels:"13–15", rate:"HG 60%/SS 20%", time:"morning"},
      {name:"Pidgey",    method:"Grass",  levels:"13–15", rate:"50%",            time:"day"},
      {name:"Pidgeotto", method:"Grass",  levels:"15",    rate:"5%",  time:"day"},
      {name:"Growlithe", method:"Grass",  levels:"14",    rate:"10%", time:"morning", hgOnly:true},
      {name:"Growlithe", method:"Grass",  levels:"14",    rate:"10%", time:"night",   hgOnly:true},
      {name:"Growlithe", method:"Grass",  levels:"14–15", rate:"15%", time:"day",     hgOnly:true},
      {name:"Vulpix",    method:"Grass",  levels:"14",    rate:"10%", time:"morning", ssOnly:true},
      {name:"Vulpix",    method:"Grass",  levels:"14",    rate:"10%", time:"night",   ssOnly:true},
      {name:"Vulpix",    method:"Grass",  levels:"14–15", rate:"15%", time:"day",     ssOnly:true},
      {name:"Spinarak",  method:"Grass",  levels:"13,15", rate:"40%", time:"night",   hgOnly:true},
      {name:"Ledyba",    method:"Grass",  levels:"13,15", rate:"40%", time:"morning", ssOnly:true},
      {name:"Hoothoot",  method:"Grass",  levels:"13–15", rate:"HG 20%/SS 60%", time:"night"},
      {name:"Hoothoot",  method:"Headbutt",levels:"12–14",rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt",levels:"12–14",rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt",levels:"12–14",rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt",levels:"15–17",rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt",levels:"15–17",rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt",levels:"15–17",rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt",levels:"15–17",rate:"20%", note:"Group B trees"},
    ],
    items:[
      {name:"Red Apricorn",hidden:false, note:"E grove NW tree (daily)"},
      {name:"Blu Apricorn",hidden:false, note:"E grove NE tree (daily)"},
      {name:"Blk Apricorn",hidden:false, note:"E grove S tree (daily)"},
      {name:"Magnet",      hidden:false, note:"From Sunny (Sun)"},
    ],
    trainers:[
      {class:"Twins",   name:"Tori & Til",  team:[{name:"Marill",level:16},{name:"Mareep",level:16}]},
      {class:"Beauty",  name:"Callie",      note:"Double Battle with Kassandra", team:[{name:"Clefable",level:16},{name:"Wigglytuff",level:16}]},
      {class:"Beauty",  name:"Kassandra",   note:"Double Battle with Callie",    team:[{name:"Wigglytuff",level:16},{name:"Clefable",level:16}]},
      {class:"Psychic", name:"Greg",        team:[{name:"Drowzee",level:17}]},
    ] },

  // ─── PART 8 ────────────────────────────────────────────────────────────────
  { part:"Part 8", id:"ecruteak-city", name:"Ecruteak City",
    note:"After visiting Burned Tower B1F, Raikou, Entei, and Suicune begin roaming Johto.",
    pokemon:[
      {name:"Poliwag",   method:"Surf",    levels:"10–25", rate:"90%"},
      {name:"Poliwhirl", method:"Surf",    levels:"15–25", rate:"10%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Poliwag",   method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Hoothoot",  method:"Headbutt",levels:"12–14", rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt",levels:"12–14", rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt",levels:"12–14", rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt",levels:"15–17", rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt",levels:"15–17", rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt",levels:"15–17", rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt",levels:"15–17", rate:"20%", note:"Group B trees"},
    ],
    items:[
      {name:"Dowsing MCHN",    hidden:false, note:"From Ace Trainer in southernmost house"},
      {name:"Hyper Potion",    hidden:true,  note:"Empty plot in city center, N pile of dirt"},
      {name:"Rare Candy",      hidden:true,  note:"Two steps S, one step E from lake SE corner"},
      {name:"Ether",           hidden:true,  note:"Outside Burned Tower on charred logs near E wall"},
      {name:"HM03 Surf",       hidden:false, note:"From Gentleman in Dance Theater after saving Kimono Girl"},
      {name:"TM30 Shadow Ball", hidden:false, note:"From Gym Leader Morty after defeating him"},
      {name:"Ultra Ball",      hidden:true,  note:"Near W gate, second lamppost from W"},
      {name:"Clear Bell",      hidden:false, note:"From defeating Kimono Girls (HG only)", hgOnly:true},
      {name:"Tidal Bell",      hidden:false, note:"From defeating Kimono Girls (SS only)", ssOnly:true},
    ],
    trainers:[
      {class:"Team Rocket Grunt",name:"", note:"Harasses Kimono Girl in Dance Theater",
       team:[{name:"Koffing",level:12}]},
    ] },

  { part:"Part 8", id:"burned-tower", name:"Burned Tower",
    note:"Rival Battle 3 here. Raikou/Entei/Suicune flee from B1F to roam Johto.",
    floors:[
      { label:"1F", pokemon:[
          {name:"Rattata",  method:"Cave", levels:"13,15", rate:"50%"},
          {name:"Koffing",  method:"Cave", levels:"14,16", rate:"35%"},
          {name:"Zubat",    method:"Cave", levels:"14",    rate:"10%"},
          {name:"Raticate", method:"Cave", levels:"15",    rate:"5%"},
        ], items:[
          {name:"Ether",      hidden:true,  note:"Dead-end path beyond Firebreather Ned"},
          {name:"Antidote",   hidden:false, note:"Between the two holes in the floor"},
          {name:"Ultra Ball", hidden:true,  note:"One step N, one step E of southernmost breakable rock"},
          {name:"HP Up",      hidden:false, note:"SW corner (requires Rock Smash)"},
        ], trainers:[
          {class:"Firebreather",name:"Ned",     team:[{name:"Koffing",level:16},{name:"Growlithe",level:17},{name:"Koffing",level:16}]},
          {class:"Firebreather",name:"Richard", team:[{name:"Charmeleon",level:18}]},
          {class:"Rival",       name:"Silver",  note:"Rival Battle 3 — team varies by starter. Listed team is for Chikorita player.",
           team:[{name:"Gastly",level:20},{name:"Zubat",level:20},{name:"Magnemite",level:18},{name:"Quilava",level:22}]},
        ] },
      { label:"B1F", pokemon:[
          {name:"Rattata",  method:"Cave", levels:"14,16", rate:"40%", time:"morning"},
          {name:"Rattata",  method:"Cave", levels:"14",    rate:"35%", time:"day"},
          {name:"Rattata",  method:"Cave", levels:"14,16", rate:"40%", time:"night"},
          {name:"Koffing",  method:"Cave", levels:"14,16", rate:"50%"},
          {name:"Zubat",    method:"Cave", levels:"15",    rate:"5%"},
          {name:"Magmar",   method:"Cave", levels:"14",    rate:"5%",  time:"morning"},
          {name:"Magmar",   method:"Cave", levels:"14",    rate:"5%",  time:"night"},
          {name:"Magmar",   method:"Cave", levels:"16",    rate:"10%", time:"day"},
          {name:"Raikou",   method:"Event",levels:"40",    rate:"One", warn:true, note:"Seen here before fleeing — find anywhere in tall grass"},
          {name:"Entei",    method:"Event",levels:"40",    rate:"One", warn:true, note:"Seen here before fleeing — find anywhere in tall grass"},
          {name:"Suicune",  method:"Event",levels:"40",    rate:"One", warn:true, note:"Encountered at multiple story points; fixed battle at Bell Tower"},
        ], items:[
          {name:"Antidote",    hidden:true,  note:"NW area on lone rock E of pillar"},
        ], trainers:[] },
    ] },

  { part:"Part 8", id:"ecruteak-gym", name:"Ecruteak Gym",
    note:"Specialty: Ghost. Immune to Normal/Fighting. Weak to Ghost and Dark.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Medium",name:"Georgina",team:[{name:"Gastly",level:16},{name:"Gastly",level:16},{name:"Gastly",level:16},{name:"Gastly",level:16},{name:"Gastly",level:16}]},
      {class:"Medium",name:"Grace",   team:[{name:"Haunter",level:20},{name:"Haunter",level:20}]},
      {class:"Medium",name:"Edith",   team:[{name:"Haunter",level:22}]},
      {class:"Medium",name:"Martha",  team:[{name:"Gastly",level:18},{name:"Haunter",level:20},{name:"Gastly",level:20}]},
      {class:"Leader",name:"Morty",   note:"Fog Badge · TM30 Shadow Ball",
       team:[{name:"Gastly",level:21},{name:"Haunter",level:21},{name:"Gengar",level:25},{name:"Haunter",level:23}]},
    ] },

  { part:"Part 8", id:"route-38", name:"Route 38",
    pokemon:[
      {name:"Raticate",  method:"Grass",   levels:"16",    rate:"30%"},
      {name:"Rattata",   method:"Grass",   levels:"16",    rate:"30%", time:"morning", hgOnly:true},
      {name:"Rattata",   method:"Grass",   levels:"16",    rate:"30%", time:"day",     hgOnly:true},
      {name:"Rattata",   method:"Grass",   levels:"16",    rate:"40%", time:"night",   hgOnly:true},
      {name:"Meowth",    method:"Grass",   levels:"16",    rate:"30%", time:"morning", ssOnly:true},
      {name:"Meowth",    method:"Grass",   levels:"16",    rate:"30%", time:"day",     ssOnly:true},
      {name:"Meowth",    method:"Grass",   levels:"16",    rate:"40%", time:"night",   ssOnly:true},
      {name:"Magnemite", method:"Grass",   levels:"16",    rate:"20%"},
      {name:"Farfetch'd",method:"Grass",   levels:"16",    rate:"10%", time:"morning"},
      {name:"Farfetch'd",method:"Grass",   levels:"16",    rate:"10%", time:"day"},
      {name:"Tauros",    method:"Grass",   levels:"13",    rate:"4%"},
      {name:"Miltank",   method:"Grass",   levels:"13",    rate:"5%"},
      {name:"Snubbull",  method:"Grass",   levels:"13",    rate:"1%"},
      {name:"Hoothoot",  method:"Headbutt",levels:"13–14", rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt",levels:"13–14", rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt",levels:"13–14", rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt",levels:"15–16", rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt",levels:"15–16", rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt",levels:"15–16", rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt",levels:"15–16", rate:"20%", note:"Group B trees"},
    ],
    items:[
      {name:"Wht Apricorn",  hidden:false, note:"W of fenced section on lower middle path, tree (daily)"},
      {name:"Max Potion",    hidden:false, note:"SW of gate, between central and S paths"},
    ],
    trainers:[
      {class:"Sailor",    name:"Harry",  team:[{name:"Wooper",level:20}]},
      {class:"Lass",      name:"Dana",   team:[{name:"Flaaffy",level:19},{name:"Psyduck",level:19}],
       rematch:[{team:[{name:"Flaaffy",level:22},{name:"Golduck",level:22}]},{team:[{name:"Ampharos",level:27},{name:"Golduck",level:28}]}]},
      {class:"Bird Keeper",name:"Toby",  team:[{name:"Doduo",level:16},{name:"Doduo",level:17},{name:"Doduo",level:18}]},
      {class:"School Kid", name:"Chad",  team:[{name:"Mr. Mime",level:20}],
       rematch:[{team:[{name:"Mr. Mime",level:25}]},{team:[{name:"Mr. Mime",level:30}]}]},
      {class:"Beauty",     name:"Valerie",team:[{name:"Hoppip",level:18},{name:"Skiploom",level:18}]},
    ] },

  { part:"Part 8", id:"route-39", name:"Route 39",
    note:"Moomoo Farm: feed Miltank 7 Oran Berries for Seal Case, seals, and TM83 Natural Gift.",
    pokemon:[
      {name:"Raticate",  method:"Grass",   levels:"17",    rate:"30%"},
      {name:"Rattata",   method:"Grass",   levels:"16",    rate:"30%", time:"morning", hgOnly:true},
      {name:"Rattata",   method:"Grass",   levels:"16",    rate:"30%", time:"day",     hgOnly:true},
      {name:"Rattata",   method:"Grass",   levels:"16",    rate:"40%", time:"night",   hgOnly:true},
      {name:"Meowth",    method:"Grass",   levels:"16",    rate:"30%", time:"morning", ssOnly:true},
      {name:"Meowth",    method:"Grass",   levels:"16",    rate:"30%", time:"day",     ssOnly:true},
      {name:"Meowth",    method:"Grass",   levels:"16",    rate:"40%", time:"night",   ssOnly:true},
      {name:"Magnemite", method:"Grass",   levels:"16",    rate:"20%"},
      {name:"Farfetch'd",method:"Grass",   levels:"16",    rate:"10%", time:"morning"},
      {name:"Farfetch'd",method:"Grass",   levels:"16",    rate:"10%", time:"day"},
      {name:"Tauros",    method:"Grass",   levels:"15",    rate:"5%"},
      {name:"Miltank",   method:"Grass",   levels:"15",    rate:"5%"},
      {name:"Hoothoot",  method:"Headbutt",levels:"14–15", rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt",levels:"14–15", rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt",levels:"14–15", rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt",levels:"16–17", rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt",levels:"16–17", rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt",levels:"16–17", rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt",levels:"16–17", rate:"20%", note:"Group B trees"},
    ],
    items:[
      {name:"Green Apricorn",  hidden:false, note:"E of farmhouse tree (daily)"},
      {name:"Seal Case",       hidden:false, note:"From girl in barn after healing Miltank"},
      {name:"Fire Seal A ×3",  hidden:false, note:"From girl in barn after healing Miltank"},
      {name:"Party Seal B ×3", hidden:false, note:"From girl in barn after healing Miltank"},
      {name:"Flora Seal C ×3", hidden:false, note:"From girl in barn after healing Miltank"},
      {name:"TM83 Natural Gift",hidden:false,note:"From farmer's wife after healing Miltank"},
      {name:"Moomoo Milk",     hidden:false, note:"Purchase from farmer for ₽500 after healing Miltank"},
      {name:"PP Up",           hidden:true,  note:"N pasture clump of grass near W fence"},
      {name:"X Attack",        hidden:true,  note:"N pasture, NE of two trees"},
      {name:"Nugget",          hidden:true,  note:"S pasture southernmost clump of grass"},
      {name:"TM60 Drain Punch",hidden:false, note:"S pasture, corner next to silo"},
    ],
    trainers:[
      {class:"Psychic",name:"Nelson",  team:[{name:"Slowpoke",level:17},{name:"Slowpoke",level:20}]},
      {class:"Sailor", name:"Eugene",  team:[{name:"Poliwhirl",level:17},{name:"Raticate",level:17},{name:"Krabby",level:19}]},
      {class:"Pokéfan",name:"Derek",   team:[{name:"Pikachu",level:18}],
       rematch:[{team:[{name:"Pikachu",level:22}]},{team:[{name:"Raichu",level:28}]}]},
      {class:"Pokéfan",name:"Ruth",    team:[{name:"Pikachu",level:17}]},
    ] },

  // ─── PART 2 RETURNS ────────────────────────────────────────────────────────
  { part:"Part 2", id:"new-bark-town-return", name:"New Bark Town (Return)",
    note:"Return after delivering the Mystery Egg to Professor Elm.",
    pokemon:[],
    items:[
      {name:"Everstone", hidden:false, note:"From Prof. Elm after returning the Mystery Egg (Togepi)"},
    ],
    trainers:[] },

  // ─── PART 3 RETURNS ────────────────────────────────────────────────────────
  { part:"Part 3", id:"route-29-return", name:"Route 29 (Return)",
    note:"Return on any Thursday after earning the Zephyr Badge.",
    pokemon:[],
    items:[
      {name:"Twisted Spoon", hidden:false, note:"From Tuscany (Thu) — requires Zephyr Badge"},
    ],
    trainers:[] },

  // ─── PART 5 RETURNS ────────────────────────────────────────────────────────
  { part:"Part 5", id:"slowpoke-well-return", name:"Slowpoke Well (Return)",
    note:"Return to the entrance after defeating Team Rocket — Kurt has gone home.",
    pokemon:[],
    items:[
      {name:"Great Ball", hidden:true, note:"Where Kurt stood at the Slowpoke Well entrance"},
    ],
    trainers:[] },

  // ─── PART 7 RETURNS ────────────────────────────────────────────────────────
  { part:"Part 7", id:"violet-city-return", name:"Violet City (Return — Rock Smash)",
    note:"Return with Rock Smash (requires Hive Badge) to reach the path behind the Pokémon Center.",
    pokemon:[],
    items:[
      {name:"Hyper Potion", hidden:true, note:"Path behind Pokémon Center"},
    ],
    trainers:[] },

  { part:"Part 7", id:"route-32-return", name:"Route 32 (Return — Cut & Rock Smash)",
    note:"Return with Cut (requires Zephyr Badge) and Rock Smash (requires Hive Badge) to collect blocked items.",
    pokemon:[],
    items:[
      {name:"TM05 Roar",    hidden:false, note:"From man on N hill (requires Cut)"},
      {name:"Super Potion", hidden:true,  note:"N hill W of TM05 man (requires Cut)"},
      {name:"Shell Bell",   hidden:false, note:"SE of Union Cave entrance, past breakable rock (requires Rock Smash)"},
    ],
    trainers:[] },

  { part:"Part 7", id:"ruins-of-alph-return", name:"Ruins of Alph (Return — Rock Smash)",
    note:"Return with Rock Smash to reach the NW area and W pond.",
    pokemon:[],
    items:[
      {name:"Rare Candy",   hidden:true,  note:"NW area"},
      {name:"Hyper Potion", hidden:false, note:"N side of W pond"},
    ],
    trainers:[] },

  // ─── PART 8 RETURNS ────────────────────────────────────────────────────────
  { part:"Part 8", id:"cherrygrove-city-return", name:"Cherrygrove City (Return — Surf)",
    note:"Return with Surf to reach the island and offshore cliffs. One Nugget also requires Rock Climb.",
    pokemon:[],
    items:[
      {name:"Mystic Water", hidden:false, note:"From man on the island"},
      {name:"Nugget ×2",    hidden:true,  note:"SE of Pokémon Center pond (Surf) and NW cliff (Surf + Rock Climb)"},
    ],
    trainers:[] },

  { part:"Part 8", id:"violet-city-surf-return", name:"Violet City (Return — Surf)",
    note:"Return with Surf to reach the lake clearings east and west of the city.",
    pokemon:[],
    items:[
      {name:"Rare Candy", hidden:false, note:"E lake clearing"},
      {name:"PP Up",      hidden:false, note:"W lake clearing"},
    ],
    trainers:[] },

  { part:"Part 8", id:"route-32-surf-return", name:"Route 32 (Return — Surf)",
    note:"Return with Surf to reach the island near the train bridge.",
    pokemon:[],
    items:[
      {name:"Heart Scale", hidden:true, note:"E of pier near train bridge pillar"},
    ],
    trainers:[] },

  { part:"Part 8", id:"ruins-of-alph-surf-return", name:"Ruins of Alph (Return — Surf)",
    note:"Return with Surf to reach the SE and W chambers. Trainer Nathan is also accessible via Union Cave.",
    pokemon:[],
    items:[
      {name:"Sitrus Berry", hidden:false, note:"SE chamber"},
      {name:"Moon Stone",   hidden:false, note:"SE chamber"},
      {name:"Heal Powder",  hidden:false, note:"SE chamber"},
      {name:"Energy Root",  hidden:false, note:"SE chamber"},
      {name:"Life Orb",     hidden:false, note:"W chamber via Union Cave"},
      {name:"Leppa Berry",  hidden:false, note:"W chamber via Union Cave"},
      {name:"Revival Herb", hidden:false, note:"W chamber via Union Cave"},
      {name:"Charcoal",     hidden:false, note:"W chamber via Union Cave"},
    ],
    trainers:[
      {class:"Psychic", name:"Nathan", note:"Accessed from Union Cave via Surf", team:[{name:"Girafarig",level:26}]},
    ] },

  { part:"Part 8", id:"union-cave-surf-return", name:"Union Cave (Return — Surf)",
    note:"Return with Surf to reach the southern B1F section, Lapras (Fridays only), and deep items.",
    floors:[
      { label:"1F", pokemon:[], items:[
          {name:"Big Pearl", hidden:true, note:"W of largest pool on dry land"},
        ], trainers:[] },
      { label:"B1F", pokemon:[
          {name:"Lapras", method:"Cave", levels:"20", rate:"One", warn:true, note:"Southernmost pool, Fridays only"},
        ], items:[
          {name:"Revive",       hidden:true,  note:"NE on small stalagmite"},
          {name:"Elixir",       hidden:false, note:"B2F NE corner"},
          {name:"Hyper Potion", hidden:false, note:"B2F E-central ridge"},
          {name:"Calcium",      hidden:true,  note:"B2F W-central ridge"},
          {name:"Ultra Ball",   hidden:true,  note:"B2F SW area"},
        ], trainers:[
          {class:"Poké Maniac", name:"Andrew", note:"S section", team:[{name:"Marowak",level:24},{name:"Marowak",level:24}]},
          {class:"Poké Maniac", name:"Calvin", note:"S section", team:[{name:"Kangaskhan",level:26}]},
          {class:"Ace Trainer", name:"Nick",   note:"B2F",       team:[{name:"Charmander",level:26},{name:"Squirtle",level:26},{name:"Bulbasaur",level:26}]},
          {class:"Ace Trainer", name:"Gwen",   note:"B2F",       team:[{name:"Eevee",level:26},{name:"Vaporeon",level:22},{name:"Flareon",level:22},{name:"Jolteon",level:22}]},
          {class:"Ace Trainer", name:"Emma",   note:"B2F",       team:[{name:"Poliwhirl",level:28}]},
        ] },
    ] },

  { part:"Part 8", id:"ilex-forest-surf-return", name:"Ilex Forest (Return — Surf)",
    note:"Return with Surf to reach the item west of the northern pond.",
    pokemon:[],
    items:[
      {name:"Big Mushroom", hidden:false, note:"N area, W of pond"},
    ],
    trainers:[] },

  { part:"Part 8", id:"route-34-surf-return", name:"Route 34 (Return — Surf)",
    note:"Return with Surf to reach the western fenced area and its trainers.",
    pokemon:[],
    items:[
      {name:"Rare Candy",  hidden:true,  note:"W fenced area"},
      {name:"Nugget",      hidden:false, note:"W fenced area SE corner"},
      {name:"Power Herb",  hidden:false, note:"From Ace Trainer Kate after defeating her"},
    ],
    trainers:[
      {class:"Ace Trainer", name:"Irene", note:"Double Battle with Jenn", team:[{name:"Goldeen",level:22},{name:"Seaking",level:24}]},
      {class:"Ace Trainer", name:"Jenn",  note:"Double Battle with Irene", team:[{name:"Staryu",level:24},{name:"Starmie",level:26}]},
      {class:"Ace Trainer", name:"Kate",  team:[{name:"Shellder",level:26},{name:"Cloyster",level:28}]},
    ] },

  { part:"Part 8", id:"route-35-surf-return", name:"Route 35 (Return — Surf)",
    note:"Return with Surf to reach the NW Apricorn tree and nearby Nugget.",
    pokemon:[],
    items:[
      {name:"Green Apricorn", hidden:false, note:"NW of pond tree (daily)"},
      {name:"Nugget",         hidden:true,  note:"NW of Apricorn tree"},
    ],
    trainers:[] },

  { part:"Part 11", id:"route-30-return", name:"Route 30 (Return)",
    note:"HP Up from Youngster Joey after a phone rematch. Exp. Share from Mr. Pokémon in exchange for the Red Scale (obtained at Lake of Rage).",
    pokemon:[],
    items:[
      {name:"HP Up",      hidden:false, note:"From Youngster Joey after a phone rematch"},
      {name:"Exp. Share", hidden:false, note:"From Mr. Pokémon, exchange for Red Scale (Lake of Rage)"},
    ],
    trainers:[] },

  { part:"Part 10", id:"ruins-of-alph-strength-return", name:"Ruins of Alph (Return — Strength)",
    note:"Requires Surf + Strength (Storm Badge) to reach the SW chamber via Union Cave.",
    pokemon:[],
    items:[
      {name:"Leppa Berry",  hidden:false, note:"SW chamber via Union Cave"},
      {name:"Mystic Water", hidden:false, note:"SW chamber via Union Cave"},
      {name:"Stardust",     hidden:false, note:"SW chamber via Union Cave"},
      {name:"Star Piece",   hidden:false, note:"SW chamber via Union Cave"},
    ],
    trainers:[] },

  { part:"Part 10", id:"union-cave-strength-return", name:"Union Cave (Return — Strength)",
    note:"Requires Surf + Strength (Storm Badge) to reach the deepest B2F section.",
    pokemon:[],
    items:[
      {name:"TM18 Rain Dance", hidden:false, note:"B2F E ridge"},
      {name:"King's Rock",     hidden:false, note:"B2F — from man on W ridge"},
    ],
    trainers:[] },

  { part:"Part 10", id:"slowpoke-well-strength-return", name:"Slowpoke Well (Return — Strength)",
    note:"Requires Surf + Strength (Storm Badge) to reach the eastern section of B1F.",
    pokemon:[],
    items:[
      {name:"Full Heal",       hidden:true,  note:"E side of central ridge"},
      {name:"TM18 Rain Dance", hidden:false, note:"E ridge"},
      {name:"King's Rock",     hidden:false, note:"From man on W ridge"},
    ],
    trainers:[] },

  { part:"Part 8", id:"goldenrod-city-return", name:"Goldenrod City (Return — Bill)",
    note:"Return after meeting Bill in Ecruteak City (Part 8). He'll be at his house in Goldenrod.",
    pokemon:[
      {name:"Eevee", method:"Gift", levels:"5", rate:"One", note:"From Bill's house after meeting him in Ecruteak City"},
    ],
    items:[
      {name:"Amulet Coin", hidden:false, note:"Dept Store B1F NE room via Goldenrod Tunnel"},
    ],
    trainers:[] },

  { part:"Part 12", id:"goldenrod-city-rocket-return", name:"Goldenrod City (Return — Team Rocket)",
    note:"Return after defeating Team Rocket at the Radio Tower.",
    pokemon:[],
    items:[
      {name:"TM11 Sunny Day",  hidden:false, note:"Radio Tower 3F, from a Beauty after clearing Team Rocket"},
      {name:"Rainbow Wing",    hidden:false, note:"From Radio Tower Director (HG only)", hgOnly:true},
      {name:"Silver Wing",     hidden:false, note:"From Radio Tower Director (SS only)", ssOnly:true},
      {name:"BrightPowder",    hidden:false, note:"Radio Tower 4F, from DJ Mary after clearing Team Rocket"},
      {name:"Ultra Ball",      hidden:false, note:"Radio Tower 4F NE near Proton (requires Card Key)"},
    ],
    trainers:[] },

  { part:"Part 10", id:"burned-tower-strength-return", name:"Burned Tower (Return — Strength)",
    note:"Return with Strength (Storm Badge) to reach the NW corner and S-central rock in B1F.",
    floors:[
      { label:"B1F", pokemon:[], items:[
          {name:"TM12 Taunt", hidden:false, note:"NW corner"},
          {name:"Revive",     hidden:true,  note:"S-central area on rock"},
        ], trainers:[] },
    ] },

  // ─── PART 5 (AZALEA RETURN) ────────────────────────────────────────────────
  { part:"Part 5", id:"azalea-town-return", name:"Azalea Town (Return)",
    note:"Return to the Charcoal Kiln after rescuing both Farfetch'd in Ilex Forest.",
    pokemon:[],
    items:[
      {name:"Charcoal", hidden:false, note:"From Charcoal Kiln apprentice after returning both Farfetch'd"},
    ],
    trainers:[] },

  // ─── PART 7 (ROUTE 31 RETURN) ──────────────────────────────────────────────
  { part:"Part 7", id:"route-31-return", name:"Route 31 (Return — Kenya)",
    note:"Return after obtaining Kenya the Spearow from the gate guard on Route 35 and delivering it here.",
    pokemon:[],
    items:[
      {name:"TM44 Rest", hidden:false, note:"From the man near the pond after receiving Kenya"},
    ],
    trainers:[] },

  { part:"Part 7", id:"national-park-phone-return", name:"National Park (Return — Phone)",
    note:"Register Pokéfan Beverly's number; she occasionally offers a Nugget when you visit.",
    pokemon:[],
    items:[
      {name:"Nugget", hidden:false, note:"Sometimes from Pokéfan Beverly after phone registration"},
    ],
    trainers:[] },

  { part:"Part 5", id:"route-34-phone-return", name:"Route 34 (Return — Phone)",
    note:"Register Picnicker Gina's number; she occasionally gives a Leaf Stone when you visit.",
    pokemon:[],
    items:[
      {name:"Leaf Stone", hidden:false, note:"Sometimes from Picnicker Gina after phone registration"},
    ],
    trainers:[] },

  { part:"Part 7", id:"route-36-phone-return", name:"Route 36 (Return — Phone)",
    note:"Register School Kid Alan's number; he occasionally gives a Fire Stone when you visit.",
    pokemon:[],
    items:[
      {name:"Fire Stone", hidden:false, note:"Sometimes from School Kid Alan after phone registration"},
    ],
    trainers:[] },

  { part:"Part 8", id:"route-38-phone-return", name:"Route 38 (Return — Phone)",
    note:"Register Lass Dana's number; she occasionally gives a Thunder Stone when you visit.",
    pokemon:[],
    items:[
      {name:"Thunder Stone", hidden:false, note:"Sometimes from Lass Dana after phone registration"},
    ],
    trainers:[] },

  { part:"Part 8", id:"route-39-phone-return", name:"Route 39 (Return — Phone)",
    note:"Register Pokéfan Derek's number; he occasionally gives a Nugget when you visit.",
    pokemon:[],
    items:[
      {name:"Nugget", hidden:false, note:"Sometimes from Pokéfan Derek after phone registration"},
    ],
    trainers:[] },

  // ─── PART 9 ──────────────────────────────────────────────────────────────────
  { part:"Part 9", id:"olivine-city", name:"Olivine City",
    note:"Major port city. The Gym Leader is at the lighthouse. Get the Good Rod from the Fishing Guru south of the Gym.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",      levels:"10–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf",      levels:"15–25", rate:"10%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"10",    rate:"85%"},
      {name:"Krabby",     method:"Old Rod",   levels:"10",    rate:"15%"},
      {name:"Krabby",     method:"Good Rod",  levels:"20",    rate:"50%"},
      {name:"Magikarp",   method:"Good Rod",  levels:"20",    rate:"40%"},
      {name:"Corsola",    method:"Good Rod",  levels:"20",    rate:"10%", time:"morning", note:"Morning/Day only"},
      {name:"Staryu",     method:"Good Rod",  levels:"20",    rate:"10%", time:"night",   note:"Night only"},
      {name:"Voltorb",    method:"Trade",     levels:"Same",  rate:"One", note:"Trade Krabby → Billy the Voltorb"},
    ],
    items:[
      {name:"Good Rod",      hidden:false, note:"From Fishing Guru in house south of Gym"},
      {name:"Cheri Berry",   hidden:false, note:"Held by Billy the Voltorb (trade)"},
      {name:"Full Heal",     hidden:true,  note:"N of Poké Mart, on lone rock behind two houses"},
      {name:"Pearl",         hidden:true,  note:"Corner behind Olivine Harbor building"},
      {name:"TM57 Charge Beam", hidden:false, note:"NE of lighthouse on small beach (requires Surf)"},
    ],
    trainers:[
      {class:"Beauty", name:"Charlotte", team:[{name:"Bellossom", level:16}]},
    ] },

  { part:"Part 9", id:"olivine-lighthouse", name:"Olivine Lighthouse",
    note:"6-floor lighthouse. Jasmine is on 6F with the ill Ampharos (Amphy). Item TM23 Iron Tail comes after defeating Jasmine.",
    floors:[
      { label:"2F", pokemon:[], items:[], trainers:[
        {class:"Gentleman", name:"Alfred",  team:[{name:"Noctowl", level:22}]},
        {class:"Sailor",    name:"Huey",    team:[{name:"Poliwag", level:18}, {name:"Poliwhirl", level:20}]},
      ] },
      { label:"3F", pokemon:[], items:[
        {name:"Rare Candy",    hidden:false, note:"3F Exterior — NW corner"},
        {name:"Ether",         hidden:false, note:"3F SW — east of Sailor Kent"},
        {name:"Hyper Potion",  hidden:true,  note:"3F SW — crack in floor west of Sailor Kent"},
      ], trainers:[
        {class:"Bird Keeper", name:"Theo",  team:[{name:"Pidgey", level:17},{name:"Pidgey", level:15},{name:"Pidgey", level:19},{name:"Pidgey", level:15},{name:"Pidgey", level:15}]},
        {class:"Sailor",      name:"Kent",  team:[{name:"Krabby", level:18},{name:"Krabby", level:20}]},
        {class:"Bird Keeper", name:"Denis", team:[{name:"Spearow", level:18},{name:"Fearow", level:20},{name:"Spearow", level:18}]},
      ] },
      { label:"4F", pokemon:[], items:[
        {name:"TM87 Swagger", hidden:false, note:"4F SE — west of Lass Connie"},
      ], trainers:[
        {class:"Gentleman", name:"Preston", team:[{name:"Growlithe", level:18},{name:"Growlithe", level:18}]},
        {class:"Lass",      name:"Connie",  team:[{name:"Marill", level:21}]},
      ] },
      { label:"5F", pokemon:[], items:[
        {name:"Super Repel", hidden:false, note:"NE corner near Sailor Roberto"},
      ], trainers:[
        {class:"Sailor", name:"Terrell", team:[{name:"Poliwhirl", level:20}]},
        {class:"Sailor", name:"Roberto", team:[{name:"Machop", level:18},{name:"Machop", level:18},{name:"Poliwhirl", level:18}]},
      ] },
      { label:"6F", pokemon:[], items:[
        {name:"Super Potion", hidden:false, note:"Outer area, east side"},
      ], trainers:[] },
    ] },

  { part:"Part 9", id:"route-40", name:"Route 40",
    note:"Ocean route south of Olivine. All trainers and items require Surf. Monica gives a Sharp Beak every Monday.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",     levels:"10–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf",     levels:"15–25", rate:"10%"},
      {name:"Magikarp",   method:"Old Rod",  levels:"10",    rate:"85%"},
      {name:"Krabby",     method:"Old Rod",  levels:"10",    rate:"15%"},
      {name:"Krabby",     method:"Good Rod", levels:"20",    rate:"50%"},
      {name:"Magikarp",   method:"Good Rod", levels:"20",    rate:"40%"},
      {name:"Corsola",    method:"Good Rod", levels:"20",    rate:"10%", time:"morning", note:"Morning/Day only"},
      {name:"Staryu",     method:"Good Rod", levels:"20",    rate:"10%", time:"night",   note:"Night only"},
    ],
    items:[
      {name:"Sharp Beak",    hidden:false, note:"From Monica (Monday) — on sandy islet S, requires Surf"},
      {name:"TM88 Pluck",    hidden:false, note:"On sandy islet to the south (requires Surf)"},
      {name:"Hyper Potion",  hidden:true,  note:"Sandy islet south, underneath TM88 (requires Surf)"},
    ],
    trainers:[
      {class:"Swimmer", name:"Simon",  team:[{name:"Tentacool", level:20},{name:"Tentacool", level:20}]},
      {class:"Swimmer", name:"Elaine", team:[{name:"Staryu", level:21}]},
      {class:"Swimmer", name:"Paula",  team:[{name:"Staryu", level:19},{name:"Shellder", level:19}]},
      {class:"Swimmer", name:"Randall",team:[{name:"Shellder", level:18},{name:"Wartortle", level:20},{name:"Shellder", level:18}]},
    ] },

  { part:"Part 9", id:"route-41", name:"Route 41",
    note:"Rough sea route to Cianwood. Whirlpools block access to the Whirl Islands and island items until HM05 is obtained.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",     levels:"15–25", rate:"HG 60%/SS 90%"},
      {name:"Tentacruel", method:"Surf",     levels:"15–25", rate:"HG 30%/SS 10%"},
      {name:"Mantine",    method:"Surf",     levels:"15–25", rate:"10%", hgOnly:true},
      {name:"Magikarp",   method:"Old Rod",  levels:"10",    rate:"85%"},
      {name:"Tentacool",  method:"Old Rod",  levels:"10",    rate:"15%"},
      {name:"Magikarp",   method:"Good Rod", levels:"20",    rate:"40%"},
      {name:"Tentacool",  method:"Good Rod", levels:"20",    rate:"30%"},
      {name:"Chinchou",   method:"Good Rod", levels:"20",    rate:"20%"},
      {name:"Shellder",   method:"Good Rod", levels:"20",    rate:"10%"},
    ],
    items:[],
    trainers:[
      {class:"Swimmer", name:"Charlie", team:[{name:"Shellder", level:21},{name:"Tentacool", level:19},{name:"Tentacruel", level:19}]},
      {class:"Swimmer", name:"George",  team:[{name:"Tentacool", level:16},{name:"Tentacool", level:16},{name:"Tentacool", level:17},{name:"Tentacool", level:17},{name:"Remoraid", level:19},{name:"Staryu", level:19}]},
      {class:"Swimmer", name:"Susie",   team:[{name:"Psyduck", level:20},{name:"Goldeen", level:22}]},
      {class:"Swimmer", name:"Kaylee",  team:[{name:"Goldeen", level:18},{name:"Goldeen", level:20},{name:"Seaking", level:20}]},
      {class:"Swimmer", name:"Matthew", team:[{name:"Krabby", level:23}]},
      {class:"Swimmer", name:"Wendy",   team:[{name:"Horsea", level:21},{name:"Horsea", level:21}]},
      {class:"Swimmer", name:"Berke",   team:[{name:"Qwilfish", level:23}]},
      {class:"Swimmer", name:"Kara",    team:[{name:"Staryu", level:20},{name:"Starmie", level:20}]},
      {class:"Swimmer", name:"Ronald",  team:[{name:"Gyarados", level:20},{name:"Gyarados", level:20}]},
      {class:"Swimmer", name:"Denise",  team:[{name:"Seel", level:22}]},
    ] },

  // ─── PART 10 ─────────────────────────────────────────────────────────────────
  { part:"Part 10", id:"cianwood-city", name:"Cianwood City",
    note:"Island city west of Johto. Get SecretPotion from pharmacy for Amphy. Chuck's wife gives HM02 Fly after beating the gym.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",       levels:"10–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf",       levels:"15–25", rate:"10%"},
      {name:"Magikarp",   method:"Old Rod",    levels:"10",    rate:"85%"},
      {name:"Krabby",     method:"Old Rod",    levels:"10",    rate:"15%"},
      {name:"Krabby",     method:"Good Rod",   levels:"20",    rate:"50%"},
      {name:"Magikarp",   method:"Good Rod",   levels:"20",    rate:"40%"},
      {name:"Corsola",    method:"Good Rod",   levels:"20",    rate:"10%", time:"morning", note:"Morning/Day only"},
      {name:"Staryu",     method:"Good Rod",   levels:"20",    rate:"10%", time:"night",   note:"Night only"},
      {name:"Krabby",     method:"Rock Smash", levels:"15–24", rate:"80%"},
      {name:"Shuckle",    method:"Rock Smash", levels:"23–28", rate:"20%"},
      {name:"Shuckle",    method:"Gift",       levels:"20",    rate:"One", warn:true, note:"From Kirk for safekeeping; becomes yours if friendly enough"},
    ],
    items:[
      {name:"Stardust",       hidden:true,  note:"Between the two middle drying racks"},
      {name:"SecretPotion",   hidden:false, note:"From Cianwood Pharmacy after speaking to Jasmine in lighthouse"},
      {name:"TM01 Focus Punch",hidden:false,note:"From Gym Leader Chuck after defeating him"},
      {name:"HM02 Fly",       hidden:false, note:"From Chuck's wife outside the gym after defeating Chuck"},
      {name:"Revive",         hidden:true,  note:"Next to northernmost house (requires Rock Smash)"},
    ],
    trainers:[
      {class:"Mystery Man", name:"Eusine", note:"Battles you on the north beach after Suicune flees.", team:[{name:"Drowzee", level:25},{name:"Haunter", level:25},{name:"Electrode", level:27}]},
    ] },

  { part:"Part 10", id:"cianwood-gym", name:"Cianwood Gym",
    note:"Fighting-type gym. Leader: Chuck. Badge: Storm Badge. No puzzle — just trainers on each side.",
    pokemon:[], items:[],
    trainers:[
      {class:"Black Belt", name:"Yoshi", team:[{name:"Hitmonlee", level:27}]},
      {class:"Black Belt", name:"Nob",   team:[{name:"Machop", level:25},{name:"Machoke", level:25}]},
      {class:"Black Belt", name:"Lao",   team:[{name:"Hitmonchan", level:27}]},
      {class:"Black Belt", name:"Lung",  team:[{name:"Mankey", level:23},{name:"Mankey", level:23},{name:"Primeape", level:25}]},
      {class:"Leader",     name:"Chuck", team:[{name:"Primeape", level:29},{name:"Poliwrath", level:31}]},
    ] },

  { part:"Part 10", id:"olivine-gym", name:"Olivine Gym",
    note:"Steel-type gym. Leader: Jasmine. Badge: Mineral Badge. No pre-gym trainers.",
    pokemon:[], items:[
      {name:"TM23 Iron Tail", hidden:false, note:"From Gym Leader Jasmine after defeating her"},
    ],
    trainers:[
      {class:"Leader", name:"Jasmine", team:[{name:"Magnemite", level:30},{name:"Magnemite", level:30},{name:"Steelix", level:35}]},
    ] },

  { part:"Part 10", id:"route-42", name:"Route 42",
    note:"Route from Ecruteak to Mahogany Town along Mt. Mortar. Surf+Cut required for apricorn grove and some items.",
    pokemon:[
      {name:"Spearow",   method:"Grass",   levels:"14–16", rate:"HG 30%/SS 40%", time:"morning"},
      {name:"Zubat",     method:"Grass",   levels:"14–16", rate:"HG 30%/SS 40%", time:"night"},
      {name:"Mankey",    method:"Grass",   levels:"15",    rate:"30%", hgOnly:true},
      {name:"Mareep",    method:"Grass",   levels:"13–15", rate:"HG 30%/SS 50%"},
      {name:"Flaaffy",   method:"Grass",   levels:"15–17", rate:"10%"},
      {name:"Girafarig", method:"Grass",   levels:"15",    rate:"30%"},
      {name:"Goldeen",   method:"Surf",    levels:"10–25", rate:"90%"},
      {name:"Seaking",   method:"Surf",    levels:"15–25", rate:"10%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Goldeen",   method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Goldeen",   method:"Good Rod",levels:"20",    rate:"60%"},
      {name:"Magikarp",  method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Spearow",   method:"Headbutt (Common)", levels:"13–14", rate:"50%"},
      {name:"Heracross", method:"Headbutt (Common)", levels:"13–14", rate:"30%"},
      {name:"Aipom",     method:"Headbutt (Common)", levels:"13–14", rate:"20%"},
    ],
    items:[
      {name:"TM65 Shadow Claw",  hidden:false, note:"Near the sign to Mt. Mortar's west entrance"},
      {name:"HM04 Strength",     hidden:false, note:"From a Hiker leaving Mt. Mortar's western entrance"},
      {name:"Pnk Apricorn",      hidden:false, note:"S of Mt. Mortar's middle entrance, W tree — daily (req. Surf+Cut)"},
      {name:"Grn Apricorn",      hidden:false, note:"S of Mt. Mortar's middle entrance, middle tree — daily (req. Surf+Cut)"},
      {name:"Ylw Apricorn",      hidden:false, note:"S of Mt. Mortar's middle entrance, E tree — daily (req. Surf+Cut)"},
      {name:"Super Potion",      hidden:false, note:"NE of apricorn grove, at water's edge (requires Surf)"},
      {name:"Max Potion",        hidden:true,  note:"SE of eastern lake, on lone rock (requires Surf)"},
    ],
    trainers:[
      {class:"Fisherman",  name:"Tully",    team:[{name:"Qwilfish", level:19}]},
      {class:"Poké Maniac",name:"Shane",    team:[{name:"Nidorina", level:17},{name:"Nidorino", level:17}]},
      {class:"Hiker",      name:"Benjamin", team:[{name:"Diglett", level:15},{name:"Geodude", level:15},{name:"Dugtrio", level:17}]},
    ] },

  { part:"Part 10", id:"mt-mortar", name:"Mt. Mortar",
    note:"Mountain cave between Ecruteak and Mahogany. Lower Cave requires Strength. Super Nerd Hugh on 2F requires Surf+Waterfall.",
    floors:[
      { label:"Entrance", pokemon:[
        {name:"Zubat",   method:"Cave", levels:"13–15", rate:"60%"},
        {name:"Machop",  method:"Cave", levels:"14",    rate:"20%"},
        {name:"Rattata", method:"Cave", levels:"14–16", rate:"14%"},
        {name:"Geodude", method:"Cave", levels:"14",    rate:"5%"},
        {name:"Marill",  method:"Cave", levels:"15",    rate:"1%"},
        {name:"Goldeen", method:"Surf", levels:"10–25", rate:"90%"},
        {name:"Seaking", method:"Surf", levels:"15–25", rate:"10%"},
        {name:"Magikarp",method:"Old Rod",  levels:"10",  rate:"85%"},
        {name:"Goldeen", method:"Old Rod",  levels:"10",  rate:"15%"},
        {name:"Goldeen", method:"Good Rod", levels:"20",  rate:"60%"},
        {name:"Magikarp",method:"Good Rod", levels:"20",  rate:"40%"},
      ], items:[
        {name:"Hyper Potion", hidden:true, note:"NE of western entrance"},
      ], trainers:[
        {class:"Poké Maniac", name:"Harrison", team:[{name:"Nidoking", level:17},{name:"Nidoqueen", level:17}]},
        {class:"Super Nerd",  name:"Markus",   team:[{name:"Magnemite", level:20},{name:"Voltorb", level:20}]},
      ] },
      { label:"Lower Cave", pokemon:[
        {name:"Geodude", method:"Cave", levels:"13–15", rate:"50%"},
        {name:"Machop",  method:"Cave", levels:"13–15", rate:"35%"},
        {name:"Rattata", method:"Cave", levels:"14",    rate:"10%"},
        {name:"Zubat",   method:"Cave", levels:"14",    rate:"5%"},
      ], items:[
        {name:"Ether",       hidden:false, note:"W of waterfall (via Lower Cave)"},
        {name:"Revive",      hidden:false, note:"E of waterfall (via Lower Cave)"},
        {name:"Max Repel",   hidden:true,  note:"NE of boulder (requires Strength)"},
        {name:"Ultra Ball",  hidden:false, note:"W-central area (requires Strength)"},
        {name:"Max Potion",  hidden:false, note:"Central area, near stalagmites (requires Strength)"},
        {name:"Escape Rope", hidden:false, note:"SE of Super Nerd Markus (requires Strength)"},
        {name:"Nugget",      hidden:false, note:"NE area (requires Strength)"},
      ], trainers:[
        {class:"Super Nerd", name:"Hugh", note:"Requires Surf+Waterfall to reach 2F.", team:[{name:"Parasect", level:25},{name:"Parasect", level:25},{name:"Parasect", level:25}]},
      ] },
    ] },

  { part:"Part 10", id:"safari-zone-gate", name:"Safari Zone Gate",
    note:"Entrance area with Pokémon Center and market stalls. Poké Balls and vitamins sold here. Opens after healing Amphy at Olivine Lighthouse — Baoba calls you immediately.",
    pokemon:[
      {name:"Hoothoot",  method:"Headbutt (Common)", levels:"14–16", rate:"50%"},
      {name:"Pineco",    method:"Headbutt (Common)", levels:"14–16", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"14–16", rate:"20%"},
      {name:"Hoothoot",  method:"Headbutt (Rare)",   levels:"17–19", rate:"50%"},
      {name:"Spinarak",  method:"Headbutt (Rare)",   levels:"17–19", rate:"30%", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt (Rare)",   levels:"17–19", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Rare)",   levels:"17–19", rate:"20%"},
    ],
    items:[
      {name:"TinyMushroom", hidden:true, note:"×3 in tufts of grass around Pokémon Center and stalls"},
    ],
    trainers:[] },

  { part:"Part 10", id:"safari-zone", name:"Safari Zone",
    note:"Six active areas per session (chosen from 12 total), ₽500 entry, 30 loaned Safari Balls. Aptitude Test 1: catch Geodude (always in Peak, the first area). Aptitude Test 2 (~3 hrs later): catch Sandshrew — add Desert Area via Area Customizer first. Block placement unlocks after receiving the National Pokédex AND 3 hrs after completing Test 2. Each area can hold up to 30 block objects.",
    floors:[
      { label:"Peak", items:[], trainers:[], pokemon:[
        {name:"Geodude",   method:"Grass", levels:"15–17", rate:"40%", note:"Always the first area — required for Aptitude Test 1"},
        {name:"Graveler",  method:"Grass", levels:"16–17", rate:"20%"},
        {name:"Magnemite", method:"Grass", levels:"15–16", rate:"20%"},
        {name:"Magneton",  method:"Grass", levels:"17",    rate:"10%"},
        {name:"Magmar",    method:"Grass", levels:"17",    rate:"10%"},
        {name:"Wobbuffet", method:"Grass", levels:"16–17", rate:"20%", time:"night"},
        {name:"Fearow",    method:"Grass", levels:"44",    note:"Blocks: 5 Forest"},
        {name:"Paras",     method:"Grass", levels:"42",    note:"Blocks: 3 Forest"},
        {name:"Slowbro",   method:"Grass", levels:"45",    note:"Blocks: 5 Waterside"},
        {name:"Linoone",   method:"Grass", levels:"46",    note:"Blocks: 5 Plains"},
        {name:"Lairon",    method:"Grass", levels:"45",    note:"Blocks: 24 Peak"},
        {name:"Zangoose",  method:"Grass", levels:"43–45", note:"Blocks: 12 Plains"},
        {name:"Spheal",    method:"Grass", levels:"44–45", note:"Blocks: 35 Waterside + area active 40 days"},
        {name:"Bronzor",   method:"Grass", levels:"45–46", note:"Blocks: 35 Peak + 14 Forest + area active 30 days"},
        {name:"Vigoroth",  method:"Grass", levels:"47",    note:"Blocks: 56 Forest + 28 Plains + area active 60 days", warn:true},
      ] },
      { label:"Desert", items:[], trainers:[], pokemon:[
        {name:"Sandshrew", method:"Grass", levels:"15–17", rate:"40%", note:"Required for Aptitude Test 2 — add Desert via Area Customizer first"},
        {name:"Sandslash", method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Cubone",    method:"Grass", levels:"16–17", rate:"20%"},
        {name:"Marowak",   method:"Grass", levels:"17",    rate:"10%"},
        {name:"Fearow",    method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Lotad",      method:"Grass", levels:"38",    note:"Blocks: 8 Waterside"},
        {name:"Spinda",     method:"Grass", levels:"45",    note:"Blocks: 14 Plains"},
        {name:"Hippopotas", method:"Grass", levels:"43",    note:"Blocks: 28 Peak"},
        {name:"Trapinch",   method:"Grass", levels:"46–47", note:"Blocks: 49 Peak + area active 30 days"},
        {name:"Vibrava",    method:"Grass", levels:"44–45", note:"Blocks: 49 Forest + area active 20 days"},
        {name:"Cacnea",     method:"Grass", levels:"35",    note:"Blocks: 35 Forest + area active 20 days"},
        {name:"Cacturne",   method:"Grass", levels:"48",    note:"Blocks: 42 Waterside + area active 40 days"},
        {name:"Carnivine",  method:"Grass", levels:"48",    note:"Blocks: 49 Plains + area active 10 days"},
      ] },
      { label:"Plains", items:[], trainers:[], pokemon:[
        {name:"Rattata",   method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Abra",      method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Girafarig", method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Smeargle",  method:"Grass", levels:"17",    rate:"10%"},
        {name:"Raticate",  method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Stantler",  method:"Grass", levels:"17",    rate:"20%", time:"night"},
        {name:"Ponyta",    method:"Grass", levels:"42",    note:"Blocks: 5 Peak"},
        {name:"Houndoom",  method:"Grass", levels:"43–44", note:"Blocks: 10 Peak"},
        {name:"Zigzagoon", method:"Grass", levels:"44",    note:"Blocks: 15 Forest"},
        {name:"Lotad",     method:"Grass", levels:"42",    note:"Blocks: 12 Waterside"},
        {name:"Surskit",   method:"Grass", levels:"46",    note:"Blocks: 28 Waterside"},
        {name:"Manectric", method:"Grass", levels:"45",    note:"Blocks: 15 Plains"},
        {name:"Zangoose",  method:"Grass", levels:"43–45", note:"Blocks: 15 Peak"},
        {name:"Shinx",     method:"Grass", levels:"43–44", note:"Blocks: 10 Plains"},
      ] },
      { label:"Meadow", items:[], trainers:[], pokemon:[
        {name:"Jigglypuff", method:"Grass",     levels:"15–17", rate:"50%"},
        {name:"Hoppip",     method:"Grass",     levels:"15–17", rate:"40%"},
        {name:"Skiploom",   method:"Grass",     levels:"17",    rate:"10%"},
        {name:"Sunkern",    method:"Grass",     levels:"15–17", rate:"30%", time:"morning"},
        {name:"Clefairy",   method:"Grass",     levels:"17",    rate:"10%", time:"night"},
        {name:"Marill",     method:"Grass",     levels:"15–17", rate:"30%", time:"night"},
        {name:"Wooper",     method:"Grass",     levels:"15–17", rate:"30%", time:"night"},
        {name:"Magikarp",   method:"Surf",      levels:"15–17", rate:"50%"},
        {name:"Marill",     method:"Surf",      levels:"16–17", rate:"20%"},
        {name:"Wooper",     method:"Surf",      levels:"15–17", rate:"30%"},
        {name:"Magikarp",   method:"Old Rod",   levels:"12–15", rate:"60%"},
        {name:"Poliwag",    method:"Old Rod",   levels:"12–15", rate:"40%"},
        {name:"Magikarp",   method:"Good Rod",  levels:"22–24", rate:"40%"},
        {name:"Poliwag",    method:"Good Rod",  levels:"22–24", rate:"40%"},
        {name:"Poliwhirl",  method:"Good Rod",  levels:"24–25", rate:"20%"},
        {name:"Poliwag",    method:"Super Rod", levels:"35–36", rate:"40%"},
        {name:"Poliwhirl",  method:"Super Rod", levels:"35–38", rate:"60%"},
        {name:"Raticate",   method:"Grass",     levels:"40",    note:"Blocks: 5 Plains"},
        {name:"Geodude",    method:"Grass",     levels:"45",    note:"Blocks: 3 Peak (morning/day)"},
        {name:"Chansey",    method:"Grass",     levels:"42",    note:"Blocks: 12 Plains"},
        {name:"Seedot",     method:"Grass",     levels:"45",    note:"Blocks: 35 Plains"},
        {name:"Nuzleaf",    method:"Grass",     levels:"38",    note:"Blocks: 28 Forest"},
        {name:"Nuzleaf",    method:"Grass",     levels:"47–48", note:"Blocks: 35 Forest + area active 20 days"},
        {name:"Nosepass",   method:"Grass",     levels:"45",    note:"Blocks: 35 Peak"},
        {name:"Masquerain", method:"Surf",      levels:"42–46", note:"Blocks: 10–14 Waterside"},
        {name:"Gyarados",   method:"Good Rod",  levels:"28",    note:"Blocks: 7 Waterside"},
        {name:"Gyarados",   method:"Super Rod", levels:"42–45", note:"Blocks: 10–14 Waterside"},
        {name:"Riolu",      method:"Grass",     levels:"45–46", note:"Blocks: 42 Peak + 28 Forest + area active 70 days", warn:true},
      ] },
      { label:"Forest", items:[], trainers:[], pokemon:[
        {name:"Bellsprout", method:"Grass", levels:"15–17", rate:"40%"},
        {name:"Pidgey",     method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Mr. Mime",   method:"Grass", levels:"16–17", rate:"20%"},
        {name:"Misdreavus", method:"Grass", levels:"15–17", rate:"10%"},
        {name:"Gastly",     method:"Grass", levels:"15–17", rate:"20%", time:"night"},
        {name:"Haunter",    method:"Grass", levels:"16–17", rate:"20%", time:"night"},
        {name:"Lickitung",  method:"Grass", levels:"40",    note:"Blocks: 3 Waterside"},
        {name:"Electabuzz", method:"Grass", levels:"41",    note:"Blocks: 4 Peak"},
        {name:"Surskit",    method:"Grass", levels:"42",    note:"Blocks: 24 Waterside"},
        {name:"Bidoof",     method:"Grass", levels:"40",    note:"Blocks: 10 Waterside"},
        {name:"Budew",      method:"Grass", levels:"47",    note:"Blocks: 24 Plains"},
        {name:"Shuppet",    method:"Grass", levels:"46–47", note:"Blocks: 35 Forest + area active 20 days"},
        {name:"Beldum",     method:"Grass", levels:"44",    note:"Blocks: 63 Peak + area active 70 days", warn:true},
        {name:"Bronzong",   method:"Grass", levels:"44–46", note:"Blocks: 56 Peak + 35 Forest + area active 110 days", warn:true},
      ] },
      { label:"Swamp", items:[], trainers:[], pokemon:[
        {name:"Sentret",    method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Jigglypuff", method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Paras",      method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Murkrow",    method:"Grass",     levels:"15–17", rate:"10%"},
        {name:"Drowzee",    method:"Grass",     levels:"15–17", rate:"20%", time:"night"},
        {name:"Hypno",      method:"Grass",     levels:"16–17", rate:"20%", time:"night"},
        {name:"Murkrow",    method:"Grass",     levels:"15–17", rate:"30%", time:"night"},
        {name:"Goldeen",    method:"Surf",      levels:"15–17", rate:"40%"},
        {name:"Magikarp",   method:"Surf",      levels:"15–17", rate:"60%"},
        {name:"Magikarp",   method:"Old Rod",   levels:"12–15", rate:"100%"},
        {name:"Goldeen",    method:"Good Rod",  levels:"22–24", rate:"40%"},
        {name:"Seaking",    method:"Good Rod",  levels:"24–25", rate:"20%"},
        {name:"Magikarp",   method:"Good Rod",  levels:"22–24", rate:"40%"},
        {name:"Goldeen",    method:"Super Rod", levels:"35–37", rate:"40%"},
        {name:"Seaking",    method:"Super Rod", levels:"35–37", rate:"40%"},
        {name:"Dratini",    method:"Super Rod", levels:"36–37", rate:"20%"},
        {name:"Parasect",   method:"Grass",     levels:"41",    note:"Blocks: 3 Plains"},
        {name:"Weepinbell", method:"Grass",     levels:"46",    note:"Blocks: 8 Forest"},
        {name:"Voltorb",    method:"Grass",     levels:"42",    note:"Blocks: 10 Peak"},
        {name:"Furret",     method:"Grass",     levels:"42",    note:"Blocks: 5 Plains"},
        {name:"Dragonair",  method:"Super Rod", levels:"42–45", note:"Blocks: 15–20 Waterside"},
        {name:"Murkrow",    method:"Surf",      levels:"47",    note:"Blocks: 10 Waterside"},
        {name:"Duskull",    method:"Grass",     levels:"42",    note:"Blocks: 28 Peak"},
        {name:"Duskull",    method:"Surf",      levels:"48",    note:"Blocks: 35 Waterside + area active 40 days"},
        {name:"Chimecho",   method:"Grass",     levels:"46–47", note:"Blocks: 15 Forest"},
        {name:"Floatzel",   method:"Grass",     levels:"44",    note:"Blocks: 10 Waterside"},
        {name:"Pachirisu",  method:"Grass",     levels:"47",    note:"Blocks: 10 Plains"},
        {name:"Bagon",      method:"Grass",     levels:"44–45", note:"Blocks: 56 Peak + 35 Forest + area active 110 days", warn:true},
      ] },
      { label:"Marshland", items:[], trainers:[], pokemon:[
        {name:"Koffing",   method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Weezing",   method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Ekans",     method:"Grass",     levels:"15–16", rate:"20%"},
        {name:"Arbok",     method:"Grass",     levels:"17",    rate:"10%"},
        {name:"Grimer",    method:"Grass",     levels:"17",    rate:"10%"},
        {name:"Oddish",    method:"Grass",     levels:"15–17", rate:"20%", time:"night"},
        {name:"Gloom",     method:"Grass",     levels:"16–17", rate:"20%", time:"night"},
        {name:"Wooper",    method:"Grass",     levels:"15–17", rate:"30%", time:"night"},
        {name:"Poliwag",   method:"Surf",      levels:"15–17", rate:"40%"},
        {name:"Grimer",    method:"Surf",      levels:"15–17", rate:"30%"},
        {name:"Wooper",    method:"Surf",      levels:"15–17", rate:"30%"},
        {name:"Poliwag",   method:"Old Rod",   levels:"12–15", rate:"40%"},
        {name:"Magikarp",  method:"Old Rod",   levels:"12–15", rate:"60%"},
        {name:"Poliwhirl", method:"Good Rod",  levels:"24–25", rate:"60%"},
        {name:"Magikarp",  method:"Good Rod",  levels:"22–24", rate:"40%"},
        {name:"Poliwhirl", method:"Super Rod", levels:"35–38", rate:"80%"},
        {name:"Gyarados",  method:"Super Rod", levels:"36–37", rate:"20%"},
        {name:"Diglett",   method:"Grass",     levels:"43",    note:"Blocks: 5 Peak"},
        {name:"Muk",       method:"Grass",     levels:"38",    note:"Blocks: 8 Waterside"},
        {name:"Muk",       method:"Surf",      levels:"48",    note:"Blocks: 16 Waterside"},
        {name:"Jumpluff",  method:"Grass",     levels:"38",    note:"Blocks: 5 Plains"},
        {name:"Jumpluff",  method:"Surf",      levels:"47",    note:"Blocks: 10 Waterside"},
        {name:"Quagsire",  method:"Surf",      levels:"43",    note:"Blocks: 13 Waterside"},
        {name:"Shuckle",   method:"Grass",     levels:"44",    note:"Blocks: 8 Peak"},
        {name:"Gyarados",  method:"Good Rod",  levels:"26–29", note:"Blocks: 3–4 Waterside"},
        {name:"Barboach",  method:"Super Rod", levels:"42–45", note:"Blocks: 4–5 Waterside"},
        {name:"Roselia",   method:"Grass",     levels:"46",    note:"Blocks: 49 Forest + area active 20 days"},
        {name:"Seviper",   method:"Grass",     levels:"48",    note:"Blocks: 35 Plains"},
        {name:"Carnivine", method:"Grass",     levels:"41",    note:"Blocks: 35 Forest + area active 20 days"},
        {name:"Croagunk",  method:"Grass",     levels:"44",    note:"Blocks: 42 Forest + area active 20 days"},
        {name:"Banette",   method:"Grass",     levels:"44–45", note:"Blocks: 49 Peak + area active 30 days"},
      ] },
      { label:"Mountain", items:[], trainers:[], pokemon:[
        {name:"Rattata",   method:"Grass", levels:"15–16", rate:"20%"},
        {name:"Lickitung", method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Raticate",  method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Magneton",  method:"Grass", levels:"17",    rate:"10%"},
        {name:"Larvitar",  method:"Grass", levels:"17",    rate:"10%"},
        {name:"Zubat",     method:"Grass", levels:"15–17", rate:"40%", time:"night"},
        {name:"Golbat",    method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Krabby",    method:"Grass", levels:"43",    note:"Blocks: 3 Waterside"},
        {name:"Meditite",  method:"Grass", levels:"43–44", note:"Blocks: 20 Forest"},
        {name:"Volbeat",   method:"Grass", levels:"46",    note:"Blocks: 10 Plains"},
        {name:"Lunatone",  method:"Grass", levels:"46",    note:"Blocks: 15 Peak"},
        {name:"Dusclops",  method:"Grass", levels:"45–46", note:"Blocks: 35 Forest"},
        {name:"Metang",    method:"Grass", levels:"44",    note:"Blocks: 56 Peak"},
        {name:"Chingling", method:"Grass", levels:"38",    note:"Blocks: 10 Forest"},
        {name:"Sealeo",    method:"Grass", levels:"45",    note:"Blocks: 49 Waterside + 21 Peak + area active 80 days"},
      ] },
      { label:"Rocky Beach", items:[], trainers:[], pokemon:[
        {name:"Slowpoke",  method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Krabby",    method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Slowbro",   method:"Grass",     levels:"17",    rate:"10%"},
        {name:"Doduo",     method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Zubat",     method:"Grass",     levels:"15–17", rate:"30%", time:"night"},
        {name:"Lapras",    method:"Surf",      levels:"15–16", rate:"20%"},
        {name:"Poliwag",   method:"Surf",      levels:"15–16", rate:"30%"},
        {name:"Poliwhirl", method:"Surf",      levels:"16–17", rate:"20%"},
        {name:"Magikarp",  method:"Surf",      levels:"15–16", rate:"30%"},
        {name:"Krabby",    method:"Old Rod",   levels:"13–15", rate:"30%"},
        {name:"Goldeen",   method:"Old Rod",   levels:"13–15", rate:"30%"},
        {name:"Magikarp",  method:"Old Rod",   levels:"12–14", rate:"40%"},
        {name:"Krabby",    method:"Good Rod",  levels:"22–25", rate:"40%"},
        {name:"Goldeen",   method:"Good Rod",  levels:"22–23", rate:"30%"},
        {name:"Magikarp",  method:"Good Rod",  levels:"22–23", rate:"30%"},
        {name:"Kingler",   method:"Super Rod", levels:"38–39", rate:"20%"},
        {name:"Goldeen",   method:"Super Rod", levels:"35–38", rate:"40%"},
        {name:"Seaking",   method:"Super Rod", levels:"35–38", rate:"40%"},
        {name:"Dodrio",    method:"Grass",     levels:"42",    note:"Blocks: 10 Plains"},
        {name:"Mareep",    method:"Grass",     levels:"43",    note:"Blocks: 5 Forest"},
        {name:"Aron",      method:"Grass",     levels:"44–45", note:"Blocks: 24 Peak"},
        {name:"Electrike", method:"Grass",     levels:"42",    note:"Blocks: 10 Plains"},
        {name:"Manectric", method:"Grass",     levels:"37",    note:"Blocks: 10 Forest"},
        {name:"Corphish",  method:"Super Rod", levels:"46–48", note:"Blocks: 15–20 Waterside"},
        {name:"Budew",     method:"Grass",     levels:"40",    note:"Blocks: 18 Forest"},
        {name:"Gible",     method:"Grass",     levels:"44",    note:"Blocks: 49 Plains + 49 Peak + area active 100 days", warn:true},
      ] },
      { label:"Wasteland", items:[], trainers:[], pokemon:[
        {name:"Magnemite",  method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Onix",       method:"Grass", levels:"15–17", rate:"20%"},
        {name:"Kangaskhan", method:"Grass", levels:"15–17", rate:"20%"},
        {name:"Machop",     method:"Grass", levels:"16–17", rate:"20%"},
        {name:"Machoke",    method:"Grass", levels:"17",    rate:"10%"},
        {name:"Fearow",     method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Golduck",    method:"Grass", levels:"45",    note:"Blocks: 3 Waterside"},
        {name:"Bellsprout", method:"Grass", levels:"41",    note:"Blocks: 3 Forest"},
        {name:"Kingler",    method:"Grass", levels:"48",    note:"Blocks: 10 Waterside"},
        {name:"Manectric",  method:"Grass", levels:"41",    note:"Blocks: 3 Plains"},
        {name:"Illumise",   method:"Grass", levels:"46",    note:"Blocks: 10 Plains"},
        {name:"Medicham",   method:"Grass", levels:"44",    note:"Blocks: 35 Forest + area active 20 days"},
        {name:"Breloom",    method:"Grass", levels:"46",    note:"Blocks: 42 Forest + area active 20 days"},
        {name:"Solrock",    method:"Grass", levels:"45–46", note:"Blocks: 42 Peak + area active 30 days"},
        {name:"Skorupi",    method:"Grass", levels:"44–45", note:"Blocks: 28 Peak"},
      ] },
      { label:"Savannah", items:[], trainers:[], pokemon:[
        {name:"Nidoran♀",  method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Nidoran♂",  method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Tauros",    method:"Grass", levels:"15–17", rate:"30%"},
        {name:"Rhyhorn",   method:"Grass", levels:"17",    rate:"10%"},
        {name:"Nidorina",  method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Nidorino",  method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Zubat",     method:"Grass", levels:"15–17", rate:"30%", time:"night"},
        {name:"Golbat",    method:"Grass", levels:"17",    rate:"10%", time:"night"},
        {name:"Rhydon",    method:"Grass", levels:"44",    note:"Blocks: 10 Peak"},
        {name:"Houndour",  method:"Grass", levels:"42",    note:"Blocks: 4 Forest"},
        {name:"Zigzagoon", method:"Grass", levels:"38",    note:"Blocks: 10 Plains"},
        {name:"Azurill",   method:"Grass", levels:"42",    note:"Blocks: 5 Waterside"},
        {name:"Shroomish", method:"Grass", levels:"45",    note:"Blocks: 35 Forest + 12 Plains + area active 20 days"},
        {name:"Cacturne",  method:"Grass", levels:"42",    note:"Blocks: 35 Forest + area active 20 days"},
        {name:"Luxio",     method:"Grass", levels:"45–46", note:"Blocks: 24 Plains"},
        {name:"Torkoal",   method:"Grass", levels:"46–47", note:"Blocks: 35 Peak + area active 30 days"},
      ] },
      { label:"Wetland", items:[], trainers:[], pokemon:[
        {name:"Farfetch'd", method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Sentret",    method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Spearow",    method:"Grass",     levels:"15–17", rate:"30%"},
        {name:"Ditto",      method:"Grass",     levels:"17",    rate:"10%"},
        {name:"Psyduck",    method:"Grass",     levels:"15–16", rate:"20%", time:"night"},
        {name:"Golduck",    method:"Grass",     levels:"17",    rate:"20%", time:"night"},
        {name:"Wooper",     method:"Grass",     levels:"15–17", rate:"40%", time:"night"},
        {name:"Quagsire",   method:"Grass",     levels:"16–17", rate:"20%", time:"night"},
        {name:"Psyduck",    method:"Surf",      levels:"16–17", rate:"20%"},
        {name:"Poliwag",    method:"Surf",      levels:"15–16", rate:"30%"},
        {name:"Wooper",     method:"Surf",      levels:"15–16", rate:"30%"},
        {name:"Quagsire",   method:"Surf",      levels:"16–17", rate:"20%"},
        {name:"Poliwag",    method:"Old Rod",   levels:"12–15", rate:"40%"},
        {name:"Magikarp",   method:"Old Rod",   levels:"12–15", rate:"60%"},
        {name:"Poliwag",    method:"Good Rod",  levels:"22–24", rate:"70%"},
        {name:"Poliwhirl",  method:"Good Rod",  levels:"23–25", rate:"30%"},
        {name:"Poliwag",    method:"Super Rod", levels:"35–37", rate:"50%"},
        {name:"Poliwhirl",  method:"Super Rod", levels:"35–37", rate:"50%"},
        {name:"Furret",     method:"Grass",     levels:"37",    note:"Blocks: 2 Plains"},
        {name:"Doduo",      method:"Grass",     levels:"45",    note:"Blocks: 4 Peak"},
        {name:"Lombre",     method:"Grass",     levels:"47",    note:"Blocks: 14 Plains"},
        {name:"Surskit",    method:"Grass",     levels:"40",    note:"Blocks: 6 Plains"},
        {name:"Corphish",   method:"Good Rod",  levels:"26–28", note:"Blocks: 10–14 Waterside"},
        {name:"Gyarados",   method:"Super Rod", levels:"44–48", note:"Blocks: 6–9 Waterside"},
        {name:"Pachirisu",  method:"Grass",     levels:"43",    note:"Blocks: 8 Forest"},
        {name:"Buizel",     method:"Grass",     levels:"44–45", note:"Blocks: 35 Waterside + area active 40 days"},
        {name:"Shelgon",    method:"Grass",     levels:"46",    note:"Blocks: 63 Peak + area active 70 days", warn:true},
      ] },
    ] },

  // ─── PART 11 ─────────────────────────────────────────────────────────────────
  { part:"Part 11", id:"mahogany-town", name:"Mahogany Town",
    note:"Quiet mountain town. A souvenir shop blocks the Gym until Team Rocket is cleared.",
    pokemon:[], items:[
      {name:"Rage Candy Bar", hidden:false, note:"From the man near the east exit — ₽300 each"},
    ],
    trainers:[] },

  { part:"Part 11", id:"route-43", name:"Route 43",
    note:"Route from Mahogany to Lake of Rage. Pay ₽1000 to skip the gate or use the free fence path. Blk Apricorn and TM36 require Surf+Cut.",
    pokemon:[
      {name:"Pidgeotto", method:"Grass",   levels:"17",    rate:"25%", time:"morning", note:"Morning HG/SS"},
      {name:"Pidgeotto", method:"Grass",   levels:"17",    rate:"20%", time:"day",     note:"Day HG/SS"},
      {name:"Venonat",   method:"Grass",   levels:"16",    rate:"5%",  time:"morning"},
      {name:"Venonat",   method:"Grass",   levels:"15–17", rate:"15%", time:"night"},
      {name:"Noctowl",   method:"Grass",   levels:"17",    rate:"20%", time:"night"},
      {name:"Mareep",    method:"Grass",   levels:"15",    rate:"10%", time:"morning"},
      {name:"Mareep",    method:"Grass",   levels:"16",    rate:"5%",  time:"night"},
      {name:"Flaaffy",   method:"Grass",   levels:"15",    rate:"30%", time:"morning"},
      {name:"Flaaffy",   method:"Grass",   levels:"15",    rate:"30%", time:"night"},
      {name:"Flaaffy",   method:"Grass",   levels:"15–17", rate:"40%", time:"day"},
      {name:"Girafarig", method:"Grass",   levels:"15",    rate:"30%"},
      {name:"Magikarp",  method:"Surf",    levels:"5–25",  rate:"100%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Poliwag",   method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Poliwag",   method:"Good Rod",levels:"20",    rate:"60%"},
      {name:"Magikarp",  method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Hoothoot",  method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Pineco",    method:"Headbutt (Common)", levels:"15–16", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Blk Apricorn", hidden:false, note:"W of larger pond, on tree — daily (requires Surf+Cut)"},
      {name:"Max Ether",    hidden:false, note:"W of the gate, on the ledge"},
      {name:"Poké Doll",    hidden:false, note:"Sometimes from Picnicker Tiffany after phone registration"},
      {name:"TM36 Sludge Bomb", hidden:false, note:"In the gate, from guard after Team Rocket is defeated (same visit)"},
    ],
    trainers:[
      {class:"Camper",     name:"Spencer", team:[{name:"Sandshrew", level:18},{name:"Sandslash", level:18},{name:"Zubat", level:20}]},
      {class:"Picnicker",  name:"Tiffany", team:[{name:"Clefairy", level:21}]},
      {class:"Poké Maniac",name:"Brent",   team:[{name:"Nidorina", level:20},{name:"Nidorino", level:24}]},
      {class:"Poké Maniac",name:"Beckett", team:[{name:"Slowbro", level:20}]},
      {class:"Poké Maniac",name:"Ron",     team:[{name:"Nidoking", level:20}]},
      {class:"Fisherman",  name:"Marvin",  team:[{name:"Magikarp", level:10},{name:"Gyarados", level:20},{name:"Magikarp", level:15}]},
    ] },

  { part:"Part 11", id:"lake-of-rage", name:"Lake of Rage",
    note:"The Red Gyarados appears here — use the Red Scale it drops for the EXP. Share from Mr. Pokémon. Some items require Cut (Wed) or Surf.",
    pokemon:[
      {name:"Magikarp",  method:"Surf",     levels:"5–20",  rate:"90%"},
      {name:"Gyarados",  method:"Surf",     levels:"10–20", rate:"10%"},
      {name:"Magikarp",  method:"Old Rod",  levels:"10",    rate:"100%"},
      {name:"Magikarp",  method:"Good Rod", levels:"20",    rate:"90%"},
      {name:"Gyarados",  method:"Good Rod", levels:"20",    rate:"10%"},
      {name:"Hoothoot",  method:"Headbutt (Common)", levels:"14–16", rate:"50%"},
      {name:"Pineco",    method:"Headbutt (Common)", levels:"14–16", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"14–16", rate:"20%"},
    ],
    items:[
      {name:"Red Scale",    hidden:false, note:"Automatically obtained after battling Red Gyarados (Surf required)"},
      {name:"Rare Candy",   hidden:true,  note:"NE of Fishing Guru's house, gap between trees"},
      {name:"Ether",        hidden:false, note:"From Fishing Guru after showing a record-breaking Magikarp"},
      {name:"Choice Specs", hidden:false, note:"N edge of flooded lake, E patch (requires Surf)"},
      {name:"Max Potion",   hidden:true,  note:"N edge of flooded lake, E patch (requires Surf)"},
      {name:"Full Heal",    hidden:false, note:"S edge of lake, small patch (Wed only, requires Surf)"},
      {name:"Full Restore", hidden:true,  note:"SW of lake, between two E ledges"},
      {name:"Red Flute",    hidden:false, note:"W of flooded lake, small patch (requires Surf)"},
      {name:"Max Revive",   hidden:false, note:"Dead-end path S of secluded house (Wed only, requires Cut)"},
      {name:"Black Belt",   hidden:false, note:"From Week Sibling Wesley (Wed), W of secluded house"},
      {name:"TM10 Hidden Power", hidden:false, note:"From man in secluded house (requires Surf)"},
      {name:"TM43 Secret Power", hidden:false, note:"N edge of flooded lake, W patch (requires Surf)"},
      {name:"Full Restore", hidden:false, note:"Dead-end path N of lake's NE corner (Wed only, requires Cut)"},
    ],
    trainers:[
      {class:"Fisherman",  name:"Andre",  note:"Available Mon/Tue/Thu–Sun after Red Gyarados battle.", team:[{name:"Gyarados", level:27}]},
      {class:"Fisherman",  name:"Raymond",note:"Available Mon/Tue/Thu–Sun after Red Gyarados battle.", team:[{name:"Magikarp", level:22},{name:"Magikarp", level:22},{name:"Magikarp", level:22},{name:"Magikarp", level:22}]},
      {class:"Ace Trainer",name:"Lois",   team:[{name:"Mareep", level:25},{name:"Ninetales", level:25}]},
      {class:"Ace Trainer",name:"Alton",  note:"Wednesday only, after clearing Team Rocket HQ.", team:[{name:"Ivysaur", level:24},{name:"Charmeleon", level:24},{name:"Wartortle", level:24}]},
    ] },

  { part:"Part 11", id:"team-rocket-hq", name:"Team Rocket HQ",
    note:"Hidden under the Mahogany souvenir shop. Three basement floors. Lance is on B2F. Petrel is the boss on B3F.",
    floors:[
      { label:"B1F", pokemon:[], items:[
        {name:"Guard Spec.",  hidden:false, note:"Interior room, E of Scientist Gregg"},
        {name:"Hyper Potion", hidden:false, note:"Interior N hallway, E of statue"},
        {name:"Revive",       hidden:true,  note:"E-central room, NE corner"},
        {name:"Nugget",       hidden:false, note:"Southern hallway"},
      ], trainers:[
        {class:"Team Rocket Grunt", name:"",      team:[{name:"Rattata", level:16},{name:"Rattata", level:16},{name:"Rattata", level:16},{name:"Rattata", level:16}]},
        {class:"Scientist",         name:"Gregg",  team:[{name:"Magnemite", level:20},{name:"Magnemite", level:20},{name:"Magnemite", level:20}]},
        {class:"Team Rocket Grunt", name:"",      team:[{name:"Venonat", level:18},{name:"Venonat", level:18}]},
        {class:"Team Rocket Grunt", name:"",      team:[{name:"Golbat", level:18}]},
        {class:"Team Rocket Grunt", name:"",      team:[{name:"Rattata", level:17},{name:"Rattata", level:17},{name:"Zubat", level:17}]},
      ] },
      { label:"B2F", pokemon:[], items:[
        {name:"Full Heal",      hidden:true,  note:"S exterior hallway, middle of three boxes"},
        {name:"X Special",      hidden:true,  note:"On machine to right of computer"},
        {name:"TM46 Thief",     hidden:false, note:"W side, accessed via B3F NW"},
        {name:"HM05 Whirlpool", hidden:false, note:"From Lance after disabling the machine"},
      ], trainers:[
        {class:"Scientist",          name:"Ross",  team:[{name:"Koffing", level:22},{name:"Koffing", level:22}]},
        {class:"Team Rocket Grunt F",name:"",      team:[{name:"Ekans", level:18},{name:"Gloom", level:18}]},
        {class:"Team Rocket Grunt",  name:"",      team:[{name:"Drowzee", level:17},{name:"Zubat", level:19}]},
        {class:"Team Rocket Grunt",  name:"",      team:[{name:"Zubat", level:16},{name:"Grimer", level:17},{name:"Rattata", level:18}]},
      ] },
      { label:"B3F", pokemon:[], items:[
        {name:"Full Heal",   hidden:false, note:"Eastern hallway"},
        {name:"X Special",   hidden:false, note:"SW room, E side of potted plants"},
        {name:"Protein",     hidden:false, note:"SW room, W side of potted plants"},
        {name:"TM49 Snatch", hidden:false, note:"N end of central hallway"},
        {name:"Ultra Ball",  hidden:false, note:"NW area, E of Petrel's room door"},
      ], trainers:[
        {class:"Scientist",         name:"Mitch",  team:[{name:"Ditto", level:24}]},
        {class:"Team Rocket Grunt", name:"",       team:[{name:"Raticate", level:19}]},
        {class:"Executive",         name:"Petrel", note:"Boss of the HQ. Defeat him to obtain the Basement Key.", team:[{name:"Koffing", level:22},{name:"Koffing", level:22},{name:"Weezing", level:24},{name:"Koffing", level:22},{name:"Weezing", level:24}]},
      ] },
    ] },

  { part:"Part 11", id:"mahogany-gym", name:"Mahogany Gym",
    note:"Ice-type gym. Leader: Pryce. Badge: Glacier Badge (enables Whirlpool). Slippery ice tile puzzle.",
    pokemon:[], items:[
      {name:"TM07 Hail", hidden:false, note:"From Gym Leader Pryce after defeating him"},
    ],
    trainers:[
      {class:"Skier",   name:"Diana",   team:[{name:"Jynx", level:29}]},
      {class:"Boarder", name:"Patton",  team:[{name:"Swinub", level:27},{name:"Swinub", level:27}]},
      {class:"Boarder", name:"Deandre", team:[{name:"Seel", level:25},{name:"Dewgong", level:26},{name:"Seel", level:25}]},
      {class:"Skier",   name:"Jill",    team:[{name:"Dewgong", level:29}]},
      {class:"Boarder", name:"Gerardo", team:[{name:"Shellder", level:25},{name:"Cloyster", level:26},{name:"Seel", level:25}]},
      {class:"Leader",  name:"Pryce",   team:[{name:"Seel", level:30},{name:"Dewgong", level:32},{name:"Piloswine", level:34}]},
    ] },

  // ─── PART 12 ─────────────────────────────────────────────────────────────────
  { part:"Part 12", id:"radio-tower", name:"Radio Tower",
    note:"Goldenrod City Radio Tower, taken over by Team Rocket. Floors 1F–5F. Use the Basement Key from Petrel to access upper floors. Card Key from Underground director unlocks 4F rooms.",
    floors:[
      { label:"1F", pokemon:[], items:[], trainers:[
        {class:"Team Rocket Grunt", name:"", team:[{name:"Raticate", level:24},{name:"Raticate", level:24}]},
      ] },
      { label:"2F", pokemon:[], items:[], trainers:[
        {class:"Team Rocket Grunt F",name:"", team:[{name:"Arbok", level:26}]},
        {class:"Team Rocket Grunt",  name:"", team:[{name:"Rattata", level:21},{name:"Rattata", level:21},{name:"Rattata", level:23},{name:"Rattata", level:23},{name:"Rattata", level:23}]},
        {class:"Team Rocket Grunt",  name:"", team:[{name:"Zubat", level:26},{name:"Zubat", level:26}]},
        {class:"Team Rocket Grunt",  name:"", team:[{name:"Grimer", level:23},{name:"Grimer", level:23},{name:"Muk", level:25}]},
      ] },
      { label:"3F", pokemon:[], items:[], trainers:[
        {class:"Team Rocket Grunt",name:"",       team:[{name:"Koffing", level:23},{name:"Zubat", level:23},{name:"Rattata", level:23},{name:"Grimer", level:23}]},
        {class:"Scientist",        name:"Garett",  team:[{name:"Magnemite", level:27},{name:"Magnemite", level:27},{name:"Magnemite", level:27}]},
        {class:"Team Rocket Grunt",name:"",        team:[{name:"Weezing", level:26}]},
      ] },
      { label:"4F", pokemon:[], items:[
        {name:"Basement Key", hidden:false, note:"From Petrel on 5F after defeating him"},
      ], trainers:[
        {class:"Team Rocket Grunt",  name:"", team:[{name:"Zubat", level:22},{name:"Golbat", level:24},{name:"Grimer", level:22}]},
        {class:"Scientist",          name:"Trenton", team:[{name:"Porygon", level:30}]},
        {class:"Team Rocket Grunt F",name:"", team:[{name:"Ekans", level:21},{name:"Ekans", level:21},{name:"Oddish", level:23},{name:"Gloom", level:24}]},
        {class:"Executive",          name:"Archer", note:"Encountered after obtaining Basement Key — Requires Card Key to access.", team:[{name:"Houndour", level:24},{name:"Houndour", level:24},{name:"Houndoom", level:28}]},
        {class:"Executive",          name:"Petrel", note:"5F — disguised as the director. Defeat him to get the Basement Key.", team:[{name:"Koffing", level:24},{name:"Koffing", level:24},{name:"Koffing", level:26},{name:"Koffing", level:24},{name:"Weezing", level:26}]},
      ] },
    ] },

  { part:"Part 12", id:"goldenrod-underground", name:"Goldenrod Underground",
    note:"Underground shopping mall-turned-Team-Rocket-base. B2F is the patrol area; the Warehouse holds the captured Director.",
    floors:[
      { label:"B2F", pokemon:[], items:[
        {name:"Full Heal",  hidden:false, note:"N-central hallway"},
        {name:"Smoke Ball", hidden:false, note:"SW room"},
      ], trainers:[
        {class:"Team Rocket Grunt", name:"", team:[{name:"Rattata", level:27}]},
        {class:"Team Rocket Grunt", name:"", team:[{name:"Muk", level:23},{name:"Koffing", level:23},{name:"Rattata", level:25}]},
        {class:"Team Rocket Grunt", name:"", team:[{name:"Koffing", level:24},{name:"Muk", level:24}]},
        {class:"Burglar",           name:"Duncan", team:[{name:"Koffing", level:23},{name:"Koffing", level:23},{name:"Magmar", level:25}]},
        {class:"Burglar",           name:"Orson",  team:[{name:"Growlithe", level:26},{name:"Koffing", level:24}]},
        {class:"Team Rocket Grunt F",name:"",      team:[{name:"Gloom", level:25},{name:"Gloom", level:25}]},
        {class:"Team Rocket Grunt", name:"",       team:[{name:"Raticate", level:24},{name:"Golbat", level:24}]},
        {class:"Team Rocket Grunt", name:"",       team:[{name:"Grimer", level:26},{name:"Weezing", level:23}]},
        {class:"Team Rocket Grunt", name:"",       team:[{name:"Koffing", level:25},{name:"Koffing", level:25}]},
      ] },
      { label:"Warehouse", pokemon:[], items:[
        {name:"Ultra Ball",   hidden:false, note:"NW area"},
        {name:"Max Potion",   hidden:true,  note:"Between first three crates and fourth crate"},
        {name:"Max Ether",    hidden:false, note:"SE corner"},
        {name:"Revive",       hidden:true,  note:"On easternmost box near east wall"},
        {name:"TM82 Sleep Talk", hidden:false, note:"Interior room, next to the Director"},
        {name:"Card Key",     hidden:false, note:"From the captured Director"},
      ], trainers:[
        {class:"Team Rocket Grunt", name:"", team:[{name:"Raticate", level:24},{name:"Koffing", level:26}]},
        {class:"Team Rocket Grunt", name:"", team:[{name:"Zubat", level:22},{name:"Golbat", level:24},{name:"Grimer", level:22}]},
        {class:"Scientist",         name:"Trenton", team:[{name:"Porygon", level:30}]},
        {class:"Team Rocket Grunt F",name:"",       team:[{name:"Ekans", level:21},{name:"Ekans", level:21},{name:"Oddish", level:23},{name:"Gloom", level:24}]},
      ] },
    ] },

  { part:"Part 12", id:"route-44", name:"Route 44",
    note:"Lush route between Mahogany and the Ice Path. Red Apricorn is near Mahogany. Carbos from Bird Keeper Vance rematch.",
    pokemon:[
      {name:"Bellsprout", method:"Grass",   levels:"22",    rate:"20%"},
      {name:"Weepinbell", method:"Grass",   levels:"22–24", rate:"35%"},
      {name:"Lickitung",  method:"Grass",   levels:"24–26", rate:"15%"},
      {name:"Tangela",    method:"Grass",   levels:"23",    rate:"30%"},
      {name:"Poliwag",    method:"Surf",    levels:"15–30", rate:"90%"},
      {name:"Poliwhirl",  method:"Surf",    levels:"20–30", rate:"10%"},
      {name:"Magikarp",   method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Poliwag",    method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Poliwag",    method:"Good Rod",levels:"20",    rate:"55%"},
      {name:"Magikarp",   method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Remoraid",   method:"Good Rod",levels:"20",    rate:"5%"},
      {name:"Spearow",    method:"Headbutt (Common)", levels:"21–22", rate:"50%"},
      {name:"Heracross",  method:"Headbutt (Common)", levels:"21–22", rate:"30%"},
      {name:"Aipom",      method:"Headbutt (Common)", levels:"21–22", rate:"20%"},
    ],
    items:[
      {name:"Red Apricorn", hidden:false, note:"NW tree near Mahogany Town — daily"},
      {name:"Max Repel",    hidden:false, note:"Between two W ponds, N of road"},
      {name:"Max Revive",   hidden:false, note:"In tall grass between two ponds (requires Surf)"},
      {name:"Elixir",       hidden:true,  note:"Dead-end path in trees, E of easternmost pond"},
      {name:"Ultra Ball",   hidden:false, note:"NE of larger eastern pond"},
      {name:"Carbos",       hidden:false, note:"From Bird Keeper Vance after phone rematch"},
    ],
    trainers:[
      {class:"Psychic",    name:"Phil",  team:[{name:"Natu", level:27},{name:"Kadabra", level:29}]},
      {class:"Fisherman",  name:"Edgar", team:[{name:"Remoraid", level:28},{name:"Remoraid", level:28}]},
      {class:"Ace Trainer",name:"Cybil", team:[{name:"Mareep", level:29},{name:"Bellossom", level:29}]},
      {class:"Ace Trainer",name:"Allen", team:[{name:"Charmeleon", level:29},{name:"Magnemite", level:29}]},
      {class:"Poké Maniac",name:"Zach",  team:[{name:"Rhyhorn", level:30}]},
      {class:"Fisherman",  name:"Wilton",team:[{name:"Goldeen", level:26},{name:"Goldeen", level:26},{name:"Seaking", level:28}]},
      {class:"Bird Keeper",name:"Vance", team:[{name:"Hoothoot", level:28},{name:"Pidgeotto", level:28}]},
    ] },

  { part:"Part 12", id:"ice-path", name:"Ice Path",
    note:"Icy cave connecting Mahogany Town to Blackthorn City. HM07 Waterfall is on 1F. Some items require Strength.",
    floors:[
      { label:"1F", pokemon:[
        {name:"Zubat",    method:"Cave", levels:"22", rate:"HG 25%/SS 5%", time:"morning"},
        {name:"Golbat",   method:"Cave", levels:"22", rate:"30%"},
        {name:"Jynx",     method:"Cave", levels:"22", rate:"10%", time:"day",   note:"Day slightly higher"},
        {name:"Swinub",   method:"Cave", levels:"21–23", rate:"40%"},
        {name:"Delibird", method:"Cave", levels:"22", rate:"20%", ssOnly:true},
      ], items:[
        {name:"HM07 Waterfall", hidden:false, note:"NW — east edge of third ice patch"},
        {name:"Max Potion",     hidden:true,  note:"NW — southwesternmost rock on second ice patch"},
        {name:"Ice Heal",       hidden:true,  note:"NW — east end of northernmost ridge, middle stalagmite"},
        {name:"Protein",        hidden:false, note:"SE — ridge N of final ice patch"},
        {name:"PP Up",          hidden:false, note:"SE — NW of Blackthorn City exit"},
      ], trainers:[] },
      { label:"B1F", pokemon:[
        {name:"Zubat",    method:"Cave", levels:"22", rate:"HG 25%/SS 5%", time:"morning"},
        {name:"Golbat",   method:"Cave", levels:"22", rate:"30%"},
        {name:"Jynx",     method:"Cave", levels:"22", rate:"10%", time:"day"},
        {name:"Swinub",   method:"Cave", levels:"21–23", rate:"40%"},
        {name:"Delibird", method:"Cave", levels:"22", rate:"20%", ssOnly:true},
      ], items:[
        {name:"Revive", hidden:true,  note:"On stalagmite, two steps E of Iron"},
        {name:"Iron",   hidden:false, note:"SW edge of ice patch (requires Strength)"},
      ], trainers:[] },
      { label:"B2F", pokemon:[
        {name:"Zubat",    method:"Cave", levels:"23", rate:"HG 25%/SS 5%", time:"morning"},
        {name:"Golbat",   method:"Cave", levels:"23", rate:"30%"},
        {name:"Jynx",     method:"Cave", levels:"23", rate:"10%", time:"day"},
        {name:"Swinub",   method:"Cave", levels:"22–24", rate:"40%"},
        {name:"Delibird", method:"Cave", levels:"23", rate:"20%", ssOnly:true},
      ], items:[
        {name:"Max Potion",   hidden:false, note:"W — NW area"},
        {name:"Carbos",       hidden:true,  note:"W — SE area"},
        {name:"Full Heal",    hidden:false, note:"W — clear patch in center"},
        {name:"TM72 Avalanche",hidden:false,note:"E — SE corner"},
      ], trainers:[] },
      { label:"B3F", pokemon:[], items:[
        {name:"NeverMeltIce", hidden:false, note:"S of rocky ridge"},
      ], trainers:[] },
    ] },

  // ─── PART 13 ─────────────────────────────────────────────────────────────────
  { part:"Part 13", id:"blackthorn-city", name:"Blackthorn City",
    note:"Dragon-user city. Move Deleter, Move Reminder, and Grandma Wilma (teaches Draco Meteor to friendly Dragon-types) are in the south house.",
    pokemon:[
      {name:"Magikarp",  method:"Surf",    levels:"2–20",  rate:"100%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Poliwag",   method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Magikarp",  method:"Good Rod",levels:"20",    rate:"60%"},
      {name:"Poliwag",   method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Dodrio",    method:"Trade",   levels:"Same",  rate:"One", note:"Trade female Dragonair → Doris the Dodrio"},
    ],
    items:[
      {name:"Soft Sand",  hidden:false, note:"From Santos (Sat) on ledge SE of Gym"},
      {name:"Smoke Ball", hidden:false, note:"Held by Doris the Dodrio (trade)"},
    ],
    trainers:[] },

  { part:"Part 13", id:"blackthorn-gym", name:"Blackthorn Gym",
    note:"Dragon-type gym. Leader: Clair. Badge: Rising Badge (enables Waterfall). Platform puzzle across lava. Must clear Dragon's Den quiz to receive the badge.",
    pokemon:[], items:[],
    trainers:[
      {class:"Ace Trainer",name:"Paulo", team:[{name:"Dratini", level:35},{name:"Dratini", level:35},{name:"Seadra", level:35}]},
      {class:"Ace Trainer",name:"Lola",  team:[{name:"Dratini", level:35},{name:"Dragonair", level:37}]},
      {class:"Ace Trainer",name:"Cody",  team:[{name:"Horsea", level:35},{name:"Seadra", level:37}]},
      {class:"Ace Trainer",name:"Fran",  team:[{name:"Seadra", level:38}]},
      {class:"Ace Trainer",name:"Mike",  team:[{name:"Dragonair", level:38}]},
      {class:"Leader",     name:"Clair", note:"After passing Dragon's Den quiz, Clair gives TM59 Dragon Pulse near the gym entrance.", team:[{name:"Gyarados", level:38},{name:"Dragonair", level:38},{name:"Dragonair", level:38},{name:"Kingdra", level:41}]},
    ] },

  { part:"Part 13", id:"dragons-den", name:"Dragon's Den",
    note:"Sacred cave behind Blackthorn Gym. Requires Surf+Whirlpool to access the shrine. Pass the elder's quiz to receive the Rising Badge from Clair.",
    pokemon:[
      {name:"Magikarp",  method:"Surf",    levels:"5–20",  rate:"90%"},
      {name:"Dratini",   method:"Surf",    levels:"5–15",  rate:"10%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"100%"},
      {name:"Magikarp",  method:"Good Rod",levels:"20",    rate:"90%"},
      {name:"Dratini",   method:"Good Rod",levels:"20",    rate:"10%"},
      {name:"Dratini",   method:"Gift",    levels:"15",    rate:"One", warn:true, note:"From Dragon Master after receiving TM59 from Clair"},
    ],
    items:[
      {name:"Revive",      hidden:true,  note:"W side N area, lone rock W of Ace Trainer Kobe"},
      {name:"Calcium",     hidden:false, note:"E side N area, lowest level before water"},
      {name:"Max Potion",  hidden:true,  note:"NW area, near Ace Trainer Piper (requires Surf)"},
      {name:"Max Elixir",  hidden:false, note:"SE corner of shrine platform (requires Surf) + W shore (requires Surf)"},
      {name:"Dragon Fang", hidden:false, note:"E-central area, upper level (requires Surf+Whirlpool)"},
      {name:"TM59 Dragon Pulse", hidden:false, note:"From Clair after clearing the elder's quiz"},
    ],
    trainers:[
      {class:"Ace Trainer",name:"Kobe",      team:[{name:"Dragonair", level:37}]},
      {class:"Ace Trainer",name:"Piper",     team:[{name:"Horsea", level:33},{name:"Horsea", level:33},{name:"Seadra", level:35}]},
      {class:"Twins",      name:"Clea & Gil",team:[{name:"Dratini", level:35},{name:"Dratini", level:35}]},
    ] },

  { part:"Part 13", id:"route-45", name:"Route 45",
    note:"Rocky descent from Blackthorn to Dark Cave. HG: Gligar+Phanpy; SS: Teddiursa+Skarmory. PP Max requires Rock Climb via Route 46.",
    pokemon:[
      {name:"Geodude",  method:"Grass",   levels:"23",    rate:"30%"},
      {name:"Graveler", method:"Grass",   levels:"23–27", rate:"HG 40%/SS 55%"},
      {name:"Gligar",   method:"Grass",   levels:"24",    rate:"20%", hgOnly:true},
      {name:"Phanpy",   method:"Grass",   levels:"20",    rate:"10%", hgOnly:true},
      {name:"Teddiursa",method:"Grass",   levels:"20",    rate:"10%", ssOnly:true},
      {name:"Skarmory", method:"Grass",   levels:"27",    rate:"5%",  ssOnly:true},
      {name:"Magikarp", method:"Surf",    levels:"2–25",  rate:"100%"},
      {name:"Magikarp", method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Poliwag",  method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Poliwag",  method:"Good Rod",levels:"20",    rate:"60%"},
      {name:"Magikarp", method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Spearow",  method:"Headbutt (Common)", levels:"23–24", rate:"50%"},
      {name:"Aipom",    method:"Headbutt (Common)", levels:"23–24", rate:"20%"},
      {name:"Heracross",method:"Headbutt (Common)", levels:"23–24", rate:"30%"},
    ],
    items:[
      {name:"Elixir",    hidden:false, note:"W side, atop stairway between 2nd and 3rd bridges"},
      {name:"Max Potion",hidden:false, note:"E side, between two ledges SE of 3rd bridge"},
      {name:"Full Heal", hidden:false, note:"W side, large grass patch halfway through"},
      {name:"Nugget",    hidden:false, note:"W side, between two ledges SW of 5th bridge"},
      {name:"Revive",    hidden:false, note:"W side, southernmost grass patch"},
      {name:"Grn Apricorn",hidden:false,note:"Next to pond in south — daily"},
      {name:"Iron",      hidden:false, note:"From Hiker Parry after second phone rematch"},
    ],
    trainers:[
      {class:"Hiker",      name:"Erik",    team:[{name:"Machop", level:24},{name:"Graveler", level:27},{name:"Machop", level:27}]},
      {class:"Ace Trainer",name:"Ryan",    team:[{name:"Pidgeot", level:25},{name:"Electabuzz", level:27}]},
      {class:"Ace Trainer",name:"Kelly",   team:[{name:"Marill", level:27},{name:"Wartortle", level:24},{name:"Wartortle", level:24}]},
      {class:"Hiker",      name:"Parry",   team:[{name:"Onix", level:30}]},
      {class:"Black Belt", name:"Kenji",   team:[{name:"Machoke", level:28}]},
      {class:"Hiker",      name:"Timothy", team:[{name:"Diglett", level:27},{name:"Dugtrio", level:27}]},
      {class:"Hiker",      name:"Michael", team:[{name:"Geodude", level:25},{name:"Graveler", level:25},{name:"Golem", level:25}]},
    ] },

  { part:"Part 13", id:"dark-cave", name:"Dark Cave",
    note:"Cave split into NE and SW chambers. NE chamber (from Route 45) needs Surf for most items. SW chamber (from Route 31) has Rock Smash items.",
    floors:[
      { label:"NE Chamber", pokemon:[
        {name:"Geodude",  method:"Cave", levels:"2–4",  rate:"30%"},
        {name:"Zubat",    method:"Cave", levels:"2–4",  rate:"40%"},
        {name:"Wobbuffet",method:"Cave", levels:"4–6",  rate:"10%"},
        {name:"Graveler", method:"Cave", levels:"4–6",  rate:"20%"},
        {name:"Goldeen",  method:"Surf", levels:"10–25",rate:"60%"},
        {name:"Seaking",  method:"Surf", levels:"10–25",rate:"10%"},
        {name:"Magikarp", method:"Old Rod",  levels:"10", rate:"85%"},
        {name:"Goldeen",  method:"Old Rod",  levels:"10", rate:"15%"},
        {name:"Goldeen",  method:"Good Rod", levels:"20", rate:"60%"},
        {name:"Magikarp", method:"Good Rod", levels:"20", rate:"40%"},
      ], items:[
        {name:"Elixir",        hidden:true,  note:"Dead-end path S of first stairway"},
        {name:"Revive",        hidden:false, note:"On SE ridge (requires Surf)"},
        {name:"TM54 False Swipe",hidden:false,note:"SW ledge (requires Surf)"},
        {name:"Black Glasses", hidden:false, note:"NW corner, from man (requires Surf)"},
        {name:"Max Revive",    hidden:true,  note:"NW of shady man (requires Surf)"},
        {name:"Hyper Potion",  hidden:true,  note:"SW area, NE of cave opening (requires Surf)"},
      ], trainers:[] },
      { label:"SW Chamber", pokemon:[
        {name:"Geodude",  method:"Cave",       levels:"2–4", rate:"30%"},
        {name:"Zubat",    method:"Cave",       levels:"2–4", rate:"40%"},
        {name:"Wobbuffet",method:"Cave",       levels:"4–6", rate:"10%"},
        {name:"Geodude",  method:"Rock Smash", levels:"2–4", rate:"80%"},
        {name:"Graveler", method:"Rock Smash", levels:"4–6", rate:"20%"},
      ], items:[
        {name:"Potion",       hidden:false, note:"NE of Route 31 entrance"},
        {name:"Poké Ball",    hidden:true,  note:"NE of Route 31 entrance, on small jutting rock"},
        {name:"Black Flute",  hidden:false, note:"Dead-end path E of Route 31 entrance (requires Surf)"},
        {name:"Hyper Potion", hidden:false, note:"NE area, near northernmost ledge (requires Rock Smash)"},
        {name:"Max Ether",    hidden:true,  note:"Cave wall between two stalagmites (requires Rock Smash)"},
        {name:"Full Heal",    hidden:false, note:"SE area, N of Route 46 entrance (requires Rock Smash)"},
        {name:"Dire Hit",     hidden:false, note:"SE area, W-NW of Route 46 entrance (requires Rock Smash)"},
      ], trainers:[] },
    ] },

  { part:"Part 13", id:"route-46", name:"Route 46",
    note:"Short route connecting Route 45 and Route 29. Two apricorn trees W of Dark Cave entrance. Calcium from Picnicker Erin 2nd rematch.",
    pokemon:[
      {name:"Rattata", method:"Grass",   levels:"2–4",  rate:"25%", time:"morning"},
      {name:"Rattata", method:"Grass",   levels:"2–4",  rate:"55%", time:"night"},
      {name:"Spearow", method:"Grass",   levels:"2–3",  rate:"35%", time:"morning"},
      {name:"Geodude", method:"Grass",   levels:"2–3",  rate:"40%", time:"morning"},
      {name:"Geodude", method:"Grass",   levels:"2–3",  rate:"45%", time:"night"},
      {name:"Spearow", method:"Headbutt (Common)", levels:"2–3", rate:"50%"},
      {name:"Heracross",method:"Headbutt (Common)",levels:"2–3", rate:"30%"},
      {name:"Aipom",   method:"Headbutt (Common)", levels:"2–3", rate:"20%"},
    ],
    items:[
      {name:"Grn Apricorn", hidden:false, note:"W of Dark Cave entrance, E tree — daily"},
      {name:"Ylw Apricorn", hidden:false, note:"W of Dark Cave entrance, W tree — daily"},
      {name:"X Speed",      hidden:false, note:"W-central area, near Camper Ted and Picnicker Erin"},
      {name:"Calcium",      hidden:false, note:"From Picnicker Erin after second phone rematch"},
    ],
    trainers:[
      {class:"Camper",  name:"Ted",    team:[{name:"Rattata", level:7},{name:"Spearow", level:7}]},
      {class:"Picnicker",name:"Erin",  team:[{name:"Rattata", level:7},{name:"Spearow", level:7}]},
      {class:"Hiker",   name:"Bailey", team:[{name:"Geodude", level:13},{name:"Geodude", level:13},{name:"Geodude", level:13},{name:"Geodude", level:13},{name:"Geodude", level:13}]},
    ] },

  // ─── PART 14 ─────────────────────────────────────────────────────────────────
  { part:"Part 14", id:"new-bark-town-master-ball", name:"New Bark Town (Return — Master Ball)",
    note:"Return to Prof. Elm's lab after earning all 8 Johto badges. He gives you a Master Ball.",
    pokemon:[],
    items:[
      {name:"Master Ball", hidden:false, note:"From Professor Elm after earning all 8 Johto badges", warn:true},
    ],
    trainers:[] },

  { part:"Part 14", id:"ecruteak-dance-theater", name:"Ecruteak Dance Theater",
    note:"The 5 Kimono Girls challenge you in succession. Defeating all 5 leads them to summon Ho-Oh (HG) or Lugia (SS).",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Kimono Girl", name:"Zuki",  team:[{name:"Umbreon", level:38}]},
      {class:"Kimono Girl", name:"Naoko", team:[{name:"Espeon", level:38}]},
      {class:"Kimono Girl", name:"Miki",  team:[{name:"Flareon", level:38}]},
      {class:"Kimono Girl", name:"Sayo",  team:[{name:"Jolteon", level:38}]},
      {class:"Kimono Girl", name:"Kuni",  team:[{name:"Vaporeon", level:38}]},
    ] },

  { part:"Part 14", id:"bellchime-trail", name:"Bellchime Trail",
    note:"Short sacred path leading to Bell Tower. Always bathed in sunset light.",
    pokemon:[],
    items:[
      {name:"TinyMushroom", hidden:true,  note:"Three hidden mushrooms along north side of path"},
      {name:"Big Mushroom", hidden:true,  note:"Two hidden mushrooms: N-central and S of Bell Tower"},
    ],
    trainers:[] },

  { part:"Part 14", id:"bell-tower", name:"Bell Tower",
    note:"Sacred 10-floor tower. HG: Ho-Oh lv45 appears on the Rooftop with Rainbow Wing + Clear Bell. SS players skip this for now.",
    floors:[
      { label:"2F–6F", pokemon:[
        {name:"Rattata", method:"Cave", levels:"20–24", rate:"100%", time:"morning", note:"Morning/Day only"},
        {name:"Rattata", method:"Cave", levels:"22–24", rate:"20%",  time:"night"},
        {name:"Gastly",  method:"Cave", levels:"20–22", rate:"80%",  time:"night"},
      ], items:[
        {name:"Full Heal",  hidden:false, note:"3F SW corner"},
        {name:"Max Potion", hidden:true,  note:"3F N-central area, on eastbound ramp"},
        {name:"Ultra Ball", hidden:false, note:"4F — E of pillar, left-hand path"},
        {name:"PP Up",      hidden:false, note:"4F — next to SE ladder"},
        {name:"Escape Rope",hidden:false, note:"4F — near SW ladder"},
        {name:"Rare Candy", hidden:false, note:"5F — next to pillar"},
        {name:"Full Restore",hidden:true, note:"5F — E-SE area N of stairs to 4F"},
        {name:"Max Potion", hidden:false, note:"6F — next to pillar"},
        {name:"Full Heal",  hidden:false, note:"6F — NW area"},
      ], trainers:[] },
      { label:"7F–10F", pokemon:[], items:[
        {name:"Max Revive",  hidden:false, note:"7F — NE corner"},
        {name:"Max Elixir",  hidden:false, note:"8F center — via warp panel on 9F"},
        {name:"Nugget",      hidden:false, note:"8F S — via warp panel on 9F"},
        {name:"Carbos",      hidden:true,  note:"8F N — patch of light under easternmost window"},
        {name:"Full Restore",hidden:false, note:"8F — NW corner"},
        {name:"HP Up",       hidden:false, note:"9F N — between two central statues via warp panel"},
      ], trainers:[] },
      { label:"Rooftop", pokemon:[
        {name:"Ho-Oh", method:"Gift", levels:"45", rate:"One", warn:true, hgOnly:true, note:"HG only — summoned by Kimono Girls with Clear Bell + Rainbow Wing"},
      ], items:[], trainers:[] },
    ] },

  { part:"Part 14", id:"whirl-islands", name:"Whirl Islands",
    note:"Island caves on Route 41. Requires Surf+Whirlpool. SS: Lugia lv45 appears on B3F Lower with Silver Wing + Tidal Bell. HG players skip this for now.",
    floors:[
      { label:"1F / B1F", pokemon:[
        {name:"Zubat",    method:"Cave", levels:"23", rate:"30%"},
        {name:"Golbat",   method:"Cave", levels:"23", rate:"5%"},
        {name:"Seel",     method:"Cave", levels:"22–24", rate:"15%"},
        {name:"Krabby",   method:"Cave", levels:"22–24", rate:"50%"},
        {name:"Tentacool",method:"Surf", levels:"15–25", rate:"60%"},
        {name:"Horsea",   method:"Surf", levels:"10–20", rate:"30%"},
        {name:"Tentacruel",method:"Surf",levels:"15–25", rate:"10%"},
        {name:"Magikarp", method:"Old Rod",  levels:"10", rate:"85%"},
        {name:"Krabby",   method:"Old Rod",  levels:"10", rate:"15%"},
        {name:"Krabby",   method:"Good Rod", levels:"20", rate:"50%"},
        {name:"Magikarp", method:"Good Rod", levels:"20", rate:"40%"},
        {name:"Horsea",   method:"Good Rod", levels:"20", rate:"10%"},
      ], items:[
        {name:"Ultra Ball",  hidden:false, note:"1F NE — rocky ridge near southern ladder"},
        {name:"Ultra Ball",  hidden:false, note:"1F SW — near eastern ladder"},
        {name:"Rare Candy",  hidden:true,  note:"1F SE — NW corner"},
        {name:"Carbos",      hidden:false, note:"B1F — W-central, between NW and SW ridges"},
        {name:"Pearl",       hidden:true,  note:"B1F — NW area, lone stalagmite"},
        {name:"Full Restore",hidden:false, note:"B1F — NW ledge"},
        {name:"Nugget",      hidden:false, note:"B1F — N-central, surrounded by C-shaped ridge"},
        {name:"Escape Rope", hidden:false, note:"B1F — S-central, W of boulder"},
        {name:"Ultra Ball",  hidden:true,  note:"B1F — E-central, short dead-end"},
        {name:"Calcium",     hidden:false, note:"B1F — SE corner ridge NE of ladder"},
        {name:"Ultra Ball",  hidden:true,  note:"B1F — NW side of SE ridge"},
        {name:"Super Repel", hidden:true,  note:"B1F — NE area, lone rock"},
        {name:"Revive",      hidden:true,  note:"B1F NE — middle of three rocks"},
      ], trainers:[] },
      { label:"B2F / B3F", pokemon:[
        {name:"Zubat",    method:"Cave", levels:"23–24", rate:"30%"},
        {name:"Golbat",   method:"Cave", levels:"23–24", rate:"5%"},
        {name:"Seel",     method:"Cave", levels:"22–25", rate:"15%"},
        {name:"Krabby",   method:"Cave", levels:"22–25", rate:"50%"},
        {name:"Horsea",   method:"Surf", levels:"15–25", rate:"60%"},
        {name:"Tentacruel",method:"Surf",levels:"15–25", rate:"30%"},
        {name:"Seadra",   method:"Surf", levels:"10–30", rate:"10%"},
        {name:"Lugia",    method:"Gift", levels:"45",    rate:"One", warn:true, ssOnly:true, note:"SS only — summoned with Silver Wing + Tidal Bell on B3F Lower"},
      ], items:[
        {name:"Max Elixir",  hidden:false, note:"B2F — W of southern ladder (via B1F)"},
        {name:"Full Restore",hidden:false, note:"B2F — two locations (via B1F)"},
        {name:"Max Revive",  hidden:false, note:"B2F NW area"},
        {name:"Rare Candy",  hidden:false, note:"B3F — rocky overhang above waterfall basin"},
      ], trainers:[] },
    ] },

  // ─── PART 15 ─────────────────────────────────────────────────────────────────
  { part:"Part 15", id:"route-27", name:"Route 27",
    note:"Kanto's westernmost seaside route. Start by Surfing east from New Bark Town. Bird Keeper Jose occasionally gives a Star Piece.",
    pokemon:[
      {name:"Raticate",  method:"Grass",   levels:"28–30", rate:"40%", hgOnly:true},
      {name:"Raticate",  method:"Grass",   levels:"28–30", rate:"20%", ssOnly:true, time:"morning", note:"Morning/Day SS"},
      {name:"Raticate",  method:"Grass",   levels:"28",    rate:"10%", ssOnly:true, time:"night",   note:"Night SS"},
      {name:"Arbok",     method:"Grass",   levels:"28",    rate:"30%", ssOnly:true},
      {name:"Sandslash", method:"Grass",   levels:"30",    rate:"5%",  hgOnly:true},
      {name:"Ponyta",    method:"Grass",   levels:"32",    rate:"5%"},
      {name:"Doduo",     method:"Grass",   levels:"28–30", rate:"HG 50%/SS 40%", time:"morning"},
      {name:"Quagsire",  method:"Grass",   levels:"28–30", rate:"HG 50%/SS 55%", time:"night"},
      {name:"Tentacool", method:"Surf",    levels:"15–20", rate:"90%"},
      {name:"Tentacruel",method:"Surf",    levels:"20",    rate:"10%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Tentacool", method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Magikarp",  method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Chinchou",  method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Tentacool", method:"Good Rod",levels:"20",    rate:"30%"},
      {name:"Shellder",  method:"Good Rod",levels:"20",    rate:"10%"},
      {name:"Hoothoot",  method:"Headbutt (Common)", levels:"28–29", rate:"50%"},
      {name:"Pineco",    method:"Headbutt (Common)", levels:"28–29", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"28–29", rate:"20%"},
      {name:"Spinarak",  method:"Headbutt (Rare)",   levels:"31–32", rate:"30%", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt (Rare)",   levels:"31–32", rate:"30%", ssOnly:true},
    ],
    items:[
      {name:"Rare Candy",  hidden:false, note:"Isolated land E-SE of Tohjo Falls (requires Surf)"},
      {name:"TM37 Sandstorm",hidden:false,note:"From elderly woman in E-side house if lead Pokémon is friendly"},
      {name:"TM02 Dragon Claw",hidden:false,note:"Isolated land S of W bridge (requires Surf+Whirlpool)"},
      {name:"Destiny Knot",hidden:false, note:"NE of eastern whirlpool, lowest cliff"},
      {name:"Revive",      hidden:true,  note:"Cliffside next to easternmost grass patch"},
      {name:"Star Piece",  hidden:false, note:"Sometimes from Bird Keeper Jose after phone registration"},
    ],
    trainers:[
      {class:"Ace Trainer",name:"Megan", team:[{name:"Bulbasaur", level:32},{name:"Ivysaur", level:32},{name:"Venusaur", level:32}]},
      {class:"Ace Trainer",name:"Blake", team:[{name:"Magneton", level:33},{name:"Quagsire", level:31},{name:"Exeggcute", level:31}]},
      {class:"Bird Keeper",name:"Jose",  team:[{name:"Noctowl", level:32}]},
      {class:"Ace Trainer",name:"Brian", team:[{name:"Mareep", level:35}]},
      {class:"Psychic",    name:"Eli",   team:[{name:"Starmie", level:30},{name:"Exeggcute", level:30},{name:"Girafarig", level:34}]},
      {class:"Ace Trainer",name:"Reena", team:[{name:"Growlithe", level:36},{name:"Nidorina", level:33},{name:"Staryu", level:36}]},
    ] },

  { part:"Part 15", id:"tohjo-falls", name:"Tohjo Falls",
    note:"Small cave connecting Johto and Kanto. Requires HM07 Waterfall and the Rising Badge to traverse. Moon Stone requires Surf+Waterfall.",
    pokemon:[
      {name:"Raticate",  method:"Cave", levels:"22",    rate:"30%"},
      {name:"Zubat",     method:"Cave", levels:"22",    rate:"30%"},
      {name:"Golbat",    method:"Cave", levels:"22",    rate:"20%"},
      {name:"Slowpoke",  method:"Cave", levels:"21–23", rate:"15%"},
      {name:"Rattata",   method:"Cave", levels:"20",    rate:"5%"},
      {name:"Goldeen",   method:"Surf", levels:"20",    rate:"60%"},
      {name:"Slowpoke",  method:"Surf", levels:"20",    rate:"30%"},
      {name:"Seaking",   method:"Surf", levels:"20",    rate:"10%"},
      {name:"Magikarp",  method:"Old Rod",  levels:"10", rate:"85%"},
      {name:"Goldeen",   method:"Old Rod",  levels:"10", rate:"15%"},
      {name:"Magikarp",  method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Goldeen",   method:"Good Rod", levels:"20", rate:"40%"},
    ],
    items:[
      {name:"Moon Stone", hidden:false, note:"W end of path behind two waterfalls (requires Surf+Waterfall)"},
    ],
    trainers:[] },

  { part:"Part 15", id:"route-26", name:"Route 26",
    note:"Long Kanto route north to the Pokémon League gate. Blue Apricorn NW of rest stop. Ace Trainers Gaven and Jamie give rematch calls.",
    pokemon:[
      {name:"Raticate",  method:"Grass",   levels:"28–30", rate:"35%",            time:"morning"},
      {name:"Raticate",  method:"Grass",   levels:"28–30", rate:"HG 35%/SS 65%", time:"night"},
      {name:"Arbok",     method:"Grass",   levels:"30",    rate:"5%",  ssOnly:true},
      {name:"Sandslash", method:"Grass",   levels:"28",    rate:"30%", hgOnly:true},
      {name:"Ponyta",    method:"Grass",   levels:"32",    rate:"20%"},
      {name:"Doduo",     method:"Grass",   levels:"28–30", rate:"40%", time:"morning"},
      {name:"Dodrio",    method:"Grass",   levels:"30",    rate:"5%",  hgOnly:true, time:"morning"},
      {name:"Quagsire",  method:"Grass",   levels:"30",    rate:"HG 10%/SS 5%", time:"night"},
      {name:"Tentacool", method:"Surf",    levels:"25–30", rate:"90%"},
      {name:"Tentacruel",method:"Surf",    levels:"30",    rate:"10%"},
      {name:"Magikarp",  method:"Old Rod", levels:"10",    rate:"85%"},
      {name:"Tentacool", method:"Old Rod", levels:"10",    rate:"15%"},
      {name:"Magikarp",  method:"Good Rod",levels:"20",    rate:"40%"},
      {name:"Tentacool", method:"Good Rod",levels:"20",    rate:"30%"},
      {name:"Chinchou",  method:"Good Rod",levels:"20",    rate:"20%"},
      {name:"Shellder",  method:"Good Rod",levels:"20",    rate:"10%"},
      {name:"Hoothoot",  method:"Headbutt (Common)", levels:"28–29", rate:"50%"},
      {name:"Pineco",    method:"Headbutt (Common)", levels:"28–29", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"28–29", rate:"20%"},
      {name:"Spinarak",  method:"Headbutt (Rare)",   levels:"31–32", rate:"30%", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt (Rare)",   levels:"31–32", rate:"30%", ssOnly:true},
    ],
    items:[
      {name:"Blu Apricorn", hidden:false, note:"NW of rest stop — daily"},
      {name:"Tiny Mushroom",hidden:true,  note:"NE area, cliffside between two trees"},
      {name:"Max Elixir",   hidden:false, note:"SW of gate, north of ledge pair"},
    ],
    trainers:[
      {class:"Fisherman",  name:"Scott",  team:[{name:"Qwilfish", level:30},{name:"Qwilfish", level:30},{name:"Seaking", level:34}]},
      {class:"Psychic",    name:"Vernon", team:[{name:"Espeon", level:36}]},
      {class:"Ace Trainer",name:"Joyce",  team:[{name:"Pikachu", level:36},{name:"Blastoise", level:36}]},
      {class:"Ace Trainer",name:"Gaven",  team:[{name:"Victreebel", level:32},{name:"Kingler", level:32},{name:"Flareon", level:32}]},
      {class:"Ace Trainer",name:"Jake",   team:[{name:"Parasect", level:33},{name:"Golduck", level:35},{name:"Vaporeon", level:33}]},
      {class:"Ace Trainer",name:"Jamie",  team:[{name:"Rapidash", level:36},{name:"Flaaffy", level:31}]},
    ] },

  { part:"Part 15", id:"victory-road", name:"Victory Road",
    note:"3-floor cave leading to the Pokémon League. Requires Strength, Rock Smash. HG: Donphan; SS: Ursaring.",
    floors:[
      { label:"1F", pokemon:[
        {name:"Golbat",   method:"Cave", levels:"32",    rate:"30%"},
        {name:"Graveler", method:"Cave", levels:"32",    rate:"30%"},
        {name:"Donphan",  method:"Cave", levels:"33",    rate:"20%", hgOnly:true},
        {name:"Ursaring", method:"Cave", levels:"33",    rate:"20%", ssOnly:true},
        {name:"Onix",     method:"Cave", levels:"34–36", rate:"15%"},
        {name:"Rhyhorn",  method:"Cave", levels:"35",    rate:"5%"},
        {name:"Geodude",  method:"Rock Smash", levels:"24–32", rate:"80%"},
        {name:"Graveler", method:"Rock Smash", levels:"30–33", rate:"20%"},
      ], items:[
        {name:"Potion",      hidden:false, note:"SE of bridge"},
        {name:"Full Heal",   hidden:true,  note:"S of bridge, southern ridge W side"},
        {name:"Full Heal",   hidden:false, note:"Between central ridges, under S end of bridge"},
        {name:"Max Potion",  hidden:true,  note:"W-central area, one step S of three rocks along wall"},
        {name:"Max Revive",  hidden:false, note:"NE area, narrow passage (requires Strength)"},
      ], trainers:[] },
      { label:"2F", pokemon:[], items:[
        {name:"Max Revive",  hidden:true,  note:"SW area, lone stalagmite between 1st and 2nd stairways"},
        {name:"Ultra Ball",  hidden:true,  note:"SE area, dark patch of ground"},
        {name:"Full Restore",hidden:false, note:"NE area, NW of boulder (requires Strength)"},
        {name:"HP Up",       hidden:false, note:"S — above the ledge"},
        {name:"PP Up",       hidden:true,  note:"S — dark ground above ledge"},
        {name:"TM26 Earthquake",hidden:false,note:"NW area, below stairway"},
      ], trainers:[] },
      { label:"3F", pokemon:[], items:[
        {name:"Hyper Potion",hidden:true,  note:"SE — stalagmite in NE corner"},
        {name:"Ultra Ball",  hidden:false, note:"NE — NE end of central ridge"},
        {name:"Zinc",        hidden:true,  note:"NE — behind breakable rock (requires Rock Smash)"},
        {name:"Rare Candy",  hidden:false, note:"NW area, behind large stalagmite"},
        {name:"TM79 Dark Pulse",hidden:false,note:"NW — behind three breakable rocks (requires Rock Smash)"},
      ], trainers:[] },
    ] },

  // ─── PART 16 ─────────────────────────────────────────────────────────────────
  { part:"Part 16", id:"indigo-plateau", name:"Indigo Plateau",
    note:"The Pokémon League. Face the Elite Four in order, then the Champion. Stock up at the Poké Mart on the lower level.",
    pokemon:[], items:[],
    trainers:[
      {class:"Elite Four", name:"Will",  note:"Psychic-type master. Use Bug, Ghost, or Dark moves.", team:[{name:"Xatu", level:40},{name:"Jynx", level:41},{name:"Slowbro", level:41},{name:"Exeggutor", level:41},{name:"Xatu", level:42}]},
      {class:"Elite Four", name:"Koga",  note:"Poison-type master; former Fuchsia Gym Leader. Watch for Forretress's Explosion.", team:[{name:"Ariados", level:40},{name:"Forretress", level:43},{name:"Muk", level:42},{name:"Venomoth", level:41},{name:"Crobat", level:44}]},
      {class:"Elite Four", name:"Bruno", note:"Fighting-type master. Psychic and Flying moves are effective.", team:[{name:"Hitmontop", level:42},{name:"Hitmonlee", level:42},{name:"Hitmonchan", level:42},{name:"Onix", level:43},{name:"Machamp", level:46}]},
      {class:"Elite Four", name:"Karen", note:"Dark-type master. Bug and Fighting moves work well.", team:[{name:"Umbreon", level:42},{name:"Vileplume", level:42},{name:"Murkrow", level:44},{name:"Gengar", level:45},{name:"Houndoom", level:47}]},
      {class:"Champion",   name:"Lance", note:"Dragon Pokémon master. Ice moves are critical — all three Dragonite are vulnerable.", team:[{name:"Gyarados", level:46},{name:"Dragonite", level:49},{name:"Dragonite", level:49},{name:"Aerodactyl", level:48},{name:"Charizard", level:48},{name:"Dragonite", level:50}]},
    ] },

  { part:"Part 11", id:"route-41-whirlpool-return", name:"Route 41 (Return — Whirlpool)",
    note:"Return with HM05 Whirlpool (usable after Glacier Badge) to access the islands and reach the Whirl Islands caves.",
    pokemon:[],
    items:[
      {name:"Stardust", hidden:true, note:"×4 — hidden on the four islands' beaches (requires Whirlpool)"},
      {name:"Max Ether",hidden:true, note:"SW island beach (requires Whirlpool)"},
    ],
    trainers:[] },

  { part:"Part 9",  id:"olivine-lighthouse-rematch-return", name:"Olivine Lighthouse (Return — Rematch)",
    note:"Register Sailor Huey's number; he occasionally gives a Protein on rematch.",
    pokemon:[],
    items:[
      {name:"Protein", hidden:false, note:"From Sailor Huey (2F) after defeating him in a phone rematch"},
    ],
    trainers:[] },

  { part:"Part 11", id:"route-43-phone-return", name:"Route 43 (Return — Phone)",
    note:"Register Picnicker Tiffany's number; she occasionally gives a Poké Doll.",
    pokemon:[],
    items:[
      {name:"Poké Doll", hidden:false, note:"Sometimes from Picnicker Tiffany after phone registration"},
    ],
    trainers:[] },

  { part:"Part 12", id:"route-44-phone-return", name:"Route 44 (Return — Phone)",
    note:"Register Bird Keeper Vance's number; he gives Carbos after a phone rematch.",
    pokemon:[],
    items:[
      {name:"Carbos", hidden:false, note:"From Bird Keeper Vance after phone rematch"},
    ],
    trainers:[] },

  { part:"Part 13", id:"route-45-phone-return", name:"Route 45 (Return — Phone)",
    note:"Register Black Belt Kenji and Hiker Parry's numbers for rematch rewards.",
    pokemon:[],
    items:[
      {name:"PP Up",  hidden:false, note:"From Black Belt Kenji after phone rematch"},
      {name:"Iron",   hidden:false, note:"From Hiker Parry after second phone rematch"},
    ],
    trainers:[] },

  { part:"Part 13", id:"route-46-phone-return", name:"Route 46 (Return — Phone)",
    note:"Register Picnicker Erin's number; she gives Calcium after a second rematch.",
    pokemon:[],
    items:[
      {name:"Calcium", hidden:false, note:"From Picnicker Erin after second phone rematch"},
    ],
    trainers:[] },

  { part:"Part 15", id:"route-27-phone-return", name:"Route 27 (Return — Phone)",
    note:"Register Bird Keeper Jose's number; he occasionally gives a Star Piece.",
    pokemon:[],
    items:[
      {name:"Star Piece", hidden:false, note:"Sometimes from Bird Keeper Jose after phone registration"},
    ],
    trainers:[] },

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 4 — POST-GAME KANTO (Parts 17–32)
  // ═══════════════════════════════════════════════════════════════════

  // ── Part 17 ─────────────────────────────────────────────────────────
  { part:"Part 17", id:"ss-aqua", name:"S.S. Aqua",
    note:"Ship from Olivine to Vermilion. Two floors with trainers and a Metal Coat gift.",
    floors:[
      { label:"1F", pokemon:[], items:[
          {name:"Metal Coat", hidden:false, note:"From Gentleman on 1F (first crossing)"},
        ], trainers:[
          {class:"Firebreather", name:"Lyle", team:[{name:"Koffing",level:36},{name:"Koffing",level:36},{name:"Flareon",level:39}]},
          {class:"Sailor", name:"Stanly", team:[{name:"Machop",level:39},{name:"Machoke",level:41},{name:"Psyduck",level:34}]},
          {class:"Pokéfan", name:"Colin", team:[{name:"Delibird",level:40}]},
          {class:"Twins", name:"Meg & Peg", team:[{name:"Teddiursa",level:39},{name:"Phanpy",level:39}]},
          {class:"Hiker", name:"Noland", team:[{name:"Bronzor",level:39},{name:"Golem",level:42}]},
        ] },
      { label:"B1F", pokemon:[], items:[], trainers:[
          {class:"Juggler", name:"Fritz", team:[{name:"Mr. Mime",level:37},{name:"Machoke",level:37},{name:"Magmar",level:37}]},
          {class:"Sailor", name:"Jeff", team:[{name:"Makuhita",level:40},{name:"Raticate",level:40}]},
          {class:"Picnicker", name:"Debra", team:[{name:"Seaking",level:41}]},
        ] },
    ] },

  { part:"Part 17", id:"vermilion-city", name:"Vermilion City",
    note:"Rock Smash unlocks Diglett/Shuckle. Surf/fishing also available. Lost Item quest starts here.",
    pokemon:[
      {name:"Diglett", method:"Rock Smash", levels:"15–25", rate:"80%"},
      {name:"Shuckle", method:"Rock Smash", levels:"15–25", rate:"20%"},
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Tentacool", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Chinchou", method:"Good Rod", levels:"20", rate:"20%"},
      {name:"Shellder", method:"Good Rod", levels:"20", rate:"10%"},
      {name:"Chinchou", method:"Super Rod", levels:"40", rate:"40%"},
      {name:"Shellder", method:"Super Rod", levels:"40", rate:"30%"},
      {name:"Tentacruel", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Lanturn", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Wingull", method:"Surf", levels:"20", rate:"60% (Swarm)", note:"Swarm — replaces Tentacool/Tentacruel during swarm"},
    ],
    items:[
      {name:"Iron", hidden:true, note:"Harbor pier (Rock Smash)"},
      {name:"Rare Candy", hidden:false, note:"From chairman of Pokémon Fan Club"},
      {name:"Heart Scale", hidden:true, note:"In water via Surf"},
      {name:"Luck Incense", hidden:false, note:"In water via Surf"},
      {name:"Full Heal", hidden:true, note:"Rock Smash boulder"},
      {name:"Sticky Barb", hidden:false, note:"Via Route 11 (requires Surf/Cut access)"},
      {name:"Big Pearl", hidden:true, note:"In water via Route 11 Surf"},
      {name:"Pearl", hidden:true, note:"×2, in water via Route 11 Surf"},
      {name:"Lost Item", hidden:false, note:"Return to Copycat in Saffron to complete quest; receive Railpass"},
      {name:"PP Max", hidden:false, note:"After earning all 16 badges"},
    ],
    trainers:[] },

  { part:"Part 17", id:"vermilion-gym", name:"Vermilion Gym",
    note:"Lt. Surge — Electric specialist. Reward: TM34 Shock Wave.",
    pokemon:[], items:[{name:"TM34 Shock Wave", hidden:false, note:"Reward from Lt. Surge"}],
    trainers:[
      {class:"Juggler", name:"Horton", team:[{name:"Electrode",level:43},{name:"Electrode",level:43},{name:"Electrode",level:43}]},
      {class:"Guitarist", name:"Vincent", team:[{name:"Jolteon",level:45},{name:"Voltorb",level:43},{name:"Magnemite",level:42}]},
      {class:"Gentleman", name:"Gregory", team:[{name:"Pikachu",level:46},{name:"Flaaffy",level:43},{name:"Electrike",level:42}]},
      {class:"Gym Leader", name:"Lt. Surge", team:[{name:"Raichu",level:51},{name:"Electrode",level:47},{name:"Electrode",level:47},{name:"Magneton",level:47},{name:"Electabuzz",level:53}]},
    ] },

  { part:"Part 17", id:"new-bark-town-ss-ticket", name:"New Bark Town (Return — S.S. Ticket)",
    note:"Return to Professor Elm's lab after entering the Hall of Fame. He gives the S.S. Ticket for the ship to Kanto.",
    pokemon:[],
    items:[
      {name:"S.S. Ticket", hidden:false, note:"From Professor Elm after entering the Hall of Fame"},
    ],
    trainers:[] },

  { part:"Part 17", id:"olivine-city-post-return", name:"Olivine City (Return — Post-Game)",
    note:"National Pokédex from Prof. Oak requires entering the Hall of Fame. Protein is south of the S.S. Aqua dock (requires S.S. Ticket). Rare Candy requires Rock Climb (Part 28).",
    pokemon:[],
    items:[
      {name:"National Pokédex", hidden:false, note:"From Prof. Oak in Olivine Harbor building (post Hall of Fame)"},
      {name:"Protein",          hidden:true,  note:"Olivine Harbor SW of S.S. Aqua (requires S.S. Ticket)"},
      {name:"Rare Candy",       hidden:false, note:"E of lighthouse, on lone rock (requires Rock Climb — Part 28)"},
    ],
    trainers:[] },

  // ── Part 18 ─────────────────────────────────────────────────────────
  { part:"Part 18", id:"route-6", name:"Route 6",
    note:"Connects Vermilion to Saffron. Headbutt trees available.",
    pokemon:[
      {name:"Pidgey", method:"Grass", levels:"15–17", rate:"HG 45%/SS 25% (morning/day)", time:"morning"},
      {name:"Pidgey", method:"Grass", levels:"15–17", rate:"HG 45%/SS 25% (morning/day)", time:"day"},
      {name:"Oddish", method:"Grass", levels:"13", rate:"10%", time:"night"},
      {name:"Meowth", method:"Grass", levels:"13", rate:"10% (day/night)", ssOnly:true},
      {name:"Magnemite", method:"Grass", levels:"13", rate:"10%"},
      {name:"Abra", method:"Grass", levels:"13", rate:"10%"},
      {name:"Bellsprout", method:"Grass", levels:"13", rate:"HG 10% (morning/day)", time:"morning"},
      {name:"Bellsprout", method:"Grass", levels:"13", rate:"HG 10% (morning/day)", time:"day"},
      {name:"Psyduck", method:"Surf", levels:"20–30", rate:"90%"},
      {name:"Golduck", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Poliwag", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Poliwag", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Poliwag", method:"Super Rod", levels:"40", rate:"90%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"TM62 Silver Wind", hidden:false, note:"From woman in gate building"},
    ],
    trainers:[
      {class:"Twins", name:"Day & Dani", team:[{name:"Cleffa",level:15},{name:"Igglybuff",level:15}]},
      {class:"Camper", name:"Virgil", team:[{name:"Nidorino",level:17}]},
      {class:"Picnicker", name:"Selina", team:[{name:"Nidorina",level:17}]},
    ] },

  { part:"Part 18", id:"saffron-city", name:"Saffron City",
    note:"Silph Co. restored. Trade Pikachu→Pikachu (Volt). Up-Grade from security guard. Copycat's Lost Item quest.",
    pokemon:[],
    items:[
      {name:"Up-Grade", hidden:false, note:"From Silph Co. 1F security guard"},
      {name:"Dawn Stone", hidden:false, note:"Held by Iron the Beldum (trade)"},
      {name:"Yellow Shard", hidden:false, note:"Held by Voltsy the Pikachu (trade)"},
      {name:"Pass", hidden:false, note:"From Copycat in Saffron after returning Lost Item from Vermilion Fan Club"},
    ],
    trainers:[
      {class:"Trade", name:"Pikachu → Pikachu (Volt)", note:"Trade your Pikachu for Volt (Pikachu lv15, holds Yellow Shard)", team:[]},
    ] },

  { part:"Part 18", id:"saffron-gym", name:"Saffron Gym",
    note:"Sabrina — Psychic specialist. Reward: TM48 Skill Swap.",
    pokemon:[], items:[{name:"TM48 Skill Swap", hidden:false, note:"Reward from Sabrina"}],
    trainers:[
      {class:"Medium", name:"Rebecca", team:[{name:"Slowpoke",level:38},{name:"Jynx",level:38}]},
      {class:"Psychic", name:"Jared", team:[{name:"Wobbuffet",level:41}]},
      {class:"Medium", name:"Darcy", team:[{name:"Kadabra",level:38},{name:"Mr. Mime",level:38}]},
      {class:"Psychic", name:"Franklin", team:[{name:"Jynx",level:41}]},
      {class:"Gym Leader", name:"Sabrina", team:[{name:"Espeon",level:53},{name:"Mr. Mime",level:53},{name:"Alakazam",level:55}]},
    ] },

  { part:"Part 18", id:"fighting-dojo", name:"Fighting Dojo",
    note:"The Karate King is away training in Mt. Mortar. Speak to him there to receive either Hitmonlee or Hitmonchan — choose one (one per save file).",
    pokemon:[
      {name:"Hitmonlee",  method:"Gift", levels:"25", rate:"One", warn:true, note:"Left choice — receive from Karate King in Mt. Mortar", choiceGroup:"fighting-dojo", choiceId:"hitmonlee"},
      {name:"Hitmonchan", method:"Gift", levels:"25", rate:"One", warn:true, note:"Right choice — receive from Karate King in Mt. Mortar", choiceGroup:"fighting-dojo", choiceId:"hitmonchan"},
    ],
    items:[],
    trainers:[] },

  // ── Part 19 ─────────────────────────────────────────────────────────
  { part:"Part 19", id:"route-8", name:"Route 8",
    note:"Lavender Town to Celadon gate. Bikers line the path. Apricorn available.",
    pokemon:[
      {name:"Pidgeotto", method:"Grass", levels:"22–25", rate:"HG 65%/SS 35% (morning/day)", time:"morning"},
      {name:"Pidgeotto", method:"Grass", levels:"22–25", rate:"HG 65%/SS 35% (morning/day)", time:"day"},
      {name:"Vulpix", method:"Grass", levels:"21", rate:"25% (morning/day)", ssOnly:true, time:"morning"},
      {name:"Vulpix", method:"Grass", levels:"21", rate:"25% (morning/day)", ssOnly:true, time:"day"},
      {name:"Growlithe", method:"Grass", levels:"21", rate:"25% (morning/day)", hgOnly:true, time:"morning"},
      {name:"Growlithe", method:"Grass", levels:"21", rate:"25% (morning/day)", hgOnly:true, time:"day"},
      {name:"Meowth", method:"Grass", levels:"21", rate:"10%", ssOnly:true},
      {name:"Abra", method:"Grass", levels:"19", rate:"20%"},
      {name:"Kadabra", method:"Grass", levels:"24", rate:"5%"},
      {name:"Haunter", method:"Grass", levels:"21", rate:"15%", time:"night"},
      {name:"Noctowl", method:"Grass", levels:"23", rate:"20% (night)", time:"night"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"TM41 Torment", hidden:false, note:"From Super Nerd in building"},
      {name:"Yellow Apricorn", hidden:false, note:"Apricorn tree on route"},
    ],
    trainers:[
      {class:"Biker", name:"Dwayne", team:[{name:"Grimer",level:27},{name:"Koffing",level:27}]},
      {class:"Biker", name:"Harris", team:[{name:"Weezing",level:30}]},
      {class:"Biker", name:"Zeke", team:[{name:"Grimer",level:27},{name:"Koffing",level:27}]},
      {class:"Super Nerd", name:"Sam", team:[{name:"Magnemite",level:27},{name:"Voltorb",level:27},{name:"Magneton",level:28}]},
      {class:"Super Nerd", name:"Tyrone", team:[{name:"Electrode",level:30}]},
      {class:"Young Couple", name:"Moe & Lulu", team:[{name:"Phanpy",level:29},{name:"Teddiursa",level:29}]},
      {class:"Gentleman", name:"Milton", team:[{name:"Growlithe",level:30}]},
    ] },

  { part:"Part 19", id:"lavender-town", name:"Lavender Town",
    note:"Radio Tower Manager gives EXPN Card here after Rocket HQ is cleared. No wild Pokémon.",
    pokemon:[], items:[
      {name:"EXPN Card", hidden:false, note:"From Radio Tower Manager after defeating Rocket HQ — enables Poké Flute channel to wake Snorlax"},
    ], trainers:[] },

  { part:"Part 19", id:"route-10-south", name:"Route 10 (South)",
    note:"South section of Route 10 by the Power Plant entrance. Trainers and one TM.",
    pokemon:[
      {name:"Voltorb", method:"Grass", levels:"25–27", rate:"30%"},
      {name:"Electabuzz", method:"Grass", levels:"26–28", rate:"20%"},
      {name:"Magnemite", method:"Grass", levels:"23–25", rate:"30%"},
      {name:"Magneton", method:"Grass", levels:"26–28", rate:"20%"},
    ],
    items:[
      {name:"TM69 Rock Polish", hidden:false, note:"Found on south section"},
    ],
    trainers:[
      {class:"Pokéfan", name:"Robert", team:[{name:"Quagsire",level:43}]},
      {class:"Hiker", name:"Jim", team:[{name:"Machamp",level:45}]},
    ] },

  { part:"Part 19", id:"rock-tunnel", name:"Rock Tunnel",
    note:"Dark cave connecting Lavender to Cerulean. Bring a Pokémon that knows Flash.",
    floors:[
      { label:"1F", pokemon:[
          {name:"Cubone", method:"Cave", levels:"22–26", rate:"35%"},
          {name:"Geodude", method:"Cave", levels:"22–26", rate:"30%"},
          {name:"Machop", method:"Cave", levels:"22–26", rate:"20%"},
          {name:"Zubat", method:"Cave", levels:"22–26", rate:"10%"},
          {name:"Machoke", method:"Cave", levels:"24–28", rate:"5%"},
        ], items:[
          {name:"X Defend", hidden:true, note:"1F northeast area"},
          {name:"TM56 Fling", hidden:false, note:"1F"},
          {name:"Elixir", hidden:false, note:"1F"},
          {name:"X Accuracy", hidden:true, note:"1F"},
        ], trainers:[
          {class:"Hiker", name:"Lenny", team:[{name:"Geodude",level:27},{name:"Graveler",level:27}]},
          {class:"Hiker", name:"Tobias", team:[{name:"Graveler",level:30}]},
          {class:"Poké Maniac", name:"Graham", team:[{name:"Cubone",level:28},{name:"Marowak",level:28}]},
          {class:"Poké Maniac", name:"Fabian", team:[{name:"Slowpoke",level:30}]},
        ] },
      { label:"B1F", pokemon:[
          {name:"Geodude", method:"Cave", levels:"22–26", rate:"30%"},
          {name:"Cubone", method:"Cave", levels:"22–26", rate:"30%"},
          {name:"Onix", method:"Cave", levels:"22–26", rate:"20%"},
          {name:"Zubat", method:"Cave", levels:"22–26", rate:"10%"},
          {name:"Marowak", method:"Cave", levels:"26–28", rate:"5%"},
          {name:"Kangaskhan", method:"Cave", levels:"26–30", rate:"5%"},
          {name:"Geodude", method:"Rock Smash", levels:"22–26", rate:"100%"},
        ], items:[
          {name:"Revive", hidden:false, note:"B1F"},
          {name:"Max Potion", hidden:true, note:"B1F (Rock Smash boulder)"},
          {name:"PP Up", hidden:false, note:"B1F"},
          {name:"Oval Stone", hidden:false, note:"B1F SW via Rock Climb"},
          {name:"HP Up", hidden:true, note:"B1F SW via Rock Climb"},
          {name:"Iron", hidden:false, note:"B1F SW via Rock Climb"},
        ], trainers:[
          {class:"Hiker", name:"Eric", team:[{name:"Graveler",level:29},{name:"Graveler",level:29}]},
          {class:"Hiker", name:"Oliver", team:[{name:"Geodude",level:27},{name:"Geodude",level:27},{name:"Graveler",level:29}]},
          {class:"Poké Maniac", name:"Winston", team:[{name:"Slowpoke",level:28},{name:"Slowpoke",level:28}]},
          {class:"Picnicker", name:"Dana", team:[{name:"Cubone",level:29}]},
        ] },
    ] },

  { part:"Part 19", id:"route-9", name:"Route 9",
    note:"North of Cerulean, east toward Lavender. Several trainers and items via Cut.",
    pokemon:[
      {name:"Rattata", method:"Grass", levels:"15–17", rate:"20%"},
      {name:"Raticate", method:"Grass", levels:"20", rate:"10%"},
      {name:"Spearow", method:"Grass", levels:"15", rate:"30%"},
      {name:"Fearow", method:"Grass", levels:"22", rate:"10%"},
      {name:"Mankey", method:"Grass", levels:"15–17", rate:"20%", hgOnly:true},
      {name:"Primeape", method:"Grass", levels:"22", rate:"10%", hgOnly:true},
      {name:"Goldeen", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Seaking", method:"Surf", levels:"25–35", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Goldeen", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Goldeen", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Goldeen", method:"Super Rod", levels:"40", rate:"90%"},
      {name:"Seaking", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Sableye", method:"Grass", levels:"20", rate:"(Swarm)", hgOnly:true, note:"Swarm — HG only"},
      {name:"Mawile", method:"Grass", levels:"20", rate:"(Swarm)", ssOnly:true, note:"Swarm — SS only"},
    ],
    items:[
      {name:"Ether", hidden:true, note:"Near start of route"},
      {name:"Full Restore", hidden:false, note:"Route 9"},
      {name:"TM91 Flash Cannon", hidden:false, note:"Via Cut"},
      {name:"Light Clay", hidden:false, note:"Via Cut"},
      {name:"Max Potion", hidden:false, note:"Route 9"},
    ],
    trainers:[
      {class:"Picnicker", name:"Edna", team:[{name:"Nidorina",level:28}]},
      {class:"Camper", name:"Sid", team:[{name:"Nidorino",level:28}]},
      {class:"Camper", name:"Dean", team:[{name:"Growlithe",level:27},{name:"Machop",level:27}]},
      {class:"Hiker", name:"Eoin", team:[{name:"Geodude",level:26},{name:"Graveler",level:28}]},
      {class:"Hiker", name:"Clarke", team:[{name:"Geodude",level:26},{name:"Onix",level:26},{name:"Machop",level:26}]},
      {class:"Picnicker", name:"Heidi", team:[{name:"Rattata",level:27},{name:"Rattata",level:27},{name:"Raticate",level:28}]},
    ] },

  { part:"Part 19", id:"route-10-north", name:"Route 10 (North) & Power Plant",
    note:"North section above Rock Tunnel. Machine Part hidden in Power Plant pool — needed to fix Cerulean Gym's generator. Trade Magneton here.",
    pokemon:[
      {name:"Raticate", method:"Grass", levels:"25–27", rate:"20%"},
      {name:"Spearow", method:"Grass", levels:"23", rate:"15%"},
      {name:"Fearow", method:"Grass", levels:"27", rate:"10%"},
      {name:"Voltorb", method:"Grass", levels:"25–27", rate:"30%"},
      {name:"Electabuzz", method:"Grass", levels:"25–27", rate:"20%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Goldeen", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Goldeen", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Goldeen", method:"Super Rod", levels:"40", rate:"90%"},
      {name:"Seaking", method:"Super Rod", levels:"40", rate:"10%"},
    ],
    items:[
      {name:"Carbos", hidden:true, note:"Route 10 North"},
      {name:"Metal Coat", hidden:false, note:"Held by Maggie the Dugtrio (trade Magneton for Dugtrio)"},
      {name:"TM57 Charge Beam", hidden:false, note:"From Power Plant Manager after returning Machine Part"},
    ],
    trainers:[
      {class:"Trade", name:"Magneton → Dugtrio (Maggie)", note:"Trade in the house near Power Plant; Maggie holds Metal Coat", team:[]},
    ] },

  // ── Part 20 ─────────────────────────────────────────────────────────
  { part:"Part 20", id:"cerulean-city-return", name:"Cerulean City (Return — Machine Part)",
    note:"Return after clearing Rocket HQ. Machine Part hidden in Gym pool. Battle Misty to get TM03.",
    pokemon:[],
    items:[
      {name:"Machine Part", hidden:true, note:"Hidden in Gym pool — return to Power Plant Manager for TM57"},
      {name:"TM03 Water Pulse", hidden:false, note:"From Misty after returning Machine Part and defeating her"},
      {name:"Nugget", hidden:true, note:"Via Surf from Route 24"},
    ],
    trainers:[] },

  { part:"Part 20", id:"route-24", name:"Route 24",
    note:"North of Cerulean, Nugget Bridge area.",
    pokemon:[
      {name:"Bellsprout", method:"Grass", levels:"13–15", rate:"60% (morning)", time:"morning"},
      {name:"Bellsprout", method:"Grass", levels:"13–15", rate:"35% (day)", time:"day"},
      {name:"Abra", method:"Grass", levels:"12", rate:"20%"},
      {name:"Weepinbell", method:"Grass", levels:"17", rate:"10%"},
      {name:"Venonat", method:"Grass", levels:"14", rate:"5%"},
      {name:"Sunkern", method:"Grass", levels:"12", rate:"5%", time:"day"},
      {name:"Oddish", method:"Grass", levels:"12", rate:"10%", time:"night"},
      {name:"Venomoth", method:"Grass", levels:"17", rate:"5%", time:"night"},
      {name:"Goldeen", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Seaking", method:"Surf", levels:"25–35", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Goldeen", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Goldeen", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[],
    trainers:[
      {class:"Team Rocket Grunt", name:"(Grunt)", team:[{name:"Golbat",level:39}]},
    ] },

  { part:"Part 20", id:"route-25", name:"Route 25",
    note:"East of Cerulean. Bill's cottage at the end. Slakoth trees NW.",
    pokemon:[
      {name:"Abra", method:"Grass", levels:"12", rate:"10%"},
      {name:"Pidgey", method:"Grass", levels:"13", rate:"30% (morning)", time:"morning"},
      {name:"Pidgey", method:"Grass", levels:"13", rate:"50% (day)", time:"day"},
      {name:"Bellsprout", method:"Grass", levels:"13", rate:"30% (morning/day)"},
      {name:"Venonat", method:"Grass", levels:"14", rate:"5% (morning)", time:"morning"},
      {name:"Pidgeotto", method:"Grass", levels:"17", rate:"10%"},
      {name:"Weepinbell", method:"Grass", levels:"17", rate:"10%"},
      {name:"Oddish", method:"Grass", levels:"13", rate:"10%", time:"night"},
      {name:"Venomoth", method:"Grass", levels:"17", rate:"5%", time:"night"},
      {name:"Goldeen", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Seaking", method:"Surf", levels:"25–35", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Goldeen", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Slakoth", method:"Headbutt (Rare)", levels:"20–25", rate:"(Special trees NW)", note:"Only from designated trees in northwest area"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
      {name:"Buneary", method:"Grass", levels:"15", rate:"(Swarm)", note:"Swarm"},
    ],
    items:[
      {name:"Revive", hidden:true, note:"On route"},
      {name:"Protein", hidden:false, note:"Via Cut"},
      {name:"Nugget", hidden:false, note:"From Ace Trainer Kevin after defeating him"},
    ],
    trainers:[
      {class:"School Kid", name:"Dudley", team:[{name:"Exeggcute",level:27}]},
      {class:"Lass", name:"Ellen", team:[{name:"Bellsprout",level:26},{name:"Weepinbell",level:26}]},
      {class:"School Kid", name:"Joe", team:[{name:"Tangela",level:27}]},
      {class:"Camper", name:"Lloyd", team:[{name:"Ponyta",level:28}]},
      {class:"Lass", name:"Laura", team:[{name:"Clefairy",level:26},{name:"Snubbull",level:26}]},
      {class:"Super Nerd", name:"Pat", team:[{name:"Magnemite",level:26},{name:"Magneton",level:28}]},
      {class:"Ace Trainer", name:"Kevin", team:[{name:"Dodrio",level:32},{name:"Exeggutor",level:33}]},
    ] },

  { part:"Part 20", id:"cerulean-gym", name:"Cerulean Gym",
    note:"Misty — Water specialist. Battle after returning Machine Part. Reward: TM03 Water Pulse.",
    pokemon:[], items:[{name:"TM03 Water Pulse", hidden:false, note:"Reward from Misty"}],
    trainers:[
      {class:"Sailor", name:"Parker", team:[{name:"Tentacruel",level:43},{name:"Tentacruel",level:45}]},
      {class:"Sailor", name:"Eddie", team:[{name:"Tentacool",level:43},{name:"Blastoise",level:47}]},
      {class:"Swimmer", name:"Diana", team:[{name:"Starmie",level:46}]},
      {class:"Swimmer", name:"Joy", team:[{name:"Goldeen",level:43},{name:"Seaking",level:45}]},
      {class:"Swimmer", name:"Briana", team:[{name:"Golduck",level:46}]},
      {class:"Gym Leader", name:"Misty", team:[{name:"Golduck",level:49},{name:"Quagsire",level:49},{name:"Lapras",level:52},{name:"Starmie",level:54}]},
    ] },

  { part:"Part 20", id:"route-5", name:"Route 5",
    note:"South of Cerulean. Day Care on this route. Cleanse Tag from woman in Day Care building.",
    pokemon:[
      {name:"Pidgey", method:"Grass", levels:"13", rate:"HG 60%/SS 40% (morning/day)", time:"morning"},
      {name:"Pidgey", method:"Grass", levels:"13", rate:"HG 60%/SS 40% (morning/day)", time:"day"},
      {name:"Oddish", method:"Grass", levels:"12", rate:"10% (night)", hgOnly:true, time:"night"},
      {name:"Gloom", method:"Grass", levels:"17", rate:"5% (night)", time:"night"},
      {name:"Meowth", method:"Grass", levels:"13", rate:"10%", ssOnly:true},
      {name:"Abra", method:"Grass", levels:"12", rate:"10%"},
      {name:"Bellsprout", method:"Grass", levels:"13", rate:"20% (morning/day)", time:"morning"},
      {name:"Bellsprout", method:"Grass", levels:"13", rate:"20% (morning/day)", time:"day"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Cleanse Tag", hidden:false, note:"From woman in Day Care building south of Route 5"},
    ],
    trainers:[] },

  { part:"Part 20", id:"underground-path-5-6", name:"Underground Path (5–6)",
    note:"Connects Route 5 (south of Cerulean gate) to Route 6 (north of Vermilion). Items inside.",
    pokemon:[],
    items:[
      {name:"Full Restore", hidden:true, note:"Inside underground path"},
      {name:"TM64 Explosion", hidden:false, note:"From hungry man in the middle of the path"},
      {name:"X Special", hidden:true, note:"Inside underground path"},
    ],
    trainers:[] },

  // ── Part 21 ─────────────────────────────────────────────────────────
  { part:"Part 21", id:"route-7", name:"Route 7",
    note:"Connects Celadon to Saffron. Murkrow/Houndour available at night.",
    pokemon:[
      {name:"Rattata", method:"Grass", levels:"15", rate:"30%"},
      {name:"Raticate", method:"Grass", levels:"20", rate:"10%"},
      {name:"Spearow", method:"Grass", levels:"15", rate:"15%"},
      {name:"Vulpix", method:"Grass", levels:"15–17", rate:"25%", ssOnly:true},
      {name:"Meowth", method:"Grass", levels:"15", rate:"10%", ssOnly:true},
      {name:"Persian", method:"Grass", levels:"20", rate:"5%", ssOnly:true},
      {name:"Growlithe", method:"Grass", levels:"15–17", rate:"25%", hgOnly:true},
      {name:"Murkrow", method:"Grass", levels:"18", rate:"10%", time:"night", hgOnly:true},
      {name:"Houndour", method:"Grass", levels:"18", rate:"10%", time:"night", ssOnly:true},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Mental Herb", hidden:false, note:"Route 7"},
    ],
    trainers:[] },

  { part:"Part 21", id:"celadon-city", name:"Celadon City",
    note:"Department Store, Game Corner, and Erika's Gym. Spell Tag from man on roof at night.",
    pokemon:[
      {name:"Grimer", method:"Surf", levels:"20–30", rate:"90%"},
      {name:"Muk", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Spearow", method:"Headbutt (Common)", levels:"20–25", rate:"50%"},
      {name:"Heracross", method:"Headbutt (Common)", levels:"20–25", rate:"30%"},
      {name:"Combee", method:"Headbutt (Common)", levels:"20–25", rate:"20%"},
    ],
    items:[
      {name:"TM67 Recycle", hidden:false, note:"From man in Celadon Mansion"},
      {name:"Spell Tag", hidden:false, note:"From man on roof at night"},
      {name:"PP Up", hidden:true, note:"Celadon City"},
      {name:"Turtwig Mask", hidden:false, note:"From Crasher Wake on 2F of Dept Store (after Sudowoodo event)"},
      {name:"Chimchar Mask", hidden:false, note:"From Crasher Wake on 2F of Dept Store (after Sudowoodo event)"},
      {name:"Piplup Mask", hidden:false, note:"From Crasher Wake on 2F of Dept Store (after Sudowoodo event)"},
      {name:"GB Sounds", hidden:false, note:"After earning all 16 badges"},
    ],
    trainers:[] },

  { part:"Part 21", id:"celadon-gym", name:"Celadon Gym",
    note:"Erika — Grass specialist. Reward: TM19 Giga Drain.",
    pokemon:[], items:[{name:"TM19 Giga Drain", hidden:false, note:"Reward from Erika"}],
    trainers:[
      {class:"Twins", name:"Jo & Zoe", team:[{name:"Oddish",level:34},{name:"Bellsprout",level:34}]},
      {class:"Lass", name:"Michelle", team:[{name:"Weepinbell",level:39},{name:"Victreebel",level:40}]},
      {class:"Picnicker", name:"Tanya", team:[{name:"Gloom",level:40}]},
      {class:"Beauty", name:"Julia", team:[{name:"Bellossom",level:43}]},
      {class:"Gym Leader", name:"Erika", team:[{name:"Jumpluff",level:51},{name:"Tangela",level:52},{name:"Victreebel",level:56},{name:"Bellossom",level:56}]},
    ] },

  // ── Part 22 ─────────────────────────────────────────────────────────
  { part:"Part 22", id:"route-16", name:"Route 16",
    note:"West of Celadon. Cycling Road begins. Grimer/Muk encounter.",
    pokemon:[
      {name:"Fearow", method:"Grass", levels:"28–30", rate:"40% (morning/day)", time:"morning"},
      {name:"Fearow", method:"Grass", levels:"28–30", rate:"40% (morning/day)", time:"day"},
      {name:"Grimer", method:"Grass", levels:"28–30", rate:"50% (morning/day)", time:"morning"},
      {name:"Grimer", method:"Grass", levels:"28–30", rate:"50% (morning/day)", time:"day"},
      {name:"Grimer", method:"Grass", levels:"28", rate:"80% (night)", time:"night"},
      {name:"Muk", method:"Grass", levels:"30", rate:"5%"},
      {name:"Murkrow", method:"Grass", levels:"28", rate:"10% (night)", time:"night"},
      {name:"Slugma", method:"Grass", levels:"28", rate:"5%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 22", id:"route-17", name:"Route 17",
    note:"Cycling Road — mandatory bicycle. Many Biker trainers. Rare stones from phone contacts.",
    pokemon:[
      {name:"Fearow", method:"Grass", levels:"28–30", rate:"40% (morning/day)", time:"morning"},
      {name:"Fearow", method:"Grass", levels:"28–30", rate:"40% (morning/day)", time:"day"},
      {name:"Grimer", method:"Grass", levels:"28–30", rate:"30%"},
      {name:"Muk", method:"Grass", levels:"30", rate:"5%"},
      {name:"Slugma", method:"Grass", levels:"28", rate:"5%"},
    ],
    items:[
      {name:"Max Ether", hidden:true, note:"Route 17"},
      {name:"Max Elixir", hidden:true, note:"Route 17"},
      {name:"Dusk Stone", hidden:false, note:"Phone call from Biker Reese"},
      {name:"Dawn Stone", hidden:false, note:"Phone call from Biker Aiden"},
    ],
    trainers:[
      {class:"Biker", name:"Dale", team:[{name:"Fearow",level:36}]},
      {class:"Biker", name:"Reese", team:[{name:"Arbok",level:35},{name:"Weezing",level:35}]},
      {class:"Biker", name:"Joel", team:[{name:"Electrode",level:37}]},
      {class:"Biker", name:"Jacob", team:[{name:"Grimer",level:34},{name:"Koffing",level:34},{name:"Muk",level:36}]},
      {class:"Biker", name:"Ernest", team:[{name:"Koffing",level:36},{name:"Weezing",level:38}]},
      {class:"Biker", name:"Aiden", team:[{name:"Muk",level:38}]},
      {class:"Biker", name:"Glenn", team:[{name:"Electrode",level:35},{name:"Electrode",level:35}]},
    ] },

  { part:"Part 22", id:"route-18", name:"Route 18",
    note:"Short path at the south end of Cycling Road. Connects to Fuchsia City gate.",
    pokemon:[
      {name:"Fearow", method:"Grass", levels:"28–30", rate:"40%"},
      {name:"Grimer", method:"Grass", levels:"28–30", rate:"50%"},
      {name:"Muk", method:"Grass", levels:"30", rate:"5%"},
      {name:"Slugma", method:"Grass", levels:"28", rate:"5%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Tangela", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
      {name:"Wurmple", method:"Headbutt (Rare)", levels:"20–22", rate:"20%"},
    ],
    items:[],
    trainers:[
      {class:"Biker", name:"Charles", team:[{name:"Rapidash",level:38}]},
      {class:"Bird Keeper", name:"Bob", team:[{name:"Spearow",level:36},{name:"Fearow",level:38}]},
      {class:"Bird Keeper", name:"Boris", team:[{name:"Doduo",level:36},{name:"Dodrio",level:38}]},
    ] },

  { part:"Part 22", id:"fuchsia-city", name:"Fuchsia City",
    note:"Safari Zone and Pokémon Zoo. Fishing available from the pier. Apricorn via Cut.",
    pokemon:[
      {name:"Magikarp", method:"Surf", levels:"10–20", rate:"100%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"85%"},
      {name:"Gyarados", method:"Good Rod", levels:"20", rate:"15%"},
      {name:"Gyarados", method:"Super Rod", levels:"40", rate:"100%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Wurmple", method:"Headbutt (Rare)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Red Apricorn", hidden:false, note:"Apricorn tree via Cut"},
      {name:"Nugget", hidden:true, note:"Fuchsia City"},
    ],
    trainers:[] },

  { part:"Part 22", id:"fuchsia-gym", name:"Fuchsia Gym",
    note:"Janine — Poison specialist. Reward: TM84 Poison Jab.",
    pokemon:[], items:[{name:"TM84 Poison Jab", hidden:false, note:"Reward from Janine"}],
    trainers:[
      {class:"Picnicker", name:"Cindy", team:[{name:"Venonat",level:34},{name:"Venonat",level:34}]},
      {class:"Camper", name:"Barry", team:[{name:"Koffing",level:36}]},
      {class:"Lass", name:"Alice", team:[{name:"Weezing",level:38}]},
      {class:"Lass", name:"Linda", team:[{name:"Ariados",level:38}]},
      {class:"Gym Leader", name:"Janine", team:[{name:"Crobat",level:47},{name:"Weezing",level:44},{name:"Ariados",level:47},{name:"Ariados",level:47},{name:"Venomoth",level:50}]},
    ] },

  // ── Part 23 ─────────────────────────────────────────────────────────
  { part:"Part 23", id:"route-15", name:"Route 15",
    note:"East of Fuchsia. Gate connects to Route 14. Chansey 1% encounter.",
    pokemon:[
      {name:"Pidgeotto", method:"Grass", levels:"27", rate:"20% (day)", time:"day"},
      {name:"Nidorina", method:"Grass", levels:"27–29", rate:"30%"},
      {name:"Nidorino", method:"Grass", levels:"27–29", rate:"30%"},
      {name:"Chansey", method:"Grass", levels:"28", rate:"1%"},
      {name:"Noctowl", method:"Grass", levels:"28", rate:"20% (night)", time:"night"},
      {name:"Hoppip", method:"Grass", levels:"25", rate:"19% (morning/day)"},
      {name:"Quagsire", method:"Grass", levels:"28", rate:"19% (night)", time:"night"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
    ],
    items:[
      {name:"PP Up", hidden:false, note:"Via Cut"},
      {name:"Rose Incense", hidden:false, note:"Route 15"},
      {name:"Oval Stone", hidden:false, note:"Phone call from Twins Kay & Tia"},
    ],
    trainers:[
      {class:"School Kid", name:"Kipp", team:[{name:"Exeggcute",level:37}]},
      {class:"School Kid", name:"Tommy", team:[{name:"Tangela",level:38}]},
      {class:"School Kid", name:"Johnny", team:[{name:"Gloom",level:37}]},
      {class:"School Kid", name:"Billy", team:[{name:"Oddish",level:36},{name:"Bellsprout",level:36},{name:"Weepinbell",level:36}]},
      {class:"Teacher", name:"Hillary", team:[{name:"Flaaffy",level:39}]},
      {class:"Teacher", name:"Colette", team:[{name:"Togetic",level:40}]},
      {class:"Pokéfan", name:"Boone", team:[{name:"Marill",level:38}]},
      {class:"Pokéfan", name:"Eleanor", team:[{name:"Marill",level:38}]},
      {class:"Twins", name:"Kay & Tia", team:[{name:"Lickitung",level:39},{name:"Lickitung",level:39}]},
    ] },

  { part:"Part 23", id:"route-14", name:"Route 14",
    note:"South of Route 15. Chansey 1% encounter. Rare stone from Bird Keeper Joshua phone.",
    pokemon:[
      {name:"Pidgeotto", method:"Grass", levels:"27", rate:"20%"},
      {name:"Nidorina", method:"Grass", levels:"27–29", rate:"30%"},
      {name:"Nidorino", method:"Grass", levels:"27–29", rate:"30%"},
      {name:"Chansey", method:"Grass", levels:"28", rate:"1%"},
      {name:"Noctowl", method:"Grass", levels:"28", rate:"20% (night)", time:"night"},
      {name:"Hoppip", method:"Grass", levels:"25", rate:"10%"},
      {name:"Skiploom", method:"Grass", levels:"27", rate:"5%"},
      {name:"Quagsire", method:"Grass", levels:"28", rate:"10% (night)", time:"night"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
    ],
    items:[
      {name:"Lucky Punch", hidden:false, note:"If lead Pokémon is Chansey when talking to person"},
      {name:"Shiny Stone", hidden:false, note:"Phone call from Bird Keeper Josh"},
    ],
    trainers:[
      {class:"Bird Keeper", name:"Josh", team:[{name:"Fearow",level:38},{name:"Fearow",level:38}]},
      {class:"Bird Keeper", name:"Roy", team:[{name:"Pidgeot",level:40}]},
      {class:"Pokéfan", name:"Trevor", team:[{name:"Pikachu",level:38}]},
      {class:"Pokéfan", name:"Carter", team:[{name:"Marill",level:38}]},
      {class:"School Kid", name:"Connor", team:[{name:"Gloom",level:38}]},
      {class:"School Kid", name:"Travis", team:[{name:"Weepinbell",level:38}]},
    ] },

  { part:"Part 23", id:"route-13", name:"Route 13",
    note:"South of Route 14, west of Route 12. Surf and Super Rod available. Chansey swarm.",
    pokemon:[
      {name:"Pidgeotto", method:"Grass", levels:"27", rate:"20%"},
      {name:"Nidorina", method:"Grass", levels:"27–29", rate:"30%"},
      {name:"Nidorino", method:"Grass", levels:"27–29", rate:"30%"},
      {name:"Chansey", method:"Grass", levels:"28", rate:"1%"},
      {name:"Noctowl", method:"Grass", levels:"28", rate:"20% (night)", time:"night"},
      {name:"Hoppip", method:"Grass", levels:"25", rate:"10%"},
      {name:"Quagsire", method:"Grass", levels:"28", rate:"10% (night)", time:"night"},
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"60%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Quagsire", method:"Surf", levels:"20–30", rate:"30%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Tentacool", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Tentacool", method:"Super Rod", levels:"40", rate:"70%"},
      {name:"Magikarp", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Qwilfish", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Chansey", method:"Grass", levels:"28", rate:"(Swarm)", note:"Swarm — greatly increased Chansey rate"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
    ],
    items:[
      {name:"Calcium", hidden:true, note:"Route 13"},
      {name:"Sun Stone", hidden:false, note:"Phone call from Camper Tanner"},
    ],
    trainers:[
      {class:"Bird Keeper", name:"Bret", team:[{name:"Spearow",level:37},{name:"Fearow",level:39}]},
      {class:"Bird Keeper", name:"Perry", team:[{name:"Fearow",level:39}]},
      {class:"Picnicker", name:"Piper", team:[{name:"Clefairy",level:37},{name:"Clefairy",level:37}]},
      {class:"Young Couple", name:"Tim & Sue", team:[{name:"Nidoking",level:40},{name:"Nidoqueen",level:40}]},
      {class:"Pokéfan", name:"Joshua", team:[{name:"Marill",level:38}]},
      {class:"Pokéfan", name:"Alex", team:[{name:"Clefairy",level:38}]},
      {class:"Camper", name:"Tanner", team:[{name:"Pidgeot",level:40}]},
      {class:"Hiker", name:"Kenny", team:[{name:"Graveler",level:38},{name:"Onix",level:39}]},
    ] },

  { part:"Part 23", id:"route-12", name:"Route 12",
    note:"East coast south of Lavender. Super Rod from Fishing Guru's brother here. Relicanth swarm (fishing).",
    pokemon:[
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"60%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"30%"},
      {name:"Quagsire", method:"Surf", levels:"20–30", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Tentacool", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Tentacool", method:"Super Rod", levels:"40", rate:"70%"},
      {name:"Magikarp", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Qwilfish", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Relicanth", method:"Super Rod", levels:"30", rate:"(Swarm — fishing)", note:"Swarm — fishing only"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
    ],
    items:[
      {name:"Yellow Flute", hidden:false, note:"Via Surf and Cut"},
      {name:"Calcium", hidden:false, note:"Via Cut"},
      {name:"Super Rod", hidden:false, note:"From Fishing Guru's brother in the house on Route 12"},
      {name:"Elixir", hidden:true, note:"Via Surf"},
    ],
    trainers:[
      {class:"Fisherman", name:"Kyle", team:[{name:"Poliwag",level:36},{name:"Poliwhirl",level:38}]},
      {class:"Fisherman", name:"Martin", team:[{name:"Krabby",level:36},{name:"Kingler",level:38}]},
      {class:"Fisherman", name:"Stephen", team:[{name:"Magikarp",level:36},{name:"Magikarp",level:36},{name:"Gyarados",level:38}]},
      {class:"Fisherman", name:"Barney", team:[{name:"Staryu",level:37},{name:"Starmie",level:39}]},
      {class:"Fisherman", name:"Kyler", team:[{name:"Tentacool",level:36},{name:"Tentacruel",level:38}]},
      {class:"Bird Keeper", name:"Justin", team:[{name:"Doduo",level:38}]},
      {class:"Bird Keeper", name:"Gail", team:[{name:"Fearow",level:39}]},
      {class:"Young Couple", name:"Vic & Tara", team:[{name:"Nidoking",level:40},{name:"Nidoqueen",level:40}]},
    ] },

  // ── Part 24 ─────────────────────────────────────────────────────────
  { part:"Part 24", id:"route-11", name:"Route 11",
    note:"East of Vermilion. Drowzee/Hypno grass encounters. Apricorn available.",
    pokemon:[
      {name:"Rattata", method:"Grass", levels:"13", rate:"30%"},
      {name:"Magnemite", method:"Grass", levels:"13", rate:"20%"},
      {name:"Drowzee", method:"Grass", levels:"11–13", rate:"40%"},
      {name:"Hypno", method:"Grass", levels:"17", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"TM86 Grass Knot", hidden:false, note:"Route 11"},
      {name:"Green Apricorn", hidden:false, note:"Apricorn tree on route"},
      {name:"Revive", hidden:true, note:"Route 11"},
    ],
    trainers:[
      {class:"Psychic", name:"Herman", team:[{name:"Drowzee",level:38},{name:"Hypno",level:40}]},
      {class:"Psychic", name:"Fidel", team:[{name:"Kadabra",level:40}]},
      {class:"Youngster", name:"Jason", team:[{name:"Doduo",level:38}]},
      {class:"Youngster", name:"Owen", team:[{name:"Mankey",level:38},{name:"Primeape",level:40}]},
    ] },

  { part:"Part 24", id:"vermilion-city-snorlax", name:"Vermilion City (Return — Snorlax)",
    note:"Use the Poké Flute radio channel (EXPN Card required) to wake Snorlax blocking the east exit. One-time encounter.",
    pokemon:[
      {name:"Snorlax", method:"Cave", levels:"50", rate:"One", warn:true, note:"Wake with Poké Flute radio — blocks east exit on Vermilion and Diglett's Cave west entrance"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 24", id:"digletts-cave", name:"Diglett's Cave",
    note:"Tunnel between Vermilion and Route 2. Trade Rhyhorn for Bonsly (Mon/Sat only if Brock registered).",
    pokemon:[
      {name:"Diglett", method:"Cave", levels:"15–22", rate:"90%"},
      {name:"Dugtrio", method:"Cave", levels:"25–35", rate:"10%"},
    ],
    items:[
      {name:"Max Revive", hidden:true, note:"Diglett's Cave"},
      {name:"Calcium", hidden:true, note:"Via Rock Climb"},
      {name:"PP Max", hidden:false, note:"Via Rock Climb"},
      {name:"Rock Incense", hidden:false, note:"Via Rock Climb"},
      {name:"Passho Berry", hidden:false, note:"Held by Rhyhorn (Bonsly trade)"},
    ],
    trainers:[
      {class:"Trade", name:"Rhyhorn → Bonsly", note:"Trade in house near south exit; Bonsly holds Passho Berry; available Mon/Sat only (Brock must be registered)", team:[]},
    ] },

  { part:"Part 24", id:"route-2", name:"Route 2",
    note:"North of Viridian to Pewter. Version-exclusive bug Pokémon. Sacred Ash in gate.",
    pokemon:[
      {name:"Caterpie", method:"Grass", levels:"3–5", rate:"20%", hgOnly:true},
      {name:"Metapod", method:"Grass", levels:"4–6", rate:"20%", hgOnly:true},
      {name:"Butterfree", method:"Grass", levels:"7", rate:"5%", hgOnly:true},
      {name:"Weedle", method:"Grass", levels:"3–5", rate:"20%", ssOnly:true},
      {name:"Kakuna", method:"Grass", levels:"4–6", rate:"20%", ssOnly:true},
      {name:"Beedrill", method:"Grass", levels:"7", rate:"5%", ssOnly:true},
      {name:"Pidgey", method:"Grass", levels:"3–5", rate:"30%"},
      {name:"Pidgeotto", method:"Grass", levels:"7", rate:"5%"},
      {name:"Hoothoot", method:"Grass", levels:"4", rate:"15%"},
      {name:"Noctowl", method:"Grass", levels:"7", rate:"5%"},
      {name:"Ledyba", method:"Grass", levels:"5", rate:"15%", ssOnly:true},
      {name:"Ledian", method:"Grass", levels:"7", rate:"5%", ssOnly:true},
      {name:"Spinarak", method:"Grass", levels:"5", rate:"15%", hgOnly:true},
      {name:"Ariados", method:"Grass", levels:"7", rate:"5%", hgOnly:true},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Carbos", hidden:false, note:"North section"},
      {name:"Pink Apricorn", hidden:false, note:"Apricorn tree on route"},
      {name:"Nugget", hidden:false, note:"From man near the cave (south section)"},
      {name:"Sacred Ash", hidden:false, note:"From aide in Route 2 gate building"},
      {name:"Elixir", hidden:false, note:"Route 2"},
    ],
    trainers:[
      {class:"Bug Catcher", name:"Ed", team:[{name:"Weedle",level:5},{name:"Caterpie",level:5}]},
      {class:"Bug Catcher", name:"Doug", team:[{name:"Kakuna",level:6},{name:"Metapod",level:6}]},
      {class:"Bug Catcher", name:"Rob", team:[{name:"Beedrill",level:8}]},
    ] },

  { part:"Part 24", id:"viridian-forest", name:"Viridian Forest",
    note:"Optional forest north of Viridian. Pikachu available! Version-exclusive bugs. Leaf Stone inside.",
    pokemon:[
      {name:"Caterpie", method:"Grass", levels:"3–5", rate:"20%", hgOnly:true},
      {name:"Metapod", method:"Grass", levels:"4–6", rate:"20%", hgOnly:true},
      {name:"Butterfree", method:"Grass", levels:"7", rate:"5%", hgOnly:true},
      {name:"Weedle", method:"Grass", levels:"3–5", rate:"20%", ssOnly:true},
      {name:"Kakuna", method:"Grass", levels:"4–6", rate:"20%", ssOnly:true},
      {name:"Beedrill", method:"Grass", levels:"7", rate:"5%", ssOnly:true},
      {name:"Pidgey", method:"Grass", levels:"3–5", rate:"25%"},
      {name:"Pikachu", method:"Grass", levels:"5", rate:"5%"},
      {name:"Pidgeotto", method:"Grass", levels:"7", rate:"5%"},
      {name:"Hoothoot", method:"Grass", levels:"4", rate:"10%"},
      {name:"Noctowl", method:"Grass", levels:"7", rate:"5%"},
      {name:"Ledyba", method:"Grass", levels:"5", rate:"15%", ssOnly:true},
      {name:"Ledian", method:"Grass", levels:"7", rate:"5%", ssOnly:true},
      {name:"Spinarak", method:"Grass", levels:"5", rate:"15%", hgOnly:true},
      {name:"Ariados", method:"Grass", levels:"7", rate:"5%", hgOnly:true},
      {name:"Kricketot", method:"Grass", levels:"5", rate:"(Swarm)", note:"Swarm"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Seedot", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Shroomish", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Spinarak", method:"Headbutt (Rare)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Rare)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Wurmple", method:"Headbutt (Rare)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Max Ether", hidden:true, note:"Viridian Forest"},
      {name:"Big Mushroom", hidden:true, note:"×2 in Viridian Forest"},
      {name:"Leaf Stone", hidden:false, note:"Viridian Forest"},
      {name:"TinyMushroom", hidden:true, note:"×3 in Viridian Forest"},
      {name:"TM77 Psych Up", hidden:false, note:"Viridian Forest"},
      {name:"Blue Flute", hidden:false, note:"Viridian Forest"},
      {name:"Dire Hit", hidden:false, note:"Viridian Forest"},
      {name:"Full Restore", hidden:false, note:"Viridian Forest"},
    ],
    trainers:[
      {class:"Bug Catcher", name:"Abner", team:[{name:"Caterpie",level:8},{name:"Weedle",level:8}]},
      {class:"Bug Catcher", name:"Ellis", team:[{name:"Metapod",level:9}]},
      {class:"Bug Catcher", name:"Stacey", team:[{name:"Kakuna",level:9}]},
      {class:"Bug Catcher", name:"Dion", team:[{name:"Butterfree",level:10}]},
      {class:"Bug Catcher", name:"Dane", team:[{name:"Beedrill",level:10}]},
    ] },

  { part:"Part 24", id:"pewter-city", name:"Pewter City",
    note:"Museum has fossils. Trade Xatu here. Silver Wing (HG) / Rainbow Wing (SS) from old man near east exit.",
    pokemon:[
      {name:"Spearow", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Heracross", method:"Headbutt (Common)", levels:"20–22", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
      {name:"Omanyte",   method:"Fossil", levels:"20", rate:"One", warn:true, hgOnly:true, note:"Helix Fossil — HG only"},
      {name:"Kabuto",    method:"Fossil", levels:"20", rate:"One", warn:true, ssOnly:true, note:"Dome Fossil — SS only"},
      {name:"Aerodactyl",method:"Fossil", levels:"20", rate:"One", warn:true, note:"Old Amber — from Museum guide"},
      {name:"Lileep",    method:"Fossil", levels:"20", rate:"One", warn:true, ssOnly:true, note:"Root Fossil — SS only"},
      {name:"Anorith",   method:"Fossil", levels:"20", rate:"One", warn:true, hgOnly:true, note:"Claw Fossil — HG only"},
      {name:"Cranidos",  method:"Fossil", levels:"20", rate:"One", warn:true, note:"Skull Fossil — import from D/P/Pt"},
      {name:"Shieldon",  method:"Fossil", levels:"20", rate:"One", warn:true, note:"Armor Fossil — import from D/P/Pt"},
    ],
    items:[
      {name:"Max Revive", hidden:true, note:"Pewter City"},
      {name:"Wacan Berry", hidden:false, note:"Held by Xatu (Haunter trade)"},
      {name:"Guard Spec.", hidden:true, note:"Pewter City (Rock Smash)"},
      {name:"Blue Apricorn", hidden:false, note:"Apricorn tree"},
      {name:"White Apricorn", hidden:false, note:"Apricorn tree"},
      {name:"Wise Glasses", hidden:false, note:"Via Rock Smash"},
      {name:"PP Up", hidden:true, note:"Pewter City"},
      {name:"TM80 Rock Slide", hidden:false, note:"Reward from Brock"},
      {name:"Silver Wing", hidden:false, note:"From old man near east exit", hgOnly:true},
      {name:"Rainbow Wing", hidden:false, note:"From old man near east exit", ssOnly:true},
    ],
    trainers:[
      {class:"Trade", name:"Xatu → Haunter", note:"Trade Xatu for Haunter (which evolves into Gengar on trade); Xatu holds Wacan Berry", team:[]},
    ] },

  { part:"Part 24", id:"pewter-gym", name:"Pewter Gym",
    note:"Brock — Rock specialist. Reward: TM80 Rock Slide.",
    pokemon:[], items:[{name:"TM80 Rock Slide", hidden:false, note:"Reward from Brock"}],
    trainers:[
      {class:"Camper", name:"Jerry", team:[{name:"Rhydon",level:50}]},
      {class:"Hiker", name:"Edwin", team:[{name:"Golem",level:50}]},
      {class:"Gym Leader", name:"Brock", team:[{name:"Graveler",level:51},{name:"Rhyhorn",level:51},{name:"Omastar",level:53},{name:"Onix",level:54},{name:"Kabutops",level:52}]},
    ] },

  { part:"Part 24", id:"bell-tower-return", name:"Bell Tower (Return — Rainbow Wing)",
    note:"SS players return after obtaining the Rainbow Wing in Pewter City. Ho-Oh appears at lv70.",
    pokemon:[
      {name:"Ho-Oh", method:"Gift", levels:"70", rate:"One", warn:true, ssOnly:true, note:"SS only — requires Rainbow Wing from Pewter City old man"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 24", id:"whirl-islands-return", name:"Whirl Islands (Return — Silver Wing)",
    note:"HG players return after obtaining the Silver Wing in Pewter City. Lugia appears at lv70.",
    pokemon:[
      {name:"Lugia", method:"Gift", levels:"70", rate:"One", warn:true, hgOnly:true, note:"HG only — requires Silver Wing from Pewter City old man"},
    ],
    items:[],
    trainers:[] },

  // ── Part 25 ─────────────────────────────────────────────────────────
  { part:"Part 25", id:"route-3", name:"Route 3",
    note:"East of Pewter through Mt. Moon. Version-exclusive snake Pokémon.",
    pokemon:[
      {name:"Rattata", method:"Grass", levels:"4–5", rate:"30%"},
      {name:"Spearow", method:"Grass", levels:"4–5", rate:"HG 30%/SS 35%"},
      {name:"Ekans", method:"Grass", levels:"5", rate:"25%", ssOnly:true},
      {name:"Arbok", method:"Grass", levels:"7", rate:"5%", ssOnly:true},
      {name:"Jigglypuff", method:"Grass", levels:"5", rate:"10%"},
      {name:"Zubat", method:"Grass", levels:"5", rate:"30% (night)", time:"night"},
      {name:"Baltoy", method:"Grass", levels:"5", rate:"(Swarm)", hgOnly:true, note:"Swarm — HG only"},
      {name:"Gulpin", method:"Grass", levels:"5", rate:"(Swarm)", ssOnly:true, note:"Swarm — SS only"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Star Piece", hidden:true, note:"×2, in meteorite crater area"},
      {name:"Big Root", hidden:false, note:"Route 3"},
      {name:"Hyper Potion", hidden:true, note:"Route 3"},
    ],
    trainers:[
      {class:"Youngster", name:"Regis", team:[{name:"Mankey",level:10}]},
      {class:"Youngster", name:"Warren", team:[{name:"Spearow",level:9},{name:"Rattata",level:9}]},
      {class:"Youngster", name:"Jimmy", team:[{name:"Rattata",level:11}]},
      {class:"Hiker", name:"Bruce", team:[{name:"Geodude",level:10},{name:"Geodude",level:10},{name:"Onix",level:12}]},
      {class:"Firebreather", name:"Otis", team:[{name:"Koffing",level:14}]},
      {class:"Firebreather", name:"Burt", team:[{name:"Growlithe",level:14}]},
      {class:"Black Belt", name:"Manford", team:[{name:"Mankey",level:14}]},
      {class:"Black Belt", name:"Ander", team:[{name:"Primeape",level:15}]},
      {class:"Hiker", name:"Dwight", team:[{name:"Geodude",level:13},{name:"Graveler",level:13}]},
    ] },

  { part:"Part 25", id:"mt-moon", name:"Mt. Moon",
    note:"Rival Silver battle inside. Clefairy 5% rare encounter.",
    pokemon:[
      {name:"Zubat", method:"Cave", levels:"4–8", rate:"50%"},
      {name:"Geodude", method:"Cave", levels:"5–8", rate:"25%"},
      {name:"Sandshrew", method:"Cave", levels:"5–7", rate:"15%", hgOnly:true},
      {name:"Paras", method:"Cave", levels:"5–7", rate:"10%"},
      {name:"Sandslash", method:"Cave", levels:"8", rate:"5%", hgOnly:true},
      {name:"Clefairy", method:"Cave", levels:"7", rate:"5%"},
    ],
    items:[
      {name:"Revive", hidden:true, note:"Northeast corner of Mt. Moon"},
    ],
    trainers:[
      {class:"Rival", name:"Silver", note:"Team depends on player's starter choice. ~lv46–50.", team:[{name:"Sneasel",level:46},{name:"Golbat",level:47},{name:"Magneton",level:46},{name:"Alakazam",level:48},{name:"Gengar",level:48}]},
    ] },

  { part:"Part 25", id:"mt-moon-square", name:"Mt. Moon Square",
    note:"Open area atop Mt. Moon. Clefairy dance event on Monday nights — Moon Stone reward.",
    pokemon:[
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"100%"},
      {name:"Poliwag", method:"Surf", levels:"10–20", rate:"60%"},
      {name:"Magikarp", method:"Surf", levels:"10–20", rate:"40%"},
      {name:"Poliwag", method:"Good Rod", levels:"20", rate:"85%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"15%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"40", rate:"90%"},
      {name:"Poliwag", method:"Super Rod", levels:"40", rate:"10%"},
    ],
    items:[
      {name:"Max Revive", hidden:false, note:"Mt. Moon Square"},
      {name:"Moon Stone", hidden:false, note:"Monday nights after Clefairy dance event"},
    ],
    trainers:[] },

  { part:"Part 25", id:"route-4", name:"Route 4",
    note:"East side of Mt. Moon toward Cerulean. Version-exclusive snake Pokémon.",
    pokemon:[
      {name:"Rattata", method:"Grass", levels:"4–5", rate:"30%"},
      {name:"Spearow", method:"Grass", levels:"4–5", rate:"HG 30%/SS 35%"},
      {name:"Ekans", method:"Grass", levels:"5", rate:"25%", ssOnly:true},
      {name:"Arbok", method:"Grass", levels:"7", rate:"5%", ssOnly:true},
      {name:"Jigglypuff", method:"Grass", levels:"5", rate:"10%"},
      {name:"Zubat", method:"Grass", levels:"5", rate:"30% (night)", time:"night"},
      {name:"Goldeen", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Seaking", method:"Surf", levels:"25–35", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Goldeen", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"60%"},
      {name:"Goldeen", method:"Good Rod", levels:"20", rate:"40%"},
    ],
    items:[
      {name:"Ultra Ball", hidden:true, note:"Route 4"},
      {name:"Big Mushroom", hidden:true, note:"Route 4"},
      {name:"HP Up", hidden:false, note:"Route 4"},
    ],
    trainers:[
      {class:"Picnicker", name:"Hope", team:[{name:"Rattata",level:10},{name:"Rattata",level:10}]},
      {class:"Bird Keeper", name:"Hank", team:[{name:"Spearow",level:11},{name:"Fearow",level:13}]},
      {class:"Picnicker", name:"Sharon", team:[{name:"Meowth",level:12}]},
    ] },

  // ── Part 26 ─────────────────────────────────────────────────────────
  { part:"Part 26", id:"viridian-city", name:"Viridian City",
    note:"Blue's gym is here (Fight after Kanto badges). TM85 from sleeping man via Cut/Surf. TM92 from Blue after defeating him.",
    pokemon:[
      {name:"Poliwag", method:"Surf", levels:"10–20", rate:"90%"},
      {name:"Poliwhirl", method:"Surf", levels:"20–30", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"100%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"85%"},
      {name:"Poliwag", method:"Good Rod", levels:"20", rate:"15%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"40", rate:"90%"},
      {name:"Politoed", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"TM85 Dream Eater", hidden:false, note:"From sleeping man via Cut/Surf"},
      {name:"Nugget", hidden:true, note:"Viridian City"},
      {name:"TM92 Trick Room", hidden:false, note:"From Blue after defeating him at Viridian Gym"},
    ],
    trainers:[] },

  { part:"Part 26", id:"route-1", name:"Route 1",
    note:"Between Pallet and Viridian. Sentret/Furret encounters in HGSS.",
    pokemon:[
      {name:"Pidgey", method:"Grass", levels:"3–5", rate:"45% (morning/day)", time:"morning"},
      {name:"Pidgey", method:"Grass", levels:"3–5", rate:"45% (morning/day)", time:"day"},
      {name:"Rattata", method:"Grass", levels:"3–5", rate:"30% (morning/day)", time:"morning"},
      {name:"Rattata", method:"Grass", levels:"3–5", rate:"30% (morning/day)", time:"day"},
      {name:"Sentret", method:"Grass", levels:"4", rate:"20%"},
      {name:"Furret", method:"Grass", levels:"7", rate:"5%"},
      {name:"Hoothoot", method:"Grass", levels:"4", rate:"45% (night)", time:"night"},
      {name:"Poochyena", method:"Grass", levels:"4", rate:"(Swarm)", note:"Swarm"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Black Apricorn", hidden:false, note:"Apricorn tree on route"},
    ],
    trainers:[
      {class:"School Kid", name:"Sherman", team:[{name:"Sentret",level:8}]},
      {class:"School Kid", name:"Danny", team:[{name:"Hoothoot",level:8}]},
      {class:"Ace Trainer", name:"French", team:[{name:"Farfetch'd",level:40},{name:"Pikachu",level:42}]},
      {class:"Ace Trainer", name:"Quinn", team:[{name:"Sandshrew",level:40},{name:"Sandslash",level:42}]},
    ] },

  { part:"Part 26", id:"pallet-town", name:"Pallet Town",
    note:"Oak's Lab. HM08 Rock Climb from Oak after 16 badges. Jade Orb after showing both Kyogre and Groudon.",
    pokemon:[
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Chinchou", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Shellder", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Chinchou", method:"Super Rod", levels:"40", rate:"40%"},
      {name:"Shellder", method:"Super Rod", levels:"40", rate:"30%"},
      {name:"Tentacruel", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Lanturn", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"HM08 Rock Climb", hidden:false, note:"From Professor Oak after earning all 16 badges"},
      {name:"Jade Orb", hidden:false, note:"From Professor Oak after showing both Kyogre (HG) and Groudon (SS) — triggers Rayquaza at Embedded Tower"},
    ],
    trainers:[] },

  // ── Part 27 ─────────────────────────────────────────────────────────
  { part:"Part 27", id:"route-21", name:"Route 21",
    note:"South of Pallet, north of Cinnabar. Tangela 90–95% grass. Swimmers abound.",
    pokemon:[
      {name:"Tangela", method:"Grass", levels:"28–33", rate:"90% (morning/night)", note:"90% morning and night, 5% day"},
      {name:"Mr. Mime", method:"Grass", levels:"28", rate:"5–10%"},
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Chinchou", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Shellder", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Chinchou", method:"Super Rod", levels:"40", rate:"40%"},
      {name:"Shellder", method:"Super Rod", levels:"40", rate:"30%"},
      {name:"Tentacruel", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Lanturn", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"20–22", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"20–22", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"20–22", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"20–22", rate:"20%"},
    ],
    items:[
      {name:"Stardust", hidden:true, note:"×3 on Route 21"},
    ],
    trainers:[
      {class:"Swimmer", name:"Nikki", team:[{name:"Horsea",level:40}]},
      {class:"Swimmer", name:"Chelan", team:[{name:"Starmie",level:42}]},
      {class:"Swimmer", name:"Tyson", team:[{name:"Seadra",level:42}]},
      {class:"Swimmer", name:"Esteban", team:[{name:"Tentacruel",level:41}]},
      {class:"Swimmer", name:"Duane", team:[{name:"Goldeen",level:40},{name:"Seaking",level:42}]},
      {class:"Swimmer", name:"Kendra", team:[{name:"Lapras",level:43}]},
      {class:"Fisherman", name:"Arnold", team:[{name:"Krabby",level:40},{name:"Kingler",level:42}]},
      {class:"Fisherman", name:"Murphy", team:[{name:"Shellder",level:40},{name:"Cloyster",level:42}]},
      {class:"Fisherman", name:"Liam", team:[{name:"Magikarp",level:40},{name:"Gyarados",level:44}]},
      {class:"Fisherman", name:"Gideon", team:[{name:"Tentacool",level:40},{name:"Tentacruel",level:42}]},
      {class:"Bird Keeper", name:"Kinsley", team:[{name:"Dodrio",level:42}]},
      {class:"Bird Keeper", name:"Easton", team:[{name:"Fearow",level:42}]},
    ] },

  { part:"Part 27", id:"cinnabar-island", name:"Cinnabar Island",
    note:"Cinnabar Gym is inside Seafoam Islands. Items accessible via Rock Climb post-game.",
    pokemon:[
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
    ],
    items:[
      {name:"Star Piece", hidden:false, note:"Via Rock Climb"},
      {name:"Rare Candy", hidden:false, note:"Via Rock Climb"},
      {name:"Iron", hidden:false, note:"Via Rock Climb"},
      {name:"Magmarizer", hidden:false, note:"Via Rock Climb"},
    ],
    trainers:[] },

  { part:"Part 27", id:"route-20", name:"Route 20",
    note:"Between Seafoam Islands and Cinnabar/Fuchsia. Many swimmers. Two hidden sea-tooth items.",
    pokemon:[
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Chinchou", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Shellder", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Chinchou", method:"Super Rod", levels:"40", rate:"40%"},
      {name:"Shellder", method:"Super Rod", levels:"40", rate:"30%"},
      {name:"Tentacruel", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Lanturn", method:"Super Rod", levels:"40", rate:"10%"},
    ],
    items:[
      {name:"Stardust", hidden:true, note:"Route 20"},
      {name:"DeepSeaTooth", hidden:true, note:"Route 20"},
      {name:"DeepSeaScale", hidden:true, note:"Route 20"},
    ],
    trainers:[
      {class:"Swimmer", name:"Frankie", team:[{name:"Staryu",level:41}]},
      {class:"Swimmer", name:"Mina", team:[{name:"Tentacruel",level:43}]},
      {class:"Swimmer", name:"Leona", team:[{name:"Seaking",level:41}]},
      {class:"Swimmer", name:"Luis", team:[{name:"Gyarados",level:43}]},
      {class:"Swimmer", name:"Elmo", team:[{name:"Golduck",level:43}]},
      {class:"Swimmer", name:"Lori", team:[{name:"Starmie",level:43}]},
      {class:"Swimmer", name:"Nicole", team:[{name:"Lapras",level:43}]},
      {class:"Bird Keeper", name:"Bert", team:[{name:"Fearow",level:42}]},
      {class:"Bird Keeper", name:"Ernie", team:[{name:"Dodrio",level:42}]},
      {class:"Picnicker", name:"Cheyenne", team:[{name:"Seaking",level:42}]},
      {class:"Picnicker", name:"Adrian", team:[{name:"Tentacruel",level:42}]},
      {class:"Camper", name:"Pedro", team:[{name:"Gyarados",level:42}]},
    ] },

  { part:"Part 27", id:"seafoam-islands", name:"Seafoam Islands",
    note:"Large cave between Cinnabar and Fuchsia. Articuno on B4F. Cinnabar Gym access from 1F.",
    floors:[
      { label:"1F", pokemon:[
          {name:"Zubat", method:"Cave", levels:"20–24", rate:"30%"},
          {name:"Golbat", method:"Cave", levels:"24–28", rate:"20%"},
          {name:"Psyduck", method:"Cave", levels:"22–26", rate:"30%"},
          {name:"Golduck", method:"Cave", levels:"26–30", rate:"20%"},
        ], items:[
          {name:"Escape Rope", hidden:true, note:"1F"},
        ], trainers:[] },
      { label:"B1F", pokemon:[
          {name:"Seel", method:"Cave", levels:"22–26", rate:"30%"},
          {name:"Golbat", method:"Cave", levels:"24–28", rate:"20%"},
          {name:"Psyduck", method:"Cave", levels:"22–26", rate:"20%"},
          {name:"Golduck", method:"Cave", levels:"26–30", rate:"15%"},
          {name:"Zubat", method:"Cave", levels:"20–24", rate:"15%"},
        ], items:[
          {name:"Grip Claw", hidden:false, note:"B1F"},
          {name:"Ice Heal", hidden:true,  note:"B1F — W side of lighter-colored ground"},
          {name:"Ice Heal", hidden:false, note:"B1F — NE area, on rocky ridge"},
        ], trainers:[
          {class:"Skier", name:"Cady", team:[{name:"Delibird",level:53}]},
        ] },
      { label:"B2F", pokemon:[
          {name:"Seel", method:"Cave", levels:"22–26", rate:"30%"},
          {name:"Golbat", method:"Cave", levels:"24–28", rate:"20%"},
          {name:"Psyduck", method:"Cave", levels:"22–26", rate:"20%"},
          {name:"Golduck", method:"Cave", levels:"26–30", rate:"15%"},
          {name:"Zubat", method:"Cave", levels:"20–24", rate:"15%"},
        ], items:[
          {name:"Water Stone", hidden:false, note:"B2F lower area"},
        ], trainers:[
          {class:"Boarder", name:"Shaun", team:[{name:"Cloyster",level:55},{name:"Dewgong",level:50}]},
          {class:"Boarder", name:"Bryce", team:[{name:"Dewgong",level:55},{name:"Lapras",level:50}]},
        ] },
      { label:"B3F", pokemon:[
          {name:"Golbat", method:"Cave", levels:"24–28", rate:"25%"},
          {name:"Dewgong", method:"Cave", levels:"26–30", rate:"20%"},
          {name:"Golduck", method:"Cave", levels:"26–30", rate:"20%"},
          {name:"Psyduck", method:"Cave", levels:"22–26", rate:"15%"},
          {name:"Zubat", method:"Cave", levels:"20–24", rate:"10%"},
          {name:"Seel", method:"Cave", levels:"22–26", rate:"10%"},
        ], items:[
          {name:"Pearl", hidden:true,  note:"×2, B3F lower"},
          {name:"Max Revive", hidden:false, note:"B3F lower"},
        ], trainers:[] },
      { label:"B4F", pokemon:[
          {name:"Golbat", method:"Cave", levels:"24–28", rate:"20%"},
          {name:"Dewgong", method:"Cave", levels:"26–30", rate:"20%"},
          {name:"Golduck", method:"Cave", levels:"26–30", rate:"15%"},
          {name:"Jynx", method:"Cave", levels:"26–30", rate:"15%"},
          {name:"Psyduck", method:"Cave", levels:"22–26", rate:"15%"},
          {name:"Seel", method:"Cave", levels:"22–26", rate:"10%"},
          {name:"Seel", method:"Surf", levels:"20–30", rate:"90%"},
          {name:"Horsea", method:"Surf", levels:"15–20", rate:"10%"},
          {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
          {name:"Seel", method:"Good Rod", levels:"20", rate:"85%"},
          {name:"Horsea", method:"Good Rod", levels:"20", rate:"15%"},
          {name:"Dewgong", method:"Super Rod", levels:"40", rate:"60%"},
          {name:"Slowbro", method:"Super Rod", levels:"40", rate:"40%"},
          {name:"Articuno", method:"Cave", levels:"50", rate:"One", warn:true, note:"Legendary — northwest chamber of B4F"},
        ], items:[
          {name:"Big Pearl", hidden:false, note:"B4F north"},
          {name:"Rare Candy", hidden:true, note:"B4F"},
          {name:"Revive", hidden:false, note:"B4F"},
          {name:"Ultra Ball", hidden:false, note:"B4F"},
          {name:"TM13 Ice Beam", hidden:false, note:"B4F east"},
          {name:"Zinc", hidden:true, note:"B4F"},
        ], trainers:[] },
    ] },

  { part:"Part 27", id:"cinnabar-gym", name:"Cinnabar Gym",
    note:"Blaine — Fire specialist. Accessed via Seafoam Islands 1F upper level. Reward: TM50 Overheat.",
    pokemon:[], items:[{name:"TM50 Overheat", hidden:false, note:"Reward from Blaine"}],
    trainers:[
      {class:"Scientist", name:"Lowell", team:[{name:"Magmar",level:50}]},
      {class:"Scientist", name:"Daniel", team:[{name:"Magmar",level:48},{name:"Flareon",level:48}]},
      {class:"Scientist", name:"Linden", team:[{name:"Magcargo",level:50}]},
      {class:"Super Nerd", name:"Cary", team:[{name:"Magmar",level:48}]},
      {class:"Super Nerd", name:"Waldo", team:[{name:"Rapidash",level:48}]},
      {class:"Super Nerd", name:"Merle", team:[{name:"Flareon",level:48},{name:"Flareon",level:48}]},
      {class:"Gym Leader", name:"Blaine", team:[{name:"Magcargo",level:54},{name:"Magmar",level:54},{name:"Rapidash",level:59}]},
    ] },

  { part:"Part 27", id:"route-19", name:"Route 19",
    note:"South of Fuchsia. Rock Smash gives Krabby/Kingler. Clamperl swarm on Surf.",
    pokemon:[
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"90%"},
      {name:"Tentacruel", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Krabby", method:"Good Rod", levels:"20", rate:"50%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Corsola", method:"Good Rod", levels:"20", rate:"10%", time:"day", note:"Day only"},
      {name:"Staryu", method:"Good Rod", levels:"20", rate:"10%", time:"night", note:"Night only"},
      {name:"Krabby", method:"Super Rod", levels:"40", rate:"60%"},
      {name:"Corsola", method:"Super Rod", levels:"40", rate:"30%", time:"day", note:"Day only"},
      {name:"Staryu", method:"Super Rod", levels:"40", rate:"30%", time:"night", note:"Night only"},
      {name:"Kingler", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Krabby", method:"Rock Smash", levels:"20–26", rate:"80%"},
      {name:"Kingler", method:"Rock Smash", levels:"28–31", rate:"20%"},
      {name:"Clamperl", method:"Surf", levels:"25", rate:"60% (Swarm)", note:"Swarm — replaces Tentacool"},
    ],
    items:[
      {name:"TM55 Brine", hidden:false, note:"On sandbar reached via Surf"},
      {name:"Big Pearl", hidden:true, note:"Route 19"},
      {name:"Pearl", hidden:true, note:"×2, Route 19"},
      {name:"Max Elixir", hidden:true, note:"Route 19"},
      {name:"Revive", hidden:true, note:"Via Rock Smash"},
    ],
    trainers:[
      {class:"Swimmer", name:"Tucker", team:[{name:"Gyarados",level:41}]},
      {class:"Swimmer", name:"Debbie", team:[{name:"Starmie",level:43}]},
      {class:"Swimmer", name:"Harold", team:[{name:"Tentacruel",level:43}]},
      {class:"Swimmer", name:"Jerome", team:[{name:"Golduck",level:43}]},
    ] },

  // ── Part 28 ─────────────────────────────────────────────────────────
  { part:"Part 28", id:"viridian-gym", name:"Viridian Gym",
    note:"Blue — balanced team. Requires all 7 other Kanto badges. Reward: TM92 Trick Room.",
    pokemon:[], items:[{name:"TM92 Trick Room", hidden:false, note:"Reward from Blue"}],
    trainers:[
      {class:"Ace Trainer", name:"Arabella", team:[{name:"Clefable",level:49}]},
      {class:"Ace Trainer", name:"Salma", team:[{name:"Rhydon",level:51}]},
      {class:"Ace Trainer", name:"Bonita", team:[{name:"Exeggutor",level:51}]},
      {class:"Double Team", name:"Elan & Ida", team:[{name:"Nidoking",level:51},{name:"Nidoqueen",level:51}]},
      {class:"Gym Leader", name:"Blue", team:[{name:"Exeggutor",level:55},{name:"Rhydon",level:58},{name:"Machamp",level:56},{name:"Gyarados",level:52},{name:"Arcanine",level:58},{name:"Pidgeot",level:60}]},
    ] },

  { part:"Part 28", id:"route-22", name:"Route 22",
    note:"West of Viridian. Short route toward Route 28 gate.",
    pokemon:[
      {name:"Rattata", method:"Grass", levels:"4–5", rate:"30%"},
      {name:"Spearow", method:"Grass", levels:"4", rate:"35%"},
      {name:"Fearow", method:"Grass", levels:"7", rate:"5%"},
      {name:"Ponyta", method:"Grass", levels:"6", rate:"5%"},
      {name:"Doduo", method:"Grass", levels:"5", rate:"10%"},
      {name:"Poliwag", method:"Surf", levels:"10–20", rate:"90%"},
      {name:"Poliwhirl", method:"Surf", levels:"20–30", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"100%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"85%"},
      {name:"Poliwag", method:"Good Rod", levels:"20", rate:"15%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"40", rate:"90%"},
      {name:"Politoed", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"15–16", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"15–16", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 28", id:"route-28", name:"Route 28",
    note:"Remote route leading to Mt. Silver. Version-exclusive Donphan/Ursaring. Items via Cut.",
    pokemon:[
      {name:"Ponyta", method:"Grass", levels:"33–35", rate:"30%"},
      {name:"Tangela", method:"Grass", levels:"33–35", rate:"30%"},
      {name:"Donphan", method:"Grass", levels:"35", rate:"20%", hgOnly:true},
      {name:"Ursaring", method:"Grass", levels:"35", rate:"20%", ssOnly:true},
      {name:"Rapidash", method:"Grass", levels:"37", rate:"10% (morning/day)", time:"morning"},
      {name:"Rapidash", method:"Grass", levels:"37", rate:"10% (morning/day)", time:"day"},
      {name:"Doduo", method:"Grass", levels:"30", rate:"5%"},
      {name:"Dodrio", method:"Grass", levels:"35", rate:"5%"},
      {name:"Sneasel", method:"Grass", levels:"35", rate:"10% (night)", time:"night"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"25–28", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"25–28", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"25–28", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"25–28", rate:"20%"},
    ],
    items:[
      {name:"TM47 Steel Wing", hidden:false, note:"From woman in house on Route 28 via Cut"},
      {name:"TM35 Flamethrower", hidden:false, note:"East of house via Cut"},
      {name:"Rare Candy", hidden:true, note:"Route 28"},
    ],
    trainers:[] },

  { part:"Part 28", id:"mt-silver-exterior", name:"Mt. Silver (Exterior)",
    note:"Grassy areas around the base of Mt. Silver. Reaper Cloth via Surf.",
    pokemon:[
      {name:"Ponyta", method:"Grass", levels:"33–35", rate:"30%"},
      {name:"Rapidash", method:"Grass", levels:"37", rate:"10% (morning/day)", time:"morning"},
      {name:"Rapidash", method:"Grass", levels:"37", rate:"10% (morning/day)", time:"day"},
      {name:"Doduo", method:"Grass", levels:"30", rate:"5%"},
      {name:"Dodrio", method:"Grass", levels:"35", rate:"5%"},
      {name:"Tangela", method:"Grass", levels:"33–35", rate:"30%"},
      {name:"Sneasel", method:"Grass", levels:"35", rate:"10% (night)", time:"night"},
      {name:"Ursaring", method:"Grass", levels:"35", rate:"20%", ssOnly:true},
      {name:"Donphan", method:"Grass", levels:"35", rate:"20%", hgOnly:true},
      {name:"Poliwag", method:"Surf", levels:"10–20", rate:"90%"},
      {name:"Poliwhirl", method:"Surf", levels:"20–30", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"25–28", rate:"50%"},
      {name:"Spinarak", method:"Headbutt (Common)", levels:"25–28", rate:"30%", hgOnly:true},
      {name:"Ledyba", method:"Headbutt (Common)", levels:"25–28", rate:"30%", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"25–28", rate:"20%"},
    ],
    items:[
      {name:"Full Restore", hidden:true, note:"Mt. Silver exterior"},
      {name:"Reaper Cloth", hidden:false, note:"Via Surf"},
    ],
    trainers:[] },

  { part:"Part 28", id:"national-park-rock-climb-return", name:"National Park (Return — Rock Climb)",
    note:"Return with Rock Climb (from Oak after 16 badges) to reach the NE cliff.",
    pokemon:[],
    items:[
      {name:"Shiny Stone", hidden:false, note:"NE cliff"},
    ],
    trainers:[] },

  { part:"Part 28", id:"route-38-rock-climb-return", name:"Route 38 (Return — Rock Climb)",
    note:"Return with Rock Climb to reach the SW fenced area and the easternmost hilltop Headbutt tree.",
    pokemon:[
      {name:"Exeggcute", method:"Headbutt", levels:"18–20", rate:"65%", note:"Easternmost hilltop tree"},
      {name:"Burmy",     method:"Headbutt", levels:"18–25", rate:"35%", note:"Easternmost hilltop tree"},
    ],
    items:[
      {name:"Lax Incense", hidden:false, note:"SW area behind fence via Route 39"},
      {name:"HP Up",       hidden:true,  note:"SW area behind fence via Route 39"},
    ],
    trainers:[] },

  { part:"Part 28", id:"route-42-rock-climb-return", name:"Route 42 (Return — Rock Climb)",
    note:"Return with Rock Climb to access the cliff north of the eastern lake via Mt. Mortar.",
    pokemon:[],
    items:[
      {name:"Dubious Disc", hidden:false, note:"N of eastern lake, accessed via Mt. Mortar (requires Rock Climb)"},
    ],
    trainers:[] },

  { part:"Part 28", id:"route-45-rock-climb-return", name:"Route 45 (Return — Rock Climb)",
    note:"Return with Rock Climb. The PP Max is on a cliff in the SW area, accessed via Route 46.",
    pokemon:[],
    items:[
      {name:"PP Max", hidden:true, note:"SW cliff accessible via Route 46 (requires Rock Climb)"},
    ],
    trainers:[] },

  // ── Part 29 ─────────────────────────────────────────────────────────
  { part:"Part 29", id:"mt-silver-cave", name:"Mt. Silver Cave",
    note:"Deepest dungeon in the game. Red waits at the summit — the final challenge.",
    floors:[
      { label:"1F Cave", pokemon:[
          {name:"Golbat", method:"Cave", levels:"35–40", rate:"20%"},
          {name:"Graveler", method:"Cave", levels:"35–40", rate:"25%"},
          {name:"Onix", method:"Cave", levels:"35–40", rate:"20%"},
          {name:"Teddiursa", method:"Cave", levels:"35–40", rate:"25%", ssOnly:true},
          {name:"Ursaring", method:"Cave", levels:"40–45", rate:"5%", ssOnly:true},
          {name:"Phanpy", method:"Cave", levels:"35–40", rate:"25%", hgOnly:true},
          {name:"Donphan", method:"Cave", levels:"40–45", rate:"5%", hgOnly:true},
          {name:"Larvitar", method:"Cave", levels:"20–30", rate:"5%"},
        ], items:[
          {name:"Full Restore", hidden:false, note:"1F Cave"},
          {name:"Ultra Ball", hidden:false, note:"1F Cave"},
        ], trainers:[] },
      { label:"Lower Mountainside", pokemon:[
          {name:"Golbat", method:"Grass", levels:"35–40", rate:"15%"},
          {name:"Golduck", method:"Grass", levels:"35–40", rate:"20%"},
          {name:"Onix", method:"Grass", levels:"35–40", rate:"20%"},
          {name:"Teddiursa", method:"Grass", levels:"35–40", rate:"25%", ssOnly:true},
          {name:"Ursaring", method:"Grass", levels:"40–45", rate:"5%", ssOnly:true},
          {name:"Phanpy", method:"Grass", levels:"35–40", rate:"25%", hgOnly:true},
          {name:"Donphan", method:"Grass", levels:"40–45", rate:"5%", hgOnly:true},
          {name:"Larvitar", method:"Grass", levels:"20–30", rate:"5%"},
          {name:"Hoothoot", method:"Headbutt (Common)", levels:"30–33", rate:"50%"},
          {name:"Pineco", method:"Headbutt (Common)", levels:"30–33", rate:"30%"},
          {name:"Exeggcute", method:"Headbutt (Common)", levels:"30–33", rate:"20%"},
        ], items:[
          {name:"Max Potion", hidden:false, note:"Lower mountainside"},
          {name:"Carbos", hidden:true, note:"Lower mountainside"},
        ], trainers:[] },
      { label:"2F Cave", pokemon:[
          {name:"Golbat", method:"Cave", levels:"38–42", rate:"15%"},
          {name:"Golduck", method:"Cave", levels:"38–42", rate:"15%"},
          {name:"Quagsire", method:"Cave", levels:"38–42", rate:"20%"},
          {name:"Misdreavus", method:"Cave", levels:"38–42", rate:"15%", time:"night"},
          {name:"Sneasel", method:"Cave", levels:"38–42", rate:"20%"},
          {name:"Teddiursa", method:"Cave", levels:"38–42", rate:"20%", ssOnly:true},
          {name:"Ursaring", method:"Cave", levels:"43–47", rate:"5%", ssOnly:true},
          {name:"Phanpy", method:"Cave", levels:"38–42", rate:"20%", hgOnly:true},
          {name:"Donphan", method:"Cave", levels:"43–47", rate:"5%", hgOnly:true},
          {name:"Larvitar", method:"Cave", levels:"25–35", rate:"5%"},
        ], items:[
          {name:"Max Revive", hidden:false, note:"2F Cave"},
          {name:"PP Max", hidden:true, note:"2F Cave"},
          {name:"Protein", hidden:false, note:"2F Cave"},
        ], trainers:[] },
      { label:"Upper Mountainside", pokemon:[
          {name:"Golbat", method:"Grass", levels:"38–42", rate:"15%"},
          {name:"Golduck", method:"Grass", levels:"38–42", rate:"15%"},
          {name:"Quagsire", method:"Grass", levels:"38–42", rate:"20%"},
          {name:"Misdreavus", method:"Grass", levels:"38–42", rate:"15%", time:"night"},
          {name:"Sneasel", method:"Grass", levels:"38–42", rate:"20%"},
          {name:"Teddiursa", method:"Grass", levels:"38–42", rate:"20%", ssOnly:true},
          {name:"Ursaring", method:"Grass", levels:"43–47", rate:"5%", ssOnly:true},
          {name:"Phanpy", method:"Grass", levels:"38–42", rate:"20%", hgOnly:true},
          {name:"Donphan", method:"Grass", levels:"43–47", rate:"5%", hgOnly:true},
          {name:"Larvitar", method:"Grass", levels:"25–35", rate:"5%"},
        ], items:[
          {name:"Iron", hidden:true, note:"Upper mountainside"},
        ], trainers:[] },
      { label:"3F Cave", pokemon:[
          {name:"Golbat", method:"Cave", levels:"40–45", rate:"20%"},
          {name:"Golduck", method:"Cave", levels:"40–45", rate:"15%"},
          {name:"Quagsire", method:"Cave", levels:"40–45", rate:"20%"},
          {name:"Misdreavus", method:"Cave", levels:"40–45", rate:"15%", time:"night"},
          {name:"Sneasel", method:"Cave", levels:"40–45", rate:"20%"},
          {name:"Ursaring", method:"Cave", levels:"45–50", rate:"5%", ssOnly:true},
          {name:"Donphan", method:"Cave", levels:"45–50", rate:"5%", hgOnly:true},
          {name:"Larvitar", method:"Cave", levels:"30–40", rate:"5%"},
        ], items:[
          {name:"HP Up", hidden:false, note:"3F Cave"},
          {name:"Rare Candy", hidden:true, note:"3F Cave"},
        ], trainers:[] },
      { label:"Summit", pokemon:[
          {name:"Moltres", method:"Cave", levels:"50", rate:"One", warn:true, note:"1F northwest chamber — accessible before summit"},
        ], items:[
          {name:"TM02 Dragon Claw", hidden:false, note:"Summit area"},
        ], trainers:[
          {class:"Rival", name:"Red", note:"The final challenge. lv80–88 team.", warn:true, team:[{name:"Pikachu",level:88},{name:"Lapras",level:80},{name:"Snorlax",level:82},{name:"Venusaur",level:84},{name:"Charizard",level:84},{name:"Blastoise",level:84}]},
        ] },
    ] },

  // ── Part 30 ─────────────────────────────────────────────────────────
  { part:"Part 30", id:"route-10-zapdos", name:"Route 10 (Return — Zapdos)",
    note:"Zapdos appears at Power Plant after earning the Earth Badge (Viridian Gym). One-time encounter.",
    pokemon:[
      {name:"Zapdos", method:"Cave", levels:"50", rate:"One", warn:true, note:"Appears after earning Earth Badge — enter Power Plant"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 30", id:"cerulean-cave", name:"Cerulean Cave",
    note:"Accessible after entering Hall of Fame. Mewtwo on B1F. Many rare Pokémon.",
    floors:[
      { label:"1F", pokemon:[
          {name:"Electrode", method:"Cave", levels:"45–55", rate:"5%"},
          {name:"Wobbuffet", method:"Cave", levels:"45–55", rate:"5%"},
          {name:"Machoke", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Parasect", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Primeape", method:"Cave", levels:"45–55", rate:"15%", hgOnly:true},
          {name:"Persian", method:"Cave", levels:"45–55", rate:"15%", ssOnly:true},
          {name:"Magneton", method:"Cave", levels:"45–55", rate:"15%"},
          {name:"Ditto", method:"Cave", levels:"45–55", rate:"15%"},
          {name:"Golbat", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Psyduck", method:"Surf", levels:"20–30", rate:"90%"},
          {name:"Golduck", method:"Surf", levels:"30–40", rate:"10%"},
          {name:"Geodude", method:"Rock Smash", levels:"25–35", rate:"80%"},
          {name:"Graveler", method:"Rock Smash", levels:"35–45", rate:"20%"},
        ], items:[
          {name:"Nugget", hidden:false, note:"1F"},
          {name:"Hyper Potion", hidden:false, note:"1F"},
          {name:"Full Restore", hidden:false, note:"1F"},
          {name:"Revive", hidden:true, note:"1F"},
          {name:"Max Elixir", hidden:false, note:"1F"},
          {name:"Sea Incense", hidden:false, note:"1F"},
          {name:"Rare Candy", hidden:true, note:"1F"},
        ], trainers:[] },
      { label:"2F", pokemon:[
          {name:"Golbat", method:"Cave", levels:"45–55", rate:"25%"},
          {name:"Parasect", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Kadabra", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Machoke", method:"Cave", levels:"45–55", rate:"15%"},
          {name:"Magneton", method:"Cave", levels:"45–55", rate:"10%"},
          {name:"Electrode", method:"Cave", levels:"45–55", rate:"5%"},
          {name:"Ditto", method:"Cave", levels:"45–55", rate:"5%"},
          {name:"Wobbuffet", method:"Cave", levels:"45–55", rate:"5%"},
        ], items:[
          {name:"TM24 Thunderbolt", hidden:false, note:"2F"},
          {name:"PP Up", hidden:false, note:"2F — W of west-central ladder (requires Rock Smash)"},
          {name:"PP Up", hidden:true,  note:"2F — SE clearing, lone crystal in SE corner"},
          {name:"Zinc", hidden:true, note:"2F"},
          {name:"Full Heal", hidden:true, note:"2F"},
          {name:"Big Pearl", hidden:true, note:"2F"},
          {name:"Ultra Ball", hidden:true,  note:"2F — SE clearing, NE of northernmost lone crystal"},
          {name:"Ultra Ball", hidden:false, note:"2F — NW, west-central area"},
          {name:"Odd Incense", hidden:false, note:"2F"},
          {name:"Protein", hidden:false, note:"2F"},
        ], trainers:[] },
      { label:"B1F", pokemon:[
          {name:"Parasect", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Kadabra", method:"Cave", levels:"45–55", rate:"20%"},
          {name:"Magneton", method:"Cave", levels:"45–55", rate:"15%"},
          {name:"Golbat", method:"Cave", levels:"45–55", rate:"15%"},
          {name:"Machoke", method:"Cave", levels:"45–55", rate:"15%"},
          {name:"Ditto", method:"Cave", levels:"45–55", rate:"10%"},
          {name:"Electrode", method:"Cave", levels:"45–55", rate:"5%"},
          {name:"Wobbuffet", method:"Cave", levels:"45–55", rate:"5%"},
          {name:"Mewtwo", method:"Cave", levels:"70", rate:"One", warn:true, note:"At the back of B1F"},
          {name:"Psyduck", method:"Surf", levels:"20–30", rate:"90%"},
          {name:"Golduck", method:"Surf", levels:"30–40", rate:"10%"},
          {name:"Geodude", method:"Rock Smash", levels:"25–35", rate:"80%"},
          {name:"Graveler", method:"Rock Smash", levels:"35–45", rate:"20%"},
        ], items:[
          {name:"Ultra Ball", hidden:false, note:"×2, B1F"},
          {name:"Dusk Stone", hidden:false, note:"B1F"},
          {name:"Max Revive", hidden:false, note:"×2, B1F"},
          {name:"Nugget", hidden:false, note:"B1F"},
          {name:"Electirizer", hidden:false, note:"B1F"},
          {name:"Black Sludge", hidden:false, note:"B1F"},
        ], trainers:[] },
    ] },

  { part:"Part 30", id:"route-25-suicune", name:"Route 25 (Return — Suicune)",
    note:"Suicune appears at Cerulean Cape (end of Route 25) after being tracked through both regions.",
    pokemon:[
      {name:"Suicune", method:"Cave", levels:"40", rate:"One", warn:true, note:"Appears at Cerulean Cape after tracking encounters in both Johto and Kanto"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 30", id:"pallet-town-oak-starters", name:"Pallet Town (Return — Kanto Starters)",
    note:"Professor Oak gives one Kanto starter after defeating Red.",
    pokemon:[
      {name:"Bulbasaur",  method:"Gift", levels:"5", rate:"One", warn:true, note:"Choose one of three from Professor Oak after defeating Red", choiceGroup:"kanto-starter", choiceId:"bulbasaur"},
      {name:"Charmander", method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"kanto-starter", choiceId:"charmander"},
      {name:"Squirtle",   method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"kanto-starter", choiceId:"squirtle"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 30", id:"saffron-city-post", name:"Saffron City (Return — Hoenn Starters)",
    note:"Steven at Silph Co. gives one Hoenn starter after showing him a high-level Pokémon. Trade Beldum for Forretress available.",
    pokemon:[
      {name:"Treecko", method:"Gift", levels:"5", rate:"One", warn:true, note:"Choose one of three from Steven in Silph Co. after defeating Red", choiceGroup:"hoenn-starter", choiceId:"treecko"},
      {name:"Torchic", method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"hoenn-starter", choiceId:"torchic"},
      {name:"Mudkip",  method:"Gift", levels:"5", rate:"One", warn:true, choiceGroup:"hoenn-starter", choiceId:"mudkip"},
    ],
    items:[
      {name:"Steelix Lure", hidden:false, note:"Trade Beldum for Forretress (available after Steven in Pewter Museum)"},
    ],
    trainers:[
      {class:"Trade", name:"Beldum → Forretress", note:"Trade at Silph Co. after Steven event; Forretress holds Steelix Lure", team:[]},
    ] },

  { part:"Part 30", id:"route-30-orbs", name:"Mr. Pokémon's House (Return — Orbs)",
    note:"After obtaining a Kanto starter from Oak, return to Mr. Pokémon on Route 30 to receive the orb.",
    pokemon:[],
    items:[
      {name:"Blue Orb", hidden:false, note:"HG only — from Mr. Pokémon after getting Kanto starter; triggers Kyogre at Embedded Tower", hgOnly:true},
      {name:"Red Orb", hidden:false, note:"SS only — from Mr. Pokémon after getting Kanto starter; triggers Groudon at Embedded Tower", ssOnly:true},
    ],
    trainers:[] },

  // ── Part 31 ─────────────────────────────────────────────────────────
  { part:"Part 31", id:"cliff-edge-gate", name:"Cliff Edge Gate",
    note:"Cavern on Cianwood's landmass leading west to Route 47. Chuck stops you here with the Blue/Red Orb in hand.",
    pokemon:[
      {name:"Wooper", method:"Surf", levels:"20–30", rate:"90%"},
      {name:"Quagsire", method:"Surf", levels:"30–40", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"100%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"85%"},
      {name:"Poliwag", method:"Good Rod", levels:"20", rate:"15%"},
      {name:"Magikarp", method:"Super Rod", levels:"40", rate:"70%"},
      {name:"Poliwag", method:"Super Rod", levels:"40", rate:"30%"},
    ],
    items:[
      {name:"Big Pearl", hidden:true, note:"Northeast side of pool (requires Rock Climb + Surf)"},
    ],
    trainers:[] },

  { part:"Part 31", id:"route-47", name:"Route 47",
    note:"Treacherous cliffside route west of Cliff Edge Gate. Three levels. Embedded Tower below.",
    pokemon:[
      {name:"Raticate", method:"Grass", levels:"31–33", rate:"5%"},
      {name:"Spearow", method:"Grass", levels:"31", rate:"5%"},
      {name:"Fearow", method:"Grass", levels:"34", rate:"4%"},
      {name:"Gloom", method:"Grass", levels:"32", rate:"5%"},
      {name:"Farfetch'd", method:"Grass", levels:"35", rate:"20% (morning/day)", time:"morning"},
      {name:"Farfetch'd", method:"Grass", levels:"35", rate:"20% (morning/day)", time:"day"},
      {name:"Ditto", method:"Grass", levels:"31–40", rate:"41%"},
      {name:"Noctowl", method:"Grass", levels:"35", rate:"20% (night)", time:"night"},
      {name:"Miltank", method:"Grass", levels:"35", rate:"20%"},
      {name:"Tentacool", method:"Surf", levels:"15–25", rate:"60%"},
      {name:"Seel", method:"Surf", levels:"10–20", rate:"30%"},
      {name:"Staryu", method:"Surf", levels:"15–25", rate:"10%"},
      {name:"Magikarp", method:"Old Rod", levels:"10", rate:"85%"},
      {name:"Tentacool", method:"Old Rod", levels:"10", rate:"15%"},
      {name:"Magikarp", method:"Good Rod", levels:"20", rate:"40%"},
      {name:"Tentacool", method:"Good Rod", levels:"20", rate:"30%"},
      {name:"Chinchou", method:"Good Rod", levels:"20", rate:"20%"},
      {name:"Shellder", method:"Good Rod", levels:"20", rate:"10%"},
      {name:"Chinchou", method:"Super Rod", levels:"40", rate:"40%"},
      {name:"Shellder", method:"Super Rod", levels:"40", rate:"30%"},
      {name:"Tentacruel", method:"Super Rod", levels:"40", rate:"20%"},
      {name:"Lanturn", method:"Super Rod", levels:"40", rate:"10%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Pineco", method:"Headbutt (Common)", levels:"15–16", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
      {name:"Metapod", method:"Headbutt (Rare)", levels:"25–28", rate:"50%", hgOnly:true},
      {name:"Kakuna", method:"Headbutt (Rare)", levels:"25–28", rate:"50%", ssOnly:true},
      {name:"Butterfree", method:"Headbutt (Rare)", levels:"25–28", rate:"30%", hgOnly:true},
      {name:"Beedrill", method:"Headbutt (Rare)", levels:"25–28", rate:"30%", ssOnly:true},
      {name:"Heracross", method:"Headbutt (Rare)", levels:"25–28", rate:"15%"},
      {name:"Ditto", method:"Grass", levels:"35", rate:"40% (Swarm)"},
    ],
    items:[
      {name:"Revive", hidden:false, note:"Middle level, between the two waterfalls"},
      {name:"Pearl", hidden:true, note:"Lower level beach (requires Surf)"},
      {name:"White Flute", hidden:false, note:"Northwestern clearing (requires Surf + Waterfall)"},
      {name:"Stardust", hidden:true, note:"Southwest lower cliff (requires Surf + Rock Climb)"},
      {name:"Wave Incense", hidden:false, note:"Southwest westernmost beach (requires Surf + Rock Climb)"},
      {name:"Lagging Tail", hidden:false, note:"Upper level, south end of grass-covered cliff"},
    ],
    trainers:[
      {class:"Hiker", name:"Devin", team:[{name:"Dunsparce",level:19},{name:"Dunsparce",level:19},{name:"Dunsparce",level:19}]},
      {class:"Camper", name:"Grant", team:[{name:"Skiploom",level:21},{name:"Marill",level:21}]},
      {class:"Double Team", name:"Thom & Kae", team:[{name:"Magmar",level:25},{name:"Electabuzz",level:25}]},
      {class:"Young Couple", name:"Duff & Eda", team:[{name:"Cloyster",level:22},{name:"Onix",level:22}]},
    ] },

  { part:"Part 31", id:"cliff-cave", name:"Cliff Cave",
    note:"Small cavern inside Route 47 providing access between the three levels. Rock Smash reveals Krabby/Kingler.",
    pokemon:[
      {name:"Zubat", method:"Cave", levels:"18", rate:"5% (night)", time:"night"},
      {name:"Golbat", method:"Cave", levels:"20–22", rate:"24%"},
      {name:"Machop", method:"Cave", levels:"19", rate:"10%"},
      {name:"Machoke", method:"Cave", levels:"22", rate:"4%"},
      {name:"Geodude", method:"Cave", levels:"19", rate:"20%"},
      {name:"Graveler", method:"Cave", levels:"20", rate:"4% (morning/day)", time:"morning"},
      {name:"Onix", method:"Cave", levels:"20", rate:"10%"},
      {name:"Krabby", method:"Cave", levels:"20", rate:"10%"},
      {name:"Kingler", method:"Cave", levels:"22", rate:"10%"},
      {name:"Wooper", method:"Cave", levels:"18", rate:"5% (morning/day)", time:"morning"},
      {name:"Quagsire", method:"Cave", levels:"20", rate:"5% (morning/day)", time:"morning"},
      {name:"Misdreavus", method:"Cave", levels:"20", rate:"5% (night)", time:"night"},
      {name:"Steelix", method:"Cave", levels:"23", rate:"2%"},
      {name:"Krabby", method:"Rock Smash", levels:"20–26", rate:"80%"},
      {name:"Kingler", method:"Rock Smash", levels:"28–31", rate:"20%"},
    ],
    items:[
      {name:"Ultra Ball", hidden:true, note:"3F, southeast corner wall"},
    ],
    trainers:[] },

  { part:"Part 31", id:"embedded-tower", name:"Embedded Tower",
    note:"Hidden ruins at the base of Route 47 cliffs. Kyogre (HG), Groudon (SS), and Rayquaza (both, with Jade Orb) await.",
    pokemon:[
      {name:"Kyogre", method:"Cave", levels:"50", rate:"One", warn:true, hgOnly:true, note:"HG only — requires Blue Orb from Mr. Pokémon"},
      {name:"Groudon", method:"Cave", levels:"50", rate:"One", warn:true, ssOnly:true, note:"SS only — requires Red Orb from Mr. Pokémon"},
      {name:"Rayquaza", method:"Cave", levels:"50", rate:"One", warn:true, note:"Both versions — requires Jade Orb (from Oak after showing both Kyogre and Groudon)"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 31", id:"route-48", name:"Route 48",
    note:"Short route linking Route 47 to the Safari Zone Gate. Tauros and Girafarig in tall grass.",
    pokemon:[
      {name:"Fearow", method:"Grass", levels:"21", rate:"10%"},
      {name:"Vulpix", method:"Grass", levels:"21–22", rate:"9%", ssOnly:true},
      {name:"Vulpix", method:"Grass", levels:"24", rate:"20% (night)", ssOnly:true, time:"night"},
      {name:"Gloom", method:"Grass", levels:"22–24", rate:"20%"},
      {name:"Diglett", method:"Grass", levels:"20", rate:"4%"},
      {name:"Growlithe", method:"Grass", levels:"21–22", rate:"9%", hgOnly:true},
      {name:"Growlithe", method:"Grass", levels:"25", rate:"20% (night)", hgOnly:true, time:"night"},
      {name:"Farfetch'd", method:"Grass", levels:"24–25", rate:"20% (morning/day)", time:"morning"},
      {name:"Tauros", method:"Grass", levels:"20–24", rate:"21%"},
      {name:"Hoppip", method:"Grass", levels:"20–22", rate:"11%"},
      {name:"Girafarig", method:"Grass", levels:"20", rate:"5%"},
      {name:"Hoothoot", method:"Headbutt (Common)", levels:"15–16", rate:"50%"},
      {name:"Pineco", method:"Headbutt (Common)", levels:"15–16", rate:"30%"},
      {name:"Exeggcute", method:"Headbutt (Common)", levels:"15–16", rate:"20%"},
    ],
    items:[
      {name:"Nugget", hidden:false, note:"Dead-end path west of tall grass"},
    ],
    trainers:[] },


  // ── Part 32 ─────────────────────────────────────────────────────────
  { part:"Part 32", id:"frontier-access", name:"Frontier Access",
    note:"Small town north of Route 40 leading to the Battle Frontier. Move Tutors here exchange moves for Battle Points.",
    pokemon:[],
    items:[
      {name:"Rare Candy", hidden:true, note:"Eastern clearing"},
    ],
    trainers:[] },

  { part:"Part 32", id:"battle-frontier", name:"Battle Frontier",
    note:"Five facilities: Battle Castle, Battle Hall, Battle Tower, Battle Factory, Battle Arcade. Frontier Brains challenged after win streaks. BP exchanged for items and TMs at Exchange Service Corner.",
    pokemon:[],
    items:[],
    trainers:[] },

  // ─── POKÉWALKER COURSES ────────────────────────────────────────────────────
  { part:"Pokéwalker", id:"pw-refreshing-field", name:"Refreshing Field",
    note:"Default course. Walk more steps to earn watts and encounter rarer Pokémon.",
    pokemon:[
      {name:"Pidgey",     method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Sentret",    method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Nidoran♀",  method:"Pokéwalker", levels:"5",  rate:"75%",  note:"≥500W"},
      {name:"Nidoran♂",  method:"Pokéwalker", levels:"5",  rate:"75%",  note:"≥500W"},
      {name:"Doduo",      method:"Pokéwalker", levels:"8",  rate:"70%",  note:"≥2000W"},
      {name:"Kangaskhan", method:"Pokéwalker", levels:"8",  rate:"50%",  note:"≥3000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-noisy-forest", name:"Noisy Forest",
    note:"Default course.",
    pokemon:[
      {name:"Spearow",    method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Oddish",     method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Paras",      method:"Pokéwalker", levels:"6",  rate:"89%",  note:"≥700W"},
      {name:"Venonat",    method:"Pokéwalker", levels:"6",  rate:"89%",  note:"≥700W"},
      {name:"Bellsprout", method:"Pokéwalker", levels:"8",  rate:"70%",  note:"≥3000W"},
      {name:"Wobbuffet",  method:"Pokéwalker", levels:"15", rate:"30%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-rugged-road", name:"Rugged Road",
    note:"Unlocked at 50W.",
    pokemon:[
      {name:"Geodude",    method:"Pokéwalker", levels:"8",  rate:"100%"},
      {name:"Hoothoot",   method:"Pokéwalker", levels:"6",  rate:"100%"},
      {name:"Machop",     method:"Pokéwalker", levels:"7",  rate:"92%",  note:"≥1000W"},
      {name:"Ponyta",     method:"Pokéwalker", levels:"7",  rate:"92%",  note:"≥1000W"},
      {name:"Onix",       method:"Pokéwalker", levels:"9",  rate:"80%",  note:"≥4000W"},
      {name:"Magby",      method:"Pokéwalker", levels:"9",  rate:"50%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-beautiful-beach", name:"Beautiful Beach",
    note:"Unlocked at 200W.",
    pokemon:[
      {name:"Sunkern",    method:"Pokéwalker", levels:"6",  rate:"100%"},
      {name:"Wooper",     method:"Pokéwalker", levels:"6",  rate:"100%"},
      {name:"Slowpoke",   method:"Pokéwalker", levels:"8",  rate:"87%",  note:"≥1000W"},
      {name:"Poliwag",    method:"Pokéwalker", levels:"8",  rate:"87%",  note:"≥1500W"},
      {name:"Psyduck",    method:"Pokéwalker", levels:"10", rate:"70%",  note:"≥4000W"},
      {name:"Staryu",     method:"Pokéwalker", levels:"10", rate:"60%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-suburban-area", name:"Suburban Area",
    note:"Unlocked at 500W.",
    pokemon:[
      {name:"Rattata",    method:"Pokéwalker", levels:"7",  rate:"100%"},
      {name:"Hoothoot",   method:"Pokéwalker", levels:"7",  rate:"100%"},
      {name:"Magnemite",  method:"Pokéwalker", levels:"8",  rate:"85%",  note:"≥1000W"},
      {name:"Murkrow",    method:"Pokéwalker", levels:"11", rate:"45%",  note:"≥1000W"},
      {name:"Magnemite",  method:"Pokéwalker", levels:"11", rate:"40%",  note:"≥4000W"},
      {name:"Elekid",     method:"Pokéwalker", levels:"11", rate:"15%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-dim-cave", name:"Dim Cave",
    note:"Unlocked at 1,000W.",
    pokemon:[
      {name:"Zubat",      method:"Pokéwalker", levels:"8",  rate:"100%"},
      {name:"Machop",     method:"Pokéwalker", levels:"8",  rate:"100%"},
      {name:"Gastly",     method:"Pokéwalker", levels:"10", rate:"92%",  note:"≥1000W"},
      {name:"Onix",       method:"Pokéwalker", levels:"10", rate:"92%",  note:"≥1000W"},
      {name:"Gastly",     method:"Pokéwalker", levels:"15", rate:"20%",  note:"≥5000W"},
      {name:"Smoochum",   method:"Pokéwalker", levels:"12", rate:"50%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-blue-lake", name:"Blue Lake",
    note:"Unlocked at 2,000W.",
    pokemon:[
      {name:"Tentacool",  method:"Pokéwalker", levels:"9",  rate:"100%"},
      {name:"Goldeen",    method:"Pokéwalker", levels:"9",  rate:"100%"},
      {name:"Shellder",   method:"Pokéwalker", levels:"12", rate:"92%",  note:"≥500W"},
      {name:"Krabby",     method:"Pokéwalker", levels:"12", rate:"72%",  note:"≥500W"},
      {name:"Poliwag",    method:"Pokéwalker", levels:"15", rate:"60%",  note:"≥4000W"},
      {name:"Dratini",    method:"Pokéwalker", levels:"10", rate:"30%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-town-outskirts", name:"Town Outskirts",
    note:"Unlocked at 3,000W.",
    pokemon:[
      {name:"Rattata",    method:"Pokéwalker", levels:"16", rate:"100%"},
      {name:"Furret",     method:"Pokéwalker", levels:"15", rate:"100%"},
      {name:"Grimer",     method:"Pokéwalker", levels:"13", rate:"75%",  note:"≥1500W"},
      {name:"Koffing",    method:"Pokéwalker", levels:"13", rate:"75%",  note:"≥1500W"},
      {name:"Voltorb",    method:"Pokéwalker", levels:"15", rate:"60%",  note:"≥3000W"},
      {name:"Abra",       method:"Pokéwalker", levels:"15", rate:"40%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-hoenn-field", name:"Hoenn Field",
    note:"Unlocked at 5,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Zigzagoon",  method:"Pokéwalker", levels:"17", rate:"100%"},
      {name:"Wurmple",    method:"Pokéwalker", levels:"15", rate:"100%"},
      {name:"Volbeat",    method:"Pokéwalker", levels:"25", rate:"84%",  note:"≥2000W"},
      {name:"Illumise",   method:"Pokéwalker", levels:"25", rate:"84%",  note:"≥2000W"},
      {name:"Linoone",    method:"Pokéwalker", levels:"30", rate:"75%",  note:"≥5000W"},
      {name:"Skitty",     method:"Pokéwalker", levels:"30", rate:"50%",  note:"≥7500W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-warm-beach", name:"Warm Beach",
    note:"Unlocked at 7,500W. Requires National Pokédex.",
    pokemon:[
      {name:"Goldeen",    method:"Pokéwalker", levels:"22", rate:"100%"},
      {name:"Magikarp",   method:"Pokéwalker", levels:"15", rate:"100%"},
      {name:"Carvanha",   method:"Pokéwalker", levels:"26", rate:"84%",  note:"≥1500W"},
      {name:"Horsea",     method:"Pokéwalker", levels:"20", rate:"84%",  note:"≥1500W"},
      {name:"Azurill",    method:"Pokéwalker", levels:"20", rate:"50%",  note:"≥5000W"},
      {name:"Wailmer",    method:"Pokéwalker", levels:"31", rate:"50%",  note:"≥7000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-volcano-path", name:"Volcano Path",
    note:"Unlocked at 10,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Geodude",    method:"Pokéwalker", levels:"29", rate:"100%"},
      {name:"Ponyta",     method:"Pokéwalker", levels:"19", rate:"100%"},
      {name:"Rhyhorn",    method:"Pokéwalker", levels:"25", rate:"85%",  note:"≥2000W"},
      {name:"Houndour",   method:"Pokéwalker", levels:"27", rate:"85%",  note:"≥2000W"},
      {name:"Slugma",     method:"Pokéwalker", levels:"31", rate:"70%",  note:"≥5000W"},
      {name:"Meditite",   method:"Pokéwalker", levels:"32", rate:"60%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-treehouse", name:"Treehouse",
    note:"Unlocked at 15,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Gloom",      method:"Pokéwalker", levels:"14", rate:"100%"},
      {name:"Weepinbell", method:"Pokéwalker", levels:"13", rate:"100%"},
      {name:"Girafarig",  method:"Pokéwalker", levels:"28", rate:"85%",  note:"≥1000W"},
      {name:"Stantler",   method:"Pokéwalker", levels:"28", rate:"85%",  note:"≥1000W"},
      {name:"Castform",   method:"Pokéwalker", levels:"30", rate:"30%",  note:"≥5000W"},
      {name:"Kecleon",    method:"Pokéwalker", levels:"30", rate:"30%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-scary-cave", name:"Scary Cave",
    note:"Unlocked at 20,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Gastly",     method:"Pokéwalker", levels:"15", rate:"100%"},
      {name:"Machop",     method:"Pokéwalker", levels:"13", rate:"100%"},
      {name:"Golbat",     method:"Pokéwalker", levels:"33", rate:"65%",  note:"≥500W"},
      {name:"Natu",       method:"Pokéwalker", levels:"24", rate:"55%",  note:"≥1000W"},
      {name:"Marowak",    method:"Pokéwalker", levels:"30", rate:"45%",  note:"≥5000W"},
      {name:"Tauros",     method:"Pokéwalker", levels:"30", rate:"45%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-sinnoh-field", name:"Sinnoh Field",
    note:"Unlocked at 25,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Bidoof",     method:"Pokéwalker", levels:"13", rate:"100%"},
      {name:"Kricketot",  method:"Pokéwalker", levels:"15", rate:"100%"},
      {name:"Shinx",      method:"Pokéwalker", levels:"33", rate:"55%",  note:"≥3000W"},
      {name:"Budew",      method:"Pokéwalker", levels:"30", rate:"55%",  note:"≥3000W"},
      {name:"Combee",     method:"Pokéwalker", levels:"30", rate:"45%",  note:"≥7000W"},
      {name:"Mime Jr.",   method:"Pokéwalker", levels:"29", rate:"40%",  note:"≥7000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-icy-mountain-rd", name:"Icy Mountain Rd.",
    note:"Unlocked at 30,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Mareep",     method:"Pokéwalker", levels:"15", rate:"100%"},
      {name:"Swinub",     method:"Pokéwalker", levels:"16", rate:"100%"},
      {name:"Sneasel",    method:"Pokéwalker", levels:"28", rate:"55%",  note:"≥3000W"},
      {name:"Bronzor",    method:"Pokéwalker", levels:"20", rate:"75%",  note:"≥3000W"},
      {name:"Snorunt",    method:"Pokéwalker", levels:"28", rate:"50%",  note:"≥10000W"},
      {name:"Snover",     method:"Pokéwalker", levels:"31", rate:"50%",  note:"≥10000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-big-forest", name:"Big Forest",
    note:"Unlocked at 40,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Exeggcute",  method:"Pokéwalker", levels:"17", rate:"100%"},
      {name:"Mareep",     method:"Pokéwalker", levels:"19", rate:"100%"},
      {name:"Tangela",    method:"Pokéwalker", levels:"30", rate:"55%",  note:"≥1000W"},
      {name:"Bibarel",    method:"Pokéwalker", levels:"30", rate:"55%",  note:"≥1000W"},
      {name:"Tropius",    method:"Pokéwalker", levels:"35", rate:"50%",  note:"≥6000W"},
      {name:"Bonsly",     method:"Pokéwalker", levels:"30", rate:"40%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-white-lake", name:"White Lake",
    note:"Unlocked at 50,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Chinchou",   method:"Pokéwalker", levels:"17", rate:"100%"},
      {name:"Remoraid",   method:"Pokéwalker", levels:"19", rate:"100%"},
      {name:"Haunter",    method:"Pokéwalker", levels:"25", rate:"55%",  note:"≥500W"},
      {name:"Buizel",     method:"Pokéwalker", levels:"28", rate:"65%",  note:"≥1000W"},
      {name:"Misdreavus", method:"Pokéwalker", levels:"32", rate:"50%",  note:"≥6000W"},
      {name:"Chingling",  method:"Pokéwalker", levels:"22", rate:"50%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-stormy-beach", name:"Stormy Beach",
    note:"Unlocked at 65,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Psyduck",    method:"Pokéwalker", levels:"22", rate:"100%"},
      {name:"Shellder",   method:"Pokéwalker", levels:"20", rate:"100%"},
      {name:"Seel",       method:"Pokéwalker", levels:"27", rate:"65%",  note:"≥1500W"},
      {name:"Magikarp",   method:"Pokéwalker", levels:"30", rate:"65%",  note:"≥500W"},
      {name:"Shellos",    method:"Pokéwalker", levels:"30", rate:"55%",  note:"≥5000W"},
      {name:"Finneon",    method:"Pokéwalker", levels:"26", rate:"30%",  note:"≥4000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-resort", name:"Resort",
    note:"Unlocked at 80,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Marill",     method:"Pokéwalker", levels:"25", rate:"100%"},
      {name:"Hoppip",     method:"Pokéwalker", levels:"25", rate:"100%"},
      {name:"Clefairy",   method:"Pokéwalker", levels:"31", rate:"55%",  note:"≥4000W"},
      {name:"Jigglypuff", method:"Pokéwalker", levels:"30", rate:"55%",  note:"≥4000W"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"30", rate:"45%",  note:"≥8000W"},
      {name:"Pachirisu",  method:"Pokéwalker", levels:"33", rate:"45%",  note:"≥8000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-quiet-cave", name:"Quiet Cave",
    note:"Unlocked at 100,000W. Requires National Pokédex.",
    pokemon:[
      {name:"Golbat",     method:"Pokéwalker", levels:"33", rate:"100%"},
      {name:"Noctowl",    method:"Pokéwalker", levels:"30", rate:"100%"},
      {name:"Feebas",     method:"Pokéwalker", levels:"30", rate:"20%",  note:"≥500W"},
      {name:"Chingling",  method:"Pokéwalker", levels:"26", rate:"45%",  note:"≥500W"},
      {name:"Spiritomb",  method:"Pokéwalker", levels:"31", rate:"5%",   note:"≥10000W"},
      {name:"Munchlax",   method:"Pokéwalker", levels:"33", rate:"15%",  note:"≥10000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-beyond-the-sea", name:"Beyond the Sea",
    note:"Unlocked via GTS trade (send or receive a Pokémon from another country).",
    pokemon:[
      {name:"Chinchou",   method:"Pokéwalker", levels:"12", rate:"100%"},
      {name:"Remoraid",   method:"Pokéwalker", levels:"14", rate:"100%"},
      {name:"Horsea",     method:"Pokéwalker", levels:"15", rate:"55%",  note:"≥3000W"},
      {name:"Corsola",    method:"Pokéwalker", levels:"16", rate:"55%",  note:"≥2500W"},
      {name:"Staryu",     method:"Pokéwalker", levels:"18", rate:"20%",  note:"≥5000W · holds Water Stone"},
      {name:"Octillery",  method:"Pokéwalker", levels:"19", rate:"5%",   note:"≥5000W · holds Focus Band"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-night-skys-edge", name:"Night Sky's Edge",
    note:"Unlocked by transferring Jirachi via the Pokémon Colosseum Bonus Disc.",
    pokemon:[
      {name:"Geodude",    method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Onix",       method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Hoothoot",   method:"Pokéwalker", levels:"6",  rate:"75%",  note:"≥2500W"},
      {name:"Zubat",      method:"Pokéwalker", levels:"9",  rate:"75%",  note:"≥2500W"},
      {name:"Clefairy",   method:"Pokéwalker", levels:"8",  rate:"55%",  note:"≥5000W"},
      {name:"Jigglypuff", method:"Pokéwalker", levels:"10", rate:"55%",  note:"≥5000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-yellow-forest", name:"Yellow Forest",
    note:"Wi-Fi Event course. All encounters are Pikachu — each holds a different Berry.",
    pokemon:[
      {name:"Pikachu",    method:"Pokéwalker", levels:"10", rate:"100%", note:"♂ · holds TinyMushroom"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"10", rate:"100%", note:"♀ · holds Oran Berry"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"13", rate:"35%",  note:"♂ · ≥2000W · holds Leppa Berry"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"12", rate:"8%",   note:"♀ · ≥5000W · holds Sitrus Berry"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"15", rate:"2%",   note:"♂ · ≥10000W · holds Shuca Berry"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"14", rate:"3%",   note:"♀ · ≥9500W · holds Lum Berry"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-rally", name:"Rally",
    note:"Wi-Fi Event course.",
    pokemon:[
      {name:"Pachirisu",  method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Buneary",    method:"Pokéwalker", levels:"5",  rate:"100%"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"10", rate:"55%",  note:"≥500W"},
      {name:"Croagunk",   method:"Pokéwalker", levels:"10", rate:"55%",  note:"≥500W"},
      {name:"Sableye",    method:"Pokéwalker", levels:"15", rate:"25%",  note:"≥1000W"},
      {name:"Chatot",     method:"Pokéwalker", levels:"15", rate:"25%",  note:"≥1000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-sightseeing", name:"Sightseeing",
    note:"Wi-Fi Event course.",
    pokemon:[
      {name:"Meowth",     method:"Pokéwalker", levels:"10", rate:"100%"},
      {name:"Pikachu",    method:"Pokéwalker", levels:"8",  rate:"100%"},
      {name:"Poliwhirl",  method:"Pokéwalker", levels:"15", rate:"35%",  note:"≥500W"},
      {name:"Pelipper",   method:"Pokéwalker", levels:"15", rate:"35%",  note:"≥3000W"},
      {name:"Eevee",      method:"Pokéwalker", levels:"10", rate:"10%",  note:"≥7000W"},
      {name:"Torchic",    method:"Pokéwalker", levels:"10", rate:"1%",   note:"≥10000W"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-winners-path", name:"Winner's Path",
    note:"Wi-Fi Event course. Pokémon all hold special items.",
    pokemon:[
      {name:"Magikarp",   method:"Pokéwalker", levels:"5",  rate:"100%", note:"holds Wacan Berry"},
      {name:"Bronzor",    method:"Pokéwalker", levels:"5",  rate:"100%", note:"holds Occa Berry"},
      {name:"Horsea",     method:"Pokéwalker", levels:"5",  rate:"55%",  note:"≥3000W · holds Dragon Scale"},
      {name:"Duskull",    method:"Pokéwalker", levels:"5",  rate:"55%",  note:"≥3000W · holds Reaper Cloth"},
      {name:"Beldum",     method:"Pokéwalker", levels:"5",  rate:"20%",  note:"≥8000W · holds Shuca Berry"},
      {name:"Munchlax",   method:"Pokéwalker", levels:"5",  rate:"5%",   note:"≥8000W · holds Leftovers"},
    ],
    items:[], trainers:[] },

  { part:"Pokéwalker", id:"pw-amity-meadow", name:"Amity Meadow",
    note:"Wi-Fi Event course. All Pokémon hold Berries.",
    pokemon:[
      {name:"Cleffa",     method:"Pokéwalker", levels:"5",  rate:"100%", note:"holds Qualot Berry"},
      {name:"Igglybuff",  method:"Pokéwalker", levels:"5",  rate:"100%", note:"holds Grepa Berry"},
      {name:"Smoochum",   method:"Pokéwalker", levels:"5",  rate:"55%",  note:"≥2000W · holds Hondew Berry"},
      {name:"Happiny",    method:"Pokéwalker", levels:"5",  rate:"55%",  note:"≥2000W · holds Pomeg Berry"},
      {name:"Elekid",     method:"Pokéwalker", levels:"5",  rate:"20%",  note:"≥5000W · holds Tamato Berry"},
      {name:"Magby",      method:"Pokéwalker", levels:"5",  rate:"20%",  note:"≥5000W · holds Kelpsy Berry"},
    ],
    items:[], trainers:[] },
];

// ─── BUILD LOCATION MAP ── (which areas each Pokémon appears in)
// Computed once at module level since AREAS is static
const _allPokemon = a => a.floors ? a.floors.flatMap(f => f.pokemon || []) : (a.pokemon || []);
const LOCATION_MAP = {};
for (const area of AREAS) {
  for (const p of _allPokemon(area)) {
    if (!LOCATION_MAP[p.name]) LOCATION_MAP[p.name] = [];
    LOCATION_MAP[p.name].push({ areaId: area.id, areaName: area.name, part: area.part, method: p.method, levels: p.levels, rate: p.rate, hgOnly: !!p.hgOnly, ssOnly: !!p.ssOnly });
  }
}

// Pokémon whose only wild-encounter source in HGSS is the Pokéwalker.
const WALKER_ONLY_POKEMON = new Set(
  Object.entries(LOCATION_MAP)
    .filter(([, locs]) => locs.length > 0 && locs.every(l => l.part === "Pokéwalker"))
    .map(([name]) => name)
);

// ─── OBTAIN METHOD SETS ──────────────────────────────────────────────────────
// Pokémon not found as wild encounters or gifts — must evolve or trade-evolve.
const EVO_ONLY_SET = new Set([
  "Ivysaur","Venusaur","Charmeleon","Charizard","Wartortle","Blastoise",
  "Butterfree","Beedrill","Pidgeot","Raichu","Nidoqueen","Nidoking",
  "Clefable","Ninetales","Wigglytuff","Vileplume","Arcanine","Poliwrath",
  "Victreebel","Dodrio","Cloyster","Exeggutor","Rhydon","Starmie",
  "Vaporeon","Jolteon","Flareon","Omastar","Kabutops","Dragonite","Mew",
]);
const TRADE_EVO_SET = new Set(["Alakazam","Machamp","Golem","Gengar"]);

// ─── BEST ENCOUNTER AREA MAP ─────────────────────────────────────────────────
// For each Pokémon × version, the single area with the highest encounter rate.
// Used in PokemonEntry to flag when a better hunting spot exists elsewhere.
function _locPct(loc, ver) {
  if (!loc.rate) return null;
  const mHG = loc.rate.match(/^HG\s+(\S+)\/SS\s+(\S+)/);
  if (mHG) return parseRatePct(ver === "hg" ? mHG[1] : mHG[2]);
  const m = loc.rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
  if (m) return parseRatePct(ver === "hg" ? m[1] : m[2]);
  return parseRatePct(loc.rate);
}
const BEST_AREA_MAP = { hg:{}, ss:{} };
for (const [name, locs] of Object.entries(LOCATION_MAP)) {
  for (const ver of ["hg","ss"]) {
    let best = null;
    for (const loc of locs) {
      if (ver === "hg" && loc.ssOnly) continue;
      if (ver === "ss" && loc.hgOnly) continue;
      const pct = _locPct(loc, ver);
      if (pct && (!best || pct > best.pct)) best = { pct, areaName: loc.areaName };
    }
    if (best) BEST_AREA_MAP[ver][name] = best;
  }
}

// ─── EVOLUTION CHAINS ─────────────────────────────────────────────────────────
// Each entry is either a linear array ["Stage1","Stage2",...] or a branch object
// { pre:["Base"], post:[["Branch1"],["Branch2"],...] } for Eevee-style splits.
// EVO_MAP maps every Pokémon name → its chain entry for O(1) lookup in DexDetail.
const _EVO_CHAINS_RAW = [
  // No evolution (standalone)
  ["Farfetch'd"],["Onix"],["Hitmonlee"],["Hitmonchan"],["Lickitung"],["Chansey"],
  ["Tangela"],["Kangaskhan"],["Mr. Mime"],["Scyther"],["Jynx"],["Electabuzz"],
  ["Magmar"],["Pinsir"],["Tauros"],["Lapras"],["Ditto"],["Porygon"],
  ["Aerodactyl"],["Snorlax"],["Articuno"],["Zapdos"],["Moltres"],["Mewtwo"],["Mew"],
  // Two-stage
  ["Rattata","Raticate"],
  ["Spearow","Fearow"],
  ["Ekans","Arbok"],
  ["Pikachu","Raichu"],
  ["Sandshrew","Sandslash"],
  ["Clefairy","Clefable"],
  ["Vulpix","Ninetales"],
  ["Jigglypuff","Wigglytuff"],
  ["Zubat","Golbat"],
  ["Paras","Parasect"],
  ["Venonat","Venomoth"],
  ["Diglett","Dugtrio"],
  ["Meowth","Persian"],
  ["Psyduck","Golduck"],
  ["Mankey","Primeape"],
  ["Growlithe","Arcanine"],
  ["Ponyta","Rapidash"],
  ["Slowpoke","Slowbro"],
  ["Magnemite","Magneton"],
  ["Doduo","Dodrio"],
  ["Seel","Dewgong"],
  ["Grimer","Muk"],
  ["Shellder","Cloyster"],
  ["Drowzee","Hypno"],
  ["Krabby","Kingler"],
  ["Voltorb","Electrode"],
  ["Exeggcute","Exeggutor"],
  ["Cubone","Marowak"],
  ["Koffing","Weezing"],
  ["Rhyhorn","Rhydon"],
  ["Horsea","Seadra"],
  ["Goldeen","Seaking"],
  ["Staryu","Starmie"],
  ["Magikarp","Gyarados"],
  ["Omanyte","Omastar"],
  ["Kabuto","Kabutops"],
  ["Dratini","Dragonair","Dragonite"],
  // Three-stage
  ["Bulbasaur","Ivysaur","Venusaur"],
  ["Charmander","Charmeleon","Charizard"],
  ["Squirtle","Wartortle","Blastoise"],
  ["Caterpie","Metapod","Butterfree"],
  ["Weedle","Kakuna","Beedrill"],
  ["Pidgey","Pidgeotto","Pidgeot"],
  ["Nidoran♀","Nidorina","Nidoqueen"],
  ["Nidoran♂","Nidorino","Nidoking"],
  ["Oddish","Gloom","Vileplume"],
  ["Poliwag","Poliwhirl","Poliwrath"],
  ["Abra","Kadabra","Alakazam"],
  ["Machop","Machoke","Machamp"],
  ["Bellsprout","Weepinbell","Victreebel"],
  ["Tentacool","Tentacruel"],
  ["Geodude","Graveler","Golem"],
  ["Gastly","Haunter","Gengar"],
  // Branching
  { pre:["Eevee"], post:[["Vaporeon"],["Jolteon"],["Flareon"],["Espeon"],["Umbreon"]] },
];
const EVO_MAP = {};
for (const chain of _EVO_CHAINS_RAW) {
  if (Array.isArray(chain)) {
    for (const name of chain) EVO_MAP[name] = chain;
  } else {
    for (const name of chain.pre) EVO_MAP[name] = chain;
    for (const branch of chain.post) for (const name of branch) EVO_MAP[name] = chain;
  }
}

// Flat list of every evolution step with method and group for the Evo Planner tab.
const EVO_METHODS = [
  // TODO: Add Johto evolution chains in Phase 2
];
// ─── LEARNSETS ────────────────────────────────────────────────────────────────
// Complete HGSS (Gen IV) level-up learnsets for all Johto regional Dex Pokémon.
// Used by getDreamMoves to fill battle slots. All level-up moves included.
const LEARNSETS = {
  // ── Johto + Kanto encounter Pokémon (65 groups) ──────────────────────────────
  // ── Chikorita line ──────────────────────────────────────────────
  "Chikorita": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Razor Leaf",lv:6},{move:"PoisonPowder",lv:9},
    {move:"Synthesis",lv:12},{move:"Reflect",lv:17},{move:"Magical Leaf",lv:20},{move:"Natural Gift",lv:23},
    {move:"Sweet Scent",lv:28},{move:"Light Screen",lv:31},{move:"Body Slam",lv:34},{move:"Safeguard",lv:39},
    {move:"Aromatherapy",lv:42},{move:"SolarBeam",lv:45},
  ],
  "Bayleef": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Razor Leaf",lv:1},{move:"PoisonPowder",lv:1},
    {move:"Razor Leaf",lv:6},{move:"PoisonPowder",lv:9},{move:"Synthesis",lv:12},{move:"Reflect",lv:18},
    {move:"Magical Leaf",lv:22},{move:"Natural Gift",lv:26},{move:"Sweet Scent",lv:32},{move:"Light Screen",lv:36},
    {move:"Body Slam",lv:40},{move:"Safeguard",lv:46},{move:"Aromatherapy",lv:50},{move:"SolarBeam",lv:54},
  ],
  "Meganium": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Razor Leaf",lv:1},{move:"PoisonPowder",lv:1},
    {move:"Razor Leaf",lv:6},{move:"PoisonPowder",lv:9},{move:"Synthesis",lv:12},{move:"Reflect",lv:18},
    {move:"Magical Leaf",lv:22},{move:"Natural Gift",lv:26},{move:"Petal Dance",lv:32},{move:"Sweet Scent",lv:34},
    {move:"Light Screen",lv:40},{move:"Body Slam",lv:46},{move:"Safeguard",lv:54},{move:"Aromatherapy",lv:60},
    {move:"SolarBeam",lv:66},
  ],
  // ── Cyndaquil line ──────────────────────────────────────────────
  "Cyndaquil": [
    {move:"Tackle",lv:1},{move:"Leer",lv:1},{move:"SmokeScreen",lv:6},{move:"Ember",lv:10},
    {move:"Quick Attack",lv:13},{move:"Flame Wheel",lv:19},{move:"Defense Curl",lv:22},{move:"Swift",lv:28},
    {move:"Lava Plume",lv:31},{move:"Flamethrower",lv:37},{move:"Rollout",lv:40},{move:"Double-Edge",lv:46},
    {move:"Eruption",lv:49},
  ],
  "Quilava": [
    {move:"Tackle",lv:1},{move:"Leer",lv:1},{move:"SmokeScreen",lv:1},{move:"SmokeScreen",lv:6},
    {move:"Ember",lv:10},{move:"Quick Attack",lv:13},{move:"Flame Wheel",lv:20},{move:"Defense Curl",lv:24},
    {move:"Swift",lv:31},{move:"Lava Plume",lv:35},{move:"Flamethrower",lv:42},{move:"Rollout",lv:46},
    {move:"Double-Edge",lv:53},{move:"Eruption",lv:57},
  ],
  "Typhlosion": [
    {move:"Gyro Ball",lv:1},{move:"Tackle",lv:1},{move:"Leer",lv:1},{move:"SmokeScreen",lv:1},
    {move:"Ember",lv:1},{move:"SmokeScreen",lv:6},{move:"Ember",lv:10},{move:"Quick Attack",lv:13},
    {move:"Flame Wheel",lv:20},{move:"Defense Curl",lv:24},{move:"Swift",lv:31},{move:"Lava Plume",lv:35},
    {move:"Flamethrower",lv:42},{move:"Rollout",lv:46},{move:"Double-Edge",lv:53},{move:"Eruption",lv:57},
  ],
  // ── Totodile line ───────────────────────────────────────────────
  "Totodile": [
    {move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Water Gun",lv:6},{move:"Rage",lv:8},
    {move:"Bite",lv:13},{move:"Scary Face",lv:15},{move:"Ice Fang",lv:20},{move:"Flail",lv:22},
    {move:"Crunch",lv:27},{move:"Slash",lv:29},{move:"Screech",lv:34},{move:"Thrash",lv:36},
    {move:"Aqua Tail",lv:41},{move:"Superpower",lv:43},{move:"Hydro Pump",lv:48},
  ],
  "Croconaw": [
    {move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Water Gun",lv:1},{move:"Water Gun",lv:6},
    {move:"Rage",lv:8},{move:"Bite",lv:13},{move:"Scary Face",lv:15},{move:"Ice Fang",lv:21},
    {move:"Flail",lv:24},{move:"Crunch",lv:30},{move:"Slash",lv:33},{move:"Screech",lv:39},
    {move:"Thrash",lv:42},{move:"Aqua Tail",lv:48},{move:"Superpower",lv:51},{move:"Hydro Pump",lv:57},
  ],
  "Feraligatr": [
    {move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Water Gun",lv:1},{move:"Rage",lv:1},
    {move:"Water Gun",lv:6},{move:"Rage",lv:8},{move:"Bite",lv:13},{move:"Scary Face",lv:15},
    {move:"Ice Fang",lv:21},{move:"Flail",lv:24},{move:"Agility",lv:30},{move:"Crunch",lv:32},
    {move:"Slash",lv:37},{move:"Screech",lv:45},{move:"Thrash",lv:50},{move:"Aqua Tail",lv:58},
    {move:"Superpower",lv:63},{move:"Hydro Pump",lv:71},
  ],
  // ── Pidgey line ─────────────────────────────────────────────────
  "Pidgey": [
    {move:"Tackle",lv:1},{move:"Sand-Attack",lv:5},{move:"Gust",lv:9},{move:"Quick Attack",lv:13},
    {move:"Whirlwind",lv:17},{move:"Twister",lv:21},{move:"FeatherDance",lv:25},{move:"Agility",lv:29},
    {move:"Wing Attack",lv:33},{move:"Roost",lv:37},{move:"Tailwind",lv:41},{move:"Mirror Move",lv:45},
    {move:"Air Slash",lv:49},
  ],
  "Pidgeotto": [
    {move:"Tackle",lv:1},{move:"Sand-Attack",lv:1},{move:"Gust",lv:1},{move:"Sand-Attack",lv:5},
    {move:"Gust",lv:9},{move:"Quick Attack",lv:13},{move:"Whirlwind",lv:17},{move:"Twister",lv:22},
    {move:"FeatherDance",lv:27},{move:"Agility",lv:32},{move:"Wing Attack",lv:37},{move:"Roost",lv:42},
    {move:"Tailwind",lv:47},{move:"Mirror Move",lv:52},{move:"Air Slash",lv:57},
  ],
  "Pidgeot": [
    {move:"Tackle",lv:1},{move:"Sand-Attack",lv:1},{move:"Gust",lv:1},{move:"Quick Attack",lv:1},
    {move:"Sand-Attack",lv:5},{move:"Gust",lv:9},{move:"Quick Attack",lv:13},{move:"Whirlwind",lv:17},
    {move:"Twister",lv:22},{move:"FeatherDance",lv:27},{move:"Agility",lv:32},{move:"Wing Attack",lv:38},
    {move:"Roost",lv:44},{move:"Tailwind",lv:50},{move:"Mirror Move",lv:56},{move:"Air Slash",lv:62},
  ],
  // ── Spearow line ────────────────────────────────────────────────
  "Spearow": [
    {move:"Peck",lv:1},{move:"Growl",lv:1},{move:"Leer",lv:5},{move:"Fury Attack",lv:9},
    {move:"Pursuit",lv:13},{move:"Aerial Ace",lv:17},{move:"Mirror Move",lv:21},{move:"Agility",lv:25},
    {move:"Assurance",lv:29},{move:"Roost",lv:33},{move:"Drill Peck",lv:37},
  ],
  "Fearow": [
    {move:"Pluck",lv:1},{move:"Peck",lv:1},{move:"Growl",lv:1},{move:"Leer",lv:1},
    {move:"Fury Attack",lv:1},{move:"Leer",lv:5},{move:"Fury Attack",lv:9},{move:"Pursuit",lv:13},
    {move:"Aerial Ace",lv:17},{move:"Mirror Move",lv:23},{move:"Agility",lv:29},{move:"Assurance",lv:35},
    {move:"Roost",lv:41},{move:"Drill Peck",lv:47},
  ],
  // ── Hoothoot line ───────────────────────────────────────────────
  "Hoothoot": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Foresight",lv:1},{move:"Hypnosis",lv:5},
    {move:"Peck",lv:9},{move:"Uproar",lv:13},{move:"Reflect",lv:17},{move:"Confusion",lv:21},
    {move:"Take Down",lv:25},{move:"Air Slash",lv:29},{move:"Zen Headbutt",lv:33},{move:"Extrasensory",lv:37},
    {move:"Psycho Shift",lv:41},{move:"Roost",lv:45},{move:"Dream Eater",lv:49},
  ],
  "Noctowl": [
    {move:"Sky Attack",lv:1},{move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Foresight",lv:1},
    {move:"Hypnosis",lv:1},{move:"Hypnosis",lv:5},{move:"Peck",lv:9},{move:"Uproar",lv:13},
    {move:"Reflect",lv:17},{move:"Confusion",lv:22},{move:"Take Down",lv:27},{move:"Air Slash",lv:32},
    {move:"Zen Headbutt",lv:37},{move:"Extrasensory",lv:42},{move:"Psycho Shift",lv:47},{move:"Roost",lv:52},
    {move:"Dream Eater",lv:57},
  ],
  // ── Rattata line ────────────────────────────────────────────────
  "Rattata": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Quick Attack",lv:4},{move:"Focus Energy",lv:7},
    {move:"Bite",lv:10},{move:"Pursuit",lv:13},{move:"Hyper Fang",lv:16},{move:"Sucker Punch",lv:19},
    {move:"Crunch",lv:22},{move:"Assurance",lv:25},{move:"Super Fang",lv:28},{move:"Double-Edge",lv:31},
    {move:"Endeavor",lv:34},
  ],
  "Raticate": [
    {move:"Swords Dance",lv:1},{move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Quick Attack",lv:1},
    {move:"Focus Energy",lv:1},{move:"Quick Attack",lv:4},{move:"Focus Energy",lv:7},{move:"Bite",lv:10},
    {move:"Pursuit",lv:13},{move:"Hyper Fang",lv:16},{move:"Sucker Punch",lv:19},{move:"Scary Face",lv:20},
    {move:"Crunch",lv:24},{move:"Assurance",lv:29},{move:"Super Fang",lv:34},{move:"Double-Edge",lv:39},
    {move:"Endeavor",lv:44},
  ],
  // ── Sentret line ────────────────────────────────────────────────
  "Sentret": [
    {move:"Scratch",lv:1},{move:"Foresight",lv:1},{move:"Defense Curl",lv:4},{move:"Quick Attack",lv:7},
    {move:"Fury Swipes",lv:13},{move:"Helping Hand",lv:16},{move:"Follow Me",lv:19},{move:"Slam",lv:25},
    {move:"Rest",lv:28},{move:"Sucker Punch",lv:31},{move:"Amnesia",lv:36},{move:"Baton Pass",lv:39},
    {move:"Me First",lv:42},{move:"Hyper Voice",lv:47},
  ],
  "Furret": [
    {move:"Scratch",lv:1},{move:"Foresight",lv:1},{move:"Defense Curl",lv:1},{move:"Quick Attack",lv:1},
    {move:"Defense Curl",lv:4},{move:"Quick Attack",lv:7},{move:"Fury Swipes",lv:13},{move:"Helping Hand",lv:17},
    {move:"Follow Me",lv:21},{move:"Slam",lv:28},{move:"Rest",lv:32},{move:"Sucker Punch",lv:36},
    {move:"Amnesia",lv:42},{move:"Baton Pass",lv:46},{move:"Me First",lv:50},{move:"Hyper Voice",lv:56},
  ],
  // ── Pichu line ──────────────────────────────────────────────────
  "Pichu": [
    {move:"ThunderShock",lv:1},{move:"Charm",lv:1},{move:"Tail Whip",lv:5},{move:"Thunder Wave",lv:10},
    {move:"Sweet Kiss",lv:13},{move:"Nasty Plot",lv:18},
  ],
  "Pikachu": [
    {move:"ThunderShock",lv:1},{move:"Growl",lv:1},{move:"Tail Whip",lv:5},{move:"Thunder Wave",lv:10},
    {move:"Quick Attack",lv:13},{move:"Double Team",lv:18},{move:"Slam",lv:21},{move:"Thunderbolt",lv:26},
    {move:"Feint",lv:29},{move:"Agility",lv:34},{move:"Discharge",lv:37},{move:"Light Screen",lv:42},
    {move:"Thunder",lv:45},
  ],
  "Raichu": [ {move:"ThunderShock",lv:1},{move:"Tail Whip",lv:1},{move:"Quick Attack",lv:1},{move:"Thunderbolt",lv:1} ],
  // ── Bug lines ───────────────────────────────────────────────────
  "Caterpie": [ {move:"Tackle",lv:1},{move:"String Shot",lv:1},{move:"Bug Bite",lv:15} ],
  "Metapod": [ {move:"Harden",lv:1},{move:"Harden",lv:7} ],
  "Butterfree": [
    {move:"Confusion",lv:1},{move:"Confusion",lv:10},{move:"PoisonPowder",lv:12},{move:"Stun Spore",lv:12},
    {move:"Sleep Powder",lv:12},{move:"Gust",lv:16},{move:"Supersonic",lv:18},{move:"Whirlwind",lv:22},
    {move:"Psybeam",lv:24},{move:"Silver Wind",lv:28},{move:"Tailwind",lv:30},{move:"Safeguard",lv:34},
    {move:"Captivate",lv:36},{move:"Bug Buzz",lv:40},
  ],
  "Weedle": [ {move:"Poison Sting",lv:1},{move:"String Shot",lv:1},{move:"Bug Bite",lv:15} ],
  "Kakuna": [ {move:"Harden",lv:1},{move:"Harden",lv:7} ],
  "Beedrill": [
    {move:"Fury Attack",lv:1},{move:"Fury Attack",lv:10},{move:"Focus Energy",lv:13},{move:"Twineedle",lv:16},
    {move:"Rage",lv:19},{move:"Pursuit",lv:22},{move:"Toxic Spikes",lv:25},{move:"Pin Missile",lv:28},
    {move:"Agility",lv:31},{move:"Assurance",lv:34},{move:"Poison Jab",lv:37},{move:"Endeavor",lv:40},
  ],
  // ── Ledyba line ─────────────────────────────────────────────────
  "Ledyba": [
    {move:"Tackle",lv:1},{move:"Supersonic",lv:6},{move:"Comet Punch",lv:9},{move:"Light Screen",lv:14},
    {move:"Reflect",lv:14},{move:"Safeguard",lv:14},{move:"Mach Punch",lv:17},{move:"Baton Pass",lv:22},
    {move:"Silver Wind",lv:25},{move:"Agility",lv:30},{move:"Swift",lv:33},{move:"Double-Edge",lv:38},
    {move:"Bug Buzz",lv:41},
  ],
  "Ledian": [
    {move:"Tackle",lv:1},{move:"Supersonic",lv:1},{move:"Comet Punch",lv:1},{move:"Supersonic",lv:6},
    {move:"Comet Punch",lv:9},{move:"Light Screen",lv:14},{move:"Reflect",lv:14},{move:"Safeguard",lv:14},
    {move:"Mach Punch",lv:17},{move:"Baton Pass",lv:24},{move:"Silver Wind",lv:29},{move:"Agility",lv:36},
    {move:"Swift",lv:41},{move:"Double-Edge",lv:48},{move:"Bug Buzz",lv:53},
  ],
  // ── Spinarak line ───────────────────────────────────────────────
  "Spinarak": [
    {move:"Poison Sting",lv:1},{move:"String Shot",lv:1},{move:"Scary Face",lv:5},{move:"Constrict",lv:8},
    {move:"Leech Life",lv:12},{move:"Night Shade",lv:15},{move:"Shadow Sneak",lv:19},{move:"Fury Swipes",lv:22},
    {move:"Sucker Punch",lv:26},{move:"Spider Web",lv:29},{move:"Agility",lv:33},{move:"Pin Missile",lv:36},
    {move:"Psychic",lv:40},{move:"Poison Jab",lv:43},
  ],
  "Ariados": [
    {move:"Bug Bite",lv:1},{move:"Poison Sting",lv:1},{move:"String Shot",lv:1},{move:"Scary Face",lv:1},
    {move:"Constrict",lv:1},{move:"Scary Face",lv:5},{move:"Constrict",lv:8},{move:"Leech Life",lv:12},
    {move:"Night Shade",lv:15},{move:"Shadow Sneak",lv:19},{move:"Fury Swipes",lv:23},{move:"Sucker Punch",lv:28},
    {move:"Spider Web",lv:32},{move:"Agility",lv:37},{move:"Pin Missile",lv:41},{move:"Psychic",lv:46},
    {move:"Poison Jab",lv:50},
  ],
  // ── Geodude line ────────────────────────────────────────────────
  "Geodude": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:1},{move:"Mud Sport",lv:4},{move:"Rock Polish",lv:8},
    {move:"Rock Throw",lv:11},{move:"Magnitude",lv:15},{move:"Selfdestruct",lv:18},{move:"Rollout",lv:22},
    {move:"Rock Blast",lv:25},{move:"Earthquake",lv:29},{move:"Explosion",lv:32},{move:"Double-Edge",lv:36},
    {move:"Stone Edge",lv:39},
  ],
  "Graveler": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:1},{move:"Mud Sport",lv:1},{move:"Rock Polish",lv:1},
    {move:"Mud Sport",lv:4},{move:"Rock Polish",lv:8},{move:"Rock Throw",lv:11},{move:"Magnitude",lv:15},
    {move:"Selfdestruct",lv:18},{move:"Rollout",lv:22},{move:"Rock Blast",lv:27},{move:"Earthquake",lv:33},
    {move:"Explosion",lv:38},{move:"Double-Edge",lv:44},{move:"Stone Edge",lv:49},
  ],
  "Golem": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:1},{move:"Mud Sport",lv:1},{move:"Rock Polish",lv:1},
    {move:"Mud Sport",lv:4},{move:"Rock Polish",lv:8},{move:"Rock Throw",lv:11},{move:"Magnitude",lv:15},
    {move:"Selfdestruct",lv:18},{move:"Rollout",lv:22},{move:"Rock Blast",lv:27},{move:"Earthquake",lv:33},
    {move:"Explosion",lv:38},{move:"Double-Edge",lv:44},{move:"Stone Edge",lv:49},
  ],
  // ── Zubat line ──────────────────────────────────────────────────
  "Zubat": [
    {move:"Leech Life",lv:1},{move:"Supersonic",lv:5},{move:"Astonish",lv:9},{move:"Bite",lv:13},
    {move:"Wing Attack",lv:17},{move:"Confuse Ray",lv:21},{move:"Air Cutter",lv:25},{move:"Mean Look",lv:29},
    {move:"Poison Fang",lv:33},{move:"Haze",lv:37},{move:"Air Slash",lv:41},
  ],
  "Golbat": [
    {move:"Screech",lv:1},{move:"Leech Life",lv:1},{move:"Supersonic",lv:1},{move:"Astonish",lv:1},
    {move:"Supersonic",lv:5},{move:"Astonish",lv:9},{move:"Bite",lv:13},{move:"Wing Attack",lv:17},
    {move:"Confuse Ray",lv:21},{move:"Air Cutter",lv:27},{move:"Mean Look",lv:33},{move:"Poison Fang",lv:39},
    {move:"Haze",lv:45},{move:"Air Slash",lv:51},
  ],
  "Crobat": [
    {move:"Cross Poison",lv:1},{move:"Screech",lv:1},{move:"Leech Life",lv:1},{move:"Supersonic",lv:1},
    {move:"Astonish",lv:1},{move:"Supersonic",lv:5},{move:"Astonish",lv:9},{move:"Bite",lv:13},
    {move:"Wing Attack",lv:17},{move:"Confuse Ray",lv:21},{move:"Air Cutter",lv:27},{move:"Mean Look",lv:33},
    {move:"Poison Fang",lv:39},{move:"Haze",lv:45},{move:"Air Slash",lv:51},
  ],
  // ── Cleffa line ─────────────────────────────────────────────────
  "Cleffa": [
    {move:"Pound",lv:1},{move:"Charm",lv:1},{move:"Encore",lv:4},{move:"Sing",lv:7},
    {move:"Sweet Kiss",lv:10},{move:"Copycat",lv:13},{move:"Magical Leaf",lv:16},
  ],
  "Clefairy": [
    {move:"Pound",lv:1},{move:"Growl",lv:1},{move:"Encore",lv:4},{move:"Sing",lv:7},
    {move:"DoubleSlap",lv:10},{move:"Defense Curl",lv:13},{move:"Follow Me",lv:16},{move:"Minimize",lv:19},
    {move:"Wake-Up Slap",lv:22},{move:"Cosmic Power",lv:25},{move:"Lucky Chant",lv:28},{move:"Metronome",lv:31},
    {move:"Gravity",lv:34},{move:"Moonlight",lv:37},{move:"Light Screen",lv:40},{move:"Meteor Mash",lv:43},
    {move:"Healing Wish",lv:46},
  ],
  "Clefable": [ {move:"Minimize",lv:1},{move:"DoubleSlap",lv:1},{move:"Sing",lv:1},{move:"Metronome",lv:1} ],
  // ── Igglybuff line ──────────────────────────────────────────────
  "Igglybuff": [
    {move:"Sing",lv:1},{move:"Charm",lv:1},{move:"Defense Curl",lv:5},{move:"Pound",lv:9},
    {move:"Sweet Kiss",lv:13},{move:"Copycat",lv:17},
  ],
  "Jigglypuff": [
    {move:"Sing",lv:1},{move:"Defense Curl",lv:5},{move:"Pound",lv:9},{move:"Disable",lv:13},
    {move:"Rollout",lv:17},{move:"DoubleSlap",lv:21},{move:"Rest",lv:25},{move:"Body Slam",lv:29},
    {move:"Gyro Ball",lv:33},{move:"Wake-Up Slap",lv:37},{move:"Mimic",lv:41},{move:"Hyper Voice",lv:45},
    {move:"Double-Edge",lv:49},
  ],
  "Wigglytuff": [ {move:"Sing",lv:1},{move:"Disable",lv:1},{move:"Defense Curl",lv:1},{move:"DoubleSlap",lv:1} ],
  // ── Togepi line ─────────────────────────────────────────────────
  "Togepi": [
    {move:"Growl",lv:1},{move:"Charm",lv:1},{move:"Metronome",lv:6},{move:"Sweet Kiss",lv:10},
    {move:"Yawn",lv:15},{move:"Encore",lv:19},{move:"Follow Me",lv:24},{move:"Wish",lv:28},
    {move:"AncientPower",lv:33},{move:"Safeguard",lv:37},{move:"Baton Pass",lv:42},{move:"Double-Edge",lv:46},
    {move:"Last Resort",lv:51},
  ],
  "Togetic": [
    {move:"Magical Leaf",lv:1},{move:"Growl",lv:1},{move:"Charm",lv:1},{move:"Metronome",lv:1},
    {move:"Sweet Kiss",lv:1},{move:"Metronome",lv:6},{move:"Sweet Kiss",lv:10},{move:"Yawn",lv:15},
    {move:"Encore",lv:19},{move:"Follow Me",lv:24},{move:"Wish",lv:28},{move:"AncientPower",lv:33},
    {move:"Safeguard",lv:37},{move:"Baton Pass",lv:42},{move:"Double-Edge",lv:46},{move:"Last Resort",lv:51},
  ],
  "Togekiss": [ {move:"Sky Attack",lv:1},{move:"ExtremeSpeed",lv:1},{move:"Aura Sphere",lv:1},{move:"Air Slash",lv:1} ],
  // ── Sandshrew line ──────────────────────────────────────────────
  "Sandshrew": [
    {move:"Scratch",lv:1},{move:"Defense Curl",lv:3},{move:"Sand-Attack",lv:7},{move:"Poison Sting",lv:9},
    {move:"Rapid Spin",lv:13},{move:"Swift",lv:15},{move:"Fury Swipes",lv:19},{move:"Rollout",lv:21},
    {move:"Fury Cutter",lv:25},{move:"Sand Tomb",lv:27},{move:"Slash",lv:31},{move:"Gyro Ball",lv:33},
    {move:"Sandstorm",lv:37},
  ],
  "Sandslash": [
    {move:"Scratch",lv:1},{move:"Defense Curl",lv:1},{move:"Sand-Attack",lv:1},{move:"Defense Curl",lv:3},
    {move:"Sand-Attack",lv:7},{move:"Poison Sting",lv:9},{move:"Rapid Spin",lv:13},{move:"Swift",lv:15},
    {move:"Fury Swipes",lv:19},{move:"Rollout",lv:21},{move:"Crush Claw",lv:22},{move:"Fury Cutter",lv:28},
    {move:"Sand Tomb",lv:33},{move:"Slash",lv:40},{move:"Gyro Ball",lv:45},{move:"Sandstorm",lv:52},
  ],
  // ── Ekans line ──────────────────────────────────────────────────
  "Ekans": [
    {move:"Wrap",lv:1},{move:"Leer",lv:1},{move:"Poison Sting",lv:4},{move:"Bite",lv:9},
    {move:"Glare",lv:12},{move:"Screech",lv:17},{move:"Acid",lv:20},{move:"Stockpile",lv:25},
    {move:"Swallow",lv:25},{move:"Spit Up",lv:25},{move:"Mud Bomb",lv:28},{move:"Gastro Acid",lv:33},
    {move:"Haze",lv:36},{move:"Gunk Shot",lv:41},
  ],
  "Arbok": [
    {move:"Ice Fang",lv:1},{move:"Thunder Fang",lv:1},{move:"Fire Fang",lv:1},{move:"Wrap",lv:1},
    {move:"Leer",lv:1},{move:"Poison Sting",lv:1},{move:"Bite",lv:1},{move:"Poison Sting",lv:4},
    {move:"Bite",lv:9},{move:"Glare",lv:12},{move:"Screech",lv:17},{move:"Acid",lv:20},
    {move:"Crunch",lv:22},{move:"Stockpile",lv:28},{move:"Swallow",lv:28},{move:"Spit Up",lv:28},
    {move:"Mud Bomb",lv:34},{move:"Gastro Acid",lv:42},{move:"Haze",lv:48},{move:"Gunk Shot",lv:56},
  ],
  // ── Dunsparce ───────────────────────────────────────────────────
  "Dunsparce": [
    {move:"Rage",lv:1},{move:"Defense Curl",lv:5},{move:"Yawn",lv:9},{move:"Glare",lv:13},
    {move:"Rollout",lv:17},{move:"Spite",lv:21},{move:"Pursuit",lv:25},{move:"Screech",lv:29},
    {move:"Roost",lv:33},{move:"Take Down",lv:37},{move:"AncientPower",lv:41},{move:"Dig",lv:45},
    {move:"Endeavor",lv:49},{move:"Flail",lv:53},
  ],
  // ── Mareep line ─────────────────────────────────────────────────
  "Mareep": [
    {move:"Tackle",lv:1},{move:"Growl",lv:5},{move:"ThunderShock",lv:10},{move:"Thunder Wave",lv:14},
    {move:"Cotton Spore",lv:19},{move:"Charge",lv:23},{move:"Discharge",lv:28},{move:"Signal Beam",lv:32},
    {move:"Light Screen",lv:37},{move:"Power Gem",lv:41},{move:"Thunder",lv:46},
  ],
  "Flaaffy": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"ThunderShock",lv:1},{move:"Growl",lv:5},
    {move:"ThunderShock",lv:10},{move:"Thunder Wave",lv:14},{move:"Cotton Spore",lv:20},{move:"Charge",lv:25},
    {move:"Discharge",lv:31},{move:"Signal Beam",lv:36},{move:"Light Screen",lv:42},{move:"Power Gem",lv:47},
    {move:"Thunder",lv:53},
  ],
  "Ampharos": [
    {move:"Fire Punch",lv:1},{move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"ThunderShock",lv:1},
    {move:"Thunder Wave",lv:1},{move:"Growl",lv:5},{move:"ThunderShock",lv:10},{move:"Thunder Wave",lv:14},
    {move:"Cotton Spore",lv:20},{move:"Charge",lv:25},{move:"ThunderPunch",lv:30},{move:"Discharge",lv:34},
    {move:"Signal Beam",lv:42},{move:"Light Screen",lv:51},{move:"Power Gem",lv:59},{move:"Thunder",lv:68},
  ],
  // ── Wooper line ─────────────────────────────────────────────────
  "Wooper": [
    {move:"Water Gun",lv:1},{move:"Tail Whip",lv:1},{move:"Mud Sport",lv:5},{move:"Mud Shot",lv:9},
    {move:"Slam",lv:15},{move:"Mud Bomb",lv:19},{move:"Amnesia",lv:23},{move:"Yawn",lv:29},
    {move:"Earthquake",lv:33},{move:"Rain Dance",lv:37},{move:"Mist",lv:43},{move:"Haze",lv:43},
    {move:"Muddy Water",lv:47},
  ],
  "Quagsire": [
    {move:"Water Gun",lv:1},{move:"Tail Whip",lv:1},{move:"Mud Sport",lv:1},{move:"Mud Sport",lv:5},
    {move:"Mud Shot",lv:9},{move:"Slam",lv:15},{move:"Mud Bomb",lv:19},{move:"Amnesia",lv:24},
    {move:"Yawn",lv:31},{move:"Earthquake",lv:36},{move:"Rain Dance",lv:41},{move:"Mist",lv:48},
    {move:"Haze",lv:48},{move:"Muddy Water",lv:53},
  ],
  // ── Gastly line ─────────────────────────────────────────────────
  "Gastly": [
    {move:"Hypnosis",lv:1},{move:"Lick",lv:1},{move:"Spite",lv:5},{move:"Mean Look",lv:8},
    {move:"Curse",lv:12},{move:"Night Shade",lv:15},{move:"Confuse Ray",lv:19},{move:"Sucker Punch",lv:22},
    {move:"Payback",lv:26},{move:"Shadow Ball",lv:29},{move:"Dream Eater",lv:33},{move:"Dark Pulse",lv:36},
    {move:"Destiny Bond",lv:40},{move:"Nightmare",lv:43},
  ],
  "Haunter": [
    {move:"Hypnosis",lv:1},{move:"Lick",lv:1},{move:"Spite",lv:1},{move:"Spite",lv:5},
    {move:"Mean Look",lv:8},{move:"Curse",lv:12},{move:"Night Shade",lv:15},{move:"Confuse Ray",lv:19},
    {move:"Sucker Punch",lv:22},{move:"Shadow Punch",lv:25},{move:"Payback",lv:28},{move:"Shadow Ball",lv:33},
    {move:"Dream Eater",lv:39},{move:"Dark Pulse",lv:44},{move:"Destiny Bond",lv:50},{move:"Nightmare",lv:55},
  ],
  "Gengar": [
    {move:"Hypnosis",lv:1},{move:"Lick",lv:1},{move:"Spite",lv:1},{move:"Spite",lv:5},
    {move:"Mean Look",lv:8},{move:"Curse",lv:12},{move:"Night Shade",lv:15},{move:"Confuse Ray",lv:19},
    {move:"Sucker Punch",lv:22},{move:"Shadow Punch",lv:25},{move:"Payback",lv:28},{move:"Shadow Ball",lv:33},
    {move:"Dream Eater",lv:39},{move:"Dark Pulse",lv:44},{move:"Destiny Bond",lv:50},{move:"Nightmare",lv:55},
  ],
  // ── Unown ───────────────────────────────────────────────────────
  "Unown": [ {move:"Hidden Power",lv:1} ],
  // ── Onix line ───────────────────────────────────────────────────
  "Onix": [
    {move:"Mud Sport",lv:1},{move:"Tackle",lv:1},{move:"Harden",lv:1},{move:"Bind",lv:1},
    {move:"Screech",lv:6},{move:"Rock Throw",lv:9},{move:"Rage",lv:14},{move:"Rock Tomb",lv:17},
    {move:"Sandstorm",lv:22},{move:"Slam",lv:25},{move:"Rock Polish",lv:30},{move:"DragonBreath",lv:33},
    {move:"Curse",lv:38},{move:"Iron Tail",lv:41},{move:"Sand Tomb",lv:46},{move:"Double-Edge",lv:49},
    {move:"Stone Edge",lv:54},
  ],
  "Steelix": [
    {move:"Fire Fang",lv:1},{move:"Ice Fang",lv:1},{move:"Thunder Fang",lv:1},{move:"Mud Sport",lv:1},
    {move:"Tackle",lv:1},{move:"Harden",lv:1},{move:"Bind",lv:1},{move:"Screech",lv:6},
    {move:"Rock Throw",lv:9},{move:"Rage",lv:14},{move:"Rock Tomb",lv:17},{move:"Sandstorm",lv:22},
    {move:"Slam",lv:25},{move:"Rock Polish",lv:30},{move:"DragonBreath",lv:33},{move:"Curse",lv:38},
    {move:"Iron Tail",lv:41},{move:"Crunch",lv:46},{move:"Double-Edge",lv:49},{move:"Stone Edge",lv:54},
  ],
  // ── Bellsprout line ─────────────────────────────────────────────
  "Bellsprout": [
    {move:"Vine Whip",lv:1},{move:"Growth",lv:7},{move:"Wrap",lv:11},{move:"Sleep Powder",lv:13},
    {move:"PoisonPowder",lv:15},{move:"Stun Spore",lv:17},{move:"Acid",lv:23},{move:"Knock Off",lv:27},
    {move:"Sweet Scent",lv:29},{move:"Gastro Acid",lv:35},{move:"Razor Leaf",lv:39},{move:"Slam",lv:41},
    {move:"Wring Out",lv:47},
  ],
  "Weepinbell": [
    {move:"Vine Whip",lv:1},{move:"Growth",lv:1},{move:"Wrap",lv:1},{move:"Growth",lv:7},
    {move:"Wrap",lv:11},{move:"Sleep Powder",lv:13},{move:"PoisonPowder",lv:15},{move:"Stun Spore",lv:17},
    {move:"Acid",lv:23},{move:"Knock Off",lv:27},{move:"Sweet Scent",lv:29},{move:"Gastro Acid",lv:35},
    {move:"Razor Leaf",lv:39},{move:"Slam",lv:41},{move:"Wring Out",lv:47},
  ],
  "Victreebel": [
    {move:"Stockpile",lv:1},{move:"Swallow",lv:1},{move:"Spit Up",lv:1},{move:"Vine Whip",lv:1},
    {move:"Sweet Scent",lv:1},{move:"Razor Leaf",lv:1},{move:"Sleep Powder",lv:1},{move:"Leaf Storm",lv:47},
    {move:"Leaf Blade",lv:47},
  ],
  // ── Hoppip line ─────────────────────────────────────────────────
  "Hoppip": [
    {move:"Splash",lv:1},{move:"Synthesis",lv:4},{move:"Tail Whip",lv:7},{move:"Tackle",lv:10},
    {move:"PoisonPowder",lv:12},{move:"Stun Spore",lv:14},{move:"Sleep Powder",lv:16},{move:"Bullet Seed",lv:19},
    {move:"Leech Seed",lv:22},{move:"Mega Drain",lv:25},{move:"Cotton Spore",lv:28},{move:"U-turn",lv:31},
    {move:"Worry Seed",lv:34},{move:"Giga Drain",lv:37},{move:"Bounce",lv:40},{move:"Memento",lv:43},
  ],
  "Skiploom": [
    {move:"Splash",lv:1},{move:"Synthesis",lv:1},{move:"Tail Whip",lv:1},{move:"Tackle",lv:1},
    {move:"Synthesis",lv:4},{move:"Tail Whip",lv:7},{move:"Tackle",lv:10},{move:"PoisonPowder",lv:12},
    {move:"Stun Spore",lv:14},{move:"Sleep Powder",lv:16},{move:"Bullet Seed",lv:20},{move:"Leech Seed",lv:24},
    {move:"Mega Drain",lv:28},{move:"Cotton Spore",lv:32},{move:"U-turn",lv:36},{move:"Worry Seed",lv:40},
    {move:"Giga Drain",lv:44},{move:"Bounce",lv:48},{move:"Memento",lv:52},
  ],
  "Jumpluff": [
    {move:"Splash",lv:1},{move:"Synthesis",lv:1},{move:"Tail Whip",lv:1},{move:"Tackle",lv:1},
    {move:"Synthesis",lv:4},{move:"Tail Whip",lv:7},{move:"Tackle",lv:10},{move:"PoisonPowder",lv:12},
    {move:"Stun Spore",lv:14},{move:"Sleep Powder",lv:16},{move:"Bullet Seed",lv:20},{move:"Leech Seed",lv:24},
    {move:"Mega Drain",lv:28},{move:"Cotton Spore",lv:32},{move:"U-turn",lv:36},{move:"Worry Seed",lv:40},
    {move:"Giga Drain",lv:44},{move:"Bounce",lv:48},{move:"Memento",lv:52},
  ],
  // ── Paras line ──────────────────────────────────────────────────
  "Paras": [
    {move:"Scratch",lv:1},{move:"Stun Spore",lv:6},{move:"PoisonPowder",lv:6},{move:"Leech Life",lv:11},
    {move:"Spore",lv:17},{move:"Slash",lv:22},{move:"Growth",lv:27},{move:"Giga Drain",lv:33},
    {move:"Aromatherapy",lv:38},{move:"X-Scissor",lv:43},
  ],
  "Parasect": [
    {move:"Cross Poison",lv:1},{move:"Scratch",lv:1},{move:"Stun Spore",lv:1},{move:"PoisonPowder",lv:1},
    {move:"Leech Life",lv:1},{move:"Stun Spore",lv:6},{move:"PoisonPowder",lv:6},{move:"Leech Life",lv:11},
    {move:"Spore",lv:17},{move:"Slash",lv:22},{move:"Growth",lv:30},{move:"Giga Drain",lv:39},
    {move:"Aromatherapy",lv:47},{move:"X-Scissor",lv:55},
  ],
  // ── Poliwag line ────────────────────────────────────────────────
  "Poliwag": [
    {move:"Water Sport",lv:1},{move:"Bubble",lv:5},{move:"Hypnosis",lv:8},{move:"Water Gun",lv:11},
    {move:"DoubleSlap",lv:15},{move:"Rain Dance",lv:18},{move:"Body Slam",lv:21},{move:"BubbleBeam",lv:25},
    {move:"Mud Shot",lv:28},{move:"Belly Drum",lv:31},{move:"Wake-Up Slap",lv:35},{move:"Hydro Pump",lv:38},
    {move:"Mud Bomb",lv:41},
  ],
  "Poliwhirl": [
    {move:"Water Sport",lv:1},{move:"Bubble",lv:1},{move:"Hypnosis",lv:1},{move:"Bubble",lv:5},
    {move:"Hypnosis",lv:8},{move:"Water Gun",lv:11},{move:"DoubleSlap",lv:15},{move:"Rain Dance",lv:18},
    {move:"Body Slam",lv:21},{move:"BubbleBeam",lv:27},{move:"Mud Shot",lv:32},{move:"Belly Drum",lv:37},
    {move:"Wake-Up Slap",lv:43},{move:"Hydro Pump",lv:48},{move:"Mud Bomb",lv:53},
  ],
  "Poliwrath": [
    {move:"BubbleBeam",lv:1},{move:"DoubleSlap",lv:1},{move:"Hypnosis",lv:1},{move:"Submission",lv:1},
    {move:"DynamicPunch",lv:43},{move:"Mind Reader",lv:53},
  ],
  "Politoed": [
    {move:"BubbleBeam",lv:1},{move:"DoubleSlap",lv:1},{move:"Hypnosis",lv:1},{move:"Perish Song",lv:1},
    {move:"Swagger",lv:27},{move:"Bounce",lv:37},{move:"Hyper Voice",lv:48},
  ],
  // ── Magikarp line ───────────────────────────────────────────────
  "Magikarp": [ {move:"Splash",lv:1},{move:"Tackle",lv:15},{move:"Flail",lv:30} ],
  "Gyarados": [
    {move:"Thrash",lv:1},{move:"Bite",lv:20},{move:"Dragon Rage",lv:23},{move:"Leer",lv:26},
    {move:"Twister",lv:29},{move:"Ice Fang",lv:32},{move:"Aqua Tail",lv:35},{move:"Rain Dance",lv:38},
    {move:"Hydro Pump",lv:41},{move:"Dragon Dance",lv:44},{move:"Hyper Beam",lv:47},
  ],
  // ── Goldeen line ────────────────────────────────────────────────
  "Goldeen": [
    {move:"Peck",lv:1},{move:"Tail Whip",lv:1},{move:"Water Sport",lv:1},{move:"Supersonic",lv:7},
    {move:"Horn Attack",lv:11},{move:"Water Pulse",lv:17},{move:"Flail",lv:21},{move:"Aqua Ring",lv:27},
    {move:"Fury Attack",lv:31},{move:"Waterfall",lv:37},{move:"Horn Drill",lv:41},{move:"Agility",lv:47},
    {move:"Megahorn",lv:51},
  ],
  "Seaking": [
    {move:"Poison Jab",lv:1},{move:"Peck",lv:1},{move:"Tail Whip",lv:1},{move:"Water Sport",lv:1},
    {move:"Supersonic",lv:1},{move:"Supersonic",lv:7},{move:"Horn Attack",lv:11},{move:"Water Pulse",lv:17},
    {move:"Flail",lv:21},{move:"Aqua Ring",lv:27},{move:"Fury Attack",lv:31},{move:"Waterfall",lv:40},
    {move:"Horn Drill",lv:47},{move:"Agility",lv:56},{move:"Megahorn",lv:63},
  ],
  // ── Slowpoke line ───────────────────────────────────────────────
  "Slowpoke": [
    {move:"Curse",lv:1},{move:"Tackle",lv:1},{move:"Yawn",lv:1},{move:"Growl",lv:6},
    {move:"Water Gun",lv:11},{move:"Confusion",lv:15},{move:"Disable",lv:20},{move:"Headbutt",lv:25},
    {move:"Water Pulse",lv:29},{move:"Zen Headbutt",lv:34},{move:"Slack Off",lv:39},{move:"Amnesia",lv:43},
    {move:"Psychic",lv:48},{move:"Rain Dance",lv:53},{move:"Psych Up",lv:57},
  ],
  "Slowbro": [
    {move:"Curse",lv:1},{move:"Tackle",lv:1},{move:"Yawn",lv:1},{move:"Growl",lv:1},
    {move:"Growl",lv:6},{move:"Water Gun",lv:11},{move:"Confusion",lv:15},{move:"Disable",lv:20},
    {move:"Headbutt",lv:25},{move:"Water Pulse",lv:29},{move:"Zen Headbutt",lv:34},{move:"Withdraw",lv:37},
    {move:"Slack Off",lv:41},{move:"Amnesia",lv:47},{move:"Psychic",lv:54},{move:"Rain Dance",lv:61},
    {move:"Psych Up",lv:67},
  ],
  "Slowking": [
    {move:"Power Gem",lv:1},{move:"Hidden Power",lv:1},{move:"Curse",lv:1},{move:"Tackle",lv:1},
    {move:"Yawn",lv:1},{move:"Growl",lv:6},{move:"Water Gun",lv:11},{move:"Confusion",lv:15},
    {move:"Disable",lv:20},{move:"Headbutt",lv:25},{move:"Water Pulse",lv:29},{move:"Zen Headbutt",lv:34},
    {move:"Nasty Plot",lv:39},{move:"Swagger",lv:43},{move:"Psychic",lv:48},{move:"Trump Card",lv:53},
    {move:"Psych Up",lv:57},
  ],
  // ── Oddish line ─────────────────────────────────────────────────
  "Oddish": [
    {move:"Absorb",lv:1},{move:"Sweet Scent",lv:5},{move:"Acid",lv:9},{move:"PoisonPowder",lv:13},
    {move:"Stun Spore",lv:15},{move:"Sleep Powder",lv:17},{move:"Mega Drain",lv:21},{move:"Lucky Chant",lv:25},
    {move:"Natural Gift",lv:29},{move:"Moonlight",lv:33},{move:"Giga Drain",lv:37},{move:"Petal Dance",lv:41},
  ],
  "Gloom": [
    {move:"Absorb",lv:1},{move:"Sweet Scent",lv:1},{move:"Acid",lv:1},{move:"Sweet Scent",lv:5},
    {move:"Acid",lv:9},{move:"PoisonPowder",lv:13},{move:"Stun Spore",lv:15},{move:"Sleep Powder",lv:17},
    {move:"Mega Drain",lv:23},{move:"Lucky Chant",lv:29},{move:"Natural Gift",lv:35},{move:"Moonlight",lv:41},
    {move:"Giga Drain",lv:47},{move:"Petal Dance",lv:53},
  ],
  "Vileplume": [
    {move:"Aromatherapy",lv:1},{move:"Mega Drain",lv:1},{move:"PoisonPowder",lv:1},{move:"Stun Spore",lv:1},
    {move:"Petal Dance",lv:53},{move:"SolarBeam",lv:65},
  ],
  "Bellossom": [
    {move:"Leaf Blade",lv:1},{move:"Sweet Scent",lv:1},{move:"Stun Spore",lv:1},{move:"Mega Drain",lv:1},
    {move:"Sunny Day",lv:1},{move:"Magical Leaf",lv:23},{move:"Leaf Storm",lv:53},
  ],
  // ── Drowzee line ────────────────────────────────────────────────
  "Drowzee": [
    {move:"Pound",lv:1},{move:"Hypnosis",lv:1},{move:"Disable",lv:7},{move:"Confusion",lv:9},
    {move:"Headbutt",lv:15},{move:"Poison Gas",lv:18},{move:"Meditate",lv:21},{move:"Psybeam",lv:26},
    {move:"Psych Up",lv:29},{move:"Headbutt",lv:32},{move:"Swagger",lv:37},{move:"Psychic",lv:40},
    {move:"Nasty Plot",lv:43},{move:"Zen Headbutt",lv:50},{move:"Future Sight",lv:53},
  ],
  "Hypno": [
    {move:"Nightmare",lv:1},{move:"Switcheroo",lv:1},{move:"Pound",lv:1},{move:"Hypnosis",lv:1},
    {move:"Disable",lv:1},{move:"Confusion",lv:1},{move:"Disable",lv:7},{move:"Confusion",lv:9},
    {move:"Headbutt",lv:15},{move:"Poison Gas",lv:18},{move:"Meditate",lv:21},{move:"Psybeam",lv:28},
    {move:"Psych Up",lv:33},{move:"Headbutt",lv:38},{move:"Swagger",lv:45},{move:"Psychic",lv:50},
    {move:"Nasty Plot",lv:55},{move:"Zen Headbutt",lv:64},{move:"Future Sight",lv:69},
  ],
  // ── Abra line ───────────────────────────────────────────────────
  "Abra": [ {move:"Teleport",lv:1} ],
  "Kadabra": [
    {move:"Kinesis",lv:1},{move:"Teleport",lv:1},{move:"Confusion",lv:1},{move:"Confusion",lv:16},
    {move:"Disable",lv:18},{move:"Miracle Eye",lv:22},{move:"Psybeam",lv:24},{move:"Reflect",lv:28},
    {move:"Recover",lv:30},{move:"Psycho Cut",lv:34},{move:"Role Play",lv:36},{move:"Psychic",lv:40},
    {move:"Future Sight",lv:42},{move:"Trick",lv:46},
  ],
  "Alakazam": [
    {move:"Kinesis",lv:1},{move:"Teleport",lv:1},{move:"Confusion",lv:1},{move:"Confusion",lv:16},
    {move:"Disable",lv:18},{move:"Miracle Eye",lv:22},{move:"Psybeam",lv:24},{move:"Reflect",lv:28},
    {move:"Recover",lv:30},{move:"Psycho Cut",lv:34},{move:"Calm Mind",lv:36},{move:"Psychic",lv:40},
    {move:"Future Sight",lv:42},{move:"Trick",lv:46},
  ],
  // ── Ditto ───────────────────────────────────────────────────────
  "Ditto": [ {move:"Transform",lv:1} ],
  // ── Pineco line ─────────────────────────────────────────────────
  "Pineco": [
    {move:"Tackle",lv:1},{move:"Protect",lv:1},{move:"Selfdestruct",lv:6},{move:"Bug Bite",lv:9},
    {move:"Take Down",lv:12},{move:"Rapid Spin",lv:17},{move:"Bide",lv:20},{move:"Natural Gift",lv:23},
    {move:"Spikes",lv:28},{move:"Payback",lv:31},{move:"Explosion",lv:34},{move:"Iron Defense",lv:39},
    {move:"Gyro Ball",lv:42},{move:"Double-Edge",lv:45},
  ],
  "Forretress": [
    {move:"Toxic Spikes",lv:1},{move:"Tackle",lv:1},{move:"Protect",lv:1},{move:"Selfdestruct",lv:1},
    {move:"Bug Bite",lv:1},{move:"Selfdestruct",lv:6},{move:"Bug Bite",lv:9},{move:"Take Down",lv:12},
    {move:"Rapid Spin",lv:17},{move:"Bide",lv:20},{move:"Natural Gift",lv:23},{move:"Spikes",lv:28},
    {move:"Mirror Shot",lv:31},{move:"Payback",lv:33},{move:"Explosion",lv:38},{move:"Iron Defense",lv:45},
    {move:"Gyro Ball",lv:50},{move:"Double-Edge",lv:55},{move:"Magnet Rise",lv:62},{move:"Zap Cannon",lv:67},
  ],
  // ── Nidoran female line ─────────────────────────────────────────
  "Nidoran♀": [
    {move:"Growl",lv:1},{move:"Scratch",lv:1},{move:"Tail Whip",lv:7},{move:"Double Kick",lv:9},
    {move:"Poison Sting",lv:13},{move:"Fury Swipes",lv:19},{move:"Bite",lv:21},{move:"Helping Hand",lv:25},
    {move:"Toxic Spikes",lv:31},{move:"Flatter",lv:33},{move:"Crunch",lv:37},{move:"Captivate",lv:43},
    {move:"Poison Fang",lv:45},
  ],
  "Nidorina": [
    {move:"Growl",lv:1},{move:"Scratch",lv:1},{move:"Tail Whip",lv:7},{move:"Double Kick",lv:9},
    {move:"Poison Sting",lv:13},{move:"Fury Swipes",lv:20},{move:"Bite",lv:23},{move:"Helping Hand",lv:28},
    {move:"Toxic Spikes",lv:35},{move:"Flatter",lv:38},{move:"Crunch",lv:43},{move:"Captivate",lv:50},
    {move:"Poison Fang",lv:58},
  ],
  "Nidoqueen": [
    {move:"Scratch",lv:1},{move:"Tail Whip",lv:1},{move:"Double Kick",lv:1},{move:"Poison Sting",lv:1},
    {move:"Body Slam",lv:23},{move:"Earth Power",lv:43},{move:"Superpower",lv:58},
  ],
  // ── Nidoran male line ───────────────────────────────────────────
  "Nidoran♂": [
    {move:"Leer",lv:1},{move:"Peck",lv:1},{move:"Focus Energy",lv:7},{move:"Double Kick",lv:9},
    {move:"Poison Sting",lv:13},{move:"Fury Attack",lv:19},{move:"Horn Attack",lv:21},{move:"Helping Hand",lv:25},
    {move:"Toxic Spikes",lv:31},{move:"Flatter",lv:33},{move:"Poison Jab",lv:37},{move:"Captivate",lv:43},
    {move:"Horn Drill",lv:45},
  ],
  "Nidorino": [
    {move:"Leer",lv:1},{move:"Peck",lv:1},{move:"Focus Energy",lv:7},{move:"Double Kick",lv:9},
    {move:"Poison Sting",lv:13},{move:"Fury Attack",lv:20},{move:"Horn Attack",lv:23},{move:"Helping Hand",lv:28},
    {move:"Toxic Spikes",lv:35},{move:"Flatter",lv:38},{move:"Poison Jab",lv:43},{move:"Captivate",lv:50},
    {move:"Horn Drill",lv:58},
  ],
  "Nidoking": [
    {move:"Peck",lv:1},{move:"Focus Energy",lv:1},{move:"Double Kick",lv:1},{move:"Poison Sting",lv:1},
    {move:"Thrash",lv:23},{move:"Earth Power",lv:43},{move:"Megahorn",lv:58},
  ],
  // ── Yanma line ──────────────────────────────────────────────────
  "Yanma": [
    {move:"Tackle",lv:1},{move:"Foresight",lv:1},{move:"Quick Attack",lv:6},{move:"Double Team",lv:11},
    {move:"SonicBoom",lv:14},{move:"Detect",lv:17},{move:"Supersonic",lv:22},{move:"Uproar",lv:27},
    {move:"Pursuit",lv:30},{move:"AncientPower",lv:33},{move:"Hypnosis",lv:38},{move:"Wing Attack",lv:43},
    {move:"Screech",lv:46},{move:"U-turn",lv:49},{move:"Air Slash",lv:54},{move:"Bug Buzz",lv:57},
  ],
  "Yanmega": [
    {move:"Night Slash",lv:1},{move:"Bug Bite",lv:1},{move:"Tackle",lv:1},{move:"Foresight",lv:1},
    {move:"Quick Attack",lv:1},{move:"Double Team",lv:1},{move:"Quick Attack",lv:6},{move:"Double Team",lv:11},
    {move:"SonicBoom",lv:14},{move:"Detect",lv:17},{move:"Supersonic",lv:22},{move:"Uproar",lv:27},
    {move:"Pursuit",lv:30},{move:"AncientPower",lv:33},{move:"Feint",lv:38},{move:"Slash",lv:43},
    {move:"Screech",lv:46},{move:"U-turn",lv:49},{move:"Air Slash",lv:54},{move:"Bug Buzz",lv:57},
  ],
  // ── Sunkern line ────────────────────────────────────────────────
  "Sunkern": [
    {move:"Absorb",lv:1},{move:"Growth",lv:1},{move:"Mega Drain",lv:5},{move:"Ingrain",lv:9},
    {move:"GrassWhistle",lv:13},{move:"Leech Seed",lv:17},{move:"Endeavor",lv:21},{move:"Worry Seed",lv:25},
    {move:"Razor Leaf",lv:29},{move:"Synthesis",lv:33},{move:"Sunny Day",lv:37},{move:"Giga Drain",lv:41},
    {move:"Seed Bomb",lv:45},
  ],
  "Sunflora": [
    {move:"Absorb",lv:1},{move:"Pound",lv:1},{move:"Growth",lv:1},{move:"Mega Drain",lv:5},
    {move:"Ingrain",lv:9},{move:"GrassWhistle",lv:13},{move:"Leech Seed",lv:17},{move:"Bullet Seed",lv:21},
    {move:"Worry Seed",lv:25},{move:"Razor Leaf",lv:29},{move:"Petal Dance",lv:33},{move:"Sunny Day",lv:37},
    {move:"SolarBeam",lv:41},{move:"Leaf Storm",lv:43},
  ],
  // ── Exeggcute line ──────────────────────────────────────────────
  "Exeggcute": [
    {move:"Uproar",lv:1},{move:"Barrage",lv:1},{move:"Hypnosis",lv:1},{move:"Reflect",lv:7},
    {move:"Leech Seed",lv:11},{move:"Bullet Seed",lv:17},{move:"Stun Spore",lv:19},{move:"PoisonPowder",lv:21},
    {move:"Sleep Powder",lv:23},{move:"Confusion",lv:27},{move:"Worry Seed",lv:33},{move:"Natural Gift",lv:37},
    {move:"SolarBeam",lv:43},{move:"Psychic",lv:47},
  ],
  "Exeggutor": [
    {move:"Seed Bomb",lv:1},{move:"Barrage",lv:1},{move:"Confusion",lv:1},{move:"Hypnosis",lv:1},
    {move:"Stomp",lv:1},{move:"Stomp",lv:17},{move:"Egg Bomb",lv:27},{move:"Wood Hammer",lv:37},
    {move:"Leaf Storm",lv:47},
  ],
  // ── Sudowoodo + Wobbuffet ───────────────────────────────────────
  "Sudowoodo": [
    {move:"Wood Hammer",lv:1},{move:"Copycat",lv:1},{move:"Flail",lv:1},{move:"Low Kick",lv:1},
    {move:"Rock Throw",lv:1},{move:"Flail",lv:6},{move:"Low Kick",lv:9},{move:"Rock Throw",lv:14},
    {move:"Mimic",lv:17},{move:"Block",lv:22},{move:"Faint Attack",lv:25},{move:"Rock Tomb",lv:30},
    {move:"Rock Slide",lv:33},{move:"Slam",lv:38},{move:"Sucker Punch",lv:41},{move:"Double-Edge",lv:46},
    {move:"Hammer Arm",lv:49},
  ],
  "Wobbuffet": [ {move:"Counter",lv:1},{move:"Mirror Coat",lv:1},{move:"Safeguard",lv:1},{move:"Destiny Bond",lv:1} ],
  // ── Venonat line ────────────────────────────────────────────────
  "Venonat": [
    {move:"Tackle",lv:1},{move:"Disable",lv:1},{move:"Foresight",lv:1},{move:"Supersonic",lv:5},
    {move:"Confusion",lv:11},{move:"PoisonPowder",lv:13},{move:"Leech Life",lv:17},{move:"Stun Spore",lv:23},
    {move:"Psybeam",lv:25},{move:"Sleep Powder",lv:29},{move:"Signal Beam",lv:35},{move:"Zen Headbutt",lv:37},
    {move:"Poison Fang",lv:41},{move:"Psychic",lv:47},
  ],
  "Venomoth": [
    {move:"Silver Wind",lv:1},{move:"Tackle",lv:1},{move:"Disable",lv:1},{move:"Foresight",lv:1},
    {move:"Supersonic",lv:1},{move:"Supersonic",lv:5},{move:"Confusion",lv:11},{move:"PoisonPowder",lv:13},
    {move:"Leech Life",lv:17},{move:"Stun Spore",lv:23},{move:"Psybeam",lv:25},{move:"Sleep Powder",lv:29},
    {move:"Gust",lv:31},{move:"Signal Beam",lv:37},{move:"Zen Headbutt",lv:41},{move:"Poison Fang",lv:47},
    {move:"Psychic",lv:55},{move:"Bug Buzz",lv:59},
  ],
  // ── Scyther line ────────────────────────────────────────────────
  "Scyther": [
    {move:"Vacuum Wave",lv:1},{move:"Quick Attack",lv:1},{move:"Leer",lv:1},{move:"Focus Energy",lv:5},
    {move:"Pursuit",lv:9},{move:"False Swipe",lv:13},{move:"Agility",lv:17},{move:"Wing Attack",lv:21},
    {move:"Fury Cutter",lv:25},{move:"Slash",lv:29},{move:"Razor Wind",lv:33},{move:"Double Team",lv:37},
    {move:"X-Scissor",lv:41},{move:"Night Slash",lv:45},{move:"Double Hit",lv:49},{move:"Air Slash",lv:53},
    {move:"Swords Dance",lv:57},{move:"Feint",lv:61},
  ],
  "Scizor": [
    {move:"Bullet Punch",lv:1},{move:"Quick Attack",lv:1},{move:"Leer",lv:1},{move:"Focus Energy",lv:5},
    {move:"Pursuit",lv:9},{move:"False Swipe",lv:13},{move:"Agility",lv:17},{move:"Metal Claw",lv:21},
    {move:"Fury Cutter",lv:25},{move:"Slash",lv:29},{move:"Razor Wind",lv:33},{move:"Iron Defense",lv:37},
    {move:"X-Scissor",lv:41},{move:"Night Slash",lv:45},{move:"Double Hit",lv:49},{move:"Iron Head",lv:53},
    {move:"Swords Dance",lv:57},{move:"Feint",lv:61},
  ],
  // ── Pinsir + Heracross ──────────────────────────────────────────
  "Pinsir": [
    {move:"ViceGrip",lv:1},{move:"Focus Energy",lv:1},{move:"Bind",lv:4},{move:"Seismic Toss",lv:8},
    {move:"Harden",lv:13},{move:"Revenge",lv:18},{move:"Brick Break",lv:21},{move:"Vital Throw",lv:25},
    {move:"X-Scissor",lv:30},{move:"Thrash",lv:35},{move:"Swords Dance",lv:38},{move:"Submission",lv:42},
    {move:"Guillotine",lv:47},{move:"Superpower",lv:52},
  ],
  "Heracross": [
    {move:"Night Slash",lv:1},{move:"Tackle",lv:1},{move:"Leer",lv:1},{move:"Horn Attack",lv:1},
    {move:"Endure",lv:1},{move:"Fury Attack",lv:7},{move:"Aerial Ace",lv:13},{move:"Brick Break",lv:19},
    {move:"Counter",lv:25},{move:"Take Down",lv:31},{move:"Close Combat",lv:37},{move:"Reversal",lv:43},
    {move:"Feint",lv:49},{move:"Megahorn",lv:55},
  ],
  // ── Koffing line ────────────────────────────────────────────────
  "Koffing": [
    {move:"Poison Gas",lv:1},{move:"Tackle",lv:1},{move:"Smog",lv:6},{move:"SmokeScreen",lv:10},
    {move:"Assurance",lv:15},{move:"Selfdestruct",lv:19},{move:"Sludge",lv:24},{move:"Haze",lv:28},
    {move:"Gyro Ball",lv:33},{move:"Explosion",lv:37},{move:"Sludge Bomb",lv:42},{move:"Destiny Bond",lv:46},
    {move:"Memento",lv:51},
  ],
  "Weezing": [
    {move:"Poison Gas",lv:1},{move:"Tackle",lv:1},{move:"Smog",lv:1},{move:"SmokeScreen",lv:1},
    {move:"Smog",lv:6},{move:"SmokeScreen",lv:10},{move:"Assurance",lv:15},{move:"Selfdestruct",lv:19},
    {move:"Sludge",lv:24},{move:"Haze",lv:28},{move:"Double Hit",lv:33},{move:"Explosion",lv:40},
    {move:"Sludge Bomb",lv:48},{move:"Destiny Bond",lv:55},{move:"Memento",lv:63},
  ],
  // ── Grimer line ─────────────────────────────────────────────────
  "Grimer": [
    {move:"Poison Gas",lv:1},{move:"Pound",lv:1},{move:"Harden",lv:4},{move:"Mud-Slap",lv:7},
    {move:"Disable",lv:12},{move:"Minimize",lv:17},{move:"Sludge",lv:20},{move:"Mud Bomb",lv:23},
    {move:"Fling",lv:28},{move:"Screech",lv:33},{move:"Sludge Bomb",lv:36},{move:"Acid Armor",lv:39},
    {move:"Gunk Shot",lv:44},{move:"Memento",lv:49},
  ],
  "Muk": [
    {move:"Poison Gas",lv:1},{move:"Pound",lv:1},{move:"Harden",lv:1},{move:"Mud-Slap",lv:1},
    {move:"Harden",lv:4},{move:"Mud-Slap",lv:7},{move:"Disable",lv:12},{move:"Minimize",lv:17},
    {move:"Sludge",lv:20},{move:"Mud Bomb",lv:23},{move:"Fling",lv:28},{move:"Screech",lv:33},
    {move:"Sludge Bomb",lv:36},{move:"Acid Armor",lv:44},{move:"Gunk Shot",lv:54},{move:"Memento",lv:65},
  ],
  // ── Magnemite line ──────────────────────────────────────────────
  "Magnemite": [
    {move:"Tackle",lv:1},{move:"Metal Sound",lv:1},{move:"ThunderShock",lv:6},{move:"Supersonic",lv:11},
    {move:"SonicBoom",lv:14},{move:"Thunder Wave",lv:17},{move:"Spark",lv:22},{move:"Lock-On",lv:27},
    {move:"Magnet Bomb",lv:30},{move:"Screech",lv:33},{move:"Discharge",lv:38},{move:"Mirror Shot",lv:43},
    {move:"Magnet Rise",lv:46},{move:"Gyro Ball",lv:49},{move:"Zap Cannon",lv:54},
  ],
  "Magneton": [
    {move:"Tri Attack",lv:1},{move:"Tackle",lv:1},{move:"Metal Sound",lv:1},{move:"ThunderShock",lv:1},
    {move:"Supersonic",lv:1},{move:"ThunderShock",lv:6},{move:"Supersonic",lv:11},{move:"SonicBoom",lv:14},
    {move:"Thunder Wave",lv:17},{move:"Spark",lv:22},{move:"Lock-On",lv:27},{move:"Magnet Bomb",lv:30},
    {move:"Screech",lv:34},{move:"Discharge",lv:40},{move:"Mirror Shot",lv:46},{move:"Magnet Rise",lv:50},
    {move:"Gyro Ball",lv:54},{move:"Zap Cannon",lv:60},
  ],
  // ── Voltorb line ────────────────────────────────────────────────
  "Voltorb": [
    {move:"Charge",lv:1},{move:"Tackle",lv:5},{move:"SonicBoom",lv:8},{move:"Spark",lv:12},
    {move:"Rollout",lv:15},{move:"Screech",lv:19},{move:"Light Screen",lv:22},{move:"Charge Beam",lv:26},
    {move:"Selfdestruct",lv:29},{move:"Swift",lv:33},{move:"Magnet Rise",lv:36},{move:"Gyro Ball",lv:40},
    {move:"Explosion",lv:43},{move:"Mirror Coat",lv:47},
  ],
  "Electrode": [
    {move:"Charge",lv:1},{move:"Tackle",lv:1},{move:"SonicBoom",lv:1},{move:"Spark",lv:1},
    {move:"Tackle",lv:5},{move:"SonicBoom",lv:8},{move:"Spark",lv:12},{move:"Rollout",lv:15},
    {move:"Screech",lv:19},{move:"Light Screen",lv:22},{move:"Charge Beam",lv:26},{move:"Selfdestruct",lv:29},
    {move:"Swift",lv:35},{move:"Magnet Rise",lv:40},{move:"Gyro Ball",lv:46},{move:"Explosion",lv:51},
    {move:"Mirror Coat",lv:57},
  ],
  // ── Aipom line ──────────────────────────────────────────────────
  "Aipom": [
    {move:"Scratch",lv:1},{move:"Tail Whip",lv:1},{move:"Sand-Attack",lv:4},{move:"Astonish",lv:8},
    {move:"Baton Pass",lv:11},{move:"Tickle",lv:15},{move:"Fury Swipes",lv:18},{move:"Swift",lv:22},
    {move:"Screech",lv:25},{move:"Agility",lv:29},{move:"Double Hit",lv:32},{move:"Fling",lv:36},
    {move:"Nasty Plot",lv:39},{move:"Last Resort",lv:43},
  ],
  "Ambipom": [
    {move:"Scratch",lv:1},{move:"Tail Whip",lv:1},{move:"Sand-Attack",lv:1},{move:"Astonish",lv:1},
    {move:"Sand-Attack",lv:4},{move:"Astonish",lv:8},{move:"Baton Pass",lv:11},{move:"Tickle",lv:15},
    {move:"Fury Swipes",lv:18},{move:"Swift",lv:22},{move:"Screech",lv:25},{move:"Agility",lv:29},
    {move:"Double Hit",lv:32},{move:"Fling",lv:36},{move:"Nasty Plot",lv:39},{move:"Last Resort",lv:43},
  ],
  // ── Snubbull line ───────────────────────────────────────────────
  "Snubbull": [
    {move:"Fire Fang",lv:1},{move:"Ice Fang",lv:1},{move:"Thunder Fang",lv:1},{move:"Tackle",lv:1},
    {move:"Scary Face",lv:1},{move:"Tail Whip",lv:1},{move:"Charm",lv:1},{move:"Bite",lv:7},
    {move:"Lick",lv:13},{move:"Headbutt",lv:19},{move:"Roar",lv:25},{move:"Rage",lv:31},
    {move:"Take Down",lv:37},{move:"Payback",lv:43},{move:"Crunch",lv:49},
  ],
  "Granbull": [
    {move:"Fire Fang",lv:1},{move:"Ice Fang",lv:1},{move:"Thunder Fang",lv:1},{move:"Tackle",lv:1},
    {move:"Scary Face",lv:1},{move:"Tail Whip",lv:1},{move:"Charm",lv:1},{move:"Bite",lv:7},
    {move:"Lick",lv:13},{move:"Headbutt",lv:19},{move:"Roar",lv:27},{move:"Rage",lv:35},
    {move:"Take Down",lv:43},{move:"Payback",lv:51},{move:"Crunch",lv:59},
  ],
  // ── Vulpix line ─────────────────────────────────────────────────
  "Vulpix": [
    {move:"Ember",lv:1},{move:"Tail Whip",lv:4},{move:"Roar",lv:7},{move:"Quick Attack",lv:11},
    {move:"Will-O-Wisp",lv:14},{move:"Confuse Ray",lv:17},{move:"Imprison",lv:21},{move:"Flamethrower",lv:24},
    {move:"Safeguard",lv:27},{move:"Payback",lv:31},{move:"Fire Spin",lv:34},{move:"Captivate",lv:37},
    {move:"Grudge",lv:41},{move:"Extrasensory",lv:44},{move:"Fire Blast",lv:47},
  ],
  "Ninetales": [
    {move:"Nasty Plot",lv:1},{move:"Quick Attack",lv:1},{move:"Confuse Ray",lv:1},{move:"Safeguard",lv:1},
    {move:"Ember",lv:1},
  ],
  // ── Growlithe line ──────────────────────────────────────────────
  "Growlithe": [
    {move:"Bite",lv:1},{move:"Roar",lv:1},{move:"Ember",lv:6},{move:"Leer",lv:9},
    {move:"Odor Sleuth",lv:14},{move:"Helping Hand",lv:17},{move:"Flame Wheel",lv:20},{move:"Reversal",lv:25},
    {move:"Fire Fang",lv:28},{move:"Take Down",lv:31},{move:"Flamethrower",lv:34},{move:"Agility",lv:39},
    {move:"Crunch",lv:42},{move:"Heat Wave",lv:45},{move:"Flare Blitz",lv:48},
  ],
  "Arcanine": [
    {move:"Thunder Fang",lv:1},{move:"Bite",lv:1},{move:"Odor Sleuth",lv:1},{move:"Roar",lv:1},
    {move:"Fire Fang",lv:1},{move:"ExtremeSpeed",lv:39},
  ],
  // ── Stantler ────────────────────────────────────────────────────
  "Stantler": [
    {move:"Tackle",lv:1},{move:"Leer",lv:3},{move:"Astonish",lv:7},{move:"Hypnosis",lv:10},
    {move:"Stomp",lv:13},{move:"Sand-Attack",lv:16},{move:"Take Down",lv:21},{move:"Confuse Ray",lv:23},
    {move:"Calm Mind",lv:27},{move:"Role Play",lv:33},{move:"Zen Headbutt",lv:38},{move:"Imprison",lv:43},
    {move:"Captivate",lv:49},{move:"Me First",lv:53},
  ],
  // ── Marill line ─────────────────────────────────────────────────
  "Marill": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:2},{move:"Tail Whip",lv:7},{move:"Water Gun",lv:10},
    {move:"Rollout",lv:15},{move:"BubbleBeam",lv:18},{move:"Aqua Ring",lv:23},{move:"Double-Edge",lv:27},
    {move:"Rain Dance",lv:32},{move:"Aqua Tail",lv:37},{move:"Hydro Pump",lv:42},
  ],
  "Azumarill": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:1},{move:"Tail Whip",lv:1},{move:"Water Gun",lv:1},
    {move:"Defense Curl",lv:2},{move:"Tail Whip",lv:7},{move:"Water Gun",lv:10},{move:"Rollout",lv:15},
    {move:"BubbleBeam",lv:20},{move:"Aqua Ring",lv:27},{move:"Double-Edge",lv:33},{move:"Rain Dance",lv:40},
    {move:"Aqua Tail",lv:47},{move:"Hydro Pump",lv:54},
  ],
  // ── Diglett line ────────────────────────────────────────────────
  "Diglett": [
    {move:"Scratch",lv:1},{move:"Sand-Attack",lv:1},{move:"Growl",lv:4},{move:"Astonish",lv:7},
    {move:"Magnitude",lv:12},{move:"Mud-Slap",lv:15},{move:"Dig",lv:18},{move:"Sucker Punch",lv:23},
    {move:"Earth Power",lv:26},{move:"Mud Bomb",lv:29},{move:"Slash",lv:34},{move:"Earthquake",lv:37},
    {move:"Fissure",lv:40},
  ],
  "Dugtrio": [
    {move:"Night Slash",lv:1},{move:"Tri Attack",lv:1},{move:"Scratch",lv:1},{move:"Sand-Attack",lv:1},
    {move:"Growl",lv:1},{move:"Growl",lv:4},{move:"Astonish",lv:7},{move:"Magnitude",lv:12},
    {move:"Mud-Slap",lv:15},{move:"Dig",lv:18},{move:"Sucker Punch",lv:23},{move:"Sand Tomb",lv:26},
    {move:"Earth Power",lv:28},{move:"Mud Bomb",lv:33},{move:"Slash",lv:40},{move:"Earthquake",lv:45},
    {move:"Fissure",lv:50},
  ],
  // ── Mankey line ─────────────────────────────────────────────────
  "Mankey": [
    {move:"Covet",lv:1},{move:"Scratch",lv:1},{move:"Low Kick",lv:1},{move:"Leer",lv:1},
    {move:"Focus Energy",lv:1},{move:"Fury Swipes",lv:9},{move:"Karate Chop",lv:13},{move:"Seismic Toss",lv:17},
    {move:"Screech",lv:21},{move:"Assurance",lv:25},{move:"Swagger",lv:33},{move:"Cross Chop",lv:37},
    {move:"Thrash",lv:41},{move:"Punishment",lv:45},{move:"Close Combat",lv:49},
  ],
  "Primeape": [
    {move:"Fling",lv:1},{move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Low Kick",lv:1},
    {move:"Focus Energy",lv:1},{move:"Fury Swipes",lv:9},{move:"Karate Chop",lv:13},{move:"Seismic Toss",lv:17},
    {move:"Screech",lv:21},{move:"Assurance",lv:25},{move:"Rage",lv:28},{move:"Swagger",lv:35},
    {move:"Cross Chop",lv:41},{move:"Thrash",lv:47},{move:"Punishment",lv:53},{move:"Close Combat",lv:59},
  ],
  // ── Meowth line ─────────────────────────────────────────────────
  "Meowth": [
    {move:"Scratch",lv:1},{move:"Growl",lv:1},{move:"Bite",lv:6},{move:"Fake Out",lv:9},
    {move:"Fury Swipes",lv:14},{move:"Screech",lv:17},{move:"Faint Attack",lv:22},{move:"Taunt",lv:25},
    {move:"Pay Day",lv:30},{move:"Slash",lv:33},{move:"Nasty Plot",lv:38},{move:"Assurance",lv:41},
    {move:"Captivate",lv:46},{move:"Night Slash",lv:49},{move:"Feint",lv:54},
  ],
  "Persian": [
    {move:"Switcheroo",lv:1},{move:"Scratch",lv:1},{move:"Growl",lv:1},{move:"Bite",lv:1},
    {move:"Fake Out",lv:1},{move:"Bite",lv:6},{move:"Fake Out",lv:9},{move:"Fury Swipes",lv:14},
    {move:"Screech",lv:17},{move:"Faint Attack",lv:22},{move:"Taunt",lv:25},{move:"Power Gem",lv:32},
    {move:"Slash",lv:37},{move:"Nasty Plot",lv:44},{move:"Assurance",lv:49},{move:"Captivate",lv:56},
    {move:"Night Slash",lv:61},{move:"Feint",lv:68},
  ],
  // ── Psyduck line ────────────────────────────────────────────────
  "Psyduck": [
    {move:"Water Sport",lv:1},{move:"Scratch",lv:1},{move:"Tail Whip",lv:5},{move:"Water Gun",lv:9},
    {move:"Disable",lv:14},{move:"Confusion",lv:18},{move:"Water Pulse",lv:22},{move:"Fury Swipes",lv:27},
    {move:"Screech",lv:31},{move:"Psych Up",lv:35},{move:"Zen Headbutt",lv:40},{move:"Amnesia",lv:44},
    {move:"Hydro Pump",lv:48},
  ],
  "Golduck": [
    {move:"Aqua Jet",lv:1},{move:"Scratch",lv:1},{move:"Water Sport",lv:1},{move:"Tail Whip",lv:1},
    {move:"Water Gun",lv:1},{move:"Tail Whip",lv:5},{move:"Water Gun",lv:9},{move:"Disable",lv:14},
    {move:"Confusion",lv:18},{move:"Water Pulse",lv:22},{move:"Fury Swipes",lv:27},{move:"Screech",lv:31},
    {move:"Psych Up",lv:37},{move:"Zen Headbutt",lv:44},{move:"Amnesia",lv:50},{move:"Hydro Pump",lv:56},
  ],
  // ── Machop line ─────────────────────────────────────────────────
  "Machop": [
    {move:"Low Kick",lv:1},{move:"Leer",lv:1},{move:"Focus Energy",lv:7},{move:"Karate Chop",lv:10},
    {move:"Foresight",lv:13},{move:"Seismic Toss",lv:19},{move:"Revenge",lv:22},{move:"Vital Throw",lv:25},
    {move:"Submission",lv:31},{move:"Wake-Up Slap",lv:34},{move:"Cross Chop",lv:37},{move:"Scary Face",lv:43},
    {move:"DynamicPunch",lv:46},
  ],
  "Machoke": [
    {move:"Low Kick",lv:1},{move:"Leer",lv:1},{move:"Focus Energy",lv:1},{move:"Focus Energy",lv:7},
    {move:"Karate Chop",lv:10},{move:"Foresight",lv:13},{move:"Seismic Toss",lv:19},{move:"Revenge",lv:22},
    {move:"Vital Throw",lv:25},{move:"Submission",lv:32},{move:"Wake-Up Slap",lv:36},{move:"Cross Chop",lv:40},
    {move:"Scary Face",lv:44},{move:"DynamicPunch",lv:51},
  ],
  "Machamp": [
    {move:"Low Kick",lv:1},{move:"Leer",lv:1},{move:"Focus Energy",lv:1},{move:"Focus Energy",lv:7},
    {move:"Karate Chop",lv:10},{move:"Foresight",lv:13},{move:"Seismic Toss",lv:19},{move:"Revenge",lv:22},
    {move:"Vital Throw",lv:25},{move:"Submission",lv:32},{move:"Wake-Up Slap",lv:36},{move:"Cross Chop",lv:40},
    {move:"Scary Face",lv:44},{move:"DynamicPunch",lv:51},
  ],
  // ── Tyrogue line ────────────────────────────────────────────────
  "Tyrogue": [ {move:"Tackle",lv:1},{move:"Helping Hand",lv:1},{move:"Fake Out",lv:1},{move:"Foresight",lv:1} ],
  "Hitmonlee": [
    {move:"Double Kick",lv:1},{move:"Revenge",lv:1},{move:"Meditate",lv:5},{move:"Rolling Kick",lv:9},
    {move:"Jump Kick",lv:13},{move:"Brick Break",lv:17},{move:"Focus Energy",lv:21},{move:"Feint",lv:25},
    {move:"Hi Jump Kick",lv:29},{move:"Mind Reader",lv:33},{move:"Foresight",lv:37},{move:"Blaze Kick",lv:41},
    {move:"Endure",lv:45},{move:"Mega Kick",lv:49},{move:"Close Combat",lv:53},{move:"Reversal",lv:57},
  ],
  "Hitmonchan": [
    {move:"Comet Punch",lv:1},{move:"Revenge",lv:1},{move:"Agility",lv:6},{move:"Pursuit",lv:11},
    {move:"Bullet Punch",lv:16},{move:"Mach Punch",lv:16},{move:"Feint",lv:21},{move:"Vacuum Wave",lv:26},
    {move:"Fire Punch",lv:31},{move:"Ice Punch",lv:31},{move:"ThunderPunch",lv:31},{move:"Sky Uppercut",lv:36},
    {move:"Mega Punch",lv:41},{move:"Detect",lv:46},{move:"Counter",lv:51},{move:"Close Combat",lv:56},
  ],
  "Hitmontop": [
    {move:"Revenge",lv:1},{move:"Rolling Kick",lv:1},{move:"Focus Energy",lv:6},{move:"Pursuit",lv:10},
    {move:"Quick Attack",lv:15},{move:"Triple Kick",lv:19},{move:"Rapid Spin",lv:24},{move:"Counter",lv:28},
    {move:"Feint",lv:33},{move:"Agility",lv:37},{move:"Gyro Ball",lv:42},{move:"Detect",lv:46},
    {move:"Close Combat",lv:51},{move:"Endeavor",lv:55},
  ],
  // ── Girafarig ───────────────────────────────────────────────────
  "Girafarig": [
    {move:"Power Swap",lv:1},{move:"Guard Swap",lv:1},{move:"Astonish",lv:1},{move:"Tackle",lv:1},
    {move:"Growl",lv:1},{move:"Confusion",lv:1},{move:"Odor Sleuth",lv:5},{move:"Stomp",lv:10},
    {move:"Agility",lv:14},{move:"Psybeam",lv:19},{move:"Baton Pass",lv:23},{move:"Assurance",lv:28},
    {move:"Double Hit",lv:32},{move:"Psychic",lv:37},{move:"Zen Headbutt",lv:41},{move:"Crunch",lv:46},
  ],
  // ── Tauros + Miltank ────────────────────────────────────────────
  "Tauros": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:3},{move:"Rage",lv:5},{move:"Horn Attack",lv:8},
    {move:"Scary Face",lv:11},{move:"Pursuit",lv:15},{move:"Rest",lv:19},{move:"Payback",lv:24},
    {move:"Zen Headbutt",lv:29},{move:"Take Down",lv:35},{move:"Swagger",lv:41},{move:"Thrash",lv:48},
    {move:"Giga Impact",lv:55},
  ],
  "Miltank": [
    {move:"Tackle",lv:1},{move:"Growl",lv:3},{move:"Defense Curl",lv:5},{move:"Stomp",lv:8},
    {move:"Milk Drink",lv:11},{move:"Bide",lv:15},{move:"Rollout",lv:19},{move:"Body Slam",lv:24},
    {move:"Zen Headbutt",lv:29},{move:"Captivate",lv:35},{move:"Gyro Ball",lv:41},{move:"Heal Bell",lv:48},
    {move:"Wake-Up Slap",lv:55},
  ],
  // ── Magby line ──────────────────────────────────────────────────
  "Magby": [
    {move:"Leer",lv:1},{move:"Smog",lv:1},{move:"Ember",lv:7},{move:"SmokeScreen",lv:10},
    {move:"Faint Attack",lv:16},{move:"Fire Spin",lv:19},{move:"Confuse Ray",lv:25},{move:"Fire Punch",lv:28},
    {move:"Lava Plume",lv:34},{move:"Flamethrower",lv:37},{move:"Sunny Day",lv:43},{move:"Fire Blast",lv:46},
  ],
  "Magmar": [
    {move:"Smog",lv:1},{move:"Leer",lv:1},{move:"Ember",lv:1},{move:"Ember",lv:7},
    {move:"SmokeScreen",lv:10},{move:"Faint Attack",lv:16},{move:"Fire Spin",lv:19},{move:"Confuse Ray",lv:25},
    {move:"Fire Punch",lv:28},{move:"Lava Plume",lv:36},{move:"Flamethrower",lv:41},{move:"Sunny Day",lv:49},
    {move:"Fire Blast",lv:54},
  ],

  // ── Additional / non-65-group Pokémon ────────────────────────────────────────
  // ── Smoochum / Jynx ──────────────────────────────────────────────────────────
  "Smoochum": [
    {move:"Pound",lv:1},{move:"Lick",lv:1},{move:"Lovely Kiss",lv:1},{move:"Powder Snow",lv:1},
    {move:"Lick",lv:5},{move:"Lovely Kiss",lv:8},{move:"Powder Snow",lv:11},{move:"DoubleSlap",lv:15},
    {move:"Ice Punch",lv:18},{move:"Mean Look",lv:21},{move:"Fake Tears",lv:25},{move:"Wake-Up Slap",lv:28},
    {move:"Avalanche",lv:33},{move:"Body Slam",lv:38},{move:"Perish Song",lv:41},{move:"Blizzard",lv:45},
  ],
  "Jynx": [
    {move:"Pound",lv:1},{move:"Lick",lv:1},{move:"Lovely Kiss",lv:1},{move:"Powder Snow",lv:1},
    {move:"Lick",lv:5},{move:"Lovely Kiss",lv:8},{move:"Powder Snow",lv:11},{move:"DoubleSlap",lv:15},
    {move:"Ice Punch",lv:18},{move:"Mean Look",lv:21},{move:"Fake Tears",lv:25},{move:"Wake-Up Slap",lv:28},
    {move:"Avalanche",lv:33},{move:"Body Slam",lv:39},{move:"Wring Out",lv:44},{move:"Perish Song",lv:49},{move:"Blizzard",lv:55},
  ],
  // ── Elekid / Electabuzz ──────────────────────────────────────────────────────
  "Elekid": [
    {move:"Quick Attack",lv:1},{move:"Leer",lv:1},{move:"ThunderShock",lv:7},{move:"Low Kick",lv:10},
    {move:"Swift",lv:16},{move:"Shock Wave",lv:19},{move:"Light Screen",lv:25},{move:"ThunderPunch",lv:28},
    {move:"Discharge",lv:34},{move:"Thunderbolt",lv:37},{move:"Screech",lv:43},{move:"Thunder",lv:46},
  ],
  "Electabuzz": [
    {move:"Quick Attack",lv:1},{move:"Leer",lv:1},{move:"ThunderShock",lv:1},
    {move:"ThunderShock",lv:7},{move:"Low Kick",lv:10},{move:"Swift",lv:16},{move:"Shock Wave",lv:19},
    {move:"Light Screen",lv:25},{move:"ThunderPunch",lv:28},{move:"Discharge",lv:37},
    {move:"Thunderbolt",lv:43},{move:"Screech",lv:52},{move:"Thunder",lv:58},
  ],
  // ── Mr. Mime / Smeargle ──────────────────────────────────────────────────────
  "Mr. Mime": [
    {move:"Magical Leaf",lv:1},{move:"Power Swap",lv:1},{move:"Guard Swap",lv:1},{move:"Barrier",lv:1},{move:"Confusion",lv:1},
    {move:"Copycat",lv:4},{move:"Meditate",lv:8},{move:"Encore",lv:11},{move:"DoubleSlap",lv:15},{move:"Mimic",lv:18},
    {move:"Light Screen",lv:22},{move:"Reflect",lv:22},{move:"Psybeam",lv:25},{move:"Substitute",lv:29},
    {move:"Recycle",lv:32},{move:"Trick",lv:36},{move:"Psychic",lv:39},{move:"Role Play",lv:43},
    {move:"Baton Pass",lv:46},{move:"Safeguard",lv:50},
  ],
  "Smeargle": [],
  // ── Farfetch’d ───────────────────────────────────────────────────────────────
  "Farfetch’d": [
    {move:"Poison Jab",lv:1},{move:"Peck",lv:1},{move:"Sand-Attack",lv:1},{move:"Leer",lv:1},{move:"Fury Cutter",lv:1},
    {move:"Fury Attack",lv:7},{move:"Knock Off",lv:9},{move:"Aerial Ace",lv:13},{move:"Slash",lv:19},
    {move:"Air Cutter",lv:21},{move:"Swords Dance",lv:25},{move:"Agility",lv:31},{move:"Night Slash",lv:33},
    {move:"Air Slash",lv:37},{move:"Feint",lv:43},{move:"False Swipe",lv:43},
  ],
  // ── Natu / Xatu ──────────────────────────────────────────────────────────────
  "Natu": [
    {move:"Peck",lv:1},{move:"Leer",lv:1},{move:"Night Shade",lv:6},{move:"Teleport",lv:9},
    {move:"Lucky Chant",lv:12},{move:"Miracle Eye",lv:17},{move:"Me First",lv:20},{move:"Confuse Ray",lv:23},
    {move:"Wish",lv:28},{move:"Psycho Shift",lv:33},{move:"Future Sight",lv:36},{move:"Ominous Wind",lv:39},
    {move:"Power Swap",lv:44},{move:"Guard Swap",lv:44},{move:"Psychic",lv:47},
  ],
  "Xatu": [
    {move:"Peck",lv:1},{move:"Leer",lv:1},{move:"Night Shade",lv:6},{move:"Teleport",lv:9},
    {move:"Lucky Chant",lv:12},{move:"Miracle Eye",lv:17},{move:"Me First",lv:20},{move:"Confuse Ray",lv:23},
    {move:"Tailwind",lv:27},{move:"Wish",lv:30},{move:"Psycho Shift",lv:37},{move:"Future Sight",lv:42},
    {move:"Ominous Wind",lv:47},{move:"Power Swap",lv:54},{move:"Guard Swap",lv:54},{move:"Psychic",lv:59},
  ],
  // ── Qwilfish ─────────────────────────────────────────────────────────────────
  "Qwilfish": [
    {move:"Spikes",lv:1},{move:"Tackle",lv:1},{move:"Poison Sting",lv:1},{move:"Harden",lv:9},{move:"Minimize",lv:9},
    {move:"Water Gun",lv:13},{move:"Rollout",lv:17},{move:"Toxic Spikes",lv:21},{move:"Stockpile",lv:25},
    {move:"Spit Up",lv:25},{move:"Revenge",lv:29},{move:"Brine",lv:33},{move:"Pin Missile",lv:37},
    {move:"Take Down",lv:41},{move:"Aqua Tail",lv:45},{move:"Poison Jab",lv:49},{move:"Destiny Bond",lv:53},{move:"Hydro Pump",lv:57},
  ],
  // ── Tentacool / Tentacruel ───────────────────────────────────────────────────
  "Tentacool": [
    {move:"Poison Sting",lv:1},{move:"Supersonic",lv:5},{move:"Constrict",lv:8},{move:"Acid",lv:12},
    {move:"Toxic Spikes",lv:15},{move:"BubbleBeam",lv:19},{move:"Wrap",lv:22},{move:"Barrier",lv:26},
    {move:"Water Pulse",lv:29},{move:"Poison Jab",lv:33},{move:"Screech",lv:36},{move:"Hydro Pump",lv:40},{move:"Wring Out",lv:43},
  ],
  "Tentacruel": [
    {move:"Poison Sting",lv:1},{move:"Supersonic",lv:1},{move:"Constrict",lv:1},
    {move:"Supersonic",lv:5},{move:"Constrict",lv:8},{move:"Acid",lv:12},{move:"Toxic Spikes",lv:15},
    {move:"BubbleBeam",lv:19},{move:"Wrap",lv:22},{move:"Barrier",lv:26},{move:"Water Pulse",lv:29},
    {move:"Poison Jab",lv:36},{move:"Screech",lv:42},{move:"Hydro Pump",lv:49},{move:"Wring Out",lv:55},
  ],
  // ── Krabby / Kingler ─────────────────────────────────────────────────────────
  "Krabby": [
    {move:"Mud Sport",lv:1},{move:"Bubble",lv:1},{move:"ViceGrip",lv:5},{move:"Leer",lv:9},{move:"Harden",lv:11},
    {move:"BubbleBeam",lv:15},{move:"Mud Shot",lv:19},{move:"Metal Claw",lv:21},{move:"Stomp",lv:25},
    {move:"Protect",lv:29},{move:"Guillotine",lv:31},{move:"Slam",lv:35},{move:"Brine",lv:39},{move:"Crabhammer",lv:41},{move:"Flail",lv:45},
  ],
  "Kingler": [
    {move:"Mud Sport",lv:1},{move:"Bubble",lv:1},{move:"ViceGrip",lv:1},
    {move:"ViceGrip",lv:5},{move:"Leer",lv:9},{move:"Harden",lv:11},{move:"BubbleBeam",lv:15},
    {move:"Mud Shot",lv:19},{move:"Metal Claw",lv:21},{move:"Stomp",lv:25},{move:"Protect",lv:32},
    {move:"Guillotine",lv:37},{move:"Slam",lv:44},{move:"Brine",lv:51},{move:"Crabhammer",lv:56},{move:"Flail",lv:63},
  ],
  "Shuckle": [
    {move:"Constrict",lv:1},{move:"Withdraw",lv:1},{move:"Bide",lv:9},{move:"Encore",lv:14},
    {move:"Safeguard",lv:22},{move:"Wrap",lv:27},{move:"Rest",lv:35},{move:"Gastro Acid",lv:40},
    {move:"Bug Bite",lv:40},{move:"Power Trick",lv:48},
  ],
  // ── Staryu / Starmie ─────────────────────────────────────────────────────────
  "Staryu": [
    {move:"Tackle",lv:1},{move:"Harden",lv:1},{move:"Water Gun",lv:6},{move:"Rapid Spin",lv:10},
    {move:"Recover",lv:15},{move:"Camouflage",lv:19},{move:"Swift",lv:24},{move:"BubbleBeam",lv:28},
    {move:"Minimize",lv:33},{move:"Gyro Ball",lv:37},{move:"Light Screen",lv:42},{move:"Power Gem",lv:46},
    {move:"Cosmic Power",lv:51},{move:"Hydro Pump",lv:55},
  ],
  "Starmie": [
    {move:"Water Gun",lv:1},{move:"Rapid Spin",lv:1},{move:"Recover",lv:1},{move:"Swift",lv:1},{move:"Confuse Ray",lv:28},
  ],
  // ── Shellder / Cloyster ──────────────────────────────────────────────────────
  "Shellder": [
    {move:"Tackle",lv:1},{move:"Withdraw",lv:4},{move:"Supersonic",lv:8},{move:"Icicle Spear",lv:13},
    {move:"Protect",lv:16},{move:"Leer",lv:20},{move:"Clamp",lv:25},{move:"Ice Shard",lv:28},
    {move:"Aurora Beam",lv:32},{move:"Whirlpool",lv:37},{move:"Iron Defense",lv:40},{move:"Brine",lv:44},{move:"Ice Beam",lv:49},
  ],
  "Cloyster": [
    {move:"Toxic Spikes",lv:1},{move:"Withdraw",lv:1},{move:"Supersonic",lv:1},{move:"Aurora Beam",lv:1},{move:"Protect",lv:1},
    {move:"Spikes",lv:28},{move:"Spike Cannon",lv:40},
  ],
  // ── Corsola / Remoraid / Octillery ───────────────────────────────────────────
  "Corsola": [
    {move:"Tackle",lv:1},{move:"Harden",lv:4},{move:"Bubble",lv:8},{move:"Recover",lv:13},
    {move:"Refresh",lv:16},{move:"Rock Blast",lv:20},{move:"BubbleBeam",lv:25},{move:"Lucky Chant",lv:28},
    {move:"AncientPower",lv:32},{move:"Aqua Ring",lv:37},{move:"Spike Cannon",lv:40},{move:"Power Gem",lv:44},
    {move:"Mirror Coat",lv:48},{move:"Earth Power",lv:53},
  ],
  "Remoraid": [
    {move:"Water Gun",lv:1},{move:"Lock-On",lv:6},{move:"Psybeam",lv:10},{move:"Aurora Beam",lv:14},
    {move:"BubbleBeam",lv:19},{move:"Focus Energy",lv:23},{move:"Bullet Seed",lv:27},{move:"Water Pulse",lv:32},
    {move:"Signal Beam",lv:36},{move:"Ice Beam",lv:40},{move:"Hyper Beam",lv:45},
  ],
  "Octillery": [
    {move:"Gunk Shot",lv:1},{move:"Rock Blast",lv:1},{move:"Water Gun",lv:1},{move:"Constrict",lv:1},
    {move:"Psybeam",lv:1},{move:"Aurora Beam",lv:1},{move:"Constrict",lv:6},{move:"Psybeam",lv:10},
    {move:"Aurora Beam",lv:14},{move:"BubbleBeam",lv:19},{move:"Focus Energy",lv:23},{move:"Octazooka",lv:25},
    {move:"Bullet Seed",lv:29},{move:"Wring Out",lv:36},{move:"Signal Beam",lv:42},{move:"Ice Beam",lv:48},
    {move:"Hyper Beam",lv:55},
  ],
  // ── Chinchou / Lanturn ───────────────────────────────────────────────────────
  "Chinchou": [
    {move:"Bubble",lv:1},{move:"Supersonic",lv:1},{move:"Thunder Wave",lv:6},{move:"Flail",lv:9},
    {move:"Water Gun",lv:12},{move:"Confuse Ray",lv:17},{move:"Spark",lv:20},{move:"Take Down",lv:23},
    {move:"BubbleBeam",lv:28},{move:"Signal Beam",lv:31},{move:"Discharge",lv:34},{move:"Aqua Ring",lv:39},
    {move:"Hydro Pump",lv:42},{move:"Charge",lv:45},
  ],
  "Lanturn": [
    {move:"Bubble",lv:1},{move:"Supersonic",lv:1},{move:"Thunder Wave",lv:1},{move:"Thunder Wave",lv:6},
    {move:"Flail",lv:9},{move:"Water Gun",lv:12},{move:"Confuse Ray",lv:17},{move:"Spark",lv:20},
    {move:"Take Down",lv:23},{move:"Stockpile",lv:27},{move:"Swallow",lv:27},{move:"Spit Up",lv:27},
    {move:"BubbleBeam",lv:30},{move:"Signal Beam",lv:35},{move:"Discharge",lv:40},{move:"Aqua Ring",lv:47},
    {move:"Hydro Pump",lv:52},{move:"Charge",lv:57},
  ],
  // ── Seel / Dewgong ───────────────────────────────────────────────────────────
  "Seel": [
    {move:"Headbutt",lv:1},{move:"Growl",lv:3},{move:"Water Sport",lv:7},{move:"Icy Wind",lv:11},
    {move:"Encore",lv:13},{move:"Ice Shard",lv:17},{move:"Rest",lv:21},{move:"Aqua Ring",lv:23},
    {move:"Aurora Beam",lv:27},{move:"Aqua Jet",lv:31},{move:"Brine",lv:33},{move:"Take Down",lv:37},
    {move:"Dive",lv:41},{move:"Aqua Tail",lv:43},{move:"Ice Beam",lv:47},{move:"Safeguard",lv:51},
  ],
  "Dewgong": [
    {move:"Headbutt",lv:1},{move:"Growl",lv:1},{move:"Signal Beam",lv:1},{move:"Icy Wind",lv:1},
    {move:"Growl",lv:3},{move:"Signal Beam",lv:7},{move:"Icy Wind",lv:11},{move:"Encore",lv:13},
    {move:"Ice Shard",lv:17},{move:"Rest",lv:21},{move:"Aqua Ring",lv:23},{move:"Aurora Beam",lv:27},
    {move:"Aqua Jet",lv:31},{move:"Brine",lv:33},{move:"Sheer Cold",lv:34},{move:"Take Down",lv:37},
    {move:"Dive",lv:41},{move:"Aqua Tail",lv:43},{move:"Ice Beam",lv:47},{move:"Safeguard",lv:51},
  ],
  // ── Lickitung / Lickilicky ───────────────────────────────────────────────────
  "Lickitung": [
    {move:"Lick",lv:1},{move:"Supersonic",lv:5},{move:"Defense Curl",lv:9},{move:"Knock Off",lv:13},
    {move:"Wrap",lv:17},{move:"Stomp",lv:21},{move:"Disable",lv:25},{move:"Slam",lv:29},
    {move:"Rollout",lv:33},{move:"Me First",lv:37},{move:"Refresh",lv:41},{move:"Screech",lv:45},
    {move:"Power Whip",lv:49},{move:"Wring Out",lv:53},
  ],
  "Lickilicky":[ {move:"Body Slam",   lv:25}, {move:"Hyper Voice",  lv:37}, {move:"Power Whip",   lv:57} ],
  // ── Tangela / Tangrowth ──────────────────────────────────────────────────────
  "Tangela": [
    {move:"Ingrain",lv:1},{move:"Constrict",lv:1},{move:"Sleep Powder",lv:5},{move:"Absorb",lv:8},
    {move:"Growth",lv:12},{move:"PoisonPowder",lv:15},{move:"Vine Whip",lv:19},{move:"Bind",lv:22},
    {move:"Mega Drain",lv:26},{move:"Stun Spore",lv:29},{move:"AncientPower",lv:33},{move:"Knock Off",lv:36},
    {move:"Natural Gift",lv:40},{move:"Slam",lv:43},{move:"Tickle",lv:47},{move:"Wring Out",lv:50},
    {move:"Power Whip",lv:54},
  ],
  "Tangrowth": [ {move:"Giga Drain",   lv:29}, {move:"AncientPower", lv:36}, {move:"Power Whip",   lv:50} ],
  // ── Eevee evolutions ─────────────────────────────────────────────────────────
  "Eevee": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Helping Hand",lv:1},{move:"Sand-Attack",lv:8},
    {move:"Growl",lv:15},{move:"Quick Attack",lv:22},{move:"Bite",lv:29},{move:"Baton Pass",lv:36},
    {move:"Take Down",lv:43},{move:"Last Resort",lv:50},{move:"Trump Card",lv:57},
  ],
  "Vaporeon": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Helping Hand",lv:1},{move:"Sand-Attack",lv:8},
    {move:"Water Gun",lv:15},{move:"Quick Attack",lv:22},{move:"Bite",lv:29},{move:"Aurora Beam",lv:36},
    {move:"Aqua Ring",lv:43},{move:"Last Resort",lv:50},{move:"Haze",lv:57},{move:"Acid Armor",lv:64},
    {move:"Hydro Pump",lv:71},{move:"Muddy Water",lv:78},
  ],
  "Jolteon": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Helping Hand",lv:1},{move:"Sand-Attack",lv:8},
    {move:"ThunderShock",lv:15},{move:"Quick Attack",lv:22},{move:"Double Kick",lv:29},{move:"Pin Missile",lv:36},
    {move:"Thunder Fang",lv:43},{move:"Last Resort",lv:50},{move:"Thunder Wave",lv:57},{move:"Agility",lv:64},
    {move:"Thunder",lv:71},{move:"Discharge",lv:78},
  ],
  "Flareon": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Helping Hand",lv:1},{move:"Sand-Attack",lv:8},
    {move:"Ember",lv:15},{move:"Quick Attack",lv:22},{move:"Bite",lv:29},{move:"Fire Spin",lv:36},
    {move:"Fire Fang",lv:43},{move:"Last Resort",lv:50},{move:"Smog",lv:57},{move:"Scary Face",lv:64},
    {move:"Fire Blast",lv:71},{move:"Lava Plume",lv:78},
  ],
  "Espeon": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Helping Hand",lv:1},{move:"Sand-Attack",lv:8},
    {move:"Confusion",lv:15},{move:"Quick Attack",lv:22},{move:"Swift",lv:29},{move:"Psybeam",lv:36},
    {move:"Future Sight",lv:43},{move:"Last Resort",lv:50},{move:"Psych Up",lv:57},{move:"Psychic",lv:64},
    {move:"Morning Sun",lv:71},{move:"Power Swap",lv:78},
  ],
  "Umbreon": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Helping Hand",lv:1},{move:"Sand-Attack",lv:8},
    {move:"Pursuit",lv:15},{move:"Quick Attack",lv:22},{move:"Confuse Ray",lv:29},{move:"Faint Attack",lv:36},
    {move:"Assurance",lv:43},{move:"Last Resort",lv:50},{move:"Mean Look",lv:57},{move:"Screech",lv:64},
    {move:"Moonlight",lv:71},{move:"Guard Swap",lv:78},
  ],
  // ── Horsea line ──────────────────────────────────────────────────────────────
  "Horsea": [
    {move:"Bubble",lv:1},{move:"SmokeScreen",lv:4},{move:"Leer",lv:8},{move:"Water Gun",lv:11},
    {move:"Focus Energy",lv:14},{move:"BubbleBeam",lv:18},{move:"Agility",lv:23},{move:"Twister",lv:26},
    {move:"Brine",lv:30},{move:"Hydro Pump",lv:35},{move:"Dragon Dance",lv:38},{move:"Dragon Pulse",lv:42},
  ],
  "Seadra": [
    {move:"Bubble",lv:1},{move:"SmokeScreen",lv:1},{move:"Leer",lv:1},{move:"Water Gun",lv:1},
    {move:"SmokeScreen",lv:4},{move:"Leer",lv:8},{move:"Water Gun",lv:11},{move:"Focus Energy",lv:14},
    {move:"BubbleBeam",lv:18},{move:"Agility",lv:23},{move:"Twister",lv:26},{move:"Brine",lv:30},
    {move:"Hydro Pump",lv:40},{move:"Dragon Dance",lv:48},{move:"Dragon Pulse",lv:57},
  ],
  "Kingdra": [
    {move:"Yawn",lv:1},{move:"Bubble",lv:1},{move:"SmokeScreen",lv:1},{move:"Leer",lv:1},
    {move:"Water Gun",lv:1},{move:"SmokeScreen",lv:4},{move:"Leer",lv:8},{move:"Water Gun",lv:11},
    {move:"Focus Energy",lv:14},{move:"BubbleBeam",lv:18},{move:"Agility",lv:23},{move:"Twister",lv:26},
    {move:"Brine",lv:30},{move:"Hydro Pump",lv:40},{move:"Dragon Dance",lv:48},{move:"Dragon Pulse",lv:57},
  ],
  // ── Gligar / Delibird ────────────────────────────────────────────────────────
  "Gligar": [
    {move:"Poison Sting",lv:1},{move:"Sand-Attack",lv:5},{move:"Harden",lv:9},{move:"Knock Off",lv:12},
    {move:"Quick Attack",lv:16},{move:"Fury Cutter",lv:20},{move:"Faint Attack",lv:23},{move:"Screech",lv:27},
    {move:"Slash",lv:31},{move:"Swords Dance",lv:34},{move:"U-turn",lv:38},{move:"X-Scissor",lv:42},
    {move:"Guillotine",lv:45},
  ],
  "Delibird": [ {move:"Present",lv:1} ],
  // ── Swinub / Piloswine / Mamoswine ──────────────────────────────────────────
  "Swinub": [
    {move:"Tackle",lv:1},{move:"Odor Sleuth",lv:1},{move:"Mud Sport",lv:4},{move:"Powder Snow",lv:8},
    {move:"Mud-Slap",lv:13},{move:"Endure",lv:16},{move:"Mud Bomb",lv:20},{move:"Icy Wind",lv:25},
    {move:"Ice Shard",lv:28},{move:"Take Down",lv:32},{move:"Earthquake",lv:37},{move:"Mist",lv:40},
    {move:"Blizzard",lv:44},{move:"Amnesia",lv:49},
  ],
  "Piloswine": [
    {move:"AncientPower",lv:1},{move:"Peck",lv:1},{move:"Odor Sleuth",lv:1},{move:"Mud Sport",lv:1},
    {move:"Powder Snow",lv:1},{move:"Mud Sport",lv:4},{move:"Powder Snow",lv:8},{move:"Mud-Slap",lv:13},
    {move:"Endure",lv:16},{move:"Mud Bomb",lv:20},{move:"Icy Wind",lv:25},{move:"Ice Fang",lv:28},
    {move:"Take Down",lv:32},{move:"Fury Attack",lv:33},{move:"Earthquake",lv:40},{move:"Mist",lv:48},
    {move:"Blizzard",lv:56},{move:"Amnesia",lv:65},
  ],
  "Mamoswine": [ {move:"Ice Fang",     lv:1},  {move:"Ice Shard",    lv:1},  {move:"Earthquake",   lv:52}, {move:"Superpower",   lv:62} ],
  // ── Teddiursa / Ursaring ─────────────────────────────────────────────────────
  "Teddiursa": [
    {move:"Covet",lv:1},{move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Lick",lv:1},
    {move:"Fake Tears",lv:1},{move:"Fury Swipes",lv:8},{move:"Faint Attack",lv:15},{move:"Sweet Scent",lv:22},
    {move:"Slash",lv:29},{move:"Charm",lv:36},{move:"Rest",lv:43},{move:"Snore",lv:43},
    {move:"Thrash",lv:50},{move:"Fling",lv:57},
  ],
  "Ursaring": [
    {move:"Covet",lv:1},{move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Lick",lv:1},
    {move:"Fake Tears",lv:1},{move:"Fury Swipes",lv:8},{move:"Faint Attack",lv:15},{move:"Sweet Scent",lv:22},
    {move:"Slash",lv:29},{move:"Scary Face",lv:38},{move:"Rest",lv:47},{move:"Snore",lv:49},
    {move:"Thrash",lv:58},{move:"Hammer Arm",lv:67},
  ],
  // ── Phanpy / Donphan ─────────────────────────────────────────────────────────
  "Phanpy": [
    {move:"Odor Sleuth",lv:1},{move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Defense Curl",lv:1},
    {move:"Flail",lv:6},{move:"Take Down",lv:10},{move:"Rollout",lv:15},{move:"Natural Gift",lv:19},
    {move:"Slam",lv:24},{move:"Endure",lv:28},{move:"Charm",lv:33},{move:"Last Resort",lv:37},
    {move:"Double-Edge",lv:42},
  ],
  "Donphan": [
    {move:"Thunder Fang",lv:1},{move:"Fire Fang",lv:1},{move:"Horn Attack",lv:1},{move:"Growl",lv:1},
    {move:"Defense Curl",lv:1},{move:"Flail",lv:1},{move:"Rapid Spin",lv:6},{move:"Knock Off",lv:10},
    {move:"Rollout",lv:15},{move:"Magnitude",lv:19},{move:"Slam",lv:24},{move:"Fury Attack",lv:25},
    {move:"Assurance",lv:31},{move:"Scary Face",lv:39},{move:"Earthquake",lv:46},{move:"Giga Impact",lv:54},
  ],
  // ── Mantine / Skarmory ───────────────────────────────────────────────────────
  "Mantine": [
    {move:"Psybeam",lv:1},{move:"Bullet Seed",lv:1},{move:"Signal Beam",lv:1},{move:"Tackle",lv:1},
    {move:"Bubble",lv:1},{move:"Supersonic",lv:1},{move:"BubbleBeam",lv:1},{move:"Supersonic",lv:4},
    {move:"BubbleBeam",lv:10},{move:"Headbutt",lv:13},{move:"Agility",lv:19},{move:"Wing Attack",lv:22},
    {move:"Water Pulse",lv:28},{move:"Take Down",lv:31},{move:"Confuse Ray",lv:37},{move:"Bounce",lv:40},
    {move:"Aqua Ring",lv:46},{move:"Hydro Pump",lv:49},
  ],
  "Skarmory": [
    {move:"Leer",lv:1},{move:"Peck",lv:1},{move:"Sand-Attack",lv:6},{move:"Swift",lv:9},
    {move:"Agility",lv:12},{move:"Fury Attack",lv:17},{move:"Feint",lv:20},{move:"Air Cutter",lv:23},
    {move:"Spikes",lv:28},{move:"Metal Sound",lv:31},{move:"Steel Wing",lv:34},{move:"Air Slash",lv:39},
    {move:"Slash",lv:42},{move:"Night Slash",lv:45},
  ],
  // ── Doduo / Dodrio ───────────────────────────────────────────────────────────
  "Doduo": [
    {move:"Peck",lv:1},{move:"Growl",lv:1},{move:"Quick Attack",lv:5},{move:"Rage",lv:10},
    {move:"Fury Attack",lv:14},{move:"Pursuit",lv:19},{move:"Uproar",lv:23},{move:"Acupressure",lv:28},
    {move:"Double Hit",lv:32},{move:"Agility",lv:37},{move:"Drill Peck",lv:41},{move:"Endeavor",lv:46},
  ],
  "Dodrio": [
    {move:"Pluck",lv:1},{move:"Peck",lv:1},{move:"Growl",lv:1},{move:"Quick Attack",lv:1},
    {move:"Rage",lv:1},{move:"Quick Attack",lv:5},{move:"Rage",lv:10},{move:"Fury Attack",lv:14},
    {move:"Pursuit",lv:19},{move:"Uproar",lv:23},{move:"Acupressure",lv:28},{move:"Tri Attack",lv:34},
    {move:"Agility",lv:41},{move:"Drill Peck",lv:47},{move:"Endeavor",lv:54},
  ],
  // ── Ponyta / Rapidash ────────────────────────────────────────────────────────
  "Ponyta": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Tail Whip",lv:6},{move:"Ember",lv:10},
    {move:"Flame Wheel",lv:15},{move:"Stomp",lv:19},{move:"Fire Spin",lv:24},{move:"Take Down",lv:28},
    {move:"Agility",lv:33},{move:"Fire Blast",lv:37},{move:"Bounce",lv:42},{move:"Flare Blitz",lv:46},
  ],
  "Rapidash": [
    {move:"Megahorn",lv:1},{move:"Poison Jab",lv:1},{move:"Quick Attack",lv:1},{move:"Growl",lv:1},
    {move:"Tail Whip",lv:1},{move:"Ember",lv:1},{move:"Tail Whip",lv:6},{move:"Ember",lv:10},
    {move:"Flame Wheel",lv:15},{move:"Stomp",lv:19},{move:"Fire Spin",lv:24},{move:"Take Down",lv:28},
    {move:"Agility",lv:33},{move:"Fire Blast",lv:37},{move:"Fury Attack",lv:40},{move:"Bounce",lv:47},
    {move:"Flare Blitz",lv:56},
  ],
  // ── Cubone / Marowak ─────────────────────────────────────────────────────────
  "Cubone": [
    {move:"Growl",lv:1},{move:"Tail Whip",lv:3},{move:"Bone Club",lv:7},{move:"Headbutt",lv:11},
    {move:"Leer",lv:13},{move:"Focus Energy",lv:17},{move:"Bonemerang",lv:21},{move:"Rage",lv:23},
    {move:"False Swipe",lv:27},{move:"Thrash",lv:31},{move:"Fling",lv:33},{move:"Bone Rush",lv:37},
    {move:"Endeavor",lv:41},{move:"Double-Edge",lv:43},
  ],
  "Marowak": [
    {move:"Growl",lv:1},{move:"Tail Whip",lv:1},{move:"Bone Club",lv:1},{move:"Headbutt",lv:1},
    {move:"Tail Whip",lv:3},{move:"Bone Club",lv:7},{move:"Headbutt",lv:11},{move:"Leer",lv:13},
    {move:"Focus Energy",lv:17},{move:"Bonemerang",lv:21},{move:"Rage",lv:23},{move:"False Swipe",lv:27},
    {move:"Thrash",lv:33},{move:"Fling",lv:37},{move:"Bone Rush",lv:43},{move:"Endeavor",lv:49},
    {move:"Double-Edge",lv:53},
  ],
  // ── Kangaskhan ───────────────────────────────────────────────────────────────
  "Kangaskhan": [
    {move:"Comet Punch",lv:1},{move:"Leer",lv:1},{move:"Fake Out",lv:7},{move:"Tail Whip",lv:10},
    {move:"Bite",lv:13},{move:"Mega Punch",lv:19},{move:"Rage",lv:22},{move:"Dizzy Punch",lv:25},
    {move:"Crunch",lv:31},{move:"Endure",lv:34},{move:"Outrage",lv:37},{move:"Double Hit",lv:43},
    {move:"Sucker Punch",lv:46},{move:"Reversal",lv:49},
  ],
  // ── Rhyhorn / Rhydon ─────────────────────────────────────────────────────────
  "Rhyhorn": [
    {move:"Horn Attack",lv:1},{move:"Tail Whip",lv:1},{move:"Stomp",lv:9},{move:"Fury Attack",lv:13},
    {move:"Scary Face",lv:21},{move:"Rock Blast",lv:25},{move:"Take Down",lv:33},{move:"Horn Drill",lv:37},
    {move:"Stone Edge",lv:45},{move:"Earthquake",lv:49},{move:"Megahorn",lv:57},
  ],
  "Rhydon": [
    {move:"Horn Attack",lv:1},{move:"Tail Whip",lv:1},{move:"Stomp",lv:1},{move:"Fury Attack",lv:1},
    {move:"Stomp",lv:9},{move:"Fury Attack",lv:13},{move:"Scary Face",lv:21},{move:"Rock Blast",lv:25},
    {move:"Take Down",lv:33},{move:"Horn Drill",lv:37},{move:"Hammer Arm",lv:42},{move:"Stone Edge",lv:45},
    {move:"Earthquake",lv:49},{move:"Megahorn",lv:57},
  ],
  // ── Murkrow ──────────────────────────────────────────────────────────────────
  "Murkrow": [
    {move:"Peck",lv:1},{move:"Astonish",lv:1},{move:"Pursuit",lv:5},{move:"Haze",lv:11},
    {move:"Wing Attack",lv:15},{move:"Night Shade",lv:21},{move:"Assurance",lv:25},{move:"Taunt",lv:31},
    {move:"Faint Attack",lv:35},{move:"Mean Look",lv:41},{move:"Sucker Punch",lv:45},
  ],
  // ── Houndour / Houndoom ──────────────────────────────────────────────────────
  "Houndour": [
    {move:"Leer",lv:1},{move:"Ember",lv:1},{move:"Howl",lv:4},{move:"Smog",lv:9},
    {move:"Roar",lv:14},{move:"Bite",lv:17},{move:"Odor Sleuth",lv:22},{move:"Beat Up",lv:27},
    {move:"Fire Fang",lv:30},{move:"Faint Attack",lv:35},{move:"Embargo",lv:40},{move:"Flamethrower",lv:43},
    {move:"Crunch",lv:48},{move:"Nasty Plot",lv:53},
  ],
  "Houndoom": [
    {move:"Thunder Fang",lv:1},{move:"Leer",lv:1},{move:"Ember",lv:1},{move:"Howl",lv:1},
    {move:"Smog",lv:1},{move:"Howl",lv:4},{move:"Smog",lv:9},{move:"Roar",lv:14},
    {move:"Bite",lv:17},{move:"Odor Sleuth",lv:22},{move:"Beat Up",lv:28},{move:"Fire Fang",lv:32},
    {move:"Faint Attack",lv:38},{move:"Embargo",lv:44},{move:"Flamethrower",lv:48},{move:"Crunch",lv:54},
    {move:"Nasty Plot",lv:60},
  ],
  // ── Slugma / Magcargo ────────────────────────────────────────────────────────
  "Slugma": [
    {move:"Smog",lv:1},{move:"Yawn",lv:1},{move:"Ember",lv:8},{move:"Rock Throw",lv:11},
    {move:"Harden",lv:16},{move:"Recover",lv:23},{move:"AncientPower",lv:26},{move:"Amnesia",lv:31},
    {move:"Lava Plume",lv:38},{move:"Rock Slide",lv:41},{move:"Body Slam",lv:46},{move:"Flamethrower",lv:53},
    {move:"Earth Power",lv:56},
  ],
  "Magcargo": [
    {move:"Smog",lv:1},{move:"Yawn",lv:1},{move:"Ember",lv:1},{move:"Rock Throw",lv:1},
    {move:"Ember",lv:8},{move:"Rock Throw",lv:11},{move:"Harden",lv:16},{move:"Recover",lv:23},
    {move:"AncientPower",lv:26},{move:"Amnesia",lv:31},{move:"Lava Plume",lv:40},{move:"Rock Slide",lv:45},
    {move:"Body Slam",lv:52},{move:"Flamethrower",lv:61},{move:"Earth Power",lv:66},
  ],
  // ── Sneasel / Misdreavus ─────────────────────────────────────────────────────
  "Sneasel": [
    {move:"Scratch",lv:1},{move:"Leer",lv:1},{move:"Taunt",lv:1},{move:"Quick Attack",lv:8},
    {move:"Screech",lv:10},{move:"Faint Attack",lv:14},{move:"Fury Swipes",lv:21},{move:"Agility",lv:24},
    {move:"Icy Wind",lv:28},{move:"Slash",lv:35},{move:"Beat Up",lv:38},{move:"Metal Claw",lv:42},
    {move:"Ice Shard",lv:49},
  ],
  "Misdreavus": [
    {move:"Growl",lv:1},{move:"Psywave",lv:1},{move:"Spite",lv:5},{move:"Astonish",lv:10},
    {move:"Confuse Ray",lv:14},{move:"Mean Look",lv:19},{move:"Psybeam",lv:23},{move:"Pain Split",lv:28},
    {move:"Payback",lv:32},{move:"Shadow Ball",lv:37},{move:"Perish Song",lv:41},{move:"Grudge",lv:46},
    {move:"Power Gem",lv:50},
  ],
  // ── Porygon / Porygon2 ───────────────────────────────────────────────────────
  "Porygon": [
    {move:"Tackle",lv:1},{move:"Sharpen",lv:1},{move:"Conversion",lv:1},{move:"Conversion 2",lv:1},
    {move:"Psybeam",lv:7},{move:"Agility",lv:12},{move:"Recover",lv:18},{move:"Magnet Rise",lv:23},
    {move:"Signal Beam",lv:29},{move:"Recycle",lv:34},{move:"Discharge",lv:40},{move:"Lock-On",lv:45},
    {move:"Tri Attack",lv:51},{move:"Magic Coat",lv:56},{move:"Zap Cannon",lv:62},
  ],
  "Porygon2": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:1},{move:"Conversion",lv:1},{move:"Conversion 2",lv:1},
    {move:"Psybeam",lv:7},{move:"Agility",lv:12},{move:"Recover",lv:18},{move:"Magnet Rise",lv:23},
    {move:"Signal Beam",lv:29},{move:"Recycle",lv:34},{move:"Discharge",lv:40},{move:"Lock-On",lv:45},
    {move:"Tri Attack",lv:51},{move:"Magic Coat",lv:56},{move:"Zap Cannon",lv:62},{move:"Hyper Beam",lv:67},
  ],
  // ── Chansey / Blissey ────────────────────────────────────────────────────────
  "Chansey": [
    {move:"Pound",lv:1},{move:"Growl",lv:1},{move:"Tail Whip",lv:5},{move:"Refresh",lv:9},
    {move:"Softboiled",lv:12},{move:"DoubleSlap",lv:16},{move:"Minimize",lv:20},{move:"Sing",lv:23},
    {move:"Fling",lv:27},{move:"Defense Curl",lv:31},{move:"Light Screen",lv:34},{move:"Egg Bomb",lv:38},
    {move:"Healing Wish",lv:42},{move:"Double-Edge",lv:46},
  ],
  "Blissey": [
    {move:"Pound",lv:1},{move:"Growl",lv:1},{move:"Tail Whip",lv:5},{move:"Refresh",lv:9},
    {move:"Softboiled",lv:12},{move:"DoubleSlap",lv:16},{move:"Minimize",lv:20},{move:"Sing",lv:23},
    {move:"Fling",lv:27},{move:"Defense Curl",lv:31},{move:"Light Screen",lv:34},{move:"Egg Bomb",lv:38},
    {move:"Healing Wish",lv:42},{move:"Double-Edge",lv:46},
  ],
  // ── Lapras ───────────────────────────────────────────────────────────────────
  "Lapras": [
    {move:"Water Gun",lv:1},{move:"Growl",lv:1},{move:"Sing",lv:1},{move:"Mist",lv:4},
    {move:"Confuse Ray",lv:7},{move:"Ice Shard",lv:10},{move:"Water Pulse",lv:14},{move:"Body Slam",lv:18},
    {move:"Rain Dance",lv:22},{move:"Perish Song",lv:27},{move:"Ice Beam",lv:32},{move:"Brine",lv:37},
    {move:"Safeguard",lv:43},{move:"Hydro Pump",lv:49},{move:"Sheer Cold",lv:55},
  ],
  // ── Fossils ──────────────────────────────────────────────────────────────────
  "Omanyte": [
    {move:"Constrict",lv:1},{move:"Withdraw",lv:1},{move:"Bite",lv:7},{move:"Water Gun",lv:10},
    {move:"Rollout",lv:16},{move:"Leer",lv:19},{move:"Mud Shot",lv:25},{move:"Brine",lv:28},
    {move:"Protect",lv:34},{move:"AncientPower",lv:37},{move:"Tickle",lv:43},{move:"Rock Blast",lv:46},
    {move:"Hydro Pump",lv:52},
  ],
  "Omastar": [
    {move:"Constrict",lv:1},{move:"Withdraw",lv:1},{move:"Bite",lv:1},{move:"Bite",lv:7},
    {move:"Water Gun",lv:10},{move:"Rollout",lv:16},{move:"Leer",lv:19},{move:"Mud Shot",lv:25},
    {move:"Brine",lv:28},{move:"Protect",lv:34},{move:"AncientPower",lv:37},{move:"Spike Cannon",lv:40},
    {move:"Tickle",lv:48},{move:"Rock Blast",lv:56},{move:"Hydro Pump",lv:67},
  ],
  "Kabuto": [
    {move:"Scratch",lv:1},{move:"Harden",lv:1},{move:"Absorb",lv:6},{move:"Leer",lv:11},
    {move:"Mud Shot",lv:16},{move:"Sand-Attack",lv:21},{move:"Endure",lv:26},{move:"Aqua Jet",lv:31},
    {move:"Mega Drain",lv:36},{move:"Metal Sound",lv:41},{move:"AncientPower",lv:46},{move:"Wring Out",lv:51},
  ],
  "Kabutops": [
    {move:"Feint",lv:1},{move:"Scratch",lv:1},{move:"Harden",lv:1},{move:"Absorb",lv:1},
    {move:"Leer",lv:1},{move:"Absorb",lv:6},{move:"Leer",lv:11},{move:"Mud Shot",lv:16},
    {move:"Sand-Attack",lv:21},{move:"Endure",lv:26},{move:"Aqua Jet",lv:31},{move:"Mega Drain",lv:36},
    {move:"Slash",lv:40},{move:"Metal Sound",lv:45},{move:"AncientPower",lv:54},{move:"Wring Out",lv:63},
    {move:"Night Slash",lv:72},
  ],
  "Aerodactyl": [
    {move:"Fire Fang",lv:1},{move:"Thunder Fang",lv:1},{move:"Ice Fang",lv:1},{move:"Wing Attack",lv:1},
    {move:"Supersonic",lv:1},{move:"Bite",lv:1},{move:"Scary Face",lv:1},{move:"Roar",lv:9},
    {move:"Agility",lv:17},{move:"AncientPower",lv:25},{move:"Crunch",lv:33},{move:"Take Down",lv:41},
    {move:"Iron Head",lv:49},{move:"Hyper Beam",lv:57},{move:"Rock Slide",lv:65},{move:"Giga Impact",lv:73},
  ],
  // ── Snorlax ───────────────────────────────────────────────────────────────────
  "Snorlax": [
    {move:"Tackle",lv:1},{move:"Defense Curl",lv:4},{move:"Amnesia",lv:9},{move:"Lick",lv:12},
    {move:"Belly Drum",lv:17},{move:"Yawn",lv:20},{move:"Rest",lv:25},{move:"Snore",lv:28},
    {move:"Sleep Talk",lv:28},{move:"Body Slam",lv:33},{move:"Block",lv:36},{move:"Rollout",lv:41},
    {move:"Crunch",lv:44},{move:"Giga Impact",lv:49},
  ],
  // ── Kanto starters (post-game via Prof. Oak) ─────────────────────────────────
  "Bulbasaur": [
    {move:"Tackle",lv:1},{move:"Growl",lv:3},{move:"Leech Seed",lv:7},{move:"Vine Whip",lv:9},
    {move:"PoisonPowder",lv:13},{move:"Sleep Powder",lv:13},{move:"Take Down",lv:15},{move:"Razor Leaf",lv:19},
    {move:"Sweet Scent",lv:21},{move:"Growth",lv:25},{move:"Double-Edge",lv:27},{move:"Worry Seed",lv:31},
    {move:"Synthesis",lv:33},{move:"Seed Bomb",lv:37},
  ],
  "Ivysaur": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Leech Seed",lv:1},{move:"Growl",lv:3},
    {move:"Leech Seed",lv:7},{move:"Vine Whip",lv:9},{move:"PoisonPowder",lv:13},{move:"Sleep Powder",lv:13},
    {move:"Take Down",lv:15},{move:"Razor Leaf",lv:20},{move:"Sweet Scent",lv:23},{move:"Growth",lv:28},
    {move:"Double-Edge",lv:31},{move:"Worry Seed",lv:36},{move:"Synthesis",lv:39},{move:"SolarBeam",lv:44},
  ],
  "Venusaur": [
    {move:"Tackle",lv:1},{move:"Growl",lv:1},{move:"Leech Seed",lv:1},{move:"Vine Whip",lv:1},
    {move:"Growl",lv:3},{move:"Leech Seed",lv:7},{move:"Vine Whip",lv:9},{move:"PoisonPowder",lv:13},
    {move:"Sleep Powder",lv:13},{move:"Take Down",lv:15},{move:"Razor Leaf",lv:20},{move:"Sweet Scent",lv:23},
    {move:"Growth",lv:28},{move:"Double-Edge",lv:31},{move:"Petal Dance",lv:32},{move:"Worry Seed",lv:39},
    {move:"Synthesis",lv:45},{move:"SolarBeam",lv:53},
  ],
  "Charmander": [
    {move:"Scratch",lv:1},{move:"Growl",lv:1},{move:"Ember",lv:7},{move:"SmokeScreen",lv:10},
    {move:"Dragon Rage",lv:16},{move:"Scary Face",lv:19},{move:"Fire Fang",lv:25},{move:"Slash",lv:28},
    {move:"Flamethrower",lv:34},{move:"Fire Spin",lv:37},
  ],
  "Charmeleon": [
    {move:"Scratch",lv:1},{move:"Growl",lv:1},{move:"Ember",lv:1},{move:"Ember",lv:7},
    {move:"SmokeScreen",lv:10},{move:"Dragon Rage",lv:17},{move:"Scary Face",lv:21},{move:"Fire Fang",lv:28},
    {move:"Slash",lv:32},{move:"Flamethrower",lv:39},{move:"Fire Spin",lv:43},
  ],
  "Charizard": [
    {move:"Dragon Claw",lv:1},{move:"Shadow Claw",lv:1},{move:"Air Slash",lv:1},{move:"Scratch",lv:1},
    {move:"Growl",lv:1},{move:"Ember",lv:1},{move:"SmokeScreen",lv:1},{move:"Ember",lv:7},
    {move:"SmokeScreen",lv:10},{move:"Dragon Rage",lv:17},{move:"Scary Face",lv:21},{move:"Fire Fang",lv:28},
    {move:"Slash",lv:32},{move:"Wing Attack",lv:36},{move:"Flamethrower",lv:42},{move:"Fire Spin",lv:49},
    {move:"Heat Wave",lv:59},{move:"Flare Blitz",lv:66},
  ],
  "Squirtle": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:4},{move:"Bubble",lv:7},{move:"Withdraw",lv:10},
    {move:"Water Gun",lv:13},{move:"Bite",lv:16},{move:"Rapid Spin",lv:19},{move:"Protect",lv:22},
    {move:"Water Pulse",lv:25},{move:"Aqua Tail",lv:28},{move:"Skull Bash",lv:31},{move:"Iron Defense",lv:34},
    {move:"Rain Dance",lv:37},{move:"Hydro Pump",lv:40},
  ],
  "Wartortle": [
    {move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Bubble",lv:1},{move:"Tail Whip",lv:4},
    {move:"Bubble",lv:7},{move:"Withdraw",lv:10},{move:"Water Gun",lv:13},{move:"Bite",lv:16},
    {move:"Rapid Spin",lv:20},{move:"Protect",lv:24},{move:"Water Pulse",lv:28},{move:"Aqua Tail",lv:32},
    {move:"Skull Bash",lv:36},{move:"Iron Defense",lv:40},{move:"Rain Dance",lv:44},{move:"Hydro Pump",lv:48},
  ],
  "Blastoise": [
    {move:"Flash Cannon",lv:1},{move:"Tackle",lv:1},{move:"Tail Whip",lv:1},{move:"Bubble",lv:1},
    {move:"Withdraw",lv:1},{move:"Tail Whip",lv:4},{move:"Bubble",lv:7},{move:"Withdraw",lv:10},
    {move:"Water Gun",lv:13},{move:"Bite",lv:16},{move:"Rapid Spin",lv:20},{move:"Protect",lv:24},
    {move:"Water Pulse",lv:28},{move:"Aqua Tail",lv:32},{move:"Skull Bash",lv:39},{move:"Iron Defense",lv:46},
    {move:"Rain Dance",lv:53},{move:"Hydro Pump",lv:60},
  ],
  // ── Legendary Birds ──────────────────────────────────────────────────────────
  "Articuno": [
    {move:"Gust",lv:1},{move:"Powder Snow",lv:1},{move:"Mist",lv:8},{move:"Ice Shard",lv:15},
    {move:"Mind Reader",lv:22},{move:"AncientPower",lv:29},{move:"Agility",lv:36},{move:"Ice Beam",lv:43},
    {move:"Reflect",lv:50},{move:"Roost",lv:57},{move:"Tailwind",lv:64},{move:"Blizzard",lv:71},
    {move:"Sheer Cold",lv:78},{move:"Hail",lv:85},
  ],
  "Zapdos": [
    {move:"Peck",lv:1},{move:"ThunderShock",lv:1},{move:"Thunder Wave",lv:8},{move:"Detect",lv:15},
    {move:"Pluck",lv:22},{move:"AncientPower",lv:29},{move:"Charge",lv:36},{move:"Agility",lv:43},
    {move:"Discharge",lv:50},{move:"Roost",lv:57},{move:"Light Screen",lv:64},{move:"Drill Peck",lv:71},
    {move:"Thunder",lv:78},{move:"Rain Dance",lv:85},
  ],
  "Moltres": [
    {move:"Wing Attack",lv:1},{move:"Ember",lv:1},{move:"Fire Spin",lv:8},{move:"Agility",lv:15},
    {move:"Endure",lv:22},{move:"AncientPower",lv:29},{move:"Flamethrower",lv:36},{move:"Safeguard",lv:43},
    {move:"Air Slash",lv:50},{move:"Roost",lv:57},{move:"Heat Wave",lv:64},{move:"SolarBeam",lv:71},
    {move:"Sky Attack",lv:78},{move:"Sunny Day",lv:85},
  ],
  // ── Legendary Beasts ─────────────────────────────────────────────────────────
  "Raikou": [
    {move:"Bite",lv:1},{move:"Leer",lv:1},{move:"ThunderShock",lv:8},{move:"Roar",lv:15},
    {move:"Quick Attack",lv:22},{move:"Spark",lv:29},{move:"Reflect",lv:36},{move:"Crunch",lv:43},
    {move:"Thunder Fang",lv:50},{move:"Discharge",lv:57},{move:"Extrasensory",lv:64},{move:"Rain Dance",lv:71},
    {move:"Calm Mind",lv:78},{move:"Thunder",lv:85},
  ],
  "Entei": [
    {move:"Bite",lv:1},{move:"Leer",lv:1},{move:"Ember",lv:8},{move:"Roar",lv:15},
    {move:"Fire Spin",lv:22},{move:"Stomp",lv:29},{move:"Flamethrower",lv:36},{move:"Swagger",lv:43},
    {move:"Fire Fang",lv:50},{move:"Lava Plume",lv:57},{move:"Extrasensory",lv:64},{move:"Fire Blast",lv:71},
    {move:"Calm Mind",lv:78},{move:"Eruption",lv:85},
  ],
  "Suicune": [
    {move:"Bite",lv:1},{move:"Leer",lv:1},{move:"BubbleBeam",lv:8},{move:"Rain Dance",lv:15},
    {move:"Gust",lv:22},{move:"Aurora Beam",lv:29},{move:"Mist",lv:36},{move:"Mirror Coat",lv:43},
    {move:"Ice Fang",lv:50},{move:"Tailwind",lv:57},{move:"Extrasensory",lv:64},{move:"Hydro Pump",lv:71},
    {move:"Calm Mind",lv:78},{move:"Blizzard",lv:85},
  ],
  // ── Dratini line ─────────────────────────────────────────────────────────────
  "Dratini": [
    {move:"Wrap",lv:1},{move:"Leer",lv:1},{move:"Thunder Wave",lv:5},{move:"Twister",lv:11},
    {move:"Dragon Rage",lv:15},{move:"Slam",lv:21},{move:"Agility",lv:25},{move:"Aqua Tail",lv:31},
    {move:"Dragon Rush",lv:35},{move:"Safeguard",lv:41},{move:"Dragon Dance",lv:45},{move:"Outrage",lv:51},
    {move:"Hyper Beam",lv:55},
  ],
  "Dragonair": [
    {move:"Wrap",lv:1},{move:"Leer",lv:1},{move:"Thunder Wave",lv:1},{move:"Twister",lv:1},
    {move:"Thunder Wave",lv:5},{move:"Twister",lv:11},{move:"Dragon Rage",lv:15},{move:"Slam",lv:21},
    {move:"Agility",lv:25},{move:"Aqua Tail",lv:33},{move:"Dragon Rush",lv:39},{move:"Safeguard",lv:47},
    {move:"Dragon Dance",lv:53},{move:"Outrage",lv:61},{move:"Hyper Beam",lv:67},
  ],
  "Dragonite": [
    {move:"Fire Punch",lv:1},{move:"ThunderPunch",lv:1},{move:"Roost",lv:1},{move:"Wrap",lv:1},
    {move:"Leer",lv:1},{move:"Thunder Wave",lv:1},{move:"Twister",lv:1},{move:"Thunder Wave",lv:5},
    {move:"Twister",lv:11},{move:"Dragon Rage",lv:15},{move:"Slam",lv:21},{move:"Agility",lv:25},
    {move:"Aqua Tail",lv:33},{move:"Dragon Rush",lv:39},{move:"Safeguard",lv:47},{move:"Dragon Dance",lv:53},
    {move:"Wing Attack",lv:55},{move:"Outrage",lv:64},{move:"Hyper Beam",lv:73},
  ],
  // ── Larvitar line ────────────────────────────────────────────────────────────
  "Larvitar": [
    {move:"Bite",lv:1},{move:"Leer",lv:1},{move:"Sandstorm",lv:5},{move:"Screech",lv:10},
    {move:"Rock Slide",lv:14},{move:"Scary Face",lv:19},{move:"Thrash",lv:23},{move:"Dark Pulse",lv:28},
    {move:"Payback",lv:32},{move:"Crunch",lv:37},{move:"Earthquake",lv:41},{move:"Stone Edge",lv:46},
    {move:"Hyper Beam",lv:50},
  ],
  "Pupitar": [
    {move:"Bite",lv:1},{move:"Leer",lv:1},{move:"Sandstorm",lv:1},{move:"Screech",lv:1},
    {move:"Sandstorm",lv:5},{move:"Screech",lv:10},{move:"Rock Slide",lv:14},{move:"Scary Face",lv:19},
    {move:"Thrash",lv:23},{move:"Dark Pulse",lv:28},{move:"Payback",lv:34},{move:"Crunch",lv:41},
    {move:"Earthquake",lv:47},{move:"Stone Edge",lv:54},{move:"Hyper Beam",lv:60},
  ],
  "Tyranitar": [
    {move:"Fire Fang",lv:1},{move:"Ice Fang",lv:1},{move:"Thunder Fang",lv:1},{move:"Bite",lv:1},
    {move:"Leer",lv:1},{move:"Sandstorm",lv:1},{move:"Screech",lv:1},{move:"Sandstorm",lv:5},
    {move:"Screech",lv:10},{move:"Rock Slide",lv:14},{move:"Scary Face",lv:19},{move:"Thrash",lv:23},
    {move:"Dark Pulse",lv:28},{move:"Payback",lv:34},{move:"Crunch",lv:41},{move:"Earthquake",lv:47},
    {move:"Stone Edge",lv:54},{move:"Hyper Beam",lv:70},
  ],
  // ── Mascots / Legendaries ─────────────────────────────────────────────────────
  "Lugia": [
    {move:"Weather Ball",lv:1},{move:"Whirlwind",lv:1},{move:"Gust",lv:9},{move:"Dragon Rush",lv:15},
    {move:"Extrasensory",lv:23},{move:"Rain Dance",lv:29},{move:"Hydro Pump",lv:37},{move:"Aeroblast",lv:43},
    {move:"Punishment",lv:50},{move:"AncientPower",lv:57},{move:"Safeguard",lv:65},{move:"Recover",lv:71},
    {move:"Future Sight",lv:79},{move:"Natural Gift",lv:85},{move:"Calm Mind",lv:93},{move:"Sky Attack",lv:99},
  ],
  "Ho-Oh": [
    {move:"Weather Ball",lv:1},{move:"Whirlwind",lv:1},{move:"Gust",lv:9},{move:"Brave Bird",lv:15},
    {move:"Extrasensory",lv:23},{move:"Sunny Day",lv:29},{move:"Fire Blast",lv:37},{move:"Sacred Fire",lv:43},
    {move:"Punishment",lv:50},{move:"AncientPower",lv:57},{move:"Safeguard",lv:65},{move:"Recover",lv:71},
    {move:"Future Sight",lv:79},{move:"Natural Gift",lv:85},{move:"Calm Mind",lv:93},{move:"Sky Attack",lv:99},
  ],
  "Mewtwo": [
    {move:"Confusion",lv:1},{move:"Disable",lv:1},{move:"Barrier",lv:8},{move:"Swift",lv:15},
    {move:"Future Sight",lv:22},{move:"Psych Up",lv:29},{move:"Miracle Eye",lv:36},{move:"Mist",lv:43},
    {move:"Psycho Cut",lv:50},{move:"Amnesia",lv:57},{move:"Power Swap",lv:64},{move:"Guard Swap",lv:64},
    {move:"Psychic",lv:71},{move:"Me First",lv:79},{move:"Recover",lv:86},{move:"Safeguard",lv:93},
    {move:"Aura Sphere",lv:100},
  ],
  "Mew": [
    {move:"Pound",lv:1},{move:"Transform",lv:1},{move:"Mega Punch",lv:10},{move:"Metronome",lv:20},
    {move:"Psychic",lv:30},{move:"Barrier",lv:40},{move:"AncientPower",lv:50},{move:"Amnesia",lv:60},
    {move:"Me First",lv:70},{move:"Baton Pass",lv:80},{move:"Nasty Plot",lv:90},{move:"Aura Sphere",lv:100},
  ],
  "Celebi": [
    {move:"Leech Seed",lv:1},{move:"Confusion",lv:1},{move:"Recover",lv:1},{move:"Heal Bell",lv:1},
    {move:"Safeguard",lv:10},{move:"Magical Leaf",lv:19},{move:"AncientPower",lv:28},{move:"Baton Pass",lv:37},
    {move:"Natural Gift",lv:46},{move:"Heal Block",lv:55},{move:"Future Sight",lv:64},{move:"Healing Wish",lv:73},
    {move:"Leaf Storm",lv:82},{move:"Perish Song",lv:91},
  ],
};

// ─── DREAM TEAM ABILITIES ────────────────────────────────────────────────────
// Best in-game ability for each DT_CANDIDATES entry (Gen IV / HGSS).
// Key = final-form name. Both abilities listed where choice is meaningful.
const DT_ABILITIES = {
  // ── Starters ────────────────────────────────────────────────────────────────
  "Typhlosion": { name:"Blaze",         desc:"Boosts Fire moves to 1.5× when HP ≤ ⅓ (only ability)" },
  "Feraligatr": { name:"Torrent",       desc:"Boosts Water moves to 1.5× when HP ≤ ⅓ (only ability)" },
  "Meganium":   { name:"Overgrow",      desc:"Boosts Grass moves to 1.5× when HP ≤ ⅓ (only ability)" },
  // ── Top picks ───────────────────────────────────────────────────────────────
  "Ampharos":   { name:"Static",        desc:"30% chance to paralyze opponents on contact (only ability)" },
  "Heracross":  { name:"Guts",          desc:"Attack × 1.5 while afflicted by any status condition" },
  "Espeon":     { name:"Synchronize",   desc:"Reflects Burn / Paralysis / Poison back to the inflicter" },
  "Umbreon":    { name:"Synchronize",   desc:"Reflects Burn / Paralysis / Poison back to the inflicter" },
  "Steelix":    { name:"Sturdy",        desc:"Cannot be OHKOed by one-hit KO moves (Gen IV effect)" },
  "Scizor":     { name:"Technician",    desc:"Moves with base power ≤ 60 deal 1.5× damage — Bullet Punch, U-turn, etc." },
  "Donphan":    { name:"Sand Veil",     desc:"Evasion +25% in sandstorm — pairs with Tyranitar's Sand Stream" },
  "Houndoom":   { name:"Flash Fire",    desc:"Immune to Fire; boosts own Fire moves by 1.5× when hit by one" },
  "Skarmory":   { name:"Sturdy",        desc:"Cannot be OHKOed by one-hit KO moves (Gen IV effect)" },
  "Tyranitar":  { name:"Sand Stream",   desc:"Summons permanent sandstorm on switch-in — damages 4 types each turn" },
  "Kingdra":    { name:"Swift Swim",    desc:"Doubles Speed in rain — pair with Rain Dance for sweeping" },
  "Politoed":   { name:"Water Absorb",  desc:"Immune to Water moves; restores ¼ max HP instead" },
  "Slowking":   { name:"Own Tempo",     desc:"Cannot be confused (more reliable than Oblivious in-game)" },
  "Crobat":     { name:"Inner Focus",   desc:"Cannot be made to flinch (only ability in Gen IV)" },
  "Blissey":    { name:"Natural Cure",  desc:"Any status condition is healed on switching out" },
  "Ursaring":   { name:"Guts",          desc:"Attack × 1.5 while afflicted by any status condition" },
  "Mantine":    { name:"Water Absorb",  desc:"Immune to Water moves; restores ¼ max HP instead" },
  // ── Good picks ──────────────────────────────────────────────────────────────
  "Noctowl":    { name:"Insomnia",      desc:"Cannot be put to sleep — blocks Sleep Powder, Spore, Hypnosis" },
  "Lanturn":    { name:"Volt Absorb",   desc:"Immune to Electric moves; restores ¼ max HP — removes Electric weakness" },
  "Azumarill":  { name:"Huge Power",    desc:"Doubles Attack stat — makes base 50 Atk effectively 100" },
  "Quagsire":   { name:"Water Absorb",  desc:"Immune to Water moves; restores ¼ max HP — only ×4 Grass weakness remains" },
  "Forretress": { name:"Sturdy",        desc:"Cannot be OHKOed by one-hit KO moves (only ability in Gen IV)" },
  "Xatu":       { name:"Synchronize",   desc:"Reflects Burn / Paralysis / Poison back to the inflicter" },
  "Granbull":   { name:"Intimidate",    desc:"Lowers opponent's Attack by one stage on switch-in" },
  "Miltank":    { name:"Thick Fat",     desc:"Halves damage received from Fire and Ice moves" },
  "Hitmontop":  { name:"Technician",    desc:"Moves with base power ≤ 60 deal 1.5× damage — Mach Punch, Quick Attack, etc." },
  "Bellossom":  { name:"Chlorophyll",   desc:"Doubles Speed in sunlight" },
  "Jumpluff":   { name:"Chlorophyll",   desc:"Doubles Speed in sunlight" },
  "Sudowoodo":  { name:"Rock Head",     desc:"No recoil from recoil moves — enables Wood Hammer at full power" },
  "Girafarig":  { name:"Early Bird",    desc:"Wakes from sleep in half the turns — counters Hypnosis / Spore" },
  "Magcargo":   { name:"Flame Body",    desc:"30% chance to burn opponents on contact" },
  "Piloswine":  { name:"Oblivious",     desc:"Cannot be infatuated or have Attract/Captivate work on it" },
  "Octillery":  { name:"Sniper",        desc:"Critical hits deal 3× damage instead of 2×" },
  "Corsola":    { name:"Natural Cure",  desc:"Any status condition is healed on switching out" },
  "Furret":     { name:"Keen Eye",      desc:"Accuracy cannot be lowered by any means" },
  "Sunflora":   { name:"Chlorophyll",   desc:"Doubles Speed in sunlight" },
  // ── Niche picks ─────────────────────────────────────────────────────────────
  "Ariados":    { name:"Insomnia",      desc:"Cannot be put to sleep" },
  "Ledian":     { name:"Early Bird",    desc:"Wakes from sleep in half the turns" },
  "Sneasel":    { name:"Inner Focus",   desc:"Cannot be made to flinch" },
  "Misdreavus": { name:"Levitate",      desc:"Immune to Ground-type moves (only ability)" },
  "Murkrow":    { name:"Insomnia",      desc:"Cannot be put to sleep" },
  "Shuckle":    { name:"Sturdy",        desc:"Cannot be OHKOed by one-hit KO moves" },
  "Qwilfish":   { name:"Poison Point",  desc:"30% chance to poison opponents on contact" },
  "Dunsparce":  { name:"Serene Grace",  desc:"Doubles secondary effect chances — Body Slam paralysis becomes 60%" },
  "Gligar":     { name:"Sand Veil",     desc:"Evasion +25% in sandstorm — pairs with Tyranitar's Sand Stream" },
  "Smeargle":   { name:"Own Tempo",     desc:"Cannot be confused" },
  "Wobbuffet":  { name:"Shadow Tag",    desc:"Opponent cannot switch out — forces them to fight or use Struggle" },
  "Stantler":   { name:"Intimidate",    desc:"Lowers opponent's Attack by one stage on switch-in" },
  "Delibird":   { name:"Vital Spirit",  desc:"Cannot be put to sleep" },
};

// ─── MOVE TIERS ──────────────────────────────────────────────────────────────
// Advisory color-coding for the learnset display in DexDetail.
// "good"  → worth keeping / strong in a playthrough context (shown in green)
// "skip"  → early filler typically replaced soon (shown in muted)
// All labels are advisory — context always matters.
const MOVE_TIERS = {
  good: new Set([
    "Thunderbolt","Thunder","Flamethrower","Fire Blast","Surf","Hydro Pump",
    "Ice Beam","Blizzard","Earthquake","Psychic","SolarBeam","Razor Leaf",
    "Swords Dance","Amnesia","Agility","ExtremeSpeed","Hypnosis","Sleep Powder",
    "Spore","Toxic","Leech Seed","Crunch","Shadow Ball","Hyper Beam","Body Slam",
    "Dragon Rage","Tri Attack","Softboiled","Wing Attack","Drill Peck","Petal Dance",
    "Giga Drain","Silver Wind","Megahorn","High Jump Kick","Submission","Thrash",
    "Meteor Mash","Superpower","Skull Bash","Pin Missile","Twineedle","Air Cutter",
    "Confuse Ray","Will-O-Wisp","Stockpile","Swallow","Spit Up","Endeavor",
    "Super Fang","Hyper Fang","Horn Drill","Fissure","Guillotine","Sheer Cold",
    "Mean Look","Leech Life","Poison Fang","Psybeam","Vine Whip","Water Gun",
    "Bite","Rapid Spin","Protect","Rain Dance","Scary Face","Metal Claw",
    "Slash","Hyper Voice","Mirror Move","Aerial Ace","Pursuit","Focus Energy",
    "Dragon Dance","Ice Punch","ThunderPunch","Fire Punch","Waterfall","Outrage",
    "Hi Jump Kick","AncientPower","Brick Break","Sky Uppercut","Belly Drum",
    // Gen IV additions
    "Stone Edge","Close Combat","Focus Blast","Discharge","Signal Beam","Dark Pulse",
    "Eruption","Lava Plume","Power Gem","Zen Headbutt","Night Slash","Aqua Tail",
    "Leaf Blade","Poison Jab","Iron Head","Rock Slide","Thunder Wave",
    // Coverage & priority moves for HGSS candidates
    "Air Slash","Ice Fang","Mach Punch","Sucker Punch","Hammer Arm","Cross Poison",
    "Extrasensory","Wood Hammer","Explosion","X-Scissor","Dragon Pulse","Nasty Plot",
    "Aqua Jet","Leaf Storm","Gunk Shot","Ice Shard","Steel Wing","Dragon Dance",
    "Superpower","Hyper Voice","Swords Dance","Rapid Spin",
    // Full Johto dex additions
    "Sacred Fire","Aeroblast","Bug Buzz","Crabhammer","Power Whip",
    "Calm Mind","Recover","Flare Blitz","Brave Bird","Blaze Kick",
    "Aura Sphere","Fire Fang","Sky Attack","Self-Destruct","Icicle Spear",
    "Leaf Blade","Flash Cannon","Discharge","Night Shade","Flame Wheel","DynamicPunch",
  ]),
  skip: new Set([
    "Bide","Rage","Constrict","Splash","Bind","Wrap","String Shot",
    "Supersonic","Sand-Attack","Kinesis","Leer","Tail Whip","Growl",
    "Scratch","Pound","Tackle","Harden","Defense Curl","Uproar","Barrage",
    "Odor Sleuth","Foresight","Astonish","FeatherDance","Follow Me",
    "SmokeScreen","Fury Attack","Fury Swipes","Whirlwind","Minimize",
    "Quick Attack","Disable","Encore","Roar","Mean Look","Helping Hand",
    "Glare","Screech","Leech Life","Swift","Growl","Leer","Peck","Gust",
    "Absorb","Stun Spore","PoisonPowder","Acid","Moonlight","Sweet Scent",
    "Poison Sting","Double Kick","Sand Tomb","Mud-Slap","Sandstorm",
  ]),
};

// ─── EVOLUTION DELAY ADVISORIES ────────────────────────────────────────────
const EVO_DELAY = {}; // TODO: Add Johto evolution delay notes

// ─── DREAM TEAM BUILDER DATA ──────────────────────────────────────────────────
// Gen II Pokémon only (national #152–251). Final forms only, ordered best→decent.
// Tyranitar (pseudo-legendary) is always locked into slot 1 unless it's the favorite.
const DT_CANDIDATES = [
  // ── Starters ─────────────────────────────────────────────────────────────────
  { name:"Typhlosion",  types:["Fire"],            hms:["Cut","Strength","Rock Smash","Rock Climb"], stats:{atk:84,  spa:109, spe:100} },
  { name:"Feraligatr",  types:["Water"],            hms:["Cut","Surf","Strength","Waterfall","Whirlpool","Rock Smash","Rock Climb"], stats:{atk:105, spa:79,  spe:78} },
  { name:"Meganium",    types:["Grass"],            hms:["Cut","Strength","Rock Smash","Rock Climb"], stats:{atk:82,  spa:83,  spe:80} },
  // ── Top picks ────────────────────────────────────────────────────────────────
  { name:"Ampharos",    types:["Electric"],         hms:["Strength","Rock Smash","Rock Climb"], stats:{atk:45,  spa:115, spe:55} },
  { name:"Heracross",   types:["Bug","Fighting"],   hms:["Cut","Strength","Rock Smash"], stats:{atk:125, spa:35,  spe:85} },
  { name:"Espeon",      types:["Psychic"],          hms:["Cut"], stats:{atk:65,  spa:130, spe:110} },
  { name:"Umbreon",     types:["Dark"],             hms:["Cut"], stats:{atk:65,  spa:60,  spe:65} },
  { name:"Steelix",     types:["Steel","Ground"],   hms:["Cut","Strength","Rock Smash","Rock Climb"], tradeOnly:true, stats:{atk:85,  spa:30,  spe:30} },
  { name:"Scizor",      types:["Bug","Steel"],      hms:["Cut","Strength","Rock Smash"], hgOnly:true, tradeOnly:true, stats:{atk:130, spa:55,  spe:65} },
  { name:"Donphan",     types:["Ground"],           hms:["Strength","Rock Smash"], hgOnly:true, stats:{atk:120, spa:60,  spe:50} },
  { name:"Houndoom",    types:["Dark","Fire"],      hms:["Strength","Rock Smash"], ssOnly:true, stats:{atk:90,  spa:110, spe:95} },
  { name:"Skarmory",    types:["Steel","Flying"],   hms:["Cut","Fly","Rock Smash"], ssOnly:true, stats:{atk:80,  spa:40,  spe:70} },
  { name:"Tyranitar",   types:["Rock","Dark"],      hms:["Cut","Surf","Strength","Whirlpool","Rock Smash","Rock Climb"], stats:{atk:134, spa:95,  spe:61} },
  { name:"Kingdra",     types:["Water","Dragon"],   hms:["Surf","Waterfall","Whirlpool"], tradeOnly:true, stats:{atk:95, spa:95,  spe:85} },
  { name:"Politoed",    types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash"], tradeOnly:true, stats:{atk:75, spa:90,  spe:70} },
  { name:"Slowking",    types:["Water","Psychic"],  hms:["Surf","Strength","Whirlpool","Rock Smash"], tradeOnly:true, stats:{atk:75, spa:100, spe:30} },
  { name:"Crobat",      types:["Poison","Flying"],  hms:["Fly"], stats:{atk:90, spa:70,  spe:130} },
  { name:"Blissey",     types:["Normal"],           hms:["Strength","Rock Smash","Rock Climb"], stats:{atk:10, spa:75,  spe:55} },
  { name:"Ursaring",    types:["Normal"],           hms:["Cut","Strength","Rock Smash","Rock Climb"], hgOnly:true, stats:{atk:130,spa:75,  spe:55} },
  { name:"Mantine",     types:["Water","Flying"],   hms:["Surf","Waterfall","Whirlpool"], hgOnly:true, stats:{atk:40, spa:80,  spe:70} },
  // ── Good picks ───────────────────────────────────────────────────────────────
  { name:"Xatu",        types:["Psychic","Flying"], hms:["Fly"], bonus: 3, stats:{atk:65,  spa:95,  spe:95} },
  { name:"Lanturn",     types:["Water","Electric"], hms:["Surf","Waterfall","Whirlpool"], bonus: 4, stats:{atk:58,  spa:76,  spe:67} },
  { name:"Azumarill",   types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash"], ssOnly:true, stats:{atk:50,  spa:50,  spe:50} },
  { name:"Quagsire",    types:["Water","Ground"],   hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash"], stats:{atk:85,  spa:65,  spe:35} },
  { name:"Forretress",  types:["Bug","Steel"],      hms:["Strength","Rock Smash"], stats:{atk:90,  spa:30,  spe:40} },
  { name:"Noctowl",     types:["Normal","Flying"],  hms:["Fly"], stats:{atk:50,  spa:76,  spe:70} },
  { name:"Granbull",    types:["Normal"],           hms:["Strength","Rock Smash","Rock Climb"], stats:{atk:120,spa:45,  spe:45} },
  { name:"Miltank",     types:["Normal"],           hms:["Surf","Strength","Whirlpool","Rock Smash"], stats:{atk:80, spa:40,  spe:100} },
  { name:"Hitmontop",   types:["Fighting"],         hms:["Strength","Rock Smash"], stats:{atk:95, spa:35,  spe:70} },
  { name:"Porygon2",    types:["Normal"],           hms:[], tradeOnly:true, stats:{atk:80, spa:105, spe:60} },
  { name:"Bellossom",   types:["Grass"],            hms:["Cut"], ssOnly:true, stats:{atk:80, spa:90,  spe:50} },
  { name:"Jumpluff",    types:["Grass","Flying"],   hms:[], stats:{atk:55, spa:55,  spe:110} },
  { name:"Sudowoodo",   types:["Rock"],             hms:["Strength","Rock Smash"], stats:{atk:100,spa:30,  spe:30} },
  { name:"Girafarig",   types:["Normal","Psychic"], hms:["Strength","Rock Smash"], stats:{atk:80, spa:90,  spe:85} },
  { name:"Magcargo",    types:["Fire","Rock"],      hms:["Strength","Rock Smash"], stats:{atk:50, spa:80,  spe:30} },
  { name:"Piloswine",   types:["Ice","Ground"],     hms:["Strength","Rock Smash"], stats:{atk:100,spa:60,  spe:50} },
  { name:"Octillery",   types:["Water"],            hms:["Surf","Waterfall","Whirlpool"], stats:{atk:105,spa:105, spe:45} },
  { name:"Corsola",     types:["Water","Rock"],     hms:["Surf","Strength","Whirlpool","Rock Smash"], stats:{atk:55, spa:65,  spe:35} },
  { name:"Furret",      types:["Normal"],           hms:["Cut","Surf","Strength","Whirlpool","Rock Smash"], stats:{atk:76, spa:56,  spe:90} },
  { name:"Sunflora",    types:["Grass"],            hms:["Cut"], stats:{atk:75, spa:105, spe:30} },
  // ── Niche picks ──────────────────────────────────────────────────────────────
  { name:"Ariados",     types:["Bug","Poison"],     hms:[], stats:{atk:90, spa:60,  spe:40} },
  { name:"Ledian",      types:["Bug","Flying"],     hms:["Strength","Rock Smash"], stats:{atk:35, spa:35,  spe:85} },
  { name:"Sneasel",     types:["Dark","Ice"],       hms:["Cut","Surf","Strength","Whirlpool","Rock Smash"], stats:{atk:95, spa:35,  spe:115} },
  { name:"Misdreavus",  types:["Ghost"],            hms:[], ssOnly:true, stats:{atk:60, spa:85,  spe:85} },
  { name:"Murkrow",     types:["Dark","Flying"],    hms:["Fly"], hgOnly:true, stats:{atk:85, spa:42,  spe:91} },
  { name:"Shuckle",     types:["Bug","Rock"],       hms:["Strength","Rock Smash"], stats:{atk:10, spa:10,  spe:5} },
  { name:"Qwilfish",    types:["Water","Poison"],   hms:["Surf","Waterfall","Whirlpool"], stats:{atk:95, spa:55,  spe:85} },
  { name:"Dunsparce",   types:["Normal"],           hms:["Strength","Rock Smash"], stats:{atk:70, spa:65,  spe:45} },
  { name:"Gligar",      types:["Ground","Flying"],  hms:["Cut","Strength","Rock Smash"], hgOnly:true, stats:{atk:75, spa:35,  spe:85} },
  { name:"Smeargle",    types:["Normal"],           hms:[], stats:{atk:20, spa:20,  spe:75} },
  { name:"Wobbuffet",   types:["Psychic"],          hms:[], stats:{atk:33, spa:33,  spe:33} },
  { name:"Stantler",    types:["Normal"],           hms:[], stats:{atk:95, spa:62,  spe:85} },
  { name:"Delibird",    types:["Ice","Flying"],     hms:["Fly"], ssOnly:true, stats:{atk:55, spa:55,  spe:75} },
];
const DT_GROUPS = {};
const DT_LEGENDARY = new Set(["Raikou","Entei","Suicune","Lugia","Ho-Oh","Celebi","Mewtwo","Mew","Articuno","Zapdos","Moltres"]);

const DT_HM_COMPAT = {
  "Cut":        new Set(["Meganium","Bayleef","Chikorita","Heracross","Furret","Sentret","Scyther","Scizor","Pinsir","Sneasel","Aipom","Farfetch'd","Nidoking","Nidorino","Nidoran♂","Nidoqueen","Nidorina","Nidoran♀","Golduck","Psyduck","Kingler","Krabby","Kabutops","Kabuto","Kangaskhan","Rhydon","Rhyhorn","Dodrio","Doduo","Venomoth","Venonat","Bellossom","Gloom","Oddish","Tangrowth","Tangela","Vileplume","Skarmory","Dugtrio","Diglett","Persian","Meowth","Sunflora","Sunkern","Seaking","Goldeen","Feraligatr","Croconaw","Totodile","Dragonite","Dragonair","Dratini","Typhlosion","Quilava","Cyndaquil","Steelix","Onix","Tyranitar","Pupitar","Larvitar","Espeon","Umbreon","Ursaring","Teddiursa","Gligar"]),
  "Fly":        new Set(["Noctowl","Hoothoot","Crobat","Golbat","Xatu","Natu","Togetic","Togepi","Skarmory","Delibird","Dragonite","Dragonair","Aerodactyl","Dodrio","Doduo","Murkrow"]),
  "Surf":       new Set(["Feraligatr","Croconaw","Totodile","Lanturn","Chinchou","Azumarill","Marill","Politoed","Poliwrath","Poliwhirl","Poliwag","Quagsire","Wooper","Corsola","Remoraid","Octillery","Mantine","Kingdra","Seadra","Horsea","Slowking","Slowbro","Slowpoke","Gyarados","Magikarp","Lapras","Starmie","Staryu","Psyduck","Golduck","Tentacruel","Tentacool","Dewgong","Seel","Cloyster","Shellder","Vaporeon","Snorlax","Dragonite","Dragonair","Dratini","Nidoking","Nidorino","Nidoran♂","Nidoqueen","Nidorina","Nidoran♀","Kingler","Krabby","Omastar","Omanyte","Kabutops","Kabuto","Seaking","Goldeen","Qwilfish","Rhydon","Rhyhorn","Tauros","Tyranitar","Sneasel","Furret","Miltank"]),
  "Strength":   new Set(["Meganium","Bayleef","Typhlosion","Quilava","Feraligatr","Croconaw","Ampharos","Flaaffy","Heracross","Steelix","Onix","Tyranitar","Pupitar","Larvitar","Donphan","Phanpy","Ursaring","Teddiursa","Blissey","Chansey","Miltank","Granbull","Snubbull","Quagsire","Wooper","Sudowoodo","Azumarill","Marill","Piloswine","Swinub","Girafarig","Porygon","Forretress","Pineco","Scizor","Scyther","Houndoom","Houndour","Ninetales","Vulpix","Arcanine","Growlithe","Vaporeon","Jolteon","Flareon","Eevee","Dragonite","Dragonair","Dratini","Machamp","Machoke","Machop","Nidoking","Nidorino","Nidoqueen","Nidorina","Gyarados","Lapras","Snorlax","Kangaskhan","Aerodactyl","Tauros","Primeape","Mankey","Magcargo","Slugma","Lanturn","Chinchou","Slowbro","Slowpoke","Slowking","Aipom","Tangrowth","Tangela","Lickilicky","Lickitung","Hitmonlee","Hitmonchan","Hitmontop","Tyrogue","Electabuzz","Elekid","Magmar","Magby","Rapidash","Ponyta","Marowak","Cubone","Mr. Mime","Dugtrio","Diglett","Omastar","Omanyte","Kabutops","Kabuto","Rhydon","Rhyhorn","Pinsir","Exeggutor","Exeggcute","Dewgong","Seel","Cloyster","Shellder","Alakazam","Kadabra","Abra","Hypno","Drowzee","Kingler","Krabby","Dodrio","Doduo","Seaking","Goldeen","Weezing","Koffing","Starmie","Staryu","Golduck","Psyduck","Furret","Sentret","Sneasel","Muk","Grimer","Politoed","Poliwrath","Poliwhirl","Poliwag","Wigglytuff","Jigglypuff","Clefable","Clefairy","Raichu","Pikachu","Pichu","Gligar","Corsola"]),
  "Whirlpool":  new Set(["Feraligatr","Croconaw","Totodile","Lanturn","Chinchou","Azumarill","Marill","Politoed","Poliwrath","Poliwhirl","Poliwag","Quagsire","Wooper","Corsola","Remoraid","Octillery","Mantine","Kingdra","Seadra","Horsea","Slowking","Slowbro","Slowpoke","Gyarados","Lapras","Starmie","Staryu","Psyduck","Golduck","Tentacruel","Tentacool","Dewgong","Seel","Cloyster","Shellder","Vaporeon","Dragonite","Dragonair","Dratini","Qwilfish","Seaking","Goldeen","Omastar","Omanyte","Kabutops","Kabuto","Tyranitar","Sneasel","Furret","Miltank"]),
  "Rock Smash": new Set(["Heracross","Tyranitar","Pupitar","Larvitar","Sudowoodo","Donphan","Phanpy","Ursaring","Teddiursa","Steelix","Onix","Hitmontop","Hitmonlee","Hitmonchan","Tyrogue","Machamp","Machoke","Machop","Politoed","Poliwrath","Poliwhirl","Quagsire","Wooper","Forretress","Pineco","Corsola","Nidoking","Nidorino","Nidoran♂","Nidoqueen","Nidorina","Nidoran♀","Shuckle","Granbull","Snubbull","Marowak","Cubone","Feraligatr","Croconaw","Totodile","Ampharos","Flaaffy","Lickilicky","Lickitung","Omastar","Omanyte","Aerodactyl","Rhydon","Rhyhorn","Kangaskhan","Snorlax","Tauros","Primeape","Mankey","Magcargo","Slugma","Miltank","Pinsir","Blissey","Chansey","Gligar","Scizor","Houndoom","Skarmory","Dunsparce","Girafarig","Sneasel","Ledian","Azumarill"]),
  "Waterfall":  new Set(["Feraligatr","Croconaw","Totodile","Lanturn","Chinchou","Azumarill","Marill","Politoed","Poliwrath","Poliwhirl","Poliwag","Quagsire","Wooper","Remoraid","Octillery","Mantine","Kingdra","Seadra","Horsea","Slowbro","Slowpoke","Gyarados","Lapras","Starmie","Staryu","Psyduck","Golduck","Dewgong","Seel","Cloyster","Vaporeon","Dragonite","Dragonair","Dratini","Rhydon","Qwilfish","Seaking","Goldeen"]),
  "Rock Climb": new Set(["Tyranitar","Pupitar","Larvitar","Steelix","Onix","Ursaring","Teddiursa","Snorlax","Machamp","Machoke","Nidoking","Nidoqueen","Dragonite","Kangaskhan","Aerodactyl","Primeape","Mankey","Rhydon","Rhyhorn","Typhlosion","Quilava","Cyndaquil","Meganium","Bayleef","Chikorita","Feraligatr","Croconaw","Totodile","Ampharos","Flaaffy","Blissey","Chansey","Granbull","Snubbull"]),
};

// Neutral Pokémon are listed first so they always outrank version-exclusive picks
// by pool-position score, even if the version check is somehow skipped.
// FR-exclusive follow neutral, LG-exclusive come last.

// HGSS TM / Move Tutor tips — Game Corner (Goldenrod, Voltorb Flip) is the main repeatable TM source.
// Move Tutor: ThunderPunch / Ice Punch / Fire Punch sold at Goldenrod Dept. Store B1F (₽4,000 each).
// Gym TMs: Morty gives TM30 Shadow Ball; Jasmine gives TM23 Iron Tail; Clair gives TM59 Dragon Pulse.
// Entries are ordered by priority — getDreamMoves fills HM slots first, then TM tips in order shown.
const DT_TM_TIPS = {
  // Electric — Thunderbolt is the main repeatable Electric TM (Game Corner)
  "Ampharos":   [{move:"Thunderbolt",  src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Signal Beam",  src:"Level 42"},
                 {move:"Thunder Wave", src:"Level 14 — natural level-up (Fire Punch avoided: Ampharos has 45 base Atk)"}],
  "Lanturn":    [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Jolteon":    [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Electabuzz": [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"ThunderPunch",src:"Move Tutor — Goldenrod Dept. Store B1F (₽4,000)"}],
  "Magneton":   [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Electrode":  [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Raichu":     [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"ThunderPunch",src:"Move Tutor — Goldenrod Dept. Store B1F (₽4,000)"}],
  // Starters — coverage TMs
  "Meganium":   [{move:"SolarBeam",  src:"TM22 — Goldenrod Dept. Store 5F (₽3,000)"},
                 {move:"Giga Drain", src:"TM19 — National Park area (prize)"}],
  // Ice — Ice Beam via Game Corner; physical attackers prefer Ice Punch via Move Tutor
  "Feraligatr": [{move:"Ice Punch",  src:"Move Tutor — Goldenrod Dept. Store B1F (₽4,000) — preferred: 105 Atk > 79 SpA"},
                 {move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins) — alternative if Ice Punch unavailable"}],
  "Lapras":     [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Dewgong":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Cloyster":   [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Jynx":       [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Piloswine":  [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Ice Punch",  src:"Move Tutor — Goldenrod Dept. Store B1F (₽4,000)"}],
  "Slowbro":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Slowking":   [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Gyarados":   [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Starmie":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Kingdra":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Vaporeon":   [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Golduck":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Dragonite":  [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  // Fire — Flamethrower via Game Corner
  "Typhlosion": [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Focus Blast", src:"TM52 — Goldenrod Dept. Store 5F (₽3,500) — covers Rock/Dark/Steel that resist Fire"}],
  "Arcanine":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Ninetales":  [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Houndoom":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Magmar":     [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"ThunderPunch",src:"Move Tutor — Goldenrod Dept. Store B1F (₽4,000)"}],
  "Flareon":    [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Magcargo":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Rapidash":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  // Psychic — TM29 from Goldenrod Dept. Store; Morty's TM30 gives Shadow Ball
  "Espeon":     [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  "Alakazam":   [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  "Hypno":      [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  "Xatu":       [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"},
                 {move:"Shadow Ball", src:"TM30 — defeat Morty (Ecruteak City Gym)"},
                 {move:"Confuse Ray", src:"Level 29 — natural level-up (Future Sight avoided: 2-turn delay rarely lands in-game)"}],
  "Mr. Mime":   [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  "Exeggutor":  [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  "Girafarig":  [{move:"Psychic",     src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  // Fighting — Close Combat and Megahorn come from level-up (see LEARNSETS); Stone Edge is a one-time TM
  "Heracross":  [{move:"Stone Edge",  src:"TM71 — Victory Road (Kanto)", oneTime:true}],
  // Nidoran lines — coverage via Thunderbolt + Ice Beam (both special-stat Pokémon)
  "Nidoking":   [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Nidoqueen":  [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  // Ground STAB — Earthquake is Quagsire's only real battle move alongside the water HMs
  "Quagsire":   [{move:"Earthquake", src:"TM26 — Victory Road (Johto)"}],
  // Eevee evolutions
  "Espeon":     [{move:"Shadow Ball", src:"TM30 — defeat Morty (Ecruteak City Gym) — covers Dark/Ghost, Espeon's main blind spots"}],
  "Umbreon":    [{move:"Shadow Ball", src:"TM30 — defeat Morty (Ecruteak City Gym) — only move that hits Ghost types (immune to Dark STAB)"},
                 {move:"Toxic",       src:"TM06 — defeat Janine (Fuchsia City Gym, Kanto) — enables Umbreon's stall role"}],
  // Crobat: all key moves come from level-up
  // Physical-attackers needing Earthquake coverage
  "Donphan":    [{move:"Stone Edge", src:"TM71 — Victory Road (Kanto)", oneTime:true}],
  "Ursaring":   [{move:"Earthquake", src:"TM26 — Victory Road (Johto)"}],
  "Granbull":   [{move:"Earthquake", src:"TM26 — Victory Road (Johto)"}],
  "Sudowoodo":  [{move:"Earthquake", src:"TM26 — Victory Road (Johto) — essential Rock/Ground dual coverage"}],
  "Hitmontop":  [{move:"Earthquake", src:"TM26 — Victory Road (Johto)"},
                 {move:"Stone Edge", src:"TM71 — Victory Road (Kanto)", oneTime:true}],
  "Gligar":     [{move:"Earthquake", src:"TM26 — Victory Road (Johto)"},
                 {move:"Stone Edge", src:"TM71 — Victory Road (Kanto)", oneTime:true}],
  // Normal attackers
  "Furret":     [{move:"Dig",        src:"TM28 — National Park area or buy — Ground coverage"}],
  "Blissey":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  // Grass types needing SolarBeam
  "Jumpluff":   [{move:"SolarBeam",  src:"TM22 — Goldenrod Dept. Store 5F (₽3,000)"},
                 {move:"Giga Drain", src:"TM19 — National Park area (prize)"}],
  "Sunflora":   [{move:"SolarBeam",  src:"TM22 — Goldenrod Dept. Store 5F (₽3,000)"},
                 {move:"Giga Drain", src:"TM19 — National Park area (prize)"}],
  "Bellossom":  [{move:"SolarBeam",  src:"TM22 — Goldenrod Dept. Store 5F (₽3,000)"},
                 {move:"Giga Drain", src:"TM19 — National Park area (prize)"}],
  // Ghost — Shadow Ball from Morty is the key
  "Misdreavus": [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Shadow Ball", src:"TM30 — defeat Morty (Ecruteak City Gym)"}],
  // Mixed attackers needing coverage
  "Girafarig":  [{move:"Psychic",    src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"},
                 {move:"Shadow Ball", src:"TM30 — defeat Morty (Ecruteak City Gym)"}],
  "Stantler":   [{move:"Psychic",    src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"}],
  "Octillery":  [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Corsola":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  // Dark/Niche types
  "Sneasel":    [{move:"Ice Punch",  src:"Move Tutor — Goldenrod Dept. Store B1F (₽4,000) — key STAB for physical attacker"}],
  "Delibird":   [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  // Trade-only
  "Kingdra":    [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Politoed":   [{move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Slowking":   [{move:"Psychic",    src:"TM29 — Goldenrod Dept. Store 5F (₽3,500)"},
                 {move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Porygon2":   [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},
                 {move:"Ice Beam",   src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  // Bug/Steel
  "Scizor":     [{move:"Swords Dance",src:"TM75 — available mid-game — sets up devastating X-Scissor sweeps"},
                 {move:"X-Scissor",  src:"TM81 — Cianwood City area"}],
  "Steelix":    [{move:"Earthquake", src:"TM26 — Victory Road (Johto)"},
                 {move:"Stone Edge", src:"TM71 — Victory Road (Kanto)", oneTime:true}],
  // Mantine: all key moves come from level-up
  // Skarmory: Spikes and Steel Wing from level-up are sufficient
  // Azumarill: Aqua Tail and Superpower come from level-up (lv52 and lv62)
  // Noctowl: Shadow Ball from Morty covers its Ghost/Psychic/Dark blind spot
  "Noctowl":    [{move:"Shadow Ball", src:"TM30 — defeat Morty (Ecruteak City Gym)"}],
};

const DT_FINAL_FORM = {
  // Johto starters
  "Chikorita":"Meganium","Bayleef":"Meganium",
  "Cyndaquil":"Typhlosion","Quilava":"Typhlosion",
  "Totodile":"Feraligatr","Croconaw":"Feraligatr",
  // Birds / bugs
  "Hoothoot":"Noctowl",
  "Ledyba":"Ledian",
  "Spinarak":"Ariados",
  "Yanma":"Yanmega",
  "Hoppip":"Jumpluff","Skiploom":"Jumpluff",
  // Zubat line
  "Zubat":"Crobat","Golbat":"Crobat",
  // Electric
  "Pichu":"Raichu","Pikachu":"Raichu",
  "Mareep":"Ampharos","Flaaffy":"Ampharos",
  "Voltorb":"Electrode","Magnemite":"Magneton",
  // Fairy-adjacent
  "Cleffa":"Clefable","Clefairy":"Clefable",
  "Igglybuff":"Wigglytuff","Jigglypuff":"Wigglytuff",
  "Togepi":"Togekiss","Togetic":"Togekiss",
  "Snubbull":"Granbull",
  // Psychic
  "Natu":"Xatu","Drowzee":"Hypno","Abra":"Alakazam","Kadabra":"Alakazam",
  "Smoochum":"Jynx",
  // Grass
  "Sunkern":"Sunflora","Oddish":"Vileplume","Gloom":"Vileplume",
  "Venonat":"Venomoth","Exeggcute":"Exeggutor",
  "Tangela":"Tangrowth",
  // Water
  "Marill":"Azumarill","Wooper":"Quagsire",
  "Poliwag":"Politoed","Poliwhirl":"Politoed",
  "Slowpoke":"Slowbro",
  "Horsea":"Kingdra","Seadra":"Kingdra",
  "Remoraid":"Octillery","Tentacool":"Tentacruel",
  "Seel":"Dewgong","Shellder":"Cloyster",
  "Krabby":"Kingler","Staryu":"Starmie","Goldeen":"Seaking",
  "Chinchou":"Lanturn","Magikarp":"Gyarados",
  "Eevee":"Espeon",
  // Ground / Rock / Steel
  "Larvitar":"Tyranitar","Pupitar":"Tyranitar",
  "Onix":"Steelix",
  "Rhyhorn":"Rhydon","Cubone":"Marowak",
  "Pineco":"Forretress","Geodude":"Graveler","Graveler":"Golem",
  // Normal
  "Sentret":"Furret","Aipom":"Ambipom","Teddiursa":"Ursaring",
  "Lickitung":"Lickilicky","Chansey":"Blissey","Tyrogue":"Hitmontop",
  "Elekid":"Electabuzz","Magby":"Magmar",
  "Porygon":"Porygon2",
  // Dark / Ghost
  "Houndour":"Houndoom","Slugma":"Magcargo",
  "Swinub":"Mamoswine","Piloswine":"Mamoswine",
  // Misc Gen I in Johto dex
  "Nidoran♀":"Nidoqueen","Nidorina":"Nidoqueen",
  "Nidoran♂":"Nidoking","Nidorino":"Nidoking",
  "Diglett":"Dugtrio","Meowth":"Persian","Psyduck":"Golduck",
  "Bellsprout":"Victreebel","Weepinbell":"Victreebel",
  "Mankey":"Primeape","Growlithe":"Arcanine",
  "Machop":"Machoke","Machoke":"Machamp",
  "Doduo":"Dodrio","Ponyta":"Rapidash",
  "Grimer":"Muk","Koffing":"Weezing",
  "Vulpix":"Ninetales","Scyther":"Scizor",
  "Phanpy":"Donphan",
  "Omanyte":"Omastar","Kabuto":"Kabutops",
  "Dratini":"Dragonite","Dragonair":"Dragonite",
};
// Pre-evo overrides for branching chains (DT_FINAL_FORM can only map one final form per key)
const BRANCH_PRE_EVO = { "Umbreon":"Eevee" };

// ── Offensive type coverage helpers ──────────────────────────────────────────
// TYPE_CHART[atk][def] = multiplier; entries missing = 1×.
// getTypeOffCoverage(T) → defending types that T hits 2× (pure single-type).
function getTypeOffCoverage(atkType) {
  const row = TYPE_CHART[atkType] || {};
  return TYPES_17.filter(def => (row[def] || 1) === 2);
}
function getCandCoverage(cand) {
  const s = new Set();
  for (const t of cand.types) for (const d of getTypeOffCoverage(t)) s.add(d);
  return s;
}
function getTeamCoverage(names) {
  const s = new Set();
  for (const n of names) {
    const form = DT_FINAL_FORM[n] || n;
    const c = DT_CANDIDATES.find(x => x.name === form);
    if (c) for (const t of c.types) for (const d of getTypeOffCoverage(t)) s.add(d);
  }
  return s;
}
function getCandWeaknesses(cand) {
  const chart = getDefensiveChart(cand.types);
  return new Set(TYPES_17.filter(t => chart[t] >= 2));
}

// Score a candidate given the already-fixed team members.
// Weights: HM gap coverage (10 each) > new offensive type coverage (3 each) >
//          new team types (2 each) > shared weakness penalty (−2 each) > pool rank (tiebreak).
function scoreCandidateInContext(cand, fixedNames, version) {
  if (version === "hg" && cand.ssOnly) return -Infinity;
  if (version === "ss" && cand.hgOnly) return -Infinity;
  if (cand.tradeOnly) return -Infinity;

  const teamCov = getTeamCoverage(fixedNames);
  const newCov  = [...getCandCoverage(cand)].filter(t => !teamCov.has(t)).length;

  const coveredHMs = new Set(fixedNames.flatMap(n => {
    const form = DT_FINAL_FORM[n] || n;
    return Object.entries(DT_HM_COMPAT).filter(([,s]) => s.has(form)).map(([hm]) => hm);
  }));
  const newHMs = cand.hms.filter(h => !coveredHMs.has(h)).length;

  const teamWeak = new Set(fixedNames.flatMap(n => {
    const form = DT_FINAL_FORM[n] || n;
    const c = DT_CANDIDATES.find(x => x.name === form);
    return c ? [...getCandWeaknesses(c)] : [];
  }));
  const sharedWeak = [...getCandWeaknesses(cand)].filter(w => teamWeak.has(w)).length;

  const fixedTypes = new Set(fixedNames.flatMap(n => {
    const form = DT_FINAL_FORM[n] || n;
    const c = DT_CANDIDATES.find(x => x.name === form);
    return c ? c.types : [];
  }));
  const newTypes = cand.types.filter(t => !fixedTypes.has(t)).length;
  const dupTypes = cand.types.filter(t => fixedTypes.has(t)).length;

  const poolRank = DT_CANDIDATES.indexOf(cand);
  const poolScore = poolRank >= 0 ? (DT_CANDIDATES.length - poolRank) * 0.1 : 0;

  return newHMs * 4 + newCov * 3 + newTypes * 2 - sharedWeak * 2 - dupTypes * 3 + poolScore + (cand.bonus || 0);
}

// Build a team of 6: slot 0 = favorite, slot 1 = Tyranitar (unless Tyranitar-line),
// slots 2–5 filled by pins first then by greedy scoring.
function buildDreamTeamV2(favorite, pins, version) {
  if (!favorite) return null;
  const isTyranitarLine = ["Larvitar","Pupitar","Tyranitar"].includes(favorite);
  const team = new Array(6).fill(null);
  team[0] = favorite;
  if (!isTyranitarLine) team[1] = "Tyranitar";
  for (let i = 2; i <= 5; i++) { if (pins[i]) team[i] = pins[i]; }

  const startSlot = isTyranitarLine ? 1 : 2;
  for (let i = startSlot; i <= 5; i++) {
    if (team[i] !== null) continue;
    const fixed = team.filter(Boolean);
    const usedFinal = new Set(fixed.map(n => DT_FINAL_FORM[n] || n));
    let best = null, bestScore = -Infinity;
    for (const cand of DT_CANDIDATES) {
      if (usedFinal.has(cand.name)) continue;
      const s = scoreCandidateInContext(cand, fixed, version);
      if (s > bestScore) { best = cand; bestScore = s; }
    }
    if (best) team[i] = best.name;
  }
  return team.filter(Boolean);
}

// Return up to `count` ranked alternatives for a given team slot.
// Result includes the current occupant so the user can see where it ranks.
// delta is score relative to the top scorer (0 = best, negative = worse).
function getAlternatives(slotIdx, team, version, count = 5) {
  if (!team || slotIdx >= team.length) return [];
  const fixed = team.filter((_, i) => i !== slotIdx);
  const fixedFinal = new Set(fixed.map(n => DT_FINAL_FORM[n] || n));
  const scored = DT_CANDIDATES
    .filter(cand => !fixedFinal.has(cand.name))
    .map(cand => ({ name: cand.name, score: scoreCandidateInContext(cand, fixed, version) }))
    .filter(x => Number.isFinite(x.score))
    .sort((a, b) => b.score - a.score);
  if (!scored.length) return [];
  const best = scored[0].score;
  // Ensure the current occupant is always visible even if outside top-N
  const curr = team[slotIdx];
  const topN = scored.slice(0, count);
  if (curr && !topN.find(x => x.name === curr)) {
    const currEntry = scored.find(x => x.name === curr);
    if (currEntry) topN.push(currEntry);
  }
  return topN.map(x => ({ name: x.name, delta: Math.round(x.score - best) }));
}

function getDreamMoves(name, suppressedMoves, hms, skipTMs = false) {
  suppressedMoves = suppressedMoves || new Set();
  hms = hms || [];
  const finalForm = DT_FINAL_FORM[name] || name;
  const learnset = (LEARNSETS && (LEARNSETS[finalForm] || LEARNSETS[name])) || [];
  const tmTips   = DT_TM_TIPS[finalForm] || DT_TM_TIPS[name] || [];
  const result = [], used = new Set();
  // 1. HMs this Pokémon carries — fill slots first so they appear in the moveset
  if (!skipTMs) {
    for (const hm of hms) {
      if (result.length >= 4) break;
      result.push({ move:hm, src:"HM", kind:"hm" });
      used.add(hm);
    }
  }
  // 2. TM tips — skip any one-time TM assigned to a different team member
  if (!skipTMs) {
    for (const t of tmTips) {
      if (result.length >= 4) break;
      if (suppressedMoves.has(t.move)) continue;
      result.push({ move:t.move, src:t.src, kind:"tm", oneTime:!!t.oneTime });
      used.add(t.move);
    }
  }
  // 3. Strong level-up moves
  const goodMoves = [...learnset].filter(m => MOVE_TIERS && MOVE_TIERS.good && MOVE_TIERS.good.has(m.move)).sort((a,b) => b.lv - a.lv);
  for (const m of goodMoves) {
    if (result.length >= 4) break;
    if (!used.has(m.move)) { result.push({ move:m.move, src:`Level ${m.lv}`, kind:"level" }); used.add(m.move); }
  }
  // 4. Any remaining level-up moves to round out 4 slots
  const allMoves = [...learnset].sort((a,b) => b.lv - a.lv);
  for (const m of allMoves) {
    if (result.length >= 4) break;
    if (!used.has(m.move)) { result.push({ move:m.move, src:`Level ${m.lv}`, kind:"level" }); used.add(m.move); }
  }
  return result;
}

// For each contested one-time TM, pick the single best recipient on the team.
// Priority: (1) earlier position in DT_TM_TIPS for that Pokémon (it matters more to them),
// Move types used to evaluate STAB for assignment priority
const DT_MOVE_TYPE = {
  "Cut":"Normal","Fly":"Flying","Surf":"Water","Strength":"Normal",
  "Rock Smash":"Fighting","Waterfall":"Water",
  "Earthquake":"Ground","SolarBeam":"Grass","Sludge Bomb":"Poison",
  "Brick Break":"Fighting","Iron Tail":"Steel",
};
function hasSTAB(pokémonName, moveName) {
  const moveType = DT_MOVE_TYPE[moveName];
  if (!moveType) return false;
  const form = DT_FINAL_FORM[pokémonName] || pokémonName;
  const cand = DT_CANDIDATES.find(c => c.name === form);
  return cand ? cand.types.includes(moveType) : false;
}

// (2) fewer total TM tips (less flexibility), (3) earlier in team order.
function assignOneTimeTMs(team) {
  const wanted = {}; // moveName → [{name, tipIndex, totalTips}]
  team.forEach(pName => {
    const finalForm = DT_FINAL_FORM[pName] || pName;
    const tips = DT_TM_TIPS[finalForm] || DT_TM_TIPS[pName] || [];
    tips.forEach((t, tipIndex) => {
      if (!t.oneTime) return;
      if (!wanted[t.move]) wanted[t.move] = [];
      wanted[t.move].push({ name:pName, tipIndex, totalTips:tips.length });
    });
  });
  const winners = {};
  Object.entries(wanted).forEach(([move, candidates]) => {
    const sorted = [...candidates].sort((a, b) => {
      const aSTAB = hasSTAB(a.name, move), bSTAB = hasSTAB(b.name, move);
      if (aSTAB !== bSTAB) return aSTAB ? -1 : 1;
      if (a.tipIndex !== b.tipIndex) return a.tipIndex - b.tipIndex;
      if (a.totalTips !== b.totalTips) return a.totalTips - b.totalTips;
      return team.indexOf(a.name) - team.indexOf(b.name);
    });
    winners[move] = sorted[0].name;
  });
  return winners;
}

function getDreamHMs(name) {
  const form = DT_FINAL_FORM[name] || name;
  return Object.entries(DT_HM_COMPAT).filter(([,s]) => s.has(form)).map(([hm]) => hm);
}

// For each HM required by the team, assign it to exactly one Pokémon.
//
// Strategy — two phases:
// 1. Water HM bundling: Surf + Whirlpool + Waterfall are bundled onto the best
//    Water-type on the team (STAB preferred, capacity permitting). This avoids
//    splitting water HMs across Pokémon and wasting battle slots on non-Water types.
// 2. Remaining HMs: process rarest coverage first. Tiebreak by:
//    (a) STAB match (keeps type-thematic assignments)
//    (b) Fewer HMs already assigned (protect battle slots of high-value Pokémon)
//    (c) Fewer total HM options (more specialized = better fit for this particular HM)
//    (d) Team order (later = considered more utility-oriented)
function assignHMs(team, maxPerPokemon) {
  const max = maxPerPokemon || 3;
  const ALL_HMs = ["Fly","Surf","Waterfall","Whirlpool","Strength","Cut","Rock Smash","Rock Climb"];
  const canLearn = {};
  team.forEach(name => { canLearn[name] = new Set(getDreamHMs(name)); });

  const candidates = {};
  ALL_HMs.forEach(hm => { candidates[hm] = team.filter(n => canLearn[n].has(hm)); });

  const assignments = {};
  const load = {};
  team.forEach(n => { load[n] = 0; });

  // Phase 1: Water HM bundling — give Surf + Whirlpool + Waterfall to one Water-type carrier.
  // A Water-type carrier absorbs all three, leaving only 1 battle slot — but that's the right
  // trade-off since non-Water Pokémon (e.g. Tyranitar 134 Atk / 95 SpA) waste the Surf slot.
  const waterHMs = ["Surf", "Whirlpool", "Waterfall"];
  const isWaterType = n => {
    const form = DT_FINAL_FORM[n] || n;
    const c = DT_CANDIDATES.find(x => x.name === form);
    return c ? c.types.includes("Water") : false;
  };
  const surfLearners = team.filter(n => canLearn[n].has("Surf"));
  const waterCarrier = surfLearners.find(isWaterType) || surfLearners[0];
  if (waterCarrier) {
    for (const hm of waterHMs) {
      if (canLearn[waterCarrier].has(hm) && load[waterCarrier] < max) {
        assignments[hm] = waterCarrier;
        load[waterCarrier]++;
      }
    }
  }

  // Phase 2: Remaining HMs — fewest carriers first so rarest HMs are assigned first.
  const sorted = ALL_HMs
    .filter(hm => !assignments[hm] && candidates[hm] && candidates[hm].length > 0)
    .sort((a, b) => candidates[a].length - candidates[b].length);

  // HMs with BP < 50 aren't worth using offensively — skip STAB preference for them
  // so low-power HMs (Rock Smash 20 BP) don't land on wrong Pokémon via STAB shortcut.
  const HM_BP = { Fly:90, Surf:95, Strength:80, Cut:50, Waterfall:80, Whirlpool:35, "Rock Smash":20, "Rock Climb":90 };

  for (const hm of sorted) {
    const avail = candidates[hm].filter(n => load[n] < max);
    if (!avail.length) continue;
    const hmWorthy = (HM_BP[hm] || 99) >= 50;
    const winner = avail.reduce((best, cur) => {
      // (a) STAB match — only for HMs worth using offensively (BP ≥ 50)
      const curSTAB = hmWorthy && hasSTAB(cur, hm), bestSTAB = hmWorthy && hasSTAB(best, hm);
      if (curSTAB !== bestSTAB) return curSTAB ? cur : best;
      // (b) Prefer the less-loaded Pokémon — protect battle slots
      if (load[cur] !== load[best]) return load[cur] < load[best] ? cur : best;
      // (c) Prefer fewer total HM options — more specialized = natural fit for this HM
      const curCap = canLearn[cur].size, bestCap = canLearn[best].size;
      if (curCap !== bestCap) return curCap < bestCap ? cur : best;
      // (d) Tiebreak by team order (later = more utility-oriented slot)
      return team.indexOf(cur) > team.indexOf(best) ? cur : best;
    });
    assignments[hm] = winner;
    load[winner]++;
  }
  return assignments;
}

function getDreamAcquisition(name) {
  const direct = LOCATION_MAP[name];
  if (direct && direct.length > 0) {
    const l = direct[0];
    return `${l.areaName}${l.levels ? ` — ${l.method}, Lv. ${l.levels}` : ` — ${l.method}`}`;
  }
  const preEvos = [
    ...Object.entries(DT_FINAL_FORM).filter(([,f]) => f === name).map(([b]) => b),
    ...(BRANCH_PRE_EVO[name] ? [BRANCH_PRE_EVO[name]] : []),
  ];
  for (const base of preEvos) {
    const baseLocs = LOCATION_MAP[base];
    if (baseLocs && baseLocs.length > 0) {
      const l = baseLocs[0];
      return `Catch ${base} at ${l.areaName}${l.levels ? ` (${l.method}, Lv. ${l.levels})` : ` (${l.method})`} → evolve to ${name}`;
    }
  }
  return "See Pokédex for location details";
}

// ─── CATCH CONSTRAINT MAP ─────────────────────────────────────────────────────
const CATCH_CONSTRAINT_MAP = {}; // TODO: Add one-time capture constraints
const SAFARI_BALL_AREA_IDS = new Set(["safari-zone"]);
const _NO_POKEBALL_METHODS = new Set(["Gift","Trade","Fossil","Event","Game Corner"]);
const _WILD_METHODS = new Set(["Grass","Cave","Surf","Old Rod","Good Rod","Super Rod"]);

const _catchFlags = {};
for (const area of AREAS) {
  for (const p of _allPokemon(area)) {
    if (!_catchFlags[p.name]) _catchFlags[p.name] = { wn:false, ws:false, sp:null };
    const f = _catchFlags[p.name];
    if (_WILD_METHODS.has(p.method)) {
      if (SAFARI_BALL_AREA_IDS.has(area.id)) f.ws = true;
      else f.wn = true;
    } else if (_NO_POKEBALL_METHODS.has(p.method) && !f.sp) {
      f.sp = p.method;
    }
  }
}
for (const [name, f] of Object.entries(_catchFlags)) {
  if (!f.wn) CATCH_CONSTRAINT_MAP[name] = f.ws ? "safari" : (f.sp || null);
}

const CONSTRAINT_STYLE = {
  "safari":      { label:"Safari",  color:"#4aaf74", desc:"Safari Zone only — Safari Ball required, not a regular Poké Ball" },
  "Gift":        { label:"Gift",    color:"#5b8dd9", desc:"Gift — received from an NPC, cannot be caught in the wild" },
  "Trade":       { label:"Trade",   color:"#9b6fd4", desc:"Trade only — obtained via in-game trade, cannot be caught in the wild" },
  "Fossil":      { label:"Fossil",  color:"#b09060", desc:"Fossil revival — restored at Cinnabar Lab, cannot be caught in the wild" },
  "Game Corner": { label:"Prize",   color:"#c8960a", desc:"Game Corner prize — redeemed with coins, cannot be caught in the wild" },
  "Event":       { label:"Event",   color:"#a87acc", desc:"Event only — not normally obtainable in-game" },
};

// ─── COLORS ──────────────────────────────────────────────────────────────────
// v4 — Twilight Cave palette. Deep blue-black base with cooler panels so the
// warm FR amber / seafoam LG accents glow against it. Accent stays version-
// keyed via the --hgss-accent CSS var.
const C = {
  bg:"#0a0d14", card:"#141822", border:"#252c3a",
  hgGold:"#c8960a", ssSilver:"#a0a8b8",
  accent:"#c8960a",  // static fallback; live version uses CSS var(--hgss-accent)
  gold:"#c8960a", green:"#5fc99a",
  text:"#e6e8f0", muted:"#7c8395", panel:"#1a1f2b",
};
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 4 && h < 10) return "morning";  // 4:00–9:59
  if (h >= 10 && h < 20) return "day";      // 10:00–19:59
  return "night";                            // 20:00–3:59
}
const TIME_COLORS = {
  morning:{ badge:"#7ec8c8", badgeBg:"rgba(126,200,200,0.13)", icon:"icons/60px-Morning_Icon_BDSP.png",
    skyGrad:"linear-gradient(180deg,#080e14 0%,#0a1c22 25%,#0e2a2e 55%,#123636 100%)",
    bodyLeft:15, bodyType:"sun", bodyColor:"#a8d4d0", bodyGlow:"rgba(130,200,195,0.45)", bodyGlowOuter:"rgba(130,200,195,0.12)" },
  day:    { badge:"#7aaed4", badgeBg:"rgba(122,174,212,0.13)", icon:"icons/60px-Day_Icon_BDSP.png",
    skyGrad:"linear-gradient(180deg,#08101a 0%,#0c1c30 25%,#142844 55%,#1a3054 100%)",
    bodyLeft:50, bodyType:"sun", bodyColor:"#a0bcd8", bodyGlow:"rgba(130,170,215,0.45)", bodyGlowOuter:"rgba(130,170,215,0.12)" },
  night:  { badge:"#9080c8", badgeBg:"rgba(144,128,200,0.13)", icon:"icons/60px-Night_Icon_BDSP.png",
    skyGrad:"linear-gradient(180deg,#070610 0%,#0d0820 30%,#140e2e 60%,#181436 100%)",
    bodyLeft:82, bodyType:"moon", bodyColor:"#c0b8d8", bodyGlow:"rgba(155,140,200,0.42)", bodyGlowOuter:"rgba(155,140,200,0.11)" },
};
const STARS = Array.from({length:30},(_,i)=>({
  x:((i*37.3+7)%98)+1, y:((i*61.7+11)%70)+5,
  r:i%4===0?2.5:i%3===0?2:1.5,
  dur:2.5+(i%5)*0.6, delay:(i*0.43)%3.5,
}));

// ─── 100% COMPLETION CHECKLIST DATA ──────────────────────────────────────────
const COMPLETION_SECTIONS = [
  {
    id:"trainer-card", title:"Trainer Card Stars", color:"#d4b840",
    items:[
      { id:"johto-champ",      label:"★   Enter the Hall of Fame",          note:"Defeat the Johto Elite Four + Champion Lance" },
      { id:"shiny-leaves",     label:"★★  Shiny Leaf Crown",                note:"Collect 5 Shiny Leaves on one Pokémon, then speak to Ethan/Lyra in New Bark Town" },
      { id:"pokeathlon-all",   label:"★★★ Win all 10 Pokéathlon events",    note:"Set a record in all 10 events across the 5 Pokéathlon Domes" },
      { id:"battle-tower-100", label:"★★★★ 100-win streak at Battle Tower", note:"Win 100 consecutive battles in the Battle Tower" },
      { id:"natl-dex-star",    label:"★★★★★ National Pokédex complete",      note:"Capture 484 Pokémon — out of scope for this tracker", disabled:true },
    ],
  },
  {
    id:"story", title:"Story & Badges", color:"#c8960a",
    items:[
      { id:"all-johto-badges", label:"All 8 Johto Badges",      auto:"all-johto-badges", note:"Defeat all 8 Johto Gym Leaders" },
      { id:"all-kanto-badges", label:"All 8 Kanto Badges",      auto:"all-kanto-badges", note:"Defeat all 8 Kanto Gym Leaders" },
      { id:"kanto-champ",      label:"Defeat Red on Mt. Silver", note:"Complete the Kanto post-game challenge" },
    ],
  },
  {
    id:"pokedex", title:"Johto Pokédex", color:"#4ab770",
    items:[
      { id:"johto-dex", label:"Johto Pokédex completed", auto:"johto-dex", note:"Catch all non-event Pokémon in the tracker's Johto Dex" },
      { id:"diploma",   label:"Received Diploma",         note:"Talk to Game Freak director in Goldenrod City Condominiums" },
    ],
  },
  {
    id:"legendaries", title:"Legendary Captures", color:"#a87acc",
    items:[
      { id:"lgd-raikou",   label:"Raikou",   auto:"caught-raikou",   note:"Roaming Johto — unlocks after visiting Burned Tower" },
      { id:"lgd-entei",    label:"Entei",    auto:"caught-entei",    note:"Roaming Johto — unlocks after visiting Burned Tower" },
      { id:"lgd-suicune",  label:"Suicune",  auto:"caught-suicune",  note:"Route 25 → Cianwood → Vermilion → Cerulean → Mt. Mortar" },
      { id:"lgd-lugia",    label:"Lugia",    auto:"caught-lugia",    note:"Whirl Islands — HG requires Silver Wing from Pewter City old man" },
      { id:"lgd-hooh",     label:"Ho-Oh",    auto:"caught-hooh",     note:"Bell Tower — SS requires Rainbow Wing from Pewter City old man" },
      { id:"lgd-articuno", label:"Articuno", auto:"caught-articuno", note:"Seafoam Islands B3F" },
      { id:"lgd-zapdos",   label:"Zapdos",   auto:"caught-zapdos",   note:"Power Plant" },
      { id:"lgd-moltres",  label:"Moltres",  auto:"caught-moltres",  note:"Mt. Silver 2F" },
      { id:"lgd-mewtwo",   label:"Mewtwo",   auto:"caught-mewtwo",   note:"Cerulean Cave B1F" },
      { id:"lgd-latias",   label:"Latias",   auto:"caught-latias",   note:"Roaming Kanto (HG) after defeating Red — or trade from SS" },
      { id:"lgd-latios",   label:"Latios",   auto:"caught-latios",   note:"Roaming Kanto (SS) after defeating Red — or trade from HG" },
      { id:"lgd-mew",      label:"Mew",      auto:"caught-mew",      note:"Pokéwalker — optional", optional:true },
      { id:"lgd-celebi",   label:"Celebi",   auto:"caught-celebi",   note:"Ilex Forest Shrine via Pokéwalker or event — optional", optional:true },
    ],
  },
  {
    id:"key-events", title:"Key Events & Items", color:"#5a9fd4",
    items:[
      { id:"kimono-girls",  label:"Kimono Girls all defeated",  note:"Battle all 5 Kimono Girls at Ecruteak Dance Theater — unlocks Lugia/Ho-Oh ritual" },
      { id:"silver-wing",   label:"Silver Wing obtained",       note:"SS: from Radio Director after Team Rocket disbands · HG: from old man in Pewter City" },
      { id:"rainbow-wing",  label:"Rainbow Wing obtained",      note:"HG: from Radio Director after Team Rocket disbands · SS: from old man in Pewter City" },
      { id:"natl-dex-item", label:"National Pokédex obtained",  note:"From Prof. Oak in Olivine Harbor building after entering the Hall of Fame" },
      { id:"super-rod",     label:"Super Rod obtained",         note:"From the fisherman on Route 12" },
    ],
  },
  {
    id:"hms", title:"HMs", color:"#8888d0",
    items:[
      { id:"hm-cut",       label:"HM01 Cut",        note:"From the Charcoal Man's apprentice in Ilex Forest after catching his Farfetch'd" },
      { id:"hm-fly",       label:"HM02 Fly",        note:"From Chuck's wife outside Cianwood City Gym after defeating Chuck" },
      { id:"hm-surf",      label:"HM03 Surf",       note:"From Elder Li in Ecruteak City after defeating the Kimono Girls" },
      { id:"hm-strength",  label:"HM04 Strength",   note:"From the sailor in Olivine City Café" },
      { id:"hm-whirlpool", label:"HM05 Whirlpool",  note:"From Lance in the Mahogany Rocket Hideout" },
      { id:"hm-rocksmash", label:"HM06 Rock Smash", note:"From a man in Cianwood City" },
      { id:"hm-waterfall", label:"HM07 Waterfall",  note:"From Jasmine on the beach after earning all 16 badges" },
      { id:"hm-rockclimb", label:"HM08 Rock Climb", note:"From Prof. Oak in Pallet Town after earning all 16 badges" },
    ],
  },
  {
    id:"battle-frontier", title:"Battle Frontier Prints", color:"#c85252",
    items:[
      { id:"bf-castle-silver",  label:"Battle Castle — Silver Print",  optional:true, note:"Defeat Castle Valet Darach (21-win streak)",      reward:"Silver Print" },
      { id:"bf-castle-gold",    label:"Battle Castle — Gold Print",    optional:true, note:"Defeat Castle Valet Darach again (49 wins)",       reward:"Gold Print"   },
      { id:"bf-hall-silver",    label:"Battle Hall — Silver Print",    optional:true, note:"Defeat Hall Matron Argenta (50-win streak)",       reward:"Silver Print" },
      { id:"bf-hall-gold",      label:"Battle Hall — Gold Print",      optional:true, note:"Defeat Hall Matron Argenta again (170 wins)",      reward:"Gold Print"   },
      { id:"bf-tower-silver",   label:"Battle Tower — Silver Print",   optional:true, note:"Defeat Tower Tycoon Palmer (21-win streak)",       reward:"Silver Print" },
      { id:"bf-tower-gold",     label:"Battle Tower — Gold Print",     optional:true, note:"Defeat Tower Tycoon Palmer again (49 wins)",       reward:"Gold Print"   },
      { id:"bf-factory-silver", label:"Battle Factory — Silver Print", optional:true, note:"Defeat Factory Head Thorton (21-win streak)",      reward:"Silver Print" },
      { id:"bf-factory-gold",   label:"Battle Factory — Gold Print",   optional:true, note:"Defeat Factory Head Thorton again (49 wins)",      reward:"Gold Print"   },
      { id:"bf-arcade-silver",  label:"Battle Arcade — Silver Print",  optional:true, note:"Defeat Arcade Star Dahlia (21-win streak)",        reward:"Silver Print" },
      { id:"bf-arcade-gold",    label:"Battle Arcade — Gold Print",    optional:true, note:"Defeat Arcade Star Dahlia again (49 wins)",        reward:"Gold Print"   },
    ],
  },
];

// ─── AREA TYPE ────────────────────────────────────────────────────────────────
function getAreaType(area) {
  const n = area.name.toLowerCase();
  if (n.includes("route")) return "route";
  if (n.includes("cave") || n.includes("tunnel") || n.includes("mt. moon") ||
      n.includes("forest") || n.includes("tower") || n.includes("hideout") ||
      n.includes("mansion") || n.includes("rocket") || n.includes("dungeon")) return "cave";
  if (n.includes("s.s.") || n.includes("seafoam") || n.includes("sea") ||
      n.includes("anne") || n.includes("island")) return "water";
  if (n.includes("safari")) return "safari";
  if (n.includes("game corner") || n.includes("underground path")) return "special";
  return "city";
}
// ─── TM / HM DATA ─────────────────────────────────────────────────────────────
const TM_TYPE_COLOR = {
  Normal:"#8a8a70",Fire:"#d06828",Water:"#4870d8",Electric:"#c0a018",
  Grass:"#58a030",Ice:"#70b8b8",Fighting:"#a01818",Poison:"#8028a0",
  Ground:"#b09040",Flying:"#8070c0",Psychic:"#d03870",Bug:"#789018",
  Rock:"#908028",Ghost:"#504070",Dragon:"#5020c0",Dark:"#4c3830",
  Steel:"#8888a8",
};
const TM_DATA = []; // TODO: Add HGSS TM locations (92 TMs)
const HM_DATA = []; // TODO: Add HGSS HM locations (8 HMs)
const AREA_TINT = {
  route:   { bar:"#4a8a38", bg:"rgba(40,90,28,0.13)" },
  cave:    { bar:"#7a6a52", bg:"rgba(80,65,45,0.14)" },
  water:   { bar:"#3a7acc", bg:"rgba(28,70,140,0.13)" },
  safari:  { bar:"#5aaa40", bg:"rgba(50,100,28,0.13)" },
  special: { bar:"#9a5acc", bg:"rgba(90,50,130,0.13)" },
  city:    { bar:"#c8960a", bg:"rgba(100,72,10,0.11)" },
};

// ─── GYM BADGES ──────────────────────────────────────────────────────────────
// Johto badges (row 1) + Kanto badges (row 2)
const JOHTO_BADGES = [
  { id:"zephyr",   name:"Zephyr Badge",   city:"Violet City",    color:"#a0c8e8", shape:"drop"    },
  { id:"hive",     name:"Hive Badge",     city:"Azalea Town",    color:"#e0d860", shape:"hex"     },
  { id:"plain",    name:"Plain Badge",    city:"Goldenrod City", color:"#e8c840", shape:"flower"  },
  { id:"fog",      name:"Fog Badge",      city:"Ecruteak City",  color:"#a898d0", shape:"globe"   },
  { id:"storm",    name:"Storm Badge",    city:"Cianwood City",  color:"#60b8e8", shape:"bolt"    },
  { id:"mineral",  name:"Mineral Badge",  city:"Olivine City",   color:"#d0d8c0", shape:"octagon" },
  { id:"glacier",  name:"Glacier Badge",  city:"Mahogany Town",  color:"#88c8f0", shape:"cross"   },
  { id:"rising",   name:"Rising Badge",   city:"Blackthorn City",color:"#e88848", shape:"tri"     },
];
const KANTO_BADGES = [
  { id:"boulder", name:"Boulder Badge", city:"Pewter City",    color:"#b0907a", shape:"octagon" },
  { id:"cascade", name:"Cascade Badge", city:"Cerulean City",  color:"#5aaadd", shape:"drop"    },
  { id:"thunder", name:"Thunder Badge", city:"Vermilion City", color:"#e0d040", shape:"bolt"    },
  { id:"rainbow", name:"Rainbow Badge", city:"Celadon City",   color:"#e06898", shape:"flower"  },
  { id:"soul",    name:"Soul Badge",    city:"Fuchsia City",   color:"#b06ad0", shape:"cross"   },
  { id:"marsh",   name:"Marsh Badge",   city:"Saffron City",   color:"#60b8d8", shape:"hex"     },
  { id:"volcano", name:"Volcano Badge", city:"Cinnabar Island",color:"#e04828", shape:"tri"     },
  { id:"earth",   name:"Earth Badge",   city:"Viridian City",  color:"#c0a030", shape:"globe"   },
];
const BADGES = [...JOHTO_BADGES, ...KANTO_BADGES];

const GYM_DATA = [
  // ── Johto Gym Leaders ─────────────────────────────────────────────────────
  { id:"falkner", name:"Falkner", city:"Violet City",    badge:"Zephyr Badge",  badgeId:"zephyr",
    specialty:["Flying"],
    note:"Roost heals Pidgeotto mid-battle. Rock or Electric types recommended.",
    team:[
      {name:"Pidgey",    level:9,  types:["Normal","Flying"]},
      {name:"Pidgeotto", level:13, types:["Normal","Flying"]},
    ]},
  { id:"bugsy", name:"Bugsy", city:"Azalea Town", badge:"Hive Badge", badgeId:"hive",
    specialty:["Bug"],
    note:"Scyther knows Quick Attack and U-turn. Fire, Flying, or Rock moves recommended.",
    team:[
      {name:"Metapod",  level:14, types:["Bug"]},
      {name:"Kakuna",   level:14, types:["Bug","Poison"]},
      {name:"Scyther",  level:16, types:["Bug","Flying"]},
    ]},
  { id:"whitney", name:"Whitney", city:"Goldenrod City", badge:"Plain Badge", badgeId:"plain",
    specialty:["Normal"],
    note:"Miltank\'s Rollout + Milk Drink makes it notoriously tough. Bring a Ghost-type to wall Normal moves, or a Fighting-type to finish.",
    team:[
      {name:"Clefairy", level:18, types:["Normal"]},
      {name:"Miltank",  level:20, types:["Normal"]},
    ]},
  { id:"morty", name:"Morty", city:"Ecruteak City", badge:"Fog Badge", badgeId:"fog",
    specialty:["Ghost"],
    note:"Gengar\'s Shadow Ball and Hypnosis are dangerous. Dark-type moves or Normal/Fighting won\'t hit Ghosts — use Ghost or Psychic.",
    team:[
      {name:"Gastly",  level:21, types:["Ghost","Poison"]},
      {name:"Haunter", level:21, types:["Ghost","Poison"]},
      {name:"Haunter", level:23, types:["Ghost","Poison"]},
      {name:"Gengar",  level:25, types:["Ghost","Poison"]},
    ]},
  { id:"chuck", name:"Chuck", city:"Cianwood City", badge:"Storm Badge", badgeId:"storm",
    specialty:["Fighting"],
    note:"Poliwrath has Surf — don\'t bring Fire types. Psychic or Flying recommended.",
    team:[
      {name:"Primeape",  level:27, types:["Fighting"]},
      {name:"Poliwrath", level:30, types:["Water","Fighting"]},
    ]},
  { id:"jasmine", name:"Jasmine", city:"Olivine City", badge:"Mineral Badge", badgeId:"mineral",
    specialty:["Steel"],
    note:"Steelix has high Defense and uses Screech. Fire or Fighting moves recommended.",
    team:[
      {name:"Magnemite", level:30, types:["Electric","Steel"]},
      {name:"Magnemite", level:30, types:["Electric","Steel"]},
      {name:"Steelix",   level:35, types:["Steel","Ground"]},
    ]},
  { id:"pryce", name:"Pryce", city:"Mahogany Town", badge:"Glacier Badge", badgeId:"glacier",
    specialty:["Ice"],
    note:"Piloswine is bulky and hits hard with Blizzard. Fire, Fighting, or Rock recommended.",
    team:[
      {name:"Seel",      level:27, types:["Water"]},
      {name:"Dewgong",   level:29, types:["Water","Ice"]},
      {name:"Piloswine", level:31, types:["Ice","Ground"]},
    ]},
  { id:"clair", name:"Clair", city:"Blackthorn City", badge:"Rising Badge", badgeId:"rising",
    specialty:["Dragon"],
    note:"Kingdra is only weak to Dragon — bring a Dragon-type or stock up on Ice Beam. Clair won\'t give the badge immediately; complete the Dragon\'s Den test first.",
    team:[
      {name:"Dragonair", level:37, types:["Dragon"]},
      {name:"Dragonair", level:37, types:["Dragon"]},
      {name:"Dragonair", level:37, types:["Dragon"]},
      {name:"Kingdra",   level:40, types:["Water","Dragon"]},
    ]},
  // ── Elite Four & Champion ──────────────────────────────────────────────────
  { id:"will", name:"Will", city:"Pokémon League", badge:null, badgeId:null,
    specialty:["Psychic"],
    note:"First member of the Elite Four. Dark, Bug, and Ghost moves are super effective.",
    team:[
      {name:"Xatu",       level:40, types:["Psychic","Flying"]},
      {name:"Jynx",       level:41, types:["Ice","Psychic"]},
      {name:"Exeggutor",  level:41, types:["Grass","Psychic"]},
      {name:"Slowbro",    level:41, types:["Water","Psychic"]},
      {name:"Xatu",       level:42, types:["Psychic","Flying"]},
    ]},
  { id:"koga", name:"Koga", city:"Pokémon League", badge:null, badgeId:null,
    specialty:["Poison"],
    note:"Uses status and stalling tactics — bring Antidotes or a Poison-immune Pokémon. Ground or Psychic recommended.",
    team:[
      {name:"Ariados",    level:40, types:["Bug","Poison"]},
      {name:"Venomoth",   level:41, types:["Bug","Poison"]},
      {name:"Forretress", level:43, types:["Bug","Steel"]},
      {name:"Muk",        level:42, types:["Poison"]},
      {name:"Crobat",     level:44, types:["Poison","Flying"]},
    ]},
  { id:"bruno", name:"Bruno", city:"Pokémon League", badge:null, badgeId:null,
    specialty:["Fighting"],
    note:"Machamp\'s No Guard + DynamicPunch means 100% confusion. Psychic or Flying recommended.",
    team:[
      {name:"Hitmontop",  level:42, types:["Fighting"]},
      {name:"Hitmonlee",  level:42, types:["Fighting"]},
      {name:"Hitmonchan", level:42, types:["Fighting"]},
      {name:"Onix",       level:43, types:["Rock","Ground"]},
      {name:"Machamp",    level:46, types:["Fighting"]},
    ]},
  { id:"karen", name:"Karen", city:"Pokémon League", badge:null, badgeId:null,
    specialty:["Dark"],
    note:"Gengar is Ghost/Poison — Fighting won\'t work. Use Ground for Houndoom, Bug or Fighting for Umbreon.",
    team:[
      {name:"Umbreon",   level:42, types:["Dark"]},
      {name:"Vileplume", level:42, types:["Grass","Poison"]},
      {name:"Gengar",    level:45, types:["Ghost","Poison"]},
      {name:"Murkrow",   level:44, types:["Dark","Flying"]},
      {name:"Houndoom",  level:47, types:["Dark","Fire"]},
    ]},
  { id:"lance", name:"Lance", city:"Pokémon League", badge:null, badgeId:null,
    specialty:["Dragon"],
    note:"Champion. Three Dragonite — bring Ice Beam. Aerodactyl and Charizard round out the team with Rock Slide.",
    team:[
      {name:"Gyarados",  level:44, types:["Water","Flying"]},
      {name:"Dragonite", level:47, types:["Dragon","Flying"]},
      {name:"Dragonite", level:47, types:["Dragon","Flying"]},
      {name:"Aerodactyl",level:46, types:["Rock","Flying"]},
      {name:"Charizard", level:46, types:["Fire","Flying"]},
      {name:"Dragonite", level:50, types:["Dragon","Flying"]},
    ]},
  // ── Kanto Gym Leaders (post-game) ─────────────────────────────────────────
  { id:"brock", name:"Brock", city:"Pewter City", badge:"Boulder Badge", badgeId:"boulder",
    specialty:["Rock"],
    note:"Post-game Brock has a full Rock-heavy team. Water and Grass are ideal.",
    team:[
      {name:"Graveler",  level:41, types:["Rock","Ground"]},
      {name:"Rhyhorn",   level:41, types:["Ground","Rock"]},
      {name:"Omastar",   level:42, types:["Rock","Water"]},
      {name:"Onix",      level:44, types:["Rock","Ground"]},
      {name:"Kabutops",  level:42, types:["Rock","Water"]},
      {name:"Golem",     level:47, types:["Rock","Ground"]},
    ]},
  { id:"misty", name:"Misty", city:"Cerulean City", badge:"Cascade Badge", badgeId:"cascade",
    specialty:["Water"],
    note:"Post-game Misty has high-level Water types. Electric and Grass recommended.",
    team:[
      {name:"Golduck",   level:42, types:["Water"]},
      {name:"Quagsire",  level:42, types:["Water","Ground"]},
      {name:"Lapras",    level:44, types:["Water","Ice"]},
      {name:"Cloyster",  level:42, types:["Water","Ice"]},
      {name:"Starmie",   level:47, types:["Water","Psychic"]},
      {name:"Gyarados",  level:47, types:["Water","Flying"]},
    ]},
  { id:"surge", name:"Lt. Surge", city:"Vermilion City", badge:"Thunder Badge", badgeId:"thunder",
    specialty:["Electric"],
    note:"Post-game Surge. Ground-types are immune to Electric — Rhydon, Golem, etc.",
    team:[
      {name:"Raichu",    level:44, types:["Electric"]},
      {name:"Electrode", level:40, types:["Electric"]},
      {name:"Electrode", level:42, types:["Electric"]},
      {name:"Magneton",  level:44, types:["Electric","Steel"]},
      {name:"Electabuzz",level:46, types:["Electric"]},
      {name:"Jolteon",   level:47, types:["Electric"]},
    ]},
  { id:"erika", name:"Erika", city:"Celadon City", badge:"Rainbow Badge", badgeId:"rainbow",
    specialty:["Grass"],
    note:"Post-game Erika. Fire, Ice, Flying, Bug, and Poison all work well.",
    team:[
      {name:"Jumpluff",  level:42, types:["Grass","Flying"]},
      {name:"Tangela",   level:42, types:["Grass"]},
      {name:"Victreebel",level:46, types:["Grass","Poison"]},
      {name:"Bellossom", level:46, types:["Grass"]},
      {name:"Vileplume", level:46, types:["Grass","Poison"]},
      {name:"Venusaur",  level:46, types:["Grass","Poison"]},
    ]},
  { id:"janine", name:"Janine", city:"Fuchsia City", badge:"Soul Badge", badgeId:"soul",
    specialty:["Poison"],
    note:"Koga\'s daughter, now Gym Leader. Uses Crobat and status moves. Psychic or Ground recommended.",
    team:[
      {name:"Crobat",    level:36, types:["Poison","Flying"]},
      {name:"Ariados",   level:33, types:["Bug","Poison"]},
      {name:"Venomoth",  level:39, types:["Bug","Poison"]},
      {name:"Weezing",   level:36, types:["Poison"]},
      {name:"Ariados",   level:36, types:["Bug","Poison"]},
    ]},
  { id:"sabrina", name:"Sabrina", city:"Saffron City", badge:"Marsh Badge", badgeId:"marsh",
    specialty:["Psychic"],
    note:"Post-game Sabrina. Dark, Bug, or Ghost moves recommended.",
    team:[
      {name:"Espeon",    level:46, types:["Psychic"]},
      {name:"Mr. Mime",  level:46, types:["Psychic"]},
      {name:"Jynx",      level:46, types:["Ice","Psychic"]},
      {name:"Alakazam",  level:50, types:["Psychic"]},
    ]},
  { id:"blaine", name:"Blaine", city:"Seafoam Islands", badge:"Volcano Badge", badgeId:"volcano",
    specialty:["Fire"],
    note:"Blaine relocated from Cinnabar Island. Water, Ground, or Rock recommended.",
    team:[
      {name:"Magcargo",  level:44, types:["Fire","Rock"]},
      {name:"Rapidash",  level:50, types:["Fire"]},
      {name:"Magmar",    level:48, types:["Fire"]},
      {name:"Arcanine",  level:54, types:["Fire"]},
    ]},
  { id:"blue", name:"Blue", city:"Viridian City", badge:"Earth Badge", badgeId:"earth",
    specialty:["Normal","Fire","Water","Grass","Psychic","Rock"],
    note:"Rival turned Gym Leader. Diverse team — no single type covers it all. Strong team needed.",
    team:[
      {name:"Pidgeot",   level:56, types:["Normal","Flying"]},
      {name:"Alakazam",  level:54, types:["Psychic"]},
      {name:"Rhydon",    level:56, types:["Ground","Rock"]},
      {name:"Arcanine",  level:58, types:["Fire"]},
      {name:"Exeggutor", level:58, types:["Grass","Psychic"]},
      {name:"Machamp",   level:58, types:["Fighting"]},
    ]},
  // ── Mt. Silver ────────────────────────────────────────────────────────────
  { id:"red", name:"Red", city:"Mt. Silver", badge:null, badgeId:null,
    specialty:["Electric","Water","Normal","Psychic","Fire"],
    note:"The ultimate challenge. Pikachu holds a Light Ball — 2× Sp. Atk. Ice Beam for the Dragon-type threats.",
    team:[
      {name:"Pikachu",   level:88, types:["Electric"], note:"Holds Light Ball"},
      {name:"Lapras",    level:80, types:["Water","Ice"]},
      {name:"Snorlax",   level:82, types:["Normal"]},
      {name:"Espeon",    level:80, types:["Psychic"]},
      {name:"Blastoise", level:84, types:["Water"]},
      {name:"Charizard", level:84, types:["Fire","Flying"]},
    ]},
];

// ─── JOHTO/KANTO MAP NODES ─────────────────────────────────────────────────────
const MAP_NODES = []; // TODO: Add Johto + Kanto map nodes
const MAP_CONNECTIONS = []; // TODO: Add map route connections
// ─── TYPE CHART (Gen IV — HeartGold / SoulSilver) ──────────────────────────────
const TYPE_COLORS = {
  Normal:"#A8A878",Fire:"#F08030",Water:"#6890F0",Electric:"#F8D030",
  Grass:"#78C850",Ice:"#98D8D8",Fighting:"#C03028",Poison:"#A040A0",
  Ground:"#E0C068",Flying:"#A890F0",Psychic:"#F85888",Bug:"#A8B820",
  Rock:"#B8A038",Ghost:"#705898",Dragon:"#7038F8",Dark:"#705848",Steel:"#B8B8D0",
};
const TYPES_17 = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel"];
// TYPE_CHART[attacking][defending] = multiplier — only non-1× entries stored
const TYPE_CHART = {
  Normal:   {Ghost:0,  Rock:0.5, Steel:0.5},
  Fire:     {Fire:0.5, Water:0.5,Rock:0.5, Dragon:0.5,Grass:2,  Ice:2,    Bug:2,  Steel:2},
  Water:    {Water:0.5,Grass:0.5,Dragon:0.5,             Fire:2,  Ground:2, Rock:2},
  Electric: {Ground:0, Electric:0.5,Grass:0.5,Dragon:0.5,Water:2, Flying:2},
  Grass:    {Fire:0.5, Grass:0.5,Poison:0.5,Flying:0.5,Bug:0.5,Dragon:0.5,Steel:0.5,Water:2,Ground:2,Rock:2},
  Ice:      {Fire:0.5, Water:0.5,Ice:0.5,  Steel:0.5,   Grass:2, Ground:2, Flying:2,Dragon:2},
  Fighting: {Ghost:0,  Poison:0.5,Bug:0.5,Psychic:0.5,Flying:0.5,Normal:2,Rock:2,Steel:2,Ice:2,Dark:2},
  Poison:   {Steel:0,  Poison:0.5,Ground:0.5,Rock:0.5,Ghost:0.5, Grass:2},
  Ground:   {Flying:0, Grass:0.5,Bug:0.5,              Fire:2,  Electric:2,Poison:2,Rock:2,Steel:2},
  Flying:   {Electric:0.5,Rock:0.5,Steel:0.5,           Grass:2, Fighting:2,Bug:2},
  Psychic:  {Dark:0,   Psychic:0.5,Steel:0.5,           Fighting:2,Poison:2},
  Bug:      {Fire:0.5, Fighting:0.5,Flying:0.5,Ghost:0.5,Steel:0.5,Grass:2,Psychic:2,Dark:2},
  Rock:     {Fighting:0.5,Ground:0.5,Steel:0.5,          Fire:2,  Ice:2,   Flying:2, Bug:2},
  Ghost:    {Normal:0, Dark:0.5,                          Ghost:2, Psychic:2},
  Dragon:   {Steel:0.5,                                   Dragon:2},
  Dark:     {Fighting:0.5,Dark:0.5,Steel:0.5,             Ghost:2, Psychic:2},
  Steel:    {Fire:0.5, Water:0.5,Electric:0.5,Steel:0.5,  Ice:2,   Rock:2},
};
const POKEMON_TYPES = {
  // Gen I
  "Bulbasaur":["Grass","Poison"],    "Ivysaur":["Grass","Poison"],      "Venusaur":["Grass","Poison"],
  "Charmander":["Fire"],             "Charmeleon":["Fire"],             "Charizard":["Fire","Flying"],
  "Squirtle":["Water"],              "Wartortle":["Water"],             "Blastoise":["Water"],
  "Caterpie":["Bug"],                "Metapod":["Bug"],                 "Butterfree":["Bug","Flying"],
  "Weedle":["Bug","Poison"],         "Kakuna":["Bug","Poison"],         "Beedrill":["Bug","Poison"],
  "Pidgey":["Normal","Flying"],      "Pidgeotto":["Normal","Flying"],   "Pidgeot":["Normal","Flying"],
  "Rattata":["Normal"],              "Raticate":["Normal"],
  "Spearow":["Normal","Flying"],     "Fearow":["Normal","Flying"],
  "Ekans":["Poison"],                "Arbok":["Poison"],
  "Pikachu":["Electric"],            "Raichu":["Electric"],
  "Sandshrew":["Ground"],            "Sandslash":["Ground"],
  "Nidoran♀":["Poison"],         "Nidorina":["Poison"],             "Nidoqueen":["Poison","Ground"],
  "Nidoran♂":["Poison"],         "Nidorino":["Poison"],             "Nidoking":["Poison","Ground"],
  "Clefairy":["Normal"],             "Clefable":["Normal"],
  "Vulpix":["Fire"],                 "Ninetales":["Fire"],
  "Jigglypuff":["Normal"],           "Wigglytuff":["Normal"],
  "Zubat":["Poison","Flying"],       "Golbat":["Poison","Flying"],
  "Oddish":["Grass","Poison"],       "Gloom":["Grass","Poison"],        "Vileplume":["Grass","Poison"],
  "Paras":["Bug","Grass"],           "Parasect":["Bug","Grass"],
  "Venonat":["Bug","Poison"],        "Venomoth":["Bug","Poison"],
  "Diglett":["Ground"],              "Dugtrio":["Ground"],
  "Meowth":["Normal"],               "Persian":["Normal"],
  "Psyduck":["Water"],               "Golduck":["Water"],
  "Mankey":["Fighting"],             "Primeape":["Fighting"],
  "Growlithe":["Fire"],              "Arcanine":["Fire"],
  "Poliwag":["Water"],               "Poliwhirl":["Water"],             "Poliwrath":["Water","Fighting"],
  "Abra":["Psychic"],                "Kadabra":["Psychic"],             "Alakazam":["Psychic"],
  "Machop":["Fighting"],             "Machoke":["Fighting"],            "Machamp":["Fighting"],
  "Bellsprout":["Grass","Poison"],   "Weepinbell":["Grass","Poison"],   "Victreebel":["Grass","Poison"],
  "Tentacool":["Water","Poison"],    "Tentacruel":["Water","Poison"],
  "Geodude":["Rock","Ground"],       "Graveler":["Rock","Ground"],      "Golem":["Rock","Ground"],
  "Ponyta":["Fire"],                 "Rapidash":["Fire"],
  "Slowpoke":["Water","Psychic"],    "Slowbro":["Water","Psychic"],
  "Magnemite":["Electric","Steel"],  "Magneton":["Electric","Steel"],
  "Farfetch’d":["Normal","Flying"],
  "Doduo":["Normal","Flying"],       "Dodrio":["Normal","Flying"],
  "Seel":["Water"],                  "Dewgong":["Water","Ice"],
  "Grimer":["Poison"],               "Muk":["Poison"],
  "Shellder":["Water"],              "Cloyster":["Water","Ice"],
  "Gastly":["Ghost","Poison"],       "Haunter":["Ghost","Poison"],      "Gengar":["Ghost","Poison"],
  "Onix":["Rock","Ground"],
  "Drowzee":["Psychic"],             "Hypno":["Psychic"],
  "Krabby":["Water"],                "Kingler":["Water"],
  "Voltorb":["Electric"],            "Electrode":["Electric"],
  "Exeggcute":["Grass","Psychic"],   "Exeggutor":["Grass","Psychic"],
  "Cubone":["Ground"],               "Marowak":["Ground"],
  "Hitmonlee":["Fighting"],          "Hitmonchan":["Fighting"],
  "Lickitung":["Normal"],
  "Koffing":["Poison"],              "Weezing":["Poison"],
  "Rhyhorn":["Ground","Rock"],       "Rhydon":["Ground","Rock"],
  "Chansey":["Normal"],              "Tangela":["Grass"],               "Kangaskhan":["Normal"],
  "Horsea":["Water"],                "Seadra":["Water"],
  "Goldeen":["Water"],               "Seaking":["Water"],
  "Staryu":["Water"],                "Starmie":["Water","Psychic"],
  "Mr. Mime":["Psychic"],
  "Scyther":["Bug","Flying"],
  "Jynx":["Ice","Psychic"],
  "Electabuzz":["Electric"],         "Magmar":["Fire"],
  "Pinsir":["Bug"],
  "Tauros":["Normal"],
  "Magikarp":["Water"],              "Gyarados":["Water","Flying"],
  "Lapras":["Water","Ice"],          "Ditto":["Normal"],
  "Eevee":["Normal"],    "Vaporeon":["Water"],  "Jolteon":["Electric"],  "Flareon":["Fire"],
  "Porygon":["Normal"],
  "Omanyte":["Rock","Water"],        "Omastar":["Rock","Water"],
  "Kabuto":["Rock","Water"],         "Kabutops":["Rock","Water"],
  "Aerodactyl":["Rock","Flying"],    "Snorlax":["Normal"],
  "Articuno":["Ice","Flying"],       "Zapdos":["Electric","Flying"],    "Moltres":["Fire","Flying"],
  "Dratini":["Dragon"],              "Dragonair":["Dragon"],            "Dragonite":["Dragon","Flying"],
  "Mewtwo":["Psychic"],              "Mew":["Psychic"],
  // Gen II
  "Chikorita":["Grass"],             "Bayleef":["Grass"],               "Meganium":["Grass"],
  "Cyndaquil":["Fire"],              "Quilava":["Fire"],                "Typhlosion":["Fire"],
  "Totodile":["Water"],              "Croconaw":["Water"],              "Feraligatr":["Water"],
  "Sentret":["Normal"],              "Furret":["Normal"],
  "Hoothoot":["Normal","Flying"],    "Noctowl":["Normal","Flying"],
  "Ledyba":["Bug","Flying"],         "Ledian":["Bug","Flying"],
  "Spinarak":["Bug","Poison"],       "Ariados":["Bug","Poison"],
  "Crobat":["Poison","Flying"],
  "Chinchou":["Water","Electric"],   "Lanturn":["Water","Electric"],
  "Pichu":["Electric"],
  "Cleffa":["Normal"],               "Igglybuff":["Normal"],
  "Togepi":["Normal"],               "Togetic":["Normal","Flying"],
  "Natu":["Psychic","Flying"],       "Xatu":["Psychic","Flying"],
  "Mareep":["Electric"],             "Flaaffy":["Electric"],            "Ampharos":["Electric"],
  "Bellossom":["Grass"],
  "Marill":["Water"],                "Azumarill":["Water"],
  "Sudowoodo":["Rock"],              "Politoed":["Water"],
  "Hoppip":["Grass","Flying"],       "Skiploom":["Grass","Flying"],     "Jumpluff":["Grass","Flying"],
  "Aipom":["Normal"],
  "Sunkern":["Grass"],               "Sunflora":["Grass"],
  "Yanma":["Bug","Flying"],
  "Wooper":["Water","Ground"],       "Quagsire":["Water","Ground"],
  "Espeon":["Psychic"],              "Umbreon":["Dark"],
  "Murkrow":["Dark","Flying"],       "Slowking":["Water","Psychic"],
  "Misdreavus":["Ghost"],
  "Unown":["Psychic"],               "Wobbuffet":["Psychic"],
  "Girafarig":["Normal","Psychic"],
  "Pineco":["Bug"],                  "Forretress":["Bug","Steel"],
  "Dunsparce":["Normal"],
  "Gligar":["Ground","Flying"],      "Steelix":["Steel","Ground"],
  "Snubbull":["Normal"],             "Granbull":["Normal"],
  "Qwilfish":["Water","Poison"],     "Scizor":["Bug","Steel"],
  "Shuckle":["Bug","Rock"],          "Heracross":["Bug","Fighting"],
  "Sneasel":["Dark","Ice"],
  "Teddiursa":["Normal"],            "Ursaring":["Normal"],
  "Slugma":["Fire"],                 "Magcargo":["Fire","Rock"],
  "Swinub":["Ice","Ground"],         "Piloswine":["Ice","Ground"],
  "Corsola":["Water","Rock"],
  "Remoraid":["Water"],              "Octillery":["Water"],
  "Delibird":["Ice","Flying"],       "Mantine":["Water","Flying"],
  "Skarmory":["Steel","Flying"],
  "Houndour":["Dark","Fire"],        "Houndoom":["Dark","Fire"],
  "Kingdra":["Water","Dragon"],
  "Phanpy":["Ground"],               "Donphan":["Ground"],
  "Porygon2":["Normal"],             "Stantler":["Normal"],
  "Smeargle":["Normal"],             "Tyrogue":["Fighting"],
  "Hitmontop":["Fighting"],          "Smoochum":["Ice","Psychic"],
  "Elekid":["Electric"],             "Magby":["Fire"],
  "Miltank":["Normal"],              "Blissey":["Normal"],
  "Raikou":["Electric"],             "Entei":["Fire"],                  "Suicune":["Water"],
  "Larvitar":["Rock","Ground"],      "Pupitar":["Rock","Ground"],       "Tyranitar":["Rock","Dark"],
  "Lugia":["Psychic","Flying"],      "Ho-Oh":["Fire","Flying"],
  "Celebi":["Psychic","Grass"],
};

function getDefensiveChart(types) {
  const chart = {};
  for (const atk of TYPES_17) {
    let m = 1;
    for (const def of types) { const row = TYPE_CHART[atk]||{}; m *= row[def]!==undefined ? row[def] : 1; }
    chart[atk] = m;
  }
  return chart;
}

const MOVE_TYPES = {
  // HMs
  Cut:"Normal",Fly:"Flying",Surf:"Water",Strength:"Normal",
  "Rock Smash":"Fighting",Waterfall:"Water",Flash:"Normal",
  // Electric
  Thunderbolt:"Electric",Thunder:"Electric",ThunderPunch:"Electric","Thunder Wave":"Electric",
  // Fire
  Flamethrower:"Fire","Fire Blast":"Fire",Eruption:"Fire","Fire Punch":"Fire","Will-O-Wisp":"Fire","Lava Plume":"Fire","Heat Wave":"Fire",
  // Ice
  "Ice Beam":"Ice",Blizzard:"Ice","Ice Punch":"Ice","Sheer Cold":"Ice","Ice Fang":"Ice","Ice Shard":"Ice",
  // Water (priority / physical)
  "Aqua Jet":"Water",
  // Ground
  Earthquake:"Ground",Fissure:"Ground",
  // Grass
  SolarBeam:"Grass","Razor Leaf":"Grass","Vine Whip":"Grass","Petal Dance":"Grass",
  "Giga Drain":"Grass","Sleep Powder":"Grass",Spore:"Grass","Leech Seed":"Grass",
  "Wood Hammer":"Grass","Leaf Storm":"Grass",
  // Poison
  "Sludge Bomb":"Poison",Toxic:"Poison","Poison Fang":"Poison","Poison Jab":"Poison","Gunk Shot":"Poison","Cross Poison":"Poison",
  // Psychic
  Psychic:"Psychic",Psybeam:"Psychic","Future Sight":"Psychic","Zen Headbutt":"Psychic",
  Amnesia:"Psychic",Agility:"Psychic",Hypnosis:"Psychic",Extrasensory:"Psychic","Nasty Plot":"Dark",
  // Bug
  Megahorn:"Bug","Silver Wind":"Bug",Twineedle:"Bug","Pin Missile":"Bug","Leech Life":"Bug","Signal Beam":"Bug","X-Scissor":"Bug","Mach Punch":"Fighting","U-turn":"Bug",
  // Rock
  "Rock Slide":"Rock",AncientPower:"Rock","Stone Edge":"Rock","Power Gem":"Rock",
  // Ghost
  "Shadow Ball":"Ghost","Confuse Ray":"Ghost",Lick:"Ghost",
  // Dragon
  Outrage:"Dragon","Dragon Rage":"Dragon",Twister:"Dragon","Dragon Dance":"Dragon","Dragon Claw":"Dragon","Dragon Pulse":"Dragon",
  // Dark
  Crunch:"Dark",Pursuit:"Dark",Bite:"Dark","Dark Pulse":"Dark","Night Slash":"Dark",Payback:"Dark",
  // Steel
  "Iron Tail":"Steel","Metal Claw":"Steel","Meteor Mash":"Steel","Iron Head":"Steel",
  // Fighting
  "Brick Break":"Fighting","High Jump Kick":"Fighting","Hi Jump Kick":"Fighting",
  "Sky Uppercut":"Fighting",Submission:"Fighting",Superpower:"Fighting",
  "Close Combat":"Fighting","Focus Blast":"Fighting","Cross Chop":"Fighting",
  "Rock Smash":"Fighting","Karate Chop":"Fighting","Low Kick":"Fighting",
  "Hammer Arm":"Fighting",
  // Normal (damaging)
  "Hyper Beam":"Normal","Body Slam":"Normal",Thrash:"Normal","Hyper Voice":"Normal",
  "Skull Bash":"Normal",ExtremeSpeed:"Normal","Hyper Fang":"Normal","Super Fang":"Normal",
  Slash:"Normal","Tri Attack":"Normal","Rapid Spin":"Normal",Swift:"Normal",
  "Wing Attack":"Flying","Drill Peck":"Flying","Air Cutter":"Flying","Aerial Ace":"Flying","Air Slash":"Flying","Steel Wing":"Steel",
  "Water Gun":"Water","Hydro Pump":"Water",Whirlpool:"Water","Aqua Tail":"Water",
  // Normal — HMs
  "Rock Climb":"Normal",
  Slam:"Normal","Wrap":"Normal","Horn Drill":"Normal","Guillotine":"Normal",
  Endeavor:"Normal","Spit Up":"Normal","Mirror Move":"Flying",
  // ── Full-dex additions ─────────────────────────────────────────────────────
  // Fire
  "Sacred Fire":"Fire","Flare Blitz":"Fire","Blaze Kick":"Fire","Fire Fang":"Fire","Flame Wheel":"Fire",
  // Flying
  "Aeroblast":"Flying","Brave Bird":"Flying","Sky Attack":"Flying",
  // Bug
  "Bug Buzz":"Bug",
  // Water / Rock
  "Crabhammer":"Water","Rock Blast":"Rock",
  // Grass
  "Power Whip":"Grass","Leaf Blade":"Grass",
  // Fighting
  "Aura Sphere":"Fighting","DynamicPunch":"Fighting","Seismic Toss":"Fighting",
  // Electric / Steel / Ice
  Discharge:"Electric","Thunder Fang":"Electric","Flash Cannon":"Steel","Icicle Spear":"Ice",
  // Ghost / Poison / Ground
  "Night Shade":"Ghost","Destiny Bond":"Ghost",Sludge:"Poison","Bone Rush":"Ground",
  // Normal
  "Self-Destruct":"Normal","Egg Bomb":"Normal","Double Hit":"Normal",Explosion:"Normal",
  // Status
  "Calm Mind":"Psychic","Recover":"Normal",Rest:"Normal",
  // Normal (status — no damage, so super-effective display is skipped)
  "Swords Dance":"Normal","Belly Drum":"Normal",Safeguard:"Normal",Protect:"Normal",
  "Rain Dance":"Water","Sunny Day":"Fire",Sandstorm:"Rock",
  "Scary Face":"Normal","Focus Energy":"Normal",Softboiled:"Normal",
  "Mean Look":"Normal","Stockpile":"Normal",Swallow:"Normal",Leer:"Normal",Growl:"Normal",
};
// bp: base power (null = status/variable/OHKO), acc: accuracy (null = never misses), pp: max PP
const MOVE_STATS = {
  // HMs
  Cut:              { bp:50,  acc:95,  pp:30 },
  Fly:              { bp:70,  acc:95,  pp:15 },
  Surf:             { bp:95,  acc:100, pp:15 },
  Strength:         { bp:80,  acc:100, pp:15 },
  "Rock Smash":     { bp:20,  acc:100, pp:15 },
  Waterfall:        { bp:80,  acc:100, pp:15 },
  Flash:            { bp:null,acc:70,  pp:20 },
  // Electric
  Thunderbolt:      { bp:95,  acc:100, pp:15 },
  Thunder:          { bp:120, acc:70,  pp:10 },
  ThunderPunch:     { bp:75,  acc:100, pp:15 },
  "Thunder Wave":   { bp:null,acc:100, pp:20 },
  // Fire
  Flamethrower:     { bp:95,  acc:100, pp:15 },
  "Fire Blast":     { bp:120, acc:85,  pp:5  },
  Eruption:         { bp:150, acc:100, pp:5  },
  "Fire Punch":     { bp:75,  acc:100, pp:15 },
  "Lava Plume":     { bp:80,  acc:100, pp:15 },
  "Heat Wave":      { bp:100, acc:90,  pp:10 },
  "Will-O-Wisp":    { bp:null,acc:75,  pp:15 },
  // Ice
  "Ice Beam":       { bp:95,  acc:100, pp:10 },
  Blizzard:         { bp:120, acc:70,  pp:5  },
  "Ice Punch":      { bp:75,  acc:100, pp:15 },
  "Sheer Cold":     { bp:null,acc:30,  pp:5  },
  // Ground
  Earthquake:       { bp:100, acc:100, pp:10 },
  Fissure:          { bp:null,acc:30,  pp:5  },
  // Grass
  SolarBeam:        { bp:120, acc:100, pp:10 },
  "Razor Leaf":     { bp:55,  acc:95,  pp:25 },
  "Vine Whip":      { bp:35,  acc:100, pp:10 },
  "Petal Dance":    { bp:70,  acc:100, pp:20 },
  "Giga Drain":     { bp:60,  acc:100, pp:5  },
  "Sleep Powder":   { bp:null,acc:75,  pp:15 },
  Spore:            { bp:null,acc:100, pp:15 },
  "Leech Seed":     { bp:null,acc:90,  pp:10 },
  // Poison
  "Sludge Bomb":    { bp:90,  acc:100, pp:10 },
  Toxic:            { bp:null,acc:85,  pp:10 },
  "Poison Fang":    { bp:50,  acc:100, pp:15 },
  // Psychic
  Psychic:          { bp:90,  acc:100, pp:10 },
  Psybeam:          { bp:65,  acc:100, pp:20 },
  "Future Sight":   { bp:80,  acc:90,  pp:15 },
  Amnesia:          { bp:null,acc:null, pp:20 },
  Agility:          { bp:null,acc:null, pp:30 },
  Hypnosis:         { bp:null,acc:60,  pp:20 },
  // Bug
  Megahorn:         { bp:120, acc:85,  pp:10 },
  "Silver Wind":    { bp:60,  acc:100, pp:5  },
  "Signal Beam":    { bp:75,  acc:100, pp:15 },
  Twineedle:        { bp:25,  acc:100, pp:20 },
  "Pin Missile":    { bp:14,  acc:85,  pp:20 },
  "Leech Life":     { bp:20,  acc:100, pp:15 },
  // Rock
  "Rock Slide":     { bp:75,  acc:90,  pp:10 },
  "Stone Edge":     { bp:100, acc:80,  pp:5  },
  "Power Gem":      { bp:70,  acc:100, pp:20 },
  AncientPower:     { bp:60,  acc:100, pp:5  },
  // Ghost
  "Shadow Ball":    { bp:80,  acc:100, pp:15 },
  "Confuse Ray":    { bp:null,acc:100, pp:10 },
  Lick:             { bp:20,  acc:100, pp:30 },
  // Dragon
  "Dragon Claw":    { bp:80,  acc:100, pp:15 },
  Outrage:          { bp:90,  acc:100, pp:15 },
  "Dragon Rage":    { bp:null,acc:100, pp:10 },
  Twister:          { bp:40,  acc:100, pp:20 },
  "Dragon Dance":   { bp:null,acc:null, pp:20 },
  // Dark
  Crunch:           { bp:80,  acc:100, pp:15 },
  Pursuit:          { bp:40,  acc:100, pp:20 },
  Bite:             { bp:60,  acc:100, pp:25 },
  "Dark Pulse":     { bp:80,  acc:100, pp:15 },
  "Night Slash":    { bp:70,  acc:100, pp:15 },
  Payback:          { bp:50,  acc:100, pp:10 },
  // Steel
  "Iron Tail":      { bp:100, acc:75,  pp:15 },
  "Metal Claw":     { bp:50,  acc:95,  pp:35 },
  "Meteor Mash":    { bp:100, acc:85,  pp:10 },
  "Iron Head":      { bp:80,  acc:100, pp:15 },
  // Fighting
  "Brick Break":    { bp:75,  acc:100, pp:15 },
  "High Jump Kick": { bp:85,  acc:90,  pp:20 },
  "Hi Jump Kick":   { bp:85,  acc:90,  pp:20 },
  "Sky Uppercut":   { bp:85,  acc:90,  pp:15 },
  "Close Combat":   { bp:120, acc:100, pp:5  },
  "Focus Blast":    { bp:120, acc:70,  pp:5  },
  "Cross Chop":     { bp:100, acc:80,  pp:5  },
  Submission:       { bp:80,  acc:80,  pp:25 },
  Superpower:       { bp:120, acc:100, pp:5  },
  "Karate Chop":    { bp:50,  acc:100, pp:25 },
  "Low Kick":       { bp:null,acc:100, pp:20 },
  // Normal
  "Hyper Beam":     { bp:150, acc:90,  pp:5  },
  "Body Slam":      { bp:85,  acc:100, pp:15 },
  Thrash:           { bp:90,  acc:100, pp:20 },
  "Hyper Voice":    { bp:90,  acc:100, pp:10 },
  "Skull Bash":     { bp:100, acc:100, pp:15 },
  ExtremeSpeed:     { bp:80,  acc:100, pp:5  },
  "Hyper Fang":     { bp:80,  acc:90,  pp:15 },
  "Super Fang":     { bp:null,acc:90,  pp:10 },
  Slash:            { bp:70,  acc:100, pp:20 },
  "Tri Attack":     { bp:80,  acc:100, pp:10 },
  "Rapid Spin":     { bp:20,  acc:100, pp:40 },
  Swift:            { bp:60,  acc:null, pp:20 },
  Slam:             { bp:80,  acc:75,  pp:20 },
  Wrap:             { bp:15,  acc:85,  pp:20 },
  "Horn Drill":     { bp:null,acc:30,  pp:5  },
  Guillotine:       { bp:null,acc:30,  pp:5  },
  Endeavor:         { bp:null,acc:100, pp:5  },
  "Spit Up":        { bp:null,acc:100, pp:10 },
  // Flying
  "Wing Attack":    { bp:60,  acc:100, pp:35 },
  "Drill Peck":     { bp:80,  acc:100, pp:20 },
  "Air Cutter":     { bp:55,  acc:95,  pp:25 },
  "Aerial Ace":     { bp:60,  acc:null, pp:20 },
  // Water / HM
  "Water Gun":      { bp:40,  acc:100, pp:25 },
  "Hydro Pump":     { bp:120, acc:80,  pp:5  },
  Whirlpool:        { bp:35,  acc:85,  pp:15 },
  "Aqua Tail":      { bp:90,  acc:90,  pp:10 },
  "Rock Climb":     { bp:90,  acc:85,  pp:20 },
  // Psychic extras
  "Zen Headbutt":   { bp:80,  acc:90,  pp:15 },
  Extrasensory:     { bp:80,  acc:100, pp:30 },
  // Ice extras
  "Ice Fang":       { bp:65,  acc:95,  pp:15 },
  "Ice Shard":      { bp:40,  acc:100, pp:30 },
  // Flying extras
  "Air Slash":      { bp:75,  acc:95,  pp:20 },
  "Steel Wing":     { bp:70,  acc:90,  pp:25 },
  // Bug extras
  "X-Scissor":      { bp:80,  acc:100, pp:15 },
  "Mach Punch":     { bp:40,  acc:100, pp:30 },
  "U-turn":         { bp:70,  acc:100, pp:20 },
  // Dark extras
  "Sucker Punch":   { bp:80,  acc:100, pp:5  },
  "Nasty Plot":     { bp:null,acc:null, pp:20 },
  // Dragon extras
  "Dragon Pulse":   { bp:90,  acc:100, pp:10 },
  // Poison extras
  "Poison Jab":     { bp:80,  acc:100, pp:20 },
  "Cross Poison":   { bp:70,  acc:100, pp:20 },
  "Gunk Shot":      { bp:120, acc:70,  pp:5  },
  // Fighting extras
  "Hammer Arm":     { bp:100, acc:90,  pp:10 },
  // Grass extras
  "Wood Hammer":    { bp:120, acc:100, pp:15 },
  "Leaf Storm":     { bp:140, acc:90,  pp:5  },
  // Normal extras
  Explosion:        { bp:250, acc:100, pp:5  },
  // Water extras
  "Aqua Jet":       { bp:40,  acc:100, pp:20 },
  // Status
  "Swords Dance":   { bp:null,acc:null, pp:30 },
  "Belly Drum":     { bp:null,acc:null, pp:10 },
  Safeguard:        { bp:null,acc:null, pp:25 },
  Protect:          { bp:null,acc:null, pp:10 },
  "Rain Dance":     { bp:null,acc:null, pp:5  },
  "Sunny Day":      { bp:null,acc:null, pp:5  },
  Sandstorm:        { bp:null,acc:null, pp:10 },
  "Scary Face":     { bp:null,acc:100, pp:10 },
  "Focus Energy":   { bp:null,acc:null, pp:30 },
  Softboiled:       { bp:null,acc:null, pp:10 },
  "Mean Look":      { bp:null,acc:null, pp:5  },
  Stockpile:        { bp:null,acc:null, pp:20 },
  Swallow:          { bp:null,acc:null, pp:10 },
  Leer:             { bp:null,acc:100, pp:30 },
  Growl:            { bp:null,acc:100, pp:40 },
  "Mirror Move":    { bp:null,acc:null, pp:20 },
  // ── Full-dex additions ───────────────────────────────────────────────────────
  // Fire
  "Sacred Fire":    { bp:100, acc:95,  pp:5  },
  "Flare Blitz":    { bp:120, acc:100, pp:15 },
  "Blaze Kick":     { bp:85,  acc:90,  pp:10 },
  "Fire Fang":      { bp:65,  acc:95,  pp:15 },
  "Flame Wheel":    { bp:60,  acc:100, pp:25 },
  // Flying
  Aeroblast:        { bp:100, acc:95,  pp:5  },
  "Brave Bird":     { bp:120, acc:100, pp:15 },
  "Sky Attack":     { bp:140, acc:90,  pp:5  },
  // Bug
  "Bug Buzz":       { bp:90,  acc:100, pp:10 },
  // Water / Rock
  Crabhammer:       { bp:90,  acc:90,  pp:10 },
  "Rock Blast":     { bp:25,  acc:90,  pp:10 },
  // Grass
  "Power Whip":     { bp:120, acc:85,  pp:10 },
  "Leaf Blade":     { bp:90,  acc:100, pp:15 },
  // Fighting
  "Aura Sphere":    { bp:90,  acc:null, pp:20 },
  DynamicPunch:     { bp:100, acc:50,  pp:5  },
  "Seismic Toss":   { bp:null,acc:100, pp:20 },
  // Electric / Steel / Ice
  Discharge:        { bp:80,  acc:100, pp:15 },
  "Thunder Fang":   { bp:65,  acc:95,  pp:15 },
  "Flash Cannon":   { bp:80,  acc:100, pp:10 },
  "Icicle Spear":   { bp:25,  acc:100, pp:30 },
  // Ghost / Poison / Ground
  "Night Shade":    { bp:null,acc:100, pp:15 },
  "Destiny Bond":   { bp:null,acc:null, pp:5  },
  Sludge:           { bp:65,  acc:100, pp:20 },
  "Bone Rush":      { bp:25,  acc:90,  pp:10 },
  // Normal
  "Self-Destruct":  { bp:200, acc:100, pp:5  },
  "Egg Bomb":       { bp:100, acc:75,  pp:10 },
  "Double Hit":     { bp:35,  acc:90,  pp:10 },
  Explosion:        { bp:250, acc:100, pp:5  },
  // Status
  "Calm Mind":      { bp:null,acc:null, pp:20 },
  Recover:          { bp:null,acc:null, pp:10 },
  Rest:             { bp:null,acc:null, pp:10 },
};
// P = Physical, S = Special (status moves have no category badge — bp is null)
// Gen IV introduced per-move categories, breaking from the old type-based rule.
// Key exceptions from old type expectations: Bite/Crunch/Pursuit/Payback = P (was S),
// Shadow Ball = S (was P), Dark Pulse = S, Zen Headbutt = P, Aqua Tail = P,
// Waterfall = P, Leaf Blade = P.
const MOVE_CATEGORY = {
  // ── Physical ────────────────────────────────────────────────────────────────
  // HMs
  Cut:"P", Fly:"P", Strength:"P", "Rock Smash":"P", Waterfall:"P", "Rock Climb":"P",
  // Elemental punches
  ThunderPunch:"P", "Fire Punch":"P", "Ice Punch":"P",
  // Ground / Rock
  Earthquake:"P", "Stone Edge":"P", "Rock Slide":"P",
  // Fighting
  "Close Combat":"P", "Brick Break":"P", "Hi Jump Kick":"P", "High Jump Kick":"P",
  "Sky Uppercut":"P", Superpower:"P", Submission:"P", "Cross Chop":"P",
  "Karate Chop":"P", "Low Kick":"P",
  // Bug
  Megahorn:"P", "Pin Missile":"P", Twineedle:"P", "Leech Life":"P", "X-Scissor":"P", "U-turn":"P",
  // Dark — all Physical in Gen IV except Dark Pulse
  Crunch:"P", Bite:"P", Pursuit:"P", "Night Slash":"P", Payback:"P", "Sucker Punch":"P",
  // Steel
  "Iron Head":"P", "Iron Tail":"P", "Metal Claw":"P", "Meteor Mash":"P", "Steel Wing":"P",
  // Psychic (Gen IV Physical despite Psychic type)
  "Zen Headbutt":"P", "Extrasensory":"S",
  // Flying
  Fly:"P", "Wing Attack":"P", "Drill Peck":"P", "Aerial Ace":"P",
  // Dragon
  Outrage:"P", "Dragon Claw":"P",
  // Grass
  "Leaf Blade":"P", "Razor Leaf":"P", "Wood Hammer":"P",
  // Poison
  "Poison Jab":"P", "Poison Fang":"P", "Cross Poison":"P", "Gunk Shot":"P",
  // Water (Physical despite Water type in Gen IV)
  "Aqua Tail":"P", "Aqua Jet":"P",
  // Normal
  ExtremeSpeed:"P", "Body Slam":"P", Thrash:"P", "Hyper Beam":"P",
  "Skull Bash":"P", Slam:"P", "Hyper Fang":"P", Slash:"P",
  "Tri Attack":"P", "Rapid Spin":"P", Bite:"P", Explosion:"P",
  // ── Special ─────────────────────────────────────────────────────────────────
  // Water
  Surf:"S", "Hydro Pump":"S", Whirlpool:"S", "Water Gun":"S",
  // Fire
  Flamethrower:"S", "Fire Blast":"S", Eruption:"S", "Lava Plume":"S", "Heat Wave":"S",
  // Electric
  Thunderbolt:"S", Thunder:"S", Discharge:"S",
  // Ice
  "Ice Beam":"S", Blizzard:"S",
  // Psychic
  Psychic:"S", Psybeam:"S", "Future Sight":"S",
  // Ghost
  "Shadow Ball":"S",
  // Dark (Special in Gen IV)
  "Dark Pulse":"S",
  // Bug (Special in Gen IV)
  "Signal Beam":"S", "Silver Wind":"S",
  // Flying (Special in Gen IV)
  "Air Slash":"S",
  // Grass (Special)
  "Leaf Storm":"S",
  // Psychic (Special)
  Extrasensory:"S",
  // Dragon (Special)
  "Dragon Pulse":"S",
  // Ice extras
  "Ice Fang":"P", "Ice Shard":"P",
  // Rock (Special in Gen IV)
  "Power Gem":"S", AncientPower:"S",
  // Fighting (Physical except Focus Blast)
  "Hammer Arm":"P", "Mach Punch":"P", "Cross Chop":"P",
  // Fighting (Special)
  "Focus Blast":"S",
  // Poison
  "Sludge Bomb":"S",
  // Grass
  "Giga Drain":"S", SolarBeam:"S", "Petal Dance":"S",
  // Normal
  "Hyper Voice":"S", Swift:"S",
  // Dragon
  Twister:"S", "Dragon Rage":"S",
  // ── Full-dex additions ───────────────────────────────────────────────────────
  // Physical
  "Sacred Fire":"P","Flare Blitz":"P","Blaze Kick":"P","Fire Fang":"P","Flame Wheel":"P",
  "Brave Bird":"P","Sky Attack":"P","Crabhammer":"P","Power Whip":"P","Leaf Blade":"P",
  "Icicle Spear":"P","Rock Blast":"P","Self-Destruct":"P","Egg Bomb":"P","Double Hit":"P",
  Explosion:"P","Bone Rush":"P",DynamicPunch:"P",
  // Special
  Aeroblast:"S","Bug Buzz":"S","Aura Sphere":"S","Flash Cannon":"S",
  Discharge:"S","Night Shade":"S",Sludge:"S",
};

const STATUS_MOVES = new Set([
  "Swords Dance","Amnesia","Agility","Dragon Dance","Belly Drum","Nasty Plot",
  "Sleep Powder","Spore","Hypnosis","Toxic","Leech Seed","Protect",
  "Rain Dance","Sunny Day","Sandstorm","Safeguard","Thunder Wave",
  "Will-O-Wisp","Confuse Ray","Stockpile","Swallow","Softboiled",
  "Mean Look","Scary Face","Focus Energy","Mirror Move","Flash",
  "Leer","Growl","Tail Whip","String Shot","Disable","Encore","Glare","Screech",
  "Calm Mind","Recover","Rest","Destiny Bond","Perish Song",
]);
function getMoveSuper(moveName) {
  const type = MOVE_TYPES[moveName];
  if (!type || STATUS_MOVES.has(moveName)) return [];
  const row = TYPE_CHART[type] || {};
  return TYPES_17.filter(def => row[def] === 2);
}

// Parts that have been fully audited against the Bulbapedia walkthrough — extend as each part is verified.
const AUDITED_PARTS = new Set(["Part 1","Part 2","Part 3","Part 4","Part 5","Part 6","Part 7","Part 8","Part 9","Part 10","Part 11","Part 12","Part 13","Part 14","Part 15","Part 16","Part 17","Part 18","Part 19","Part 20","Part 21","Part 22","Part 23","Part 24","Part 25","Part 26","Part 27","Part 28","Part 29","Part 30","Part 31","Part 32"]);

const ROAMING_POKEMON = [
  {name:"Raikou",  id:243, region:"Johto", minJohtoBadges:4},
  {name:"Entei",   id:244, region:"Johto", minJohtoBadges:4},
  {name:"Latias",  id:380, region:"Kanto", minTotalBadges:16, hgOnly:true},
  {name:"Latios",  id:381, region:"Kanto", minTotalBadges:16, ssOnly:true},
];

// Pokémon obtainable ONLY via Pokéwalker in HGSS (no wild encounter, trade, or trivial gift elsewhere).
// Excludes: Wurmple (headbutt), Combee (headbutt), Torchic (Steven gift),
//           Kricketot/Buneary (swarm), Beldum (Saffron trade), Mime Jr./Budew (breeding).
const WALKER_EXCLUSIVE = new Set([
  // Hoenn Pokémon — no wild encounter in HGSS base game
  "Zigzagoon","Linoone","Volbeat","Illumise","Skitty",
  "Carvanha","Wailmer","Castform","Kecleon","Tropius","Snorunt","Pelipper",
  // Sinnoh Pokémon — no wild encounter in HGSS base game
  "Bidoof","Bibarel","Shinx","Bronzor","Snover",
  "Shellos","Finneon","Pachirisu","Chingling","Spiritomb","Croagunk","Chatot",
]);
// ─── CATCH RATE DATA ──────────────────────────────────────────────────────────
// Base catch rates by national dex ID (Gen I–IV, all HGSS-obtainable Pokémon)
const CATCH_RATE_BY_NATID = {
  // Gen I
  1:45,2:45,3:45,4:45,5:45,6:45,7:45,8:45,9:45,
  10:255,11:120,12:45,13:255,14:120,15:45,
  16:255,17:120,18:45,19:255,20:127,21:255,22:90,
  23:255,24:90,25:190,26:75,27:255,28:90,
  29:235,30:120,31:45,32:235,33:120,34:45,
  35:150,36:25,37:190,38:75,39:170,40:50,
  41:255,42:90,43:255,44:120,45:45,46:190,47:75,
  48:190,49:75,50:255,51:50,52:255,53:90,
  54:190,55:75,56:190,57:75,58:190,59:75,
  60:255,61:120,62:45,63:200,64:100,65:50,
  66:180,67:90,68:45,69:255,70:120,71:45,
  72:190,73:60,74:255,75:120,76:45,77:190,78:60,
  79:190,80:75,81:190,82:60,83:45,84:190,85:45,
  86:190,87:75,88:190,89:75,90:190,91:60,
  92:190,93:90,94:45,95:45,96:190,97:75,
  98:225,99:60,100:190,101:60,102:90,103:45,
  104:190,105:75,106:45,107:45,108:45,
  109:190,110:60,111:120,112:60,113:30,114:45,115:45,
  116:225,117:75,118:225,119:60,120:225,121:60,
  122:45,123:45,124:45,125:45,126:45,127:45,128:45,
  129:255,130:45,131:45,132:35,
  133:45,134:45,135:45,136:45,137:45,
  138:45,139:45,140:45,141:45,142:45,
  143:25,144:3,145:3,146:3,147:45,148:45,149:45,150:3,151:45,
  // Gen II
  152:45,153:45,154:45,155:45,156:45,157:45,158:45,159:45,160:45,
  161:255,162:90,163:255,164:90,165:255,166:90,167:255,168:90,169:90,
  170:190,171:75,172:190,173:150,174:170,175:190,176:75,
  177:190,178:75,179:235,180:120,181:45,182:45,183:190,184:75,
  185:65,186:45,187:255,188:120,189:45,190:45,191:235,192:120,193:75,
  194:255,195:90,196:45,197:45,198:30,199:70,200:45,201:225,202:45,
  203:60,204:190,205:75,206:190,207:60,208:25,209:190,210:75,
  211:190,212:25,213:190,214:45,215:60,216:120,217:60,
  218:190,219:75,220:225,221:75,222:60,223:190,224:75,
  225:45,226:25,227:25,228:120,229:45,230:45,231:120,232:60,
  233:45,234:45,235:45,236:75,237:45,238:45,239:45,240:45,
  241:45,242:30,243:3,244:3,245:3,246:45,247:45,248:45,249:3,250:3,251:45,
  // Gen III (Pokéwalker / events)
  255:45,263:255,264:90,265:255,279:45,298:150,300:255,302:35,
  307:180,313:150,314:150,318:225,320:125,349:255,351:45,352:200,
  355:190,357:200,361:190,374:3,
  // Gen IV (Pokéwalker)
  399:255,400:127,401:255,403:235,406:255,415:120,417:200,418:190,
  422:190,427:190,433:120,436:190,438:255,439:145,440:130,441:30,
  442:100,446:50,453:140,456:190,459:120,
};
const CATCH_RATE_DATA = [...DEX, ...NATIONAL_DEX].map(p => ({
  id: p.id, name: p.name, rate: CATCH_RATE_BY_NATID[p.id] ?? 45,
}));
// ─── SPRITES ─────────────────────────────────────────────────────────────────
const DEX_ID = Object.fromEntries(DEX.map(p => [p.name, p.id]));
const JOHTO_DEX_ID = Object.fromEntries(DEX.map(p => [p.name, p.johtoId]));
const NATIONAL_DEX_ID = Object.fromEntries(NATIONAL_DEX.map(p => [p.name, p.id]));
const allDexId = name => DEX_ID[name] || NATIONAL_DEX_ID[name] || null;
const pokeSpriteUrl = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const ITEM_SPRITE = {
  "Antidote":"antidote","Potion":"potion","Poké Ball":"poke-ball","Poké Ball ×5":"poke-ball",
  "Great Ball":"great-ball","Ultra Ball":"ultra-ball","Master Ball":"master-ball",
  "Town Map":"town-map","Oak's Parcel":"oaks-parcel","Teachy TV":"teachy-tv",
  "HP Up":"hp-up","Old Amber":"old-amber",
  "TM28 Dig":"tm-ground","TM39 Rock Tomb":"tm-rock",
  "Oran Berry":"oran-berry","Persim Berry":"persim-berry","Razz Berry":"razz-berry",
  "Pecha Berry":"pecha-berry","Bluk Berry":"bluk-berry",
  "Elixir":"elixir","Ether":"ether","Revive":"revive","Rare Candy":"rare-candy",
  "Star Piece":"star-piece","Escape Rope":"escape-rope",
  "Paralyze Heal":"paralyze-heal","Awakening":"awakening","Ice Heal":"ice-heal","Burn Heal":"burn-heal",
  "Tiny Mushroom":"tiny-mushroom","Big Mushroom":"big-mushroom","Moon Stone":"moon-stone",
  "TM09 Bullet Seed":"tm-grass","TM46 Thief":"tm-dark","TM05 Roar":"tm-normal",
  "TM45 Attract":"tm-normal","TM43 Secret Power":"tm-normal","TM03 Water Pulse":"tm-water",
  "Bicycle":"bicycle","Nugget":"nugget",
  "Dome Fossil":"dome-fossil","Helix Fossil":"helix-fossil",
  "Powder Jar":"powder-jar","Fame Checker":"fame-checker","S.S. Ticket":"ss-ticket",
  "Sitrus Berry":"sitrus-berry","Cheri Berry":"cheri-berry","Chesto Berry":"chesto-berry",
  "Max Ether":"max-ether","Vs. Seeker":"vs-seeker","Old Rod":"old-rod",
  "Bike Voucher":"bike-voucher","TM34 Shock Wave":"tm-electric","TM31 Brick Break":"tm-fighting",
  "TM44 Rest":"tm-normal","Hyper Potion":"hyper-potion","Super Potion":"super-potion",
  "X Attack":"x-attack","HM01 Cut":"hm01","Lava Cookie":"lava-cookie","Stardust":"stardust",
  "X Defend":"x-defend","Itemfinder":"itemfinder","HM05 Flash":"hm05",
  "TM40 Aerial Ace":"tm-flying","Everstone":"everstone",
  "Repel":"repel","Pearl":"pearl","Full Heal":"full-heal","PP Up":"pp-up",
  "Coin Case":"coin-case","Tea":"tea","Silph Scope":"silph-scope",
  "Poké Flute":"poke-flute","Cleanse Tag":"cleanse-tag",
  "TM16 Light Screen":"tm-psychic","TM20 Safeguard":"tm-normal","TM33 Reflect":"tm-psychic",
  "TM18 Rain Dance":"tm-water","TM19 Giga Drain":"tm-grass",
  "TM12 Taunt":"tm-dark","TM49 Snatch":"tm-dark","TM21 Frustration":"tm-normal",
  "Black Glasses":"black-glasses","Net Ball":"net-ball","Nest Ball":"nest-ball",
  "Calcium":"calcium","Protein":"protein","Lift Key":"lift-key",
  "X Speed":"x-speed","X Sp. Atk":"x-sp-atk","TM24 Thunderbolt":"tm-electric","TM35 Flamethrower":"tm-fire",
  "TM01 Focus Punch":"tm-fighting","TM04 Calm Mind":"tm-psychic","TM08 Bulk Up":"tm-fighting",
  "TM29 Psychic":"tm-psychic","TM41 Torment":"tm-dark","Card Key":"card-key",
  "TM27 Return":"tm-normal","TM48 Skill Swap":"tm-psychic",
  "TM06 Toxic":"tm-poison","TM32 Double Team":"tm-normal",
  "Good Rod":"good-rod","Super Rod":"super-rod",
  "HM03 Surf":"hm03","HM04 Strength":"hm04",
  "Gold Teeth":"gold-teeth","Iron":"iron","Max Revive":"max-revive",
  "Zinc":"zinc","Nanab Berry":"nanab-berry","Wepear Berry":"wepear-berry",
  "Lum Berry":"lum-berry","Leppa Berry":"leppa-berry","Rawst Berry":"rawst-berry",
  "Pinap Berry":"pinap-berry",
  "Amulet Coin":"amulet-coin","Leftovers":"leftovers",
  "Full Restore":"full-restore","Max Elixir":"max-elixir","Max Potion":"max-potion",
  "X Accuracy":"x-accuracy","Soothe Bell":"soothe-bell",
  "HM02 Fly":"hm02",
  "TM11 Sunny Day":"tm-fire","TM37 Sandstorm":"tm-rock",
  "TM42 Facade":"tm-normal","TM47 Steel Wing":"tm-steel",
  "Quick Claw":"quick-claw","Leaf Stone":"leaf-stone","Carbos":"carbos",
  "Big Pearl":"big-pearl","Water Stone":"water-stone",
  "Secret Key":"secret-key","TM14 Blizzard":"tm-ice","TM22 SolarBeam":"tm-grass","TM38 Fire Blast":"tm-fire",
  "PP Max":"pp-max","Max Repel":"max-repel","Dire Hit":"dire-hit",
  "Fire Stone":"fire-stone","HM06 Rock Smash":"hm06",
  "Iapapa Berry":"iapapa-berry","Aspear Berry":"aspear-berry",
  "Thunder Stone":"thunder-stone","TM17 Protect":"tm-normal","TM25 Thunder":"tm-electric",
  "Macho Brace":"macho-brace",
  "TM02 Dragon Claw":"tm-dragon","TM07 Hail":"tm-ice","Guard Spec.":"guard-spec","TM50 Overheat":"tm-fire",
  "Red Apricorn":"red-apricorn","Blue Apricorn":"blue-apricorn","Green Apricorn":"green-apricorn",
  "Yellow Apricorn":"yellow-apricorn","Black Apricorn":"black-apricorn","White Apricorn":"white-apricorn","Pink Apricorn":"pink-apricorn",
  "Blu Apricorn":"blue-apricorn","Grn Apricorn":"green-apricorn",
  "Ylw Apricorn":"yellow-apricorn","Blk Apricorn":"black-apricorn","Wht Apricorn":"white-apricorn","Pnk Apricorn":"pink-apricorn",
  // Hold items / type-boosters
  "Big Root":"big-root","Black Belt":"black-belt","Black Sludge":"black-sludge","BrightPowder":"bright-powder",
  "Charcoal":"charcoal","Choice Specs":"choice-specs","Destiny Knot":"destiny-knot","Dragon Fang":"dragon-fang",
  "Dubious Disc":"dubious-disc","Grip Claw":"grip-claw","Hard Stone":"hard-stone","King's Rock":"kings-rock",
  "Lagging Tail":"lagging-tail","Lax Incense":"lax-incense","Life Orb":"life-orb","Light Clay":"light-clay",
  "Luck Incense":"luck-incense","Lucky Punch":"lucky-punch","Magnet":"magnet","Mental Herb":"mental-herb",
  "Metal Coat":"metal-coat","Miracle Seed":"miracle-seed","Mystic Water":"mystic-water","NeverMeltIce":"never-melt-ice",
  "Odd Incense":"odd-incense","Oval Stone":"oval-stone","Poison Barb":"poison-barb","Power Herb":"power-herb",
  "Reaper Cloth":"reaper-cloth","Rock Incense":"rock-incense","Rose Incense":"rose-incense","Sea Incense":"sea-incense",
  "Sharp Beak":"sharp-beak","Shell Bell":"shell-bell","Smoke Ball":"smoke-ball","Soft Sand":"soft-sand",
  "Spell Tag":"spell-tag","Sticky Barb":"sticky-barb","Twisted Spoon":"twisted-spoon","Up-Grade":"up-grade",
  "Wave Incense":"wave-incense","Wise Glasses":"wise-glasses",
  // Evolution items / stones
  "Dawn Stone":"dawn-stone","Dusk Stone":"dusk-stone","Shiny Stone":"shiny-stone","Sun Stone":"sun-stone",
  "Electirizer":"electirizer","Magmarizer":"magmarizer","DeepSeaScale":"deep-sea-scale","DeepSeaTooth":"deep-sea-tooth",
  // HMs not yet covered
  "HM05 Whirlpool":"hm05","HM07 Waterfall":"hm07",
  // Balls
  "Fast Ball":"fast-ball","Sport Ball ×20":"sport-ball","Lure Ball ×2":"lure-ball",
  // Berries
  "Wacan Berry":"wacan-berry","Passho Berry":"passho-berry",
  // Healing / consumables
  "Moomoo Milk":"moomoo-milk","Revival Herb":"revival-herb","Energy Root":"energy-root",
  "EnergyPowder":"energy-powder","Heal Powder":"heal-powder","Parlyz Heal":"paralyze-heal",
  "Super Repel":"super-repel",
  // Key / quest items
  "Sacred Ash":"sacred-ash","Red Orb":"red-orb","Blue Orb":"blue-orb","Jade Orb":"jade-orb",
  "Red Scale":"red-scale","Rainbow Wing":"rainbow-wing","Silver Wing":"silver-wing",
  "Clear Bell":"clear-bell","Tidal Bell":"tidal-bell","Vs. Recorder":"vs-recorder",
  "Rage Candy Bar":"rage-candy-bar","Heart Scale":"heart-scale","Yellow Shard":"yellow-shard",
  "Black Flute":"black-flute","White Flute":"white-flute","Red Flute":"red-flute",
  "Blue Flute":"blue-flute","Yellow Flute":"yellow-flute",
  "SquirtBottle":"squirt-bottle","Machine Part":"machine-part","Apricorn Box":"apricorn-box",
  "Lost Item":"lost-item","SecretPotion":"secret-potion","Unown Report":"unown-report",
  "GB Sounds":"gb-sounds","Seal Case":"seal-case","Fashion Case":"fashion-case",
  "Grass Mail":"grass-mail","Basement Key":"basement-key","Berry Pots":"berry-pots",
  "Mystery Egg":"mystery-egg","Exp. Share":"exp-share","Dowsing MCHN":"dowsing-machine",
  "Blue Card":"blue-card","Pass":"pass",
  // X items / battle items
  "X Special":"x-sp-atk","Poké Doll":"poke-doll",
  // Plural / variant name aliases
  "Nugget ×2":"nugget","Oran Berry ×3":"oran-berry","Pecha Berry ×3":"pecha-berry",
  "Potion ×6":"potion","TinyMushroom":"tiny-mushroom",
  // HGSS TMs not yet covered
  "TM10 Hidden Power":"tm-normal","TM13 Ice Beam":"tm-ice","TM23 Iron Tail":"tm-steel",
  "TM26 Earthquake":"tm-ground","TM30 Shadow Ball":"tm-ghost","TM36 Sludge Bomb":"tm-poison",
  "TM51 Roost":"tm-flying","TM54 False Swipe":"tm-normal","TM55 Brine":"tm-water",
  "TM56 Fling":"tm-dark","TM57 Charge Beam":"tm-electric","TM59 Dragon Pulse":"tm-dragon",
  "TM60 Drain Punch":"tm-fighting","TM62 Silver Wind":"tm-bug","TM63 Embargo":"tm-dark",
  "TM64 Explosion":"tm-normal","TM65 Shadow Claw":"tm-ghost","TM66 Payback":"tm-dark",
  "TM67 Recycle":"tm-normal","TM69 Rock Polish":"tm-rock","TM70 Flash":"tm-normal",
  "TM72 Avalanche":"tm-ice","TM77 Psych Up":"tm-normal","TM79 Dark Pulse":"tm-dark",
  "TM80 Rock Slide":"tm-rock","TM82 Sleep Talk":"tm-normal","TM83 Natural Gift":"tm-normal",
  "TM84 Poison Jab":"tm-poison","TM85 Dream Eater":"tm-psychic","TM86 Grass Knot":"tm-grass",
  "TM87 Swagger":"tm-normal","TM88 Pluck":"tm-flying","TM89 U-turn":"tm-bug",
  "TM91 Flash Cannon":"tm-steel","TM92 Trick Room":"tm-psychic",
};
const itemSpriteUrl = name => { const s = ITEM_SPRITE[name]; return s ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${s}.png` : null; };
const METHOD_SPRITE_URL = {
  "Surf":      pokeSpriteUrl(131),
  "Old Rod":   itemSpriteUrl("Old Rod"),
  "Good Rod":  itemSpriteUrl("Good Rod"),
  "Super Rod": itemSpriteUrl("Super Rod"),
};

const TRAINER_CLASS_SPRITE = {
  "Bug Catcher":"bugcatcher","Camper":"camper","Lass":"lass","Youngster":"youngster",
  "Hiker":"hiker","Super Nerd":"supernerd","Team Rocket Grunt":"teamrocket",
  "Picnicker":"picnicker","Swimmer":"swimmer","Swimmer♂":"swimmer","Swimmer♀":"swimmerf",
  "Sis and Bro":"sisandbro-gen3",
  "Gentleman":"gentleman","Fisherman":"fisherman","Sailor":"sailor","Engineer":"engineer",
  "Gamer":"gamer-gen3","PokéManiac":"pokemaniac","Poké Maniac":"pokemaniac","Cue Ball":"cueball-gen3",
  "Pokéfan":"pokefan","Biker":"biker","Twins":"twins","Channeler":"channeler-gen3",
  "Beauty":"beauty","Cooltrainer":"beauty","Bird Keeper":"birdkeeper",
  "Young Couple":"youngcouple","Rocker":"rocker-gen3",
  "Crush Kin":"crushkin-gen3","Juggler":"juggler","Tamer":"tamer-gen3",
  "Scientist":"scientist","Black Belt":"blackbelt-gen3","Psychic":"psychic",
  "Burglar":"burglar",
  "Crush Girl":"crushgirl-gen3","Pokémon Ranger":"pokemonranger-gen3",
  "Aroma Lady":"aromalady-gen3","Tuber♀":"tuberf-gen3",
  "Cool Couple":"coolcouple-gen3","Elite Four":"elite-four-gen3",
  "Ruin Maniac":"ruinmaniac","Lady":"lady-gen3",
  "Painter":"painter-gen3","Rocket Admin":"teamrocket",
  "Sage":"sage","Elder":"elder","Firebreather":"firebreather",
  "Ace Trainer":"acetrainer","Ace Trainer F":"acetrainerf",
  "Executive":"executive","Rival":"silver",
  "School Kid":"schoolkid","Medium":"medium","Policeman":"officer",
  "Leader":"leader",
};
const TRAINER_NAME_SPRITE  = {
  "Brock":"brock","Misty":"misty","Lt. Surge":"lt-surge","Blue":"blue","Giovanni":"giovanni",
  "Erika":"erika","Koga":"koga","Sabrina":"sabrina","Blaine":"blaine",
  "Lorelei":"lorelei","Bruno":"bruno","Agatha":"agatha","Lance":"lance",
  "Silver":"silver","Red":"red",
  "Falkner":"falkner","Bugsy":"bugsy","Whitney":"whitney","Morty":"morty",
  "Chuck":"chuck","Jasmine":"jasmine","Pryce":"pryce","Clair":"clair",
  "Will":"will","Karen":"karen","Proton":"proton","Petrel":"petrel",
  "Ariana":"ariana","Archer":"archer",
};
const trainerSpriteUrl = (cls, name) => { const s = TRAINER_NAME_SPRITE[name] || TRAINER_CLASS_SPRITE[cls]; return s ? `https://play.pokemonshowdown.com/sprites/trainers/${s}.png` : null; };

function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }

// Animates a number when it changes — applies .hgss-tick-in for ~320ms.
function TickNumber({ value, style, color }) {
  const [tick, setTick] = React.useState(0);
  const prev = React.useRef(value);
  React.useEffect(() => {
    if (prev.current !== value) { prev.current = value; setTick(t => t + 1); }
  }, [value]);
  return (
    <span key={tick} className="hgss-tick-in" style={{ color, ...style }}>{value}</span>
  );
}
function groupByPart(arr) { return arr.reduce((a, x) => { (a[x.part] = a[x.part]||[]).push(x); return a; }, {}); }
function sortedGroupEntries(groups) { return Object.entries(groups).sort((a, b) => (parseInt(a[0].match(/\d+/)?.[0]||0) - parseInt(b[0].match(/\d+/)?.[0]||0))); }
function fmtHours(h) { return h < 1 ? `${Math.round(h * 60)}m` : `${h.toFixed(1)}h`; }

// ─── BADGE SVG ───────────────────────────────────────────────────────────────
function BadgeSVG({ shape, color, earned, size=24 }) {
  const s = size, h = s/2;
  const fill = earned ? color : "transparent";
  const stroke = color;
  const sw = 1.5;
  switch (shape) {
    case "octagon": return <svg viewBox="0 0 24 24" width={s} height={s}><polygon points="8,2 16,2 22,8 22,16 16,22 8,22 2,16 2,8" fill={fill} stroke={stroke} strokeWidth={sw}/></svg>;
    case "drop":    return <svg viewBox="0 0 24 24" width={s} height={s}><path d="M12,2 C12,2 4,10 4,15 A8,8 0 0 0 20,15 C20,10 12,2 12,2Z" fill={fill} stroke={stroke} strokeWidth={sw}/></svg>;
    case "bolt":    return <svg viewBox="0 0 24 24" width={s} height={s}><polygon points="14,2 8,13 12,13 10,22 18,10 13,10" fill={fill} stroke={stroke} strokeWidth={sw}/></svg>;
    case "flower":  return <svg viewBox="0 0 24 24" width={s} height={s}><circle cx="12" cy="12" r="4" fill={fill} stroke={stroke} strokeWidth={sw}/>{[0,60,120,180,240,300].map(a=><ellipse key={a} cx={12+Math.cos(a*Math.PI/180)*6} cy={12+Math.sin(a*Math.PI/180)*6} rx="3" ry="2.5" transform={`rotate(${a},${12+Math.cos(a*Math.PI/180)*6},${12+Math.sin(a*Math.PI/180)*6})`} fill={fill} stroke={stroke} strokeWidth={sw}/>)}</svg>;
    case "cross":   return <svg viewBox="0 0 24 24" width={s} height={s}><path d="M10,2 L14,2 L14,10 L22,10 L22,14 L14,14 L14,22 L10,22 L10,14 L2,14 L2,10 L10,10 Z" fill={fill} stroke={stroke} strokeWidth={sw}/></svg>;
    case "hex":     return <svg viewBox="0 0 24 24" width={s} height={s}><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill={fill} stroke={stroke} strokeWidth={sw}/></svg>;
    case "tri":     return <svg viewBox="0 0 24 24" width={s} height={s}><polygon points="12,2 22,20 2,20" fill={fill} stroke={stroke} strokeWidth={sw}/></svg>;
    case "globe":   return <svg viewBox="0 0 24 24" width={s} height={s}><circle cx="12" cy="12" r="9" fill={fill} stroke={stroke} strokeWidth={sw}/><ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke={stroke} strokeWidth={sw-0.5}/><line x1="3" y1="12" x2="21" y2="12" stroke={stroke} strokeWidth={sw-0.5}/></svg>;
    default: return null;
  }
}

function GymBadgeStrip({ earned, toggleBadge }) {
  const earnedCount = BADGES.filter(b => earned[b.id]).length;
  // Track badges that JUST flipped earned — spotlight them once.
  const prevRef = React.useRef(earned);
  const [glow, setGlow] = useState(null); // {id, nonce}
  useEffect(() => {
    const prev = prevRef.current || {};
    for (const b of BADGES) {
      if (!prev[b.id] && earned[b.id]) {
        setGlow({ id: b.id, nonce: Date.now() });
        const t = setTimeout(() => setGlow(g => (g && g.id === b.id ? null : g)), 950);
        prevRef.current = earned;
        return () => clearTimeout(t);
      }
    }
    prevRef.current = earned;
  }, [earned]);
  const BadgeRow = ({ badges, label }) => (
    <div style={{ display:"flex", alignItems:"center", gap:3, flexWrap:"nowrap" }}>
      <span style={{ fontSize:8, color:C.muted, letterSpacing:1.2, textTransform:"uppercase", minWidth:34, flexShrink:0 }}>{label}</span>
      {badges.map(b => {
        const isEarned = !!earned[b.id];
        const isGlowing = glow && glow.id === b.id;
        return (
          <button key={b.id} onClick={() => toggleBadge(b.id)}
            title={`${b.name} — ${b.city}${isEarned ? " ✓" : ""}`}
            className={isGlowing ? "hgss-spotlight" : ""}
            style={{ background:"none", border:"none", cursor:"pointer", padding:"2px", lineHeight:0,
              opacity: isEarned ? 1 : 0.22,
              filter: isEarned ? `drop-shadow(0 0 4px ${b.color}88)` : "none",
              transition:"opacity 0.25s, filter 0.25s, transform 0.2s",
              transform: isEarned ? "scale(1.05)" : "scale(1)",
              "--badge-glow": b.color }}>
            <BadgeSVG shape={b.shape} color={b.color} earned={isEarned} size={20} />
          </button>
        );
      })}
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4, margin:"10px 0 2px" }}>
      <BadgeRow badges={JOHTO_BADGES} label="Johto" />
      <BadgeRow badges={KANTO_BADGES} label="Kanto" />
      <span style={{ fontSize:10, color:C.muted }}>{earnedCount}/16 badges</span>
    </div>
  );
}

// ─── KANTO MAP ────────────────────────────────────────────────────────────────
function KantoMap({ areaId, setAreaId }) {
  const auditedIds = useMemo(() => new Set(AREAS.filter(a => AUDITED_PARTS.has(a.part)).map(a => a.id)), []);
  // De-duplicate overlapping node positions — prefer audited area
  const uniqueNodes = useMemo(() => {
    const seen = {};
    MAP_NODES.forEach(n => {
      const key = `${n.x},${n.y}`;
      if (!seen[key] || auditedIds.has(n.id)) seen[key] = n;
    });
    return Object.values(seen);
  }, [auditedIds]);

  return (
    <div style={{ display:"flex", flexDirection:"column", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ padding:"6px 10px 2px", fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase" }}>Kanto Map</div>
      <svg viewBox="10 45 175 145" style={{ width:"100%", height:"auto", display:"block" }}>
        {/* Water background */}
        <rect x="10" y="45" width="175" height="145" fill="#0d1e2e" />
        {/* Land */}
        <polygon points="20,185 20,95 50,65 75,55 90,55 130,55 175,60 185,75 185,130 165,175 120,185" fill="#151e10" />

        {/* Connections */}
        {MAP_CONNECTIONS.map(([aid, bid], i) => {
          const a = MAP_NODES.find(n => n.id === aid);
          const b = MAP_NODES.find(n => n.id === bid);
          if (!a || !b) return null;
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2e3e24" strokeWidth="1.2" />;
        })}

        {/* Nodes */}
        {uniqueNodes.map(node => {
          const isAudited = auditedIds.has(node.id);
          const isSel = areaId === node.id;
          const isCity = node.type === "city";
          const r = isCity ? 4.5 : 2.8;
          const color = isSel ? "var(--hgss-accent)" : isAudited ? (isCity ? "#c4a888" : "#6a8858") : "#2e2e2e";
          const clickable = isAudited;
          return (
            <g key={node.id} style={{ cursor: clickable ? "pointer" : "default" }}
               onClick={() => clickable && setAreaId(node.id)}>
              {clickable && <circle cx={node.x} cy={node.y} r={r+5} fill="transparent" />}
              {isSel && <circle cx={node.x} cy={node.y} r={r+3} fill="var(--hgss-accent)" opacity="0.2" />}
              <circle cx={node.x} cy={node.y} r={r}
                fill={color}
                stroke={isSel ? "var(--hgss-accent)" : isCity && isAudited ? "#8a7060" : "transparent"}
                strokeWidth="1" />
              {node.label && isCity && isAudited && (
                <text x={node.x} y={node.y - 6} textAnchor="middle"
                  fill={isSel ? "var(--hgss-accent)" : "#b0987a"}
                  fontSize="5.2" fontFamily="'DM Sans',sans-serif" fontWeight={isSel?"700":"400"}>{node.label}</text>
              )}
              {node.label && !isCity && isAudited && node.type === "dungeon" && (
                <text x={node.x+4} y={node.y+1} textAnchor="start"
                  fill="#6a8858" fontSize="4.5" fontFamily="'DM Sans',sans-serif">{node.label}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ display:"flex", gap:12, padding:"2px 10px 8px", fontSize:9, color:C.muted }}>
        <span><span style={{ color:"#c4a888" }}>●</span> City</span>
        <span><span style={{ color:"#6a8858" }}>●</span> Area</span>
        <span><span style={{ color:"#2e2e2e" }}>●</span> Pending</span>
      </div>
    </div>
  );
}

// ─── LIVING DEX PANEL ────────────────────────────────────────────────────────
function LivingDexPanel({ caught }) {
  const [open, setOpen] = useState(false);
  const tradeEvo   = ["Alakazam","Gengar","Machamp","Golem"];
  const fossilPair = [["Kabuto","Omanyte"],["Kabutops","Omastar"]];
  const dojo       = ["Hitmonlee","Hitmonchan"];
  const versionEx  = DEX.filter(p => p.hgOnly || p.ssOnly);
  const eventOnly  = DEX.filter(p => p.event);

  const needTrade  = tradeEvo.filter(n => !caught[n]);
  const needVersion= versionEx.filter(p => !caught[p.name]);
  const needEvent  = eventOnly.filter(p => !caught[p.name]);
  const fossilMissing = ["Kabuto","Omanyte","Kabutops","Omastar"].filter(n=>!caught[n]);
  const dojoMissing   = dojo.filter(n => !caught[n]);

  const issues = needTrade.length + needVersion.length + needEvent.length + fossilMissing.length + dojoMissing.length;

  return (
    <div style={{ margin:"16px 16px 0", background:C.card, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
      <div onClick={() => setOpen(o=>!o)} style={{ padding:"10px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(0,0,0,0.12)" }}>
        <span style={{ fontSize:12, fontWeight:"600" }}>Living Dex Checklist</span>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {issues > 0 && <span style={{ fontSize:10, color:C.gold, background:"rgba(200,150,10,0.12)", border:`1px solid rgba(200,150,10,0.3)`, padding:"1px 8px", borderRadius:99 }}>{issues} remaining</span>}
          <span style={{ color:C.muted, fontSize:11 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:12 }}>
          <LDexSection title="Trade Evolutions" color="#a87acc" items={tradeEvo.map(n=>({ name:n, done:!!caught[n], note:"Requires trade to evolve" }))} />
          <LDexSection title="Fossil Choice (one per file)" color={C.gold} items={[
            { name:"Kabuto",   done:!!caught["Kabuto"],   note:"Dome Fossil → Cinnabar Lab" },
            { name:"Omanyte",  done:!!caught["Omanyte"],  note:"Helix Fossil → Cinnabar Lab" },
            { name:"Kabutops", done:!!caught["Kabutops"], note:"Evolve Kabuto Lv.40" },
            { name:"Omastar",  done:!!caught["Omastar"],  note:"Evolve Omanyte Lv.40" },
          ]} note="⚠ Only one fossil per save — trade for the other." />
          <LDexSection title="Fighting Dojo (one per file)" color={C.gold} items={[
            { name:"Hitmonlee",  done:!!caught["Hitmonlee"],  note:"Left choice at Fighting Dojo" },
            { name:"Hitmonchan", done:!!caught["Hitmonchan"], note:"Right choice at Fighting Dojo" },
          ]} note="⚠ Only one per save — trade for the other." />
          <LDexSection title="Version Exclusives (HG)" color="#d46060" items={DEX.filter(p=>p.hgOnly).map(p=>({ name:p.name, done:!!caught[p.name], note:"HeartGold only — trade from SS" }))} />
          <LDexSection title="Version Exclusives (SS)" color="#3fa84a" items={DEX.filter(p=>p.ssOnly).map(p=>({ name:p.name, done:!!caught[p.name], note:"SoulSilver only — trade from HG" }))} />
          <LDexSection title="Event / Special" color="#a87acc" items={eventOnly.map(p=>({ name:p.name, done:!!caught[p.name], note:"Event-only — not obtainable in normal gameplay" }))} />
        </div>
      )}
    </div>
  );
}

function LDexSection({ title, color, items, note }) {
  const done = items.filter(i=>i.done).length;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:11, fontWeight:"600", color }}>{title}</span>
        <span style={{ fontSize:10, color: done===items.length ? C.green : C.muted }}>{done}/{items.length}</span>
      </div>
      {note && <div style={{ fontSize:10, color:C.gold, marginBottom:6, lineHeight:1.5 }}>{note}</div>}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {items.map(item => (
          <div key={item.name} title={item.note} style={{
            display:"flex", alignItems:"center", gap:5, padding:"3px 8px",
            background: item.done ? "rgba(74,175,116,0.08)" : "rgba(0,0,0,0.2)",
            border:`1px solid ${item.done ? C.green : C.border}`,
            borderRadius:6, fontSize:11, color: item.done ? C.green : C.muted,
            textDecoration: item.done ? "line-through" : "none",
          }}>
            <img src={pokeSpriteUrl(DEX_ID[item.name])} alt={item.name} style={{ width:20, height:20, imageRendering:"pixelated", opacity: item.done ? 1 : 0.4, filter: item.done ? "none" : "brightness(0)" }} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TMs TAB ──────────────────────────────────────────────────────────────────
function TMsTab({ tmState }) {
  const [showTMs, setShowTMs] = useState(true);
  const [showHMs, setShowHMs] = useState(true);

  const tmDone  = TM_DATA.filter(t => tmState[t.id]).length;
  const hmDone  = HM_DATA.filter(h => tmState[h.id]).length;
  const total   = TM_DATA.length + HM_DATA.length;
  const done    = tmDone + hmDone;

  const renderRow = (entry) => {
    const obtained = tmState[entry.id];
    const tc  = TM_TYPE_COLOR[entry.type] || "#8a8a70";
    const isHM = entry.id.startsWith("HM");
    return (
      <div key={entry.id}
        style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 20px",
                 cursor:"default", borderBottom:`1px solid ${C.border}`,
                 background: obtained ? "rgba(74,175,116,0.06)" : "transparent",
                 opacity: obtained ? 0.65 : 1 }}>
        {/* ID badge */}
        <span style={{ fontSize:10, fontWeight:"700", fontFamily:"'Courier New',monospace",
                       background: isHM ? "rgba(90,176,216,0.18)" : "rgba(255,255,255,0.08)",
                       color: isHM ? "#5ab0d8" : C.muted,
                       borderRadius:4, padding:"2px 6px", flexShrink:0, minWidth:38, textAlign:"center" }}>
          {entry.id}
        </span>
        {/* Move name */}
        <span style={{ fontSize:13, fontWeight:"600", flex:"0 0 130px",
                       color: obtained ? C.green : C.text }}>
          {entry.move}
        </span>
        {/* Type badge */}
        <span style={{ fontSize:10, fontWeight:"700", borderRadius:4, padding:"2px 8px",
                       background:`${tc}28`, color:tc, flexShrink:0, minWidth:68, textAlign:"center" }}>
          {entry.type}
        </span>
        {/* Location note */}
        <span style={{ fontSize:11, color:C.muted, flex:1, minWidth:0,
                       overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {entry.note}
        </span>
        {/* Checkmark */}
        <span style={{ fontSize:14, color:C.green, flexShrink:0, width:18, textAlign:"center" }}>
          {obtained ? "✓" : ""}
        </span>
      </div>
    );
  };

  const SectionHeader = ({ label, count, total: tot, open, toggle }) => (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 20px",
                  background:"rgba(0,0,0,0.25)", borderBottom:`1px solid ${C.border}`,
                  borderTop:`1px solid ${C.border}`, position:"sticky", top:52, zIndex:5 }}>
      <button onClick={toggle} style={{ background:"none", border:"none", color:C.muted,
                                        cursor:"pointer", fontSize:11, padding:0, flexShrink:0 }}>
        {open ? "▾" : "▸"}
      </button>
      <span style={{ fontWeight:"700", fontSize:12, color:C.text, flex:1 }}>{label}</span>
      <span style={{ fontSize:11, color: count===tot ? C.green : C.muted }}>
        <span style={{ color: count===tot ? C.green : "var(--hgss-accent)", fontWeight:"700" }}>{count}</span>
        <span> / {tot}</span>
      </span>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
      {/* Tab header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"12px 20px", borderBottom:`1px solid ${C.border}`,
                    background:C.card, position:"sticky", top:0, zIndex:10, flexShrink:0 }}>
        <div>
          <div style={{ fontSize:16, fontWeight:"700", color:C.text }}>TMs &amp; HMs</div>
          <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>50 TMs · 7 HMs</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <span style={{ color:"var(--hgss-accent)", fontWeight:"700", fontSize:18 }}>{done}</span>
          <span style={{ color:C.muted, fontSize:13 }}> / {total} obtained</span>
        </div>
      </div>

      {/* TMs section */}
      <SectionHeader label="Technical Machines (TM01–TM50)"
        count={tmDone} total={TM_DATA.length}
        open={showTMs} toggle={() => setShowTMs(v => !v)} />
      {showTMs && TM_DATA.map(renderRow)}

      {/* HMs section */}
      <SectionHeader label="Hidden Machines (HM01–HM07)"
        count={hmDone} total={HM_DATA.length}
        open={showHMs} toggle={() => setShowHMs(v => !v)} />
      {showHMs && HM_DATA.map(renderRow)}
    </div>
  );
}

// ─── SKY BAR ─────────────────────────────────────────────────────────────────
function SkyBar({ timeFilter, setTime }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours(), m = now.getMinutes();
  const realPeriod = h >= 4 && h < 10 ? "morning" : h >= 10 && h < 20 ? "day" : "night";

  // Celestial body: position tracks real local time across full 24h (5%–93%)
  const bodyLeftPct = 5 + (h + m / 60) / 24 * 88;
  const bodyIsMoon  = h >= 20 || h < 4;
  const bodySize    = bodyIsMoon ? 22 : 28;
  const realTc      = TIME_COLORS[realPeriod];

  // Sky gradient from selected filter
  const tc      = TIME_COLORS[timeFilter];
  const isNight = timeFilter === "night";
  const skyBg   = tc ? tc.skyGrad : "linear-gradient(180deg,#0c1008 0%,#1a1608 100%)";

  // Time remaining until next period
  const totalMins = h * 60 + m;
  let minsLeft, nextLabel, progress;
  if (realPeriod === "morning") {
    const into = totalMins - 240;
    minsLeft = 360 - into; nextLabel = "Day"; progress = into / 360;
  } else if (realPeriod === "day") {
    const into = totalMins - 600;
    minsLeft = 600 - into; nextLabel = "Night"; progress = into / 600;
  } else {
    const into = h >= 20 ? totalMins - 1200 : totalMins + 240;
    minsLeft = 480 - into; nextLabel = "Morning"; progress = into / 480;
  }
  const fmt = mins => {
    const hh = Math.floor(mins / 60), mm = mins % 60;
    return hh > 0 ? (mm > 0 ? `${hh}h ${mm}m` : `${hh}h`) : `${mm}m`;
  };

  return (
    <div style={{
      position:"relative", overflow:"hidden", flexShrink:0,
      background: skyBg, height:96, transition:"background 0.85s ease",
    }}>
      {STARS.map((s,i) => (
        <div key={i} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          width:s.r, height:s.r, borderRadius:"50%", background:"white",
          opacity: isNight ? 1 : 0,
          animation: isNight ? `hgss-twinkle ${s.dur}s ${s.delay}s infinite` : "none",
          transition:"opacity 1.2s ease",
        }} />
      ))}
      {/* Celestial body — position reflects real local time */}
      <div style={{
        position:"absolute",
        left:`calc(${bodyLeftPct}% - ${bodySize/2}px)`,
        top:"42%", transform:"translateY(-50%)",
        width:bodySize, height:bodySize, borderRadius:"50%",
        background: realTc.bodyColor,
        boxShadow:`0 0 18px 6px ${realTc.bodyGlow}, 0 0 50px 22px ${realTc.bodyGlowOuter}`,
        transition:"left 1s ease, background 0.8s ease, box-shadow 0.8s ease",
      }} />
      {/* Period label + countdown — left side */}
      <div style={{ position:"absolute", left:14, bottom:22, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ fontSize:9, fontWeight:"700", letterSpacing:1.2, textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:3 }}>
          {realPeriod.charAt(0).toUpperCase()+realPeriod.slice(1)}
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", fontFamily:"'JetBrains Mono',monospace", display:"flex", alignItems:"center", gap:5 }}>
          <span>{fmt(minsLeft)}</span>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:9 }}>until</span>
          <span style={{ color: TIME_COLORS[nextLabel.toLowerCase()]?.badge || "rgba(255,255,255,0.55)" }}>{nextLabel}</span>
        </div>
      </div>
      {/* Time filter buttons — right side */}
      <div style={{ position:"absolute", bottom:22, right:16, display:"flex", gap:5 }}>
        {[["all","All",null],["morning","Morning",TIME_COLORS.morning.icon],["day","Day",TIME_COLORS.day.icon],["night","Night",TIME_COLORS.night.icon]].map(([v,label,icon]) => {
          const btc = TIME_COLORS[v];
          const isActive = timeFilter === v;
          return (
            <button key={v} onClick={() => setTime(v)} style={{
              padding:"4px 10px", borderRadius:99,
              border:`1px solid ${isActive?(btc?btc.badge:"rgba(255,255,255,0.6)"):"rgba(255,255,255,0.18)"}`,
              background: isActive?(btc?btc.badgeBg:"rgba(255,255,255,0.12)"):"rgba(0,0,0,0.3)",
              backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
              color: isActive?(btc?btc.badge:"white"):"rgba(255,255,255,0.55)",
              fontSize:11, fontWeight:"700", fontFamily:"'DM Sans',sans-serif",
              cursor:"pointer", letterSpacing:0.3,
              display:"flex", alignItems:"center", gap:4,
              transition:"color 0.2s, border-color 0.2s, background 0.2s",
            }}>{icon&&<img src={icon} style={{width:14,height:14,objectFit:"contain",display:"block"}} />}{label}</button>
          );
        })}
      </div>
      {/* 24 h labeled timeline — bottom edge */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:18, display:"flex" }}>
        {/* Night 12 AM – 4 AM  (4 h = 16.67%) */}
        <div style={{ width:"16.67%", background:"rgba(30,40,70,0.7)", display:"flex", alignItems:"center", justifyContent:"center", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize:7, color:TIME_COLORS.night.badge, whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace", opacity:0.85 }}>12–4 AM</span>
        </div>
        {/* Morning 4 AM – 10 AM  (6 h = 25%) */}
        <div style={{ width:"25%", background:"rgba(126,200,200,0.13)", display:"flex", alignItems:"center", justifyContent:"center", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize:7, color:TIME_COLORS.morning.badge, whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace", opacity:0.9 }}>4–10 AM</span>
        </div>
        {/* Day 10 AM – 8 PM  (10 h = 41.67%) */}
        <div style={{ width:"41.67%", background:"rgba(248,208,48,0.1)", display:"flex", alignItems:"center", justifyContent:"center", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize:7, color:TIME_COLORS.day.badge, whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace", opacity:0.9 }}>10 AM – 8 PM</span>
        </div>
        {/* Night 8 PM – 12 AM  (4 h = 16.67%) */}
        <div style={{ width:"16.67%", background:"rgba(30,40,70,0.7)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:7, color:TIME_COLORS.night.badge, whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace", opacity:0.85 }}>8 PM–12</span>
        </div>
        {/* Current-time cursor */}
        <div style={{ position:"absolute", left:`${(h + m/60) / 24 * 100}%`, top:0, bottom:0, width:1.5, background:"rgba(255,255,255,0.65)", borderRadius:1, pointerEvents:"none" }} />
      </div>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
function HGSSTracker() {
  const isMobile = useIsMobile();
  const [tab, setTab]           = useState(() => { try { return localStorage.getItem("hgss-active-tab") || "areas"; } catch { return "areas"; } });
  const setTabAndSave = t => { setTab(t); try { localStorage.setItem("hgss-active-tab", t); } catch {} };
  const [timeFilter, setTimeFilter] = useState(getTimeOfDay);
  const setTime = t => setTimeFilter(t);
  const [caught, setCaught]     = useState({});
  const [items, setItems]       = useState({});
  const [trainers, setTrainers] = useState({});
  const [areaId, setAreaId]     = useState(null);
  const [dexFilter, setDexFilter] = useState("all");
  const [dexSelected, setDexSelected] = useState(null);
  const [search, setSearch]     = useState("");
  const [booted, setBooted]     = useState(false);
  const [version, setVersion]   = useState("hg");   // "hg" | "ss"
  const [badges, setBadges]     = useState({});      // {badgeId: true}
  const [checklist, setChecklist] = useState({});   // {itemId: true}
  const [choiceGroups, setChoiceGroups] = useState({});  // {groupId: choiceId}
  const [tmState, setTmState]     = useState({});   // {TM01: true, HM03: true, ...}
  const [trades, setTrades]       = useState({});   // {`${areaId}|trade|${name}`: true}
  const [sweeps, setSweeps]       = useState({});   // {areaId: timestamp ms}
  const [roaming, setRoaming]     = useState(() => { try { return JSON.parse(localStorage.getItem("hgss-roaming")) || {}; } catch { return {}; } });
  const [ceremonyQueue, setCeremonyQueue] = useState([]); // Tier-1 events

  const pushCeremony = React.useCallback((event) => {
    setCeremonyQueue(q => q.some(x => x.id === event.id) ? q : [...q, event]);
  }, []);
  const popCeremony = React.useCallback((id) => {
    setCeremonyQueue(q => q.filter(x => x.id !== id));
  }, []);

  // Detect rare events: 8th badge earned, legendary catch.
  const lastSeen = React.useRef({ badges:null, seenAllBadges:false, legendaries:new Set() });
  useEffect(() => {
    if (!booted) return;
    const ls = lastSeen.current;
    if (ls.badges === null) {
      ls.badges = badges;
      ls.seenAllBadges = BADGES.every(b => badges[b.id]);
      LEGENDARY_NAMES.forEach(n => { if (caught[n]) ls.legendaries.add(n); });
      return;
    }
    const allEight = BADGES.every(b => badges[b.id]);
    if (allEight && !ls.seenAllBadges) {
      pushCeremony({
        id: `champion-${Date.now()}`,
        label: "Champion Path Unlocked",
        title: "All 16 Badges Earned",
        subtitle: "Johto and Kanto both conquered. Red awaits on Mt. Silver. Heal up, stock Revives, and walk in ready.",
        color: "#f5d24a",
        sprite: (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", width:180, height:180 }}>
            {BADGES.map(b => (
              <div key={b.id} style={{ margin:-4 }}>
                <BadgeSVG shape={b.shape} color={b.color} earned size={50} />
              </div>
            ))}
          </div>
        ),
      });
    }
    ls.seenAllBadges = allEight;
    LEGENDARY_NAMES.forEach(name => {
      if (caught[name] && !ls.legendaries.has(name)) {
        ls.legendaries.add(name);
        const dexId = LEGENDARY_DEX_ID[name];
        const col = LEGENDARY_COLOR[name] || "#a87acc";
        pushCeremony({
          id: `legendary-${name}-${Date.now()}`,
          label: name === "Mew" ? "Mythical Caught" : "Legendary Caught",
          title: name,
          subtitle: name === "Mew"
            ? "The mythical Pokémon — only obtainable through event distribution."
            : "One of Kanto's rare legendary encounters — one chance only.",
          color: col,
          sprite: dexId ? (
            <img src={pokeSpriteUrl(dexId)} alt={name}
              style={{ width:180, height:180, imageRendering:"pixelated", objectFit:"contain" }} />
          ) : null,
        });
      } else if (!caught[name]) {
        ls.legendaries.delete(name);
      }
    });
  }, [badges, caught, booted, pushCeremony]);


  // ─── MOTION RUNTIME ──────────────────────────────────────────────
  // One-time injection of keyframes + reduced-motion guard.
  useEffect(() => {
    if (document.getElementById("hgss-motion-css")) return;
    const s = document.createElement("style");
    s.id = "hgss-motion-css";
    s.textContent = `
      @keyframes hgss-wobble {
        0%,100% { transform: rotate(0) scale(1); }
        15% { transform: rotate(-12deg) scale(1.04); }
        30% { transform: rotate(10deg)  scale(1.06); }
        45% { transform: rotate(-8deg)  scale(1.04); }
        60% { transform: rotate(6deg)   scale(1.02); }
        75% { transform: rotate(-3deg)  scale(1.01); }
      }
      @keyframes hgss-pop {
        0% { transform: scale(0.85); opacity: 0.4; }
        55% { transform: scale(1.18); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes hgss-tab-in {
        from { opacity: 0; transform: translateY(-3px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes hgss-tick {
        0% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
        100% { transform: translateY(0); }
      }
      @keyframes hgss-pulse-dot {
        0%,100% { transform: scale(0.85); opacity: 0.55; }
        50%     { transform: scale(1.15); opacity: 1; }
      }
      @keyframes hgss-badge-spotlight {
        0%   { box-shadow: 0 0 0 0 var(--badge-glow,#fff), 0 0 0 0 var(--badge-glow,#fff); transform: scale(1); }
        45%  { box-shadow: 0 0 0 14px transparent, 0 0 18px 8px var(--badge-glow,#fff); transform: scale(1.4); }
        100% { box-shadow: 0 0 0 28px transparent, 0 0 0 0 transparent; transform: scale(1.05); }
      }
      @keyframes hgss-flash {
        0% { background-color: var(--hgss-flash,rgba(255,255,255,0.18)); }
        100% { background-color: transparent; }
      }
      /* ── Tier 1 — Ceremony ─────────────────────────────────────── */
      @keyframes hgss-cer-bg     { from { opacity:0; backdrop-filter:blur(0px); } to { opacity:1; backdrop-filter:blur(8px); } }
      @keyframes hgss-cer-bg-out { from { opacity:1; backdrop-filter:blur(8px); } to { opacity:0; backdrop-filter:blur(0px); } }
      @keyframes hgss-cer-ring {
        0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0.9; }
        70%  { opacity: 0.45; }
        100% { transform: translate(-50%,-50%) scale(5);   opacity: 0; }
      }
      @keyframes hgss-cer-sprite {
        0%   { transform: scale(0.2) rotate(-20deg); opacity: 0; filter: brightness(2.5) blur(6px); }
        45%  { transform: scale(1.25) rotate(8deg);  opacity: 1; filter: brightness(1.4) blur(0px); }
        100% { transform: scale(1) rotate(0);        opacity: 1; filter: brightness(1) blur(0px); }
      }
      @keyframes hgss-cer-label {
        from { opacity:0; transform: translateY(-8px); letter-spacing:6px; }
        to   { opacity:1; transform: translateY(0);    letter-spacing:3px; }
      }
      @keyframes hgss-cer-title {
        from { opacity:0; transform: translateY(14px); }
        to   { opacity:1; transform: translateY(0); }
      }
      @keyframes hgss-cer-shine {
        0%   { transform: translateX(-120%) skewX(-20deg); }
        100% { transform: translateX(220%)  skewX(-20deg); }
      }
      .hgss-cer-bg     { animation: hgss-cer-bg 0.35s ease-out both; }
      .hgss-cer-bg-out { animation: hgss-cer-bg-out 0.3s ease-in both; }
      .hgss-cer-ring   { animation: hgss-cer-ring 1.1s cubic-bezier(.2,.7,.3,1) both; }
      .hgss-cer-sprite { animation: hgss-cer-sprite 0.95s cubic-bezier(.3,1.4,.4,1) both; }
      .hgss-cer-label  { animation: hgss-cer-label  0.55s ease-out 0.25s both; }
      .hgss-cer-title  { animation: hgss-cer-title  0.5s ease-out 0.45s both; }
      .hgss-cer-sub    { animation: hgss-cer-title  0.5s ease-out 0.6s both; }
      .hgss-cer-cta    { animation: hgss-cer-title  0.5s ease-out 0.85s both; }
      .hgss-cer-shine  { animation: hgss-cer-shine 1.4s ease-in-out 0.7s both; }
      .hgss-pulse-dot { animation: hgss-pulse-dot 1.6s ease-in-out infinite; }
      .hgss-wobble    { animation: hgss-wobble 0.55s cubic-bezier(.4,1.2,.6,1) both; }
      .hgss-pop       { animation: hgss-pop 0.38s cubic-bezier(.4,1.6,.5,1) both; }
      .hgss-tick-in   { animation: hgss-tick 0.32s cubic-bezier(.4,1.4,.6,1); display:inline-block; }
      .hgss-tab-in    { animation: hgss-tab-in 0.22s ease-out both; }
      /* ── Area entry — fade + slide-up + soft glow ─────────────── */
      @keyframes hgss-area-in {
        0%   { opacity: 0; transform: translateY(8px); filter: brightness(0.85); }
        60%  { opacity: 1; }
        100% { opacity: 1; transform: translateY(0); filter: brightness(1); }
      }
      @keyframes hgss-area-glow {
        0%   { box-shadow: inset 0 0 0 1px transparent, inset 0 24px 60px -20px var(--area-glow,rgba(95,201,154,0.35)); opacity: 0; }
        30%  { opacity: 1; }
        100% { box-shadow: inset 0 0 0 1px transparent, inset 0 24px 60px -20px var(--area-glow,rgba(95,201,154,0)); opacity: 0; }
      }
      .hgss-area-in { animation: hgss-area-in 0.42s cubic-bezier(.2,.7,.3,1) both; }
      .hgss-area-glow-overlay { position: absolute; inset: 0; pointer-events: none; animation: hgss-area-glow 0.8s ease-out both; }
      /* ── Section completion celebration ───────────────────────── */
      @keyframes hgss-section-done {
        0%   { box-shadow: 0 0 0 0 var(--sec-glow,rgba(95,201,154,0)), inset 0 0 0 1px var(--sec-glow,rgba(95,201,154,0)); }
        25%  { box-shadow: 0 0 0 6px var(--sec-glow,rgba(95,201,154,0.18)), inset 0 0 0 1px var(--sec-glow,rgba(95,201,154,0.6)); }
        100% { box-shadow: 0 0 0 0 transparent, inset 0 0 0 1px transparent; }
      }
      @keyframes hgss-chip-pop {
        0%   { transform: scale(1); }
        40%  { transform: scale(1.22); filter: brightness(1.4); }
        100% { transform: scale(1); filter: brightness(1); }
      }
      @keyframes hgss-sparkle-ring {
        0%   { transform: scale(0.4); opacity: 0; }
        30%  { opacity: 1; }
        100% { transform: scale(2.4); opacity: 0; }
      }
      .hgss-section-done { animation: hgss-section-done 1.1s ease-out both; }
      .hgss-chip-pop     { animation: hgss-chip-pop 0.5s cubic-bezier(.4,1.4,.5,1) both; }
      .hgss-sparkle-ring { position:absolute; pointer-events:none; border-radius:99px; border:1.5px solid var(--sec-glow,rgba(95,201,154,0.9)); animation: hgss-sparkle-ring 0.9s ease-out both; }
      /* ── Area full completion sweep ───────────────────────────── */
      @keyframes hgss-area-sweep {
        0%   { transform: translateX(-110%) skewX(-18deg); opacity: 0; }
        20%  { opacity: 1; }
        100% { transform: translateX(220%)  skewX(-18deg); opacity: 0; }
      }
      @keyframes hgss-area-done-pulse {
        0%   { box-shadow: 0 0 0 0 var(--hgss-accent,#5fc99a); }
        50%  { box-shadow: 0 -4px 24px 2px var(--hgss-accent,#5fc99a); }
        100% { box-shadow: 0 0 0 0 transparent; }
      }
      .hgss-area-sweep-overlay {
        position:absolute; inset:0; overflow:hidden; pointer-events:none;
      }
      .hgss-area-sweep-overlay::before {
        content:""; position:absolute; top:0; left:0; bottom:0; width:50%;
        background: linear-gradient(90deg, transparent, var(--sweep-color,rgba(95,201,154,0.35)) 50%, transparent);
        animation: hgss-area-sweep 1.1s cubic-bezier(.3,.6,.4,1) both;
      }
      .hgss-area-done-pulse { animation: hgss-area-done-pulse 1.4s ease-out both; }
      .hgss-spotlight { animation: hgss-badge-spotlight 0.9s cubic-bezier(.4,1.2,.5,1) both; border-radius: 50%; }
      .hgss-flash     { animation: hgss-flash 0.7s ease-out both; }
      .hgss-pulse-dot { animation: hgss-pulse-dot 1.6s ease-in-out infinite; }
      .hgss-soft-shift { transition: background 0.45s ease, color 0.25s ease, border-color 0.25s ease, filter 0.3s ease; }
      .hgss-fill-bar   { transition: width 0.55s cubic-bezier(.4,.8,.3,1), background 0.3s ease; }
      .hgss-hover-lift { transition: transform 0.12s ease, filter 0.15s ease, box-shadow 0.15s ease; }
      .hgss-hover-lift:hover { transform: translateY(-1px); filter: brightness(1.06); }
      @keyframes hgss-twinkle {
        0%,100% { opacity:0.15; transform:scale(1); }
        50% { opacity:1; transform:scale(1.5); }
      }
      @media (prefers-reduced-motion: reduce) {
        .hgss-wobble,.hgss-pop,.hgss-tick-in,.hgss-tab-in,.hgss-spotlight,.hgss-flash,.hgss-pulse-dot,
        .hgss-area-in,.hgss-section-done,.hgss-chip-pop,.hgss-sparkle-ring,.hgss-area-done-pulse { animation: none !important; }
        .hgss-area-sweep-overlay::before { animation: none !important; }
        .hgss-area-glow-overlay { animation: none !important; }
        .hgss-fill-bar,.hgss-soft-shift,.hgss-hover-lift { transition-duration: 0.01ms !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    (async () => {
      try { const r = localStorage.getItem("hgss-caught");   if (r) setCaught(JSON.parse(r));   } catch {}
      try { const r = localStorage.getItem("hgss-items");    if (r) setItems(JSON.parse(r));    } catch {}
      try { const r = localStorage.getItem("hgss-trainers"); if (r) setTrainers(JSON.parse(r)); } catch {}
      try { const r = localStorage.getItem("hgss-version"); if (r) setVersion(r);              } catch {}
      try { const r = localStorage.getItem("hgss-badges");     if (r) setBadges(JSON.parse(r));       } catch {}
      try { const r = localStorage.getItem("hgss-checklist"); if (r) setChecklist(JSON.parse(r));    } catch {}
      try { const r = localStorage.getItem("hgss-choices");   if (r) setChoiceGroups(JSON.parse(r)); } catch {}
      try { const r = localStorage.getItem("hgss-trades");    if (r) setTrades(JSON.parse(r));       } catch {}
      try { const r = localStorage.getItem("hgss-sweeps");    if (r) setSweeps(JSON.parse(r));       } catch {}
      try {
        const savedItems = JSON.parse(localStorage.getItem("hgss-items") || "{}");
        const savedTms   = JSON.parse(localStorage.getItem("hgss-tms")  || "{}");
        let changed = false;
        AREAS.forEach(area => {
          const sync = (its, keyFn) => its.forEach((it, i) => {
            const m = it.name.match(/^(TM\d{2}|HM\d{2})\b/);
            if (!m) return;
            if (savedItems[keyFn(i)] && !savedTms[m[1]]) { savedTms[m[1]] = true; changed = true; }
          });
          if (area.floors) area.floors.forEach(f => sync(f.items||[], i => `${area.id}|${f.label}|${i}`));
          else sync(area.items||[], i => `${area.id}|${i}`);
        });
        if (changed) localStorage.setItem("hgss-tms", JSON.stringify(savedTms));
        setTmState(savedTms);
      } catch {}

      setBooted(true);
    })();
  }, []);

  useEffect(() => {
    if (areaId) {
      try { localStorage.setItem("hgss-active-area", areaId); } catch {}
    }
  }, [areaId]);

  // Sync state to /state Pages Function so the OBS overlay can poll it
  // cross-browser (OBS Chromium has isolated localStorage from Chrome).
  const OVERLAY_SYNC_URL = "https://hgss.nabunan.com/state";
  useEffect(() => {
    if (!booted) return;
    const timer = setTimeout(() => {
      try {
        const collapsedRaw = localStorage.getItem("hgss-collapsed-floors");
        fetch(OVERLAY_SYNC_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            areaId,
            version,
            caught,
            items,
            trainers,
            trades,
            collapsedFloors: collapsedRaw ? JSON.parse(collapsedRaw) : {},
          }),
        }).catch(() => {});
      } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [booted, areaId, version, caught, items, trainers, trades]);

  const handleSetVersion = (v) => {
    setVersion(v);
    try { localStorage.setItem("hgss-version", v); } catch {}
  };

  const handleExport = () => {
    const data = {
      caught:    localStorage.getItem("hgss-caught"),
      items:     localStorage.getItem("hgss-items"),
      trainers:  localStorage.getItem("hgss-trainers"),
      version:   localStorage.getItem("hgss-version"),
      badges:    localStorage.getItem("hgss-badges"),
      checklist: localStorage.getItem("hgss-checklist"),
      choices:   localStorage.getItem("hgss-choices"),
      tms:       localStorage.getItem("hgss-tms"),
      sweeps:    localStorage.getItem("hgss-sweeps"),
      boxNames:  localStorage.getItem("hgss-box-names"),
      areaNotes: localStorage.getItem("hgss-area-notes"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `firered-save-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.caught)   localStorage.setItem("hgss-caught",   data.caught);
          if (data.items)    localStorage.setItem("hgss-items",    data.items);
          if (data.trainers) localStorage.setItem("hgss-trainers", data.trainers);
          if (data.version)    localStorage.setItem("hgss-version",   data.version);
          if (data.badges)     localStorage.setItem("hgss-badges",    data.badges);
          if (data.checklist)  localStorage.setItem("hgss-checklist", data.checklist);
          if (data.choices)    localStorage.setItem("hgss-choices",   data.choices);
          if (data.tms)        localStorage.setItem("hgss-tms",       data.tms);
          if (data.sweeps)     localStorage.setItem("hgss-sweeps",    data.sweeps);
          if (data.boxNames)   localStorage.setItem("hgss-box-names", data.boxNames);
          if (data.areaNotes)  localStorage.setItem("hgss-area-notes",data.areaNotes);
          window.location.reload();
        } catch { alert("Invalid save file — could not restore data."); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const toggleBadge = useCallback((id) => {
    setBadges(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      try { localStorage.setItem("hgss-badges", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleChecklist = useCallback((id) => {
    setChecklist(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      try { localStorage.setItem("hgss-checklist", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleTm = useCallback((id) => {
    setTmState(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      try { localStorage.setItem("hgss-tms", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);



  const toggleCaught = useCallback((name, meta) => {
    const wasCaught = !!caught[name];
    setCaught(prev => {
      const next = { ...prev };
      if (next[name]) delete next[name]; else next[name] = true;
      try { localStorage.setItem("hgss-caught", JSON.stringify(next)); } catch {}
      return next;
    });
    if (meta?.choiceGroup && meta?.choiceId) {
      setChoiceGroups(prev => {
        const next = { ...prev };
        if (!wasCaught) { next[meta.choiceGroup] = meta.choiceId; }
        else if (prev[meta.choiceGroup] === meta.choiceId) { delete next[meta.choiceGroup]; }
        try { localStorage.setItem("hgss-choices", JSON.stringify(next)); } catch {}
        return next;
      });
    }
  }, [caught]);

  const toggleItem = useCallback((key, meta) => {
    const wasChecked = !!items[key];
    setItems(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      try { localStorage.setItem("hgss-items", JSON.stringify(next)); } catch {}
      return next;
    });
    if (meta?.choiceGroup && meta?.choiceId) {
      setChoiceGroups(prev => {
        const next = { ...prev };
        if (!wasChecked) { next[meta.choiceGroup] = meta.choiceId; }
        else if (prev[meta.choiceGroup] === meta.choiceId) { delete next[meta.choiceGroup]; }
        try { localStorage.setItem("hgss-choices", JSON.stringify(next)); } catch {}
        return next;
      });
    }
    if (meta?.tmId) {
      setTmState(prev => {
        const next = { ...prev };
        if (wasChecked) { delete next[meta.tmId]; } else { next[meta.tmId] = true; }
        try { localStorage.setItem("hgss-tms", JSON.stringify(next)); } catch {}
        return next;
      });
    }
  }, [items]);

  const toggleTrainer = useCallback((key) => {
    setTrainers(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      try { localStorage.setItem("hgss-trainers", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleTrade = useCallback((key) => {
    setTrades(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      try { localStorage.setItem("hgss-trades", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const markSwept = useCallback((areaId) => {
    setSweeps(prev => {
      const next = { ...prev, [areaId]: Date.now() };
      try { localStorage.setItem("hgss-sweeps", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const caughtCount = Object.keys(caught).length;
  const area = areaId ? AREAS.find(a => a.id === areaId) : null;

  const { completionDone, completionTotal } = useMemo(() => {
    const nonEventTotal = DEX.filter(p => !p.event).length;
    const as = {
      "all-johto-badges": JOHTO_BADGES.every(b => badges[b.id]),
      "all-kanto-badges": KANTO_BADGES.every(b => badges[b.id]),
      "johto-dex":        DEX.filter(p => !p.event && caught[p.name]).length >= nonEventTotal,
      "caught-raikou":    !!caught["Raikou"],   "caught-entei":    !!caught["Entei"],
      "caught-suicune":   !!caught["Suicune"],  "caught-lugia":    !!caught["Lugia"],
      "caught-hooh":      !!caught["Ho-Oh"],    "caught-articuno": !!caught["Articuno"],
      "caught-zapdos":    !!caught["Zapdos"],   "caught-moltres":  !!caught["Moltres"],
      "caught-mewtwo":    !!caught["Mewtwo"],   "caught-latias":   !!caught["Latias"],
      "caught-latios":    !!caught["Latios"],   "caught-mew":      !!caught["Mew"],
      "caught-celebi":    !!caught["Celebi"],
    };
    let total = 0, done = 0;
    for (const sec of COMPLETION_SECTIONS) {
      for (const item of sec.items) {
        if (item.disabled || item.optional) continue;
        total++;
        if (item.auto ? as[item.auto] : !!checklist[item.id]) done++;
      }
    }
    return { completionDone: done, completionTotal: total };
  }, [caught, checklist, badges]);

  const globalStats = useMemo(() => {
    const auditedAreas = AREAS.filter(a => AUDITED_PARTS.has(a.part));
    const allPoks = a => a.floors ? a.floors.flatMap(f => f.pokemon || []) : (a.pokemon || []);
    const allTrns = a => a.floors ? a.floors.flatMap(f => f.trainers || []) : (a.trainers || []);
    const pokSet = new Set();
    auditedAreas.forEach(a => allPoks(a).forEach(p => {
      if (version === "hg" && p.ssOnly) return;
      if (version === "ss" && p.hgOnly) return;
      pokSet.add(p.name);
    }));
    const totalPok = pokSet.size;
    const caughtPok = [...pokSet].filter(n => caught[n]).length;
    let totalItems = 0, doneItems = 0;
    auditedAreas.forEach(a => {
      if (a.floors) a.floors.forEach(f => (f.items||[]).forEach((it, i) => { if (it.recurring || it.optional) return; totalItems++; if (items[`${a.id}|${f.label}|${i}`]) doneItems++; }));
      else (a.items||[]).forEach((it, i) => { if (it.recurring || it.optional) return; totalItems++; if (items[`${a.id}|${i}`]) doneItems++; });
    });
    let totalTrainers = 0, doneTrainers = 0;
    auditedAreas.forEach(a => allTrns(a).forEach(t => {
      totalTrainers++;
      if (trainers[`${a.id}|${t.class}|${t.name}`]) doneTrainers++;
    }));
    return { caughtPok, totalPok, doneItems, totalItems, doneTrainers, totalTrainers };
  }, [caught, items, trainers, version]);

  const accent = version === "ss" ? C.ssSilver : C.hgGold;

  if (!booted) return <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:C.text, fontFamily:"'DM Sans',system-ui,sans-serif" }}>Loading…</div>;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:C.bg, fontFamily:"'DM Sans',system-ui,sans-serif", color:C.text, overflow:"hidden", "--hgss-accent":accent }}>
      {/* ── Top bar ── */}
      <div style={{
        background: version === "ss"
          ? "linear-gradient(135deg,#0d0f14 0%,#14161c 45%,#0d0f14 100%)"
          : "linear-gradient(135deg,#0c1008 0%,#1a1608 45%,#0c1008 100%)",
        borderBottom:`1px solid ${C.border}`, padding:"12px 20px 0", flexShrink:0,
        boxShadow:"0 2px 12px rgba(0,0,0,0.5)", transition:"background 0.4s"
      }}>
        {/* Title row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:2.5, textTransform:"uppercase", marginBottom:3, display:"flex", gap:6, alignItems:"center", fontFamily:"'JetBrains Mono',ui-monospace,monospace" }}>
              <span style={{ color:C.hgGold, fontWeight:"700", opacity: version==="hg" ? 1 : 0.4, transition:"opacity 0.2s" }}>HeartGold</span>
              <span style={{ color:C.muted }}>·</span>
              <span style={{ color:C.ssSilver, fontWeight:"700", opacity: version==="ss" ? 1 : 0.4, transition:"opacity 0.2s" }}>SoulSilver</span>
            </div>
            <div style={{ fontSize:20, fontWeight:"700", letterSpacing:-0.5, color:C.text, fontFamily:"'Space Grotesk',system-ui,sans-serif", display:"flex", alignItems:"center", gap:8 }}>
              HGSS Tracker
              <span title="Auto-saved" aria-label="Auto-saved" className="hgss-pulse-dot" style={{
                width:7, height:7, borderRadius:"50%", background:C.green,
                boxShadow:`0 0 6px ${C.green}88`, display:"inline-block"
              }} />
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:7 }}>
            {/* HG / SS version toggle */}
            <div style={{ display:"flex", gap:0, background:"rgba(0,0,0,0.45)", borderRadius:6, padding:1, border:`1px solid ${C.border}` }}>
              {[["hg","HG",C.hgGold],["ss","SS",C.ssSilver]].map(([v,label,col]) => (
                <button key={v} onClick={() => handleSetVersion(v)} style={{
                  padding:"3px 10px", border:"none", borderRadius:4, cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:"700", letterSpacing:0.5,
                  background: version===v ? col : "transparent",
                  color: version===v ? "#fff" : C.muted,
                  transition:"background 0.18s, color 0.18s",
                }}>{label}</button>
              ))}
            </div>
            {/* Stats */}
            <div style={{ display:"flex", gap:18, fontSize:11, alignItems:"center" }}>
              <span><span style={{ color:C.green, fontWeight:"700", fontSize:13 }}>{globalStats.caughtPok}/{globalStats.totalPok}</span><span style={{ color:C.muted }}> caught</span></span>
              <span><span style={{ color:C.gold, fontWeight:"700", fontSize:13 }}>{pct(globalStats.doneItems,globalStats.totalItems)}%</span><span style={{ color:C.muted }}> items</span></span>
              <span><span style={{ color:"#a87acc", fontWeight:"700", fontSize:13 }}>{pct(globalStats.doneTrainers,globalStats.totalTrainers)}%</span><span style={{ color:C.muted }}> trainers</span></span>
              <span onClick={() => setTabAndSave("completion")}
                title="View 100% checklist"
                style={{ cursor:"pointer" }}>
                <span style={{ color:"var(--hgss-accent)", fontWeight:"700", fontSize:13 }}>{completionDone}/{completionTotal}</span>
                <span style={{ color:C.muted }}> goals</span>
              </span>
              <div style={{ display:"flex", gap:4 }}>
                {[["↓ Export", handleExport, "Export save data to a JSON file"],
                  ["↑ Import", handleImport, "Import save data from a JSON file"]].map(([label, fn, title]) => (
                  <button key={label} onClick={fn} title={title} style={{
                    padding:"2px 8px", fontSize:10, fontWeight:"600", cursor:"pointer",
                    background:"rgba(0,0,0,0.3)", color:C.muted,
                    border:`1px solid ${C.border}`, borderRadius:4,
                    fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color=C.text; e.currentTarget.style.borderColor="var(--hgss-accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color=C.muted; e.currentTarget.style.borderColor=C.border; }}
                  >{label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gym badge strip */}
        <GymBadgeStrip earned={badges} toggleBadge={toggleBadge} />

        {/* Tabs — v4: primary (run-tracking) | reference (lookup tools) */}
        <div style={{ display:"flex", gap:2, marginTop:10, overflowX:"auto", WebkitOverflowScrolling:"touch", flexWrap:"nowrap", alignItems:"flex-end" }}>
          {[
            // Primary — used every play session
            ["areas","Areas","primary"],["dex","Pokédex","primary"],
            ["walker","Pokéwalker","primary"],
            ["team","Team","primary"],["battle","Battle","primary"],["trade","Trade","primary"],
            // Divider
            ["__div1","",null],
            // Secondary — used regularly but less hot
            ["boxes","Boxes","ref"],["completion","100%","ref"],
            ["types","Types","ref"],["calc","Catch","ref"],["hunt","Hunt","ref"],
            // Divider
            ["__div2","",null],
            // Tertiary — occasional lookup
            ["remain","Left","tertiary"],["recurring","Recur","tertiary"],
            ["gyms","Gyms","tertiary"],["evo","Evolutions","tertiary"],["tms","TMs","tertiary"],
          ].map(([t,label,group]) => {
            if (t === "__div1" || t === "__div2") return (
              <div key={t} style={{ width:1, alignSelf:"stretch", margin:"4px 8px 0", background:`linear-gradient(180deg, transparent, ${C.border} 30%, ${C.border} 70%, transparent)`, flexShrink:0 }} />
            );
            const isRef = group === "ref";
            const isTer = group === "tertiary";
            return (
              <button key={t} onClick={() => setTabAndSave(t)} style={{
                padding: isMobile ? "7px 10px" : (isTer ? "5px 11px" : isRef ? "6px 14px" : "8px 18px"),
                border:"none", borderRadius:"6px 6px 0 0", cursor:"pointer", flexShrink:0,
                fontFamily:"'DM Sans',system-ui,sans-serif",
                fontSize: isTer ? 11 : isRef ? 12 : 13,
                fontWeight: isTer ? "500" : isRef ? "500" : "600",
                background: tab===t ? C.bg : "transparent",
                color: tab===t ? C.text : (isTer ? "rgba(124,131,149,0.75)" : isRef ? C.muted : "#b3b9c8"),
                borderBottom: tab===t ? `2px solid var(--hgss-accent)` : "2px solid transparent",
                transition:"color 0.15s",
                opacity: tab===t ? 1 : (isTer ? 0.7 : isRef ? 0.85 : 1),
              }}>{label}</button>
            );
          })}
        </div>
      </div>

      <SkyBar timeFilter={timeFilter} setTime={setTime} />

      {/* Tab content — keyed wrapper for cross-tab stagger-in */}
      <div key={tab} className="hgss-tab-in" style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* ── Tab: Pokédex ── */}
      {tab === "dex" && <DexTab caught={caught} toggleCaught={toggleCaught} dexFilter={dexFilter} setDexFilter={setDexFilter} dexSelected={dexSelected} setDexSelected={setDexSelected} version={version} isMobile={isMobile} />}

      {/* ── Tab: Areas ── */}
      {tab === "areas" && <AreasTab caught={caught} toggleCaught={toggleCaught} items={items} toggleItem={toggleItem} trainers={trainers} toggleTrainer={toggleTrainer} trades={trades} toggleTrade={toggleTrade} areaId={areaId} setAreaId={setAreaId} area={area} search={search} setSearch={setSearch} version={version} isMobile={isMobile} choiceGroups={choiceGroups} timeFilter={timeFilter} setTime={setTime} roaming={roaming} setRoaming={setRoaming} badges={badges} />}

      {/* ── Tab: Pokéwalker ── */}
      {tab === "walker" && <WalkerTab caught={caught} toggleCaught={toggleCaught} isMobile={isMobile} version={version} />}

      {/* ── Tab: Dream Team ── */}
      {tab === "team" && <DreamTeamTab isMobile={isMobile} version={version} />}

      {/* ── Tab: Gym Matchup ── */}
      {tab === "gyms" && <GymTab isMobile={isMobile} />}

      {tab === "battle" && <BattleTab />}

      {/* ── Tab: Trade ── */}
      {tab === "trade" && <TradeTab version={version} isMobile={isMobile} />}

      {/* ── Tab: Evolution Planner ── */}
      {tab === "evo" && <EvoTab caught={caught} toggleCaught={toggleCaught} version={version} />}

      {tab === "types" && <TypeChartTab isMobile={isMobile} />}

      {/* ── Tab: Catch Calc ── */}
      {tab === "calc" && <CatchCalcTab caught={caught} isMobile={isMobile} />}

      {/* ── Tab: Hunt ── */}
      {tab === "hunt" && <HuntTab caught={caught} version={version} isMobile={isMobile} />}

      {/* ── Tab: TMs & HMs ── */}
      {tab === "tms" && <TMsTab tmState={tmState} />}

      {/* ── Tab: Remaining ── */}
      {tab === "remain" && <RemainingTab items={items} toggleItem={toggleItem} trainers={trainers} toggleTrainer={toggleTrainer} choiceGroups={choiceGroups} setAreaId={setAreaId} setTabAndSave={setTabAndSave} />}

      {/* ── Tab: Recurring Items ── */}
      {tab === "recurring" && <RecurringTab sweeps={sweeps} markSwept={markSwept} />}

      {/* ── Tab: PC Boxes ── */}
      {tab === "boxes" && <BoxTab isMobile={isMobile} />}

      {/* ── Tab: 100% Completion ── */}
      {tab === "completion" && <CompletionTab caught={caught} checklist={checklist} toggleChecklist={toggleChecklist} badges={badges} version={version} isMobile={isMobile} />}
      </div>

      {/* Tier-1 ceremony overlay (8th badge / legendary catch) */}
      <CeremonyHost queue={ceremonyQueue} onDone={popCeremony} />
    </div>
  );
}

// ─── TRADE TAB ───────────────────────────────────────────────────────────────
// Version-exclusive evolutions/pre-evolutions confirmed by pokemondb but not catchable in AREAS
const HG_ONLY_SUPP = [
  {name:"Omastar", locs:[{areaName:"Evolve Omanyte Lv.40 (HG — Helix Fossil)"}]},
  {name:"Armaldo", locs:[{areaName:"Evolve Anorith Lv.40 (HG — Claw Fossil)"}]},
  {name:"Claydol", locs:[{areaName:"Evolve Baltoy Lv.36 (HG swarm)"}]},
  {name:"Gliscor", locs:[{areaName:"Evolve Gligar w/ Razor Fang at night (HG)"}]},
  {name:"Mantyke", locs:[{areaName:"Breed Mantine + Remoraid in party (HG only)"}]},
];
const SS_ONLY_SUPP = [
  {name:"Ninetales",locs:[{areaName:"Evolve Vulpix w/ Fire Stone (SS only)"}]},
  {name:"Kabutops", locs:[{areaName:"Evolve Kabuto Lv.40 (SS — Dome Fossil)"}]},
  {name:"Swalot",   locs:[{areaName:"Evolve Gulpin Lv.26 (SS swarm)"}]},
  {name:"Cradily",  locs:[{areaName:"Evolve Lileep Lv.40 (SS — Root Fossil)"}]},
];

const TRADE_EVOS = [
  // plain trades
  { from:"Kadabra",    to:"Alakazam",   item:null,            itemSrc:null },
  { from:"Machoke",    to:"Machamp",    item:null,            itemSrc:null },
  { from:"Graveler",   to:"Golem",      item:null,            itemSrc:null },
  { from:"Haunter",    to:"Gengar",     item:null,            itemSrc:null },
  // King's Rock
  { from:"Poliwhirl",  to:"Politoed",   item:"King's Rock",   itemSrc:"Pokéathlon Mon/Thu/Sun · 3,000 AP" },
  { from:"Slowpoke",   to:"Slowking",   item:"King's Rock",   itemSrc:"Pokéathlon Mon/Thu/Sun · 3,000 AP" },
  // Metal Coat
  { from:"Onix",       to:"Steelix",    item:"Metal Coat",    itemSrc:"Pokéathlon Fri · 2,500 AP" },
  { from:"Scyther",    to:"Scizor",     item:"Metal Coat",    itemSrc:"Pokéathlon Fri · 2,500 AP" },
  // Dragon Scale
  { from:"Seadra",     to:"Kingdra",    item:"Dragon Scale",  itemSrc:"Pokéathlon Fri · 2,500 AP" },
  // other items
  { from:"Porygon",    to:"Porygon2",   item:"Up-Grade",      itemSrc:"Silph Co. 5F" },
  { from:"Porygon2",   to:"Porygon-Z",  item:"Dubious Disc",  itemSrc:"Import from D/P/Pt — not in HGSS base game" },
  { from:"Rhydon",     to:"Rhyperior",  item:"Protector",     itemSrc:"Route 45 (hidden item)" },
  { from:"Dusclops",   to:"Dusknoir",   item:"Reaper Cloth",  itemSrc:"Mt. Mortar B1F" },
  { from:"Electabuzz", to:"Electivire", item:"Electirizer",   itemSrc:"PokéWalker: Yellow Forest (event) or D/P/Pt" },
  { from:"Magmar",     to:"Magmortar",  item:"Magmarizer",    itemSrc:"PokéWalker: Yellow Forest (event) or D/P/Pt" },
  // Deep Sea items — held by swarm Clamperl on Route 19 (Thief/Covet); or import from D/P/Pt
  { from:"Clamperl",   to:"Huntail",    item:"Deep Sea Tooth", itemSrc:"Held by swarm Clamperl (Route 19, Thief/Covet) · or D/P/Pt" },
  { from:"Clamperl",   to:"Gorebyss",   item:"Deep Sea Scale", itemSrc:"Held by swarm Clamperl (Route 19, Thief/Covet) · or D/P/Pt" },
];

function TradeTab({ version, isMobile }) {
  const { useMemo, useState } = React;

  const [spares,   setSpares]   = useState(() => { try { return JSON.parse(localStorage.getItem("hgss-trade-spares")   || "{}"); } catch { return {}; } });
  const [received, setReceived] = useState(() => { try { return JSON.parse(localStorage.getItem("hgss-trade-received") || "{}"); } catch { return {}; } });
  const [evoDone,  setEvoDone]  = useState(() => { try { return JSON.parse(localStorage.getItem("hgss-trade-evo-done") || "{}"); } catch { return {}; } });

  const persist = (key, next, setter) => { setter(next); localStorage.setItem(key, JSON.stringify(next)); };
  const toggleSpare    = n => persist("hgss-trade-spares",    { ...spares,   [n]: !spares[n]   }, setSpares);
  const toggleReceived = n => persist("hgss-trade-received",  { ...received, [n]: !received[n] }, setReceived);
  const toggleEvo      = k => persist("hgss-trade-evo-done",  { ...evoDone,  [k]: !evoDone[k]  }, setEvoDone);

  // Compute version exclusives from LOCATION_MAP (built at module scope from AREAS).
  // Filter out non-Pokémon entries (key items like Blue Orb, Clear Bell, etc.)
  // by checking allDexId — items won't have a sprite ID.
  const exclusives = useMemo(() => {
    const hg = {}, ss = {};
    for (const [name, locs] of Object.entries(LOCATION_MAP)) {
      if (!allDexId(name)) continue;
      for (const [target, flag] of [[hg, "hgOnly"], [ss, "ssOnly"]]) {
        const fl = locs.filter(l => l[flag]);
        if (!fl.length) continue;
        const seen = new Set();
        target[name] = fl.filter(l => seen.has(l.areaName) ? false : (seen.add(l.areaName), true));
      }
    }
    return { hg, ss };
  }, []);

  const baseMyExcls    = version === "hg" ? exclusives.hg : exclusives.ss;
  const baseTheirExcls = version === "hg" ? exclusives.ss : exclusives.hg;
  const suppMy         = version === "hg" ? HG_ONLY_SUPP : SS_ONLY_SUPP;
  const suppTheir      = version === "hg" ? SS_ONLY_SUPP : HG_ONLY_SUPP;
  const myExcls    = { ...baseMyExcls };
  const theirExcls = { ...baseTheirExcls };
  for (const {name, locs} of suppMy)    if (!myExcls[name])    myExcls[name]    = locs;
  for (const {name, locs} of suppTheir) if (!theirExcls[name]) theirExcls[name] = locs;
  const myLabel    = version === "hg" ? "HeartGold" : "SoulSilver";
  const theirLabel = version === "hg" ? "SoulSilver" : "HeartGold";
  const myColor    = version === "hg" ? C.hgGold : C.ssSilver;
  const theirColor = version === "hg" ? C.ssSilver : C.hgGold;

  const sortByDex = ([a], [b]) => (allDexId(a) || 9999) - (allDexId(b) || 9999);
  const myEntries    = Object.entries(myExcls).sort(sortByDex);
  const theirEntries = Object.entries(theirExcls).sort(sortByDex);

  const spareCount    = myEntries.filter(([n]) => spares[n]).length;
  const receivedCount = theirEntries.filter(([n]) => received[n]).length;
  const evoDoneCount  = TRADE_EVOS.filter(e => evoDone[`${e.from}-${e.to}`]).length;

  const formatLocs = locs => {
    if (locs.length <= 2) return locs.map(l => l.areaName).join(" · ");
    return locs.slice(0, 2).map(l => l.areaName).join(" · ") + ` +${locs.length - 2} more`;
  };

  const rowSty = done => ({
    display:"flex", alignItems:"center", gap:10, padding:"7px 12px", borderRadius:8,
    cursor:"pointer", transition:"all 0.12s",
    background: done ? `${C.green}12` : "rgba(0,0,0,0.2)",
    border: `1px solid ${done ? C.green + "50" : C.border}`,
  });
  const chkSty = done => ({
    width:20, height:20, borderRadius:5, flexShrink:0, transition:"all 0.12s",
    border: `2px solid ${done ? C.green : C.border}`,
    background: done ? C.green : "transparent",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:11, fontWeight:"700", color:"#000",
  });

  const secHead = (label, count, total, color) => (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
      <div style={{ width:3, height:16, background:color, borderRadius:99, flexShrink:0 }} />
      <span style={{ fontSize:11, fontWeight:"700", color:C.text, letterSpacing:"0.07em", textTransform:"uppercase" }}>{label}</span>
      <span style={{ fontSize:11, color:C.muted, marginLeft:"auto" }}>{count} / {total}</span>
    </div>
  );

  const exRow = (name, locs, done, onToggle) => {
    const id = allDexId(name);
    return (
      <div key={name} onClick={onToggle}
        onMouseEnter={e => { e.currentTarget.style.background = done ? `${C.green}1e` : "rgba(255,255,255,0.04)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = done ? `${C.green}12` : "rgba(0,0,0,0.2)"; }}
        style={rowSty(done)}>
        {id ? <img src={pokeSpriteUrl(id)} alt={name} style={{ width:36, height:36, imageRendering:"pixelated", flexShrink:0, opacity:done?1:0.6 }} />
             : <div style={{ width:36, height:36, flexShrink:0 }} />}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:"600", color:done?C.green:C.text }}>{name}</div>
          <div style={{ fontSize:10, color:C.muted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{formatLocs(locs)}</div>
        </div>
        <div style={chkSty(done)}>{done && "✓"}</div>
      </div>
    );
  };

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"20px 16px 40px", display:"flex", flexDirection:"column", gap:24 }}>

        {/* Collect spares to trade away */}
        <div>
          {secHead(`${myLabel} exclusives — collect spares`, spareCount, myEntries.length, myColor)}
          <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>
            Only catchable in {myLabel}. Catch extras to send to your {theirLabel} partner.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {myEntries.map(([name, locs]) => exRow(name, locs, !!spares[name], () => toggleSpare(name)))}
          </div>
        </div>

        {/* Mark when received from partner */}
        <div>
          {secHead(`${theirLabel} exclusives — mark when received`, receivedCount, theirEntries.length, theirColor)}
          <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>
            Only catchable in {theirLabel}. Check off each one as your partner trades it to you.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {theirEntries.map(([name, locs]) => exRow(name, locs, !!received[name], () => toggleReceived(name)))}
          </div>
        </div>

        {/* Trade evolutions */}
        <div>
          {secHead("Trade evolutions", evoDoneCount, TRADE_EVOS.length, C.accent)}
          <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>
            Pokémon that only evolve by trading. Check off once you have the evolved form.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {TRADE_EVOS.map(({ from, to, item, itemSrc }) => {
              const key = `${from}-${to}`;
              const done = !!evoDone[key];
              const fromId = allDexId(from), toId = allDexId(to);
              return (
                <div key={key} onClick={() => toggleEvo(key)}
                  onMouseEnter={e => { e.currentTarget.style.background = done ? `${C.green}1e` : "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = done ? `${C.green}12` : "rgba(0,0,0,0.2)"; }}
                  style={rowSty(done)}>
                  {fromId ? <img src={pokeSpriteUrl(fromId)} alt={from} style={{ width:36, height:36, imageRendering:"pixelated", flexShrink:0, opacity:done?1:0.55 }} />
                           : <div style={{ width:36, height:36, flexShrink:0 }} />}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      <span style={{ fontSize:13, fontWeight:"600", color:done?C.green:C.text }}>{from}</span>
                      {item && <span style={{ fontSize:9, fontWeight:"700", padding:"1px 6px", borderRadius:99, whiteSpace:"nowrap", color:"#c8a040", background:"rgba(200,150,40,0.18)", border:"1px solid rgba(200,150,40,0.4)" }}>+ {item}</span>}
                      <span style={{ color:C.muted, fontSize:14 }}>→</span>
                      {toId && <img src={pokeSpriteUrl(toId)} alt={to} style={{ width:30, height:30, imageRendering:"pixelated", flexShrink:0, opacity:done?1:0.45 }} />}
                      <span style={{ fontSize:13, fontWeight:"600", color:done?C.green:C.text }}>{to}</span>
                    </div>
                    {itemSrc && <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{itemSrc}</div>}
                  </div>
                  <div style={chkSty(done)}>{done && "✓"}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── DREAM TEAM TAB ───────────────────────────────────────────────────────────
function DreamTeamTab({ isMobile, version }) {
  const [favorite,        setFavorite]        = React.useState("");
  const [pins,            setPins]            = React.useState({});   // {slotIdx: name}
  const [expandedAltSlot, setExpandedAltSlot] = React.useState(null);
  const [expandedPhAlt,   setExpandedPhAlt]   = React.useState(null);
  const [phPins,          setPhPins]          = React.useState({});
  const [hmPerPokemon,    setHmPerPokemon]    = React.useState(3);

  React.useEffect(() => {
    try {
      const r = localStorage.getItem("hgss-dream-team-v1");
      if (r) {
        const d = JSON.parse(r);
        if (d.favorite) setFavorite(d.favorite);
        if (d.pins) setPins(d.pins);
        if (d.phPins) setPhPins(d.phPins);
        if (d.hmPerPokemon) setHmPerPokemon(d.hmPerPokemon);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (!favorite) return;
    try { localStorage.setItem("hgss-dream-team-v1", JSON.stringify({ favorite, pins, phPins, version, hmPerPokemon })); } catch {}
  }, [favorite, pins, phPins, version, hmPerPokemon]);

  // Drop version-conflicting pins when version changes
  React.useEffect(() => {
    setPins(prev => {
      const next = {};
      for (const [k, name] of Object.entries(prev)) {
        const form = DT_FINAL_FORM[name] || name;
        const cand = DT_CANDIDATES.find(c => c.name === form);
        if (cand && ((version === "hg" && cand.ssOnly) || (version === "ss" && cand.hgOnly))) continue;
        next[k] = name;
      }
      return next;
    });
  }, [version]);

  // Johto regional dex only — exclude legendaries and post-game Kanto starters (johtoId 231–239)
  const eligible = React.useMemo(() => DEX.filter(p => !DT_LEGENDARY.has(p.name) && !(p.johtoId >= 231 && p.johtoId <= 239)), []);
  const team = React.useMemo(() => buildDreamTeamV2(favorite, pins, version), [favorite, pins, version]);
  const isTyranitarLine = ["Larvitar","Pupitar","Tyranitar"].includes(favorite);
  const tmWinners     = React.useMemo(() => team ? assignOneTimeTMs(team) : {}, [team]);
  const hmAssignments = React.useMemo(() => team ? assignHMs(team, hmPerPokemon) : {}, [team, hmPerPokemon]);

  const catchOrder = React.useMemo(() => {
    if (!team) return [];
    const sortedAreas = AREAS.map((area, i) => ({ area, i }))
      .sort((a, b) => {
        const pA = parseInt(a.area.part?.match(/\d+/)?.[0] || 999);
        const pB = parseInt(b.area.part?.match(/\d+/)?.[0] || 999);
        return pA - pB || a.i - b.i;
      });
    const findLocation = (name) => {
      const searchNames = [name, ...Object.entries(DT_FINAL_FORM).filter(([,f]) => f === name).map(([b]) => b), ...(BRANCH_PRE_EVO[name] ? [BRANCH_PRE_EVO[name]] : [])];
      for (const { area } of sortedAreas) {
        if (area.part === "Pokéwalker") continue;
        for (const searchName of searchNames) {
          const matches = _allPokemon(area).filter(p =>
            p.name === searchName &&
            !(version === "hg" && p.ssOnly) &&
            !(version === "ss" && p.hgOnly)
          );
          if (!matches.length) continue;
          const times = [...new Set(matches.map(p => p.time).filter(Boolean))];
          const timeStr = !times.length || ["morning","day","night"].every(t => times.includes(t))
            ? null
            : times.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join("/");
          return {
            teamName: name, catchName: searchName, areaName: area.name,
            part: area.part, partNum: parseInt(area.part?.match(/\d+/)?.[0] || 999),
            method: matches[0].method, levels: matches[0].levels,
            timeStr, needsEvo: searchName !== name,
          };
        }
      }
      return { teamName: name, catchName: null, areaName: null, part: null, partNum: 999 };
    };
    return team.map(findLocation).sort((a, b) => a.partNum - b.partNum);
  }, [team, version]);

  // Earliest part number each DT_CANDIDATE can be obtained (for placeholder suggestions)
  const candidatePartNums = React.useMemo(() => {
    const sortedAreas = AREAS.map((area, i) => ({ area, i }))
      .sort((a, b) => {
        const pA = parseInt(a.area.part?.match(/\d+/)?.[0] || 999);
        const pB = parseInt(b.area.part?.match(/\d+/)?.[0] || 999);
        return pA - pB || a.i - b.i;
      });
    const result = {};
    for (const cand of DT_CANDIDATES) {
      const searchNames = [cand.name, ...Object.entries(DT_FINAL_FORM).filter(([,f]) => f === cand.name).map(([b]) => b), ...(BRANCH_PRE_EVO[cand.name] ? [BRANCH_PRE_EVO[cand.name]] : [])];
      let found = 999;
      outer: for (const { area } of sortedAreas) {
        if (area.part === "Pokéwalker") continue;
        for (const sn of searchNames) {
          if (_allPokemon(area).some(p => p.name === sn &&
              !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly))) {
            found = parseInt(area.part?.match(/\d+/)?.[0] || 999);
            break outer;
          }
        }
      }
      result[cand.name] = found;
    }
    // All Eeveelutions share the same Eevee gift but DT_FINAL_FORM can only map "Eevee" to
    // one final form (Espeon). Patch the others to match Espeon's part number so they appear
    // in placeholder suggestions at the correct time.
    if (result["Espeon"] !== undefined) result["Umbreon"] = Math.min(result["Umbreon"] ?? 999, result["Espeon"]);
    return result;
  }, [version]);

  const placeholderSlots = React.useMemo(() => {
    if (!team) return [];
    const usedFinals = new Set(team.map(n => DT_FINAL_FORM[n] || n));
    return catchOrder
      .map(item => {
        if (item.partNum < 7) return null;
        const slotIdx = team.indexOf(item.teamName);
        if (slotIdx === -1) return null;
        const finalName = DT_FINAL_FORM[item.teamName] || item.teamName;
        const candInfo  = DT_CANDIDATES.find(c => c.name === finalName);
        const available = DT_CANDIDATES
          .filter(c => !usedFinals.has(c.name) &&
            !(version === "hg" && c.ssOnly) && !(version === "ss" && c.hgOnly) &&
            (candidatePartNums[c.name] || 999) < item.partNum)
          .map(c => ({ c, overlap: candInfo ? c.types.filter(t => candInfo.types.includes(t)).length : 0 }))
          .sort((a, b) => b.overlap - a.overlap || (candidatePartNums[a.c.name]||999) - (candidatePartNums[b.c.name]||999));
        if (!available.length) return null;
        const pinned = phPins[slotIdx] ? available.find(x => x.c.name === phPins[slotIdx]) : null;
        const active = pinned || available[0];
        return { slotIdx, teamName: item.teamName, teamPart: item.part, teamPartNum: item.partNum, active, available };
      })
      .filter(Boolean);
  }, [catchOrder, candidatePartNums, team, version, phPins]);

  const placeholderCatchOrder = React.useMemo(() => {
    if (!placeholderSlots.length) return [];
    const sortedAreas = AREAS.map((area, i) => ({ area, i }))
      .sort((a, b) => {
        const pA = parseInt(a.area.part?.match(/\d+/)?.[0] || 999);
        const pB = parseInt(b.area.part?.match(/\d+/)?.[0] || 999);
        return pA - pB || a.i - b.i;
      });
    return placeholderSlots.map(({ active, teamName }) => {
      const name = active.c.name;
      const searchNames = [name, ...Object.entries(DT_FINAL_FORM).filter(([,f]) => f === name).map(([b]) => b), ...(BRANCH_PRE_EVO[name] ? [BRANCH_PRE_EVO[name]] : [])];
      for (const { area } of sortedAreas) {
        if (area.part === "Pokéwalker") continue;
        for (const searchName of searchNames) {
          const matches = _allPokemon(area).filter(p =>
            p.name === searchName &&
            !(version === "hg" && p.ssOnly) &&
            !(version === "ss" && p.hgOnly)
          );
          if (!matches.length) continue;
          const times = [...new Set(matches.map(p => p.time).filter(Boolean))];
          const timeStr = !times.length || ["morning","day","night"].every(t => times.includes(t))
            ? null
            : times.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join("/");
          return {
            teamName: name, catchName: searchName, areaName: area.name,
            part: area.part, partNum: parseInt(area.part?.match(/\d+/)?.[0] || 999),
            method: matches[0].method, levels: matches[0].levels,
            timeStr, needsEvo: searchName !== name,
            isPlaceholder: true, forTeamMember: teamName,
          };
        }
      }
      return { teamName: name, catchName: null, areaName: null, part: null, partNum: 999, isPlaceholder: true, forTeamMember: teamName };
    });
  }, [placeholderSlots, version]);

  const isHardLocked = idx => idx === 0 || (idx === 1 && !isTyranitarLine);

  const togglePin = (idx) => {
    setPins(prev => {
      const next = { ...prev };
      if (next[idx]) delete next[idx]; else if (team && team[idx]) next[idx] = team[idx];
      return next;
    });
    setExpandedAltSlot(null);
  };
  const swapAlternative = (slotIdx, name) => { setPins(prev => ({ ...prev, [slotIdx]: name })); setExpandedAltSlot(null); };
  const resetPins = () => { setPins({}); setExpandedAltSlot(null); };

  const versionLabel = cand => cand.hgOnly ? "HG" : cand.ssOnly ? "SS" : null;
  const needsTrade   = cand => cand && (cand.tradeOnly || (version === "hg" && cand.ssOnly) || (version === "ss" && cand.hgOnly));

  const FavSelect = () => (
    <select value={favorite} onChange={e => { setFavorite(e.target.value); setPins({}); setExpandedAltSlot(null); }}
      style={{ flex:1, minWidth:160, background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, color:favorite ? C.text : C.muted, padding:"8px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:13, borderRadius:6, outline:"none" }}>
      <option value="">Choose your favourite Pokémon…</option>
      {eligible.map(p => {
        const cand = DT_CANDIDATES.find(c => c.name === (DT_FINAL_FORM[p.name] || p.name));
        const vl = cand ? versionLabel(cand) : null;
        const trade = cand ? needsTrade(cand) : false;
        const suffix = cand?.tradeOnly ? " (trade evo)" : trade ? ` (${vl} — needs trade)` : vl ? ` (${vl})` : "";
        return <option key={p.johtoId} value={p.name}>#{String(p.johtoId).padStart(3,"0")} {p.name}{suffix}</option>;
      })}
    </select>
  );

  // ── No favourite yet ─────────────────────────────────────────────────────────
  if (!team) {
    return (
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:4, textTransform:"uppercase" }}>Dream Team Builder</div>
          <div style={{ fontSize:12, color:C.muted, lineHeight:1.7 }}>Pick your favourite — the builder scores and fills the remaining 5 slots around it. Tyranitar (pseudo-legendary) is always included. You can pin any suggested slot and browse ranked alternatives.</div>
        </div>
        <FavSelect />
      </div>
    );
  }

  // ── Coverage summary row ──────────────────────────────────────────────────────
  const teamCoverage = getTeamCoverage(team);
  const missingTypes = TYPES_17.filter(t => !teamCoverage.has(t));
  const hmsCovered   = new Set(team.flatMap(n => { const f = DT_FINAL_FORM[n]||n; return Object.entries(DT_HM_COMPAT).filter(([,s])=>s.has(f)).map(([h])=>h); }));
  const hmsMissing   = ["Fly","Surf","Waterfall","Whirlpool","Strength","Cut","Rock Smash","Rock Climb"].filter(h => !hmsCovered.has(h));

  const TypePill = ({type, bg}) => (
    <span style={{ fontSize:8, color:"#fff", background: bg||TYPE_COLORS[type]||"#888", padding:"1px 5px", borderRadius:3, fontWeight:"700", letterSpacing:0.3 }}>{type}</span>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
      {/* Header controls */}
      <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:12 }}>
        <FavSelect />
        {Object.keys(pins).length > 0 && (
          <button onClick={resetPins} style={{ padding:"8px 12px", background:"rgba(0,0,0,0.2)", border:`1px solid ${C.border}`, borderRadius:6, cursor:"pointer", fontSize:11, color:C.muted, fontFamily:"'DM Sans',system-ui,sans-serif", whiteSpace:"nowrap" }}>
            Reset pins
          </button>
        )}
        <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:"auto" }}>
          <span style={{ fontSize:10, color:C.muted, whiteSpace:"nowrap" }}>Max HMs/member:</span>
          <div style={{ display:"flex", border:`1px solid ${C.border}`, borderRadius:6, overflow:"hidden" }}>
            {[1,2,3].map(n => (
              <button key={n} onClick={() => setHmPerPokemon(n)} style={{
                padding:"5px 10px", fontSize:11, fontFamily:"'DM Sans',system-ui,sans-serif",
                background: hmPerPokemon === n ? "rgba(74,143,196,0.25)" : "rgba(0,0,0,0.2)",
                color: hmPerPokemon === n ? "#4a8fc4" : C.muted,
                border:"none", borderLeft: n > 1 ? `1px solid ${C.border}` : "none",
                cursor:"pointer", fontWeight: hmPerPokemon === n ? "700" : "400",
              }}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage summary */}
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:7, padding:"6px 12px", fontSize:11, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color:C.muted }}>Type coverage</span>
          <span style={{ fontWeight:"700", color: missingTypes.length === 0 ? C.green : C.gold }}>{teamCoverage.size}/17</span>
          {missingTypes.length > 0 && <span style={{ color:C.muted, fontSize:10 }}>missing: {missingTypes.join(", ")}</span>}
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:7, padding:"6px 12px", fontSize:11, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color:C.muted }}>HMs</span>
          <span style={{ fontWeight:"700", color: hmsMissing.length === 0 ? C.green : "#e07b3a" }}>
            {hmsMissing.length === 0 ? "All covered ✓" : `Missing: ${hmsMissing.join(", ")}`}
          </span>
        </div>
      </div>

      {/* HM gap suggestions */}
      {hmsMissing.length > 0 && (() => {
        const usedFinal = new Set(team.map(n => DT_FINAL_FORM[n] || n));
        const suggestions = DT_CANDIDATES
          .filter(cand => {
            if (usedFinal.has(cand.name)) return false;
            if (version === "hg" && cand.ssOnly) return false;
            if (version === "ss" && cand.hgOnly) return false;
            return cand.hms.some(h => hmsMissing.includes(h));
          })
          .map(cand => ({ cand, covers: cand.hms.filter(h => hmsMissing.includes(h)), score: scoreCandidateInContext(cand, team, version) }))
          .sort((a, b) => b.covers.length - a.covers.length || b.score - a.score)
          .slice(0, 5);
        if (!suggestions.length) return null;
        return (
          <div style={{ background:"rgba(232,160,32,0.06)", border:"1px solid rgba(232,160,32,0.25)", borderRadius:8, padding:"10px 14px", marginBottom:16 }}>
            <div style={{ fontSize:9, fontWeight:"700", letterSpacing:1.5, color:"#e8a020", textTransform:"uppercase", marginBottom:8 }}>HM Gap — Suggested Fixes</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {suggestions.map(({ cand, covers }) => {
                const dexEntry = DEX.find(p => p.name === cand.name);
                return (
                  <div key={cand.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    {dexEntry && <img src={pokeSpriteUrl(dexEntry.id)} alt={cand.name} width={26} height={26} style={{ imageRendering:"pixelated", flexShrink:0 }} />}
                    <span style={{ fontSize:12, fontWeight:"600", color:C.text, flex:1 }}>{cand.name}</span>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {covers.map(hm => <span key={hm} style={{ fontSize:9, fontWeight:"700", color:"#4a8fc4", background:"rgba(74,143,196,0.12)", border:"1px solid rgba(74,143,196,0.3)", padding:"1px 6px", borderRadius:99 }}>{hm}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize:10, color:C.muted, marginTop:8 }}>Expand a slot's Alternatives to swap one in.</div>
          </div>
        );
      })()}

      {/* Team grid */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
        {team.map((name, idx) => {
          const hardLocked  = isHardLocked(idx);
          const userPinned  = !hardLocked && !!pins[idx];
          const isFav       = idx === 0;
          const isPseudo    = idx === 1 && !isTyranitarLine;
          const finalForm   = DT_FINAL_FORM[name] || name;
          const dexEntry    = DEX.find(p => p.name === name);
          const candInfo    = DT_CANDIDATES.find(c => c.name === finalForm);
          const assignedHMs = Object.entries(hmAssignments).filter(([,w]) => w === name).map(([hm]) => hm);
          const suppressed  = new Set(Object.entries(tmWinners).filter(([,w]) => w !== name).map(([mv]) => mv));
          const moves       = getDreamMoves(name, suppressed, assignedHMs);
          const acq         = getDreamAcquisition(name);
          const evoNote     = EVO_DELAY[name];
          const isPreEvo    = !!DT_FINAL_FORM[name];
          const vl          = candInfo ? versionLabel(candInfo) : null;
          const trade       = candInfo ? needsTrade(candInfo) : false;
          const altExpanded = expandedAltSlot === idx;

          const borderColor = isFav       ? "var(--hgss-accent)"
                            : trade       ? "#e07b3a"
                            : isPseudo    ? "#a87acc"
                            : userPinned  ? "#4a8fc4"
                            : C.border;

          return (
            <div key={idx} style={{ background:C.card, border:`1px solid ${borderColor}`, borderRadius:10, overflow:"hidden", display:"flex", flexDirection:"column" }}>

              {/* Card header */}
              <div style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
                {dexEntry && <img src={pokeSpriteUrl(dexEntry.id)} alt={name} style={{ width:48, height:48, imageRendering:"pixelated", flexShrink:0 }} />}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", marginBottom:2 }}>
                    <span style={{ fontSize:14, fontWeight:"700" }}>{name}</span>
                    {isFav      && <span style={{ fontSize:8, color:"var(--hgss-accent)", background:"rgba(var(--hgss-accent-rgb,212,98,26),0.12)", border:"1px solid rgba(var(--hgss-accent-rgb,212,98,26),0.4)", padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>★ FAV</span>}
                    {isPseudo   && <span style={{ fontSize:8, color:"#a87acc", background:"rgba(168,122,204,0.12)", border:"1px solid #a87acc55", padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>PSEUDO</span>}
                    {userPinned && <span style={{ fontSize:8, color:"#4a8fc4", background:"rgba(74,143,196,0.12)", border:"1px solid rgba(74,143,196,0.4)", padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>PINNED</span>}
                    {vl && !trade && <span style={{ fontSize:8, color: vl==="HG"?"#c8960a":"#3fa84a", background: vl==="HG"?"rgba(212,98,26,0.12)":"rgba(63,168,74,0.12)", border:`1px solid ${vl==="HG"?"rgba(212,98,26,0.4)":"rgba(63,168,74,0.4)"}`, padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>{vl}</span>}
                    {trade      && <span style={{ fontSize:8, color:"#e07b3a", background:"rgba(224,123,58,0.12)", border:"1px solid rgba(224,123,58,0.4)", padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>⇄ TRADE ({vl})</span>}
                  </div>
                  <div style={{ fontSize:9, color:C.muted }}>
                    {dexEntry ? `#${String(dexEntry.johtoId).padStart(3,"0")}` : ""}
                    {candInfo ? ` · ${candInfo.types.join("/")}` : (finalForm !== name ? ` · → ${finalForm}` : "")}
                    {candInfo?.stats ? ` · Atk ${candInfo.stats.atk} / SpA ${candInfo.stats.spa} / Spe ${candInfo.stats.spe}` : ""}
                  </div>
                </div>
                {!hardLocked && (
                  <button onClick={() => togglePin(idx)} title={userPinned ? "Unpin slot" : "Pin this Pokémon"}
                    style={{ flexShrink:0, padding:"4px 9px", background: userPinned?"rgba(74,143,196,0.12)":"rgba(0,0,0,0.15)", border:`1px solid ${userPinned?"#4a8fc4":C.border}`, borderRadius:5, cursor:"pointer", fontSize:13, color: userPinned?"#4a8fc4":C.muted, lineHeight:1 }}>
                    {userPinned ? "🔒" : "🔓"}
                  </button>
                )}
              </div>

              {/* HM pills */}
              {assignedHMs.length > 0 && (
                <div style={{ display:"flex", gap:3, flexWrap:"wrap", padding:"0 14px 10px" }}>
                  {assignedHMs.map(hm => <span key={hm} style={{ fontSize:8, color:"#4a8fc4", background:"rgba(74,143,196,0.10)", border:"1px solid rgba(74,143,196,0.3)", padding:"1px 6px", borderRadius:99, fontWeight:"700" }}>{hm}</span>)}
                </div>
              )}

              <div style={{ padding:"0 14px 14px", display:"flex", flexDirection:"column", gap:12, flex:1 }}>

                {/* Ability */}
                {DT_ABILITIES[finalForm] && (() => {
                  const ab = DT_ABILITIES[finalForm];
                  return (
                    <div>
                      <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Ability</div>
                      <div style={{ fontSize:10, lineHeight:1.5 }}>
                        <span style={{ fontWeight:"700", color:C.text }}>{ab.name}</span>
                        <span style={{ color:C.muted }}> — {ab.desc}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Moveset */}
                <div>
                  <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:5 }}>Moveset{isPreEvo ? ` (as ${finalForm})` : ""}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  {moves.map((m, i) => {
                    const isHM      = m.kind === "hm";
                    const isOneTime = m.kind === "tm" && m.oneTime;
                    const moveColor = isHM ? "#4a8fc4" : isOneTime ? "#e8a020" : m.kind === "tm" ? C.gold : (MOVE_TIERS?.good?.has(m.move) ? C.green : C.muted);
                    const superEff  = getMoveSuper(m.move);
                    return (
                      <div key={i} style={{ padding:"6px 8px", background:"rgba(0,0,0,0.18)", borderRadius:6, borderLeft:`2px solid ${moveColor}` }}>
                        <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                          <span style={{ fontSize:11, fontWeight:"600", color:C.text }}>{m.move}</span>
                          {MOVE_TYPES[m.move] && <span style={{ fontSize:8, color:"#fff", background:TYPE_COLORS[MOVE_TYPES[m.move]]||"#888", padding:"1px 5px", borderRadius:3, fontWeight:"700", letterSpacing:0.3, flexShrink:0 }}>{MOVE_TYPES[m.move]}</span>}
                          {(() => {
                            const cat = MOVE_CATEGORY[m.move];
                            if (!cat) return null;
                            const isStat = candInfo?.stats;
                            const mismatch = isStat && cat === "P" && candInfo.stats.spa - candInfo.stats.atk > 20
                                          || isStat && cat === "S" && candInfo.stats.atk - candInfo.stats.spa > 20;
                            const catBg = cat === "P" ? (mismatch ? "#8b2020" : "#7a4a10") : "#2a4a8a";
                            const catLabel = cat === "P" ? "Physical" : "Special";
                            return (
                              <span title={mismatch ? `⚠ ${catLabel} move — Pokémon's ${cat==="P"?"SpA":"Atk"} is much higher` : catLabel}
                                style={{ fontSize:8, color:"#fff", background:catBg, padding:"1px 5px", borderRadius:3, fontWeight:"700", letterSpacing:0.3, flexShrink:0, cursor:"default" }}>
                                {cat}{mismatch ? " ⚠" : ""}
                              </span>
                            );
                          })()}
                          <span style={{ fontSize:9, color:C.muted, flex:1, lineHeight:1.4 }}>{m.src}</span>
                          {isOneTime && <span style={{ fontSize:8, color:"#e8a020", background:"rgba(232,160,32,0.12)", border:"1px solid rgba(232,160,32,0.3)", borderRadius:3, padding:"0 4px", flexShrink:0, whiteSpace:"nowrap" }}>1× only</span>}
                        </div>
                        {MOVE_STATS[m.move] && (() => {
                          const s = MOVE_STATS[m.move];
                          const bp  = s.bp  != null ? `${s.bp} bp`  : "— bp";
                          const acc = s.acc != null ? `${s.acc}%`   : "—%";
                          return <div style={{ fontSize:9, color:C.muted, opacity:0.75, marginTop:2 }}>{bp} · {acc} · {s.pp} PP</div>;
                        })()}
                        {superEff.length > 0 && (
                          <div style={{ display:"flex", gap:3, flexWrap:"wrap", marginTop:3 }}>
                            <span style={{ fontSize:8, color:C.muted }}>2× vs</span>
                            {superEff.map(t => <span key={t} style={{ fontSize:8, fontWeight:"700", color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"0 4px", borderRadius:2 }}>{t}</span>)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>
                  {moves.length === 0 && <div style={{ fontSize:10, color:C.muted }}>No moveset data available.</div>}
                </div>

                {/* Where to Get */}
                <div>
                  <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Where to Get</div>
                  <div style={{ fontSize:10, color:C.text, lineHeight:1.5 }}>{acq}</div>
                </div>

                {/* Evo note */}
                {evoNote && (
                  <div style={{ fontSize:10, color:"#c8960a", lineHeight:1.5, padding:"5px 8px", background:"rgba(200,150,10,0.08)", borderRadius:5, borderLeft:"2px solid #c8960a" }}>
                    ⏳ {evoNote}
                  </div>
                )}

                {/* Defensive chart */}
                {candInfo && (() => {
                  const chart = getDefensiveChart(candInfo.types);
                  const imm  = TYPES_17.filter(t => chart[t] === 0);
                  const res2 = TYPES_17.filter(t => chart[t] === 0.25);
                  const res  = TYPES_17.filter(t => chart[t] === 0.5);
                  const weak = TYPES_17.filter(t => chart[t] === 2);
                  const weak4= TYPES_17.filter(t => chart[t] === 4);
                  return (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {(weak4.length > 0 || weak.length > 0) && (
                        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                          <div style={{ fontSize:9, color:"#e07b3a", letterSpacing:1.5, textTransform:"uppercase", fontWeight:"700" }}>Weak against</div>
                          {weak4.length > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#e83030", fontWeight:"700", minWidth:22 }}>4×</span>{weak4.map(t => <TypePill key={t} type={t} bg="#c02020" />)}</div>}
                          {weak.length  > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#e07b3a", fontWeight:"700", minWidth:22 }}>2×</span>{weak.map(t  => <TypePill key={t} type={t} />)}</div>}
                        </div>
                      )}
                      {(res.length > 0 || res2.length > 0 || imm.length > 0) && (
                        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                          <div style={{ fontSize:9, color:"#4a8fc4", letterSpacing:1.5, textTransform:"uppercase", fontWeight:"700" }}>Strong against</div>
                          {res.length  > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#4a8fc4", fontWeight:"700", minWidth:22 }}>½×</span>{res.map(t  => <TypePill key={t} type={t} />)}</div>}
                          {res2.length > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#4a8fc4", fontWeight:"700", minWidth:22 }}>¼×</span>{res2.map(t => <TypePill key={t} type={t} />)}</div>}
                          {imm.length  > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#7a5ab0", fontWeight:"700", minWidth:22 }}>0×</span>{imm.map(t  => <TypePill key={t} type={t} bg="#5a3a8a" />)}</div>}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Alternatives (suggested slots only) */}
                {!hardLocked && (
                  <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
                    <button onClick={() => setExpandedAltSlot(altExpanded ? null : idx)}
                      style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:C.muted, fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:10, fontWeight:"700", letterSpacing:1, padding:0, textTransform:"uppercase" }}>
                      <span style={{ fontSize:9 }}>{altExpanded ? "▼" : "▶"}</span>
                      <span>Alternatives</span>
                    </button>
                    {altExpanded && (
                      <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:5 }}>
                        {getAlternatives(idx, team, version, 15).map(({ name: altName, delta }) => {
                          const altDex = DEX.find(p => p.name === altName);
                          const isCurr = altName === name;
                          const isBest = delta === 0;
                          return (
                            <div key={altName} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 8px", background: isCurr?"rgba(var(--hgss-accent-rgb,212,98,26),0.07)":"rgba(0,0,0,0.12)", borderRadius:6, border:`1px solid ${isCurr?"rgba(var(--hgss-accent-rgb,212,98,26),0.2)":"transparent"}` }}>
                              {altDex && <img src={pokeSpriteUrl(altDex.id)} alt={altName} width={26} height={26} style={{ imageRendering:"pixelated", flexShrink:0 }} />}
                              <span style={{ fontSize:12, fontWeight:"600", flex:1, color: isCurr?"var(--hgss-accent)":C.text }}>{altName}</span>
                              <span style={{ fontSize:9, fontWeight:"700", flexShrink:0, padding:"1px 6px", borderRadius:4, background: isBest?"rgba(74,175,116,0.12)":"rgba(0,0,0,0.15)", border:`1px solid ${isBest?"rgba(74,175,116,0.3)":"transparent"}`, color: isBest?C.green:C.muted }}>
                                {isBest ? "BEST" : `${delta}`}
                              </span>
                              {!isCurr && (
                                <button onClick={() => swapAlternative(idx, altName)}
                                  style={{ padding:"3px 9px", background:"rgba(var(--hgss-accent-rgb,212,98,26),0.12)", border:"1px solid rgba(var(--hgss-accent-rgb,212,98,26),0.4)", borderRadius:4, cursor:"pointer", fontSize:9, color:"var(--hgss-accent)", fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"700", flexShrink:0 }}>
                                  Use
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder slots — full cards for late-game team members */}
      {placeholderSlots.length > 0 && (
        <div style={{ marginTop:20 }}>
          <div style={{ fontSize:9, color:C.gold, letterSpacing:2, textTransform:"uppercase", fontWeight:"700", marginBottom:10 }}>
            Temporary Slot{placeholderSlots.length > 1 ? "s" : ""}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
            {placeholderSlots.map(({ slotIdx, teamName, teamPart, active, available }) => {
              const phName     = active.c.name;
              const phFinal    = DT_FINAL_FORM[phName] || phName;
              const phDex      = DEX.find(p => p.name === phName);
              const phCand     = active.c;
              const phAbility  = DT_ABILITIES[phFinal] || DT_ABILITIES[phName];
              const phSuppressed = new Set(Object.entries(tmWinners).filter(([,w]) => w !== teamName).map(([mv]) => mv));
              const phMoves    = getDreamMoves(phName, phSuppressed, [], true);
              const phAcq      = getDreamAcquisition(phName);
              const phEvoNote  = EVO_DELAY[phName];
              const vl         = versionLabel(phCand);
              const trade      = needsTrade(phCand);
              const altExp     = expandedPhAlt === slotIdx;
              const phChart    = getDefensiveChart(phCand.types);
              const phImm  = TYPES_17.filter(t => phChart[t] === 0);
              const phRes2 = TYPES_17.filter(t => phChart[t] === 0.25);
              const phRes  = TYPES_17.filter(t => phChart[t] === 0.5);
              const phWeak = TYPES_17.filter(t => phChart[t] === 2);
              const phWeak4= TYPES_17.filter(t => phChart[t] === 4);
              return (
                <div key={slotIdx} style={{ background:C.card, border:"1px solid rgba(200,150,10,0.5)", borderRadius:10, overflow:"hidden", display:"flex", flexDirection:"column" }}>
                  {/* Temp-slot banner */}
                  <div style={{ padding:"5px 14px", background:"rgba(200,150,10,0.10)", borderBottom:"1px solid rgba(200,150,10,0.25)", display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:8, fontWeight:"700", color:C.gold, letterSpacing:1.5, textTransform:"uppercase" }}>Temp slot</span>
                    <span style={{ fontSize:8, color:C.muted }}>until {teamName} ({teamPart})</span>
                  </div>
                  {/* Card header */}
                  <div style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
                    {phDex && <img src={pokeSpriteUrl(phDex.id)} alt={phName} style={{ width:48, height:48, imageRendering:"pixelated", flexShrink:0 }} />}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", marginBottom:2 }}>
                        <span style={{ fontSize:14, fontWeight:"700" }}>{phName}</span>
                        {vl && !trade && <span style={{ fontSize:8, color: vl==="HG"?"#c8960a":"#3fa84a", background: vl==="HG"?"rgba(212,98,26,0.12)":"rgba(63,168,74,0.12)", border:`1px solid ${vl==="HG"?"rgba(212,98,26,0.4)":"rgba(63,168,74,0.4)"}`, padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>{vl}</span>}
                        {trade && <span style={{ fontSize:8, color:"#e07b3a", background:"rgba(224,123,58,0.12)", border:"1px solid rgba(224,123,58,0.4)", padding:"1px 5px", borderRadius:99, fontWeight:"700" }}>⇄ TRADE ({vl})</span>}
                      </div>
                      <div style={{ fontSize:9, color:C.muted }}>
                        {phDex ? `#${String(phDex.johtoId).padStart(3,"0")}` : ""}
                        {` · ${phCand.types.join("/")}`}
                        {phCand.stats ? ` · Atk ${phCand.stats.atk} / SpA ${phCand.stats.spa} / Spe ${phCand.stats.spe}` : ""}
                        {` · avail. Part ${candidatePartNums[phName]}`}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:"0 14px 14px", display:"flex", flexDirection:"column", gap:12, flex:1 }}>
                    {/* Ability */}
                    {phAbility && (
                      <div>
                        <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Ability</div>
                        <div style={{ fontSize:10, lineHeight:1.5 }}>
                          <span style={{ fontWeight:"700", color:C.text }}>{phAbility.name}</span>
                          <span style={{ color:C.muted }}> — {phAbility.desc}</span>
                        </div>
                      </div>
                    )}
                    {/* Moveset */}
                    <div>
                      <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:5 }}>Moveset</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                        {phMoves.map((m, i) => {
                          const isHM      = m.kind === "hm";
                          const isOneTime = m.kind === "tm" && m.oneTime;
                          const moveColor = isHM ? "#4a8fc4" : isOneTime ? "#e8a020" : m.kind === "tm" ? C.gold : (MOVE_TIERS?.good?.has(m.move) ? C.green : C.muted);
                          const superEff  = getMoveSuper(m.move);
                          return (
                            <div key={i} style={{ padding:"6px 8px", background:"rgba(0,0,0,0.18)", borderRadius:6, borderLeft:`2px solid ${moveColor}` }}>
                              <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                                <span style={{ fontSize:11, fontWeight:"600", color:C.text }}>{m.move}</span>
                                {MOVE_TYPES[m.move] && <span style={{ fontSize:8, color:"#fff", background:TYPE_COLORS[MOVE_TYPES[m.move]]||"#888", padding:"1px 5px", borderRadius:3, fontWeight:"700", letterSpacing:0.3, flexShrink:0 }}>{MOVE_TYPES[m.move]}</span>}
                                {(() => {
                                  const cat = MOVE_CATEGORY[m.move];
                                  if (!cat) return null;
                                  const isStat = phCand.stats;
                                  const mismatch = isStat && cat === "P" && phCand.stats.spa - phCand.stats.atk > 20
                                                || isStat && cat === "S" && phCand.stats.atk - phCand.stats.spa > 20;
                                  const catBg = cat === "P" ? (mismatch ? "#8b2020" : "#7a4a10") : "#2a4a8a";
                                  return (
                                    <span title={mismatch ? `⚠ move type mismatch` : (cat === "P" ? "Physical" : "Special")}
                                      style={{ fontSize:8, color:"#fff", background:catBg, padding:"1px 5px", borderRadius:3, fontWeight:"700", letterSpacing:0.3, flexShrink:0, cursor:"default" }}>
                                      {cat}{mismatch ? " ⚠" : ""}
                                    </span>
                                  );
                                })()}
                                <span style={{ fontSize:9, color:C.muted, flex:1, lineHeight:1.4 }}>{m.src}</span>
                                {isOneTime && <span style={{ fontSize:8, color:"#e8a020", background:"rgba(232,160,32,0.12)", border:"1px solid rgba(232,160,32,0.3)", borderRadius:3, padding:"0 4px", flexShrink:0, whiteSpace:"nowrap" }}>1× only</span>}
                              </div>
                              {MOVE_STATS[m.move] && (() => {
                                const s = MOVE_STATS[m.move];
                                return <div style={{ fontSize:9, color:C.muted, opacity:0.75, marginTop:2 }}>{s.bp != null ? `${s.bp} bp` : "— bp"} · {s.acc != null ? `${s.acc}%` : "—%"} · {s.pp} PP</div>;
                              })()}
                              {superEff.length > 0 && (
                                <div style={{ display:"flex", gap:3, flexWrap:"wrap", marginTop:3 }}>
                                  <span style={{ fontSize:8, color:C.muted }}>2× vs</span>
                                  {superEff.map(t => <span key={t} style={{ fontSize:8, fontWeight:"700", color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"0 4px", borderRadius:2 }}>{t}</span>)}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {phMoves.length === 0 && <div style={{ fontSize:10, color:C.muted }}>No moveset data available.</div>}
                      </div>
                    </div>
                    {/* Where to Get */}
                    <div>
                      <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Where to Get</div>
                      <div style={{ fontSize:10, color:C.text, lineHeight:1.5 }}>{phAcq}</div>
                    </div>
                    {/* Evo note */}
                    {phEvoNote && (
                      <div style={{ fontSize:10, color:"#c8960a", lineHeight:1.5, padding:"5px 8px", background:"rgba(200,150,10,0.08)", borderRadius:5, borderLeft:"2px solid #c8960a" }}>
                        ⏳ {phEvoNote}
                      </div>
                    )}
                    {/* Defensive chart */}
                    {(phWeak4.length > 0 || phWeak.length > 0 || phRes.length > 0 || phRes2.length > 0 || phImm.length > 0) && (
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {(phWeak4.length > 0 || phWeak.length > 0) && (
                          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                            <div style={{ fontSize:9, color:"#e07b3a", letterSpacing:1.5, textTransform:"uppercase", fontWeight:"700" }}>Weak against</div>
                            {phWeak4.length > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#e83030", fontWeight:"700", minWidth:22 }}>4×</span>{phWeak4.map(t => <TypePill key={t} type={t} bg="#c02020" />)}</div>}
                            {phWeak.length  > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#e07b3a", fontWeight:"700", minWidth:22 }}>2×</span>{phWeak.map(t  => <TypePill key={t} type={t} />)}</div>}
                          </div>
                        )}
                        {(phRes.length > 0 || phRes2.length > 0 || phImm.length > 0) && (
                          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                            <div style={{ fontSize:9, color:"#4a8fc4", letterSpacing:1.5, textTransform:"uppercase", fontWeight:"700" }}>Strong against</div>
                            {phRes.length  > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#4a8fc4", fontWeight:"700", minWidth:22 }}>½×</span>{phRes.map(t  => <TypePill key={t} type={t} />)}</div>}
                            {phRes2.length > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#4a8fc4", fontWeight:"700", minWidth:22 }}>¼×</span>{phRes2.map(t => <TypePill key={t} type={t} />)}</div>}
                            {phImm.length  > 0 && <div style={{ display:"flex", gap:3, flexWrap:"wrap", alignItems:"center" }}><span style={{ fontSize:9, color:"#7a5ab0", fontWeight:"700", minWidth:22 }}>0×</span>{phImm.map(t  => <TypePill key={t} type={t} bg="#5a3a8a" />)}</div>}
                          </div>
                        )}
                      </div>
                    )}
                    {/* Alternatives */}
                    <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
                      <button onClick={() => setExpandedPhAlt(altExp ? null : slotIdx)}
                        style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:C.muted, fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:10, fontWeight:"700", letterSpacing:1, padding:0, textTransform:"uppercase" }}>
                        <span style={{ fontSize:9 }}>{altExp ? "▼" : "▶"}</span>
                        <span>Alternatives</span>
                      </button>
                      {altExp && (
                        <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:5 }}>
                          {available.map(({ c: altC, overlap }) => {
                            const altDex  = DEX.find(p => p.name === altC.name);
                            const isCurr  = altC.name === phName;
                            const altPart = candidatePartNums[altC.name] || 999;
                            return (
                              <div key={altC.name} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 8px", background: isCurr?"rgba(200,150,10,0.08)":"rgba(0,0,0,0.12)", borderRadius:6, border:`1px solid ${isCurr?"rgba(200,150,10,0.3)":"transparent"}` }}>
                                {altDex && <img src={pokeSpriteUrl(altDex.id)} alt={altC.name} width={26} height={26} style={{ imageRendering:"pixelated", flexShrink:0 }} />}
                                <div style={{ flex:1, minWidth:0 }}>
                                  <span style={{ fontSize:12, fontWeight:"600", color: isCurr?C.gold:C.text }}>{altC.name}</span>
                                  <span style={{ fontSize:9, color:C.muted, marginLeft:6 }}>{altC.types.join("/")}</span>
                                </div>
                                <span style={{ fontSize:9, color: overlap > 0 ? C.green : C.muted, fontWeight:"700", flexShrink:0, minWidth:28, textAlign:"right" }}>
                                  Part {altPart}
                                </span>
                                {overlap > 0 && <span style={{ fontSize:8, color:C.green, background:"rgba(95,201,154,0.12)", border:"1px solid rgba(95,201,154,0.3)", borderRadius:3, padding:"0 4px", flexShrink:0 }}>type match</span>}
                                {!isCurr && (
                                  <button onClick={() => { setPhPins(prev => ({ ...prev, [slotIdx]: altC.name })); setExpandedPhAlt(null); }}
                                    style={{ padding:"3px 9px", background:"rgba(200,150,10,0.12)", border:"1px solid rgba(200,150,10,0.4)", borderRadius:4, cursor:"pointer", fontSize:9, color:C.gold, fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"700", flexShrink:0 }}>
                                    Use
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Catch Order */}
      <div style={{ marginTop:24, marginBottom:8 }}>
        <div style={{ fontSize:9, color:C.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:10, fontWeight:"700" }}>
          Earliest Catch Locations
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {[...catchOrder, ...placeholderCatchOrder]
            .sort((a, b) => a.partNum - b.partNum)
            .map(({ teamName, catchName, areaName, part, method, levels, timeStr, needsEvo, isPlaceholder, forTeamMember }) => {
            const teamEntry = DEX.find(p => p.name === teamName);
            return (
              <div key={isPlaceholder ? `ph-${teamName}` : teamName} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:C.card, border:`1px solid ${isPlaceholder ? "rgba(200,150,10,0.4)" : C.border}`, borderRadius:8 }}>
                {teamEntry && <img src={pokeSpriteUrl(teamEntry.id)} alt={teamName} width={32} height={32} style={{ imageRendering:"pixelated", flexShrink:0 }} />}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:2 }}>
                    <span style={{ fontSize:12, fontWeight:"700", color: isPlaceholder ? C.gold : C.text }}>{teamName}</span>
                    {isPlaceholder && <span style={{ fontSize:8, fontWeight:"700", color:C.gold, letterSpacing:1, textTransform:"uppercase" }}>temp</span>}
                    {isPlaceholder && <span style={{ fontSize:9, color:C.muted }}>until {forTeamMember}</span>}
                    {!isPlaceholder && needsEvo && <span style={{ fontSize:9, color:C.muted }}>catch {catchName} → evolve</span>}
                    {isPlaceholder && needsEvo && <span style={{ fontSize:9, color:C.muted }}>catch {catchName} → evolve</span>}
                  </div>
                  {areaName ? (
                    <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>
                      <span style={{ color:C.gold, fontWeight:"600" }}>{part}</span>
                      <span style={{ color:C.text }}> · {areaName}</span>
                      <span> · {method}{levels ? `, Lv. ${levels}` : ""}</span>
                      {timeStr && <span style={{ color:"#a87acc" }}> · {timeStr} only</span>}
                    </div>
                  ) : (
                    <div style={{ fontSize:10, color:C.muted }}>See Pokédex for location</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── TYPE CHART TAB ───────────────────────────────────────────────────────────
function TypeChartTab({ isMobile }) {
  const [activeCols, setActiveCols] = useState([]); // up to 2 defending types
  const [activeRow,  setActiveRow]  = useState(null); // 1 attacking type

  const cellBg = (m) => {
    if (m === 0)    return { bg:"#3a1a6a", text:"#a07acc" };
    if (m === 0.25) return { bg:"#0e2c4a", text:"#4a8fc4" };
    if (m === 0.5)  return { bg:"#0a2040", text:"#5aa0d8" };
    if (m === 2)    return { bg:"#4a2200", text:"#e07b3a" };
    if (m === 4)    return { bg:"#5a0000", text:"#e83030" };
    return { bg:"transparent", text:"#444" };
  };
  const cellLabel = (m) => {
    if (m === 0)    return "0";
    if (m === 0.25) return "¼";
    if (m === 0.5)  return "½";
    if (m === 2)    return "2";
    if (m === 4)    return "4";
    return "·";
  };

  const CELL = 28;
  const LABEL_W = isMobile ? 52 : 62;

  const toggleCol = (def) => {
    setActiveRow(null);
    setActiveCols(prev =>
      prev.includes(def) ? prev.filter(x => x !== def)
        : prev.length < 2 ? [...prev, def]
        : [prev[1], def]
    );
  };
  const clickRow = (atk) => {
    setActiveCols([]);
    setActiveRow(prev => prev === atk ? null : atk);
  };

  const TypePill = ({ type }) => (
    <span style={{
      fontSize:10, fontWeight:"700", color:"#fff",
      background: TYPE_COLORS[type] || "#888",
      padding:"2px 7px", borderRadius:3, letterSpacing:0.2,
    }}>{type}</span>
  );

  const NeutralPill = ({ type }) => (
    <span style={{ fontSize:10, fontWeight:"700", color:"#555", background:`${TYPE_COLORS[type]}22`, border:`1px solid ${TYPE_COLORS[type]}44`, padding:"2px 7px", borderRadius:3 }}>{type}</span>
  );

  const MUL_GROUPS = [
    { m:4,    label:"4× weak",   textColor:"#e83030" },
    { m:2,    label:"2× weak",   textColor:"#e07b3a" },
    { m:0.5,  label:"½× resist", textColor:"#5aa0d8" },
    { m:0.25, label:"¼× resist", textColor:"#4a8fc4" },
    { m:0,    label:"0× immune", textColor:"#a07acc" },
  ];

  const LEGEND = [
    { bg:"#5a0000", text:"#e83030", label:"4×" },
    { bg:"#4a2200", text:"#e07b3a", label:"2×" },
    { bg:"transparent", text:"#555", label:"1×" },
    { bg:"#0a2040", text:"#5aa0d8", label:"½×" },
    { bg:"#0e2c4a", text:"#4a8fc4", label:"¼×" },
    { bg:"#3a1a6a", text:"#a07acc", label:"0×" },
  ];

  // ── results panel ──
  const hasSelection = activeCols.length > 0 || activeRow !== null;

  const ResultsPanel = () => {
    if (!hasSelection) return (
      <div style={{ fontSize:11, color:C.muted, padding:"16px 0" }}>
        Click a <strong style={{ color:C.text }}>column header</strong> to see what hits that type ·
        Click a <strong style={{ color:C.text }}>row label</strong> to see what that type hits
      </div>
    );

    if (activeRow) {
      // attacking mode — what does activeRow hit?
      const superEff = [], notVery = [], immune2 = [], neutral2 = [];
      for (const def of TYPES_17) {
        const m = (TYPE_CHART[activeRow] || {})[def] !== undefined ? (TYPE_CHART[activeRow] || {})[def] : 1;
        if (m === 0) immune2.push(def);
        else if (m < 1) notVery.push(def);
        else if (m > 1) superEff.push(def);
        else neutral2.push(def);
      }
      return (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontSize:11, color:C.muted }}>
            Damage dealt by <strong style={{ color:TYPE_COLORS[activeRow] }}>{activeRow}</strong> moves against single-type defenders:
          </div>
          {superEff.length > 0 && <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
            <span style={{ fontSize:11, fontWeight:"700", color:"#e07b3a", minWidth:64, paddingTop:2 }}>2× hits</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{superEff.map(t => <TypePill key={t} type={t} />)}</div>
          </div>}
          {notVery.length > 0 && <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
            <span style={{ fontSize:11, fontWeight:"700", color:"#5aa0d8", minWidth:64, paddingTop:2 }}>½× hits</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{notVery.map(t => <TypePill key={t} type={t} />)}</div>
          </div>}
          {immune2.length > 0 && <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
            <span style={{ fontSize:11, fontWeight:"700", color:"#a07acc", minWidth:64, paddingTop:2 }}>0× (miss)</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{immune2.map(t => <TypePill key={t} type={t} />)}</div>
          </div>}
          {neutral2.length > 0 && <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
            <span style={{ fontSize:11, color:C.muted, minWidth:64, paddingTop:2 }}>1× neutral</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{neutral2.map(t => <NeutralPill key={t} type={t} />)}</div>
          </div>}
        </div>
      );
    }

    // defending mode — what hits activeCols?
    const chart = getDefensiveChart(activeCols);
    const neutral = TYPES_17.filter(t => chart[t] === 1);
    const typeLabel = activeCols.join("/");
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ fontSize:11, color:C.muted }}>
          Incoming damage to a{" "}
          {activeCols.map((t, i) => (
            <span key={t}>
              {i > 0 && <span style={{ color:C.muted }}>/</span>}
              <strong style={{ color:TYPE_COLORS[t] }}>{t}</strong>
            </span>
          ))}
          {"-type Pokémon:"}
        </div>
        {MUL_GROUPS.map(({ m, label, textColor }) => {
          const types = TYPES_17.filter(t => chart[t] === m);
          if (types.length === 0) return null;
          return (
            <div key={m} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
              <span style={{ fontSize:11, fontWeight:"700", color:textColor, minWidth:64, paddingTop:2 }}>{label}</span>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {types.map(t => <TypePill key={t} type={t} />)}
              </div>
            </div>
          );
        })}
        {neutral.length > 0 && (
          <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
            <span style={{ fontSize:11, color:C.muted, minWidth:64, paddingTop:2 }}>1× neutral</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{neutral.map(t => <NeutralPill key={t} type={t} />)}</div>
          </div>
        )}
      </div>
    );
  };

  const tableW = LABEL_W + TYPES_17.length * (CELL + 2);
  return (
    <div style={{ flex:1, overflowY:"auto", padding: isMobile ? "12px 8px" : "20px 24px", color: C.text, fontFamily:"inherit" }}>
      <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", marginBottom:16 }}>
        <table style={{ borderCollapse:"separate", borderSpacing:2, tableLayout:"fixed", width:tableW, minWidth:tableW }}>
          <thead>
            <tr>
              {/* corner cell — mode hint */}
              <th style={{ width:LABEL_W, minWidth:LABEL_W, verticalAlign:"bottom", paddingBottom:4, paddingRight:4 }}>
                <div style={{ fontSize:7, color:C.muted, textAlign:"right", lineHeight:1.4 }}>
                  row→<br/>atk
                </div>
              </th>
              {TYPES_17.map(def => {
                const tc = TYPE_COLORS[def] || "#888";
                const isHL = activeCols.includes(def);
                return (
                  <th key={def} onClick={() => toggleCol(def)}
                    style={{ width:CELL, minWidth:CELL, padding:0, cursor:"pointer" }}>
                    <div style={{
                      height: isMobile ? 52 : 62,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background: isHL ? tc : `${tc}28`,
                      borderRadius:"4px 4px 0 0",
                      transition:"color 0.15s, background 0.15s",
                      outline: isHL ? `2px solid ${tc}` : "none",
                      overflow:"hidden",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:3, transform:"rotate(-90deg)", whiteSpace:"nowrap" }}>
                        <span style={{ display:"inline-block", width:6, height:6, borderRadius:1, background: isHL ? "#fff" : tc, flexShrink:0 }} />
                        <span style={{ fontSize:8, fontWeight:"700", color: isHL ? "#fff" : tc }}>{def}</span>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TYPES_17.map(atk => {
              const row = TYPE_CHART[atk] || {};
              const isActiveRow = activeRow === atk;
              return (
                <tr key={atk}>
                  <td onClick={() => clickRow(atk)} style={{ paddingRight:4, paddingLeft:2, cursor:"pointer" }}>
                    <div style={{
                      display:"flex", alignItems:"center", gap:4, height:CELL,
                      background: isActiveRow ? `${TYPE_COLORS[atk]}28` : "transparent",
                      borderRadius:4, paddingLeft:3,
                      outline: isActiveRow ? `2px solid ${TYPE_COLORS[atk]}88` : "none",
                      transition:"background 0.15s",
                    }}>
                      <span style={{ display:"inline-block", width:8, height:8, borderRadius:2, background:TYPE_COLORS[atk]||"#888", flexShrink:0 }} />
                      <span style={{ fontSize:9, fontWeight:"700", color: isActiveRow ? TYPE_COLORS[atk] : C.text, whiteSpace:"nowrap" }}>{atk}</span>
                    </div>
                  </td>
                  {TYPES_17.map(def => {
                    const m = row[def] !== undefined ? row[def] : 1;
                    const { bg, text } = cellBg(m);
                    const isColHL = activeCols.includes(def);
                    const isRowHL = isActiveRow;
                    const colColor = TYPE_COLORS[def] || "#888";
                    return (
                      <td key={def}
                        style={{
                          width:CELL, height:CELL, padding:0, textAlign:"center",
                          background: isColHL ? (m !== 1 ? bg : `${colColor}18`) : bg,
                          borderRadius:3,
                          outline: isColHL ? `1px solid ${colColor}88` : isRowHL ? `1px solid ${TYPE_COLORS[atk]}44` : "none",
                          opacity: isRowHL && !isColHL ? 0.55 : 1,
                          transition:"background 0.1s, opacity 0.1s",
                        }}>
                        <span style={{ fontSize:9, fontWeight: m !== 1 ? "700" : "400", color: m !== 1 ? text : "#333" }}>
                          {cellLabel(m)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* legend */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
        {LEGEND.map(({ bg, text, label }) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:16, height:16, background:bg, border:"1px solid rgba(255,255,255,0.08)", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:8, fontWeight:"700", color:text }}>·</span>
            </div>
            <span style={{ fontSize:10, color:C.muted }}>{label}</span>
          </div>
        ))}
        {hasSelection && (
          <button onClick={() => { setActiveCols([]); setActiveRow(null); }} style={{
            marginLeft:"auto", fontSize:9, color:C.muted, background:"transparent", border:"none", cursor:"pointer", padding:0,
          }}>✕ clear</button>
        )}
      </div>

      {/* results */}
      <ResultsPanel />
    </div>
  );
}

// ─── CATCH CALC TAB ───────────────────────────────────────────────────────────
function CatchCalcTab({ isMobile }) {
  const [selected,     setSelected]     = useState(() => CATCH_RATE_DATA[0] || null);
  const [hpPct,        setHpPct]        = useState(100);
  const [status,       setStatus]       = useState("none");
  const [ballKey,      setBallKey]      = useState("poke");
  const [search,       setSearch]       = useState("");
  const [wildLevel,    setWildLevel]    = useState(20);
  const [trainerLevel, setTrainerLevel] = useState(50);
  const [turns,        setTurns]        = useState(1);
  const [cond,         setCond]         = useState({ waterBug:false, cave:false, first:false,
                                                      registered:false, fishing:false,
                                                      moonStone:false, oppositeGender:false,
                                                      speed100:false, heavyKg:"light" });
  const toggleCond = k => setCond(p => ({...p, [k]: !p[k]}));

  const STATUS_OPTS = [
    {key:"none", label:"None",            mult:1},
    {key:"par",  label:"PAR / BRN / PSN", mult:1.5},
    {key:"slp",  label:"SLP / FRZ",       mult:2},
  ];

  // All HGSS balls with bonus formulae
  const HGSS_BALLS = [
    {key:"poke",   label:"Poké Ball",   group:"Standard", icon:"poke-ball",   getBonus:()=>1},
    {key:"great",  label:"Great Ball",  group:"Standard", icon:"great-ball",  getBonus:()=>1.5},
    {key:"ultra",  label:"Ultra Ball",  group:"Standard", icon:"ultra-ball",  getBonus:()=>2},
    {key:"master", label:"Master Ball", group:"Standard", icon:"master-ball", getBonus:()=>"catch"},
    {key:"net",    label:"Net Ball",    group:"Special",  icon:"net-ball",    getBonus:c=>c.waterBug?3:1,        condKey:"waterBug",       condLabel:"Water or Bug type"},
    {key:"nest",   label:"Nest Ball",   group:"Special",  icon:"nest-ball",   getBonus:()=>Math.max(1,Math.floor((41-wildLevel)/10))},
    {key:"repeat", label:"Repeat Ball", group:"Special",  icon:"repeat-ball", getBonus:c=>c.registered?3:1,     condKey:"registered",     condLabel:"Already in Pokédex"},
    {key:"timer",  label:"Timer Ball",  group:"Special",  icon:"timer-ball",  getBonus:()=>Math.min(4,Math.floor(1+(turns+1)/10))},
    {key:"dusk",   label:"Dusk Ball",   group:"Special",  icon:"dusk-ball",   getBonus:c=>c.cave?3.5:1,         condKey:"cave",           condLabel:"Cave or nighttime"},
    {key:"quick",  label:"Quick Ball",  group:"Special",  icon:"quick-ball",  getBonus:c=>c.first?4:1,          condKey:"first",          condLabel:"First turn of battle"},
    {key:"sport",  label:"Sport Ball",  group:"Special",  icon:"sport-ball",  getBonus:()=>1.5, note:"Bug-Catching Contest only"},
    {key:"heavy",  label:"Heavy Ball",  group:"Apricorn", icon:"heavy-ball",  heavy:true, getBonus:()=>1},
    {key:"level",  label:"Level Ball",  group:"Apricorn", icon:"level-ball",  levelBall:true, getBonus:()=>{
      const r=trainerLevel/wildLevel; return r>4?8:r>2?4:r>1?2:1;
    }},
    {key:"lure",   label:"Lure Ball",   group:"Apricorn", icon:"lure-ball",   getBonus:c=>c.fishing?3:1,        condKey:"fishing",        condLabel:"Fishing (rod encounter)"},
    {key:"moon",   label:"Moon Ball",   group:"Apricorn", icon:"moon-ball",   getBonus:c=>c.moonStone?4:1,      condKey:"moonStone",      condLabel:"Evolves via Moon Stone"},
    {key:"love",   label:"Love Ball",   group:"Apricorn", icon:"love-ball",   getBonus:c=>c.oppositeGender?8:1, condKey:"oppositeGender", condLabel:"Same species, opposite gender"},
    {key:"fast",   label:"Fast Ball",   group:"Apricorn", icon:"fast-ball",   getBonus:c=>c.speed100?4:1,       condKey:"speed100",       condLabel:"Base Speed ≥ 100"},
    {key:"friend", label:"Friend Ball", group:"Apricorn", icon:"friend-ball", getBonus:()=>1},
  ];
  const BALL_GROUPS = ["Standard","Special","Apricorn"];
  const HEAVY_MOD = {light:-20, medium:20, heavy:30, vheavy:40};

  const ball   = HGSS_BALLS.find(b=>b.key===ballKey);
  const stOpt  = STATUS_OPTS.find(s=>s.key===status);
  const rate   = selected?.rate ?? 45;
  const effectiveRate = ball?.heavy ? Math.max(1, rate + HEAVY_MOD[cond.heavyKg]) : rate;
  const ballBonus     = ball ? ball.getBonus(cond) : 1;
  const hpFraction    = hpPct / 100;

  const a = ballBonus === "catch" ? 255
          : Math.min(255, Math.floor(((3 - 2*hpFraction) / 3) * effectiveRate * ballBonus * stOpt.mult));
  const p = a / 255;
  const throwsFor = t => (p>=1?1:p<=0?Infinity:Math.ceil(Math.log(1-t)/Math.log(1-p)));
  const milestones = [{label:"50%",n:throwsFor(0.50)},{label:"75%",n:throwsFor(0.75)},
                      {label:"90%",n:throwsFor(0.90)},{label:"95%",n:throwsFor(0.95)},{label:"99%",n:throwsFor(0.99)}];
  const expected = p > 0 ? 1/p : Infinity;

  const filteredPokemon = CATCH_RATE_DATA.filter(pk=>pk.name.toLowerCase().includes(search.toLowerCase()));

  const pill = (active, label, onClick, icon) => (
    <button key={label} onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:icon?4:0,
      padding:"4px 10px", border:`1px solid ${active?"var(--hgss-accent)":C.border}`,
      borderRadius:20, cursor:"pointer", fontSize:11, fontWeight:"600",
      background: active?"var(--hgss-accent)":"rgba(0,0,0,0.3)",
      color: active?"#fff":C.muted, transition:"all 0.15s",
      fontFamily:"'DM Sans',sans-serif",
    }}>
      {icon && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${icon}.png`}
                    alt="" style={{width:14,height:14,imageRendering:"pixelated",flexShrink:0}} />}
      {label}
    </button>
  );

  const tog = (active, label, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding:"4px 10px", border:`1px solid ${active?"#4ab770":C.border}`,
      borderRadius:20, cursor:"pointer", fontSize:11, fontWeight:"600",
      background: active?"rgba(74,183,112,0.2)":"rgba(0,0,0,0.3)",
      color: active?"#4ab770":C.muted, transition:"all 0.15s",
    }}>{active?"✓ ":""}{label}</button>
  );

  const sectionLabel = text => (
    <div style={{fontSize:10,fontWeight:"700",letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",marginBottom:6}}>{text}</div>
  );

  return (
    <div style={{flex:1, overflowY:"auto"}}>
    <div style={{display:"flex",flexDirection:isMobile?"column":"row",gap:16,padding:"16px",maxWidth:960,margin:"0 auto"}}>

      {/* ── Left: Pokémon picker ── */}
      <div style={{flex:"0 0 auto",width:isMobile?"100%":280}}>
        <div style={{background:C.card,borderRadius:10,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          <div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`}}>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search Pokémon…"
              style={{width:"100%",boxSizing:"border-box",padding:"6px 10px",borderRadius:6,
                      border:`1px solid ${C.border}`,background:"rgba(0,0,0,0.3)",
                      color:C.text,fontSize:16,fontFamily:"'DM Sans',sans-serif",outline:"none"}} />
          </div>
          <div style={{overflowY:"auto",maxHeight:isMobile?200:480}}>
            {filteredPokemon.map(pk=>{
              const isSel = pk.id===selected?.id;
              return (
                <div key={pk.id} onClick={()=>setSelected(pk)}
                  style={{display:"flex",alignItems:"center",gap:8,padding:"6px 12px",cursor:"pointer",
                          background:isSel?"rgba(var(--hgss-accent-rgb,212,98,26),0.18)":"transparent",
                          borderLeft:isSel?"3px solid var(--hgss-accent)":"3px solid transparent",transition:"background 0.1s"}}
                  onMouseEnter={e=>{if(!isSel)e.currentTarget.style.background="rgba(255,255,255,0.04)";}}
                  onMouseLeave={e=>{if(!isSel)e.currentTarget.style.background="transparent";}}>
                  <img src={pokeSpriteUrl(pk.id)} alt={pk.name} width={32} height={32} style={{imageRendering:"pixelated"}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:"600",color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{pk.name}</div>
                    <div style={{fontSize:10,color:C.muted}}>Catch rate: {pk.rate}</div>
                  </div>
                </div>
              );
            })}
            {filteredPokemon.length===0&&<div style={{padding:16,textAlign:"center",color:C.muted,fontSize:12}}>No Pokémon found</div>}
          </div>
        </div>
      </div>

      {/* ── Right: Calculator ── */}
      {selected && (
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>

        {/* Header */}
        <div style={{background:C.card,borderRadius:10,border:`1px solid ${C.border}`,padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
          <img src={pokeSpriteUrl(selected.id)} alt={selected.name} width={64} height={64} style={{imageRendering:"pixelated"}}/>
          <div>
            <div style={{fontSize:18,fontWeight:"700",color:C.text}}>{selected.name}</div>
            <div style={{fontSize:13,color:C.muted,marginTop:2}}>
              Base catch rate: <span style={{color:C.text,fontWeight:"600"}}>{rate}</span><span style={{color:C.muted}}>/255</span>
              {ball?.heavy && <span style={{marginLeft:8,color:HEAVY_MOD[cond.heavyKg]>0?C.green:"#ef5350"}}>
                ({HEAVY_MOD[cond.heavyKg]>0?"+":""}{HEAVY_MOD[cond.heavyKg]} → effective {effectiveRate})
              </span>}
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>
              {rate<=3?"Legendary — extremely hard to catch":rate<=45?"Uncommon catch rate":rate<=100?"Moderate catch rate":"Common catch rate"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{background:C.card,borderRadius:10,border:`1px solid ${C.border}`,padding:"16px 20px",display:"flex",flexDirection:"column",gap:16}}>

          {/* HP */}
          <div>
            {sectionLabel("Current HP")}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="range" min={1} max={100} value={hpPct} onChange={e=>setHpPct(Number(e.target.value))}
                style={{flex:1,accentColor:"var(--hgss-accent)"}}/>
              <div style={{width:52,textAlign:"center",padding:"3px 6px",background:"rgba(0,0,0,0.3)",
                          border:`1px solid ${C.border}`,borderRadius:6,fontSize:13,fontWeight:"700",color:C.text}}>{hpPct}%</div>
            </div>
            <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
              {[100,75,50,25,12,1].map(v=>pill(hpPct===v,`${v}%`,()=>setHpPct(v)))}
            </div>
          </div>

          {/* Wild level */}
          <div>
            {sectionLabel("Wild Pokémon Level")}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="range" min={1} max={100} value={wildLevel} onChange={e=>setWildLevel(Number(e.target.value))}
                style={{flex:1,accentColor:"var(--hgss-accent)"}}/>
              <div style={{width:52,textAlign:"center",padding:"3px 6px",background:"rgba(0,0,0,0.3)",
                          border:`1px solid ${C.border}`,borderRadius:6,fontSize:13,fontWeight:"700",color:C.text}}>{wildLevel}</div>
            </div>
            <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
              {[5,10,20,30,40,50,60].map(v=>pill(wildLevel===v,`${v}`,()=>setWildLevel(v)))}
            </div>
          </div>

          {/* Status */}
          <div>
            {sectionLabel("Status Condition")}
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {STATUS_OPTS.map(s=>pill(status===s.key,s.label,()=>setStatus(s.key)))}
            </div>
          </div>

          {/* Ball selection — grouped */}
          <div>
            {sectionLabel("Poké Ball")}
            {BALL_GROUPS.map(grp=>(
              <div key={grp} style={{marginBottom:10}}>
                <div style={{fontSize:9,color:C.muted,fontWeight:"700",letterSpacing:1,textTransform:"uppercase",marginBottom:5}}>{grp}</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {HGSS_BALLS.filter(b=>b.group===grp).map(b=>pill(ballKey===b.key,b.label,()=>setBallKey(b.key),b.icon))}
                </div>
              </div>
            ))}
          </div>

          {/* Ball-specific context inputs */}
          {ball?.condKey && (
            <div>
              {sectionLabel("Ball Condition")}
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {tog(!!cond[ball.condKey], ball.condLabel, ()=>toggleCond(ball.condKey))}
                {ball.note&&<span style={{fontSize:10,color:C.muted,alignSelf:"center"}}>{ball.note}</span>}
              </div>
            </div>
          )}
          {ball?.heavy && (
            <div>
              {sectionLabel("Pokémon Weight")}
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {[["light","< 100 kg (−20)"],["medium","100–200 kg (+20)"],["heavy","200–300 kg (+30)"],["vheavy","≥ 300 kg (+40)"]].map(([k,l])=>
                  pill(cond.heavyKg===k,l,()=>setCond(p=>({...p,heavyKg:k})))
                )}
              </div>
            </div>
          )}
          {ball?.levelBall && (
            <div>
              {sectionLabel(`Your Active Pokémon's Level — Level Ball: ×${ball.getBonus()}`)}
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <input type="range" min={1} max={100} value={trainerLevel} onChange={e=>setTrainerLevel(Number(e.target.value))}
                  style={{flex:1,accentColor:"var(--hgss-accent)"}}/>
                <div style={{width:52,textAlign:"center",padding:"3px 6px",background:"rgba(0,0,0,0.3)",
                            border:`1px solid ${C.border}`,borderRadius:6,fontSize:13,fontWeight:"700",color:C.text}}>{trainerLevel}</div>
              </div>
              <div style={{fontSize:10,color:C.muted,marginTop:4}}>
                Wild Lv.{wildLevel} · Ratio {(trainerLevel/wildLevel).toFixed(1)}× → <strong style={{color:C.text}}>×{ball.getBonus()} bonus</strong>
              </div>
            </div>
          )}
          {ball?.key==="timer" && (
            <div>
              {sectionLabel(`Battle Turns Elapsed — Timer Ball: ×${ball.getBonus().toFixed(1)}`)}
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <input type="range" min={1} max={40} value={turns} onChange={e=>setTurns(Number(e.target.value))}
                  style={{flex:1,accentColor:"var(--hgss-accent)"}}/>
                <div style={{width:52,textAlign:"center",padding:"3px 6px",background:"rgba(0,0,0,0.3)",
                            border:`1px solid ${C.border}`,borderRadius:6,fontSize:13,fontWeight:"700",color:C.text}}>{turns}</div>
              </div>
              <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                {[1,10,20,30,40].map(v=>pill(turns===v,`T${v}`,()=>setTurns(v)))}
              </div>
            </div>
          )}
          {ball?.key==="nest" && (
            <div style={{fontSize:10,color:C.muted,fontStyle:"italic"}}>
              Nest Ball bonus uses the Wild Pokémon Level above. Current: ×{ball.getBonus()}
              {wildLevel>=40?<span> (capped at ×1 for Lv.40+)</span>:null}
            </div>
          )}
        </div>

        {/* Results */}
        <div style={{background:C.card,borderRadius:10,border:`1px solid ${C.border}`,padding:"16px 20px"}}>
          {sectionLabel("Results")}
          {ballBonus==="catch" ? (
            <div style={{padding:"16px",textAlign:"center",background:"rgba(74,183,112,0.15)",
                        border:`1px solid ${C.green}`,borderRadius:8,fontSize:16,fontWeight:"700",color:C.green}}>
              ✓ Master Ball — guaranteed catch
            </div>
          ) : (
            <>
              <div style={{fontSize:11,color:C.muted,fontFamily:"'Courier New',monospace",marginBottom:12,
                          padding:"6px 10px",background:"rgba(0,0,0,0.3)",borderRadius:6,border:`1px solid ${C.border}`}}>
                a = ⌊((3 − 2×{hpPct}%) ÷ 3 × {effectiveRate} × {ballBonus} × {stOpt.mult})⌋ = <strong style={{color:C.text}}>{a}</strong>
              </div>
              <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
                {[
                  ["Catch chance / ball",`${(p*100).toFixed(2)}%`,p>=0.5?"#4caf50":p>=0.2?"#ff9800":"#ef5350"],
                  ["Expected balls",p>0?(expected<1000?expected.toFixed(1):">1000"):"∞",C.text],
                ].map(([label,value,color])=>(
                  <div key={label} style={{flex:1,minWidth:120,padding:"12px 16px",background:"rgba(0,0,0,0.3)",
                                          borderRadius:8,border:`1px solid ${C.border}`,textAlign:"center"}}>
                    <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:"700"}}>{label}</div>
                    <div style={{fontSize:22,fontWeight:"700",color}}>{value}</div>
                  </div>
                ))}
              </div>
              {sectionLabel("Cumulative catch probability")}
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {milestones.map(({label,n})=>(
                  <div key={label} style={{flex:1,minWidth:80,padding:"8px 10px",background:"rgba(0,0,0,0.3)",
                                          borderRadius:8,border:`1px solid ${C.border}`,textAlign:"center"}}>
                    <div style={{fontSize:11,fontWeight:"700",color:"var(--hgss-accent)"}}>{label}</div>
                    <div style={{fontSize:16,fontWeight:"700",color:C.text,marginTop:2}}>{n===Infinity?"∞":`${n}`}</div>
                    <div style={{fontSize:9,color:C.muted,marginTop:1}}>{n===1?"ball":"balls"}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:10,color:C.muted,marginTop:10}}>
                Balls needed for at least that cumulative catch chance.
                {rate<=3&&<span style={{color:"#ef5350"}}> Tip: Ultra Ball + Sleep/Freeze is best for legendaries.</span>}
              </div>
            </>
          )}
        </div>
      </div>
      )}
    </div>
    </div>
  );
}

// ─── HUNT TAB ─────────────────────────────────────────────────────────────────
function HuntTab({ caught, version, isMobile }) {
  const [search,       setSearch]       = useState("");
  const [selected,     setSelected]     = useState(null);
  const [uncaughtOnly, setUncaughtOnly] = useState(false);
  const [wildOnly,     setWildOnly]     = useState(false);

  const ONE_TIME_METHODS = new Set(["Gift","Trade","Fossil","Event","Game Corner"]);

  // All Pokémon that appear in any area, ordered by dex number
  const allNames = useMemo(() =>
    Object.keys(LOCATION_MAP).sort((a, b) => {
      const ja = JOHTO_DEX_ID[a] || 9000 + (NATIONAL_DEX_ID[a] || 9999);
      const jb = JOHTO_DEX_ID[b] || 9000 + (NATIONAL_DEX_ID[b] || 9999);
      return ja - jb;
    }), []
  );

  const filteredNames = useMemo(() => {
    let names = search.trim()
      ? allNames.filter(n => n.toLowerCase().includes(search.toLowerCase().trim()))
      : allNames;
    if (uncaughtOnly) names = names.filter(n => !caught[n]);
    if (wildOnly) names = names.filter(n =>
      (LOCATION_MAP[n] || []).some(loc => !ONE_TIME_METHODS.has(loc.method) && loc.part !== "Pokéwalker")
    );
    return names;
  }, [allNames, search, uncaughtOnly, wildOnly, caught]);

  // Enriched & sorted locations for the selected Pokémon
  const locs = useMemo(() => {
    if (!selected) return [];
    return (LOCATION_MAP[selected] || [])
      .filter(loc => {
        if (version === "hg" && loc.ssOnly) return false;
        if (version === "ss" && loc.hgOnly) return false;
        return true;
      })
      .map(loc => {
        const mHG2      = loc.rate && loc.rate.match(/^HG\s+(\S+)\/SS\s+(\S+)/);
        const splitMatch = !mHG2 && loc.rate && loc.rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
        let pct;
        if (mHG2) {
          pct = parseRatePct(version === "hg" ? mHG2[1] : mHG2[2]);
        } else if (splitMatch) {
          pct = version === "hg" ? parseRatePct(splitMatch[1]) : parseRatePct(splitMatch[2]);
        } else {
          pct = parseRatePct(loc.rate);
        }
        return { ...loc, pct, math: pct ? encMath(pct) : null };
      })
      .sort((a, b) => (b.pct || -1) - (a.pct || -1));
  }, [selected, version]);

  const dexId = selected ? allDexId(selected) : null;
  const noMathMethods = new Set(["Gift","Trade","Fossil","Event","Game Corner"]);

  const caughtCount  = filteredNames.filter(n => caught[n]).length;

  const listPanel = (
    <div style={{ display:"flex", flexDirection:"column", gap:0,
                  background:C.card, borderRadius:8, border:`1px solid ${C.border}`,
                  overflow:"hidden", flexShrink:0,
                  width: isMobile ? "100%" : 210 }}>
      {/* Search */}
      <div style={{ padding:"8px 10px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }}
          placeholder="Search Pokémon…"
          style={{ width:"100%", boxSizing:"border-box", background:"rgba(0,0,0,0.3)",
                   border:`1px solid ${C.border}`, borderRadius:6, color:C.text,
                   fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:16,
                   padding:"5px 8px", outline:"none" }} />
      </div>
      {/* Filters */}
      <div style={{ padding:"6px 10px", borderBottom:`1px solid ${C.border}`, flexShrink:0,
                    display:"flex", gap:5, flexWrap:"wrap" }}>
        {[
          [uncaughtOnly, "Uncaught only", () => { setUncaughtOnly(p=>!p); setSelected(null); }],
          [wildOnly,     "Wild only",     () => { setWildOnly(p=>!p);     setSelected(null); }],
        ].map(([active,label,onClick]) => (
          <button key={label} onClick={onClick} style={{
            padding:"2px 8px", fontSize:10, fontWeight:"600", borderRadius:12, cursor:"pointer",
            border:`1px solid ${active?"var(--hgss-accent)":C.border}`,
            background: active?"var(--hgss-accent)":"rgba(0,0,0,0.3)",
            color: active?"#fff":C.muted,
          }}>{label}</button>
        ))}
        <span style={{ fontSize:10, color:C.muted, alignSelf:"center", marginLeft:"auto" }}>
          {caughtCount}/{filteredNames.length} ✓
        </span>
      </div>
      {/* List */}
      <div style={{ overflowY:"auto", maxHeight: isMobile ? 180 : "calc(100vh - 260px)" }}>
        {filteredNames.length === 0 && (
          <div style={{ padding:16, fontSize:12, color:C.muted, textAlign:"center" }}>No results</div>
        )}
        {filteredNames.map(name => {
          const id = allDexId(name);
          const isSel   = name === selected;
          const isCaught = !!caught[name];
          return (
            <button key={name} onClick={() => setSelected(name)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:8,
                       padding:"6px 10px", cursor:"pointer", textAlign:"left",
                       background: isSel ? "rgba(var(--hgss-accent-rgb,212,98,26),0.15)" : "transparent",
                       border:"none", borderBottom:`1px solid ${C.border}30`,
                       borderLeft: isSel ? "3px solid var(--hgss-accent)"
                                 : isCaught ? `3px solid ${C.green}` : "3px solid transparent",
                       opacity: isCaught && !isSel ? 0.5 : 1 }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                {id && <img src={pokeSpriteUrl(id)} alt={name}
                  style={{ width:28, height:28, imageRendering:"pixelated",
                           filter: isCaught ? "none" : "grayscale(0.7)" }} />}
                {isCaught && <div style={{ position:"absolute", bottom:-2, right:-2,
                  fontSize:8, color:C.green, fontWeight:"700",
                  background:C.card, borderRadius:"50%", lineHeight:1, padding:1 }}>✓</div>}
              </div>
              <span style={{ fontSize:12, fontWeight: isSel?"700":"400",
                             color: isSel ? C.text : isCaught ? C.green : C.muted }}>{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const resultsPanel = (
    <div style={{ flex:1, minWidth:0 }}>
      {!selected ? (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                      height:200, color:C.muted, fontSize:12, textAlign:"center", padding:24,
                      background:C.card, borderRadius:8, border:`1px solid ${C.border}` }}>
          Select a Pokémon to see where to find it and how many encounters to expect.
        </div>
      ) : (
        <>
          {/* Header */}
          {(() => {
            const isCaught = !!caught[selected];
            return (
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12,
                            padding:"10px 14px", background:C.card, borderRadius:8,
                            border:`1px solid ${isCaught?C.green:C.border}` }}>
                {dexId && <img src={pokeSpriteUrl(dexId)} alt={selected}
                  style={{ width:48, height:48, imageRendering:"pixelated" }} />}
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:"700", color:isCaught?C.green:C.text }}>{selected}</div>
                  {dexId && <div style={{ fontSize:10, color:C.muted, fontFamily:"'Courier New',monospace" }}>
                    #{String(dexId).padStart(3,"0")}
                  </div>}
                </div>
                {isCaught && <div style={{ fontSize:13, color:C.green, fontWeight:"700" }}>✓ Caught</div>}
              </div>
            );
          })()}

          {/* Results */}
          {locs.length === 0 ? (
            <div style={{ padding:16, background:C.card, borderRadius:8,
                          border:`1px solid ${C.border}`, fontSize:12, color:C.muted }}>
              Not found as a wild encounter in any tracked area for {version === "hg" ? "HeartGold" : "SoulSilver"}.
              Obtain via evolution, trading, or breeding.
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {locs.map((loc, i) => {
                const accentLeft = loc.math
                  ? (loc.pct >= 30 ? "#5ab0d8" : loc.pct >= 10 ? "#d4b840" : "#9878cc")
                  : C.border;
                return (
                  <div key={i} style={{ padding:"10px 14px", background:C.card,
                                        borderRadius:8, border:`1px solid ${C.border}`,
                                        borderLeft:`4px solid ${accentLeft}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:"700", color:C.text }}>{loc.areaName}</div>
                        <div style={{ fontSize:10, color:C.muted, marginTop:1 }}>{loc.part}</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <RateDisplay rate={loc.rate} isMobile={isMobile} version={version} />
                      </div>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                                  marginTop:6, flexWrap:"wrap", gap:4 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        {METHOD_SPRITE_URL[loc.method]
                          ? <img src={METHOD_SPRITE_URL[loc.method]} alt="" style={{ width:14, height:14, imageRendering:"pixelated" }} />
                          : null}
                        <span style={{ fontSize:11, color:C.muted }}>
                          {loc.method}{loc.levels ? ` · Lv.${loc.levels}` : ""}
                        </span>
                        {loc.hgOnly && <Tag color={C.hgGold}>HG</Tag>}
                        {loc.ssOnly && <Tag color={C.ssSilver}>SS</Tag>}
                      </div>
                      {loc.math && (
                        <div style={{ fontSize:11, color:C.muted, textAlign:"right" }}>
                          <span style={{ color:C.text, fontWeight:"600" }}>~{loc.math.avg}</span> avg ·{" "}
                          <span style={{ color:C.text, fontWeight:"600" }}>≤{loc.math.conf95}</span> for 95%
                        </div>
                      )}
                      {!loc.math && !noMathMethods.has(loc.method) && loc.rate && (
                        <div style={{ fontSize:11, color:C.muted }}>—</div>
                      )}
                      {noMathMethods.has(loc.method) && (
                        <div style={{ fontSize:11, color:C.muted, fontStyle:"italic" }}>one-time obtain</div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div style={{ fontSize:10, color:C.muted, padding:"4px 2px" }}>
                Sorted by highest encounter rate · Hover rate badge for per-encounter odds
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:16,
                    padding:"16px", maxWidth:960, margin:"0 auto" }}>
        {listPanel}
        {resultsPanel}
      </div>
    </div>
  );
}

// ─── COMPLETION TAB ───────────────────────────────────────────────────────────
function CompletionTab({ caught, checklist, toggleChecklist, badges, version, isMobile }) {
  const nonEventTotal   = DEX.filter(p => !p.event).length;
  const dexCaughtCount  = useMemo(() => DEX.filter(p => !p.event && caught[p.name]).length, [caught]);
  const johtoBadgeCount = JOHTO_BADGES.filter(b => badges[b.id]).length;
  const kantoBadgeCount = KANTO_BADGES.filter(b => badges[b.id]).length;

  const autoState = {
    "all-johto-badges": johtoBadgeCount === 8,
    "all-kanto-badges": kantoBadgeCount === 8,
    "johto-dex":        dexCaughtCount >= nonEventTotal,
    "caught-raikou":    !!caught["Raikou"],   "caught-entei":    !!caught["Entei"],
    "caught-suicune":   !!caught["Suicune"],  "caught-lugia":    !!caught["Lugia"],
    "caught-hooh":      !!caught["Ho-Oh"],    "caught-articuno": !!caught["Articuno"],
    "caught-zapdos":    !!caught["Zapdos"],   "caught-moltres":  !!caught["Moltres"],
    "caught-mewtwo":    !!caught["Mewtwo"],   "caught-latias":   !!caught["Latias"],
    "caught-latios":    !!caught["Latios"],   "caught-mew":      !!caught["Mew"],
    "caught-celebi":    !!caught["Celebi"],
  };

  let totalItems = 0, doneItems = 0;
  for (const sec of COMPLETION_SECTIONS) {
    for (const item of sec.items) {
      if (item.disabled || item.optional) continue;
      totalItems++;
      if (item.auto ? autoState[item.auto] : !!checklist[item.id]) doneItems++;
    }
  }

  const overallPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"16px" }}>

        {/* Overall progress */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10,
                      padding:"14px 18px", marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}>
            <span style={{ fontSize:13, fontWeight:"700", color:C.text }}>Overall Completion</span>
            <span style={{ fontSize:12, color: doneItems===totalItems ? C.green : C.muted }}>
              <span style={{ fontWeight:"700", color: doneItems===totalItems ? C.green : C.text }}>{doneItems}</span>
              /{totalItems} · {overallPct}%
            </span>
          </div>
          <div style={{ height:7, background:"rgba(0,0,0,0.3)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${overallPct}%`,
                          background: doneItems===totalItems ? C.green : "var(--hgss-accent)",
                          borderRadius:99, transition:"width 0.3s" }} />
          </div>
          {doneItems===totalItems && totalItems>0 && (
            <div style={{ marginTop:8, fontSize:11, color:C.green, fontWeight:"600", textAlign:"center" }}>
              ✓ 100% complete!
            </div>
          )}
        </div>

        {/* Sections */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {COMPLETION_SECTIONS.map(sec => {
            const countable = sec.items.filter(i => !i.disabled && !i.optional);
            const secDone   = countable.filter(i => i.auto ? autoState[i.auto] : !!checklist[i.id]).length;
            const allDone   = secDone === countable.length && countable.length > 0;

            return (
              <div key={sec.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
                <div style={{ padding:"9px 14px", background:"rgba(0,0,0,0.15)",
                              borderBottom:`1px solid ${C.border}`,
                              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:12, fontWeight:"700", color:sec.color }}>{sec.title}</span>
                  <span style={{ fontSize:11, color: allDone ? C.green : C.muted }}>
                    {secDone}/{countable.length}
                  </span>
                </div>
                <div style={{ padding:"4px 0" }}>
                  {sec.items.map(item => {
                    const isDone     = !item.disabled && (item.auto ? autoState[item.auto] : !!checklist[item.id]);
                    const isAuto     = !!item.auto;
                    const isDisabled = !!item.disabled;
                    const isOptional = !!item.optional;
                    const clickable  = !isAuto && !isDisabled;

                    return (
                      <div key={item.id}
                        onClick={clickable ? () => toggleChecklist(item.id) : undefined}
                        style={{ display:"flex", alignItems:"flex-start", gap:10,
                                 padding:"8px 14px", cursor: clickable ? "pointer" : "default",
                                 opacity: isDisabled ? 0.4 : 1 }}
                        onMouseEnter={clickable ? e => e.currentTarget.style.background="rgba(255,255,255,0.04)" : undefined}
                        onMouseLeave={clickable ? e => e.currentTarget.style.background="transparent" : undefined}
                      >
                        {/* Checkbox */}
                        <div style={{ width:17, height:17, borderRadius:4, flexShrink:0, marginTop:2,
                                      border: isDone ? `2px solid ${C.green}` : `2px solid ${isDisabled ? C.border : C.muted}`,
                                      background: isDone ? C.green : "transparent",
                                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {isDone && <span style={{ color:"#0d0a07", fontSize:10, fontWeight:"900", lineHeight:1 }}>✓</span>}
                        </div>

                        {/* Text */}
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, fontWeight:"600",
                                        color: isDone ? C.muted : C.text,
                                        textDecoration: isDone ? "line-through" : "none",
                                        display:"flex", alignItems:"center", flexWrap:"wrap", gap:6 }}>
                            {item.label}
                            {item.reward && (
                              <span style={{ fontSize:10, fontWeight:"700", color:C.gold,
                                             background:"rgba(200,150,10,0.12)",
                                             border:"1px solid rgba(200,150,10,0.3)",
                                             padding:"1px 6px", borderRadius:4, whiteSpace:"nowrap" }}>
                                → {item.reward}
                              </span>
                            )}
                            {isAuto && !isDisabled && (
                              <span style={{ fontSize:9, color:C.muted, fontStyle:"italic", fontWeight:"400" }}>auto</span>
                            )}
                            {isOptional && (
                              <span style={{ fontSize:9, color:C.muted, fontStyle:"italic", fontWeight:"400" }}>optional</span>
                            )}
                          </div>
                          <div style={{ fontSize:10, color:C.muted, marginTop:2, lineHeight:1.5 }}>
                            {item.note}
                            {item.auto === "johto-dex"        && <span style={{ marginLeft:5, fontWeight:"600", color: dexCaughtCount >= nonEventTotal ? C.green : C.gold }}>({dexCaughtCount}/{nonEventTotal})</span>}
                            {item.auto === "all-johto-badges" && <span style={{ marginLeft:5, fontWeight:"600", color: johtoBadgeCount===8 ? C.green : C.gold }}>({johtoBadgeCount}/8)</span>}
                            {item.auto === "all-kanto-badges" && <span style={{ marginLeft:5, fontWeight:"600", color: kantoBadgeCount===8 ? C.green : C.gold }}>({kantoBadgeCount}/8)</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:12, fontSize:10, color:C.muted, textAlign:"center", lineHeight:1.7 }}>
          Items marked <em>auto</em> update automatically from your Pokédex data.
          Disabled items (★★★ and ★★★★) are out of scope for this tracker.
        </div>
      </div>
    </div>
  );
}

// ─── NATIONAL POKÉDEX PANEL ──────────────────────────────────────────────────
function NationalDexPanel({ caught, setDexSelected, version }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const caughtCount = NATIONAL_DEX.filter(p => caught[p.name]).length;
  const isOtherVer = p => (version === "hg" && p.ssOnly) || (version === "ss" && p.hgOnly);

  return (
    <div style={{ marginTop:20, border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>
      <div onClick={() => setCollapsed(c => !c)}
        style={{ padding:"10px 14px", background:C.card, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", userSelect:"none" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontWeight:"700", fontSize:13, color:C.text }}>National Pokédex (Post-Game)</span>
          <span style={{ fontSize:11, color:C.muted }}>{caughtCount} / {NATIONAL_DEX.length} — not counted toward completion</span>
        </div>
        <span style={{ color:C.muted, fontSize:11 }}>{collapsed ? "▶" : "▼"}</span>
      </div>
      {!collapsed && (
        <div style={{ padding:"10px 12px", background:"rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize:10, color:C.muted, marginBottom:8, lineHeight:1.5 }}>
            Gen III/IV Pokémon obtainable via the Pokéwalker or post-game events. Pokémon marked PW ONLY are exclusively available through the Pokéwalker.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(72px,1fr))", gap:5 }}>
            {NATIONAL_DEX.map(p => {
              const isCaught = !!caught[p.name];
              const isDimmed = isOtherVer(p);
              return (
                <div key={p.id}
                  onClick={() => { if (!isDimmed) setDexSelected(p.name); }}
                  style={{
                    background: isCaught ? "rgba(74,175,116,0.10)" : C.card,
                    border:`1px solid ${isCaught ? C.green : p.ssOnly ? C.ssSilver : p.hgOnly ? C.hgGold : C.border}`,
                    borderRadius:7, padding:"6px 4px 5px", cursor:isDimmed?"default":"pointer",
                    textAlign:"center", opacity:isDimmed?0.3:1, position:"relative", transition:"all 0.1s",
                  }}>
                  {isCaught && <div style={{ position:"absolute", top:3, left:4, fontSize:8, color:C.green, fontWeight:"700" }}>✓</div>}
                  {p.hgOnly && <div style={{ position:"absolute", top:3, right:3, fontSize:7, color:C.hgGold, fontWeight:"600" }}>HG</div>}
                  {p.ssOnly && <div style={{ position:"absolute", top:3, right:3, fontSize:7, color:C.ssSilver, fontWeight:"600" }}>SS</div>}
                  <img src={pokeSpriteUrl(p.id)} alt={p.name}
                    style={{ width:36, height:36, imageRendering:"pixelated", display:"block", margin:"0 auto",
                             opacity:isCaught?1:0.7, filter:isCaught?"none":"brightness(0)" }} />
                  <div style={{ fontSize:8, color:C.muted, fontFamily:"'Courier New',monospace" }}>#{String(p.id).padStart(3,"0")}</div>
                  <div style={{ fontSize:9, color:isCaught?C.green:C.text, fontWeight:isCaught?"600":"400", lineHeight:1.2, wordBreak:"break-word" }}>{p.name}</div>
                  {WALKER_ONLY_POKEMON.has(p.name) && <div style={{ fontSize:7, fontWeight:"700", color:"#9060d0", marginTop:1, letterSpacing:"0.02em" }}>PW ONLY</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── POKÉDEX TAB ──────────────────────────────────────────────────────────────
function DexTab({ caught, toggleCaught, dexFilter, setDexFilter, dexSelected, setDexSelected, version, isMobile }) {
  const caughtCount = DEX.filter(p => caught[p.name]).length;
  const filters = [["all","All"],["caught","Caught"],["missing","Missing"],["hg","HG Only"],["ss","SS Only"],["walker","PW Only"],["event","Event"],["noball","No Poké Ball"]];
  const isOtherVersionDex = (p) => (version === "hg" && p.ssOnly) || (version === "ss" && p.hgOnly);
  const [dexSearch, setDexSearch] = React.useState("");

  const filtered = DEX.filter(p => {
    if (dexFilter === "caught")  return caught[p.name];
    if (dexFilter === "missing") return !caught[p.name] && !isOtherVersionDex(p);
    if (dexFilter === "hg")      return p.hgOnly;
    if (dexFilter === "ss")      return p.ssOnly;
    if (dexFilter === "walker")  return WALKER_ONLY_POKEMON.has(p.name);
    if (dexFilter === "event")   return p.event;
    if (dexFilter === "noball")  return !!CATCH_CONSTRAINT_MAP[p.name];
    return true;
  });

  const searchTerm = dexSearch.trim().toLowerCase();
  const displayed = searchTerm ? filtered.filter(p => p.name.toLowerCase().includes(searchTerm)) : filtered;

  const selected = dexSelected ? DEX.find(p => p.name === dexSelected) : null;
  const locs = dexSelected ? (LOCATION_MAP[dexSelected] || []) : [];

  return (
    <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
      {/* Filter + stats */}
      <div style={{ padding:"10px 18px", borderBottom:`1px solid ${C.border}`, background:C.card, flexShrink:0 }}>
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {filters.map(([f,label]) => (
              <button key={f} onClick={() => setDexFilter(f)} style={{
                padding:"4px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:11, cursor:"pointer",
                background: dexFilter===f ? "var(--hgss-accent)" : "rgba(0,0,0,0.25)",
                color: dexFilter===f ? "#fff" : C.muted,
                border:`1px solid ${dexFilter===f ? "var(--hgss-accent)" : C.border}`, borderRadius:20,
                fontWeight: dexFilter===f ? "600" : "400",
                transition:"all 0.12s",
              }}>{label}</button>
            ))}
          </div>
          <div style={{ marginLeft:"auto", fontSize:12, color:C.muted, display:"flex", alignItems:"center", gap:8 }}>
            <TickNumber value={caughtCount} color={C.green} style={{ fontWeight:"600" }} /><span>/ {DEX.length}</span>
            <div style={{ width:80, height:5, background:"rgba(0,0,0,0.3)", borderRadius:99, overflow:"hidden" }}>
              <div className="hgss-fill-bar" style={{ height:"100%", width:`${pct(caughtCount,DEX.length)}%`, background:C.green, borderRadius:99 }} />
            </div>
            <TickNumber value={`${pct(caughtCount,DEX.length)}%`} color={C.text} style={{ fontWeight:"600" }} />
          </div>
        </div>
        {/* Search input */}
        <div style={{ marginTop:8, position:"relative" }}>
          <input value={dexSearch} onChange={e => setDexSearch(e.target.value)}
            placeholder="Search Pokémon…"
            style={{ width:"100%", background:"rgba(0,0,0,0.25)", border:`1px solid ${C.border}`, color:C.text,
                     padding:"7px 32px 7px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:16,
                     borderRadius:6, boxSizing:"border-box", outline:"none" }} />
          {dexSearch
            ? <button onClick={() => setDexSearch("")} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:16, padding:"0 2px", lineHeight:1, fontFamily:"sans-serif" }}>×</button>
            : <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:C.muted, pointerEvents:"none" }}>🔍</span>
          }
        </div>
        {searchTerm && <div style={{ marginTop:5, fontSize:11, color:C.muted }}>{displayed.length} result{displayed.length !== 1 ? "s" : ""}</div>}
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Grid */}
        <div style={{ flex:1, overflowY:"auto", padding:"12px 16px", paddingBottom: isMobile && selected ? 220 : 12 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(86px,1fr))", gap:6 }}>
            {displayed.map(p => {
              const isCaught = !!caught[p.name];
              const isSel = dexSelected === p.name;
              const isDimmed = isOtherVersionDex(p);
              return (
                <div key={p.id} onClick={() => { if (!isDimmed) setDexSelected(p.name); }}
                  style={{
                    background: isCaught ? "rgba(74,175,116,0.18)" : isSel ? "rgba(0,0,0,0.15)" : C.card,
                    border:`1px solid ${isSel ? "var(--hgss-accent)" : isCaught ? C.green : p.event ? "#a87acc" : p.ssOnly ? C.ssSilver : p.hgOnly ? C.hgGold : TRADE_EVO_SET.has(p.name) ? "#c89832" : EVO_ONLY_SET.has(p.name) ? "#5a9fd4" : C.border}`,
                    borderRadius:8, padding:"8px 5px 6px", cursor: isDimmed ? "default" : "pointer", textAlign:"center",
                    transition:"all 0.12s", position:"relative", opacity: isDimmed ? 0.3 : isCaught ? 1 : 0.55,
                    boxShadow: isSel ? "0 0 0 2px rgba(var(--hgss-accent-rgb,212,98,26),0.2)" : "none",
                  }}
                  onMouseEnter={e => { if (isDimmed) return; e.currentTarget.style.borderColor = isCaught ? C.green : "var(--hgss-accent)"; e.currentTarget.style.background = isCaught ? "rgba(74,175,116,0.25)" : "rgba(0,0,0,0.2)"; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { if (isDimmed) return; e.currentTarget.style.borderColor = isSel ? "var(--hgss-accent)" : isCaught ? C.green : p.event ? "#a87acc" : p.ssOnly ? C.ssSilver : p.hgOnly ? C.hgGold : TRADE_EVO_SET.has(p.name) ? "#c89832" : EVO_ONLY_SET.has(p.name) ? "#5a9fd4" : C.border; e.currentTarget.style.background = isCaught ? "rgba(74,175,116,0.18)" : isSel ? "rgba(0,0,0,0.15)" : C.card; e.currentTarget.style.opacity = isDimmed ? "0.3" : isCaught ? "1" : "0.55"; }}
                >
                  {isCaught && <div style={{ position:"absolute", top:4, left:5, fontSize:9, color:C.green, fontWeight:"700" }}>✓</div>}
                  {p.hgOnly && <div style={{ position:"absolute", top:4, right:4, fontSize:8, color:C.hgGold, fontWeight:"600" }}>HG</div>}
                  {p.ssOnly && <div style={{ position:"absolute", top:4, right:4, fontSize:8, color:C.ssSilver, fontWeight:"600" }}>SS</div>}
                  {p.event  && <div style={{ position:"absolute", top:4, right:4, fontSize:8, color:"#a87acc", fontWeight:"600" }}>✦</div>}
                  <img src={pokeSpriteUrl(p.id)} alt={p.name} style={{ width:48, height:48, imageRendering:"pixelated", display:"block", margin:"0 auto", filter: isCaught ? "none" : "grayscale(1)" }} />
                  <div style={{ fontSize:9, color:C.muted, marginBottom:1, fontFamily:"'Courier New',monospace" }}>#{String(p.johtoId).padStart(3,"0")}</div>
                  <div style={{ fontSize:10, color: isCaught ? C.green : C.text, fontWeight:isCaught?"600":"400", lineHeight:1.3, wordBreak:"break-word" }}>{p.name}</div>
                  {(() => { const cs = CONSTRAINT_STYLE[CATCH_CONSTRAINT_MAP[p.name]]; return cs ? <div style={{ fontSize:8, fontWeight:"700", color:cs.color, marginTop:1, letterSpacing:"0.02em" }}>{cs.label.toUpperCase()}</div> : null; })()}
                  {TRADE_EVO_SET.has(p.name) && <div style={{ fontSize:8, fontWeight:"700", color:"#c89832", marginTop:1, letterSpacing:"0.02em" }}>TRADE EVO</div>}
                  {EVO_ONLY_SET.has(p.name) && <div style={{ fontSize:8, fontWeight:"700", color:"#5a9fd4", marginTop:1, letterSpacing:"0.02em" }}>EVO ONLY</div>}
                  {WALKER_ONLY_POKEMON.has(p.name) && <div style={{ fontSize:8, fontWeight:"700", color:"#9060d0", marginTop:1, letterSpacing:"0.02em" }}>PW ONLY</div>}
                </div>
              );
            })}
          </div>
          {displayed.length === 0 && <div style={{ textAlign:"center", padding:40, color:C.muted, fontSize:12 }}>{searchTerm ? `No Pokémon match "${dexSearch}".` : "No Pokémon match this filter."}</div>}
          <LivingDexPanel caught={caught} />
          <NationalDexPanel caught={caught} setDexSelected={setDexSelected} version={version} />
        </div>

        {/* Detail panel — desktop only */}
        {!isMobile && (
          <div style={{ width:220, flexShrink:0, borderLeft:`1px solid ${C.border}`, background:C.card, overflowY:"auto", padding:16 }}>
            {!selected ? (
              <div style={{ color:C.muted, fontSize:12, textAlign:"center", marginTop:48, lineHeight:1.9, padding:"0 12px" }}>
                Click any Pokémon to see its details.
              </div>
            ) : (
              <DexDetail selected={selected} caught={caught} locs={locs} toggleCaught={toggleCaught} />
            )}
          </div>
        )}
      </div>

      {/* Bottom sheet — mobile only */}
      {isMobile && selected && (() => {
        const isCaught = !!caught[selected.name];
        const types = POKEMON_TYPES[selected.name];
        return (
          <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200,
                        background:C.card, borderTop:`2px solid var(--hgss-accent)`,
                        boxShadow:"0 -6px 24px rgba(0,0,0,0.6)",
                        display:"flex", flexDirection:"column", maxHeight:"55vh" }}>

            {/* Identity row — always visible */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px 8px", flexShrink:0 }}>
              <img src={pokeSpriteUrl(selected.id)} alt={selected.name}
                style={{ width:40, height:40, imageRendering:"pixelated", flexShrink:0,
                         filter: isCaught ? "none" : "grayscale(1)", opacity: isCaught ? 1 : 0.6 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"'Courier New',monospace", lineHeight:1 }}>#{String(selected.johtoId).padStart(3,"0")}</div>
                <div style={{ fontSize:15, fontWeight:"700", color: isCaught ? C.green : C.text, lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{selected.name}</div>
                {types && (
                  <div style={{ display:"flex", gap:4, marginTop:3, flexWrap:"wrap" }}>
                    {types.map(t => <TypeBadge key={t} type={t} />)}
                  </div>
                )}
              </div>
              <div style={{ display:"flex", gap:6, flexShrink:0, alignItems:"center" }}>
                <button onClick={() => toggleCaught(selected.name)}
                  style={{ fontSize:10, fontWeight:"700", cursor:"pointer", padding:"5px 10px",
                           background: isCaught ? "rgba(74,175,116,0.15)" : "rgba(212,98,26,0.9)",
                           color: isCaught ? C.green : "#fff",
                           border:`1px solid ${isCaught ? C.green : "rgba(212,98,26,0.5)"}`,
                           borderRadius:5, fontFamily:"'DM Sans',system-ui,sans-serif", whiteSpace:"nowrap" }}>
                  {isCaught ? "✓ Caught" : "Mark Caught"}
                </button>
                <button onClick={() => setDexSelected(null)}
                  style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted,
                           borderRadius:6, cursor:"pointer", padding:"4px 10px", fontSize:14 }}>✕</button>
              </div>
            </div>

            {/* Locations list */}
            <div style={{ overflowY:"auto", padding:"12px 16px 16px", borderTop:`1px solid ${C.border}` }}>
              {locs.length === 0 ? (
                <div style={{ fontSize:11, color:C.muted, lineHeight:1.8 }}>
                  Not found as a wild encounter or gift in any tracked area.<br/>
                  Obtain via <span style={{ color:C.text, fontWeight:"500" }}>evolution, trading, or breeding</span>.
                </div>
              ) : locs.map((l, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline",
                                      padding:"6px 0", borderBottom:`1px solid ${C.border}30` }}>
                  <span style={{ fontSize:12, color:C.text, fontWeight:"600" }}>{l.areaName}</span>
                  <span style={{ fontSize:10, color:C.muted, marginLeft:8, whiteSpace:"nowrap" }}>{l.method} · Lv.{l.levels}{l.rate ? ` · ${l.rate}` : ""}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function EvoNode({ name, isCurrent, caught }) {
  const id = allDexId(name);
  const isCaught = !!caught[name];
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                  padding:"5px 7px", borderRadius:7,
                  background: isCurrent ? "rgba(212,98,26,0.15)" : "rgba(0,0,0,0.18)",
                  border: `1px solid ${isCurrent ? "rgba(212,98,26,0.5)" : C.border}`,
                  minWidth:52 }}>
      {id && <img src={pokeSpriteUrl(id)} alt={name}
        style={{ width:36, height:36, imageRendering:"pixelated",
                 opacity: isCaught ? 1 : 0.55,
                 filter: isCaught ? "none" : "brightness(0)" }} />}
      <span style={{ fontSize:9, fontWeight:"600",
                     color: isCurrent ? C.accent : (isCaught ? C.green : C.muted),
                     textAlign:"center", lineHeight:1.2, maxWidth:56, wordBreak:"break-word" }}>
        {name}
      </span>
      {isCaught && <span style={{ fontSize:8, color:C.green, lineHeight:1 }}>✓</span>}
    </div>
  );
}

function EvoArrow() {
  return <span style={{ fontSize:14, color:C.border, flexShrink:0, alignSelf:"center" }}>›</span>;
}

function EvoChainDisplay({ name, caught }) {
  const chain = EVO_MAP[name];
  if (!chain) return null;
  // Single-stage Pokémon — no chain to show
  if (Array.isArray(chain) && chain.length === 1) return null;

  if (Array.isArray(chain)) {
    return (
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:8, textTransform:"uppercase" }}>Evolution</div>
        <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"nowrap", overflowX:"auto", paddingBottom:4 }}>
          {chain.map((n, i) => (
            <React.Fragment key={n}>
              {i > 0 && <EvoArrow />}
              <EvoNode name={n} isCurrent={n === name} caught={caught} />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Branching chain (Eevee-style)
  const { pre, post } = chain;
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:8, textTransform:"uppercase" }}>Evolution</div>
      <div style={{ display:"flex", alignItems:"flex-start", gap:5 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          {pre.map((n, i) => (
            <React.Fragment key={n}>
              {i > 0 && <EvoArrow />}
              <EvoNode name={n} isCurrent={n === name} caught={caught} />
            </React.Fragment>
          ))}
        </div>
        <EvoArrow />
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          {post.map(branch => (
            <div key={branch[0]} style={{ display:"flex", alignItems:"center", gap:5 }}>
              {branch.map((n, i) => (
                <React.Fragment key={n}>
                  {i > 0 && <EvoArrow />}
                  <EvoNode name={n} isCurrent={n === name} caught={caught} />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  return (
    <span style={{ fontSize:10, fontWeight:"700", color:"#fff", background:TYPE_COLORS[type]||"#888",
                   padding:"2px 7px", borderRadius:4, letterSpacing:0.3 }}>{type}</span>
  );
}
function DexTypeInfo({ name }) {
  const types = POKEMON_TYPES[name];
  if (!types) return null;
  const chart = getDefensiveChart(types);
  const immune = TYPES_17.filter(t => chart[t] === 0);
  const quart  = TYPES_17.filter(t => chart[t] === 0.25);
  const half   = TYPES_17.filter(t => chart[t] === 0.5);
  const double = TYPES_17.filter(t => chart[t] === 2);
  const quad   = TYPES_17.filter(t => chart[t] === 4);
  const rows = [
    { label:"4×", types:quad,   color:"#e04040" },
    { label:"2×", types:double, color:"#d06020" },
    { label:"½×", types:half,   color:"#4a9f68" },
    { label:"¼×", types:quart,  color:"#2a7f50" },
    { label:"0×", types:immune, color:"#888" },
  ].filter(r => r.types.length > 0);
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:8 }}>
        {types.map(t => <TypeBadge key={t} type={t} />)}
      </div>
      {rows.length > 0 && (
        <>
          <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:6, textTransform:"uppercase" }}>Type matchups</div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {rows.map(r => (
              <div key={r.label} style={{ display:"flex", alignItems:"flex-start", gap:6 }}>
                <span style={{ fontSize:9, fontWeight:"700", color:r.color, minWidth:18, textAlign:"right", paddingTop:2, flexShrink:0 }}>{r.label}</span>
                <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
                  {r.types.map(t => <TypeBadge key={t} type={t} />)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function DexDetail({ selected, caught, locs, toggleCaught, compact }) {
  const isCaught = !!caught[selected.name];
  return (
    <>
      {!compact && (
        <div style={{ marginBottom:14 }}>
          <img src={pokeSpriteUrl(selected.id)} alt={selected.name} style={{ width:80, height:80, imageRendering:"pixelated", display:"block", margin:"0 auto 8px" }} />
          <div style={{ fontSize:10, color:C.muted, marginBottom:2, fontFamily:"'Courier New',monospace" }}>#{String(selected.johtoId).padStart(3,"0")}</div>
          <div style={{ fontSize:17, fontWeight:"700", color: isCaught ? C.green : C.text }}>{selected.name}</div>
          {selected.hgOnly && <div style={{ fontSize:10, color:C.hgGold, marginTop:4, fontWeight:"500" }}>HeartGold exclusive</div>}
          {selected.ssOnly && <div style={{ fontSize:10, color:C.ssSilver, marginTop:4, fontWeight:"500" }}>SoulSilver exclusive</div>}
          {selected.event  && <div style={{ fontSize:10, color:"#a87acc", marginTop:4, fontWeight:"500" }}>Event — not in-game obtainable</div>}
          {(() => { const cs = CONSTRAINT_STYLE[CATCH_CONSTRAINT_MAP[selected.name]]; return cs ? <div style={{ fontSize:10, color:cs.color, marginTop:4, fontWeight:"500" }}>⚠ {cs.desc}</div> : null; })()}
          {toggleCaught && (
            <button onClick={() => toggleCaught(selected.name)}
              style={{ marginTop:10, width:"100%", padding:"7px 0", fontSize:12, fontWeight:"700", cursor:"pointer",
                       background: isCaught ? "rgba(74,175,116,0.15)" : "rgba(212,98,26,0.9)",
                       color: isCaught ? C.green : "#fff",
                       border: `1px solid ${isCaught ? C.green : "rgba(212,98,26,0.5)"}`,
                       borderRadius:6, fontFamily:"'DM Sans',system-ui,sans-serif", transition:"all 0.12s" }}>
              {isCaught ? "✓ Caught" : "Mark Caught"}
            </button>
          )}
        </div>
      )}
      {!compact && <EvoChainDisplay name={selected.name} caught={caught} />}
      {!compact && (() => {
        const finalForm = DT_FINAL_FORM[selected.name] || selected.name;
        const moves = LEARNSETS[selected.name] || LEARNSETS[finalForm];
        const tmTips = DT_TM_TIPS[finalForm] || DT_TM_TIPS[selected.name] || [];
        const delay = EVO_DELAY[selected.name];
        if ((!moves || moves.length === 0) && tmTips.length === 0 && !delay) return null;
        const MoveRow = ({ move, level, kind, src, oneTime }) => {
          const isGood = MOVE_TIERS.good.has(move);
          const isSkip = MOVE_TIERS.skip.has(move);
          const type   = MOVE_TYPES[move];
          const cat    = MOVE_CATEGORY[move];
          const stat   = MOVE_STATS[move];
          const nameColor = kind === "tm" ? (isGood ? C.green : C.gold)
                          : isGood ? C.green : isSkip ? C.muted : C.text;
          return (
            <div style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 0", borderBottom:`1px solid rgba(255,255,255,0.04)` }}>
              <span style={{ fontSize:9, fontWeight:"700", color: kind === "tm" ? C.gold : C.muted, fontFamily:"'JetBrains Mono',monospace", minWidth:kind==="tm"?24:20, textAlign:"right", flexShrink:0 }}>
                {kind === "tm" ? "TM" : level}
              </span>
              <span style={{ fontSize:11, fontWeight: isGood ? "600" : "400", color: nameColor, flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {move}
              </span>
              {type && (
                <span style={{ fontSize:7, color:"#fff", background:TYPE_COLORS[type]||"#888", padding:"1px 4px", borderRadius:3, fontWeight:"700", letterSpacing:0.2, flexShrink:0 }}>
                  {type}
                </span>
              )}
              {cat && stat?.bp && (
                <span style={{ fontSize:9, color:C.muted, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>
                  {cat} {stat.bp}
                </span>
              )}
              {oneTime && <span style={{ fontSize:8, color:"#e8a020", flexShrink:0 }}>1×</span>}
            </div>
          );
        };
        return (
          <div style={{ marginBottom:14 }}>
            {moves && moves.length > 0 && (
              <>
                <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:6, textTransform:"uppercase" }}>Level-up Moves</div>
                <div style={{ marginBottom: (tmTips.length > 0 || delay) ? 10 : 0 }}>
                  {[...moves].sort((a,b) => a.lv - b.lv).map((m, i) => (
                    <MoveRow key={i} move={m.move} level={m.lv} kind="lv" />
                  ))}
                </div>
              </>
            )}
            {tmTips.length > 0 && (
              <>
                <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:6, marginTop: moves?.length ? 4 : 0, textTransform:"uppercase" }}>TM / Tutor</div>
                <div style={{ marginBottom: delay ? 10 : 0 }}>
                  {tmTips.map((m, i) => (
                    <div key={i} style={{ marginBottom:6 }}>
                      <MoveRow move={m.move} kind="tm" oneTime={m.oneTime} />
                      {m.src && (
                        <div style={{ fontSize:9, color:C.muted, lineHeight:1.4, paddingLeft:28, marginTop:1, fontStyle:"italic" }}>
                          {m.src}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {delay && (
              <div style={{ fontSize:10, color:"#c8960a", lineHeight:1.5, padding:"5px 8px", background:"rgba(200,150,10,0.08)", borderRadius:5, borderLeft:"2px solid #c8960a" }}>
                ⏳ {delay}
              </div>
            )}
          </div>
        );
      })()}
      <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:6, textTransform:"uppercase" }}>Where to find</div>
      {locs.length === 0 ? (
        <div style={{ fontSize:11, color:C.muted, lineHeight:1.8 }}>
          Not found as a wild encounter or gift in any tracked area.<br/>
          Obtain via <span style={{ color:C.text, fontWeight:"500" }}>evolution, trading, or breeding</span>.
        </div>
      ) : compact ? (
        locs.map((l, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"5px 0", borderBottom:`1px solid ${C.border}30` }}>
            <span style={{ fontSize:12, color:C.text, fontWeight:"600" }}>{l.areaName}</span>
            <span style={{ fontSize:10, color:C.muted, marginLeft:8, whiteSpace:"nowrap" }}>{l.method} · Lv.{l.levels}{l.rate ? ` · ${l.rate}` : ""}</span>
          </div>
        ))
      ) : (
        locs.map((l, i) => (
          <div key={i} style={{ marginBottom:8, padding:"8px 10px", background:"rgba(0,0,0,0.2)", borderRadius:6, borderLeft:`3px solid ${C.border}` }}>
            <div style={{ fontSize:11, color:C.text, fontWeight:"600", marginBottom:1 }}>{l.areaName}</div>
            <div style={{ fontSize:10, color:C.muted }}>{l.part}</div>
            <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>
              {l.method} · Lv.{l.levels}{l.rate ? ` · ${l.rate}` : ""}
            </div>
          </div>
        ))
      )}
    </>
  );
}

// ─── FLOOR-AWARE HELPERS ──────────────────────────────────────────────────────
// Areas with a `floors` array organise data per floor; flat areas use top-level arrays.
const flattenPokemon  = a => a.floors ? a.floors.flatMap(f => f.pokemon  || []) : (a.pokemon  || []);
const flattenItems    = a => a.floors ? a.floors.flatMap(f => f.items    || []) : (a.items    || []);
// Returns true/false for items held by a traded Pokémon (null if not a held item).
function heldByDone(it, areaId, trades) {
  if (!it.heldBy) return null;
  const names = Array.isArray(it.heldBy) ? it.heldBy : [it.heldBy];
  return names.some(n => !!(trades && trades[`${areaId}|trade|${n}`]));
}
const flattenTrainers = a => a.floors ? a.floors.flatMap(f => f.trainers || []) : (a.trainers || []);
// All items are keyed by index to handle duplicate names (e.g. two Antidotes in Viridian Forest).
const floorItemKey = (aId, label, idx) => `${aId}|${label}|${idx}`;
const flatItemKey  = (aId, idx) => `${aId}|${idx}`;
function countItemsDone(area, areaId, itemsState) {
  if (!area) return 0;
  if (area.floors) return area.floors.reduce((n, f) =>
    n + (f.items || []).filter((_, i) => itemsState[floorItemKey(areaId, f.label, i)]).length, 0);
  return (area.items || []).filter((_, i) => itemsState[flatItemKey(areaId, i)]).length;
}

// ─── ROAMING POKÉMON CARD ─────────────────────────────────────────────────────
function RoamingCard({ roaming, setRoaming, version, badges }) {
  const johtoBadgeCount = JOHTO_BADGES.filter(b => badges[b.id]).length;
  const totalBadgeCount = BADGES.filter(b => badges[b.id]).length;
  const visible = ROAMING_POKEMON.filter(r => {
    if (r.hgOnly && version !== "hg") return false;
    if (r.ssOnly && version !== "ss") return false;
    if (r.minJohtoBadges && johtoBadgeCount < r.minJohtoBadges) return false;
    if (r.minTotalBadges && totalBadgeCount < r.minTotalBadges) return false;
    return true;
  });
  if (visible.length === 0) return null;
  const cycleState = name => setRoaming(prev => {
    const next = { ...prev, [name]: ((prev[name] || 0) + 1) % 3 };
    try { localStorage.setItem("hgss-roaming", JSON.stringify(next)); } catch {}
    return next;
  });
  const STATE_ICON  = ["○", "◎", "●"];
  const STATE_COLOR = ["rgba(180,185,200,0.55)", "#c8960a", "#4ab770"];
  return (
    <div style={{ borderBottom:`1px solid ${C.border}`, padding:"8px 12px 6px" }}>
      <div style={{ fontSize:10, letterSpacing:2, color:C.muted, textTransform:"uppercase", marginBottom:6, display:"flex", alignItems:"center", gap:5 }}>
        <span style={{ color:"var(--hgss-accent)", fontSize:12 }}>◈</span> Roaming
      </div>
      {visible.map(r => {
        const st = roaming[r.name] || 0;
        return (
          <div key={r.name} onClick={() => cycleState(r.name)}
            style={{ display:"flex", alignItems:"center", gap:7, padding:"3px 4px", cursor:"pointer", borderRadius:4, borderLeft: st===2 ? `3px solid ${C.green}` : "3px solid transparent", marginBottom:1, userSelect:"none" }}>
            <img src={pokeSpriteUrl(r.id)} alt={r.name} style={{ width:26, height:26, imageRendering:"pixelated", flexShrink:0, opacity: st===0 ? 0.45 : 1 }} />
            <span style={{ flex:1, fontSize:11, color: st===2 ? C.green : C.text, fontWeight:"600" }}>{r.name}</span>
            <span style={{ fontSize:9, color:C.muted, marginRight:2 }}>{r.region}</span>
            <span style={{ fontSize:15, color:STATE_COLOR[st], lineHeight:1 }}>{STATE_ICON[st]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── POKÉWALKER TAB ───────────────────────────────────────────────────────────
function WalkerTab({ caught, toggleCaught, isMobile, version }) {
  const walkerAreas = React.useMemo(() => AREAS.filter(a => a.part === "Pokéwalker"), []);
  const [walkerAreaId, setWalkerAreaId] = React.useState(null);
  const walkerArea = walkerAreaId ? walkerAreas.find(a => a.id === walkerAreaId) : null;

  const showSidebar = !isMobile || !walkerAreaId;
  const showMain    = !isMobile || !!walkerAreaId;

  const caughtCount = walkerArea
    ? [...new Set(walkerArea.pokemon.map(p => p.name))].filter(n => caught[n]).length
    : 0;
  const uniqueCount = walkerArea ? new Set(walkerArea.pokemon.map(p => p.name)).size : 0;

  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden", flexDirection: isMobile ? "column" : "row" }}>
      {showSidebar && (
        <div style={{ width: isMobile ? "100%" : 210, flexShrink:0, borderRight: isMobile ? "none" : `1px solid ${C.border}`, borderBottom: isMobile ? `1px solid ${C.border}` : "none", background:C.card, overflowY:"auto", display:"flex", flexDirection:"column", flex: isMobile ? "1" : "unset" }}>
          <div style={{ padding:"8px 12px 6px", borderBottom:`1px solid ${C.border}`, fontSize:10, letterSpacing:2, color:C.muted, textTransform:"uppercase" }}>
            <span style={{ color:"var(--hgss-accent)", marginRight:5 }}>◈</span>Pokéwalker Courses
          </div>
          {walkerAreas.map(a => {
            const uniqueNames = [...new Set(a.pokemon.map(p => p.name))];
            const done = uniqueNames.filter(n => caught[n]).length;
            const total = uniqueNames.length;
            const allDone = done === total && total > 0;
            const isActive = walkerAreaId === a.id;
            const hasExclusive = a.pokemon.some(p => WALKER_EXCLUSIVE.has(p.name));
            return (
              <div key={a.id} onClick={() => setWalkerAreaId(a.id)}
                style={{ padding:"7px 12px", cursor:"pointer", borderLeft: isActive ? `3px solid var(--hgss-accent)` : "3px solid transparent", background: isActive ? "rgba(255,255,255,0.04)" : "transparent", display:"flex", alignItems:"center", justifyContent:"space-between", gap:6, borderBottom:`1px solid ${C.border}22` }}>
                <span style={{ fontSize:12, color: allDone ? C.green : isActive ? C.text : C.muted, fontWeight: isActive ? "600" : "400", flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {allDone ? "✓ " : ""}{a.name}
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
                  {hasExclusive && <span style={{ fontSize:9, color:"#9060d0", fontWeight:"700" }}>★</span>}
                  <span style={{ fontSize:10, color:C.muted }}>{done}/{total}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
      {showMain && (
        <div style={{ flex:1, overflowY:"auto" }}>
          {!walkerArea ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:C.muted, textAlign:"center", gap:12 }}>
              <div style={{ fontSize:32, opacity:0.4 }}>👟</div>
              <div style={{ fontSize:14, fontWeight:"600", color:C.text, opacity:0.5 }}>Select a course</div>
              <div style={{ fontSize:12, maxWidth:280, lineHeight:1.8, color:C.muted }}>27 courses — walk to earn watts and encounter Pokémon. Rarer Pokémon require more watts.</div>
              <div style={{ fontSize:11, color:"#9060d0" }}><span style={{ fontWeight:"700" }}>★</span> courses have Pokéwalker-exclusive Pokémon (not catchable elsewhere in HGSS)</div>
            </div>
          ) : (
            <>
              {isMobile && (
                <div style={{ padding:"8px 16px 0" }}>
                  <button onClick={() => setWalkerAreaId(null)} style={{ background:"transparent", border:"none", color:C.muted, fontSize:13, cursor:"pointer", padding:"0 0 4px", display:"flex", alignItems:"center", gap:5, fontFamily:"'DM Sans',system-ui,sans-serif" }}>
                    ← Courses
                  </button>
                </div>
              )}
              <div style={{ padding:"14px 20px 8px" }}>
                <div style={{ fontSize:18, fontWeight:"700", color:C.text, marginBottom:4 }}>{walkerArea.name}</div>
                {walkerArea.note && <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{walkerArea.note}</div>}
                <div style={{ fontSize:11, color: caughtCount===uniqueCount && uniqueCount>0 ? C.green : C.muted, marginTop:6 }}>
                  {caughtCount}/{uniqueCount} unique Pokémon caught
                </div>
              </div>
              <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:4 }}>
                {renderPokemonList(walkerArea.pokemon, caught, toggleCaught, version, isMobile, {}, walkerArea.id, {}, () => {})}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── AREAS TAB ────────────────────────────────────────────────────────────────
function AreasTab({ caught, toggleCaught, items, toggleItem, trainers, toggleTrainer, trades, toggleTrade, areaId, setAreaId, area, search, setSearch, version, isMobile, choiceGroups, timeFilter, setTime, roaming, setRoaming, badges }) {
  const isPassedPokemon = p  => !!(p.choiceGroup  && choiceGroups?.[p.choiceGroup]  && choiceGroups[p.choiceGroup]  !== p.choiceId);
  const isPassedItem    = it => !!(it.choiceGroup && choiceGroups?.[it.choiceGroup] && choiceGroups[it.choiceGroup] !== it.choiceId);
  const visibleAreas = useMemo(() => AREAS.filter(a => AUDITED_PARTS.has(a.part)), []);
  const groups = useMemo(() => groupByPart(visibleAreas), [visibleAreas]);
  const filtered = useMemo(() => search.trim() ? visibleAreas.filter(a => a.name.toLowerCase().includes(search.toLowerCase())) : null, [search, visibleAreas]);
  const [areaNotes, setAreaNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hgss-area-notes") || "{}"); } catch { return {}; }
  });
  const setAreaNote = (id, text) => setAreaNotes(prev => {
    const next = { ...prev };
    if (text) next[id] = text; else delete next[id];
    try { localStorage.setItem("hgss-area-notes", JSON.stringify(next)); } catch {}
    return next;
  });
  const [collapsedFloors, setCollapsedFloors] = useState(() => {
    try { const r = localStorage.getItem("hgss-collapsed-floors"); return r ? new Set(Object.keys(JSON.parse(r))) : new Set(); } catch { return new Set(); }
  });
  const toggleFloor = (key) => setCollapsedFloors(prev => {
    const n = new Set(prev);
    n.has(key) ? n.delete(key) : n.add(key);
    try { const obj = {}; n.forEach(k => { obj[k] = true; }); localStorage.setItem("hgss-collapsed-floors", JSON.stringify(obj)); } catch {}
    return n;
  });
  const [collapsedParts, setCollapsedParts] = useState(() => {
    try { const r = localStorage.getItem("hgss-collapsed-parts"); return r ? new Set(JSON.parse(r)) : new Set(); } catch { return new Set(); }
  });
  const togglePart = (part) => setCollapsedParts(prev => {
    const n = new Set(prev); n.has(part) ? n.delete(part) : n.add(part);
    try { localStorage.setItem("hgss-collapsed-parts", JSON.stringify([...n])); } catch {}
    return n;
  });
  const [partTimes, setPartTimes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hgss-part-times") || "{}"); } catch { return {}; }
  });
  const [editingPartTime, setEditingPartTime] = useState(null);
  const [targetPart, setTargetPart] = useState(() => {
    try { return localStorage.getItem("hgss-target-part") || "Part 10"; } catch { return "Part 10"; }
  });
  const setPartTime = (part, val) => {
    const h = parseFloat(val);
    setPartTimes(prev => {
      const next = { ...prev };
      if (!isNaN(h) && h > 0) next[part] = h; else delete next[part];
      try { localStorage.setItem("hgss-part-times", JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const partSizes = useMemo(() => {
    const out = {};
    for (const [p, list] of sortedGroupEntries(groups)) out[p] = list.length;
    return out;
  }, [groups]);
  const sortedPartKeys = useMemo(() =>
    Object.keys(partSizes).sort((a, b) => parseInt(a.match(/\d+/)?.[0]||0) - parseInt(b.match(/\d+/)?.[0]||0))
  , [partSizes]);
  const { hoursPerArea, totalLogged, totalEstimated } = useMemo(() => {
    const logged = Object.entries(partTimes).filter(([, h]) => h > 0);
    if (!logged.length) return { hoursPerArea: null, totalLogged: 0, totalEstimated: null };
    const totalH = logged.reduce((s, [, h]) => s + h, 0);
    const totalS = logged.reduce((s, [p]) => s + (partSizes[p] || 1), 0);
    const hpa = totalH / totalS;
    const remaining = Object.keys(partSizes).filter(p => !partTimes[p]).reduce((s, p) => s + (partSizes[p] || 1), 0);
    return { hoursPerArea: hpa, totalLogged: totalH, totalEstimated: remaining * hpa };
  }, [partTimes, partSizes]);
  const throughEstimate = useMemo(() => {
    if (!hoursPerArea) return null;
    const idx = sortedPartKeys.indexOf(targetPart);
    if (idx === -1) return null;
    const upTo = sortedPartKeys.slice(0, idx + 1);
    return upTo.filter(p => !partTimes[p]).reduce((s, p) => s + (partSizes[p] || 1), 0) * hoursPerArea;
  }, [hoursPerArea, targetPart, partTimes, partSizes, sortedPartKeys]);
  const sidebarRef = React.useRef(null);
  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    try { const saved = localStorage.getItem("hgss-sidebar-scroll"); if (saved) el.scrollTop = parseInt(saved, 10); } catch {}
    const onScroll = () => { try { localStorage.setItem("hgss-sidebar-scroll", el.scrollTop); } catch {} };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const partFullDone = useMemo(() => {
    const result = {};
    sortedGroupEntries(groups).forEach(([part, list]) => {
      result[part] = list.length > 0 && list.every(area => {
        const allPoks = flattenPokemon(area).filter(p =>
          !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly) && !isPassedPokemon(p));
        const pokDone = allPoks.every(p => p.method === "Trade" ? !!trades[`${area.id}|trade|${p.name}`] : !!caught[p.name]);
        let itemsDone = true;
        if (area.floors) {
          for (const f of area.floors) {
            for (let i = 0; i < (f.items||[]).length; i++) {
              const it = f.items[i];
              if (isPassedItem(it)) continue;
              const hbd = heldByDone(it, area.id, trades);
              if (!(hbd !== null ? hbd : !!items[floorItemKey(area.id, f.label, i)])) { itemsDone = false; break; }
            }
            if (!itemsDone) break;
          }
        } else {
          const its = area.items || [];
          for (let i = 0; i < its.length; i++) {
            const it = its[i];
            if (isPassedItem(it)) continue;
            const hbd = heldByDone(it, area.id, trades);
            if (!(hbd !== null ? hbd : !!items[flatItemKey(area.id, i)])) { itemsDone = false; break; }
          }
        }
        const trainersDone = flattenTrainers(area).every(t => trainers[`${area.id}|${t.class}|${t.name}`]);
        return pokDone && itemsDone && trainersDone;
      });
    });
    return result;
  }, [groups, caught, items, trainers, trades, version, choiceGroups]);
  useEffect(() => {
    setCollapsedParts(prev => {
      let changed = false;
      const n = new Set(prev);
      Object.entries(partFullDone).forEach(([part, done]) => {
        if (done && !n.has(part)) { n.add(part); changed = true; }
      });
      if (!changed) return prev;
      try { localStorage.setItem("hgss-collapsed-parts", JSON.stringify([...n])); } catch {}
      return n;
    });
  }, [partFullDone]);
  const partSoftDone = useMemo(() => {
    const result = {};
    sortedGroupEntries(groups).forEach(([part, list]) => {
      if (partFullDone[part]) { result[part] = false; return; }
      result[part] = list.length > 0 && list.every(area => {
        const allPoks = flattenPokemon(area).filter(p =>
          !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly) &&
          !isPassedPokemon(p) && p.method !== "Trade" && !p.optional);
        const pokDone = allPoks.every(p => caught[p.name]);
        let reqItemsDone = true;
        if (area.floors) {
          for (const f of area.floors) {
            for (let i = 0; i < (f.items||[]).length; i++) {
              const it = f.items[i];
              if (isPassedItem(it) || it.optional || it.recurring || it.heldBy) continue;
              if (!items[floorItemKey(area.id, f.label, i)]) { reqItemsDone = false; break; }
            }
            if (!reqItemsDone) break;
          }
        } else {
          const its = area.items || [];
          for (let i = 0; i < its.length; i++) {
            const it = its[i];
            if (isPassedItem(it) || it.optional || it.recurring || it.heldBy) continue;
            if (!items[flatItemKey(area.id, i)]) { reqItemsDone = false; break; }
          }
        }
        const trainersDone = flattenTrainers(area).every(t => trainers[`${area.id}|${t.class}|${t.name}`]);
        return pokDone && reqItemsDone && trainersDone;
      });
    });
    return result;
  }, [groups, caught, items, trainers, trades, version, choiceGroups, partFullDone]);

  const areaPokemon  = area ? flattenPokemon(area)  : [];
  const areaItems    = area ? flattenItems(area)    : [];
  const areaTrainers = area ? flattenTrainers(area) : [];
  const allVerPokemon   = areaPokemon.filter(p =>           // all times — for completion
    !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly));
  const verPokemon      = allVerPokemon.filter(p =>         // time-filtered — for display only
    timeFilter === "all" || !p.time || p.time === timeFilter);
  const relevantPokemon = allVerPokemon.filter(p => !isPassedPokemon(p)); // completion: all times
  const pokeDone        = relevantPokemon.filter(p => p.method === "Trade" ? !!trades[`${areaId}|trade|${p.name}`] : !!caught[p.name]).length;
  const nonTradePokemon  = relevantPokemon.filter(p => p.method !== "Trade" && !p.optional);
  const pendingTrades    = relevantPokemon.filter(p => p.method === "Trade" && !trades[`${areaId}|trade|${p.name}`]);
  const nonTradePokeDone = nonTradePokemon.filter(p => caught[p.name]).length;
  const relevantItems   = areaItems.filter(it => !isPassedItem(it));
  const itemDone        = area && !area.floors
    ? areaItems.reduce((n, it, i) => { if (isPassedItem(it)) return n; const hbd = heldByDone(it, areaId, trades); return n + ((hbd !== null ? hbd : !!items[flatItemKey(areaId, i)]) ? 1 : 0); }, 0)
    : area?.floors?.reduce((n, floor) => n + (floor.items||[]).reduce((m, it, i) => { if (isPassedItem(it)) return m; const hbd = heldByDone(it, areaId, trades); return m + ((hbd !== null ? hbd : !!items[floorItemKey(areaId, floor.label, i)]) ? 1 : 0); }, 0), 0) ?? 0;
  const nonOptionalItems    = relevantItems.filter(it => !it.optional && !it.recurring);
  const nonOptionalItemDone = area && !area.floors
    ? areaItems.reduce((n, it, i) => { if (isPassedItem(it) || it.optional || it.recurring) return n; const hbd = heldByDone(it, areaId, trades); return n + ((hbd !== null ? hbd : !!items[flatItemKey(areaId, i)]) ? 1 : 0); }, 0)
    : area?.floors?.reduce((n, floor) => n + (floor.items||[]).reduce((m, it, i) => { if (isPassedItem(it) || it.optional || it.recurring) return m; const hbd = heldByDone(it, areaId, trades); return m + ((hbd !== null ? hbd : !!items[floorItemKey(areaId, floor.label, i)]) ? 1 : 0); }, 0), 0) ?? 0;
  const recurringItems     = relevantItems.filter(it => it.recurring);
  const recurringItemDone  = area && !area.floors
    ? areaItems.reduce((n,it,i) => { if (!it.recurring||isPassedItem(it)) return n; return n+(!!items[flatItemKey(areaId,i)]?1:0); },0)
    : area?.floors?.reduce((n,f) => n+(f.items||[]).reduce((m,it,i) => { if (!it.recurring||isPassedItem(it)) return m; return m+(!!items[floorItemKey(areaId,f.label,i)]?1:0); },0),0) ?? 0;
  const trainerDone     = areaTrainers.filter(t => trainers[`${areaId}|${t.class}|${t.name}`]).length;

  // Prev / Next navigation
  const currentIdx = areaId ? visibleAreas.findIndex(a => a.id === areaId) : -1;
  const prevArea = currentIdx > 0 ? visibleAreas[currentIdx - 1] : null;
  const nextArea = currentIdx >= 0 && currentIdx < visibleAreas.length - 1 ? visibleAreas[currentIdx + 1] : null;

  // Mark-all helpers (skip passed choice-group entries)
  const markAllPokemon  = (poks) => { const seen = new Set(); poks.forEach(p => { if (seen.has(p.name)) return; seen.add(p.name); if (!caught[p.name] && !isPassedPokemon(p)) toggleCaught(p.name, p.choiceGroup ? {choiceGroup:p.choiceGroup, choiceId:p.choiceId} : undefined); }); };
  const clearAllPokemon = (poks) => { const seen = new Set(); poks.forEach(p => { if (seen.has(p.name)) return; seen.add(p.name); if (caught[p.name]  && !isPassedPokemon(p)) toggleCaught(p.name, p.choiceGroup ? {choiceGroup:p.choiceGroup, choiceId:p.choiceId} : undefined); }); };
  const markAllItems    = (its, keyFn) => its.forEach((it, i) => { if (isPassedItem(it)) return; const k = keyFn(it, i); const tmM = it.name.match(/^(TM\d{2}|HM\d{2})\b/); const tmId = tmM ? tmM[1] : undefined; if (!items[k]) toggleItem(k, { ...(it.choiceGroup ? {choiceGroup:it.choiceGroup, choiceId:it.choiceId} : {}), ...(tmId ? {tmId} : {}) }); });
  const clearAllItems   = (its, keyFn) => its.forEach((it, i) => { if (isPassedItem(it)) return; const k = keyFn(it, i); const tmM = it.name.match(/^(TM\d{2}|HM\d{2})\b/); const tmId = tmM ? tmM[1] : undefined; if (items[k])  toggleItem(k, { ...(it.choiceGroup ? {choiceGroup:it.choiceGroup, choiceId:it.choiceId} : {}), ...(tmId ? {tmId} : {}) }); });
  const markAllTrainers = (trns) => trns.forEach(t => { const k = `${areaId}|${t.class}|${t.name}`; if (!trainers[k]) toggleTrainer(k); });
  const clearAllTrainers = (trns) => trns.forEach(t => { const k = `${areaId}|${t.class}|${t.name}`; if (trainers[k]) toggleTrainer(k); });

  // On mobile: show sidebar when no area selected, detail when area selected
  const showSidebar = !isMobile || !areaId;
  const showMain    = !isMobile || !!areaId;

  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden", flexDirection: isMobile ? "column" : "row" }}>
      {/* Sidebar */}
      {showSidebar && (
      <div ref={sidebarRef} style={{ width: isMobile ? "100%" : 210, flexShrink:0, borderRight: isMobile ? "none" : `1px solid ${C.border}`, borderBottom: isMobile ? `1px solid ${C.border}` : "none", background:C.card, display:"flex", flexDirection:"column", overflowY:"auto", flex: isMobile ? "1" : "unset" }}>
        <div style={{ padding:"10px 12px", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:C.card, zIndex:1 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search areas…"
            style={{ width:"100%", background:"rgba(0,0,0,0.25)", border:`1px solid ${C.border}`, color:C.text, padding:"8px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:16, borderRadius:6, boxSizing:"border-box", outline:"none" }} />
        </div>
        {hoursPerArea != null && (
          <div style={{ padding:"5px 12px 7px", fontSize:10, color:C.muted, borderBottom:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:5 }}>
              <span>⏱ <b style={{ color:C.text }}>{totalLogged.toFixed(1)}h</b> logged</span>
              <span>est. remaining: <b style={{ color:C.gold }}>{fmtHours(totalEstimated)}</b></span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span>est. through</span>
              <select value={targetPart} onChange={e => { setTargetPart(e.target.value); try { localStorage.setItem("hgss-target-part", e.target.value); } catch {} }}
                style={{ fontSize:10, background:"rgba(0,0,0,0.4)", border:`1px solid ${C.border}`, color:C.text, borderRadius:3, padding:"1px 3px", fontFamily:"inherit", cursor:"pointer" }}>
                {sortedPartKeys.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {throughEstimate != null && (
                throughEstimate > 0
                  ? <b style={{ color:C.gold }}>~{fmtHours(throughEstimate)}</b>
                  : <b style={{ color:C.green }}>done ✓</b>
              )}
            </div>
          </div>
        )}
        {roaming && setRoaming && badges && <RoamingCard roaming={roaming} setRoaming={setRoaming} version={version} badges={badges} />}
        {filtered
          ? filtered.map(a => <AreaRow key={a.id} area={a} areaId={areaId} setAreaId={setAreaId} caught={caught} items={items} trainers={trainers} trades={trades} version={version} choiceGroups={choiceGroups} areaNotes={areaNotes} />)
          : sortedGroupEntries(groups).map(([part, list]) => {
              const isCollapsed = collapsedParts.has(part);
              const isDone = partFullDone[part];
              const isSoft = partSoftDone[part];
              const partColor = isDone ? C.green : isSoft ? C.gold : C.muted;
              return (
                <div key={part}>
                  <div onClick={() => togglePart(part)} style={{ padding:"6px 12px 6px 10px", fontSize:10, letterSpacing:2, color: partColor, textTransform:"uppercase", background:"rgba(0,0,0,0.2)", borderBottom:`1px solid ${C.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", userSelect:"none" }}>
                    <span>{isDone ? "✓ " : isSoft ? "~ " : ""}{part}</span>
                    <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                      {(() => {
                        const logged = partTimes[part];
                        const est = !logged && hoursPerArea ? Math.round(hoursPerArea * (partSizes[part] || 1) * 10) / 10 : null;
                        return editingPartTime === part ? (
                          <input autoFocus type="number" min="0" step="0.5" defaultValue={logged || ""}
                            style={{ width:46, fontSize:10, background:"rgba(0,0,0,0.5)", border:`1px solid ${C.border}`, color:C.text, borderRadius:3, padding:"1px 4px", textAlign:"center", fontFamily:"inherit", textTransform:"none", letterSpacing:0 }}
                            onClick={e => e.stopPropagation()}
                            onBlur={e => { setPartTime(part, e.target.value); setEditingPartTime(null); }}
                            onKeyDown={e => { if (e.key === "Enter") { setPartTime(part, e.target.value); setEditingPartTime(null); } if (e.key === "Escape") setEditingPartTime(null); }} />
                        ) : (
                          <span onClick={e => { e.stopPropagation(); setEditingPartTime(part); }}
                            style={{ color: logged ? C.green : C.muted, opacity: logged ? 1 : 0.5, cursor:"text", letterSpacing:0, textTransform:"none", fontSize:10, minWidth:24, textAlign:"right" }}
                            title={logged ? `${logged}h — click to edit` : est ? `~${fmtHours(est)} estimated — click to log` : "Click to log time"}>
                            {logged ? `${logged}h` : est ? `~${fmtHours(est)}` : "⏱"}
                          </span>
                        );
                      })()}
                      <span style={{ fontSize:11, opacity:0.6 }}>{isCollapsed ? "▶" : "▼"}</span>
                    </span>
                  </div>
                  {!isCollapsed && list.map(a => <AreaRow key={a.id} area={a} areaId={areaId} setAreaId={setAreaId} caught={caught} items={items} trainers={trainers} trades={trades} version={version} choiceGroups={choiceGroups} areaNotes={areaNotes} />)}
                </div>
              );
            })
        }
        {filtered?.length === 0 && <div style={{ padding:20, fontSize:12, color:C.muted, textAlign:"center" }}>No matches</div>}
      </div>
      )}

      {/* Main */}
      {showMain && (
      <div style={{ flex:1, overflowY:"auto", padding:0 }} id="area-main-scroll">
        {!area ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:C.muted, textAlign:"center", gap:12 }}>
            <div style={{ fontSize:36, opacity:0.4 }}>🗺</div>
            <div style={{ fontSize:14, fontWeight:"600", color:C.text, opacity:0.5 }}>Select an area</div>
            <div style={{ fontSize:12, maxWidth:320, lineHeight:1.8, color:C.muted }}>
              Pokémon are tracked <span style={{ color:C.text }}>globally by name</span> — catching Pikachu here marks it caught everywhere.
            </div>
          </div>
        ) : (
          <>
            {/* ── Sticky area header ── */}
            {(() => {
              const atype = getAreaType(area);
              const tint = AREA_TINT[atype];
              const typeLabel = { route:"Route", cave:"Cave / Dungeon", water:"Water / Ship", safari:"Safari Zone", special:"Special", city:"City / Town" }[atype] || atype;
              const allDone = nonTradePokemon.length + nonOptionalItems.length + areaTrainers.length > 0 &&
                nonTradePokeDone === nonTradePokemon.length && nonOptionalItemDone === nonOptionalItems.length && trainerDone === areaTrainers.length;
              return (
                <div style={{ position:"sticky", top:0, zIndex:10, background:C.bg, borderBottom:`1px solid ${C.border}`, padding:"12px 20px 10px", boxShadow:"0 2px 8px rgba(0,0,0,0.3)", overflow:"hidden" }}>
                  <AreaCompletionSweep allDone={allDone} color={tint.bar} areaId={area.id} />
                  {/* Mobile back button */}
                  {isMobile && (
                    <button onClick={() => setAreaId(null)} style={{ background:"transparent", border:"none", color:C.muted, fontSize:13, cursor:"pointer", padding:"0 0 8px", display:"flex", alignItems:"center", gap:5, fontFamily:"'DM Sans',system-ui,sans-serif" }}>
                      <span style={{ fontSize:16 }}>←</span> All Areas
                    </button>
                  )}
                  {/* Nav + title row — v4: oversized title + display part number */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14, flex:1, minWidth:0 }}>
                      {/* Part number — display style */}
                      <div style={{
                        flexShrink:0, lineHeight:1,
                        fontFamily:"'Space Grotesk',system-ui,sans-serif",
                        textAlign:"right",
                      }}>
                        <div style={{ fontSize:9, color:C.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:2, fontFamily:"'JetBrains Mono',ui-monospace,monospace" }}>Part</div>
                        <div style={{ fontSize: isMobile ? 28 : 36, fontWeight:"700", color:tint.bar, letterSpacing:-1, fontVariantNumeric:"tabular-nums" }}>
                          {(area.part.match(/\d+/) || [""])[0]}
                        </div>
                      </div>
                      {/* Divider */}
                      <div style={{ width:1, alignSelf:"stretch", background:`linear-gradient(180deg, transparent, ${tint.bar}55 30%, ${tint.bar}55 70%, transparent)`, flexShrink:0 }} />
                      {/* Title + chips */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <h2 style={{ margin:0, fontSize: isMobile ? 22 : 30, fontWeight:"700", letterSpacing:-0.5, color:C.text, lineHeight:1.1, fontFamily:"'Space Grotesk',system-ui,sans-serif" }}>{area.name}</h2>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6, flexWrap:"wrap" }}>
                          <span style={{ fontSize:9, color:tint.bar, background:`${tint.bar}22`, border:`1px solid ${tint.bar}55`, padding:"1px 7px", borderRadius:99, letterSpacing:0.5, textTransform:"uppercase", fontWeight:"700" }}>{typeLabel}</span>
                          {allDone && <span style={{ fontSize:9, color:C.green, background:"rgba(74,175,116,0.12)", border:`1px solid ${C.green}55`, padding:"1px 7px", borderRadius:99, fontWeight:"700", letterSpacing:0.5 }}>✓ COMPLETE</span>}
                          {pendingTrades.length > 0 && <span style={{ fontSize:9, color:"#c8960a", background:"rgba(200,150,10,0.10)", border:"1px solid rgba(200,150,10,0.4)", padding:"1px 7px", borderRadius:99, fontWeight:"700", letterSpacing:0.5 }}>⇄ TRADE</span>}
                        </div>
                      </div>
                    </div>
                    {/* Prev / Next arrows */}
                    <div style={{ display:"flex", gap:4, flexShrink:0, marginTop:2 }}>
                      <button onClick={() => prevArea && setAreaId(prevArea.id)} disabled={!prevArea}
                        title={prevArea ? prevArea.name : ""}
                        style={{ width:30, height:30, border:`1px solid ${C.border}`, borderRadius:6, cursor:prevArea?"pointer":"default", background:"transparent", color:prevArea?C.text:C.border, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.1s" }}>←</button>
                      <button onClick={() => nextArea && setAreaId(nextArea.id)} disabled={!nextArea}
                        title={nextArea ? nextArea.name : ""}
                        style={{ width:30, height:30, border:`1px solid ${C.border}`, borderRadius:6, cursor:nextArea?"pointer":"default", background:"transparent", color:nextArea?C.text:C.border, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.1s" }}>→</button>
                    </div>
                  </div>
                  {/* Progress bars */}
                  <div style={{ display:"flex", gap:10, marginTop:10, flexWrap:"wrap" }}>
                    <MiniBar label="Pokémon"  done={pokeDone}    total={relevantPokemon.length} color={C.green} />
                    <MiniBar label="Items"    done={itemDone}    total={relevantItems.length}   color={C.gold} />
                    {areaTrainers.length > 0 && <MiniBar label="Trainers" done={trainerDone} total={areaTrainers.length} color="#a87acc" />}
                  </div>
                </div>
              );
            })()}

            {/* ── Scrollable content ── */}
            <div key={area.id} className="hgss-area-in" style={{ padding:"14px 20px 20px", position:"relative" }}>
              <div className="hgss-area-glow-overlay" style={{ ["--area-glow"]: `${getAreaType(area)==='cave'?'rgba(184,153,224,0.32)':getAreaType(area)==='water'?'rgba(95,168,217,0.32)':getAreaType(area)==='safari'?'rgba(95,201,154,0.32)':getAreaType(area)==='city'?'rgba(224,180,80,0.28)':'rgba(95,201,154,0.32)'}` }} />
              {area.note && (
                <div style={{ background:"rgba(200,150,10,0.07)", border:`1px solid rgba(200,150,10,0.2)`, borderRadius:8, padding:"10px 14px", fontSize:12, color:"#c8b070", marginBottom:14, lineHeight:1.7 }}>
                  {area.note}
                </div>
              )}

              <div style={{ fontSize:11, color:C.muted, marginBottom:12, display:"flex", gap:16, flexWrap:"wrap" }}>
                <span><span style={{ color:C.hgGold, fontWeight:"600" }}>HG</span> = HeartGold exclusive</span>
                <span><span style={{ color:C.ssSilver, fontWeight:"600" }}>SS</span> = SoulSilver exclusive</span>
                <span><span style={{ color:C.gold }}>★</span> = Hidden (Itemfinder)</span>
              </div>

              {area.floors ? (
                // ── Floor-by-floor layout ─────────────────────────────────
                area.floors.map(floor => {
                  const hasPoks = (floor.pokemon  || []).length > 0;
                  const hasItms = (floor.items    || []).length > 0;
                  const hasTrns = (floor.trainers || []).length > 0;
                  if (!hasPoks && !hasItms && !hasTrns) return null;
                  const allFloorVerPoks = (floor.pokemon || []).filter(p => !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly));
                  const floorVerPoks    = allFloorVerPoks.filter(p => timeFilter === "all" || !p.time || p.time === timeFilter);
                  const relevFloorPoks  = allFloorVerPoks.filter(p => !isPassedPokemon(p));
                  const pokDone         = relevFloorPoks.filter(p => p.method === "Trade" ? !!trades[`${areaId}|trade|${p.name}`] : !!caught[p.name]).length;
                  const relevFloorItems        = (floor.items || []).filter(it => !isPassedItem(it));
                  const regularFloorItems      = relevFloorItems.filter(it => !it.recurring && !it.optional);
                  const recurringFloorItems    = relevFloorItems.filter(it => it.recurring);
                  const regularFloorItemDone   = (floor.items || []).reduce((n,it,i) => n+(!isPassedItem(it)&&!it.recurring&&!it.optional&&items[floorItemKey(areaId,floor.label,i)]?1:0),0);
                  const recurringFloorItemDone = (floor.items || []).reduce((n,it,i) => n+(!isPassedItem(it)&&it.recurring&&items[floorItemKey(areaId,floor.label,i)]?1:0),0);
                  const itmDone         = regularFloorItemDone;
                  const trnDone         = (floor.trainers || []).filter(t => trainers[`${areaId}|${t.class}|${t.name}`]).length;
                  const floorTotal = relevFloorPoks.length + regularFloorItems.length + (floor.trainers||[]).length;
                  const floorDone  = pokDone + itmDone + trnDone;
                  const floorKey = `${areaId}|${floor.label}`;
                  const isCollapsed = collapsedFloors.has(floorKey);
                  return (
                    <div key={floor.label}>
                      {/* Collapsible floor divider */}
                      <div onClick={() => toggleFloor(floorKey)} style={{ display:"flex", alignItems:"center", gap:8, margin:"16px 0 10px", cursor:"pointer" }}>
                        <div style={{ padding:"2px 10px", background:"rgba(var(--hgss-accent-rgb,212,98,26),0.15)", border:`1px solid var(--hgss-accent)`, borderRadius:5, fontSize:11, fontWeight:"700", color:"var(--hgss-accent)", letterSpacing:1, flexShrink:0, opacity:0.85 }}>{floor.label}</div>
                        <div style={{ flex:1, height:1, background:C.border }} />
                        <span style={{ fontSize:10, color: floorDone===floorTotal && floorTotal>0 ? C.green : C.muted, flexShrink:0 }}>{floorDone}/{floorTotal}</span>
                        <span style={{ fontSize:11, color:C.muted, flexShrink:0 }}>{isCollapsed ? "▶" : "▼"}</span>
                      </div>
                      {!isCollapsed && (
                        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:12, marginBottom:12 }}>
                          {/* Wild Pokémon left */}
                          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                            <Section title="Wild Pokémon" count={`${pokDone}/${relevFloorPoks.length}`} color={C.green}
                              allDone={pokDone===relevFloorPoks.length && relevFloorPoks.length>0}
                              onMarkAll={() => pokDone===relevFloorPoks.length ? clearAllPokemon(floorVerPoks) : markAllPokemon(floorVerPoks)}
                              collapsible>
                              {!hasPoks ? <Empty text="No wild Pokémon here" /> : renderPokemonList(floorVerPoks, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade)}
                            </Section>
                            <Section title="Items" count={`${regularFloorItemDone}/${regularFloorItems.length}`} color={C.gold}
                              allDone={regularFloorItemDone===regularFloorItems.length && regularFloorItems.length>0}
                              onMarkAll={() => {
                                const doMark = regularFloorItemDone < regularFloorItems.length;
                                (floor.items||[]).forEach((it,i) => {
                                  if (isPassedItem(it)||it.recurring||it.optional) return;
                                  const k = floorItemKey(areaId,floor.label,i);
                                  const tmM = it.name.match(/^(TM\d{2}|HM\d{2})\b/); const tmId = tmM?tmM[1]:undefined;
                                  if (doMark && !items[k]) toggleItem(k,{...(it.choiceGroup?{choiceGroup:it.choiceGroup,choiceId:it.choiceId}:{}),...(tmId?{tmId}:{})});
                                  if (!doMark && items[k]) toggleItem(k,{...(it.choiceGroup?{choiceGroup:it.choiceGroup,choiceId:it.choiceId}:{}),...(tmId?{tmId}:{})});
                                });
                              }}>
                              {regularFloorItems.length === 0 ? <Empty text="No items here" /> : (floor.items||[]).map((it,i) => {
                                if (it.recurring || it.optional || isPassedItem(it)) return null;
                                const key = floorItemKey(areaId, floor.label, i);
                                const hbd = heldByDone(it, areaId, trades);
                                return <ItemEntry key={i} it={it} itemKey={key} done={hbd !== null ? hbd : !!items[key]} locked={hbd !== null} toggleItem={toggleItem} isMobile={isMobile} choiceGroups={choiceGroups} />;
                              })}
                            </Section>
                            {recurringFloorItems.length > 0 && (
                              <Section title="Recurring Items" count={`${recurringFloorItemDone}/${recurringFloorItems.length}`} color={C.muted}>
                                {(floor.items||[]).map((it,i) => {
                                  if (!it.recurring || isPassedItem(it)) return null;
                                  const key = floorItemKey(areaId, floor.label, i);
                                  return <ItemEntry key={i} it={it} itemKey={key} done={!!items[key]} toggleItem={toggleItem} isMobile={isMobile} choiceGroups={choiceGroups} />;
                                })}
                              </Section>
                            )}
                          </div>
                          {/* Trainers right */}
                          <Section title="Trainers" count={`${trnDone}/${(floor.trainers||[]).length}`} color="#a87acc"
                            allDone={trnDone===(floor.trainers||[]).length && (floor.trainers||[]).length>0}
                            onMarkAll={() => trnDone===(floor.trainers||[]).length ? clearAllTrainers(floor.trainers||[]) : markAllTrainers(floor.trainers||[])}>
                            {!hasTrns ? <Empty text="No trainers here" /> : floor.trainers.map((t,i) => (
                              <TrainerEntry key={i} t={t} areaId={areaId} done={!!trainers[`${areaId}|${t.class}|${t.name}`]} toggleTrainer={toggleTrainer} />
                            ))}
                          </Section>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                // ── Flat layout (single-level areas) ─────────────────────
                <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:12 }}>
                  {/* Wild Pokémon + Items left */}
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <Section title="Wild Pokémon" count={`${pokeDone}/${relevantPokemon.length}`} color={C.green}
                      allDone={pokeDone===relevantPokemon.length && relevantPokemon.length>0}
                      onMarkAll={() => pokeDone===relevantPokemon.length ? clearAllPokemon(verPokemon) : markAllPokemon(verPokemon)}
                      collapsible>
                      {areaPokemon.length === 0 ? <Empty text="No wild Pokémon here" /> :
                        renderPokemonList(verPokemon, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade)
                      }
                    </Section>
                    <Section title="Items" count={`${nonOptionalItemDone}/${nonOptionalItems.length}`} color={C.gold}
                      allDone={nonOptionalItemDone===nonOptionalItems.length && nonOptionalItems.length>0}
                      onMarkAll={() => {
                        const doMark = nonOptionalItemDone < nonOptionalItems.length;
                        areaItems.forEach((it,i) => {
                          if (isPassedItem(it)||it.recurring||it.optional) return;
                          const k = flatItemKey(areaId,i);
                          const tmM = it.name.match(/^(TM\d{2}|HM\d{2})\b/); const tmId = tmM?tmM[1]:undefined;
                          if (doMark && !items[k]) toggleItem(k,{...(it.choiceGroup?{choiceGroup:it.choiceGroup,choiceId:it.choiceId}:{}),...(tmId?{tmId}:{})});
                          if (!doMark && items[k]) toggleItem(k,{...(it.choiceGroup?{choiceGroup:it.choiceGroup,choiceId:it.choiceId}:{}),...(tmId?{tmId}:{})});
                        });
                      }}>
                      {nonOptionalItems.length === 0 ? <Empty text="No items here" /> :
                        areaItems.map((it,i) => {
                          if (it.recurring || it.optional || isPassedItem(it)) return null;
                          const key = flatItemKey(areaId, i);
                          const hbd = heldByDone(it, areaId, trades);
                          return <ItemEntry key={i} it={it} itemKey={key} done={hbd !== null ? hbd : !!items[key]} locked={hbd !== null} toggleItem={toggleItem} isMobile={isMobile} choiceGroups={choiceGroups} />;
                        })
                      }
                    </Section>
                    {recurringItems.length > 0 && (
                      <Section title="Recurring Items" count={`${recurringItemDone}/${recurringItems.length}`} color={C.muted}>
                        {areaItems.map((it,i) => {
                          if (!it.recurring || isPassedItem(it)) return null;
                          const key = flatItemKey(areaId, i);
                          return <ItemEntry key={i} it={it} itemKey={key} done={!!items[key]} toggleItem={toggleItem} isMobile={isMobile} choiceGroups={choiceGroups} />;
                        })}
                      </Section>
                    )}
                  </div>
                  {/* Trainers right */}
                  <Section title="Trainers" count={`${trainerDone}/${areaTrainers.length}`} color="#a87acc"
                    allDone={trainerDone===areaTrainers.length && areaTrainers.length>0}
                    onMarkAll={() => trainerDone===areaTrainers.length ? clearAllTrainers(areaTrainers) : markAllTrainers(areaTrainers)}>
                    {areaTrainers.length === 0 ? <Empty text="No trainers here" /> :
                      areaTrainers.map((t,i) => (
                        <TrainerEntry key={i} t={t} areaId={areaId} done={!!trainers[`${areaId}|${t.class}|${t.name}`]} toggleTrainer={toggleTrainer} />
                      ))
                    }
                  </Section>
                </div>
              )}
            </div>

            {/* ── Notes ── */}
            <div style={{ padding:"4px 20px 20px" }}>
              <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Notes</div>
              <textarea
                value={areaNotes[areaId] || ""}
                onChange={e => setAreaNote(areaId, e.target.value)}
                placeholder="Personal notes for this area…"
                rows={3}
                style={{ width:"100%", background:"rgba(0,0,0,0.2)", border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"8px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:12, resize:"vertical", outline:"none", boxSizing:"border-box" }}
              />
            </div>
          </>
        )}
      </div>
      )}
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function AreaRow({ area, areaId, setAreaId, caught, items, trainers, trades, version, choiceGroups, areaNotes }) {
  const isSel  = areaId === area.id;
  const isPok  = p  => !!(p.choiceGroup  && choiceGroups?.[p.choiceGroup]  && choiceGroups[p.choiceGroup]  !== p.choiceId);
  const isItm  = it => !!(it.choiceGroup && choiceGroups?.[it.choiceGroup] && choiceGroups[it.choiceGroup] !== it.choiceId);
  const allPoksWithTrades = flattenPokemon(area).filter(p =>
    !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly) && !isPok(p));
  const tradePoks = allPoksWithTrades.filter(p => p.method === "Trade");
  const allPoks   = allPoksWithTrades.filter(p => p.method !== "Trade" && !p.optional);
  const hasPendingTrades = tradePoks.some(p => !trades?.[`${area.id}|trade|${p.name}`]);
  const hasPendingSurfItems = area.floors
    ? area.floors.some(f => (f.items||[]).some((it, i) => it.surf && !items[floorItemKey(area.id, f.label, i)]))
    : (area.items||[]).some((it, i) => it.surf && !items[flatItemKey(area.id, i)]);
  const allTrns = flattenTrainers(area);
  const pd  = allPoks.filter(p => caught[p.name]).length;
  // Which time periods still have uncaught time-restricted Pokémon?
  const pendingTimes = ["morning","day","night"].filter(t =>
    allPoks.some(p => p.time === t && !caught[p.name]));
  // Item done/total excluding passed choice-group entries
  const { id_, itTotal } = (() => {
    let done = 0, total = 0;
    const countFloor = (its, keyFn) => its.forEach((it, i) => { if (isItm(it) || it.optional || it.recurring) return; total++; const hbd = heldByDone(it, area.id, trades); if (hbd !== null ? hbd : items[keyFn(i)]) done++; });
    if (area.floors) area.floors.forEach(f => countFloor(f.items || [], i => floorItemKey(area.id, f.label, i)));
    else countFloor(area.items || [], i => flatItemKey(area.id, i));
    return { id_: done, itTotal: total };
  })();
  const td   = allTrns.filter(t => trainers[`${area.id}|${t.class}|${t.name}`]).length;
  const done = pd + id_ + td;
  const total = allPoks.length + itTotal + allTrns.length;
  const allDone = total > 0 && done === total;
  const pct  = total > 0 ? Math.round((done / total) * 100) : 0;
  const tint = AREA_TINT[getAreaType(area)];
  return (
    <div onClick={() => setAreaId(area.id)} style={{
        padding:"8px 12px", cursor:"pointer",
        borderBottom:`1px solid rgba(58,42,28,0.5)`,
        borderLeft: isSel ? `3px solid var(--hgss-accent)` : allDone ? `3px solid #4aaf74` : `3px solid ${tint.bar}`,
        background: isSel ? "rgba(var(--hgss-accent-rgb,212,98,26),0.18)" : allDone ? "rgba(74,175,116,0.08)" : tint.bg,
        transition:"background 0.1s" }}
      onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = allDone ? "rgba(74,175,116,0.14)" : "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = allDone ? "rgba(74,175,116,0.08)" : tint.bg; }}>
      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
        <span style={{ fontSize:12, fontWeight: isSel ? "700" : "400", color: allDone ? C.green : isSel ? "var(--hgss-accent)" : "#c4a888", lineHeight:1.4, flex:1 }}>{allDone ? "✓ " : ""}{area.name}</span>
        {pendingTimes.map(t => (
          <img key={t} src={TIME_COLORS[t].icon} title={t.charAt(0).toUpperCase()+t.slice(1)} style={{ width:14, height:14, objectFit:"contain", flexShrink:0, display:"block", opacity:0.85 }} />
        ))}
        {hasPendingTrades && <span style={{ fontSize:9, color:"#c8960a", background:"rgba(200,150,10,0.12)", border:"1px solid rgba(200,150,10,0.35)", padding:"1px 5px", borderRadius:99, fontWeight:"700", flexShrink:0 }}>⇄</span>}
        {hasPendingSurfItems && <span style={{ fontSize:9, color:"#4a8fc4", background:"rgba(74,143,196,0.12)", border:"1px solid rgba(74,143,196,0.35)", padding:"1px 5px", borderRadius:99, fontWeight:"700", flexShrink:0 }}>≈</span>}
        {areaNotes?.[area.id] && <span title="Has notes" style={{ width:7, height:7, borderRadius:"50%", background:"#6ba8d4", flexShrink:0, display:"inline-block" }} />}
      </div>
      {total > 0 && (
        <div style={{ display:"flex", gap:10, marginTop:3, fontSize:10, color:C.muted }}>
          <span style={{ color: pd===allPoks.length && allPoks.length>0 ? C.green : C.muted }}>{pd}/{allPoks.length} pkm</span>
          <span style={{ color: id_===itTotal && itTotal>0 ? C.gold : C.muted }}>{id_}/{itTotal} itm</span>
          {allTrns.length > 0 && <span style={{ color: td===allTrns.length ? "#a87acc" : C.muted }}>{td}/{allTrns.length} tr</span>}
        </div>
      )}
      {total > 0 && !allDone && (
        <div style={{ marginTop:4, height:2, background:"rgba(255,255,255,0.06)", borderRadius:1, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"var(--hgss-accent)", borderRadius:1, transition:"width 0.3s" }} />
        </div>
      )}
    </div>
  );
}



const METHOD_GROUP = m => {
  if (m === "Surf" || m === "Old Rod" || m === "Good Rod" || m === "Super Rod") return m;
  return null;
};

function MethodDivider({ label }) {
  const color = label === "Surf" ? "#4a8fc4" : "#4a9fa0";
  const sprite = METHOD_SPRITE_URL[label];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:7, margin:"6px 0 2px" }}>
      <div style={{ flex:1, height:1, background:C.border }} />
      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
        {sprite && <img src={sprite} alt="" style={{ width:16, height:16, imageRendering:"pixelated" }} />}
        <span style={{ fontSize:10, fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color }}>{label}</span>
      </div>
      <div style={{ flex:1, height:1, background:C.border }} />
    </div>
  );
}

function renderPokemonList(pokemon, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade) {
  // A Pokémon is night-only in this area if every encounter slot for it is time:"night"
  // (no morning, day, or timeless slots exist for the same name).
  const nightOnlyNames = new Set(
    pokemon
      .filter(p => p.time === "night" && !pokemon.some(q => q.name === p.name && q.time !== "night"))
      .map(p => p.name)
  );

  // Sort within each consecutive method block by effective rate descending.
  // Method block order is preserved; only intra-group ordering changes.
  const getPct = p => {
    const mHG = p.rate && p.rate.match(/^HG\s+(\S+)\/SS\s+(\S+)/);
    if (mHG) return parseRatePct(version === "hg" ? mHG[1] : mHG[2]) || 0;
    const m = p.rate && p.rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
    if (m) return (version === "hg" ? parseRatePct(m[1]) : parseRatePct(m[2])) || 0;
    return parseRatePct(p.rate) || 0;
  };
  const sorted = [];
  let i = 0;
  while (i < pokemon.length) {
    const method = pokemon[i].method;
    let j = i;
    while (j < pokemon.length && pokemon[j].method === method) j++;
    sorted.push(...pokemon.slice(i, j).slice().sort((a, b) => getPct(b) - getPct(a)));
    i = j;
  }

  const items = [];
  let lastGroup = null;
  sorted.forEach((p, idx) => {
    const group = METHOD_GROUP(p.method);
    if (group && group !== lastGroup) items.push({ type:"divider", label:group, key:`div-${idx}` });
    lastGroup = group;
    items.push({ type:"pokemon", p, key:`${idx}-${p.name}` });
  });
  return items.map(item =>
    item.type === "divider"
      ? <MethodDivider key={item.key} label={item.label} />
      : <PokemonEntry key={item.key} p={item.p} caught={caught} toggleCaught={toggleCaught} version={version} isMobile={isMobile} choiceGroups={choiceGroups} areaId={areaId} trades={trades} toggleTrade={toggleTrade} nightOnly={nightOnlyNames.has(item.p.name)} />
  );
}

function PokemonEntry({ p, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade, nightOnly }) {
  const isTrade  = p.method === "Trade";
  const tradeKey = isTrade ? `${areaId}|trade|${p.name}` : null;
  const isCaught = isTrade ? !!(trades?.[tradeKey]) : !!caught[p.name];
  // Wobble the sprite when this entry JUST flipped to caught.
  const prevCaughtRef = React.useRef(isCaught);
  const [wobbleNonce, setWobbleNonce] = React.useState(0);
  React.useEffect(() => {
    if (!prevCaughtRef.current && isCaught) setWobbleNonce(n => n + 1);
    prevCaughtRef.current = isCaught;
  }, [isCaught]);
  if ((version === "hg" && p.ssOnly) || (version === "ss" && p.hgOnly)) return null;

  const isPassed = !!(p.choiceGroup && choiceGroups?.[p.choiceGroup] && choiceGroups[p.choiceGroup] !== p.choiceId);

  // Determine if a better-rate area exists for this Pokémon
  const hgssMatch  = p.rate && p.rate.match(/^HG\s+(\S+)\/SS\s+(\S+)/);
  const splitMatch = !hgssMatch && p.rate && p.rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
  const currentPct = hgssMatch
    ? parseRatePct(version === "hg" ? hgssMatch[1] : hgssMatch[2])
    : splitMatch
    ? parseRatePct(version === "hg" ? splitMatch[1] : splitMatch[2])
    : parseRatePct(p.rate);
  const best = BEST_AREA_MAP[version][p.name];
  const hasBetter = !isCaught && currentPct && best && best.pct > currentPct;

  const handleClick = isPassed ? undefined
    : isTrade ? () => toggleTrade(tradeKey)
    : () => toggleCaught(p.name, p.choiceGroup ? {choiceGroup:p.choiceGroup, choiceId:p.choiceId} : undefined);

  return (
    <Row done={isCaught} passed={isPassed} onClick={handleClick}>
      {allDexId(p.name) && <img key={wobbleNonce} src={pokeSpriteUrl(allDexId(p.name))} alt={p.name} className={wobbleNonce && isCaught ? "hgss-wobble" : ""} style={{ width:36, height:36, imageRendering:"pixelated", flexShrink:0, opacity:isCaught?1:0.65, filter:isCaught?"none":"brightness(0)", transition:"opacity 0.25s, filter 0.25s" }} />}
      <div style={{ flex:1 }}>
        <span style={{ color:isCaught?C.green:p.ssOnly?C.ssSilver:p.hgOnly?C.hgGold:C.text, fontWeight:"600", fontSize:12 }}>
          {p.name}{p.hgOnly&&<Tag color={C.hgGold}>HG</Tag>}{p.ssOnly&&<Tag color={C.ssSilver}>SS</Tag>}{WALKER_EXCLUSIVE.has(p.name)&&<Tag color="#9060d0">PW ★</Tag>}
        </span>
        {METHOD_SPRITE_URL[p.method]
          ? <span style={{ display:"inline-flex", alignItems:"center", gap:3, marginLeft:6 }}>
              <img src={METHOD_SPRITE_URL[p.method]} alt="" style={{ width:16, height:16, imageRendering:"pixelated", flexShrink:0 }} />
              <span style={{ fontSize:10, color:C.muted }}>{p.method}</span>
            </span>
          : <span style={{ fontSize:10, color:C.muted, marginLeft:6 }}>{p.method}</span>
        }
        {p.note&&<div style={{ fontSize:10, color:"#b87030", marginTop:2 }}>{p.note}</div>}
        {hasBetter&&<div style={{ fontSize:9, color:"#7ab4d4", marginTop:2 }}>↑ {best.pct}% in {best.areaName}</div>}
      </div>
      <div style={{ textAlign:"right", flexShrink:0, paddingLeft:8, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
        {p.time && TIME_COLORS[p.time] && (() => { const tc=TIME_COLORS[p.time]; const isNightOnly = nightOnly && p.time === "night"; const label=p.time==="morning"?"Morning":p.time==="day"?"Day":isNightOnly?"Night only":"Night"; return (
          <span style={{ fontSize:9, fontWeight:"700", color:tc.badge, background: isNightOnly ? `${tc.badge}28` : tc.badgeBg, border:`1px solid ${isNightOnly ? tc.badge : `${tc.badge}60`}`, padding:"1px 5px", borderRadius:99, letterSpacing:0.3, whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:3 }}><img src={tc.icon} style={{width:10,height:10,objectFit:"contain",display:"block"}} />{label}</span>
        ); })()}
        <RateDisplay rate={p.rate} isMobile={isMobile} version={version} />
        {p.levels&&<div style={{ fontSize:10, color:C.muted }}>Lv.{p.levels}</div>}
      </div>
    </Row>
  );
}

function ItemEntry({ it, itemKey, done, toggleItem, isMobile, choiceGroups, locked }) {
  const isPassed = !!(it.choiceGroup && choiceGroups?.[it.choiceGroup] && choiceGroups[it.choiceGroup] !== it.choiceId);
  const [showLightbox, setShowLightbox] = React.useState(false);
  const [hoverPos, setHoverPos]         = React.useState(null);
  const btnRef = React.useRef(null);

  const openLightbox  = e => { e.stopPropagation(); setShowLightbox(true); };
  const closeLightbox = () => setShowLightbox(false);

  const onPinEnter = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setHoverPos({
      right: window.innerWidth - r.left + 8,
      top:   Math.min(Math.max(r.top + r.height / 2, 80), window.innerHeight - 80),
    });
  };
  const onPinLeave = () => setHoverPos(null);

  return (
    <>
      <Row done={done} passed={isPassed} locked={locked} onClick={isPassed || locked ? undefined : () => { const tmM = it.name.match(/^(TM\d{2}|HM\d{2})\b/); const tmId = tmM ? tmM[1] : undefined; toggleItem(itemKey, { ...(it.choiceGroup ? {choiceGroup:it.choiceGroup, choiceId:it.choiceId} : {}), ...(tmId ? {tmId} : {}) }); }}>
        {itemSpriteUrl(it.name)&&<img src={itemSpriteUrl(it.name)} alt={it.name} style={{ width:24, height:24, imageRendering:"pixelated", flexShrink:0 }} />}
        <div style={{ flex:1 }}>
          <span style={{ fontSize:12, fontWeight:"600", color:it.hidden?C.gold:C.text }}>
            {it.hidden&&<span style={{ color:C.gold, marginRight:4 }}>★</span>}{it.name}
            {it.recurring&&<span style={{ fontSize:9, color:"#6bb8d4", marginLeft:6, fontWeight:"700", letterSpacing:0.5 }}>↻</span>}
            {it.surf&&<span style={{ fontSize:9, color:"#4a8fc4", marginLeft:6, fontWeight:"700", letterSpacing:0.5 }}>≈</span>}
            {it.heldBy&&<span style={{ fontSize:9, color:C.gold, marginLeft:6, fontWeight:"700", letterSpacing:0.5 }}>⇄</span>}
          </span>
          {it.note&&<div style={{ fontSize:10, color:C.muted, marginTop:2, lineHeight:1.5 }}>{it.note}</div>}
        </div>
        {it.img&&(
          <button ref={btnRef}
            onClick={isMobile ? openLightbox : e => e.stopPropagation()}
            onMouseEnter={isMobile ? undefined : onPinEnter}
            onMouseLeave={isMobile ? undefined : onPinLeave}
            style={{ background:"transparent", border:"none", cursor:"pointer", color:C.muted,
                     fontSize:14, padding:"0 4px", flexShrink:0, alignSelf:"center" }}
            title="View location screenshot">📍</button>
        )}
      </Row>

      {/* Desktop hover popover */}
      {hoverPos&&(
        <div style={{ position:"fixed", right:hoverPos.right, top:hoverPos.top,
                      transform:"translateY(-50%)", zIndex:300, pointerEvents:"none",
                      background:C.card, border:`1px solid ${C.border}`, borderRadius:8,
                      padding:8, boxShadow:"0 8px 32px rgba(0,0,0,0.7)", maxWidth:300 }}>
          <div style={{ fontSize:11, fontWeight:"600", color:C.text, marginBottom:6 }}>
            {it.hidden&&"★ "}{it.name}
          </div>
          <img src={it.img} alt={`${it.name} location`}
            style={{ width:"100%", display:"block", borderRadius:4 }} />
        </div>
      )}

      {/* Mobile tap lightbox */}
      {showLightbox&&(
        <div onClick={closeLightbox}
          style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,0.88)",
                   display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ position:"relative", maxWidth:"92vw" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:C.text, fontSize:13, fontWeight:"600" }}>
                {it.hidden&&"★ "}{it.name}
              </span>
              <button onClick={closeLightbox}
                style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted,
                         borderRadius:6, cursor:"pointer", padding:"2px 10px", fontSize:14, marginLeft:16 }}>✕</button>
            </div>
            <img src={it.img} alt={`${it.name} location`}
              style={{ maxWidth:"100%", maxHeight:"80vh", display:"block",
                       borderRadius:6, border:`1px solid ${C.border}` }} />
          </div>
        </div>
      )}
    </>
  );
}

function TrainerEntry({ t, areaId, done, toggleTrainer }) {
  const key = `${areaId}|${t.class}|${t.name}`;
  const tSprite = trainerSpriteUrl(t.class, t.name);
  return (
    <Row done={done} onClick={() => toggleTrainer(key)}>
      {tSprite&&<img src={tSprite} alt={t.class} style={{ width:48, height:48, imageRendering:"pixelated", flexShrink:0 }} />}
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:"600", marginBottom:2 }}>{t.class} {t.name}</div>
        {t.note&&<div style={{ fontSize:10, color:C.muted, marginBottom:5, lineHeight:1.4 }}>{t.note}</div>}
        {t.team?.length>0&&(
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {t.team.map((p,j)=>{
              const pid=allDexId(p.name);
              return (
                <div key={j} style={{ textAlign:"center" }}>
                  {pid&&<img src={pokeSpriteUrl(pid)} alt={p.name} style={{ width:32, height:32, imageRendering:"pixelated", display:"block", margin:"0 auto" }} />}
                  <div style={{ fontSize:9, color:C.muted, lineHeight:1.3 }}>{p.name}</div>
                  <div style={{ fontSize:9, color:C.muted }}>Lv.{p.level}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Row>
  );
}

function AreaCompletionSweep({ allDone, color, areaId }) {
  const prev = React.useRef({ areaId, allDone });
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    // Only fire when the SAME area transitions false→true (not on area switch).
    if (prev.current.areaId === areaId && !prev.current.allDone && allDone) {
      setPlaying(true);
      const t = setTimeout(() => setPlaying(false), 1300);
      prev.current = { areaId, allDone };
      return () => clearTimeout(t);
    }
    prev.current = { areaId, allDone };
  }, [allDone, areaId]);
  if (!playing) return null;
  return <div className="hgss-area-sweep-overlay" style={{ ["--sweep-color"]: `${color}66` }} />;
}

function Section({ title, count, color, children, onMarkAll, allDone, collapsible }) {
  const [open, setOpen] = useState(true);
  const prevDone = React.useRef(allDone);
  const [celebrating, setCelebrating] = useState(false);
  useEffect(() => {
    if (!prevDone.current && allDone) {
      setCelebrating(true);
      const t = setTimeout(() => setCelebrating(false), 1100);
      prevDone.current = allDone;
      return () => clearTimeout(t);
    }
    prevDone.current = allDone;
  }, [allDone]);
  return (
    <div className={celebrating ? "hgss-section-done" : ""} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden", position:"relative", ["--sec-glow"]: color }}>
      {celebrating && (
        <>
          <div className="hgss-sparkle-ring" style={{ width:32, height:32, top:"50%", right:14, marginTop:-16 }} />
          <div className="hgss-sparkle-ring" style={{ width:18, height:18, top:"50%", right:24, marginTop:-9, animationDelay:"0.15s" }} />
        </>
      )}
      <div onClick={collapsible ? () => setOpen(o => !o) : undefined}
        style={{ padding:"9px 14px", background:"rgba(0,0,0,0.15)", borderBottom: open ? `1px solid ${C.border}` : "none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor: collapsible ? "pointer" : "default", userSelect: collapsible ? "none" : undefined }}>
        <span style={{ fontSize:12, fontWeight:"600", display:"flex", alignItems:"center", gap:6 }}>
          {title}
          {collapsible && <span style={{ fontSize:10, color:C.muted }}>{open ? "▼" : "▶"}</span>}
        </span>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span className={celebrating ? "hgss-chip-pop" : ""} style={{ fontSize:11, color, padding:"2px 9px", background: celebrating ? `${color}33` : "rgba(0,0,0,0.25)", borderRadius:99, fontWeight:"600", transition:"background 0.3s" }}>{count}</span>
          {onMarkAll && open && (
            <button onClick={e => { e.stopPropagation(); onMarkAll(); }}
              title={allDone ? "Clear all" : "Mark all done"}
              style={{ fontSize:9, fontWeight:"700", padding:"2px 7px", border:`1px solid ${allDone ? C.muted : color}`, borderRadius:99, cursor:"pointer", background:"transparent", color: allDone ? C.muted : color, letterSpacing:0.5, transition:"all 0.12s" }}>
              {allDone ? "CLEAR" : "ALL ✓"}
            </button>
          )}
        </div>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}

function Row({ done, passed, onClick, locked, children }) {
  if (passed) return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", minHeight:44, borderBottom:`1px solid ${C.border}20`, opacity:0.3, cursor:"default" }}>
      <div style={{ width:18, height:18, border:`2px solid ${C.border}`, borderRadius:4, flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:C.muted, fontSize:13, lineHeight:1, fontWeight:"700" }}>—</span>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", flex:1 }}>{children}</div>
    </div>
  );
  return (
    <div onClick={locked ? undefined : onClick} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", minHeight:44, cursor: locked ? "default" : "pointer", borderBottom:`1px solid ${C.border}20`, background: done?"rgba(74,175,116,0.05)":"transparent", transition:"background 0.1s" }}
      onMouseEnter={locked ? undefined : e => { e.currentTarget.style.background = done?"rgba(74,175,116,0.09)":"rgba(255,255,255,0.025)"; }}
      onMouseLeave={locked ? undefined : e => { e.currentTarget.style.background = done?"rgba(74,175,116,0.05)":"transparent"; }}>
      <div style={{ width:18, height:18, border:`2px solid ${done ? C.green : C.border}`, background:done?C.green:"transparent", borderRadius:4, flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.12s" }}>
        {done && <span style={{ color:"#000", fontSize:10, fontWeight:"700", lineHeight:1 }}>✓</span>}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", flex:1, opacity:done?0.4:1, textDecoration:done?"line-through":"none" }}>{children}</div>
    </div>
  );
}

function Tag({ color, children }) {
  return <span style={{ marginLeft:5, fontSize:9, color, border:`1px solid ${color}`, padding:"0 4px", borderRadius:3, verticalAlign:"middle", fontWeight:"600" }}>{children}</span>;
}

// ─── ENCOUNTER MATH ──────────────────────────────────────────────────────────
function parseRatePct(str) {
  if (!str) return null;
  const m = str.match(/^(\d+(?:\.\d+)?)%/);
  return m ? parseFloat(m[1]) : null;
}
function encMath(pct) {
  if (!pct || pct <= 0) return null;
  const p = pct / 100;
  return {
    avg:    Math.ceil(1 / p),
    conf95: Math.ceil(Math.log(0.05) / Math.log(1 - p)),
  };
}

// Parses rate strings like "5% FR / 10% LG" into split FR/LG pills,
// or renders a plain rate badge for simple values like "50%" or "×1".
// Hover (desktop) or tap (mobile) shows encounter math tooltip.
function RateDisplay({ rate, isMobile, version }) {
  const [pos, setPos] = useState(null);
  const ref = React.useRef(null);
  if (!rate) return null;

  // Resolve "HG X%/SS Y%" to the selected-version token before display logic
  const hgssMatch   = rate.match(/^HG\s+(\S+)\/SS\s+(\S+)/);
  const displayRate = hgssMatch ? (version === "hg" ? hgssMatch[1] : hgssMatch[2]) : rate;

  const splitMatch = displayRate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
  const isOneTime  = displayRate === "×1";

  const frPct     = splitMatch ? parseRatePct(splitMatch[1]) : null;
  const lgPct     = splitMatch ? parseRatePct(splitMatch[2]) : null;
  const simplePct = (!splitMatch && !isOneTime) ? parseRatePct(displayRate) : null;
  const frMath    = frPct     ? encMath(frPct)     : null;
  const lgMath    = lgPct     ? encMath(lgPct)     : null;
  const simpleMath = simplePct ? encMath(simplePct) : null;
  const hasMath   = !!(frMath || lgMath || simpleMath);

  const show = e => {
    if (!ref.current || !hasMath) return;
    e.stopPropagation();
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  };
  const hide   = ()  => setPos(null);
  const toggle = e   => { e.stopPropagation(); pos ? hide() : show(e); };

  const badge = splitMatch ? (
    <div style={{ display:"flex", flexDirection:"column", gap:3, alignItems:"flex-end" }}>
      <span style={{ fontSize:11, fontWeight:"700", color:C.hgGold, background:"rgba(200,82,82,0.12)", border:"1px solid rgba(200,82,82,0.3)", padding:"1px 6px", borderRadius:4, whiteSpace:"nowrap" }}>FR {splitMatch[1]}</span>
      <span style={{ fontSize:11, fontWeight:"700", color:C.ssSilver, background:"rgba(63,168,74,0.12)", border:"1px solid rgba(63,168,74,0.3)", padding:"1px 6px", borderRadius:4, whiteSpace:"nowrap" }}>LG {splitMatch[2]}</span>
    </div>
  ) : isOneTime ? (
    <span style={{ fontSize:11, fontWeight:"700", color:"#c8960a", background:"rgba(200,150,10,0.12)", border:"1px solid rgba(200,150,10,0.3)", padding:"1px 6px", borderRadius:4, whiteSpace:"nowrap" }}>×1</span>
  ) : (() => {
    const num = simplePct || 0;
    const rateColor = num >= 30 ? "#5ab0d8" : num >= 10 ? "#d4b840" : "#9878cc";
    return <span style={{ fontSize:12, fontWeight:"700", color:rateColor, whiteSpace:"nowrap" }}>{displayRate}</span>;
  })();

  if (isMobile) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2 }}>
        {badge}
        {hasMath && (
          <div style={{ fontSize:9, color:C.muted, textAlign:"right", lineHeight:1.3 }}>
            {splitMatch ? (
              <>
                {frMath && <span style={{ color:"rgba(200,82,82,0.7)" }}>FR ~{frMath.avg} / ≤{frMath.conf95}</span>}
                {frMath && lgMath && <br />}
                {lgMath && <span style={{ color:"rgba(63,168,74,0.7)" }}>LG ~{lgMath.avg} / ≤{lgMath.conf95}</span>}
              </>
            ) : (
              <span>~{simpleMath.avg} avg · ≤{simpleMath.conf95} for 95%</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <span ref={ref}
        onMouseEnter={show} onMouseLeave={hide} onClick={toggle}
        style={{ cursor: hasMath ? "help" : "default", display:"inline-flex" }}>
        {badge}
      </span>
      {pos && hasMath && (
        <div style={{ position:"fixed", left:pos.x, top:pos.y - 8,
                      transform:"translate(-50%,calc(-100% - 4px))", zIndex:400,
                      background:C.card, border:`1px solid ${C.border}`, borderRadius:8,
                      padding:"8px 12px", boxShadow:"0 8px 32px rgba(0,0,0,0.75)",
                      pointerEvents:"none", minWidth:170 }}>
          {splitMatch ? (
            <>
              {frMath && <div style={{ fontSize:11, color:C.hgGold, marginBottom:3 }}>
                <b>FR</b> — ~{frMath.avg} avg · ≤{frMath.conf95} for 95%
              </div>}
              {lgMath && <div style={{ fontSize:11, color:C.ssSilver }}>
                <b>LG</b> — ~{lgMath.avg} avg · ≤{lgMath.conf95} for 95%
              </div>}
            </>
          ) : (
            <div style={{ fontSize:11, color:C.text }}>
              ~{simpleMath.avg} avg · ≤{simpleMath.conf95} for 95%
            </div>
          )}
          <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>encounters to see this Pokémon</div>
        </div>
      )}
    </>
  );
}

function Empty({ text }) {
  return <div style={{ padding:20, textAlign:"center", fontSize:12, color:C.muted }}>{text}</div>;
}

// ─── GYM MATCHUP TAB ─────────────────────────────────────────────────────────
function GymTab({ isMobile }) {
  const [selId, setSelId] = React.useState("falkner");
  const gym = GYM_DATA.find(g => g.id === selId) || GYM_DATA[0];
  const gymTypes = [...new Set(gym.team.flatMap(p => p.types))];
  const attackAdvantage = TYPES_17.filter(atk => gymTypes.some(def => (TYPE_CHART[atk]?.[def] || 1) >= 2));
  const gymThreats      = TYPES_17.filter(def => gymTypes.some(atk => (TYPE_CHART[atk]?.[def] || 1) >= 2));
  const E4_IDS = new Set(["will","koga","bruno","karen","lance","red"]);

  const savedTeam = React.useMemo(() => {
    try {
      const r = localStorage.getItem("hgss-dream-team-v1");
      if (!r) return null;
      const { favorite, pins, version } = JSON.parse(r);
      if (!favorite) return null;
      return buildDreamTeamV2(favorite, pins, version);
    } catch { return null; }
  }, []);

  const teamPicks = React.useMemo(() => {
    if (!savedTeam) return null;
    return savedTeam.filter(name => {
      const cand = DT_CANDIDATES.find(c => c.name === name);
      if (!cand) return false;
      return cand.types.some(myType => gymTypes.some(gymType => (TYPE_CHART[myType]?.[gymType] || 1) >= 2));
    });
  }, [savedTeam, gymTypes]);

  const SideBtn = ({ g }) => {
    const isSel = g.id === selId;
    return (
      <button onClick={() => setSelId(g.id)} style={{
        display:"flex", alignItems:"center", gap:8, padding:"8px 10px", width:"100%",
        background: isSel ? "rgba(74,143,196,0.12)" : "transparent",
        borderLeft: isSel ? `3px solid #4a8fc4` : `3px solid transparent`,
        border:"none", borderBottom:`1px solid ${C.border}`, cursor:"pointer",
        textAlign:"left", fontFamily:"'DM Sans',system-ui,sans-serif",
      }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:"700", color: isSel ? "#4a8fc4" : C.text }}>{g.name}</div>
          <div style={{ fontSize:10, color:C.muted }}>{g.city}</div>
        </div>
        <div style={{ display:"flex", gap:2, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:80 }}>
          {g.specialty.map(t => <span key={t} style={{ fontSize:8, color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"1px 4px", borderRadius:3, fontWeight:"700" }}>{t}</span>)}
        </div>
      </button>
    );
  };

  const ChipBtn = ({ g }) => {
    const isSel = g.id === selId;
    return (
      <button onClick={() => setSelId(g.id)} style={{
        flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
        padding:"8px 12px", borderRadius:8, cursor:"pointer",
        background: isSel ? "rgba(74,143,196,0.15)" : "rgba(0,0,0,0.2)",
        border:`1px solid ${isSel ? "#4a8fc4" : C.border}`,
        fontFamily:"'DM Sans',system-ui,sans-serif",
      }}>
        <span style={{ fontSize:12, fontWeight:"700", color: isSel ? "#4a8fc4" : C.text, whiteSpace:"nowrap" }}>{g.name}</span>
        <div style={{ display:"flex", gap:3 }}>
          {g.specialty.map(t => <span key={t} style={{ fontSize:9, color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"2px 6px", borderRadius:3, fontWeight:"700" }}>{t}</span>)}
        </div>
      </button>
    );
  };

  const detail = (
    <div style={{ flex:1, overflowY:"auto", padding: isMobile ? "14px 14px 24px" : 20 }}>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:C.muted, letterSpacing:1, textTransform:"uppercase", marginBottom:3 }}>{gym.city}</div>
        <div style={{ fontSize: isMobile ? 19 : 22, fontWeight:"700", color:C.text }}>{gym.name}</div>
        {gym.badge && <div style={{ fontSize:11, color:C.gold, marginTop:2 }}>{gym.badge}</div>}
        {gym.note && <div style={{ fontSize:11, color:C.muted, marginTop:8, padding:"6px 10px", background:"rgba(255,255,255,0.04)", borderRadius:6, borderLeft:`2px solid ${C.border}` }}>{gym.note}</div>}
      </div>

      {/* Team */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Team</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {gym.team.map((p, i) => {
            const dId = allDexId(p.name);
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:C.card, borderRadius:8, border:`1px solid ${C.border}` }}>
                {dId ? <img src={pokeSpriteUrl(dId)} alt={p.name} width={36} height={36} style={{ imageRendering:"pixelated", flexShrink:0 }} /> : <div style={{ width:36, flexShrink:0 }} />}
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:"700", color:C.text }}>{p.name}</div>
                  <div style={{ display:"flex", gap:4, marginTop:2 }}>
                    {p.types.map(t => <span key={t} style={{ fontSize:9, color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"1px 6px", borderRadius:3, fontWeight:"700" }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:12, color:C.muted, fontWeight:"600" }}>Lv {p.level}</div>
                  {p.note && <div style={{ fontSize:9, color:C.muted, fontStyle:"italic", maxWidth:130 }}>{p.note}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Type matchup summary */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom: teamPicks ? 20 : 0 }}>
        <div style={{ flex:1, minWidth:140, padding:"12px 14px", background:C.card, borderRadius:8, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.green, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8, fontWeight:"700" }}>Super effective against them</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {attackAdvantage.length === 0
              ? <span style={{ fontSize:11, color:C.muted }}>None</span>
              : attackAdvantage.map(t => <span key={t} style={{ fontSize:11, color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"3px 10px", borderRadius:4, fontWeight:"700" }}>{t}</span>)}
          </div>
        </div>
        <div style={{ flex:1, minWidth:140, padding:"12px 14px", background:C.card, borderRadius:8, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:"#e85c5c", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8, fontWeight:"700" }}>Their types are SE against</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {gymThreats.length === 0
              ? <span style={{ fontSize:11, color:C.muted }}>None</span>
              : gymThreats.map(t => <span key={t} style={{ fontSize:11, color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"3px 10px", borderRadius:4, fontWeight:"700" }}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* Dream team picks */}
      {teamPicks && (
        <div>
          <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:8 }}>
            <div style={{ fontSize:9, color:C.gold, letterSpacing:1.5, textTransform:"uppercase", fontWeight:"700" }}>Your dream team picks</div>
            <div style={{ fontSize:10, color:C.muted }}>aim for Lv {Math.max(...gym.team.map(p => p.level))}</div>
          </div>
          {teamPicks.length === 0
            ? <div style={{ fontSize:11, color:C.muted, padding:"8px 12px", background:C.card, borderRadius:8, border:`1px solid ${C.border}` }}>None of your team members have a type advantage here.</div>
            : <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {teamPicks.map(name => {
                  const dId = allDexId(name);
                  const cand = DT_CANDIDATES.find(c => c.name === name);
                  return (
                    <div key={name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 10px", background:C.card, borderRadius:8, border:`1px solid ${C.gold}`, minWidth:68, textAlign:"center" }}>
                      {dId && <img src={pokeSpriteUrl(dId)} alt={name} width={36} height={36} style={{ imageRendering:"pixelated" }} />}
                      <span style={{ fontSize:9, color:C.gold, fontWeight:"600" }}>{name}</span>
                      <div style={{ display:"flex", gap:2, flexWrap:"wrap", justifyContent:"center" }}>
                        {cand?.types.map(t => <span key={t} style={{ fontSize:7, color:"#fff", background:TYPE_COLORS[t]||"#888", padding:"1px 4px", borderRadius:2, fontWeight:"700" }}>{t}</span>)}
                      </div>
                    </div>
                  );
                })}
              </div>
          }
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
        {/* Horizontal chip selector */}
        <div style={{ flexShrink:0, background:C.card, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", padding:"8px 12px 4px" }}>Gym Leaders (16)</div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", padding:"4px 12px 10px" }}>
            {GYM_DATA.filter(g => !E4_IDS.has(g.id)).map(g => <ChipBtn key={g.id} g={g} />)}
          </div>
          <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", padding:"6px 12px 4px", borderTop:`1px solid ${C.border}` }}>Elite Four · Lance · Red</div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", padding:"4px 12px 10px" }}>
            {GYM_DATA.filter(g => E4_IDS.has(g.id)).map(g => <ChipBtn key={g.id} g={g} />)}
          </div>
        </div>
        {detail}
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
      {/* Sidebar */}
      <div style={{ width:190, flexShrink:0, borderRight:`1px solid ${C.border}`, background:C.card, overflowY:"auto" }}>
        <div style={{ padding:"6px 10px 4px", fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", borderBottom:`1px solid ${C.border}` }}>Gym Leaders (16)</div>
        {GYM_DATA.filter(g => !E4_IDS.has(g.id)).map(g => <SideBtn key={g.id} g={g} />)}
        <div style={{ padding:"6px 10px 4px", fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, borderTop:`1px solid ${C.border}`, marginTop:4 }}>Elite Four · Lance · Red</div>
        {GYM_DATA.filter(g => E4_IDS.has(g.id)).map(g => <SideBtn key={g.id} g={g} />)}
      </div>
      {detail}
    </div>
  );
}

// ─── BATTLE REFERENCE TAB ────────────────────────────────────────────────────
function BattleTab() {
  const [query, setQuery]     = React.useState("");
  const [selected, setSelected] = React.useState(null);

  const trimmed = query.trim().toLowerCase();
  const results = React.useMemo(() => {
    if (!trimmed) return [];
    const all = Object.keys(POKEMON_TYPES);
    const starts = all.filter(n => n.toLowerCase().startsWith(trimmed));
    const contains = all.filter(n => !n.toLowerCase().startsWith(trimmed) && n.toLowerCase().includes(trimmed));
    return [...starts, ...contains].slice(0, 8);
  }, [trimmed]);

  const handleSelect = name => { setSelected(name); setQuery(name); };
  const handleChange = e => { setQuery(e.target.value); setSelected(null); };

  const types  = selected ? POKEMON_TYPES[selected] : null;
  const chart  = types ? getDefensiveChart(types) : null;
  const dexId  = selected ? allDexId(selected) : null;
  const showDropdown = results.length > 0 && !selected;

  const weakRows = chart ? [
    { mult:"4×", color:"#e04040", bg:"rgba(224,64,64,0.10)",  types: TYPES_17.filter(t => chart[t] === 4) },
    { mult:"2×", color:"#d06020", bg:"rgba(208,96,32,0.08)",  types: TYPES_17.filter(t => chart[t] === 2) },
  ].filter(r => r.types.length > 0) : [];

  const otherRows = chart ? [
    { mult:"½×", color:"#4a9f68", types: TYPES_17.filter(t => chart[t] === 0.5) },
    { mult:"¼×", color:"#2a7f50", types: TYPES_17.filter(t => chart[t] === 0.25) },
    { mult:"0×", color:"#888",    types: TYPES_17.filter(t => chart[t] === 0) },
  ].filter(r => r.types.length > 0) : [];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", color:C.text }}>
      {/* Search */}
      <div style={{ position:"relative", marginBottom:20 }}>
        <input value={query} onChange={handleChange}
          placeholder="Search Pokémon…"
          autoComplete="off"
          onKeyDown={e => { if (e.key === "Enter" && results.length > 0) handleSelect(results[0]); }}
          style={{ width:"100%", boxSizing:"border-box", padding:"10px 14px", fontSize:16,
                   fontFamily:"'DM Sans',system-ui,sans-serif", background:"rgba(0,0,0,0.25)",
                   border:`1px solid ${C.border}`, borderRadius: showDropdown ? "6px 6px 0 0" : 6,
                   color:C.text, outline:"none" }} />
        {showDropdown && (
          <div style={{ position:"absolute", top:"100%", left:0, right:0, zIndex:50,
                        background:C.card, border:`1px solid ${C.border}`, borderTop:"none",
                        borderRadius:"0 0 6px 6px", overflow:"hidden" }}>
            {results.map(name => {
              const id = allDexId(name);
              return (
                <div key={name} onClick={() => handleSelect(name)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px",
                           cursor:"pointer", borderBottom:`1px solid ${C.border}20` }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  {id && <img src={pokeSpriteUrl(id)} alt={name} style={{ width:28, height:28, imageRendering:"pixelated", flexShrink:0 }} />}
                  <span style={{ fontSize:13, fontWeight:"600" }}>{name}</span>
                  <div style={{ display:"flex", gap:4, marginLeft:"auto" }}>
                    {POKEMON_TYPES[name].map(t => <TypeBadge key={t} type={t} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Result */}
      {selected && types && (
        <>
          {/* Pokémon identity */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20,
                        padding:"12px 16px", background:"rgba(0,0,0,0.18)", borderRadius:8 }}>
            {dexId && <img src={pokeSpriteUrl(dexId)} alt={selected}
              style={{ width:56, height:56, imageRendering:"pixelated", flexShrink:0 }} />}
            <div>
              <div style={{ fontSize:18, fontWeight:"700", color:C.text, marginBottom:6 }}>{selected}</div>
              <div style={{ display:"flex", gap:5 }}>
                {types.map(t => <TypeBadge key={t} type={t} />)}
              </div>
            </div>
          </div>

          {/* Weaknesses */}
          {weakRows.length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:10, letterSpacing:2, color:C.muted, textTransform:"uppercase", marginBottom:8 }}>Super effective against</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {weakRows.map(r => (
                  <div key={r.mult} style={{ display:"flex", alignItems:"center", gap:8,
                                             padding:"8px 12px", background:r.bg, borderRadius:6,
                                             border:`1px solid ${r.color}30` }}>
                    <span style={{ fontSize:13, fontWeight:"800", color:r.color, minWidth:24, textAlign:"right", flexShrink:0 }}>{r.mult}</span>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {r.types.map(t => <TypeBadge key={t} type={t} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {weakRows.length === 0 && (
            <div style={{ marginBottom:16, padding:"10px 14px", background:"rgba(0,0,0,0.15)", borderRadius:6,
                          fontSize:12, color:C.muted }}>No type weaknesses.</div>
          )}

          {/* Resistances / immunities */}
          {otherRows.length > 0 && (
            <div>
              <div style={{ fontSize:10, letterSpacing:2, color:C.muted, textTransform:"uppercase", marginBottom:8 }}>Resists / immune</div>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                {otherRows.map(r => (
                  <div key={r.mult} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:11, fontWeight:"700", color:r.color, minWidth:24, textAlign:"right", flexShrink:0 }}>{r.mult}</span>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {r.types.map(t => <TypeBadge key={t} type={t} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!selected && !trimmed && (
        <div style={{ textAlign:"center", color:C.muted, fontSize:12, marginTop:40, lineHeight:2 }}>
          Search any Pokémon to see its type weaknesses.
        </div>
      )}
    </div>
  );
}

// ─── EVOLUTION PLANNER TAB ────────────────────────────────────────────────────
function EvoTab({ caught, toggleCaught }) {
  const regionalEvos = React.useMemo(() => EVO_METHODS.filter(e => e.evo in DEX_ID), []);

  // Build full chains as flat paths: ["Bulbasaur", {how,group}, "Ivysaur", {how,group}, "Venusaur"]
  const chains = React.useMemo(() => {
    const preMap = {};
    regionalEvos.forEach(e => { if (!preMap[e.pre]) preMap[e.pre] = []; preMap[e.pre].push(e); });
    const evoSet = new Set(regionalEvos.map(e => e.evo));
    const roots = [...new Set(regionalEvos.map(e => e.pre))].filter(p => !evoSet.has(p));
    function buildPaths(name, path) {
      const nexts = preMap[name] || [];
      if (nexts.length === 0) return [path];
      return nexts.flatMap(n => buildPaths(n.evo, [...path, { how: n.how, group: n.group }, n.evo]));
    }
    const all = roots.flatMap(r => buildPaths(r, [r]));
    all.sort((a, b) => (DEX_ID[a[0]] || 999) - (DEX_ID[b[0]] || 999));
    return all;
  }, [regionalEvos]);

  const [showAll, setShowAll] = React.useState(false);

  const displayed = React.useMemo(() => {
    if (showAll) return chains;
    return chains.filter(chain => {
      for (let i = 0; i < chain.length - 2; i += 2)
        if (caught[chain[i]] && !caught[chain[i + 2]]) return true;
      return false;
    });
  }, [chains, caught, showAll]);

  const totalPending = React.useMemo(() =>
    regionalEvos.filter(e => caught[e.pre] && !caught[e.evo]).length,
    [regionalEvos, caught]);

  const METHOD_COLOR = { level: C.green, stone: C.gold, trade: "#a87acc", friend: "#e85c8a" };
  const GROUP_LABEL  = { level: "Level-Up", stone: "Stone Evolution", trade: "Trade Evolution", friend: "Friendship" };
  const GROUP_ORDER  = ["level", "stone", "trade", "friend"];

  // Group displayed chains by their final evolution's method
  const grouped = React.useMemo(() => {
    const g = { level:[], stone:[], trade:[], friend:[] };
    displayed.forEach(chain => {
      const lastMethod = chain[chain.length - 2];
      const key = lastMethod?.group || "level";
      if (g[key]) g[key].push(chain);
    });
    return g;
  }, [displayed]);

  const renderChain = (chain, ci) => (
    <div key={ci} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:C.card, borderRadius:8, border:`1px solid ${C.border}`, flexWrap:"wrap" }}>
      {chain.map((item, idx) => {
        if (typeof item === "string") {
          const dexId = allDexId(item);
          const isCaught = !!caught[item];
          const prevName = idx >= 2 ? chain[idx - 2] : null;
          const isPending = prevName && caught[prevName] && !isCaught;
          return (
            <div key={idx} onClick={() => toggleCaught(item)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:48, cursor:"pointer", position:"relative" }}>
              {isPending && <div style={{ position:"absolute", top:-3, right:2, width:7, height:7, borderRadius:"50%", background:C.gold, border:`1px solid ${C.bg}` }} />}
              {dexId
                ? <img src={pokeSpriteUrl(dexId)} alt={item} width={38} height={38} style={{ imageRendering:"pixelated", opacity: isCaught ? 1 : 0.25, filter: isCaught ? "none" : "brightness(0)" }} />
                : <div style={{ width:38, height:38 }} />}
              <span style={{ fontSize:8, color: isCaught ? C.green : C.muted, textAlign:"center", maxWidth:52 }}>{item}</span>
            </div>
          );
        } else {
          const col = METHOD_COLOR[item.group] || C.muted;
          return (
            <div key={idx} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
              <span style={{ color:C.muted, fontSize:14, lineHeight:1 }}>→</span>
              <span style={{ fontSize:8, color:col, background:`${col}18`, border:`1px solid ${col}44`, borderRadius:4, padding:"1px 5px", whiteSpace:"nowrap" }}>{item.how}</span>
            </div>
          );
        }
      })}
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", padding:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:16, fontWeight:"700", color:C.text }}>Evolution Planner</div>
          <div style={{ fontSize:11, color: totalPending > 0 ? C.muted : C.green, marginTop:2 }}>
            {totalPending > 0 ? `${totalPending} evolution${totalPending !== 1 ? "s" : ""} pending` : "All evolutions complete!"}
          </div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:C.muted }}>Show all chains</span>
          <button onClick={() => setShowAll(v => !v)} style={{
            padding:"4px 12px", fontSize:11, borderRadius:5, cursor:"pointer",
            border:`1px solid ${showAll ? "#4a8fc4" : C.border}`,
            background: showAll ? "rgba(74,143,196,0.15)" : "transparent",
            color: showAll ? "#4a8fc4" : C.muted, fontFamily:"'DM Sans',system-ui,sans-serif",
          }}>{showAll ? "On" : "Off"}</button>
        </div>
      </div>

      {displayed.length === 0 && (
        <div style={{ textAlign:"center", padding:"40px 20px", color: totalPending === 0 ? C.green : C.muted, fontSize:13 }}>
          {totalPending === 0 ? "All evolutions complete!" : "Catch some Pokémon to see pending evolutions here."}
        </div>
      )}

      {GROUP_ORDER.map(key => {
        const entries = grouped[key];
        if (!entries || entries.length === 0) return null;
        const col = METHOD_COLOR[key];
        return (
          <div key={key} style={{ marginBottom:24 }}>
            <div style={{ fontSize:9, color:col, letterSpacing:1.5, textTransform:"uppercase", marginBottom:10, fontWeight:"700" }}>{GROUP_LABEL[key]}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {entries.map((chain, ci) => renderChain(chain, ci))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CEREMONY HOST (Tier 1 motion) ───────────────────────────────────────
// Fullscreen takeover for rare moments — 8th badge, legendary catch.
// Events are pushed via push(); they run in FIFO order, one at a time.
// Johto legendary beasts + birds + other key one-timers
const LEGENDARY_NAMES = new Set(["Raikou","Entei","Suicune","Lugia","Ho-Oh","Celebi","Mewtwo","Mew","Articuno","Zapdos","Moltres"]);
const LEGENDARY_DEX_ID = { Raikou:243, Entei:244, Suicune:245, Lugia:249, "Ho-Oh":250, Celebi:251, Mewtwo:150, Mew:151, Articuno:144, Zapdos:145, Moltres:146 };
const LEGENDARY_COLOR  = { Raikou:"#f5d24a", Entei:"#e85c2a", Suicune:"#7ec8e3", Lugia:"#a8c8f0", "Ho-Oh":"#ff6b35", Celebi:"#a8d878", Mewtwo:"#a87acc", Mew:"#f48ec0", Articuno:"#7ec8e3", Zapdos:"#f5d24a", Moltres:"#ff6b35" };

function CeremonyHost({ queue, onDone }) {
  const current = queue[0];
  const [closing, setClosing] = React.useState(false);

  React.useEffect(() => {
    if (!current) return;
    setClosing(false);
    const auto = setTimeout(() => setClosing(true), 4200);
    const close = setTimeout(() => onDone(current.id), 4600);
    const onKey = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { setClosing(true); setTimeout(() => onDone(current.id), 280); } };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(auto); clearTimeout(close); window.removeEventListener("keydown", onKey); };
  }, [current?.id]);

  if (!current) return null;
  const c = current;
  const dismiss = () => { setClosing(true); setTimeout(() => onDone(c.id), 280); };

  return (
    <div onClick={dismiss}
      className={closing ? "hgss-cer-bg-out" : "hgss-cer-bg"}
      style={{
        position:"fixed", inset:0, zIndex:9999, cursor:"pointer",
        background:"radial-gradient(ellipse at center, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.94) 70%)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
      }}>
      {/* Expanding ring(s) */}
      <div style={{ position:"absolute", left:"50%", top:"50%", pointerEvents:"none" }}>
        {[0, 0.18, 0.36].map((d, i) => (
          <div key={i} className="hgss-cer-ring" style={{
            position:"absolute", left:0, top:0, width:160, height:160,
            border:`2px solid ${c.color}`, borderRadius:"50%",
            transformOrigin:"center",
            animationDelay:`${d}s`, opacity: 0.9 - i*0.2,
          }} />
        ))}
      </div>

      {/* Centerpiece */}
      <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"40px 60px", maxWidth:"90vw", textAlign:"center" }}>
        {/* Sprite / icon */}
        <div className="hgss-cer-sprite" style={{ position:"relative", width:180, height:180, display:"flex", alignItems:"center", justifyContent:"center", filter:`drop-shadow(0 0 28px ${c.color}cc)` }}>
          {c.sprite}
          {/* Shine sweep */}
          <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", mixBlendMode:"screen" }}>
            <div className="hgss-cer-shine" style={{ position:"absolute", top:0, bottom:0, width:60,
              background:`linear-gradient(90deg, transparent, ${c.color}cc, transparent)`, filter:"blur(8px)" }} />
          </div>
        </div>
        <div className="hgss-cer-label" style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:c.color, fontFamily:"'JetBrains Mono',ui-monospace,monospace", fontWeight:"700" }}>{c.label}</div>
        <div className="hgss-cer-title" style={{ fontSize:42, fontWeight:"700", letterSpacing:-1, color:"#fff", fontFamily:"'Space Grotesk',system-ui,sans-serif", lineHeight:1.05 }}>{c.title}</div>
        {c.subtitle && <div className="hgss-cer-sub" style={{ fontSize:14, color:"rgba(255,255,255,0.7)", maxWidth:480, lineHeight:1.5 }}>{c.subtitle}</div>}
        <div className="hgss-cer-cta" style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:18, letterSpacing:2, textTransform:"uppercase" }}>Click or press Esc to continue</div>
      </div>
    </div>
  );
}

function MiniBar({ label, done, total, color }) {
  const p = pct(done, total);
  return (
    <div style={{ flex:1, minWidth:130 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
        <span style={{ color:C.muted }}>{label}</span>
        <span style={{ color, fontWeight:"600" }}>
          <TickNumber value={done} color={color} />/{total}{total?` (${p}%)`:""}
        </span>
      </div>
      <div style={{ height:5, background:"rgba(0,0,0,0.3)", borderRadius:99, overflow:"hidden" }}>
        <div className="hgss-fill-bar" style={{ height:"100%", width:`${p}%`, background:color, borderRadius:99 }} />
      </div>
    </div>
  );
}

// ─── REMAINING TAB ───────────────────────────────────────────────────────────

function RemainingTab({ items, toggleItem, trainers, toggleTrainer, choiceGroups, setAreaId, setTabAndSave }) {
  const { useState: useS, useMemo: useM } = React;
  const [section, setSection] = useS("items");

  const remainingItems = useM(() => {
    const isPassed = it => !!(it.choiceGroup && choiceGroups?.[it.choiceGroup] && choiceGroups[it.choiceGroup] !== it.choiceId);
    const skip = it => isPassed(it) || it.recurring || it.optional;
    const result = [];
    for (const area of AREAS) {
      if (!AUDITED_PARTS.has(area.part)) continue;
      if (area.floors) {
        for (const floor of area.floors) {
          for (let i = 0; i < (floor.items || []).length; i++) {
            const it = floor.items[i];
            if (skip(it)) continue;
            const key = floorItemKey(area.id, floor.label, i);
            if (!items[key]) result.push({ area, floorLabel: floor.label, it, key });
          }
        }
      } else {
        for (let i = 0; i < (area.items || []).length; i++) {
          const it = area.items[i];
          if (skip(it)) continue;
          const key = flatItemKey(area.id, i);
          if (!items[key]) result.push({ area, floorLabel: null, it, key });
        }
      }
    }
    return result;
  }, [items, choiceGroups]);

  const remainingTrainers = useM(() => {
    const result = [];
    for (const area of AREAS) {
      if (!AUDITED_PARTS.has(area.part)) continue;
      for (const t of flattenTrainers(area)) {
        const key = `${area.id}|${t.class}|${t.name}`;
        if (!trainers[key]) result.push({ area, t, key });
      }
    }
    return result;
  }, [trainers]);

  const toGroups = list => {
    const groups = [];
    let lastId = null;
    for (const entry of list) {
      if (entry.area.id !== lastId) { groups.push({ area: entry.area, entries: [] }); lastId = entry.area.id; }
      groups[groups.length - 1].entries.push(entry);
    }
    return groups;
  };

  const grouped     = section === "items" ? toGroups(remainingItems) : toGroups(remainingTrainers);
  const totalLeft   = section === "items" ? remainingItems.length    : remainingTrainers.length;
  const allDone     = remainingItems.length === 0 && remainingTrainers.length === 0;

  const markItem = entry => {
    const { it, key } = entry;
    const tmM = it.name.match(/^(TM\d{2}|HM\d{2})\b/);
    const tmId = tmM ? tmM[1] : undefined;
    toggleItem(key, { ...(it.choiceGroup ? { choiceGroup:it.choiceGroup, choiceId:it.choiceId } : {}), ...(tmId ? { tmId } : {}) });
  };

  const goToArea = area => { setAreaId(area.id); setTabAndSave("areas"); };

  const rowStyle = { display:"flex", alignItems:"center", gap:10, padding:"7px 10px", borderRadius:6,
    cursor:"pointer", marginBottom:3, background:"rgba(0,0,0,0.18)", border:`1px solid ${C.border}` };

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      {/* Header */}
      <div style={{ padding:"14px 20px 10px", borderBottom:`1px solid ${C.border}`, background:C.card }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <span style={{ fontSize:11, color:C.muted, letterSpacing:2, textTransform:"uppercase" }}>Remaining</span>
          <span style={{ fontSize:11, fontWeight:"600", color: allDone ? C.green : C.hgGold }}>
            {allDone ? "All done!" : `${totalLeft} left in view`}
          </span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {[["items",`Items (${remainingItems.length})`],["trainers",`Trainers (${remainingTrainers.length})`]].map(([s,label]) => (
            <button key={s} onClick={() => setSection(s)} style={{
              padding:"4px 14px", fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',system-ui,sans-serif",
              background: section===s ? "var(--hgss-accent)" : "rgba(0,0,0,0.25)",
              color: section===s ? "#fff" : C.muted,
              border:`1px solid ${section===s ? "var(--hgss-accent)" : C.border}`,
              borderRadius:20, fontWeight: section===s ? "600" : "400",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ padding:"12px 16px" }}>
        {grouped.length === 0 && (
          <div style={{ textAlign:"center", padding:"48px 20px", color:C.green, fontSize:13 }}>
            All {section} complete!
          </div>
        )}
        {grouped.map(({ area, entries }) => (
          <div key={area.id} style={{ marginBottom:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
              <span style={{ fontSize:10, fontWeight:"700", letterSpacing:1.5, textTransform:"uppercase", color:C.muted }}>{area.name}</span>
              <span style={{ fontSize:9, color:C.muted, opacity:0.5 }}>{area.part}</span>
              <button onClick={() => goToArea(area)} style={{
                marginLeft:"auto", fontSize:10, color:"var(--hgss-accent)", background:"none",
                border:"none", cursor:"pointer", padding:"0 2px", opacity:0.85,
              }}>→ Go</button>
            </div>
            {section === "items" ? entries.map(entry => (
              <div key={entry.key} style={rowStyle}
                onMouseEnter={e => e.currentTarget.style.borderColor="var(--hgss-accent)"}
                onMouseLeave={e => e.currentTarget.style.borderColor=C.border}
                onClick={() => markItem(entry)}
              >
                <span style={{ fontSize:11, color:C.muted, flexShrink:0 }}>☐</span>
                <span style={{ fontSize:12, color:C.text, flex:1 }}>{entry.it.name}</span>
                {entry.floorLabel && <span style={{ fontSize:9, color:C.muted, flexShrink:0 }}>{entry.floorLabel}</span>}
                {entry.it.hidden && <span style={{ fontSize:9, color:C.gold, flexShrink:0 }}>★</span>}
              </div>
            )) : entries.map(entry => (
              <div key={entry.key} style={rowStyle}
                onMouseEnter={e => e.currentTarget.style.borderColor="var(--hgss-accent)"}
                onMouseLeave={e => e.currentTarget.style.borderColor=C.border}
                onClick={() => toggleTrainer(entry.key)}
              >
                <span style={{ fontSize:11, color:C.muted, flexShrink:0 }}>☐</span>
                <span style={{ fontSize:12, color:C.text, flex:1 }}>
                  <span style={{ color:C.muted }}>{entry.t.class}{entry.t.name ? " " : ""}</span>{entry.t.name || ""}
                </span>
                {entry.t.team && (
                  <span style={{ fontSize:9, color:C.muted, flexShrink:0 }}>
                    Lv.{Math.max(...entry.t.team.map(m => m.level))}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RECURRING ITEMS TAB ─────────────────────────────────────────────────────

function timeAgo(ms) {
  if (!ms) return null;
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  if (m < 1)   return "just now";
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const RECURRING_AREAS = [];

// Apricorn color → { label, ball, bg, fg }
const APRICORN_STYLES = {
  Grn: { label:"Grn", ball:"Friend Ball",  bg:"#1a3a1a", fg:"#6fcf6f", sprite:"green-apricorn"  },
  Red: { label:"Red", ball:"Level Ball",   bg:"#3a1a1a", fg:"#e07070", sprite:"red-apricorn"    },
  Blu: { label:"Blu", ball:"Lure Ball",    bg:"#1a2a3a", fg:"#70a0e0", sprite:"blue-apricorn"   },
  Ylw: { label:"Ylw", ball:"Moon Ball",    bg:"#3a321a", fg:"#d4b84a", sprite:"yellow-apricorn" },
  Blk: { label:"Blk", ball:"Heavy Ball",   bg:"#222228", fg:"#a0a0b8", sprite:"black-apricorn"  },
  Wht: { label:"Wht", ball:"Fast Ball",    bg:"#2a2a2a", fg:"#d8d8d8", sprite:"white-apricorn"  },
  Pnk: { label:"Pnk", ball:"Love Ball",    bg:"#3a1a2a", fg:"#d470a8", sprite:"pink-apricorn"   },
};

const APRICORN_TREES = [
  { id:"rt29-grn",          route:"Route 29",        color:"Grn", note:"NW hill tree" },
  { id:"rt29-surf-grn",     route:"Route 29 (Surf)", color:"Grn", note:"NW of pond (requires Surf)" },
  { id:"rt30-grn",          route:"Route 30",        color:"Grn", note:"S house" },
  { id:"rt30-pnk",          route:"Route 30",        color:"Pnk", note:"Near Mr. Pokémon's house" },
  { id:"rt31-blk",          route:"Route 31",        color:"Blk", note:"SW by pond" },
  { id:"violet-ylw",        route:"Violet City",     color:"Ylw", note:"S exit clearing" },
  { id:"rt33-pnk",          route:"Route 33",        color:"Pnk", note:"W of Union Cave exit" },
  { id:"rt33-blk",          route:"Route 33",        color:"Blk", note:"E of Union Cave exit" },
  { id:"azalea-wht",        route:"Azalea Town",     color:"Wht", note:"Behind Kurt's house" },
  { id:"rt35-blu",          route:"Route 35",        color:"Blu", note:"NE of National Park gate" },
  { id:"rt37-red",          route:"Route 37",        color:"Red", note:"E grove NW tree" },
  { id:"rt37-blu",          route:"Route 37",        color:"Blu", note:"E grove NE tree" },
  { id:"rt37-blk",          route:"Route 37",        color:"Blk", note:"E grove S tree" },
  { id:"rt42-pnk",          route:"Route 42",        color:"Pnk", note:"S of Mt. Mortar middle entrance, W tree (req. Surf+Cut)" },
  { id:"rt42-grn",          route:"Route 42",        color:"Grn", note:"S of Mt. Mortar middle entrance, middle tree (req. Surf+Cut)" },
  { id:"rt42-ylw",          route:"Route 42",        color:"Ylw", note:"S of Mt. Mortar middle entrance, E tree (req. Surf+Cut)" },
  { id:"rt43-blk",          route:"Route 43",        color:"Blk", note:"W of larger pond (req. Surf+Cut)" },
  { id:"rt44-red",          route:"Route 44",        color:"Red", note:"NW near Mahogany Town" },
  { id:"rt44-grn",          route:"Route 44",        color:"Grn", note:"E of farmhouse" },
  { id:"rt45-grn",          route:"Route 45",        color:"Grn", note:"Next to the pond in the south" },
  { id:"rt46-grn",          route:"Route 46",        color:"Grn", note:"W of Dark Cave entrance, E tree" },
  { id:"rt46-ylw",          route:"Route 46",        color:"Ylw", note:"W of Dark Cave entrance, W tree" },
  { id:"rt26-blu",          route:"Route 26",        color:"Blu", note:"NW of rest stop" },
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const APRICORN_COLOR_ORDER = ["Red","Blu","Grn","Ylw","Blk","Wht","Pnk"];

function ApricornSection() {
  const { useState: useS, useCallback: useCB, useMemo: useM } = React;

  const today = todayKey();
  const storageKey = id => `hgss-apricorn-${id}-${today}`;

  const [collected, setCollected] = useS(() => {
    const out = {};
    APRICORN_TREES.forEach(t => {
      try { out[t.id] = !!JSON.parse(localStorage.getItem(storageKey(t.id))); } catch { out[t.id] = false; }
    });
    return out;
  });
  const [sortBy, setSortBy] = useS("route");

  const toggle = useCB(id => {
    setCollected(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(storageKey(id), JSON.stringify(next[id]));
      return next;
    });
  }, [today]);

  const countToday = useM(() => APRICORN_TREES.filter(t => collected[t.id]).length, [collected]);

  const groups = useM(() => {
    if (sortBy === "type") {
      return APRICORN_COLOR_ORDER.map(color => {
        const trees = APRICORN_TREES.filter(t => t.color === color);
        const style = APRICORN_STYLES[color];
        return [style.ball.replace(" Ball","") + " (" + style.label + ")", trees, color];
      }).filter(([, trees]) => trees.length > 0);
    }
    const map = new Map();
    APRICORN_TREES.forEach(t => {
      if (!map.has(t.route)) map.set(t.route, []);
      map.get(t.route).push(t);
    });
    return [...map.entries()].map(([k,v]) => [k,v,null]);
  }, [sortBy]);

  return (
    <div style={{ marginBottom:32 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, flexWrap:"wrap" }}>
        <div style={{ fontSize:11, color:C.muted, letterSpacing:2, textTransform:"uppercase" }}>
          Apricorn Trees
        </div>
        <div style={{ fontSize:11, color: countToday === APRICORN_TREES.length ? C.green : C.muted }}>
          {countToday}/{APRICORN_TREES.length} today
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:4 }}>
          {["route","type"].map(mode => (
            <button key={mode} onClick={() => setSortBy(mode)} style={{
              fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:4, cursor:"pointer",
              background: sortBy === mode ? "var(--hgss-accent)" : C.card,
              color: sortBy === mode ? "#fff" : C.muted,
              border:`1px solid ${sortBy === mode ? "var(--hgss-accent)" : C.border}`,
            }}>{mode === "route" ? "By Route" : "By Type"}</button>
          ))}
        </div>
      </div>
      <div style={{ fontSize:11, color:C.muted, marginBottom:14, lineHeight:1.6 }}>
        Apricorns respawn daily. Checks auto-reset each calendar day.
      </div>

      {groups.map(([label, trees, colorKey]) => (
        <div key={label} style={{ marginBottom:10 }}>
          <div style={{ fontSize:11, fontWeight:600, marginBottom:4, paddingLeft:2,
            color: colorKey ? APRICORN_STYLES[colorKey].fg : C.muted }}>
            {label}
          </div>
          {trees.map(tree => {
            const style = APRICORN_STYLES[tree.color];
            const done = collected[tree.id];
            return (
              <div key={tree.id} onClick={() => toggle(tree.id)} style={{
                display:"flex", alignItems:"center", gap:10,
                background: done ? style.bg : C.card,
                border:`1px solid ${done ? style.fg + "55" : C.border}`,
                borderRadius:6, padding:"7px 12px", marginBottom:4,
                cursor:"pointer", opacity: done ? 0.65 : 1,
                transition:"opacity 0.15s, border-color 0.15s",
              }}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${style.sprite}.png`}
                  alt={style.label}
                  style={{ width:20, height:20, imageRendering:"pixelated", flexShrink:0 }} />
                <div style={{ flex:1, fontSize:12, color: done ? C.muted : C.text }}>
                  {tree.note}
                  {sortBy === "type" && <div style={{ fontSize:10, color:C.muted, marginTop:1 }}>{tree.route}</div>}
                </div>
                <div style={{ fontSize:10, color:C.muted, flexShrink:0 }}>
                  {style.ball}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RecurringTab({ sweeps, markSwept }) {
  const sorted = [...RECURRING_AREAS].sort((a, b) => {
    const ta = sweeps[a.id] || 0;
    const tb = sweeps[b.id] || 0;
    return ta - tb;
  });

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
    <div style={{ maxWidth:600, margin:"0 auto", padding:"20px 16px" }}>
      <ApricornSection />
      {sorted.length > 0 && <>
      <div style={{ fontSize:11, color:C.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>
        Recurring Items Schedule
      </div>
      <div style={{ fontSize:11, color:C.muted, marginBottom:20, lineHeight:1.6 }}>
        Recurring hidden items respawn periodically. Sorted oldest-swept first — sweep the top areas first.
      </div></>}
      {sorted.map(area => {
        const ts = sweeps[area.id] || 0;
        const ago = timeAgo(ts);
        const urgent = !ts || (Date.now() - ts) > 7 * 24 * 60 * 60 * 1000;
        return (
          <div key={area.id} style={{
            background:C.card, border:`1px solid ${urgent ? C.hgGold : C.border}`,
            borderRadius:8, padding:"12px 16px", marginBottom:8,
            display:"flex", alignItems:"center", gap:12
          }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color:C.text, fontWeight:600 }}>{area.name}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{area.note}</div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:11, color: ago ? (urgent ? C.hgGold : C.green) : C.muted, marginBottom:6 }}>
                {ago || "never swept"}
              </div>
              <button onClick={() => markSwept(area.id)} style={{
                background:C.accent, color:"#fff", border:"none", borderRadius:5,
                padding:"4px 12px", fontSize:11, cursor:"pointer", fontWeight:600
              }}>
                Mark swept
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

// ─── PC BOX TAB ──────────────────────────────────────────────────────────────

const BOX_SIZE = 30;

function BoxTab({ isMobile }) {
  const { useState: useS, useMemo: useM, useCallback: useCB } = React;

  const [boxCaught, setBoxCaught] = useS(() => {
    try { return JSON.parse(localStorage.getItem("hgss-box-caught") || "{}"); } catch { return {}; }
  });
  const toggleBox = useCB(name => {
    setBoxCaught(prev => {
      const next = { ...prev };
      if (next[name]) delete next[name]; else next[name] = true;
      try { localStorage.setItem("hgss-box-caught", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const [boxNames, setBoxNames] = useS(() => {
    try { return JSON.parse(localStorage.getItem("hgss-box-names") || "{}"); } catch { return {}; }
  });
  const [editingBox, setEditingBox] = useS(null);
  const [editVal,    setEditVal]    = useS("");

  const saveBoxName = useCB((idx, name) => {
    setBoxNames(prev => {
      const next = { ...prev };
      if (name.trim()) next[idx] = name.trim(); else delete next[idx];
      try { localStorage.setItem("hgss-box-names", JSON.stringify(next)); } catch {}
      return next;
    });
    setEditingBox(null);
  }, []);

  const boxes = useM(() => {
    const result = [];
    for (let i = 0; i < DEX.length; i += BOX_SIZE) result.push(DEX.slice(i, i + BOX_SIZE));
    for (let i = 0; i < NATIONAL_DEX.length; i += BOX_SIZE) result.push(NATIONAL_DEX.slice(i, i + BOX_SIZE));
    return result;
  }, []);

  const dexBoxCount = Math.ceil(DEX.length / BOX_SIZE);
  const dexCaught      = useM(() => DEX.filter(p => boxCaught[p.name]).length,         [boxCaught]);
  const nationalCaught = useM(() => NATIONAL_DEX.filter(p => boxCaught[p.name]).length, [boxCaught]);

  const SectionHeader = ({ label, caught, total }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14, marginTop:8 }}>
      <div style={{ fontSize:11, fontWeight:"700", color:C.muted, letterSpacing:2, textTransform:"uppercase", whiteSpace:"nowrap" }}>{label}</div>
      <div style={{ flex:1, height:1, background:C.border }} />
      <span style={{ fontSize:11, color: caught === total ? C.green : C.muted, whiteSpace:"nowrap" }}>{caught} / {total}</span>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
    <div style={{ maxWidth:700, margin:"0 auto", padding:"20px 16px" }}>
      <div style={{ fontSize:11, color:C.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>
        PC Box Organizer
      </div>
      {boxes.map((box, boxIdx) => {
        const caughtInBox = box.filter(p => boxCaught[p.name]).length;
        const defaultName = `Box ${boxIdx + 1}`;
        const boxName = boxNames[boxIdx] || defaultName;
        return (
          <React.Fragment key={boxIdx}>
            {boxIdx === 0          && <SectionHeader label="Johto Pokédex"    caught={dexCaught}      total={DEX.length} />}
            {boxIdx === dexBoxCount && <SectionHeader label="National Pokédex" caught={nationalCaught} total={NATIONAL_DEX.length} />}
            <div style={{ marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                {editingBox === boxIdx ? (
                  <input
                    autoFocus
                    value={editVal}
                    onChange={e => setEditVal(e.target.value)}
                    onBlur={() => saveBoxName(boxIdx, editVal)}
                    onKeyDown={e => { if (e.key === "Enter") saveBoxName(boxIdx, editVal); if (e.key === "Escape") setEditingBox(null); }}
                    style={{
                      background:"rgba(0,0,0,0.3)", border:`1px solid ${C.accent}`, borderRadius:5,
                      color:C.text, padding:"3px 8px", fontSize:13, fontWeight:600, width:160, outline:"none"
                    }}
                  />
                ) : (
                  <span
                    onClick={() => { setEditingBox(boxIdx); setEditVal(boxNames[boxIdx] || ""); }}
                    style={{ fontSize:13, color:C.text, fontWeight:600, cursor:"pointer", borderBottom:`1px dashed ${C.border}` }}
                    title="Click to rename"
                  >{boxName}</span>
                )}
                <span style={{ fontSize:11, color:C.muted }}>
                  {caughtInBox}/{box.length} caught
                </span>
                <div style={{ flex:1, height:4, background:"rgba(0,0,0,0.3)", borderRadius:99, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.round(caughtInBox/box.length*100)}%`, background:C.green, borderRadius:99, transition:"width 0.3s" }} />
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(6, 1fr)" : "repeat(10, 1fr)", gap:3 }}>
                {box.map(p => {
                  const isCaught = !!boxCaught[p.name];
                  return (
                    <div
                      key={p.name}
                      title={p.name}
                      onClick={() => toggleBox(p.name)}
                      style={{
                        aspectRatio:"1", background: isCaught ? "rgba(74,175,116,0.15)" : "rgba(0,0,0,0.25)",
                        border:`1px solid ${isCaught ? C.green : C.border}`,
                        borderRadius:6, display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center", cursor:"pointer",
                        gap:1, padding:2, transition:"all 0.15s"
                      }}
                    >
                      <img
                        src={pokeSpriteUrl(p.id)}
                        alt={p.name}
                        style={{ width:32, height:32, imageRendering:"pixelated", filter: isCaught ? "none" : "brightness(0) opacity(0.35)" }}
                      />
                      <span style={{ fontSize:7, color: isCaught ? C.green : C.muted, lineHeight:1, textAlign:"center", overflow:"hidden", maxWidth:"100%" }}>
                        {p.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
    </div>
  );
}

// Expose data for overlay.html
if (typeof window !== 'undefined') {
  window.__HGSS_AREAS         = AREAS;
  window.__HGSS_DEX_ID        = DEX_ID;
  window.__HGSS_NATIONAL_DEX_ID = NATIONAL_DEX_ID;
  window.__HGSS_ITEM_SPRITE   = ITEM_SPRITE;
  window.__HGSS_TIME_COLORS   = TIME_COLORS;
}
