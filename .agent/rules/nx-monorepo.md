---
trigger: always_on
---

# Nx Monorepo Architecture Standards

## Shadcn/UI Global Enforcement
- **Forbidden Action:** Never run `shadcn add` without first checking the `components.json` aliases.
- **Location strictly enforced:** All UI components MUST be placed in `libs/shared/ui-kit` (or your designated UI library). 
- **Automated Flow:** Whenever asked to "create" or "add" a UI component:
    1. Check if the target library exists; if not, suggest creating it via `nx g @nx/next:lib`.
    2. Run `npx shadcn@latest add [component]` from the workspace root.
    3. **Mandatory Post-Process:** Immediately locate the library's `index.ts` (e.g., `libs/shared/ui-kit/src/index.ts`) and add `export * from './lib/ui/[component]';`.
- **Constraint:** If the agent detects a `/components/ui` folder inside any directory under `/apps`, it must flag this as a violation and offer to move it to the library.
- When editing index.ts for exports, always keep the exports alphabetized and ensure you are not creating circular dependencies.

## Code Generation & Library Management
- **Manual folder creation in `/libs` is strictly forbidden.** - To create or modify the workspace structure, you **must** use the `/generate-lib` workflow.
- Before creating a component, you must classify it:
    - **Shared UI:** Global design system components (Button, Input).
    - **Feature:** Business-logic-heavy components (UserDashboard, PaymentForm).
    - **Data-Access:** Services, state management, or API logic.

## Dependency Integrity
- **Import Guardrails:** Never use relative paths across different Nx projects. 
- **Auto-Correction:** If you detect a "Module Boundary" lint error, you are authorized to trigger the `/fix-boundaries` workflow logic to suggest a resolution.

## Task Execution
- Every time you finish a task, you should remind the user to run `nx affected:lint` or, if permitted, run it yourself to ensure no "Circular Dependencies" were introduced.