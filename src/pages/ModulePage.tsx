import { useParams, Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { modules } from "@/lib/modules-data";
import { ArrowRight, BookOpen } from "lucide-react";
import { Module1Content } from "@/components/module-content/Module1Content";
import { Module2Content } from "@/components/module-content/Module2Content";
import { Module3Content } from "@/components/module-content/Module3Content";
import { Module4Content } from "@/components/module-content/Module4Content";
import { Module5Content } from "@/components/module-content/Module5Content";
import { Module6Content } from "@/components/module-content/Module6Content";
import { Module7Content } from "@/components/module-content/Module7Content";
import { Module8Content } from "@/components/module-content/Module8Content";
import { Module9Content } from "@/components/module-content/Module9Content";
import { Module10Content } from "@/components/module-content/Module10Content";
import { Module11Content } from "@/components/module-content/Module11Content";
import ModuleDigitalTools from "@/components/module-content/ModuleDigitalTools";

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const mod = modules.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">הפרק לא נמצא</h1>
        <Button asChild>
          <Link to="/">חזרה לדף הבית</Link>
        </Button>
      </div>
    );
  }

  const renderContent = (subId: string) => {
    const chapter = parseInt(subId.split(".")[0]);
    switch (chapter) {
      case 1: return <Module1Content subId={subId} />;
      case 2: return <Module2Content subId={subId} />;
      case 3: return <Module7Content subId={subId} />;
      case 4: return <Module3Content subId={subId} />;
      case 5: return <Module4Content subId={subId} />;
      case 6: return <Module5Content subId={subId} />;
      case 7: return <Module6Content subId={subId} />;
      case 8: return <Module9Content subId={subId} />;
      case 9: return <Module8Content subId={subId} />;
      case 10: return <Module10Content subId={subId} />;
      case 11: return <Module11Content subId={subId} />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-4">
          <ArrowRight className="h-4 w-4" />
          חזרה לדף הבית
        </Link>
        <div className="text-sm text-muted-foreground mb-2">פרק {mod.partNumber}: {mod.partTitle}</div>
        <h1 className="text-3xl font-bold mb-2">{mod.title}</h1>
        <p className="text-lg text-muted-foreground">{mod.description}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {mod.subModules.map((sub) => (
          <AccordionItem key={sub.id} value={sub.id} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 text-start">
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="font-semibold">{sub.id} {sub.title}</div>
                  <div className="text-xs text-muted-foreground">{sub.description}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pr-8 py-4 text-sm text-muted-foreground leading-relaxed">
                {renderContent(sub.id) || (
                  <>
                    <p>תוכן מפורט עבור "{sub.title}" יתווסף בקרוב.</p>
                    <p className="mt-2">נושא זה יכלול מידע מקצועי, טיפים מעשיים ומשאבים נוספים.</p>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ModuleDigitalTools chapterId={mod.id} />

      {/* Navigation between modules */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        {(() => {
          const idx = modules.findIndex((m) => m.id === moduleId);
          const prev = idx > 0 ? modules[idx - 1] : null;
          const next = idx < modules.length - 1 ? modules[idx + 1] : null;
          return (
            <>
              {prev ? (
                <Button variant="outline" asChild>
                  <Link to={`/module/${prev.id}`}>
                    <ArrowRight className="h-4 w-4 ml-1" />
                    {prev.title}
                  </Link>
                </Button>
              ) : <div />}
              {next && (
                <Button variant="outline" asChild>
                  <Link to={`/module/${next.id}`}>
                    {next.title}
                    <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                  </Link>
                </Button>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default ModulePage;