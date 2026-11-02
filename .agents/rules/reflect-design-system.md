# Reflect Design System Rule for HirePilot

This rule guides all UI development in HirePilot to maintain the **Reflect Notes — Starlit Violet Cosmos** design language.

## Design Philosophy
HirePilot is styled as a starlit observatory where interview prep tools and notes float like constellations against a near-black indigo void (`#030014`). Surfaces are quiet and monochromatic, illuminated by soft lavender-white text, subtle inset rim-light glows, and a single vivid chromatic accent (`#9382ff`).

## Mandatory Design Tokens

### 1. Colors
- Canvas background: `#030014` (`void-canvas`)
- Raised panels / cards: `#060317` (`midnight-surface`)
- Deep interactive / active nav: `#10093a` (`deep-indigo`)
- Primary text / headings: `#f4f0ff` (`lilac-white`)
- Secondary body text: `#a8a6b7` (`ash`)
- Tertiary / metadata text: `#918ea0` (`fog`)
- Dark borders / lowest neutral: `#54525f` (`steel`) or `rgba(255,255,255,0.08)`
- Brand accent: `#9382ff` (`lavender-accent`)
- CTA button / violet supporting accent: `#5046e4` (`iris`)
- Gradients:
  - Cosmic gradient (`linear-gradient(90deg, #e59cff, #ba9cff, #9cb2ff)`): **Used only on accent text and thin highlight strokes**. Never use as a button background.
  - Aurora divider: `linear-gradient(180deg, rgba(183,164,251,0) 0%, #b7a4fb 50%, #8562ff 100%, rgba(133,98,255,0) 100%)`.

### 2. Typography Rules
- Headings & display text: Font family AeonikPro / Inter V, **weight 500 (Medium)**.
  - Do NOT use heavy bold weights (700/800) for headers.
- Body text: Regular weight 400.

### 3. Corner Radii
- Buttons & inputs: `rounded-[5px]` (5px)
- Cards & modals: `rounded-[16px]` (16px)
- Feature cards: `rounded-[24px]` (24px)
- Badges & pills: `rounded-[32px]` (32px)
- Floating navigation container: `rounded-full` (999px)

### 4. Lighting & Shadows
- Use inset rim-light glows: `shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]`
- Avoid heavy drop shadows or colored ambient elevation halos.

### 5. Official Logo Preservation
- Always use `src/components/ui/HirePilotLogo.tsx` referencing `/images/hirepilot-logo.png`.
- Preserve the tagline: `"Practice • Prepare • Get Hired"`.

