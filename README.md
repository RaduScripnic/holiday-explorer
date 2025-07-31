# README.md - Holiday Explorer

## 🌍 Project Overview

Holiday Explorer helps users find ideal travel destinations using the **Google Maps and Places APIs**. With an intuitive interface, users can search by city and view accommodations, restaurants, and attractions to help plan their perfect getaway.

- **External User Goal:** Find the best holiday destination tailored to their interests.
- **Site Owner Goal:** Guide users to book via the platform and increase conversions through sponsor partnerships.

**Rationale for Development:**
The core purpose of Holiday Explorer is to provide a seamless and interactive way for users to discover potential holiday destinations. By integrating powerful Google Maps and Places APIs, the application aims to reduce the friction in early-stage travel planning, offering immediate visual context and points of interest. The design prioritizes user-friendliness and accessibility to cater to a broad audience of travelers. The long-term goal is to establish the platform as a go-to resource, eventually incorporating features for booking and partnering with travel agencies to monetize the service. This aligns with the site owner's goal of increasing conversions and sponsor partnerships.

**User Stories:**
* As a traveler, I want to be able to search for a city by name so that I can see it on a map and identify potential holiday spots.
* As a traveler, I want to see relevant points of interest like attractions, restaurants, and hotels marked on the map so I can easily plan my itinerary.
* As a traveler, I want clear feedback if my search input is invalid or if no results are found so I don't get stuck.
* As a traveler, I want the website to be easy to use on my mobile phone so I can plan on the go.

---

## 📄 Table of Contents

- [Features](#features)
- [UX Design](#ux-design)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)
- [Development Log (Commit History)](#development-log-commit-history)

---

## ✨ Features

- Responsive, mobile-friendly layout
- Real-time city search with dynamic map updates
- Embedded Google Maps with location pins for attractions, restaurants, and lodging
- Display of place details (name, vicinity, rating, reviews) in interactive info windows
- Robust error handling and clear feedback for empty or invalid inputs
- Clean and intuitive UI with a strong focus on accessibility

---

## 🌈 UX Design

**Target Audience**: Travelers researching new destinations, ranging from casual explorers to detailed itinerary planners.

**Wireframes**:

- Created using Figma (included in `/docs/design` folder).

**How Wireframes Influenced Layout:**
The initial wireframes guided the structure of `index.html`, defining the clear vertical flow from the header and search input to the map view and information sections. Key layout features like section centering, interactive buttons, and map positioning were based on wireframe planning.

**Wireframe Preview:**

![Homepage Wireframe](assets/docs/design/homepage-wireframe.png)

**Accessibility and UX Considerations:**

- High contrast color scheme for readability.
- Full keyboard navigation for input fields and buttons.
- ARIA roles and labels for interactive elements (e.g., `aria-label` for search input and button, `role="application"` for the map, `aria-live="polite"` for error messages) to ensure screen reader compatibility.
- All images (including the info graphic) include descriptive `alt` text.
- Clear error messages are dynamically displayed to guide the user.

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Media Queries for responsiveness)
- JavaScript (ES6+ for interactive functionality)
- Google Maps JavaScript API (for map embedding and interaction)
- Google Places API (for searching and displaying points of interest)
- Google Geocoding API (for converting city names to coordinates)
- Git & GitHub for version control

---

## 📚 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/RaduScripnic/holiday-explorer
   ```

---

## 🔧 Testing

### Manual Testing Performed:

| Test | Input | Expected Result | Actual Result | Status |
|------|-------|------------------|----------------|--------|
| 1 | "Paris" | Map centers, markers shown | ✅ Works as expected | Pass |
| 2 | Empty input | Error message shown | ✅ Works | Pass |
| 3 | Invalid city | Graceful error feedback | ✅ Message shown | Pass |
| 4 | Click marker | Info window shows place info | ✅ Works | Pass |
| 5 | Select continent and suggest | Random city inserted | ✅ Works and auto-searches | Pass |

### Screenshot Evidence:

#### Search working:
![Search for Paris](assets/docs/screenshots/search-paris.png)

#### Empty input error:
![Empty Search Input Error](assets/docs/screenshots/empty-input-error.png)

#### Random destination:
![Random Destination](assets/docs/screenshots/random-destination.png)

#### Responsive view (mobile):
![Mobile Layout](assets/docs/screenshots/mobile-layout.png)

### Bugs Found & Fixed:
- [x] Fixed bug where invalid city input crashed the map
- [x] Resolved issue with image being stretched
- [x] Added fallback if Google Places API returns no results

### Known Issues:
- [ ] Some cities return few POIs depending on Google’s local data availability

### Testing Tools:
- Manual browser testing (Chrome, Firefox, mobile viewports)
- DevTools for responsive design
- JavaScript error console (no active errors)

---

## 🚀 Deployment

This project is deployed using GitHub Pages:

1. Code pushed to GitHub repository: `https://github.com/RaduScripnic/holiday-explorer`
2. GitHub Pages settings:
   - Branch: `main`
   - Folder: `/ (root)`
3. GitHub generated URL: `https://github.com/RaduScripnic/holiday-explorer`
4. A `404.html` page was added to redirect broken URLs to the homepage

---

## 📅 Credits

- **Google Maps, Places, and Geocoding APIs**: [Google Developer Docs](https://developers.google.com/maps/documentation)
- **JavaScript logic inspired by**: [Google Places API Examples](https://developers.google.com/maps/documentation/javascript/examples/places-searchbox)
- All logic that uses these APIs is fully commented with attribution in `script.js`
- Icons & imagery from royalty-free sources (Unsplash/Pixabay if applicable)

---

## 📝 Development Log (Commit History)

Key commits (more added since resubmission):
- `feat: add random destination logic`
- `fix: handle invalid input errors`
- `style: improve image scaling and layout`
- `feat: add 404.html redirect file`
- `docs: update README with full user stories and testing details`

Full commit history available on GitHub.

---

For any questions or contributions, please raise an issue or fork the repo!
