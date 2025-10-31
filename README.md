# Workscape - Explore Remote Work Destinations in India

Workscape helps remote workers discover great places to live and work across India. Browse destinations like Goa, Bengaluru, Udaipur, Rishikesh and more with details on internet speed, weather, approximate costs, coworking availability, and leisure activities.

## Features
- Explore curated Indian destinations with images and key metrics
- Powerful filter bar by internet speed, budget, State/UT, weather, coworking and leisure
- Destination details pages (cards link by id)
- Newsletter signup UI in the footer
- Fallback default destinations when Firestore is empty (uses images in `public/`)

## Tech Stack
- React + Typescript
- Tailwind CSS
- Firebase Firestore (client SDK)

## Project Structure
```
workscape/
├─ public/
│  ├─ goa.jpg, bangalore.jpg, udaipur.jpg, rishikesh.jpg, dharamshala.jpg, pondicherry.jpg
│  ├─ workscape-logo.jpg, favicon.ico, index.html, manifest.json, robots.txt
├─ src/
│  ├─ components/
│  │  ├─ Destinations.tsx, DestinationCard.tsx, FilterBar.tsx, Footer.tsx, Hero.tsx
│  │  ├─ *.css
│  ├─ pages/
│  │  ├─ Explore.tsx, Community.tsx, AboutUs.tsx
│  ├─ styles/Explore.css
│  ├─ assets/
│  │  └─ workscape-animation.json, bg-image.jpg
│  ├─ firebase.ts
│  ├─ App.tsx, index.tsx
```

## Data Model
Each destination document (Firestore) or default item implements:
```
{
  id: string,
  name: string,            // e.g. "Goa, Goa"
  image: string,           // e.g. "/goa.jpg" (from public/)
  internetSpeed: string,   // e.g. "70 Mbps"
  weather: string,         // e.g. "Tropical"
  cost: string,            // e.g. "800"
  description: string,
  hasCoworking?: boolean,
  hasLeisure?: boolean
}
```

## Setup
1. Install dependencies
```
npm install
```
2. Create Firebase config at `src/firebase.ts` (if not present):
```
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```
3. Add a `.env` (not committed) with your Firebase credentials:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

## Default Destinations Fallback
If Firestore has no `destination` documents, the app shows a built‑in set of Indian destinations using images from `public/`. When Firestore has data, it is merged with defaults and deduplicated by id/name, preferring Firestore.

To seed Firestore later, create a `destination` collection with docs matching the Data Model above. Ensure `name` follows "City, State" for State/UT filtering.

## Scripts
- Start dev server
```
npm start
```
- Test
```
npm test
```
- Build for production
```
npm run build
```

## Deployment
Any static host works (GitHub Pages, Netlify, Vercel). For GitHub Pages with CRA:
1. Add homepage to `package.json`: `"homepage": "https://<user>.github.io/<repo>"`
2. Install: `npm i -D gh-pages`
3. Add scripts:
```
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```
4. Deploy: `npm run deploy`

## Glimpse  

## Contributing
- Open an issue for bugs or feature requests.
- Create a PR with a short description and screenshots for UI changes.

## Author
- Kusum Kharayat
- Likedin - https://www.linkedin.com/in/kusumkharayat/


