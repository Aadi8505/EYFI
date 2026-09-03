# 🏆 EYFI Challenge — Leaderboard

> The interactive leaderboard for **India's largest student earning challenge** — [EYFI (Earn Your First Income)](https://eyfichallenge.com).

![EYFI](./eyfi-logo-v2.png)

---

## 🚀 About

This is the **Leaderboard** page for the EYFI Challenge, where college students across India compete to earn their first income in 30 days. The leaderboard ranks participants by total earnings and provides detailed profiles showcasing each student's hustle, stats, and achievements.

### ✨ Features

- **🏅 Top 3 Podium** — Gold, silver, and bronze spotlight for the highest earners with animated cards
- **📊 Interactive Rankings** — Click any participant to view their full profile
- **🔍 Search & Filter** — Search by name, college, city, or earning method; filter by category
- **📈 Sorting** — Sort by total earned, peak income, streak, days active, transactions, or name
- **❤️ Like Profiles** — Show appreciation for someone's hustle with a like
- **👥 Follow** — Follow participants to stay updated on their journey
- **📤 Share** — Share a participant's profile via native share or clipboard
- **🏷️ Badges & Achievements** — Visual badges for milestones like Top Earner, Streak Master, etc.
- **📉 Weekly Earnings Chart** — Animated bar chart showing earnings progression over 8 weeks
- **🎨 EYFI Brand Theme** — Dark mode with neon green accents and dot matrix background, matching the official EYFI website

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI Components |
| **Vite** | Build tool & dev server |
| **Vanilla CSS** | Styling with custom design system |
| **JavaScript** | Logic & interactivity |

> No database — all 18 participants are seeded with realistic data in `src/data/users.js`.

---

## 📂 Project Structure

```
EYFI/
├── public/
│   └── eyfi-logo.png          # EYFI brand logo
├── src/
│   ├── components/
│   │   ├── Hero.jsx            # Hero section with stats
│   │   ├── LeaderboardRow.jsx  # Individual ranking row
│   │   ├── Navbar.jsx          # Navigation bar with EYFI branding
│   │   ├── Podium.jsx          # Top 3 winners podium
│   │   └── ProfileModal.jsx    # Detailed profile modal
│   ├── data/
│   │   └── users.js            # Seeded participant data (18 users)
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Global styles & design system
│   └── main.jsx                # React entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18+ 
- **npm** v9+

### Installation

```bash
# Clone or navigate to the project
cd EYFI

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Production Build

```bash
npm run build
npm run preview
```

---

## 👥 Seeded Participants

The leaderboard comes pre-loaded with **18 college students** across diverse earning methods:

| Category | Examples |
|---|---|
| **Services & Freelancing** | Web Dev, Graphic Design, Video Editing, Content Writing, Social Media Management, Automation Bots, Translation |
| **Products & Selling** | Candle Making, Home Baking, Custom T-Shirts, Handmade Jewelry, Thrift Reselling, Tiffin Service |
| **Teaching & Coaching** | Online Tutoring, Dance Workshops |
| **Other Services** | Event Photography, Phone Repair, Campus Delivery |

---

## 🎨 Design

- **Theme**: Dark mode (`#0a0a0a`) with neon green accents (`#c8ff00`)
- **Background**: Dot matrix grid pattern matching the EYFI website
- **Typography**: Inter + Space Grotesk from Google Fonts
- **Animations**: Staggered entrances, hover effects, chart animations, heartbeat likes
- **Responsive**: Fully responsive — works on mobile, tablet, and desktop

---

## 📜 License

Built for the [EYFI Challenge](https://eyfichallenge.com) — an initiative by [Polygnan](https://www.polygnan.org).

---

<p align="center">
  <strong>Earn Your First Income. 💰</strong><br>
  <em>30 days. Real income. Real hustle.</em>
</p>
