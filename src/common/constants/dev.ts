export const DEBUGS = {
  // common
  strings: false,

  // pages
  searchQuery: true,

  // components
  priorityList: true,
  searchComponent: false,
  settingsModal: false,
  settingsContainer: true,

  // hooks
  useActionState: false,
  useComponent: false,

  // services
  baseService: false,
  searchService: false,
  imageService: false,

  // stores
  cacheStore: false,
  dataStore: false,
  favoriteStore: false,
  accountStore: false,
  settingsStore: false,
};

export const IS_DEVELOPMENT_ENVIRONMENT = process.env.NODE_ENV === "development";