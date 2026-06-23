# 🎉 Danho's Genshin Tool v . 2.2.3 🎉


## Genshin Impact v. 6.6

## New Features
* Profile avatar: You can now change your profile avatar to whichever character you want, instead of being just limited to Lumine and Aether!
* Sortable lists! You can now sort any SearchableList by various properties including ascending, descending and priority order.
* Added "All Weapons" tab to character's Recommended Weapons section.

## Artifact Helper
* Added descriptions to each result tab explaining what it shows and how scores differ
* Renamed result tabs: "By Artifacts" → "By Stats", "By Character Recommendation" → "By Set"
* Added automatic cache eviction — history entries older than the configured number of days are pruned on load (default: 30 days)
* Increased Crit Rate/DMG Circlet main stat score — previously undervalued relative to its universal usefulness
* Increased Energy Recharge substat score for characters that don't specifically need it — ER benefits burst uptime broadly

## Settings
* Settings restructured into module-based tabs: **General** and **Artifact Helper**
* Added **Default landing page** setting — open the app directly to any section
* Added **Keep search history for** setting — choose how long history is retained (7 / 14 / 30 / 60 / 90 days, or Never)
* Clear cache moved from the Artifact Helper sidebar into Artifact Helper settings

## Updates
* Added "Off-field Damage" to Lauma
* Improved tier list drag-and-drop: items now position correctly when dragging between tiers

## Fixes
* Fixed 2-piece artifact group tooltip showing only one set when the second slot's representative was included via its 4-piece bonus rather than its 2-piece bonus
* Fixed Priority List drag-and-drop reverting reordering when new items were not yet in the saved priority list¨
* Fixed Flame-Forged Insight being counted as a "good weapon" for non-lunar reaction characters
