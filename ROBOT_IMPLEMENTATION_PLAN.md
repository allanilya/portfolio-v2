# Robot Assistant Implementation Plan

## Overview
Transform the portfolio into a single-page scroll layout with an animated 3D robot that physically travels across the screen to repair randomly glitched text.

## Simplified Approach (Updated)

Based on user requirements, the implementation is streamlined:

1. **Simple Loading**: Basic loading screen (no complex intro animation)
2. **Character Replacement**: Wrong symbols replace correct letters (!, @, #, etc.)
3. **Drive-Over Repair**: Robot drives directly over broken letter, instantly fixes it
4. **Section Triggers**: One glitch per section when user scrolls in
5. **Idle Fidgeting**: Robot has subtle animations when not repairing
6. **No Complex Effects**: No blur, sparks, or dust clouds - just character swap

This approach is **simpler, more performant, and clearer** than the original complex plan.

---

## Architecture Overview

### Core Components

1. **RobotAssistant.tsx** (NEW)
   - Main robot component with spatial movement
   - Manages robot state machine
   - Handles 3D rendering and animations
   - Tracks absolute position on page (not viewport)

2. **useRobotController.ts** (NEW)
   - Custom hook managing robot behavior
   - State machine: `idle → navigating → repairing → staging → idle`
   - Glitch queue management (FIFO)
   - Scroll event handling

3. **useBreakableText.ts** (NEW)
   - Manages breakable text elements in DOM
   - Triggers random glitches on scroll/navigation
   - Tracks which words are broken/repaired

4. **page.tsx** (MODIFIED)
   - Convert to single-page scroll layout
   - Render all sections vertically
   - Integrate RobotAssistant
   - Remove section-switching logic

5. **NavigationHeader.tsx** (MODIFIED)
   - Change from section-switching to scroll-to-section
   - Trigger glitches on navigation click

6. **All Section Components** (MODIFIED)
   - Add `data-breakable` attributes to key words
   - Keep existing styles/layouts

---

## Implementation Details

### Phase 1: Page Structure Refactor

**File: app/page.tsx**

Changes:
- Remove `useRobotNavigation` hook
- Remove section switching logic
- Create scrollable container with all sections stacked
- Keep initial loading animation with RobotTextRepair
- Add `<RobotAssistant />` component after loading

```tsx
<div className="overflow-y-auto scroll-smooth">
  <section id="home"><HomeSection /></section>
  <section id="about"><AboutSection /></section>
  <section id="skills"><SkillsSection /></section>
  <section id="projects"><ProjectsSection /></section>
  <section id="certifications"><CertificationsSection /></section>
</div>
<RobotAssistant />
```

**File: components/NavigationHeader.tsx**

Changes:
- Remove section state tracking
- Change onClick to `scrollToSection(id)`
- Trigger glitch when clicking nav items
- Update interface to remove state-related props

---

### Phase 2: Breakable Text System

**File: lib/useBreakableText.ts**

Purpose: Track and manage breakable text elements

```typescript
interface BreakableElement {
  id: string;
  element: HTMLElement;
  isBreaking: boolean;
  isBroken: boolean;
  section: string;
}

export function useBreakableText() {
  const [breakableElements, setBreakableElements] = useState<BreakableElement[]>([]);
  const [currentBroken, setCurrentBroken] = useState<string | null>(null);

  // Scan DOM for [data-breakable] elements
  // Return methods: breakRandomInSection, repairElement, getAllBreakable
}
```

Key Features:
- Scans DOM for `[data-breakable]` attributes
- Tracks element positions using `getBoundingClientRect()`
- Only one broken element at a time
- Applies CSS classes for broken states

**Breakable Text Implementation:**
- Each `data-breakable` element stores correct text in `data-correct-text` attribute
- On glitch: Replace single character with wrong symbol (!, @, #, %, etc.)
- On repair: Robot drives over letter, character instantly reverts to correct one
- No complex CSS effects needed - just character replacement

---

### Phase 3: Robot State Machine

**File: lib/useRobotController.ts**

```typescript
type RobotState = 'idle' | 'navigating' | 'repairing';

interface RobotPosition {
  x: number; // absolute page X (not viewport)
  y: number; // absolute page Y (not viewport)
  rotation: number; // facing angle
}

interface GlitchTask {
  elementId: string;
  position: RobotPosition;
  sectionId: string;
}

export function useRobotController() {
  const [state, setState] = useState<RobotState>('idle');
  const [position, setPosition] = useState<RobotPosition>({ x: 0, y: 0, rotation: 0 });
  const [taskQueue, setTaskQueue] = useState<GlitchTask[]>([]);

  // Handle scroll events → trigger glitches
  // Process task queue → navigate → repair → stage
  // Calculate travel paths across page
}
```

**State Transitions:**

1. **idle**: Robot fidgets with subtle animations (head tilts, weight shifts)
2. **navigating**: Robot drives toward broken letter position
3. **repairing**: Robot drives directly over letter (instant character fix)
4. Back to **idle** (no staging needed)

**Movement Logic:**
- Calculate absolute page coordinates (not viewport)
- Use `framer-motion` for smooth movement
- Travel time based on distance (farther = longer)
- Add slight delay before starting movement (appears "busy")

---

### Phase 4: Robot Component

**File: components/RobotAssistant.tsx**

3D robot that moves across the page physically.

Key Features:
- Renders in fixed position but tracks absolute page coordinates
- Uses React Three Fiber for 3D model
- Converts absolute page position to viewport position
- Handles scroll offset adjustments
- Never teleports (always smooth transitions)

```tsx
export default function RobotAssistant() {
  const { state, position, targetElement } = useRobotController();
  const prefersReducedMotion = useReducedMotion();

  // Calculate viewport position from absolute page position
  const viewportPosition = {
    x: position.x,
    y: position.y - window.scrollY, // adjust for scroll
  };

  // Render 3D robot at viewport position
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        left: viewportPosition.x,
        top: viewportPosition.y,
        rotate: position.rotation,
      }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
      }}
    >
      <Canvas>
        <Robot3D state={state} />
      </Canvas>
    </motion.div>
  );
}
```

---

### Phase 5: Glitch Trigger System

**Triggers:**

1. **On Scroll into New Section**
   - Detect when user scrolls into new section
   - Wait 200-500ms (debounced)
   - Select random `data-breakable` element in that section
   - Add to task queue

2. **On Navigation Click**
   - User clicks nav header
   - Page scrolls to section
   - After scroll completes, trigger glitch in that section
   - Robot follows (appears delayed)

3. **Initial Page Load**
   - After loading animation, trigger first glitch in home section

**Glitch Queue Logic:**
- FIFO queue
- Only process one at a time
- If robot is busy, queue subsequent glitches
- Maximum queue size: 3 (prevent spam)

---

### Phase 6: Section Updates

**Update each section component:**

Files to modify:
- `components/sections/HomeSection.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/SkillsSection.tsx`
- `components/sections/ProjectsSection.tsx`
- `components/sections/CertificationsSection.tsx`

Add `data-breakable` to important words:

```tsx
<h1>
  <span data-breakable>Allan</span>{' '}
  <span data-breakable>Ilyasov</span>
</h1>

<p>
  I'm a <span data-breakable>Graduate Student</span> specializing in{' '}
  <span data-breakable>AI-powered applications</span>
</p>
```

**Selection Strategy:**
- 5-10 breakable elements per section
- Choose important/prominent words
- Avoid small words (and, the, a)
- Focus on titles, key phrases, tech terms

---

### Phase 7: Visual Effects

**Simplified Character Replacement:**

No complex CSS effects needed. The glitch is a simple character swap:

```typescript
// Random wrong symbols to use
const WRONG_SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '~', '?'];

// Break a letter
function breakLetter(element: HTMLElement) {
  const originalText = element.textContent;
  element.setAttribute('data-correct-text', originalText);

  // Pick random character to replace
  const randomIndex = Math.floor(Math.random() * originalText.length);
  const wrongSymbol = WRONG_SYMBOLS[Math.floor(Math.random() * WRONG_SYMBOLS.length)];

  const brokenText = originalText.substring(0, randomIndex) +
                     wrongSymbol +
                     originalText.substring(randomIndex + 1);

  element.textContent = brokenText;
  element.classList.add('broken');
}

// Repair letter (instant)
function repairLetter(element: HTMLElement) {
  const correctText = element.getAttribute('data-correct-text');
  element.textContent = correctText;
  element.classList.remove('broken');
}
```

**Optional: Subtle highlight for broken letters**
```css
[data-breakable].broken {
  color: #ef4444; /* red to indicate error */
}
```

---

### Phase 8: Accessibility & Performance

**Accessibility:**
- Respect `prefers-reduced-motion`
  - If enabled: disable robot system entirely
  - Text remains normal, no glitches
  - Navigation still works normally
- Ensure keyboard navigation unaffected
- ARIA labels for robot (if needed)

**Performance Optimizations:**
- Throttle scroll event listeners (100ms)
- Use `IntersectionObserver` for section detection
- Lazy load 3D model
- Limit particles/effects on mobile
- Use `requestAnimationFrame` for smooth animations

**Mobile Considerations:**
- Smaller robot size on mobile
- Reduce particle count
- Simpler animations (less CPU intensive)
- Touch-friendly (no hover effects)

---

## Edge Cases & Behaviors

### Multiple Glitches Triggered Quickly
**Solution:** Queue them in FIFO order, process one at a time

### User Scrolls While Robot Is Moving
**Solution:** Robot continues to target element, path adjusts dynamically

### Target Element Scrolls Out of View
**Solution:** Robot follows element's absolute position (even if offscreen)

### No Breakable Elements in Section
**Solution:** Skip glitch trigger, robot stays idle

### Fast Scrolling Through Multiple Sections
**Solution:** Debounce glitch triggers, max 1 glitch per 2 seconds

---

## File Structure Summary

```
New Files:
├── components/RobotAssistant.tsx          # Main robot component
├── lib/useRobotController.ts              # Robot state machine & logic
├── lib/useBreakableText.ts                # Breakable text management
└── styles/robot-effects.css               # Glitch animations (optional)

Modified Files:
├── app/page.tsx                           # Single-page scroll structure
├── components/NavigationHeader.tsx        # Scroll-based navigation
├── components/sections/HomeSection.tsx    # Add data-breakable
├── components/sections/AboutSection.tsx   # Add data-breakable
├── components/sections/SkillsSection.tsx  # Add data-breakable
├── components/sections/ProjectsSection.tsx    # Add data-breakable
└── components/sections/CertificationsSection.tsx  # Add data-breakable

Deprecated Files:
├── lib/useRobotNavigation.ts              # No longer needed
├── components/Robot.tsx                   # Replaced by RobotAssistant
└── components/RobotTextRepair.tsx         # Keep for initial loading only
```

---

## Implementation Order

1. **Phase 1**: Page structure refactor (scroll layout)
2. **Phase 2**: Add data-breakable attributes to sections
3. **Phase 3**: Build useBreakableText hook
4. **Phase 4**: Build useRobotController state machine
5. **Phase 5**: Create RobotAssistant component
6. **Phase 6**: Integrate glitch triggers
7. **Phase 7**: Add visual effects and polish
8. **Phase 8**: Test accessibility and performance

---

## Success Criteria Checklist

- ✅ Single-page scroll layout works smoothly
- ✅ Robot never teleports (only smooth movement)
- ✅ Robot always travels through screen space
- ✅ One broken word per interaction
- ✅ Robot drives directly over broken letter to repair it
- ✅ Glitch queue works correctly (FIFO)
- ✅ Scroll triggers glitches in new sections
- ✅ Navigation triggers glitches correctly
- ✅ Smooth performance on mobile
- ✅ Respects prefers-reduced-motion
- ✅ No layout jank
- ✅ Robot appears "busy" with intentional delays

---

## User Requirements (CONFIRMED)

1. **Loading Screen**: Simple loading screen (no complex RobotTextRepair intro)
2. **Glitch Trigger**: Every time user scrolls into new section
3. **Glitch Type**: Single wrong letter/symbol replaces correct letter
4. **Repair Method**: Robot drives directly over letter, instantly replaces with correct one
5. **Initial Entry**: Robot drives in from off-screen (left edge)
6. **Persistence**: Broken letters stay broken until robot repairs them
7. **Idle Animation**: Robot has subtle idle fidgeting (head tilts, blinks, weight shifts)

---

## Technical Considerations

### React Three Fiber Integration
- Robot needs to render in fixed position overlay
- Must handle scroll offset calculations
- Performance: limit to 30-60 FPS on mobile

### Framer Motion Integration
- Use for robot movement (`motion.div`)
- Spring animations for natural movement
- Layout animations for text effects

### DOM Position Tracking
- Use `getBoundingClientRect()` for element positions
- Convert viewport coords to absolute page coords
- Update on resize (debounced)

### State Management
- Robot state: local state in useRobotController
- Breakable elements: useBreakableText hook
- No global state needed (keep simple)

---

## Risks & Mitigations

**Risk: Performance issues on mobile**
- Mitigation: Reduce particles, simplify animations, throttle events

**Risk: Robot movement feels laggy**
- Mitigation: Use spring animations, optimize render cycle

**Risk: Glitches trigger too frequently**
- Mitigation: Debounce scroll events, limit queue size

**Risk: Text layout breaks with data-breakable spans**
- Mitigation: Use inline-block, test thoroughly

**Risk: Robot gets stuck or lost**
- Mitigation: Add fallback "return home" behavior after 10s idle

---

## Future Enhancements

### Phase 2 Features (Planned)
- **Interactive Glitches**: User taps/clicks anywhere on background → creates glitch at that location → robot rushes to fix it
  - Implementation: Add click handler to background
  - Find nearest `data-breakable` element to click location
  - Add to glitch queue
  - Robot prioritizes user-triggered glitches

### Later Enhancements (Optional)
- Multiple robot types (different behaviors)
- Robot personality variations (random idle behaviors)
- Achievement system (repair counter)
- Easter eggs (robot finds hidden items)
- Sound effects for repairs
