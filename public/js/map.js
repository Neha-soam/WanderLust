const mapElement = document.getElementById("map");

const coordinates = JSON.parse(
    mapElement.dataset.coordinates
);

const locationName = mapElement.dataset.location;
const title = mapElement.dataset.title;
console.log("TITLE:", title);
const map = L.map("map").setView(
    [coordinates[1], coordinates[0]],
    13
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.marker([coordinates[1], coordinates[0]])
    .addTo(map)
    .bindPopup(`<h3>${title}</h3><br>${locationName}`)
    .openPopup();