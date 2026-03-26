## UI Pro Max Search Results
**Domain:** ux | **Query:** animation scroll parallax micro-interactions
**Source:** ux-guidelines.csv | **Found:** 3 results

### Result 1
- **Category:** Accessibility
- **Issue:** Motion Sensitivity
- **Platform:** All
- **Description:** Parallax/Scroll-jacking causes nausea
- **Do:** Respect prefers-reduced-motion
- **Don't:** Force scroll effects
- **Code Example Good:** @media (prefers-reduced-motion)
- **Code Example Bad:** ScrollTrigger.create()
- **Severity:** High

### Result 2
- **Category:** Navigation
- **Issue:** Smooth Scroll
- **Platform:** Web
- **Description:** Anchor links should scroll smoothly to target section
- **Do:** Use scroll-behavior: smooth on html element
- **Don't:** Jump directly without transition
- **Code Example Good:** html { scroll-behavior: smooth; }
- **Code Example Bad:** <a href='#section'> without CSS
- **Severity:** High

### Result 3
- **Category:** Responsive
- **Issue:** Horizontal Scroll
- **Platform:** Web
- **Description:** Avoid horizontal scrolling
- **Do:** Ensure content fits viewport width
- **Don't:** Content wider than viewport
- **Code Example Good:** max-w-full overflow-x-hidden
- **Code Example Bad:** Horizontal scrollbar on mobile
- **Severity:** High

