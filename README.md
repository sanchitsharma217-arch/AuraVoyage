<div align="center">

# ✨ AURAVOYAGE
### Ultra-Luxury Travel Concierge • 5-Star Sanctuaries • Michelin Tables • Custom Trip Studio

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Experience-amber?style=for-the-badge&logo=safari&logoColor=white)](https://sanchitsharma217-arch.github.io/AuraVoyage/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br />

**[🌐 Experience Live Demo](https://sanchitsharma217-arch.github.io/AuraVoyage/)** • **[📖 Documentation](#-key-features--modules)** • **[⚡ Quick Start](#-quick-start)**

<br />

> **AuraVoyage** is an ultra-luxury digital travel concierge and reservation engine. Designed with editorial typography, cinematic GPU-composited micro-animations, and full mobile optimization, AuraVoyage delivers an unparalleled bespoke travel experience across 6 global destinations.

</div>

---

## 🌟 Key Features & Modules

### 1. 🗺️ Interactive Destination Atlas & Live Weather Engine
- Visual sanctuary explorer covering **Bali, Swiss Alps, Amalfi Coast, Kyoto, Dubai, and Santorini**.
- Displays **real-time weather temperatures** (*29°C Tropical Breeze*, *12°C Alpine Crisp*), destination vibes, and best travel seasons.
- **Reactive Global Filtering**: 1-tap filtering across all multi-day tours, 5-star suites, and reserved dining tables.
- Emits a shimmering, pulsing gold aura ring (`animate-ring-pulse`) on active selection.

### 2. 👑 "The AuraVoyage Standard" Brand Pillars
- **Hand-Inspected Sanctuaries**: Private cliffside villas, 5-star alpine chalets, and heritage suites.
- **Private Wings & Chauffeurs**: Helicopter scenic transfers and executive S-Class airport meet & greet.
- **Guaranteed Michelin Dining**: Pre-allocated tasting tables and sommelier pairings.
- **24/7 White-Glove Concierge**: Dedicated destination specialists with instant response.

### 3. 🛠️ The Private Travel Studio (Custom Trip Configurator)
- **5-Step Bespoke Journey Builder**:
  1. *Destination, Dates & Guest Manifest*
  2. *5-Star Sanctuary (Penthouse/Villa/Chalet)*
  3. *Reserved Michelin Dining Experience*
  4. *Artisan Refreshments & Welcome Hampers*
  5. *VIP Add-ons (Private Guide, Vacation Photography, Yacht Charter)*
- **Live Compounding Cost Calculator**: Real-time per-traveler and total price recalculation with automated **15% Studio Privilege Discount**.
- **Mobile Quick-Summary Banner**: Allows seamless on-the-go reservations from smartphones without scrolling past all stages.

### 4. 🎟️ First-Class Boarding Pass & Concierge Voucher
- Confirmed reservations generate an authentic, printable **Executive Boarding Pass**.
- Includes verified reference code (`AV-8842-VIP`), passenger manifest, QR code preview, status stamps, and dedicated print stylesheet (`window.print()`).
- Pre-seeded with a realistic VIP booking for instant portfolio evaluation.

### 5. 📱 Native Mobile Bottom Navigation & UX
- Floating glassmorphic bottom bar (`MobileBottomNav`) tailored for smartphone thumb interaction:
  - 🧭 **Explore** (Collection highlights)
  - 🍽️ **Dining** (Michelin table bookings)
  - ☕ **Refreshments** (Artisan travel hampers)
  - 🛠️ **Studio** (Trip configurator)
  - 🎟️ **Passes** (Live reservation count badge)
  - 🛍️ **Bag** (Interactive slide-out cart)
- Swipeable horizontal category bar directly below the sub-header.

### 6. 💱 Multi-Currency & Live State Persistence
- Real-time currency conversions across **USD ($), EUR (€), GBP (£), INR (₹), and AED (د.إ)**.
- LocalStorage persistence for Cart, Wishlist, Custom Bookings, and Verified Traveler Reviews.

---

## 🎨 Visual Identity & Animations

| Animation | Class / Utility | Description |
| :--- | :--- | :--- |
| **Ken Burns Effect** | `.animate-ken-burns` | Slow 25s cinematic panoramic zoom on hero photography |
| **Gold Gradient Flow** | `.gold-gradient-text` | Fluid gold-to-white continuous light shimmer on typography |
| **Light-Sweep Sheen** | `.card-sheen` | Diagonal glass sheen that glides across cards on hover |
| **Card Elevation** | `.luxury-card-hover` | Smooth 6px elevation with atmospheric shadow and fine gold border |
| **Spring Modal Entrance** | `.animate-modal-pop` | Bouncy spring-curve pop for vouchers, checkout, and itineraries |
| **Tactile Feedback** | `.btn-luxury` | Subtle scale depression (`active:scale-97`) for physical button feel |

---

## 🛠️ Architecture & Tech Stack

```
AuraVoyage/
├── src/
│   ├── assets/              # Static media assets & icons
│   ├── components/
│   │   ├── bookings/        # Boarding passes & voucher modals
│   │   ├── cart/            # Trip bag drawer, wishlist, checkout modal
│   │   ├── common/          # Destination Atlas, Brand Pillars, Mobile Nav, Showcase Guide
│   │   ├── custom-package/  # The Private Travel Studio configurator
│   │   ├── hotels/          # 5-Star Sanctuaries & booking modal
│   │   ├── refreshments/    # Gourmet hampers & pit-stops
│   │   ├── restaurants/     # Michelin tables & table reserve modal
│   │   ├── reviews/         # Verified testimonials & review submission
│   │   ├── tours/           # Tour packages & interactive itinerary modal
│   │   ├── Hero.tsx         # Cinematic Hero with multi-attribute search
│   │   ├── Navbar.tsx       # Luxury header with mobile category swipe
│   │   └── Footer.tsx       # VIP newsletter & brand footer
│   ├── context/             # TravelContext (Cart, Bookings, Wishlist, Currency)
│   ├── data/                # Curated destination, hotel, dining & tour data
│   ├── types/               # TypeScript interfaces & domain types
│   ├── utils/               # Formatters, currency conversion & date utilities
│   ├── App.tsx              # Main layout & composition
│   ├── index.css            # Tailwind CSS v4, custom theme & GPU keyframes
│   └── main.tsx             # React entrypoint
├── index.html               # Head tags, Google Fonts (Playfair Display + Plus Jakarta)
├── vite.config.ts           # Vite + Tailwind v4 + React configuration
└── package.json             # Dependencies & scripts
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/sanchitsharma217-arch/AuraVoyage.git

# Navigate into project directory
cd AuraVoyage

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 4. Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `/dist` directory.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
<sub>Crafted with passion by <a href="https://github.com/sanchitsharma217-arch">Sanchit Sharma</a></sub>
</div>
