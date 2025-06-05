let map;
let service;
let infowindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 48.8566, lng: 2.3522 },
  });
}

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  const errorMsg = document.getElementById("error-message");
  errorMsg.textContent = "";

  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: city }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(13);

      const request = {
        location: location,
        radius: 2000,
        type: ['tourist_attraction', 'restaurant', 'lodging'],
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(place => {
            createMarker(place);
          });
        } else {
          errorMsg.textContent = "No places found.";
        }
      });
    } else {
      errorMsg.textContent = "Could not find that city. Try another.";
    }
  });
});

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    if (!infowindow) {
      infowindow = new google.maps.InfoWindow();
    }
    infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity}`);
    infowindow.open(map, marker);
  });
}