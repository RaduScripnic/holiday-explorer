# 🧪 Test Plan – Holiday Explorer

This document outlines the **manual testing procedures** used to validate the functionality, usability, responsiveness, and error handling of the Holiday Explorer web application.

---

## 💡 Principles of Testing

For the Holiday Explorer project, a combination of manual testing and an understanding of automated testing principles were applied to ensure a robust and user-friendly experience.

* **Manual Testing:** This was the primary testing method employed. It involves human testers interacting directly with the web application to simulate real user behavior. Manual testing was crucial for:
    * **Usability:** Evaluating how intuitive and easy the interface is to use, including navigation and feedback mechanisms.
    * **Visual Fidelity & Responsiveness:** Checking if the design renders correctly and adapts well across different screen sizes and devices.
    * **End-to-End Functionality:** Verifying complex user flows, such as searching for a city, seeing markers appear, and interacting with info windows.
    * **Accessibility:** Ensuring keyboard navigation, proper ARIA attributes, and sufficient color contrast are functional for users with disabilities.
    Manual testing was deployed continuously throughout the development process, allowing for immediate feedback and iterative improvements.

* **Automated Testing (Conceptual Application):** While not fully implemented with code for this project's scope, automated testing would typically involve writing scripts to run tests automatically. This would be deployed for:
    * **Unit Tests:** To verify individual JavaScript functions (e.g., `initMap`, `createMarker`, `clearMarkers`, input validation logic) work as expected in isolation.
    * **Integration Tests:** To ensure different parts of the application (e.g., the search button interacting with the Geocoding API and then the Places API) function correctly when combined.
    * **Regression Tests:** To quickly confirm that new code changes do not break existing functionality.
    Automated tests are best suited for repeatable, precise checks and would significantly speed up the testing process in a larger, continuously developed application.

---

## ✅ Functional Testing

| Test Case                     | Description                                           | Input             | Expected Result                                            | Status | Screenshot (in `docs/screenshots/`) |
|------------------------------|-------------------------------------------------------|-------------------|------------------------------------------------------------|--------|-------------------------------------|
| Valid city search            | Map centers on searched city, pins appear            | "Paris"           | City map displays with attractions, restaurants, hotels    | ✅     | `paris-search.png`                  |
| Empty input                  | Attempt to search with no input                      | ""                | Error message displayed: "Please enter a city name."        | ✅     | `error-empty.png`                   |
| Invalid city input           | Input invalid city name                              | "Xyzabc"          | Error message: “Could not find "Xyzabc". Try another city or check spelling.” | ✅     | `error-invalid.png` (NEW!)         |
| Marker info window           | Click a map marker                                   | N/A               | Info window with name and vicinity appears                 | ✅     | `map-markers.png`                   |
| Search replaces previous     | Search second city after one search                  | "Rome" then "Tokyo" | Map updates, new pins appear, old ones clear               | ✅     | `rome-to-kyo-clear.png` (NEW!)     |

---

## ✅ Usability Testing

| Area                        | Scenario                                             | Result | Observation/Fixes                                         |
|----------------------------|------------------------------------------------------|--------|-----------------------------------------------------------|
| Navigation clarity         | User understands how to search                      | ✅     | The prominent search bar and button make the primary action clear. |
| Button accessibility       | Tab and Enter keys work on search button            | ✅     | Confirmed focus states and activation via keyboard.       |
| Error feedback             | Clear message for empty/invalid search              | ✅     | Error messages are red and appear directly below the input. |
| Map interaction            | Zoom, pan and click are intuitive                   | ✅     | Standard Google Maps controls provide expected interaction. |

---

## ✅ Responsive Design Testing

| Device / Viewport           | Expected Behavior                                      | Status | Observation/Fixes                                         |
|----------------------------|--------------------------------------------------------|--------|-----------------------------------------------------------|
| Desktop (1920x1080)         | Full-width layout, all content visible                 | ✅      | Layout maintains good spacing and readability.            |
| Tablet (768x1024)           | Input and map stacked nicely                          | ✅      | Input and button stack vertically, map adjusts height.      |
| Mobile (375x667)            | Responsive layout, no horizontal scroll               | ✅      | Content scales correctly, map height is optimized.        |

---

## ✅ Accessibility Testing

| Check                       | Description                                           | Status | Observation/Fixes                                         |
|----------------------------|-------------------------------------------------------|--------|-----------------------------------------------------------|
| Keyboard navigation        | Can use Tab and Enter to operate input & button      | ✅     | `Tab` key cycles through input and button, `Enter` activates button. |
| Color contrast             | Sufficient contrast between background/text/buttons  | ✅     | Colors meet WCAG AA standards for contrast.               |
| ARIA labels                | Search input has descriptive label                   | ✅     | `aria-label` provides clear context for screen readers.     |
| Alt text                   | All images (if used) have alt text                   | ✅     | Placeholder image includes descriptive `alt` text. (Will be updated with real image alt text). |

---

## 🐛 Bugs Found and Fixed

| Bug Description                          | Fix Implemented                              | Status |
|------------------------------------------|-----------------------------------------------|--------|
| Map misaligned on smaller screens        | Added CSS media queries to adjust map height and margins. | ✅     |
| Error shown on page load                 | Ensured `initMap` callback handles API loading correctly and input validation prevents initial error display. | ✅     |
| Repeated pins after multiple searches    | Implemented `clearMarkers()` function to remove all previous markers before adding new ones. | ✅     |
| **[NEW!]** API Key Authorization Failure     | Obtained a new, correctly configured API key with necessary API services enabled and proper domain restrictions. | ✅     |
| **[NEW!]** Search Functionality Failure      | Debugged JavaScript logic, ensuring `geocoder` and `service.nearbySearch` callbacks are handled correctly after API key fix. | ✅     |

---

## 📷 Screenshots

All relevant test result screenshots can be found in the `docs/screenshots/` folder, providing visual evidence for each passed test case:
- `paris-search.png` (Valid city search)
- `error-empty.png` (Empty input error)
- `error-invalid.png` (Invalid city input error) - **NEW!**
- `map-markers.png` (Marker info window interaction)
- `rome-to-kyo-clear.png` (Search replaces previous, showing clear markers) - **NEW!**

---

## ✔️ Final Evaluation

All critical functionality, usability, responsiveness, and accessibility features have passed manual testing across multiple browsers and device sizes. The application now provides a fully functional and intuitive experience for exploring holiday destinations.