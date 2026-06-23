import { Settings } from "@/common/types/app-types";

export const titles: Record<keyof Settings, string> = {
  // App settings
  showAll: 'Show all search results',
  wrap: 'Wrap search results',
  preferredTabs: 'Preferred tabs',
  defaultLandingPage: 'Default landing page',
  cacheEvictionDays: 'Keep search history for',

  // Account settings
  accountCrud: 'Account management',
  selectedAccount: 'Selected account',
  selectedAccountName: 'Selected account name',
  traveler: `The account's Traveler character`,
  worldRegion: `The account's world region`,
};

export const descriptions: Record<keyof Settings, string> = {
  // App settings
  showAll: `Show all characters in Artifact Helper search results, regardless of lower score.`,
  wrap: `Wrap each character result card, so they don't extend more than necessary horizontally.`,
  preferredTabs: `Prefer these tabs when using specified TabBar components.`,
  defaultLandingPage: `Navigate here automatically when the app opens. Leave empty to stay on the home page.`,
  cacheEvictionDays: `Automatically remove search history entries older than this. Select Never to keep them indefinitely.`,

  // Region settings
  accountCrud: `Create more accounts or delete the current one.`,
  selectedAccount: `The selected account.`,
  selectedAccountName: `The name of the selected account.`,
  traveler: `The preferred Traveler character to use in images and references.`,
  worldRegion: `The preferred world region for account data to help determine server location for daily material updates.`,
}