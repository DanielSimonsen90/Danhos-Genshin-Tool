import { DOMAIN_NAME } from "@/common/constants/domain";
import { FeatureIdea } from "../FeatureIdea";

export const Roadmap = () => (
  <section className="roadmap">
    <h2>Roadmap</h2>
    <p>
      <span>
        Throughout developing {DOMAIN_NAME}, I've been inspired to keep developing on the project and expand it further with more features out of the initial idea of a simple search machine.
      </span>
    </p>

    <section>
      <h3>These are the features I'm considering</h3>
      <ul>
        <FeatureIdea title="Character Priority List" version={2.0} features={[
          'Tierlist-like setup with character icons',
          '2 states: Recommended (Best Genshin characters tierlist) & Blank (Start from scratch)'
        ]} />
        <FeatureIdea title="Character Focus Day" version={2.1} features={[
          'What characters/items are farmable today (ascension materials for characters and weapons'
        ]} />
        <FeatureIdea title="Character Plan" version={2.2} features={[
          'Implement "forum-like" system',
          {
            'Filter by': [
              'Resin count: 0, 20, 30, 40+'
            ],
            'Sort focus day by priority': [
              'Personal character priority list (from 2.0)',
              {
                'Prioritize order': [
                  'Character Talent ascension item (weekly) - until 1/9/9 (unless different specified?)',
                  "Character Talent ascension item - until 1/9/9 (unless different specified?)",
                  "Weapon Talent ascension item - until lv. 90",
                  "Character ascension - until lv. 80 (optional lv. 90)",
                  "Character levelling - until lv. 80 (optional lv. 90)",
                  "Weapon levelling - until lv. 90",
                  "Regional item - until lv. 90 && 1/9/9",
                  "Artifacts - until all marked as perfect",
                ]
              }
            ]
          }
        ]} />
        <FeatureIdea title="Generator" version={2.3} features={[
          "Generate random teams",
          "Generate teams based on selected characters",
          "Generate your own character"
        ]} />
      </ul>
    </section>
  </section>
);