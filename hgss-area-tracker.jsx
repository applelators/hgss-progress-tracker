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

// ─── JOHTO DEX (251) ────────────────────────────────────────────────────────
const DEX = [
  // TODO: Add all 251 Johto Pokémon entries in Phase 2
];
const DEX = [
  {id:1,  name:"Bulbasaur"},   {id:2,  name:"Ivysaur"},      {id:3,  name:"Venusaur"},
  {id:4,  name:"Charmander"},  {id:5,  name:"Charmeleon"},   {id:6,  name:"Charizard"},
  {id:7,  name:"Squirtle"},    {id:8,  name:"Wartortle"},    {id:9,  name:"Blastoise"},
  {id:10, name:"Caterpie"},    {id:11, name:"Metapod"},      {id:12, name:"Butterfree"},
  {id:13, name:"Weedle"},      {id:14, name:"Kakuna"},       {id:15, name:"Beedrill"},
  {id:16, name:"Pidgey"},      {id:17, name:"Pidgeotto"},    {id:18, name:"Pidgeot"},
  {id:19, name:"Rattata"},     {id:20, name:"Raticate"},     {id:21, name:"Spearow"},
  {id:22, name:"Fearow"},      {id:23, name:"Ekans",    hgOnly:true}, {id:24, name:"Arbok",    hgOnly:true},
  {id:25, name:"Pikachu"},     {id:26, name:"Raichu"},
  {id:27, name:"Sandshrew",ssOnly:true},{id:28,name:"Sandslash",ssOnly:true},
  {id:29, name:"Nidoran♀"},   {id:30, name:"Nidorina"},     {id:31, name:"Nidoqueen"},
  {id:32, name:"Nidoran♂"},   {id:33, name:"Nidorino"},     {id:34, name:"Nidoking"},
  {id:35, name:"Clefairy"},    {id:36, name:"Clefable"},
  {id:37, name:"Vulpix",  ssOnly:true}, {id:38, name:"Ninetales",ssOnly:true},
  {id:39, name:"Jigglypuff"}, {id:40, name:"Wigglytuff"},
  {id:41, name:"Zubat"},       {id:42, name:"Golbat"},
  {id:43, name:"Oddish",  hgOnly:true}, {id:44, name:"Gloom",   hgOnly:true}, {id:45, name:"Vileplume",hgOnly:true},
  {id:46, name:"Paras"},       {id:47, name:"Parasect"},
  {id:48, name:"Venonat"},     {id:49, name:"Venomoth"},
  {id:50, name:"Diglett"},     {id:51, name:"Dugtrio"},
  {id:52, name:"Meowth"},               {id:53, name:"Persian"},
  {id:54, name:"Psyduck",  hgOnly:true},{id:55, name:"Golduck",  hgOnly:true},
  {id:56, name:"Mankey"},              {id:57, name:"Primeape"},
  {id:58, name:"Growlithe",hgOnly:true},{id:59, name:"Arcanine", hgOnly:true},
  {id:60, name:"Poliwag"},     {id:61, name:"Poliwhirl"},    {id:62, name:"Poliwrath"},
  {id:63, name:"Abra"},        {id:64, name:"Kadabra"},      {id:65, name:"Alakazam"},
  {id:66, name:"Machop"},      {id:67, name:"Machoke"},      {id:68, name:"Machamp"},
  {id:69, name:"Bellsprout",ssOnly:true},{id:70,name:"Weepinbell",ssOnly:true},{id:71,name:"Victreebel",ssOnly:true},
  {id:72, name:"Tentacool"},   {id:73, name:"Tentacruel"},
  {id:74, name:"Geodude"},     {id:75, name:"Graveler"},     {id:76, name:"Golem"},
  {id:77, name:"Ponyta"},      {id:78, name:"Rapidash"},
  {id:79, name:"Slowpoke",ssOnly:true}, {id:80, name:"Slowbro",ssOnly:true},
  {id:81, name:"Magnemite"},   {id:82, name:"Magneton"},
  {id:83, name:"Farfetch'd"},  {id:84, name:"Doduo"},        {id:85, name:"Dodrio"},
  {id:86, name:"Seel"},        {id:87, name:"Dewgong"},
  {id:88, name:"Grimer"},      {id:89, name:"Muk"},
  {id:90, name:"Shellder",hgOnly:true}, {id:91, name:"Cloyster",hgOnly:true},
  {id:92, name:"Gastly"},      {id:93, name:"Haunter"},      {id:94, name:"Gengar"},
  {id:95, name:"Onix"},
  {id:96, name:"Drowzee"},     {id:97, name:"Hypno"},
  {id:98, name:"Krabby"},      {id:99, name:"Kingler"},
  {id:100,name:"Voltorb"},     {id:101,name:"Electrode"},
  {id:102,name:"Exeggcute"},   {id:103,name:"Exeggutor"},
  {id:104,name:"Cubone"},      {id:105,name:"Marowak"},
  {id:106,name:"Hitmonlee"},   {id:107,name:"Hitmonchan"},
  {id:108,name:"Lickitung"},
  {id:109,name:"Koffing"},               {id:110,name:"Weezing"},
  {id:111,name:"Rhyhorn"},     {id:112,name:"Rhydon"},
  {id:113,name:"Chansey"},     {id:114,name:"Tangela"},      {id:115,name:"Kangaskhan"},
  {id:116,name:"Horsea"},               {id:117,name:"Seadra"},
  {id:118,name:"Goldeen"},     {id:119,name:"Seaking"},
  {id:120,name:"Staryu",ssOnly:true},   {id:121,name:"Starmie",ssOnly:true},
  {id:122,name:"Mr. Mime"},    {id:123,name:"Scyther",hgOnly:true},
  {id:124,name:"Jynx"},
  {id:125,name:"Electabuzz",hgOnly:true},{id:126,name:"Magmar",ssOnly:true},
  {id:127,name:"Pinsir",ssOnly:true},   {id:128,name:"Tauros"},
  {id:129,name:"Magikarp"},    {id:130,name:"Gyarados"},
  {id:131,name:"Lapras"},      {id:132,name:"Ditto"},
  {id:133,name:"Eevee"},       {id:134,name:"Vaporeon"},     {id:135,name:"Jolteon"},  {id:136,name:"Flareon"},
  {id:137,name:"Porygon"},
  {id:138,name:"Omanyte"},     {id:139,name:"Omastar"},
  {id:140,name:"Kabuto"},      {id:141,name:"Kabutops"},
  {id:142,name:"Aerodactyl"},  {id:143,name:"Snorlax"},
  {id:144,name:"Articuno"},    {id:145,name:"Zapdos"},       {id:146,name:"Moltres"},
  {id:147,name:"Dratini"},     {id:148,name:"Dragonair"},    {id:149,name:"Dragonite"},
  {id:150,name:"Mewtwo"},      {id:151,name:"Mew",event:true},
];

// ─── NATIONAL DEX (Gen III/IV Pokémon obtainable in HGSS post-game) ────────
const NATIONAL_DEX = [
  // TODO: Add Gen III/IV obtainable post-game Pokémon in Phase 2
];
const NATIONAL_DEX = [
  {id:161,name:"Sentret"},
  {id:162,name:"Furret"},
  {id:165,name:"Ledyba"},
  {id:166,name:"Ledian"},
  {id:167,name:"Spinarak"},
  {id:168,name:"Ariados"},
  {id:169,name:"Crobat"},
  {id:175,name:"Togepi"},
  {id:176,name:"Togetic"},
  {id:177,name:"Natu"},
  {id:178,name:"Xatu"},
  {id:182,name:"Bellossom",  hgOnly:true},
  {id:183,name:"Marill",    ssOnly:true},
  {id:184,name:"Azumarill", ssOnly:true},
  {id:186,name:"Politoed"},
  {id:187,name:"Hoppip"},
  {id:188,name:"Skiploom"},
  {id:189,name:"Jumpluff"},
  {id:193,name:"Yanma"},
  {id:194,name:"Wooper",    hgOnly:true},
  {id:195,name:"Quagsire",  hgOnly:true},
  {id:198,name:"Murkrow",   hgOnly:true},
  {id:199,name:"Slowking",  ssOnly:true},
  {id:200,name:"Misdreavus",ssOnly:true},
  {id:201,name:"Unown"},
  {id:202,name:"Wobbuffet"},
  {id:208,name:"Steelix"},
  {id:211,name:"Qwilfish",  hgOnly:true},
  {id:212,name:"Scizor",    hgOnly:true},
  {id:214,name:"Heracross"},
  {id:215,name:"Sneasel",   ssOnly:true},
  {id:218,name:"Slugma"},
  {id:219,name:"Magcargo"},
  {id:220,name:"Swinub"},
  {id:221,name:"Piloswine"},
  {id:223,name:"Remoraid",  ssOnly:true},
  {id:224,name:"Octillery", ssOnly:true},
  {id:225,name:"Delibird",  hgOnly:true},
  {id:226,name:"Mantine",   ssOnly:true},
  {id:227,name:"Skarmory",  hgOnly:true},
  {id:230,name:"Kingdra",   hgOnly:true},
  {id:231,name:"Phanpy"},
  {id:232,name:"Donphan"},
  {id:233,name:"Porygon2"},
  {id:239,name:"Elekid",    hgOnly:true},
  {id:240,name:"Magby",     ssOnly:true},
  {id:242,name:"Blissey"},
  {id:246,name:"Larvitar"},
  {id:247,name:"Pupitar"},
  {id:248,name:"Tyranitar"},
  {id:298,name:"Azurill",   ssOnly:true},
  {id:249,name:"Lugia"},
  {id:250,name:"Ho-Oh"},
  {id:386,name:"Deoxys"},
];

// ─── AREA DATA ────────────────────────────────────────────────────────────────
// Populated part-by-part during the audit pipeline (Phase 3 onward).
// Each area: { part, id, name, note, pokemon[], items[], trainers[] }
// Floored areas use: { part, id, name, note, floors:[{ label, pokemon[], items[], trainers[] }] }
// New fields vs FRLG: time ("morning"|"day"|"night"), hgOnly, ssOnly, rematch[] on trainers
const AREAS = [
  // TODO: Audit Parts 1–32 against Bulbapedia HGSS walkthrough
];
const AREAS = [
  { part:"Part 1", id:"pallet-town", name:"Pallet Town",
    note:"Choose one starter from Professor Oak — Blue takes the one with a type advantage over yours.",
    pokemon:[{name:"Bulbasaur",method:"Gift",levels:"5",note:"Choose one of three from Professor Oak",choiceGroup:"starter",choiceId:"bulbasaur"},{name:"Charmander",method:"Gift",levels:"5",note:"Choose one of three from Professor Oak",choiceGroup:"starter",choiceId:"charmander"},{name:"Squirtle",method:"Gift",levels:"5",note:"Choose one of three from Professor Oak",choiceGroup:"starter",choiceId:"squirtle"}],
    items:[{name:"Potion",hidden:false,note:"From the PC in your bedroom"},{name:"Pokédex",hidden:false,note:"From Professor Oak after choosing your starter"},{name:"Poké Ball ×5",hidden:false,note:"From Oak's aide after receiving the Pokédex"},{name:"Town Map",hidden:false,note:"From Daisy (Blue's sister) after receiving the Pokédex"}],
    trainers:[{class:"Rival",name:"Blue",note:"Has the starter with a type advantage over yours — one of these three.",team:[{name:"Charmander",level:5},{name:"Squirtle",level:5},{name:"Bulbasaur",level:5}]}] },

  { part:"Part 2", id:"route1", name:"Route 1",
    note:"Can't catch on first visit — no Poké Balls yet. Return from Viridian City.",
    pokemon:[{name:"Pidgey",method:"Grass",levels:"2–5",rate:"50%"},{name:"Rattata",method:"Grass",levels:"2–4",rate:"50%"}],
    items:[{name:"Potion",hidden:false,note:"From the Viridian Mart employee near the signpost"}] },

  { part:"Part 2", id:"viridian-city", name:"Viridian City",
    note:"Deliver Oak's Parcel to unlock the old man's Pokémon-catching tutorial on Route 2.",
    pokemon:[],
    items:[{name:"Oak's Parcel",hidden:false,note:"From the Poké Mart shopkeeper — deliver to Professor Oak in Pallet Town"},{name:"Potion",hidden:false,note:"Near the city's north exit, west of the small tree"},{name:"Teachy TV",hidden:false,note:"From the old man after delivering Oak's Parcel"}] },

  { part:"Part 2", id:"route22", name:"Route 22",
    note:"Worth visiting early for Mankey (useful against Brock). Surf and fishing accessible on the return visit — see Route 22 (Surf & Fishing) in Part 10.",
    pokemon:[
      {name:"Rattata",method:"Grass",levels:"2–5",rate:"45%"},
      {name:"Mankey", method:"Grass",levels:"2–5",rate:"45%"},
      {name:"Spearow",method:"Grass",levels:"3–5",rate:"10%"},
    ],
    items:[],
    trainers:[
      {class:"Rival",name:"Blue",note:"Early visit — Lv. 9 Pidgey + the starter that counters yours.",
        team:[{name:"Pidgey",level:9}]},
    ]},

  { part:"Part 2", id:"route2-west", name:"Route 2 (West)",
    note:"Pass-through on the way to Viridian Forest. Wild Pokémon are available on first visit.",
    pokemon:[{name:"Pidgey",method:"Grass",levels:"2–5",rate:"45%"},{name:"Rattata",method:"Grass",levels:"2–5",rate:"45%"},{name:"Caterpie",method:"Grass",levels:"4–5",rate:"5%"},{name:"Weedle",method:"Grass",levels:"4–5",rate:"5%"}],
    items:[] },

  { part:"Part 3", id:"viridian-forest", name:"Viridian Forest",
    note:"Pikachu is rare but catchable here (5%). Metapod and Kakuna both appear in both versions at different rates — Kakuna is more common in FireRed, Metapod in LeafGreen.",
    pokemon:[{name:"Caterpie",method:"Grass",levels:"3–5",rate:"40%"},{name:"Weedle",method:"Grass",levels:"3–5",rate:"40%"},{name:"Metapod",method:"Grass",levels:"4–6",rate:"5% FR / 10% LG"},{name:"Kakuna",method:"Grass",levels:"4–6",rate:"10% FR / 5% LG"},{name:"Pikachu",method:"Grass",levels:"3–5",rate:"5%"}],
    items:[{name:"Poké Ball",hidden:false,note:"Dead-end grassy path northwest of south entrance"},{name:"Antidote",hidden:true,note:"West side of lone tree near south entrance",img:"screenshots/hidden/viridian-forest-1.png"},{name:"Antidote",hidden:false,note:"Northeast area past Trainer Tips sign"},{name:"Potion",hidden:false,note:"Tall grass east of southern entrance"},{name:"Potion",hidden:false,note:"Dead-end path southeast of north exit"},{name:"Potion",hidden:true,note:"In front of Bug Catcher Sammy near north exit",img:"screenshots/hidden/viridian-forest-5.png"}],
    trainers:[
      {class:"Bug Catcher",name:"Rick",   team:[{name:"Weedle",level:6},{name:"Caterpie",level:6}]},
      {class:"Bug Catcher",name:"Doug",   team:[{name:"Weedle",level:7},{name:"Kakuna",level:7},{name:"Weedle",level:7}]},
      {class:"Bug Catcher",name:"Anthony",team:[{name:"Caterpie",level:7},{name:"Caterpie",level:8}]},
      {class:"Bug Catcher",name:"Charlie",team:[{name:"Metapod",level:7},{name:"Caterpie",level:7},{name:"Metapod",level:7}]},
      {class:"Bug Catcher",name:"Sammy",  team:[{name:"Weedle",level:9}]},
    ] },



  { part:"Part 3", id:"pewter-city", name:"Pewter City",
    note:"Defeat Brock for TM39 Rock Tomb. Old Amber requires Cut to reach the museum scientist — bring it to Cinnabar Lab to revive Aerodactyl.",
    pokemon:[],
    items:[{name:"Poké Ball",hidden:true,note:"West of Pewter Museum on lighter-colored grass",img:"screenshots/hidden/pewter-city-0.png"},{name:"TM39 Rock Tomb",hidden:false,note:"Reward from Brock after defeating him"},{name:"Running Shoes",hidden:false,note:"From Professor Oak's aide on east side of town after defeating Brock"},{name:"Old Amber",hidden:false,note:"Scientist in back of Museum (requires Cut) — bring to Cinnabar Lab to revive Aerodactyl"}],
    trainers:[
      {class:"Camper",    name:"Liam", team:[{name:"Geodude",level:10},{name:"Sandshrew",level:11}]},
      {class:"Gym Leader",name:"Brock",team:[{name:"Geodude",level:12},{name:"Onix",level:14}]},
    ] },

  { part:"Part 4", id:"route3", name:"Route 3",
    note:"Nidoran♀ is more common in FireRed (14%), Nidoran♂ in LeafGreen (14%). Both versions have Mankey and Jigglypuff.",
    pokemon:[
      {name:"Spearow",method:"Grass",levels:"6–8",rate:"35%"},
      {name:"Pidgey",method:"Grass",levels:"6–7",rate:"30%"},
      {name:"Jigglypuff",method:"Grass",levels:"3–7",rate:"10%"},
      {name:"Mankey",method:"Grass",levels:"7",rate:"10%"},
      {name:"Nidoran♀",method:"Grass",levels:"6–7",rate:"1% FR / 14% LG"},
      {name:"Nidoran♂",method:"Grass",levels:"6–7",rate:"14% FR / 1% LG"},
    ],
    items:[{name:"Oran Berry",hidden:true,note:"Between ledges near Youngster Calvin (★ Itemfinder)",img:"screenshots/hidden/route3-0.png"}],
    trainers:[
      {class:"Lass",       name:"Janice", team:[{name:"Pidgey",   level:9},{name:"Pidgey",  level:9}]},
      {class:"Bug Catcher",name:"Colton", team:[{name:"Caterpie", level:10},{name:"Weedle",  level:10},{name:"Caterpie",level:10}]},
      {class:"Youngster",  name:"Ben",    team:[{name:"Rattata",  level:11},{name:"Ekans",   level:11}]},
      {class:"Bug Catcher",name:"Greg",   team:[{name:"Weedle",   level:9},{name:"Kakuna",  level:9},{name:"Caterpie",level:9},{name:"Metapod",level:9}]},
      {class:"Youngster",  name:"Calvin", team:[{name:"Spearow",  level:14}]},
      {class:"Lass",       name:"Sally",  team:[{name:"Rattata",  level:10},{name:"Nidoran♀",level:10}]},
      {class:"Bug Catcher",name:"James",  team:[{name:"Caterpie", level:11},{name:"Metapod", level:11}]},
      {class:"Lass",       name:"Robin",  team:[{name:"Jigglypuff",level:14}]},
    ] },

  { part:"Part 4", id:"route4-west", name:"Route 4 (West)",
    note:"Small area between Route 3 and Mt. Moon. A man near the Pokémon Center sells Magikarp for ₽500.",
    pokemon:[{name:"Magikarp",method:"Buy",levels:"5",note:"Purchase from the man for ₽500 — at the Pokémon Center building on Route 4"}],
    items:[{name:"Persim Berry",hidden:true,note:"West of Pokémon Center, between rocks (★ Itemfinder)",img:"screenshots/hidden/route4-west-0.png"}],
    trainers:[] },

  { part:"Part 4", id:"mt-moon", name:"Mt. Moon",
    note:"⚠ CHOOSE ONE fossil at the end of B2F — Dome→Kabuto or Helix→Omanyte. Only one per file; trade for the other.",
    floors:[
      { label:"1F",
        pokemon:[
          {name:"Zubat",   method:"Cave",levels:"7–10",rate:"69%"},
          {name:"Geodude", method:"Cave",levels:"7–9", rate:"25%"},
          {name:"Paras",   method:"Cave",levels:"8",   rate:"5%"},
          {name:"Clefairy",method:"Cave",levels:"8",   rate:"1%"},
        ],
        items:[
          {name:"TM09 Bullet Seed",hidden:false,note:"West chamber"},
          {name:"Paralyze Heal",   hidden:false,note:"West chamber"},
          {name:"Potion",          hidden:false,note:"Southeast area"},
          {name:"Rare Candy",      hidden:false,note:"Southeast corner"},
          {name:"Escape Rope",     hidden:false,note:"East-central area"},
          {name:"Moon Stone",      hidden:false,note:"Northwest corner"},
        ],
        trainers:[
          {class:"Bug Catcher",name:"Kent",   team:[{name:"Weedle",   level:11},{name:"Kakuna",   level:11}]},
          {class:"Lass",       name:"Iris",   team:[{name:"Clefairy", level:14}]},
          {class:"Super Nerd", name:"Jovan",  team:[{name:"Magnemite",level:11},{name:"Voltorb",  level:11}]},
          {class:"Bug Catcher",name:"Robby",  team:[{name:"Caterpie", level:10},{name:"Metapod",  level:10},{name:"Caterpie",level:10}]},
          {class:"Lass",       name:"Miriam", team:[{name:"Oddish",   level:11},{name:"Bellsprout",level:11}]},
          {class:"Youngster",  name:"Josh",   team:[{name:"Rattata",  level:10},{name:"Rattata",  level:10},{name:"Zubat",   level:10}]},
          {class:"Hiker",      name:"Marcos", team:[{name:"Geodude",  level:10},{name:"Geodude",  level:10},{name:"Onix",    level:10}]},
        ]},
      { label:"B1F",
        pokemon:[
          {name:"Paras",method:"Cave",levels:"5–10",rate:"100%",note:"Mushroom room off main path"},
        ],
        items:[
          {name:"Tiny Mushroom",hidden:true,recurring:true,note:"Spawns throughout B1F/B2F (★ Itemfinder)"},
          {name:"Big Mushroom", hidden:true,recurring:true,note:"Spawns throughout B1F/B2F (★ Itemfinder)"},
        ],
        trainers:[]},
      { label:"B2F",
        pokemon:[
          {name:"Zubat",   method:"Cave",levels:"8–11", rate:"49%"},
          {name:"Geodude", method:"Cave",levels:"9–10", rate:"30%"},
          {name:"Paras",   method:"Cave",levels:"10–12",rate:"15%"},
          {name:"Clefairy",method:"Cave",levels:"10–12",rate:"6%"},
          {name:"Kabuto",  method:"Fossil",levels:"5",  note:"Restore Dome Fossil at Cinnabar Lab",  choiceGroup:"fossil",choiceId:"dome"},
          {name:"Omanyte", method:"Fossil",levels:"5",  note:"Restore Helix Fossil at Cinnabar Lab", choiceGroup:"fossil",choiceId:"helix"},
        ],
        items:[
          {name:"Star Piece",  hidden:false,note:"South section"},
          {name:"TM46 Thief",  hidden:false,note:"Northeast platform"},
          {name:"Ether",       hidden:true, note:"Northeast section (★ Itemfinder)",img:"screenshots/hidden/mt-moon-b2f-2.png"},
          {name:"Moon Stone",  hidden:true, note:"Near fossils (★ Itemfinder)",img:"screenshots/hidden/mt-moon-b2f-3.png"},
          {name:"Revive",      hidden:false,note:"North of center ladder"},
          {name:"Antidote",    hidden:false,note:"Southwest of northwest ladder"},
          {name:"Dome Fossil", hidden:false,note:"Pick one — Dome Fossil → Kabuto", choiceGroup:"fossil",choiceId:"dome"},
          {name:"Helix Fossil",hidden:false,note:"Pick one — Helix Fossil → Omanyte",choiceGroup:"fossil",choiceId:"helix"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Sandshrew",level:11},{name:"Rattata",  level:11},{name:"Zubat",   level:11}]},
          {class:"Team Rocket Grunt",name:"Grunt 2",team:[{name:"Zubat",    level:11},{name:"Ekans",    level:11}]},
          {class:"Team Rocket Grunt",name:"Grunt 3",team:[{name:"Rattata",  level:13},{name:"Sandshrew",level:13}]},
          {class:"Team Rocket Grunt",name:"Grunt 4",team:[{name:"Rattata",  level:13},{name:"Zubat",    level:13}]},
          {class:"Super Nerd",       name:"Miguel", team:[{name:"Grimer",   level:12},{name:"Voltorb",  level:12},{name:"Koffing",level:12}]},
        ]},
    ] },

  { part:"Part 4", id:"route4-east", name:"Route 4 (East)",
    note:"Ekans is FireRed-only; Sandshrew fills the same slot in LeafGreen. Two one-time Move Tutors on the eastern hill: Mega Punch (left) and Mega Kick (right).",
    pokemon:[
      {name:"Rattata",  method:"Grass",levels:"8–12",rate:"35%"},
      {name:"Spearow",  method:"Grass",levels:"8–12",rate:"35%"},
      {name:"Ekans",    method:"Grass",levels:"6–12",rate:"25%",hgOnly:true},
      {name:"Sandshrew",method:"Grass",levels:"6–12",rate:"25%",ssOnly:true},
      {name:"Mankey",   method:"Grass",levels:"10–12",rate:"5%"},
    ],
    items:[
      {name:"Great Ball",  hidden:true, note:"Corner west of northwest hill (★ Itemfinder)",img:"screenshots/hidden/route4-east-0.png"},
      {name:"Razz Berry",  hidden:true, note:"South-central area (★ Itemfinder)",img:"screenshots/hidden/route4-east-1.png"},
      {name:"TM05 Roar",   hidden:false,note:"Eastern hill — from the man by the hill"},
    ],
    trainers:[] },

  { part:"Part 5", id:"cerulean-city", name:"Cerulean City",
    note:"Defeat Misty for TM03 Water Pulse. Blue battles you near the south bridge. A trade NPC offers Jynx for Poliwhirl.",
    pokemon:[{name:"Jynx",method:"Trade",levels:"any",note:"Trade Poliwhirl to the man near the Pokémon Center"}],
    items:[
      {name:"Rare Candy",      hidden:true, note:"Backyard of northwest house (★ Itemfinder)",img:"screenshots/hidden/cerulean-city-0.png"},
      {name:"Powder Jar",      hidden:false,note:"From the old man in the north-northwest house"},
      {name:"TM03 Water Pulse",hidden:false,note:"From Misty after defeating her"},
      {name:"Fame Checker",    hidden:false,note:"From Blue after the rival battle"},
      {name:"Bicycle",         hidden:false,note:"Exchange Bike Voucher (from Fan Club President, Vermilion City) at the Bike Shop"},
    ],
    trainers:[
      {class:"Swimmer",    name:"Luis",  team:[{name:"Horsea",    level:16},{name:"Shellder",level:16}]},
      {class:"Picnicker",  name:"Diana", team:[{name:"Goldeen",   level:19}]},
      {class:"Gym Leader", name:"Misty", team:[{name:"Staryu",    level:18},{name:"Starmie", level:21}]},
      {class:"Rival",      name:"Blue",  note:"Has the starter with a type advantage over yours.",
        team:[{name:"Pidgeotto",level:17},{name:"Abra",level:16},{name:"Rattata",level:15}]},
    ] },

  { part:"Part 5", id:"route24", name:"Route 24",
    note:"Defeat all 5 Nugget Bridge trainers + the Team Rocket Grunt at the top to receive the Nugget. Oddish/Metapod are FR-only; Bellsprout/Kakuna are LG-only.",
    pokemon:[
      {name:"Oddish",    method:"Grass",levels:"12–14",rate:"25%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"12–14",rate:"25%",ssOnly:true},
      {name:"Caterpie",  method:"Grass",levels:"7",    rate:"20%"},
      {name:"Weedle",    method:"Grass",levels:"7",    rate:"20%"},
      {name:"Pidgey",    method:"Grass",levels:"11–13",rate:"15%"},
      {name:"Abra",      method:"Grass",levels:"8–12", rate:"15%"},
      {name:"Metapod",   method:"Grass",levels:"8",    rate:"1% FR / 4% LG"},
      {name:"Kakuna",    method:"Grass",levels:"8",    rate:"4% FR / 1% LG"},
    ],
    items:[
      {name:"Nugget",       hidden:false,note:"From the Team Rocket Grunt at the north end of Nugget Bridge"},
      {name:"TM45 Attract", hidden:false,note:"Northwest hill"},
      {name:"Pecha Berry",  hidden:true, note:"Northeast hill, accessible via Route 25 (★ Itemfinder)",img:"screenshots/hidden/route24-2.png"},
    ],
    trainers:[
      {class:"Bug Catcher",      name:"Cale",  team:[{name:"Caterpie",level:10},{name:"Weedle", level:10},{name:"Metapod",level:10},{name:"Kakuna",level:10}]},
      {class:"Lass",             name:"Ali",   team:[{name:"Pidgey",  level:12},{name:"Oddish", level:12},{name:"Bellsprout",level:12}]},
      {class:"Youngster",        name:"Timmy", team:[{name:"Sandshrew",level:14},{name:"Ekans",  level:14}]},
      {class:"Lass",             name:"Reli",  team:[{name:"Nidoran♂",level:16},{name:"Nidoran♀",level:16}]},
      {class:"Camper",           name:"Ethan", team:[{name:"Mankey",  level:18}]},
      {class:"Team Rocket Grunt",name:"Grunt", team:[{name:"Ekans",   level:15},{name:"Zubat",  level:15}]},
      {class:"Camper",           name:"Shane", team:[{name:"Rattata", level:14},{name:"Ekans",  level:14}]},
    ] },

  { part:"Part 5", id:"route25", name:"Route 25",
    note:"Same encounters as Route 24. Bill's cottage is at the far east — help him revert from Pokémon form to receive the S.S. Ticket.",
    pokemon:[
      {name:"Oddish",    method:"Grass",levels:"12–14",rate:"25%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"12–14",rate:"25%",ssOnly:true},
      {name:"Caterpie",  method:"Grass",levels:"7",    rate:"20%"},
      {name:"Weedle",    method:"Grass",levels:"7",    rate:"20%"},
      {name:"Pidgey",    method:"Grass",levels:"11–13",rate:"15%"},
      {name:"Abra",      method:"Grass",levels:"8–12", rate:"15%"},
      {name:"Metapod",   method:"Grass",levels:"8",    rate:"1% FR / 4% LG"},
      {name:"Kakuna",    method:"Grass",levels:"8",    rate:"4% FR / 1% LG"},
    ],
    items:[
      {name:"Elixir",          hidden:true, note:"Northwest maze near Hiker Franklin (★ Itemfinder)",img:"screenshots/hidden/route25-0.png"},
      {name:"TM43 Secret Power",hidden:false,note:"Northeast maze"},
      {name:"Oran Berry",      hidden:true, note:"Southeast of maze (★ Itemfinder)",img:"screenshots/hidden/route25-2.png"},
      {name:"Bluk Berry",      hidden:true, note:"Northeast maze near fence end (★ Itemfinder)",img:"screenshots/hidden/route25-3.png"},
      {name:"Ether",           hidden:true, note:"Near Sea Cottage entrance (★ Itemfinder)",img:"screenshots/hidden/route25-4.png"},
      {name:"S.S. Ticket",     hidden:false,note:"From Bill after restoring him from Pokémon form"},
    ],
    trainers:[
      {class:"Hiker",    name:"Franklin",team:[{name:"Machop",   level:15},{name:"Geodude",level:15}]},
      {class:"Hiker",    name:"Wayne",   team:[{name:"Onix",     level:17}]},
      {class:"Youngster",name:"Joey",    team:[{name:"Rattata",  level:15},{name:"Spearow",level:15}]},
      {class:"Youngster",name:"Dan",     team:[{name:"Slowpoke", level:17}]},
      {class:"Picnicker",name:"Kelsey",  team:[{name:"Nidoran♂",level:15},{name:"Nidoran♀",level:15}]},
      {class:"Hiker",    name:"Nob",     team:[{name:"Geodude",  level:13},{name:"Geodude",level:13},{name:"Machop",level:13},{name:"Geodude",level:13}]},
      {class:"Camper",   name:"Flint",   team:[{name:"Rattata",  level:14},{name:"Ekans",  level:14}]},
      {class:"Youngster",name:"Chad",    team:[{name:"Ekans",    level:14},{name:"Sandshrew",level:14}]},
      {class:"Lass",     name:"Haley",   team:[{name:"Oddish",   level:13},{name:"Pidgey", level:13},{name:"Oddish",level:13}]},
    ] },

  { part:"Part 5", id:"cerulean-city-return", name:"Cerulean City (Return)",
    note:"After exploring Routes 24–25 — a Team Rocket Grunt has broken into a house near the Pokémon Center. Defeat them to receive TM28 Dig.",
    pokemon:[],
    items:[{name:"TM28 Dig",hidden:false,note:"From Team Rocket Grunt after defeating them in the burgled house"}],
    trainers:[{class:"Team Rocket Grunt",name:"Grunt",team:[{name:"Machop",level:17},{name:"Drowzee",level:17}]}] },

  { part:"Part 5", id:"route5", name:"Route 5",
    note:"Meowth appears in both versions at 35%. Oddish is FR-only; Bellsprout is LG-only.",
    pokemon:[
      {name:"Pidgey",    method:"Grass",levels:"13–16",rate:"40%"},
      {name:"Meowth",    method:"Grass",levels:"10–16",rate:"35%"},
      {name:"Oddish",    method:"Grass",levels:"13–16",rate:"25%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"13–16",rate:"25%",ssOnly:true},
    ],
    items:[] },

  { part:"Part 6", id:"route6", name:"Route 6",
    note:"Same Pokémon pool as Route 5. Meowth appears in both versions at 35%.",
    pokemon:[
      {name:"Pidgey",    method:"Grass",levels:"13–16",rate:"40%"},
      {name:"Meowth",    method:"Grass",levels:"10–16",rate:"35%"},
      {name:"Oddish",    method:"Grass",levels:"13–16",rate:"25%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"13–16",rate:"25%",ssOnly:true},
    ],
    items:[
      {name:"Rare Candy",  hidden:true,note:"Northeast hill, two steps north of gap between ledges (★ Itemfinder)",img:"screenshots/hidden/route6-0.png"},
      {name:"Sitrus Berry",hidden:true,note:"Northwest hill (★ Itemfinder)",img:"screenshots/hidden/route6-1.png"},
    ],
    trainers:[
      {class:"Bug Catcher",name:"Keigo",   team:[{name:"Weedle",    level:16},{name:"Caterpie",level:16},{name:"Weedle",level:16}]},
      {class:"Camper",     name:"Ricky",   team:[{name:"Squirtle",  level:20}]},
      {class:"Picnicker",  name:"Nancy",   team:[{name:"Rattata",   level:16},{name:"Pikachu", level:16}]},
      {class:"Bug Catcher",name:"Elijah",  team:[{name:"Butterfree",level:20}]},
      {class:"Picnicker",  name:"Isabelle",team:[{name:"Pidgey",    level:16},{name:"Pidgey",  level:16},{name:"Pidgey",level:16}]},
      {class:"Camper",     name:"Jeff",    team:[{name:"Spearow",   level:16},{name:"Raticate",level:16}]},
    ] },

  { part:"Part 5", id:"underground-5-6", name:"Underground Path (5↔6)",
    note:"No wild encounters. A woman in the Route 5 gate trades a nicknamed Nidoran: FR gives Nidoran♂ → receives Nidoran♀ (Ms. Nido); LG gives Nidoran♀ → receives Nidoran♂ (Mr. Nido). The traded Nidoran holds a Tiny Mushroom.",
    pokemon:[
      {name:"Nidoran♀",method:"Trade",levels:"any",hgOnly:true,note:"Ms. Nido (FR) — give Nidoran♂ to the woman in the Route 5 gate; holds Tiny Mushroom"},
      {name:"Nidoran♂",method:"Trade",levels:"any",ssOnly:true,note:"Mr. Nido (LG) — give Nidoran♀ to the woman in the Route 5 gate; holds Tiny Mushroom"},
    ],
    items:[
      {name:"Tiny Mushroom",hidden:false,heldBy:["Nidoran♀","Nidoran♂"],note:"Held by the traded Nidoran (Ms. Nido / Mr. Nido)"},
      {name:"Antidote",     hidden:true, recurring:true, note:"Near north stairs (★ Itemfinder, recurring)"},
      {name:"Paralyze Heal",hidden:true, recurring:true, note:"Northernmost section (★ Itemfinder, recurring)"},
      {name:"Awakening",    hidden:true, recurring:true, note:"North section (★ Itemfinder, recurring)"},
      {name:"Potion",       hidden:true, recurring:true, note:"Northernmost section (★ Itemfinder, recurring)"},
      {name:"Ether",        hidden:true, recurring:true, note:"South section (★ Itemfinder, recurring)"},
      {name:"Ice Heal",     hidden:true, recurring:true, note:"Near south stairs (★ Itemfinder, recurring)"},
      {name:"Burn Heal",    hidden:true, recurring:true, note:"Near south stairs (★ Itemfinder, recurring)"},
    ],
    trainers:[] },

  { part:"Part 6", id:"vermilion-city", name:"Vermilion City",
    note:"Get the Bike Voucher from the Fan Club Chairman — exchange it at Cerulean's Bike Shop. Farfetch'd trade: give a Spearow to receive Ch'Ding, which holds a Stick.",
    pokemon:[
      {name:"Farfetch'd",method:"Trade",  levels:"any",note:"Trade Spearow to the man near the Pokémon Center; Ch'Ding holds a Stick"},
      {name:"Magikarp",  method:"Old Rod",levels:"5",  rate:"100%"},
    ],
    items:[
      {name:"Max Ether",      hidden:true, note:"Four steps south, one step west of Pokémon Center entrance (★ Itemfinder)",img:"screenshots/hidden/vermilion-city-0.png"},
      {name:"Vs. Seeker",     hidden:false,note:"Pokémon Center — from the female Ace Trainer at the counter"},
      {name:"Old Rod",        hidden:false,note:"Northwest house, from the Fishing Guru"},
      {name:"Bike Voucher",   hidden:false,note:"Pokémon Fan Club Chairman — exchange at Cerulean City Bike Shop for the Bicycle"},
      {name:"TM34 Shock Wave",hidden:false,note:"From Lt. Surge after defeating him"},
      {name:"Stick",          hidden:false,heldBy:"Farfetch'd",note:"Held by Ch'Ding the traded Farfetch'd"},
    ],
    trainers:[
      {class:"Sailor",    name:"Dwayne",   team:[{name:"Pikachu",  level:21},{name:"Pikachu",  level:21}]},
      {class:"Engineer",  name:"Baily",    team:[{name:"Voltorb",  level:21},{name:"Magnemite",level:21}]},
      {class:"Gentleman", name:"Tucker",   team:[{name:"Pikachu",  level:23}]},
      {class:"Gym Leader",name:"Lt. Surge",team:[{name:"Voltorb",  level:21},{name:"Pikachu",  level:18},{name:"Raichu",level:24}]},
    ] },

  { part:"Part 6", id:"ss-anne", name:"S.S. Anne",
    note:"⚠ ONE-TIME EVENT — ship leaves permanently after receiving HM01 Cut. Sweep all cabins and defeat Blue on 2F before talking to the Captain! A hidden Lava Cookie in the harbour requires Surf — missable if you skip it.",
    floors:[
      { label:"Deck",
        pokemon:[],
        items:[],
        trainers:[
          {class:"Sailor",name:"Trevor",team:[{name:"Machop",level:17},{name:"Tentacool",level:17}]},
          {class:"Sailor",name:"Edmond",team:[{name:"Machop",level:18},{name:"Shellder", level:18}]},
        ]},
      { label:"1F",
        pokemon:[],
        items:[
          {name:"TM31 Brick Break",hidden:false,note:"Second cabin from left"},
          {name:"Great Ball",      hidden:false,note:"Kitchen"},
          {name:"Pecha Berry",     hidden:true, note:"Kitchen — nearest trash can to doorway (★ Itemfinder)",img:"screenshots/hidden/ss-anne-1f-2.png"},
          {name:"Cheri Berry",     hidden:true, note:"Kitchen — middle trash can (★ Itemfinder)",img:"screenshots/hidden/ss-anne-1f-3.png"},
          {name:"Chesto Berry",    hidden:true, note:"Kitchen — farthest trash can from doorway (★ Itemfinder)",img:"screenshots/hidden/ss-anne-1f-4.png"},
        ],
        trainers:[
          {class:"Gentleman",name:"Thomas",team:[{name:"Growlithe",level:18},{name:"Growlithe",level:18}]},
          {class:"Gentleman",name:"Arthur",team:[{name:"Nidoran♂", level:19},{name:"Nidoran♀", level:19}]},
          {class:"Lass",     name:"Ann",   team:[{name:"Pidgey",   level:18},{name:"Nidoran♀", level:18}]},
          {class:"Youngster",name:"Tyler", team:[{name:"Nidoran♂", level:21}]},
        ]},
      { label:"B1F",
        pokemon:[],
        items:[
          {name:"Hyper Potion",hidden:true, note:"Hallway trash can near stairs to 1F (★ Itemfinder)",img:"screenshots/hidden/ss-anne-b1f-0.png"},
          {name:"Super Potion",hidden:false,note:"Rightmost cabin"},
          {name:"Ether",       hidden:false,note:"Middle cabin"},
          {name:"TM44 Rest",   hidden:false,note:"Second cabin from left"},
        ],
        trainers:[
          {class:"Fisherman",name:"Barny",  team:[{name:"Tentacool",level:17},{name:"Staryu",  level:17},{name:"Shellder",  level:17}]},
          {class:"Sailor",   name:"Phillip",team:[{name:"Machop",   level:20}]},
          {class:"Sailor",   name:"Huey",   team:[{name:"Tentacool",level:18},{name:"Staryu",  level:18}]},
          {class:"Sailor",   name:"Dylan",  team:[{name:"Horsea",   level:17},{name:"Horsea",  level:17},{name:"Horsea",   level:17}]},
          {class:"Sailor",   name:"Duncan", team:[{name:"Horsea",   level:17},{name:"Shellder",level:17},{name:"Tentacool",level:17}]},
          {class:"Sailor",   name:"Leonard",team:[{name:"Shellder", level:21}]},
        ]},
      { label:"2F",
        pokemon:[],
        items:[
          {name:"Stardust", hidden:false,note:"Second cabin from left"},
          {name:"X Attack", hidden:false,note:"Fourth cabin from left"},
          {name:"HM01 Cut", hidden:false,note:"Captain's quarters — from the Captain after helping him"},
        ],
        trainers:[
          {class:"Fisherman",name:"Dale",  team:[{name:"Goldeen",  level:17},{name:"Goldeen",level:17},{name:"Tentacool",level:17}]},
          {class:"Gentleman",name:"Brooks",team:[{name:"Pikachu",  level:23}]},
          {class:"Gentleman",name:"Lamar", team:[{name:"Growlithe",level:17},{name:"Ponyta",  level:17}]},
          {class:"Lass",     name:"Dawn",  team:[{name:"Rattata",  level:18},{name:"Pikachu", level:18}]},
          {class:"Rival",    name:"Blue",  note:"4th Pokémon is the starter strong against yours.",
            team:[{name:"Pidgeotto",level:19},{name:"Raticate",level:16},{name:"Kadabra",level:18}]},
        ]},
      { label:"Harbour",
        pokemon:[],
        items:[
          {name:"Lava Cookie",hidden:true,optional:true,surf:true,note:"⚠ SE corner near the truck — requires Surf, only accessible via glitch (★ Itemfinder)"},
        ],
        trainers:[]},
    ]},

  { part:"Part 7", id:"route11", name:"Route 11",
    note:"Ekans is FR-only at 40%; Sandshrew fills the same slot in LeafGreen. Get the Itemfinder from Oak's aide in the east gate (30 Pokémon). Trade NPC in the gate: Nidorino→Nidorina (FR) or Nidorina→Nidorino (LG).",
    pokemon:[
      {name:"Ekans",    method:"Grass",   levels:"12–15",rate:"40%",hgOnly:true},
      {name:"Sandshrew",method:"Grass",   levels:"12–15",rate:"40%",ssOnly:true},
      {name:"Spearow",  method:"Grass",   levels:"13–17",rate:"35%"},
      {name:"Drowzee",  method:"Grass",   levels:"11–15",rate:"25%"},
      {name:"Magikarp", method:"Old Rod", levels:"5",    rate:"100%"},
      {name:"Nidorina", method:"Trade",   levels:"any",  hgOnly:true,note:"Trade Nidorino in the east gate (FR)"},
      {name:"Nidorino", method:"Trade",   levels:"any",  ssOnly:true,note:"Trade Nidorina in the east gate (LG)"},
    ],
    items:[
      {name:"Awakening",   hidden:false,note:"Northwest part of the route"},
      {name:"X Defend",    hidden:false,note:"Middle of the route, in a grass patch"},
      {name:"Escape Rope", hidden:true, note:"On a rock just north of the east gate (★ Itemfinder)",img:"screenshots/hidden/route11-2.png"},
      {name:"Great Ball",  hidden:false,note:"South of the east gate"},
      {name:"Itemfinder",  hidden:false,note:"East gate — from Oak's aide after catching 30 different species"},
    ],
    trainers:[
      {class:"Youngster",name:"Eddie",  team:[{name:"Ekans",    level:21}]},
      {class:"Gamer",    name:"Hugo",   team:[{name:"Poliwag",  level:18},{name:"Horsea",   level:18}]},
      {class:"Engineer", name:"Bernie", team:[{name:"Magnemite",level:18},{name:"Magnemite",level:18},{name:"Magneton",level:18}]},
      {class:"Youngster",name:"Dave",   team:[{name:"Nidoran♂", level:18},{name:"Nidorino", level:18}]},
      {class:"Youngster",name:"Dillon", team:[{name:"Sandshrew",level:19},{name:"Zubat",    level:19}]},
      {class:"Gamer",    name:"Jasper", team:[{name:"Bellsprout",level:18},{name:"Oddish",  level:18}]},
      {class:"Engineer", name:"Braxton",team:[{name:"Magnemite",level:21}]},
      {class:"Gamer",    name:"Darian", team:[{name:"Growlithe",level:18},{name:"Vulpix",   level:18}]},
      {class:"Youngster",name:"Yasu",   team:[{name:"Rattata",  level:17},{name:"Rattata",  level:17},{name:"Raticate",level:17}]},
      {class:"Gamer",    name:"Dirk",   team:[{name:"Voltorb",  level:18},{name:"Magnemite",level:18}]},
    ] },

  { part:"Part 7", id:"digletts-cave", name:"Diglett's Cave",
    note:"Simple cave between Route 2 and Route 11. Two Pokémon only.",
    pokemon:[{name:"Diglett",method:"Cave",levels:"15–22",rate:"95%"},{name:"Dugtrio",method:"Cave",levels:"29–31",rate:"5%"}],
    items:[] },

  { part:"Part 7", id:"route2-east", name:"Route 2 (East)",
    note:"Accessible after using Cut on the blocking tree. Mr. Mime trade is here — swap Abra with the boy in the gate. HM05 Flash from Oak's aide requires 10 Pokémon.",
    pokemon:[
      {name:"Mr. Mime",method:"Trade",levels:"any",note:"Trade Abra in the east gate building"},
    ],
    items:[
      {name:"HM05 Flash",   hidden:false,note:"East gate building — from Oak's aide after catching 10 different species"},
      {name:"Ether",        hidden:false,note:"South of the gate, past the first ledge"},
      {name:"Paralyze Heal",hidden:false,note:"South of the second ledge"},
    ],
    trainers:[] },

  { part:"Part 7", id:"route9", name:"Route 9",
    note:"Ekans is FR-only at 25%; Sandshrew fills the same slot in LeafGreen.",
    pokemon:[
      {name:"Rattata",  method:"Grass",levels:"14–17",rate:"40%"},
      {name:"Spearow",  method:"Grass",levels:"13–17",rate:"35%"},
      {name:"Ekans",    method:"Grass",levels:"11–17",rate:"25%",hgOnly:true},
      {name:"Sandshrew",method:"Grass",levels:"11–17",rate:"25%",ssOnly:true},
    ],
    items:[
      {name:"TM40 Aerial Ace",hidden:false,note:"Southwest corner of the route"},
      {name:"Ether",          hidden:true, note:"Northwest part of the route, on a rock (★ Itemfinder)",img:"screenshots/hidden/route9-1.png"},
      {name:"Burn Heal",      hidden:false,note:"Southeast corner of the route"},
      {name:"Chesto Berry",   hidden:true, note:"Northeast part of the route (★ Itemfinder)",img:"screenshots/hidden/route9-3.png"},
      {name:"Rare Candy",     hidden:true, note:"Northeast part of the route, one step west and south from corner (★ Itemfinder)",img:"screenshots/hidden/route9-4.png"},
    ],
    trainers:[
      {class:"Picnicker",  name:"Alicia",team:[{name:"Oddish",    level:18},{name:"Bellsprout",level:18},{name:"Oddish",level:18},{name:"Bellsprout",level:18}]},
      {class:"Hiker",      name:"Jeremy",team:[{name:"Machop",    level:20},{name:"Onix",      level:20}]},
      {class:"Camper",     name:"Chris", team:[{name:"Growlithe", level:21},{name:"Charmander",level:21}]},
      {class:"Bug Catcher",name:"Brent", team:[{name:"Beedrill",  level:19},{name:"Beedrill",  level:19}]},
      {class:"Hiker",      name:"Alan",  team:[{name:"Geodude",   level:21},{name:"Onix",      level:21}]},
      {class:"Bug Catcher",name:"Conner",team:[{name:"Caterpie",  level:20},{name:"Weedle",    level:20},{name:"Venonat",level:20}]},
      {class:"Camper",     name:"Drew",  team:[{name:"Rattata",   level:19},{name:"Sandshrew", level:19},{name:"Ekans",level:19},{name:"Sandshrew",level:19}]},
      {class:"Hiker",      name:"Brice", team:[{name:"Geodude",   level:20},{name:"Geodude",   level:20},{name:"Machop",level:20}]},
      {class:"Picnicker",  name:"Caitlin",team:[{name:"Meowth",   level:23}]},
    ] },

  { part:"Part 7", id:"route10-north", name:"Route 10 (North)",
    note:"Pokémon Center here — stock up before Rock Tunnel. Voltorb first appears at 40%. Ekans is FR-only; Sandshrew fills the same slot in LeafGreen.",
    pokemon:[
      {name:"Voltorb",  method:"Grass",   levels:"14–17",rate:"40%"},
      {name:"Spearow",  method:"Grass",   levels:"13–17",rate:"35%"},
      {name:"Ekans",    method:"Grass",   levels:"11–17",rate:"25%",hgOnly:true},
      {name:"Sandshrew",method:"Grass",   levels:"11–17",rate:"25%",ssOnly:true},
      {name:"Magikarp", method:"Old Rod", levels:"5",    rate:"100%"},
    ],
    items:[
      {name:"Everstone",   hidden:false,note:"Pokémon Center — from Oak's aide after catching 20 different species"},
      {name:"Persim Berry",hidden:true, note:"Southeast of Pokémon Center, corner of fencing (★ Itemfinder)",img:"screenshots/hidden/route10-north-1.png"},
      {name:"Cheri Berry", hidden:true, note:"Southwest of Pokémon Center, edge of dirt patch (★ Itemfinder)",img:"screenshots/hidden/route10-north-2.png"},
      {name:"Super Potion",hidden:true, note:"One step east of Rock Tunnel north entrance — requires Cut (★ Itemfinder)",img:"screenshots/hidden/route10-north-3.png"},
    ],
    trainers:[
      {class:"Picnicker", name:"Heidi",team:[{name:"Pikachu", level:20},{name:"Clefairy",level:20}]},
    ] },

  { part:"Part 8", id:"rock-tunnel", name:"Rock Tunnel",
    note:"Two floors; use Flash to ease navigation. Mankey and Machop both appear in both versions — no version exclusives here.",
    floors:[
      { label:"1F",
        pokemon:[
          {name:"Geodude",method:"Cave",levels:"15–17",rate:"35%"},
          {name:"Zubat",  method:"Cave",levels:"15–16",rate:"30%"},
          {name:"Mankey", method:"Cave",levels:"16–17",rate:"15%"},
          {name:"Machop", method:"Cave",levels:"16–17",rate:"15%"},
          {name:"Onix",   method:"Cave",levels:"13–15",rate:"5%"},
        ],
        items:[
          {name:"Repel",      hidden:false,note:"Northeast"},
          {name:"Escape Rope",hidden:false,note:"West"},
          {name:"Pearl",      hidden:false,note:"South"},
        ],
        trainers:[
          {class:"PokéManiac",name:"Ashton", team:[{name:"Cubone",    level:23},{name:"Slowpoke", level:23}]},
          {class:"Hiker",     name:"Lenny",  team:[{name:"Geodude",   level:19},{name:"Machop",   level:19},{name:"Geodude",  level:19},{name:"Geodude",level:19}]},
          {class:"Hiker",     name:"Oliver", team:[{name:"Onix",      level:20},{name:"Onix",     level:20},{name:"Geodude",  level:20}]},
          {class:"Hiker",     name:"Lucas",  team:[{name:"Geodude",   level:21},{name:"Graveler", level:21}]},
          {class:"Picnicker", name:"Leah",   team:[{name:"Bellsprout",level:22},{name:"Clefairy", level:22}]},
          {class:"Picnicker", name:"Ariana", team:[{name:"Pidgey",    level:19},{name:"Rattata",  level:19},{name:"Rattata",  level:19},{name:"Bellsprout",level:19}]},
          {class:"Picnicker", name:"Dana",   team:[{name:"Meowth",    level:20},{name:"Oddish",   level:20},{name:"Pidgey",   level:20}]},
        ]},
      { label:"B1F",
        pokemon:[
          {name:"Geodude",method:"Cave",levels:"15–17",rate:"35%"},
          {name:"Zubat",  method:"Cave",levels:"15–16",rate:"30%"},
          {name:"Mankey", method:"Cave",levels:"16–17",rate:"15%"},
          {name:"Machop", method:"Cave",levels:"17",   rate:"10%"},
          {name:"Onix",   method:"Cave",levels:"13–17",rate:"10%"},
        ],
        items:[
          {name:"Revive",  hidden:false,note:"Southeast"},
          {name:"Max Ether",hidden:false,note:"Northwest"},
        ],
        trainers:[
          {class:"PokéManiac",name:"Winston",team:[{name:"Slowpoke",   level:25}]},
          {class:"Picnicker", name:"Martha", team:[{name:"Oddish",     level:22},{name:"Bulbasaur",level:22}]},
          {class:"PokéManiac",name:"Steve",  team:[{name:"Charmander", level:22},{name:"Cubone",   level:22}]},
          {class:"Hiker",     name:"Allen",  team:[{name:"Geodude",    level:25}]},
          {class:"Hiker",     name:"Eric",   team:[{name:"Machop",     level:20},{name:"Onix",     level:20}]},
          {class:"Picnicker", name:"Sofia",  team:[{name:"Jigglypuff", level:21},{name:"Pidgey",   level:21},{name:"Meowth",level:21}]},
          {class:"Hiker",     name:"Dudley", team:[{name:"Geodude",    level:21},{name:"Geodude",  level:21},{name:"Graveler",level:21}]},
          {class:"PokéManiac",name:"Cooper", team:[{name:"Slowpoke",   level:20},{name:"Slowpoke", level:20},{name:"Slowpoke",level:20}]},
        ]},
    ] },

  { part:"Part 8", id:"route10-south", name:"Route 10 (South)",
    note:"The stretch south of Rock Tunnel's exit. Route 10 North (Part 7) has the Pokémon Center before the tunnel.",
    pokemon:[
      {name:"Voltorb",  method:"Grass",   levels:"17–21",rate:"40%"},
      {name:"Spearow",  method:"Grass",   levels:"18–22",rate:"35%"},
      {name:"Ekans",    method:"Grass",   levels:"16–21",rate:"25%",hgOnly:true},
      {name:"Sandshrew",method:"Grass",   levels:"16–21",rate:"25%",ssOnly:true},
      {name:"Magikarp", method:"Old Rod", levels:"5",    rate:"100%"},
    ],
    items:[
      {name:"Nanab Berry",hidden:true,note:"East of Rock Tunnel exit (★ Itemfinder)",img:"screenshots/hidden/route10-south-0.png"},
    ],
    trainers:[
      {class:"Picnicker", name:"Carol",  team:[{name:"Pidgey",   level:21},{name:"Pidgeotto",level:21}]},
      {class:"Hiker",     name:"Clark",  team:[{name:"Geodude",  level:21},{name:"Onix",     level:21}]},
      {class:"Hiker",     name:"Trent",  team:[{name:"Onix",     level:19},{name:"Graveler", level:19}]},
      {class:"PokéManiac",name:"Herman", team:[{name:"Cubone",   level:20},{name:"Slowpoke", level:20}]},
    ] },

  { part:"Part 8", id:"route8", name:"Route 8",
    note:"Growlithe is FR-only; Vulpix is LG-only. Meowth appears in both versions. Underground Path (7↔8) connects to Celadon.",
    pokemon:[
      {name:"Pidgey",   method:"Grass",levels:"18–20",rate:"30%"},
      {name:"Meowth",   method:"Grass",levels:"18–20",rate:"30%"},
      {name:"Ekans",    method:"Grass",levels:"17–19",rate:"20%",hgOnly:true},
      {name:"Sandshrew",method:"Grass",levels:"17–19",rate:"20%",ssOnly:true},
      {name:"Growlithe",method:"Grass",levels:"15–18",rate:"20%",hgOnly:true},
      {name:"Vulpix",   method:"Grass",levels:"15–18",rate:"20%",ssOnly:true},
    ],
    items:[
      {name:"Leppa Berry", hidden:true, note:"Tall grass SE (requires Cut, ★ Itemfinder)",img:"screenshots/hidden/route8-0.png"},
      {name:"Lum Berry",   hidden:true, note:"Tall grass NW (requires Cut, ★ Itemfinder)",img:"screenshots/hidden/route8-1.png"},
      {name:"Rawst Berry", hidden:true, note:"Tall grass NE (requires Cut, ★ Itemfinder)",img:"screenshots/hidden/route8-2.png"},
    ],
    trainers:[
      {class:"Lass",      name:"Julia",   team:[{name:"Clefairy", level:22},{name:"Clefairy",  level:22}]},
      {class:"Lass",      name:"Paige",   team:[{name:"Nidoran♀", level:23},{name:"Nidorina",  level:23}]},
      {class:"Lass",      name:"Andrea",  team:[{name:"Meowth",   level:24},{name:"Meowth",    level:24},{name:"Meowth",level:24}]},
      {class:"Lass",      name:"Megan",   team:[{name:"Pidgey",   level:19},{name:"Rattata",   level:19},{name:"Nidoran♂",level:19},{name:"Meowth",level:19},{name:"Pikachu",level:19}]},
      {class:"Super Nerd",name:"Glenn",   team:[{name:"Grimer",   level:22},{name:"Muk",       level:22},{name:"Grimer",level:22}]},
      {class:"Super Nerd",name:"Leslie",  team:[{name:"Koffing",  level:26}]},
      {class:"Super Nerd",name:"Aidan",   team:[{name:"Voltorb",  level:20},{name:"Voltorb",   level:20},{name:"Magnemite",level:20},{name:"Koffing",level:20}]},
      {class:"Biker",     name:"Jaren",   team:[{name:"Grimer",   level:24},{name:"Grimer",    level:24}]},
      {class:"Biker",     name:"Ricardo", team:[{name:"Koffing",  level:22},{name:"Koffing",   level:22},{name:"Grimer",level:23}]},
      {class:"Gamer",     name:"Rich",    team:[{name:"Growlithe",level:24},{name:"Vulpix",    level:24}]},
      {class:"Gamer",     name:"Stan",    team:[{name:"Poliwag",  level:22},{name:"Poliwag",   level:22},{name:"Poliwhirl",level:22}]},
      {class:"Twins",     name:"Eli & Anne",team:[{name:"Clefairy",level:22},{name:"Jigglypuff",level:22}]},
    ] },

  { part:"Part 8", id:"route7", name:"Route 7",
    note:"Growlithe is FR-only; Vulpix is LG-only. Meowth appears in both. Short route — underground path gate leads to Celadon.",
    pokemon:[
      {name:"Meowth",   method:"Grass",levels:"17–20",rate:"40%"},
      {name:"Pidgey",   method:"Grass",levels:"19–22",rate:"30%"},
      {name:"Oddish",   method:"Grass",levels:"19–22",rate:"20%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"19–22",rate:"20%",ssOnly:true},
      {name:"Growlithe",method:"Grass",levels:"18–20",rate:"10%",hgOnly:true},
      {name:"Vulpix",   method:"Grass",levels:"18–20",rate:"10%",ssOnly:true},
    ],
    items:[
      {name:"Wepear Berry",hidden:true,note:"Southeast corner (★ Itemfinder)",img:"screenshots/hidden/route7-0.png"},
    ],
    trainers:[] },

  { part:"Part 8", id:"lavender-town", name:"Lavender Town",
    note:"First visit. You can't clear Pokémon Tower yet — come back after getting the Silph Scope from Celadon's Rocket Hideout (Part 9). Name Rater is in town.",
    pokemon:[],
    items:[],
    trainers:[] },

  { part:"Part 9", id:"celadon-city", name:"Celadon City",
    note:"Get Tea from the old woman on the top floor of Celadon Mansion (via the back entrance) — this unlocks all Saffron City gate guards. Eevee is a one-time gift on Mansion 4F. Challenge Erika for the Rainbow Badge.",
    pokemon:[
      {name:"Eevee",   method:"Gift",  levels:"25", note:"One-time — 4F of Celadon Mansion (back entrance, top floor)"},
      {name:"Magikarp",method:"Old Rod",levels:"5", rate:"100%"},
    ],
    items:[
      {name:"Tea",              hidden:false,note:"Old woman, top floor of Celadon Mansion (back entrance) — unlocks Saffron City gates"},
      {name:"Coin Case",        hidden:false,note:"Man in the restaurant on the south side of town"},
      {name:"Ether",            hidden:false,note:"Northwest corner of town"},
      {name:"TM16 Light Screen",hidden:false,note:"Rooftop vending machine exchange — give Fresh Water"},
      {name:"TM20 Safeguard",   hidden:false,note:"Rooftop vending machine exchange — give Soda Pop"},
      {name:"TM33 Reflect",     hidden:false,note:"Rooftop vending machine exchange — give Lemonade"},
      {name:"TM19 Giga Drain",  hidden:false,note:"Erika's reward for defeating her"},
      {name:"PP Up",            hidden:true, note:"Northeast of the small tree, east side of city (★ Itemfinder)",img:"screenshots/hidden/celadon-city-7.png"},
    ],
    trainers:[
      {class:"Beauty",     name:"Tamia",  team:[{name:"Bellsprout",level:24},{name:"Bellsprout",level:24}]},
      {class:"Lass",       name:"Kay",    team:[{name:"Bellsprout",level:23},{name:"Weepinbell",level:23}]},
      {class:"Beauty",     name:"Bridget",team:[{name:"Oddish",    level:21},{name:"Oddish",    level:21},{name:"Bellsprout",level:21},{name:"Bellsprout",level:21}]},
      {class:"Picnicker",  name:"Tina",   team:[{name:"Bulbasaur", level:24},{name:"Ivysaur",   level:24}]},
      {class:"Cooltrainer",name:"Mary",   team:[{name:"Bellsprout",level:22},{name:"Oddish",    level:22},{name:"Weepinbell",level:22},{name:"Gloom",level:22},{name:"Ivysaur",level:22}]},
      {class:"Lass",       name:"Lisa",   team:[{name:"Oddish",    level:23},{name:"Gloom",     level:23}]},
      {class:"Beauty",     name:"Lori",   team:[{name:"Exeggcute", level:24}]},
      {class:"Erika",      name:"Erika",  team:[{name:"Victreebel",level:29},{name:"Tangela",   level:24},{name:"Vileplume",level:29}]},
    ] },

  { part:"Part 9", id:"celadon-game-corner", name:"Celadon Game Corner",
    note:"Exchange coins at the Prize Corner. TM24 Thunderbolt and TM35 Flamethrower are 4,000 coins each — top-tier competitive TMs. Defeat the Team Rocket Grunt to access the poster switch that opens the Rocket Hideout stairs.",
    pokemon:[
      {name:"Scyther", method:"Game Corner",levels:"25", optional:true, note:"5,500 coins — FR only",hgOnly:true},
      {name:"Pinsir",  method:"Game Corner",levels:"18", optional:true, note:"2,500 coins — LG only",ssOnly:true},
      {name:"Dratini", method:"Game Corner",levels:"18", optional:true, note:"2,800 coins FR / 4,600 coins LG"},
      {name:"Porygon", method:"Game Corner",levels:"26", optional:true, note:"9,999 coins FR / 6,500 coins LG"},
      {name:"Abra",    method:"Game Corner",levels:"9",  optional:true, note:"180 coins FR / 120 coins LG"},
      {name:"Clefairy",method:"Game Corner",levels:"8",  optional:true, note:"500 coins FR / 750 coins LG"},
    ],
    items:[
      {name:"10 Coins",  hidden:false,note:"From the Fisherman"},
      {name:"20 Coins",  hidden:false,note:"From the Gentleman"},
      {name:"20 Coins",  hidden:false,note:"From the Scientist"},
      {name:"10 Coins",  hidden:true, note:"Three squares south and two squares east of the old man"},
      {name:"10 Coins",  hidden:true, note:"One square west of the old man"},
      {name:"100 Coins", hidden:true, note:"Two squares to the west of the Pokémon Printer"},
      {name:"10 Coins",  hidden:true, note:"Two squares north and two squares east of the Scientist"},
      {name:"40 Coins",  hidden:true, note:"Two squares north and four squares east of the Scientist"},
      {name:"10 Coins",  hidden:true, note:"Four squares north of the Scientist"},
      {name:"10 Coins",  hidden:true, note:"Three squares north and three squares west of the Scientist"},
      {name:"20 Coins",  hidden:true, note:"One square east and three squares north of the woman in the center aisle"},
      {name:"10 Coins",  hidden:true, note:"Two squares south and one square west of the Gym guide"},
      {name:"20 Coins",  hidden:true, note:"One square east and three squares south of the woman in the west aisle"},
      {name:"10 Coins",  hidden:true, note:"One square west and one square south of the Fisherman"},
      {name:"10 Coins",  hidden:true, note:"One square east and two squares north of the man in the west aisle"},
      {name:"TM13 Ice Beam",      hidden:false,optional:true,note:"Prize Corner — 4,000 coins"},
      {name:"TM23 Iron Tail",     hidden:false,optional:true,note:"Prize Corner — 3,500 coins"},
      {name:"TM24 Thunderbolt",   hidden:false,optional:true,note:"Prize Corner — 4,000 coins"},
      {name:"TM30 Shadow Ball",   hidden:false,optional:true,note:"Prize Corner — 4,500 coins"},
      {name:"TM35 Flamethrower",  hidden:false,optional:true,note:"Prize Corner — 4,000 coins"},
    ],
    trainers:[
      {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Raticate",level:20},{name:"Zubat",level:20}]},
    ] },

  { part:"Part 9", id:"rocket-hideout", name:"Rocket Hideout (B1F–B4F)",
    note:"Four basement floors. Collect the Lift Key (dropped by a Grunt on B4F northwest) to use the elevator. Giovanni on B4F drops the Silph Scope — required to identify Ghost-types in Pokémon Tower.",
    floors:[
      { label:"B1F",
        pokemon:[],
        items:[
          {name:"PP Up",       hidden:true, note:"Southeastern planter (★ Itemfinder)",img:"screenshots/hidden/rocket-hideout-b1f-0.png"},
          {name:"Escape Rope", hidden:false,note:"Western room"},
          {name:"Hyper Potion",hidden:false,note:"East room (accessible via B2F south stairs)"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Drowzee", level:21},{name:"Machop",  level:21}]},
          {class:"Team Rocket Grunt",name:"Grunt 2",team:[{name:"Raticate",level:21},{name:"Raticate",level:21}]},
          {class:"Team Rocket Grunt",name:"Grunt 3",team:[{name:"Rattata", level:19},{name:"Raticate",level:19},{name:"Raticate",level:19},{name:"Rattata",level:19}]},
          {class:"Team Rocket Grunt",name:"Grunt 4",team:[{name:"Grimer",  level:20},{name:"Koffing", level:20},{name:"Koffing",level:20}]},
          {class:"Team Rocket Grunt",name:"Grunt 9",team:[{name:"Koffing", level:21},{name:"Zubat",   level:21}]},
        ]},
      { label:"B2F",
        pokemon:[],
        items:[
          {name:"X Speed",     hidden:false,note:"Northeast corner"},
          {name:"Moon Stone",  hidden:false,note:"West wall"},
          {name:"TM12 Taunt",  hidden:false,note:"Middle area"},
          {name:"Super Potion",hidden:false,note:"Southwest area"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 6",team:[{name:"Zubat",level:17},{name:"Koffing",level:17},{name:"Grimer",level:17},{name:"Zubat",level:17},{name:"Raticate",level:17}]},
        ]},
      { label:"B3F",
        pokemon:[],
        items:[
          {name:"TM21 Frustration",hidden:false,note:"East-central room"},
          {name:"Nugget",          hidden:true, note:"Northwest corner (★ Itemfinder)",img:"screenshots/hidden/rocket-hideout-b3f-1.png"},
          {name:"Rare Candy",      hidden:false,note:"Spinner maze, east side"},
          {name:"Black Glasses",   hidden:false,note:"Southeast corner"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 7",team:[{name:"Machop", level:21},{name:"Machop",  level:21}]},
          {class:"Team Rocket Grunt",name:"Grunt 8",team:[{name:"Rattata",level:20},{name:"Raticate",level:20},{name:"Drowzee",level:20}]},
        ]},
      { label:"B4F",
        pokemon:[],
        items:[
          {name:"Max Ether",  hidden:false,note:"Northwest room table"},
          {name:"TM49 Snatch",hidden:false,note:"Northwest room"},
          {name:"Calcium",    hidden:false,note:"Southeast, table west of elevator"},
          {name:"Net Ball",   hidden:true, note:"Between potted plants SW of Giovanni (★ Itemfinder)",img:"screenshots/hidden/rocket-hideout-b4f-3.png"},
          {name:"Nest Ball",  hidden:true, note:"Between potted plants SE of Giovanni (★ Itemfinder)",img:"screenshots/hidden/rocket-hideout-b4f-4.png"},
          {name:"Lift Key",   hidden:false,note:"Dropped by northwest Grunt after defeat"},
          {name:"Silph Scope",hidden:false,note:"Dropped by Giovanni after defeat"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 5", team:[{name:"Grimer",   level:22},{name:"Koffing",   level:22}]},
          {class:"Team Rocket Grunt",name:"Grunt 10",team:[{name:"Sandshrew",level:23},{name:"Ekans",     level:23},{name:"Sandslash",level:23}]},
          {class:"Team Rocket Grunt",name:"Grunt 11",team:[{name:"Ekans",    level:23},{name:"Sandshrew", level:23},{name:"Arbok",    level:23}]},
          {class:"Giovanni",         name:"Giovanni",team:[{name:"Onix",     level:25},{name:"Rhyhorn",   level:24},{name:"Kangaskhan",level:29}]},
        ]},
    ] },

  { part:"Part 9", id:"pokemon-tower", name:"Pokémon Tower",
    note:"Requires Silph Scope (from Rocket Hideout) to reveal and catch Ghost-types on floors 3–7. Rescue Mr. Fuji on 7F to receive the Poké Flute.",
    floors:[
      { label:"2F",
        pokemon:[],
        items:[],
        trainers:[
          {class:"Rival",name:"Blue",note:"Team varies by starter — shown here for Bulbasaur start",
            team:[{name:"Pidgeotto",level:25},{name:"Exeggcute",level:23},{name:"Gyarados",level:22},{name:"Kadabra",level:20},{name:"Charmeleon",level:25}]},
        ]},
      { label:"3F",
        pokemon:[
          {name:"Gastly", method:"Cave",levels:"17–19",rate:"90%"},
          {name:"Cubone", method:"Cave",levels:"17–18",rate:"9%"},
          {name:"Haunter",method:"Cave",levels:"17",   rate:"1%"},
        ],
        items:[
          {name:"Escape Rope",hidden:false,note:"Near the north wall"},
        ],
        trainers:[
          {class:"Channeler",name:"Hope",    team:[{name:"Gastly",level:23}]},
          {class:"Channeler",name:"Patricia",team:[{name:"Gastly",level:22}]},
          {class:"Channeler",name:"Carly",   team:[{name:"Gastly",level:24}]},
        ]},
      { label:"4F",
        pokemon:[
          {name:"Gastly", method:"Cave",levels:"20–22",rate:"86%"},
          {name:"Cubone", method:"Cave",levels:"19–21",rate:"9%"},
          {name:"Haunter",method:"Cave",levels:"20–22",rate:"5%"},
        ],
        items:[
          {name:"Elixir",    hidden:false,note:"West of the stairway from 3F"},
          {name:"Awakening", hidden:false,note:"In the center of the room"},
          {name:"Great Ball",hidden:false,note:"Near the south wall"},
        ],
        trainers:[
          {class:"Channeler",name:"Laurel",team:[{name:"Gastly",level:23},{name:"Gastly",level:23}]},
          {class:"Channeler",name:"Jody",  team:[{name:"Gastly",level:22}]},
          {class:"Channeler",name:"Paula", team:[{name:"Gastly",level:24}]},
        ]},
      { label:"5F",
        pokemon:[
          {name:"Gastly", method:"Cave",levels:"20–22",rate:"86%"},
          {name:"Cubone", method:"Cave",levels:"19–21",rate:"9%"},
          {name:"Haunter",method:"Cave",levels:"20–22",rate:"5%"},
        ],
        items:[
          {name:"Big Mushroom",hidden:true, note:"One step north, four steps west of Channeler Ruth",img:"screenshots/hidden/pokemon-tower-4f-5f-6.png"},
          {name:"Cleanse Tag", hidden:false,note:"Middle of the healing area"},
          {name:"Nugget",      hidden:false,note:"Near the south wall"},
        ],
        trainers:[
          {class:"Channeler",name:"Ruth", team:[{name:"Gastly",level:22}]},
          {class:"Channeler",name:"Tammy",team:[{name:"Haunter",level:23}]},
        ]},
      { label:"6F",
        pokemon:[
          {name:"Gastly", method:"Cave",levels:"22–23",rate:"85%"},
          {name:"Cubone", method:"Cave",levels:"21–22",rate:"9%"},
          {name:"Haunter",method:"Cave",levels:"22–23",rate:"6%"},
        ],
        items:[
          {name:"X Accuracy",hidden:false,note:"Southwest of the stairway from 5F"},
          {name:"Rare Candy", hidden:false,note:"West-central part of the room"},
        ],
        trainers:[
          {class:"Channeler",name:"Karina",   team:[{name:"Gastly",level:24}]},
          {class:"Channeler",name:"Janae",    team:[{name:"Gastly",level:22}]},
          {class:"Channeler",name:"Angelica", team:[{name:"Gastly",level:22},{name:"Gastly",level:22},{name:"Gastly",level:22}]},
          {class:"Channeler",name:"Jennifer", team:[{name:"Gastly",level:24}]},
          {class:"Channeler",name:"Emilia",   team:[{name:"Gastly",level:24}]},
        ]},
      { label:"7F",
        pokemon:[
          {name:"Gastly", method:"Cave",levels:"22–23",rate:"75%"},
          {name:"Haunter",method:"Cave",levels:"22–23",rate:"15%"},
          {name:"Cubone", method:"Cave",levels:"22–23",rate:"10%"},
        ],
        items:[
          {name:"Soothe Bell",hidden:true, note:"On the spot where Mr. Fuji was standing (★ Itemfinder)"},
          {name:"Poké Flute", hidden:false,note:"From Mr. Fuji after rescuing him — wakes both Snorlax"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Zubat",  level:25},{name:"Zubat",  level:25},{name:"Golbat",level:25}]},
          {class:"Team Rocket Grunt",name:"Grunt 2",team:[{name:"Koffing",level:26},{name:"Drowzee",level:26}]},
          {class:"Team Rocket Grunt",name:"Grunt 3",team:[{name:"Zubat",  level:23},{name:"Rattata",level:23}]},
        ]},
    ] },

  { part:"Part 10", id:"route12", name:"Route 12 (Silence Bridge)",
    note:"⚠ Snorlax blocks the road — ONE-TIME catch, Lv30, use Poké Flute! Get the Super Rod from the Fishing Guru's younger brother in the house on this route.",
    pokemon:[
      {name:"Oddish",   method:"Grass",   levels:"22–26",rate:"35%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",  levels:"22–26",rate:"35%",ssOnly:true},
      {name:"Pidgey",   method:"Grass",   levels:"23–27",rate:"30%"},
      {name:"Venonat",  method:"Grass",   levels:"24–26",rate:"30%"},
      {name:"Gloom",    method:"Grass",   levels:"28–30",rate:"5%", hgOnly:true},
      {name:"Weepinbell",method:"Grass",  levels:"28–30",rate:"5%", ssOnly:true},
      {name:"Snorlax",  method:"Special", levels:"30",   rate:"×1", note:"⚠ ONE-TIME — wake with Poké Flute, then catch. Do NOT KO!"},
      {name:"Tentacool",method:"Surf",    levels:"5–40", rate:"100%"},
      {name:"Magikarp", method:"Old Rod", levels:"5",    rate:"100%"},
      {name:"Horsea",   method:"Good Rod",levels:"5–15", rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod",levels:"5–15", rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod",levels:"5–15", rate:"20%"},
      {name:"Horsea",   method:"Super Rod",levels:"15–35",rate:"84%",hgOnly:true},
      {name:"Krabby",   method:"Super Rod",levels:"15–35",rate:"84%",ssOnly:true},
      {name:"Gyarados", method:"Super Rod",levels:"15–25",rate:"15%"},
      {name:"Psyduck",  method:"Super Rod",levels:"25–35",rate:"1%", hgOnly:true},
      {name:"Slowpoke", method:"Super Rod",levels:"25–35",rate:"1%", ssOnly:true},
    ],
    items:[
      {name:"TM27 Return",    hidden:false,note:"From the girl on the second floor of the Lavender Town gate"},
      {name:"TM48 Skill Swap",hidden:false,surf:true,note:"Southeast of the Lavender Town gate (requires Surf)"},
      {name:"Hyper Potion",   hidden:true, note:"Five steps east, two steps north of Fisherman Elliot",img:"screenshots/hidden/route12-3.png"},
      {name:"Super Rod",      hidden:false,note:"From the Fishing Guru's younger brother"},
      {name:"Net Ball",       hidden:false,optional:true,note:"From the Fishing Guru's younger brother, for showing him a record-breaking Magikarp (repeatable)"},
      {name:"Iron",           hidden:false,note:"Southwest of the Fishing Guru's house (requires Cut)"},
      {name:"Rare Candy",     hidden:true, note:"In the tall grass patch (requires Cut)",img:"screenshots/hidden/route12-5.png"},
      {name:"Leftovers",     hidden:true, note:"Where Snorlax was sleeping (★ Itemfinder)"},
    ],
    trainers:[
      {class:"Fisherman",   name:"Ned",    team:[{name:"Goldeen", level:22},{name:"Poliwag",level:22},{name:"Goldeen",level:22}]},
      {class:"Fisherman",   name:"Chip",   team:[{name:"Tentacool",level:24},{name:"Goldeen",level:24}]},
      {class:"Fisherman",   name:"Hank",   team:[{name:"Goldeen", level:27}]},
      {class:"Fisherman",   name:"Elliot", team:[{name:"Poliwag", level:21},{name:"Shellder",level:21},{name:"Goldeen",level:21},{name:"Horsea",level:21}]},
      {class:"Fisherman",   name:"Andrew", team:[{name:"Magikarp",level:24},{name:"Magikarp",level:24}]},
      {class:"Young Couple",name:"Gia & Jes",team:[{name:"Nidoran♂",level:24},{name:"Nidoran♀",level:24}]},
      {class:"Rocker",      name:"Luca",   team:[{name:"Voltorb", level:29},{name:"Electrode",level:29}]},
      {class:"Camper",      name:"Justin", team:[{name:"Nidoran♂",level:29},{name:"Nidorino",level:29}]},
    ] },

  { part:"Part 10", id:"route13", name:"Route 13",
    note:"Narrow hedge maze with multiple trainers. Ditto appears here — unique catch for the Living Dex!",
    pokemon:[
      {name:"Oddish",    method:"Grass",   levels:"22–26",rate:"35%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",   levels:"22–26",rate:"35%",ssOnly:true},
      {name:"Venonat",   method:"Grass",   levels:"24–26",rate:"30%"},
      {name:"Pidgey",    method:"Grass",   levels:"25–27",rate:"20%"},
      {name:"Ditto",     method:"Grass",   levels:"25",   rate:"5%"},
      {name:"Pidgeotto", method:"Grass",   levels:"29",   rate:"5%"},
      {name:"Gloom",     method:"Grass",   levels:"28–30",rate:"5%",hgOnly:true},
      {name:"Weepinbell",method:"Grass",   levels:"28–30",rate:"5%",ssOnly:true},
      {name:"Tentacool", method:"Surf",    levels:"5–40", rate:"100%"},
      {name:"Magikarp",  method:"Old Rod", levels:"5",    rate:"100%"},
      {name:"Horsea",    method:"Good Rod",levels:"5–15", rate:"60% FR / 20% LG"},
      {name:"Krabby",    method:"Good Rod",levels:"5–15", rate:"20% FR / 60% LG"},
      {name:"Magikarp",  method:"Good Rod",levels:"5–15", rate:"20%"},
      {name:"Horsea",    method:"Super Rod",levels:"15–35",rate:"84%",hgOnly:true},
      {name:"Krabby",    method:"Super Rod",levels:"15–35",rate:"84%",ssOnly:true},
      {name:"Gyarados",  method:"Super Rod",levels:"15–25",rate:"15%"},
      {name:"Psyduck",   method:"Super Rod",levels:"25–35",rate:"1%", hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod",levels:"25–35",rate:"1%", ssOnly:true},
    ],
    items:[
      {name:"PP Up",hidden:true,note:"Two steps east of the Trainer Tips sign (★ Itemfinder)",img:"screenshots/hidden/route13-0.png"},
    ],
    trainers:[
      {class:"Picnicker", name:"Alma",      team:[{name:"Goldeen",   level:28},{name:"Poliwag",   level:28},{name:"Horsea",    level:28}]},
      {class:"Picnicker", name:"Susie",     team:[{name:"Pidgey",    level:24},{name:"Meowth",    level:24},{name:"Rattata",   level:24},{name:"Pikachu",level:24},{name:"Meowth",level:24}]},
      {class:"Picnicker", name:"Valerie",   team:[{name:"Poliwag",   level:30},{name:"Poliwag",   level:30}]},
      {class:"Picnicker", name:"Gwen",      team:[{name:"Pidgey",    level:27},{name:"Meowth",    level:27},{name:"Pidgey",    level:27},{name:"Pidgeotto",level:27}]},
      {class:"Beauty",    name:"Lola",      team:[{name:"Rattata",   level:27},{name:"Pikachu",   level:27},{name:"Rattata",   level:27}]},
      {class:"Beauty",    name:"Sheila",    team:[{name:"Clefairy",  level:29},{name:"Meowth",    level:29}]},
      {class:"Bird Keeper",name:"Sebastian",team:[{name:"Pidgey",    level:29},{name:"Pidgeotto", level:29}]},
      {class:"Bird Keeper",name:"Robert",   team:[{name:"Pidgey",    level:26},{name:"Pidgeotto", level:26},{name:"Spearow",   level:26},{name:"Fearow",level:26}]},
      {class:"Bird Keeper",name:"Perry",    team:[{name:"Spearow",   level:25},{name:"Pidgey",    level:25},{name:"Pidgey",    level:25},{name:"Spearow",level:25},{name:"Spearow",level:25}]},
      {class:"Biker",     name:"Jared",     team:[{name:"Koffing",   level:28},{name:"Koffing",   level:28},{name:"Koffing",  level:28}]},
    ] },

  { part:"Part 10", id:"route14", name:"Route 14",
    note:"Bird Keepers and Bikers patrol this route. Ditto appears here too.",
    pokemon:[
      {name:"Oddish",    method:"Grass",levels:"22–26",rate:"35%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"22–26",rate:"35%",ssOnly:true},
      {name:"Venonat",   method:"Grass",levels:"24–26",rate:"30%"},
      {name:"Ditto",     method:"Grass",levels:"23",   rate:"15%"},
      {name:"Pidgey",    method:"Grass",levels:"27",   rate:"10%"},
      {name:"Pidgeotto", method:"Grass",levels:"29",   rate:"5%"},
      {name:"Gloom",     method:"Grass",levels:"30",   rate:"5%",hgOnly:true},
      {name:"Weepinbell",method:"Grass",levels:"30",   rate:"5%",ssOnly:true},
    ],
    items:[
      {name:"Pinap Berry",hidden:true,note:"Southeast corner near Twins Kiri & Jan (★ Itemfinder)",img:"screenshots/hidden/route14-0.png"},
      {name:"Zinc",      hidden:true,note:"In the tall grass patch (★ Itemfinder)",img:"screenshots/hidden/route14-1.png"},
    ],
    trainers:[
      {class:"Bird Keeper",name:"Carter", team:[{name:"Pidgey",    level:28},{name:"Doduo",    level:28},{name:"Pidgeotto",level:28}]},
      {class:"Bird Keeper",name:"Mitch",  team:[{name:"Pidgey",    level:26},{name:"Spearow",  level:26},{name:"Pidgey",   level:26},{name:"Fearow",level:26}]},
      {class:"Bird Keeper",name:"Beck",   team:[{name:"Pidgeotto", level:29},{name:"Fearow",   level:29}]},
      {class:"Bird Keeper",name:"Donald", team:[{name:"Farfetch'd",level:33}]},
      {class:"Bird Keeper",name:"Marlon", team:[{name:"Spearow",   level:28},{name:"Doduo",    level:28},{name:"Fearow",   level:28}]},
      {class:"Bird Keeper",name:"Benny",  team:[{name:"Spearow",   level:29},{name:"Fearow",   level:29}]},
      {class:"Twins",      name:"Kiri & Jan",team:[{name:"Charmander",level:29},{name:"Squirtle",level:29}]},
      {class:"Biker",      name:"Gerald", team:[{name:"Koffing",   level:29},{name:"Muk",      level:29}]},
      {class:"Biker",      name:"Malik",  team:[{name:"Koffing",   level:29},{name:"Grimer",   level:29}]},
      {class:"Biker",      name:"Isaac",  team:[{name:"Grimer",    level:28},{name:"Grimer",    level:28},{name:"Koffing",level:28}]},
      {class:"Biker",      name:"Lukas",  team:[{name:"Koffing",   level:26},{name:"Koffing",  level:26},{name:"Grimer",level:26},{name:"Koffing",level:26}]},
    ] },

  { part:"Part 10", id:"route15", name:"Route 15",
    note:"50 Pokémon caught → Exp. Share from Oak's aide in the east gate. Northern path requires Cut; southern path is always accessible.",
    pokemon:[
      {name:"Oddish",    method:"Grass",levels:"22–26",rate:"35%",hgOnly:true},
      {name:"Bellsprout",method:"Grass",levels:"22–26",rate:"35%",ssOnly:true},
      {name:"Venonat",   method:"Grass",levels:"24–26",rate:"30%"},
      {name:"Pidgey",    method:"Grass",levels:"25–27",rate:"20%"},
      {name:"Ditto",     method:"Grass",levels:"25",   rate:"5%"},
      {name:"Pidgeotto", method:"Grass",levels:"29",   rate:"5%"},
      {name:"Gloom",     method:"Grass",levels:"28–30",rate:"5%",hgOnly:true},
      {name:"Weepinbell",method:"Grass",levels:"28–30",rate:"5%",ssOnly:true},
    ],
    items:[
      {name:"Exp. Share",   hidden:false,note:"Oak's aide in the east gate building (catch 50 species)"},
      {name:"TM18 Rain Dance",hidden:false,note:"Western portion of the northern hill (requires Cut)"},
    ],
    trainers:[
      {class:"Picnicker",  name:"Becky",   team:[{name:"Pikachu",   level:29},{name:"Raichu",     level:29}]},
      {class:"Picnicker",  name:"Celia",   team:[{name:"Clefairy",  level:33}]},
      {class:"Picnicker",  name:"Kindra",  team:[{name:"Gloom",     level:28},{name:"Oddish",     level:28},{name:"Oddish",level:28}]},
      {class:"Picnicker",  name:"Yazmin",  team:[{name:"Bellsprout",level:29},{name:"Oddish",     level:29},{name:"Tangela",level:29}]},
      {class:"Beauty",     name:"Grace",   team:[{name:"Pidgeotto", level:29},{name:"Wigglytuff", level:29}]},
      {class:"Beauty",     name:"Olivia",  team:[{name:"Bulbasaur", level:29},{name:"Ivysaur",    level:29}]},
      {class:"Bird Keeper",name:"Chester", team:[{name:"Dodrio",    level:28},{name:"Doduo",      level:28},{name:"Doduo",level:28}]},
      {class:"Bird Keeper",name:"Edwin",   team:[{name:"Pidgeotto", level:26},{name:"Farfetch'd", level:26},{name:"Doduo",level:26},{name:"Pidgey",level:26}]},
      {class:"Crush Kin",  name:"Ron & Mya",team:[{name:"Hitmonchan",level:29},{name:"Hitmonlee",level:29}]},
      {class:"Biker",      name:"Ernest",  team:[{name:"Koffing",   level:25},{name:"Koffing",   level:25},{name:"Weezing",level:25},{name:"Koffing",level:25},{name:"Grimer",level:25}]},
      {class:"Biker",      name:"Alex",    team:[{name:"Koffing",   level:28},{name:"Grimer",    level:28},{name:"Weezing",level:28}]},
    ] },

  { part:"Part 10", id:"fuchsia-city", name:"Fuchsia City",
    note:"Return the Warden's Gold Teeth (found in Safari Zone Area 3, northeast of the rocky ridge) to get HM04 Strength. Good Rod from the Fishing Guru here. Defeat Koga for the Soul Badge and TM06 Toxic.",
    pokemon:[
      {name:"Magikarp",method:"Old Rod", levels:"5",    rate:"100%"},
      {name:"Poliwag", method:"Good Rod",levels:"5–15", rate:"60%"},
      {name:"Goldeen", method:"Good Rod",levels:"5–15", rate:"20%"},
      {name:"Magikarp",method:"Good Rod",levels:"5–15", rate:"20%"},
    ],
    items:[
      {name:"Good Rod",    hidden:false,note:"Fishing Guru's brother in the southeastern house"},
      {name:"HM04 Strength",hidden:false,note:"Safari Zone Warden — return his Gold Teeth"},
      {name:"Rare Candy",  hidden:false,note:"Inside the Warden's house (requires Strength)"},
      {name:"TM06 Toxic",  hidden:false,note:"Koga's reward for defeating him"},
      {name:"Max Revive",  hidden:true, note:"Backyard of Fishing Guru's house, one step east of the southernmost flower (★ Itemfinder)",img:"screenshots/hidden/fuchsia-city-4.png"},
    ],
    trainers:[
      {class:"Juggler",name:"Nate",    team:[{name:"Drowzee",level:34},{name:"Kadabra",level:34}]},
      {class:"Juggler",name:"Kayden",  team:[{name:"Hypno",  level:38}]},
      {class:"Juggler",name:"Kirk",    team:[{name:"Drowzee",level:31},{name:"Drowzee",level:31},{name:"Kadabra",level:31},{name:"Drowzee",level:31}]},
      {class:"Juggler",name:"Shawn",   team:[{name:"Drowzee",level:34},{name:"Hypno",  level:34}]},
      {class:"Tamer",  name:"Edgar",   team:[{name:"Arbok",  level:33},{name:"Arbok",  level:33},{name:"Sandslash",level:33}]},
      {class:"Tamer",  name:"Phil",    team:[{name:"Sandslash",level:34},{name:"Arbok",level:34}]},
      {class:"Koga",   name:"Koga",    team:[{name:"Koffing",level:37},{name:"Muk",    level:39},{name:"Koffing",level:37},{name:"Weezing",level:43}]},
    ] },

  { part:"Part 10", id:"safari-zone", name:"Safari Zone",
    note:"600 steps, 30 Safari Balls. Top Living Dex targets: Scyther (FR, Center & Area 1) or Pinsir (LG, Center & Area 1), Kangaskhan (Area 1 & 3), Chansey (Center & Area 2), Dratini via Super Rod. Gold Teeth and HM03 Surf are both in Area 3.",
    floors:[
      { label:"Center",
        pokemon:[
          {name:"Nidoran♂", method:"Grass",levels:"22",   rate:"20%",hgOnly:true},
          {name:"Nidoran♀", method:"Grass",levels:"22",   rate:"20%",ssOnly:true},
          {name:"Exeggcute",method:"Grass",levels:"24–25",rate:"20%"},
          {name:"Rhyhorn",  method:"Grass",levels:"25",   rate:"20%"},
          {name:"Venonat",  method:"Grass",levels:"22",   rate:"15%"},
          {name:"Nidorino", method:"Grass",levels:"31",   rate:"10% FR / 5% LG"},
          {name:"Nidorina", method:"Grass",levels:"31",   rate:"5% FR / 10% LG"},
          {name:"Parasect", method:"Grass",levels:"30",   rate:"5%"},
          {name:"Scyther",  method:"Grass",levels:"23",   rate:"4%", hgOnly:true},
          {name:"Pinsir",   method:"Grass",levels:"23",   rate:"4%", ssOnly:true},
          {name:"Chansey",  method:"Grass",levels:"23",   rate:"1%"},
          {name:"Magikarp", method:"Old Rod",  levels:"5",    rate:"100%"},
          {name:"Goldeen",  method:"Good Rod", levels:"5–15", rate:"60%"},
          {name:"Poliwag",  method:"Good Rod", levels:"5–15", rate:"20%"},
          {name:"Magikarp", method:"Good Rod", levels:"5–15", rate:"20%"},
          {name:"Krabby",   method:"Super Rod",levels:"15",   rate:"40%"},
          {name:"Dratini",  method:"Super Rod",levels:"15",   rate:"25%"},
          {name:"Psyduck",  method:"Super Rod",levels:"15",   rate:"15%"},
          {name:"Dragonair",method:"Super Rod",levels:"15",   rate:"10%"},
          {name:"Slowpoke", method:"Super Rod",levels:"15–35", rate:"4%", ssOnly:true},
        ],
        items:[
          {name:"Nugget",    hidden:false,surf:true,note:"Central island (requires Surf)"},
          {name:"Leaf Stone",hidden:true, surf:true,note:"Central island, three steps east of the Nugget (★ Itemfinder, requires Surf)",img:"screenshots/hidden/safari-zone-center-1.png"},
        ],
        trainers:[]},
      { label:"Area 1",
        pokemon:[
          {name:"Nidoran♂",  method:"Grass",levels:"24",   rate:"20%",hgOnly:true},
          {name:"Nidoran♀",  method:"Grass",levels:"24",   rate:"20%",ssOnly:true},
          {name:"Doduo",     method:"Grass",levels:"26",   rate:"20%"},
          {name:"Exeggcute", method:"Grass",levels:"23–25",rate:"20%"},
          {name:"Paras",     method:"Grass",levels:"22",   rate:"15%"},
          {name:"Nidorino",  method:"Grass",levels:"33",   rate:"10%",hgOnly:true},
          {name:"Nidorina",  method:"Grass",levels:"33",   rate:"10%",ssOnly:true},
          {name:"Nidoran♀",  method:"Grass",levels:"24",   rate:"5%", hgOnly:true},
          {name:"Parasect",  method:"Grass",levels:"25",   rate:"5%"},
          {name:"Kangaskhan",method:"Grass",levels:"25",   rate:"4%"},
          {name:"Scyther",   method:"Grass",levels:"28",   rate:"1%", hgOnly:true},
          {name:"Pinsir",    method:"Grass",levels:"28",   rate:"1%", ssOnly:true},
        ],
        items:[
          {name:"Leaf Stone",    hidden:false,note:"Southern rocky ridge"},
          {name:"TM11 Sunny Day",hidden:false,note:"In the tall grass nearly surrounded by water"},
          {name:"Max Potion",    hidden:false,note:"West of the smaller rocky ridge"},
          {name:"Full Restore",  hidden:false,note:"Southwest of the rest house"},
        ],
        trainers:[]},
      { label:"Area 2",
        pokemon:[
          {name:"Nidoran♂", method:"Grass",levels:"30",   rate:"20%",hgOnly:true},
          {name:"Nidoran♀", method:"Grass",levels:"30",   rate:"20%",ssOnly:true},
          {name:"Exeggcute",method:"Grass",levels:"25–27",rate:"20%"},
          {name:"Rhyhorn",  method:"Grass",levels:"26",   rate:"20%"},
          {name:"Paras",    method:"Grass",levels:"23",   rate:"15%"},
          {name:"Nidorino", method:"Grass",levels:"30",   rate:"10% FR / 5% LG"},
          {name:"Nidorina", method:"Grass",levels:"30",   rate:"5% FR / 10% LG"},
          {name:"Venomoth", method:"Grass",levels:"32",   rate:"5%"},
          {name:"Chansey",  method:"Grass",levels:"26",   rate:"4%"},
          {name:"Tauros",   method:"Grass",levels:"28",   rate:"1%"},
        ],
        items:[
          {name:"Quick Claw",      hidden:false,note:"Near the middle of the zone"},
          {name:"TM47 Steel Wing", hidden:false,note:"Southwest of the rest house"},
          {name:"Protein",         hidden:false,note:"Northwest of the rest house"},
        ],
        trainers:[]},
      { label:"Area 3",
        pokemon:[
          {name:"Nidoran♀", method:"Grass",levels:"22",   rate:"20%",ssOnly:true},
          {name:"Nidoran♂", method:"Grass",levels:"22",   rate:"20%",hgOnly:true},
          {name:"Doduo",    method:"Grass",levels:"26",   rate:"20%"},
          {name:"Exeggcute",method:"Grass",levels:"25–27",rate:"20%"},
          {name:"Venonat",  method:"Grass",levels:"23",   rate:"15%"},
          {name:"Nidorina", method:"Grass",levels:"30",   rate:"10%",ssOnly:true},
          {name:"Nidorino", method:"Grass",levels:"30",   rate:"10%",hgOnly:true},
          {name:"Nidoran♀", method:"Grass",levels:"30",   rate:"5%", hgOnly:true},
          {name:"Venomoth", method:"Grass",levels:"32",   rate:"5%"},
          {name:"Tauros",   method:"Grass",levels:"25",   rate:"4%"},
          {name:"Kangaskhan",method:"Grass",levels:"28",  rate:"1%"},
        ],
        items:[
          {name:"Gold Teeth",      hidden:false,note:"Northeast of the rocky ridge — return to the Warden in Fuchsia City for HM04 Strength"},
          {name:"TM32 Double Team",hidden:false,note:"Southeast of the Secret House"},
          {name:"Revive",          hidden:true, note:"In the dirt patch in front of the Secret House (★ Itemfinder)",img:"screenshots/hidden/safari-zone-area-3-2.png"},
          {name:"HM03 Surf",       hidden:false,note:"Secret House — received from a safari official"},
          {name:"Max Potion",      hidden:false,surf:true,note:"In the tall grass patch (requires Surf)"},
          {name:"Max Revive",      hidden:false,surf:true,note:"Southeast side of the rocky ridge (requires Surf)"},
        ],
        trainers:[]},
    ] },

  { part:"Part 10", id:"route18", name:"Route 18",
    note:"Short east–west route between the Cycling Road exit and Fuchsia City. In-game trade in the gate: give Golduck (FR) or Slowbro (LG) to receive Lickitung — key Living Dex catch!",
    pokemon:[
      {name:"Rattata", method:"Grass",levels:"22",   rate:"5%"},
      {name:"Raticate",method:"Grass",levels:"25–29",rate:"15%"},
      {name:"Spearow", method:"Grass",levels:"20–22",rate:"30%"},
      {name:"Fearow",  method:"Grass",levels:"25–29",rate:"15%"},
      {name:"Doduo",   method:"Grass",levels:"24–28",rate:"35%"},
      {name:"Lickitung",method:"Trade",levels:"varies",note:"Trade in the gate building: give Golduck (FR) or Slowbro (LG)"},
    ],
    items:[],
    trainers:[
      {class:"Bird Keeper",name:"Jacob", team:[{name:"Spearow",level:26},{name:"Spearow",level:26},{name:"Spearow",level:26},{name:"Fearow", level:26}]},
      {class:"Bird Keeper",name:"Wilton",team:[{name:"Spearow",level:29},{name:"Fearow", level:29}]},
      {class:"Bird Keeper",name:"Ramiro",team:[{name:"Dodrio", level:34}]},
    ] },

  { part:"Part 10", id:"route17", name:"Route 17 (Cycling Road)",
    note:"Cycling Road — you ride straight through. Lots of Bikers and Cue Balls line the path. All items are hidden; use the Itemfinder as you go.",
    pokemon:[
      {name:"Rattata", method:"Grass",levels:"22",   rate:"5%"},
      {name:"Raticate",method:"Grass",levels:"25–29",rate:"25%"},
      {name:"Spearow", method:"Grass",levels:"20–22",rate:"30%"},
      {name:"Fearow",  method:"Grass",levels:"25–27",rate:"5%"},
      {name:"Doduo",   method:"Grass",levels:"24–28",rate:"35%"},
    ],
    items:[
      {name:"Full Restore",hidden:true,note:"1W, 6N of northernmost signboard (★ Itemfinder)",img:"screenshots/hidden/route17-0.png"},
      {name:"PP Up",       hidden:true,note:"Middle bridge's west road, aligned with 2nd signboard from north (★ Itemfinder)",img:"screenshots/hidden/route17-1.png"},
      {name:"Rare Candy",  hidden:true,note:"East road, aligned with 3rd signboard from north (★ Itemfinder)",img:"screenshots/hidden/route17-2.png"},
      {name:"Max Revive",  hidden:true,note:"Small grass bridge connecting west and east segments (★ Itemfinder)",img:"screenshots/hidden/route17-3.png"},
      {name:"Max Elixir",  hidden:true,note:"3E of southernmost sign (★ Itemfinder)",img:"screenshots/hidden/route17-4.png"},
    ],
    trainers:[
      {class:"Cue Ball",name:"Isaiah",team:[{name:"Machop",  level:29},{name:"Machamp", level:29}]},
      {class:"Cue Ball",name:"Corey", team:[{name:"Primeape",level:29},{name:"Machoke", level:29}]},
      {class:"Cue Ball",name:"Raul",  team:[{name:"Mankey",  level:29},{name:"Primeape",level:29}]},
      {class:"Cue Ball",name:"Jamal", team:[{name:"Mankey",  level:26},{name:"Mankey",  level:26},{name:"Machamp",level:26},{name:"Machop",level:26}]},
      {class:"Cue Ball",name:"Zeek",  team:[{name:"Machoke", level:33}]},
      {class:"Biker",   name:"Virgil",team:[{name:"Weezing", level:28},{name:"Koffing", level:28},{name:"Weezing",level:28}]},
      {class:"Biker",   name:"Billy", team:[{name:"Muk",     level:33}]},
      {class:"Biker",   name:"Nikolas",team:[{name:"Voltorb",level:29},{name:"Voltorb", level:29}]},
      {class:"Biker",   name:"Jaxon", team:[{name:"Weezing", level:29},{name:"Muk",     level:29}]},
      {class:"Biker",   name:"William",team:[{name:"Koffing",level:25},{name:"Weezing", level:25},{name:"Koffing",level:25},{name:"Weezing",level:25},{name:"Koffing",level:25}]},
    ] },

  { part:"Part 10", id:"route16", name:"Route 16",
    note:"⚠ Snorlax #2 blocks the west gate — ONE-TIME catch, Lv30, wake with Poké Flute! HM02 Fly is behind the Cut tree in the gated house. Amulet Coin from Oak's aide at the gate (requires 40 caught species).",
    pokemon:[
      {name:"Rattata", method:"Grass",  levels:"18–22",rate:"30%"},
      {name:"Doduo",   method:"Grass",  levels:"18–22",rate:"35%"},
      {name:"Spearow", method:"Grass",  levels:"20–22",rate:"30%"},
      {name:"Raticate",method:"Grass",  levels:"23–25",rate:"5%"},
      {name:"Snorlax", method:"Special",levels:"30",   rate:"×1",note:"⚠ ONE-TIME — wake with Poké Flute, then catch. Last Snorlax in the game!"},
    ],
    items:[
      {name:"HM02 Fly",    hidden:false,note:"Girl's house (northwest, requires Cut to enter)"},
      {name:"Amulet Coin", hidden:false,note:"Oak's aide at the gate — show 40 caught species"},
      {name:"Leftovers",   hidden:true, note:"Where Snorlax was sleeping (★ Itemfinder)",img:"screenshots/hidden/route16-2.png"},
    ],
    trainers:[
      {class:"Young Couple",name:"Lea & Jed",team:[{name:"Rapidash",level:29},{name:"Ninetales",level:29}]},
      {class:"Biker",       name:"Lao",      team:[{name:"Grimer",  level:29},{name:"Koffing", level:29}]},
      {class:"Cue Ball",    name:"Koji",     team:[{name:"Machop",  level:28},{name:"Mankey",  level:28},{name:"Machop",level:28}]},
      {class:"Cue Ball",    name:"Luke",     team:[{name:"Mankey",  level:29},{name:"Machop",  level:29}]},
      {class:"Biker",       name:"Hideo",    team:[{name:"Weezing", level:33}]},
      {class:"Biker",       name:"Ruben",    team:[{name:"Weezing", level:28},{name:"Koffing", level:28},{name:"Weezing",level:28}]},
      {class:"Cue Ball",    name:"Camron",   team:[{name:"Mankey",  level:29},{name:"Machop",  level:29}]},
    ] },

  { part:"Part 10", id:"route22-surf", name:"Route 22 (Surf & Fishing)",
    note:"Return once you have Surf and the fishing rods from Fuchsia City.",
    pokemon:[
      {name:"Psyduck",  method:"Surf",      levels:"20–40", rate:"100%", hgOnly:true},
      {name:"Slowpoke", method:"Surf",      levels:"20–40", rate:"100%", ssOnly:true},
      {name:"Magikarp", method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Poliwag",  method:"Good Rod",  levels:"5–15",  rate:"60%"},
      {name:"Goldeen",  method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Poliwag",  method:"Super Rod", levels:"15–25", rate:"40%"},
      {name:"Poliwhirl",method:"Super Rod", levels:"20–30", rate:"40%"},
      {name:"Gyarados", method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",  method:"Super Rod", levels:"15–35", rate:"5%",  hgOnly:true},
      {name:"Slowpoke", method:"Super Rod", levels:"15–35", rate:"5%",  ssOnly:true},
    ],
    items:[],
    trainers:[]},

  { part:"Part 10", id:"route11-surf", name:"Route 11 (Surf & Fishing)",
    note:"Return once you have Surf and the fishing rods from Fuchsia City. Old Rod Magikarp is available on the first visit.",
    pokemon:[
      {name:"Tentacool",method:"Surf",      levels:"5–40",  rate:"100%"},
      {name:"Horsea",   method:"Good Rod",  levels:"5–15",  rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod",  levels:"5–15",  rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",   method:"Super Rod", levels:"15–35", rate:"84%", hgOnly:true},
      {name:"Krabby",   method:"Super Rod", levels:"15–35", rate:"84%", ssOnly:true},
      {name:"Gyarados", method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",  method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke", method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[],
    trainers:[]},

  { part:"Part 10", id:"route10-north-surf", name:"Route 10 North (Surf & Fishing)",
    note:"Return once you have Surf and the fishing rods from Fuchsia City. Old Rod Magikarp is available on the first visit.",
    pokemon:[
      {name:"Tentacool",method:"Surf",      levels:"5–40",  rate:"100%"},
      {name:"Horsea",   method:"Good Rod",  levels:"5–15",  rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod",  levels:"5–15",  rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",   method:"Super Rod", levels:"15–35", rate:"84%", hgOnly:true},
      {name:"Krabby",   method:"Super Rod", levels:"15–35", rate:"84%", ssOnly:true},
      {name:"Gyarados", method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",  method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke", method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[],
    trainers:[]},

  { part:"Part 10", id:"route10-south-surf", name:"Route 10 South (Surf & Fishing)",
    note:"Return once you have Surf and the fishing rods from Fuchsia City. Old Rod Magikarp is available on the first visit.",
    pokemon:[
      {name:"Tentacool",method:"Surf",      levels:"5–40",  rate:"100%"},
      {name:"Horsea",   method:"Good Rod",  levels:"5–15",  rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod",  levels:"5–15",  rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",   method:"Super Rod", levels:"15–35", rate:"84%", hgOnly:true},
      {name:"Krabby",   method:"Super Rod", levels:"15–35", rate:"84%", ssOnly:true},
      {name:"Gyarados", method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",  method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke", method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[],
    trainers:[]},

  { part:"Part 11", id:"saffron-city", name:"Saffron City",
    note:"Tea from Celadon Mansion required for gate guards. TM29 Psychic is a free gift from Mr. Psychic in the SE house.",
    pokemon:[],
    items:[
      {name:"Nugget",      hidden:true, note:"Copycat's house (NW) — on the desk in her room (★ Itemfinder)",img:"screenshots/hidden/saffron-city-0.png"},
      {name:"TM29 Psychic",hidden:false,note:"From Mr. Psychic in the SE house"},
    ],
    trainers:[] },

  { part:"Part 11", id:"silph-co", name:"Silph Co.",
    note:"⚠ Find Card Key on 5F to open all locked doors. Lapras gift on 7F — do not skip it! Master Ball from the president after defeating Giovanni on 11F.",
    floors:[
      { label:"2F",
        pokemon:[],
        items:[
          {name:"Ultra Ball",hidden:true,note:"SW room, southern potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-2f-0.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 1", team:[{name:"Golbat",level:25},{name:"Zubat",level:25},{name:"Zubat",level:25},{name:"Raticate",level:25},{name:"Zubat",level:25}]},
          {class:"Scientist",        name:"Jerry",   team:[{name:"Magnemite",level:28},{name:"Voltorb",level:28},{name:"Magneton",level:28}]},
          {class:"Team Rocket Grunt",name:"Grunt 2", team:[{name:"Cubone",level:29},{name:"Zubat",level:29}]},
          {class:"Scientist",        name:"Connor",  team:[{name:"Grimer",level:26},{name:"Weezing",level:26},{name:"Koffing",level:26},{name:"Weezing",level:26}]},
        ]},
      { label:"3F",
        pokemon:[],
        items:[
          {name:"Hyper Potion",hidden:false,note:"NE of the Scientist"},
          {name:"Protein",     hidden:true, note:"SE corner, middle of three potted plants (★ Itemfinder)",img:"screenshots/hidden/silph-co-3f-1.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 3",team:[{name:"Raticate",level:28},{name:"Hypno",level:28},{name:"Raticate",level:28}]},
          {class:"Scientist",        name:"Jose",   team:[{name:"Electrode",level:29},{name:"Weezing",level:29}]},
        ]},
      { label:"4F",
        pokemon:[],
        items:[
          {name:"Full Heal",    hidden:false,note:"NW room"},
          {name:"Max Revive",   hidden:false,note:"NW room"},
          {name:"Escape Rope",  hidden:false,note:"NW room"},
          {name:"TM41 Torment", hidden:false,note:"SE room"},
          {name:"Iron",         hidden:true, note:"SE room, southern of three potted plants (★ Itemfinder)",img:"screenshots/hidden/silph-co-4f-4.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 4", team:[{name:"Ekans",level:28},{name:"Zubat",level:28},{name:"Cubone",level:28}]},
          {class:"Team Rocket Grunt",name:"Grunt 5", team:[{name:"Machop",level:29},{name:"Drowzee",level:29}]},
          {class:"Scientist",        name:"Rodney",  team:[{name:"Electrode",level:33}]},
        ]},
      { label:"5F",
        pokemon:[],
        items:[
          {name:"Card Key",         hidden:false,note:"South hallway — unlocks all card-locked doors"},
          {name:"Protein",          hidden:false,note:"NW room (requires Card Key)"},
          {name:"TM01 Focus Punch", hidden:false,note:"SW room"},
          {name:"PP Up",            hidden:true, note:"Larger central room, potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-5f-3.png"},
          {name:"Elixir",           hidden:true, note:"Smaller central room, potted plant (★ Itemfinder, requires Card Key)",img:"screenshots/hidden/silph-co-5f-4.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 6", team:[{name:"Hypno",level:33}]},
          {class:"Juggler",          name:"Dalton",  team:[{name:"Kadabra",level:29},{name:"Mr. Mime",level:29}]},
          {class:"Scientist",        name:"Beau",    team:[{name:"Magneton",level:26},{name:"Magnemite",level:26},{name:"Koffing",level:26},{name:"Weezing",level:26}]},
          {class:"Team Rocket Grunt",name:"Grunt 7", team:[{name:"Arbok",level:33}]},
        ]},
      { label:"6F",
        pokemon:[],
        items:[
          {name:"HP Up",     hidden:false,note:"SW room (requires Card Key)"},
          {name:"X Sp. Atk", hidden:false,note:"SW room (requires Card Key)"},
          {name:"Carbos",    hidden:true, note:"NW room, western potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-6f-2.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 8",  team:[{name:"Machop",level:29},{name:"Machoke",level:29}]},
          {class:"Team Rocket Grunt",name:"Grunt 9",  team:[{name:"Zubat",level:28},{name:"Zubat",level:28},{name:"Golbat",level:28}]},
          {class:"Scientist",        name:"Taylor",   team:[{name:"Voltorb",level:25},{name:"Koffing",level:25},{name:"Magneton",level:25},{name:"Magnemite",level:25},{name:"Koffing",level:25}]},
        ]},
      { label:"7F",
        pokemon:[
          {name:"Lapras",method:"Gift",levels:"25",note:"⚠ From an employee in the NW area — do not skip this floor!",warn:true},
        ],
        items:[
          {name:"TM08 Bulk Up",hidden:false,note:"East-central room (requires Card Key)"},
          {name:"Calcium",     hidden:false,note:"SW room"},
          {name:"Zinc",        hidden:true, note:"East-central room, southern potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-7f-2.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 10", team:[{name:"Cubone",level:29},{name:"Cubone",level:29}]},
          {class:"Team Rocket Grunt",name:"Grunt 11", team:[{name:"Raticate",level:26},{name:"Zubat",level:26},{name:"Golbat",level:26},{name:"Rattata",level:26}]},
          {class:"Scientist",        name:"Joshua",   team:[{name:"Electrode",level:29},{name:"Muk",level:29}]},
          {class:"Team Rocket Grunt",name:"Grunt 12", team:[{name:"Sandshrew",level:29},{name:"Sandslash",level:29}]},
          {class:"Rival",            name:"Blue",     note:"NW room. Team varies by starter — shown here for Bulbasaur start.",
            team:[{name:"Pidgeot",level:37},{name:"Exeggcute",level:38},{name:"Gyarados",level:35},{name:"Alakazam",level:35},{name:"Charizard",level:40}]},
        ]},
      { label:"8F",
        pokemon:[],
        items:[
          {name:"Iron",   hidden:false,note:"East-central room, east of the two beds"},
          {name:"Nugget", hidden:true, note:"East-central room, northern potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-8f-1.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 13", team:[{name:"Raticate",level:26},{name:"Golbat",level:26},{name:"Arbok",level:26},{name:"Koffing",level:26}]},
          {class:"Team Rocket Grunt",name:"Grunt 14", team:[{name:"Weezing",level:28},{name:"Golbat",level:28},{name:"Koffing",level:28}]},
          {class:"Scientist",        name:"Parker",   team:[{name:"Grimer",level:29},{name:"Electrode",level:29}]},
        ]},
      { label:"9F",
        pokemon:[],
        items:[
          {name:"Max Potion",hidden:true,note:"S-SW room, corner near the boxes (★ Itemfinder)"},
          {name:"Calcium",   hidden:true,note:"Western room, eastern potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-9f-1.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 15", team:[{name:"Golbat",level:28},{name:"Drowzee",level:28},{name:"Hypno",level:28}]},
          {class:"Team Rocket Grunt",name:"Grunt 16", team:[{name:"Drowzee",level:28},{name:"Grimer",level:28},{name:"Machop",level:28}]},
          {class:"Scientist",        name:"Ed",       team:[{name:"Voltorb",level:28},{name:"Magneton",level:28},{name:"Koffing",level:28}]},
        ]},
      { label:"10F",
        pokemon:[],
        items:[
          {name:"Carbos",    hidden:false,note:"SW room"},
          {name:"Rare Candy",hidden:false,note:"SW room"},
          {name:"Ultra Ball",hidden:false,note:"SW room"},
          {name:"HP Up",     hidden:true, note:"NE room, potted plant (★ Itemfinder)",img:"screenshots/hidden/silph-co-10f-3.png"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 17", team:[{name:"Machoke",level:33}]},
          {class:"Scientist",        name:"Travis",   team:[{name:"Magnemite",level:29},{name:"Koffing",level:29}]},
        ]},
      { label:"11F",
        pokemon:[],
        items:[
          {name:"Zinc",       hidden:false,note:"East side, SE corner"},
          {name:"Revive",     hidden:true, note:"West side, middle of three potted plants outside president's office (★ Itemfinder)",img:"screenshots/hidden/silph-co-11f-1.png"},
          {name:"Master Ball",hidden:false,note:"⚠ From the president after defeating Giovanni — only ONE in the game!"},
        ],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 18", team:[{name:"Rattata",level:25},{name:"Zubat",level:25},{name:"Ekans",level:25},{name:"Rattata",level:25},{name:"Rattata",level:25}]},
          {class:"Team Rocket Grunt",name:"Grunt 19", team:[{name:"Cubone",level:32},{name:"Drowzee",level:32},{name:"Marowak",level:32}]},
          {class:"Giovanni",         name:"Giovanni", team:[{name:"Nidorino",level:37},{name:"Rhyhorn",level:37},{name:"Kangaskhan",level:35},{name:"Nidoqueen",level:41}]},
        ]},
    ]},

  { part:"Part 11", id:"fighting-dojo", name:"Fighting Dojo",
    note:"Defeat all Black Belts, then the Karate Master. Choose EITHER Hitmonlee OR Hitmonchan as your reward — trade for the other!",
    pokemon:[
      {name:"Hitmonlee", method:"Gift",levels:"25",note:"⚠ One-time choice — pick Hitmonlee OR Hitmonchan",warn:true,choiceGroup:"dojo",choiceId:"hitmonlee"},
      {name:"Hitmonchan",method:"Gift",levels:"25",note:"⚠ One-time choice — pick Hitmonlee OR Hitmonchan",warn:true,choiceGroup:"dojo",choiceId:"hitmonchan"},
    ],
    items:[],
    trainers:[
      {class:"Black Belt",name:"Hideki",team:[{name:"Machop",level:32},{name:"Machoke",level:32}]},
      {class:"Black Belt",name:"Hitoshi",team:[{name:"Machop",level:31},{name:"Mankey",level:31},{name:"Primeape",level:31}]},
      {class:"Black Belt",name:"Mike",   team:[{name:"Mankey",level:31},{name:"Mankey",level:31},{name:"Primeape",level:31}]},
      {class:"Black Belt",name:"Aaron",  team:[{name:"Primeape",level:36}]},
      {class:"Black Belt",name:"Koichi", note:"Karate Master — defeat him to earn your choice of Hitmonlee or Hitmonchan.",
        team:[{name:"Hitmonlee",level:37},{name:"Hitmonchan",level:37}]},
    ]},

  { part:"Part 11", id:"saffron-gym", name:"Saffron Gym",
    note:"Psychic-type gym. Warp puzzle: SE → NW → SW → SW leads to Sabrina. Defeat her for the Marsh Badge (obedience up to Lv. 70) and TM04 Calm Mind.",
    pokemon:[],
    items:[
      {name:"TM04 Calm Mind",hidden:false,note:"From Sabrina after defeating her"},
    ],
    trainers:[
      {class:"Psychic",  name:"Cameron",team:[{name:"Slowpoke",level:33},{name:"Slowpoke",level:33},{name:"Slowbro",level:33}]},
      {class:"Psychic",  name:"Tyron",  team:[{name:"Mr. Mime",level:34},{name:"Kadabra",level:34}]},
      {class:"Channeler",name:"Stacy",  team:[{name:"Haunter",level:38}]},
      {class:"Psychic",  name:"Preston",team:[{name:"Slowbro",level:38}]},
      {class:"Channeler",name:"Amanda", team:[{name:"Gastly",level:34},{name:"Haunter",level:34}]},
      {class:"Channeler",name:"Tasha",  team:[{name:"Gastly",level:33},{name:"Gastly",level:33},{name:"Haunter",level:33}]},
      {class:"Psychic",  name:"Johan",  team:[{name:"Kadabra",level:31},{name:"Mr. Mime",level:31},{name:"Slowpoke",level:31},{name:"Kadabra",level:31}]},
      {class:"Gym Leader",name:"Sabrina",team:[{name:"Kadabra",level:38},{name:"Mr. Mime",level:37},{name:"Venomoth",level:38},{name:"Alakazam",level:43}]},
    ]},

  { part:"Part 12", id:"route-19", name:"Route 19",
    note:"Surf south from Fuchsia City. Trainer-heavy route — lots of Swimmers and a Sis and Bro pair.",
    pokemon:[
      {name:"Tentacool", method:"Surf",     levels:"5–40", rate:"100%"},
      {name:"Magikarp",  method:"Old Rod",  levels:"5",    rate:"100%"},
      {name:"Horsea",   method:"Good Rod", levels:"5–15", rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod", levels:"5–15", rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod", levels:"5–15", rate:"20%"},
      {name:"Horsea",    method:"Super Rod",levels:"15–25",rate:"80%", hgOnly:true},
      {name:"Krabby",    method:"Super Rod",levels:"15–25",rate:"80%", ssOnly:true},
      {name:"Gyarados",  method:"Super Rod",levels:"15–25",rate:"15%"},
      {name:"Seadra",    method:"Super Rod",levels:"25–35",rate:"4%",  hgOnly:true},
      {name:"Kingler",   method:"Super Rod",levels:"25–35",rate:"4%",  ssOnly:true},
      {name:"Psyduck",   method:"Super Rod",levels:"25–35",rate:"1%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod",levels:"25–35",rate:"1%",  ssOnly:true},
    ],
    items:[],
    trainers:[
      {class:"Swimmer♂",   name:"Richard",  team:[{name:"Tentacool",level:30},{name:"Shellder",level:30}]},
      {class:"Swimmer♂",   name:"Reece",    team:[{name:"Goldeen",level:29},{name:"Horsea",level:29},{name:"Staryu",level:29}]},
      {class:"Swimmer♂",   name:"Tony",     team:[{name:"Horsea",level:30},{name:"Horsea",level:30}]},
      {class:"Swimmer♂",   name:"David",    team:[{name:"Goldeen",level:29},{name:"Shellder",level:29},{name:"Seaking",level:29}]},
      {class:"Swimmer♂",   name:"Douglas",  team:[{name:"Horsea",level:27},{name:"Tentacool",level:27},{name:"Tentacool",level:27},{name:"Goldeen",level:27}]},
      {class:"Swimmer♂",   name:"Matthew",  team:[{name:"Poliwag",level:30},{name:"Poliwhirl",level:30}]},
      {class:"Sis and Bro",name:"Lia & Luc",team:[{name:"Goldeen",level:30},{name:"Seaking",level:30}]},
      {class:"Swimmer♂",   name:"Axle",     team:[{name:"Tentacool",level:27},{name:"Tentacool",level:27},{name:"Staryu",level:27},{name:"Horsea",level:27},{name:"Tentacruel",level:27}]},
      {class:"Swimmer♀",   name:"Alice",    team:[{name:"Goldeen",level:30},{name:"Seaking",level:30}]},
      {class:"Swimmer♀",   name:"Anya",     team:[{name:"Poliwag",level:27},{name:"Goldeen",level:27},{name:"Seaking",level:27},{name:"Goldeen",level:27},{name:"Poliwag",level:27}]},
      {class:"Swimmer♀",   name:"Connie",   team:[{name:"Staryu",level:29},{name:"Staryu",level:29},{name:"Staryu",level:29}]},
    ]},

  { part:"Part 12", id:"route-20-east", name:"Route 20 (East)",
    note:"Eastern half of Route 20, between Route 19 and the Seafoam Islands entrance.",
    pokemon:[
      {name:"Tentacool", method:"Surf",     levels:"5–40", rate:"100%"},
      {name:"Magikarp",  method:"Old Rod",  levels:"5",    rate:"100%"},
      {name:"Horsea",   method:"Good Rod", levels:"5–15", rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod", levels:"5–15", rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod", levels:"5–15", rate:"20%"},
      {name:"Horsea",    method:"Super Rod",levels:"15–25",rate:"80%", hgOnly:true},
      {name:"Krabby",    method:"Super Rod",levels:"15–25",rate:"80%", ssOnly:true},
      {name:"Gyarados",  method:"Super Rod",levels:"15–25",rate:"15%"},
      {name:"Seadra",    method:"Super Rod",levels:"25–35",rate:"4%",  hgOnly:true},
      {name:"Kingler",   method:"Super Rod",levels:"25–35",rate:"4%",  ssOnly:true},
      {name:"Psyduck",   method:"Super Rod",levels:"25–35",rate:"1%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod",levels:"25–35",rate:"1%",  ssOnly:true},
    ],
    items:[],
    trainers:[
      {class:"Swimmer♂",name:"Barry",  team:[{name:"Shellder",level:31},{name:"Cloyster",level:31}]},
      {class:"Swimmer♂",name:"Darrin", team:[{name:"Horsea",level:28},{name:"Horsea",level:28},{name:"Horsea",level:28},{name:"Seadra",level:28}]},
      {class:"Swimmer♀",name:"Shirley",team:[{name:"Seadra",level:30},{name:"Horsea",level:30},{name:"Seadra",level:30}]},
      {class:"Swimmer♀",name:"Tiffany",team:[{name:"Seaking",level:35}]},
    ]},

  { part:"Part 12", id:"seafoam-islands", name:"Seafoam Islands",
    note:"Use Strength to push boulders into the holes to divert the water current and reach B4F where Articuno waits. Five floors — explore all of them for items.",
    floors:[
      { label:"1F",
        pokemon:[
          {name:"Psyduck", method:"Cave",levels:"26–33",rate:"55%",hgOnly:true},
          {name:"Slowpoke",method:"Cave",levels:"26–33",rate:"55%",ssOnly:true},
          {name:"Zubat",   method:"Cave",levels:"22–26",rate:"34%"},
          {name:"Golbat",  method:"Cave",levels:"26–30",rate:"11%"},
        ],
        items:[
          {name:"Ice Heal",hidden:false,note:"Southwest corner of the rocky ridge"},
        ],
        trainers:[]},
      { label:"B1F",
        pokemon:[
          {name:"Psyduck", method:"Cave",levels:"29–31",rate:"40%",hgOnly:true},
          {name:"Slowpoke",method:"Cave",levels:"29–31",rate:"40%",ssOnly:true},
          {name:"Zubat",   method:"Cave",levels:"22–26",rate:"34%"},
          {name:"Golbat",  method:"Cave",levels:"26–30",rate:"11%"},
          {name:"Seel",    method:"Cave",levels:"28",   rate:"10%"},
          {name:"Golduck", method:"Cave",levels:"33–35",rate:"5%", hgOnly:true},
          {name:"Slowbro", method:"Cave",levels:"33–35",rate:"5%", ssOnly:true},
        ],
        items:[
          {name:"Revive",     hidden:false,note:"On the central ridge"},
          {name:"Water Stone",hidden:false,note:"South-central area — accessible via B2F"},
        ],
        trainers:[]},
      { label:"B2F",
        pokemon:[
          {name:"Psyduck", method:"Cave",levels:"30–32",rate:"40%",hgOnly:true},
          {name:"Slowpoke",method:"Cave",levels:"30–32",rate:"40%",ssOnly:true},
          {name:"Seel",    method:"Cave",levels:"30–32",rate:"20%"},
          {name:"Zubat",   method:"Cave",levels:"22–24",rate:"20%"},
          {name:"Golbat",  method:"Cave",levels:"26–30",rate:"10%"},
          {name:"Golduck", method:"Cave",levels:"32–34",rate:"10%",hgOnly:true},
          {name:"Slowbro", method:"Cave",levels:"32–34",rate:"10%",ssOnly:true},
        ],
        items:[
          {name:"Big Pearl",hidden:false,note:"South of the larger ridge"},
        ],
        trainers:[]},
      { label:"B3F",
        pokemon:[
          {name:"Seel",    method:"Cave",    levels:"30–32",rate:"40%"},
          {name:"Psyduck", method:"Cave",    levels:"30–32",rate:"20%",hgOnly:true},
          {name:"Slowpoke",method:"Cave",    levels:"30–32",rate:"20%",ssOnly:true},
          {name:"Golduck", method:"Cave",    levels:"32–34",rate:"15%",hgOnly:true},
          {name:"Slowbro", method:"Cave",    levels:"32–34",rate:"15%",ssOnly:true},
          {name:"Zubat",   method:"Cave",    levels:"24",   rate:"10%"},
          {name:"Golbat",  method:"Cave",    levels:"26–30",rate:"10%"},
          {name:"Dewgong", method:"Cave",    levels:"32–34",rate:"5%"},
          {name:"Seel",    method:"Surf",    levels:"25–35",rate:"60%"},
          {name:"Horsea",  method:"Surf",    levels:"25–30",rate:"30%",hgOnly:true},
          {name:"Krabby",  method:"Surf",    levels:"25–30",rate:"30%",ssOnly:true},
          {name:"Dewgong", method:"Surf",    levels:"35–40",rate:"5%"},
          {name:"Psyduck", method:"Surf",    levels:"30–40",rate:"4%", hgOnly:true},
          {name:"Slowpoke",method:"Surf",    levels:"30–40",rate:"4%", ssOnly:true},
          {name:"Golduck", method:"Surf",    levels:"35–40",rate:"1%", hgOnly:true},
          {name:"Slowbro", method:"Surf",    levels:"35–40",rate:"1%", ssOnly:true},
          {name:"Magikarp",method:"Old Rod", levels:"5",    rate:"100%"},
          {name:"Horsea",  method:"Good Rod",levels:"5–15", rate:"60% FR / 20% LG"},
          {name:"Krabby",  method:"Good Rod",levels:"5–15", rate:"20% FR / 60% LG"},
          {name:"Magikarp",method:"Good Rod",levels:"5–15", rate:"20%"},
          {name:"Horsea",  method:"Super Rod",levels:"15–30",rate:"80%",hgOnly:true},
          {name:"Krabby",  method:"Super Rod",levels:"15–30",rate:"80%",ssOnly:true},
          {name:"Gyarados",method:"Super Rod",levels:"15–35",rate:"16%"},
          {name:"Psyduck", method:"Super Rod",levels:"15–25",rate:"4%", hgOnly:true},
          {name:"Slowpoke",method:"Super Rod",levels:"15–25",rate:"4%", ssOnly:true},
        ],
        items:[
          {name:"Nugget",hidden:true,note:"Southwest corner of the western rocky ridge (★ Itemfinder)",img:"screenshots/hidden/seafoam-islands-b3f-0.png"},
        ],
        trainers:[]},
      { label:"B4F",
        pokemon:[
          {name:"Seel",    method:"Cave",    levels:"30–34",rate:"50%"},
          {name:"Golbat",  method:"Cave",    levels:"26–30",rate:"15%"},
          {name:"Golduck", method:"Cave",    levels:"32–34",rate:"15%",hgOnly:true},
          {name:"Slowbro", method:"Cave",    levels:"32–34",rate:"15%",ssOnly:true},
          {name:"Psyduck", method:"Cave",    levels:"32",   rate:"10%",hgOnly:true},
          {name:"Slowpoke",method:"Cave",    levels:"32",   rate:"10%",ssOnly:true},
          {name:"Dewgong", method:"Cave",    levels:"34–36",rate:"10%"},
          {name:"Articuno",method:"Special", levels:"50",   rate:"×1", note:"⚠ ONE-TIME — use your best Poké Balls!",warn:true},
          {name:"Seel",    method:"Surf",    levels:"25–35",rate:"60%"},
          {name:"Horsea",  method:"Surf",    levels:"25–30",rate:"30%",hgOnly:true},
          {name:"Krabby",  method:"Surf",    levels:"25–30",rate:"30%",ssOnly:true},
          {name:"Dewgong", method:"Surf",    levels:"35–40",rate:"5%"},
          {name:"Psyduck", method:"Surf",    levels:"30–40",rate:"4%", hgOnly:true},
          {name:"Slowpoke",method:"Surf",    levels:"30–40",rate:"4%", ssOnly:true},
          {name:"Golduck", method:"Surf",    levels:"35–40",rate:"1%", hgOnly:true},
          {name:"Slowbro", method:"Surf",    levels:"35–40",rate:"1%", ssOnly:true},
          {name:"Magikarp",method:"Old Rod", levels:"5",    rate:"100%"},
          {name:"Horsea",  method:"Good Rod",levels:"5–15", rate:"60% FR / 20% LG"},
          {name:"Krabby",  method:"Good Rod",levels:"5–15", rate:"20% FR / 60% LG"},
          {name:"Magikarp",method:"Good Rod",levels:"5–15", rate:"20%"},
          {name:"Horsea",  method:"Super Rod",levels:"15–30",rate:"80%",hgOnly:true},
          {name:"Krabby",  method:"Super Rod",levels:"15–30",rate:"80%",ssOnly:true},
          {name:"Gyarados",method:"Super Rod",levels:"15–35",rate:"16%"},
          {name:"Psyduck", method:"Super Rod",levels:"15–25",rate:"4%", hgOnly:true},
          {name:"Slowpoke",method:"Super Rod",levels:"15–25",rate:"4%", ssOnly:true},
        ],
        items:[
          {name:"Water Stone",hidden:true,  note:"On a rock near the western ladder (★ Itemfinder)",img:"screenshots/hidden/seafoam-islands-b4f-0.png"},
          {name:"Ultra Ball", hidden:false, note:"South side, east of the sign near Articuno"},
        ],
        trainers:[]},
    ]},

  { part:"Part 12", id:"route-20-west", name:"Route 20 (West)",
    note:"Western half of Route 20, between the Seafoam Islands exit and Cinnabar Island.",
    pokemon:[
      {name:"Tentacool", method:"Surf",     levels:"5–40", rate:"100%"},
      {name:"Magikarp",  method:"Old Rod",  levels:"5",    rate:"100%"},
      {name:"Horsea",   method:"Good Rod", levels:"5–15", rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod", levels:"5–15", rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod", levels:"5–15", rate:"20%"},
      {name:"Horsea",    method:"Super Rod",levels:"15–25",rate:"80%", hgOnly:true},
      {name:"Krabby",    method:"Super Rod",levels:"15–25",rate:"80%", ssOnly:true},
      {name:"Gyarados",  method:"Super Rod",levels:"15–25",rate:"15%"},
      {name:"Seadra",    method:"Super Rod",levels:"25–35",rate:"4%",  hgOnly:true},
      {name:"Kingler",   method:"Super Rod",levels:"25–35",rate:"4%",  ssOnly:true},
      {name:"Psyduck",   method:"Super Rod",levels:"25–35",rate:"1%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod",levels:"25–35",rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Stardust", hidden:true, recurring:true, note:"Large unoccupied island near Cinnabar Island"},
    ],
    trainers:[
      {class:"Picnicker",  name:"Irene",  team:[{name:"Tentacool",level:30},{name:"Horsea",level:30},{name:"Seel",level:30}]},
      {class:"Bird Keeper",name:"Roger",  team:[{name:"Fearow",level:30},{name:"Fearow",level:30},{name:"Pidgeotto",level:30}]},
      {class:"Swimmer♀",   name:"Nora",   team:[{name:"Shellder",level:30},{name:"Shellder",level:30},{name:"Cloyster",level:30}]},
      {class:"Swimmer♂",   name:"Dean",   team:[{name:"Staryu",level:35}]},
      {class:"Picnicker",  name:"Missy",  team:[{name:"Goldeen",level:31},{name:"Seaking",level:31}]},
      {class:"Swimmer♀",   name:"Melissa",team:[{name:"Poliwag",level:31},{name:"Seaking",level:31}]},
    ]},

  { part:"Part 13", id:"cinnabar-island", name:"Cinnabar Island",
    note:"Cinnabar Lab restores fossils and hosts three one-time NPC trades.",
    pokemon:[
      {name:"Omanyte",   method:"Fossil",   note:"Restore Helix Fossil at Cinnabar Lab",  warn:true,choiceGroup:"fossil",choiceId:"helix"},
      {name:"Kabuto",    method:"Fossil",   note:"Restore Dome Fossil at Cinnabar Lab",   warn:true,choiceGroup:"fossil",choiceId:"dome"},
      {name:"Aerodactyl",method:"Fossil",   note:"Restore Old Amber at Cinnabar Lab",                     warn:true},
      {name:"Electrode", method:"Trade",    note:"Trade Raichu with Old man in Cinnabar Lab",              warn:true},
      {name:"Tangela",   method:"Trade",    note:"Trade Venonat with woman in Cinnabar Lab (holds Stardust)", warn:true},
      {name:"Seel",      method:"Trade",    note:"Trade Ponyta with Scientist in Cinnabar Lab",            warn:true},
      {name:"Tentacool", method:"Surf",      levels:"5–40",  rate:"90%"},
      {name:"Tentacruel",method:"Surf",      levels:"30–40", rate:"10%"},
      {name:"Magikarp",  method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",   method:"Good Rod",  levels:"5–15",  rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod",  levels:"5–15",  rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Shellder",  method:"Super Rod", levels:"15–40", rate:"40%", hgOnly:true},
      {name:"Horsea",    method:"Super Rod", levels:"15–40", rate:"40%", hgOnly:true},
      {name:"Krabby",    method:"Super Rod", levels:"15–40", rate:"40%", ssOnly:true},
      {name:"Staryu",    method:"Super Rod", levels:"15–40", rate:"40%", ssOnly:true},
      {name:"Gyarados",  method:"Super Rod", levels:"15–40", rate:"15%"},
      {name:"Seadra",    method:"Super Rod", levels:"15–40", rate:"4%",  hgOnly:true},
      {name:"Slowbro",   method:"Super Rod", levels:"15–40", rate:"4%",  ssOnly:true},
      {name:"Psyduck",   method:"Super Rod", levels:"15–40", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod", levels:"15–40", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Stardust", hidden:false,heldBy:"Tangela",note:"Held by the traded Tangela from Cinnabar Lab"},
    ],
    trainers:[]},

  { part:"Part 13", id:"pokemon-mansion", name:"Pokémon Mansion",
    note:"Wild Pokémon are identical on 1F, 2F, and 3F. The Secret Key in B1F unlocks Cinnabar Gym.",
    floors:[
      { label:"1F–3F",
        pokemon:[
          {name:"Raticate", method:"Cave", levels:"32–36", rate:"30%"},
          {name:"Koffing",  method:"Cave", levels:"28–30", rate:"30%", hgOnly:true},
          {name:"Grimer",   method:"Cave", levels:"28–30", rate:"30%", ssOnly:true},
          {name:"Rattata",  method:"Cave", levels:"26–28", rate:"15%"},
          {name:"Growlithe",method:"Cave", levels:"30–32", rate:"15%", hgOnly:true},
          {name:"Vulpix",   method:"Cave", levels:"30–32", rate:"15%", ssOnly:true},
          {name:"Grimer",   method:"Cave", levels:"28",    rate:"5%",  hgOnly:true},
          {name:"Weezing",  method:"Cave", levels:"32",    rate:"5%",  hgOnly:true},
          {name:"Koffing",  method:"Cave", levels:"28",    rate:"5%",  ssOnly:true},
          {name:"Muk",      method:"Cave", levels:"32",    rate:"5%",  ssOnly:true},
        ],
        items:[
          {name:"Moon Stone",  hidden:true,  note:"1F – Northwest pillar",img:"screenshots/hidden/pokemon-mansion-1f-3f-0.png"},
          {name:"Escape Rope", hidden:false, note:"1F – Near the pillars"},
          {name:"Protein",     hidden:false, note:"1F – Northeast room"},
          {name:"Carbos",      hidden:false, note:"1F – Among potted plants"},
          {name:"Zinc",        hidden:false, note:"2F – Western balcony"},
          {name:"Calcium",     hidden:false, note:"2F – Northeast room"},
          {name:"HP Up",       hidden:false, note:"2F – East room"},
          {name:"Iron",        hidden:false, note:"3F – Northeast room"},
          {name:"Rare Candy",  hidden:true,  note:"3F – East-central hallway",img:"screenshots/hidden/pokemon-mansion-1f-3f-8.png"},
          {name:"Max Potion",  hidden:false, note:"3F – Southwest room"},
        ],
        trainers:[
          {class:"Youngster",name:"Johnson",team:[{name:"Ekans",level:33},{name:"Ekans",level:33},{name:"Raticate",level:34}]},
          {class:"Scientist",name:"Ted",    team:[{name:"Electrode",level:29},{name:"Weezing",level:29}]},
          {class:"Burglar",  name:"Arnie",  team:[{name:"Charmander",level:34},{name:"Charmeleon",level:34}]},
          {class:"Burglar",  name:"Simon",  team:[{name:"Ninetales",level:38}]},
          {class:"Scientist",name:"Braydon",team:[{name:"Magnemite",level:33},{name:"Magneton",level:33},{name:"Voltorb",level:33}]},
        ]},
      { label:"B1F",
        pokemon:[
          {name:"Raticate", method:"Cave", levels:"34–38", rate:"30%"},
          {name:"Koffing",  method:"Cave", levels:"28–30", rate:"30%", hgOnly:true},
          {name:"Grimer",   method:"Cave", levels:"28–30", rate:"30%", ssOnly:true},
          {name:"Growlithe",method:"Cave", levels:"30–32", rate:"15%", hgOnly:true},
          {name:"Vulpix",   method:"Cave", levels:"30–32", rate:"15%", ssOnly:true},
          {name:"Ditto",    method:"Cave", levels:"30",    rate:"10%"},
          {name:"Rattata",  method:"Cave", levels:"26",    rate:"5%"},
          {name:"Grimer",   method:"Cave", levels:"28",    rate:"5%",  hgOnly:true},
          {name:"Weezing",  method:"Cave", levels:"34",    rate:"5%",  hgOnly:true},
          {name:"Koffing",  method:"Cave", levels:"28",    rate:"5%",  ssOnly:true},
          {name:"Muk",      method:"Cave", levels:"34",    rate:"5%",  ssOnly:true},
        ],
        items:[
          {name:"Full Restore",   hidden:false, note:"Southwest corner"},
          {name:"Elixir",         hidden:true,  note:"Northeast room",img:"screenshots/hidden/pokemon-mansion-b1f-1.png"},
          {name:"TM14 Blizzard",  hidden:false, note:"North-central room"},
          {name:"Secret Key",     hidden:false, note:"Northwest room — opens Cinnabar Gym"},
          {name:"TM22 SolarBeam", hidden:false, note:"West-central room"},
        ],
        trainers:[
          {class:"Burglar",  name:"Lewis",team:[{name:"Growlithe",level:34},{name:"Ponyta",level:34}]},
          {class:"Scientist",name:"Ivan", team:[{name:"Magnemite",level:34},{name:"Electrode",level:34}]},
        ]},
    ]},

  { part:"Part 13", id:"cinnabar-gym", name:"Cinnabar Gym",
    note:"Requires the Secret Key from Pokémon Mansion B1F. Blaine awards the Volcano Badge.",
    pokemon:[],
    items:[
      {name:"TM38 Fire Blast", hidden:false, note:"Reward from Blaine"},
    ],
    trainers:[
      {class:"Burglar",   name:"Quinn",  team:[{name:"Growlithe",level:36},{name:"Vulpix",level:36},{name:"Ninetales",level:36}]},
      {class:"Super Nerd",name:"Erik",   team:[{name:"Vulpix",level:36},{name:"Vulpix",level:36},{name:"Ninetales",level:36}]},
      {class:"Super Nerd",name:"Avery",  team:[{name:"Ponyta",level:34},{name:"Charmander",level:34},{name:"Vulpix",level:34},{name:"Growlithe",level:34}]},
      {class:"Burglar",   name:"Ramon",  team:[{name:"Ponyta",level:41}]},
      {class:"Super Nerd",name:"Derek",  team:[{name:"Rapidash",level:41}]},
      {class:"Burglar",   name:"Dusty",  team:[{name:"Vulpix",level:37},{name:"Growlithe",level:37}]},
      {class:"Super Nerd",name:"Zac",    team:[{name:"Growlithe",level:37},{name:"Vulpix",level:37}]},
      {class:"Gym Leader",name:"Blaine", note:"Volcano Badge · TM38 Fire Blast",
        team:[{name:"Growlithe",level:42},{name:"Ponyta",level:40},{name:"Rapidash",level:42},{name:"Arcanine",level:47}]},
    ]},

  { part:"Part 14", id:"one-island", name:"One Island",
    note:"The Network Center here connects the Sevii Islands. Bill gives a Meteorite; Celio gives the Tri-Pass once the machine is repaired.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Shellder",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Staryu",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[],
    trainers:[]},

  { part:"Part 14", id:"treasure-beach", name:"Treasure Beach",
    note:"A beachside area north of One Island's harbor. All hidden items are recurring pickups.",
    pokemon:[
      {name:"Spearow",  method:"Grass", levels:"31–32",    rate:"30%"},
      {name:"Tangela",  method:"Grass", levels:"33–35",    rate:"30%"},
      {name:"Fearow",   method:"Grass", levels:"36–40",    rate:"20%"},
      {name:"Meowth",   method:"Grass", levels:"31",       rate:"10%"},
      {name:"Persian",  method:"Grass", levels:"37–40",    rate:"5%"},
      {name:"Psyduck",  method:"Grass", levels:"31",       rate:"5%",  hgOnly:true},
      {name:"Slowpoke", method:"Grass", levels:"31",       rate:"5%",  ssOnly:true},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Shellder",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Staryu",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Ultra Ball", hidden:true,recurring:true,  note:"East of northernmost grass"},
      {name:"Ultra Ball", hidden:true,recurring:true,  note:"Southeast corner"},
      {name:"Pearl",      hidden:true,recurring:true,  note:"West side, southernmost sandy patch"},
      {name:"Pearl",      hidden:true,recurring:true,  note:"Two steps east/north of first Pearl"},
      {name:"Big Pearl",  hidden:true,recurring:true,  note:"Middle northwest sandy patch"},
      {name:"Stardust",   hidden:true,recurring:true,  note:"Middle shore"},
      {name:"Stardust",   hidden:true,recurring:true,  note:"Southwest corner northwest patch"},
      {name:"Star Piece", hidden:true,recurring:true,  note:"Four steps north, one west of southeast corner"},
    ],
    trainers:[
      {class:"Swimmer♀", name:"Amara", team:[{name:"Seel",level:36},{name:"Seel",level:36},{name:"Dewgong",level:36}]},
    ]},

  { part:"Part 14", id:"kindle-road", name:"Kindle Road",
    note:"Northern road on One Island leading to Mt. Ember. HM06 Rock Smash is obtained from an old man at Ember Spa, the hot springs at the road's north end.",
    pokemon:[
      {name:"Ponyta",   method:"Grass",      levels:"31–34",    rate:"30%"},
      {name:"Spearow",  method:"Grass",      levels:"30–32",    rate:"25%"},
      {name:"Fearow",   method:"Grass",      levels:"36",       rate:"10%"},
      {name:"Meowth",   method:"Grass",      levels:"31",       rate:"10%"},
      {name:"Geodude",  method:"Grass",      levels:"31",       rate:"10%"},
      {name:"Persian",  method:"Grass",      levels:"37–40",    rate:"5%"},
      {name:"Rapidash", method:"Grass",      levels:"37–40",    rate:"5%"},
      {name:"Psyduck",  method:"Grass",      levels:"34",       rate:"5%",  hgOnly:true},
      {name:"Slowpoke", method:"Grass",      levels:"34",       rate:"5%",  ssOnly:true},
      {name:"Geodude",  method:"Rock Smash", levels:"5–30",     rate:"95%"},
      {name:"Graveler", method:"Rock Smash", levels:"25–40",    rate:"5%"},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Shellder",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Staryu",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"HM06 Rock Smash", hidden:false, note:"From old man at Ember Spa"},
      {name:"Max Repel",       hidden:false, surf:true,note:"East rocky ridge (requires Surf)"},
      {name:"Ether",           hidden:false, note:"Rocky area south of Ember Spa (requires Rock Smash)"},
      {name:"Carbos",          hidden:false, note:"Southern point rocky ridge (requires Rock Smash)"},
    ],
    trainers:[
      {class:"Swimmer♀",  name:"Abigail",   team:[{name:"Psyduck",level:35},{name:"Psyduck",level:36},{name:"Golduck",level:37}]},
      {class:"Picnicker",  name:"Claire",    team:[{name:"Meowth",level:35},{name:"Meowth",level:35},{name:"Pikachu",level:35},{name:"Clefairy",level:35}]},
      {class:"Crush Girl", name:"Tanya",     team:[{name:"Hitmonlee",level:38},{name:"Hitmonchan",level:38}]},
      {class:"Camper",     name:"Bryce",     team:[{name:"Nidorino",level:36},{name:"Raticate",level:36},{name:"Sandslash",level:36}]},
      {class:"Swimmer♂",  name:"Garrett",   team:[{name:"Shellder",level:35},{name:"Cloyster",level:35},{name:"Wartortle",level:38}]},
      {class:"Crush Kin",  name:"Mik & Kia",team:[{name:"Machoke",level:39},{name:"Primeape",level:39}]},
      {class:"Black Belt", name:"Hugh",      team:[{name:"Machop",level:37},{name:"Machoke",level:37}]},
      {class:"Black Belt", name:"Shea",      team:[{name:"Machop",level:38},{name:"Machoke",level:38}]},
      {class:"Crush Girl", name:"Sharon",    team:[{name:"Mankey",level:37},{name:"Primeape",level:37}]},
      {class:"Swimmer♂",  name:"Finn",      team:[{name:"Starmie",level:38}]},
      {class:"Swimmer♀",  name:"Maria",     team:[{name:"Seadra",level:37},{name:"Seadra",level:37}]},
      {class:"Fisherman",  name:"Tommy",     team:[{name:"Goldeen",level:33},{name:"Goldeen",level:33},{name:"Seaking",level:35},{name:"Seaking",level:35},{name:"Seaking",level:35}]},
    ]},

  { part:"Part 14", id:"mt-ember", name:"Mt. Ember",
    note:"Moltres rests at the summit — one-time encounter. Ruby Path (below the exterior) is revisited post-game and tracked separately in Part 18.",
    floors:[
      { label:"Exterior",
        pokemon:[
          {name:"Ponyta",   method:"Grass",      levels:"30–36", rate:"35%"},
          {name:"Fearow",   method:"Grass",      levels:"38–40", rate:"25%"},
          {name:"Spearow",  method:"Grass",      levels:"30–32", rate:"15%", hgOnly:true},
          {name:"Machop",   method:"Grass",      levels:"35",    rate:"10%"},
          {name:"Geodude",  method:"Grass",      levels:"33",    rate:"10%"},
          {name:"Rapidash", method:"Grass",      levels:"39–42", rate:"5%"},
          {name:"Spearow",  method:"Grass",      levels:"32",    rate:"10%", ssOnly:true},
          {name:"Magmar",   method:"Grass",      levels:"38–40", rate:"5%",  ssOnly:true},
          {name:"Geodude",  method:"Rock Smash", levels:"5–30",  rate:"95%"},
          {name:"Graveler", method:"Rock Smash", levels:"25–40", rate:"5%"},
        ],
        items:[
          {name:"Dire Hit",   hidden:false, note:"Lower east side, northeast of eastern grass"},
          {name:"Ultra Ball", hidden:true,  note:"Southwest dead-end near Pokémon Ranger Logan",img:"screenshots/hidden/mt-ember-1.png"},
          {name:"Ultra Ball", hidden:true,  note:"Upper west, near summit entrance"},
          {name:"Fire Stone", hidden:true,  note:"Southeast of second Ultra Ball",img:"screenshots/hidden/mt-ember-3.png"},
          {name:"Fire Stone", hidden:true,  note:"Southwest lone rock (requires Rock Smash and Strength)"},
        ],
        trainers:[
          {class:"Pokémon Ranger", name:"Beth",   team:[{name:"Bellsprout",level:38},{name:"Gloom",level:38},{name:"Gloom",level:38}]},
          {class:"Crush Girl",     name:"Jocelyn",team:[{name:"Hitmonchan",level:38},{name:"Hitmonchan",level:38}]},
          {class:"Pokémon Ranger", name:"Logan",  team:[{name:"Exeggcute",level:37},{name:"Exeggutor",level:40}]},
        ],
      },
      { label:"Summit Path",
        pokemon:[
          {name:"Machop",   method:"Cave",       levels:"31–39", rate:"40–50%"},
          {name:"Geodude",  method:"Cave",       levels:"29–37", rate:"40–50%"},
          {name:"Machoke",  method:"Cave",       levels:"38–40", rate:"20%", note:"Room 2 only"},
          {name:"Geodude",  method:"Rock Smash", levels:"5–30",  rate:"95%", note:"Room 2 only"},
          {name:"Graveler", method:"Rock Smash", levels:"25–40", rate:"5%",  note:"Room 2 only"},
          {name:"Moltres",  method:"Cave",       warn:true, note:"One-time encounter at the summit"},
        ],
        items:[],
        trainers:[],
      },
    ]},

  { part:"Part 14", id:"two-island", name:"Two Island",
    note:"The Game Corner owner asks you to rescue his daughter Lostelle from Berry Forest. Moon Stone received from her father after the rescue.",
    pokemon:[
      {name:"Oddish",    method:"Grass", levels:"30–32",    rate:"30%", hgOnly:true},
      {name:"Bellsprout",method:"Grass", levels:"30–32",    rate:"30%", ssOnly:true},
      {name:"Spearow",   method:"Grass", levels:"31",       rate:"20%"},
      {name:"Gloom",     method:"Grass", levels:"36–38",    rate:"15%", hgOnly:true},
      {name:"Weepinbell",method:"Grass", levels:"36–38",    rate:"15%", ssOnly:true},
      {name:"Fearow",    method:"Grass", levels:"36",       rate:"10%"},
      {name:"Meowth",    method:"Grass", levels:"31",       rate:"10%"},
      {name:"Persian",   method:"Grass", levels:"37–40",    rate:"5%"},
      {name:"Psyduck",   method:"Grass", levels:"31",       rate:"5%",  hgOnly:true},
      {name:"Golduck",   method:"Grass", levels:"37–40",    rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Grass", levels:"31",       rate:"5%",  ssOnly:true},
      {name:"Slowbro",   method:"Grass", levels:"37–40",    rate:"5%",  ssOnly:true},
      {name:"Psyduck",   method:"Surf",      levels:"5–40",  rate:"95%", hgOnly:true},
      {name:"Golduck",   method:"Surf",      levels:"35–40", rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Surf",      levels:"5–40",  rate:"95%", ssOnly:true},
      {name:"Slowbro",   method:"Surf",      levels:"35–40", rate:"5%",  ssOnly:true},
      {name:"Magikarp",  method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Poliwag",   method:"Good Rod",  levels:"5–15",  rate:"60%"},
      {name:"Goldeen",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Magikarp",  method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Poliwag",   method:"Super Rod", levels:"15–25", rate:"40%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"20–30", rate:"40%"},
      {name:"Gyarados",  method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",   method:"Super Rod", levels:"15–35", rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod", levels:"15–35", rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Revive",     hidden:false, note:"South of Game Corner (requires Cut)"},
      {name:"Moon Stone", hidden:false, note:"From Lostelle's father after rescuing Lostelle from Berry Forest"},
    ],
    trainers:[]},

  { part:"Part 14", id:"cape-brink", name:"Cape Brink",
    note:"Accessible from Two Island. The Move Maniac re-teaches forgotten moves for 2 Tiny Mushroom or 1 Big Mushroom.",
    pokemon:[],
    items:[
      {name:"PP Max",     hidden:true, surf:true,note:"East lake sandy spot (requires Surf and Itemfinder)",img:"screenshots/hidden/cape-brink-0.png"},
      {name:"Rare Candy", hidden:true, note:"Behind Move Tutor house",img:"screenshots/hidden/cape-brink-1.png"},
    ],
    trainers:[]},

  { part:"Part 14", id:"three-isle-port", name:"Three Isle Port",
    note:"A secluded beach on Three Island's east side. The only location where Dunsparce can be caught.",
    pokemon:[
      {name:"Dunsparce", method:"Grass", levels:"5–35", rate:"100%"},
    ],
    items:[],
    trainers:[]},

  { part:"Part 14", id:"three-isle-path", name:"Three Isle Path",
    note:"A cave through Three Island, initially controlled by Team Rocket. No wild Pokémon inside.",
    pokemon:[],
    items:[
      {name:"Nugget", hidden:true,  note:"On a rock southeast of the stairs",img:"screenshots/hidden/three-isle-path-0.png"},
      {name:"Nugget", hidden:false, note:"From the man after clearing Team Rocket"},
    ],
    trainers:[]},

  { part:"Part 14", id:"bond-bridge", name:"Bond Bridge",
    note:"The bridge connecting Two Island and Three Island. All hidden items are recurring pickups.",
    pokemon:[
      {name:"Pidgey",    method:"Grass", levels:"29–32",    rate:"30%"},
      {name:"Pidgeotto", method:"Grass", levels:"34–40",    rate:"15%"},
      {name:"Oddish",    method:"Grass", levels:"31",       rate:"20%", hgOnly:true},
      {name:"Bellsprout",method:"Grass", levels:"31",       rate:"20%", ssOnly:true},
      {name:"Meowth",    method:"Grass", levels:"31",       rate:"10%"},
      {name:"Gloom",     method:"Grass", levels:"36",       rate:"10%", hgOnly:true},
      {name:"Weepinbell",method:"Grass", levels:"36",       rate:"10%", ssOnly:true},
      {name:"Venonat",   method:"Grass", levels:"34",       rate:"5%"},
      {name:"Persian",   method:"Grass", levels:"37–40",    rate:"5%"},
      {name:"Psyduck",   method:"Grass", levels:"31",       rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Grass", levels:"31",       rate:"5%",  ssOnly:true},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Shellder",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Staryu",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Max Repel", hidden:true, note:"Northwest of Aroma Lady Violet",img:"screenshots/hidden/bond-bridge-0.png"},
      {name:"Pearl",     hidden:true,recurring:true, note:"Southwest corner near Tuber Alexis"},
      {name:"Stardust",  hidden:true,recurring:true, note:"One square west, two north of bridge's northwest corner"},
    ],
    trainers:[
      {class:"Twins",      name:"Joy & Meg", team:[{name:"Clefairy",level:37},{name:"Clefairy",level:37}]},
      {class:"Aroma Lady", name:"Violet",    team:[{name:"Bulbasaur",level:36},{name:"Ivysaur",level:36},{name:"Ivysaur",level:36}]},
      {class:"Tuber♀",     name:"Alexis",    team:[{name:"Staryu",level:34},{name:"Staryu",level:34},{name:"Krabby",level:34},{name:"Krabby",level:34}]},
      {class:"Swimmer♀",   name:"Tisha",     note:"Requires Surf to reach", team:[{name:"Kingler",level:38}]},
      {class:"Tuber♀",     name:"Amira",     team:[{name:"Poliwag",level:34},{name:"Poliwhirl",level:35},{name:"Poliwag",level:34}]},
      {class:"Aroma Lady", name:"Nikki",     team:[{name:"Bellsprout",level:37},{name:"Weepinbell",level:37}]},
    ]},

  { part:"Part 14", id:"berry-forest", name:"Berry Forest",
    note:"A dense forest on Three Island where Lostelle is found. All berries are recurring hidden pickups. Max Elixir requires Cut and Surf.",
    pokemon:[
      {name:"Pidgey",    method:"Grass", levels:"32",    rate:"10%"},
      {name:"Pidgeotto", method:"Grass", levels:"37",    rate:"20%"},
      {name:"Oddish",    method:"Grass", levels:"30",    rate:"10%", hgOnly:true},
      {name:"Gloom",     method:"Grass", levels:"35",    rate:"20%", hgOnly:true},
      {name:"Venonat",   method:"Grass", levels:"34",    rate:"10%"},
      {name:"Venomoth",  method:"Grass", levels:"37–40", rate:"5%"},
      {name:"Psyduck",   method:"Grass", levels:"31",    rate:"5%",  hgOnly:true},
      {name:"Bellsprout",method:"Grass", levels:"30",    rate:"10%", ssOnly:true},
      {name:"Weepinbell",method:"Grass", levels:"35",    rate:"20%", ssOnly:true},
      {name:"Slowpoke",  method:"Grass", levels:"31",    rate:"5%",  ssOnly:true},
      {name:"Drowzee",   method:"Grass", levels:"34",    rate:"10%"},
      {name:"Hypno",     method:"Grass", levels:"37–40", rate:"5%"},
      {name:"Exeggcute", method:"Grass", levels:"35",    rate:"5%"},
      {name:"Psyduck",   method:"Surf",      levels:"5–40",  rate:"95%", hgOnly:true},
      {name:"Golduck",   method:"Surf",      levels:"35–40", rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Surf",      levels:"5–40",  rate:"95%", ssOnly:true},
      {name:"Slowbro",   method:"Surf",      levels:"35–40", rate:"5%",  ssOnly:true},
      {name:"Magikarp",  method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Poliwag",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Goldeen",   method:"Good Rod",  levels:"5–15",  rate:"60%"},
      {name:"Magikarp",  method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Goldeen",   method:"Super Rod", levels:"15–25", rate:"40%"},
      {name:"Seaking",   method:"Super Rod", levels:"20–30", rate:"40%"},
      {name:"Gyarados",  method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",   method:"Super Rod", levels:"15–35", rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod", levels:"15–35", rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Razz Berry",  hidden:true,recurring:true, note:"Southwest of first cuttable tree"},
      {name:"Oran Berry",  hidden:true,recurring:true, note:"Northwest of first cuttable tree",img:"screenshots/hidden/berry-forest-1.png"},
      {name:"Persim Berry",hidden:true,recurring:true, note:"Northeast of ledge near entrance",img:"screenshots/hidden/berry-forest-2.png"},
      {name:"Pinap Berry", hidden:true,recurring:true, note:"Northeast of Oran Berry",img:"screenshots/hidden/berry-forest-3.png"},
      {name:"Chesto Berry",hidden:true,recurring:true, note:"Northeastern corner"},
      {name:"Aspear Berry",hidden:true,recurring:true, note:"Northeast of northernmost water",img:"screenshots/hidden/berry-forest-5.png"},
      {name:"Rawst Berry", hidden:true,recurring:true, note:"Northwest of Aspear Berry"},
      {name:"Bluk Berry",  hidden:true,recurring:true, note:"Southeast of cuttable tree",img:"screenshots/hidden/berry-forest-7.png"},
      {name:"Nanab Berry", hidden:true,recurring:true, note:"Northeast of middle water"},
      {name:"Cheri Berry", hidden:true,recurring:true, note:"North of middle water",img:"screenshots/hidden/berry-forest-9.png"},
      {name:"Wepear Berry",hidden:true,recurring:true, note:"North of middle water",img:"screenshots/hidden/berry-forest-10.png"},
      {name:"Pecha Berry", hidden:true,recurring:true, note:"North of southernmost water"},
      {name:"Lum Berry",   hidden:true,recurring:true, note:"Northwest area"},
      {name:"Full Heal",   hidden:false,note:"North of northernmost water"},
      {name:"Max Ether",   hidden:false,note:"West of Rawst Berry"},
      {name:"Max Elixir",  hidden:false,surf:true,note:"Southeast dead-end (requires Cut and Surf)"},
      {name:"Iapapa Berry",hidden:false,note:"From Lostelle after rescue"},
    ],
    trainers:[]},

  { part:"Part 15", id:"route21", name:"Route 21",
    note:"Connects Cinnabar Island to Pallet Town. Tangela is the only grass encounter.",
    pokemon:[
      {name:"Tangela",    method:"Grass",    levels:"17–28", rate:"100%"},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"100%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",   method:"Good Rod",  levels:"5–15",  rate:"60% FR / 20% LG"},
      {name:"Krabby",   method:"Good Rod",  levels:"5–15",  rate:"20% FR / 60% LG"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"80%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Pearl", hidden:true,recurring:true, note:"Small island near Swimmer Spencer"},
    ],
    trainers:[
      {class:"Fisherman",   name:"Wade",     team:[{name:"Magikarp",level:27},{name:"Magikarp",level:27},{name:"Magikarp",level:27},{name:"Magikarp",level:27},{name:"Magikarp",level:27},{name:"Magikarp",level:27}]},
      {class:"Fisherman",   name:"Ronald",   team:[{name:"Seaking",level:28},{name:"Goldeen",level:28},{name:"Seaking",level:28},{name:"Seaking",level:28}]},
      {class:"Sis and Bro", name:"Lil & Ian",team:[{name:"Seadra",level:33},{name:"Starmie",level:33}]},
      {class:"Swimmer♂",   name:"Spencer",  team:[{name:"Seadra",level:33},{name:"Tentacruel",level:33}]},
      {class:"Fisherman",   name:"Claude",   team:[{name:"Shellder",level:31},{name:"Cloyster",level:31}]},
      {class:"Fisherman",   name:"Nolan",    team:[{name:"Seaking",level:33},{name:"Goldeen",level:33}]},
      {class:"Swimmer♂",   name:"Jack",     team:[{name:"Starmie",level:37}]},
      {class:"Swimmer♂",   name:"Roland",   team:[{name:"Poliwhirl",level:32},{name:"Tentacool",level:32},{name:"Seadra",level:32}]},
      {class:"Swimmer♂",   name:"Jerome",   team:[{name:"Staryu",level:33},{name:"Wartortle",level:33}]},
    ]},

  { part:"Part 15", id:"route10-north-return", name:"Route 10 North (Return)",
    note:"PokéManiac Mark and a hidden Max Ether are only reachable via Surf — accessible on the way to the Power Plant.",
    pokemon:[],
    items:[
      {name:"Max Ether", hidden:true, note:"One step west, four steps north of PokéManiac Mark (★ Itemfinder)"},
    ],
    trainers:[
      {class:"PokéManiac",name:"Mark",team:[{name:"Rhyhorn",level:29},{name:"Lickitung",level:29}]},
    ]},

  { part:"Part 15", id:"power-plant", name:"Power Plant",
    note:"Accessible from Route 10 (North) via Surf. Two item spots are Electrode in disguise — approaching them starts a battle. Zapdos waits at the far end.",
    pokemon:[
      {name:"Zapdos",    method:"Cave", warn:true, note:"One-time encounter at the back of the Power Plant"},
      {name:"Magnemite", method:"Cave", levels:"22–25", rate:"30%"},
      {name:"Voltorb",   method:"Cave", levels:"22–25", rate:"30%"},
      {name:"Pikachu",   method:"Cave", levels:"22–26", rate:"25%"},
      {name:"Magneton",  method:"Cave", levels:"31–34", rate:"10%", hgOnly:true},
      {name:"Magneton",  method:"Cave", levels:"31–34", rate:"15%", ssOnly:true},
      {name:"Electabuzz",method:"Cave", levels:"32–35", rate:"5%",  hgOnly:true},
      {name:"Electrode", method:"Cave", levels:"30",    note:"Two static encounters disguised as item balls — caught with a regular Poké Ball"},
    ],
    items:[
      {name:"Max Potion",   hidden:false, note:"North of the entrance room"},
      {name:"TM17 Protect", hidden:false, note:"Central corridor"},
      {name:"Elixir",       hidden:false, note:"Central corridor"},
      {name:"TM25 Thunder", hidden:false, note:"Southeast room"},
      {name:"Thunder Stone",hidden:false, note:"Northeast room, northeast corner"},
      {name:"Thunder Stone",hidden:true,  note:"One step south, three steps east of Zapdos' location",img:"screenshots/hidden/power-plant-5.png"},
      {name:"Max Elixir",   hidden:true,  note:"Central room, in front of the eastern machine",img:"screenshots/hidden/power-plant-6.png"},
      {name:"Electrode",    hidden:false, note:"Fake item — south-central room (starts a battle when grabbed)"},
      {name:"Electrode",    hidden:false, note:"Fake item — northeast room, northwest corner (starts a battle when grabbed)"},
    ],
    trainers:[]},

  { part:"Part 16", id:"route22-return", name:"Route 22 (Return)",
    note:"Blue challenges you here on the way to Victory Road — Rival Battle 7.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Rival",name:"Blue",note:"Rival Battle 7 — team varies by starter. Shown: vs Bulbasaur.",
        team:[{name:"Pidgeot",level:47},{name:"Rhyhorn",level:45},{name:"Exeggcute",level:45},{name:"Gyarados",level:45},{name:"Alakazam",level:47},{name:"Charizard",level:53}]},
    ]},

  { part:"Part 16", id:"route23", name:"Route 23",
    note:"A checkpoint gauntlet — you need all eight badges to pass the successive gatekeepers. Connects Viridian City to Victory Road and the Indigo Plateau.",
    pokemon:[
      {name:"Mankey",   method:"Grass",     levels:"32–34",  rate:"30%"},
      {name:"Fearow",   method:"Grass",     levels:"40–44",  rate:"25%"},
      {name:"Ekans",    method:"Grass",     levels:"32–34",  rate:"20%", hgOnly:true},
      {name:"Sandshrew",method:"Grass",     levels:"32–34",  rate:"20%", ssOnly:true},
      {name:"Spearow",  method:"Grass",     levels:"32–34",  rate:"15%"},
      {name:"Arbok",    method:"Grass",     levels:"44",     rate:"5%",  hgOnly:true},
      {name:"Sandslash",method:"Grass",     levels:"44",     rate:"5%",  ssOnly:true},
      {name:"Primeape", method:"Grass",     levels:"42",     rate:"5%"},
      {name:"Psyduck",  method:"Surf",      levels:"20–40",  rate:"100%", hgOnly:true},
      {name:"Slowpoke", method:"Surf",      levels:"20–40",  rate:"100%", ssOnly:true},
      {name:"Magikarp", method:"Old Rod",   levels:"5",      rate:"100%"},
      {name:"Poliwag",  method:"Good Rod",  levels:"5–15",   rate:"60%"},
      {name:"Goldeen",  method:"Good Rod",  levels:"5–15",   rate:"20%"},
      {name:"Magikarp", method:"Good Rod",  levels:"5–15",   rate:"20%"},
      {name:"Poliwag",  method:"Super Rod", levels:"15–25",  rate:"40%"},
      {name:"Poliwhirl",method:"Super Rod", levels:"20–30",  rate:"40%"},
      {name:"Gyarados", method:"Super Rod", levels:"15–25",  rate:"15%"},
      {name:"Psyduck",  method:"Super Rod", levels:"15–35",  rate:"5%",  hgOnly:true},
      {name:"Slowpoke", method:"Super Rod", levels:"15–35",  rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Leppa Berry",  hidden:true, note:"Northwest of Thunder Badge checkpoint",img:"screenshots/hidden/route23-0.png"},
      {name:"Max Ether",    hidden:true, note:"Northeast island area",img:"screenshots/hidden/route23-1.png"},
      {name:"Ultra Ball",   hidden:true, note:"Northeast of lake",img:"screenshots/hidden/route23-2.png"},
      {name:"Aspear Berry", hidden:true, note:"Southwest of Volcano Badge checkpoint",img:"screenshots/hidden/route23-3.png"},
      {name:"Full Restore", hidden:true, note:"East of northern grass patch",img:"screenshots/hidden/route23-4.png"},
      {name:"Sitrus Berry", hidden:true, note:"West-southwest of Victory Road entrance",img:"screenshots/hidden/route23-5.png"},
      {name:"Lum Berry",    hidden:true, note:"Southwest of the stone maze (north section)",img:"screenshots/hidden/route23-6.png"},
      {name:"Max Elixir",   hidden:true, note:"Northwest of the stone maze (north section)",img:"screenshots/hidden/route23-7.png"},
    ],
    trainers:[]},

  { part:"Part 16", id:"victory-road", name:"Victory Road",
    note:"Three-floor cave between Route 23 and the Indigo Plateau. Strength and Rock Smash are needed for some items.",
    floors:[
      { label:"1F",
        pokemon:[
          {name:"Onix",     method:"Cave", levels:"40–43", rate:"30%"},
          {name:"Machop",   method:"Cave", levels:"32–34", rate:"20%"},
          {name:"Geodude",  method:"Cave", levels:"32–34", rate:"20%"},
          {name:"Zubat",    method:"Cave", levels:"32–34", rate:"10%"},
          {name:"Arbok",    method:"Cave", levels:"44",    rate:"5%",  hgOnly:true},
          {name:"Sandslash",method:"Cave", levels:"44",    rate:"5%",  ssOnly:true},
          {name:"Golbat",   method:"Cave", levels:"44",    rate:"5%"},
          {name:"Machoke",  method:"Cave", levels:"44",    rate:"5%"},
          {name:"Marowak",  method:"Cave", levels:"44",    rate:"5%"},
        ],
        items:[
          {name:"TM02 Dragon Claw",hidden:false, note:"North area (requires Strength)"},
          {name:"Rare Candy",      hidden:false, note:"North area (requires Strength)"},
          {name:"Full Restore",    hidden:true,  note:"On rock east of TM02",img:"screenshots/hidden/victory-road-1f-2.png"},
          {name:"Ultra Ball",      hidden:true,  note:"Near center of floor",img:"screenshots/hidden/victory-road-1f-3.png"},
        ],
        trainers:[
          {class:"Cooltrainer",name:"Naomi",  team:[{name:"Persian",  level:42},{name:"Ponyta",   level:42},{name:"Rapidash", level:42},{name:"Vulpix",   level:42},{name:"Ninetales",level:42}]},
          {class:"Cooltrainer",name:"Rolando", team:[{name:"Raticate", level:42},{name:"Ivysaur",  level:42},{name:"Wartortle",level:42},{name:"Charmeleon",level:42},{name:"Charizard", level:42}]},
          {class:"Juggler",    name:"Nelson",  team:[{name:"Drowzee",  level:41},{name:"Hypno",    level:41},{name:"Kadabra",  level:41},{name:"Kadabra",  level:41}]},
          {class:"Tamer",      name:"Vincent", team:[{name:"Persian",  level:44},{name:"Golduck",  level:44}]},
        ]},
      { label:"2F",
        pokemon:[
          {name:"Machop",   method:"Cave", levels:"34",    rate:"20%"},
          {name:"Geodude",  method:"Cave", levels:"34",    rate:"20%"},
          {name:"Onix",     method:"Cave", levels:"43–46", rate:"20%"},
          {name:"Zubat",    method:"Cave", levels:"34",    rate:"10%"},
          {name:"Primeape", method:"Cave", levels:"42",    rate:"10%"},
          {name:"Arbok",    method:"Cave", levels:"46",    rate:"5%",  hgOnly:true},
          {name:"Sandslash",method:"Cave", levels:"46",    rate:"5%",  ssOnly:true},
          {name:"Golbat",   method:"Cave", levels:"46",    rate:"5%"},
          {name:"Machoke",  method:"Cave", levels:"46",    rate:"5%"},
          {name:"Marowak",  method:"Cave", levels:"46",    rate:"5%"},
        ],
        items:[
          {name:"TM37 Sandstorm",hidden:false, note:"Southwest of Black Belt Daisuke"},
          {name:"Full Heal",     hidden:false, note:"Southwest of Tamer Vincent's area"},
          {name:"TM07 Hail",     hidden:false, note:"Northeast area"},
          {name:"Guard Spec.",   hidden:false, note:"Northwest area"},
        ],
        trainers:[
          {class:"Black Belt",  name:"Daisuke", team:[{name:"Machoke",level:43},{name:"Machop",  level:43},{name:"Machoke",level:43}]},
          {class:"Juggler",     name:"Gregory", team:[{name:"Mr. Mime",level:48}]},
          {class:"Cooltrainer", name:"George",  team:[{name:"Exeggutor",level:42},{name:"Sandslash",level:42},{name:"Cloyster",level:42},{name:"Electrode",level:42},{name:"Arcanine",level:42}]},
          {class:"PokéManiac",  name:"Dawson",  team:[{name:"Charmeleon",level:40},{name:"Lapras",level:40},{name:"Lickitung",level:40}]},
          {class:"Cooltrainer", name:"Alexa",   team:[{name:"Clefairy",level:42},{name:"Jigglypuff",level:42},{name:"Persian",level:42},{name:"Dewgong",level:42},{name:"Chansey",level:42}]},
        ]},
      { label:"3F",
        pokemon:[
          {name:"Onix",     method:"Cave", levels:"44–46", rate:"30%"},
          {name:"Machop",   method:"Cave", levels:"34–36", rate:"20%"},
          {name:"Geodude",  method:"Cave", levels:"34–36", rate:"20%"},
          {name:"Zubat",    method:"Cave", levels:"34–36", rate:"10%"},
          {name:"Arbok",    method:"Cave", levels:"46",    rate:"5%",  hgOnly:true},
          {name:"Sandslash",method:"Cave", levels:"46",    rate:"5%",  ssOnly:true},
          {name:"Golbat",   method:"Cave", levels:"46",    rate:"5%"},
          {name:"Machoke",  method:"Cave", levels:"46",    rate:"5%"},
          {name:"Marowak",  method:"Cave", levels:"46",    rate:"5%"},
        ],
        items:[
          {name:"Max Revive", hidden:false, note:"Northeast area"},
          {name:"TM50 Overheat",hidden:false, note:"Northwest area"},
        ],
        trainers:[
          {class:"Cooltrainer",name:"Colby",    team:[{name:"Kingler",   level:41},{name:"Poliwhirl",level:42},{name:"Tentacruel",level:42},{name:"Seadra",   level:42},{name:"Blastoise",level:43}]},
          {class:"Cooltrainer",name:"Caroline", team:[{name:"Bellsprout",level:42},{name:"Weepinbell",level:42},{name:"Victreebel",level:42},{name:"Paras",    level:42},{name:"Parasect", level:42}]},
          {class:"Cool Couple",name:"Ray & Tyra",team:[{name:"Nidoking", level:45},{name:"Nidoqueen",level:45}]},
        ]},
    ]},

  { part:"Part 17", id:"indigo-plateau", name:"Indigo Plateau",
    note:"Face the Elite Four in order — Lorelei → Bruno → Agatha → Lance — then challenge Blue as Champion. Blue's team varies depending on which starter you chose.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Elite Four",name:"Lorelei", note:"Ice-type specialist",
        team:[{name:"Dewgong",level:52},{name:"Cloyster",level:51},{name:"Slowbro",level:52},{name:"Jynx",level:54},{name:"Lapras",level:54}]},
      {class:"Elite Four",name:"Bruno",   note:"Fighting-type specialist",
        team:[{name:"Onix",level:51},{name:"Hitmonchan",level:53},{name:"Hitmonlee",level:53},{name:"Onix",level:54},{name:"Machamp",level:56}]},
      {class:"Elite Four",name:"Agatha",  note:"Ghost-type specialist",
        team:[{name:"Gengar",level:54},{name:"Golbat",level:54},{name:"Haunter",level:53},{name:"Arbok",level:56},{name:"Gengar",level:58}]},
      {class:"Elite Four",name:"Lance",   note:"Dragon-type specialist",
        team:[{name:"Gyarados",level:56},{name:"Dragonair",level:54},{name:"Dragonair",level:54},{name:"Aerodactyl",level:58},{name:"Dragonite",level:60}]},
      {class:"Rival",     name:"Blue",    note:"Champion — vs Bulbasaur starter",
        team:[{name:"Pidgeot",level:59},{name:"Alakazam",level:57},{name:"Rhydon",level:59},{name:"Exeggutor",level:59},{name:"Gyarados",level:61},{name:"Charizard",level:63}]},
      {class:"Rival",     name:"Blue",    note:"Champion — vs Charmander starter",
        team:[{name:"Pidgeot",level:59},{name:"Alakazam",level:57},{name:"Rhydon",level:59},{name:"Arcanine",level:59},{name:"Exeggutor",level:61},{name:"Blastoise",level:63}]},
      {class:"Rival",     name:"Blue",    note:"Champion — vs Squirtle starter",
        team:[{name:"Pidgeot",level:59},{name:"Alakazam",level:57},{name:"Rhydon",level:59},{name:"Gyarados",level:59},{name:"Arcanine",level:61},{name:"Venusaur",level:63}]},
    ]},

  { part:"Part 15", id:"viridian-gym", name:"Viridian Gym",
    note:"Giovanni's Ground-type gym — spinner tile maze. Defeating Giovanni earns the Earth Badge.",
    pokemon:[],
    items:[
      {name:"TM26 Earthquake", hidden:false, note:"Reward for defeating Giovanni"},
      {name:"Macho Brace", hidden:true, note:"On the spot where Giovanni stood (requires Itemfinder)",img:"screenshots/hidden/viridian-gym-0.png"},
    ],
    trainers:[
      {class:"Tamer",       name:"Cole",    team:[{name:"Arbok",    level:39},{name:"Tauros",   level:39}]},
      {class:"Black Belt",  name:"Kiyo",    team:[{name:"Machoke",  level:43}]},
      {class:"Cooltrainer", name:"Samuel",  team:[{name:"Sandslash",level:37},{name:"Sandslash",level:37},{name:"Rhyhorn",  level:38},{name:"Nidorino",level:39},{name:"Nidoking", level:39}]},
      {class:"Cooltrainer", name:"Yuji",    team:[{name:"Sandslash",level:38},{name:"Graveler", level:38},{name:"Onix",     level:38},{name:"Graveler", level:38},{name:"Marowak",  level:38}]},
      {class:"Black Belt",  name:"Atsushi", team:[{name:"Machop",   level:40},{name:"Machoke",  level:40}]},
      {class:"Tamer",       name:"Jason",   team:[{name:"Rhyhorn",  level:43}]},
      {class:"Cooltrainer", name:"Warren",  team:[{name:"Marowak",  level:37},{name:"Marowak",  level:37},{name:"Rhyhorn",  level:38},{name:"Nidorina", level:39},{name:"Nidoqueen",level:39}]},
      {class:"Black Belt",  name:"Takashi", team:[{name:"Machoke",  level:38},{name:"Machop",   level:38},{name:"Machoke",  level:38}]},
      {class:"Gym Leader",  name:"Giovanni",note:"Earth Badge · TM26 Earthquake",
        team:[{name:"Rhyhorn",level:45},{name:"Dugtrio",level:42},{name:"Nidoqueen",level:44},{name:"Nidoking",level:45},{name:"Rhyhorn",level:50}]},
    ]},

// ─── PART 18 — Ruby Path · Four Island · Icefall Cave · Six Island ──────────

  { part:"Part 18", id:"ruby-path", name:"Ruby Path",
    note:"Underground cave beneath Mt. Ember on One Island. Defeat the two Team Rocket Grunts at the entrance to access. The only place to find Slugma and Magcargo in FRLG. Deliver the Ruby to Celio to receive the Rainbow Pass.",
    floors:[
      { label:"1F",
        pokemon:[
          {name:"Geodude",  method:"Cave",       levels:"32–40", rate:"50%"},
          {name:"Machop",   method:"Cave",       levels:"34–38", rate:"40%"},
          {name:"Machoke",  method:"Cave",       levels:"40–42", rate:"10%"},
          {name:"Geodude",  method:"Rock Smash", levels:"25–40", rate:"65%"},
          {name:"Graveler", method:"Rock Smash", levels:"30–50", rate:"35%"},
        ],
        items:[],
        trainers:[
          {class:"Team Rocket Grunt", name:"Grunt 1", note:"Guards the entrance — must be defeated to proceed.", team:[{name:"Cubone",level:37},{name:"Marowak",level:37}]},
          {class:"Team Rocket Grunt", name:"Grunt 2", note:"Guards the entrance — must be defeated to proceed.", team:[{name:"Rattata",level:35},{name:"Raticate",level:35},{name:"Sandshrew",level:35},{name:"Sandslash",level:35}]},
        ] },
      { label:"B1F",
        pokemon:[
          {name:"Geodude",  method:"Cave",       levels:"34–42", rate:"70%"},
          {name:"Slugma",   method:"Cave",       levels:"24–30", rate:"30%"},
          {name:"Geodude",  method:"Rock Smash", levels:"25–40", rate:"65%"},
          {name:"Graveler", method:"Rock Smash", levels:"30–50", rate:"35%"},
        ],
        items:[],
        trainers:[] },
      { label:"B2F",
        pokemon:[
          {name:"Slugma",   method:"Cave",       levels:"22–32", rate:"60%"},
          {name:"Geodude",  method:"Cave",       levels:"40–44", rate:"40%"},
          {name:"Geodude",  method:"Rock Smash", levels:"25–40", rate:"65%"},
          {name:"Graveler", method:"Rock Smash", levels:"30–50", rate:"35%"},
        ],
        items:[],
        trainers:[] },
      { label:"B3F",
        pokemon:[
          {name:"Slugma",   method:"Cave",       levels:"18–36", rate:"100%"},
          {name:"Slugma",   method:"Rock Smash", levels:"15–35", rate:"90%"},
          {name:"Magcargo", method:"Rock Smash", levels:"25–45", rate:"10%"},
        ],
        items:[],
        trainers:[] },
      { label:"B4F",
        note:"Same encounters as B2F.",
        pokemon:[
          {name:"Slugma",   method:"Cave",       levels:"22–32", rate:"60%"},
          {name:"Geodude",  method:"Cave",       levels:"40–44", rate:"40%"},
          {name:"Geodude",  method:"Rock Smash", levels:"25–40", rate:"65%"},
          {name:"Graveler", method:"Rock Smash", levels:"30–50", rate:"35%"},
        ],
        items:[],
        trainers:[] },
      { label:"B5F",
        note:"Same encounters as B1F.",
        pokemon:[
          {name:"Geodude",  method:"Cave",       levels:"34–42", rate:"70%"},
          {name:"Slugma",   method:"Cave",       levels:"24–30", rate:"30%"},
          {name:"Geodude",  method:"Rock Smash", levels:"25–40", rate:"65%"},
          {name:"Graveler", method:"Rock Smash", levels:"30–50", rate:"35%"},
        ],
        items:[
          {name:"Ruby", hidden:false, note:"On the pedestal (requires Strength) — deliver to Celio to receive the Rainbow Pass"},
        ],
        trainers:[] },
    ] },

  { part:"Part 18", id:"four-island", name:"Four Island",
    note:"Kinnow Island — hub of the second set of Sevii Islands. Surf and fish off the beaches for Kanto and Johto Pokémon. Blue appears here but does not battle.",
    pokemon:[
      {name:"Wooper",    method:"Surf",      levels:"5–25",  rate:"70%", hgOnly:true},
      {name:"Marill",    method:"Surf",      levels:"5–25",  rate:"70%", ssOnly:true},
      {name:"Psyduck",   method:"Surf",      levels:"5–35",  rate:"30%", hgOnly:true},
      {name:"Slowpoke",  method:"Surf",      levels:"5–35",  rate:"30%", ssOnly:true},
      {name:"Magikarp",  method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Poliwag",   method:"Good Rod",  levels:"5–15",  rate:"60%"},
      {name:"Goldeen",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Magikarp",  method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Poliwag",   method:"Super Rod", levels:"15–25", rate:"40%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"20–30", rate:"40%"},
      {name:"Gyarados",  method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",   method:"Super Rod", levels:"15–35", rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod", levels:"15–35", rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Ultra Ball",  hidden:true,  note:"Beach north of the port"},
      {name:"Star Piece",  hidden:false, note:"Northernmost beach (requires Rock Smash)"},
      {name:"Pearl",       hidden:true,  note:"Beach east of the port"},
      {name:"Stardust",    hidden:true,  note:"South of Icefall Cave entrance (requires Surf)"},
    ],
    trainers:[] },

  { part:"Part 18", id:"icefall-cave", name:"Icefall Cave",
    note:"Icy cave on Four Island's northwest coast. HM07 Waterfall is obtained here. Lorelei appears in the Back Cave for a cutscene.",
    floors:[
      { label:"Entrance",
        pokemon:[
          {name:"Seel",     method:"Cave", levels:"43–47", rate:"40%"},
          {name:"Golbat",   method:"Cave", levels:"45–48", rate:"25%"},
          {name:"Dewgong",  method:"Cave", levels:"49–53", rate:"20%"},
          {name:"Zubat",    method:"Cave", levels:"40",    rate:"10%"},
          {name:"Psyduck",  method:"Cave", levels:"41",    rate:"5%",  hgOnly:true},
          {name:"Slowpoke", method:"Cave", levels:"41",    rate:"5%",  ssOnly:true},
          {name:"Seel",     method:"Surf", levels:"5–35",  rate:"60%"},
          {name:"Psyduck",  method:"Surf", levels:"5–35",  rate:"30%", hgOnly:true},
          {name:"Slowpoke", method:"Surf", levels:"5–35",  rate:"30%", ssOnly:true},
          {name:"Dewgong",  method:"Surf", levels:"35–40", rate:"5%"},
          {name:"Wooper",   method:"Surf", levels:"5–15",  rate:"5%",  hgOnly:true},
          {name:"Marill",   method:"Surf", levels:"5–15",  rate:"5%",  ssOnly:true},
        ],
        items:[],
        trainers:[
          {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Zubat",level:38},{name:"Zubat",level:38},{name:"Golbat",level:38}]},
        ] },
      { label:"1F",
        pokemon:[
          {name:"Swinub",   method:"Cave", levels:"23–31", rate:"50%"},
          {name:"Golbat",   method:"Cave", levels:"45–48", rate:"25%"},
          {name:"Zubat",    method:"Cave", levels:"40",    rate:"10%"},
          {name:"Seel",     method:"Cave", levels:"45",    rate:"10%"},
          {name:"Delibird", method:"Cave", levels:"30",    rate:"5%",  hgOnly:true},
          {name:"Sneasel",  method:"Cave", levels:"30",    rate:"5%",  ssOnly:true},
        ],
        items:[
          {name:"Ultra Ball",     hidden:false, note:"Center area, northeast of the ice patch"},
          {name:"HM07 Waterfall", hidden:false, note:"Southern ledge, accessed via the frozen waterfall in B1F"},
        ],
        trainers:[] },
      { label:"Back Cave",
        pokemon:[
          {name:"Tentacool",  method:"Surf",      levels:"5–45",  rate:"95%"},
          {name:"Tentacruel", method:"Surf",      levels:"35–45", rate:"4%"},
          {name:"Lapras",     method:"Surf",      levels:"30–45", rate:"1%"},
          {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
          {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
          {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
          {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
          {name:"Shellder",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
          {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
          {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
          {name:"Staryu",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
          {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
          {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
          {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
          {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
          {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
        ],
        items:[
          {name:"Never-Melt Ice", hidden:false, note:"East side of B1F"},
          {name:"Full Restore",   hidden:false, note:"Near the southern ladder in B1F"},
        ],
        trainers:[] },
    ] },

  { part:"Part 18", id:"six-island-town", name:"Six Island",
    note:"Hub town for Six Island. Blue is here and mentions returning to Kanto for his Pokédex.",
    pokemon:[],
    items:[
      {name:"Leppa Berry", hidden:true, note:"North of the Pokémon Center"},
    ],
    trainers:[] },

  { part:"Part 18", id:"water-path", name:"Water Path",
    note:"Coastal route on Six Island connecting the Pokémon Center to the rest of the island. Grass encounters include Johto Pokémon.",
    pokemon:[
      {name:"Spearow",    method:"Grass",     levels:"44",    rate:"20%"},
      {name:"Sentret",    method:"Grass",     levels:"10–15", rate:"30%"},
      {name:"Meowth",     method:"Grass",     levels:"41",    rate:"10%"},
      {name:"Oddish",     method:"Grass",     levels:"44",    rate:"10%", hgOnly:true},
      {name:"Gloom",      method:"Grass",     levels:"48",    rate:"5%",  hgOnly:true},
      {name:"Bellsprout", method:"Grass",     levels:"44",    rate:"10%", ssOnly:true},
      {name:"Weepinbell", method:"Grass",     levels:"48",    rate:"5%",  ssOnly:true},
      {name:"Fearow",     method:"Grass",     levels:"48–50", rate:"15%"},
      {name:"Persian",    method:"Grass",     levels:"47–50", rate:"5%"},
      {name:"Psyduck",    method:"Grass",     levels:"41",    rate:"5%",  hgOnly:true},
      {name:"Slowpoke",   method:"Grass",     levels:"41",    rate:"5%",  ssOnly:true},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Qwilfish",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Remoraid",   method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Pinap Berry",  hidden:true,  note:"Grassy area southeast of Six Island entrance"},
      {name:"Aspear Berry", hidden:true,  note:"Grassy area, southeast of Pinap Berry"},
      {name:"Dragon Scale", hidden:false, note:"Small land mass southeast of Aspear Berry (requires Surf)"},
      {name:"Oran Berry",   hidden:true,  note:"Northwest of northern house (requires Surf)"},
      {name:"Elixir",       hidden:false, note:"Small land east of southern house (requires Surf)"},
      {name:"Nest Ball",   hidden:false, note:"From the woman in the northern house for showing a record-breaking Heracross (requires Surf)"},
    ],
    trainers:[
      {class:"Juggler",    name:"Edward",   team:[{name:"Voltorb",level:46},{name:"Voltorb",level:46},{name:"Electrode",level:47},{name:"Mr. Mime",level:48}]},
      {class:"Hiker",      name:"Earl",     team:[{name:"Onix",level:49},{name:"Machoke",level:49}]},
      {class:"Swimmer♀",   name:"Denise",   team:[{name:"Chinchou",level:49},{name:"Lanturn",level:49}]},
      {class:"Swimmer♂",   name:"Samir",    team:[{name:"Gyarados",level:50}]},
      {class:"Twins",      name:"Miu & Mia",team:[{name:"Pikachu",level:50},{name:"Pikachu",level:50}]},
      {class:"Aroma Lady", name:"Rose",     team:[{name:"Sunkern",level:49},{name:"Sunflora",level:49}]},
    ] },

  { part:"Part 18", id:"green-path", name:"Green Path",
    note:"Short water route on Six Island's northeastern coast connecting Water Path to Outcast Island. Only surf and fishing encounters.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Qwilfish",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Remoraid",   method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
    ],
    items:[
      {name:"Ultra Ball", hidden:true, recurring:true, note:"One step south and east of Psychic Jaclyn"},
    ],
    trainers:[
      {class:"Psychic",name:"Jaclyn",team:[{name:"Natu",level:48},{name:"Slowbro",level:48},{name:"Kadabra",level:49}]},
    ] },

  { part:"Part 18", id:"outcast-island", name:"Outcast Island",
    note:"Water route surfed north from Green Path to reach Altering Cave on the small island at the far end. A Team Rocket Grunt blocks the way until the Rocket Admins at the Rocket Warehouse are defeated.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"95%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Qwilfish",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Remoraid",   method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"PP Up",      hidden:false, note:"Southwest of Fisherman Tylor"},
      {name:"Net Ball",   hidden:true,  recurring:true, note:"South of Altering Cave entrance"},
      {name:"Star Piece", hidden:true,  recurring:true, note:"East side of the island"},
    ],
    trainers:[
      {class:"Swimmer",         name:"Nicole",    team:[{name:"Marill",   level:50}]},
      {class:"Sis and Bro",     name:"Ava & Geb", team:[{name:"Starmie",  level:50},{name:"Poliwhirl",level:50}]},
      {class:"Swimmer",         name:"Mymo",      team:[{name:"Kingler",  level:49},{name:"Wartortle",level:49}]},
      {class:"Fisherman",       name:"Tylor",     team:[{name:"Qwilfish", level:49},{name:"Qwilfish", level:49}]},
      {class:"Team Rocket Grunt",name:"Grunt",    note:"Only before clearing the Rocket Warehouse on Five Island", team:[{name:"Muk",level:48},{name:"Golbat",level:48},{name:"Raticate",level:48}]},
    ] },

  { part:"Part 18", id:"pattern-bush", name:"Pattern Bush",
    note:"Dense forest on Six Island. Ledyba is far more common in LeafGreen (30%) than FireRed (5%); Spinarak is the reverse. Heracross appears at a steady 20% in both.",
    pokemon:[
      {name:"Heracross",  method:"Grass", levels:"15–30", rate:"20%"},
      {name:"Caterpie",   method:"Grass", levels:"6",     rate:"10%"},
      {name:"Weedle",     method:"Grass", levels:"6",     rate:"10%"},
      {name:"Kakuna",     method:"Grass", levels:"9",     rate:"20%"},
      {name:"Metapod",    method:"Grass", levels:"9",     rate:"5%"},
      {name:"Spinarak",   method:"Grass", levels:"9–14",  rate:"30% FR / 5% LG"},
      {name:"Ledyba",     method:"Grass", levels:"9–14",  rate:"5% FR / 30% LG"},
    ],
    items:[],
    trainers:[
      {class:"Youngster",       name:"Cordell", team:[{name:"Farfetch'd",level:48},{name:"Farfetch'd",level:48}]},
      {class:"Pokémon Breeder", name:"Bethany", team:[{name:"Chansey",level:50}]},
      {class:"Bug Catcher",     name:"Garret",  team:[{name:"Heracross",level:49}]},
      {class:"Lass",            name:"Joana",   team:[{name:"Snubbull",level:49}]},
      {class:"Youngster",       name:"Nash",    team:[{name:"Weepinbell",level:47},{name:"Weepinbell",level:47},{name:"Victreebel",level:49}]},
      {class:"Bug Catcher",     name:"Vance",   team:[{name:"Venonat",level:48},{name:"Venomoth",level:48}]},
      {class:"Ruin Maniac",     name:"Layton",  team:[{name:"Sandslash",level:48},{name:"Onix",level:48},{name:"Sandslash",level:48}]},
      {class:"Picnicker",       name:"Marcy",   team:[{name:"Paras",level:48},{name:"Paras",level:48},{name:"Parasect",level:49}]},
      {class:"Bug Catcher",     name:"Jonah",   team:[{name:"Yanma",level:45},{name:"Beedrill",level:45},{name:"Yanma",level:46},{name:"Beedrill",level:47}]},
      {class:"Lass",            name:"Dalia",   team:[{name:"Hoppip",level:46},{name:"Hoppip",level:47},{name:"Skiploom",level:47},{name:"Skiploom",level:48}]},
      {class:"Pokémon Breeder", name:"Allison", team:[{name:"Clefairy",level:48},{name:"Clefairy",level:48},{name:"Clefable",level:48}]},
      {class:"Camper",          name:"Riley",   team:[{name:"Pinsir",level:49},{name:"Heracross",level:50}]},
    ] },

  { part:"Part 18", id:"altering-cave", name:"Altering Cave",
    note:"Mysterious cave on Outcast Island. The planned Mystery Gift event distributions (Mareep, Smeargle, and others) were never officially released, so only Zubat appears in any unmodified game.",
    pokemon:[
      {name:"Zubat", method:"Cave", levels:"6–16", rate:"100%"},
    ],
    items:[],
    trainers:[] },

  { part:"Part 18", id:"ruin-valley", name:"Ruin Valley",
    note:"Archaeological site on Six Island featuring rare Johto Pokémon. Natu and Yanma appear in the grass. Strength is required to reach all items.",
    pokemon:[
      {name:"Natu",      method:"Grass",     levels:"15–20", rate:"25%"},
      {name:"Spearow",   method:"Grass",     levels:"44",    rate:"20%"},
      {name:"Yanma",     method:"Grass",     levels:"18",    rate:"10%"},
      {name:"Meowth",    method:"Grass",     levels:"43",    rate:"10%"},
      {name:"Wooper",    method:"Grass",     levels:"15",    rate:"10%", hgOnly:true},
      {name:"Marill",    method:"Grass",     levels:"15",    rate:"10%", ssOnly:true},
      {name:"Wobbuffet", method:"Grass",     levels:"25",    rate:"5%"},
      {name:"Fearow",    method:"Grass",     levels:"49",    rate:"10%"},
      {name:"Persian",   method:"Grass",     levels:"49–52", rate:"5%"},
      {name:"Psyduck",   method:"Grass",     levels:"41",    rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Grass",     levels:"41",    rate:"5%",  ssOnly:true},
      {name:"Wooper",    method:"Surf",      levels:"5–25",  rate:"100%",hgOnly:true},
      {name:"Marill",    method:"Surf",      levels:"5–25",  rate:"100%",ssOnly:true},
      {name:"Magikarp",  method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Poliwag",   method:"Good Rod",  levels:"5–15",  rate:"60%"},
      {name:"Goldeen",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Magikarp",  method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Poliwag",   method:"Super Rod", levels:"15–25", rate:"40%"},
      {name:"Poliwhirl", method:"Super Rod", levels:"20–30", rate:"40%"},
      {name:"Gyarados",  method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Psyduck",   method:"Super Rod", levels:"15–35", rate:"5%",  hgOnly:true},
      {name:"Slowpoke",  method:"Super Rod", levels:"15–35", rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Sun Stone",    hidden:false, note:"Southeastern corner (requires Strength)"},
      {name:"HP Up",        hidden:false, note:"Southwestern corner (requires Strength)"},
      {name:"Full Restore", hidden:false, note:"Southeast of Hiker Daryl (requires Strength)"},
    ],
    trainers:[
      {class:"Hiker",       name:"Daryl",  team:[{name:"Sudowoodo",level:50}]},
      {class:"PokéManiac",  name:"Hector", team:[{name:"Rhyhorn",level:49},{name:"Kangaskhan",level:49}]},
      {class:"Ruin Maniac", name:"Stanly", team:[{name:"Graveler",level:48},{name:"Onix",level:48},{name:"Graveler",level:48}]},
      {class:"Ruin Maniac", name:"Foster", team:[{name:"Golem",level:50}]},
      {class:"Ruin Maniac", name:"Larry",  team:[{name:"Machoke",level:49},{name:"Machoke",level:49}]},
    ] },

  { part:"Part 18", id:"dotted-hole", name:"Dotted Hole",
    note:"Puzzle dungeon on Six Island — solve the Braille-inscribed doors on each of four floors with the right directional push to reach the pedestal. Gideon steals the Sapphire the moment you claim it.",
    pokemon:[],
    items:[
      {name:"Sapphire", hidden:false, note:"At the bottom of the puzzle — stolen by Gideon immediately; recovered later from the Rocket Warehouse", warn:true},
    ],
    trainers:[] },

// ─── PART 19 — Five Island · Seven Island ────────────────────────────────────

  { part:"Part 19", id:"five-isle-meadow", name:"Five Isle Meadow",
    note:"Grassy meadow on Five Island north of the Rocket Warehouse. Sentret and Hoppip appear at a high rate.",
    pokemon:[
      {name:"Sentret",    method:"Grass",     levels:"10–15", rate:"30%"},
      {name:"Pidgey",     method:"Grass",     levels:"44",    rate:"20%"},
      {name:"Pidgeotto",  method:"Grass",     levels:"48–50", rate:"15%"},
      {name:"Hoppip",     method:"Grass",     levels:"10–15", rate:"15%"},
      {name:"Meowth",     method:"Grass",     levels:"41",    rate:"10%"},
      {name:"Persian",    method:"Grass",     levels:"47–50", rate:"5%"},
      {name:"Psyduck",    method:"Grass",     levels:"41",    rate:"5%",  hgOnly:true},
      {name:"Slowpoke",   method:"Grass",     levels:"41",    rate:"5%",  ssOnly:true},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"65%"},
      {name:"Hoppip",     method:"Surf",      levels:"5–15",  rate:"30%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Qwilfish",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Remoraid",   method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Max Potion", hidden:false, note:"Clearing north of the Rocket Warehouse (requires Cut)"},
      {name:"PP Up",      hidden:false, note:"Southwest of the Rocket Warehouse (requires Surf)"},
    ],
    trainers:[
      {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Rattata",level:48},{name:"Grimer",level:48},{name:"Muk",level:48}]},
      {class:"Team Rocket Grunt",name:"Grunt 2",team:[{name:"Ekans",level:48},{name:"Gloom",level:48},{name:"Gloom",level:48}]},
      {class:"Team Rocket Grunt",name:"Grunt 3",team:[{name:"Koffing",level:49},{name:"Weezing",level:49}]},
    ] },

  { part:"Part 19", id:"rocket-warehouse", name:"Rocket Warehouse",
    note:"Team Rocket's secret base on Five Island. Defeat Admins Ariana and Archer, then Scientist Gideon, to recover the stolen Sapphire and deliver it to Celio.",
    pokemon:[],
    items:[
      {name:"Up-Grade",         hidden:false, note:"Northwest room"},
      {name:"Pearl",            hidden:false, note:"West-central edge of the maze"},
      {name:"Net Ball",         hidden:true,  note:"Lone box west of maze center"},
      {name:"Big Pearl",        hidden:false, note:"South-central edge of the maze"},
      {name:"TM36 Sludge Bomb", hidden:false, note:"North-central room, on a table"},
      {name:"Nest Ball",        hidden:true,  note:"Northeast room, on a box"},
      {name:"Sapphire",         hidden:false, note:"Recovered from Gideon in the northeast room — deliver to Celio on One Island", warn:true},
    ],
    trainers:[
      {class:"Team Rocket Grunt",name:"Grunt 1",team:[{name:"Houndour",level:49},{name:"Houndour",level:49}]},
      {class:"Team Rocket Grunt",name:"Grunt 2",team:[{name:"Machop",level:48},{name:"Machop",level:48},{name:"Machoke",level:48}]},
      {class:"Team Rocket Grunt",name:"Grunt 3",team:[{name:"Hypno",level:49},{name:"Hypno",level:49}]},
      {class:"Rocket Admin",name:"Ariana",team:[{name:"Muk",level:52},{name:"Arbok",level:53},{name:"Vileplume",level:54}]},
      {class:"Rocket Admin",name:"Archer", team:[{name:"Golbat",level:53},{name:"Weezing",level:54},{name:"Houndoom",level:55}]},
      {class:"Scientist",  name:"Gideon", team:[{name:"Voltorb",level:46},{name:"Electrode",level:46},{name:"Magnemite",level:46},{name:"Magneton",level:46},{name:"Porygon",level:46}]},
    ] },

  { part:"Part 19", id:"memorial-pillar", name:"Memorial Pillar",
    note:"Small island chain between Five Island and Resort Gorgeous. Bird Keeper trainers roam the northern island. Metal Coat is found on the southern island.",
    pokemon:[
      {name:"Hoppip",     method:"Grass",     levels:"6–16",  rate:"100%"},
      {name:"Tentacool",  method:"Surf",      levels:"5–40",  rate:"65%"},
      {name:"Hoppip",     method:"Surf",      levels:"5–15",  rate:"30%"},
      {name:"Tentacruel", method:"Surf",      levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",   levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod",  levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod",  levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod",  levels:"5–15",  rate:"20%"},
      {name:"Horsea",     method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Qwilfish",   method:"Super Rod", levels:"15–25", rate:"40%", hgOnly:true},
      {name:"Krabby",     method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Remoraid",   method:"Super Rod", levels:"15–25", rate:"40%", ssOnly:true},
      {name:"Gyarados",   method:"Super Rod", levels:"15–25", rate:"15%"},
      {name:"Seadra",     method:"Super Rod", levels:"25–35", rate:"4%",  hgOnly:true},
      {name:"Kingler",    method:"Super Rod", levels:"25–35", rate:"4%",  ssOnly:true},
      {name:"Psyduck",    method:"Super Rod", levels:"25–35", rate:"1%",  hgOnly:true},
      {name:"Slowpoke",   method:"Super Rod", levels:"25–35", rate:"1%",  ssOnly:true},
    ],
    items:[
      {name:"Razz Berry",  hidden:true,  note:"Northern island, east of Bird Keeper Milo"},
      {name:"Sitrus Berry",hidden:true,  note:"Northern island, southeast of Bird Keeper Chaz"},
      {name:"Bluk Berry",  hidden:true,  note:"Northern island, south of Bird Keeper Chaz"},
      {name:"TM42 Facade", hidden:false, note:"Southern island — given by NPC after sharing Lemonade"},
      {name:"Metal Coat",  hidden:false, note:"Southern island, grassy area southwest of the memorial"},
      {name:"Big Pearl",   hidden:true, recurring:true, note:"Southern island, southwest beach"},
    ],
    trainers:[
      {class:"Bird Keeper",name:"Milo",  team:[{name:"Pidgey",level:47},{name:"Pidgeotto",level:49}]},
      {class:"Bird Keeper",name:"Chaz",  team:[{name:"Spearow",level:47},{name:"Fearow",level:49}]},
      {class:"Bird Keeper",name:"Harold",team:[{name:"Hoothoot",level:47},{name:"Noctowl",level:49}]},
    ] },

  { part:"Part 19", id:"water-labyrinth", name:"Water Labyrinth",
    note:"Maze of water channels on Five Island. Pokémon Breeder Alize gives a Togepi Egg if your lead Pokémon has maximum friendship.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",     levels:"5–40",  rate:"65%"},
      {name:"Hoppip",     method:"Surf",     levels:"5–15",  rate:"30%"},
      {name:"Tentacruel", method:"Surf",     levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",  levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod", levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod", levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod", levels:"5–15",  rate:"20%"},
      {name:"Togepi",     method:"Gift",     levels:"5",     note:"Egg from Breeder Alize — requires max friendship on lead Pokémon"},
    ],
    items:[],
    trainers:[
      {class:"Pokémon Breeder",name:"Alize",team:[{name:"Pikachu",level:48},{name:"Clefairy",level:48},{name:"Marill",level:48}]},
    ] },

  { part:"Part 19", id:"resort-gorgeous", name:"Resort Gorgeous",
    note:"Exclusive resort on Five Island. Lady Selphy is hiding in Lost Cave — find her and escort her back here for rare item rewards. Painters train with Smeargle.",
    pokemon:[
      {name:"Tentacool",  method:"Surf",     levels:"5–40",  rate:"65%"},
      {name:"Hoppip",     method:"Surf",     levels:"5–15",  rate:"30%"},
      {name:"Tentacruel", method:"Surf",     levels:"35–40", rate:"5%"},
      {name:"Magikarp",   method:"Old Rod",  levels:"5",     rate:"100%"},
      {name:"Horsea",     method:"Good Rod", levels:"5–15",  rate:"80%", hgOnly:true},
      {name:"Krabby",     method:"Good Rod", levels:"5–15",  rate:"80%", ssOnly:true},
      {name:"Magikarp",   method:"Good Rod", levels:"5–15",  rate:"20%"},
    ],
    items:[
      {name:"Nest Ball",  hidden:true, recurring:true, note:"Western island, west of a rock"},
      {name:"Stardust",   hidden:true, recurring:true, note:"Center island, northwest area — two patches"},
      {name:"Star Piece", hidden:true, recurring:true, note:"South of Selphy's house"},
    ],
    trainers:[
      {class:"Painter",   name:"Rayna",   team:[{name:"Smeargle",level:50}]},
      {class:"Lady",      name:"Jacki",   team:[{name:"Hoppip",level:48},{name:"Skiploom",level:50}]},
      {class:"Painter",   name:"Celina",  team:[{name:"Smeargle",level:50}]},
      {class:"Lady",      name:"Gillian", team:[{name:"Mareep",level:47},{name:"Mareep",level:48},{name:"Flaaffy",level:49}]},
      {class:"Youngster", name:"Destin",  team:[{name:"Raticate",level:48},{name:"Pidgeotto",level:48}]},
      {class:"Painter",   name:"Daisy",   team:[{name:"Smeargle",level:50}]},
      {class:"Swimmer♂",  name:"Toby",   team:[{name:"Poliwhirl",level:48},{name:"Tentacool",level:48},{name:"Tentacruel",level:48}]},
    ] },

  { part:"Part 19", id:"lost-cave", name:"Lost Cave",
    note:"Fourteen-room maze cave south of Resort Gorgeous on Five Island. Navigate through the rooms to find Lady Selphy — five items are hidden along the paths. The Silk Scarf requires a second visit (first visit triggers the Selphy battle). Ghost-type Pokémon throughout. Murkrow appears in FireRed; Misdreavus in LeafGreen.",
    pokemon:[
      {name:"Gastly",     method:"Cave", levels:"25–35", rate:"35%"},
      {name:"Zubat",      method:"Cave", levels:"25–35", rate:"25%"},
      {name:"Haunter",    method:"Cave", levels:"35–45", rate:"21%"},
      {name:"Golbat",     method:"Cave", levels:"35–40", rate:"14%"},
      {name:"Murkrow",    method:"Cave", levels:"28–32", rate:"5%",  hgOnly:true},
      {name:"Misdreavus", method:"Cave", levels:"23–27", rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Lax Incense", hidden:false, note:"East → south"},
      {name:"Sea Incense",  hidden:false, note:"East → north → south → north"},
      {name:"Max Revive",   hidden:false, note:"East → north → south → south → east → east"},
      {name:"Rare Candy",   hidden:false, note:"East → north → south → south → east → west → south → west"},
      {name:"Silk Scarf",   hidden:false, note:"East → north → south → south → east → west → south → east → north (second visit)"},
    ],
    trainers:[
      {class:"Ruin Maniac", name:"Lawson", note:"Near the cave entrance.", team:[{name:"Onix",level:47},{name:"Graveler",level:48},{name:"Marowak",level:49}]},
      {class:"Psychic",     name:"Laura",  team:[{name:"Natu",level:48},{name:"Natu",level:48},{name:"Xatu",level:49}]},
      {class:"Lady",        name:"Selphy", note:"Find her in the tenth room and escort her back to Resort Gorgeous.", team:[{name:"Persian",level:49},{name:"Persian",level:49}]},
    ] },

  { part:"Part 19", id:"seven-island", name:"Seven Island",
    note:"Navel Rock Island — hub for Seven Island. Sevault Canyon, Tanoby Key, and Trainer Tower are all accessed from here.",
    pokemon:[],
    items:[],
    trainers:[] },

  { part:"Part 19", id:"canyon-entrance", name:"Canyon Entrance",
    note:"Gateway route to Sevault Canyon on Seven Island. Phanpy appears in the grass.",
    pokemon:[
      {name:"Spearow",  method:"Grass", levels:"44",    rate:"20%"},
      {name:"Sentret",  method:"Grass", levels:"10–15", rate:"30%"},
      {name:"Phanpy",   method:"Grass", levels:"10–15", rate:"15%"},
      {name:"Fearow",   method:"Grass", levels:"48–50", rate:"15%"},
      {name:"Meowth",   method:"Grass", levels:"41",    rate:"10%"},
      {name:"Persian",  method:"Grass", levels:"47–50", rate:"5%"},
      {name:"Psyduck",  method:"Grass", levels:"41",    rate:"5%",  hgOnly:true},
      {name:"Slowpoke", method:"Grass", levels:"41",    rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Rawst Berry", hidden:true, note:"Northeast of Young Couple Eve & Jon"},
    ],
    trainers:[
      {class:"Aroma Lady",    name:"Miah",    team:[{name:"Bellossom",level:50},{name:"Bellossom",level:50}]},
      {class:"Juggler",       name:"Mason",   team:[{name:"Voltorb",level:47},{name:"Voltorb",level:47},{name:"Pineco",level:47},{name:"Pineco",level:47}]},
      {class:"Pokémon Ranger",name:"Nicolas", team:[{name:"Weepinbell",level:51},{name:"Victreebel",level:51}]},
      {class:"Pokémon Ranger",name:"Madeline",team:[{name:"Gloom",level:51},{name:"Vileplume",level:51}]},
      {class:"Young Couple",  name:"Eve & Jon",team:[{name:"Golduck",level:50},{name:"Psyduck",level:50}]},
    ] },

  { part:"Part 19", id:"sevault-canyon", name:"Sevault Canyon",
    note:"Deep canyon on Seven Island with rare Johto Pokémon. Skarmory is FireRed-only. Larvitar is the rarest encounter. Strength and Rock Smash open shortcuts.",
    pokemon:[
      {name:"Geodude",  method:"Grass",      levels:"46",    rate:"20%"},
      {name:"Fearow",   method:"Grass",      levels:"50",    rate:"10% FR / 15% LG"},
      {name:"Phanpy",   method:"Grass",      levels:"15–20", rate:"20%"},
      {name:"Cubone",   method:"Grass",      levels:"46",    rate:"10%"},
      {name:"Marowak",  method:"Grass",      levels:"52",    rate:"10%"},
      {name:"Meowth",   method:"Grass",      levels:"43",    rate:"10%"},
      {name:"Onix",     method:"Grass",      levels:"54",    rate:"5%"},
      {name:"Skarmory", method:"Grass",      levels:"30",    rate:"5%",  hgOnly:true},
      {name:"Larvitar", method:"Grass",      levels:"15–20", rate:"5%"},
      {name:"Persian",  method:"Grass",      levels:"49–52", rate:"5%"},
      {name:"Geodude",  method:"Rock Smash", levels:"25–40", rate:"65%"},
      {name:"Graveler", method:"Rock Smash", levels:"30–50", rate:"35%"},
    ],
    items:[
      {name:"Nugget",      hidden:false, note:"Southeast of the Tanoby Key entrance"},
      {name:"Max Elixir",  hidden:false, note:"Tall grass halfway through the canyon"},
      {name:"King's Rock", hidden:false, note:"Behind three boulders (requires Strength and Rock Smash)"},
      {name:"Lucky Punch", hidden:false, note:"Inside the Chansey Dance house"},
      {name:"Cheri Berry", hidden:true,  note:"South of the Chansey Dance house"},
    ],
    trainers:[
      {class:"Cool Couple",   name:"Lex & Nya", team:[{name:"Tauros",level:52},{name:"Miltank",level:52}]},
      {class:"Tamer",         name:"Evan",      team:[{name:"Sandslash",level:48},{name:"Lickitung",level:48},{name:"Ursaring",level:49}]},
      {class:"Pokémon Ranger",name:"Jackson",   team:[{name:"Tangela",level:49},{name:"Exeggcute",level:49},{name:"Exeggutor",level:49}]},
      {class:"Pokémon Ranger",name:"Katelyn",   team:[{name:"Chansey",level:52}]},
      {class:"Crush Girl",    name:"Cyndy",     team:[{name:"Primeape",level:48},{name:"Hitmontop",level:48},{name:"Machoke",level:48}]},
      {class:"Cooltrainer",   name:"Leroy",     team:[{name:"Rhydon",level:47},{name:"Slowbro",level:48},{name:"Machoke",level:48},{name:"Kangaskhan",level:47},{name:"Ursaring",level:50}]},
      {class:"Cooltrainer",   name:"Michelle",  team:[{name:"Persian",level:47},{name:"Dewgong",level:47},{name:"Ninetales",level:48},{name:"Rapidash",level:48},{name:"Girafarig",level:50}]},
    ] },

  { part:"Part 19", id:"tanoby-key", name:"Tanoby Key",
    note:"Small puzzle area at the base of Sevault Canyon. Push seven boulders into the holes using Strength to unlock the Tanoby Chambers across the sea.",
    pokemon:[],
    items:[],
    trainers:[] },

  { part:"Part 19", id:"tanoby-ruins", name:"Tanoby Ruins",
    note:"Seven chambers (Monean · Liptoo · Weepth · Dilford · Scufib · Rixy · Viapois) scattered across the sea south of Seven Island. All 26 Unown letter forms plus ! are distributed across the chambers. Requires completing the Tanoby Key puzzle first.",
    pokemon:[
      {name:"Unown", method:"Cave", levels:"25", rate:"1–99%", note:"All 26 letter forms + ! distributed across the seven chambers"},
    ],
    items:[
      {name:"Heart Scale", hidden:true, recurring:true, note:"×4 — hidden on rocks around the exterior of the ruins chambers (requires Surf)"},
    ],
    trainers:[] },

  { part:"Part 19", id:"trainer-tower", name:"Trainer Tower",
    note:"Challenge facility on Seven Island with four modes: Single, Double, Knockout, and Mixed. All trainer Pokémon are scaled to the player's party level. Surf the waters nearby to find Mantine. Complete each mode for held-item prizes.",
    pokemon:[
      {name:"Tentacool",  method:"Surf", levels:"5–40",  rate:"60%"},
      {name:"Tentacruel", method:"Surf", levels:"35–40", rate:"35%"},
      {name:"Mantine",    method:"Surf", levels:"5–40",  rate:"5%",  ssOnly:true},
    ],
    items:[
      {name:"Up-Grade",     hidden:false, note:"Single mode completion reward"},
      {name:"Dragon Scale", hidden:false, note:"Double mode completion reward"},
      {name:"Metal Coat",   hidden:false, note:"Knockout mode completion reward"},
      {name:"King's Rock",  hidden:false, note:"Mixed mode completion reward"},
      {name:"Nanab Berry",  hidden:true,  note:"Exterior, near the entrance"},
      {name:"Pearl",        hidden:true, recurring:true, note:"Beach, three steps west of the sign"},
      {name:"Big Pearl",    hidden:true, recurring:true, note:"Beach, north of the sign"},
    ],
    trainers:[] },

// ─── PART 20 — Cerulean Cave · Indigo Plateau Round 2 ────────────────────────

  { part:"Part 20", id:"cerulean-cave", name:"Cerulean Cave",
    note:"Unlocked after becoming Champion. Three floors packed with high-level Pokémon including Ditto, Wobbuffet, and Kadabra. Mewtwo waits at the deepest point of B1F.",
    floors:[
      { label:"1F",
        pokemon:[
          {name:"Parasect",  method:"Cave",       levels:"49–58", rate:"25%"},
          {name:"Magneton",  method:"Cave",       levels:"49",    rate:"20%"},
          {name:"Golbat",    method:"Cave",       levels:"46–55", rate:"14%"},
          {name:"Primeape",  method:"Cave",       levels:"52–61", rate:"11%"},
          {name:"Ditto",     method:"Cave",       levels:"52–61", rate:"11%"},
          {name:"Machoke",   method:"Cave",       levels:"46",    rate:"10%"},
          {name:"Electrode", method:"Cave",       levels:"58",    rate:"5%"},
          {name:"Wobbuffet", method:"Cave",       levels:"55",    rate:"4%"},
          {name:"Psyduck",   method:"Surf",       levels:"30–50", rate:"65%", hgOnly:true},
          {name:"Slowpoke",  method:"Surf",       levels:"30–50", rate:"65%", ssOnly:true},
          {name:"Golduck",   method:"Surf",       levels:"40–55", rate:"35%", hgOnly:true},
          {name:"Slowbro",   method:"Surf",       levels:"40–55", rate:"35%", ssOnly:true},
          {name:"Magikarp",  method:"Old Rod",    levels:"5",     rate:"100%"},
          {name:"Poliwag",   method:"Good Rod",   levels:"5–15",  rate:"60%"},
          {name:"Goldeen",   method:"Good Rod",   levels:"5–15",  rate:"20%"},
          {name:"Magikarp",  method:"Good Rod",   levels:"5–15",  rate:"20%"},
          {name:"Poliwag",   method:"Super Rod",  levels:"15–25", rate:"40%"},
          {name:"Poliwhirl", method:"Super Rod",  levels:"20–30", rate:"40%"},
          {name:"Gyarados",  method:"Super Rod",  levels:"15–25", rate:"15%"},
          {name:"Psyduck",   method:"Super Rod",  levels:"15–35", rate:"5%",  hgOnly:true},
          {name:"Slowpoke",  method:"Super Rod",  levels:"15–35", rate:"5%",  ssOnly:true},
          {name:"Geodude",   method:"Rock Smash", levels:"30–50", rate:"65%"},
          {name:"Graveler",  method:"Rock Smash", levels:"40–55", rate:"35%"},
        ],
        items:[
          {name:"Nugget",      hidden:false, note:"Western ridge, north side"},
          {name:"Ultra Ball",  hidden:true,  note:"Two steps east of the north ladder on the western ridge"},
          {name:"Max Elixir",  hidden:false, note:"Middle ridge, northwest of the eastern ladder"},
          {name:"Full Restore",hidden:false, note:"Southwest area"},
        ],
        trainers:[] },
      { label:"2F",
        pokemon:[
          {name:"Golbat",    method:"Cave",       levels:"49–58", rate:"25%"},
          {name:"Machoke",   method:"Cave",       levels:"49",    rate:"20%"},
          {name:"Parasect",  method:"Cave",       levels:"52–61", rate:"14%"},
          {name:"Kadabra",   method:"Cave",       levels:"55–64", rate:"11%"},
          {name:"Ditto",     method:"Cave",       levels:"55–64", rate:"11%"},
          {name:"Magneton",  method:"Cave",       levels:"52",    rate:"10%"},
          {name:"Wobbuffet", method:"Cave",       levels:"58",    rate:"5%"},
          {name:"Electrode", method:"Cave",       levels:"61",    rate:"4%"},
          {name:"Geodude",   method:"Rock Smash", levels:"35–55", rate:"65%"},
          {name:"Graveler",  method:"Rock Smash", levels:"45–60", rate:"35%"},
        ],
        items:[
          {name:"Full Restore",hidden:false, note:"Northeast section (via northeast 1F ladder, requires Rock Smash)"},
          {name:"PP Up",       hidden:false, note:"Southwest section (via southwest 1F ladder, requires Rock Smash)"},
          {name:"Ultra Ball",  hidden:false, note:"East section (via east 1F ladder, requires Rock Smash)"},
        ],
        trainers:[] },
      { label:"B1F",
        pokemon:[
          {name:"Kadabra",   method:"Cave",       levels:"58–67", rate:"25%"},
          {name:"Ditto",     method:"Cave",       levels:"58–67", rate:"25%"},
          {name:"Parasect",  method:"Cave",       levels:"55–64", rate:"14%"},
          {name:"Golbat",    method:"Cave",       levels:"52–61", rate:"11%"},
          {name:"Machoke",   method:"Cave",       levels:"52",    rate:"10%"},
          {name:"Magneton",  method:"Cave",       levels:"55",    rate:"10%"},
          {name:"Electrode", method:"Cave",       levels:"64",    rate:"4%"},
          {name:"Wobbuffet", method:"Cave",       levels:"61",    rate:"1%"},
          {name:"Mewtwo",    method:"Cave",       levels:"70",    rate:"—",   warn:true, note:"One-time encounter at the deepest point of B1F — save before approaching"},
          {name:"Psyduck",   method:"Surf",       levels:"40–60", rate:"65%", hgOnly:true},
          {name:"Slowpoke",  method:"Surf",       levels:"40–60", rate:"65%", ssOnly:true},
          {name:"Golduck",   method:"Surf",       levels:"50–65", rate:"35%", hgOnly:true},
          {name:"Slowbro",   method:"Surf",       levels:"50–65", rate:"35%", ssOnly:true},
          {name:"Magikarp",  method:"Old Rod",    levels:"5",     rate:"100%"},
          {name:"Poliwag",   method:"Good Rod",   levels:"5–15",  rate:"60%"},
          {name:"Goldeen",   method:"Good Rod",   levels:"5–15",  rate:"20%"},
          {name:"Magikarp",  method:"Good Rod",   levels:"5–15",  rate:"20%"},
          {name:"Poliwag",   method:"Super Rod",  levels:"15–25", rate:"40%"},
          {name:"Poliwhirl", method:"Super Rod",  levels:"20–30", rate:"40%"},
          {name:"Gyarados",  method:"Super Rod",  levels:"15–35", rate:"16%"},
          {name:"Psyduck",   method:"Super Rod",  levels:"15–25", rate:"4%",  hgOnly:true},
          {name:"Slowpoke",  method:"Super Rod",  levels:"15–25", rate:"4%",  ssOnly:true},
          {name:"Geodude",   method:"Rock Smash", levels:"40–60", rate:"65%"},
          {name:"Graveler",  method:"Rock Smash", levels:"50–65", rate:"35%"},
        ],
        items:[
          {name:"Max Revive", hidden:false, note:"Northeast corner"},
          {name:"Ultra Ball", hidden:false, note:"Larger central ridge"},
        ],
        trainers:[] },
    ] },

  { part:"Part 20", id:"indigo-plateau-r2", name:"Indigo Plateau — Round 2",
    note:"Elite Four rematch, available after becoming Champion. All trainers field significantly stronger Pokémon including Johto species. Rematches can be repeated indefinitely.",
    pokemon:[],
    items:[],
    trainers:[
      {class:"Elite Four",name:"Lorelei",note:"Ice-type specialist — Round 2",
        team:[{name:"Dewgong",level:64},{name:"Cloyster",level:63},{name:"Piloswine",level:63},{name:"Jynx",level:66},{name:"Lapras",level:66}]},
      {class:"Elite Four",name:"Bruno",  note:"Fighting-type specialist — Round 2",
        team:[{name:"Steelix",level:65},{name:"Hitmonchan",level:65},{name:"Hitmonlee",level:65},{name:"Steelix",level:66},{name:"Machamp",level:68}]},
      {class:"Elite Four",name:"Agatha", note:"Ghost-type specialist — Round 2",
        team:[{name:"Gengar",level:66},{name:"Crobat",level:66},{name:"Misdreavus",level:65},{name:"Arbok",level:68},{name:"Gengar",level:70}]},
      {class:"Elite Four",name:"Lance",  note:"Dragon-type specialist — Round 2",
        team:[{name:"Gyarados",level:68},{name:"Dragonite",level:66},{name:"Kingdra",level:66},{name:"Aerodactyl",level:70},{name:"Dragonite",level:72}]},
      {class:"Rival",name:"Blue",note:"Champion Round 2 — vs Bulbasaur starter",
        team:[{name:"Heracross",level:72},{name:"Alakazam",level:73},{name:"Tyranitar",level:72},{name:"Exeggutor",level:73},{name:"Gyarados",level:73},{name:"Charizard",level:75}]},
      {class:"Rival",name:"Blue",note:"Champion Round 2 — vs Charmander starter",
        team:[{name:"Heracross",level:72},{name:"Alakazam",level:73},{name:"Tyranitar",level:72},{name:"Arcanine",level:73},{name:"Exeggutor",level:73},{name:"Blastoise",level:75}]},
      {class:"Rival",name:"Blue",note:"Champion Round 2 — vs Squirtle starter",
        team:[{name:"Heracross",level:72},{name:"Alakazam",level:73},{name:"Tyranitar",level:72},{name:"Gyarados",level:73},{name:"Arcanine",level:73},{name:"Venusaur",level:75}]},
    ] },

  { part:"Part 21", id:"birth-island", name:"Birth Island",
    note:"Event-only island — requires the AuroraTicket obtained via Mystery Gift. After solving the triangular rock puzzle, Deoxys appears at Lv 30. Once caught, it transforms into Attack Forme (FR) or Defense Forme (LG). Respawns after entering the Hall of Fame if defeated.",
    pokemon:[
      {name:"Deoxys", method:"Event", levels:"30", warn:true, note:"Solve the rock puzzle to trigger the encounter. Attack Forme in FR · Defense Forme in LG."},
    ],
    items:[],
    trainers:[] },

  { part:"Part 21", id:"navel-rock", name:"Navel Rock",
    note:"Event-only island — requires the MysticTicket obtained via Mystery Gift. The cave forks at B1F: ascend to the summit for Ho-Oh, descend to the depths for Lugia. Both respawn after entering the Hall of Fame if defeated.",
    floors:[
      { label:"Summit (4F)",
        pokemon:[
          {name:"Ho-Oh", method:"Cave", levels:"70", warn:true, note:"At the top of Navel Rock."},
        ],
        items:[
          {name:"Sacred Ash", hidden:true, note:"On the spot where Ho-Oh stood (requires Itemfinder)"},
        ],
        trainers:[] },
      { label:"Depths (B14F)",
        pokemon:[
          {name:"Lugia", method:"Cave", levels:"70", warn:true, note:"At the deepest point of Navel Rock."},
        ],
        items:[],
        trainers:[] },
    ] },

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
const BEST_AREA_MAP = { fr:{}, lg:{} };
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
const LEARNSETS = {
  "Bulbasaur":   [{lv:1,move:"Tackle"},{lv:4,move:"Growl"},{lv:7,move:"Leech Seed"},{lv:10,move:"Vine Whip"},{lv:15,move:"PoisonPowder"},{lv:15,move:"Sleep Powder"},{lv:20,move:"Razor Leaf"},{lv:25,move:"Sweet Scent"},{lv:32,move:"Growth"},{lv:39,move:"Synthesis"},{lv:46,move:"SolarBeam"}],
  "Ivysaur":     [{lv:1,move:"Tackle"},{lv:1,move:"Growl"},{lv:1,move:"Leech Seed"},{lv:10,move:"Vine Whip"},{lv:15,move:"PoisonPowder"},{lv:15,move:"Sleep Powder"},{lv:22,move:"Razor Leaf"},{lv:29,move:"Sweet Scent"},{lv:38,move:"Growth"},{lv:47,move:"Synthesis"},{lv:56,move:"SolarBeam"}],
  "Venusaur":    [{lv:1,move:"Tackle"},{lv:1,move:"Growl"},{lv:1,move:"Leech Seed"},{lv:1,move:"Vine Whip"},{lv:15,move:"PoisonPowder"},{lv:15,move:"Sleep Powder"},{lv:22,move:"Razor Leaf"},{lv:29,move:"Sweet Scent"},{lv:41,move:"Growth"},{lv:53,move:"Synthesis"},{lv:65,move:"SolarBeam"}],
  "Charmander":  [{lv:1,move:"Scratch"},{lv:1,move:"Growl"},{lv:7,move:"Ember"},{lv:13,move:"Metal Claw"},{lv:19,move:"SmokeScreen"},{lv:25,move:"Scary Face"},{lv:31,move:"Flamethrower"},{lv:37,move:"Slash"},{lv:43,move:"Dragon Rage"},{lv:49,move:"Fire Spin"}],
  "Charmeleon":  [{lv:1,move:"Scratch"},{lv:1,move:"Growl"},{lv:1,move:"Ember"},{lv:13,move:"Metal Claw"},{lv:20,move:"SmokeScreen"},{lv:27,move:"Scary Face"},{lv:34,move:"Flamethrower"},{lv:41,move:"Slash"},{lv:48,move:"Dragon Rage"},{lv:55,move:"Fire Spin"}],
  "Charizard":   [{lv:1,move:"Scratch"},{lv:1,move:"Growl"},{lv:1,move:"Ember"},{lv:1,move:"Metal Claw"},{lv:20,move:"SmokeScreen"},{lv:27,move:"Rage"},{lv:34,move:"Scary Face"},{lv:36,move:"Flamethrower"},{lv:36,move:"Wing Attack"},{lv:44,move:"Slash"},{lv:54,move:"Dragon Rage"},{lv:64,move:"Fire Spin"}],
  "Squirtle":    [{lv:1,move:"Tackle"},{lv:4,move:"Tail Whip"},{lv:7,move:"Bubble"},{lv:10,move:"Withdraw"},{lv:13,move:"Water Gun"},{lv:18,move:"Bite"},{lv:23,move:"Rapid Spin"},{lv:28,move:"Protect"},{lv:33,move:"Rain Dance"},{lv:40,move:"Skull Bash"},{lv:47,move:"Hydro Pump"}],
  "Wartortle":   [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Bubble"},{lv:10,move:"Withdraw"},{lv:13,move:"Water Gun"},{lv:19,move:"Bite"},{lv:25,move:"Rapid Spin"},{lv:31,move:"Protect"},{lv:37,move:"Rain Dance"},{lv:45,move:"Skull Bash"},{lv:53,move:"Hydro Pump"}],
  "Blastoise":   [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Bubble"},{lv:1,move:"Withdraw"},{lv:13,move:"Water Gun"},{lv:19,move:"Bite"},{lv:25,move:"Rapid Spin"},{lv:31,move:"Protect"},{lv:42,move:"Rain Dance"},{lv:55,move:"Skull Bash"},{lv:68,move:"Hydro Pump"}],
  "Caterpie":    [{lv:1,move:"Tackle"},{lv:1,move:"String Shot"}],
  "Metapod":     [{lv:1,move:"Harden"}],
  "Butterfree":  [{lv:1,move:"Confusion"},{lv:13,move:"PoisonPowder"},{lv:14,move:"Stun Spore"},{lv:15,move:"Sleep Powder"},{lv:18,move:"Supersonic"},{lv:23,move:"Whirlwind"},{lv:28,move:"Gust"},{lv:34,move:"Psybeam"},{lv:40,move:"Safeguard"},{lv:47,move:"Silver Wind"}],
  "Weedle":      [{lv:1,move:"Poison Sting"},{lv:1,move:"String Shot"}],
  "Kakuna":      [{lv:1,move:"Harden"}],
  "Beedrill":    [{lv:1,move:"Poison Sting"},{lv:1,move:"Fury Attack"},{lv:15,move:"Focus Energy"},{lv:20,move:"Twineedle"},{lv:25,move:"Rage"},{lv:30,move:"Pursuit"},{lv:35,move:"Pin Missile"},{lv:40,move:"Agility"},{lv:45,move:"Endeavor"}],
  "Pidgey":      [{lv:1,move:"Tackle"},{lv:5,move:"Sand-Attack"},{lv:9,move:"Gust"},{lv:13,move:"Quick Attack"},{lv:19,move:"Whirlwind"},{lv:25,move:"Wing Attack"},{lv:31,move:"FeatherDance"},{lv:39,move:"Agility"},{lv:47,move:"Mirror Move"}],
  "Pidgeotto":   [{lv:1,move:"Tackle"},{lv:1,move:"Sand-Attack"},{lv:1,move:"Gust"},{lv:13,move:"Quick Attack"},{lv:20,move:"Whirlwind"},{lv:27,move:"Wing Attack"},{lv:34,move:"FeatherDance"},{lv:43,move:"Agility"},{lv:52,move:"Mirror Move"}],
  "Pidgeot":     [{lv:1,move:"Tackle"},{lv:1,move:"Sand-Attack"},{lv:1,move:"Gust"},{lv:1,move:"Quick Attack"},{lv:20,move:"Whirlwind"},{lv:27,move:"Wing Attack"},{lv:34,move:"FeatherDance"},{lv:48,move:"Agility"},{lv:62,move:"Mirror Move"}],
  "Rattata":     [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:7,move:"Quick Attack"},{lv:13,move:"Hyper Fang"},{lv:20,move:"Focus Energy"},{lv:27,move:"Pursuit"},{lv:34,move:"Super Fang"},{lv:41,move:"Endeavor"}],
  "Raticate":    [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Quick Attack"},{lv:13,move:"Hyper Fang"},{lv:20,move:"Scary Face"},{lv:30,move:"Pursuit"},{lv:40,move:"Super Fang"},{lv:50,move:"Endeavor"}],
  "Spearow":     [{lv:1,move:"Peck"},{lv:1,move:"Growl"},{lv:7,move:"Leer"},{lv:13,move:"Fury Attack"},{lv:19,move:"Pursuit"},{lv:25,move:"Aerial Ace"},{lv:31,move:"Mirror Move"},{lv:37,move:"Drill Peck"},{lv:43,move:"Agility"}],
  "Fearow":      [{lv:1,move:"Peck"},{lv:1,move:"Growl"},{lv:1,move:"Leer"},{lv:1,move:"Fury Attack"},{lv:26,move:"Pursuit"},{lv:32,move:"Mirror Move"},{lv:40,move:"Drill Peck"},{lv:47,move:"Agility"}],
  "Ekans":       [{lv:1,move:"Wrap"},{lv:1,move:"Leer"},{lv:8,move:"Poison Sting"},{lv:13,move:"Bite"},{lv:20,move:"Glare"},{lv:25,move:"Screech"},{lv:32,move:"Acid"},{lv:37,move:"Stockpile"},{lv:37,move:"Swallow"},{lv:37,move:"Spit Up"},{lv:44,move:"Haze"}],
  "Arbok":       [{lv:1,move:"Wrap"},{lv:1,move:"Leer"},{lv:1,move:"Poison Sting"},{lv:1,move:"Bite"},{lv:20,move:"Glare"},{lv:28,move:"Screech"},{lv:38,move:"Acid"},{lv:46,move:"Stockpile"},{lv:46,move:"Swallow"},{lv:46,move:"Spit Up"},{lv:56,move:"Haze"}],
  "Pikachu":     [{lv:1,move:"ThunderShock"},{lv:1,move:"Growl"},{lv:6,move:"Tail Whip"},{lv:8,move:"Thunder Wave"},{lv:11,move:"Quick Attack"},{lv:15,move:"Double Team"},{lv:20,move:"Slam"},{lv:26,move:"Thunderbolt"},{lv:33,move:"Agility"},{lv:41,move:"Thunder"},{lv:50,move:"Light Screen"}],
  "Raichu":      [{lv:1,move:"ThunderShock"},{lv:1,move:"Tail Whip"},{lv:1,move:"Quick Attack"},{lv:1,move:"Thunderbolt"}],
  "Sandshrew":   [{lv:1,move:"Scratch"},{lv:6,move:"Defense Curl"},{lv:11,move:"Sand-Attack"},{lv:17,move:"Poison Sting"},{lv:23,move:"Slash"},{lv:30,move:"Swift"},{lv:37,move:"Fury Swipes"},{lv:45,move:"Sand Tomb"},{lv:53,move:"Sandstorm"}],
  "Sandslash":   [{lv:1,move:"Scratch"},{lv:1,move:"Defense Curl"},{lv:1,move:"Sand-Attack"},{lv:17,move:"Poison Sting"},{lv:24,move:"Slash"},{lv:33,move:"Swift"},{lv:42,move:"Fury Swipes"},{lv:52,move:"Sand Tomb"},{lv:62,move:"Sandstorm"}],
  "Nidoran♀":   [{lv:1,move:"Growl"},{lv:1,move:"Scratch"},{lv:8,move:"Tail Whip"},{lv:12,move:"Double Kick"},{lv:17,move:"Poison Sting"},{lv:20,move:"Bite"},{lv:23,move:"Helping Hand"},{lv:30,move:"Fury Swipes"},{lv:38,move:"Flatter"},{lv:47,move:"Crunch"}],
  "Nidorina":    [{lv:1,move:"Growl"},{lv:1,move:"Scratch"},{lv:8,move:"Tail Whip"},{lv:12,move:"Double Kick"},{lv:18,move:"Poison Sting"},{lv:22,move:"Bite"},{lv:26,move:"Helping Hand"},{lv:34,move:"Fury Swipes"},{lv:43,move:"Flatter"},{lv:53,move:"Crunch"}],
  "Nidoqueen":   [{lv:1,move:"Scratch"},{lv:1,move:"Tail Whip"},{lv:1,move:"Double Kick"},{lv:1,move:"Poison Sting"},{lv:23,move:"Body Slam"},{lv:43,move:"Superpower"}],
  "Nidoran♂":   [{lv:1,move:"Leer"},{lv:1,move:"Peck"},{lv:8,move:"Focus Energy"},{lv:12,move:"Double Kick"},{lv:17,move:"Poison Sting"},{lv:20,move:"Horn Attack"},{lv:23,move:"Helping Hand"},{lv:30,move:"Fury Attack"},{lv:38,move:"Flatter"},{lv:47,move:"Horn Drill"}],
  "Nidorino":    [{lv:1,move:"Leer"},{lv:1,move:"Peck"},{lv:8,move:"Focus Energy"},{lv:12,move:"Double Kick"},{lv:18,move:"Poison Sting"},{lv:22,move:"Horn Attack"},{lv:26,move:"Helping Hand"},{lv:34,move:"Fury Attack"},{lv:43,move:"Flatter"},{lv:53,move:"Horn Drill"}],
  "Nidoking":    [{lv:1,move:"Peck"},{lv:1,move:"Focus Energy"},{lv:1,move:"Double Kick"},{lv:1,move:"Poison Sting"},{lv:23,move:"Thrash"},{lv:43,move:"Megahorn"}],
  "Clefairy":    [{lv:1,move:"Pound"},{lv:1,move:"Growl"},{lv:5,move:"Encore"},{lv:9,move:"Sing"},{lv:13,move:"DoubleSlap"},{lv:17,move:"Follow Me"},{lv:21,move:"Minimize"},{lv:25,move:"Defense Curl"},{lv:29,move:"Metronome"},{lv:33,move:"Cosmic Power"},{lv:37,move:"Moonlight"},{lv:41,move:"Light Screen"},{lv:45,move:"Meteor Mash"}],
  "Clefable":    [{lv:1,move:"Sing"},{lv:1,move:"DoubleSlap"},{lv:1,move:"Minimize"},{lv:1,move:"Metronome"}],
  "Vulpix":      [{lv:1,move:"Ember"},{lv:5,move:"Tail Whip"},{lv:9,move:"Roar"},{lv:13,move:"Quick Attack"},{lv:17,move:"Will-O-Wisp"},{lv:21,move:"Confuse Ray"},{lv:25,move:"Imprison"},{lv:29,move:"Flamethrower"},{lv:33,move:"Safeguard"},{lv:37,move:"Grudge"},{lv:41,move:"Fire Spin"}],
  "Ninetales":   [{lv:1,move:"Ember"},{lv:1,move:"Quick Attack"},{lv:1,move:"Confuse Ray"},{lv:1,move:"Safeguard"},{lv:45,move:"Fire Spin"}],
  "Jigglypuff":  [{lv:1,move:"Sing"},{lv:4,move:"Defense Curl"},{lv:9,move:"Pound"},{lv:14,move:"Disable"},{lv:19,move:"Rollout"},{lv:24,move:"DoubleSlap"},{lv:29,move:"Rest"},{lv:34,move:"Body Slam"},{lv:39,move:"Mimic"},{lv:44,move:"Hyper Voice"},{lv:49,move:"Double-Edge"}],
  "Wigglytuff":  [{lv:1,move:"Sing"},{lv:1,move:"Disable"},{lv:1,move:"Defense Curl"},{lv:1,move:"DoubleSlap"}],
  "Zubat":       [{lv:1,move:"Leech Life"},{lv:6,move:"Supersonic"},{lv:6,move:"Astonish"},{lv:16,move:"Bite"},{lv:21,move:"Wing Attack"},{lv:26,move:"Confuse Ray"},{lv:36,move:"Air Cutter"},{lv:41,move:"Mean Look"},{lv:46,move:"Poison Fang"},{lv:46,move:"Haze"}],
  "Golbat":      [{lv:1,move:"Screech"},{lv:1,move:"Leech Life"},{lv:1,move:"Supersonic"},{lv:1,move:"Astonish"},{lv:16,move:"Bite"},{lv:21,move:"Wing Attack"},{lv:28,move:"Confuse Ray"},{lv:35,move:"Air Cutter"},{lv:42,move:"Mean Look"},{lv:49,move:"Poison Fang"},{lv:56,move:"Haze"}],
  "Oddish":      [{lv:1,move:"Absorb"},{lv:7,move:"Sweet Scent"},{lv:14,move:"PoisonPowder"},{lv:16,move:"Stun Spore"},{lv:18,move:"Sleep Powder"},{lv:23,move:"Acid"},{lv:32,move:"Moonlight"},{lv:39,move:"Petal Dance"}],
  "Gloom":       [{lv:1,move:"Absorb"},{lv:1,move:"Sweet Scent"},{lv:1,move:"PoisonPowder"},{lv:16,move:"Stun Spore"},{lv:18,move:"Sleep Powder"},{lv:24,move:"Acid"},{lv:35,move:"Moonlight"},{lv:44,move:"Petal Dance"}],
  "Vileplume":   [{lv:1,move:"Aromatherapy"},{lv:1,move:"Absorb"},{lv:1,move:"Mega Drain"},{lv:1,move:"Stun Spore"},{lv:44,move:"Petal Dance"}],
  "Paras":       [{lv:1,move:"Scratch"},{lv:7,move:"Stun Spore"},{lv:13,move:"PoisonPowder"},{lv:19,move:"Leech Life"},{lv:25,move:"Spore"},{lv:31,move:"Slash"},{lv:37,move:"Growth"},{lv:43,move:"Giga Drain"},{lv:49,move:"Aromatherapy"}],
  "Parasect":    [{lv:1,move:"Scratch"},{lv:1,move:"Stun Spore"},{lv:1,move:"PoisonPowder"},{lv:27,move:"Spore"},{lv:35,move:"Slash"},{lv:43,move:"Growth"},{lv:51,move:"Giga Drain"},{lv:59,move:"Aromatherapy"}],
  "Venonat":     [{lv:1,move:"Tackle"},{lv:1,move:"Disable"},{lv:1,move:"Foresight"},{lv:9,move:"Supersonic"},{lv:17,move:"Confusion"},{lv:20,move:"PoisonPowder"},{lv:25,move:"Leech Life"},{lv:28,move:"Stun Spore"},{lv:33,move:"Psybeam"},{lv:36,move:"Sleep Powder"},{lv:41,move:"Psychic"}],
  "Venomoth":    [{lv:1,move:"Silver Wind"},{lv:1,move:"Tackle"},{lv:1,move:"Disable"},{lv:1,move:"Foresight"},{lv:1,move:"Supersonic"},{lv:17,move:"Confusion"},{lv:20,move:"PoisonPowder"},{lv:25,move:"Leech Life"},{lv:28,move:"Stun Spore"},{lv:31,move:"Gust"},{lv:36,move:"Psybeam"},{lv:42,move:"Sleep Powder"},{lv:52,move:"Psychic"}],
  "Diglett":     [{lv:1,move:"Scratch"},{lv:1,move:"Sand-Attack"},{lv:5,move:"Growl"},{lv:21,move:"Fury Swipes"},{lv:25,move:"Mud-Slap"},{lv:33,move:"Slash"},{lv:41,move:"Earthquake"},{lv:49,move:"Fissure"}],
  "Dugtrio":     [{lv:1,move:"Tri Attack"},{lv:1,move:"Scratch"},{lv:1,move:"Sand-Attack"},{lv:1,move:"Growl"},{lv:9,move:"Magnitude"},{lv:17,move:"Dig"},{lv:21,move:"Fury Swipes"},{lv:25,move:"Mud-Slap"},{lv:26,move:"Sand Tomb"},{lv:38,move:"Slash"},{lv:51,move:"Earthquake"},{lv:64,move:"Fissure"}],
  "Meowth":      [{lv:1,move:"Scratch"},{lv:1,move:"Growl"},{lv:11,move:"Bite"},{lv:20,move:"Pay Day"},{lv:28,move:"Faint Attack"},{lv:35,move:"Screech"},{lv:41,move:"Fury Swipes"},{lv:46,move:"Slash"},{lv:50,move:"Fake Out"}],
  "Persian":     [{lv:1,move:"Scratch"},{lv:1,move:"Growl"},{lv:1,move:"Bite"},{lv:20,move:"Pay Day"},{lv:29,move:"Faint Attack"},{lv:38,move:"Screech"},{lv:46,move:"Fury Swipes"},{lv:53,move:"Slash"},{lv:59,move:"Fake Out"},{lv:61,move:"Swagger"}],
  "Psyduck":     [{lv:1,move:"Scratch"},{lv:1,move:"Water Sport"},{lv:5,move:"Tail Whip"},{lv:10,move:"Disable"},{lv:16,move:"Confusion"},{lv:23,move:"Screech"},{lv:31,move:"Psych Up"},{lv:40,move:"Fury Swipes"},{lv:50,move:"Hydro Pump"}],
  "Golduck":     [{lv:1,move:"Scratch"},{lv:1,move:"Water Sport"},{lv:1,move:"Tail Whip"},{lv:1,move:"Disable"},{lv:16,move:"Confusion"},{lv:23,move:"Screech"},{lv:31,move:"Psych Up"},{lv:44,move:"Fury Swipes"},{lv:58,move:"Hydro Pump"}],
  "Mankey":      [{lv:1,move:"Scratch"},{lv:1,move:"Leer"},{lv:6,move:"Karate Chop"},{lv:9,move:"Low Kick"},{lv:21,move:"Fury Swipes"},{lv:27,move:"Focus Energy"},{lv:33,move:"Seismic Toss"},{lv:39,move:"Cross Chop"},{lv:45,move:"Screech"},{lv:51,move:"Thrash"}],
  "Primeape":    [{lv:1,move:"Scratch"},{lv:1,move:"Leer"},{lv:1,move:"Low Kick"},{lv:1,move:"Rage"},{lv:15,move:"Karate Chop"},{lv:21,move:"Fury Swipes"},{lv:27,move:"Focus Energy"},{lv:36,move:"Seismic Toss"},{lv:45,move:"Cross Chop"},{lv:54,move:"Screech"},{lv:63,move:"Thrash"}],
  "Growlithe":   [{lv:1,move:"Bite"},{lv:1,move:"Roar"},{lv:7,move:"Ember"},{lv:13,move:"Leer"},{lv:19,move:"Odor Sleuth"},{lv:25,move:"Take Down"},{lv:31,move:"Flame Wheel"},{lv:37,move:"Helping Hand"},{lv:43,move:"Agility"},{lv:49,move:"Flamethrower"}],
  "Arcanine":    [{lv:1,move:"Bite"},{lv:1,move:"Roar"},{lv:1,move:"Ember"},{lv:1,move:"Odor Sleuth"},{lv:49,move:"ExtremeSpeed"}],
  "Poliwag":     [{lv:1,move:"Bubble"},{lv:7,move:"Hypnosis"},{lv:13,move:"Water Gun"},{lv:19,move:"DoubleSlap"},{lv:25,move:"Rain Dance"},{lv:31,move:"Body Slam"},{lv:37,move:"Belly Drum"},{lv:43,move:"Hydro Pump"}],
  "Poliwhirl":   [{lv:1,move:"Bubble"},{lv:1,move:"Hypnosis"},{lv:1,move:"Water Gun"},{lv:19,move:"DoubleSlap"},{lv:27,move:"Rain Dance"},{lv:35,move:"Body Slam"},{lv:43,move:"Belly Drum"},{lv:51,move:"Hydro Pump"}],
  "Poliwrath":   [{lv:1,move:"Water Gun"},{lv:1,move:"Hypnosis"},{lv:1,move:"DoubleSlap"},{lv:1,move:"Submission"},{lv:35,move:"Submission"},{lv:51,move:"Mind Reader"}],
  "Abra":        [{lv:1,move:"Teleport"}],
  "Kadabra":     [{lv:1,move:"Teleport"},{lv:1,move:"Kinesis"},{lv:1,move:"Confusion"},{lv:18,move:"Disable"},{lv:21,move:"Psybeam"},{lv:23,move:"Reflect"},{lv:25,move:"Recover"},{lv:30,move:"Future Sight"},{lv:33,move:"Role Play"},{lv:36,move:"Psychic"},{lv:43,move:"Trick"}],
  "Alakazam":    [{lv:1,move:"Teleport"},{lv:1,move:"Kinesis"},{lv:1,move:"Confusion"},{lv:18,move:"Disable"},{lv:21,move:"Psybeam"},{lv:23,move:"Reflect"},{lv:25,move:"Recover"},{lv:30,move:"Future Sight"},{lv:33,move:"Calm Mind"},{lv:36,move:"Psychic"},{lv:43,move:"Trick"}],
  "Machop":      [{lv:1,move:"Low Kick"},{lv:1,move:"Leer"},{lv:7,move:"Focus Energy"},{lv:13,move:"Karate Chop"},{lv:19,move:"Seismic Toss"},{lv:22,move:"Foresight"},{lv:25,move:"Revenge"},{lv:31,move:"Vital Throw"},{lv:37,move:"Submission"},{lv:40,move:"Cross Chop"},{lv:43,move:"Scary Face"},{lv:49,move:"DynamicPunch"}],
  "Machoke":     [{lv:1,move:"Low Kick"},{lv:1,move:"Leer"},{lv:1,move:"Focus Energy"},{lv:13,move:"Karate Chop"},{lv:19,move:"Seismic Toss"},{lv:22,move:"Foresight"},{lv:25,move:"Revenge"},{lv:33,move:"Vital Throw"},{lv:41,move:"Submission"},{lv:46,move:"Cross Chop"},{lv:51,move:"Scary Face"},{lv:59,move:"DynamicPunch"}],
  "Machamp":     [{lv:1,move:"Low Kick"},{lv:1,move:"Leer"},{lv:1,move:"Focus Energy"},{lv:13,move:"Karate Chop"},{lv:19,move:"Seismic Toss"},{lv:22,move:"Foresight"},{lv:25,move:"Revenge"},{lv:33,move:"Vital Throw"},{lv:41,move:"Submission"},{lv:46,move:"Cross Chop"},{lv:51,move:"Scary Face"},{lv:59,move:"DynamicPunch"}],
  "Bellsprout":  [{lv:1,move:"Vine Whip"},{lv:6,move:"Growth"},{lv:11,move:"Wrap"},{lv:15,move:"Sleep Powder"},{lv:17,move:"PoisonPowder"},{lv:19,move:"Stun Spore"},{lv:23,move:"Acid"},{lv:30,move:"Sweet Scent"},{lv:37,move:"Razor Leaf"},{lv:45,move:"Slam"}],
  "Weepinbell":  [{lv:1,move:"Vine Whip"},{lv:1,move:"Growth"},{lv:1,move:"Wrap"},{lv:15,move:"Sleep Powder"},{lv:17,move:"PoisonPowder"},{lv:19,move:"Stun Spore"},{lv:24,move:"Acid"},{lv:33,move:"Sweet Scent"},{lv:42,move:"Razor Leaf"},{lv:54,move:"Slam"}],
  "Victreebel":  [{lv:1,move:"Stockpile"},{lv:1,move:"Swallow"},{lv:1,move:"Spit Up"},{lv:1,move:"Vine Whip"},{lv:1,move:"Sweet Scent"},{lv:1,move:"Razor Leaf"},{lv:1,move:"Sleep Powder"}],
  "Tentacool":   [{lv:1,move:"Poison Sting"},{lv:6,move:"Supersonic"},{lv:12,move:"Constrict"},{lv:19,move:"Acid"},{lv:25,move:"BubbleBeam"},{lv:30,move:"Wrap"},{lv:36,move:"Barrier"},{lv:43,move:"Screech"},{lv:49,move:"Hydro Pump"}],
  "Tentacruel":  [{lv:1,move:"Poison Sting"},{lv:1,move:"Supersonic"},{lv:1,move:"Constrict"},{lv:19,move:"Acid"},{lv:25,move:"BubbleBeam"},{lv:30,move:"Wrap"},{lv:38,move:"Barrier"},{lv:47,move:"Screech"},{lv:55,move:"Hydro Pump"}],
  "Geodude":     [{lv:1,move:"Tackle"},{lv:1,move:"Defense Curl"},{lv:6,move:"Mud Sport"},{lv:11,move:"Rock Throw"},{lv:16,move:"Magnitude"},{lv:21,move:"Selfdestruct"},{lv:26,move:"Rollout"},{lv:31,move:"Rock Blast"},{lv:36,move:"Earthquake"},{lv:41,move:"Explosion"},{lv:46,move:"Double-Edge"}],
  "Graveler":    [{lv:1,move:"Tackle"},{lv:1,move:"Defense Curl"},{lv:1,move:"Mud Sport"},{lv:1,move:"Rock Throw"},{lv:16,move:"Magnitude"},{lv:21,move:"Selfdestruct"},{lv:29,move:"Rollout"},{lv:37,move:"Rock Blast"},{lv:45,move:"Earthquake"},{lv:53,move:"Explosion"},{lv:62,move:"Double-Edge"}],
  "Golem":       [{lv:1,move:"Tackle"},{lv:1,move:"Defense Curl"},{lv:1,move:"Mud Sport"},{lv:1,move:"Rock Throw"},{lv:16,move:"Magnitude"},{lv:21,move:"Selfdestruct"},{lv:29,move:"Rollout"},{lv:37,move:"Rock Blast"},{lv:45,move:"Earthquake"},{lv:53,move:"Explosion"},{lv:62,move:"Double-Edge"}],
  "Ponyta":      [{lv:1,move:"Tackle"},{lv:1,move:"Quick Attack"},{lv:5,move:"Growl"},{lv:9,move:"Tail Whip"},{lv:14,move:"Ember"},{lv:19,move:"Stomp"},{lv:25,move:"Fire Spin"},{lv:31,move:"Take Down"},{lv:38,move:"Agility"},{lv:45,move:"Bounce"},{lv:53,move:"Fire Blast"}],
  "Rapidash":    [{lv:1,move:"Tackle"},{lv:1,move:"Quick Attack"},{lv:1,move:"Growl"},{lv:1,move:"Tail Whip"},{lv:14,move:"Ember"},{lv:19,move:"Stomp"},{lv:25,move:"Fire Spin"},{lv:31,move:"Take Down"},{lv:38,move:"Agility"},{lv:40,move:"Fury Attack"},{lv:50,move:"Bounce"},{lv:63,move:"Fire Blast"}],
  "Slowpoke":    [{lv:1,move:"Curse"},{lv:1,move:"Tackle"},{lv:1,move:"Yawn"},{lv:6,move:"Growl"},{lv:15,move:"Water Gun"},{lv:20,move:"Confusion"},{lv:29,move:"Disable"},{lv:34,move:"Headbutt"},{lv:43,move:"Amnesia"},{lv:48,move:"Psychic"}],
  "Slowbro":     [{lv:1,move:"Curse"},{lv:1,move:"Tackle"},{lv:1,move:"Yawn"},{lv:1,move:"Growl"},{lv:15,move:"Water Gun"},{lv:20,move:"Confusion"},{lv:29,move:"Disable"},{lv:34,move:"Headbutt"},{lv:37,move:"Withdraw"},{lv:46,move:"Amnesia"},{lv:54,move:"Psychic"}],
  "Magnemite":   [{lv:1,move:"Metal Sound"},{lv:1,move:"Tackle"},{lv:6,move:"ThunderShock"},{lv:11,move:"Supersonic"},{lv:16,move:"SonicBoom"},{lv:21,move:"Thunder Wave"},{lv:26,move:"Spark"},{lv:32,move:"Lock-On"},{lv:38,move:"Swift"},{lv:44,move:"Screech"},{lv:50,move:"Zap Cannon"}],
  "Magneton":    [{lv:1,move:"Tackle"},{lv:1,move:"Metal Sound"},{lv:1,move:"ThunderShock"},{lv:1,move:"Supersonic"},{lv:16,move:"SonicBoom"},{lv:21,move:"Thunder Wave"},{lv:26,move:"Spark"},{lv:35,move:"Lock-On"},{lv:44,move:"Tri Attack"},{lv:53,move:"Screech"},{lv:62,move:"Zap Cannon"}],
  "Farfetch'd":  [{lv:1,move:"Peck"},{lv:6,move:"Sand-Attack"},{lv:6,move:"Leer"},{lv:16,move:"Fury Attack"},{lv:21,move:"Knock Off"},{lv:26,move:"Fury Cutter"},{lv:31,move:"Swords Dance"},{lv:36,move:"Agility"},{lv:41,move:"Slash"},{lv:46,move:"False Swipe"}],
  "Doduo":       [{lv:1,move:"Peck"},{lv:1,move:"Growl"},{lv:9,move:"Pursuit"},{lv:13,move:"Fury Attack"},{lv:21,move:"Tri Attack"},{lv:25,move:"Rage"},{lv:33,move:"Uproar"},{lv:37,move:"Drill Peck"},{lv:45,move:"Agility"}],
  "Dodrio":      [{lv:1,move:"Peck"},{lv:1,move:"Growl"},{lv:1,move:"Pursuit"},{lv:1,move:"Fury Attack"},{lv:21,move:"Tri Attack"},{lv:25,move:"Rage"},{lv:38,move:"Uproar"},{lv:47,move:"Drill Peck"},{lv:60,move:"Agility"}],
  "Seel":        [{lv:1,move:"Headbutt"},{lv:9,move:"Growl"},{lv:17,move:"Icy Wind"},{lv:21,move:"Aurora Beam"},{lv:29,move:"Rest"},{lv:37,move:"Take Down"},{lv:41,move:"Ice Beam"},{lv:49,move:"Safeguard"}],
  "Dewgong":     [{lv:1,move:"Signal Beam"},{lv:1,move:"Headbutt"},{lv:1,move:"Growl"},{lv:1,move:"Icy Wind"},{lv:1,move:"Aurora Beam"},{lv:29,move:"Rest"},{lv:34,move:"Sheer Cold"},{lv:42,move:"Take Down"},{lv:51,move:"Ice Beam"},{lv:64,move:"Safeguard"}],
  "Grimer":      [{lv:1,move:"Poison Gas"},{lv:1,move:"Pound"},{lv:4,move:"Harden"},{lv:8,move:"Disable"},{lv:13,move:"Sludge"},{lv:19,move:"Minimize"},{lv:26,move:"Screech"},{lv:34,move:"Acid Armor"},{lv:43,move:"Sludge Bomb"},{lv:53,move:"Memento"}],
  "Muk":         [{lv:1,move:"Poison Gas"},{lv:1,move:"Pound"},{lv:1,move:"Harden"},{lv:13,move:"Sludge"},{lv:19,move:"Minimize"},{lv:26,move:"Screech"},{lv:34,move:"Acid Armor"},{lv:47,move:"Sludge Bomb"},{lv:61,move:"Memento"}],
  "Shellder":    [{lv:1,move:"Tackle"},{lv:1,move:"Withdraw"},{lv:8,move:"Icicle Spear"},{lv:9,move:"Supersonic"},{lv:17,move:"Aurora Beam"},{lv:25,move:"Protect"},{lv:33,move:"Leer"},{lv:41,move:"Clamp"},{lv:49,move:"Ice Beam"}],
  "Cloyster":    [{lv:1,move:"Withdraw"},{lv:1,move:"Supersonic"},{lv:1,move:"Aurora Beam"},{lv:1,move:"Protect"},{lv:33,move:"Spikes"},{lv:41,move:"Spike Cannon"}],
  "Gastly":      [{lv:1,move:"Hypnosis"},{lv:1,move:"Lick"},{lv:8,move:"Spite"},{lv:13,move:"Mean Look"},{lv:16,move:"Curse"},{lv:21,move:"Night Shade"},{lv:28,move:"Confuse Ray"},{lv:33,move:"Dream Eater"},{lv:36,move:"Destiny Bond"},{lv:36,move:"Shadow Ball"},{lv:41,move:"Nightmare"}],
  "Haunter":     [{lv:1,move:"Hypnosis"},{lv:1,move:"Lick"},{lv:1,move:"Spite"},{lv:13,move:"Mean Look"},{lv:16,move:"Curse"},{lv:21,move:"Night Shade"},{lv:25,move:"Shadow Punch"},{lv:31,move:"Confuse Ray"},{lv:39,move:"Dream Eater"},{lv:48,move:"Destiny Bond"}],
  "Gengar":      [{lv:1,move:"Hypnosis"},{lv:1,move:"Lick"},{lv:1,move:"Spite"},{lv:13,move:"Mean Look"},{lv:16,move:"Curse"},{lv:21,move:"Night Shade"},{lv:25,move:"Shadow Punch"},{lv:31,move:"Confuse Ray"},{lv:39,move:"Dream Eater"},{lv:48,move:"Destiny Bond"}],
  "Onix":        [{lv:1,move:"Tackle"},{lv:1,move:"Screech"},{lv:9,move:"Bind"},{lv:13,move:"Rock Throw"},{lv:21,move:"Harden"},{lv:25,move:"Rage"},{lv:30,move:"DragonBreath"},{lv:33,move:"Sandstorm"},{lv:37,move:"Slam"},{lv:45,move:"Iron Tail"},{lv:49,move:"Sand Tomb"},{lv:57,move:"Double-Edge"}],
  "Drowzee":     [{lv:1,move:"Pound"},{lv:1,move:"Hypnosis"},{lv:10,move:"Disable"},{lv:18,move:"Confusion"},{lv:25,move:"Headbutt"},{lv:31,move:"Poison Gas"},{lv:36,move:"Meditate"},{lv:40,move:"Psychic"},{lv:41,move:"Swagger"},{lv:43,move:"Psych Up"},{lv:45,move:"Future Sight"}],
  "Hypno":       [{lv:1,move:"Nightmare"},{lv:1,move:"Pound"},{lv:1,move:"Hypnosis"},{lv:1,move:"Disable"},{lv:18,move:"Confusion"},{lv:25,move:"Headbutt"},{lv:33,move:"Poison Gas"},{lv:40,move:"Meditate"},{lv:49,move:"Psychic"},{lv:55,move:"Psych Up"},{lv:60,move:"Future Sight"}],
  "Krabby":      [{lv:1,move:"Bubble"},{lv:5,move:"Leer"},{lv:12,move:"ViceGrip"},{lv:16,move:"Harden"},{lv:23,move:"Mud Shot"},{lv:27,move:"Stomp"},{lv:34,move:"Guillotine"},{lv:41,move:"Protect"},{lv:45,move:"Crabhammer"},{lv:49,move:"Flail"}],
  "Kingler":     [{lv:1,move:"Bubble"},{lv:1,move:"Leer"},{lv:1,move:"ViceGrip"},{lv:16,move:"Harden"},{lv:23,move:"Mud Shot"},{lv:27,move:"Stomp"},{lv:38,move:"Guillotine"},{lv:49,move:"Protect"},{lv:57,move:"Crabhammer"}],
  "Voltorb":     [{lv:1,move:"Charge"},{lv:1,move:"Tackle"},{lv:8,move:"Screech"},{lv:15,move:"SonicBoom"},{lv:21,move:"Spark"},{lv:27,move:"Selfdestruct"},{lv:32,move:"Rollout"},{lv:37,move:"Light Screen"},{lv:42,move:"Swift"},{lv:46,move:"Explosion"},{lv:49,move:"Mirror Coat"}],
  "Electrode":   [{lv:1,move:"Charge"},{lv:1,move:"Tackle"},{lv:1,move:"Screech"},{lv:1,move:"SonicBoom"},{lv:8,move:"Screech"},{lv:15,move:"SonicBoom"},{lv:21,move:"Spark"},{lv:27,move:"Selfdestruct"},{lv:34,move:"Rollout"},{lv:41,move:"Light Screen"},{lv:48,move:"Swift"},{lv:54,move:"Explosion"},{lv:59,move:"Mirror Coat"}],
  "Exeggcute":   [{lv:1,move:"Uproar"},{lv:1,move:"Barrage"},{lv:1,move:"Hypnosis"},{lv:7,move:"Reflect"},{lv:13,move:"Leech Seed"},{lv:19,move:"Confusion"},{lv:25,move:"Stun Spore"},{lv:31,move:"PoisonPowder"},{lv:37,move:"Sleep Powder"},{lv:43,move:"SolarBeam"}],
  "Exeggutor":   [{lv:1,move:"Confusion"},{lv:1,move:"Barrage"},{lv:1,move:"Hypnosis"},{lv:19,move:"Stomp"},{lv:31,move:"Egg Bomb"}],
  "Cubone":      [{lv:1,move:"Growl"},{lv:5,move:"Tail Whip"},{lv:9,move:"Bone Club"},{lv:13,move:"Headbutt"},{lv:17,move:"Leer"},{lv:21,move:"Focus Energy"},{lv:25,move:"Bonemerang"},{lv:29,move:"Rage"},{lv:33,move:"False Swipe"},{lv:37,move:"Thrash"},{lv:41,move:"Bone Rush"},{lv:45,move:"Double-Edge"}],
  "Marowak":     [{lv:1,move:"Growl"},{lv:1,move:"Tail Whip"},{lv:1,move:"Bone Club"},{lv:1,move:"Headbutt"},{lv:5,move:"Tail Whip"},{lv:9,move:"Bone Club"},{lv:13,move:"Headbutt"},{lv:17,move:"Leer"},{lv:21,move:"Focus Energy"},{lv:25,move:"Bonemerang"},{lv:32,move:"Rage"},{lv:39,move:"False Swipe"},{lv:46,move:"Thrash"},{lv:53,move:"Bone Rush"},{lv:61,move:"Double-Edge"}],
  "Hitmonlee":   [{lv:1,move:"Double Kick"},{lv:1,move:"Revenge"},{lv:6,move:"Meditate"},{lv:11,move:"Rolling Kick"},{lv:16,move:"Jump Kick"},{lv:20,move:"Brick Break"},{lv:21,move:"Focus Energy"},{lv:26,move:"Hi Jump Kick"},{lv:31,move:"Mind Reader"},{lv:36,move:"Foresight"},{lv:41,move:"Endure"},{lv:46,move:"Mega Kick"},{lv:51,move:"Reversal"}],
  "Hitmonchan":  [{lv:1,move:"Comet Punch"},{lv:1,move:"Revenge"},{lv:7,move:"Agility"},{lv:13,move:"Pursuit"},{lv:20,move:"Mach Punch"},{lv:26,move:"ThunderPunch"},{lv:26,move:"Ice Punch"},{lv:26,move:"Fire Punch"},{lv:32,move:"Sky Uppercut"},{lv:38,move:"Mega Punch"},{lv:44,move:"Detect"},{lv:50,move:"Counter"}],
  "Lickitung":   [{lv:1,move:"Lick"},{lv:7,move:"Supersonic"},{lv:12,move:"Defense Curl"},{lv:18,move:"Knock Off"},{lv:23,move:"Stomp"},{lv:29,move:"Wrap"},{lv:34,move:"Disable"},{lv:40,move:"Slam"},{lv:45,move:"Screech"},{lv:51,move:"Refresh"}],
  "Koffing":     [{lv:1,move:"Poison Gas"},{lv:1,move:"Tackle"},{lv:9,move:"Smog"},{lv:17,move:"Selfdestruct"},{lv:21,move:"Sludge"},{lv:25,move:"SmokeScreen"},{lv:33,move:"Haze"},{lv:41,move:"Explosion"},{lv:45,move:"Destiny Bond"},{lv:49,move:"Memento"}],
  "Weezing":     [{lv:1,move:"Poison Gas"},{lv:1,move:"Tackle"},{lv:1,move:"Smog"},{lv:1,move:"Selfdestruct"},{lv:9,move:"Smog"},{lv:17,move:"Selfdestruct"},{lv:21,move:"Sludge"},{lv:25,move:"SmokeScreen"},{lv:33,move:"Haze"},{lv:44,move:"Explosion"},{lv:51,move:"Destiny Bond"},{lv:58,move:"Memento"}],
  "Rhyhorn":     [{lv:1,move:"Horn Attack"},{lv:1,move:"Tail Whip"},{lv:10,move:"Stomp"},{lv:15,move:"Fury Attack"},{lv:24,move:"Scary Face"},{lv:29,move:"Rock Blast"},{lv:38,move:"Horn Drill"},{lv:43,move:"Take Down"},{lv:52,move:"Earthquake"},{lv:57,move:"Megahorn"}],
  "Rhydon":      [{lv:1,move:"Horn Attack"},{lv:1,move:"Tail Whip"},{lv:1,move:"Stomp"},{lv:1,move:"Fury Attack"},{lv:10,move:"Stomp"},{lv:15,move:"Fury Attack"},{lv:24,move:"Scary Face"},{lv:29,move:"Rock Blast"},{lv:38,move:"Horn Drill"},{lv:46,move:"Take Down"},{lv:58,move:"Earthquake"},{lv:66,move:"Megahorn"}],
  "Chansey":     [{lv:1,move:"Pound"},{lv:1,move:"Growl"},{lv:5,move:"Tail Whip"},{lv:9,move:"Refresh"},{lv:13,move:"Softboiled"},{lv:17,move:"DoubleSlap"},{lv:23,move:"Minimize"},{lv:29,move:"Sing"},{lv:35,move:"Egg Bomb"},{lv:41,move:"Defense Curl"},{lv:49,move:"Light Screen"},{lv:57,move:"Double-Edge"}],
  "Tangela":     [{lv:1,move:"Ingrain"},{lv:1,move:"Constrict"},{lv:10,move:"Absorb"},{lv:13,move:"Growth"},{lv:19,move:"PoisonPowder"},{lv:22,move:"Vine Whip"},{lv:28,move:"Bind"},{lv:31,move:"Mega Drain"},{lv:37,move:"Stun Spore"},{lv:40,move:"Slam"},{lv:44,move:"Sleep Powder"},{lv:46,move:"Tickle"}],
  "Kangaskhan":  [{lv:1,move:"Comet Punch"},{lv:1,move:"Leer"},{lv:7,move:"Bite"},{lv:13,move:"Tail Whip"},{lv:19,move:"Fake Out"},{lv:25,move:"Mega Punch"},{lv:31,move:"Rage"},{lv:37,move:"Endure"},{lv:43,move:"Dizzy Punch"},{lv:49,move:"Reversal"}],
  "Horsea":      [{lv:1,move:"Bubble"},{lv:8,move:"SmokeScreen"},{lv:15,move:"Leer"},{lv:22,move:"Water Gun"},{lv:29,move:"Twister"},{lv:36,move:"Agility"},{lv:43,move:"Hydro Pump"},{lv:50,move:"Dragon Dance"}],
  "Seadra":      [{lv:1,move:"Bubble"},{lv:1,move:"SmokeScreen"},{lv:1,move:"Leer"},{lv:1,move:"Water Gun"},{lv:8,move:"SmokeScreen"},{lv:15,move:"Leer"},{lv:22,move:"Water Gun"},{lv:29,move:"Twister"},{lv:40,move:"Agility"},{lv:51,move:"Hydro Pump"},{lv:62,move:"Dragon Dance"}],
  "Goldeen":     [{lv:1,move:"Peck"},{lv:1,move:"Tail Whip"},{lv:1,move:"Water Sport"},{lv:10,move:"Supersonic"},{lv:15,move:"Horn Attack"},{lv:24,move:"Flail"},{lv:29,move:"Fury Attack"},{lv:38,move:"Waterfall"},{lv:43,move:"Horn Drill"},{lv:52,move:"Agility"},{lv:57,move:"Megahorn"}],
  "Seaking":     [{lv:1,move:"Peck"},{lv:1,move:"Tail Whip"},{lv:1,move:"Water Sport"},{lv:1,move:"Supersonic"},{lv:10,move:"Supersonic"},{lv:15,move:"Horn Attack"},{lv:24,move:"Flail"},{lv:29,move:"Fury Attack"},{lv:41,move:"Waterfall"},{lv:49,move:"Horn Drill"},{lv:61,move:"Agility"},{lv:69,move:"Megahorn"}],
  "Staryu":      [{lv:1,move:"Tackle"},{lv:1,move:"Harden"},{lv:6,move:"Water Gun"},{lv:10,move:"Rapid Spin"},{lv:15,move:"Recover"},{lv:19,move:"Camouflage"},{lv:24,move:"Swift"},{lv:28,move:"BubbleBeam"},{lv:33,move:"Minimize"},{lv:37,move:"Light Screen"},{lv:42,move:"Cosmic Power"},{lv:46,move:"Hydro Pump"}],
  "Starmie":     [{lv:1,move:"Water Gun"},{lv:1,move:"Rapid Spin"},{lv:1,move:"Recover"},{lv:1,move:"Swift"},{lv:33,move:"Confuse Ray"}],
  "Mr. Mime":    [{lv:1,move:"Barrier"},{lv:1,move:"Confusion"},{lv:13,move:"Meditate"},{lv:17,move:"DoubleSlap"},{lv:21,move:"Light Screen"},{lv:21,move:"Reflect"},{lv:25,move:"Encore"},{lv:29,move:"Psybeam"},{lv:33,move:"Recycle"},{lv:37,move:"Trick"},{lv:41,move:"Role Play"},{lv:45,move:"Psychic"},{lv:49,move:"Baton Pass"},{lv:53,move:"Safeguard"}],
  "Scyther":     [{lv:1,move:"Quick Attack"},{lv:1,move:"Leer"},{lv:1,move:"Pursuit"},{lv:6,move:"Focus Energy"},{lv:16,move:"False Swipe"},{lv:21,move:"Agility"},{lv:26,move:"Wing Attack"},{lv:31,move:"Slash"},{lv:36,move:"Swords Dance"},{lv:41,move:"Double Team"},{lv:46,move:"Fury Cutter"}],
  "Jynx":        [{lv:1,move:"Pound"},{lv:1,move:"Lick"},{lv:1,move:"Lovely Kiss"},{lv:1,move:"Powder Snow"},{lv:9,move:"Lovely Kiss"},{lv:13,move:"Powder Snow"},{lv:21,move:"DoubleSlap"},{lv:25,move:"Ice Punch"},{lv:35,move:"Mean Look"},{lv:41,move:"Fake Tears"},{lv:51,move:"Body Slam"},{lv:57,move:"Perish Song"},{lv:67,move:"Blizzard"}],
  "Electabuzz":  [{lv:1,move:"Quick Attack"},{lv:1,move:"Leer"},{lv:1,move:"ThunderPunch"},{lv:9,move:"ThunderPunch"},{lv:17,move:"Light Screen"},{lv:25,move:"Swift"},{lv:36,move:"Screech"},{lv:47,move:"Thunderbolt"},{lv:58,move:"Thunder"}],
  "Magmar":      [{lv:1,move:"Ember"},{lv:1,move:"Leer"},{lv:1,move:"Smog"},{lv:1,move:"Fire Punch"},{lv:7,move:"Leer"},{lv:13,move:"Smog"},{lv:19,move:"Fire Punch"},{lv:25,move:"SmokeScreen"},{lv:33,move:"Sunny Day"},{lv:41,move:"Flamethrower"},{lv:49,move:"Confuse Ray"},{lv:57,move:"Fire Blast"}],
  "Pinsir":      [{lv:1,move:"Vice Grip"},{lv:1,move:"Focus Energy"},{lv:7,move:"Bind"},{lv:13,move:"Seismic Toss"},{lv:19,move:"Harden"},{lv:25,move:"Revenge"},{lv:31,move:"Brick Break"},{lv:37,move:"Guillotine"},{lv:43,move:"Submission"},{lv:49,move:"Swords Dance"}],
  "Tauros":      [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:8,move:"Rage"},{lv:13,move:"Horn Attack"},{lv:19,move:"Scary Face"},{lv:26,move:"Pursuit"},{lv:26,move:"Swagger"},{lv:34,move:"Rest"},{lv:43,move:"Thrash"},{lv:53,move:"Take Down"}],
  "Magikarp":    [{lv:1,move:"Splash"},{lv:15,move:"Tackle"},{lv:30,move:"Flail"}],
  "Gyarados":    [{lv:1,move:"Thrash"},{lv:20,move:"Bite"},{lv:20,move:"Dragon Rage"},{lv:30,move:"Leer"},{lv:35,move:"Twister"},{lv:40,move:"Hydro Pump"},{lv:45,move:"Rain Dance"},{lv:50,move:"Dragon Dance"},{lv:55,move:"Hyper Beam"}],
  "Lapras":      [{lv:1,move:"Water Gun"},{lv:1,move:"Growl"},{lv:1,move:"Sing"},{lv:7,move:"Mist"},{lv:13,move:"Body Slam"},{lv:19,move:"Confuse Ray"},{lv:25,move:"Perish Song"},{lv:31,move:"Ice Beam"},{lv:37,move:"Rain Dance"},{lv:43,move:"Safeguard"},{lv:49,move:"Hydro Pump"},{lv:55,move:"Sheer Cold"}],
  "Ditto":       [{lv:1,move:"Transform"}],
  "Eevee":       [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Helping Hand"},{lv:8,move:"Sand-Attack"},{lv:16,move:"Growl"},{lv:23,move:"Quick Attack"},{lv:30,move:"Bite"},{lv:36,move:"Baton Pass"},{lv:42,move:"Take Down"}],
  "Vaporeon":    [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Helping Hand"},{lv:8,move:"Sand-Attack"},{lv:16,move:"Water Gun"},{lv:23,move:"Quick Attack"},{lv:30,move:"Bite"},{lv:36,move:"Aurora Beam"},{lv:42,move:"Haze"},{lv:47,move:"Acid Armor"},{lv:52,move:"Hydro Pump"}],
  "Jolteon":     [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Helping Hand"},{lv:8,move:"Sand-Attack"},{lv:16,move:"ThunderShock"},{lv:23,move:"Quick Attack"},{lv:30,move:"Double Kick"},{lv:36,move:"Pin Missile"},{lv:42,move:"Thunder Wave"},{lv:47,move:"Agility"},{lv:52,move:"Thunder"}],
  "Flareon":     [{lv:1,move:"Tackle"},{lv:1,move:"Tail Whip"},{lv:1,move:"Helping Hand"},{lv:8,move:"Sand-Attack"},{lv:16,move:"Ember"},{lv:23,move:"Quick Attack"},{lv:30,move:"Bite"},{lv:36,move:"Fire Spin"},{lv:42,move:"Smog"},{lv:47,move:"Leer"},{lv:52,move:"Flamethrower"}],
  "Porygon":     [{lv:1,move:"Tackle"},{lv:1,move:"Conversion"},{lv:1,move:"Conversion 2"},{lv:9,move:"Agility"},{lv:12,move:"Psybeam"},{lv:20,move:"Recover"},{lv:24,move:"Sharpen"},{lv:32,move:"Lock-On"},{lv:36,move:"Tri Attack"},{lv:44,move:"Recycle"},{lv:48,move:"Zap Cannon"}],
  "Omanyte":     [{lv:1,move:"Constrict"},{lv:1,move:"Withdraw"},{lv:13,move:"Bite"},{lv:19,move:"Water Gun"},{lv:25,move:"Mud Shot"},{lv:31,move:"Leer"},{lv:37,move:"Protect"},{lv:43,move:"Tickle"},{lv:49,move:"AncientPower"},{lv:55,move:"Hydro Pump"}],
  "Omastar":     [{lv:1,move:"Constrict"},{lv:1,move:"Withdraw"},{lv:1,move:"Bite"},{lv:13,move:"Bite"},{lv:19,move:"Water Gun"},{lv:25,move:"Mud Shot"},{lv:31,move:"Leer"},{lv:37,move:"Protect"},{lv:40,move:"Spike Cannon"},{lv:46,move:"Tickle"},{lv:55,move:"AncientPower"},{lv:65,move:"Hydro Pump"}],
  "Kabuto":      [{lv:1,move:"Scratch"},{lv:1,move:"Harden"},{lv:13,move:"Absorb"},{lv:19,move:"Leer"},{lv:25,move:"Mud Shot"},{lv:31,move:"Sand-Attack"},{lv:37,move:"Endure"},{lv:43,move:"Metal Sound"},{lv:49,move:"Mega Drain"},{lv:55,move:"AncientPower"}],
  "Kabutops":    [{lv:1,move:"Fury Cutter"},{lv:1,move:"Scratch"},{lv:1,move:"Harden"},{lv:1,move:"Absorb"},{lv:1,move:"Leer"},{lv:13,move:"Absorb"},{lv:19,move:"Leer"},{lv:25,move:"Mud Shot"},{lv:31,move:"Sand-Attack"},{lv:37,move:"Endure"},{lv:40,move:"Slash"},{lv:46,move:"Metal Sound"},{lv:55,move:"Mega Drain"},{lv:65,move:"AncientPower"}],
  "Aerodactyl":  [{lv:1,move:"Wing Attack"},{lv:8,move:"Agility"},{lv:15,move:"Bite"},{lv:22,move:"Supersonic"},{lv:29,move:"AncientPower"},{lv:36,move:"Scary Face"},{lv:43,move:"Take Down"},{lv:50,move:"Hyper Beam"}],
  "Snorlax":     [{lv:1,move:"Tackle"},{lv:6,move:"Amnesia"},{lv:10,move:"Defense Curl"},{lv:15,move:"Belly Drum"},{lv:19,move:"Headbutt"},{lv:24,move:"Yawn"},{lv:28,move:"Rest"},{lv:29,move:"Snore"},{lv:33,move:"Body Slam"},{lv:37,move:"Sleep Talk"},{lv:41,move:"Block"},{lv:42,move:"Covet"},{lv:46,move:"Rollout"},{lv:51,move:"Hyper Beam"}],
  "Articuno":    [{lv:1,move:"Gust"},{lv:1,move:"Powder Snow"},{lv:13,move:"Mist"},{lv:25,move:"Agility"},{lv:37,move:"Mind Reader"},{lv:49,move:"Ice Beam"},{lv:61,move:"Reflect"},{lv:73,move:"Blizzard"},{lv:85,move:"Sheer Cold"}],
  "Zapdos":      [{lv:1,move:"Peck"},{lv:1,move:"ThunderShock"},{lv:13,move:"Thunder Wave"},{lv:25,move:"Agility"},{lv:37,move:"Detect"},{lv:49,move:"Drill Peck"},{lv:61,move:"Charge"},{lv:73,move:"Light Screen"},{lv:85,move:"Thunder"}],
  "Moltres":     [{lv:1,move:"Wing Attack"},{lv:1,move:"Ember"},{lv:13,move:"Fire Spin"},{lv:25,move:"Agility"},{lv:37,move:"Endure"},{lv:49,move:"Flamethrower"},{lv:61,move:"Safeguard"},{lv:73,move:"Heat Wave"},{lv:85,move:"Sky Attack"}],
  "Dratini":     [{lv:1,move:"Wrap"},{lv:1,move:"Leer"},{lv:8,move:"Thunder Wave"},{lv:15,move:"Twister"},{lv:22,move:"Dragon Rage"},{lv:29,move:"Slam"},{lv:36,move:"Agility"},{lv:43,move:"Safeguard"},{lv:50,move:"Outrage"},{lv:57,move:"Hyper Beam"}],
  "Dragonair":   [{lv:1,move:"Wrap"},{lv:1,move:"Leer"},{lv:1,move:"Thunder Wave"},{lv:1,move:"Twister"},{lv:8,move:"Thunder Wave"},{lv:15,move:"Twister"},{lv:22,move:"Dragon Rage"},{lv:29,move:"Slam"},{lv:38,move:"Agility"},{lv:47,move:"Safeguard"},{lv:56,move:"Outrage"},{lv:65,move:"Hyper Beam"}],
  "Dragonite":   [{lv:1,move:"Wrap"},{lv:1,move:"Leer"},{lv:1,move:"Thunder Wave"},{lv:1,move:"Twister"},{lv:8,move:"Thunder Wave"},{lv:15,move:"Twister"},{lv:22,move:"Dragon Rage"},{lv:29,move:"Slam"},{lv:38,move:"Agility"},{lv:47,move:"Safeguard"},{lv:55,move:"Wing Attack"},{lv:61,move:"Outrage"},{lv:75,move:"Hyper Beam"}],
  "Mewtwo":      [{lv:1,move:"Confusion"},{lv:1,move:"Disable"},{lv:11,move:"Barrier"},{lv:22,move:"Swift"},{lv:33,move:"Psych Up"},{lv:44,move:"Future Sight"},{lv:55,move:"Mist"},{lv:66,move:"Psychic"},{lv:77,move:"Amnesia"},{lv:88,move:"Recover"},{lv:99,move:"Safeguard"}],
  "Mew":         [{lv:1,move:"Pound"},{lv:10,move:"Transform"},{lv:20,move:"Mega Punch"},{lv:30,move:"Metronome"},{lv:40,move:"Psychic"},{lv:50,move:"AncientPower"}],
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
const EVO_DELAY = {
  "Pikachu":    "Delay Thunder Stone until Lv. 26 (Thunderbolt) — Raichu has no level-up moves and won't gain Thunderbolt naturally.",
  "Growlithe":  "Delay Fire Stone until Lv. 49 (Flamethrower) — Arcanine's level-up set has no Flamethrower. Arcanine gains ExtremeSpeed at Lv. 49 after evolving.",
  "Vulpix":     "Delay Fire Stone until Lv. 29 (Flamethrower) — Ninetales' level-up set is very sparse.",
  "Jigglypuff": "Consider delaying Moon Stone until Lv. 34 (Body Slam) or Lv. 44 (Hyper Voice).",
  "Clefairy":   "Consider delaying Moon Stone until Lv. 29 (Metronome) or Lv. 33 (Cosmic Power).",
  "Exeggcute":  "Optional: delay Leaf Stone until Lv. 43 (SolarBeam) to avoid using TM22.",
};

// ─── DREAM TEAM BUILDER DATA ──────────────────────────────────────────────────
const DT_CANDIDATES = []; // TODO: Add Johto Dream Team candidates
const DT_GROUPS = {};
function buildDreamTeamV2(favorite, pins, version) { return []; }
const DT_LEGENDARY = new Set(["Articuno","Zapdos","Moltres","Mewtwo","Mew"]);

const DT_HM_COMPAT = {
  "Cut":        new Set(["Bulbasaur","Ivysaur","Venusaur","Rattata","Raticate","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Oddish","Gloom","Vileplume","Paras","Parasect","Psyduck","Golduck","Farfetch'd","Seel","Krabby","Kingler","Rhyhorn","Rhydon","Kangaskhan","Scyther","Pinsir","Kabuto","Kabutops","Charizard","Bellsprout","Weepinbell","Victreebel","Dratini","Dragonair","Dragonite"]),
  "Fly":        new Set(["Charizard","Pidgey","Pidgeotto","Pidgeot","Spearow","Fearow","Doduo","Dodrio","Aerodactyl","Dragonite"]),
  "Surf":       new Set(["Squirtle","Wartortle","Blastoise","Psyduck","Golduck","Poliwag","Poliwhirl","Poliwrath","Tentacool","Tentacruel","Slowpoke","Slowbro","Seel","Dewgong","Shellder","Cloyster","Krabby","Kingler","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Lapras","Vaporeon","Dratini","Dragonair","Dragonite","Jynx","Omanyte","Omastar","Kabuto","Kabutops","Gyarados","Snorlax","Tauros","Kangaskhan","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Rhydon"]),
  "Strength":   new Set(["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Sandshrew","Sandslash","Nidorina","Nidoqueen","Nidorino","Nidoking","Mankey","Primeape","Pikachu","Raichu","Poliwag","Poliwhirl","Poliwrath","Machop","Machoke","Geodude","Graveler","Golem","Slowpoke","Slowbro","Drowzee","Krabby","Kingler","Hitmonlee","Hitmonchan","Rhyhorn","Rhydon","Chansey","Kangaskhan","Tauros","Gyarados","Lapras","Snorlax","Dratini","Dragonair","Dragonite","Arcanine","Aerodactyl","Electabuzz","Exeggcute","Exeggutor","Psyduck","Golduck","Onix","Lickitung"]),
  "Flash":      new Set(["Butterfree","Pikachu","Raichu","Clefairy","Clefable","Jigglypuff","Wigglytuff","Abra","Kadabra","Slowpoke","Slowbro","Gastly","Haunter","Gengar","Drowzee","Hypno","Magnemite","Magneton","Doduo","Dodrio","Electrode","Starmie","Jynx","Electabuzz","Porygon","Vaporeon","Jolteon","Flareon"]),
  "Rock Smash": new Set(["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Poliwag","Poliwhirl","Poliwrath","Machop","Machoke","Geodude","Graveler","Golem","Primeape","Hitmonlee","Hitmonchan","Rhyhorn","Rhydon","Krabby","Kingler","Kabutops","Aerodactyl","Growlithe","Arcanine","Pikachu","Raichu","Psyduck","Golduck","Gyarados","Kangaskhan","Lapras","Omanyte","Omastar","Sandshrew","Sandslash","Scyther","Slowpoke","Slowbro","Tauros","Dratini","Dragonair","Dragonite","Electabuzz","Onix"]),
  "Waterfall":  new Set(["Squirtle","Wartortle","Blastoise","Psyduck","Golduck","Poliwag","Poliwhirl","Poliwrath","Tentacool","Tentacruel","Seel","Dewgong","Shellder","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Lapras","Vaporeon","Dratini","Dragonair","Dragonite","Jynx","Omanyte","Omastar","Kabuto","Kabutops","Gyarados"]),
};

// Neutral Pokémon are listed first so they always outrank version-exclusive picks
// by pool-position score, even if the version check is somehow skipped.
// FR-exclusive follow neutral, LG-exclusive come last.
const DT_CANDIDATES = [
  // ── Neutral (catchable in both versions) ───────────────────────────────────
  {name:"Lapras",    types:["Water","Ice"],          hms:["Surf","Waterfall","Strength","Rock Smash"]},
  {name:"Snorlax",   types:["Normal"],               hms:["Surf","Strength"]},
  {name:"Gyarados",  types:["Water","Flying"],       hms:["Surf","Waterfall","Strength","Rock Smash"]},
  {name:"Dragonite", types:["Dragon","Flying"],      hms:["Cut","Fly","Surf","Strength","Waterfall","Rock Smash"]},
  {name:"Nidoking",  types:["Poison","Ground"],      hms:["Cut","Surf","Rock Smash","Strength"]},
  {name:"Nidoqueen", types:["Poison","Ground"],      hms:["Cut","Surf","Rock Smash","Strength"]},
  {name:"Vaporeon",  types:["Water"],                hms:["Surf"]},
  {name:"Jolteon",   types:["Electric"],             hms:[]},
  {name:"Charizard", types:["Fire","Flying"],        hms:["Cut","Fly","Strength","Rock Smash"]},
  {name:"Blastoise", types:["Water"],                hms:["Surf","Waterfall","Strength"]},
  {name:"Venusaur",  types:["Grass","Poison"],       hms:["Cut","Strength","Rock Smash"]},
  {name:"Flareon",   types:["Fire"],                 hms:[]},
  {name:"Exeggutor", types:["Grass","Psychic"],      hms:["Strength"]},
  {name:"Raichu",    types:["Electric"],             hms:["Strength","Rock Smash"]},
  {name:"Aerodactyl",types:["Rock","Flying"],        hms:["Fly","Rock Smash","Strength"]},
  {name:"Tentacruel",types:["Water","Poison"],       hms:["Surf","Waterfall"]},
  {name:"Poliwrath", types:["Water","Fighting"],     hms:["Surf","Waterfall","Strength","Rock Smash"]},
  {name:"Pidgeot",   types:["Normal","Flying"],      hms:["Fly"]},
  {name:"Fearow",    types:["Normal","Flying"],      hms:["Fly","Cut"]},
  {name:"Hypno",     types:["Psychic"],              hms:[]},
  {name:"Clefable",  types:["Normal"],               hms:[]},
  {name:"Magneton",  types:["Electric","Steel"],     hms:[]},
  {name:"Electrode", types:["Electric"],             hms:[]},
  {name:"Hitmonlee", types:["Fighting"],             hms:["Strength","Rock Smash"]},
  {name:"Hitmonchan",types:["Fighting"],             hms:["Strength","Rock Smash"]},
  {name:"Dewgong",   types:["Water","Ice"],          hms:["Surf","Waterfall"]},
  {name:"Golduck",   types:["Water"],                hms:["Surf","Waterfall","Cut","Strength","Rock Smash"]},
  {name:"Rapidash",  types:["Fire"],                 hms:[]},
  {name:"Muk",       types:["Poison"],               hms:[]},
  {name:"Kabutops",  types:["Rock","Water"],         hms:["Surf","Waterfall","Cut","Rock Smash","Strength"]},
  {name:"Omastar",   types:["Rock","Water"],         hms:["Surf","Waterfall","Strength","Rock Smash"]},
  {name:"Rhydon",    types:["Ground","Rock"],        hms:["Cut","Surf","Strength","Rock Smash"]},
  {name:"Tauros",    types:["Normal"],               hms:["Surf","Strength","Rock Smash"]},
  {name:"Kangaskhan",types:["Normal"],               hms:["Cut","Surf","Strength","Rock Smash"]},
  {name:"Weezing",   types:["Poison"],               hms:[]},
  {name:"Kingler",   types:["Water"],                hms:["Surf","Cut","Strength","Rock Smash"]},
  {name:"Dodrio",    types:["Normal","Flying"],      hms:["Fly"]},
  {name:"Butterfree",types:["Bug","Flying"],         hms:[]},
  {name:"Beedrill",  types:["Bug","Poison"],         hms:[]},
  {name:"Raticate",  types:["Normal"],               hms:["Cut"]},
  {name:"Wigglytuff",types:["Normal"],               hms:[]},
  {name:"Golbat",    types:["Poison","Flying"],      hms:[]},
  {name:"Parasect",  types:["Bug","Grass"],          hms:["Cut"]},
  {name:"Venomoth",  types:["Bug","Poison"],         hms:[]},
  {name:"Dugtrio",   types:["Ground"],               hms:[]},
  {name:"Kadabra",   types:["Psychic"],              hms:[]},
  {name:"Machoke",   types:["Fighting"],             hms:["Strength","Rock Smash"]},
  {name:"Graveler",  types:["Rock","Ground"],        hms:["Strength","Rock Smash"]},
  {name:"Farfetch'd",types:["Normal","Flying"],      hms:["Cut"]},
  {name:"Haunter",   types:["Ghost","Poison"],       hms:[]},
  {name:"Onix",      types:["Rock","Ground"],        hms:["Strength","Rock Smash"]},
  {name:"Marowak",   types:["Ground"],               hms:[]},
  {name:"Lickitung", types:["Normal"],               hms:["Strength"]},
  {name:"Chansey",   types:["Normal"],               hms:["Strength"]},
  {name:"Tangela",   types:["Grass"],                hms:[]},
  {name:"Seaking",   types:["Water"],                hms:["Surf","Waterfall"]},
  {name:"Mr. Mime",  types:["Psychic"],              hms:[]},
  {name:"Jynx",      types:["Ice","Psychic"],        hms:["Surf","Waterfall"]},
  {name:"Ditto",     types:["Normal"],               hms:[]},
  {name:"Porygon",   types:["Normal"],               hms:[]},
  // ── HeartGold exclusive ──────────────────────────────────────────────────────
  {name:"Arcanine",  types:["Fire"],                 hms:["Strength","Rock Smash"],     hgOnly:true},
  {name:"Electabuzz",types:["Electric"],             hms:["Strength","Rock Smash"],     hgOnly:true},
  {name:"Cloyster",  types:["Water","Ice"],          hms:["Surf"],                      hgOnly:true},
  {name:"Scyther",   types:["Bug","Flying"],         hms:["Cut","Rock Smash"],          hgOnly:true},
  {name:"Vileplume", types:["Grass","Poison"],       hms:[],                            hgOnly:true},
  {name:"Primeape",  types:["Fighting"],             hms:["Strength","Rock Smash"],     hgOnly:true},
  {name:"Arbok",     types:["Poison"],               hms:[],                            hgOnly:true},
  {name:"Seadra",    types:["Water"],                hms:["Surf","Waterfall"],          hgOnly:true},
  // ── SoulSilver exclusive ────────────────────────────────────────────────────
  {name:"Starmie",   types:["Water","Psychic"],      hms:["Surf","Waterfall"],          ssOnly:true},
  {name:"Ninetales", types:["Fire"],                 hms:[],                            ssOnly:true},
  {name:"Slowbro",   types:["Water","Psychic"],      hms:["Surf","Strength","Rock Smash"],ssOnly:true},
  {name:"Sandslash", types:["Ground"],               hms:["Cut","Rock Smash","Strength"],ssOnly:true},
  {name:"Pinsir",    types:["Bug"],                  hms:["Cut"],                       ssOnly:true},
  {name:"Victreebel",types:["Grass","Poison"],       hms:[],                            ssOnly:true},
  {name:"Magmar",    types:["Fire"],                 hms:[],                            ssOnly:true},
  {name:"Persian",   types:["Normal"],               hms:[],                            ssOnly:true},
];

const DT_TM_TIPS = {
  "Charizard":  [{move:"Flamethrower",src:"TM35 — Game Corner, Celadon City"},{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Dragon Claw",src:"TM02 — Victory Road",oneTime:true}],
  "Blastoise":  [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Venusaur":   [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true},{move:"SolarBeam",src:"TM22 — Pokémon Mansion B1F",oneTime:true}],
  "Nidoking":   [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Nidoqueen":  [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true}],
  "Raichu":     [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"}],
  "Starmie":    [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
  "Lapras":     [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
  "Gyarados":   [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Snorlax":    [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Shadow Ball",src:"TM30 — Game Corner, 4,500 coins"}],
  "Vaporeon":   [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Jolteon":    [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"}],
  "Flareon":    [{move:"Fire Blast",src:"TM38 — Prize from Blaine, Cinnabar Gym",oneTime:true}],
  "Arcanine":   [{move:"Flamethrower",src:"TM35 — Game Corner, Celadon City"},{move:"ExtremeSpeed",src:"Lv. 49 as Arcanine — use Fire Stone before Lv. 50 or permanently missed"}],
  "Slowbro":    [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
  "Exeggutor":  [{move:"Psychic",src:"TM29 — Saffron City",oneTime:true},{move:"SolarBeam",src:"TM22 — Pokémon Mansion B1F",oneTime:true}],
  "Hypno":      [{move:"Psychic",src:"TM29 — Saffron City",oneTime:true},{move:"Shadow Ball",src:"TM30 — Game Corner, 4,500 coins"}],
  "Electabuzz": [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
  "Magneton":   [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Thunder",src:"TM25 — Kanto Power Plant",oneTime:true}],
  "Electrode":  [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Thunder",src:"TM25 — Kanto Power Plant",oneTime:true}],
  "Sandslash":  [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Aerodactyl": [{move:"Iron Tail",src:"TM23 — Game Corner, 3,500 coins"},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Pidgeot":    [{move:"Hyper Beam",src:"TM15 — Celadon Dept. Store (₽7,500)"}],
  "Poliwrath":  [{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"},{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
  "Cloyster":   [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Blizzard",src:"TM14 — Pokémon Mansion",oneTime:true}],
  "Omastar":    [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Rhydon":     [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Golduck":    [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"}],
  "Ninetales":  [{move:"Flamethrower",src:"TM35 — Game Corner, Celadon City"}],
  "Vileplume":  [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true},{move:"SolarBeam",src:"TM22 — Pokémon Mansion B1F",oneTime:true}],
  "Victreebel": [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true},{move:"SolarBeam",src:"TM22 — Pokémon Mansion B1F",oneTime:true}],
  "Tauros":     [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Body Slam",src:"Move Tutor — Four Island",oneTime:true}],
  "Dewgong":    [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Blizzard",src:"TM14 — Pokémon Mansion",oneTime:true}],
  "Tentacruel": [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Hitmonchan": [{move:"Ice Punch",src:"Lv. 26 — also learns Fire Punch & ThunderPunch at Lv. 26"},{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"}],
  "Hitmonlee":  [{move:"Hi Jump Kick",src:"Lv. 26 (level-up)"},{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true}],
  "Dragonite":  [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Dragon Claw",src:"TM02 — Victory Road",oneTime:true}],
  "Weezing":    [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true},{move:"Flamethrower",src:"TM35 — Game Corner, Celadon City"}],
  "Kingler":    [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Dodrio":     [{move:"Aerial Ace",src:"TM40 — Route 9"}],
  "Kangaskhan": [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"}],
  "Kabutops":   [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Fearow":     [{move:"Aerial Ace",src:"TM40 — Route 9"}],
  "Scyther":    [{move:"Aerial Ace",src:"TM40 — Route 9"}],
  "Kadabra":    [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"}],
  "Machoke":    [{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Graveler":   [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Haunter":    [{move:"Shadow Ball",src:"TM30 — Game Corner, 4,500 coins"},{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true}],
  "Onix":       [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Rapidash":   [{move:"Flamethrower",src:"TM35 — Game Corner, Celadon City"},{move:"Fire Blast",src:"TM38 — Prize from Blaine, Cinnabar Gym",oneTime:true}],
  "Dugtrio":    [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true}],
  "Marowak":    [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Jynx":       [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
  "Mr. Mime":   [{move:"Psychic",src:"TM29 — Saffron City",oneTime:true},{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"}],
  "Porygon":    [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Clefable":   [{move:"Thunderbolt",src:"TM24 — Game Corner, Celadon City"},{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Venomoth":   [{move:"Psychic",src:"TM29 — Saffron City",oneTime:true},{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true}],
  "Tangela":    [{move:"SolarBeam",src:"TM22 — Pokémon Mansion B1F",oneTime:true}],
  "Muk":        [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true}],
  "Seadra":     [{move:"Ice Beam",src:"TM13 — Game Corner, Celadon City"}],
  "Lickitung":  [{move:"Earthquake",src:"TM26 — Viridian Gym reward",oneTime:true}],
  "Arbok":      [{move:"Sludge Bomb",src:"TM36 — Rocket Warehouse, Five Island",oneTime:true}],
  "Primeape":   [{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"},{move:"Rock Slide",src:"Move Tutor — Rock Tunnel B1F"}],
  "Pinsir":     [{move:"Brick Break",src:"TM31 — S.S. Anne or Celadon Dept. Store (₽3,000)"}],
  "Magmar":     [{move:"Flamethrower",src:"TM35 — Game Corner, Celadon City"},{move:"Psychic",src:"TM29 — Saffron City",oneTime:true}],
};

const DT_FINAL_FORM = {
  "Bulbasaur":"Venusaur","Ivysaur":"Venusaur",
  "Charmander":"Charizard","Charmeleon":"Charizard",
  "Squirtle":"Blastoise","Wartortle":"Blastoise",
  "Caterpie":"Butterfree","Metapod":"Butterfree",
  "Weedle":"Beedrill","Kakuna":"Beedrill",
  "Pidgey":"Pidgeot","Pidgeotto":"Pidgeot",
  "Rattata":"Raticate","Spearow":"Fearow","Ekans":"Arbok",
  "Pikachu":"Raichu","Sandshrew":"Sandslash",
  "Nidoran♀":"Nidoqueen","Nidorina":"Nidoqueen",
  "Nidoran♂":"Nidoking","Nidorino":"Nidoking",
  "Clefairy":"Clefable","Vulpix":"Ninetales","Jigglypuff":"Wigglytuff",
  "Oddish":"Vileplume","Gloom":"Vileplume",
  "Paras":"Parasect","Venonat":"Venomoth",
  "Diglett":"Dugtrio","Meowth":"Persian","Psyduck":"Golduck","Mankey":"Primeape",
  "Growlithe":"Arcanine",
  "Poliwag":"Poliwhirl","Poliwhirl":"Poliwrath",
  "Bellsprout":"Weepinbell","Weepinbell":"Victreebel",
  "Tentacool":"Tentacruel","Ponyta":"Rapidash","Slowpoke":"Slowbro",
  "Magnemite":"Magneton","Doduo":"Dodrio","Seel":"Dewgong","Grimer":"Muk",
  "Shellder":"Cloyster","Drowzee":"Hypno","Krabby":"Kingler","Voltorb":"Electrode",
  "Exeggcute":"Exeggutor","Cubone":"Marowak",
  "Horsea":"Seadra","Goldeen":"Seaking","Staryu":"Starmie",
  "Magikarp":"Gyarados","Eevee":"Vaporeon",
  "Omanyte":"Omastar","Kabuto":"Kabutops",
  "Dratini":"Dragonite","Dragonair":"Dragonite",
  "Zubat":"Golbat","Abra":"Kadabra","Machop":"Machoke","Geodude":"Graveler",
  "Gastly":"Haunter","Rhyhorn":"Rhydon","Koffing":"Weezing",
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

// Build a team of 6: slot 0 = favorite, slot 1 = Dragonite (unless Dragonite-line),
// slots 2–5 filled by pins first then by greedy scoring.
function buildDreamTeamV2(favorite, pins, version) {
  if (!favorite) return null;
  const isDragoniteLine = ["Dratini","Dragonair","Dragonite"].includes(favorite);
  const team = new Array(6).fill(null);
  team[0] = favorite;
  if (!isDragoniteLine) team[1] = "Dragonite";
  for (let i = 2; i <= 5; i++) { if (pins[i]) team[i] = pins[i]; }

  const startSlot = isDragoniteLine ? 1 : 2;
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
  const ALL_HMs = ["Fly","Surf","Waterfall","Strength","Cut","Rock Smash"];
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
const CONSTRAINT_STYLE = {};
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
const CATCH_CONSTRAINT_MAP = {};
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
  frRed:"#e07c3a", lgGreen:"#5fc99a",
  accent:"#e07c3a",  // static fallback; live version uses CSS var(--hgss-accent)
  gold:"#e0b450", green:"#5fc99a", lgGreen2:"#5fc99a",
  text:"#e6e8f0", muted:"#7c8395", panel:"#1a1f2b",
};

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
const COMPLETION_SECTIONS = [
  {
    id:"trainer-card", title:"Trainer Card Stars", color:"#d4b840",
    items:[
      { id:"star-hof",   label:"★   Hall of Fame",             note:"Defeat Elite Four + Champion Blue → Bronze card" },
      { id:"star-kanto", label:"★★  Kanto Pokédex",             note:"Own all 150 Kanto Pokémon (Mew excluded) → Copper card", auto:"kanto-dex" },
      { id:"star-natl",  label:"★★★  National Pokédex",         note:"Out of scope — requires Pokémon from many Gen III games", disabled:true },
      { id:"star-mini",  label:"★★★★  Pokémon Jump / Dodrio",   note:"Requires multiplayer + GBA Wireless Adapter", disabled:true },
    ],
  },
  {
    id:"sevii", title:"Sevii Islands Quests", color:"#5ab0d8",
    items:[
      { id:"sevii-123", label:"Unlocked Islands 1–3",           note:"Automatic after Bill escorts you post-Blaine" },
      { id:"ruby",      label:"Delivered Ruby to Celio",        note:"Find Ruby at Mt. Ember summit — One Island" },
      { id:"lostelle",  label:"Rescued Lostelle with Bill",     note:"Berry Forest — Three Island" },
      { id:"sapphire",  label:"Retrieved Sapphire",             note:"Dotted Hole — Five Island" },
      { id:"sevii-47",  label:"Unlocked Islands 4–7",           note:"Automatic after delivering Sapphire to Celio" },
      { id:"lorelei",   label:"Helped Lorelei at Icefall Cave", note:"Defeat Rockets — Four Island" },
    ],
  },
  {
    id:"diploma", title:"Diploma", color:C.green,
    items:[
      { id:"diploma", label:"Received Diploma", note:"Talk to Game Freak developer at Celadon Condominiums — requires owning all 150 Kanto Pokémon (Mew excluded)" },
    ],
  },
  {
    id:"hms", title:"HMs", color:"#a87acc",
    items:[
      { id:"hm-cut",        label:"Cut",        note:"Cap'n's gift aboard S.S. Anne" },
      { id:"hm-fly",        label:"Fly",        note:"Girl on Route 16" },
      { id:"hm-surf",       label:"Surf",       note:"Safari Zone warden" },
      { id:"hm-strength",   label:"Strength",   note:"Safari Zone warden — after returning his Gold Teeth" },
      { id:"hm-flash",      label:"Flash",      note:"Professor Oak's aide on Route 2 (10 Pokémon seen)" },
      { id:"hm-rock-smash", label:"Rock Smash", note:"Man on One Island" },
      { id:"hm-waterfall",  label:"Waterfall",  note:"Found in Icefall Cave — Four Island" },
    ],
  },
  {
    id:"trades", title:"In-Game Trades", color:C.gold,
    items:[
      { id:"trade-mr-mime",   label:"Mr. Mime",               auto:"mr-mime",   note:"Give Abra → Route 2 east gate. Not available in the wild — required for Pokédex." },
      { id:"trade-jynx",      label:"Jynx",                   auto:"jynx",      note:"Give Poliwhirl → Cerulean City house. Not available in the wild — required for Pokédex." },
      { id:"trade-farfetchd", label:"Farfetch'd",             auto:"farfetchd", note:"Give Spearow → Vermilion City. Not available in the wild — required for Pokédex." },
      { id:"trade-lickitung", label:"Lickitung",              auto:"lickitung", note:"Give Golduck (FR) or Slowbro (LG) → Route 18 gate. Not available in the wild — required for Pokédex." },
      { id:"trade-nidoran",   label:"Nidoran gender swap",    optional:true,    note:"Underground Path (5↔6): give Nidoran♂ (FR) or ♀ (LG) → receive opposite gender. Both catchable in the wild." },
      { id:"trade-nidevo",    label:"Nidorino / Nidorina",    optional:true,    note:"Route 11 gate: give Nidorino (FR) or Nidorina (LG) → receive the other. Both catchable in the wild (Safari Zone)." },
      { id:"trade-electrode", label:"Electrode",              optional:true,    note:"Give Raichu → Cinnabar Lab. Catchable in the wild at Power Plant." },
      { id:"trade-tangela",   label:"Tangela",                optional:true,    note:"Give Venonat → Cinnabar Lab. Catchable in the wild on Route 21." },
      { id:"trade-seel",      label:"Seel",                   optional:true,    note:"Give Ponyta → Cinnabar Lab. Catchable in the wild in Seafoam Islands." },
    ],
  },
  {
    id:"trainer-tower", title:"Trainer Tower (Seven Island)", color:"#c85252",
    items:[
      { id:"tt-single",   label:"Single mode cleared",   note:"7F tower, timed — best time recorded", reward:"Up-Grade" },
      { id:"tt-double",   label:"Double mode cleared",   note:"7F tower, timed — 2v2 battles",        reward:"Dragon Scale" },
      { id:"tt-knockout", label:"Knockout mode cleared", note:"7F tower, timed — elimination format",  reward:"Metal Coat" },
      { id:"tt-mixed",    label:"Mixed mode cleared",    note:"7F tower, timed — alternating formats", reward:"King's Rock" },
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

const GYM_DATA = []; // TODO: Add 16 gym leaders + Elite Four + Lance + Red (Phase 2)
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
const POKEMON_TYPES = {}; // TODO: Add type data for all 251 Johto Pokémon (Phase 2)
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
const AUDITED_PARTS = new Set([]); // Parts added here as they are audited
// ─── CATCH RATE DATA ──────────────────────────────────────────────────────────
// Gen III base catch rates for all 151 Kanto Pokémon (FRLG)
const CATCH_RATE_DATA = []; // TODO: Add HGSS base catch rates
// ─── SPRITES ─────────────────────────────────────────────────────────────────
const DEX_ID = Object.fromEntries(DEX.map(p => [p.name, p.id]));
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
  "Gamer":"gamer-gen3","PokéManiac":"pokemaniac","Cue Ball":"cueball-gen3",
  "Biker":"biker","Twins":"twins-gen3","Channeler":"channeler-gen3",
  "Beauty":"beauty","Cooltrainer":"beauty","Bird Keeper":"birdkeeper",
  "Young Couple":"youngcouple","Rocker":"rocker-gen3",
  "Crush Kin":"crushkin-gen3","Juggler":"juggler","Tamer":"tamer-gen3",
  "Scientist":"scientist","Black Belt":"blackbelt-gen3","Psychic":"psychic-gen3",
  "Burglar":"burglar",
  "Crush Girl":"crushgirl-gen3","Pokémon Ranger":"pokemonranger-gen3",
  "Aroma Lady":"aromalady-gen3","Tuber♀":"tuberf-gen3",
  "Cool Couple":"coolcouple-gen3","Elite Four":"elite-four-gen3",
  "Ruin Maniac":"ruinmaniac","Lady":"lady-gen3",
  "Painter":"painter-gen3","Rocket Admin":"teamrocket",
};
const TRAINER_NAME_SPRITE  = {"Brock":"brock","Misty":"misty","Lt. Surge":"lt-surge","Blue":"blue","Giovanni":"giovanni","Erika":"erika","Koga":"koga","Sabrina":"sabrina","Blaine":"blaine","Lorelei":"lorelei","Bruno":"bruno","Agatha":"agatha","Lance":"lance"};
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

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
function HGSSTracker() {
  const isMobile = useIsMobile();
  const [tab, setTab]           = useState(() => { try { return localStorage.getItem("hgss-active-tab") || "areas"; } catch { return "areas"; } });
  const setTabAndSave = t => { setTab(t); try { localStorage.setItem("hgss-active-tab", t); } catch {} };
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

      {/* Tab content — keyed wrapper for cross-tab stagger-in */}
      <div key={tab} className="hgss-tab-in" style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* ── Tab: Pokédex ── */}
      {tab === "dex" && <DexTab caught={caught} toggleCaught={toggleCaught} dexFilter={dexFilter} setDexFilter={setDexFilter} dexSelected={dexSelected} setDexSelected={setDexSelected} version={version} isMobile={isMobile} />}

      {/* ── Tab: Areas ── */}
      {tab === "areas" && <AreasTab caught={caught} toggleCaught={toggleCaught} items={items} toggleItem={toggleItem} trainers={trainers} toggleTrainer={toggleTrainer} trades={trades} toggleTrade={toggleTrade} areaId={areaId} setAreaId={setAreaId} area={area} search={search} setSearch={setSearch} version={version} isMobile={isMobile} choiceGroups={choiceGroups} />}

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

  const eligible = React.useMemo(() => DEX.filter(p => p.id <= 151 && !DT_LEGENDARY.has(p.name)), []);
  const team = React.useMemo(() => buildDreamTeamV2(favorite, pins, version), [favorite, pins, version]);
  const isDragoniteLine = ["Dratini","Dragonair","Dragonite"].includes(favorite);
  const tmWinners     = React.useMemo(() => team ? assignOneTimeTMs(team) : {}, [team]);
  const hmAssignments = React.useMemo(() => team ? assignHMs(team, hmPerPokemon) : {}, [team, hmPerPokemon]);

  const isHardLocked = idx => idx === 0 || (idx === 1 && !isDragoniteLine);

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
        return <option key={p.id} value={p.name}>#{String(p.id).padStart(3,"0")} {p.name}{suffix}</option>;
      })}
    </select>
  );

  // ── No favourite yet ─────────────────────────────────────────────────────────
  if (!team) {
    return (
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:10, letterSpacing:2, color:C.muted, marginBottom:4, textTransform:"uppercase" }}>Dream Team Builder</div>
          <div style={{ fontSize:12, color:C.muted, lineHeight:1.7 }}>Pick your favourite — the builder scores and fills the remaining 5 slots around it. Dragonite (pseudo-legendary) is always included. You can pin any suggested slot and browse ranked alternatives.</div>
        </div>
        <FavSelect />
      </div>
    );
  }

  // ── Coverage summary row ──────────────────────────────────────────────────────
  const teamCoverage = getTeamCoverage(team);
  const missingTypes = TYPES_17.filter(t => !teamCoverage.has(t));
  const hmsCovered   = new Set(team.flatMap(n => { const f = DT_FINAL_FORM[n]||n; return Object.entries(DT_HM_COMPAT).filter(([,s])=>s.has(f)).map(([h])=>h); }));
  const hmsMissing   = ["Fly","Surf","Waterfall","Strength","Cut","Rock Smash"].filter(h => !hmsCovered.has(h));

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
          const isPseudo    = idx === 1 && !isDragoniteLine;
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
                    {dexEntry ? `#${String(dexEntry.id).padStart(3,"0")}` : ""}
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
    Object.keys(LOCATION_MAP).sort((a, b) => (DEX_ID[a] || 999) - (DEX_ID[b] || 999)),
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
              Not found as a wild encounter in any tracked area for {version === "hg" ? "FireRed" : "LeafGreen"}.
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
                        {loc.hgOnly && <Tag color="#c85252">FR</Tag>}
                        {loc.ssOnly && <Tag color={C.ssSilver}>LG</Tag>}
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
                    border:`1px solid ${isCaught ? C.green : p.ssOnly ? C.ssSilver : p.hgOnly ? "#c85252" : C.border}`,
                    borderRadius:7, padding:"6px 4px 5px", cursor:isDimmed?"default":"pointer",
                    textAlign:"center", opacity:isDimmed?0.3:1, position:"relative", transition:"all 0.1s",
                  }}>
                  {isCaught && <div style={{ position:"absolute", top:3, left:4, fontSize:8, color:C.green, fontWeight:"700" }}>✓</div>}
                  {p.hgOnly && <div style={{ position:"absolute", top:3, right:3, fontSize:7, color:"#c85252", fontWeight:"600" }}>FR</div>}
                  {p.ssOnly && <div style={{ position:"absolute", top:3, right:3, fontSize:7, color:C.ssSilver, fontWeight:"600" }}>LG</div>}
                  <img src={pokeSpriteUrl(p.id)} alt={p.name}
                    style={{ width:36, height:36, imageRendering:"pixelated", display:"block", margin:"0 auto",
                             opacity:isCaught?1:0.7, filter:isCaught?"none":"brightness(0)" }} />
                  <div style={{ fontSize:8, color:C.muted, fontFamily:"'Courier New',monospace" }}>#{String(p.id).padStart(3,"0")}</div>
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
                    border:`1px solid ${isSel ? "var(--hgss-accent)" : isCaught ? C.green : p.event ? "#a87acc" : p.ssOnly ? C.ssSilver : p.hgOnly ? "#c85252" : TRADE_EVO_SET.has(p.name) ? "#c89832" : EVO_ONLY_SET.has(p.name) ? "#5a9fd4" : C.border}`,
                    borderRadius:8, padding:"8px 5px 6px", cursor: isDimmed ? "default" : "pointer", textAlign:"center",
                    transition:"all 0.12s", position:"relative", opacity: isDimmed ? 0.3 : isCaught ? 1 : 0.55,
                    boxShadow: isSel ? "0 0 0 2px rgba(var(--hgss-accent-rgb,212,98,26),0.2)" : "none",
                  }}
                  onMouseEnter={e => { if (isDimmed) return; e.currentTarget.style.borderColor = isCaught ? C.green : "var(--hgss-accent)"; e.currentTarget.style.background = isCaught ? "rgba(74,175,116,0.25)" : "rgba(0,0,0,0.2)"; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { if (isDimmed) return; e.currentTarget.style.borderColor = isSel ? "var(--hgss-accent)" : isCaught ? C.green : p.event ? "#a87acc" : p.ssOnly ? C.ssSilver : p.hgOnly ? "#c85252" : TRADE_EVO_SET.has(p.name) ? "#c89832" : EVO_ONLY_SET.has(p.name) ? "#5a9fd4" : C.border; e.currentTarget.style.background = isCaught ? "rgba(74,175,116,0.18)" : isSel ? "rgba(0,0,0,0.15)" : C.card; e.currentTarget.style.opacity = isDimmed ? "0.3" : isCaught ? "1" : "0.55"; }}
                >
                  {isCaught && <div style={{ position:"absolute", top:4, left:5, fontSize:9, color:C.green, fontWeight:"700" }}>✓</div>}
                  {p.hgOnly && <div style={{ position:"absolute", top:4, right:4, fontSize:8, color:"#c85252", fontWeight:"600" }}>FR</div>}
                  {p.ssOnly && <div style={{ position:"absolute", top:4, right:4, fontSize:8, color:C.ssSilver, fontWeight:"600" }}>LG</div>}
                  {p.event  && <div style={{ position:"absolute", top:4, right:4, fontSize:8, color:"#a87acc", fontWeight:"600" }}>✦</div>}
                  <img src={pokeSpriteUrl(p.id)} alt={p.name} style={{ width:48, height:48, imageRendering:"pixelated", display:"block", margin:"0 auto", filter: isCaught ? "none" : "grayscale(1)" }} />
                  <div style={{ fontSize:9, color:C.muted, marginBottom:1, fontFamily:"'Courier New',monospace" }}>#{String(p.id).padStart(3,"0")}</div>
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
                <div style={{ fontSize:10, color:C.muted, fontFamily:"'Courier New',monospace", lineHeight:1 }}>#{String(selected.id).padStart(3,"0")}</div>
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
          <div style={{ fontSize:10, color:C.muted, marginBottom:2, fontFamily:"'Courier New',monospace" }}>#{String(selected.id).padStart(3,"0")}</div>
          <div style={{ fontSize:17, fontWeight:"700", color: isCaught ? C.green : C.text }}>{selected.name}</div>
          {selected.hgOnly && <div style={{ fontSize:10, color:"#c85252", marginTop:4, fontWeight:"500" }}>HeartGold exclusive</div>}
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
function AreasTab({ caught, toggleCaught, items, toggleItem, trainers, toggleTrainer, trades, toggleTrade, areaId, setAreaId, area, search, setSearch, version, isMobile, choiceGroups }) {
  const isPassedPokemon = p  => !!(p.choiceGroup  && choiceGroups?.[p.choiceGroup]  && choiceGroups[p.choiceGroup]  !== p.choiceId);
  const isPassedItem    = it => !!(it.choiceGroup && choiceGroups?.[it.choiceGroup] && choiceGroups[it.choiceGroup] !== it.choiceId);
  const [timeFilter, setTimeFilter] = useState(() => {
    try { return localStorage.getItem("hgss-time-filter") || "all"; } catch { return "all"; }
  });
  const setTime = t => { setTimeFilter(t); try { localStorage.setItem("hgss-time-filter", t); } catch {}; };
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
  const verPokemon      = areaPokemon.filter(p =>
    !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly) &&
    (timeFilter === "all" || !p.time || p.time === timeFilter));
  const relevantPokemon = verPokemon.filter(p => !isPassedPokemon(p));
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
            style={{ width:"100%", background:"rgba(0,0,0,0.25)", border:`1px solid ${C.border}`, color:C.text, padding:"8px 12px", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:16, borderRadius:6, boxSizing:"border-box", outline:"none", marginBottom:8 }} />
          {/* Time-of-day filter */}
          <div style={{ display:"flex", gap:4 }}>
            {[["all","All"],["morning","Morning"],["day","Day"],["night","Night"]].map(([v,label]) => (
              <button key={v} onClick={() => setTime(v)} style={{
                flex:1, padding:"3px 0", fontSize:9, fontWeight:"700", letterSpacing:0.5,
                border:`1px solid ${timeFilter===v ? "var(--hgss-accent)" : C.border}`,
                borderRadius:4, cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                background: timeFilter===v ? "rgba(200,150,10,0.15)" : "transparent",
                color: timeFilter===v ? "var(--hgss-accent)" : C.muted,
              }}>{label}</button>
            ))}
          </div>
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
                <span><span style={{ color:"#c85252", fontWeight:"600" }}>FR</span> = HeartGold exclusive</span>
                <span><span style={{ color:C.ssSilver, fontWeight:"600" }}>LG</span> = SoulSilver exclusive</span>
                <span><span style={{ color:C.gold }}>★</span> = Hidden (Itemfinder)</span>
              </div>

              {area.floors ? (
                // ── Floor-by-floor layout ─────────────────────────────────
                area.floors.map(floor => {
                  const hasPoks = (floor.pokemon  || []).length > 0;
                  const hasItms = (floor.items    || []).length > 0;
                  const hasTrns = (floor.trainers || []).length > 0;
                  if (!hasPoks && !hasItms && !hasTrns) return null;
                  const floorVerPoks    = (floor.pokemon || []).filter(p => !(version === "hg" && p.ssOnly) && !(version === "ss" && p.hgOnly));
                  const relevFloorPoks  = floorVerPoks.filter(p => !isPassedPokemon(p));
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
                              {!hasPoks ? <Empty text="No wild Pokémon here" /> : renderPokemonList(floor.pokemon, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade)}
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
                        renderPokemonList(areaPokemon, caught, toggleCaught, version, isMobile, choiceGroups, areaId, trades, toggleTrade)
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
        <span style={{ color:isCaught?C.green:p.ssOnly?C.ssSilver:p.hgOnly?"#c85252":C.text, fontWeight:"600", fontSize:12 }}>
          {p.name}{p.hgOnly&&<Tag color="#c85252">FR</Tag>}{p.ssOnly&&<Tag color={C.ssSilver}>LG</Tag>}
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
      <span style={{ fontSize:11, fontWeight:"700", color:"#c85252", background:"rgba(200,82,82,0.12)", border:"1px solid rgba(200,82,82,0.3)", padding:"1px 6px", borderRadius:4, whiteSpace:"nowrap" }}>FR {splitMatch[1]}</span>
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
              {frMath && <div style={{ fontSize:11, color:"#c85252", marginBottom:3 }}>
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
  const [selId, setSelId] = React.useState("brock");
  const gym = GYM_DATA.find(g => g.id === selId) || GYM_DATA[0];
  const gymTypes = [...new Set(gym.team.flatMap(p => p.types))];
  const attackAdvantage = TYPES_17.filter(atk => gymTypes.some(def => (TYPE_CHART[atk]?.[def] || 1) >= 2));
  const gymThreats      = TYPES_17.filter(def => gymTypes.some(atk => (TYPE_CHART[atk]?.[def] || 1) >= 2));
  const E4_IDS = new Set(["lorelei","bruno","agatha","lance","blue"]);

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
          <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", padding:"8px 12px 4px" }}>Gym Leaders</div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", padding:"4px 12px 10px" }}>
            {GYM_DATA.filter(g => !E4_IDS.has(g.id)).map(g => <ChipBtn key={g.id} g={g} />)}
          </div>
          <div style={{ fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", padding:"6px 12px 4px", borderTop:`1px solid ${C.border}` }}>Elite Four + Champion</div>
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
        <div style={{ padding:"6px 10px 4px", fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", borderBottom:`1px solid ${C.border}` }}>Gym Leaders</div>
        {GYM_DATA.filter(g => !E4_IDS.has(g.id)).map(g => <SideBtn key={g.id} g={g} />)}
        <div style={{ padding:"6px 10px 4px", fontSize:9, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, borderTop:`1px solid ${C.border}`, marginTop:4 }}>Elite Four + Champion</div>
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
const LEGENDARY_DEX_ID = { Articuno:144, Zapdos:145, Moltres:146, Mewtwo:150, Mew:151 };
const LEGENDARY_COLOR  = { Articuno:"#7ec8e3", Zapdos:"#f5d24a", Moltres:"#ff6b35", Mewtwo:"#a87acc", Mew:"#f48ec0" };

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
}
