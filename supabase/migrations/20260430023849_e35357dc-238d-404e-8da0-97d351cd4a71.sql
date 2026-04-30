INSERT INTO public.knowledge_resources (category, title, description, resource_type, url, icon_name, subcategory, scenario_tags, is_published, sort_order)
VALUES (
  'videos',
  'מתכונים לאדם סיעודי',
  'אוסף מתכונים מותאמים — אוכל מזין, מרקמים מותאמים לקושי בבליעה, רעיונות למה לתת לאכול לאדם סיעודי או לאדם שלא רוצה לאכול',
  'guide',
  'https://ronithantis.github.io/RECIPES/',
  'ChefHat',
  'מדריכים יישומיים',
  ARRAY['תזונה','בליעה','האכלה','מתכונים'],
  true,
  10
);