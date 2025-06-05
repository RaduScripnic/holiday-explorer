// Global variables to store map, PlacesService, and InfoWindow instances.
// Declared globally so they can be accessed by various functions after initialization.
let map;
let service;
let infowindow;

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
  // Create a new Google Map instance and attach it to the div with id "map".
  // The map is initially centered on a default location (e.g., Paris) with a specific zoom level.
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5, // Initial zoom level (5 is good for a wide view, 13 for city level)
    center: { lat: 48.8566, lng: 2.3522 }, // Default center (Paris coordinates)
    mapTypeControl: false, // Optional: disable map type controls (e.g., Satellite, Terrain)
    streetViewControl: false, // Optional: disable Street View pegman
    fullscreenControl: false // Optional: disable fullscreen button
  });

  // Initialize the InfoWindow once. This InfoWindow will be reused for all markers.
  // This prevents multiple InfoWindow instances from being created unnecessarily.
  infowindow = new google.maps.InfoWindow();

  // Initialize the PlacesService with the map instance.
  // This service is used to find information about places within the map's viewport or near a location.
  //
  // Deprecation Note: As of March 1st, 2025, google.maps.places.PlacesService is
  // not recommended for new customers. google.maps.places.Place is the preferred
  // alternative. While PlacesService is not scheduled for discontinuation, consider
  // migrating to google.maps.places.Place for future development.
  // More info: https://developers.google.com/maps/documentation/javascript/places-migration-overview
  service = new google.maps.places.PlacesService(map);
}

/**
 * @description Attaches an event listener to the search button once the DOM is fully loaded.
 * This ensures that the button element exists before attempting to access it.
 */
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const errorMsg = document.getElementById("error-message");

  // Check if the search button exists before attaching an event listener.
  // This is a safety measure to prevent errors if the HTML element is not found.
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim(); // Get the trimmed value from the city input field
      errorMsg.textContent = ""; // Clear any previously displayed error messages

      // Validate input: If the city input is empty, display an error and stop execution.
      if (!city) {
        errorMsg.textContent = "Please enter a city name.";
        return;
      }

      // Check if the map object has been initialized by initMap().
      // If not, it means the Google Maps API might not have loaded correctly or completely.
      if (!map) {
        errorMsg.textContent = "Map not ready. Please check your internet connection or API key setup.";
        console.error("Google Map object is not initialized. 'initMap' might not have been called.");
        return;
      }

      /**
       * Attribution: This section utilizes the Google Maps Geocoding API.
       * More info: https://developers.google.com/maps/documentation/javascript/geocoding
       */
      const geocoder = new google.maps.Geocoder(); // Create a new Geocoder instance
      // Use the Geocoder service to convert a city name (address) into geographical coordinates (lat/lng).
      geocoder.geocode({ address: city }, (results, status) => {
        // Check if the geocoding request was successful and if results were returned.
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location; // Extract the geographical location (LatLng object)

          map.setCenter(location); // Center the map on the found city's coordinates
          map.setZoom(13); // Zoom in to a city-level view

          // Define the request for nearby places using the Places API.
          // We're looking for tourist attractions, restaurants, and lodging within a 5km radius.
          const request = {
            location: location, // The center point for the search
            radius: 5000, // Search radius in meters (5000m = 5km)
            type: ['tourist_attraction', 'restaurant', 'lodging'], // Types of places to search for
          };

          // Note: To clear existing markers from previous searches, you would need
          // to store them in an array and then iterate through the array, calling
          // marker.setMap(null) for each before adding new ones. For simplicity
          // in this example, new markers are simply added on top.

          /**
           * Attribution: This section utilizes the Google Maps Places API (Nearby Search).
           * More info: https://developers.google.com/maps/documentation/javascript/places
           */
          // Perform a nearby search using the PlacesService.
          service.nearbySearch(request, (places, searchStatus) => {
            // Check if the nearby search request was successful and if any places were found.
            if (searchStatus === google.maps.places.PlacesServiceStatus.OK && places && places.length > 0) {
              // Iterate over each found place and create a marker for it on the map.
              places.forEach(place => {
                createMarker(place);
              });
            } else if (searchStatus === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              // Inform the user if no places were found for the given city.
              errorMsg.textContent = `No attractions, restaurants, or lodging found near ${city}.`;
            } else {
              // Handle other potential errors from the Places service.
              errorMsg.textContent = `Places search failed: ${searchStatus}. Please try again later.`;
              console.error('Places service status:', searchStatus);
            }
          });
        } else {
          // Handle cases where the city could not be geocoded (e.g., misspelled city, non-existent place).
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
  // Basic validation: Ensure the place object has valid geometry and location data.
  if (!place.geometry || !place.geometry.location) {
    console.warn("Skipping marker creation for place with invalid location:", place);
    return;
  }

  // Create a new Google Map Marker.
  const marker = new google.maps.Marker({
    map: map, // Assign the marker to our global map instance
    position: place.geometry.location, // Position the marker at the place's coordinates
    title: place.name // Set the marker's title (appears on hover)
  });

  // Add a click event listener to the marker.
  // When the marker is clicked, an InfoWindow will open displaying details about the place.
  marker.addListener("click", () => {
    // Set the content for the InfoWindow.
    // Includes place name, vicinity (address), and optionally rating/total reviews if available.
    infowindow.setContent(`
      <strong>${place.name}</strong><br>
      ${place.vicinity ? place.vicinity : ''} <!-- Display vicinity if available -->
      ${place.rating ? `<br>Rating: ${place.rating} (${place.user_ratings_total ? place.user_ratings_total : 0} reviews)` : ''}
    `);
    // Open the InfoWindow on the map, anchored to the clicked marker.
    infowindow.open(map, marker);
  });
}
