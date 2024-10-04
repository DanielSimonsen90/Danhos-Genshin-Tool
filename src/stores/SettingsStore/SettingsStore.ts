import { BaseStore } from "../BaseStore";
import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from "./SettingsStoreConstants";
import { Settings, SettingsEvents } from "./SettingsStoreTypes";

export class SettingsStore extends BaseStore<SettingsEvents> {
  public static readonly instance = new SettingsStore();
  constructor() {
    super('SettingsStore');
    this.settings = this.load();
  }

  private settings: Settings = DEFAULT_SETTINGS;

  public getSetting<TKey extends keyof Settings>(key: TKey): Settings[TKey] {
    return this.settings[key];
  }
  public setSetting<TKey extends keyof Settings>(key: TKey, value: Settings[TKey]) {
    this.settings[key] = value;
    this.save();
    // this.emit('change', key, value);
  }

  public reset() {
    this.settings = DEFAULT_SETTINGS;
    this.save();
    this.emit('reset');
  }

  private save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.settings));
  }
  private load(): Settings {
    const settings = localStorage.getItem(LOCAL_STORAGE_KEY);
    return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
  }
}