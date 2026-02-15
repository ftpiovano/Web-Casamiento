# Implementation Plan: Enhanced Event Interaction (Maps & Calendar)

## Phase 1: Configuration & Data
- [ ] Task: Update site.config.ts
    - [ ] Replace placeholders with real addresses and Google Maps links.
    - [ ] Add specific dateTime fields for each event (Argentina vs Brazil).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Configuration & Data' (Protocol in workflow.md)

## Phase 2: Functional UI
- [ ] Task: Refactor EventDetails
    - [ ] Update EventCard to pull location name, address, and mapLink from config.
- [ ] Task: Refine Calendar Generation
    - [ ] Ensure the .ics generator uses the specific event date and formatted location string.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Functional UI' (Protocol in workflow.md)
