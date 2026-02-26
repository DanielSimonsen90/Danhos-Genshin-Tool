import { WorldRegion } from ".";

export function generateAccountId() {
  return `account_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export function getGenshinServerDay(region: WorldRegion) {
  const now = new Date();

  // Genshin Impact daily reset happens at 4am server time
  const GENSHIN_RESET_HOUR = 4;

  // Define server timezone offsets (hours from GMT)
  // TW, HK, MO timezone is unknown, so it's excluded and falls back to user's local time
  const serverTimezoneOffsets: Record<WorldRegion, number> = {
    'Asia': 8,           // GMT+8
    'Europe': 1,         // GMT+1
    'North America': -5,  // GMT-5
    'TW, HK, MO': 8      // GMT+8 (assumed, but not confirmed)
  };

  const timezoneOffset = serverTimezoneOffsets[region];

  // If unknown region, return user's current day
  if (timezoneOffset === undefined) return now.getDay();

  // Calculate server time
  const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const serverTime = new Date(utc + (timezoneOffset * 60 * 60 * 1000));

  // If it's before 4am server time, consider it the previous day
  if (serverTime.getHours() < GENSHIN_RESET_HOUR) {
    const previousDay = new Date(serverTime);
    previousDay.setDate(previousDay.getDate() - 1);
    return previousDay.getDay();
  }

  return serverTime.getDay();
}
export function getGenshinServerDayName(region: WorldRegion) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = getGenshinServerDay(region);
  return days[dayIndex] ?? 'Unknown';
}