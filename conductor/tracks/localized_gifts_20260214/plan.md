# Implementation Plan: Advanced Localization and Dynamic Gift Registry

## Phase 1: Configuration Refactor [checkpoint: 6e62e91]
- [~] Task: Enhanced Site Config
    - [ ] Add 'en' region to site.config.ts
    - [ ] Refactor gifts structure to support per-region name, description, and price
- [x] Task: Language Context Update (6e62e91)
    - [ ] Update LanguageContext to support the 'en' key
- [x] Task: Conductor - User Manual Verification 'Phase 1: Configuration Refactor' (Protocol in workflow.md) (6e62e91)

## Phase 2: UI Localization [checkpoint: 2a0fe38]
- [x] Task: Navbar Switcher (2a0fe38)
    - [ ] Add 'EN' option to the region switcher
- [x] Task: Component Localization (2a0fe38)
    - [ ] Update Hero, Welcome, EventDetails, and RSVP components to use fully localized strings from config
- [x] Task: Conductor - User Manual Verification 'Phase 2: UI Localization' (Protocol in workflow.md) (2a0fe38)

## Phase 3: Dynamic Gift Registry
- [ ] Task: GiftGrid Localization
    - [ ] Update GiftGrid to render the centralized gifts based on the selected region's pricing and text
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Dynamic Gift Registry' (Protocol in workflow.md)
