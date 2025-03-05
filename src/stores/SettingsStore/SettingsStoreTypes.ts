export type AppSettings = {
  showAll: boolean;
  wrap: boolean;
  preferredTabs: {
    searchOrHistory: 'search' | 'history';
    results: 'combined' | 'artifacts' | 'characters';
  },
  updated: number;
  newUser: boolean;
}