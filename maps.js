
let clickedClinic = false;

var map;
var markers;
var cluster;

if(google != undefined && map == undefined)
    initMap();
    
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -28.024, lng: 140.887 },
        zoom: 3
    });
}

function loadMarkers() {
    markers = [];

    var icons = {
        circuit: {
          icon: 'turistic-icon.png'
        }
      };

    Object.keys(databaseData).forEach(function (key) {

        var item = databaseData[key];

        if (item.latitude != "" && item.longitude != "") {
            var pos =
            {
                lat: item.latitude,
                lng: item.longitude
            }

            if (item.circuit == "false") {
                item.marker = new google.maps.Marker({
                    position: pos
                });
            }
            else
            {
                item.marker = new google.maps.Marker({
                    position: pos,
                    icon: "icons.circuit.icon?raw=true"
                });
            }

            item.marker.addListener('click', function () {
                if (clickedClinic == false) {
                    switchButton.classList.remove("hidden");
                    clickedClinic = true;
                    switchPanels();
                }
                if(descriptionPanel.classList.contains("hidden")) {
                    switchPanels();
                }
                zoomInMarker(item.marker);
                changeDescriptions(item);
            });

            markers.push(item.marker);
        }
    });

    // var markerCluster = new MarkerClusterer(map, markers,
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

function centerMap()
{
    map.panBy(-filterContainer.offsetWidth / 2,0);
}

function zoomInMarker(marker)
{
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(marker.position);
    map.fitBounds(bounds);
    map.setZoom(18);
    centerMap();
}

function showMarkers(markersToDisplay) {
    setMapOnAll(null);

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markersToDisplay.length; i++) {
        markersToDisplay[i].setMap(map);
        bounds.extend(markersToDisplay[i].position);
    }

    if (markersToDisplay.length > 0) {
        map.fitBounds(bounds);
        var zoom = map.getZoom();
        map.setZoom(zoom > 18 ? 18 : zoom - 1);
        centerMap();
    }


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