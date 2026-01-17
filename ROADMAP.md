# Roadmap

This document is the single source of truth for all planned work on Threshold. Tasks are organized by version milestone.

---

## Critical — Before Any Release

These issues affect core functionality and must be fixed first.

- [ ] **First-run setup prompt** — App silently uses default body measurements (1.68m, 68kg) without prompting new users to configure. Results in inaccurate BAC for everyone who doesn't discover Settings.
- [ ] **Rename `eval` function** — Shadows JavaScript's built-in `eval()`. Rename to `evaluateBAC()` or similar.
- [ ] **Fix event handler accumulation** — Every `drawUI()` call adds a new swipe handler without removing the old one. Memory leak and erratic behavior.
- [ ] **Fix undeclared `localCounter`** — Missing `let` declaration creates implicit global variable.

---

## v0.11 — Bug Fixes & Stability

Focus: Fix remaining bugs and stabilize the codebase.

- [x] **Fix beverage menu display** — Removed conflicting `remove` callback that overwrote bevMenu with drawUI.
- [x] **Fix `setp` typo** — Changed to `step` so volume slider increments by 1ml.
- [ ] **Fix `g.clear(reset)` call** — `reset` is undefined; clarify intent with `g.clear(true)` or `g.clear()`.
- [ ] **Combine sequential storage writes** — Two consecutive `save()` calls should be one write operation.
- [ ] **Fix interval accumulation** — Track interval IDs globally and clear before creating new ones.
- [ ] **Load widgets once** — Move `Bangle.loadWidgets()` to app startup, not every `drawUI()` call.

---

## v0.12 — Discoverability

Focus: Help new users understand how to use the app.

- [ ] **Add swipe-up hint** — Draw visual indicator (chevron or text) at bottom of main screen.
- [ ] **Rename ".." button** — Change to `Set`, `Bev`, or gear icon for clarity.
- [ ] **Show current beverage on main screen** — Display "150ml · 4.5%" below drink counter.

---

## v0.13 — Error Recovery & Feedback

Focus: Let users fix mistakes and receive better feedback.

- [ ] **Add "−1" subtract option** — Allow removing a drink if added by mistake.
- [ ] **Haptic feedback at thresholds** — Vibrate when BAC crosses warning levels (0.04, 0.08, 0.16).

---

## v0.14 — Streamlined Flow

Focus: Make common actions faster.

- [ ] **Beverage presets** — Quick-select Beer/Wine/Spirit with preset volume/alcohol values.
- [ ] **Quick-add gesture** — Double-tap or swipe to repeat last drink without prompt.

---

## v1.0 — Official Release

Focus: Polish and submit to official Bangle.js App Loader.

- [ ] **Dynamic BAC decrease** — BAC should visually decrease over time as alcohol metabolizes.
- [ ] **Store BAC in threshold.json** — Avoid recalculating on every draw; enable persistence.
- [ ] **Add screenshots** — Create screenshots for App Loader listing.
- [ ] **Submit to official App Loader** — Create PR to espruino/BangleApps repository.

---

## Future Ideas (Unscheduled)

These are nice-to-have features for consideration after v1.0.

- [ ] **Unit system choice** — Let users choose metric or imperial for height, weight, volume.
- [ ] **Drink history/sessions** — Store timestamped records of drinks for later review.
- [ ] **Session model** — Explicit "start/end session" flow with session history.
- [ ] **In-app settings access** — Access user settings from within the app (not just system Settings).
- [ ] **Optimize storage reads** — Read `threshold.json` once and pass data to functions.
- [ ] **Define constants** — Use `DATA_FILE` constant instead of repeated `'threshold.json'` strings.
- [ ] **Define defaults constant** — Single `DEFAULTS` object instead of recreating inline each time.

---

## Version History

| Version | Status | Focus |
|---------|--------|-------|
| 0.10 | Released | Initial version on developer's fork |
| 0.11 | In Progress | Bug fixes & stability |
| 0.12 | Planned | Discoverability |
| 0.13 | Planned | Error recovery & feedback |
| 0.14 | Planned | Streamlined flow |
| 1.0 | Planned | Official release |
