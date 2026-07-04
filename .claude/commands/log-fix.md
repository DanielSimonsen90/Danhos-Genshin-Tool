Add a bug fix entry to change-log.md. Ask the user to confirm the exact sentence before writing it.

Steps:
1. Propose a concise one-liner for the fix (e.g. "Fixed X causing Y"). If the user provided a sentence in $ARGUMENTS, use that instead.
2. Ask: "Add this to the Fixes section of change-log.md? [sentence]"
3. Only write to change-log.md after the user confirms.
4. Insert the entry as a new bullet under the `## Fixes` section of change-log.md (create the section if it doesn't exist).
