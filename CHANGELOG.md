# Changelog

All notable changes to Threshold will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Beverage menu now displays correctly (removed conflicting `remove` callback)
- Volume slider now steps by 1ml (`setp` → `step` typo fix)
- Renamed `eval` function to `warn` to avoid shadowing JavaScript built-in

### Added
- `.gitignore` to exclude local development files

---

## [0.10] - 2023-xx-xx

*Initial version uploaded to developer's App Loader fork.*

### Features
- Drink counter with glass icon
- BAC estimation using Widmark/Nadler formulas
- Sober time prediction
- Beverage configuration (volume, alcohol %)
- Color-coded BAC warnings (green → yellow → red)
- Settings integration for user attributes (bio sex, height, weight)

---

<!-- 
Version History Notes:
- [Unreleased] collects changes for the next version
- Move [Unreleased] items to a new version section when releasing
- Version numbers: MAJOR.MINOR (e.g., 0.11, 0.12, 1.0)
-->
