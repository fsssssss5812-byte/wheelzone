# WheelHub – Car Showroom Website (React.js)

A responsive car showroom front-end featuring four brands: **Honda, Toyota, Suzuki and BMW** (3 models each).

## Features
- Home page with brand cards and featured cars
- Car listing with brand, body-type, search, price slider and sorting
- Car detail page with full specifications and related models
- **Registration** with validation (name, email, Pakistani phone, strong password, confirm password, terms)
- **Login** with validation, show/hide password and redirect back to the page you came from
- Protected pages: Test Drive booking and Saved Cars require login
- Save/unsave favourite cars
- Test-drive booking form with date and phone validation
- Fully responsive with mobile menu

## Changing car pictures
Every car is drawn as an SVG illustration by default. To use real photos, put
`car-1.jpg` ... `car-12.jpg` in `public/images/` (see the README.txt in that
folder). They replace the drawings everywhere automatically.

## Tech Stack
React 18, React Router 6, Context API, Vite, plain CSS

## Important note
Accounts are stored in the browser's localStorage for demonstration. A real
website would use a backend server and hashed passwords. Car prices are sample values.

## Run locally
```bash
npm install
npm run dev
```

## Deploy on Vercel
1. Push the project to a GitHub repository.
2. On vercel.com, sign in with GitHub, click **Add New → Project**, import the repo and **Deploy**.

`vercel.json` makes sure page refreshes on routes like `/cars` work.
