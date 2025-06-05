# README.md - Holiday Explorer

## 🌍 Project Overview

Holiday Explorer helps users find ideal travel destinations using the **Google Maps and Places APIs**. With an intuitive interface, users can search by city and view accommodations, restaurants, and attractions to help plan their perfect getaway.

- **External User Goal:** Find the best holiday destination tailored to their interests.
- **Site Owner Goal:** Guide users to book via the platform and increase conversions through sponsor partnerships.

---

## 📄 Table of Contents

- [Features](#features)
- [UX Design](#ux-design)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

---

## ✨ Features

- Responsive, mobile-friendly layout
- Real-time city search
- Embedded Google Maps with location pins
- Display of places using Google Places API (restaurants, hotels, attractions)
- Error handling and feedback for invalid inputs
- Clean and intuitive UI with accessibility in mind

---

## 🌈 UX Design

**Target Audience**: Travelers researching new destinations

**Wireframes**:

- Created using Figma (included in `/docs/design` folder)

**Accessibility and UX Considerations**:

- High contrast color scheme
- Keyboard navigation
- ARIA roles for interactive elements
- All images include alt text

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- Google Maps JavaScript API
- Google Places API
- Git & GitHub for version control

---

## 📚 Installation

1. Clone this repository:
   ```
   git clone https://github.com/username/holiday-explorer.git
   ```
2. Open `index.html` in a browser or use Live Server
3. Add your Google Maps API key in `script.js`

---

## 🔧 Testing

### Manual Testing

| Test Case         | Input          | Expected Result                        | Pass? |
| ----------------- | -------------- | -------------------------------------- | ----- |
| Search city       | "Rome"         | Map shows Rome with points of interest | ✅     |
| Empty input       | ""             | Error message shown                    | ✅     |
| Invalid city      | "XYZ"          | Error message shown                    | ✅     |
| Responsive layout | Resize browser | Layout adjusts                         | ✅     |

### Bugs Found

- **[FIXED]** Initial API call error when input is empty
- **[FIXED]** Misaligned map on smaller screens

Screenshots included in `/docs/screenshots`

---

## ✨ Deployment

- Deployed to GitHub Pages: [View Site](https://username.github.io/holiday-explorer/)
- Deployment Steps:
  1. Push to main branch
  2. Enable GitHub Pages under repo settings
  3. Confirm no console errors or broken links

---

## 👤 Credits

- Custom JS and CSS by [Your Name]
- Google Maps & Places APIs
- UI inspiration from [TravelSite.com]
- API documentation: [Google Maps Platform](https://developers.google.com/maps)

**Note**: All external resources are credited above and inline in the code with comments.

---

## 🔐 File Structure

```text
holiday-explorer/
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   └── images/
├── index.html
├── README.md
├── test-plan.md
└── docs/
    ├── design/wireframes.png
    └── screenshots/test-results.png
```

---

## ✅ Development Checklist (Updated)

### 📁 Folder & File Structure
- [x] Organized directories (CSS, JS, images)
- [x] External files linked appropriately

### 🔧 Front-End Development
- [x] Semantic HTML
- [x] Responsive CSS in external file
- [x] External JS linked at end of body
- [x] UX and accessibility principles followed
- [x] Clean navigation
- [x] Real-time interactivity + feedback
- [x] Graphics + visual appeal

### 🔄 JavaScript Interactivity
- [x] Clean, validated JS code
- [x] Uses conditionals & loops
- [x] Handles empty/invalid inputs
- [x] No console errors
- [x] Redirect handler for 404s (with fallback homepage link)
- [x] Linter passed

### 🔢 Testing
- [x] Manual test plan
- [x] Bugs logged & explained
- [x] Screenshot evidence included

### ☁️ Deployment
- [x] Deployed to GitHub Pages
- [x] No commented-out code or broken links

### 📅 Documentation
- [x] Full development story in README
- [x] Diagrams, wireframes, UX work included
- [x] Attributions made
- [x] Descriptive commits throughout
- [x] Clear markdown formatting
