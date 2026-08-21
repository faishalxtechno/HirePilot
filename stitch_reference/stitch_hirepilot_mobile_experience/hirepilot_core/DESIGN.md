---
name: HirePilot Core
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 20px
  stack-gap-sm: 8px
  stack-gap-md: 16px
  stack-gap-lg: 24px
  safe-area-bottom: 34px
---

## Brand & Style
The design system embodies a "Dark Liquid Glass" aesthetic, positioning the product as a premium, high-intelligence AI co-pilot. The brand personality is futuristic yet professional, evoking a sense of deep-tech reliability and elite career guidance.

The visual style is a sophisticated blend of **Glassmorphism** and **Modern Minimalism**. It utilizes high-transparency surfaces, deep atmospheric backgrounds, and vibrant synthetic light sources to create a sense of depth and focus. The interface should feel like a high-end cockpit: lightweight, data-driven, and highly responsive.

## Colors
The palette is rooted in a deep space-navy background to maximize the luminosity of the accent colors. 

- **Primary (Electric Blue):** Used for primary actions, focus states, and AI-driven insights.
- **Secondary (Cyan):** Used for status indicators, success states, and secondary interactive elements to provide a "technological" contrast.
- **Surface Strategy:** Surfaces are not solid colors but translucent glass layers. They rely on `backdrop-filter: blur(12px)` and a thin `1px` stroke to define boundaries against the deep navy background.
- **Glows:** Use low-opacity radial gradients of the Primary color behind key components to simulate ambient light.

## Typography
The system uses **Inter** for its systematic, utilitarian, and modern character. 

- **Hierarchy:** Use `display-lg` sparingly for impact screen titles (e.g., "Welcome, Captain").
- **Readability:** Maintain high contrast by using pure white for titles and primary body text. Use the muted blue-gray for metadata, descriptions, and labels to create visual breathing room.
- **Spacing:** Tighten letter spacing on larger headlines to enhance the premium, "engineered" feel.

## Layout & Spacing
This design system follows a **fluid grid** model optimized for high-end mobile devices (iPhone 15/16).

- **Margins:** A standard 20px horizontal margin is enforced for all main content.
- **Safe Areas:** Ensure interactive elements (buttons, bottom nav) respect the 34px bottom safe area for gesture-based navigation.
- **Rhythm:** Use a 4px baseline grid. Elements should be separated by 16px (md) or 24px (lg) increments to maintain a clean, airy layout.
- **AI Focus:** The layout should prioritize a "chat-first" or "feed-first" structure, where glass cards appear to float over the background.

## Elevation & Depth
Depth is created through transparency and blur rather than traditional drop shadows.

- **Level 1 (Base):** Deep Navy background (#020617).
- **Level 2 (Cards):** Translucent glass (#ffffff0f) with `backdrop-filter: blur(16px)` and a `1px` border (#ffffff1a).
- **Level 3 (Modals/Popovers):** Higher opacity glass (#ffffff1a) with a subtle `0 8px 32px 0 rgba(0, 0, 0, 0.5)` shadow to separate it from the Level 2 cards.
- **Atmosphere:** Use "Light Leaks"—subtle, large-scale radial gradients (10% opacity) of Electric Blue in the corners of the screen to give the UI a sense of infinite depth.

## Shapes
The shape language is "Hyper-Rounded," reflecting the liquid nature of the design.

- **Primary Containers:** Large cards use a **24px (rounded-xl)** radius to feel soft and approachable.
- **Interactive Elements:** Buttons and input fields use a **12px (rounded-lg)** radius.
- **Feedback Elements:** Small chips or tags use a fully pill-shaped radius.
- **Borders:** All glass containers must have a 1px solid border using the specified border glass color to ensure edge definition against the dark background.

## Components

- **Glass Buttons:** Primary buttons use a solid Electric Blue fill with white text. Secondary buttons use the glass surface style (translucent background, white border).
- **AI Chat Bubbles:** HirePilot's messages should have a subtle Electric Blue glow/tint, while user messages remain neutral glass.
- **Input Fields:** 12px rounded corners, glass background, and a secondary text placeholder. On focus, the border transitions to Primary Electric Blue with a soft outer glow.
- **Progressive Disclosure:** Use thin lines (1px, 10% white) to separate list items within glass cards.
- **Icons:** Use linear, 2px stroke icons. Avoid fills unless indicating an active state. Icons should be sized at 24x24px for tap targets.
- **Action Sheets:** Slide up from the bottom with a heavy backdrop blur (20px+) to completely isolate the user's focus on the career choice at hand.