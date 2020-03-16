// initMap();

let clickedClinic = false;

var map;
var markers;
var cluster;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -28.024, lng: 140.887 },
        zoom: 3
    });
}

function loadMarkers() {
    markers = [];

    Object.keys(databaseData).forEach(function (key) {

        var item = databaseData[key];

        if (item.latitude != "" && item.longitude != "") {
            var pos =
            {
                lat: item.latitude,
                lng: item.longitude
            }

            item.marker = new google.maps.Marker({
                position: pos
            });

            item.marker.addListener('click', function () {
                if (clickedClinic == false) {
                    switchButton.classList.remove("hidden");
                    clickedClinic = true;
                    switchPanels();
                }
                changeDescriptions(item);
            });

            markers.push(item.marker);
        }
    });

    // var markerCluster = new MarkerClusterer(map, markers,
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

function showMarkers(markersToDisplay) {
    setMapOnAll(null);

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markersToDisplay.length; i++) {
        markersToDisplay[i].setMap(map);
        bounds.extend(markersToDisplay[i].position);
    }
    map.fitBounds(bounds);


    if (cluster == undefined) {
        cluster = new MarkerClusterer(map, markersToDisplay,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    }
    else {
        cluster.clearMarkers();
        cluster.addMarkers(markersToDisplay);
    }

}


function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}