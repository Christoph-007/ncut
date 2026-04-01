# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

Convert the **Horizon Shopify Liquid theme** into a full-stack e-commerce application:
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

The Liquid files serve as the **UI/design reference only** — no Shopify dependency in the final app.

## Project Structure (Target)

```
/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components (converted from snippets/ + blocks/)
│   │   ├── pages/           # Route-level components (converted from templates/)
│   │   ├── layouts/         # App shell, Header, Footer (converted from layout/)
│   │   ├── hooks/           # Custom React hooks (cart, auth, product fetch, etc.)
│   │   ├── context/         # React context (CartContext, AuthContext, ThemeContext)
│   │   ├── api/             # Axios/fetch wrappers for backend calls
│   │   └── assets/          # Static assets (CSS from assets/base.css, SVGs)
│   └── index.html
│
├── server/                  # Node.js + Express backend
│   ├── models/              # Mongoose schemas (Product, Order, User, Collection, Blog)
│   ├── routes/              # Express routers (products, cart, orders, auth, blog)
│   ├── controllers/         # Route handler logic
│   ├── middleware/          # Auth (JWT), error handling, validation
│   └── index.js             # Entry point
│
└── CLAUDE.md
```

## Development Commands

### Frontend (client/)
```bash
npm run dev        # Start Vite dev server (default: localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

### Backend (server/)
```bash
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start without auto-reload
```

### MongoDB
```bash
# Local: ensure mongod is running
mongod

# Or use MongoDB Atlas (cloud) — set MONGO_URI in .env
```

## Liquid → React Conversion Map

| Liquid (source) | React (target) |
|---|---|
| `layout/theme.liquid` | `layouts/RootLayout.jsx` |
| `sections/header.liquid` | `layouts/Header.jsx` |
| `sections/footer.liquid` | `layouts/Footer.jsx` |
| `templates/index.json` | `pages/HomePage.jsx` |
| `templates/product.json` | `pages/ProductPage.jsx` |
| `templates/collection.json` | `pages/CollectionPage.jsx` |
| `templates/cart.json` | `pages/CartPage.jsx` |
| `templates/blog.json` | `pages/BlogPage.jsx` |
| `templates/article.json` | `pages/ArticlePage.jsx` |
| `templates/search.json` | `pages/SearchPage.jsx` |
| `templates/page.contact.json` | `pages/ContactPage.jsx` |
| `snippets/*.liquid` | `components/*.jsx` |
| `blocks/*.liquid` | `components/*.jsx` |
| `{{ product.title }}` | `{product.title}` (from API) |
| `{% if %}` / `{% for %}` | JSX ternary / `.map()` |
| `assets/base.css` | Import directly into React |

## MongoDB Data Models

Mirror the Shopify data structures:

- **Product** — title, description, images, variants (price, sku, inventory), tags, collectionIds
- **Collection** — title, description, image, productIds
- **Order** — lineItems, customer, shippingAddress, status, totalPrice
- **User** — email, passwordHash, addresses, orderHistory
- **Blog / Article** — title, content, author, tags, publishedAt

## API Routes (Backend → Frontend)

```
GET    /api/products              # All products (with filters/pagination)
GET    /api/products/:id          # Single product
GET    /api/collections           # All collections
GET    /api/collections/:id       # Collection with its products
POST   /api/cart                  # Add to cart (session or DB)
GET    /api/cart                  # Get cart
POST   /api/orders                # Create order
POST   /api/auth/register         # Register user
POST   /api/auth/login            # Login, returns JWT
GET    /api/blog                  # Blog posts
GET    /api/blog/:slug            # Single article
GET    /api/search?q=             # Search products
```

## Conversion Approach

Work section by section, starting with layout and high-traffic pages:

1. **Layout shell** — `theme.liquid` → `RootLayout.jsx` (fonts, global CSS, router outlet)
2. **Header** — `sections/header.liquid` → `Header.jsx` (nav, cart icon, search)
3. **Footer** — `sections/footer.liquid` → `Footer.jsx`
4. **Homepage** — `templates/index.json` + referenced sections → `HomePage.jsx`
5. **Product page** — `sections/product-information.liquid` → `ProductPage.jsx`
6. **Collection page** — `sections/` + filters → `CollectionPage.jsx`
7. **Cart** — `sections/` → `CartPage.jsx` + `CartDrawer.jsx`
8. **Auth pages** — Register / Login (new, no Liquid equivalent)
9. **Blog** — `templates/blog.json` + `article.json` → `BlogPage.jsx` / `ArticlePage.jsx`

## Styling

Copy `assets/base.css` into the React project as the base stylesheet. CSS custom properties (color scheme variables from `snippets/theme-styles-variables.liquid`) should be moved to a `ThemeProvider` component or global CSS file. SVG icons in `assets/icon-*.svg` can be imported directly as React components.
