# 🧭 Holiday Explorer

🔗 **Live Demo**: [https://raduscripnic.github.io/holiday-explorer/](https://raduscripnic.github.io/holiday-explorer/)

---

## 🌍 Project Overview

**Holiday Explorer** is a responsive web application that helps users discover travel destinations using Google Maps and Places APIs. With a clean interface, users can search for cities and instantly view key points of interest like attractions, restaurants, and hotels — directly on a live interactive map.

---

## 🎯 Purpose & Motivation

Planning a holiday can be overwhelming — especially during the research stage. **Holiday Explorer** solves this by:

- Offering an intuitive, **visual-first experience** using Google Maps.
- Helping users explore **points of interest instantly**.
- Providing **random travel suggestions** for inspiration.

The design is mobile-first and accessibility-focused, supporting a wide range of users.

---

## 👥 Target Audience

- Casual or serious travelers
- Mobile and desktop users
- Individuals planning city-based holidays
- Users seeking quick destination ideas

---

## 🙋‍♂️ User Stories

| ID | User Story | Screenshot |
|----|------------|------------|
| 1 | As a traveler, I want to search for a city and see it on a map. | ![City Search](assets/docs/screenshots/paris-search.png) |
| 2 | I want to view attractions, restaurants, and hotels nearby. | ![POI Markers](assets/docs/screenshots/map-markers.png) |
| 3 | I want clear feedback if my input is invalid or empty. | ![Empty](assets/docs/screenshots/error-empty.png)<br>![Invalid](assets/docs/screenshots/error-invalid.png) |
| 4 | I want the app to work well on mobile. | ![Mobile](assets/docs/screenshots/mobile-layout.png) |
| 5 | I want a surprise city suggestion when I can't decide. | ![Random City](assets/docs/screenshots/random-destination.png) |

---

## ✨ Features

- 📍 Interactive Google Map with dynamic markers
- 🔎 Search for cities with auto-location & POIs
- 🏨 Explore nearby hotels, attractions, and restaurants
- 🧭 Random capital suggestion by continent
- 📱 Fully responsive and mobile-friendly
- ♿ Accessibility: ARIA labels, keyboard navigation, semantic HTML
- ⌨️ Pressing **Enter** triggers a city search
- ⚠️ Inline error messages for user guidance
- 🔗 Buttons to Booking.com and Skyscanner

---

## 🎨 UX & Accessibility

**Wireframes:** Designed in Figma (`/docs/design/wireframe.png`)  
**Accessibility Features:**
- Proper use of semantic HTML
- `aria-label` on all inputs and buttons
- `aria-live` regions for dynamic error feedback
- Fully keyboard-navigable
- Color contrast compliant (WCAG AA)

---

## 🛠️ Technologies Used

- HTML5 / CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6+)
- Google Maps JavaScript API
- Google Places API
- Google Geocoding API
- Git & GitHub
- [JSHint](https://jshint.com/)
- W3C HTML & CSS Validators

---

## 🧪 Testing Summary

📄 For full details, see [test-plan.md](./test-plan.md)

### ✅ Functional Tests

| Test | Input | Expected | Result | Screenshot |
|------|-------|----------|--------|------------|
| Search valid city | "Paris" | Map centers, POIs show | ✅ | paris-search.png |
| Empty input | "" | Error: input required | ✅ | error-empty.png |
| Invalid city | "Xyzabc" | Error: city not found | ✅ | error-invalid.png |
| Marker click | N/A | Info window opens | ✅ | map-markers.png |
| New search | "Rome" → "Tokyo" | Old markers cleared | ✅ | rome-to-kyo-clear.png |

### ✅ Responsiveness

| Device | Layout | Result |
|--------|--------|--------|
| Desktop (1920x1080) | Full view, no issues | ✅ |
| Tablet (768x1024) | Responsive stacking | ✅ |
| Mobile (375x667) | Mobile-first layout | ✅ |

### ✅ Accessibility

- Tab + Enter navigation → ✅  
- ARIA roles + `aria-labels` → ✅  
- Live error feedback → ✅  
- Color contrast validated → ✅

### ✅ Code Validation

| Type | Tool | Status |
|------|------|--------|
| HTML | W3C Validator | ✅ |
| CSS | W3C Validator | ✅ |
| JS | JSHint | ✅ |

Screenshots located in: `assets/docs/screenshots/`  
Validation screenshots also stored for documentation.

---

## 🐛 Bug Fixes

| Issue | Fix | Status |
|-------|-----|--------|
| Enter key didn’t trigger search | Added event listener on input | ✅ |
| Previous markers stayed on new search | Added `clearMarkers()` function | ✅ |
| API key errors | Replaced with valid scoped key | ✅ |
| Map failed to load | Checked `initMap()` on load | ✅ |

---

## 💾 Installation Instructions

```bash
git clone https://github.com/RaduScripnic/holiday-explorer
cd holiday-explorer
open index.html
