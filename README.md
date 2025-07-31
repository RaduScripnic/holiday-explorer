# README.md – Holiday Explorer

🔗 **Live Demo**: [https://raduscripnic.github.io/holiday-explorer/](https://raduscripnic.github.io/holiday-explorer/)

---

## 🌍 Project Overview

Holiday Explorer helps users find ideal travel destinations using the **Google Maps and Places APIs**. With an intuitive interface, users can search by city and view accommodations, restaurants, and attractions to help plan their perfect getaway.

- **External User Goal:** Find the best holiday destination tailored to their interests.
- **Site Owner Goal:** Guide users to book via the platform and increase conversions through sponsor partnerships.

**Rationale for Development:**  
The core purpose of Holiday Explorer is to provide a seamless and interactive way for users to discover potential holiday destinations. By integrating powerful Google Maps and Places APIs, the application aims to reduce the friction in early-stage travel planning, offering immediate visual context and points of interest. The design prioritizes user-friendliness and accessibility to cater to a broad audience of travelers. The long-term goal is to establish the platform as a go-to resource, eventually incorporating features for booking and partnering with travel agencies to monetize the service. This aligns with the site owner's goal of increasing conversions and sponsor partnerships.

**User Stories:**

- As a traveler, I want to be able to search for a city by name so that I can see it on a map and identify potential holiday spots.
- As a traveler, I want to see relevant points of interest like attractions, restaurants, and hotels marked on the map so I can easily plan my itinerary.
- As a traveler, I want clear feedback if my search input is invalid or if no results are found so I don't get stuck.
- As a traveler, I want the website to be easy to use on my mobile phone so I can plan on the go.

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
- [Attribution](#attribution)

---

## ✨ Features

- Responsive, mobile-friendly layout
- Real-time city search with dynamic map updates
- Embedded Google Maps with location pins for attractions, restaurants, and lodging
- Display of place details (name, vicinity, rating, reviews) in interactive info windows
- Robust error handling and clear feedback for empty or invalid inputs
- Clean and intuitive UI with a strong focus on accessibility
- Random destination suggestion by continent
- **New:** Pressing **Enter** while in the search field now triggers a search for enhanced UX and accessibility

---

## 🌈 UX Design

**Target Audience**: Travelers researching new destinations, ranging from casual explorers to detailed itinerary planners.

**Wireframes:**  
Created using Figma (included in `/docs/design` folder).

**How Wireframes Influenced Layout:**  
The initial wireframes guided the structure of `index.html`, defining the clear vertical flow from the header and search input to the map view and information sections. Key layout features like section centering, interactive buttons, and map positioning were based on wireframe planning.

**Accessibility and UX Considerations:**

- High contrast color scheme for readability.
- Full keyboard navigation for input fields and buttons.
- ARIA roles and labels for interactive elements.
- Descriptive `alt` text for all images.
- Clear error messages dynamically displayed to guide the user.

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6+)
- Google Maps JavaScript API
- Google Places API
- Google Geocoding API
- Git & GitHub for version control
- [JSHint](https://jshint.com/) for code linting

---

## 📚 Installation

1. Clone this repository:

```bash
git clone https://github.com/RaduScripnic/holiday-explorer
