// Central place for the headline numbers shown on /tools-resources.
// Tools count is derived from digitalTools; forms is derived from public/forms count.
// Presentations and guides are content totals — update here when adding resources.

import { digitalTools } from "@/lib/modules-data";

const PRESENTATIONS_COUNT = 25;
const GUIDES_COUNT = 6;
const FORMS_COUNT = 38;

export const resourceCounts = {
  tools: digitalTools.length,
  presentations: PRESENTATIONS_COUNT,
  forms: FORMS_COUNT,
  guides: GUIDES_COUNT,
};