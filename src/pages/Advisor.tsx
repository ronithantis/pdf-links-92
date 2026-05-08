import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SmartAdvisor from "@/components/knowledge/SmartAdvisor";

const Advisor = () => {
  const navigate = useNavigate();
  return (
    <div className="container py-8 space-y-6 max-w-4xl">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowRight className="h-4 w-4 ml-1" />
          חזרה לדף הבית
        </Button>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">היועץ החכם</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          תארו את המצב או השאלה שלכם, והיועץ החכם יציע מסלול פעולה, כלים ומשאבים מתאימים מתוך האתר.
        </p>
      </div>
      <SmartAdvisor />
    </div>
  );
};

export default Advisor;