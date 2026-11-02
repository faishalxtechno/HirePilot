# HirePilot Project Guidelines — Reflect Notes Design System

> **Style Reference:** Starlit Violet Cosmos — A dark observatory where components float like constellations against a near-black indigo void.

All frontend development, styling, and UI maintenance in HirePilot must strictly follow these rules.

---

## 1. Brand Identity & Official Logo

- **Official Logo Asset:** `public/images/hirepilot-logo.png`
- **Visual Elements:** HirePilot brand name, original blue and navy H symbol, paper plane, and the official tagline: `"Practice • Prepare • Get Hired"`.
- **Component:** Use `<HirePilotLogo variant="navbar|sidebar|auth|footer|mobile|header" />` from `src/components/ui/HirePilotLogo.tsx`.
- **Integrity Constraints:**
  - Never regenerate, redraw, distort, or recreate the logo.
  - Never remove or crop the tagline `"Practice • Prepare • Get Hired"`.
  - Never replace with text-only or generic airplane icons.
  - When displayed on dark surfaces, use the official logo component with its clean subtle container.

---

## 2. Design System Tokens

### Color Palette

| Token Name | Hex Value | CSS Variable | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Void Canvas** | `#030014` | `--color-void-canvas` | Page background, hero canvas, deepest surface layer (near-black with violet undertone) |
| **Midnight Surface** | `#060317` | `--color-midnight-surface` | Elevated surface, card backgrounds, panels sitting on void canvas |
| **Deep Indigo** | `#10093a` | `--color-deep-indigo` | Most elevated surface, hover states, active navigation pills, primary UI controls |
| **Lilac White** | `#f4f0ff` | `--color-lilac-white` | Primary text, headings, icons, high-contrast UI elements (lavender cast) |
| **Pearl** | `#ffffff` | `--color-pearl` | Pure white, used sparingly for maximum contrast headlines |
| **Ash** | `#a8a6b7` | `--color-ash` | Secondary body text, card labels, descriptions |
| **Fog** | `#918ea0` | `--color-fog` | Tertiary text, metadata, helper text, inactive navigation icons |
| **Steel** | `#54525f` | `--color-steel` | Lowest readable neutral, subtle dark-mode borders, disabled text |
| **Lavender Accent** | `#9382ff` | `--color-lavender-accent` | The single chromatic signal — links, active icons, focus rings, highlights |
| **Iris** | `#5046e4` | `--color-iris` | Supporting violet accent for primary CTA button fills and subtle badge borders |
| **Cosmic Gradient** | `linear-gradient(...)` | `--gradient-cosmic-gradient` | `linear-gradient(90deg, #e59cff, #ba9cff, #9cb2ff)` — ACCENT TEXT & STROKES ONLY |
| **Aurora Glow** | `linear-gradient(...)` | `--gradient-aurora` | Divider lines and edge highlights |

### Border Radii System (Strict)

| Element | Radius Token | Value | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Buttons & Inputs** | `--radius-buttons`, `--radius-inputs` | `5px` | `rounded-[5px]` |
| **Small Panels / Tags** | `--radius-lg` | `8px` | `rounded-[8px]` |
| **Cards & Modals** | `--radius-cards` | `16px` | `rounded-[16px]` |
| **Feature Blocks** | `--radius-featureblocks` | `24px` | `rounded-[24px]` |
| **Badges & Chips** | `--radius-badges` | `32px` | `rounded-[32px]` |
| **Navigation Pill** | `--radius-navpill` | `999px` | `rounded-full` |

### Shadows & Lighting

- **No heavy drop shadows.** Surfaces are defined by rim-light glows and dark glass borders:
  - Inset Rim Light: `box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.04)` (or `.reflect-rim-light`)
  - Badge Inset Glow: `box-shadow: inset 0 -7px 11px rgba(164, 143, 255, 0.12)` (or `.reflect-badge-glow`)
  - Borders: `1px solid rgba(255, 255, 255, 0.08)` or `border-reflect-steel/40`

### Typography

- **Heading & Display:** AeonikPro / Inter V, **Weight: 500 (Medium)**.
  - *Strict Rule:* Never use 700/800 bold marketing bombast. Headings convey a calm, thoughtful, intellectual observatory tone.
- **Body & Captions:** Weight: 400 (Regular). Secondary text in `#a8a6b7` (Ash), tertiary in `#918ea0` (Fog).

---

## 3. Component Guidelines

### Buttons (`src/components/ui/Button.tsx`)
- Radius: Always `rounded-[5px]`.
- Font: 14px, weight 500 (medium).
- Primary CTA: Iris `#5046e4` or Deep Indigo `#10093a` with border `border-white/10`. Text `#f4f0ff`. Hover shifts tone up.
- Secondary / Outline: Midnight Surface `#060317` with border `border-white/10`.
- Ghost: Transparent surface, text `#918ea0`, hover `#f4f0ff`.

### Cards (`src/components/ui/Card.tsx`)
- Radius: Always `rounded-[16px]`.
- Surface: Midnight Surface `#060317`.
- Border: `1px solid rgba(255, 255, 255, 0.08)`.
- Shadow: Inset rim-light glow (`shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]`).

### Inputs (`src/components/ui/Input.tsx`)
- Radius: Always `rounded-[5px]`.
- Surface: `#060317`. Border: `rgba(255, 255, 255, 0.10)`. Focus ring: `#9382ff`.

### Badges (`src/components/ui/Badge.tsx`)
- Radius: Always `rounded-[32px]`.
- Surface: `#060317`, border `#5046e4`/40, text `#9382ff`, inset glow `.reflect-badge-glow`.

---

## 4. Preservation & Safety Rules

1. **Authentication:** Always preserve Supabase Auth and Google OAuth with redirect URL handling.
2. **Founder Identity:** Always preserve Faishal Naushad's founder profile and image `/images/faishal-naushad-founder.png`.
3. **Core Services:** Never alter or degrade Gemini AI mock interview generation, scoring, or resume evaluation.
4. **Deployments:** Never commit or push to Git or deploy to Vercel without explicit user permission.

