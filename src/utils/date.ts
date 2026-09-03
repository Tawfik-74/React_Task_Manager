/** Returns the local ISO date key (YYYY-MM-DD) for a given date. */
export function toDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Returns the local month key (YYYY-MM) for an ISO date key. */
export function toMonthKey(dateKey: string): string {
  return dateKey.slice(0, 7);
}

/** True when both epoch timestamps fall on the same local calendar day. */
export function isSameDay(a: number, b: number): boolean {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}
