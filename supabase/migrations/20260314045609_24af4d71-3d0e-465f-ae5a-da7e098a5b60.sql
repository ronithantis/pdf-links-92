-- Add צוואה/ירושה tags to the relevant scenario
UPDATE scenarios SET tags = array_append(array_append(tags, 'צוואה'), 'ירושה') WHERE id = '3fe4086f-3ce8-444e-9698-66245baa0917';

-- Add צוואה/ירושה tags to the relevant knowledge resource
UPDATE knowledge_resources SET scenario_tags = array_append(array_append(scenario_tags, 'צוואה'), 'ירושה') WHERE id = 'fca7ef48-11d7-4099-aaf1-f9dba7860003';

-- Also add to the "סידורים לאחר פטירה" resource
UPDATE knowledge_resources SET scenario_tags = array_append(array_append(scenario_tags, 'צוואה'), 'ירושה') WHERE id = 'fb23af2e-727c-45be-84ba-fade83aa4d0e';