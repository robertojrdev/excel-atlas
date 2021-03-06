
let clickedClinic = false;

var map;
var markers;
var cluster;
var closeInfoWindowWithTimeout;

if (google != undefined && map == undefined)
    initMap();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -28.024, lng: 140.887 },
        zoom: 3
    });
}

function loadMarkers() {
    markers = [];
    const infowindow = new google.maps.InfoWindow();

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
            else {
                let color = item.pincolor;
                let iconString = "https://github.com/robertojrdev/excel-atlas/blob/master/icons/" + color + ".png?raw=true";
                item.marker = new google.maps.Marker({
                    position: pos,
                    icon: iconString
                });
            }

            item.marker.addListener('click', function () {
                if (clickedClinic == false) {
                    switchButton.classList.remove("hidden");
                    clickedClinic = true;
                    openClinicDescription();
                }
                if (descriptionPanel.classList.contains("hidden")) {
                    openClinicDescription();
                }
                zoomInMarker(item.marker);
                changeDescriptions(item);
            });

            AddInfoWindowToMarker(item.marker, item, infowindow);

            markers.push(item.marker);
        }
    });

    // var markerCluster = new MarkerClusterer(map, markers,
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

function AddInfoWindowToMarker(marker, clinic, infowindow) {
    const pattern = 
        '<div class="description-block" id="infoWindowElement" style="padding: 0px">' +
            '<h4 class="clinic-name" style="padding-top: 0px">{0}</h4>' +
            '<div class="info-item">' +
                '<i class="fas fa-globe-americas"></i>' +
                '<a id="clinic-website" href="">{1}</a>' +
            '</div>' +
            '<div class="info-item">' +
                '<i class="fas fa-phone-alt"></i>' +
                '<p id="clinic-phone">{2}</p>' +
            '</div>' +
            '<div class="info-item">' +
                '<i class="fas fa-map-marker-alt"></i>' +
                '<p id="clinic-address">{3}</p>' +
            ' </div>' +
        ' </div>'
        ;

    var name = clinic.name;
    var website = clinic.website;
    var phone = clinic.contacts;
    var address = clinic.address;

    const contentString = pattern.
        replace("{0}", name).
        replace("{1}", website).
        replace("{2}", phone).
        replace("{3}", address);

    marker.addListener('mouseover', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });

    marker.addListener('mouseout', function() {
        infowindow.close();
    });

    // marker.addListener('mouseout', function() {
    //     closeInfoWindowWithTimeout = setTimeout(() => infowindow.close(), 250);
    // });
}

function centerMap() {
    map.panBy(-filterContainer.offsetWidth / 2, 0);
}

function zoomInMarker(marker) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(marker.position);
    map.setCenter(marker.position);
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