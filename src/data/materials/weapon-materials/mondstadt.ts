import { WeaponAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import { Rarity } from "@/common/types";
import { CeciliaGarden } from '../../domains/domain-of-forgery';

export const XOfDecarabiansX = WeaponAscensionMaterial.create(
  {
    [Rarity.Uncommon]: `Tile of Decarabian's Tower`,
    [Rarity.Rare]: `Debris of Decarabian's City`,
    [Rarity.Epic]: `Fragment of Decarabian's Epic`,
    [Rarity.Legendary]: `Scattered Piece of Decarabian's Dream`
  },
  {
    [Rarity.Uncommon]: `The place now known as Stormterror's Lair was once the capital city of Decarabian, the God of Storms. Since this dream of prosperity was created entirely by his divine might, the broken pieces left behind by the shattering of that dream still possess great power.`,
    [Rarity.Rare]: `Decarabian, the God of Storms, was content with the capital city he had raised, and accepted the worship of the people from atop his tower. But he knew not that the people did not bow to him out of respect or adoration.`,
    [Rarity.Epic]: `Andrius once declared war upon Decarabian, but failed to even scratch the capital of the Lord of the Tower. If it were not for the song of freedom that shattered the city in an instant, Decarabian's dream would have gone on forever.`,
    [Rarity.Legendary]: `The people did not bow to Decarabian out of respect or adoration, but because the harsh winds had laid them low. This was the shattered dream and ambition of the Anemo Archon before the Rise of Barbatos.\nHe tried so hard to make his dream come true, and so the fragments of that dream are still mighty.`
  },
  'Mondstadt',
  CeciliaGarden,
  'Monday/Thursday'
);

export const BorealWolfsXTooth = WeaponAscensionMaterial.create(
  {
    [Rarity.Uncommon]: `Boreal Wolf's Milk Tooth`,
    [Rarity.Rare]: `Boreal Wolf's Cracked Tooth`,
    [Rarity.Epic]: `Boreal Wolf's Broken Fang`,
    [Rarity.Legendary]: `Boreal Wolf's Nostalgia`
  },
  {
    [Rarity.Uncommon]: `Andrius' wolf pack is its blessed honor guard, and even the milk teeth of a wolf cub possess great potential.\nIn the past, the gods had the responsibility to love all people.\nAndrius was therefore quite unusual in that he became leader of the wolves, while only welcoming abandoned babies and wanderers when it came to humans.`,
    [Rarity.Rare]: `The life of a wolf is not without violence; broken bones or cracked teeth are nothing special\nAndrius found humans to be a disappointment, but believed babies to innocent. If both the wolf pack and the adopted children chose each other, then they become a Lupical, a fated family.`,
    [Rarity.Epic]: `The wolf pack also understands that humans are not solitary creatures. The honorary broken tooth is a parting gift said to bring protection and luck.\nIn the legends of a far-off world, a female wolf once adopted two great humans. Their home was known as the Cave of Wolves, or Lupercal - that word meaning the same thing as Lupical does in this world.`,
    [Rarity.Legendary]: `The Wolf King, believing himself to despise humans, thought himself unable to envision a happy life for humanity, making him unworthy of becoming the Lord of the Winds of the world. Therefore, he chose to disappear. Yet, in truth, he gazes on the ones abandoned by the world ever so gently.`
  },
  'Mondstadt',
  CeciliaGarden,
  'Tuesday/Friday'
);

export const XOfDandelionGladiator = WeaponAscensionMaterial.create(
  {
    [Rarity.Uncommon]: `Fetters of the Dandelion Gladiator`,
    [Rarity.Rare]: `Chains of the Dandelion Gladiator`,
    [Rarity.Epic]: `Shackles of the Dandelion Gladiator`,
    [Rarity.Legendary]: `Dream of the Dandelion Gladiator`
  },
  {
    [Rarity.Uncommon]: `It's a human thing to exaggerate a hero's story, even to the point of elevating the fetters that once bound the hero to the level of an enemy of true freedom.\nAs a result, these fetters were granted extraordinary powers.`,
    [Rarity.Rare]: `The Dandelion Gladiator was a hero who fought for freedom, and the chains that bound him were a symbol of his struggle. The chains were broken, but the memory of the struggle remains.`,
    [Rarity.Epic]: `Vennessa was not truly bound by her chains. If she had so wished, no ordinary physical constraints forged in Mondstadt could have held her, for the land there yielded no ore of exceptional quality, nor did it possess the divine flame of her ancestral home.\nShe was only bound by her responsibility to take care of her tribespeople.`,
    [Rarity.Legendary]: `Vennessa may have been freed from slavery, but she then found herself subject to many other, even greater forms of bondage. What began as a duty to her tribespeople extended to all of Mondstadt, then to the concept of freedom itself, and beyond a point even to the whole world.\nWhat she really hoped for, in truth, was that the world might grow stronger.`
  },
  'Mondstadt',
  CeciliaGarden,
  'Wednesday/Saturday'
);