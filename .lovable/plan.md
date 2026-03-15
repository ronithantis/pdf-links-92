

## Root Cause Analysis

I confirmed the actual problem: **the PDF files exist in `public/forms/` but the URLs with Hebrew characters aren't being served correctly by the hosting**. When I fetched `https://elder-aid-station.lovable.app/forms/בקשה-להיתר-העסקת-עובד-זר.pdf` directly, it returned a 404 page instead of the PDF. This happens because Hebrew characters in file paths aren't reliably handled by all hosting environments.

The code fix from before (adding `target="_blank"`) was correct but doesn't matter if the actual file URL returns 404.

## Plan

### Step 1: Fix PDF URLs with proper encoding
In `ResourceCard.tsx`, wrap all PDF `href` values with `encodeURI()` so Hebrew characters are properly encoded in the URL. For example:
- `/forms/בקשה-להיתר-העסקת-עובד-זר.pdf` becomes
- `/forms/%D7%91%D7%A7%D7%A9%D7%94-...pdf`

This is the critical fix -- without encoding, browsers and servers may not resolve Hebrew filenames correctly.

### Step 2: Delete all external-link form entries from database
Per your preference, remove the 11 old external-link form entries (gov.il, btl.gov.il, health.gov.il links) that were seeded originally. These are the entries with `sort_order` 2-12. Keep only the 35 uploaded local PDFs.

IDs to delete:
- `249b2d15...` (תביעה לקצבת נכות כללית)
- `a8adb311...` (תביעה לגמלת שירותים מיוחדים)
- `9697f374...` (טופס ויתור סודיות רפואית)
- `ec79f036...` (טופס 17 – החזר הוצאות רפואיות)
- `a3dcf67d...` (בקשה למינוי אפוטרופוס)
- `a1d9929d...` (ייפוי כוח מתמשך – משרד המשפטים)
- `3dea2b69...` (הנחיות מקדימות לטיפול רפואי)
- `03710746...` (בקשה להנחה בארנונה)
- `6d066993...` (בקשה לפטור ממס הכנסה)
- `c6d9b8d9...` (בקשה לתג חנייה לנכה)
- `0e0ca709...` (בקשה לסיוע בשכר דירה)

### Step 3: Fix console warning
The "Function components cannot be given refs" warning comes from `ResourceCard` being used where a ref is passed. Will either ignore it (harmless) or wrap with `forwardRef` if time allows.

### Files changed
- `src/components/knowledge/ResourceCard.tsx` -- add `encodeURI()` to href for PDF links
- Database: DELETE 11 rows from `knowledge_resources`

