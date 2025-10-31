# Mobile Responsiveness Implementation Plan

**Goal**: Make the GRY GRILLZ site mobile-friendly while preserving all desktop functionality and layout.

**Approach**: Desktop-first responsive design using Tailwind CSS breakpoints.

**Key Principle**: All desktop styles remain unchanged. Mobile styles are added using base Tailwind classes (applied to mobile by default), with desktop overrides using `md:` and `lg:` breakpoints.

---

## Tailwind Breakpoint Reference

```
Base (default) = Mobile (< 768px)
md: = Tablet and up (≥ 768px)
lg: = Desktop and up (≥ 1024px)
xl: = Large desktop (≥ 1280px)
```

**Strategy**: Apply mobile-first classes, then use `md:` or `lg:` prefix to restore desktop behavior.

---

## Desktop Preservation Guardrails

### How This Approach Guarantees Desktop Won't Change

The core protection mechanism is **Tailwind's `lg:` breakpoint prefix**, which acts as a safety barrier to preserve all desktop styles.

#### The Override Pattern

Every mobile change includes its desktop counterpart:

```tsx
// ❌ BAD - This changes desktop too
<div className="flex-col gap-4">

// ✅ GOOD - Desktop preserved
<div className="flex-col gap-4 lg:absolute lg:left-[8%] lg:top-[55%] lg:w-[84%]">
```

**What happens:**
- **Below 1024px (mobile/tablet)**: Uses `flex-col gap-4`
- **At 1024px+ (desktop)**: `lg:` classes **completely override** mobile classes and restore original behavior

#### How CSS Specificity Protects Desktop

When you write:
```tsx
className="flex-col lg:absolute"
```

Tailwind generates:
```css
.flex-col { display: flex; flex-direction: column; }

@media (min-width: 1024px) {
  .lg\:absolute { position: absolute; }
}
```

**At 1024px+, the media query takes precedence** and completely replaces the mobile style. The mobile class becomes inactive.

#### Real Example: Grillz Section

**Current desktop code:**
```tsx
<div className="absolute left-[8%] top-[55%] flex-col w-[84%]">
```

**Mobile-responsive version:**
```tsx
<div className="flex flex-col gap-4 w-full lg:absolute lg:left-[8%] lg:top-[55%] lg:w-[84%] lg:gap-0">
```

**Behavior at each screen size:**

| Screen Width | Active Classes | Result |
|-------------|----------------|---------|
| 375px (mobile) | `flex flex-col gap-4 w-full` | Stacked layout, 16px gap, full width |
| 768px (tablet) | `flex flex-col gap-4 w-full` | Same as mobile |
| 1024px+ (desktop) | `lg:absolute lg:left-[8%] lg:top-[55%] lg:w-[84%] lg:gap-0` | **EXACTLY the original desktop design** |

The mobile classes are **completely overridden** and have zero effect on desktop.

---

### Guardrails Built Into This Document

#### 1. Desktop Override Pattern Throughout

Every change uses this pattern consistently:

| Component | Mobile | Desktop Override |
|-----------|--------|------------------|
| Body padding | `padding: 1rem` | `@media (min-width: 1024px) { padding: 3.75rem }` |
| Navigation | `transform: -translate-x-full` | `lg:translate-x-0` |
| Grillz Section | `flex flex-col gap-6` | `lg:relative lg:flex-none lg:gap-0` |
| Typography | `text-5xl` | `lg:text-8xl` |
| Cart Grid | `flex flex-col gap-4` | `lg:grid lg:grid-cols-[400px_1fr_200px_200px]` |

#### 2. Explicit "Desktop Behavior Preserved" Sections

Every change includes a section confirming what desktop behavior remains unchanged.

#### 3. Desktop Preservation Checklist

Before implementing any change, verify (see full checklist on page 1069):
- [ ] Desktop classes preserved with `lg:` prefix
- [ ] Original dimensions maintained on large screens
- [ ] Absolute positioning kept on desktop (if used)
- [ ] Typography sizes unchanged on desktop
- [ ] Spacing (padding/margins) identical on desktop

#### 4. Breakpoint Choice: 1024px (`lg:`)

We specifically chose `lg:` (1024px) because:
- Your current desktop design is optimized for ~1200px+ screens
- Below 1024px, most desktop layouts break anyway
- At 1024px+, we restore **every** desktop style exactly as it was

---

### What Could Go Wrong & How to Prevent It

#### Potential Issue #1: Forgetting `lg:` Prefix

**Risk:**
```tsx
// ❌ Removes absolute positioning on ALL screen sizes
<div className="flex flex-col">
```

**Prevention:**
- This document explicitly shows `lg:` prefixes for every override
- The checklist requires verifying `lg:` usage
- Test at 1024px+ width immediately after each change

#### Potential Issue #2: Conflicting Classes

**Risk:**
```tsx
// ❌ Gap-0 might not override gap-4
<div className="gap-4 lg:gap-0">
```

**Prevention:**
- Tailwind's specificity rules handle this correctly (media query wins)
- Testing at 1024px+ verifies overrides work
- In rare conflicts, use `!important` with `lg:!gap-0`

#### Potential Issue #3: JavaScript-Based Responsive Logic

**Risk:** If JS detects mobile and changes behavior, it might break desktop.

**Prevention:**
- Pure CSS/Tailwind approach (no JS layout logic)
- Only JS is navigation menu open/close state
- State is scoped to mobile only (`className="... lg:hidden"`)

---

### How to Verify Desktop is Untouched

#### Simple Visual Test:

1. **Before implementing changes:**
   - Open site at 1280px width in browser
   - Take screenshots: Home, Grillz, Archive, Cart, Product pages

2. **After implementing changes:**
   - Open site at 1280px width
   - Take new screenshots of same pages

3. **Compare:** Should be pixel-perfect identical at 1280px+

#### Browser DevTools Test:

```
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
3. Set width to 1280px
4. Navigate through site - verify desktop design intact
5. Change width to 375px - see mobile changes
6. Change back to 1280px - verify desktop restored perfectly
```

#### Incremental Testing Approach:

- Change one component at a time
- Test desktop immediately after each change
- Verify at 1024px, 1280px, and 1920px widths
- Roll back if any desktop regression detected
- Move to next component only after desktop verified

#### Separate Git Commits:

```bash
git commit -m "Add mobile nav - desktop unchanged at 1024px+"
git commit -m "Make Grillz section responsive - desktop preserved"
git commit -m "Responsive cart layout - desktop grid maintained"
```

This allows instant rollback of any problematic change.

---

### Confidence Level: Very High ✅

**Why desktop won't change:**

1. **Tailwind's media queries are predictable** - they follow standard CSS cascade rules
2. **Every desktop class is explicitly restored** with `lg:` prefix
3. **No removal of existing code** - only adding additional responsive classes
4. **Incremental approach** - test after each change before proceeding
5. **Rollback is trivial** - git revert any problematic commit

**The only way desktop breaks is if:**
- You forget to add `lg:` prefixes (document prevents this)
- You delete original classes instead of adding them with `lg:` (document shows keeping them)
- Browser bug with media queries (extremely unlikely in modern browsers)

---

### Summary: The Safety Net

1. **CSS Level**: Media queries at 1024px+ restore all desktop styles
2. **Documentation Level**: Every change shows both mobile and `lg:` override
3. **Testing Level**: Verify desktop at 1024px+ after each component
4. **Version Control Level**: Separate commits allow easy rollback

This multi-layered approach ensures desktop functionality and layout remain **pixel-perfect** while making mobile usable.

---

## Part 1: Site General Changes

These changes apply globally across the entire site.

### 1.1 Global CSS - Responsive Body Padding

**File**: `src/app/globals.css`

**Current State**:
```css
body {
  padding-left: 60px;
  padding-right: 60px;
}
```

**Problem**: 60px padding on mobile (375px wide) leaves only 255px for content.

**Solution**: Use responsive padding that scales with screen size.

**Change**:
```css
body {
  padding-left: 1rem; /* 16px on mobile */
  padding-right: 1rem;
}

@media (min-width: 768px) {
  body {
    padding-left: 2rem; /* 32px on tablet */
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  body {
    padding-left: 3.75rem; /* 60px on desktop - preserves current design */
    padding-right: 3.75rem;
  }
}
```

**Estimated Time**: 0.5 hours

---

### 1.2 Root Layout - Viewport Meta Tag

**File**: `src/app/layout.tsx`

**Current State**: No explicit viewport configuration in metadata.

**Problem**: May cause zoom/scaling issues on mobile devices.

**Solution**: Add viewport meta tag to metadata export.

**Change**: Add to the `metadata` export:
```typescript
export const metadata = {
  // ... existing metadata
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}
```

**Estimated Time**: 0.25 hours

---

### 1.3 Navigation - Mobile Hamburger Menu

**File**: `src/components/Nav.tsx`

**Current State**:
- Fixed sidebar with `w-64` (256px width)
- Always visible on left side
- Uses `h-screen sticky top-0` positioning
- Logo: `text-8xl` (96px font)
- Menu items: `text-lg`

**Problem**: Sidebar takes up 68% of mobile screen width (256px / 375px).

**Solution**:
- Hide sidebar on mobile by default
- Add hamburger menu button (top-right corner)
- Sidebar slides in from left when opened
- Close button inside sidebar
- Overlay/backdrop when sidebar open
- Desktop: unchanged (sidebar always visible)

**Implementation Details**:

1. **Add state management**:
```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

2. **Hamburger Button** (visible only on mobile):
```tsx
{/* Hamburger button - hidden on desktop */}
<button
  onClick={() => setIsMobileMenuOpen(true)}
  className="fixed top-4 right-4 z-50 lg:hidden bg-white p-3 rounded-md shadow-lg"
  aria-label="Open menu"
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>
```

3. **Backdrop overlay** (mobile only):
```tsx
{/* Backdrop - only visible when mobile menu open */}
{isMobileMenuOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onClick={() => setIsMobileMenuOpen(false)}
  />
)}
```

4. **Sidebar modifications**:
```tsx
<div className={`
  fixed lg:sticky
  top-0 left-0
  h-screen w-64
  bg-white
  z-50
  transform transition-transform duration-300 ease-in-out
  ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
`}>
  {/* Close button - mobile only */}
  <button
    onClick={() => setIsMobileMenuOpen(false)}
    className="absolute top-4 right-4 lg:hidden"
    aria-label="Close menu"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  {/* Existing nav content */}
  {children}
</div>
```

5. **Close menu on navigation**: Add `onClick={() => setIsMobileMenuOpen(false)}` to all Link components inside nav.

**Desktop Behavior Preserved**:
- Sidebar always visible (`lg:translate-x-0`)
- Hamburger button hidden (`lg:hidden`)
- No backdrop on desktop
- All existing positioning and styling intact

**Estimated Time**: 3 hours

---

### 1.4 Typography - Responsive Text Sizing

**Applies to**: All components using large fixed text sizes.

**Current State**: Many components use `text-8xl` (96px), `text-7xl` (72px), `text-6xl` (60px) which are too large for mobile.

**Solution**: Scale down typography on mobile, restore desktop sizes.

**Standard Responsive Text Scale**:
```
Desktop (lg:)          Mobile (base)
text-8xl (96px)   →    text-5xl (48px)
text-7xl (72px)   →    text-4xl (36px)
text-6xl (60px)   →    text-3xl (30px)
text-5xl (48px)   →    text-2xl (24px)
text-4xl (36px)   →    text-xl (20px)
text-3xl (30px)   →    text-lg (18px)
```

**Implementation Pattern**:
Replace: `text-8xl`
With: `text-5xl lg:text-8xl`

**Files to Update**: (Details in Part 2 - Page Specific Changes)
- `LandingHero.tsx`
- `GrillzSection.tsx`
- `TShirtSection.tsx`
- `Nav.tsx` (logo)
- `grillz/page.tsx`
- `products/[handle]/ProductClient.tsx`

**Estimated Time**: 1.5 hours (distributed across page-specific changes)

---

### 1.5 Spacing - Responsive Padding & Margins

**Current State**: Many components use large fixed padding like `pb-32`, `pt-24`, `pl-16`.

**Solution**: Reduce spacing on mobile.

**Standard Responsive Spacing Scale**:
```
Desktop (lg:)          Mobile (base)
p-32 (128px)      →    p-8 (32px)
p-24 (96px)       →    p-6 (24px)
p-16 (64px)       →    p-4 (16px)
p-12 (48px)       →    p-3 (12px)
p-8 (32px)        →    p-2 (8px)
```

**Implementation Pattern**:
Replace: `pb-32`
With: `pb-8 lg:pb-32`

**Files to Update**: (Details in Part 2)
- `LandingHero.tsx`
- `TShirtSection.tsx`
- `grillz/page.tsx`
- `ProductClient.tsx`

**Estimated Time**: 1 hour (distributed across page-specific changes)

---

## Part 2: Page Specific Changes

These changes apply to individual pages and components.

---

### 2.1 Landing Hero - Logo & Container Padding

**File**: `src/components/LandingHero.tsx`

**Current State**:
```tsx
<div className="w-screen h-[100vh] bg-[#F8F9FA] flex items-start justify-start pl-16 pb-16">
  <h1 className="text-8xl font-['Linden_Hill'] self-end tracking-[15px]">GRY</h1>
</div>
```

**Changes Needed**:

1. **Responsive padding**:
```tsx
className="w-screen h-[100vh] bg-[#F8F9FA] flex items-start justify-start pl-4 pb-4 lg:pl-16 lg:pb-16"
```

2. **Responsive logo text**:
```tsx
<h1 className="text-5xl lg:text-8xl font-['Linden_Hill'] self-end tracking-[8px] lg:tracking-[15px]">
  GRY
</h1>
```

**Desktop Behavior Preserved**: Logo size and positioning unchanged on desktop.

**Estimated Time**: 1 hour

---

### 2.2 Grillz Section - Absolute Positioning to Flex Layout

**File**: `src/components/GrillzSection.tsx`

**Current State**:
- Container: `min-h-[700px] relative`
- Image 1: `absolute left-[8%] top-[5%] w-[22%]`
- Image 2: `absolute left-[35%] top-[15%] w-[22%]`
- Image 3: `absolute left-[62%] top-[5%] w-[22%]`
- Text: `absolute left-[8%] top-[55%] flex-col w-[84%]`
- Heading: `text-8xl`
- Subheading: `text-7xl`

**Problem**: Absolute positioning with percentages doesn't adapt to mobile. Images overlap or disappear.

**Solution**:
- **Mobile**: Stack images and text vertically using flexbox
- **Desktop**: Keep absolute positioning exactly as is

**Implementation**:

1. **Container changes**:
```tsx
<div className="
  flex flex-col gap-6 py-8
  lg:min-h-[700px] lg:relative lg:flex-none lg:py-0 lg:gap-0
">
```

2. **Images - Mobile stacked, Desktop absolute**:
```tsx
{/* Image 1 */}
<div className="relative w-full h-64 lg:absolute lg:left-[8%] lg:top-[5%] lg:w-[22%] lg:h-auto">
  <Image src={imageSrc1} alt="..." fill className="object-cover" />
</div>

{/* Image 2 */}
<div className="relative w-full h-64 lg:absolute lg:left-[35%] lg:top-[15%] lg:w-[22%] lg:h-auto">
  <Image src={imageSrc2} alt="..." fill className="object-cover" />
</div>

{/* Image 3 */}
<div className="relative w-full h-64 lg:absolute lg:left-[62%] lg:top-[5%] lg:w-[22%] lg:h-auto">
  <Image src={imageSrc3} alt="..." fill className="object-cover" />
</div>
```

3. **Text content - Mobile stacked, Desktop absolute**:
```tsx
<div className="
  flex flex-col gap-4 w-full
  lg:absolute lg:left-[8%] lg:top-[55%] lg:w-[84%] lg:gap-0
">
  <h2 className="text-4xl lg:text-8xl font-['Linden_Hill'] tracking-[8px] lg:tracking-[15px]">
    GRILLZ
  </h2>
  <p className="text-3xl lg:text-7xl font-['Linden_Hill'] tracking-[6px] lg:tracking-[10px]">
    FRA 2500 KR
  </p>
  <a href="/grillz" className="text-base lg:text-lg underline mt-2">
    SE MERE
  </a>
</div>
```

**Key Classes Explained**:
- Base classes apply to mobile (flex layout)
- `lg:` prefix restores desktop absolute positioning
- `lg:flex-none` removes flexbox behavior on desktop
- `lg:py-0 lg:gap-0` removes mobile spacing on desktop

**Desktop Behavior Preserved**: All absolute positioning, dimensions, and spacing identical to current.

**Estimated Time**: 2 hours

---

### 2.3 Ring Section - Flex Wrap

**File**: `src/components/RingSection.tsx`

**Current State**:
```tsx
<div className="inline-flex justify-end gap-8 self-stretch">
  <RingCard />
  <RingCard />
  <RingCard />
</div>
```

**Problem**: `inline-flex` with no wrapping forces all items in one row, causing horizontal overflow on mobile.

**Solution**: Allow wrapping on mobile, keep single row on desktop.

**Change**:
```tsx
<div className="flex flex-wrap justify-center gap-4 lg:inline-flex lg:justify-end lg:gap-8 self-stretch">
  <RingCard />
  <RingCard />
  <RingCard />
</div>
```

**Breakdown**:
- Mobile: `flex flex-wrap justify-center gap-4` - wraps to multiple rows, centered
- Desktop: `lg:inline-flex lg:justify-end lg:gap-8` - restores current right-aligned single-row layout

**RingCard.tsx** (if needed):
```tsx
{/* Add width constraints if cards are too wide on mobile */}
<div className="flex-col ... w-full max-w-sm lg:w-auto lg:max-w-none">
```

**Desktop Behavior Preserved**: Right-aligned single row with 8px gap.

**Estimated Time**: 1 hour

---

### 2.4 T-Shirt Section - Flex Wrap & Responsive Sizing

**File**: `src/components/TShirtSection.tsx`

**Current State**:
```tsx
<div className="inline-flex items-start justify-start gap-8 pb-32 self-stretch">
  <Image src="..." width={600} height={700} />
  <div className="flex-col w-96 gap-4">
    <h2 className="text-6xl">T-SHIRTS</h2>
    <p className="text-5xl">FRA 400 KR</p>
    <a className="text-lg">SE MERE</a>
  </div>
</div>
```

**Problem**:
- Side-by-side layout too wide for mobile
- Image 600px + text 384px = 984px minimum width
- Fixed text sizes too large

**Solution**: Stack vertically on mobile, side-by-side on desktop.

**Changes**:

1. **Container**:
```tsx
<div className="
  flex flex-col items-center gap-6 pb-8
  lg:inline-flex lg:flex-row lg:items-start lg:justify-start lg:gap-8 lg:pb-32
  self-stretch
">
```

2. **Image**:
```tsx
<div className="relative w-full max-w-md h-96 lg:w-auto lg:h-auto lg:max-w-none">
  <Image
    src="..."
    width={600}
    height={700}
    className="object-cover w-full h-full lg:w-auto lg:h-auto"
  />
</div>
```

3. **Text content**:
```tsx
<div className="flex-col w-full max-w-md lg:w-96 gap-4">
  <h2 className="text-3xl lg:text-6xl font-['Linden_Hill'] tracking-[6px] lg:tracking-[10px]">
    T-SHIRTS
  </h2>
  <p className="text-2xl lg:text-5xl font-['Linden_Hill'] tracking-[4px] lg:tracking-[8px]">
    FRA 400 KR
  </p>
  <a href="/archive?category=tshirt" className="text-base lg:text-lg underline">
    SE MERE
  </a>
</div>
```

**Desktop Behavior Preserved**: Side-by-side layout, exact same sizing and spacing.

**Estimated Time**: 1.5 hours

---

### 2.5 Archive Category Section - Responsive Grid

**File**: `src/components/ArchiveCategorySection.tsx`

**Current State**:
```tsx
<div className="grid grid-cols-3 gap-8 w-full">
  {categories.map(...)}
</div>
```

**Problem**: 3 columns on mobile (125px each on 375px screen) makes items too small.

**Solution**: Single column on mobile, 2 columns on tablet, 3 columns on desktop.

**Change**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
  {categories.map(...)}
</div>
```

**Breakdown**:
- Mobile: `grid-cols-1 gap-4` - single column, 16px gap
- Tablet: `md:grid-cols-2 md:gap-6` - 2 columns, 24px gap
- Desktop: `lg:grid-cols-3 lg:gap-8` - 3 columns, 32px gap (current design)

**Desktop Behavior Preserved**: 3-column grid with 32px gap.

**Estimated Time**: 0.5 hours

---

### 2.6 Archive Page - Responsive Product Grid

**File**: `src/app/archive/page.tsx`

**Current State**:
```tsx
<div className="grid grid-cols-3 gap-8 w-full">
  {products.map((product) => (
    <Link href={`/products/${product.node.handle}`}>
      <div className="w-full aspect-square relative">
        <Image src={...} fill />
      </div>
      <h3 className="text-xl">{product.node.title}</h3>
      <p className="text-lg">{product.node.priceRange...}</p>
    </Link>
  ))}
</div>
```

**Problem**: Same as category section - 3 columns too many for mobile.

**Solution**: Responsive grid.

**Changes**:

1. **Grid container**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
```

2. **Product card text** (if too large):
```tsx
<h3 className="text-lg lg:text-xl mt-2">{product.node.title}</h3>
<p className="text-base lg:text-lg text-gray-600">{product.node.priceRange...}</p>
```

**Desktop Behavior Preserved**: 3-column grid unchanged.

**Estimated Time**: 0.5 hours

---

### 2.7 Grillz Page - Banner & Text Blocks

**File**: `src/app/grillz/page.tsx`

**Current State**:
```tsx
{/* Banner section */}
<div className="w-[1143px] h-96 relative">
  <Image src={bannerImage1} fill />
  <div className="absolute left-[40px] top-[40px]">
    <h1 className="text-8xl">GRILLZ</h1>
  </div>
</div>

{/* Text sections with hardcoded widths */}
<div className="w-[480px]">
  <p className="text-3xl">Hver grill...</p>
</div>

<div className="w-[895px]">
  <p className="text-3xl">Vi bruger...</p>
</div>
```

**Problem**:
- Banner: 1143px fixed width overflows mobile screens
- Text blocks: 480px and 895px widths don't fit mobile
- All text too large

**Solution**: Full-width responsive containers with proper max-widths.

**Changes**:

1. **Banner section**:
```tsx
<div className="w-full max-w-7xl h-64 lg:h-96 relative mx-auto">
  <Image
    src={bannerImage1}
    fill
    className="object-cover"
    alt="Grillz banner"
  />
  <div className="absolute left-4 top-4 lg:left-[40px] lg:top-[40px]">
    <h1 className="text-5xl lg:text-8xl font-['Linden_Hill'] text-white tracking-[8px] lg:tracking-[15px]">
      GRILLZ
    </h1>
  </div>
</div>
```

2. **First text block** (480px → mobile responsive):
```tsx
<div className="w-full max-w-md lg:max-w-[480px] mx-auto lg:mx-0">
  <p className="text-lg lg:text-3xl leading-relaxed">
    Hver grill...
  </p>
</div>
```

3. **Second text block** (895px → mobile responsive):
```tsx
<div className="w-full max-w-3xl lg:max-w-[895px] mx-auto lg:mx-0">
  <p className="text-lg lg:text-3xl leading-relaxed">
    Vi bruger...
  </p>
</div>
```

4. **Booking section** (if exists with fixed widths):
```tsx
<div className="w-full max-w-md mx-auto">
  {/* Booking form content */}
</div>
```

**Key Classes**:
- `max-w-7xl` (1280px) prevents banner from getting too wide on large screens
- `max-w-md` (448px) / `max-w-3xl` (768px) provides mobile-friendly widths
- `lg:max-w-[Xpx]` restores exact desktop widths
- `mx-auto` centers on mobile, `lg:mx-0` restores left alignment on desktop

**Desktop Behavior Preserved**: All exact widths (1143px, 480px, 895px) and positioning maintained.

**Estimated Time**: 2 hours

---

### 2.8 Cart Page - Responsive Table/Cards

**File**: `src/app/cart/CartClient.tsx`

**Current State**:
```tsx
<div className="grid grid-cols-[400px_1fr_200px_200px] gap-8">
  {/* Header */}
  <div>PRODUKT</div>
  <div>BESKRIVELSE</div>
  <div>ANTAL</div>
  <div>PRIS</div>

  {/* Items */}
  {cart.lines.edges.map((line) => (
    <>
      <div className="w-full aspect-square">
        <Image src={...} fill />
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl">{line.node.merchandise.product.title}</h3>
        <p className="text-lg">{line.node.merchandise.title}</p>
      </div>
      <input type="number" className="w-24" value={line.node.quantity} />
      <div className="text-xl">{line.node.cost.totalAmount.amount} kr</div>
    </>
  ))}
</div>

{/* Summary */}
<div className="flex justify-end gap-32">
  <div>
    <p>Subtotal: {subtotal}</p>
    <p>Fragt: {shipping}</p>
    <p>Total: {total}</p>
  </div>
  <button>GÅ TIL BETALING</button>
</div>
```

**Problem**:
- Grid with fixed column widths (400px, 200px, 200px) = 800px minimum + gaps
- Doesn't fit mobile screens
- Table layout doesn't work well on small screens

**Solution**:
- **Mobile**: Card-based layout (stacked items)
- **Desktop**: Keep grid table layout exactly as is

**Changes**:

1. **Header row** (hide on mobile):
```tsx
<div className="hidden lg:grid lg:grid-cols-[400px_1fr_200px_200px] gap-8 pb-4 border-b">
  <div className="font-bold">PRODUKT</div>
  <div className="font-bold">BESKRIVELSE</div>
  <div className="font-bold">ANTAL</div>
  <div className="font-bold">PRIS</div>
</div>
```

2. **Cart items container**:
```tsx
<div className="flex flex-col gap-6 lg:gap-0">
  {cart.lines.edges.map((line) => (
    <div
      key={line.node.id}
      className="
        flex flex-col gap-4 p-4 border rounded-lg
        lg:grid lg:grid-cols-[400px_1fr_200px_200px] lg:gap-8 lg:p-0 lg:border-0 lg:rounded-none lg:py-6
      "
    >
      {/* Image */}
      <div className="relative w-full h-64 lg:w-full lg:h-auto lg:aspect-square">
        <Image
          src={line.node.merchandise.product.featuredImage.url}
          fill
          className="object-cover rounded-lg lg:rounded-none"
          alt={line.node.merchandise.product.title}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 lg:justify-center">
        <h3 className="text-xl lg:text-2xl font-['Linden_Hill']">
          {line.node.merchandise.product.title}
        </h3>
        <p className="text-base lg:text-lg text-gray-600">
          {line.node.merchandise.title}
        </p>
      </div>

      {/* Quantity - Mobile: label + input, Desktop: input only */}
      <div className="flex items-center justify-between lg:justify-center">
        <span className="lg:hidden font-bold">Antal:</span>
        <input
          type="number"
          className="w-20 lg:w-24 px-3 py-2 border rounded"
          value={line.node.quantity}
          min="1"
          onChange={(e) => handleUpdateQuantity(line.node.id, parseInt(e.target.value))}
        />
      </div>

      {/* Price - Mobile: label + price, Desktop: price only */}
      <div className="flex items-center justify-between lg:justify-center">
        <span className="lg:hidden font-bold">Pris:</span>
        <div className="text-lg lg:text-xl">
          {line.node.cost.totalAmount.amount} kr
        </div>
      </div>

      {/* Remove button (mobile only, optional) */}
      <button
        onClick={() => handleRemoveItem(line.node.id)}
        className="text-red-600 underline lg:hidden"
      >
        Fjern
      </button>
    </div>
  ))}
</div>
```

3. **Cart summary**:
```tsx
<div className="
  flex flex-col gap-6 mt-8 pt-8 border-t
  lg:flex-row lg:justify-end lg:gap-32
">
  {/* Summary details */}
  <div className="flex flex-col gap-2 text-lg lg:text-xl">
    <div className="flex justify-between">
      <span>Subtotal:</span>
      <span>{cart.cost.subtotalAmount.amount} kr</span>
    </div>
    <div className="flex justify-between">
      <span>Fragt:</span>
      <span>Beregnes ved betaling</span>
    </div>
    <div className="flex justify-between font-bold text-xl lg:text-2xl pt-2 border-t">
      <span>Total:</span>
      <span>{cart.cost.totalAmount.amount} kr</span>
    </div>
  </div>

  {/* Checkout button */}
  <button className="
    w-full lg:w-auto
    px-8 py-4
    bg-black text-white
    text-lg lg:text-xl
    hover:bg-gray-800
    transition-colors
  ">
    GÅ TIL BETALING
  </button>
</div>
```

**Breakdown**:
- **Mobile**: Each cart item is a card with vertical layout, labels visible
- **Desktop**: Grid table layout with fixed columns, labels hidden (in header)
- Summary stacks on mobile, side-by-side on desktop
- Button full-width on mobile, auto-width on desktop

**Desktop Behavior Preserved**: Exact grid column widths (400px, 1fr, 200px, 200px) and spacing.

**Estimated Time**: 3 hours

---

### 2.9 Product Page - Responsive Layout

**File**: `src/app/products/[handle]/ProductClient.tsx`

**Current State**:
```tsx
<div className="flex gap-16">
  {/* Left: Image */}
  <div className="sticky top-0 h-screen w-[640px]">
    <Image src={...} fill />
  </div>

  {/* Right: Details */}
  <div className="flex-col gap-6 w-96">
    <h1 className="text-6xl">{product.title}</h1>
    <p className="text-5xl">{product.priceRange...}</p>
    <div className="text-lg">{product.description}</div>

    {/* Variant selector */}
    <select className="w-full p-4 text-lg">
      {product.variants...}
    </select>

    {/* Add to cart button */}
    <button className="w-full py-4 text-xl">
      TILFØJ TIL KURV
    </button>
  </div>
</div>
```

**Problem**:
- Side-by-side: 640px + gap + 384px = 1040px minimum width
- Sticky positioning may conflict with mobile navigation
- Large text sizes don't fit mobile

**Solution**: Stack vertically on mobile, side-by-side on desktop.

**Changes**:

1. **Main container**:
```tsx
<div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
```

2. **Image section**:
```tsx
<div className="
  relative w-full h-96
  lg:sticky lg:top-0 lg:h-screen lg:w-[640px]
">
  <Image
    src={product.featuredImage.url}
    fill
    className="object-cover"
    alt={product.title}
  />
</div>
```

3. **Details section**:
```tsx
<div className="flex-col gap-4 lg:gap-6 w-full lg:w-96">
  {/* Title */}
  <h1 className="text-3xl lg:text-6xl font-['Linden_Hill'] tracking-[6px] lg:tracking-[10px]">
    {product.title}
  </h1>

  {/* Price */}
  <p className="text-2xl lg:text-5xl font-['Linden_Hill'] tracking-[4px] lg:tracking-[8px]">
    {product.priceRange.minVariantPrice.amount} kr
  </p>

  {/* Description */}
  <div className="text-base lg:text-lg leading-relaxed">
    {product.description}
  </div>

  {/* Variant selector */}
  <select className="
    w-full p-3 lg:p-4
    text-base lg:text-lg
    border border-gray-300 rounded
    focus:outline-none focus:ring-2 focus:ring-black
  ">
    {product.variants.edges.map((variant) => (
      <option key={variant.node.id} value={variant.node.id}>
        {variant.node.title}
      </option>
    ))}
  </select>

  {/* Add to cart button */}
  <button className="
    w-full py-3 lg:py-4
    bg-black text-white
    text-lg lg:text-xl
    hover:bg-gray-800
    transition-colors
    disabled:bg-gray-400 disabled:cursor-not-allowed
  ">
    TILFØJ TIL KURV
  </button>

  {/* Additional product info (if any) */}
  <div className="text-sm lg:text-base text-gray-600 mt-4">
    {/* Shipping info, return policy, etc. */}
  </div>
</div>
```

**Key Changes**:
- Image: `h-96` on mobile (fixed height), full screen height on desktop
- Sticky positioning only active on desktop (`lg:sticky lg:top-0`)
- Text scales down appropriately
- Full width details on mobile, fixed `w-96` on desktop
- Touch-friendly button sizing (py-3 on mobile)

**Desktop Behavior Preserved**: Side-by-side layout, sticky image, exact widths (640px, 384px).

**Estimated Time**: 2 hours

---

### 2.10 Footer - Minor Responsive Tweaks

**File**: `src/components/Footer.tsx`

**Current State**: Already mostly responsive with `flex items-center justify-between`.

**Minor Improvements** (if needed):

1. **Reduce gap on mobile**:
```tsx
<footer className="flex items-center justify-between gap-4 lg:gap-8 py-8">
```

2. **Stack vertically on very small screens** (optional):
```tsx
<footer className="
  flex flex-col sm:flex-row
  items-center justify-between
  gap-4 lg:gap-8
  py-6 lg:py-8
">
```

3. **Responsive text**:
```tsx
<p className="text-sm lg:text-base">© 2025 GRY GRILLZ</p>
```

**Desktop Behavior Preserved**: Horizontal layout with 8px gap.

**Estimated Time**: 0.5 hours (optional)

---

## Part 3: Testing & Refinement

### 3.1 Cross-Device Testing

**Devices to Test**:
- iPhone SE (375px) - smallest common mobile
- iPhone 12/13 (390px)
- iPhone Pro Max (428px)
- iPad Mini (768px) - tablet breakpoint
- iPad Pro (1024px) - desktop breakpoint
- Desktop (1280px+)

**Test in**:
- Chrome DevTools device emulator
- Real iOS device (if available)
- Real Android device (if available)

**Test Cases**:
1. Navigation menu opens/closes smoothly
2. All images load and display properly
3. Text is readable (not too small or too large)
4. Buttons are tappable (min 44x44px touch target)
5. Forms and inputs are usable
6. No horizontal scrolling on any page
7. Cart functions properly (add/update/remove)
8. Checkout flow works

**Estimated Time**: 3 hours

---

### 3.2 Performance Optimization (Optional)

**Improvements**:
1. Lazy load images below the fold
2. Add `loading="lazy"` to Image components
3. Use responsive image sizes: `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"`
4. Optimize large images for mobile (serve smaller versions)

**Estimated Time**: 2 hours (optional)

---

### 3.3 Accessibility Improvements

**Quick Wins**:
1. Ensure all images have alt text
2. Add aria-labels to icon buttons (hamburger, close)
3. Test keyboard navigation (tab through menu)
4. Check color contrast ratios (WCAG AA standard)
5. Add focus states to interactive elements

**Estimated Time**: 1 hour

---

## Summary

### Total Time Estimates

**Minimum Viable Mobile (Part 1 & Core Part 2)**:
- Site General: 5.5 hours
- Page Specific (Core): 10.5 hours
- Testing: 3 hours
- **Total: 19 hours (~2.5 work days)**

**Polished Mobile Experience (All Parts)**:
- Site General: 5.5 hours
- Page Specific (All): 13.5 hours
- Testing: 3 hours
- Performance: 2 hours
- Accessibility: 1 hour
- **Total: 25 hours (~3 work days)**

---

## Implementation Order (Recommended)

### Phase 1: Critical Blockers (10 hours)
1. Global CSS body padding (0.5h)
2. Navigation hamburger menu (3h)
3. Cart page responsive layout (3h)
4. Product page responsive layout (2h)
5. Typography scaling (1.5h)

### Phase 2: Layout Fixes (8 hours)
6. Grillz Section absolute → flex (2h)
7. Ring Section flex wrap (1h)
8. T-Shirt Section responsive (1.5h)
9. Grillz Page banner & text (2h)
10. Archive grids (1h)
11. Landing Hero (0.5h)

### Phase 3: Testing & Polish (7 hours)
12. Cross-device testing (3h)
13. Bug fixes from testing (2h)
14. Accessibility improvements (1h)
15. Performance optimization (1h)

---

## Desktop Preservation Checklist

Before implementing any change, verify:
- [ ] Desktop classes preserved with `lg:` prefix
- [ ] Original dimensions maintained on large screens
- [ ] Absolute positioning kept on desktop (if used)
- [ ] Typography sizes unchanged on desktop
- [ ] Spacing (padding/margins) identical on desktop
- [ ] Grid layouts maintain desktop column counts
- [ ] No visual regressions on 1024px+ screens

---

## Notes for Implementation

### Best Practices
1. **Test on real devices**: Emulators don't always match real behavior
2. **Start with smallest screen**: Build mobile-first, then add desktop overrides
3. **Use browser DevTools**: Chrome/Firefox have excellent responsive design modes
4. **Check touch targets**: Minimum 44x44px for tappable elements
5. **Test with slow network**: Ensure images load gracefully
6. **Validate HTML**: Ensure semantic structure for SEO/accessibility

### Common Pitfalls
- Forgetting to encode cart IDs in URLs (see CLAUDE.md)
- Not testing navigation menu close on link click
- Overlooking horizontal scroll on small screens
- Missing focus states for keyboard users
- Hardcoding pixel values instead of using responsive classes

### Tailwind Tips
- Use `min-h-screen` instead of `h-screen` for mobile to prevent cut-off content
- Prefer `max-w-*` classes for responsive containers
- Use `aspect-ratio` for consistent image proportions
- Leverage `object-cover` / `object-contain` for responsive images
- Use `space-y-*` / `space-x-*` for consistent spacing

---

## Questions?

Before implementation, consider:
1. Do we need to support IE11 or older browsers? (affects CSS Grid usage)
2. What's the minimum supported screen width? (320px? 375px?)
3. Should tablet (768-1023px) have its own distinct layout, or closer to mobile/desktop?
4. Are there any brand guidelines for mobile typography/spacing?
5. Do we need offline support / PWA functionality?

---

**Document Version**: 1.0
**Last Updated**: 2025-10-30
**Author**: Claude Code
**Project**: GRY GRILLZ Mobile Responsiveness
