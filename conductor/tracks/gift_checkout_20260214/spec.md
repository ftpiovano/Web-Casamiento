# Specification: Gift Registry Checkout Flow

## Overview
Transform the Gift List into a multi-step checkout experience. Guests can select multiple items, review their cart, add a personal message, and choose a payment method.

## Features
1. **Shopping Cart:** Enable adding multiple items to a session-based cart.
2. **"Meu Carrinho" View:** Replace the grid with a summary list when items are selected.
3. **Checkout Steps:**
    - **Step 1:** Gift Selection (Grid)
    - **Step 2:** Review Cart (List + "Add More" option)
    - **Step 3:** Gifter Info (Name + Note)
    - **Step 4:** Payment Selection (Pix, Bank Transfer, Credit Card)
4. **Interactive Transitions:** Smooth UI transitions between steps.
5. **State Management:** Manage cart items and checkout progress using React hooks.
