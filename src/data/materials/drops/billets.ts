import { Billet } from "@/common/models/materials/Billet";
import MobDrop from "@/common/models/materials/MobDrop";
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
    [Symbol.iterator]() {
      const weapons = ['sword', 'bow', 'claymore', 'catalyst', 'polearm'];
      let index = 0;
      return {
        next: () => {
          if (index < weapons.length) {
            return { value: this[weapons[index++]], done: false };
          } else {
            return { done: true };
          }
        }
      };
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

export default {
  Northlander,
  Midlander,
};