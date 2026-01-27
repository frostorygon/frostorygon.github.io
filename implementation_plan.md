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
