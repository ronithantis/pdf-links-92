import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CognitiveGameDialog from "@/components/cognitive/CognitiveGameDialog";
import { Brain, Eye, Puzzle, BookOpen, Music, Calendar, Play } from "lucide-react";

type Category = "זיכרון" | "שפה" | "לוגיקה" | "קשב";

interface CognitiveGame {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Category;
  icon: React.ReactNode;
}

const categoryColors: Record<Category, string> = {
  "זיכרון": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "שפה": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "לוגיקה": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "קשב": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const games: CognitiveGame[] = [
  {
    id: "nostalgia",
    title: "נוסטלגיה - למה זה משמש?",
    description: "זיהוי חפצים מהעבר – תרגול זיכרון והיזכרות",
    url: "https://guess-nostalgia-game.lovable.app/",
    category: "זיכרון",
    icon: <Brain className="h-8 w-8" />,
  },
  {
    id: "visual-memory",
    title: "זיכרון חזותי",
    description: "תרגול זיכרון חזותי – זכרו מה ראיתם",
    url: "https://visual-memory-quest.base44.app",
    category: "זיכרון",
    icon: <Eye className="h-8 w-8" />,
  },
  {
    id: "image-memory",
    title: "זיכרון תמונות",
    description: "מצאו את הזוגות התואמים – משחק זיכרון קלאסי",
    url: "https://wordwall.net/embed/1f91b7eb5f7c4c01acdb09615020b050?themeId=64&templateId=23&fontStackId=0",
    category: "זיכרון",
    icon: <Brain className="h-8 w-8" />,
  },
  {
    id: "simon-colors",
    title: "סימון - זיכרון צבעים וצלילים",
    description: "חזרו על רצף הצבעים והצלילים – אימון זיכרון עבודה",
    url: "https://claude.ai/public/artifacts/e540bba9-1593-4c23-9db0-674a65c3d902",
    category: "קשב",
    icon: <Music className="h-8 w-8" />,
  },
  {
    id: "sentence-completion",
    title: "השלמת משפטים",
    description: "השלימו את המשפט עם המילה המתאימה",
    url: "https://wordwall.net/embed/15ea5a7dd57b466bb67f34c58446f272?themeId=54&templateId=36&fontStackId=0",
    category: "שפה",
    icon: <BookOpen className="h-8 w-8" />,
  },
  {
    id: "word-guessing",
    title: "נחשו את המילה",
    description: "נחשו מהי המילה לפי רמזים – תרגול אוצר מילים",
    url: "https://wordwall.net/embed/87fc469efe054e06881eefbc857ab771?themeId=44&templateId=73&fontStackId=0",
    category: "שפה",
    icon: <BookOpen className="h-8 w-8" />,
  },
  {
    id: "word-ordering",
    title: "סדרו את המילים למשפט",
    description: "סדרו מילים מעורבבות למשפט תקין",
    url: "https://wordwall.net/embed/e4ae89054d0a451ea2ec42438cd15ac6?themeId=62&templateId=72&fontStackId=0",
    category: "שפה",
    icon: <BookOpen className="h-8 w-8" />,
  },
  {
    id: "word-naming",
    title: "שיום - קריאת מילים",
    description: "קראו את המילה לפי תמונה – תרגול שיום",
    url: "https://wordwall.net/embed/8227c061defa411aaf1b3101d7b85a1a?themeId=42&templateId=70&fontStackId=0",
    category: "שפה",
    icon: <BookOpen className="h-8 w-8" />,
  },
  {
    id: "letter-unscramble",
    title: "האותיות התבלבלו - סדרו בסדר הנכון",
    description: "סדרו אותיות מעורבבות למילה נכונה",
    url: "https://wordwall.net/embed/62501143208c4e8cb5696f1dfa131d34?themeId=1&templateId=38&fontStackId=0",
    category: "שפה",
    icon: <Puzzle className="h-8 w-8" />,
  },
  {
    id: "word-family",
    title: "לאיזו משפחה שייכת המילה?",
    description: "מיינו מילים לפי קטגוריות – תרגול חשיבה וסיווג",
    url: "https://gemini.google.com/share/1a9c5b17ef67",
    category: "שפה",
    icon: <BookOpen className="h-8 w-8" />,
  },
  {
    id: "daily-routine",
    title: "מה עושים היום - סדר יום",
    description: "סדרו את פעולות היום בסדר הנכון",
    url: "/games/daily-routine.html",
    category: "קשב",
    icon: <Calendar className="h-8 w-8" />,
  },
  {
    id: "sliding-puzzle",
    title: "פאזל 1-12",
    description: "סדרו את המספרים בסדר הנכון – פאזל הזזה",
    url: "https://ronithantis.github.io/sliding-puzzle/",
    category: "לוגיקה",
    icon: <Puzzle className="h-8 w-8" />,
  },
  {
    id: "sudoku",
    title: "משחק סודוקו",
    description: "סודוקו קלאסי – תרגול לוגיקה וריכוז",
    url: "https://ronithantis.github.io/sudoku/",
    category: "לוגיקה",
    icon: <Puzzle className="h-8 w-8" />,
  },
];

const CognitiveTraining = () => {
  const [selectedGame, setSelectedGame] = useState<CognitiveGame | null>(null);
  const [filterCategory, setFilterCategory] = useState<Category | "הכל">("הכל");

  const categories: (Category | "הכל")[] = ["הכל", "זיכרון", "שפה", "לוגיקה", "קשב"];
  const filtered = filterCategory === "הכל" ? games : games.filter(g => g.category === filterCategory);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">תרגול קוגניטיבי</h1>
      <p className="text-lg text-muted-foreground mb-6">
        משחקים ותרגילים לשמירה על כושר מנטלי – זיכרון, שפה, לוגיקה וריכוז
      </p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filterCategory === cat ? "default" : "outline"}
            size="lg"
            className="text-base px-6"
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
        {filtered.map((game) => (
          <Card
            key={game.id}
            className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
            onClick={() => setSelectedGame(game)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <span className="text-primary">{game.icon}</span>
                <Badge className={categoryColors[game.category]} variant="secondary">
                  {game.category}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
              <Button size="lg" className="w-full text-base gap-2">
                <Play className="h-5 w-5" />
                שחקו עכשיו
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game dialog */}
      {selectedGame && (
        <CognitiveGameDialog
          open={!!selectedGame}
          onOpenChange={(open) => { if (!open) setSelectedGame(null); }}
          title={selectedGame.title}
          url={selectedGame.url}
        />
      )}
    </div>
  );
};

export default CognitiveTraining;
