

## Plan: Native "עד אלי" + Remove "שירותים וספקים"

### What We're Doing
1. Remove the "שירותים וספקים" (`/services`) route and nav link (duplicate)
2. Replace the iframe-based `AdElai` page with a fully native React implementation converted from the uploaded HTML

### Content Structure (from HTML source)
The tool has **2 main views**:

**View 1 — Search Services & Equipment**
- Hero with search bar + region/rating filters
- Type tabs: "שירותים אישיים" / "ציוד ומוצרים"
- Category chip filters (8 service categories, 6 equipment categories)
- Cards grid with provider data (9 service cards + 6 equipment cards)
- Each card: category badge, name, description, service tags, rating, region, phone, actions
- Trust badges: "מומלץ", Truvify verified, "תעודת יושר"
- Truvify info modal, Legal terms modal, Contact (registration-required) modal
- Platform disclaimer bar

**View 2 — Provider Registration Wizard (5 steps)**
- Step 1: Personal/business details form
- Step 2: Service/equipment selection (chip grid with 17 service + 8 equipment options)
- Step 3: Region selection (9 region cards) + hours
- Step 4: Pricing with dynamic rows (fixed/variable price), 10% discount commitment
- Step 5: Confirmation — disclaimers, insurance declaration, Truvify opt-in (₪50), checkboxes, references
- Step 6: Success screen with option to add another service

### Implementation Steps

1. **Create `src/lib/ad-elai-data.ts`**
   - All provider/equipment card data as typed arrays
   - Category definitions for services and equipment
   - Region list, Truvify check items, legal terms text

2. **Create `src/pages/AdElai.tsx`** (rewrite from scratch)
   - Two-view layout using state toggle (search vs register)
   - **Search view**: Hero with search + filters, type tabs, category chips, card grid with filtering logic (by text, category, region, rating)
   - **Register view**: Multi-step wizard with progress indicator, form validation, chip selection, region selection, pricing rows (add/remove), checkboxes
   - Modals: Truvify info, Legal terms, Contact gate
   - All using existing shadcn components (Card, Badge, Button, Input, Dialog, Tabs, etc.)
   - Teal color scheme matching the original (`#1B7A78`)

3. **Update `src/App.tsx`**
   - Remove `/services` route and `Services` import

4. **Update `src/components/layout/Header.tsx`**
   - Remove "שירותים וספקים" link from desktop and mobile nav
   - Keep "שירותים וציוד" link pointing to `/ad-elai`

### Technical Notes
- Static data only (no database) — all providers are hardcoded as in the HTML
- The wizard form is client-side only (shows success message, no actual submission)
- Filtering logic replicates the HTML's `filterCards`, `filterByCat`, `filterByRegion`, `filterByRating`
- Pricing rows are dynamic with auto-10% discount calculation
- The teal color palette will be applied via Tailwind classes (`bg-teal-700`, `text-teal-600`, etc.) or custom inline colors where needed

