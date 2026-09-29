# Movie Explorer – Discover Your Favorite Films

A modern, responsive, mobile-first web application for discovering, searching, and managing favorite movies in real-time, built with **React**, **Material UI (MUI)**, and **The Movie Database (TMDb) API**.

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=black)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material--UI-v5-007fff?logo=mui&logoColor=white)](https://mui.com/)
[![Axios](https://img.shields.io/badge/Axios-1.7.7-5a29e4?logo=axios&logoColor=white)](https://axios-http.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Live Demo

- **Live URL**: `[Live Demo URL — Add your live Vercel/Netlify deployment URL here]`
  > *See the [Deployment Instructions](#deployment-instructions) section below to deploy in under 2 minutes.*
- **Demo Account Credentials**:
  - **Username**: `movie_lover` (or any username with 3+ chars)
  - **Password**: `explorer123` (or any password with 4+ chars)
  - *(A 1-click "Fill Demo Credentials" button is provided on the login screen for rapid testing)*

---

## Project Overview

**Movie Explorer** is engineered as part of a Senior Frontend Developer Selection Test. The application allows cinema enthusiasts to discover trending films, perform live keyword searches with infinite scrolling pagination, inspect rich film details (synopsis, cast rosters, runtimes, ratings, and embedded YouTube trailers), bookmark personal favorites across browser sessions, and customize their viewing experience with light and dark themes.

---

## Features

### Mandatory Requirements

1. **Authentication & Session Management**
   - Professional, responsive Login interface with form validation and friendly error banners.
   - Session persistence via React Context and `localStorage`.
   - Protected client-side routing with automatic redirect back to requested pages after sign-in.
   - User profile indicator and instant logout in navigation.

2. **Real-Time Movie Search**
   - Reusable `SearchBar` with clear input action, instant submit, and keyboard navigation.
   - Live query handling via TMDb Search API.
   - Friendly empty state when no titles match search criteria (`"No movies found for '[query]'"`).

3. **Infinite Scrolling Pagination**
   - High-performance infinite scrolling built with the modern `IntersectionObserver` API.
   - Paginated movie requests (`page=1, 2, 3...`) appending seamless results without duplication.
   - Sentinel-based loading triggers with smooth CircularProgress indicators.

4. **Trending Movies Section**
   - Dynamic real-time trending movies fetched directly from TMDb's `/trending/movie/{time_window}` endpoint.
   - Interactive toggle to switch between **Today's** and **This Week's** trending cinema.

5. **Movie Details (`/movie/:id`)**
   - High-resolution hero backdrop banner with legible contrast gradient overlay.
   - High-definition movie poster with missing image fallback handling.
   - Title, release date, runtime formatting (`e.g., 2h 15m`), certification, and rating breakdown.
   - Genre chips and full overview synopsis.
   - Top-billed cast roster with actor profile portraits and character names.
   - Curated list of recommended and similar films.

6. **Local Storage Persistence**
   - **Favorite Movies**: Add/remove movies to favorites; persisted across browser refreshes and restarts under `favoriteMovies`.
   - **Last Searched Movie**: Preserves recent search query under `lastSearchedMovie` and presents a one-click badge to quickly re-query or resume browsing.

7. **Light & Dark Mode**
   - Material UI Theme engine with custom dark (`#0b0f19` deep cinematic slate) and light (`#f8fafc` crisp clean paper) palettes.
   - Dedicated `ThemeToggle` button in the AppBar and mobile drawer.
   - Theme choice automatically persisted to `localStorage`.

8. **Resilient Error & Empty States**
   - Graceful API failure handling (network timeouts, 401 unauthorized, 404 not found, 429 rate limits).
   - Non-technical, user-friendly error banners with actionable "Try Again" and "Set API Key" retry triggers.
   - Missing posters gracefully replaced with custom styled SVG vector placeholders.

9. **Mobile-First Responsive Design**
   - Breakpoint layout: **2 columns** on mobile, **3 columns** on tablet, **4 to 5 columns** on desktop.
   - Responsive AppBar with smooth slide-out navigation drawer on smaller viewports.

---

### Bonus Features

- **Bonus 1 — Multi-Factor Filtering & Discovery**
  - Integrated `FilterBar` supporting filtering by **Genre** (dynamically loaded from TMDb), **Release Year** (1990–Present), **Minimum Rating** (6.0+, 7.0+, 8.0+, 8.5+), and **Sort Order** (Most Popular, Highest Rated, Newest, Oldest) via TMDb's `/discover/movie` endpoint.
- **Bonus 2 — YouTube Trailers Integration**
  - Responsive `TrailerModal` dialog playing official YouTube trailers and teasers via TMDb's `/movie/:id/videos` endpoint.
  - Graceful fallback display (`"Trailer unavailable for this movie"`) when no video is uploaded on TMDb.
- **Bonus 3 — Pagination Switcher (Infinite Scroll & "Load More" Button)**
  - Seamless toggle switch allowing users to alternate between automatic **Infinite Scrolling** and manual **"Load More Movies"** button for flexible UX testing.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Core UI component library |
| **Create React App** | Project build and toolchain scaffold |
| **JavaScript (ES6+)** | Application programming language |
| **Material UI (MUI v5)** | Component library (`@mui/material`, `@emotion/react`, `@emotion/styled`) |
| **MUI Icons** | Vector iconography (`@mui/icons-material`) |
| **React Router v6** | Client-side routing (`react-router-dom`) |
| **Axios** | HTTP client for TMDb REST API communication |
| **Intersection Observer** | Native browser API for infinite scroll triggers |
| **React Context API** | Global application state management |
| **localStorage** | Browser persistence for favorites, search history, theme, and authentication |
| **TMDb API** | Authoritative movie database REST endpoints |

---

## Folder Structure

```text
movie-explorer/
├── public/
│   ├── favicon.svg             # Modern cinema reel SVG favicon
│   ├── index.html              # HTML shell with Google Fonts & responsive meta
│   ├── manifest.json           # Web app manifest
│   └── _redirects              # Netlify client-side routing configuration
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.jsx     # In-app TMDb API key configuration dialog
│   │   ├── EmptyState.jsx      # Reusable empty state view with custom action CTA
│   │   ├── ErrorMessage.jsx    # User-friendly error card with retry triggers
│   │   ├── FilterBar.jsx       # Bonus 1: Genre, Year, Rating & Sort filter controls
│   │   ├── Loading.jsx         # Circular progress & inline loading indicators
│   │   ├── MovieCard.jsx       # Reusable movie card with poster, rating, & favorite toggle
│   │   ├── MovieDetails.jsx    # Movie details presentation (backdrop, cast, synopsis)
│   │   ├── MovieGrid.jsx       # Responsive grid with skeleton loading state
│   │   ├── Navbar.jsx          # Top AppBar with drawer, favorites badge & controls
│   │   ├── ProtectedRoute.jsx  # Auth guard component for private routes
│   │   ├── SearchBar.jsx       # Reusable search bar with recent search badge
│   │   ├── ThemeToggle.jsx     # Reusable light/dark mode toggle button
│   │   └── TrailerModal.jsx    # Bonus 2: YouTube trailer dialog with fallback
│   ├── context/
│   │   ├── AuthContext.jsx     # Selection test login/logout state & credentials
│   │   └── MovieContext.jsx    # Shared movie state (favorites, search, trending, theme)
│   ├── hooks/
│   │   └── useInfiniteScroll.js# Custom IntersectionObserver infinite scrolling hook
│   ├── pages/
│   │   ├── Favorites.jsx       # Saved favorites page with title search
│   │   ├── Home.jsx            # Landing page with hero, search, filters & trending
│   │   ├── Login.jsx           # Clean authentication page with demo auto-fill
│   │   ├── MovieDetailsPage.jsx# Route wrapper fetching TMDb movie details by ID
│   │   └── SearchResults.jsx   # Search results page with infinite scroll / load more
│   ├── services/
│   │   ├── tmdbApi.js          # Centralized Axios service for TMDb API endpoints
│   │   └── tmdbApi.test.js     # Unit tests for TMDb helper functions
│   ├── utils/
│   │   ├── localStorage.js     # Safe JSON storage wrappers with error guards
│   │   └── localStorage.test.js# Unit tests for storage utilities
│   ├── App.js                  # Main app router, theme provider & global modals
│   ├── index.js                # React DOM 18 client root mounting point
│   └── theme.js                # Custom MUI light & dark palette definitions
├── .env.example                # Template for environment variables
├── .gitignore                  # Git ignore rules for node_modules, build, and .env
├── package.json                # Project dependencies and npm scripts
├── vercel.json                 # Vercel SPA client-side rewrite configuration
└── README.md                   # Comprehensive project documentation
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v16, v18, v20, or v22+)
- **npm** (v8+) or **yarn**

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and paste your TMDb API key:
   ```env
   REACT_APP_TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. **Run automated unit tests**:
   ```bash
   npm test
   ```

6. **Create an optimized production build**:
   ```bash
   npm run build
   ```

---

## Obtaining a Free TMDb API Key

1. Visit [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and create a free account.
2. Verify your email address and log in.
3. Navigate to **Account Settings** -> **API** ([themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)).
4. Click **Create** -> Choose **Developer**.
5. Accept the terms of use and fill in brief application details (e.g. Personal Movie Explorer project).
6. Copy your **API Key (v3 auth)**.
7. Paste it into your `.env` file as `REACT_APP_TMDB_API_KEY=your_key`.

> **Note**: For immediate reviewer convenience, if the application is launched without a `.env` file or with an unconfigured key, a **"Set API Key"** button is visible in the navigation bar and error alerts. This allows evaluators to input a temporary key directly in the UI without restarting the server.

---

## TMDb API Endpoints Used

| Endpoint | Method | Purpose in Movie Explorer |
| :--- | :--- | :--- |
| `/trending/movie/{time_window}` | `GET` | Fetches trending cinema for "Today" and "This Week" |
| `/search/movie` | `GET` | Searches movies by title with paginated results |
| `/movie/{id}` | `GET` | Fetches comprehensive movie details (with `append_to_response=credits,videos,recommendations`) |
| `/genre/movie/list` | `GET` | Retrieves full list of movie genres for filter dropdowns |
| `/discover/movie` | `GET` | Discovers movies by genre, release year, minimum rating, and sort orders |
| `/movie/{id}/videos` | `GET` | Retrieves official YouTube trailers and teasers |

---

## State Management Architecture

State is cleanly partitioned between **React Context** (for cross-cutting global concerns) and **local component state** (for component-isolated concerns):

1. **`AuthContext`**:
   - Manages simulated selection test authentication state (`user`, `isAuthenticated`).
   - Handles `login(username, password)` with validation and `logout()`.
   - Synchronizes user sessions to `localStorage` key `authUser`.

2. **`MovieContext`**:
   - `favorites`: List of saved movies synchronized with `localStorage` key `favoriteMovies`.
   - `addFavorite(movie)`, `removeFavorite(movieId)`, `isFavorite(movieId)`, `toggleFavorite(movie)`.
   - `lastSearchedMovie`: Preserves last search query in `localStorage` key `lastSearchedMovie`.
   - `themeMode`: Controls `'dark'` or `'light'` theme mode; stored in `localStorage` key `themeMode`.
   - `trendingMovies`, `trendingLoading`, `trendingError`, `fetchTrending(timeWindow)`.
   - `searchResults`, `searchLoading`, `searchLoadingMore`, `executeSearch(query)`, `loadMoreSearchResults()`.
   - `toast`: Notification banner system for user feedback.

---

## Local Storage Persistence Reference

| Storage Key | Format | Description |
| :--- | :--- | :--- |
| `favoriteMovies` | JSON Array of objects | Stores all bookmarked movies with posters, titles, and IDs |
| `lastSearchedMovie` | String (JSON parsed) | Stores the last searched query string |
| `themeMode` | String (`"dark"` or `"light"`) | Preserves user's preferred visual theme |
| `authUser` | JSON Object | Preserves active user session (`username`, `name`, `loginTime`) |
| `tmdbCustomApiKey` | String | Fallback storage for in-app configured TMDb API key |

---

## Deployment Instructions

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Movie Explorer assignment"
   git branch -M main
   git remote add origin https://github.com/your-username/movie-explorer.git
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New** -> **Project** -> Import `movie-explorer`.
4. In the **Environment Variables** section, add:
   - **Key**: `REACT_APP_TMDB_API_KEY`
   - **Value**: `your_tmdb_api_key_here`
5. Click **Deploy**. Vercel will build and assign a production URL.
*(Client-side routing is handled automatically via `vercel.json` included in this repository).*

### Deploy to Netlify

1. Go to [https://www.netlify.com](https://www.netlify.com) and log in.
2. Select **Add new site** -> **Import an existing project** -> GitHub.
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
4. In **Site Configuration** -> **Environment variables**, add `REACT_APP_TMDB_API_KEY`.
5. Click **Deploy site**.
*(Client-side routing is handled automatically via `public/_redirects` included in this repository).*

---

## Verification & Testing Checklist

- [x] **Login Interface**: Username and password fields validated, demo autofill provided, redirects to Home upon authentication.
- [x] **Home Page**: Hero banner, search bar with recent search badge, dynamic trending movies with Day/Week switcher.
- [x] **Search Results**: Paginated search results, poster fallbacks, release year, rating badge, empty state handling.
- [x] **Infinite Scrolling**: Automatically loads subsequent pages using `IntersectionObserver`; no duplicate requests.
- [x] **Movie Details**: Full backdrop banner, synopsis, runtime, genre chips, top cast roster, and similar recommendations.
- [x] **Favorites**: Add/remove toggle with heart button, favorites page, survives page reload via `localStorage`.
- [x] **Light/Dark Mode**: Seamless MUI theme switching with persistent storage and high contrast.
- [x] **Bonus 1 (Filters)**: Multi-attribute filtering by Genre, Year, Minimum Rating, and Sort order.
- [x] **Bonus 2 (YouTube Trailers)**: Embedded modal dialog playing official trailers with fallback handling.
- [x] **Bonus 3 (Load More)**: Switcher enabling manual "Load More" pagination as an alternative to infinite scroll.
- [x] **Production Build**: Verified with `npm run build` — compiles cleanly with 0 errors and 0 warnings.
- [x] **Unit Tests**: Verified with `npm test` — all test suites pass.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
