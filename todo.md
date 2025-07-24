## Initial Idea - Character Plan - v2.2
- Implement "forum-like" system into the program
- Sort focus day by priority:
  - Personal character priority list
  - Prioritise order:
     - Character Talent ascension item (weekly) - until 1/9/9
     - Character Talent ascension item - until 1/9/9
     - Weapon Talent ascension item - until lv. 90
     - Character ascension - until lv. 80
     - Character levelling - until lv. 80
     - Weapon levelling - until lv. 90
     - Artifacts - until all marked as perfect

### Forum-like System
- This should be the index page of /building/plan
- Renders a header - searchbar + "Add to plan" button
  - "Add to plan" button opens a modal with a SearchableCharacterList. 
    - Selecting a character will highlight it. Only one can be selected at a time. Submitting the modal continue the next step.
    - The user will need to specify the plan for the character. By default, the Genshin Tool will put values:
     - Character Talent ascension item (weekly): 1/1/1
     - Character Talent ascension item: 1/1/1
     - Weapon Talent ascension item: lv. 1
     - Character ascension: lv. 1
     - Character levelling: lv. 1
     - Weapon levelling: lv. 1
     - Artifacts: none/none/none/none/none
- Renders a list of link-wrapped characters in the plan. This is sorted by favorite > limited materials available today (talent & weapon ascension) > alphabetical > finished.

### A Character-Plan
A character plan is an extended model of Character, which will contain the following properties:
- level: CharacterLevel extends CharacterPlanProperty
  - ascension: number
- talents: CharacterTalents:
  - normal: CharacterTalent extends CharacterPlanProperty
  - skill: CharacterTalent -||-
  - burst: CharacterTalent -||-
- weapon: CharacterWeapon extends CharacterPlanProperty
  - weapon: Weapon
- isCompleted(): boolean // Check if all properties are completed

#### CharacterPlanProperty
- value: number
- plannedValue: number
- isCompleted(): boolean
- canAscend(): boolean // Check plan.level.value >= this.value? or something else?
- materials: Material[]