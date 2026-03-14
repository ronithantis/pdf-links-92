

# Cognitive Training Page - Implementation Plan

## Content from Uploaded PDF

The PDF contains 10 cognitive training games with external URLs:

| Game | Type | URL |
|------|------|-----|
| נוסטלגיה - למה זה משמש? | Memory/Recognition | guess-nostalgia-game.lovable.app |
| זיכרון חזותי | Visual Memory | visual-memory-quest.base44.app |
| זיכרון תמונות | Image Memory | wordwall.net |
| השלמת משפטים | Sentence Completion | wordwall.net |
| פאזל 1-12 | Sliding Puzzle | ronithantis.github.io/sliding-puzzle |
| משחק סודוקו | Sudoku | ronithantis.github.io/sudoku |
| נחשו את המילה | Word Guessing | wordwall.net |
| סדרו את המילים למשפט | Word Ordering | wordwall.net |
| שיום - קריאת מילים | Word Naming | wordwall.net |
| האותיות התבלבלו - סדרו בסדר הנכון | Letter Unscramble | wordwall.net |
| + 3 more from page 2 (family word sorting, daily routine, word categorization) |

## Implementation Approach

### 1. Rewrite `CognitiveTraining.tsx`
- Display all games as cards in a grid (similar to DigitalTools page style)
- Each card shows: icon, Hebrew title, short description, difficulty tag, and "Play" button
- **Play button opens game in a Dialog/modal with an iframe** - the user specifically requested easy in-app access via a popup window for elderly users
- Large, accessible buttons and text (elderly-friendly)
- Cards grouped by cognitive skill category (memory, language, logic)

### 2. Game Modal Component
- Create a new `CognitiveGameDialog` component
- Full-screen-ish dialog (max-w-4xl, tall) with iframe embedding the external game URL
- Large close button, clear title at top
- Fallback "open in new tab" link in case iframe doesn't load

### 3. Card Design
- Icon per category (Brain, Eye, Puzzle, BookOpen, etc.)
- Category badges: "זיכרון", "שפה", "לוגיקה"
- Large tap targets, high contrast text
- Responsive: 1 column mobile, 2 tablet, 3 desktop

### Technical Notes
- No database changes needed - games are static external links
- All game URLs are external and support iframe embedding (Lovable apps, GitHub Pages, Wordwall)
- Wordwall games may have iframe restrictions - will add fallback "open in new tab" option

