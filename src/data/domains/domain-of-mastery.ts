import { DomainOfMastery } from "@/common/models/domains";

/**
 * Mondstadt
 */
export const ForsakenRift = new DomainOfMastery(
  'Forsaken Rift',
  "It is said that in ancient times, people would venture into the valley to seek out the ancient tree on the altar. They would whisper their secrets into the tree hollow, relieving themselves of the burden of keeping the secrets to themselves. The Forsaken Rift is filled with such long-forgotten secrets.",
  {
    1: `(Pyro)`,
    2: `(Pyro)`,
    3: `All party members gain a Pyro DMG Bonus. (Pyro)`,
    4: `All party members gain a Pyro DMG Bonus. (Pyro)`,
  },
  "Mondstadt"
);

/**
 * Liyue
 */
export const TaishanMansion = new DomainOfMastery(
  'Taishan Mansion',
  `Once, people who sought the path of the adepti had to pass the trials of heaven and earth. Taishan Mansion served as the trial of "earth". Now that the adepti have long departed from this realm, Taishan Mansion has also turned into a common treasure trove.`,
  {
    1: `(Hydro/Cryo/Electro)`,
    2: `(Hydro/Cryo/Electro)`,
    3: `Smoldering Flames is an application of Pyro that will continuously deal DMG to characters. Use Elemental Reactions to remove it or use characters' healing abilities and shields to decrease combat difficulty. (Hydro/Cryo/Electro)`,
    4: `Smoldering Flames is an application of Pyro that will continuously deal DMG to characters. Use Elemental Reactions to remove it or use characters' healing abilities and shields to decrease combat difficulty. (Hydro/Cryo/Electro)`,
  },
  "Liyue"
);

/**
 * Inazuma
 */
export const VioletCourt = new DomainOfMastery(
  "Violet Court",
  `Sometime in the ancient past, the mountains rose higher than the skies, and the earth was larger than heaven's dome. But one day, the mirror shattered, and the oceans arose. In these legends, this caused the court of the primeval sakura to become sundered from the other islands.`,
  {
    1: `(Electro)`,
    2: `(Electro)`,
    3: `When you obtain Nascent Electro Pearls produced by Electro Crystalfruits, characters' attacks will trigger one instance of additional Electro DMG when they hit opponents. (Electro)`,
    4: `When you obtain Nascent Electro Pearls produced by Electro Crystalfruits, characters' attacks will trigger one instance of additional Electro DMG when they hit opponents. When one of the two Kairagi falls, the other will quickly regenerate its HP and buff itself. (Electro)`,
  },
  "Inazuma"
);

/**
 * Sumeru
 */
export const SteepleOfIgnorance = new DomainOfMastery(
  "Steeple of Ignorance",
  `In the ancient past, man-made towers that could touch the skies were built all across the land. Though human hearts flowed downward, their sounds aspired toward the high heavens. These towers would always fall, or collapse under their own weight and plummet into the depths. However, if one were to look at things on a grander scale, the heavens and earth are as one - no direction is truly different from another.`,
  {
    1: `(Dendro/Electro/Pyro/Hydro)`,
    2: `(Dendro/Electro/Pyro/Hydro)`,
    3: `During this challenge, dealing Elemental DMG to opponents will increase the DMG dealt by all party members. Different types of Elemental DMG will trigger this effect independent durations. (Dendro/Electro/Pyro/Hydro)`,
    4: `During this challenge, dealing Elemental DMG to opponents will increase the DMG dealt by all party members. Different types of Elemental DMG will trigger this effect independent durations. (Dendro/Electro/Pyro/Hydro)`,
  },
  "Sumeru"
);

/**
 * Fontaine
 */
export const PaleForgottenGlory = new DomainOfMastery(
  "Pale Forgotten Glory",
  `In the past, the great white armada that traversed the seas was Fontaine's supreme pride and glory, for the Mistress of Rivers and Oceans blessed her people with the authority and wish to conquer all the waters of the world. However, this lofty ambition was insufficient to overcome the laws of fate. To this day, on the brass masts are inscribed the words: "I have conquered the waves of the four seas."`,
  {
    1: `(Geo/Hydro/Pyro/Cryo)`,
    2: `(Pyro/Hydro/Electro)`,
    3: `When a character's current HP increases or decreases, your active character's Normal, Charged and Plunging Attacks will deal increased DMG. (Geo/Hydro/Pyro/Cryo)`,
    4: `When a character's current HP increases or decreases, your active character's Normal, Charged and Plunging Attacks will deal increased DMG. (Pyro/Hydro/Electro)`,
  },
  "Fontaine"
);

/**
 * Natlan
 */
export const BlazingRuins = new DomainOfMastery(
  "Blazing Ruins",
  `In that era, when people had yet to attain true mastery of the flames, there were sages in all corners of the world who pondered the fire and sought to fathom its mysteries. It is said that these ruins are all that is left of what was once a ring-shaped ceremonial site. Here, these sages attempted to perfect the rituals required to transform phlogiston. Among the heroes who later followed the mighty one into the belly of the volcano, there were several who once trained in this place.`,
  {
    1: `(Dendro/Electro/Anemo/Hydro)`,
    2: `(Dendro/Electro/Anemo/Hydro)`,
    3: `When characters from Natlan are in Nightsoul's Blessing, their Nightsoul points will change. This will increase their DMG dealt when combined with Ley Line Disorder effects. (Dendro/Electro/Anemo/Hydro)`,
    4: `When characters from Natlan are in Nightsoul's Blessing, their Nightsoul points will change. This will increase their DMG dealt when combined with Ley Line Disorder effects. (Dendro/Electro/Anemo/Hydro)`,
  },
  "Natlan"
);

/**
 * Nod-Krai
 */
export const LightlessCapital = new DomainOfMastery(
  "Lightless Capital",
  `Hundreds of years ago, Nod-Krai too experienced a golden age, where adventurers and treasure hunters gathered in droves at the prosperous city that bore the weight of humanity's arrogant dreams, its steel sinews and iron bones reflecting industrial and technological glory at the very edge of the world. Then calamity descended, and objects both living and not were dragged equally into the darkness, while past vibrance and opulence were buried by the ruthless march of time.`,
  {
    1: '(Hydro/Electro)',
    2: '(Hydro/Electro)',
    3: 'When a character triggers Electro-Charged or Lunar-Charged, a shockwave will be unleashed that deals greater DMG to opponents. (Hydro/Electro)',
    4: 'When a character triggers Electro-Charged or Lunar-Charged, a shockwave will be unleashed that deals greater DMG to opponents. (Hydro/Electro)',
  },
  'Nod-Krai'
);