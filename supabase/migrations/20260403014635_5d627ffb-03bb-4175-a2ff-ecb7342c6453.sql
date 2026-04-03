
UPDATE scenarios SET recommended_actions = recommended_actions || '["להשתמש בכלי תיק כחול לריכוז כל המסמכים במקום אחד"]'::jsonb
WHERE id = '3fe4086f-3ce8-444e-9698-66245baa0917';

UPDATE scenarios SET recommended_actions = recommended_actions || '["להשתמש בכלי תיק כחול לריכוז המסמכים הרפואיים"]'::jsonb
WHERE id = '2cda41e8-9a00-444e-909b-100513d305de';
