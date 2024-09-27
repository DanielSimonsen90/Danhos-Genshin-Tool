import { StatName, StatValue } from "../types";

export class Stat {
  constructor(
    public name: StatName,
    public value: StatValue
  ) {}

  public toString(): string {
    return `${this.name}+${this.value}`; // This format follows Genshin's in-game display for substats
  }
}

export default Stat;