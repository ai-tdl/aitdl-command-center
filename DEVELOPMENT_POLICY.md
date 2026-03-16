# AITDL Command Center: Development Policy & Architecture

This document defines the mandatory architectural standards, coding practices, and deployment workflows for the AITDL Command Center. All contributors (human or AI) must adhere to these rules.

---

## 🏛️ System Architecture

### 1. Frontend (GitHub)
- **Framework:** Next.js (Static Site Generation - SSG).
- **Hosting:** GitHub Pages.
- **Data Source:** Static data is baked in from `data/tools.json` during the build process.
- **Animations:** Custom high-performance CSS and JS-driven animations (e.g., WOW Hero, Binary Morph Logo).

### 2. Backend (Firebase)
- **Database:** Firebase Firestore.
- **Usage:** Dynamic data, user voting, real-time analytics, and persistent state management.
- **Sync:** Firestore data should be the source of truth for dynamic metrics (visitor counts, upvotes), while `tools.json` remains the source for directory listings.

---

## 🔄 Git Workflow & Deployment

The project follows a strict 3-tier synchronization pipeline. No direct commits to `main` are allowed.

1.  **`dev` Branch:** Active development, testing, and feature implementation.
2.  **`beta` Branch:** Staging and verification. Merged from `dev`.
3.  **`main` Branch:** Production / Live site. Merged from `beta`.

### Deployment Sequence:
```bash
git add .
git commit -m "prefix: description"
git push origin dev
git checkout beta && git merge dev && git push origin beta
git checkout main && git merge beta && git push origin main
git checkout dev
```

---

## 🎨 Design Philosophy
- **WOW Factor:** Every component must look premium and state-of-the-art.
- **Glassmorphism:** Heavy use of `backdrop-filter: blur()`, subtle borders, and low-opacity backgrounds.
- **Typography:** Modern sans-serif fonts (Outfit, Inter) with bold weights and letter-spacing.
- **Accent:** Saffron/Orange (`#FF6B35`) as the primary action color.

---

## 🛠️ Global Rules
- **No Placeholders:** All demo content must use generated assets or real data.
- **Dark Mode First:** Ensure all designs are compatible with white/midnight theme transitions using CSS variables.
- **Performance:** Avoid heavy libraries; favor vanilla CSS and optimized JS logic for animations.

---

## 💰 0.00 Cost Policy
The AITDL platform is built on the principle of **Zero Cost**.
- **Tool Listing:** Prioritize tools that are 100% free or have a generous "Free Forever" tier.
- **Infrastructure:** All hosting (GitHub Pages) and backend services (Firebase Spark Plan) must remain within the free-usage tiers.
- **Zero Dependencies:** Do not integrate any third-party APIs or services that require a subscription or credit card for core functionality.
- **Developer Rule:** Any new code or feature must be implemented using free resources only.

---

## 🌟 Unique Feature — vikramSamvat.js (DO NOT REMOVE)
`lib/vikramSamvat.js` is AITDL's most unique global differentiator — no other AI directory has this.
- **Never remove or refactor** without explicit owner approval.
- Always use `getVikramSamvatFull()` for any calendar/date features.
- Must be surfaced visibly in the UI (sidebar widget, header, or dedicated Panchang page).

---

## 🔐 aiBattle.ts Security Rule
- All AI Battle Cloud Function requests **must** verify Firebase Auth token before processing.
- Implement **rate limiting** (max 10 req/user/hour) to protect Firestore read quota.
- Keep `aiBattle.ts` out of the `Archive/` folder — it belongs in live `functions/`.

---

## 🎭 View Transition API
Add to `styles/globals.css` for smooth page transitions:
```css
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: 0.25s;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
```
