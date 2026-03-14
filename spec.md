# Zen Store

## Current State
Anime-inspired store with red/black theme, cinematic effects. Products are hardcoded in `FALLBACK_PRODUCTS` in `ProductsSection.tsx`. The backend already has full CRUD APIs: `addProduct`, `updateProduct`, `removeProduct`, `getAllProducts`. There is no admin UI.

## Requested Changes (Diff)

### Add
- Password-protected admin page at `/admin` route
- Admin login screen with a simple password gate (hardcoded password)
- Product list view: table of all products with edit/delete actions
- Add product form: name, price, category, description, imageUrl, stock, featured toggle
- Edit product form: pre-filled with existing product data
- Delete confirmation dialog
- Nav link or hidden route to `/admin`

### Modify
- `App.tsx`: add routing (react-router or simple state-based routing) to show admin page
- `Navbar.tsx`: add hidden `/admin` link in footer or small text link

### Remove
- Nothing

## Implementation Plan
1. Add simple client-side routing (hash-based or state) to switch between main site and admin page
2. Build `AdminPage.tsx` with password gate, product table, add/edit form, delete dialog
3. Wire to backend: `getAllProducts`, `addProduct`, `updateProduct`, `removeProduct`
4. Add a small discreet "Admin" link in the footer
