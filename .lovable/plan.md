

## Plan: Embed "זכויותיכם" (Your Rights) as a Full React Page

### What We're Building
A new **Rights page** (`/rights`) with 4 tabs — exactly mirroring the uploaded HTML content — fully converted to React components using the project's existing UI library (Tabs, Accordion, Cards, etc.). A new "זכויותיכם" link will be added to the header navigation, positioned to the left of "מרכז הידע".

### Content Structure (from the HTML file)
The page has 4 tabs:
1. **זכויות הקשיש** - Nursing benefits, NII pensions, health rights, discounts, legal protections, FAQ, contacts
2. **משפחה מטפלת** - Sick days by type, labor rights, tax credits, support services, FAQ, contacts
3. **עובד זר** - Minimum wage, basic rights, pension/severance, deductions, health insurance, scope of work, FAQ, contacts
4. **קופות חולים** - Universal health basket rights, per-HMO benefits (Clalit, Maccabi, Meuhedet, Leumit), caregiver support from HMOs, supplemental nursing insurance

### Implementation Steps

1. **Create `src/pages/Rights.tsx`**
   - Convert all 4 panels from the HTML into a single React page using existing UI components (Tabs, Accordion, Card, Table)
   - Store all data values (wages, benefits, thresholds) in a constants object at the top for easy updating
   - Include all tables, cards, callouts, stats, FAQ accordions, and contact grids from the original
   - Internal links (e.g., "למדריך הגשת תביעה", "למחשבון השכר") will point to relevant existing routes

2. **Add route in `src/App.tsx`**
   - New route: `/rights` -> `<Rights />`

3. **Update `src/components/layout/Header.tsx`**
   - Add "זכויותיכם" link in the desktop nav bar, positioned to the left of "מרכז הידע"
   - Add it to the mobile menu as well

### Technical Notes
- The HTML uses a `DATA` object for dynamic values — we'll replicate this as a TypeScript constants object for easy future updates
- The page will use existing shadcn components: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `Accordion`, `Card`, `Table`
- Styling will use Tailwind classes consistent with the rest of the app
- All content (tables, lists, cards, contacts, FAQs) will be fully embedded — no iframe or external link

