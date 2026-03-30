import { createClient } from "@supabase/supabase-js";

const NEWS_SUPABASE_URL = "https://bvcmokkgcpqysopspnez.supabase.co";
const NEWS_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Y21va2tnY3BxeXNvcHNwbmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTcyMDEsImV4cCI6MjA2NjYzMzIwMX0.XBBYoqS4CJijgb-6WU4ZuQ_3LqcHrh_";

export const newsClient = createClient(NEWS_SUPABASE_URL, NEWS_SUPABASE_ANON_KEY);

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source_url: string;
  source_name: string;
  is_new: boolean;
  published_at: string;
}

export async function fetchLatestNews(limit = 6): Promise<NewsItem[]> {
  const { data, error } = await newsClient
    .from("news_items")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }
  return data || [];
}

export async function fetchAllNews(category?: string): Promise<NewsItem[]> {
  let query = newsClient
    .from("news_items")
    .select("*")
    .order("published_at", { ascending: false });

  if (category && category !== "הכל") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }
  return data || [];
}

export const NEWS_CATEGORIES = ["הכל", "ביטוח לאומי", "עובדים זרים", "בריאות", "זכויות", "המלצה"] as const;
