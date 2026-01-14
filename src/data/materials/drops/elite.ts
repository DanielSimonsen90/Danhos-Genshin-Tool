import MobDrop from "@/common/models/materials/MobDrop";
import { Rarity } from "@/common/types";

export const MistGrass = MobDrop.create('Mist Grass', {
  [Rarity.Epic]: `Wick`,
  [Rarity.Rare]: ``,
  [Rarity.Uncommon]: `Pollen`,
}, {
  [Rarity.Epic]: `A rare bundle of Mist Grass that gives off a faint glow. Those who carry it invite both the Cicins and misfortune.`,
  [Rarity.Rare]: `Well-preserved Mist Grass. Some would take advantage of the Cicins' love for the Mist Grass to control them.`,
  [Rarity.Uncommon]: `Strange spores created by Mist Grass in enclosed spaces. They are Cicins' favorite food.`,
}, {
  prependName: true,
});

export const LeyLineBranch = MobDrop.create('Ley Line ', {
  [Rarity.Epic]: `Sprout`,
  [Rarity.Rare]: `Leaves`,
  [Rarity.Uncommon]: `Branch`,
}, {
  [Rarity.Epic]: `It is said that there was a great tree whose roots once spread out to every corner of the world, and this branch is said to be part of it.\nIt is almost if it was never broken off and taken far away, for its vitality is such that it still sprouts new leaves even now.`,
  [Rarity.Rare]: `A twig from deep within the earth.\nThough it is far from where it once lay, its leaves still pulsate with energy.`,
  [Rarity.Uncommon]: `Fragile branches from deep within the earth. Even after years of aging, from beneath its mottled surface you can see that its power is not yet entirely lost.`
}, {
  prependName: true,
  onCreate: (name, description, rarity) => new MobDrop(
    rarity === Rarity.Epic ? `${name.replace('Sprout', '')} Sprout` : `Dead ${name}`,
    description,
    undefined,
    rarity,
  )
});

export const RuinGuardChaos = MobDrop.create('Chaos ', {
  [Rarity.Epic]: `Core`,
  [Rarity.Rare]: `Circuit`,
  [Rarity.Uncommon]: `Device`,
}, {
  [Rarity.Epic]: `Comes from ancient defunct relic structures. The core that once drove a mechanical beast. Should you come to understand its workings and reproduce it, you could perhaps change the world.`,
  [Rarity.Rare]: `Comes from ancient defunct relic structures. Was once a logic circuit responsible for movement functions. Sadly, no one is able to make sense of how it worked.`,
  [Rarity.Uncommon]: `Comes from ancient defunct relic structures. A part that once held the structure together. Its aesthetically-pleasing engineering is quite exquisite.`,
}, {
  prependName: true,
});

export const Horn = MobDrop.create('Horn', {
  [Rarity.Epic]: `Black Crystal`,
  [Rarity.Rare]: `Black Bronze`,
  [Rarity.Uncommon]: `Heavy`,
}, {
  [Rarity.Epic]: `A metallic horn with an ominous shine decorated with black crystals of an unknown source. It has hardly been used at all. It is likely a ceremonial item of the hilichurls'.`,
  [Rarity.Rare]: `A metallic monster horn that can only be obtained from especially strong hilichurls, since blowing on the horn takes real strength.`,
  [Rarity.Uncommon]: `A crude horn used by hilichurls to warn each other. Given the damage to the horn, it won't be warning anyone any time soon.`,
});

export const SacrificialKnife = MobDrop.create('Sacrificial Knife', {
  [Rarity.Epic]: `Inspector's`,
  [Rarity.Rare]: `Agent's`,
  [Rarity.Uncommon]: `Hunter's`,
}, {
  [Rarity.Epic]: `In the hands of its lord, this fierce weapon has handled many "debts.\nNo one has eyes in the back of their heads, and this weapon and its related techniques are designed around that weakness.`,
  [Rarity.Rare]: `An oddly-shaped weapon made with superior Snezhnayan technology that once belonged to a senior agent. Proper training is required for using this strange weapon.`,
  [Rarity.Uncommon]: `A sharp alloy weapon. Though its owner has been lost, it still reflects a disturbingly cold light.`,
});

export const BoneShard = MobDrop.create('Bone Shard', {
  [Rarity.Epic]: `Fossilized`,
  [Rarity.Rare]: `Sturdy`,
  [Rarity.Uncommon]: `Fragile`,
}, {
  [Rarity.Epic]: `A fossilized bone fragment sometimes found after defeating Geovishaps.\nGeovishaps all dream of growing into great dragons one day. They see these fossils as dragon bones and greatly cherish them, perhaps because they too hope to attain the dragons' longevity and power.`,
  [Rarity.Rare]: `A fragment of an unknown creature's bones that appear to be prized by Geovishaps for some reason.\nThe fragment appears to be quite aged. Despite being dragon-like beasts with no spoken language, they still seem to have some sort of special affection for these bone shards.`,
  [Rarity.Uncommon]: `A bone shard once carried by a Geovishap.\nAlthough they are quite fragile, they seem to still harbor some indescribable power.`,
});

export const Prism = MobDrop.create('Prism', {
  [Rarity.Epic]: `Polarizing`,
  [Rarity.Rare]: `Crystal`,
  [Rarity.Uncommon]: `Dismal`,
}, {
  [Rarity.Epic]: `A prism that can bend light.\nIn the darkness, these prisms can spread thin light into a wider area. Perhaps this is due to this quirk that these prisms can grant a measure of peace to those whose hearts are oft shrouded in darkness.`,
  [Rarity.Rare]: `A prism that can bend light.\nIllusory images can be made using such prisms, giving such devices - in a matter of speaking - the power to sway human hearts.`,
  [Rarity.Uncommon]: `This was once a prism that could polarize light, but has grown dull through the passing of years.`,
});

export const RuinSentinelChaos = MobDrop.create('Chaos ', {
  [Rarity.Epic]: `Oculus`,
  [Rarity.Rare]: `Axis`,
  [Rarity.Uncommon]: `Gear`,
}, {
  [Rarity.Epic]: `Comes from a now-inactive ancient Ruin machine.\nThe "Ruin" part of the name comes from the areas where they are most active. However, Ruin machines actually have little in common with the detritus in which they are often found.\nIn the ancient past, these ruins were once part of a civilization mighty enough to almost touch the dome of the firmament, while "ruin" still waits in the deep places of the earth, awaiting the order to arise and tread all kingdoms underfoot.`,
  [Rarity.Rare]: `Comes from a now-inactive ancient Ruin machine.\nEven the great techniques and unknown power of this device must come to nothing should the machine that contained them ever fail to maintain structural integrity.`,
  [Rarity.Uncommon]: `Comes from a now-inactive ancient Ruin machine.\nThis is the energy source of that biomimetic mechanism.`,
}, {
  prependName: true
});

export const ConcealedClaw = MobDrop.create('Concealed', {
  [Rarity.Epic]: `Talon`,
  [Rarity.Rare]: `Unguis`,
  [Rarity.Uncommon]: `Claw`,
}, {
  [Rarity.Epic]: `A sharp nail left behind by one of the Riftwolves.\nAll the marvels in the world must pale before "Cretaceus," the greatest work of them all.`,
  [Rarity.Rare]: `Body tissue left behind by one of the Riftwolves.\nThough they are quite wondrous indeed, these hunting hounds of "Alfisol" are nothing of note before Durin of "Humus.`,
  [Rarity.Uncommon]: `Residual body tissue left behind by one of the Riftwolves.\nBy ordinary logic, these objects, so alien to this world, should not have remained behind after these abnormal creatures were excised from the land.`,
}, {
  prependName: true
});

export const Statuette = MobDrop.create('Statuette', {
  [Rarity.Epic]: `Deathly`,
  [Rarity.Rare]: `Dark`,
  [Rarity.Uncommon]: `Gloomy`,
}, {
  [Rarity.Epic]: `A one-eyed carving that emanates an ominous energy, with no indication of what it's made of.\nAs you gaze upon this idol, you can almost hear a strange, comforting whisper...\n"See, my child. All that lies under the throne of heaven shall be destroyed by upheaval. The eternal peace of the pitch-dark void shall embrace us all."`,
  [Rarity.Rare]: `An idol made in the likeness of some unknown, one-eyed person.\nYou can feel a strange warmth emanating from within as you hold onto it, like the shoulder of a dear friend. Perhaps this icon can indeed give people who understand its significance the courage to carry on.`,
  [Rarity.Uncommon]: `An idol made in the likeness of some unknown person.\nEven though this carving has seen many years pass, it still has not been damaged in any way. It seems that its previous owner must have cherished it like some holy icon.`,
});

export const RuinDrakeChaos = MobDrop.create('Chaos ', {
  [Rarity.Epic]: `Bolt`,
  [Rarity.Rare]: `Module`,
  [Rarity.Uncommon]: `Storage`,
}, {
  [Rarity.Epic]: `Comes from a now-inactive ancient Ruin Drake.\nAmong the lost ancient kingdoms, there was a group of people who were obsessed with the idea of mimesis. Be it the Hypostases" pure ordered elements or the ancient primitive power of the dragons, these people believed that they might all be replicated and modified to the point where they had surpassed their natural counterparts.\nBy this means, a superior and unsullied bodily form could replace the continuously decaying and shattering order.`,
  [Rarity.Rare]: `Comes from a now-inactive ancient Ruin Drake.\nThe dragons were once the most primitive and ancient bodily form of the supreme elements until they were defeated, conquered, or assimilated.`,
  [Rarity.Uncommon]: `Comes from a now-inactive ancient Ruin Drake.\nRuin Drakes can absorb Elemental Energy from the outside and store it in this component inside their "neck."`,
}, {
  prependName: true
});

export const PrimalConstructPrism = MobDrop.create('Prism', {
  [Rarity.Epic]: `Radiant`,
  [Rarity.Rare]: `Turbid`,
  [Rarity.Uncommon]: `Damaged`,
}, {
  [Rarity.Epic]: `An exquisite component obtained from defeating a Primal Construct.\nThe lord of the barren desert once had a dream, and once made a great many promises.\nThe legends of the desert say that these machines were originally vehicles for these unknown promises, which now live on only within their mechanical memory banks.`,
  [Rarity.Rare]: `An old component obtained from defeating a Primal Construct.\nIt is said that these machines are different from those ruin machines that come from deep within the desert, for they were not made as heralds of destruction or conquest.`,
  [Rarity.Uncommon]: `A damaged component obtained from defeating a Primal Construct.\nThese uniquely-shaped machines are the eternal sentinels of the desert ruins, and they possess the power to pierce the mountains and reshape rocks. The same principles that power many mysterious devices above and beneath the earth also power these machines.`,
});

export const Shell = MobDrop.create('Shell', {
  [Rarity.Epic]: `Marked`,
  [Rarity.Rare]: `Sturdy`,
  [Rarity.Uncommon]: `Desiccated`,
}, {
  [Rarity.Epic]: `The marked shell of a Consecrated Beast inscribed with ancient script.\nOn the pallid contours of the shell, the regrets of a time long past have been inlaid. One day, the bones of the beast will scatter like dust in the wind, and then, finally, may the exalted deceased greet their final rest...`,
  [Rarity.Rare]: `The sturdy shell of a Consecrated Beast.\nThe remains of a ruinous beast that once gnawed at the flesh of great, fallen beings. Even should the beasts sup a sliver of power from the gods of yesteryear, they too will greet the same end as said gods.`,
  [Rarity.Uncommon]: `The ruined shell of a Consecrated Beast.\nA tangible effigy to the grand calamity that devoured the lands of yore, usually only discovered in places few dare tread.`,
});

export const HilichurlFlower = MobDrop.create('<placeholder>', {
  [Rarity.Epic]: `Wanderer's Blooming Flower`,
  [Rarity.Rare]: `Treasured Flower`,
  [Rarity.Uncommon]: `A Flower Yet to Bloom`,
}, {
  [Rarity.Epic]: `A blooming wild flower that a Hilichurl Rogue treasured, bereft of any special qualities. The eternal outlander asks not for reward, but only to see their deeds come to fruition...`,
  [Rarity.Rare]: `A wild flower that a Hilichurl Rogue treasured, bereft of any special qualities.\nFlowers can be used as gifts or offerings to express one's feelings in many cultures.`,
  [Rarity.Uncommon]: `A wild flower that a Hilichurl Rogue treasured. It was plucked before it could bloom.\nThe hilichurl takes nothing with it in its sojourn across the wilderness save this flower.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity,
  )
});

export const TaintedWater = MobDrop.create('Tainted Water', {
  [Rarity.Epic]: `Newborn`,
  [Rarity.Rare]: `Scoop of`,
  [Rarity.Uncommon]: `Drop of`,
}, {
  [Rarity.Epic]: `A new life form that arose from the dispersed Tainted Hydro Phantasm. It is trapped inside a bottle.\nThe life contained within the waters is formless, and formless life is born of water and gains water's shape.`,
  [Rarity.Rare]: `Water obtained from a defeated Tainted Hydro Phantasm.\nThe life force in it has yet to ebb away.\nToday, with the Oceanids extirpated from Fontaine, strange elemental life forms that are far from elegant have appeared in the waters.`,
  [Rarity.Uncommon]: `A small drop of water obtained from a defeated Tainted Hydro Phantasm.\nThe life force in it has yet to ebb away.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    rarity === Rarity.Epic ? `${name.replace(' Water', '')} Hydro Phantasm` : name,
    description,
    undefined,
    rarity,
  )
});

export const BreacherCore = MobDrop.create('Core', {
  [Rarity.Epic]: `Alien Life`,
  [Rarity.Rare]: `Foreign Synapse`,
  [Rarity.Uncommon]: `Rift`,
}, {
  [Rarity.Epic]: `Breacher Primus' core.\nThere is no way to exterminate this life form. One reduced to nothing but its core will resurrect the next day or in decades.\nLuckily, it is neither aggressive nor intelligent, so Fontainians can just keep their distance.`,
  [Rarity.Rare]: `A shard left by Breacher Primus.\nThis strange life form originates in Elynas and inhabits the area.`,
  [Rarity.Uncommon]: `A shard left by Breacher Primus.\nIt bears no resemblance to any other known form of life in the world.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    rarity === Rarity.Rare ? name.replace('Core', '') : name,
    description,
    undefined,
    rarity,
  )
});

export const Operatives = MobDrop.create(`Operative's`, {
  [Rarity.Epic]: `Constancy`,
  [Rarity.Rare]: `Standard Pocket Watch`,
  [Rarity.Uncommon]: `Pocket Watch`,
}, {
  [Rarity.Epic]: `An accessory with a Delusion mounted on it. This is source of the Fatui Operative's power.\nThat said, taking it off would not detract from the fact that said Operative has physical abilities far beyond that of ordinary humans, forged through long years of training and combat experience. As for them, they are well-aware that they have sacrificed their past, present, and future upon the altar of the Fatui's ideal paradise, such that the damage they cause themselves on account of using a Delusion's power matters not at all.`,
  [Rarity.Rare]: `A standard-issue pocket watch given to Fatui Operatives.\nThe head of the watch is not well-designed, as the outer casing has way too many sharp angles, which can cause excessive wear and tear on clothes. As such, there will always be those who will stuff this watch into a more practical, less distinctive casing for use.`,
  [Rarity.Uncommon]: `A standard-issue pocket watch given to Fatui Operatives.\nThe erosion and oxidation on the casing serve as a loyal record of its owners' days spent as an instrument, enforcing the Fatui's will.`,
}, {
  prependName: true,
  onCreate: (name, description, rarity) => new MobDrop(
    rarity === Rarity.Uncommon ? `Old ${name}` : name,
    description,
    undefined,
    rarity,
  )
});

export const Fin = MobDrop.create('Fin', {
  [Rarity.Epic]: `Chasmlight`,
  [Rarity.Rare]: `Lunar`,
  [Rarity.Uncommon]: `Feathery`,
}, {
  [Rarity.Epic]: `An elegant fin taken from a defeated Xuanwen Beast's back.\nThe faint light it reflects contains traces of adeptal energy. In the still of the night, even the most violent beasts briefly sink into a peaceful slumber, reminiscing on times when dreams belonged not only to humans.`,
  [Rarity.Rare]: `A fin taken from a defeated Xuanwen Beast's back.\nThe soft, moonlight-esque glow on the fin gives off a sense of serenity.`,
  [Rarity.Uncommon]: `A fin fragment taken from a defeated Xuanwen Beast's back.\nEven though Xuanwen Beasts can't fly over long distances, these feather-like fins enable them to swiftly pursue their prey.`,
});

export const Hilt = MobDrop.create('Hilt', {
  [Rarity.Epic]: `Still-Smoldering`,
  [Rarity.Rare]: `Splintered`,
  [Rarity.Uncommon]: `Ruined`,
}, {
  [Rarity.Epic]: `A stone hilt obtained from an ancient statue.\nOnly the recentness of its separation from its owner may explain the as-yet unextinguished flame within.`,
  [Rarity.Rare]: `A stone hilt obtained from an ancient statue.\nThe chips and grooves speak to the brutal battles its owner once weathered.`,
  [Rarity.Uncommon]: `A stone hilt obtained from an ancient statue.\nIts luster has long been lost to the depredations of seawater.`,
});

export const WayobWill = MobDrop.create('Will', {
  [Rarity.Epic]: `Sigil of a Striding`,
  [Rarity.Rare]: `Locus of a Clear`,
  [Rarity.Uncommon]: `Shard of a Shattered`,
}, {
  [Rarity.Epic]: `An obsidian talisman that houses a Wayob Manifestation.\nIt consists of a jade idol figurine encased in obsidian. They say that in the past, people often used such figurines to attempt to communicate directly with the Wayob of the Night Kingdom.\nPerhaps this also explains why the Wayob can dwell within it and manifest itself in physical form.`,
  [Rarity.Rare]: `A jade idol that houses a Wayob Manifestation.\nYou can roughly make out the form of an idol figurine. It has a greater capacity for channeling the Wayob's will and power.`,
  [Rarity.Uncommon]: `A fragment that houses a Wayob Manifestation.\nIt is a broken shard of a shattered stone idol. Its capacity for channeling the Wayob's will and power is also extremely limited.`,
});

export const Ignited = MobDrop.create('Ignited', {
  [Rarity.Epic]: `Seeing Eye`,
  [Rarity.Rare]: `Seed of Life`,
  [Rarity.Uncommon]: `Stone`,
}, {
  [Rarity.Epic]: `A core retrieved from within the body of a defeated Avatar of Lava.\nIt emits a considerable heat.\nIt is said that once such a core has formed, left to itself, it will develop into a new Avatar of Lava.\nIn ancient times, it was once believed that all forms of life could be traced back to conflagration, and that in th spark of burning matter lay the origins of the soul and sentient wisdom. Perhaps the very existence of Avatars of Lava would bear out such a belief - or perhaps it was the emergence of this theory itself that explains how they came to inhabit the land of Natlan...`,
  [Rarity.Rare]: `A condensed pile of burning matter obtained from the body of a defeated Avatar of Lava.\nIt emits a slight heat.\nAttempting to stop a stone pile of this size from incessantly burning away would be a hard task indeed.\nIt is said that this is some primordial form of life.`,
  [Rarity.Uncommon]: `A shard obtained from the body of a defeated Avatar of Lava.\nThough it has been shattered to a great extent, on the inside, it still continues to burn. Perhaps this is a testament to the extraordinary vitality of phlogiston.`,
}, {
  prependName: true,
});

export const SecretSource = MobDrop.create('of the Secret Source', {
  [Rarity.Epic]: `Heart`,
  [Rarity.Rare]: `Sheath`,
  [Rarity.Uncommon]: `Axis`,
}, {
  [Rarity.Epic]: `Comes from a now-defunct Secret Source Automaton.\nIt appears to be an intact core by which the Secret Source\nAutomaton was powered, a strange device that seems to have been produced as a universal component. According to legend, the ingenious thinkers of antiquity drew upon the same wisdom used in the creation of golden patterns to design the blueprints by which these extraordinary machines functioned. Perhaps this core was one of them.`,
  [Rarity.Rare]: `Comes from a now-defunct Secret Source Automaton.\nIt appears to be the mechanism by which the Secret Source Automaton was powered, but its core is now empty.`,
  [Rarity.Uncommon]: `Comes from a now-defunct Secret Source Automaton.\nIt appears to be just a component that was used to connect two mechanisms.`,
});

export const AbyssalLeaf = MobDrop.create('<placeholder>', {
  [Rarity.Epic]: `Illusory Leafcoil`,
  [Rarity.Rare]: `Bewildering Broadleaf`,
  [Rarity.Uncommon]: `Refractive Bud`,
}, {
  [Rarity.Epic]: `A core formed from tightly coiled leaves, the remnant of the monster known as the Tenebrous Mimiflora after being vanquished.\nIt may appear lifeless and dull on the surface, yet a faint, ominous power can still be sensed pulsing within.\nPeople often wonder where the memories that such creatures drew from the earth go when they are slain. Perhaps the answer lies within this core...`,
  [Rarity.Rare]: `An arrow-shaped leaf dropped by the monster known as the Tenebrous Mimiflora after being vanquished.\nAfter corroding the Ley Lines and extracting the memories within, the creature grows these leaves as a means of storing the information it has deciphered. There may be a close link between these intricately patterned leaves and the forms that their host can mimic.`,
  [Rarity.Uncommon]: `A leaf bud dropped by the monster known as the Tenebrous Mimiflora after being vanquished.\nIt is said that when this creature emerged from the Black Tide, the first things it grew were these tender buds capable of deflecting elemental power.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity,
  )
});

export const WeaselShell = MobDrop.create('<placeholder>', {
  [Rarity.Epic]: `Blazing Prismshell`,
  [Rarity.Rare]: `Warm Back-Shell`,
  [Rarity.Uncommon]: `Cold-Cracked Shellshard`,
}, {
  [Rarity.Epic]: `A whole piece of radiant shell liberated from a Furnace Shell Mountain Weasel's back after its defeat.\nIt is said that the more Phlogiston a Furnace Shell Mountain Weasel has stored in its back, the higher its status in the pack. The reasoning for this phenomenon may be quite simple: More dominant Furnace Shell Mountain Weasels likely have less need to call on their Phlogiston reserves than their less prominent peers.`,
  [Rarity.Rare]: `A portion of shell removed from a Furnace Shell Mountain Weasel's back after its defeat.\nFurnace Shell Mountain Weasels accumulate Phlogiston in their shells from feeding to be used in emergencies. The sight of them blazing fiery trails over the Sacred Mountain has not been seen since ancient times.`,
  [Rarity.Uncommon]: `A chunk of shell carved from a Furnace Shell Mountain Weasel's back after its defeat.\nWhere it once blazed brightly, this piece has long since gone cold. The fire-like luster it once held is no more.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity,
  )
});

export const FrostnightsX = MobDrop.create(`Frostnight's`, {
  [Rarity.Epic]: `Glory`,
  [Rarity.Rare]: `Glow`,
  [Rarity.Uncommon]: `Glimmer`,
}, {
  [Rarity.Epic]: `A bone plate taken from the horned crown of a defeated Frostnight Scion.\nA warmth as glossy as moonlight envelopes it, radiating strongly even in the dead of winter nights.\nIn a sense, just like the Frostmoon Scions, this is the last thing these noble creatures stand by. The master they once served has been reduced to dust, yet their dreams still glow with golden splendor.`,
  [Rarity.Rare]: `A chunk taken from the horned crown of a defeated Frostnight Scion.\nIn the oldest sagas of the Frostmoon Scions, the glow of these noble creatures was described as the "unsullied mercy of the divine emissary" by the philosophers of the far north.\nThough this mercy could not prevent the fall of the Golden City or save her descendants from exile, the same glow still courses through their horned crowns, waiting for al dream that may never return.`,
  [Rarity.Uncommon]: `A fragment taken from the horned crown of a defeated Frostnight Scion.\nLegend has it that in the distant past, these noble creatures were servants to the Golden City, their eyes reflecting the holiest and brightest light of heaven. That light has long since been extinguished, but these scions that lost their master still roam beneath the frosty moon, keeping an oath that no one now remembers.`,
}, {
  prependName: true
});

export const Mistshroud = MobDrop.create('Mistshroud', {
  [Rarity.Epic]: `Helmet`,
  [Rarity.Rare]: `Plate`,
  [Rarity.Uncommon]: `Manifestation`,
}, {
  [Rarity.Epic]: `A helmet found in the mists of the Wild Hunt.\nPerhaps because the sullying presence from beyond this world has fed from the memories of the Ley Lines, its shape appears oddly similar to the relics of a lost kingdom.`,
  [Rarity.Rare]: `A plate found in the mists of the Wild Hunt.\nIt was part of the armor of a Wild Hunt monster, but for some reason, it did not disappear with the mist.`,
  [Rarity.Uncommon]: `A chunk found in the mists of the Wild Hunt.\nLike a snowflake forming from the air, it was created by the manifestation and solidification of dark power from another world.`,
}, {
  prependName: true,
});

export const RaidantBeastDrop = MobDrop.create('<placeholder>', {
  [Rarity.Epic]: `Radiant Exoskeleton`,
  [Rarity.Rare]: `Glowing Remains`,
  [Rarity.Uncommon]: `Lightless Bone`,
}, {
  [Rarity.Epic]: `A giant piece of bone that glows coldly, taken from the exterior of a glowing beast.\nThese beasts blessed by the ancient power of the moon are able to manipulate their exoskeletons through the light that has soaked into their marrow over long years.\nEven though their bones float apart from their bodies, they can still command them at will like any other physical part.`,
  [Rarity.Rare]: `A faintly glowing piece of bone taken from the exterior of a glowing beast.\nIt is the remains of an exoskeleton in which a vestige of the ancient power of the moon still lingers. It emanates a deep hue that still lingers long after being separated from its body, steeped as it is in the power of the moon.`,
  [Rarity.Uncommon]: `A dull piece of bone taken from the exterior of a glowing beast.\nIt is a fragment from the exoskeleton of a monster infused with the ancient power of the moon. Along with the vanished light, it has also lost the secrets once hidden within.`,
}, {
  onCreate: (name, description, rarity) => new MobDrop(
    name.replace('<placeholder>', '').trim(),
    description,
    undefined,
    rarity,
  )
});

export const XOfTheDeepShadow = MobDrop.create('of the Deep Shadow', {
  [Rarity.Epic]: `Hooked Beak`,
  [Rarity.Rare]: `Aberrant Core`,
  [Rarity.Uncommon]: `Fractured Eye`
}, {
  [Rarity.Epic]: `The remains of a fisher from beyond this world, left after its body dissolved.\nA birdlike, hook-shaped beak used by predators from beyond this world to store the biomass they seize.`,
  [Rarity.Rare]: `The remains fo a fisher from beyond this world, left after its body dissolved.\nA core whose functions have fully shut down, and its structure resembles no organ of any creature found on this earth.`,
  [Rarity.Uncommon]: `The remains of a fisher from beyond this world, left after its body dissolved.\nOnce its shell cracked, the malice housed within faded away as well.`
});