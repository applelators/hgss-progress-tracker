# Overlay (`overlay.html`) — Notes for Claude Code

This file documents the overlay redesign for any future Claude Code session
working on `hgss-progress-tracker`. It captures what changed, why, and the
conventions to preserve when extending the overlay.

Treat this as a sibling document to `CLAUDE.md`. Suggested integration:
either keep this file alongside `overlay.html` and reference it from
`CLAUDE.md` under a new "Overlay" section, or fold its contents directly
into `CLAUDE.md` if you prefer a single source of truth.

---

## What changed and why

The previous overlay was a flat list of Pokémon names with three rate cells
beside each. The redesign:

1. **Visual hierarchy** — A prominent route pill above a bordered rows
   container, mirroring the HGSS in-game route header pattern. Each Pokémon
   is now a discrete row pill rather than a flat list row.

2. **Area-type theming** — Container border, panel tint, and pill halo
   color shift per area type (route, town, cave, forest, tower, sea), so
   the overlay reads as a different "place" depending on context.

3. **Time-of-day spotlight** — The rate column matching the current
   time-of-day gets a colored backdrop + soft glow. Rows are sorted by that
   column's rate descending. Wall-clock time drives this via HGSS's
   morning/day/night windows.

4. **Pagination** — When an area has > 10 Pokémon, rows split into pages
   of 10 that auto-advance every 6 seconds. A page counter + dots indicator
   sits between the pill and the rows.

5. **Larger sprites + names** — Sprite bumped to 56×56 (overflows the row
   pill vertically — intentional), name to 15px, percentages to 12px.

6. **Responsive shrink** — Overlay caps at 360px width but shrinks to fit
   narrower viewports. Rate columns drop progressively (farthest non-active
   time-of-day first) when the frame narrows past 320px and 270px via CSS
   container queries.

## Layout

```
Overlay Frame  (max 360px, container-type: inline-size)
├── Route Pill (.area-header)
│     • Cream-on-dark, area-type colored border + radial-gradient halo
│     • .completed adds a green glow + ✓ check-badge when all caught
├── Page Strip (.page-strip)  — only when pages > 1
│     • Page counter "N/M" + colored dots
└── Rows Card (.rows-card)
      └── Row Pills (.poke-row) × PAGE_SIZE
            ├── Sprite (56×56 PokeAPI img, bobs, overflows ±8px)
            ├── Name (.hg = gold, .ss = blue, default white)
            └── Rates (M/D/N) with the active column highlighted
```

Each row pill is a flex container:

- `flex: 0 0 56px` on the sprite
- `flex: 0 1 auto` on the name (shrinks but doesn't grow)
- `margin-left: auto` on the rates (pushes them flush right)

Sprite + name stay clumped on the left; the gap between name and rates
absorbs width changes before the name starts compressing.

## CSS architecture

### Palette tokens

Two layers of CSS custom properties:

1. **Base tokens** on `:root` — global colors (text, bg, time-of-day,
   HG/SS, check).
2. **Area-type tokens** on `.overlay-frame[data-area-type="…"]` —
   per-area-type palette:
   `--area-border`, `--area-bg`, `--area-tint`, `--area-halo`,
   `--area-pulse-mid`, `--area-glow`.

**Reference area-type variables directly at use sites.** Don't indirect
through a `:root`-scoped alias like `--pill-border: var(--area-border)` —
CSS resolves the inner `var()` at the declaration site (which is `:root`,
where `--area-border` has only the default value), not lazily at the
consumer. The area-type overrides won't take effect. This bug was caught
and fixed during development.

### Animations

Eight keyframes that should be preserved as the overlay's motion vocabulary:

- `header-in` — pill fade-in on render
- `row-in` — row stagger via `--row-i` CSS variable
- `panel-exit` — fade-out when swapping areas/pages
- `pill-pulse` — pill border & box-shadow breathing
- `halo-pulse` — opacity sweep on the pill's radial-gradient halo
- `sprite-bob` — sprite floats up/down with per-row phase delay
- `rate-shimmer` — non-zero rate numbers fade subtly
- `glow-soft` — brightness pulse on active-time rate cells

All respect `prefers-reduced-motion: reduce`.

### Container queries

The overlay frame is the query container (`container-type: inline-size`).
Two breakpoints:

- `≤ 320px` → hide `.rate-cell.drop-1` cells
- `≤ 270px` → hide `.rate-cell.drop-2` cells

The `drop-1` / `drop-2` classes are assigned by `rateCellHTML()` based on
`HIDE_PRIORITY[tod]`. The active time-of-day never drops; the farthest
non-active time-of-day drops first.

## Data pipeline

Identical to the original overlay:

1. `fetch('hgss-area-tracker.jsx')`
2. `Babel.transform(jsx, { presets: ['react'] }).code`
3. `(0, eval)(code)` — populates `window.__HGSS_AREAS`, `window.__HGSS_DEX_ID`
4. `renderArea(localStorage.getItem('hgss-active-area'))`
5. Listen on `window.storage` for live re-renders when the tracker writes

`getCaught()`, `getVersion()`, `spriteUrl()`, `getRawPokemon()`, and
`groupPokemon()` semantics are unchanged from the previous overlay.

## Area-type inference

`inferAreaType(area)` → one of `route` | `town` | `cave` | `forest` |
`tower` | `sea`. Order:

1. If **every** encounter method on the area is aquatic (`Surf`, `Old Rod`,
   `Good Rod`, `Super Rod`) → `sea`
2. Match the area `id`/`name` against regex patterns:
   - `/forest/` → `forest`
   - `/tower|lighthouse|ruins/` → `tower`
   - `/cave|well|tunnel|path|mt|mount|moon|island|den|mortar/` → `cave`
   - `/city|town/` → `town`
   - `/route|park|zone|safari/` → `route`
3. Default → `route`

If a specific area types wrong:

- **Quick fix** — tweak the regex in `inferAreaType()`.
- **Clean fix (recommended long-term)** — add an explicit `type` field to
  each area in `hgss-area-tracker.jsx` during the next audit pass, and
  update `inferAreaType()` to prefer `area.type` when present. This
  removes the heuristic and makes overlay theming part of the data model.

## Time-of-day pipeline

`currentTimeOfDay()` returns `morning` / `day` / `night` based on
`new Date().getHours()`:

| Window           | Hours       |
|------------------|-------------|
| morning          | 4:00 – 9:59 |
| day              | 10:00 – 19:59 |
| night            | 20:00 – 3:59 |

These match HGSS's in-game windows. If they change in the tracker JSX,
mirror the change here.

Once per minute, `scheduleTimeRefresh()` re-renders so the spotlight keeps
up with the clock crossing window boundaries.

`sortByActiveTime(grouped, tod)` sorts the version-filtered Pokémon list by
the active time's rate, descending. Ties broken by source order (stable).
When the user crosses a TOD boundary, the list re-sorts on the next render.

## Pagination

- `PAGE_SIZE = 10`, `DWELL_MS = 6000`
- `currentPage` resets to `0` on every area change
- `schedulePageAdvance()` re-arms on every render, so it always reflects
  the current page count
- When a page has fewer than 10 items, `padRowHTML(i)` fills the remainder
  with `visibility: hidden` rows so the rows-card height stays fixed.
  **Don't switch padding rows to `display: none`** — that would collapse
  the rows-card and cause the page indicator to jitter between pages.

## Conventions to preserve

- **Don't reintroduce CSS-var indirection through :root.** Reference the
  area-type variables directly. See *CSS architecture* above.
- **Keep the animation vocabulary.** New states should compose with the
  existing keyframes rather than invent a new motion language.
- **Don't expand the overlay's outer dimensions.** The 360px width and
  ~40px row height are load-bearing for OBS browser source layouts. To fit
  more info, use the container-query drop-priority pattern, not resizing.
- **Don't reintroduce the ✓ check column.** Caught state is signalled by
  the green left-border + tinted background. The check made the row's left
  edge crowded once sprites grew.
- **Don't write to localStorage from the overlay.** It's a read-only
  viewer of tracker state. Writes belong in `hgss-area-tracker.jsx`.
- **Strip space is precious.** It hosts only the page indicator. A
  time-of-day chip was tried there and rejected as cramped — the
  time-of-day is communicated by the active-column highlight + sort order.

## Known pitfalls

- **Sprite overflow.** Sprites are 56px tall in a 40px row pill, overflowing
  ±8px. Adjacent rows' sprite *bounding boxes* visually touch. This is fine
  because PokeAPI sprites have transparent padding — but if a sprite has
  little transparent padding (Onix, Steelix, Wailord), adjacent rows may
  show actual visible overlap. Acceptable; don't shrink the sprite.
- **PokeAPI sprite vertical positioning.** The visible creature in each
  96×96 source is bottom-anchored, so when scaled to 56px and centered in
  the row, the visible Pokémon sits slightly below row center. A
  `transform: translateY(-Npx)` baseline shift was tried during development
  and rejected because the right value varies per sprite. Leave it.
- **Container queries need a container ancestor.** `.overlay-frame` has
  `container-type: inline-size`. Don't remove this — the drop-priority
  pattern depends on it.
- **The fetch failure path is intentional.** A missing JSX in a dev preview
  is caught as `console.warn` (not error) so dev tooling doesn't flag it
  as broken; production renders the "Failed to load" placeholder either
  way.

## Likely future extensions

If asked for any of the following, here's where to start:

- **Manual area-type override** — add a `type` field on areas in the JSX
  and prefer it in `inferAreaType()`.
- **Item display** — add an items section below the rows card; reuse the
  row-pill styling but swap the sprite for an item icon.
- **Trainer display** — similar to items; consider folding trainers into
  the pagination as additional pages if they fit alongside Pokémon, or
  giving them their own toggleable section.
- **Different game (FRLG, BW, etc.)** — the layout is portable; the data
  pipeline and area-type heuristic are HGSS-specific. Extract them into a
  game-config object before porting.
- **Smoother page transitions** — currently uses `panel-exit` (180ms). A
  horizontal slide (X-axis translate, deck-of-cards feel) would fit the
  motion vocabulary nicely.
