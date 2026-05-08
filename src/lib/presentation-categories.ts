import {
  IconCompass,
  IconHomeHeart,
  IconStethoscope,
  IconUsersGroup,
  IconScale,
  IconBuildingCommunity,
  IconHeartHandshake,
  type Icon as TablerIcon,
} from "@tabler/icons-react";

export interface PresentationCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  Icon: TablerIcon;
}

export const presentationCategories: PresentationCategory[] = [
  { id: "start", slug: "start", title: "התחלת התהליך וקבלת החלטות", description: "הבנת המצב, שיחות משפחה ותכנון מוקדם", Icon: IconCompass },
  { id: "daily_care", slug: "daily-care", title: "טיפול יומיומי וניהול הטיפול", description: "ארגון מערך הטיפול, ניהול שוטף ושיקום", Icon: IconHomeHeart },
  { id: "medical", slug: "medical", title: "מצבים רפואיים", description: "אבחון רפואי ודמנציה", Icon: IconStethoscope },
  { id: "employment", slug: "employment", title: "העסקה וניהול עובדים", description: "עובד זר, חברת סיעוד וגמר חשבון", Icon: IconUsersGroup },
  { id: "rights", slug: "rights", title: "זכויות, בירוקרטיה ושירותים", description: "גמלאות, זכויות וקוד סיעודי", Icon: IconScale },
  { id: "transition", slug: "transition", title: "מעבר, דיור וסוף החיים", description: "דיור מוגן, בתי אבות וליווי בסוף החיים", Icon: IconBuildingCommunity },
  { id: "caregiver", slug: "caregiver", title: "המטפל עצמו", description: "שמירה על המטפל ומניעת שחיקה", Icon: IconHeartHandshake },
];

export const AUDIENCE_OPTIONS = ["מטפל", "בן משפחה", "מנהל"];
export const STAGE_OPTIONS = ["התחלה", "ניהול שוטף", "שינוי מצב", "סוף חיים"];
export const TOPIC_OPTIONS = [
  "דמנציה",
  "טיפול ביתי",
  "עובד זר",
  "זכויות",
  "דיור",
  "שיקום",
  "בירוקרטיה",
  "תקשורת משפחתית",
];

export const getCategoryBySlug = (slug?: string) =>
  presentationCategories.find((c) => c.slug === slug);

export const getCategoryById = (id?: string | null) =>
  presentationCategories.find((c) => c.id === id);