# Roadmap

This document tracks planned work for Threshold. Tasks are organized by version milestone. For completed work, see [CHANGELOG.md](CHANGELOG.md).

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
- [ ] **In-app settings access** — Access user settings from within the app.
- [ ] **Optimize storage reads** — Read `threshold.json` once and pass data to functions.
- [ ] **Define constants** — Use `DATA_FILE` constant instead of repeated strings.
- [ ] **Define defaults constant** — Single `DEFAULTS` object instead of recreating inline.

---

## Version History

| Version | Status | Focus |
|---------|--------|-------|
| 0.10 | Released | Initial version on developer's fork |
| 0.11 | Released | Critical fixes & first-run setup |
| 0.12 | Released | Bug fixes, stability & discoverability |
| 0.13 | Next | Error recovery & feedback |
| 0.14 | Planned | Streamlined flow |
| 1.0 | Planned | Official release |
