import { RegionData } from "./RegionStoreTypes";

export class RegionContextType extends Array<RegionData> {
  constructor(regionData: RegionData) {
    super();
    if (!regionData) throw new Error('RegionData is required');
    
    this.index = 0;
    this.push(regionData);
  }

  public index: number;
  public get current(): RegionData {
    return this[this.index];
  }

  public push(...items: RegionData[]): number {
    const updates = items.filter(item => this.some(stored => item.region === stored.region));
    if (updates.length) {
      for (const update of updates) {
        const index = this.findIndex(stored => update.region === stored.region);
        if (index >= 0) this[index] = update;
      }
    }

    if (items.length !== updates.length) return super.push(...items.filter(Boolean));
    return this.length;
  }
}