# Implementation Plan: Stripe Payment Integration & Localization

## Phase 1: Setup & Backend [checkpoint: fc24967]
- [x] Task: Environment & Libraries (6b0fbd2)
    - [x] Install stripe and @stripe/stripe-js / @stripe/react-stripe-js
    - [x] Add Stripe API keys to .env.local
- [x] Task: Payment Intent Action (f8bd5f5)
    - [x] Create createPaymentIntent server action in actions.ts
- [x] Task: Conductor - User Manual Verification 'Phase 1: Setup & Backend' (Protocol in workflow.md) (fc24967)

## Phase 2: Localization & Region State
- [~] Task: Site Configuration Update
    - [ ] Refactor `site.config.ts` to support PT/BRL and ES/ARS content
- [ ] Task: Language Context
    - [ ] Create `LanguageContext` to manage selected region (BR vs AR)
- [ ] Task: Language Switcher
    - [ ] Add region/language toggle to `Navbar`
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Localization & Region State' (Protocol in workflow.md)

## Phase 3: Localized Payment UI
- [ ] Task: Localized Checkout
    - [ ] Update `GiftGrid.tsx` to show Stripe/Pix for BR and Manual Transfer for AR
- [ ] Task: Stripe Checkout Component
    - [ ] Create `CheckoutForm` component for secure card entry
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Localized Payment UI' (Protocol in workflow.md)

## Phase 4: Completion
- [ ] Task: Finalize Flow
    - [ ] Handle successful Stripe confirmation
    - [ ] Ensure guest messages are saved to database after any payment method
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Completion' (Protocol in workflow.md)
