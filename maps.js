
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
                    icon: "https://github.com/robertojrdev/excel-atlas/blob/master/turisticicon.png?raw=true"
                });
            }

            item.marker.addListener('click', function () {
                if (clickedClinic == false) {
                    switchButton.classList.remove("hidden");
                    clickedClinic = true;
                    openClinicDescription();
                }
                if(descriptionPanel.classList.contains("hidden")) {
                    openClinicDescription();
                }
                zoomInMarker(item.marker);
                changeDescriptions(item);
            });

            const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
            "sandstone rock formation in the southern part of the " +
            "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
            "south west of the nearest large town, Alice Springs; 450&#160;km " +
            "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
            "features of the Uluru - Kata Tjuta National Park. Uluru is " +
            "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
            "Aboriginal people of the area. It has many springs, waterholes, " +
            "rock caves and ancient paintings. Uluru is listed as a World " +
            "Heritage Site.</p>" +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
            "(last visited June 22, 2009).</p>" +
            "</div>" +
            "</div>";
        
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });

            item.marker.addListener('mouseover', function() {
                infowindow.open(map, item.marker);
            });

            item.marker.addListener('mouseout', function() {
                infowindow.close();
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