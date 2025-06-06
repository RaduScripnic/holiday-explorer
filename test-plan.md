# 🧪 Test Plan – Holiday Explorer

This document outlines the **manual testing procedures** used to validate the functionality, usability, responsiveness, and error handling of the Holiday Explorer web application.

---

## ✅ Functional Testing

| Test Case                     | Description                                           | Input             | Expected Result                                            | Status |
|------------------------------|-------------------------------------------------------|-------------------|------------------------------------------------------------|--------|
| Valid city search            | Map centers on searched city, pins appear            | "Paris"           | City map displays with attractions, restaurants, hotels    | ✅      |
| Empty input                  | Attempt to search with no input                      | ""                | Error message displayed                                     | ✅      |
| Invalid city input           | Input invalid city name                              | "Xyzabc"          | Error message: “Could not find that city…”                | ✅      |
| Marker info window           | Click a map marker                                   | N/A               | Info window with name and vicinity appears                 | ✅      |
| Search replaces previous     | Search second city after one search                  | "Rome" then "Tokyo" | Map updates, new pins appear, old ones clear               | ✅      |

---

## ✅ Usability Testing

| Area                        | Scenario                                             | Result |
|----------------------------|------------------------------------------------------|--------|
| Navigation clarity         | User understands how to search                      | ✅     |
| Button accessibility       | Tab and Enter keys work on search button            | ✅     |
| Error feedback             | Clear message for empty/invalid search              | ✅     |
| Map interaction            | Zoom, pan and click are intuitive                   | ✅     |

---

## ✅ Responsive Design Testing

| Device / Viewport           | Expected Behavior                                      | Status |
|----------------------------|--------------------------------------------------------|--------|
| Desktop (1920x1080)         | Full-width layout, all content visible                 | ✅      |
| Tablet (768x1024)           | Input and map stacked nicely                          | ✅      |
| Mobile (375x667)            | Responsive layout, no horizontal scroll               | ✅      |

---

## ✅ Accessibility Testing

| Check                       | Description                                           | Status |
|----------------------------|-------------------------------------------------------|--------|
| Keyboard navigation        | Can use Tab and Enter to operate input & button      | ✅     |
| Color contrast             | Sufficient contrast between background/text/buttons  | ✅     |
| ARIA labels                | Search input has descriptive label                   | ✅     |
| Alt text                   | All images (if used) have alt text                   | ✅     |

---

## 🐛 Bugs Found and Fixed

| Bug Description                          | Fix Implemented                              | Status |
|------------------------------------------|-----------------------------------------------|--------|
| Map misaligned on smaller screens        | Added CSS media queries                       | ✅     |
| Error shown on page load                 | Wrapped map init inside callback              | ✅     |
| Repeated pins after multiple searches    | Cleared previous markers before new ones      | ✅     |

---

## 📷 Screenshots

All relevant test result screenshots can be found in the `docs/screenshots/` folder:
- `paris-search.png`
- `error-empty.png`
- `map-markers.png`

---

## ✔️ Final Evaluation

All critical functionality and usability features have passed manual testing across multiple browsers and device sizes.

