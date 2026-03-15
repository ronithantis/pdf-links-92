

## Analysis of Issues

### Problem 1: Forms not opening on click
The `ResourceCard` component treats local PDF links (starting with `/`) as "internal links" and does NOT set `target="_blank"`. This means clicking a form like `/forms/בקשה-להיתר-העסקת-עובד-זר.pdf` tries to navigate within the React SPA router, which fails silently since there's no route for PDF files.

**Fix**: For PDF files (URLs ending in `.pdf`), always open in a new tab regardless of whether the URL is internal or external.

### Problem 2: Duplicate forms
There are **three layers** of form entries in the database:
1. **Old external links** (gov.il, btl.gov.il) -- original seed data pointing to government websites
2. **Uploaded local PDFs** (batches 1-4) -- the 35 files uploaded in recent sessions, stored at `/forms/...pdf`
3. **"אוסף טפסים להדפסה"** (printable collection) -- 11 entries all pointing to a single `printable-forms-collection.pdf` file with page anchors

Many of these overlap. For example, "ייפוי כוח מתמשך" appears in all three layers.

**Fix**: Delete the 11 "אוסף טפסים להדפסה" entries (they reference a generic bundled PDF that predates the individual uploads). Also review and unpublish old external-link duplicates where a local PDF now exists.

---

## Implementation Plan

### Step 1: Fix PDF links not opening
In `ResourceCard.tsx`, change the form `<a>` tag logic so that URLs ending in `.pdf` always get `target="_blank"` and `rel="noopener noreferrer"`, even if the URL starts with `/`.

### Step 2: Delete "אוסף טפסים להדפסה" entries
Run a database migration to delete the 11 rows with `subcategory = 'אוסף טפסים להדפסה'` from `knowledge_resources`. Also delete the bundled PDF file `public/forms/printable-forms-collection.pdf`.

### Step 3: Remove duplicate external-link forms
Unpublish (set `is_published = false`) the old external-link form entries where we now have a locally-hosted PDF covering the same content. This includes items like the generic "ייפוי כוח מתמשך – משרד המשפטים" external link (we have the uploaded example PDF), and similar overlaps.

### Technical Details
- **ResourceCard.tsx line 30**: Change condition from `hasUrl && !isInternalLink` to `hasUrl && (!isInternalLink || isPdfForm)` for both `target` and `rel` attributes
- **Database**: DELETE 11 rows WHERE `subcategory = 'אוסף טפסים להדפסה'`
- **File**: Remove `public/forms/printable-forms-collection.pdf`

