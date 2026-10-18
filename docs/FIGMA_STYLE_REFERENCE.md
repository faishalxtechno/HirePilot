# Figma — Style Reference
> white gallery wall with a single indigo spotlight.

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Figma operates as a pure white canvas for creativity: an achromatic interface where black text, white surfaces, and a single electric indigo accent do all the work. The visual system stays out of the way so that user-generated design work can speak — bold display headlines, light weight body text, and pill-shaped controls create a quiet, confident stage. Color appears sparingly as functional punctuation (CTAs, hover states, the Figma logo) while the surrounding page is deliberately blank, almost gallery-like. Elevation is reduced to one soft drop shadow on elevated cards; the rest of the hierarchy is built with whitespace, weight contrast, and scale. The rhythm alternates between vast breathing-room sections and tightly packed card grids, producing a museum-meets-workspace feel.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink Black | `#000000` | `--color-ink-black` | Primary text, icon strokes, high-contrast borders — the default for all body, heading, and UI stroke color |
| Paper White | `#ffffff` | `--color-paper-white` | Page canvas, card surfaces, button fills for ghost/outlined controls — the dominant surface tone |
| Soft Mist | `#e2e2e2` | `--color-soft-mist` | Subtle card surface, secondary panel backgrounds — sits one step above pure white |
| Graphite | `#595959` | `--color-graphite` | Muted helper text, secondary labels, de-emphasized metadata |
| Electric Indigo | `#4d49fc` | `--color-electric-indigo` | Primary CTA buttons, active nav indicators, brand focal points — the only saturated fill the system uses for action |
| Figma Cyan | `#00b6ff` | `--color-figma-cyan` | Figma logo accent, decorative icon highlight — one of the four brand-marker colors in the mark |
| Figma Green | `#24cb71` | `--color-figma-green` | Figma logo accent, decorative icon highlight — second brand-marker in the four-color mark |
| Figma Orange | `#ff7237` | `--color-figma-orange` | Figma logo accent, decorative icon highlight — third brand-marker in the four-color mark |
| Lime Wash | `#e4ff97` | `--color-lime-wash` | Decorative illustration fill, playful community-card tint — pastel accent for expressive backgrounds |
| Lilac | `#c4baff` | `--color-lilac` | Decorative illustration fill, pastel accent for expressive backgrounds and tags |
| Blush | `#ffc9c1` | `--color-blush` | Decorative illustration fill, pastel accent for expressive backgrounds |
| Aqua Mist | `#c7f8fb` | `--color-aqua-mist` | Decorative illustration fill, pastel accent for expressive backgrounds |
| Earworm Teal | `#33dfdf` | `--color-earworm-teal` | Ring stroke, radial highlight accents on decorative graphics — high-energy neon teal |
| Mustard | `#b98e01` | `--color-mustard` | Ring stroke, radial highlight accents on decorative graphics — warm gold companion to teal |

## Tokens — Typography

### figmaSans — Primary typeface for all UI (`Inter`)
- **Substitute:** Inter
- **Weights:** 320, 330, 340, 400, 450, 480, 520, 700
- **Sizes:** 16, 18, 24, 56, 72
- **Line height:** 1.00, 1.10, 1.30, 1.35, 1.40, 1.45
- **Letter spacing:** -0.02em at 72px → -0.007em at 16px (tighter as size increases)
- **Role:** Primary typeface for all UI. Hero headlines use ultra-light display weights (320-340) for whispered authority.

### figmaMono — Monospace companion (`JetBrains Mono`)
- **Substitute:** JetBrains Mono
- **Weights:** 400
- **Sizes:** 12, 16
- **Letter spacing:** +0.03em to +0.05em
- **Role:** Code snippets, technical labels, and UI annotations.

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | figmaMono | 400 | 12px | 1.3 | 0.48px | `--text-caption` |
| body-sm | figmaSans | 480 | 16px | 1.45 | -0.11px | `--text-body-sm` |
| body | figmaSans | 400 | 18px | 1.4 | -0.18px | `--text-body` |
| heading | figmaSans | 520 | 24px | 1.35 | -0.24px | `--text-heading` |
| heading-lg | figmaSans | 320 | 56px | 1.1 | -0.84px | `--text-heading-lg` |
| display | figmaSans | 320 | 72px | 1.1 | -1.44px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px  
**Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 60, 64, 80, 120, 180

### Border Radius Hierarchy (Strict 4-tier)

| Tier | Radius | Elements |
|------|--------|----------|
| Fine UI | `2px` | Badges, dividers, micro-indicators |
| Ghost / Controls | `8px` | Ghost/outlined buttons, text inputs, standard tags |
| Cards | `16px` | Hero floating card, community grid cards |
| Action Pills | `50px` | Primary CTA buttons, top-nav pill buttons, pill tag chips |

### Shadows

| Name | Value | Token | Role |
|------|-------|-------|------|
| xl | `rgba(0, 0, 0, 0.1) 0px 24px 70px 0px` | `--shadow-xl` | Signature hero floating card lift |

## Components

### 1. Hero Floating Card
- **Surface:** White (`#ffffff`), 16px border-radius, 24px padding all sides.
- **Elevation:** `rgba(0, 0, 0, 0.1) 0px 24px 70px 0px`. No border, no outline.
- **Headline:** 56px figmaSans weight 320, ink black `#000000`, letter-spacing -0.84px.

### 2. Primary CTA Button
- **Fill:** Electric Indigo (`#4d49fc`), text white, weight 480 at 16px.
- **Radius:** 50px pill shape, padding 10px 20px.
- **Discipline:** Only saturated fill in the UI. Exactly one per viewport.

### 3. Ghost Nav Button
- **Fill:** Transparent, 1px black border (`#000000`), ink black text, weight 400 at 16px.
- **Radius:** 8px radius (subtle rounding, not pill), padding 8px 18px.

### 4. Pill Black Nav Button
- **Fill:** Black (`#000000`), text white, weight 400 at 16px.
- **Radius:** 50px pill radius, padding 8px 18px.

### 5. Community Card Grid
- 4 columns, 24px gap, white background, **no shadow in the grid**.
- 16px radius, uncropped creative thumbnail top, title at 18px weight 520, creator at 14px weight 400 graphite.

## Do's and Don'ts

### Do
- Use Electric Indigo (`#4d49fc`) for exactly one CTA per viewport.
- Set hero headlines at 56-72px in figmaSans weight 320-340.
- Apply 50px pill radius exclusively to action buttons and tag chips.
- Pair `#000000` on `#ffffff` for maximum contrast; use `#595959` only for secondary copy.
- Let user artwork and screenshots carry all color.

### Don't
- Do not apply color fills to secondary buttons — ghost outlined in black is the alternative.
- Do not add drop shadows to cards in grid layouts (only floating hero card gets the 24px 70px shadow).
- Do not use 50px radius on cards or inputs.
- Do not introduce new chromatic colors into UI chrome.
