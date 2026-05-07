import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import CategoryGrid from "@/components/knowledge/CategoryGrid";
import ResourceList from "@/components/knowledge/ResourceList";
import ScenarioExplorer from "@/components/knowledge/ScenarioExplorer";
import SmartAdvisor from "@/components/knowledge/SmartAdvisor";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const KnowledgeCenter = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [searchParams, setSearchParams] = useSearchParams();

  // If ?scenario=ID is in URL, default to scenarios tab
  // If ?tab=scenarios or ?tab=advisor, use that
  const scenarioId = searchParams.get("scenario");
  const tabParam = searchParams.get("tab");
  const hideResources = tabParam === "scenarios" || tabParam === "advisor" || !!scenarioId;
  const activeTab = useMemo(
    () => (scenarioId ? "scenarios" : tabParam === "advisor" ? "advisor" : tabParam === "scenarios" ? "scenarios" : "resources"),
    [scenarioId, tabParam]
  );

  const handleTabChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "resources") {
      next.delete("tab");
      next.delete("scenario");
    } else {
      next.set("tab", value);
      if (value !== "scenarios") next.delete("scenario");
    }
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const { data } = await supabase
        .from("knowledge_resources")
        .select("category")
        .eq("is_published", true);
      if (data) {
        const c: Record<string, number> = {};
        data.forEach((r: any) => {
          c[r.category] = (c[r.category] || 0) + 1;
        });
        setCounts(c);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="container py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">{hideResources ? "בואו נתחיל כאן מתיאור המצב" : "מרכז הידע"}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {hideResources ? "בחרו מתרחיש נפוץ או תארו תרחיש ליועץ החכם" : "מצגות, סרטונים, טפסים וכלים לליווי המשפחה המטפלת"}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} dir="rtl">
        <TabsList className={`w-full max-w-md mx-auto grid ${hideResources ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {!hideResources && <TabsTrigger value="resources">משאבים</TabsTrigger>}
          <TabsTrigger value="scenarios">תרחישים</TabsTrigger>
          <TabsTrigger value="advisor">יועץ חכם</TabsTrigger>
        </TabsList>

        <div className="flex justify-center mt-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/glossary")}
          >
            <BookOpen className="h-4 w-4" />
            מילון מושגים
          </Button>
        </div>

        {!hideResources && (
          <TabsContent value="resources" className="mt-8">
            {selectedCategory ? (
              <ResourceList category={selectedCategory} onBack={() => setSelectedCategory(null)} />
            ) : (
              <div className="space-y-8">
                <CategoryGrid onSelect={setSelectedCategory} counts={counts} />
                <ResourceList />
              </div>
            )}
          </TabsContent>
        )}

        <TabsContent value="scenarios" className="mt-8">
          <ScenarioExplorer initialScenarioId={scenarioId || undefined} />
        </TabsContent>

        <TabsContent value="advisor" className="mt-8">
          <SmartAdvisor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeCenter;
