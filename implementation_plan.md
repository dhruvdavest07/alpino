# Fix Alpino Web App Implementation Plan

## Problem Statement
The user has reported multiple issues with the `alpino` web app:
1. Cannot add items to cart or place orders.
2. Missing images on the dashboard.
3. Too many "John Doe" placeholders making it look like an AI-generated template.
4. UI needs an upgrade using the local `ui-ux-pro-max` skill.

## Proposed Changes
### 1. Fix Cart Functionality
- [CartDrawer](file:///c:/Users/Student/Desktop/alpino/src/components/CartDrawer.tsx#6-157) uses `fixed` positioning but gets trapped by GSAP transforms in [App.tsx](file:///c:/Users/Student/Desktop/alpino/src/App.tsx) via `mainRef`. I will wrap the [CartDrawer](file:///c:/Users/Student/Desktop/alpino/src/components/CartDrawer.tsx#6-157) return in `createPortal(..., document.body)` to break it out of the stacking context.

### 2. Remove "John Doe" Placeholders
#### [MODIFY] CheckoutModal.tsx
- Remove "John Doe" and "john@example.com" placeholders.
#### [MODIFY] App.tsx
- Remove "John Doe" and "john@example.com" placeholders in [FranchiseModal](file:///c:/Users/Student/Desktop/alpino/src/App.tsx#254-368).

### 3. Fix Missing Images in App.tsx
- `menu_wrap.jpg` is missing from `public/`. Replace with [/protein_wrap.png](file:///c:/Users/Student/Desktop/alpino/public/protein_wrap.png).
- `clean_salad.jpg` is missing from `public/`. Replace with [/pro_bowl.png](file:///c:/Users/Student/Desktop/alpino/public/pro_bowl.png) or [/sides_dips.png](file:///c:/Users/Student/Desktop/alpino/public/sides_dips.png).

### 4. UI/UX Overhaul
- Generate a design system using the provided Python script.
- Update [index.css](file:///c:/Users/Student/Desktop/alpino/src/index.css) and components to use the refined styling, typography, and color palettes.
- Add professional micro-interactions (e.g. `cursor-pointer`, hover feedback, correct svg usages).

## Verification Plan
### Automated Verification
- Read the codebase and verify the React implementation of Context providers.
### Manual UI Testing
- Use browser-based verification if needed to ensure the UI renders correctly and hovering/clicks work.
