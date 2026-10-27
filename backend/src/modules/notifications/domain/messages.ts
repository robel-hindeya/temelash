/** Customer-facing bot message texts. Plain text (no Markdown), short enough to read on a lock screen. */

export function stampText(input: {
  merchantName: string;
  effectiveStamps: number;
  stampsRequired: number;
  rewardName: string | null;
}): string {
  const onCard = input.effectiveStamps % input.stampsRequired;
  const left = input.stampsRequired - onCard;
  const progress = `${onCard}/${input.stampsRequired}`;
  return input.rewardName
    ? `Stamp added at ${input.merchantName}: ${progress}. ${left} more to ${input.rewardName}.`
    : `Stamp added at ${input.merchantName}: ${progress}.`;
}

export function rewardUnlockedText(input: {
  merchantName: string;
  rewardName: string | null;
  expiresAt: Date | null;
}): string {
  const reward = input.rewardName ?? 'Your reward';
  const until = input.expiresAt ? ` Use it by ${formatDay(input.expiresAt)}.` : '';
  return `${reward} at ${input.merchantName} is ready! Show your card at the counter.${until}`;
}

export function rewardExpiringText(input: {
  merchantName: string;
  rewardName: string | null;
  expiresAt: Date;
  now: Date;
}): string {
  const days = Math.max(
    0,
    Math.ceil((input.expiresAt.getTime() - input.now.getTime()) / 86_400_000),
  );
  const when = days <= 1 ? 'tomorrow' : `in ${days} days`;
  return `Reminder: your ${input.rewardName ?? 'reward'} at ${input.merchantName} expires ${when} (${formatDay(input.expiresAt)}).`;
}

/** `{first name}` in the merchant's message becomes the customer's first name. */
export function promotionText(input: {
  merchantName: string;
  message: string;
  firstName?: string | null;
}): string {
  const body = input.message.trim().replace(/\{first name\}/gi, input.firstName?.trim() || 'there');
  return `${input.merchantName}: ${body}\n\nReply /stop to stop offers.`;
}

/** "5 Nov 2026" in UTC, so the date never depends on the server's timezone. */
export function formatDay(d: Date): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
