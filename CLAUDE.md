# HeartGold/SoulSilver Progress Tracker — Claude Guidelines

This file is loaded automatically by Claude Code. It captures the conventions, data pipeline, and known pitfalls for this project so any Claude instance can continue the work consistently.

**Keep this file current.** Update it whenever major changes are made to the repo — new features, structural changes to the data format, new pitfalls discovered, or changes to key conventions. A stale CLAUDE.md is worse than none.

---

## Project Overview

A single-page React 18 app tracking a 100% completion + Living Dex run of Pokémon HeartGold/SoulSilver. No build tools — in-browser Babel transpilation via CDN. All data is hardcoded in the JSX. State persists to `localStorage`.

**Active file:** `hgss-area-tracker.jsx` (loaded by `index.html`)
**Skeleton source:** `firered-area-tracker-v4.jsx` (in the sibling `firered-progress-tracker` repo — for UI reference)
**Audit source:** [Bulbapedia HeartGold & SoulSilver Walkthrough](https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver)

---

## Part Audit Pipeline

### One part at a time

Always audit one Bulbapedia part at a time. After implementing, pause and let the user review before moving to the next part. Doing multiple parts in one session without review has caused repeated errors.

### Per-area process

For each area in a part:

1. **Start with the walkthrough page** — always fetch the walkthrough part page first. It is the authoritative source for area order, floor structure, and which content belongs to each visit. Check the cache first (`bulbapedia-cache/Walkthrough_Part_N.txt`); if absent, fetch it:
   ```bash
   curl -s "https://bulbapedia.bulbagarden.net/w/index.php?title=Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_N&action=raw" \
     -o "bulbapedia-cache/Walkthrough_Part_N.txt"
   ```
   Use the walkthrough to determine: the correct sequence of areas within the part, how many floors a dungeon has, and which items/encounters belong to which floor or visit.

2. **Supplement with the location page** — after reading the walkthrough, fetch the dedicated location page for detailed encounter tables and item lists. Check the cache first (`bulbapedia-cache/PAGE_TITLE.txt`); if absent, fetch it:
   ```bash
   curl -s "https://bulbapedia.bulbagarden.net/w/index.php?title=PAGE_TITLE&action=raw" \
     -o "bulbapedia-cache/PAGE_TITLE.txt"
   ```
   The cache folder is gitignored. Delete a file to force a refresh. Never rely on the rendered HTML for encounter or item data — use raw wikitext as the authoritative source.

3. **Wild Pokémon** — extract from `{{Catch/entryhgss|...}}` lines. The template format is `|dex#|Name|HG(yes/no)|SS(yes/no)|method|levels|rate|`. The `yes`/`no` flags are explicit — no column-guessing needed. Add a `time` field where appropriate ("morning", "day", or "night").
4. **Encounter rate sanity check** — rates should sum to approximately 100% per version per time-of-day slot. HGSS has three separate grass tables (morning/day/night) — verify all three.
5. **Items** — extract from `{{Itemlist|...}}` lines. The raw wikitext lists items with their location description and HG/SS availability flags directly.
6. **Trainers** — the walkthrough page is the primary source for trainers. Cross-check team sizes and levels against the location page. Add `rematch` arrays to phone-registered trainers where applicable.
7. **Multi-floor areas** — the walkthrough establishes how many floors exist. Do not collapse a dungeon into a single flat structure.

### After implementing a part

- Add the new part string(s) to `AUDITED_PARTS` in the JSX.
- Update `README.md` — add a row to the Audit status table.
- Commit with a clear message referencing the part number and areas covered.

---

## Data Structure

### Return visits

Notable return trips to an area get their own dedicated area entry rather than being folded into the original. Use a `(Return)` suffix in the name and a new kebab ID (e.g. `route29-return`). Place it in the part that matches when the return visit occurs in the walkthrough. The original area keeps only the content that belongs to the first visit.

A return visit is "notable" if it introduces new trainers (especially a rival battle), unlocks previously inaccessible wild Pokémon or items, or is explicitly a separate walkthrough step.

### Flat area

```js
{ part:"Part N", id:"kebab-id", name:"Area Name",
  note:"Optional context shown in the UI.",
  pokemon:[ ... ],
  items:[ ... ],
  trainers:[ ... ] }
```

### Floored area

Use `floors` instead of top-level `pokemon`/`items`/`trainers` for any area with distinct sub-sections: multi-floor dungeons, ships, the Safari Zone, etc.

```js
{ part:"Part N", id:"kebab-id", name:"Area Name",
  note:"...",
  floors:[
    { label:"1F", pokemon:[ ... ], items:[ ... ], trainers:[ ... ] },
    { label:"B1F", pokemon:[ ... ], items:[ ... ], trainers:[ ... ] },
  ] }
```

Every array (`pokemon`, `items`, `trainers`) must be present on every floor, even if empty.

### Pokémon entry

```js
{ name:"Spinarak", method:"Grass", levels:"2–4", rate:"20%",
  time:"night",     // "morning" | "day" | "night" — omit if appears at all times
  hgOnly:true,      // omit if neither version-exclusive
  ssOnly:true,      // omit if neither version-exclusive
  note:"...",       // optional clarifying note shown in the UI
  warn:true }       // true for one-time-only encounters (legendaries, fossils, etc.)
```

`method` values in use:

| Method | Description |
|--------|-------------|
| `"Grass"` | Standard tall-grass encounter |
| `"Cave"` | Cave / dark encounter |
| `"Surf"` | Surfing on water |
| `"Old Rod"` | Old Rod fishing |
| `"Good Rod"` | Good Rod fishing |
| `"Super Rod"` | Super Rod fishing |
| `"Headbutt (Common)"` | Headbutt tree, common slot |
| `"Headbutt (Rare)"` | Headbutt tree, rare slot |
| `"Radio"` | Pokéflute / Pokémon March channel |
| `"Swarm"` | Daily swarm (note field explains trigger) |
| `"Bug Contest"` | National Park Bug-Catching Contest |
| `"Pokéwalker"` | Pokéwalker device courses |
| `"Gift"` | Received directly from an NPC |
| `"Trade"` | In-game trade |
| `"Fossil"` | Fossil revival |
| `"Event"` | One-time event encounter |

### Item entry

```js
{ name:"Potion", hidden:false, note:"Short location description" }
```

`hidden: true` means the item requires the Dowsing Machine (HGSS name for Itemfinder). The UI renders these with a ★.

### Trainer entry

```js
{ class:"Youngster", name:"Joey",
  note:"Optional note shown under the trainer name.",
  team:[ {name:"Rattata", level:4} ],
  rematch:[                          // phone-registered trainers only
    {team:[{name:"Rattata", level:10}]},
    {team:[{name:"Raticate", level:20}]}
  ] }
```

Trainer class must match a key in `TRAINER_CLASS_SPRITE` or `TRAINER_NAME_SPRITE` in the JSX for the sprite to render.

---

## Key Conventions (localStorage)

These key formats are load-bearing. Do not change them without bumping the localStorage key suffix.

| What | Format | Example |
|------|--------|---------|
| Caught Pokémon | `pokémonName` | `"Spinarak"` |
| Flat-area item | `${areaId}\|${index}` | `"route29\|0"` |
| Floored-area item | `${areaId}\|${floorLabel}\|${index}` | `"sprout-tower\|3F\|0"` |
| Trainer | `${areaId}\|${class}\|${name}` | `"route29\|Youngster\|Joey"` |

All localStorage keys use the `hgss-` prefix (e.g. `hgss-caught`, `hgss-items`, `hgss-trainers`, `hgss-version`, `hgss-badges`, `hgss-time-filter`).

**Critical:** Flat-area items must use the index, not the item name. Duplicate item names in the same area would share a key under a name-based scheme. The index-based format avoids this.

---

## Known Pitfalls

### WebFetch and HG/SS split tables

Bulbapedia renders encounter tables with a HeartGold column and a SoulSilver column. WebFetch + AI can misread which column belongs to which version. This burned us on the FRLG tracker.

**Fix:** Always use raw wikitext (`?action=raw`) instead of the rendered page for encounter and item data. The `{{Catch/entryhgss}}` template has explicit `|yes|no|` flags for HG and SS — no column interpretation needed.

**If raw wikitext is unavailable:** flag all split-rate encounters explicitly and ask the user to verify before writing.

### HGSS has three time-of-day grass tables

Morning, day, and night each have a separate encounter table. Always extract all three and tag entries with the correct `time` field. Missing time tags will cause Pokémon to show when they shouldn't (or not show when they should).

### LOCATION_MAP is built at module scope

`LOCATION_MAP` (the lookup that powers the Pokédex "found in" list) is populated before React renders. The loop that builds it must use the module-scope `_allPokemon` helper, not the component-scope `flattenPokemon`. Accessing `area.pokemon` directly on a floored area (which has no top-level `.pokemon`) throws at load and produces a blank page.

### Duplicate item names

Multiple items with the same name can appear in the same area or floor. Always use index-based item keys — never name-based.

### Area ID format

Area IDs are kebab-case strings used as React keys and in localStorage item keys. They must be stable — changing an ID invalidates all saved item state for that area.

### Bulk text replacements — use Python, not sed

An early attempt to use chained `sed -i ''` commands for bulk string replacement emptied the file (0 bytes). Always use Python scripts for multi-pattern substitutions on the JSX file — safer and easier to verify.

---

## Badge System

HGSS has 16 badges across two regions. The data is split into two arrays:

```js
const JOHTO_BADGES = [ /* 8 Johto badges */ ];
const KANTO_BADGES = [ /* 8 Kanto badges */ ];
const BADGES = [...JOHTO_BADGES, ...KANTO_BADGES];
```

`GymBadgeStrip` renders two labeled rows ("Johto" and "Kanto"). The completion ceremony triggers when all 16 are earned.

---

## Time-of-Day Filter

The time filter state is stored in `hgss-time-filter` (`"all"` | `"morning"` | `"day"` | `"night"`). The filter is applied in `verPokemon` inside `AreasTab`:

```js
(timeFilter === "all" || !p.time || p.time === timeFilter)
```

Pokémon without a `time` field always show regardless of the active filter.

---

## Commit Conventions

- One commit per part audit (or per meaningful unit of work).
- Message format: `Audit Part N — AreaName · AreaName · AreaName`
- Always commit after the user has reviewed and approved the changes.
- Push immediately after every commit.
- Include `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` in commit messages.

---

## Running Locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Opening `index.html` directly as a `file://` URL fails because the browser blocks loading the `.jsx` file via fetch.
