import ScenarioExplorer from "@/components/knowledge/ScenarioExplorer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Scenarios = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const scenarioId = params.get("scenario") || undefined;
  return (
    <div className="container py-8 space-y-6">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowRight className="h-4 w-4 ml-1" />
          חזרה לדף הבית
        </Button>
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">זיהוי תרחיש</h1>
        <p className="text-sm text-muted-foreground">בחרו תרחיש וקבלו פעולות מומלצות מותאמות</p>
      </div>
      <ScenarioExplorer initialScenarioId={scenarioId} />
    </div>
  );
};

export default Scenarios;