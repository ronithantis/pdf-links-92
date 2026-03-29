
-- Update tags for "רוצים לטפל בבית" to match home care tools
UPDATE scenarios SET tags = ARRAY['טיפול_ביתי', 'עובד_זר', 'גמלת_סיעוד', 'בטיחות_בית', 'ציוד_רפואי', 'העסקה', 'תכנון'] WHERE id = '0cf9ff35-b13c-4407-9236-666c231f5f93';

-- Update "אמא שוחררה מאשפוז" to include home care tags
UPDATE scenarios SET tags = ARRAY['אשפוז', 'שחרור', 'שיקום', 'בית_חולים', 'טיפול_ביתי', 'ציוד_רפואי', 'גמלת_סיעוד', 'חזרה_הביתה'] WHERE id = '167ac8a8-df43-4f1e-b15a-8ee2aa78b429';

-- Update "אבא אחרי שבץ" to include rehabilitation & home care
UPDATE scenarios SET tags = ARRAY['שבץ', 'שיקום', 'חזרה_הביתה', 'טיפול_ביתי', 'ציוד_רפואי', 'גמלת_סיעוד', 'בטיחות_בית'] WHERE id = 'e9e33c87-0d75-4f74-ae3b-cf02e0265d61';

-- Update "ניהול תרופות מרובות" to match med tracker
UPDATE scenarios SET tags = ARRAY['תרופות', 'polypharmacy', 'בטיחות'] WHERE id = '62094370-17da-4e4d-acd7-1255f4fc8dc1';

-- Update "ההורה מסרב לקחת תרופות" 
UPDATE scenarios SET tags = ARRAY['סירוב', 'אוטונומיה', 'ציות_טיפולי', 'תרופות'] WHERE id = 'de81b77c-7c8a-4361-8431-8620b04e83ec';

-- Update "ההורה לבד בבית" to include monitoring
UPDATE scenarios SET tags = ARRAY['בטיחות_בית', 'ניטור', 'מרחוק', 'טיפול_ביתי'] WHERE id = '8699dfd5-0e27-4358-9b8b-0dc44cbdbb8e';

-- Update "ההורה בודד ומדוכא"
UPDATE scenarios SET tags = ARRAY['בדידות', 'דיכאון', 'רווחה_נפשית', 'בריאות_נפשית', 'מועדון_יום'] WHERE id = 'fd4b0535-cb06-411c-9777-101e363b1377';

-- Update "אנחנו צריכים הפסקה"
UPDATE scenarios SET tags = ARRAY['שחיקה', 'הפסקה', 'סיעוד_חלופי', 'מטפל_משפחתי', 'בריאות_נפשית'] WHERE id = '5599c010-5d93-4ce2-8481-ad4fd05cc91f';

-- Update "המטפל הזר עזב פתאום"
UPDATE scenarios SET tags = ARRAY['עובד_זר', 'עזיבה', 'חירום', 'העסקה'] WHERE id = '0b3791e2-0f16-4c79-997c-4ee83acece12';

-- Update "יש לנו עובד זר אבל ההורה לא מסתדר איתו"
UPDATE scenarios SET tags = ARRAY['קונפליקט_עובד', 'עובד_זר', 'יחסים', 'העסקה'] WHERE id = '80e99331-4233-46ba-bade-2641e5e58c98';

-- Update "מחפשים מסגרת יום"
UPDATE scenarios SET tags = ARRAY['מועדון_יום', 'מסגרת', 'חברתי', 'בדידות'] WHERE id = '542b98a7-fbdd-4be4-8d70-814adda8cc1b';

-- Update "איך מתכוננים לדיון בוועדת אפוטרופסות"
UPDATE scenarios SET tags = ARRAY['אפוטרופסות', 'משפטי', 'כשירות', 'ייפוי_כוח', 'מסמכים'] WHERE id = '7b832801-54fd-439d-ade7-adf76a6a6730';

-- Update "ההורה לא מסוגל לנהל כסף"
UPDATE scenarios SET tags = ARRAY['כספים', 'אפוטרופסות', 'ניהול', 'משפטי', 'ייפוי_כוח'] WHERE id = 'b8392ffc-1ae4-412a-9669-ec0b93ed6af9';

-- Update "תכנון פיננסי"
UPDATE scenarios SET tags = ARRAY['תקציב', 'פיננסי', 'תכנון', 'גמלת_סיעוד', 'כספים'] WHERE id = '22b06776-7796-445e-bafc-b13726ed49aa';

-- Update "ההורה נפטר"
UPDATE scenarios SET tags = ARRAY['פטירה', 'אבל', 'סידורים', 'צוואה', 'ירושה', 'משפטי'] WHERE id = 'ff217c45-d921-4b71-95f1-a0144d6e82e7';

-- Update "אנחנו בחו"ל"
UPDATE scenarios SET tags = ARRAY['חו"ל', 'מרחוק', 'תיאום', 'עובד_זר', 'חלוקת_תפקידים'] WHERE id = 'db340c27-7da9-4082-b991-5f29b907bfe9';

-- Update "ההורה עובר ממוסד לבית"
UPDATE scenarios SET tags = ARRAY['שחרור', 'חזרה_הביתה', 'מעבר', 'טיפול_ביתי', 'ציוד_רפואי', 'בטיחות_בית'] WHERE id = 'da03cc81-b45a-4d90-b729-dfb9819e29ae';

-- Update "הידרדרות פתאומית"
UPDATE scenarios SET tags = ARRAY['הידרדרות', 'דחוף', 'אבחון', 'אשפוז', 'שדרוג', 'רמת_טיפול'] WHERE id = '711ab46c-5a78-447c-a82a-a6b415527ea7';

-- Update "האם הגיע הזמן להגביר רמת טיפול"
UPDATE scenarios SET tags = ARRAY['שדרוג', 'רמת_טיפול', 'החלטה', 'דיור_מוגן', 'בית_אבות', 'טיפול_ביתי', 'גמלת_סיעוד'] WHERE id = 'b422d134-bae1-4ac7-b7b5-9aaa636ab171';

-- Update "טיפול פליאטיבי / הוספיס"
UPDATE scenarios SET tags = ARRAY['פליאטיבי', 'הוספיס', 'סוף_חיים', 'ייפוי_כוח'] WHERE id = '1d11a330-6797-4d94-93b8-1f1aa0de69ab';

-- Update "הבית לא בטוח"
UPDATE scenarios SET tags = ARRAY['בטיחות_בית', 'נפילות', 'התאמות', 'נגישות', 'ציוד_רפואי'] WHERE id = '84bf96f5-0d32-40e5-954f-31070bd18232';

-- Update "אני מרגיש/ה אשמה"
UPDATE scenarios SET tags = ARRAY['אשמה', 'מוסד', 'רגשות', 'שחיקה', 'בריאות_נפשית'] WHERE id = '2844d5cd-997c-46f9-96b8-e44eee2a52b0';

-- Update "אנחנו רבים בין האחים"
UPDATE scenarios SET tags = ARRAY['משפחה', 'קונפליקט', 'חלוקת_תפקידים', 'מטפל_משפחתי'] WHERE id = '3563ee87-2912-40ef-85a2-1dc8763d9273';
