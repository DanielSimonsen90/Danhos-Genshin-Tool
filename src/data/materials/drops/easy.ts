import MobDrop from "@/common/models/materials/MobDrop";
import { Rarity } from "@/common/types";

export const Arrowhead = MobDrop.create('Arrowhead', {
  [Rarity.Rare]: 'Weathered',
  [Rarity.Uncommon]: 'Sharp',
  [Rarity.Common]: 'Firm',
}, {
  [Rarity.Rare]: `An old arrowhead coated in blood.\nThe arrowhead has long since lost its sharpness and thus its use as a weapon.\nHowever, it represents the pride of a hunter and acts as both an amulet and a medal.`,
  [Rarity.Uncommon]: `A well-made arrowhead. Sharp enough to penetrate armor with the ease of a rock through the surface of water.`,
  [Rarity.Common]: `A roughly produced arrowhead.\nThough unimpressive, neither it nor the bow should be underestimated, for even the bravest knight can be felled by an arrow from the rear.`,
});

export const Mask = MobDrop.create('Mask', {
  [Rarity.Rare]: 'Ominous',
  [Rarity.Uncommon]: 'Stained',
  [Rarity.Common]: 'Damaged',
}, {
  [Rarity.Rare]: `A glossy bone mask with oil markings painted on it, meant to intimidate enemies.\nNo one really knows why hilichurls are so fascinated with masks. Some say that it's because they don't want to see their own reflections in the water.`,
  [Rarity.Uncommon]: `A bone mask, covered in unidentifiable stains, that emanates a mysterious odor.\nYet such is the devotion of hilichurls to masks that they will wear it nonetheless.`,
  [Rarity.Common]: `A broken bone mask that once belonged to some hilichurl.\nNow more broken than complete, it can no longer perform its primary function.`,
});

export const Scroll = MobDrop.create('Scroll', {
  [Rarity.Rare]: 'Forbidden Curse',
  [Rarity.Uncommon]: 'Sealed',
  [Rarity.Common]: 'Divining',
}, {
  [Rarity.Rare]: `A scroll inscribed with ancient images. It is said that few can decipher its meaning, and the few scholars that have all went mad.`,
  [Rarity.Uncommon]: `An old scroll lacking in detail and clarity. By following the images on it, some magical creatures can recreate a small part of its magic.`,
  [Rarity.Common]: `A scroll that likely relates to some kind of magic. Exudes an inexplicable but ominous warmth.`
});

export const Slime = MobDrop.create('Slime', {
  [Rarity.Rare]: 'Concentrate',
  [Rarity.Uncommon]: 'Secretions',
  [Rarity.Common]: 'Condensate',
}, {
  [Rarity.Rare]: `Concentrated slime essence. When left alone, it will begin to move on its own.`,
  [Rarity.Uncommon]: `Mildly purified slime secretions.\nHarmful to the skin. Please avoid direct exposure.`,
  [Rarity.Common]: `A thick coating found on slimes.\nMost commonly seen material in elemental workshops.`
}, {
  prependName: true
});

export const FatuiInsignia = MobDrop.create('Insignia', {
  [Rarity.Rare]: `Lieutenant's`,
  [Rarity.Uncommon]: `Sergeant's`,
  [Rarity.Common]: `Recruit's`,
}, {
  [Rarity.Rare]: `An insignia to identify officers.\nThe Fatui possess a colossal army, so there must be something extraordinary about the ones who achieved this rank within the group.`,
  [Rarity.Uncommon]: `An insignia with a different shape to distinguish the sergeants from new recruits. Perhaps there are complicated emotions behind it.`,
  [Rarity.Common]: `An insignia to identify the recruits.\nMakes one wonder about what the ones joining the Fatui's war machine were thinking.`
});

export const Nectar = MobDrop.create('Nectar', {
  [Rarity.Rare]: 'Energy',
  [Rarity.Uncommon]: 'Shimmering',
  [Rarity.Common]: 'Whopperflower',
}, {
  [Rarity.Rare]: `A thick and sticky honey that is full of energy.\nThe Whopperflower hunts by tricking its prey, a process it uses to possibly evolve into a more powerful and pure form.`,
  [Rarity.Uncommon]: `Nectar that is full of pure elemental energy.\nScholars generally concur that Whopperflowers are advanced life forms among the elemental plants, but there has yet to be a satisfactory explanation regarding their predatory habits.`,
  [Rarity.Common]: `Nectar extracted from the stamen of a Whopperflower that contains trace amounts of elemental energy.\nThe taste of the nectar has a hint of Sweet Flower in it.`
});

export const TreasureHoarderInsignia = MobDrop.create('Insignia', {
  [Rarity.Rare]: 'Golden Raven',
  [Rarity.Uncommon]: 'Silver Raven',
  [Rarity.Common]: 'Treasure Hoarder',
}, {
  [Rarity.Rare]: `A raven insignia that symbolizes the pride and the guiding principle of the Treasure Hoarders.\nWhether it's hidden amidst the vastness of the land or in the depths of the seas, as long as there are treasures to be hunted down, the spirit of Treasure Hoarders, who will stop at nothing to acquire them, will never die.`,
  [Rarity.Uncommon]: `A raven insignia used by members of the Treasure Hoarders to identify each other. The Treasure Hoarders ask for no resume.\nAnyone who has an insatiable desire for treasure and is backed up by an equal amount of courage can become a worthy member.`,
  [Rarity.Common]: `A signet that proudly represents its owner's position as member of the Treasure Hoarders. The pursuit of treasure knows no bounds. That said... Is being a thief something to be proud of?`,
});

export const Handguard = MobDrop.create('Handguard', {
  [Rarity.Rare]: 'Famed',
  [Rarity.Uncommon]: 'Kageuchi',
  [Rarity.Common]: 'Old',
}, {
  [Rarity.Rare]: `An intricately-made handguard that was mounted upon a famed weapon.\nSome believe that swords have souls and lives of their own, and thus deserve their own names.\nThose who love their blades will be acknowledged by them in turn.\nBut those who see their swords as friends or even lovers should be warned that this relationship is built on death and bloodshed. The passions of those who dance with their blade amid crimson showers must surely be cooled someday by fickle steel.`,
  [Rarity.Uncommon]: `A handguard mounded upon a sword of some distinction.\nInazuma has a long tradition of sword-making. When making swords, smiths will often make several different weapons at once, before choosing from among them the "shinuchi," or the best weapon, while the others are known as "kageuchi."`,
  [Rarity.Common]: `A battle-worn handguard that was once mounted on an Inazuman blade.\nFor those adept in the art of the sword, the tsuba is a defense from the edge of an opponent's blade.\nFor beginners, it is a defense made for their own right hand, to protect it from itself.`,
});

export const Spectral = MobDrop.create('Spectral', {
  [Rarity.Rare]: 'Nucleus',
  [Rarity.Uncommon]: 'Heart',
  [Rarity.Common]: 'Husk',
}, {
  [Rarity.Rare]: `A complete energy core that can sometimes be found after defeating Specters.\nThere is a debate among those who just have to divide the world into winners and losers: what floats better — a Specter or an Anemo Slime?`,
  [Rarity.Uncommon]: `An energy core that allows the Specters to float.\nThese elemental life-forms have strange behavioral patterns and will periodically surge in number before disappearing.`,
  [Rarity.Common]: `An energy core that allows the Specters to float. It contains a small amount of elemental energy.\nMost of the rest has already dispersed.`,
}, {
  prependName: true
});

export const EremiteDrop = MobDrop.create("<placeholder>", {
  [Rarity.Rare]: 'Rich Red Brocade',
  [Rarity.Uncommon]: 'Trimmed Red Silk',
  [Rarity.Common]: 'Faded Red Satin',
}, {
  [Rarity.Rare]: `A piece of red brocade woven with golden thread.\nThose born in the gilded desert under the sun occasionally sing a song, of which the meaning has been forgotten. They would praise the scorching sun that illuminates the earth as equally as ever and bewail the afterglow at the end of the dusk. Some unfamiliar words recur at the end of the song, which are said to be the names of ancient gods. Legend has it that when the King of the Desert was still alive, his people chose to cover their eyes as they dared not look upon him, whose brilliance was beyond that of the sun.`,
  [Rarity.Uncommon]: `A piece of red silk trimmed with simple decorations.\nA seasoned warrior can detect weaknesses from their foe's eyes and thus take advantage. The Eremites have long since lost a master to serve, and now they have no one to trust but themselves. Word has it that they are more than convinced that all things betray, even their own eyes.`,
  [Rarity.Common]: `A piece of red satin used to cover the eyes. The fabric is slightly torn.\nMany Eremites tend to cover their eyes with textiles, but the original intention of this practice has long been lost to the sands of time.,`
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity
  )
});

export const FungalNucleus = MobDrop.create('Fungal Nucleus', {
  [Rarity.Rare]: 'Robust',
  [Rarity.Uncommon]: 'Dormant',
  [Rarity.Common]: 'Inactivated',
}, {
  [Rarity.Rare]: `Body tissue left behind by a Fungus that has been exposed to intense elemental stimulation.\nIt is generally believed that the Fungi evolved into more mobile forms to better disperse their spores.\nA poet once depicted a shared dream of the Fungi in which their spores covered every inch of the mountains and oceans. The world had never been more tranquil.\nThen the Fungi turned into fish, birds, beasts, men, and gods, relying on rainfall, land, and their own kind who had returned to the earth.`,
  [Rarity.Uncommon]: `Body tissue left behind by a Fungus that has been exposed to intense elemental stimulation.\nThere was once a protracted debate among Amurta researchers on whether the Fungi should be categorized as plants or animals.\nIn the end, they reached an agreement and closed the case for good — the Fungi shall be its own category, neither plant nor animal.`,
  [Rarity.Common]: `Body tissue left behind by a Fungus that has been exposed to intense elemental stimulation.\nIts soothing texture makes it shockingly good for stress relief.\nHowever, frequent usage can also easily lead to the Fungi multiplying, and thus the material is not suitable for any commercial use.`,
});

export const FungalSpores = MobDrop.create('<placeholder>', {
  [Rarity.Rare]: 'Crystalline Cyst Dust',
  [Rarity.Uncommon]: 'Luminescent Pollen',
  [Rarity.Common]: 'Fungal Spores',
}, {
  [Rarity.Rare]: `A huge lump of spore powder collected from a structurally complete spore cyst. Put it in an appropriate environment, and the area might be filled with a thriving aggregation of Floating Fungi later...`,
  [Rarity.Uncommon]: `A small parcel of luminescent Fungal Spore powder, a common medical ingredient in the land of rainforests. Merchants usually sell them in paper packets.`,
  [Rarity.Common]: `A small amount of glittering spore powder left behind by Floating Fungi. Seems that a sneeze is all it takes for this powder to vanish without a trace.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity
  )
});

export const Gear = MobDrop.create('Gear', {
  [Rarity.Rare]: 'Artificed Dynamic',
  [Rarity.Uncommon]: 'Mechanical Spur',
  [Rarity.Common]: 'Meshing',
}, {
  [Rarity.Rare]: `Clockwork meka gear.\nPrecision processing and advancement of material science are the keys to clockwork meka development in Fontaine. With the help of advanced equipment, any engineer is capable of making a meka that outshines "Lord-Artificer" Alain Guillotin's creation.`,
  [Rarity.Uncommon]: `Clockwork meka gear.\nAlthough many breakthroughs have been made in the kinematics of clockwork meka, its dynamics research has not seen any major advancements beyond the framework laid down by Alain Guillotin four hundred years ago.`,
  [Rarity.Common]: `Clockwork meka's gear.\nIt is a crucial part of the meka's transmission structure. The whole system will malfunction if this gear is absent.`,
});

export const FontemerAberrantPearl = MobDrop.create('<placeholder>', {
  [Rarity.Rare]: 'Xenochromatic Crystal',
  [Rarity.Uncommon]: 'Transoceanic Chunk',
  [Rarity.Common]: 'Transoceanic Pearl',
}, {
  [Rarity.Rare]: `A large crystal obtained from a defeated Fontemer Aberrant.\nIt contains a mysterious energy.\nAll rivers and seas originate in Fontaine, but the water loses all its unique properties once it flows outside Fontaine's borders.`,
  [Rarity.Uncommon]: `A crystal obtained from a defeated Fontemer Aberrant.\nIt gives off a somewhat mysterious energy.\nAlthough many legends speak of great life forms residing in remote seas beyond human reach, ordinary oceans can hardly compare to the vibrant seas of Fontaine.`,
  [Rarity.Common]: `A small crystal obtained from a defeated Fontemer Aberrant.\nFontemer Aberrants arise from Fontaine's sea. They are believed to be a unique life form born from the mysterious energy in the water.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity
  )
});

export const Whistle = MobDrop.create('Whistle', {
  [Rarity.Rare]: `Saurian-Crowned Warrior's Golden`,
  [Rarity.Uncommon]: `Warrior's Metal`,
  [Rarity.Common]: `Sentry's Wooden`,
}, {
  [Rarity.Rare]: `Among Natlan's tribes, this is the symbol of a mighty, Saurian-Crowned warrior.\nA golden whistle that is bestowed only upon those who have won great honor for the tribe and shown valor of the highest order.\nIts symbolic significance now outweighs its practical use, for a Saurian-Crowned warrior is able to handle most crises alone.`,
  [Rarity.Uncommon]: `The symbol of a Natlan tribal warrior.\nA metal whistle that is given to individuals who have been officially recognized as tribal warriors. It is used to communicate and alert others to danger by those that patrol the tribe's vicinity. This is a duty that falls upon the warriors of the tribe.`,
  [Rarity.Common]: `The symbol of a Natlan tribal sentry.\nWarriors are not born as warriors.\nThey must first acquire the skills of combat by learning under the tutelage of those who have already done so. This is the origin of the trainee position of sentry.`,
});

export const Fang = MobDrop.create('Fang', {
  [Rarity.Rare]: `Tyrant's`,
  [Rarity.Uncommon]: `Seasoned`,
  [Rarity.Common]: `Juvenile`,
}, {
  [Rarity.Rare]: `A sharp tooth that fell from a mighty Natlan Saurian.\nIts serrated edge and fearsome shape attest to the ferocity of its owner in battle. Among the many Saurians of Natlan, one with such a tooth must have been a ruthless tyrant indeed.`,
  [Rarity.Uncommon]: `A sturdy tooth that fell from a Natlan Saurian.\nWear and tear bear witness to the experiences and battles of its previous owner. Among the many Saurians of Natlan, one with such a tooth must have been considered a formidable warrior indeed.`,
  [Rarity.Common]: `A tooth that fell from a Natlan Saurian.\nIt looks like it belonged to a juvenile creature. If there was a way to determine the age of its previous owner, perhaps it would show that they had not yet roamed the world for long.`,
});

export const Warrant = MobDrop.create('Warrant', {
  [Rarity.Rare]: `Frost-Etched`,
  [Rarity.Uncommon]: `Immaculate`,
  [Rarity.Common]: `Tattered`,
}, {
  [Rarity.Rare]: `A warrant issued to members of the Fatui Oprichniki.\nAdorned by a frost-colored crystal — a symbol of glory. One wonders what deeds its bearer must have performed to prove their loyalty and worth.`,
  [Rarity.Uncommon]: `A warrant issued to members of the Fatui Oprichniki.\nOne wonders if the exquisite styling might hide a price paid for its owner's promotion.`,
  [Rarity.Common]: `A warrant issued to members of the Fatui Oprichniki.\nOne wonders what resolve drove its bearer to sign up.`,
});

export const DriveShaft = MobDrop.create('Drive Shaft', {
  [Rarity.Rare]: 'Precision',
  [Rarity.Uncommon]: 'Reinforced',
  [Rarity.Common]: 'Broken',
}, {
  [Rarity.Rare]: `The drive shaft of a Landcruisen refined by the Design Bureau.\nOn the blueprints drawn by the engineers of the north, this unassuming part was once the flawless embodiment of glory and technological advancement, its small metal body encapsulating the wisdom of countless generations.\nNow it lies in the cold dirt, waiting to be recycled once more.`,
  [Rarity.Uncommon]: `The reinforced drive shaft of a Landcruiser.\nIt took countless reports of destruction to bring about this insignificant improvement. In a sense, the administrative system of the Royal Armory Palace is several times more complex than the machinery it builds. After all, even the most advanced Landcruisers don't take months or even years to build.`,
  [Rarity.Common]: `The drive shaft of a Landcruiser destroyed in battle.\nEven the most precise craftsmanship cannot withstand excessive wear, just as the most lofty ideals cannot bring back those who've died in vain for someone else's cause. Moreover, mass-produced components can hardly be called precise, and mass-produced ideals can hardly be considered true ideals.`,
});
