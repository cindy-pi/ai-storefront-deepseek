# Fizban's Wands

A fantasy-themed e-commerce static site built with React and Vite, deployable to GitHub Pages. Browse enchanted wands, add them to your cart, and purchase with gold piece credits — all from the magical shelves of Fizban the Fabulous.

## Live Demo

The live site is deployed to GitHub Pages:

```
https://cindy-pi.github.io/ai-storefront-deepseek/
```

## About the Shop

**Fizban's Wand Emporium** offers 39 finely crafted wands across three alignments — Good, Neutral, and Evil. Each wand comes with unique magical properties, a description steeped in fantasy lore, and a price in gold pieces (gp). The shop is run by the eccentric wizard Fizban the Fabulous, who personally enchants each wand and dispatches orders via dragon courier.

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

Output goes to `dist/`. Preview locally with:

```bash
npm run preview
```

## Seed Data

All wand data lives in `src/data/wands.js`. It exports an array of 39 wand objects and an `alignments` array (`["good", "neutral", "evil"]`).

| Alignment | Count | Price Range |
|-----------|-------|-------------|
| Good      | 13    | 170–310 gp  |
| Neutral   | 13    | 175–300 gp  |
| Evil      | 13    | 240–360 gp  |

To add more wands, append an object to the `wands` array with these fields:

```js
{
  id: 40,
  name: "Wand Name",
  alignment: "good",        // "good", "neutral", or "evil"
  description: "A short flavour description.",
  price: 250,               // gold pieces
  imageUrl: null,           // set to a URL for a custom image
  magicalProperties: ["Property 1", "Property 2"],
  rarity: "rare"            // "common", "uncommon", "rare", or "legendary"
}
```

## Customer Credits

Every new shopper starts with **1,000 gold pieces (gp)**. The balance is persisted in `localStorage` — refreshing the page or closing the browser does not reset it.

To reset your balance (and clear purchase history and cart), run this in the browser console:

```js
localStorage.removeItem('fizban_customer');
localStorage.removeItem('fizban_cart');
window.location.reload();
```

## Checkout

The checkout flow works in four steps:

1. Review your order summary (items, quantities, line totals)
2. Enter your name and magical delivery address
3. Confirm the purchase — the total is deducted from your gold balance
4. Redirected to the confirmation page with a magical delivery receipt

If your cart total exceeds your current gold balance, the purchase is blocked and an "Insufficient gold" message is displayed.

## Simulated Email Receipt

After a successful purchase, the confirmation page displays a **Magical Delivery Receipt** styled like a parchment scroll with a wax seal. It includes:

- **Order ID** — a hex identifier (e.g. `A3F2C1`)
- **Customer name** and **delivery address**
- **Order date** — formatted with full month, day, year, and time
- **Itemized list** — each wand with a coloured SVG icon, quantity, unit price, and line total
- **Order total** and **remaining gold balance**
- **Personalised message** from Fizban — one of several randomised flavour quotes
- **Delivery ETA** — "Your wands will arrive via magical courier within 3-7 astral days"

The receipt can be printed or saved as PDF using the 📜 Save Receipt button (triggers `window.print()`).

## Deploying to GitHub Pages

This project uses a GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic deployment:

1. Push to the `main` branch
2. The workflow installs dependencies with `npm ci`, builds with `npm run build`, and uploads the `dist/` directory as a Pages artifact
3. A second job deploys the artifact to GitHub Pages

### GitHub Repository Settings

Before deployment works, ensure your repository settings are configured:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not a branch)
3. No further configuration is needed — the workflow handles everything

## Tech Stack

- **React 18** with HashRouter (required for GitHub Pages SPA support)
- **Vite 5** for build tooling
- **GitHub Actions** for CI/CD deploy to Pages

## Project Structure

```
src/
├── main.jsx                   # Entry point with HashRouter and providers
├── App.jsx                    # Routes and page components
├── index.css                  # Global styles and design system
├── components/
│   ├── Navbar.jsx             # Navigation with cart count and gold balance
│   ├── Navbar.css
│   ├── WandCard.jsx           # Wand catalog card with image, badges, price
│   └── WandDetailModal.jsx    # Wand detail modal with add-to-cart
├── context/
│   ├── ShopContext.jsx        # Unified shop state (cart + customer)
│   ├── CartContext.jsx        # Cart state with localStorage persistence
│   └── CustomerContext.jsx    # Customer state (gold, purchases, orders)
├── data/
│   └── wands.js              # 39 wands across Good/Neutral/Evil
└── pages/
    ├── HomePage.jsx           # Hero section and featured legendary wands
    ├── CatalogPage.jsx        # Full catalog with alignment filter
    ├── CartPage.jsx           # Shopping cart with quantity controls
    ├── CheckoutPage.jsx       # Delivery form and payment summary
    ├── ConfirmationPage.jsx   # Magical delivery receipt
    └── NotFoundPage.jsx       # 404 fallback with auto-redirect
```
