import { Link } from "react-router-dom";

const ToolsResources = () => {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-2xl font-bold text-primary mb-3">כלים ומשאבים</h1>
      <p className="text-muted-foreground mb-6">העמוד החדש בבנייה. בינתיים — כל הכלים זמינים בעמוד הקיים.</p>
      <Link to="/tools" className="text-primary hover:underline">לכל הכלים הדיגיטליים ←</Link>
    </div>
  );
};

export default ToolsResources;