import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import CategoryGrid from "@/components/knowledge/CategoryGrid";
import ResourceList from "@/components/knowledge/ResourceList";
import ScenarioExplorer from "@/components/knowledge/ScenarioExplorer";
import SmartAdvisor from "@/components/knowledge/SmartAdvisor";

const KnowledgeCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [searchParams] = useSearchParams();

  // If ?scenario=ID is in URL, default to scenarios tab
  const scenarioId = searchParams.get("scenario");
  const defaultTab = scenarioId ? "scenarios" : "resources";

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
        <h1 className="text-4xl font-bold">מרכז הידע</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          מצגות, סרטונים, טפסים וכלים לליווי המשפחה המטפלת
        </p>
      </div>

      <Tabs defaultValue={defaultTab} dir="rtl">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="resources">משאבים</TabsTrigger>
          <TabsTrigger value="scenarios">תרחישים</TabsTrigger>
          <TabsTrigger value="advisor">יועץ חכם</TabsTrigger>
        </TabsList>

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
