
# Mini Promotions Dashboard

This project is a **mini promotions dashboard** built with **Angular** and **React (Vite)**, using a **local JSON Server** as a mock backend. It demonstrates listing promotions, filtering, and opt-in/opt-out functionality.

---

## Project Structure

```
root/
│
├─ db/                  # JSON Server database folder
│   └─ db.json          # Example promotions data
│
├─ angular-app/          # Angular app folder
│   ├─ src/
│   ├─ angular.json
│   └─ ...
│
├─ react-app/            # React app (Vite) folder
│   ├─ src/
│   ├─ vite.config.ts
│   └─ ...
└─ README.md
```

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)
- Vite (comes with React template)

---

## Setup

### 1. Start JSON Server

This serves the promotions data for both apps.

```bash
cd db
npm install
npx json-server --watch db.json --port 3000
```

- JSON Server will be available at: `http://localhost:3000`
- Promotion endpoint: `http://localhost:3000/promotions`

---

### 2. Angular App

```bash
cd angular-app
npm install
ng serve -o
```

- Opens in browser @: `http://localhost:4200`
- Features:
  - Header/Footer with Bootstrap
  - Promotions list with filters
  - Opt-in/opt-out functionality (stored in Local Storage)
  - Category pages with dynamic filtering
  - Material UI components (cards, switches, etc.)
  - Unit tests for promo card rendering (Jasmine/Karma)
  
---

### 3. React App (Vite)

```bash
cd react-app
npm install
npm run dev
```

- Open browser to: `http://localhost:5173` (or displayed port)
- Features:
  - Header/Footer with Bootstrap + FontAwesome
  - Promotions list with filters
  - Opt-in/opt-out functionality (stored in Local Storage)
  - Category pages with dynamic routing
  - Material UI components for cards, switches, etc.
  - Unit tests for home page and promo card rendering (Vitest)

---

## Environment Configuration

Both apps use environment-based API URLs:

- **Angular:** `src/environments/environment.ts`  
- **React (Vite):** `.env` file  
  ```env
  VITE_API_URL=http://localhost:3000/promotions
  ```

---

## Testing
- Unit Tests:
  - Angular: Minimal tests cover PromoCardComponent (display of title, category, status) and PromotionsService (API calls). Written with Jasmine/Karma.
  - React: Minimal tests cover Home (loading, filters, list display) and PromotionCard (rendering). Written with Vitest/@testing-library/react.
  - Note: Due to time constraints, tests focus on display and API success cases. In a full project, I’d expand to include filter logic, opt-in/out interactions, error handling, and responsive design tests.


- Run Tests:
  - Angular: cd angular-app && ng test
  - React: cd react-app && npm run test

---
## Notes

- Opt-in/Opt-out is **handled locally** in Local Storage. JSON Server is **read-only** in this setup.
- Angular and React apps can share the same JSON Server.
- Bootstrap is used for **grid layout, header, and footer**.
- Material UI components are used for **cards, switches, and filters**.

---

## Recommended Workflow

1. Start JSON Server
2. Run Angular app (`ng serve`)
3. Run React app (`npm run dev`)  
4. Open the apps in separate browser tabs to test features independently.

---


