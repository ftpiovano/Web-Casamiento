# Initial Concept
Hey, I am making a site for my wedding, but I want to do it with you. The current site I made is this one: https://noivos.casar.com/alexita-y-chico
However, I would like to now do it from scratch with you. Copy the key parts and features of this site. Also, take a look to the bellow description as a guide:
Goal: recreate the visual style and general layout of a Casar.com-like wedding couple page (single-page landing) with a clean, elegant, airy aesthetic. Do NOT copy any original text or images: use placeholders and make everything easy to edit later.

Stack: Next.js + React + Tailwind (recommended)

Design requirements (design system):
- Neutral palette: warm off-white background (approx #faf8f5), charcoal text (#222), soft accent tones (sand/beige) and ONE primary color that is easily configurable.
- Typography: serif for headings (e.g., “Playfair Display” or similar), sans for body (e.g., “Inter”). Load via Google Fonts.
- Generous spacing: large vertical padding per section; centered content with max-width ~960–1100px.
- Visual style: subtle dividers, soft rounded corners, very light shadows on cards, rounded buttons.
- Subtle motion: gentle fade/slide-in on scroll (IntersectionObserver), small hover transitions on links/buttons.

Page structure (single-page with anchor navigation):
1) Sticky navbar
2) Hero (Home)
3) Welcome text
4) Countdown
5) “The Couple” section
6) “Our Story” section
7) Ceremony and 8) Reception sections
9) Gift list
10) RSVP section
11) Messages / Guestbook

Engineering / maintainability:
- Create a single `site.config.(ts|js)` file.
- Reusable components: Section, Card, Button, Nav, Countdown, Gallery, RSVPForm, GiftGrid, Guestbook.
- Accessibility: contrast, focus states, proper labels, keyboard navigation.
- Performance: responsive images, lazy-loading.


# Product Definition

## Vision
To create a clean, elegant, and airy single-page wedding website that serves as a central hub for guests to find event details, RSVP, explore the couple's story, and contribute to a gift registry. The design will mimic the sophisticated aesthetic of high-end wedding platforms like Casar.com while remaining fully customizable and easy to maintain.

## Target Audience
- **Wedding Guests:** The primary users who need access to logistical information, RSVP forms, and the gift registry.
- **The Couple:** To have a beautiful, digital memento of their special day and a streamlined way to manage guest interactions.

## Core Goals
- **Information Hub:** Provide clear details on the weddings in Argentina and Brasil (locations, times, maps).
- **Communication:** Facilitate RSVPs and guestbook messages directly through the site.
- **Gift Management:** Offer an intuitive, card-based gift registry for guest contributions.
- **Storytelling:** Share the couple's journey through text and images in an engaging way.

## Key Features
- **Bilingual Support:** UX designed for two languages (Portuguese and Spanish).
- **Two-Event Structure:** Dedicated sections for the Argentinian (Civil) and Brazilian (Religious) celebrations.
- **Interactive RSVP:** A multi-field form with real-time database persistence and an admin tracking dashboard.
- **Dynamic Countdown:** A live timer counting down to the big day.
- **Interactive Gift Registry:** A multi-step checkout flow (Cart, Gifter Info, Payment selection) allowing guests to select multiple items, add personal messages, and choose from various payment methods (Pix, Bank Transfer, Credit Card).
- **Sticky Navigation:** Smooth-scrolling anchor links for easy section access.
- **Responsive Design:** A seamless experience across mobile and desktop.
