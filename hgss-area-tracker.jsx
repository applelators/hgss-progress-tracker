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
  {johtoId:160,id:83, name:"Farfetch’d"},
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

// ─── NATIONAL DEX (Gen II/III/IV obtainable in HGSS) — Phase 2: update ──────
// ─── NATIONAL DEX (Gen III/IV obtainable post-game) — Phase 5: expand ────────
const NATIONAL_DEX = [
  // TODO: Add Gen III/IV Pokémon (Pokéwalker, Pal Park, events, Safari Zone)
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
      {name:"Chikorita", method:"Gift", levels:"5", rate:"One", warn:true},
      {name:"Cyndaquil", method:"Gift", levels:"5", rate:"One", warn:true},
      {name:"Totodile",  method:"Gift", levels:"5", rate:"One", warn:true},
    ],
    items:[
      {name:"Potion ×6",   hidden:false, note:"5 from Elm's aide + 1 on the spot Silver stood"},
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
      {name:"Pidgey",    method:"Grass", levels:"2,4", rate:"40%", time:"morning", hgOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"4",   rate:"50%", time:"day",     hgOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"4",   rate:"10%", time:"morning", ssOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"3,4", rate:"50%", time:"day",     ssOnly:true},
      {name:"Spinarak",  method:"Grass", levels:"2",   rate:"30%", time:"night",   hgOnly:true},
      {name:"Ledyba",    method:"Grass", levels:"3",   rate:"30%", time:"morning", ssOnly:true},
      {name:"Rattata",   method:"Grass", levels:"3–4", rate:"40%", time:"night"},
      {name:"Hoothoot",  method:"Grass", levels:"4",   rate:"30%", time:"night",   hgOnly:true},
      {name:"Hoothoot",  method:"Grass", levels:"3–4", rate:"60%", time:"night",   ssOnly:true},
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
      {name:"Pidgey",    method:"Grass", levels:"3",   rate:"30%", time:"morning", hgOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"3",   rate:"30%", time:"day",     hgOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"5",   rate:"10%", time:"morning", ssOnly:true},
      {name:"Pidgey",    method:"Grass", levels:"4",   rate:"30%", time:"day",     ssOnly:true},
      {name:"Bellsprout",method:"Grass", levels:"3",   rate:"20%"},
      {name:"Spinarak",  method:"Grass", levels:"3",   rate:"30%", time:"night",   hgOnly:true},
      {name:"Ledyba",    method:"Grass", levels:"4",   rate:"30%", time:"morning", ssOnly:true},
      {name:"Rattata",   method:"Grass", levels:"4–5", rate:"40%", time:"night"},
      {name:"Hoothoot",  method:"Grass", levels:"5",   rate:"10%", time:"night",   hgOnly:true},
      {name:"Hoothoot",  method:"Grass", levels:"4–5", rate:"40%", time:"night",   ssOnly:true},
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
      {name:"Rattata",   method:"Grass", levels:"4,6",  rate:"35%", time:"morning", hgOnly:true},
      {name:"Rattata",   method:"Grass", levels:"4,6",  rate:"40%", time:"day",     hgOnly:true},
      {name:"Rattata",   method:"Grass", levels:"4",    rate:"30%", time:"night",   hgOnly:true},
      {name:"Rattata",   method:"Grass", levels:"6",    rate:"5%",  time:"morning", ssOnly:true},
      {name:"Rattata",   method:"Grass", levels:"4–6",  rate:"10%", time:"day",     ssOnly:true},
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
          {name:"Rattata",   method:"Cave", levels:"4",   rate:"10%", hgOnly:true},
          {name:"Rattata",   method:"Cave", levels:"4,6", rate:"40%", ssOnly:true},
          {name:"Sandshrew", method:"Cave", levels:"6",   rate:"30%", hgOnly:true},
          {name:"Zubat",     method:"Cave", levels:"5,7", rate:"25%"},
          {name:"Geodude",   method:"Cave", levels:"6",   rate:"30%"},
          {name:"Onix",      method:"Cave", levels:"6",   rate:"5%"},
          {name:"Magikarp",  method:"Old Rod", levels:"10", rate:"85%"},
          {name:"Goldeen",   method:"Old Rod", levels:"10", rate:"15%"},
        ], items:[
          {name:"X Attack",    hidden:false, note:"NW area"},
          {name:"Great Ball",  hidden:false, note:"Between two rocks SE of Hiker Russel"},
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
          {name:"Rattata",   method:"Cave", levels:"6",   rate:"5%",  hgOnly:true},
          {name:"Rattata",   method:"Cave", levels:"6,8", rate:"35%", ssOnly:true},
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
      {name:"Rattata",  method:"Grass", levels:"6–7",   rate:"40%", time:"morning", hgOnly:true},
      {name:"Rattata",  method:"Grass", levels:"4–7",   rate:"45%", time:"day",     hgOnly:true},
      {name:"Rattata",  method:"Grass", levels:"6–7",   rate:"60%", time:"night",   hgOnly:true},
      {name:"Rattata",  method:"Grass", levels:"6",     rate:"10%", time:"morning", ssOnly:true},
      {name:"Rattata",  method:"Grass", levels:"4,6",   rate:"15%", time:"day",     ssOnly:true},
      {name:"Rattata",  method:"Grass", levels:"6",     rate:"30%", time:"night",   ssOnly:true},
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
    note:"Athletic competitions. No wild Pokémon. Prizes from the Athlete Shop.",
    pokemon:[],
    items:[
      {name:"PP Up",       hidden:true,  note:"E side of building near smaller fence"},
      {name:"Protein",     hidden:true,  note:"S of Aprijuice stand, S grass field"},
      {name:"Apriblender", hidden:false, note:"From attendant at Aprijuice stand"},
      {name:"Jersey",      hidden:false, note:"From Whitney at reception desk (first visit)"},
      {name:"Rare Candy",  hidden:false, note:"From woman outside after 1,000 dashes"},
      {name:"Rare Candy",  hidden:false, note:"From elderly man inside after 1,000 jumps"},
      {name:"Rare Candy",  hidden:false, note:"From blond man inside after 2,000 tackles"},
    ],
    trainers:[] },

  { part:"Part 7", id:"national-park", name:"National Park",
    note:"Bug-Catching Contest: Tue/Thu/Sat, 10am–3:30pm. All Bug Pokémon available during contest.",
    pokemon:[
      {name:"Caterpie",  method:"Grass",      levels:"10,12", rate:"50%", time:"morning", hgOnly:true},
      {name:"Caterpie",  method:"Grass",      levels:"10",    rate:"30%", time:"day",     hgOnly:true},
      {name:"Metapod",   method:"Grass",      levels:"10",    rate:"30%", time:"morning", hgOnly:true},
      {name:"Metapod",   method:"Grass",      levels:"10",    rate:"30%", time:"day",     hgOnly:true},
      {name:"Weedle",    method:"Grass",      levels:"10,12", rate:"50%", time:"morning", ssOnly:true},
      {name:"Weedle",    method:"Grass",      levels:"10",    rate:"30%", time:"day",     ssOnly:true},
      {name:"Kakuna",    method:"Grass",      levels:"10",    rate:"30%", time:"morning", ssOnly:true},
      {name:"Kakuna",    method:"Grass",      levels:"10",    rate:"30%", time:"day",     ssOnly:true},
      {name:"Pidgey",    method:"Grass",      levels:"10–14", rate:"20%", time:"morning"},
      {name:"Pidgey",    method:"Grass",      levels:"12,14", rate:"15%", time:"day"},
      {name:"Sunkern",   method:"Grass",      levels:"10,12", rate:"25%", time:"day"},
      {name:"Hoothoot",  method:"Grass",      levels:"10–14", rate:"100%",time:"night"},
      {name:"Hoothoot",  method:"Headbutt",   levels:"10–12", rate:"50%", note:"Group A trees"},
      {name:"Pineco",    method:"Headbutt",   levels:"10–12", rate:"30%", note:"Group A trees"},
      {name:"Exeggcute", method:"Headbutt",   levels:"10–12", rate:"20%", note:"Group A trees"},
      {name:"Hoothoot",  method:"Headbutt",   levels:"13–15", rate:"50%", note:"Group B trees"},
      {name:"Spinarak",  method:"Headbutt",   levels:"13–15", rate:"30%", note:"Group B trees", hgOnly:true},
      {name:"Ledyba",    method:"Headbutt",   levels:"13–15", rate:"30%", note:"Group B trees", ssOnly:true},
      {name:"Exeggcute", method:"Headbutt",   levels:"13–15", rate:"20%", note:"Group B trees"},
      {name:"Caterpie",  method:"Bug Contest",levels:"7–18",  rate:"20%"},
      {name:"Weedle",    method:"Bug Contest",levels:"7–18",  rate:"20%"},
      {name:"Metapod",   method:"Bug Contest",levels:"9–18",  rate:"10%"},
      {name:"Kakuna",    method:"Bug Contest",levels:"9–18",  rate:"10%"},
      {name:"Paras",     method:"Bug Contest",levels:"10–17", rate:"10%"},
      {name:"Venonat",   method:"Bug Contest",levels:"10–16", rate:"10%"},
      {name:"Butterfree",method:"Bug Contest",levels:"12–15", rate:"5%"},
      {name:"Beedrill",  method:"Bug Contest",levels:"12–15", rate:"5%"},
      {name:"Scyther",   method:"Bug Contest",levels:"13–14", rate:"5%"},
      {name:"Pinsir",    method:"Bug Contest",levels:"13–14", rate:"5%"},
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

  { part:"Part 7", id:"route-36", name:"Route 36",
    note:"Sudowoodo (Lv20, Rock) blocks the road. Use SquirtBottle to battle it. Gives Berry Pots + HM06 Rock Smash.",
    pokemon:[
      {name:"Nidoran♀",  method:"Grass",  levels:"12",    rate:"30%",              hgOnly:true},
      {name:"Nidoran♂",  method:"Grass",  levels:"12",    rate:"30%",              hgOnly:true},
      {name:"Nidoran♀",  method:"Grass",  levels:"12–13", rate:"30%",              ssOnly:true},
      {name:"Nidoran♂",  method:"Grass",  levels:"12–13", rate:"30%",              ssOnly:true},
      {name:"Growlithe",  method:"Grass",  levels:"13",    rate:"10%", time:"morning", hgOnly:true},
      {name:"Growlithe",  method:"Grass",  levels:"13",    rate:"10%", time:"night",   hgOnly:true},
      {name:"Growlithe",  method:"Grass",  levels:"13,15", rate:"15%", time:"day",     hgOnly:true},
      {name:"Vulpix",     method:"Grass",  levels:"13",    rate:"10%", time:"morning", ssOnly:true},
      {name:"Vulpix",     method:"Grass",  levels:"13",    rate:"10%", time:"night",   ssOnly:true},
      {name:"Vulpix",     method:"Grass",  levels:"13–15", rate:"15%", time:"day",     ssOnly:true},
      {name:"Pidgey",     method:"Grass",  levels:"13,15", rate:"25%", time:"morning", hgOnly:true},
      {name:"Pidgey",     method:"Grass",  levels:"12,15", rate:"25%", time:"morning", ssOnly:true},
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
      {name:"Pidgey",    method:"Grass",  levels:"13,15", rate:"60%", time:"morning", hgOnly:true},
      {name:"Pidgey",    method:"Grass",  levels:"13,15", rate:"50%", time:"day",     hgOnly:true},
      {name:"Pidgey",    method:"Grass",  levels:"15",    rate:"20%", time:"morning", ssOnly:true},
      {name:"Pidgey",    method:"Grass",  levels:"13,15", rate:"50%", time:"day",     ssOnly:true},
      {name:"Pidgeotto", method:"Grass",  levels:"15",    rate:"5%",  time:"day"},
      {name:"Growlithe", method:"Grass",  levels:"14",    rate:"10%", time:"morning", hgOnly:true},
      {name:"Growlithe", method:"Grass",  levels:"14",    rate:"10%", time:"night",   hgOnly:true},
      {name:"Growlithe", method:"Grass",  levels:"14–15", rate:"15%", time:"day",     hgOnly:true},
      {name:"Vulpix",    method:"Grass",  levels:"14",    rate:"10%", time:"morning", ssOnly:true},
      {name:"Vulpix",    method:"Grass",  levels:"14",    rate:"10%", time:"night",   ssOnly:true},
      {name:"Vulpix",    method:"Grass",  levels:"14–15", rate:"15%", time:"day",     ssOnly:true},
      {name:"Spinarak",  method:"Grass",  levels:"13,15", rate:"40%", time:"night",   hgOnly:true},
      {name:"Ledyba",    method:"Grass",  levels:"13,15", rate:"40%", time:"morning", ssOnly:true},
      {name:"Hoothoot",  method:"Grass",  levels:"15",    rate:"20%", time:"night",   hgOnly:true},
      {name:"Hoothoot",  method:"Grass",  levels:"13,15", rate:"60%", time:"night",   ssOnly:true},
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

  // ─── RETURN VISITS (UNAUDITED) ─────────────────────────────────────────────
  { part:"(Return Visits)", id:"route-30-return", name:"Route 30 (Return)",
    note:"HP Up from Youngster Joey after a phone rematch. Exp. Share from Mr. Pokémon in exchange for the Red Scale (obtained at Lake of Rage).",
    pokemon:[],
    items:[
      {name:"HP Up",      hidden:false, note:"From Youngster Joey after a phone rematch"},
      {name:"Exp. Share", hidden:false, note:"From Mr. Pokémon, exchange for Red Scale (Lake of Rage)"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"new-bark-town-return", name:"New Bark Town (Return)",
    note:"Return to Professor Elm at key late-game milestones.",
    pokemon:[],
    items:[
      {name:"Master Ball", hidden:false, note:"From Prof. Elm after earning all 8 Johto badges"},
      {name:"S.S. Ticket", hidden:false, note:"From Prof. Elm after entering the Hall of Fame"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"ruins-of-alph-strength-return", name:"Ruins of Alph (Return — Strength)",
    note:"Requires Surf + Strength to reach the SW chamber via Union Cave.",
    pokemon:[],
    items:[
      {name:"Leppa Berry",  hidden:false, note:"SW chamber via Union Cave"},
      {name:"Mystic Water", hidden:false, note:"SW chamber via Union Cave"},
      {name:"Stardust",     hidden:false, note:"SW chamber via Union Cave"},
      {name:"Star Piece",   hidden:false, note:"SW chamber via Union Cave"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"union-cave-strength-return", name:"Union Cave (Return — Strength)",
    note:"Requires Surf + Strength to reach the deepest B2F section.",
    pokemon:[],
    items:[
      {name:"TM18 Rain Dance", hidden:false, note:"B2F E ridge"},
      {name:"King's Rock",     hidden:false, note:"B2F — from man on W ridge"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"slowpoke-well-strength-return", name:"Slowpoke Well (Return — Strength)",
    note:"Requires Surf + Strength to reach the eastern section of B1F.",
    pokemon:[],
    items:[
      {name:"Full Heal",       hidden:true,  note:"E side of central ridge"},
      {name:"TM18 Rain Dance", hidden:false, note:"E ridge"},
      {name:"King's Rock",     hidden:false, note:"From man on W ridge"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"goldenrod-city-return", name:"Goldenrod City (Return — Bill)",
    note:"Return after meeting Bill in Ecruteak City. He'll be at his house in Goldenrod.",
    pokemon:[
      {name:"Eevee", method:"Gift", levels:"5", rate:"One", note:"From Bill's house after meeting him in Ecruteak City"},
    ],
    items:[
      {name:"Amulet Coin", hidden:false, note:"Dept Store B1F NE room via Goldenrod Tunnel"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"goldenrod-city-rocket-return", name:"Goldenrod City (Return — Team Rocket)",
    note:"Return after defeating Team Rocket at the Radio Tower.",
    pokemon:[],
    items:[
      {name:"TM11 Sunny Day", hidden:false, note:"Radio Tower 3F"},
      {name:"Rainbow Wing",   hidden:false, note:"From Radio Tower Director (HG only)", hgOnly:true},
      {name:"Silver Wing",    hidden:false, note:"From Radio Tower Director (SS only)", ssOnly:true},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"burned-tower-strength-return", name:"Burned Tower (Return — Strength)",
    note:"Return with Strength to reach the NW corner and S-central rock in B1F.",
    floors:[
      { label:"B1F", pokemon:[], items:[
          {name:"TM12 Taunt", hidden:false, note:"NW corner"},
          {name:"Revive",     hidden:true,  note:"S-central area on rock"},
        ], trainers:[] },
    ] },

  { part:"(Return Visits)", id:"national-park-rock-climb-return", name:"National Park (Return — Rock Climb)",
    note:"Return with Rock Climb to reach the NE cliff.",
    pokemon:[],
    items:[
      {name:"Shiny Stone", hidden:false, note:"NE cliff"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"route-38-rock-climb-return", name:"Route 38 (Return — Rock Climb)",
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

  // ─── RETURN VISITS — PHONE REGISTRATION PRIZES ─────────────────────────────
  { part:"(Return Visits)", id:"national-park-phone-return", name:"National Park (Return — Phone)",
    note:"Register Pokéfan Beverly's number; she occasionally offers a Nugget when you visit.",
    pokemon:[],
    items:[
      {name:"Nugget", hidden:false, note:"Sometimes from Pokéfan Beverly after phone registration"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"route-34-phone-return", name:"Route 34 (Return — Phone)",
    note:"Register Picnicker Gina's number; she occasionally gives a Leaf Stone when you visit.",
    pokemon:[],
    items:[
      {name:"Leaf Stone", hidden:false, note:"Sometimes from Picnicker Gina after phone registration"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"route-36-phone-return", name:"Route 36 (Return — Phone)",
    note:"Register School Kid Alan's number; he occasionally gives a Fire Stone when you visit.",
    pokemon:[],
    items:[
      {name:"Fire Stone", hidden:false, note:"Sometimes from School Kid Alan after phone registration"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"route-38-phone-return", name:"Route 38 (Return — Phone)",
    note:"Register Lass Dana's number; she occasionally gives a Thunder Stone when you visit.",
    pokemon:[],
    items:[
      {name:"Thunder Stone", hidden:false, note:"Sometimes from Lass Dana after phone registration"},
    ],
    trainers:[] },

  { part:"(Return Visits)", id:"route-39-phone-return", name:"Route 39 (Return — Phone)",
    note:"Register Pokéfan Derek's number; he occasionally gives a Nugget when you visit.",
    pokemon:[],
    items:[
      {name:"Nugget", hidden:false, note:"Sometimes from Pokéfan Derek after phone registration"},
    ],
    trainers:[] },
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
  { pre:["Eevee"], post:[["Vaporeon"],["Jolteon"],["Flareon"]] },
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
const LEARNSETS = {}; // TODO: Add Johto move learnsets

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
// Johto regional candidates — final forms only, ordered best→decent.
// Tyranitar (pseudo-legendary) is always locked into slot 1 unless it's the favorite.
const DT_CANDIDATES = [
  // ── Starters ─────────────────────────────────────────────────────────────────
  { name:"Typhlosion",  types:["Fire"],            hms:["Strength","Rock Smash"] },
  { name:"Feraligatr",  types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash","Cut"] },
  { name:"Meganium",    types:["Grass"],            hms:["Cut","Strength","Rock Smash"] },
  // ── Top picks ────────────────────────────────────────────────────────────────
  { name:"Ampharos",    types:["Electric"],         hms:["Strength","Rock Smash"] },
  { name:"Heracross",   types:["Bug","Fighting"],   hms:["Strength","Rock Smash","Cut"] },
  { name:"Espeon",      types:["Psychic"],          hms:["Strength"] },
  { name:"Umbreon",     types:["Dark"],             hms:["Strength"] },
  { name:"Steelix",     types:["Steel","Ground"],   hms:["Strength","Rock Climb","Rock Smash"] },
  { name:"Scizor",      types:["Bug","Steel"],      hms:["Cut","Strength"], hgOnly:true },
  { name:"Donphan",     types:["Ground"],           hms:["Strength","Rock Smash","Rock Climb"], hgOnly:true },
  { name:"Arcanine",    types:["Fire"],             hms:["Strength"], hgOnly:true },
  { name:"Houndoom",    types:["Dark","Fire"],      hms:["Strength"], ssOnly:true },
  { name:"Ninetales",   types:["Fire"],             hms:["Strength"], ssOnly:true },
  { name:"Skarmory",    types:["Steel","Flying"],   hms:["Fly","Strength","Cut"], ssOnly:true },
  { name:"Tyranitar",   types:["Rock","Dark"],      hms:["Strength","Rock Smash","Rock Climb"] },
  { name:"Kingdra",     types:["Water","Dragon"],   hms:["Surf","Waterfall","Whirlpool"] },
  { name:"Politoed",    types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash"] },
  { name:"Slowking",    types:["Water","Psychic"],  hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Dragonite",   types:["Dragon","Flying"],  hms:["Fly","Surf","Strength","Waterfall","Whirlpool","Rock Smash","Cut"] },
  { name:"Togekiss",    types:["Normal","Flying"],  hms:["Fly","Strength"] },
  { name:"Crobat",      types:["Poison","Flying"],  hms:["Fly","Strength","Cut"] },
  { name:"Blissey",     types:["Normal"],           hms:["Strength"] },
  { name:"Ursaring",    types:["Normal"],           hms:["Strength","Rock Smash","Rock Climb"], hgOnly:true },
  { name:"Mantine",     types:["Water","Flying"],   hms:["Surf","Fly","Waterfall","Whirlpool"], hgOnly:true },
  // ── Good picks ───────────────────────────────────────────────────────────────
  { name:"Noctowl",     types:["Normal","Flying"],  hms:["Fly"] },
  { name:"Lanturn",     types:["Water","Electric"], hms:["Surf","Waterfall","Whirlpool"] },
  { name:"Azumarill",   types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool"], ssOnly:true },
  { name:"Quagsire",    types:["Water","Ground"],   hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash"] },
  { name:"Forretress",  types:["Bug","Steel"],      hms:["Strength","Rock Smash"] },
  { name:"Xatu",        types:["Psychic","Flying"], hms:["Fly","Strength"] },
  { name:"Granbull",    types:["Normal"],           hms:["Strength","Rock Smash"] },
  { name:"Miltank",     types:["Normal"],           hms:["Strength","Rock Smash"] },
  { name:"Nidoking",    types:["Poison","Ground"],  hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash","Cut"] },
  { name:"Nidoqueen",   types:["Poison","Ground"],  hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash","Cut"] },
  { name:"Machamp",     types:["Fighting"],         hms:["Strength","Rock Smash","Rock Climb"] },
  { name:"Gyarados",    types:["Water","Flying"],   hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Lapras",      types:["Water","Ice"],      hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Starmie",     types:["Water","Psychic"],  hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Alakazam",    types:["Psychic"],          hms:["Strength"] },
  { name:"Bellossom",   types:["Grass"],            hms:["Cut","Strength"], ssOnly:true },
  { name:"Jumpluff",    types:["Grass","Flying"],   hms:["Fly","Cut"] },
  { name:"Sudowoodo",   types:["Rock"],             hms:["Strength","Rock Smash","Rock Climb"] },
  { name:"Girafarig",   types:["Normal","Psychic"], hms:["Strength"] },
  { name:"Magcargo",    types:["Fire","Rock"],      hms:["Strength","Rock Smash"] },
  { name:"Mamoswine",   types:["Ice","Ground"],     hms:["Strength","Rock Smash","Rock Climb"] },
  { name:"Piloswine",   types:["Ice","Ground"],     hms:["Strength","Rock Smash"] },
  { name:"Octillery",   types:["Water"],            hms:["Surf","Waterfall","Whirlpool"] },
  { name:"Corsola",     types:["Water","Rock"],     hms:["Surf","Waterfall","Whirlpool","Rock Smash"] },
  { name:"Hitmontop",   types:["Fighting"],         hms:["Strength","Rock Smash"] },
  { name:"Hitmonlee",   types:["Fighting"],         hms:["Strength","Rock Smash"] },
  { name:"Hitmonchan",  types:["Fighting"],         hms:["Strength","Rock Smash"] },
  { name:"Porygon2",    types:["Normal"],           hms:[] },
  { name:"Golduck",     types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash","Cut"] },
  { name:"Exeggutor",   types:["Grass","Psychic"],  hms:["Strength"] },
  { name:"Hypno",       types:["Psychic"],          hms:["Strength"] },
  { name:"Dewgong",     types:["Water","Ice"],      hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Cloyster",    types:["Water","Ice"],      hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Tentacruel",  types:["Water","Poison"],   hms:["Surf","Waterfall","Whirlpool"] },
  { name:"Jynx",        types:["Ice","Psychic"],    hms:["Surf"] },
  { name:"Electabuzz",  types:["Electric"],         hms:["Strength"] },
  { name:"Magmar",      types:["Fire"],             hms:["Strength"] },
  { name:"Kingler",     types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool","Cut"] },
  { name:"Furret",      types:["Normal"],           hms:["Cut","Strength"] },
  { name:"Tangrowth",   types:["Grass"],            hms:["Cut","Strength"] },
  { name:"Lickilicky",  types:["Normal"],           hms:["Strength","Rock Smash"] },
  { name:"Ambipom",     types:["Normal"],           hms:["Cut","Strength"] },
  { name:"Venomoth",    types:["Bug","Poison"],     hms:["Cut"] },
  { name:"Yanmega",     types:["Bug","Flying"],     hms:["Fly","Cut"] },
  { name:"Sunflora",    types:["Grass"],            hms:["Cut"] },
  { name:"Aerodactyl",  types:["Rock","Flying"],    hms:["Fly","Strength","Rock Smash","Rock Climb"] },
  { name:"Snorlax",     types:["Normal"],           hms:["Surf","Strength","Rock Smash"] },
  // ── Niche picks ──────────────────────────────────────────────────────────────
  { name:"Ariados",     types:["Bug","Poison"],     hms:["Cut"] },
  { name:"Ledian",      types:["Bug","Flying"],     hms:["Cut","Fly"] },
  { name:"Sneasel",     types:["Dark","Ice"],       hms:["Cut","Strength","Rock Climb"] },
  { name:"Misdreavus",  types:["Ghost"],            hms:[], ssOnly:true },
  { name:"Murkrow",     types:["Dark","Flying"],    hms:["Fly"], hgOnly:true },
  { name:"Shuckle",     types:["Bug","Rock"],       hms:["Strength","Rock Smash"] },
  { name:"Qwilfish",    types:["Water","Poison"],   hms:["Surf","Waterfall","Whirlpool"] },
  { name:"Dunsparce",   types:["Normal"],           hms:["Strength"] },
  { name:"Gligar",      types:["Ground","Flying"],  hms:["Fly","Strength"], hgOnly:true },
  { name:"Smeargle",    types:["Normal"],           hms:["Cut","Fly","Surf","Strength","Waterfall","Whirlpool","Rock Smash","Rock Climb"] },
  { name:"Wobbuffet",   types:["Psychic"],          hms:[] },
  { name:"Dodrio",      types:["Normal","Flying"],  hms:["Fly","Cut"] },
  { name:"Stantler",    types:["Normal"],           hms:["Strength"] },
  { name:"Seaking",     types:["Water"],            hms:["Surf","Waterfall","Whirlpool"] },
  { name:"Vaporeon",    types:["Water"],            hms:["Surf","Strength","Waterfall","Whirlpool"] },
  { name:"Jolteon",     types:["Electric"],         hms:["Strength"] },
  { name:"Flareon",     types:["Fire"],             hms:["Strength"] },
  { name:"Vileplume",   types:["Grass","Poison"],   hms:["Cut","Strength"], ssOnly:true },
  { name:"Primeape",    types:["Fighting"],         hms:["Strength","Rock Smash","Rock Climb"], hgOnly:true },
  { name:"Persian",     types:["Normal"],           hms:["Cut","Strength"], ssOnly:true },
  { name:"Dugtrio",     types:["Ground"],           hms:["Strength","Rock Smash","Rock Climb","Cut"] },
  { name:"Mr. Mime",    types:["Psychic"],          hms:["Strength"] },
  { name:"Rapidash",    types:["Fire"],             hms:["Strength"] },
  { name:"Marowak",     types:["Ground"],           hms:["Strength","Rock Smash"] },
  { name:"Weezing",     types:["Poison"],           hms:[] },
  { name:"Muk",         types:["Poison"],           hms:[] },
  { name:"Magneton",    types:["Electric","Steel"],  hms:[] },
  { name:"Electrode",   types:["Electric"],         hms:[] },
  { name:"Rhydon",      types:["Ground","Rock"],    hms:["Surf","Strength","Waterfall","Rock Smash","Rock Climb","Cut"] },
  { name:"Kangaskhan",  types:["Normal"],           hms:["Strength","Rock Smash","Rock Climb","Cut"] },
  { name:"Pinsir",      types:["Bug"],              hms:["Strength","Rock Smash","Cut"], ssOnly:true },
  { name:"Omastar",     types:["Rock","Water"],     hms:["Surf","Strength","Waterfall","Whirlpool","Rock Smash"] },
  { name:"Kabutops",    types:["Rock","Water"],     hms:["Surf","Strength","Waterfall","Whirlpool","Cut"] },
  { name:"Tauros",      types:["Normal"],           hms:["Strength","Rock Smash","Surf"] },
];
const DT_GROUPS = {};
const DT_LEGENDARY = new Set(["Raikou","Entei","Suicune","Lugia","Ho-Oh","Celebi","Mewtwo","Mew","Articuno","Zapdos","Moltres"]);

const DT_HM_COMPAT = {
  "Cut":        new Set(["Meganium","Bayleef","Chikorita","Heracross","Ariados","Spinarak","Ledian","Ledyba","Furret","Sentret","Scyther","Scizor","Yanmega","Yanma","Shuckle","Pinsir","Sneasel","Aipom","Ambipom","Smeargle","Farfetch'd","Nidoking","Nidorino","Nidoran♂","Nidoqueen","Nidorina","Nidoran♀","Golduck","Psyduck","Kingler","Krabby","Kabutops","Kabuto","Kangaskhan","Rhydon","Rhyhorn","Dodrio","Doduo","Venomoth","Venonat","Jumpluff","Skiploom","Hoppip","Bellossom","Gloom","Oddish","Tangrowth","Tangela","Vileplume","Skarmory","Crobat","Golbat","Zubat","Dugtrio","Diglett","Persian","Meowth","Sunflora","Sunkern","Seaking","Goldeen","Feraligatr","Croconaw","Totodile","Dragonite","Dragonair","Dratini"]),
  "Fly":        new Set(["Noctowl","Hoothoot","Crobat","Golbat","Xatu","Natu","Togekiss","Togetic","Togepi","Skarmory","Mantine","Delibird","Dragonite","Dragonair","Yanmega","Yanma","Aerodactyl","Ledian","Ledyba","Jumpluff","Skiploom","Hoppip","Dodrio","Doduo","Murkrow","Gligar"]),
  "Surf":       new Set(["Feraligatr","Croconaw","Totodile","Lanturn","Chinchou","Azumarill","Marill","Politoed","Poliwrath","Poliwhirl","Poliwag","Quagsire","Wooper","Corsola","Remoraid","Octillery","Mantine","Kingdra","Seadra","Horsea","Slowking","Slowbro","Slowpoke","Gyarados","Magikarp","Lapras","Starmie","Staryu","Psyduck","Golduck","Tentacruel","Tentacool","Dewgong","Seel","Cloyster","Shellder","Vaporeon","Snorlax","Dragonite","Dragonair","Dratini","Nidoking","Nidorino","Nidoran♂","Nidoqueen","Nidorina","Nidoran♀","Gyarados","Kingler","Krabby","Omastar","Omanyte","Kabutops","Kabuto","Seaking","Goldeen","Qwilfish","Rhydon","Rhyhorn","Tauros"]),
  "Strength":   new Set(["Meganium","Bayleef","Typhlosion","Quilava","Feraligatr","Croconaw","Ampharos","Flaaffy","Heracross","Steelix","Onix","Tyranitar","Pupitar","Larvitar","Donphan","Phanpy","Ursaring","Teddiursa","Blissey","Chansey","Miltank","Togekiss","Togetic","Granbull","Snubbull","Quagsire","Wooper","Sudowoodo","Azumarill","Marill","Mamoswine","Piloswine","Swinub","Girafarig","Stantler","Porygon2","Porygon","Forretress","Pineco","Scizor","Scyther","Skarmory","Houndoom","Houndour","Ninetales","Vulpix","Arcanine","Growlithe","Espeon","Umbreon","Vaporeon","Jolteon","Flareon","Eevee","Dragonite","Dragonair","Dratini","Machamp","Machoke","Machop","Nidoking","Nidorino","Nidoqueen","Nidorina","Gyarados","Lapras","Snorlax","Kangaskhan","Aerodactyl","Tauros","Mantine","Primeape","Mankey","Magcargo","Slugma","Lanturn","Chinchou","Slowbro","Slowpoke","Slowking","Smeargle","Ambipom","Aipom","Tangrowth","Tangela","Lickilicky","Lickitung","Hitmonlee","Hitmonchan","Hitmontop","Tyrogue","Electabuzz","Elekid","Magmar","Magby","Rapidash","Ponyta","Marowak","Cubone","Mr. Mime","Dugtrio","Diglett","Omastar","Omanyte","Kabutops","Kabuto","Rhydon","Rhyhorn","Pinsir","Exeggutor","Exeggcute","Dewgong","Seel","Cloyster","Shellder","Murkrow","Alakazam","Kadabra","Abra","Hypno","Drowzee","Kingler","Krabby","Dodrio","Doduo","Seaking","Goldeen","Weezing","Koffing","Starmie","Staryu","Golduck","Psyduck","Furret","Sentret","Sneasel","Muk","Grimer","Politoed","Poliwrath","Poliwhirl","Poliwag","Xatu","Natu","Crobat","Golbat","Zubat","Blissey","Wigglytuff","Jigglypuff","Clefable","Clefairy","Raichu","Pikachu","Pichu"]),
  "Whirlpool":  new Set(["Feraligatr","Croconaw","Totodile","Lanturn","Chinchou","Azumarill","Marill","Politoed","Poliwrath","Poliwhirl","Poliwag","Quagsire","Wooper","Corsola","Remoraid","Octillery","Mantine","Kingdra","Seadra","Horsea","Slowking","Slowbro","Slowpoke","Gyarados","Lapras","Starmie","Staryu","Psyduck","Golduck","Tentacruel","Tentacool","Dewgong","Seel","Cloyster","Shellder","Vaporeon","Dragonite","Dragonair","Dratini","Qwilfish","Seaking","Goldeen","Omastar","Omanyte","Kabutops","Kabuto"]),
  "Rock Smash": new Set(["Heracross","Tyranitar","Pupitar","Larvitar","Sudowoodo","Donphan","Phanpy","Ursaring","Teddiursa","Steelix","Onix","Hitmontop","Hitmonlee","Hitmonchan","Tyrogue","Machamp","Machoke","Machop","Politoed","Poliwrath","Poliwhirl","Quagsire","Wooper","Forretress","Pineco","Corsola","Nidoking","Nidorino","Nidoran♂","Nidoqueen","Nidorina","Nidoran♀","Smeargle","Shuckle","Granbull","Snubbull","Marowak","Cubone","Feraligatr","Croconaw","Totodile","Ampharos","Flaaffy","Lickilicky","Lickitung","Omastar","Omanyte","Aerodactyl","Rhydon","Rhyhorn","Kangaskhan","Snorlax","Tauros","Primeape","Mankey","Magcargo","Slugma","Miltank","Pinsir","Blissey","Chansey"]),
  "Waterfall":  new Set(["Feraligatr","Croconaw","Totodile","Lanturn","Chinchou","Azumarill","Marill","Politoed","Poliwrath","Poliwhirl","Poliwag","Quagsire","Wooper","Corsola","Remoraid","Octillery","Mantine","Kingdra","Seadra","Horsea","Slowking","Slowbro","Slowpoke","Gyarados","Lapras","Starmie","Staryu","Psyduck","Golduck","Dewgong","Seel","Cloyster","Vaporeon","Dragonite","Dragonair","Dratini","Rhydon","Qwilfish","Seaking","Goldeen"]),
  "Rock Climb": new Set(["Tyranitar","Pupitar","Larvitar","Steelix","Onix","Donphan","Phanpy","Ursaring","Teddiursa","Heracross","Sudowoodo","Snorlax","Machamp","Machoke","Nidoking","Nidoqueen","Dragonite","Kangaskhan","Mamoswine","Piloswine","Swinub","Aerodactyl","Sneasel","Primeape","Mankey","Rhydon","Rhyhorn"]),
};

// Neutral Pokémon are listed first so they always outrank version-exclusive picks
// by pool-position score, even if the version check is somehow skipped.
// FR-exclusive follow neutral, LG-exclusive come last.

// HGSS TM tips — Game Corner (Goldenrod, Voltorb Flip) is the main repeatable source.
const DT_TM_TIPS = {
  // Electric
  "Ampharos":   [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Lanturn":    [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Jolteon":    [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Electabuzz": [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Magneton":   [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Electrode":  [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  "Raichu":     [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"}],
  // Ice
  "Feraligatr": [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Lapras":     [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Dewgong":    [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Cloyster":   [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Jynx":       [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Piloswine":  [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Mamoswine":  [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Slowbro":    [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Slowking":   [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Gyarados":   [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Starmie":    [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Kingdra":    [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Vaporeon":   [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Tyranitar":  [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Golduck":    [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Dragonite":  [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  // Fire
  "Typhlosion": [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Arcanine":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Ninetales":  [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Houndoom":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Magmar":     [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Flareon":    [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Magcargo":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  "Rapidash":   [{move:"Flamethrower",src:"TM35 — Goldenrod Game Corner (4,000 coins)"}],
  // Psychic
  "Espeon":     [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  "Alakazam":   [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  "Hypno":      [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  "Xatu":       [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  "Mr. Mime":   [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  "Exeggutor":  [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  "Girafarig":  [{move:"Psychic",src:"TM29 — Goldenrod Dept. Store (₽3,500)"}],
  // Nidoran lines
  "Nidoking":   [{move:"Thunderbolt",src:"TM24 — Goldenrod Game Corner (4,000 coins)"},{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
  "Nidoqueen":  [{move:"Ice Beam",src:"TM13 — Goldenrod Game Corner (4,000 coins)"}],
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
  "Mankey":"Primeape","Growlithe":"Arcanine",
  "Machop":"Machoke","Machoke":"Machamp",
  "Doduo":"Dodrio","Ponyta":"Rapidash",
  "Grimer":"Muk","Koffing":"Weezing",
  "Vulpix":"Ninetales","Scyther":"Scizor",
  "Phanpy":"Donphan",
  "Omanyte":"Omastar","Kabuto":"Kabutops",
  "Dratini":"Dragonite","Dragonair":"Dragonite",
};

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
  if (version === "HG" && cand.ssOnly) return -Infinity;
  if (version === "SS" && cand.hgOnly) return -Infinity;

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

  const poolRank = DT_CANDIDATES.indexOf(cand);
  const poolScore = poolRank >= 0 ? (DT_CANDIDATES.length - poolRank) * 0.1 : 0;

  return newHMs * 10 + newCov * 3 + newTypes * 2 - sharedWeak * 2 + poolScore;
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

function getDreamMoves(name, suppressedMoves, hms) {
  suppressedMoves = suppressedMoves || new Set();
  hms = hms || [];
  const finalForm = DT_FINAL_FORM[name] || name;
  const learnset = (LEARNSETS && (LEARNSETS[finalForm] || LEARNSETS[name])) || [];
  const tmTips   = DT_TM_TIPS[finalForm] || DT_TM_TIPS[name] || [];
  const result = [], used = new Set();
  // 1. HMs this Pokémon carries — fill slots first so they appear in the moveset
  for (const hm of hms) {
    if (result.length >= 4) break;
    result.push({ move:hm, src:"HM", kind:"hm" });
    used.add(hm);
  }
  // 2. TM tips — skip any one-time TM assigned to a different team member
  for (const t of tmTips) {
    if (result.length >= 4) break;
    if (suppressedMoves.has(t.move)) continue;
    result.push({ move:t.move, src:t.src, kind:"tm", oneTime:!!t.oneTime });
    used.add(t.move);
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
// Strategy: process rarest coverage first; consolidate onto whichever team member
// is already the HM carrier, tiebroken by total HM capability then team order.
function assignHMs(team, maxPerPokemon) {
  const max = maxPerPokemon || 3;
  const ALL_HMs = ["Fly","Surf","Waterfall","Whirlpool","Strength","Cut","Rock Smash"];
  const canLearn = {};
  team.forEach(name => { canLearn[name] = new Set(getDreamHMs(name)); });

  const candidates = {};
  ALL_HMs.forEach(hm => { candidates[hm] = team.filter(n => canLearn[n].has(hm)); });

  const assignments = {};
  const load = {};
  team.forEach(n => { load[n] = 0; });

  // Priority override: Lapras always carries both water HMs when present (respects cap)
  for (const waterHM of ["Surf", "Waterfall"]) {
    if (team.includes("Lapras") && (candidates[waterHM] || []).includes("Lapras") && load["Lapras"] < max) {
      assignments[waterHM] = "Lapras";
      load["Lapras"]++;
    }
  }

  // Process remaining HMs — fewest carriers first so forced assignments win
  const sorted = ALL_HMs.filter(hm => !assignments[hm] && candidates[hm] && candidates[hm].length > 0)
    .sort((a, b) => candidates[a].length - candidates[b].length);

  for (const hm of sorted) {
    const avail = candidates[hm].filter(n => load[n] < max);
    if (!avail.length) continue;
    const winner = avail.reduce((best, cur) => {
      const curSTAB = hasSTAB(cur, hm), bestSTAB = hasSTAB(best, hm);
      if (curSTAB !== bestSTAB) return curSTAB ? cur : best;
      // Prefer the weaker Pokémon (higher pool index = listed later = less battle value)
      const curForm = DT_FINAL_FORM[cur] || cur, bestForm = DT_FINAL_FORM[best] || best;
      const curRank = DT_CANDIDATES.findIndex(c => c.name === curForm);
      const bestRank = DT_CANDIDATES.findIndex(c => c.name === bestForm);
      if (curRank !== bestRank) return curRank > bestRank ? cur : best;
      if (load[cur] !== load[best]) return load[cur] > load[best] ? cur : best;
      const curCap = canLearn[cur].size, bestCap = canLearn[best].size;
      if (curCap !== bestCap) return curCap > bestCap ? cur : best;
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
  for (const [base, final] of Object.entries(DT_FINAL_FORM)) {
    if (final !== name) continue;
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
    id:"story", title:"Story Milestones", color:"#c8960a",
    items:[
      { id:"johto-champ", label:"Defeat Elite Four + Champion Lance", note:"Complete the Johto League" },
      { id:"kanto-champ", label:"Defeat Red on Mt. Silver", note:"Complete the Kanto post-game" },
    ]
  },
  // TODO: Expand with HGSS-specific checklist items
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
  Flamethrower:"Fire","Fire Blast":"Fire","Fire Punch":"Fire","Will-O-Wisp":"Fire",
  // Water
  "Ice Beam":"Ice",Blizzard:"Ice","Ice Punch":"Ice","Sheer Cold":"Ice",
  // Ground
  Earthquake:"Ground",Fissure:"Ground",
  // Grass
  SolarBeam:"Grass","Razor Leaf":"Grass","Vine Whip":"Grass","Petal Dance":"Grass",
  "Giga Drain":"Grass","Sleep Powder":"Grass",Spore:"Grass","Leech Seed":"Grass",
  // Poison
  "Sludge Bomb":"Poison",Toxic:"Poison","Poison Fang":"Poison",
  // Psychic
  Psychic:"Psychic",Psybeam:"Psychic","Future Sight":"Psychic",
  Amnesia:"Psychic",Agility:"Psychic",Hypnosis:"Psychic",
  // Bug
  Megahorn:"Bug","Silver Wind":"Bug",Twineedle:"Bug","Pin Missile":"Bug","Leech Life":"Bug",
  // Rock
  "Rock Slide":"Rock",AncientPower:"Rock",
  // Ghost
  "Shadow Ball":"Ghost","Confuse Ray":"Ghost",Lick:"Ghost",
  // Dragon
  Outrage:"Dragon","Dragon Rage":"Dragon",Twister:"Dragon","Dragon Dance":"Dragon","Dragon Claw":"Dragon",
  // Dark
  Crunch:"Dark",Pursuit:"Dark",Bite:"Dark",
  // Steel
  "Iron Tail":"Steel","Metal Claw":"Steel","Meteor Mash":"Steel",
  // Fighting
  "Brick Break":"Fighting","High Jump Kick":"Fighting","Hi Jump Kick":"Fighting",
  "Sky Uppercut":"Fighting",Submission:"Fighting",Superpower:"Fighting",
  "Rock Smash":"Fighting","Karate Chop":"Fighting","Low Kick":"Fighting",
  // Normal (damaging)
  "Hyper Beam":"Normal","Body Slam":"Normal",Thrash:"Normal","Hyper Voice":"Normal",
  "Skull Bash":"Normal",ExtremeSpeed:"Normal","Hyper Fang":"Normal","Super Fang":"Normal",
  Slash:"Normal","Tri Attack":"Normal","Rapid Spin":"Normal",Swift:"Normal",
  "Wing Attack":"Flying","Drill Peck":"Flying","Air Cutter":"Flying","Aerial Ace":"Flying",
  "Water Gun":"Water","Hydro Pump":"Water",
  Slam:"Normal","Wrap":"Normal","Horn Drill":"Normal","Guillotine":"Normal",
  Endeavor:"Normal","Spit Up":"Normal","Mirror Move":"Flying",
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
  "Fire Punch":     { bp:75,  acc:100, pp:15 },
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
  Twineedle:        { bp:25,  acc:100, pp:20 },
  "Pin Missile":    { bp:14,  acc:85,  pp:20 },
  "Leech Life":     { bp:20,  acc:100, pp:15 },
  // Rock
  "Rock Slide":     { bp:75,  acc:90,  pp:10 },
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
  // Steel
  "Iron Tail":      { bp:100, acc:75,  pp:15 },
  "Metal Claw":     { bp:50,  acc:95,  pp:35 },
  "Meteor Mash":    { bp:100, acc:85,  pp:10 },
  // Fighting
  "Brick Break":    { bp:75,  acc:100, pp:15 },
  "High Jump Kick": { bp:85,  acc:90,  pp:20 },
  "Hi Jump Kick":   { bp:85,  acc:90,  pp:20 },
  "Sky Uppercut":   { bp:85,  acc:90,  pp:15 },
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
  // Water
  "Water Gun":      { bp:40,  acc:100, pp:25 },
  "Hydro Pump":     { bp:120, acc:80,  pp:5  },
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
};
const STATUS_MOVES = new Set([
  "Swords Dance","Amnesia","Agility","Dragon Dance","Belly Drum",
  "Sleep Powder","Spore","Hypnosis","Toxic","Leech Seed","Protect",
  "Rain Dance","Sunny Day","Sandstorm","Safeguard","Thunder Wave",
  "Will-O-Wisp","Confuse Ray","Stockpile","Swallow","Softboiled",
  "Mean Look","Scary Face","Focus Energy","Mirror Move","Flash",
  "Leer","Growl","Tail Whip","String Shot","Disable","Encore","Glare","Screech",
]);
function getMoveSuper(moveName) {
  const type = MOVE_TYPES[moveName];
  if (!type || STATUS_MOVES.has(moveName)) return [];
  const row = TYPE_CHART[type] || {};
  return TYPES_17.filter(def => row[def] === 2);
}

// Parts that have been fully audited against the Bulbapedia walkthrough — extend as each part is verified.
const AUDITED_PARTS = new Set(["Part 1","Part 2","Part 3","Part 4","Part 5","Part 6","Part 7","Part 8","(Return Visits)"]);
// ─── CATCH RATE DATA ──────────────────────────────────────────────────────────
// Gen III base catch rates for all 151 Kanto Pokémon (FRLG)
const CATCH_RATE_DATA = []; // TODO: Add HGSS base catch rates
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
      background: skyBg, height:80, transition:"background 0.85s ease",
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
      <div style={{ position:"absolute", left:14, bottom:14, fontFamily:"'DM Sans',sans-serif" }}>
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
      <div style={{ position:"absolute", bottom:14, right:16, display:"flex", gap:5 }}>
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
      {/* Period progress bar — bottom edge */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.07)" }}>
        <div style={{ height:"100%", width:`${Math.min(progress,1)*100}%`, background:realTc.badge, opacity:0.5, borderRadius:"0 2px 2px 0" }} />
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
  const OVERLAY_SYNC_URL = "https://frlg.nabunan.com/state";
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
    const kdc = DEX.filter(p => !p.event && caught[p.name]).length;
    const as = {
      "kanto-dex": kdc >= 150,
      "farfetchd":  !!caught["Farfetch'd"],
      "jynx":       !!caught["Jynx"],
      "mr-mime":    !!caught["Mr. Mime"],
      "lickitung":  !!caught["Lickitung"],
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
  }, [caught, checklist]);

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
            ["team","Team","primary"],["battle","Battle","primary"],
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
      {tab === "areas" && <AreasTab caught={caught} toggleCaught={toggleCaught} items={items} toggleItem={toggleItem} trainers={trainers} toggleTrainer={toggleTrainer} trades={trades} toggleTrade={toggleTrade} areaId={areaId} setAreaId={setAreaId} area={area} search={search} setSearch={setSearch} version={version} isMobile={isMobile} choiceGroups={choiceGroups} timeFilter={timeFilter} setTime={setTime} />}

      {/* ── Tab: Dream Team ── */}
      {tab === "team" && <DreamTeamTab isMobile={isMobile} version={version} />}

      {/* ── Tab: Gym Matchup ── */}
      {tab === "gyms" && <GymTab isMobile={isMobile} />}

      {tab === "battle" && <BattleTab />}

      {/* ── Tab: Evolution Planner ── */}
      {tab === "evo" && <EvoTab caught={caught} toggleCaught={toggleCaught} version={version} />}

      {tab === "types" && <TypeChartTab isMobile={isMobile} />}

      {/* ── Tab: Catch Calc ── */}
      {tab === "calc" && <CatchCalcTab isMobile={isMobile} />}

      {/* ── Tab: Hunt ── */}
      {tab === "hunt" && <HuntTab version={version} isMobile={isMobile} />}

      {/* ── Tab: TMs & HMs ── */}
      {tab === "tms" && <TMsTab tmState={tmState} />}

      {/* ── Tab: Remaining ── */}
      {tab === "remain" && <RemainingTab items={items} toggleItem={toggleItem} trainers={trainers} toggleTrainer={toggleTrainer} choiceGroups={choiceGroups} setAreaId={setAreaId} setTabAndSave={setTabAndSave} />}

      {/* ── Tab: Recurring Items ── */}
      {tab === "recurring" && <RecurringTab sweeps={sweeps} markSwept={markSwept} />}

      {/* ── Tab: PC Boxes ── */}
      {tab === "boxes" && <BoxTab />}

      {/* ── Tab: 100% Completion ── */}
      {tab === "completion" && <CompletionTab caught={caught} checklist={checklist} toggleChecklist={toggleChecklist} isMobile={isMobile} />}
      </div>

      {/* Tier-1 ceremony overlay (8th badge / legendary catch) */}
      <CeremonyHost queue={ceremonyQueue} onDone={popCeremony} />
    </div>
  );
}

// ─── DREAM TEAM TAB ───────────────────────────────────────────────────────────
function DreamTeamTab({ isMobile, version }) {
  const [favorite,        setFavorite]        = React.useState("");
  const [pins,            setPins]            = React.useState({});   // {slotIdx: name}
  const [expandedAltSlot, setExpandedAltSlot] = React.useState(null);
  const [hmPerPokemon,    setHmPerPokemon]    = React.useState(3);

  React.useEffect(() => {
    try {
      const r = localStorage.getItem("hgss-dream-team-v1");
      if (r) {
        const d = JSON.parse(r);
        if (d.favorite) setFavorite(d.favorite);
        if (d.pins) setPins(d.pins);
        if (d.hmPerPokemon) setHmPerPokemon(d.hmPerPokemon);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (!favorite) return;
    try { localStorage.setItem("hgss-dream-team-v1", JSON.stringify({ favorite, pins, version, hmPerPokemon })); } catch {}
  }, [favorite, pins, version, hmPerPokemon]);

  // Drop version-conflicting pins when version changes
  React.useEffect(() => {
    setPins(prev => {
      const next = {};
      for (const [k, name] of Object.entries(prev)) {
        const form = DT_FINAL_FORM[name] || name;
        const cand = DT_CANDIDATES.find(c => c.name === form);
        if (cand && ((version === "HG" && cand.ssOnly) || (version === "SS" && cand.hgOnly))) continue;
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
  const needsTrade   = cand => cand && ((version === "HG" && cand.ssOnly) || (version === "SS" && cand.hgOnly));

  const FavSelect = () => (
    <select value={favorite} onChange={e => { setFavorite(e.target.value); setPins({}); setExpandedAltSlot(null); }}
      style={{ flex:1, minWidth:160, background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, color:favorite ? C.text : C.muted, padding:"8px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:13, borderRadius:6, outline:"none" }}>
      <option value="">Choose your favourite Pokémon…</option>
      {eligible.map(p => {
        const cand = DT_CANDIDATES.find(c => c.name === (DT_FINAL_FORM[p.name] || p.name));
        const vl = cand ? versionLabel(cand) : null;
        const trade = cand ? needsTrade(cand) : false;
        const suffix = trade ? ` (${vl} — needs trade)` : vl ? ` (${vl})` : "";
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
  const hmsMissing   = ["Fly","Surf","Waterfall","Whirlpool","Strength","Cut","Rock Smash"].filter(h => !hmsCovered.has(h));

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
            if (version === "HG" && cand.ssOnly) return false;
            if (version === "SS" && cand.hgOnly) return false;
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
  const [selected, setSelected] = useState(CATCH_RATE_DATA[0]);
  const [hpPct, setHpPct]       = useState(100);
  const [status, setStatus]     = useState("none");
  const [ballKey, setBallKey]   = useState("poke");
  const [search, setSearch]     = useState("");

  const BALLS = [
    {key:"poke",  label:"Poké Ball",  bonus:1},
    {key:"great", label:"Great Ball", bonus:1.5},
    {key:"ultra", label:"Ultra Ball", bonus:2},
  ];
  const STATUS_OPTS = [
    {key:"none", label:"None",       mult:1},
    {key:"par",  label:"PAR / BRN / PSN", mult:1.5},
    {key:"slp",  label:"SLP / FRZ",  mult:2},
  ];

  const ball   = BALLS.find(b => b.key === ballKey);
  const stOpt  = STATUS_OPTS.find(s => s.key === status);

  const calcA = (catchRate, hpFraction, statusMult, ballBonus) => {
    // Gen III formula: a = floor(((3×HP_max − 2×HP_current) / (3×HP_max)) × catchRate × ballBonus × statusMult)
    // Expressed in terms of hpFraction (0..1 = current/max):
    return Math.min(255, Math.floor(((3 - 2 * hpFraction) / 3) * catchRate * ballBonus * statusMult));
  };

  const hpFraction = hpPct / 100;
  const a = calcA(selected.rate, hpFraction, stOpt.mult, ball.bonus);
  const p = a / 255;

  // Cumulative probability: P(catch within n throws) = 1 − (1−p)^n
  // Solve for n: n = ceil(log(1 − target) / log(1 − p))
  const throwsFor = (target) => {
    if (p >= 1) return 1;
    if (p <= 0) return Infinity;
    return Math.ceil(Math.log(1 - target) / Math.log(1 - p));
  };

  const milestones = [
    {label:"50%",  n:throwsFor(0.50)},
    {label:"75%",  n:throwsFor(0.75)},
    {label:"90%",  n:throwsFor(0.90)},
    {label:"95%",  n:throwsFor(0.95)},
    {label:"99%",  n:throwsFor(0.99)},
  ];

  const expected = p > 0 ? (1 / p) : Infinity;

  const filteredPokemon = CATCH_RATE_DATA.filter(pk =>
    pk.name.toLowerCase().includes(search.toLowerCase())
  );

  const pill = (active, label, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding:"5px 12px", border:`1px solid ${active ? "var(--hgss-accent)" : C.border}`,
      borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:"600",
      background: active ? "var(--hgss-accent)" : "rgba(0,0,0,0.3)",
      color: active ? "#fff" : C.muted, transition:"all 0.15s",
      fontFamily:"'DM Sans',sans-serif",
    }}>{label}</button>
  );

  const sectionLabel = (text) => (
    <div style={{ fontSize:10, fontWeight:"700", letterSpacing:"0.08em", color:C.muted,
                  textTransform:"uppercase", marginBottom:6 }}>{text}</div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
    <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:16,
                  padding:"16px", maxWidth:960, margin:"0 auto" }}>

      {/* ── Left: Pokémon picker ── */}
      <div style={{ flex:"0 0 auto", width:isMobile?"100%":280 }}>
        <div style={{ background:C.card, borderRadius:10, border:`1px solid ${C.border}`,
                      overflow:"hidden" }}>
          <div style={{ padding:"10px 12px", borderBottom:`1px solid ${C.border}` }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Pokémon…"
              style={{
                width:"100%", boxSizing:"border-box",
                padding:"6px 10px", borderRadius:6,
                border:`1px solid ${C.border}`, background:"rgba(0,0,0,0.3)",
                color:C.text, fontSize:16, fontFamily:"'DM Sans',sans-serif", outline:"none",
              }}
            />
          </div>
          <div style={{ overflowY:"auto", maxHeight:isMobile?200:480 }}>
            {filteredPokemon.map(pk => {
              const isSelected = pk.id === selected.id;
              return (
                <div key={pk.id} onClick={() => setSelected(pk)}
                  style={{
                    display:"flex", alignItems:"center", gap:8,
                    padding:"6px 12px", cursor:"pointer",
                    background: isSelected ? "rgba(var(--hgss-accent-rgb,212,98,26),0.18)" : "transparent",
                    borderLeft: isSelected ? "3px solid var(--hgss-accent)" : "3px solid transparent",
                    transition:"background 0.1s",
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background="transparent"; }}
                >
                  <img src={pokeSpriteUrl(pk.id)} alt={pk.name} width={32} height={32}
                    style={{ imageRendering:"pixelated" }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:"600", color:C.text,
                                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pk.name}</div>
                    <div style={{ fontSize:10, color:C.muted }}>Catch rate: {pk.rate}</div>
                  </div>
                </div>
              );
            })}
            {filteredPokemon.length === 0 && (
              <div style={{ padding:16, textAlign:"center", color:C.muted, fontSize:12 }}>No Pokémon found</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right: Calculator ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>

        {/* Selected Pokémon header */}
        <div style={{ background:C.card, borderRadius:10, border:`1px solid ${C.border}`,
                      padding:"16px 20px", display:"flex", alignItems:"center", gap:16 }}>
          <img src={pokeSpriteUrl(selected.id)} alt={selected.name} width={64} height={64}
            style={{ imageRendering:"pixelated" }} />
          <div>
            <div style={{ fontSize:18, fontWeight:"700", color:C.text }}>{selected.name}</div>
            <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>
              Base catch rate: <span style={{ color:C.text, fontWeight:"600" }}>{selected.rate}</span>
              <span style={{ color:C.muted }}> / 255</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>
              {selected.rate <= 3 ? "Legendary — extremely hard to catch" :
               selected.rate <= 45 ? "Uncommon catch rate" :
               selected.rate <= 100 ? "Moderate catch rate" : "Common catch rate"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ background:C.card, borderRadius:10, border:`1px solid ${C.border}`,
                      padding:"16px 20px", display:"flex", flexDirection:"column", gap:16 }}>

          {/* HP % slider */}
          <div>
            {sectionLabel("Current HP")}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <input type="range" min={1} max={100} value={hpPct}
                onChange={e => setHpPct(Number(e.target.value))}
                style={{ flex:1, accentColor:"var(--hgss-accent)" }} />
              <div style={{
                width:52, textAlign:"center", padding:"3px 6px",
                background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
                borderRadius:6, fontSize:13, fontWeight:"700", color:C.text,
              }}>{hpPct}%</div>
            </div>
            <div style={{ display:"flex", gap:6, marginTop:8 }}>
              {[100,75,50,25,12,1].map(v => pill(hpPct===v, `${v}%`, () => setHpPct(v)))}
            </div>
          </div>

          {/* Status */}
          <div>
            {sectionLabel("Status Condition")}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {STATUS_OPTS.map(s => pill(status===s.key, s.label, () => setStatus(s.key)))}
            </div>
          </div>

          {/* Ball type */}
          <div>
            {sectionLabel("Poké Ball")}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {BALLS.map(b => pill(ballKey===b.key, b.label, () => setBallKey(b.key)))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ background:C.card, borderRadius:10, border:`1px solid ${C.border}`,
                      padding:"16px 20px" }}>
          {sectionLabel("Results")}

          {/* Formula line */}
          <div style={{ fontSize:11, color:C.muted, fontFamily:"'Courier New',monospace",
                        marginBottom:12, padding:"6px 10px",
                        background:"rgba(0,0,0,0.3)", borderRadius:6, border:`1px solid ${C.border}` }}>
            a = floor(((3×HP_max − 2×HP_current) / (3×HP_max)) × {selected.rate} × {ball.bonus} × {stOpt.mult}) = <strong style={{color:C.text}}>{a}</strong>
          </div>

          {/* Catch probability */}
          <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
            {[
              ["Catch chance / ball", `${(p * 100).toFixed(2)}%`, p >= 0.5 ? "#4caf50" : p >= 0.2 ? "#ff9800" : "#ef5350"],
              ["Expected balls", p > 0 ? (expected < 1000 ? expected.toFixed(1) : ">1000") : "∞", C.text],
            ].map(([label, value, color]) => (
              <div key={label} style={{
                flex:1, minWidth:120, padding:"12px 16px",
                background:"rgba(0,0,0,0.3)", borderRadius:8, border:`1px solid ${C.border}`,
                textAlign:"center",
              }}>
                <div style={{ fontSize:10, color:C.muted, marginBottom:4, textTransform:"uppercase",
                               letterSpacing:"0.06em", fontWeight:"700" }}>{label}</div>
                <div style={{ fontSize:22, fontWeight:"700", color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Milestone table */}
          <div>
            {sectionLabel("Cumulative catch probability")}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {milestones.map(({label, n}) => (
                <div key={label} style={{
                  flex:1, minWidth:80, padding:"8px 10px",
                  background:"rgba(0,0,0,0.3)", borderRadius:8, border:`1px solid ${C.border}`,
                  textAlign:"center",
                }}>
                  <div style={{ fontSize:11, fontWeight:"700", color:"var(--hgss-accent)" }}>{label}</div>
                  <div style={{ fontSize:16, fontWeight:"700", color:C.text, marginTop:2 }}>
                    {n === Infinity ? "∞" : `${n}`}
                  </div>
                  <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>
                    {n === 1 ? "ball" : "balls"}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:10, color:C.muted, marginTop:10 }}>
              Number of Poké Balls needed to have at least that cumulative chance of catching.
              {selected.rate <= 3 && (
                <span style={{ color:"#ef5350" }}> Tip: use Ultra Ball + Sleep/Freeze for legendaries.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// ─── HUNT TAB ─────────────────────────────────────────────────────────────────
function HuntTab({ version, isMobile }) {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);

  // All Pokémon that appear in any area, ordered by dex number
  const allNames = useMemo(() =>
    Object.keys(LOCATION_MAP).sort((a, b) => (JOHTO_DEX_ID[a] || 999) - (JOHTO_DEX_ID[b] || 999)),
    []
  );
  const filteredNames = search.trim()
    ? allNames.filter(n => n.toLowerCase().includes(search.toLowerCase().trim()))
    : allNames;

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
        const splitMatch = loc.rate && loc.rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
        let pct;
        if (splitMatch) {
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

  const listPanel = (
    <div style={{ display:"flex", flexDirection:"column", gap:0,
                  background:C.card, borderRadius:8, border:`1px solid ${C.border}`,
                  overflow:"hidden", flexShrink:0,
                  width: isMobile ? "100%" : 200 }}>
      <div style={{ padding:"8px 10px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }}
          placeholder="Search Pokémon…"
          style={{ width:"100%", boxSizing:"border-box", background:"rgba(0,0,0,0.3)",
                   border:`1px solid ${C.border}`, borderRadius:6, color:C.text,
                   fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:16,
                   padding:"5px 8px", outline:"none" }} />
      </div>
      <div style={{ overflowY:"auto", maxHeight: isMobile ? 180 : "calc(100vh - 220px)" }}>
        {filteredNames.length === 0 && (
          <div style={{ padding:16, fontSize:12, color:C.muted, textAlign:"center" }}>No results</div>
        )}
        {filteredNames.map(name => {
          const id = allDexId(name);
          const isSel = name === selected;
          return (
            <button key={name} onClick={() => setSelected(name)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:8,
                       padding:"6px 10px", background: isSel ? "rgba(var(--hgss-accent-rgb,212,98,26),0.15)" : "transparent",
                       border:"none", borderBottom:`1px solid ${C.border}30`, cursor:"pointer",
                       borderLeft: isSel ? "3px solid var(--hgss-accent)" : "3px solid transparent",
                       textAlign:"left" }}>
              {id && <img src={pokeSpriteUrl(id)} alt={name}
                style={{ width:28, height:28, imageRendering:"pixelated", flexShrink:0 }} />}
              <span style={{ fontSize:12, fontWeight: isSel ? "700" : "400",
                             color: isSel ? C.text : C.muted }}>{name}</span>
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
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            {dexId && <img src={pokeSpriteUrl(dexId)} alt={selected}
              style={{ width:48, height:48, imageRendering:"pixelated" }} />}
            <div>
              <div style={{ fontSize:18, fontWeight:"700", color:C.text }}>{selected}</div>
              {dexId && <div style={{ fontSize:10, color:C.muted, fontFamily:"'Courier New',monospace" }}>
                #{String(dexId).padStart(3,"0")}
              </div>}
            </div>
          </div>

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
                        <RateDisplay rate={loc.rate} isMobile={isMobile} />
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
function CompletionTab({ caught, checklist, toggleChecklist, isMobile }) {
  const kantoDexCount = useMemo(() =>
    DEX.filter(p => !p.event && caught[p.name]).length, [caught]);

  const autoState = {
    "kanto-dex": kantoDexCount >= 150,
    "farfetchd":  !!caught["Farfetch'd"],
    "jynx":       !!caught["Jynx"],
    "mr-mime":    !!caught["Mr. Mime"],
    "lickitung":  !!caught["Lickitung"],
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
                            {item.auto === "kanto-dex" && (
                              <span style={{ marginLeft:5, fontWeight:"600",
                                             color: kantoDexCount >= 150 ? C.green : C.gold }}>
                                ({kantoDexCount}/150)
                              </span>
                            )}
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
            Gen II Pokémon found in the Sevii Islands post-game. Includes wild catches, gifts, and evolutions of Kanto Pokémon achievable in FRLG.
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
                  <div style={{ fontSize:8, color:C.muted, fontFamily:"'Courier New',monospace" }}>#{String(p.johtoId).padStart(3,"0")}</div>
                  <div style={{ fontSize:9, color:isCaught?C.green:C.text, fontWeight:isCaught?"600":"400", lineHeight:1.2, wordBreak:"break-word" }}>{p.name}</div>
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
  const caughtCount = Object.keys(caught).length;
  const filters = [["all","All"],["caught","Caught"],["missing","Missing"],["hg","HG Only"],["ss","SS Only"],["event","Event"],["noball","No Poké Ball"]];
  const isOtherVersionDex = (p) => (version === "hg" && p.ssOnly) || (version === "ss" && p.hgOnly);
  const [dexSearch, setDexSearch] = React.useState("");

  const filtered = DEX.filter(p => {
    if (dexFilter === "caught")  return caught[p.name];
    if (dexFilter === "missing") return !caught[p.name] && !isOtherVersionDex(p);
    if (dexFilter === "hg")      return p.hgOnly;
    if (dexFilter === "ss")      return p.ssOnly;
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
            <TickNumber value={caughtCount} color={C.green} style={{ fontWeight:"600" }} /><span>/ 151</span>
            <div style={{ width:80, height:5, background:"rgba(0,0,0,0.3)", borderRadius:99, overflow:"hidden" }}>
              <div className="hgss-fill-bar" style={{ height:"100%", width:`${pct(caughtCount,151)}%`, background:C.green, borderRadius:99 }} />
            </div>
            <TickNumber value={`${pct(caughtCount,151)}%`} color={C.text} style={{ fontWeight:"600" }} />
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
        const moves = LEARNSETS[selected.name];
        const delay = EVO_DELAY[selected.name];
        if ((!moves || moves.length === 0) && !delay) return null;
        return (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:8, textTransform:"uppercase" }}>Level-up Moves</div>
            {moves && moves.length > 0 && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px 12px", marginBottom: delay ? 8 : 0 }}>
                {moves.map((m, i) => {
                  const isGood = MOVE_TIERS.good.has(m.move);
                  const isSkip = MOVE_TIERS.skip.has(m.move);
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"baseline", gap:5, padding:"2px 0" }}>
                      <span style={{ fontSize:10, fontWeight:"700", color:C.gold, fontFamily:"'Courier New',monospace", minWidth:20, textAlign:"right" }}>{m.lv}</span>
                      <span style={{ fontSize:10, color: isGood ? C.green : isSkip ? C.muted : C.text }}>{m.move}</span>
                    </div>
                  );
                })}
              </div>
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

// ─── AREAS TAB ────────────────────────────────────────────────────────────────
function AreasTab({ caught, toggleCaught, items, toggleItem, trainers, toggleTrainer, trades, toggleTrade, areaId, setAreaId, area, search, setSearch, version, isMobile, choiceGroups, timeFilter, setTime }) {
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
    Object.entries(groups).forEach(([part, list]) => {
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
    Object.entries(groups).forEach(([part, list]) => {
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
        {filtered
          ? filtered.map(a => <AreaRow key={a.id} area={a} areaId={areaId} setAreaId={setAreaId} caught={caught} items={items} trainers={trainers} trades={trades} version={version} choiceGroups={choiceGroups} areaNotes={areaNotes} />)
          : Object.entries(groups).map(([part, list]) => {
              const isCollapsed = collapsedParts.has(part);
              const isDone = partFullDone[part];
              const isSoft = partSoftDone[part];
              const partColor = isDone ? C.green : isSoft ? C.gold : C.muted;
              return (
                <div key={part}>
                  <div onClick={() => togglePart(part)} style={{ padding:"6px 12px 6px 10px", fontSize:10, letterSpacing:2, color: partColor, textTransform:"uppercase", background:"rgba(0,0,0,0.2)", borderBottom:`1px solid ${C.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", userSelect:"none" }}>
                    <span>{isDone ? "✓ " : isSoft ? "~ " : ""}{part}</span>
                    <span style={{ fontSize:11, opacity:0.6, marginLeft:6 }}>{isCollapsed ? "▶" : "▼"}</span>
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
  // Sort within each consecutive method block by effective rate descending.
  // Method block order is preserved; only intra-group ordering changes.
  const getPct = p => {
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
      : <PokemonEntry key={item.key} p={item.p} caught={caught} toggleCaught={toggleCaught} version={version} isMobile={isMobile} choiceGroups={choiceGroups} areaId={areaId} trades={trades} toggleTrade={toggleTrade} />
  );
}

function PokemonEntry({ p, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade }) {
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
  const splitMatch = p.rate && p.rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
  const currentPct = splitMatch
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
          {p.name}{p.hgOnly&&<Tag color={C.hgGold}>HG</Tag>}{p.ssOnly&&<Tag color={C.ssSilver}>SS</Tag>}
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
        {p.time && TIME_COLORS[p.time] && (() => { const tc=TIME_COLORS[p.time]; const label=p.time==="morning"?"Morning":p.time==="day"?"Day":"Night"; return (
          <span style={{ fontSize:9, fontWeight:"700", color:tc.badge, background:tc.badgeBg, border:`1px solid ${tc.badge}60`, padding:"1px 5px", borderRadius:99, letterSpacing:0.3, whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:3 }}><img src={tc.icon} style={{width:10,height:10,objectFit:"contain",display:"block"}} />{label}</span>
        ); })()}
        <RateDisplay rate={p.rate} isMobile={isMobile} />
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
function RateDisplay({ rate, isMobile }) {
  const [pos, setPos] = useState(null);
  const ref = React.useRef(null);
  if (!rate) return null;

  const splitMatch = rate.match(/^(\S+)\s+FR\s*\/\s*(\S+)\s+LG$/i);
  const isOneTime  = rate === "×1";

  const frPct     = splitMatch ? parseRatePct(splitMatch[1]) : null;
  const lgPct     = splitMatch ? parseRatePct(splitMatch[2]) : null;
  const simplePct = (!splitMatch && !isOneTime) ? parseRatePct(rate) : null;
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
    return <span style={{ fontSize:12, fontWeight:"700", color:rateColor, whiteSpace:"nowrap" }}>{rate}</span>;
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

const RECURRING_AREAS = [
  // TODO: Add HGSS recurring item areas (apricorn trees, etc.)
];
function RecurringTab({ sweeps, markSwept }) {
  const sorted = [...RECURRING_AREAS].sort((a, b) => {
    const ta = sweeps[a.id] || 0;
    const tb = sweeps[b.id] || 0;
    return ta - tb;
  });

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
    <div style={{ maxWidth:600, margin:"0 auto", padding:"20px 16px" }}>
      <div style={{ fontSize:11, color:C.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>
        Recurring Items Schedule
      </div>
      <div style={{ fontSize:11, color:C.muted, marginBottom:20, lineHeight:1.6 }}>
        Recurring hidden items respawn periodically. Sorted oldest-swept first — sweep the top areas first.
      </div>
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

function BoxTab() {
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

  const allPokemon = useM(() => [...DEX, ...NATIONAL_DEX], []);

  const boxes = useM(() => {
    const result = [];
    for (let i = 0; i < allPokemon.length; i += BOX_SIZE) {
      result.push(allPokemon.slice(i, i + BOX_SIZE));
    }
    return result;
  }, [allPokemon]);

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
          <div key={boxIdx} style={{ marginBottom:24 }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"repeat(10, 1fr)", gap:3 }}>
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
