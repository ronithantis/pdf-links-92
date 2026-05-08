import { useParams, useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ResourceList from "@/components/knowledge/ResourceList";

const ResourceCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-4">
        <Link to="/tools-resources" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowRight size={16} stroke={1.75} />
          חזרה לכלים ומשאבים
        </Link>
      </div>
      <ResourceList category={category} onBack={() => navigate("/tools-resources")} />
    </div>
  );
};

export default ResourceCategoryPage;