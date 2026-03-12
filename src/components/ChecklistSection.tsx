import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { checklistItems } from "@/lib/modules-data";
import { FileText, Shield, Home, Heart, Users, Printer, ExternalLink } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
};

const categoryAnchorMap: Record<string, string> = {
  medical: "#section-1",
  safety: "#section-4",
  insurance: "#section-6",
  family: "#section-9",
  legal: "#section-12",
  "caregiver-management": "#section-5",
  "financial-planning": "#section-7",
  "advance-directives": "#section-12",
};

const ChecklistSection = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    const printContent = checklistItems.map((category) => {
      const items = category.items.map((item, i) => {
        const isChecked = !!checked[`${category.id}-${i}`];
        return `<li style="margin-bottom:6px;color:${isChecked ? '#888' : '#222'}">
          <span style="font-size:16px;margin-left:6px">${isChecked ? '☑' : '☐'}</span>
          <span style="${isChecked ? 'text-decoration:line-through' : ''}">${item}</span>
        </li>`;
      }).join('');
      const completedCount = category.items.filter((_, i) => checked[`${category.id}-${i}`]).length;
      return `<div style="margin-bottom:24px">
        <h3 style="font-size:16px;font-weight:bold;margin-bottom:8px;color:#1a7a8a">${category.title} (${completedCount}/${category.items.length})</h3>
        <ul style="list-style:none;padding:0;margin:0">${items}</ul>
      </div>`;
    }).join('');

    const html = `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8">
      <title>צ׳קליסט - סניורסנס</title>
      <style>body{font-family:Heebo,Arial,sans-serif;padding:40px;max-width:700px;margin:0 auto}
      h1{text-align:center;color:#1a7a8a;margin-bottom:8px}
      .subtitle{text-align:center;color:#666;margin-bottom:32px;font-size:14px}
      @media print{body{padding:20px}}</style></head>
      <body><h1>צ׳קליסט מטפל משפחתי</h1>
      <p class="subtitle">הודפס מאתר סניורסנס • ${new Date().toLocaleDateString('he-IL')}</p>
      ${printContent}</body></html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };

  const totalChecked = Object.values(checked).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto">
      <Accordion type="multiple" className="space-y-3">
        {checklistItems.map((category) => {
          const completedCount = category.items.filter((_, i) => checked[`${category.id}-${i}`]).length;
          return (
            <AccordionItem key={category.id} value={category.id} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-primary">{iconMap[category.icon]}</span>
                  <span className="font-semibold">{category.title}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {completedCount}/{category.items.length}
                  </span>
                </div>
              </AccordionTrigger>
              {categoryAnchorMap[category.id] && (
                <a
                  href={`/tasks-list${categoryAnchorMap[category.id]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 pr-8 -mt-2 mb-2"
                >
                  איך מנהלים את זה ביום-יום? ←
                </a>
              )}
              <AccordionContent>
                <ul className="space-y-3 pr-8">
                  {category.items.map((item, i) => {
                    const key = `${category.id}-${i}`;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <Checkbox
                          id={key}
                          checked={!!checked[key]}
                          onCheckedChange={() => toggleItem(key)}
                          aria-label={item}
                        />
                        <label
                          htmlFor={key}
                          className={`text-sm cursor-pointer leading-relaxed ${checked[key] ? "line-through text-muted-foreground" : ""}`}
                        >
                          {item}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
        {totalChecked > 0 && (
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            הדפסת הצ׳קליסט
          </Button>
        )}
        <Button asChild className="gap-2">
          <a href="/tasks-list" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            רשימה כללית של המשימות
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ChecklistSection;
