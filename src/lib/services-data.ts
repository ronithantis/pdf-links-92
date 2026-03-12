export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  phone?: string;
  website?: string;
  address?: string;
  hours?: string;
  notes?: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "medical-care",
    name: "גורמי טיפול רפואי",
    description: "צוות רפואי ומטפלים מקצועיים",
    color: "bg-yellow-100 border-yellow-200 text-yellow-800",
    services: [
      {
        id: "nurses",
        name: "אחות",
        description: "טיפול רפואי מקצועי בבית ובקהילה",
        phone: "1-800-NURSES",
        notes: "זמינות 24/7 למצבי חירום"
      },
      {
        id: "caregiving",
        name: "סיעוד",
        description: "שירותי סיעוד מקצועיים ועזרה יומיומית",
        phone: "1-800-CARE",
        notes: "מטפלים מורשים ומיומנים"
      },
      {
        id: "therapy",
        name: "טיפול",
        description: "פיזיותרפיה, ריפוי בעיסוק ועוד",
        phone: "1-800-THERAPY",
        notes: "טיפולים בבית או במרפאה"
      },
      {
        id: "doctors",
        name: "רופא",
        description: "רופאים מומחים לטיפול בגיל השלישי",
        phone: "1-800-DOCTORS",
        notes: "ביקורי בית וטלרפואה"
      },
      {
        id: "geriatrics",
        name: "גריאטרי",
        description: "מומחים בגריאטריה",
        phone: "1-800-GERIAT",
        notes: "התמחות בבעיות הגיל השלישי"
      },
      {
        id: "maintenance",
        name: "אחזקה",
        description: "שירותי אחזקה ותיקון בבית",
        phone: "1-800-MAINT",
        notes: "התאמות בטיחות לקשישים"
      },
      {
        id: "matron",
        name: "מטרונית",
        description: "פיקוח וניהול צוות הטיפול",
        phone: "1-800-MATRON",
        notes: "ממונה על איכות הטיפול"
      },
      {
        id: "pedicure",
        name: "פדיקור",
        description: "טיפוח כפות רגלים למבוגרים",
        phone: "1-800-PEDICURE",
        notes: "טיפול מתמחה לקשישים"
      }
    ]
  },
  {
    id: "consultants",
    name: "יועצים מקצועיים",
    description: "ייעוץ מקצועי בתחומים שונים",
    color: "bg-green-100 border-green-200 text-green-800",
    services: [
      {
        id: "social-worker",
        name: "עו״ס",
        description: "עובד סוציאלי לליווי ותמיכה",
        phone: "1-800-SOCIAL",
        notes: "ייעוץ סוציאלי ומיפוי זכויות"
      },
      {
        id: "dietitian",
        name: "דיאטנית",
        description: "ייעוץ תזונתי לגיל השלישי",
        phone: "1-800-DIET",
        notes: "תפריטים מותאמים ובריאותיים"
      }
    ]
  },
  {
    id: "nursing-services",
    name: "שירותי סיעוד",
    description: "שירותים מקצועיים לטיפול יומיומי",
    color: "bg-pink-100 border-pink-200 text-pink-800",
    services: [
      {
        id: "home-clinic",
        name: "מרפאה ביתית",
        description: "שירותים רפואיים בבית המטופל",
        phone: "1-800-HOME-CLINIC",
        notes: "ביקורים קבועים ועל-פי צורך"
      },
      {
        id: "occupational-therapy-clinic",
        name: "מרפאת ריפוי בעיסוק",
        description: "שיקום תפקודי ושמירה על עצמאות",
        phone: "1-800-OCCUPATIONAL",
        notes: "טיפול אישי ומותאם"
      }
    ]
  },
  {
    id: "legal-services",
    name: "שירותים משפטיים",
    description: "ייעוץ וטיפול משפטי",
    color: "bg-blue-100 border-blue-200 text-blue-800",
    services: [
      {
        id: "lawyer",
        name: "עו״ד",
        description: "ייעוץ משפטי בנושאי קשישים",
        phone: "1-800-LAWYER",
        notes: "ייפויי כוח, צוואות, זכויות"
      }
    ]
  },
  {
    id: "equipment",
    name: "ציוד וטכנולוגיה",
    description: "ציוד מיוחד וטכנולוגיות עזר",
    color: "bg-purple-100 border-purple-200 text-purple-800",
    services: [
      {
        id: "medical-equipment",
        name: "ציוד רפואי",
        description: "השכרה ומכירת ציוד רפואי",
        phone: "1-800-EQUIPMENT",
        notes: "מיטות, כיסאות גלגלים, הליכונים"
      },
      {
        id: "smart-home",
        name: "מערכות חכמות",
        description: "טכנולוגיה לבטיחות וניטור",
        phone: "1-800-SMART",
        notes: "מכשירי חירום ומעקב"
      }
    ]
  },
  {
    id: "daily-services",
    name: "שירותי מחיה",
    description: "שירותים יומיומיים ותמיכה",
    color: "bg-red-100 border-red-200 text-red-800",
    services: [
      {
        id: "transportation",
        name: "הסעות",
        description: "הסעות לרופאים ופעילויות",
        phone: "1-800-TRANSPORT",
        notes: "נגישות מלאה לכיסאות גלגלים"
      },
      {
        id: "day-center",
        name: "מרכז יום",
        description: "פעילויות חברתיות ותרבותיות",
        phone: "1-800-DAY-CENTER",
        notes: "תוכניות העשרה יומיות"
      },
      {
        id: "activities-laundry",
        name: "פעילות וכביסה",
        description: "ארגון פעילויות ושירותי כביסה",
        phone: "1-800-ACTIVITIES",
        notes: "שירותים משולבים"
      },
      {
        id: "bathing",
        name: "רחצה",
        description: "עזרה ברחצה ובטיפוח",
        phone: "1-800-BATHING",
        notes: "טיפול אינטימי וכבודי"
      }
    ]
  },
  {
    id: "institutional",
    name: "גורמים מוסדיים",
    description: "רשויות וגופים ממשלתיים",
    color: "bg-orange-100 border-orange-200 text-orange-800",
    services: [
      {
        id: "welfare-department",
        name: "מחלקת הרווחה",
        description: "שירותי רווחה מהרשות המקומית",
        phone: "1-800-WELFARE",
        notes: "זכויות וסיוע כלכלי"
      },
      {
        id: "ministry",
        name: "משרד הבריאות",
        description: "פיקוח וויסות שירותי בריאות",
        phone: "1-800-HEALTH-MIN",
        notes: "רישוי ופיקוח על ספקים"
      },
      {
        id: "insurance",
        name: "ביטוח לאומי",
        description: "גמלאות וזכויות ביטוח לאומי",
        phone: "1-800-INSURANCE",
        notes: "גמלת זיקנה וסיעוד"
      },
      {
        id: "health-fund",
        name: "קופת חולים",
        description: "שירותי בריאות בסיסיים ומורחבים",
        phone: "1-800-HEALTH-FUND",
        notes: "ביטוח בריאות וטיפולים"
      }
    ]
  }
];