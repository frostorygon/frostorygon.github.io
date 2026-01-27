
# Review of FrostOrygon Implementation Plan (v1)

> **To Claude**: Here is a critique of the initial plan. The visual ambition is great, but the architectural choices conflict with the performance goals.

## 🚨 Critical Architecture Flaws in V1

1.  **React Router v7 for a Single Page App?**
    *   **Critique**: You proposed React Router v7, which includes the Remix bridge and aggressive routing logic. For a pure "Scroll-to-Section" portfolio, this is completely unnecessary bloat. It overcomplicates state and adds 20KB+ to the bundle for zero user benefit.
    *   **Fix**: Usage of **Lenis** for smooth scrolling. Eliminate client-side routing entirely.

2.  **The "200KB vs Stunning" Paradox**
    *   **Critique**: You set a `< 200KB` bundle target but included **Framer Motion**, **Three.js** (implied by Aceternity Globe), **Particles**, and **Shimmer Effects**. This math does not compute. Framer Motion alone is ~30KB gzipped. A basic Three.js scene is 150KB+.
    *   **Fix**: We must admit the bundle will be larger, OR we must aggressively lazy-load every visual component. The plan needs a "Performance Strategy," not just a wish list.

3.  **Tailwind v4 Bleeding Edge**
    *   **Critique**: Tailwind v4 is excellent but it removes `tailwind.config.ts`. The plan references `tailwind.config.ts` in the file structure (Line 96), which shows a misunderstanding of v4's CSS-first architecture.
    *   **Fix**: Update configuration strategy to use `@theme` CSS blocks.

---

# FrostOrygon Portfolio - Implementation Plan (v2)

> **Motto**: *"Creation is the human experience"*

## 1. Overview & Objectives (Refined)
A high-performance, single-page application (SPA) portfolio. This v2 plan shifts focus from just "tech choices" to **execution** and **risk mitigation**, ensuring the "stunning visuals" don't destroy load times.

## 2. Tech Stack Strategy

| Technology | Purpose | Strategic Note |
|------------|---------|----------------|
| **Vite + React** | Core | Use `vite-plugin-pwa` later for caching. |
| **Tailwind CSS v4** | Styling | **Bleeding Edge**. We must use the CSS-first configuration (`@theme`). |
| **shadcn/ui** | UI Base | solid foundation, but strip valid unused styles to save bytes. |
| **Lenis** | Scrolling | **REPLACES React Router**. For a true single-page scroll experience, standard routing is unnecessary overhead. We will use interaction-based scrolling. |
| **Framer Motion** | Animation | **HEAVY**. Must use `LazyMotion` features to keep initial bundle light. |

> **[!NOTE] Architectural Pivot**
> We are **removing React Router v7** from the immediate core stack. A single-page portfolio should rely on smooth scroll anchors, not client-side routing, to maximize performance and simplify state.

## 3. ⚠️ Critical Risk Assessment

### The "200KB vs Stunning" Conflict
The original plan targeted `< 200KB` bundle size while requesting:
*   Framer Motion (~30KB)
*   Three.js / Aceternity Globe (~150KB+)
*   Particles / Shimmer Effects

**Risk**: The "Stunning" requirements will likely push bundle size > 500KB.
**Mitigation Strategy**:
1.  **Lazy Load Everything**: The "Hero" loads first. The "Globe" and "Projects" load *after* the user starts scrolling.
2.  **Code Splitting**: Isolate heavy animation libraries into separate chunks.
3.  **Asset Logic**: Use `avif` for images and CSS gradients instead of heavy image backgrounds where possible.

## 4. Phased Execution Roadmap

### Phase 1: The High-Performance Skeleton
*Goal: A 100/100 Lighthouse score "Hello World" with the design system in place.*
- [ ] Initialize Vite + React + TypeScript
- [ ] Install **Tailwind v4** (using new CSS-first config)
- [ ] Configure **Lenis** for smooth scrolling (sub-millisecond friction)
- [ ] Set up `shadcn/ui` with custom "Deep Dark" theme (`#0a0a0f`, `#00d9ff`)
- [ ] **Checkpoint**: Verify Tailwind v4 build and Lenis smoothness.

### Phase 2: Core Structure & Layout
*Goal: The functional application without heavy effects.*
- [ ] Build **Floating Dock** Navigation (shadcn/Aceternity hybrid)
- [ ] Implement **Hero Section** Layout (Text only, no heavy bg yet)
- [ ] Create **Bento Grid** Layout for Projects (CSS Grid v3)
- [ ] Build **Contact Section** footer
- [ ] **Checkpoint**: Verify responsive layout on Mobile vs Desktop.

### Phase 3: Visual Injection (The "Wow" Factor)
*Goal: Injecting the heavy visuals ONE BY ONE to monitor performance impact.*
- [ ] Add **Text Generate Effect** to Hero Motto.
- [ ] Implement **Aurora Background** (CSS-based preferably, or lightweight Canvas).
- [ ] Add **3D Pin/Card Effects** to Project Grid.
- [ ] **Conditional**: Add **Globe/Particles** only if performance budget permits.
    - *Constraint*: Must be lazy-loaded with `React.Suspense`.

### Phase 4: Polish & Optimization
*Goal: Hitting the < 1.5s FCP target.*
- [ ] Run `rollup-plugin-visualizer` to find bloat.
- [ ] Implement `framer-motion`'s `LoadFeatures` to reduce initial JS.
- [ ] Add SEO Meta Tags (OpenGraph, Twitter Cards).
- [ ] Final Deployment (Vercel/Netlify).

---

## 5. Visual Design System Specs

| Element | Specification |
|---------|---------------|
| **Background** | Deep dark `#0a0a0f` |
| **Primary Accent** | Cyan `#00d9ff` |
| **Secondary Accent** | Purple `#8b5cf6` |
| **Fonts** | Inter (UI) + JetBrains Mono (Code) |

## 6. Verification Plan
- **Automated**: `npm run build` -> `npx lighthouse-cli` check.
- **Manual**: Mobile scroll feel test (ensure no "scroll jail" with Lenis).
- **Visual**: "Squint Test" on Bento Grid hierarchy.
