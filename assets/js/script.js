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
      clearMarkers(); // ADD THIS LINE HERE

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
            if (searchStatus === google.maps.places.PlacesServiceStatus.OK && places && places.length > 0) {
              places.forEach(place => {
                createMarker(place);
              });
            } else if (searchStatus === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
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

  markers.push(marker); // ADD THIS LINE: Add the new marker to our global array

  marker.addListener("click", () => {
    infowindow.setContent(`
      <strong>${place.name}</strong><br>
      ${place.vicinity ? place.vicinity : ''}
      ${place.rating ? `<br>Rating: ${place.rating} (${place.user_ratings_total ? place.user_ratings_total : 0} reviews)` : ''}
    `);
    infowindow.open(map, marker);
  });
}