// Global variables to store map, PlacesService, and InfoWindow instances.
let map;
let service;
let infowindow;
let markers = []; // Array to store map markers for clearing

// Called by Google Maps API once loaded
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 48.8566, lng: 2.3522 }, // Default center: Paris
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
}

// Remove all markers from the map
function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// Create a marker for a given place and add a click listener for info window
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

  markers.push(marker);

  marker.addListener("click", () => {
    infowindow.setContent(`
      <strong>${place.name}</strong><br>
      ${place.vicinity ? place.vicinity : ''}
      ${place.rating ? `<br>Rating: ${place.rating} (${place.user_ratings_total ? place.user_ratings_total : 0} reviews)` : ''}
    `);
    infowindow.open(map, marker);
  });
}

// All DOM-dependent code inside DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const errorMsg = document.getElementById("error-message");
  const flightsBtn = document.getElementById("flights-btn");
  const hotelsBtn = document.getElementById("hotels-btn");

  const continentSelect = document.getElementById("continent-select");
  const suggestBtn = document.getElementById("suggest-btn");
  const suggestedCityDisplay = document.getElementById("suggested-city-display");
  const randomErrorMsg = document.getElementById("random-error-message");

  // Capital cities data for random suggestions
  const capitalCities = {
    africa: ["Cairo", "Pretoria", "Nairobi", "Accra", "Abuja", "Marrakech", "Addis Ababa"],
    asia: ["Tokyo", "Beijing", "New Delhi", "Bangkok", "Seoul", "Singapore", "Dubai", "Jakarta"],
    europe: ["Paris", "London", "Rome", "Berlin", "Madrid", "Amsterdam", "Prague", "Lisbon", "Vienna", "Copenhagen"],
    north_america: ["Washington D.C.", "Ottawa", "Mexico City", "Kingston", "Panama City"],
    south_america: ["Brasília", "Buenos Aires", "Lima", "Santiago", "Bogotá", "Montevideo"],
    oceania: ["Canberra", "Wellington", "Suva", "Port Moresby"]
  };

  // Event listener for city search button
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

      clearMarkers();

      // Geocode city name to lat/lng
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;

          map.setCenter(location);
          map.setZoom(13);

          // Search for nearby tourist attractions, restaurants, lodging
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

  // Open Skyscanner flights site
  if (flightsBtn) {
    flightsBtn.addEventListener("click", () => {
      window.open("https://www.skyscanner.net/", "_blank");
    });
  }

  // Open Booking.com hotels site
  if (hotelsBtn) {
    hotelsBtn.addEventListener("click", () => {
      window.open("https://www.booking.com/", "_blank");
    });
  }

  // Random destination suggestion based on continent
  if (suggestBtn) {
    suggestBtn.addEventListener("click", () => {
      const selectedContinent = continentSelect.value;
      suggestedCityDisplay.textContent = "";
      randomErrorMsg.textContent = "";

      if (!selectedContinent) {
        randomErrorMsg.textContent = "Please choose a continent.";
        return;
      }

      const cities = capitalCities[selectedContinent];
      if (cities && cities.length > 0) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomIndex];
        suggestedCityDisplay.textContent = `How about: ${randomCity}!`;
        cityInput.value = randomCity;
        searchBtn.click();
      } else {
        randomErrorMsg.textContent = "No cities available for this continent.";
      }
    });
  }
});
