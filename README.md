# ncut

A full-stack e-commerce store. The UI is a React port of the Horizon Shopify
Liquid theme (the original Liquid files are kept in
`shopify-theme-reference/` as the design reference only, with no Shopify dependency at runtime), backed by a Node.js /
Express / MongoDB API.

## Features

- Storefront: home, collections, product pages, search, cart, gift cards, blog and articles, contact form
- Accounts: register / login with JWT auth (bcrypt-hashed passwords)
- Orders API with Mongoose models for products, collections, orders, users and articles
- Seed script that loads sample products and collections

## Tech stack

- **Client:** React 18, Vite, React Router, Axios, React context for cart and auth
- **Server:** Node.js, Express 4, Mongoose 8, JSON Web Tokens, bcryptjs
- **Database:** MongoDB (Atlas or local)

## Structure

```
client/   React (Vite) frontend: pages, components, layouts, context, api
server/   Express API: routes, controllers, models, middleware, scripts/seed.js
shopify-theme-reference/   original Horizon Shopify theme (Liquid), kept as the design reference only
```

## Running locally

Needs Node 18+ and a MongoDB connection string.

```bash
npm run install:all
cp server/.env.example server/.env    # set MONGO_URI and JWT_SECRET
npm run seed --prefix server          # optional sample data
npm run dev                           # client (Vite) + API (http://localhost:5000)
```

Never commit `server/.env`; it is git-ignored.

## Known limitations

- The client's section-rendering helper calls `/api/sections/:id`, which the API does not implement yet.
- Payments are not integrated; the orders API stores orders only.

## License

MIT
