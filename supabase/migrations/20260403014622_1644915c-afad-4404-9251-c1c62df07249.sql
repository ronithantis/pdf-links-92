
-- Add תיק כחול to relevant scenarios with siteTools format
UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לניהול כל המסמכים במקום אחד"}]'::jsonb
) WHERE id = '0cf9ff35-b13c-4407-9236-666c231f5f93';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לניהול מסמכים ותשלומים"}]'::jsonb
) WHERE id = '22b06776-7796-445e-bafc-b13726ed49aa';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לרכז מסמכים רפואיים"}]'::jsonb
) WHERE id = 'b5b9ec18-170f-4eae-88d7-afc42f4f28a5';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לרכז את כל המסמכים"}]'::jsonb
) WHERE id = 'e9e33c87-0d75-4f74-ae3b-cf02e0265d61';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לניהול מסמכים ותשלומים מרחוק"}]'::jsonb
) WHERE id = 'db340c27-7da9-4082-b991-5f29b907bfe9';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לרכז מסמכים לפני המעבר"}]'::jsonb
) WHERE id = 'da03cc81-b45a-4d90-b729-dfb9819e29ae';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לניהול תשלומים ומסמכים"}]'::jsonb
) WHERE id = 'b8392ffc-1ae4-412a-9669-ec0b93ed6af9';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לרכז מסמכים לוועדה"}]'::jsonb
) WHERE id = '7b832801-54fd-439d-ade7-adf76a6a6730';

UPDATE scenarios SET recommended_actions = jsonb_set(
  recommended_actions,
  '{siteTools}',
  (recommended_actions->'siteTools') || '[{"name": "תיק כחול", "description": "לאיתור כל המסמכים"}]'::jsonb
) WHERE id = 'ff217c45-d921-4b71-95f1-a0144d6e82e7';
