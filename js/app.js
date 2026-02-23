/*
کورس و بیرینگ
محاسبه زمان رسیدن به مقصد
اطلاعات فرودگاه ها
کد مورس
*/
import { waypoints_coord, DUB_SHI, TEH_LON, TEH_RSH, TEH_DUB, TEH_CLN, MIA_DUB, MSH_DUB, TEH_KSH, TEH_NJF, TEH_SHZ, IST_TEH
    , TEH_BND, MOS_TEH, TEH_SRY, test} from './routes.js'
var my_path = TEH_LON;
import { NDB, VORDME, TACAN, VORTAC } from './NAVaids.js'

// Initialize the map
var googleTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
});
var googleNolabel = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
});
var openStreetMapTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    //attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

// initialize Iran's Airports
var airports_coord = [
    { name: 'Imam', IATA: 'IKA', ICAO: 'OIIE', Lat: 35.4, Long: 51.15 },
    { name: 'Mehrabad', IATA: 'THR', ICAO: 'OIII', Lat: 35.6891, Long: 51.3136 },
    { name: 'Abadan', IATA: 'ABD', ICAO: 'OIAA', Lat: 30.37, Long: 48.217 },
    { name: 'Isfahan', IATA: 'IFN', ICAO: 'OIFM', Lat: 32.75, Long: 51.85 },
    { name: 'Kish', IATA: 'KIH', ICAO: 'OIBK', Lat: 26.527, Long: 53.965 },
    { name: 'Mashhad', IATA: 'MHD', ICAO: 'OIMM', Lat: 36.23, Long: 59.63 },
    { name: 'Ardabil', IATA: 'ADU', ICAO: 'OITL', Lat: 38.3255, Long: 48.4241 },
    { name: 'BandarAbbas', IATA: 'BND', ICAO: 'OIKB', Lat: 27.218, Long: 56.3777 },
    { name: 'Birjand', IATA: 'XBJ', ICAO: 'OIMB', Lat: 32.8925, Long: 59.2833 },
    { name: 'Chabahar', IATA: 'ZBR', ICAO: 'OIZC', Lat: 25.4433, Long: 60.3819 },
    { name: 'Gorgan', IATA: 'GBT', ICAO: 'OING', Lat: 36.9094, Long: 54.4013 },
    { name: 'Hamadan', IATA: 'HDM', ICAO: 'OIHH', Lat: 34.8691, Long: 48.5525 },
    { name: 'Khorramabad', IATA: 'KHD', ICAO: 'OICK', Lat: 33.4358, Long: 48.2816 },
    { name: 'Qeshm', IATA: 'GSM', ICAO: 'OIKQ', Lat: 26.754639, Long: 55.902353 },
    { name: 'Shahrekord', IATA: 'CQD', ICAO: 'OIFS', Lat: 32.29722, Long: 50.8422 },
    { name: 'Shiraz', IATA: 'SYZ', ICAO: 'OISS', Lat: 29.5391, Long: 52.59 },
    { name: 'Tabriz', IATA: 'TBZ', ICAO: 'OITT', Lat: 38.1338, Long: 46.235 },
    { name: 'Sari', IATA: 'SRY', ICAO: 'OINZ', Lat: 36.6358, Long: 53.1936 }

];

//Function to convert coordinates to markers on map
function add_coord(iconUrl, size, coordinates_array) {
    var icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [size, size]
    });
    var markers = []
    coordinates_array.forEach(function (coord) {
        var marker = L.marker([coord.Lat, coord.Long], { icon: icon })
        if (coord.code) {
            marker.bindPopup(`<b>${coord.type}<br>${coord.name}(${coord.code})</b><br>Lat: ${coord.Lat.toFixed(2)}<br>Long:${coord.Long.toFixed(2)}`);
        } else {
            marker.bindPopup(`<b>${coord.name}(${coord.ICAO}/${coord.IATA})</b><br>Lat:${coord.Lat.toFixed(2)}<br>Long:${coord.Long.toFixed(2)}`);
        }
        markers.push(marker);
    });
    return markers
}

//icons paths
var wp_icon = 'https://static.thenounproject.com/png/326449-200.png';
var ap_icon = 'https://cdn-icons-png.flaticon.com/512/9/9771.png';

// Create and add markers to the map add_coord(icon path, icon size, coordinates)
var wp_markers = L.layerGroup(add_coord('/icon/wp.png', 20, waypoints_coord));
var ap_markers = L.layerGroup(add_coord('/icon/ap.png', 30, airports_coord));
var NDB_markers = L.layerGroup(add_coord('/icon/NDB.svg', 20, NDB));
var VORDME_markers = L.layerGroup(add_coord('/icon/VORDME.svg', 20, VORDME));
var TACAN_markers = L.layerGroup(add_coord('/icon/TACAN.svg', 20, TACAN));
var VORTAC_markers = L.layerGroup(add_coord('/icon/VORTAC.svg', 20, VORTAC));

var overlays = [VORTAC_markers, TACAN_markers, VORDME_markers, NDB_markers, ap_markers];

// ***** defining the map *****
var map = L.map('map', {
    center: [my_path[1].lat, my_path[1].long],
    zoom: 15,
    layers: [googleTileLayer]
});

var baseMaps = {
    "GoogleMap": googleTileLayer,
    "OpenStreetMap": openStreetMapTileLayer,
    "openTopoMap": openTopoMap
};

var overlayMaps = {
    "WayPoints": wp_markers,
    "Airports": ap_markers,
    "NDBs": NDB_markers,
    "VOR/DMEs": VORDME_markers,
    "TACANs": TACAN_markers,
    "VORTACs": VORTAC_markers
};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

var minZoomToShow = 6;
map.on('zoomend', function () {
    var currentZoom = map.getZoom();
    overlays.forEach(function (overlay) {
        if (currentZoom < minZoomToShow) {
            if (map.hasLayer(overlay) && overlay) {
                map.removeLayer(overlay);  // Hide the overlay
            }
        }
    });
});
// add a scale to map
L.control.scale().addTo(map);
var scales = [0.01, 0.02, 0.03, 0.05, 0.1, 0.3, 0.5, 1, 3, 5, 10, 20, 30, 50, 100, 300, 500, 1000, 3000, 5000, 10000];
scales.reverse();

// paths which their altitude is in ft e-3
var special_paths = [DUB_SHI, TEH_LON, TEH_RSH, TEH_DUB, TEH_CLN, MIA_DUB, MSH_DUB, TEH_KSH, TEH_NJF];
special_paths.forEach(path => {
    path.forEach(item => {
        item.altitude *= 1000;
    });
});

// **** on map click popups ****
var popup = L.popup();
function onMapClick(e) {
    var lat = e.latlng.lat.toFixed(2);
    var lng = e.latlng.lng.toFixed(2);
    var content = `${lat} ${lng}`;
    popup
        .setLatLng(e.latlng)
        .setContent(content)
        .openOn(map);
}
// enabling popup
map.on('click', onMapClick);

// **** add comapss using html file ****
// fetch('compass.html')
//     .then(response => response.text())
//     .then(html => {
//         document.getElementById('compass-container').innerHTML = html;
//         var script = document.createElement('script');
//         script.src = './js/compass.js';
//         document.body.appendChild(script);
//     });

// fetch('./assets/components/compass.html') // آدرس را با جای واقعی فایل تنظیم کنید
//     .then(response => response.text())
//     .then(html => {
//         document.getElementById('compass-container').innerHTML = html;
//     });
// function setCompassDirection(angle) {
//     var arrow = document.getElementById('compass-arrow');
//     arrow.style.transform = 'rotate(' + angle + 'deg)';
// }

// Create a custom icon for the airplane marker
var airplaneIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Plane_icon.svg/238px-Plane_icon.svg.png',
    iconSize: [25, 25],
    iconAnchor: [5, 5],
});
var myairplane = L.icon({
    iconUrl: '../assets/icons/plane.png',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/723/723955.png',
    iconSize: [35, 35],
    iconAnchor: [10, 10],
});

var DUB_SHI_marker = L.marker([DUB_SHI[1].lat, DUB_SHI[1].long], { icon: airplaneIcon });
var TEH_LON_marker = L.marker([TEH_LON[1].lat, TEH_LON[1].long], { icon: airplaneIcon });
var TEH_RSH_marker = L.marker([TEH_RSH[1].lat, TEH_RSH[1].long], { icon: airplaneIcon });
var TEH_DUB_marker = L.marker([TEH_DUB[1].lat, TEH_DUB[1].long], { icon: airplaneIcon });
var MSH_DUB_marker = L.marker([MSH_DUB[1].lat, MSH_DUB[1].long], { icon: airplaneIcon });
var TEH_CLN_marker = L.marker([TEH_CLN[1].lat, TEH_CLN[1].long], { icon: airplaneIcon });
var MIA_DUB_marker = L.marker([MIA_DUB[1].lat, MIA_DUB[1].long], { icon: airplaneIcon });
var TEH_NJF_marker = L.marker([TEH_NJF[1].lat, TEH_NJF[1].long], { icon: airplaneIcon });
var TEH_SHZ_marker = L.marker([TEH_SHZ[1].lat, TEH_SHZ[1].long], { icon: airplaneIcon });
var IST_TEH_marker = L.marker([IST_TEH[1].lat, IST_TEH[1].long], { icon: airplaneIcon });
var TEH_BND_marker = L.marker([TEH_BND[1].lat, TEH_BND[1].long], { icon: airplaneIcon });
var MOS_TEH_marker = L.marker([MOS_TEH[1].lat, MOS_TEH[1].long], { icon: airplaneIcon });
var TEH_SRY_marker = L.marker([TEH_SRY[1].lat, TEH_SRY[1].long], { icon: airplaneIcon });
var test_marker = L.marker([test[1].lat, test[1].long], { icon: airplaneIcon });
/*var other_aircraft_markers = [TEH_SHZ_marker,TEH_NJF_marker,MIA_DUB_marker,TEH_CLN_marker,MSH_DUB_marker,TEH_DUB_marker,TEH_RSH_marker,TEH_LON_marker,
    DUB_SHI_marker, IST_TEH_marker, TEH_BND_marker, MOS_TEH_marker, TEH_SRY_marker
];*/
var mymarker = L.marker([my_path[1].lat, my_path[1].long], { icon: myairplane });

// Function to calculate the distance between two lat/long points. the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // Earth's radius in meters
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function calculateBearing(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) {
        //console.log("The points are identical, bearing is undefined. Returning 0.");
        return 0; // Return 0 or any suitable value for identical points
    }
    // Convert latitudes and longitudes from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Calculate the difference in longitudes
    const deltaLon = lon2Rad - lon1Rad;

    // Apply the formula to calculate the bearing
    const y = Math.sin(deltaLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
        Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLon);
    let bearing = Math.atan2(y, x);
    if (Math.abs(x) < 1e-12 && Math.abs(y) < 1e-12) {
        //console.log("Calculation precision issue. Returning 0.");
        return 0;
    }

    // Convert the bearing from radians to degrees
    bearing = (toDegrees(bearing) + 360) % 360;
    if (isNaN(bearing)) {
        bearing = 0;
    }
    // Normalize the bearing to a range of 0° to 360°
    return bearing;
}
var duration_factor = 1;
function decrease_duration() {
    if (duration_factor < 128) duration_factor *= 2;
}
function increase_duration() {
    if (duration_factor > 1) duration_factor /= 2;
}
// Function to interpolate between two coordinates
function interpolate(from, to, factor) {
    return from + (to - from) * factor;
}
function interpolate_angle(from, to, factor) {
    var delta = to - from;
    if (delta > 180) {
        delta -= 360;
    }
    return from + (delta) * factor;
}
// flight inforamtion container
const inform_container = document.getElementById('inform_container');

var live_index;
var live_lat;
var live_long;
var live_altitude;

//  ******   Function to move markers   ******
function moveMarker(index, marker, path) {
    if (index >= path.length - 1 && marker != mymarker) map.removeLayer(marker);
    if (index >= path.length - 1) return;

    var start = path[index];
    var end = path[index + 1];

    var distance = calculateDistance(start.lat, start.long, end.lat, end.long);
    var avg_speed = (start.speed + end.speed) / 2 * 0.51444444;
    var duration = avg_speed === 0
        ? 8000 / duration_factor
        : (distance / avg_speed) * 1000;

    document.getElementById("animation-speed").innerText = `${duration_factor}x`;

    // *** پیش‌محاسبه خارج از حلقه انیمیشن ***
    var isMyPath = (path === my_path);
    var precomputed = {};
    if (isMyPath) {
        var coordinates = path.slice(1).map(p => [p.lat, p.long]);
        var total_dist = path_length(coordinates, path.length - 1) * 0.54;
        var mileage = index > 2 ? path_length(coordinates, index) * 0.54 : 0;
        precomputed = { total_dist, mileage };
    }

    // *** اضافه کردن marker یک‌بار قبل از حلقه ***
    marker.addTo(map);

    var startTime = performance.now();
    var compassUpdated = false; // جلوگیری از setTimeout تکراری

    function animate(time) {
        var elapsed = time - startTime;
        var factor = duration === 0 ? 1 : Math.min(elapsed / duration * duration_factor, 1);
        var angle_factor = Math.min(elapsed / 2000, 1);

        var lat = interpolate(start.lat, end.lat, factor);
        var lng = interpolate(start.long, end.long, factor);
        var angle = interpolate_angle(start.track, end.track, angle_factor);

        marker.setLatLng([lat, lng]);
        marker.setRotationAngle(angle + 60);

        // *** follow map ***
        if (follow === 1 && marker === mymarker) {
            map.setView([lat, lng], map.getZoom(), { animate: false }); // animate:false سبک‌تر
        }

        // *** بروزرسانی اطلاعات my_path فقط هر 200ms ***
        if (isMyPath) {
            if (!compassUpdated) {
                setCompassDirection(start.track);
                compassUpdated = true;
            }

            var toDest = precomputed.total_dist - precomputed.mileage;
            // فقط هر 10 فریم یه‌بار DOM رو آپدیت کن
            if (!animate._frameCount) animate._frameCount = 0;
            animate._frameCount++;
            if (animate._frameCount % 10 === 0) {
                inform_container.innerHTML = `<br><br><br><br><br><br><br>
                    -track: ${angle.toFixed(0)}° <br><br>
                    -GS: ${start.speed} kts<br><br>
                    -Alt: ${start.altitude} ft <br><br>
                    -next WP: - - - <br><br>
                    -Mileage: ${precomputed.mileage.toFixed(0)} nm <br><br>
                    -ToDest: ${toDest.toFixed(0)} nm <br><br>`;
            }

            live_lat = start.lat;
            live_long = start.long;
            live_altitude = start.altitude;
            live_index = index;
        }

        // *** حذف marker دیگران اگر غیرفعال ***
        if (other_aircraft === 0 && marker != mymarker) {
            map.removeLayer(marker);
            return;
        }

        if (factor < 1) {
            requestAnimationFrame(animate);
        } else {
            moveMarker(index + 1, marker, path);
        }
    }

    requestAnimationFrame(animate);

    // *** حذف event listener قبلی قبل از اضافه کردن جدید ***
    marker.off('click');
    marker.on('click', function () {
        map.eachLayer(function (layer) {
            if (layer instanceof L.Polyline && layer != mypolyline) {
                map.removeLayer(layer);
            }
        });

        var polylinePoints = path.slice(1).map(p => [p.lat, p.long]);
        L.polyline(polylinePoints, { color: '#107791' }).addTo(map);

        var popup = document.getElementById('custom-popup');
        popup.style.display = 'block';
        popup.innerHTML = `<div>Route: ${path[0].title}<br>
            ${path[0].airport_codes} - type: ${path[0].aircraft_type}<br>
            track: ${start.track}° - spd: ${start.speed} kts<br>
            alt: ${start.altitude}ft</div>`;
        setTimeout(() => popup.style.display = 'none', 8000);
    });

    // *** map click فقط یه‌بار باید ثبت بشه، نه اینجا ***
}

// *** این رو فقط یه‌بار خارج از moveMarker تعریف کن ***
map.off('click');
map.on('click', function () {
    document.getElementById('custom-popup').style.display = 'none';
    map.eachLayer(function (layer) {
        if (layer instanceof L.Polyline && layer != mypolyline) {
            map.removeLayer(layer);
        }
    });
});


// function to calc of total distance of a path from beginning to given index
function path_length(path, index) {
    var shorted_path = path.slice(0, index);
    var polylinePoints = shorted_path.map(function (point) {
        return [point[1], point[0]];
    });
    var line = turf.lineString(polylinePoints);
    var length = turf.length(line, { units: 'kilometers' });
    return length;
}

// function for generate uniformpoints in a path
function homo_points() {
    var polylinePoints = my_path.slice(live_index).map(function (point) {
        return [point.lat, point.long];
    });
    var line = turf.lineString(polylinePoints);
    var distance = 2; //in km
    // Calculate total length of the polyline
    var length = turf.length(line, { units: 'kilometers' });
    // Create an array to hold the uniformly spaced points
    var uniformPoints = [];
    // Generate points at regular intervals along the polyline
    for (var i = 0; i <= length; i += distance) {
        var point = turf.along(line, i, { units: 'kilometers' }); // Create a point at the given distance
        uniformPoints.push([point.geometry.coordinates[1], point.geometry.coordinates[0]]); // Latitude first
    }
    return uniformPoints;
}

// ****** TAWS (Terrain Awareness and Warning System) ******
var taws_markers = [];
function TAWS() {
    // remove previous markers
    taws_markers.forEach(function (marker) {
        if (map.hasLayer(marker)) {
            map.removeLayer(marker);
        }
    });
    var path = homo_points();

    for (let i = 1; i < path.length; i += 2) {
        if (i > 10) {
            if (path_length(path, i) > 100) {
                break;
            } // for next x km
        }
        fetch(`https://api.open-meteo.com/v1/elevation?latitude=${path[i][1]}&longitude=${path[i][0]}`)
            .then(response => response.json())
            .then(data => {
                const elevation = data.elevation[0] * 3.28084;  // elevation value to feet
                //console.log(`Elevation at (lat: ${path[i][1]}, lon: ${path[i][0]}) is ${elevation} ft.`);
                let color = getColor(elevation, live_altitude);
                var taws_marker = L.circle([path[i][1], path[i][0]], {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.7,
                    radius: 2000 //  km radius for visibility
                }).addTo(map);
                taws_markers.push(taws_marker);
            })
            .catch(error => {
                console.error(`Error fetching elevation data for (lat: ${path[i][1]}, lon: ${path[i][0].long}):`, error);
            });
    };
}
// Function to determine color based on elevation
function getColor(elevation, altitude) {
    return elevation >= altitude - 100 ? '#d41d13' :
        elevation > altitude - 1000 ? '#FFBF00' :
            elevation < altitude - 1000 ? '#22c730' :
                elevation < 50 ? '#blue' :
                    '#22c730';
}


// ****** rain Radar ********

var apiData = {};
var mapFrames = [];
var radarLayers = [];
var animationPosition = 0;
var animationTimer = false;

// Fetch weather map data from RainViewer
var apiRequest = new XMLHttpRequest();
apiRequest.open("GET", "https://api.rainviewer.com/public/weather-maps.json", true);
apiRequest.onload = function (e) {
    apiData = JSON.parse(apiRequest.response);
    initialize(apiData);
};
apiRequest.send();

function initialize(api) {
    mapFrames = api.radar.nowcast; // Only use forecast frames
    radarLayers = [];
    animationPosition = 0;

    showFrame(animationPosition, true); // Show the first forecast frame
}

function addLayer(frame) {
    if (!radarLayers[frame.path]) {
        var source = new L.TileLayer(apiData.host + frame.path + '/256/{z}/{x}/{y}/2/1_1.png', {
            tileSize: 256,
            opacity: 0.01, // Start with low opacity
            zIndex: frame.time
        });

        radarLayers[frame.path] = source;
    }
    if (!map.hasLayer(radarLayers[frame.path])) {
        map.addLayer(radarLayers[frame.path]);
    }
}

function changeRadarPosition(position, preloadOnly) {
    var currentFrame = mapFrames[animationPosition];
    var nextFrame = mapFrames[position];

    addLayer(nextFrame);

    if (preloadOnly) return;

    animationPosition = position;

    if (radarLayers[currentFrame.path]) {
        radarLayers[currentFrame.path].setOpacity(0);
    }
    radarLayers[nextFrame.path].setOpacity(1); // Show the next frame

    // Update the timestamp display
    var frameTime = new Date(nextFrame.time * 1000); // Convert Unix timestamp to JavaScript Date
    document.getElementById("timestamp").innerHTML = 'Time: ' + frameTime.toLocaleString(); // Format as local time
}


function showFrame(nextPosition, force) {
    while (nextPosition >= mapFrames.length) {
        nextPosition -= mapFrames.length;
    }
    while (nextPosition < 0) {
        nextPosition += mapFrames.length;
    }

    changeRadarPosition(nextPosition, false);
}

function play() {
    showFrame(animationPosition + 1);
    animationTimer = setTimeout(play, 500); // Repeat every 500ms
}

function stop() {
    if (animationTimer) {
        clearTimeout(animationTimer);
        animationTimer = false;
        return true;
    }
    return false;
}

function playStop() {
    if (!stop()) {
        play();
    }
}

// ****** functionality for buttons ******
var taws_active = 0;
let intervalId;
var taws_button = document.getElementById('button-bottom-right');
taws_button.onclick = function () {
    if (taws_active == 0) {
        TAWS();
        intervalId = setInterval(() => { TAWS(); }, 10e3); // update taws
        taws_button.style.color = 'orange';
        taws_active = 1;
    } else {
        taws_markers.forEach(function (marker) {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        });
        clearInterval(intervalId);
        taws_button.style.color = 'white';
        taws_active = 0;
    }
};

document.getElementById('button-top-right').onclick = function () {
    if (map.hasLayer(googleTileLayer)) {
        map.removeLayer(googleTileLayer);
        map.addLayer(googleNolabel);
    } else {
        map.removeLayer(googleNolabel);
        map.addLayer(googleTileLayer);
    }
};

var follow = 0;
var follow_button = document.getElementById('button-top-left')
follow_button.onclick = function () {
    if (follow === 0) {
        follow = 1;
        follow_button.style.color = 'orange';
    } else {
        follow = 0;
        follow_button.style.color = 'white';
    }
};

// show route button
var route_showhide = 0;
let justpath = my_path.slice(1); //remove first element
var polylinePoints = justpath.map(function (point) {
    return [point.lat, point.long];
});
var mypolyline = L.polyline(polylinePoints, { color: `rgb(60, 6, 77)` });
document.getElementById('button-center-right').onclick = function () {
    if (route_showhide === 0) {
        mypolyline.addTo(map);
        route_showhide = 1;

    } else {
        mypolyline.remove();
        route_showhide = 0;
    }
};

// VOR/DME
var VOR_button = document.getElementById('button-vor')
VOR_button.onclick = function () {
    if (map.hasLayer(VORDME_markers)) {
        map.removeLayer(VORDME_markers);
        VOR_button.style.color = 'white';
    } else {
        map.addLayer(VORDME_markers);
        VOR_button.style.color = 'orange';
    }
};
// VORTAC
var VORTAC_button = document.getElementById('button-vortac')
VORTAC_button.onclick = function () {
    if (map.hasLayer(VORTAC_markers)) {
        map.removeLayer(VORTAC_markers);
        VORTAC_button.style.color = 'white';

    } else {
        map.addLayer(VORTAC_markers);
        VORTAC_button.style.color = 'orange';
    }
};
// TACAN
var TACAN_button = document.getElementById('button-tacan')
TACAN_button.onclick = function () {
    if (map.hasLayer(TACAN_markers)) {
        map.removeLayer(TACAN_markers);
        TACAN_button.style.color = 'white';

    } else {
        map.addLayer(TACAN_markers);
        TACAN_button.style.color = 'orange';
    }
};
// NDB
var NDB_button = document.getElementById('button-ndb')
NDB_button.onclick = function () {
    if (map.hasLayer(NDB_markers)) {
        map.removeLayer(NDB_markers);
        NDB_button.style.color = 'white';

    } else {
        map.addLayer(NDB_markers);
        NDB_button.style.color = 'orange';
    }
};

var decrease_duration_button = document.getElementById('button-decrease-duration')
decrease_duration_button.onclick = function () {
    decrease_duration();
}
var increase_duration_button = document.getElementById('button-increase-duration')
increase_duration_button.onclick = function () {
    increase_duration();
}

var other_aircraft = 1;
var other_aircraft_button = document.getElementById('button-bottom-left')
other_aircraft_button.style.color = 'orange'
other_aircraft_button.onclick = function () {
    if (other_aircraft == 1) {
        other_aircraft = 0;
        other_aircraft_button.style.color = 'white'
    }
    else {
        other_aircraft = 1;
        other_aircraft_button.style.color = 'orange'
    }
}
// zoom
var zoom = 'rw';
var zoom_button = document.getElementById('button-center-left')
zoom_button.onclick = function () {
    if (zoom == 'rw') {
        map.setView([live_lat, live_long], 11, { animate: true });
        zoom_button.innerHTML = 'airborne'
        zoom = 'ab'
    } else {
        map.setView([live_lat, live_long], 15, { animate: true });
        zoom_button.innerHTML = 'runway'
        zoom = 'rw'
    }
}

//document.getElementById('setMarkersButton').addEventListener('click', setMarkersAndTrajectory);
var timestamp = document.getElementById("timestamp");
timestamp.style.display = "none";

var weather_button = document.getElementById('weathrBtn')
weather_button.onclick = function (){
    playStop();
    
    if (timestamp.style.display === "none") {
        timestamp.style.display = "block";
        weather_button.style.color = 'orange';
    }else {
        timestamp.style.display = "none" 
        for (var path in radarLayers) {
            if (map.hasLayer(radarLayers[path])) {
                map.removeLayer(radarLayers[path]);
            }
        }
        weather_button.style.color = 'white';
    }
}
// Start moving the marker
moveMarker(1, mymarker, my_path);
//moveMarker(1, TEH_LON_marker, TEH_LON);
moveMarker(1, MIA_DUB_marker, MIA_DUB);
moveMarker(1, MSH_DUB_marker, MSH_DUB);
moveMarker(1, TEH_DUB_marker, TEH_DUB);
setTimeout(() => moveMarker(1, TEH_NJF_marker, TEH_NJF), 500e3 / duration_factor);
setTimeout(() => moveMarker(1, TEH_CLN_marker, TEH_CLN), 300e3 / duration_factor);
//setTimeout(() => moveMarker(1, IST_TEH_marker, IST_TEH), 0 / duration_factor);
setTimeout(() => moveMarker(1, MOS_TEH_marker, MOS_TEH), 0 / duration_factor);
setTimeout(() => moveMarker(1, DUB_SHI_marker, DUB_SHI), 0);
setTimeout(() => moveMarker(1, TEH_SHZ_marker, TEH_SHZ), 10e3 / duration_factor);
setTimeout(() => moveMarker(1, TEH_BND_marker, TEH_BND), 500e3 / duration_factor);
setTimeout(() => moveMarker(1, TEH_SRY_marker, TEH_SRY), 200e3 / duration_factor);
//setTimeout(() => moveMarker(1, TEH_RSH_marker, TEH_RSH), 0); 