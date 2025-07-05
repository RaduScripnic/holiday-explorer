// Global variables to store map, PlacesService, and InfoWindow instances.
// Declared globally so they can be accessed by various functions after initialization.
let map;
let service;
let infowindow;
let markers = []; // Array to store map markers for clearing

/**
 * @function initMap
 * @description Initializes the Google Map. This function is called as a callback
 * by the Google Maps API script once it has fully loaded.
 * It must be globally accessible.
 *
 * Attribution: This function utilizes the Google Maps JavaScript API.
 * More info: https://developers.google.com/maps/documentation/javascript/overview
 */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 48.8566, lng: 2.3522 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
}

/**
 * @function clearMarkers
 * @description Clears all markers from the map.
 */
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null); // Remove marker from the map
  }
  markers = []; // Clear the markers array
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const errorMsg = document.getElementById("error-message");

  // Get the booking buttons
  const flightsBtn = document.getElementById("flights-btn");
  const hotelsBtn = document.getElementById("hotels-btn");

  // NEW: Get elements for the random destination section
  const continentSelect = document.getElementById("continent-select");
  const suggestBtn = document.getElementById("suggest-btn");
  const suggestedCityDisplay = document.getElementById("suggested-city-display");
  const randomErrorMsg = document.getElementById("random-error-message");


  // Data for random capital cities (a curated list)
  const capitalCities = {
    africa: [
      "Cairo", "Pretoria", "Nairobi", "Accra", "Abuja", "Marrakech", "Addis Ababa"
    ],
    asia: [
      "Tokyo", "Beijing", "New Delhi", "Bangkok", "Seoul", "Singapore", "Dubai", "Jakarta"
    ],
    europe: [
      "Paris", "London", "Rome", "Berlin", "Madrid", "Amsterdam", "Prague", "Lisbon", "Vienna", "Copenhagen"
    ],
    north_america: [
      "Washington D.C.", "Ottawa", "Mexico City", "Kingston", "Panama City"
    ],
    south_america: [
      "Brasília", "Buenos Aires", "Lima", "Santiago", "Bogotá", "Montevideo"
    ],
    oceania: [
      "Canberra", "Wellington", "Suva", "Port Moresby"
    ]
  };


  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      errorMsg.textContent = "";

      if (!city) {
        errorMsg.textContent = "Please enter a city name.";
        return;
      }

      if (!map) {
        errorMsg.textContent = "Map not ready. Please check your internet connection or API key setup.";
        console.error("Google Map object is not initialized. 'initMap' might not have been called.");
        return;
      }

      // Clear existing markers before performing a new search
      clearMarkers();

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;

          map.setCenter(location);
          map.setZoom(13);

          const request = {
            location: location,
            radius: 5000,
            type: ['tourist_attraction', 'restaurant', 'lodging'],
          };

          service.nearbySearch(request, (places, searchStatus) => {
            if (searchStatus === google.places.PlacesServiceStatus.OK && places && places.length > 0) {
              places.forEach(place => {
                createMarker(place);
              });
            } else if (searchStatus === google.places.PlacesServiceStatus.ZERO_RESULTS) {
              errorMsg.textContent = `No attractions, restaurants, or lodging found near ${city}.`;
            } else {
              errorMsg.textContent = `Places search failed: ${searchStatus}. Please try again later.`;
              console.error('Places service status:', searchStatus);
            }
          });
        } else {
          errorMsg.textContent = `Could not find "${city}". Try another city or check spelling.`;
          console.error('Geocoder failed with status:', status);
        }
      });
    });
  }

  // Add event listeners for the new booking buttons
  if (flightsBtn) {
    flightsBtn.addEventListener("click", () => {
      window.open("https://www.skyscanner.net/", "_blank");
    });
  }

  if (hotelsBtn) {
    hotelsBtn.addEventListener("click", () => {
      window.open("https://www.booking.com/", "_blank");
    });
  }

  // NEW: Event listener for random destination suggestion
  if (suggestBtn) {
    suggestBtn.addEventListener("click", () => {
      const selectedContinent = continentSelect.value;
      suggestedCityDisplay.textContent = ""; // Clear previous suggestion
      randomErrorMsg.textContent = ""; // Clear previous error

      if (!selectedContinent) {
        randomErrorMsg.textContent = "Please choose a continent.";
        return;
      }

      const cities = capitalCities[selectedContinent];
      if (cities && cities.length > 0) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomIndex];
        suggestedCityDisplay.textContent = `How about: ${randomCity}!`;
        cityInput.value = randomCity; // Populate search input with the suggested city
        searchBtn.click(); // Programmatically click the search button to show on map
      } else {
        randomErrorMsg.textContent = "No cities available for this continent.";
      }
    });
  }
});

/**
 * @function createMarker
 * @description Creates a Google Map marker for a given place object and adds a click listener
 * to display an InfoWindow with place details.
 * @param {object} place - A Google Maps PlaceResult object containing details about the place.
 *
 * Attribution: This function utilizes the Google Maps JavaScript API (Markers and InfoWindows).
 * More info: https://developers.google.com/maps/documentation/javascript/markers
 * More info: https://developers.google.com/maps/documentation/javascript/infowindows
 */
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) {
    console.warn("Skipping marker creation for place with invalid location:", place);
    return;
  }

  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name
  });

  markers.push(marker); // Add the new marker to our global array

  marker.addListener("click", () => {
    infowindow.setContent(`
      <strong>${place.name}</strong><br>
      ${place.vicinity ? place.vicinity : ''}
      ${place.rating ? `<br>Rating: ${place.rating} (${place.user_ratings_total ? place.user_ratings_total : 0} reviews)` : ''}
    `);
    infowindow.open(map, marker);
  });
}