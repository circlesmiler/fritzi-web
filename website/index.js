const endpoint = 'proxy.php';

const homeIcon = L.icon({
    iconUrl: 'home.png',
    iconSize: [50, 50],
});

const catIcon = L.icon({
    iconUrl: 'cat.png',
    iconSize: [50, 50],
});

let homeMarker;
let catMarker;

function createMap() {
    // Creating map options
    const mapOptions = {
        center: [53.839425, 11.993049],
        zoom: 18
    }

    // Creating a map object
    const map = new L.map('map', mapOptions);

    homeMarker = L.marker([53.839425, 11.993049],
        {
            title: 'Home',
            icon: homeIcon
        })
        .addTo(map);


    // Creating a Layer object
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Adding layer to the map
    map.addLayer(layer);
    return map;
}

function update(map) {
    $.getJSON(endpoint, function (data) {
        console.info(data);
        $("#distance").text(data.distance);
        $("#isHome").text(data.isHome);
        $("#latlong").text(data.latlong);

        if (catMarker != null) {
            map.removeLayer(catMarker);
        }
        catMarker = L.marker(data.latlong,
            {
                title: 'Fritzi',
                icon: catIcon
            })
            .addTo(map);

        const group = new L.featureGroup([homeMarker, catMarker]);
        map.fitBounds(group.getBounds(), {padding: L.point(30,30)});
    });
}