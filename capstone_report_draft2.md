# Alpino Protein Cafe: Capstone Project Draft 2
## Product Requirements Document (PRD)

### 1. Executive Summary
Alpino Protein Cafe is a web-based platform tailored for fitness enthusiasts and health-conscious consumers who refuse to compromise on nutrition. The goal of this application is to digitalize the ordering, franchise onboarding, and loyalty programs for the brand into a single, high-performance, and premium-feeling platform. This report details the technical, functional, and design requirements executed in Phase 2 of Capstone Development.

### 2. Problem Statement
The modern consumer lacks a streamlined way to order macro-counted, clean-nutrition fast food while simultaneously engaging with brand touchpoints such as expanding franchise opportunities and tracking loyalty rewards. Most restaurant websites are either purely static or lack the dynamic UI/UX requested by high-end demographics. There was an urgent need for an interaction-rich, zero-confusion frontend.

### 3. Target Audience
- **Fitness Enthusiasts:** Users tracking exact macronutrients (protein, calories) per meal.
- **Franchise Investors:** Business owners seeking lucrative Fast-Casual food opportunities (COCO/FOCO models).
- **Urban Professionals:** Users valuing rapid, secure online ordering and subscription-based health foods.

### 4. Technical Stack
- **Frontend Framework:** React 18, TypeScript, Vite
- **Styling & Animation:** Tailwind CSS, GSAP (ScrollTrigger)
- **Icons & UI:** Lucide-React, Glassmorphism components, CSS variable implementations
- **State Management:** React Context API (Cart functionality), LocalStorage persistence
- **Payment Gateway:** Razorpay (Simulated/Test Environment)

### 5. Core Features Implemented

#### 5.1 Dynamic Fuel Menu & Cart System
- **Macro-Visibility:** Each menu item card dynamically renders its respective Protein (g) and Calorie values.
- **Category Filtering & Search:** Real-time search by term and filtering logic by category tags (Wraps, Pro Bowls, Smoothies & Bowls, etc).
- **Cart Management:** Use of `CartContext` to add, update, and remove items dynamically.
- **Portal Rendering:** Complex fixed elements like the Menu Cart Drawer and Checkout Modals are rendered securely over the DOM via `createPortal`, avoiding graphical glitches with GSAP scroll containers.

#### 5.2 Responsive Premium UI/UX Design System
- Modern visual language adhering to high-end layout standards (glassmorphism overlay effects via `backdrop-blur-md`).
- Strict hover-state design logic utilizing stable `box-shadow` depth and transform translating rather than layout-breaking scale transitions.
- Fully mobile-responsive layouts emphasizing touch-friendly hit states and fluid typography scaling.
- Elimination of default placeholders ("John Doe") replaced with proper, realistic user-centric prompts ("Your Name", "you@email.com"). 

#### 5.3 Modals & Workflows
- **Franchise Application Workflow:** A lead-capture modal providing investment brackets (20-30L, 50L+) and business experience capturing. 
- **Checkout Payment Simulator:** A multiphase progression interface (Details -> Payment -> Processing). Integrates the Razorpay checkout UX standards, validating input before rendering payment windows.
- **Store Locator & Loyalty System:** Display of flagship stores alongside coming Q2/Q3 releases, and an explanation of the "FUDR" powered Alpino Club point system.

### 6. Design Approach & Tool Comparison

For this project phase (HCI), design evaluation was crucial.

| Tool | Pros | Cons | Usage in Capstone |
|------|------|------|------------------|
| **Figma** | Excellent for prototyping, vector logic, component sharing, and team collaboration. | Can suffer from performance lag on extremely large files; translating auto-layout to code requires skill. | Used for initial wireframing and interactive design flow mapping. |
| **Adobe XD** | Integration with Adobe Cloud; lightweight and fast for simple artboards. | Stagnant development; poorer community plugin ecosystem compared to Figma. | Not utilized heavily due to industry shift toward Figma. |
| **HTML/CSS/JS (Code)** | Represents the absolute source of truth. Allows pixel-perfect implementations and exact GSAP animation tuning. | Slower to iterate early concepts; requires technical knowledge. | Used as the final iteration and production environment via React/Tailwind. |

### 7. Future Roadmap (Phase 3)
1. Backend Database Integration via Supabase/Firebase for live state management.
2. Full Integration of the Razorpay production API for authentic monetary transactions.
3. Live GPS-based order tracking mimicking real-world delivery apps.
4. User Authentication pipeline for saving Favorite meals and persistent Loyalty points.
