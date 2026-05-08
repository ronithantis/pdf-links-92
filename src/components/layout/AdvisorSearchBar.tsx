import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

interface Props {
  variant?: "compact" | "hero";
  placeholder?: string;
}

const AdvisorSearchBar = ({ variant = "compact", placeholder }: Props) => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    const url = trimmed
      ? `/knowledge-center?tab=advisor&q=${encodeURIComponent(trimmed)}`
      : `/knowledge-center?tab=advisor`;
    navigate(url);
    setQ("");
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={submit}
      className={
        isHero
          ? "relative mx-auto flex w-full max-w-[520px] items-center rounded-full border border-border bg-card pr-4 pl-1.5"
          : "relative flex w-full max-w-md items-center rounded-full border border-border bg-card pr-3 pl-1"
      }
    >
      <MessageCircle
        className={isHero ? "h-5 w-5 text-primary shrink-0" : "h-4 w-4 text-primary shrink-0"}
      />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder || (isHero
          ? "התחילו לכתוב את השאלה... למשל: איך מבקשים גמלת סיעוד?"
          : "שאלו את היועץ החכם...")}
        className={
          isHero
            ? "flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            : "flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
        }
      />
      <button
        type="submit"
        className={
          isHero
            ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            : "rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        }
      >
        שאל
      </button>
    </form>
  );
};

export default AdvisorSearchBar;