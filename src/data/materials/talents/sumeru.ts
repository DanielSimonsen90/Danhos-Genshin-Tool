import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Admonition = TalentAscensionMaterial.create(
  'Admonition',
  `Admonition is the branches of the nation of wisdom. Admonition comes from a pure heart. Only sensible words of goodwill can express profound wisdom and free the sprout of knowledge from the shackles of arrogance.`,
  'Sumeru',
  MasteryDomains.SteepleOfIgnorance,
  'Monday/Thursday',
);

export const Ingenuity = TalentAscensionMaterial.create(
  'Ingenuity',
  `Ingenuity is the leaf-veins of the nation of wisdom. Ingenuity springs forth from benevolent consideration. They say that "a poisonous tree bears no kind fruit". Similarly, ingenious nascent ideas are always born from determined and benign minds, for only they are worthy bearers of wisdom.`,
  'Sumeru',
  MasteryDomains.SteepleOfIgnorance,
  'Tuesday/Friday',
);

export const Praxis = TalentAscensionMaterial.create(
  'Praxis',
  `Praxes are the roots of the nation of wisdom. Praxes stem from an unwavering will. All wisdom is manifested through the unyielding pursuit of goodness. Where goodness is not practiced, ingenuity and eloquence wither.`,
  'Sumeru',
  MasteryDomains.SteepleOfIgnorance,
  'Wednesday/Saturday',
);