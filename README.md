# Pi Marketplace Frontend 🟣🟡
_Next.js app for Pi Marketplace (Pi Hackathon 2025)_

## 🚀 Overview
Pi Marketplace is a **hyperlocal buy/sell platform** for the **Pi Network**.  
This is the **frontend app** that consumes the [backend API](https://your-railway-backend-url.up.railway.app).  

It allows judges and users to:
- Browse local listings
- Buy items with Pi (mock payments at midpoint)
- Log in as **Buyer** or **Seller** (mock Pi authentication)
- Track orders (buyers) and manage sales (sellers)
- View Pioneer profile

---

## ✨ Features
- **Listings grid** with categories and locations
- **Listing detail page**
- **Buy Now button** → mock Pi payment flow
- **Orders page** (buyers)
- **Sales page** (sellers)
- **Login / Logout flow** (mock Pi Auth)
- **Branded UI** (purple + gold Pi theme, logo, favicon)

---

## 🛠 Tech Stack
- Next.js 15 (App Router)
- TailwindCSS
- Context API for mock login state
- Deployed on **Vercel**
- Backend: Express + PostgreSQL (on Railway)

---

## 🔗 Demo Links
- **Frontend (Vercel)** → [Live App](https://your-vercel-url.vercel.app)  
- **Backend API (Railway)** → [Listings Endpoint](https://your-railway-backend-url.up.railway.app/api/v1/listings)

---

## 👥 Demo Users
The app uses **mock Pi login** — no real authentication yet.  
Go to `/login` and select a demo user:

- **Buyer** → Bob Buyer (`id = 2`)  
- **Seller** → Anna Seller (`id = 1`)  

---

## 🎬 Demo Flow
1. Go to `/login` → log in as **Bob Buyer**.  
2. Browse listings → click one → **Buy Now** → order created (mock Pi payment).  
3. Go to `/orders` → see Bob’s orders.  
4. Logout → `/login` → log in as **Anna Seller**.  
5. Go to `/sales` → see Anna’s sales (including Bob’s order).  

---

## 📅 Hackathon Timeline
- **Midpoint (19 Sept)** → Working prototype ✅  
  - Buyer → Seller → Order flow with mock Pi payments  
  - Deployed frontend + backend  
- **Final (19 Oct)** →  
  - Pi SDK integration for real escrow payments  
  - Delivery confirmation & dispute flow  
  - Extra polish on profiles, categories, and UX

---

## 👨‍💻 Author
Built by **Gouwtham Ravikumar** for **Pi Hackathon 2025**.
