# Specification: RSVP Backend Integration and Admin Dashboard

## Overview
Move RSVP data from local storage to a shared database and provide a secure dashboard for the couple to track guest attendance and comments.

## Features
1. **Database Schema:** Define a table for RSVPs (name, attending, adults, kids, email, notes, timestamp).
2. **Backend Integration:** Connect RSVPForm to a database (Supabase) via Next.js Server Actions or API routes.
3. **Admin Dashboard:** Create a private /admin route.
4. **Data Visualization:** Show total attendance counts (adults vs children) and a sortable guest list.
5. **Security:** Implement a simple authentication layer (e.g., environment variable-based password or Supabase Auth) to protect the dashboard.
