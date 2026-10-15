---
name: Warm Coastal Sanctuary
colors:
  surface: '#fbf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fbf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#eae8e2'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c18'
  on-surface-variant: '#45464d'
  inverse-surface: '#30312d'
  inverse-on-surface: '#f3f1eb'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#a900a8'
  on-secondary: '#ffffff'
  secondary-container: '#fd28fa'
  on-secondary-container: '#540054'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002114'
  on-tertiary-container: '#069669'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810080'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#fbf9f3'
  on-background: '#1b1c18'
  surface-variant: '#e4e2dd'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 68px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a refined hospitality aesthetic centered on tranquility, craftsmanship, and effortless warmth. It serves discerning leisure travelers, honeymooners, and premium retreat seekers who value calm spaces and high-touch service. The interface evokes unhurried luxury—balancing the architectural precision of high-end resorts with the tactile comfort of sunlit linen and stone.

The visual style blends **Warm Minimalism** with **Tactile Hospitality**:
- Ample negative space allows sweeping resort imagery and high-contrast editorial typography to breathe.
- Warm Sand and Cream backdrops replace harsh digital whites, cultivating an organic, sun-warmed ambiance.
- Ocean Slate anchors interactive structures with dependable authority, while vibrant Fuchsia and Emerald micro-accents direct attention to actions, ratings, and stay milestones.
- Elements feel substantial yet weightless, relying on soft natural shadows rather than heavy structural borders.

## Colors

The palette balances deep coastal tones with organic neutrals and striking vibrant accents.

- **Primary (`#0F172A` / `#1E293B`)**: Deep Ocean Slate drives core legibility, authoritative actions, navigation structures, and high-contrast typography.
- **Secondary (`#F61CF4` / `#D946EF`)**: Vibrant Fuchsia introduces a modern pop, highlighting star ratings, VIP loyalty badges, search buttons, and booking callouts.
- **Tertiary (`#059669`)**: Emerald Accent delivers an organic touch of lush foliage, serving as the active confirmation, available inventory indicator, and positive status color.
- **Neutral & Canvas (`#F8F6F0` base, `#F1ECE1` muted, `#FFFFFF` surface)**: Warm Sand and Cream provide comforting background depths, while crisp pure white is reserved strictly for elevated property cards and dialog surfaces to preserve contrast.
- **System States**:
  - Confirmed: Emerald (`#059669`) on soft mint tint (`#ECFDF5`).
  - Pending: Fuchsia (`#F61CF4`) on fuchsia tint (`#FDF4FF`).
  - Cancelled: Crimson Slate (`#BE123C`) on rose tint (`#FFF1F2`).

## Typography

The typography pairing contrasts the editorial poise of Playfair Display with the clean geometry and high legibility of Plus Jakarta Sans.

- **Headlines (Playfair Display)**: Conveys historical grandeur, boutique tailoring, and editorial stillness. Used across landing titles, suite showcase headers, and destination spotlights.
- **Interface & Body (Plus Jakarta Sans)**: Ensures maximum clarity for booking parameters, date selectors, amenity lists, pricing tables, and legal details.
- **Styling Rules**:
  - Uppercase treatment is restricted to `label-sm` and `label-md` for tags, room capacity chips, and booking step indicators, accompanied by generous letter spacing (+0.04em to +0.06em).
  - Editorial headings must never be fully capitalized; use standard sentence or title casing to retain the literary grace of Playfair Display.

## Layout & Spacing

The layout model implements a structured 12-column responsive fluid grid centered inside a maximum 1440px viewport boundary. 

- **Desktop (>= 1024px)**: 12 columns, 24px (`gutter`) column separation, and 48px (`margin`) outer canvas padding. Booking search bars span 10 to 12 columns as floating command strips overlapping hero viewports.
- **Tablet (768px - 1023px)**: 8 columns, 20px gutters, and 24px margins. Room listing cards reflow to a 2-column format; search strips stack into two rows (destination/dates above guests/cta).
- **Mobile (< 768px)**: 4 columns, 16px (`gutter-mobile`), and 16px (`margin-mobile`). Resort cards transition into edge-to-edge carousel slides with 16px peek margins, while sticky bottom floating action bars secure instant room reservations.
- **Rhythm**: Spacing follows a consistent 8pt-based base progression. Generous vertical section spacing (`5rem` to `7rem`) ensures transitions between resort showcases, amenities, and guest reviews feel serene and uncluttered.

## Elevation & Depth

Visual depth combines warm atmospheric shadows with clean, light-permeable structural separation. Avoid harsh synthetic drop shadows in favor of ambient, slate-tinted diffusion.

- **Level 0 (Flat)**: The Warm Sand canvas (`#F8F6F0`). Background sections that feature lifestyle storytelling use subtle tinting (`#F1ECE1`) with zero shadow.
- **Level 1 (Card Resting)**: Applied to resort cards, room specification sheets, and content containers. Uses a crisp border of `rgba(15, 23, 42, 0.05)` layered with a warm diffuse shadow: `0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Interactive Floating)**: Applied to interactive date pickers, elevated filters, active card hovers, and reservation summary sidebars: `0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Overlays & Dialogs)**: Search modal windows and guest checkout sheets: `0 24px 48px -12px rgba(15, 23, 42, 0.16)`. Combined with a backdrop blur `backdrop-blur-md` and warm semi-translucent scrim `rgba(15, 23, 42, 0.4)`.

## Shapes

The design system employs **Rounded (Level 2)** geometry:
- Default elements (inputs, standard buttons, dropdown triggers) feature `0.5rem` (8px) corner radius.
- Cards, booking search strips, and modal sheets use `rounded-xl` (`1.5rem` / 24px) for a soft architectural feel.
- Visual media (hero photography, suite galleries) utilizes asymmetric curves where appropriate, such as `rounded-2xl` (28px) with occasional organic arched mask variations for editorial collection spotlights.
- Interactive status indicators, date indicators, and iconography chips transition into pill curves (`9999px`) to visually separate informative micro-elements from foundational structural containers.

## Components

### Buttons
- **Primary**: Deep Ocean Slate (`#0F172A`) solid background, pure white text, 8px radius, height 48px, subtle hover lift with fuchsia-tinted shadow transition.
- **Secondary (Accent Action)**: Vibrant Fuchsia (`#F61CF4`) solid background, pure white text, utilized strictly for high-conversion booking actions ("Book This Suite", "Check Availability").
- **Tertiary / Ghost**: Crisp border `rgba(15, 23, 42, 0.12)`, text `#0F172A`, transparent surface transitioning to Warm Sand (`#F1ECE1`) on hover.
- **Link Buttons**: Underlined text in `#0F172A` with an animated fuchsia arrow glyph that shifts +4px on interaction.

### Booking Search Bar & Inputs
- **Search Strip Container**: White surface (`#FFFFFF`), `rounded-xl` (24px) border radius, Level 2 ambient shadow.
- **Fields (Dates, Destination, Guests)**: Subtle vertical dividers between segments (`rgba(15, 23, 42, 0.08)`). Focus states illuminate the internal box with a fuchsia tint (`rgba(246, 28, 244, 0.08)`) and sharp 1.5px focus ring in `#F61CF4`.
- **Inputs**: Floating label typography (`label-sm`), main value displayed in `title-md` (`#0F172A`).

### Property & Room Cards
- **Structure**: Surface `#FFFFFF`, border radius `rounded-xl` (24px), overflow hidden.
- **Imagery**: 4:3 or 16:9 ratio with slow zoom on hover (`scale-105` duration-500 ease-out). Overlay badge top-right for guest rating (Vibrant Fuchsia pill with gold/fuchsia star icon).
- **Content Area**: 24px interior padding (`space-lg`). Playfair Display for suite names, followed by a muted dot-separated list of key amenities (King Bed • Ocean View • 85m²), terminating in a split footer containing base rate per night and "View Villa" link.

### Chips & Badges
- **Status Badges**:
  - **Confirmed**: Background `#ECFDF5`, text `#059669`, with a solid emerald status dot.
  - **Pending**: Background `#FDF4FF`, text `#F61CF4`, with a blinking fuchsia status dot.
  - **Cancelled**: Background `#FFF1F2`, text `#BE123C`, with a subdued crimson dot.
- **Amenity Chips**: Background `#F8F6F0`, border `rgba(15, 23, 42, 0.06)`, text `#1E293B`, pill-rounded (`9999px`), paired with clean vector micro-icons (e.g., infinity pool, spa, private butler).

### Checkboxes & Radios
- **Checkboxes**: 20px box, `rounded` (4px), border `rgba(15, 23, 42, 0.25)`. Checked state fills with `#0F172A` with a crisp white checkmark.
- **Radio Buttons**: 20px circular frame, checked state features a distinct inner dot in Vibrant Fuchsia (`#F61CF4`) against white, surrounded by `#0F172A` boundary.

### Lists & Inventory Summaries
- **Price Breakdown**: Alternating subtle rows with clean tabular numbers (`Plus Jakarta Sans`), right-aligned charges, and an emphatic bottom rule leading to a bold total row with all-inclusive fee breakdowns clearly stated.