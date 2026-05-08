/**
 * Monetization configuration & helpers.
 *
 * Status: SCAFFOLD ONLY. All gating is disabled while
 * MONETIZATION_ENABLED = false. Flip the flag once Stripe
 * is wired and pricing is decided.
 *
 * Model: one-time "Premium" purchase unlocks all paid tools forever.
 */

export const MONETIZATION_ENABLED = false;

export interface AccessUser {
  id?: string;
  hasPremium?: boolean;
}

export interface AccessTool {
  id: string;
  isPaid?: boolean;
}

/** Returns true while gating is off, otherwise checks the user's premium flag. */
export function canAccessTool(tool: AccessTool, user?: AccessUser | null): boolean {
  if (!MONETIZATION_ENABLED) return true;
  if (!tool.isPaid) return true;
  return !!user?.hasPremium;
}

/** Whether to render the 🔒 Premium badge on a tool card. */
export function shouldShowPremiumBadge(tool: AccessTool): boolean {
  return MONETIZATION_ENABLED && !!tool.isPaid;
}

/** Whether the Premium upsell page is reachable. */
export function isPremiumPageActive(): boolean {
  return MONETIZATION_ENABLED;
}
