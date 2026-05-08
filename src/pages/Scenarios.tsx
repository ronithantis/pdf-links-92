import ScenarioExplorer from "@/components/knowledge/ScenarioExplorer";
import { useSearchParams } from "react-router-dom";

const Scenarios = () => {
  const [params] = useSearchParams();
  const scenarioId = params.get("scenario") || undefined;
  return (
    <div className="container py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">זיהוי תרחיש</h1>
        <p className="text-sm text-muted-foreground">בחרו תרחיש וקבלו פעולות מומלצות מותאמות</p>
      </div>
      <ScenarioExplorer initialScenarioId={scenarioId} />
    </div>
  );
};

export default Scenarios;