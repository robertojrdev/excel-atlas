let clickedClinic = false;

var map;
var markers;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -28.024, lng: 140.887 },
        zoom: 3
    });

    // loadMarkers();
}

function loadMarkers() {
    markers = [];

    Object.keys(databaseData).forEach(function (key) {

        var item = databaseData[key];

        if (item.Latitude != "" && item.Longitude != "") {
            var pos =
            {
                lat: item.Latitude,
                lng: item.Longitude
            }

            item.marker = new google.maps.Marker({
                position: pos
            });

            markers.push(item.marker);
        }
    });

    // var markerCluster = new MarkerClusterer(map, markers,
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

function showMarkers(markersToDisplay) {
    setMapOnAll(null);

    for (var i = 0; i < markersToDisplay.length; i++) {
        markersToDisplay[i].setMap(map);
    }
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}