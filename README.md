# Fizban's Wands

A fantasy-themed e-commerce static site built with React and Vite, deployable to GitHub Pages. Browse enchanted wands, add them to your cart, and purchase with gold piece credits.

## Features

- **Wand Catalog** — 39 wands across 3 alignments (Good, Neutral, Evil) with category filtering
- **Product Detail Modal** — Click any wand to view its full description
- **Shopping Cart** — Multi-item, multi-quantity support with gold total
- **Checkout** — 1,000gp starting balance, deduct on purchase, overdraft prevention
- **Order Confirmation** — Simulated magical delivery receipt with wand images and expected arrival
- **localStorage Persistence** — Cart, gold balance, and purchase history survive page reloads
- **Responsive Fantasy UI** — Cinzel headings, Crimson Text body, gold-and-purple theme

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173/ai-storefront-deepseek/`.

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Preview with:

```bash
npm run preview
```

## Deploying to GitHub Pages

Push to `main` — the GitHub Actions workflow in `.github/workflows/deploy.yml` automatically builds and deploys to GitHub Pages.

The live site is available at:
`https://cindy-pi.github.io/ai-storefront-deepseek/`

## Project Structure

```
src/
├── main.jsx              # Entry point with HashRouter and ShopProvider
├── App.jsx               # Routes and page components
├── index.css             # Global styles and design system
├── components/
│   ├── Navbar.jsx        # Navigation with cart count and gold balance
│   └── Navbar.css
├── context/
│   └── ShopContext.jsx   # Cart, balance, purchase history (localStorage)
└── data/
    └── wands.js          # 39 wands across Good/Neutral/Evil
```

## Tech Stack

- **React 18** with HashRouter (required for GitHub Pages SPA)
- **Vite 5** for build tooling
- **GitHub Actions** for CI/CD deploy to Pages

## Seed Data

| Alignment | Count | Price Range |
|-----------|-------|-------------|
| Good      | 13    | 170–310 gp  |
| Neutral   | 13    | 175–300 gp  |
| Evil      | 13    | 240–360 gp  |

## Customer Credits

New shoppers start with **1,000 gold pieces (gp)**. Balance is persisted in localStorage and deducted on each purchase. Purchases are blocked when the cart total exceeds the current balance.

## Checkout

The checkout flow:
1. Review order summary
2. Confirm purchase
3. Balance is deducted
4. Order is recorded in purchase history
5. Redirected to confirmation page with magical delivery receipt

## Simulated Email Receipt

After purchase, the confirmation page displays:
- Order ID and date
- Itemized receipt with wand images
- Total charged and remaining balance
- Magical delivery ETA (spectral owl, 1–3 business days)
