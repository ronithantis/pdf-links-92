

# Fix "מה עושים היום" Game

## Problem
The "מה עושים היום - סדר יום" game links to a Gemini share URL (`gemini.google.com/share/...`) which cannot load in an iframe. The user has provided the full HTML code for this game.

## Solution

1. **Save the game as a standalone HTML file** at `public/games/daily-routine.html` with the complete HTML code the user provided (includes Tailwind CDN, Hebrew RTL layout, multi-step daily routine wizard with print/copy summary functionality).

2. **Update the game URL** in `src/pages/CognitiveTraining.tsx` — change line 111 from the Gemini URL to `/games/daily-routine.html`.

This approach keeps the game self-contained as a static HTML file served from the project's public directory, ensuring it loads reliably inside the iframe dialog.

