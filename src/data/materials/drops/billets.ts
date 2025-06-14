import { Billet } from "@/common/models/materials/Billet";
import MobDrop from "@/common/models/materials/MobDrop";
import { Region, Weapon } from "@/common/types";

function generateBillet(lander: string, regions: Array<Region>) {
  const generateBilletWeapon = (weapon: Weapon) => new Billet(
    `${lander}lander ${weapon} Billet`,
    `Weapon forging material. Can be used to forge 4-star ${weapon.toLowerCase()}s.\nPhilosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater.`,
    regions
  )
  
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
  }
}

export const Northlander = generateBillet('North', [
  'Mondstadt',
  'Liyue',
  'Inazuma'
]);

export default {
  Northlander
}