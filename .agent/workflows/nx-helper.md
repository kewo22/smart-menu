---
description: Nx Helper Workflow 
---

# Nx Helper Workflow

## Trigger: /generate-lib
**Description:** Automates the creation of a new Nx library with proper standards.
**Steps:**
1. Prompt the user for the **Library Name** and **Category** (ui, feature, data-access, or util).
2. Execute: `nx g @nx/next:lib libs/{{category}}/{{name}} --directory=libs/{{category}}/{{name}}`
3. Automatically update the `README.md` in the new library with a brief description.

---

## Trigger: /fix-boundaries
**Description:** Analyzes and fixes Nx module boundary violations (lint errors).
**Steps:**
1. Run `nx affected:lint` to identify dependency violations.
2. For each violation, analyze if the import should be moved to a `shared` lib or if a new `tag` is needed in `project.json`.
3. Propose a refactor plan to the user before applying changes.