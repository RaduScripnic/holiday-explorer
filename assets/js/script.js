let map;
let service;
let infowindow; // Declare infowindow globally

// initMap is the callback function for the Google Maps API.
// It must be in the global scope.
function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 48.8566, lng: 2.3522 }, // Default center (e.g., Paris)
    mapTypeControl: false, // Optional: disable map type controls
    streetViewControl: false, // Optional: disable street view control
    fullscreenControl: false // Optional: disable fullscreen control
  });

  // Initialize the InfoWindow once, to be reused for all markers
  infowindow = new google.maps.InfoWindow();

  // Initialize PlacesService with the map
  service = new google.maps.places.PlacesService(map);
}

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const errorMsg = document.getElementById("error-message");

  if (searchBtn) { // Safety check to ensure button exists
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      errorMsg.textContent = ""; // Clear previous error messages

      if (!city) {
        errorMsg.textContent = "Please enter a city name.";
        return;
      }

      // Check if map object exists (i.e., initMap has run)
      if (!map) {
        errorMsg.textContent = "Map not initialized. Please try again or check API key.";
        console.error("Google Map object is not initialized.");
        return;
      }

      // Use Geocoder to get coordinates for the entered city
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(13); // Zoom in closer to the city

          // Perform a Nearby Search for attractions, restaurants, and lodging
          const request = {
            location: location,
            radius: 5000, // Search within 5km radius
            type: ['tourist_attraction', 'restaurant', 'lodging'],
            // keyword: 'point of interest' // Optional: refined search
          };

          // Clear existing markers before adding new ones (if any)
          // You'd need an array to store markers to clear them properly.
          // For simplicity, we'll just add new ones for now.
          // A more robust solution would iterate through a markers array and call marker.setMap(null);

          service.nearbySearch(request, (places, searchStatus) => {
            if (searchStatus === google.maps.places.PlacesServiceStatus.OK && places && places.length > 0) {
              // Create a single InfoWindow instance to reuse for all markers
              if (!infowindow) { // Redundant check if initialized in initMap, but harmless
                infowindow = new google.maps.InfoWindow();
              }

              // Create markers for each found place
              places.forEach(place => {
                createMarker(place);
              });
            } else if (searchStatus === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              errorMsg.textContent = `No attractions, restaurants, or lodging found near ${city}.`;
            } else {
              errorMsg.textContent = `Places search failed: ${searchStatus}.`;
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

// Function to create a marker on the map for a given place
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return; // Basic check for valid location

  const marker = new google.maps.Marker({
    map: map, // Assign the marker to the global map instance
    position: place.geometry.location,
    title: place.name // Set marker title for hover/accessibility
  });

  // Add a click listener to the marker to show an InfoWindow
  marker.addListener("click", () => {
    // Set content for the InfoWindow
    infowindow.setContent(`
      <strong>${place.name}</strong><br>
      ${place.vicinity ? place.vicinity : ''}
      ${place.rating ? `<br>Rating: ${place.rating} (${place.user_ratings_total} reviews)` : ''}
    `);
    infowindow.open(map, marker); // Open the InfoWindow on the map at the marker's position
  });
}