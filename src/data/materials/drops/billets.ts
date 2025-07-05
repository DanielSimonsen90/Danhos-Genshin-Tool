import { Billet } from "@/common/models/materials/Billet";
import { Region, Weapon } from "@/common/types";

function generateBillet(
  lander: string,
  philosopherBelieve: string,
  regions: Array<Region>
) {
  const generateBilletWeapon = (weapon: Weapon) => new Billet(
    `${lander}lander ${weapon} Billet`,
    `Weapon forging material. Can be used to forge 4-star ${weapon.toLowerCase()}s.\n${philosopherBelieve}`,
    regions
  );

  return {
    sword: generateBilletWeapon('Sword'),
    bow: generateBilletWeapon('Bow'),
    claymore: generateBilletWeapon('Claymore'),
    catalyst: generateBilletWeapon('Catalyst'),
    polearm: generateBilletWeapon('Polearm'),
    [Symbol.iterator]: function* (): IterableIterator<Billet> {
      const weapons = ['sword', 'bow', 'claymore', 'catalyst', 'polearm'];
      for (const weapon of weapons) {
        yield this[weapon];
      }
    }
  };
}

export const Northlander = generateBillet('North',
  `Philosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater.`,
  [
    'Mondstadt',
    'Liyue',
    'Inazuma'
  ]
);

export const Midlander = generateBillet('Mid',
  `Philosophers believe that there are four purposes behind earthly things. The purpose of these billets is to become a weapon worthy of accompanying a hero.`,
  [
    'Sumeru',
    'Fontaine',
  ]
);

export const Borderlander = generateBillet('Border',
  `In terms of the "state" of the many weapons that can be crafted from billets, while their potential has long been contained within the original materials, the exact forms these weapons will ultimately take remain unknown to this day...`,
  [
    'Natlan'
  ]
);

export default {
  ...[...Northlander].reduce((acc, billet) => {
    acc[`Northlander ${billet.name}`] = billet;
    return acc;
  }, {} as Record<string, Billet>),
  ...[...Midlander].reduce((acc, billet) => {
    acc[`Midlander ${billet.name}`] = billet;
    return acc;
  }, {} as Record<string, Billet>),
  ...[...Borderlander].reduce((acc, billet) => {
    acc[`Borderlander ${billet.name}`] = billet;
    return acc;
  }, {} as Record<string, Billet>),
}