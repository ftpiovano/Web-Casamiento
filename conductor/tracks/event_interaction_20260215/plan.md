# Implementation Plan: Enhanced Event Interaction (Maps & Calendar)

## Phase 1: Configuration & Data [checkpoint: d9f9c5d]
- [~] Task: Update site.config.ts
    - [ ] Replace placeholders with real addresses and Google Maps links.
    - [ ] Add specific dateTime fields for each event (Argentina vs Brazil).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Configuration & Data' (Protocol in workflow.md) (d9f9c5d)

## Phase 2: Functional UI [checkpoint: 651f60a]
- [~] Task: Refactor EventDetails
    - [ ] Update EventCard to pull location name, address, and mapLink from config.
- [x] Task: Refine Calendar Generation (651f60a)
    - [ ] Ensure the .ics generator uses the specific event date and formatted location string.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Functional UI' (Protocol in workflow.md) (651f60a)
