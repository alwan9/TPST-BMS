let map;
let userLat;
let userLon;
import { produk } from "../data_list/produk.js";




function cariTPS() {
    navigator.geolocation.getCurrentPosition(async function (pos) {

        userLat = pos.coords.latitude;
        userLon = pos.coords.longitude;

        map = L.map('map').setView([userLat, userLon], 14);
        // style maps 1
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '© OpenStreetMap'
        // }).addTo(map);
        // style maps 2
        // L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        //     attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
        // }).addTo(map);
        // style maps 3
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        // style maps 4
        // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        //     subdomains: 'abcd',
        //     maxZoom: 19
        // }).addTo(map);
        // 

        L.marker([userLat, userLon])
            .addTo(map)
            .bindPopup("Lokasi Anda")
            .openPopup();

        // ambil TPS dari OSM
        await ambilTPS();

        // tambahkan TPS manual dari tps.json
        await ambilTPSManual();

    });
}

// Ambil TPS dari OSM
async function ambilTPS() {

    let query = `
[out:json];
(
  node["amenity"="waste_disposal"](around:10000,${userLat},${userLon});
  node["recycling"="container"](around:10000,${userLat},${userLon});
  node["name"~"TPS|TPA"](around:10000,${userLat},${userLon});
);
out;
`;

    let url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    let response = await fetch(url);
    let data = await response.json();

    data.elements.forEach(tps => {
        let nama = tps.tags.name || "TPS / Tempat Sampah";

        L.marker([tps.lat, tps.lon])
            .addTo(map)
            .bindPopup(`<b>${nama}</b><br><button onclick="rute(${tps.lat},${tps.lon})">Petunjuk Arah</button>`);
    });

}

// Ambil TPS manual dari tps.json
async function ambilTPSManual() {
    let response = await fetch('../tps.json');
    let tpsManual = await response.json();

    tpsManual.forEach(tps => {
        L.marker([tps.lat, tps.lon])
            .addTo(map)
            .bindPopup(`<b>${tps.name}</b><br>
                        Tipe: ${tps.type}<br>
                        <button onclick="rute(${tps.lat},${tps.lon})">Petunjuk Arah</button>`);
    });
}

// Fungsi Petunjuk Arah
function rute(lat, lon) {
    L.Routing.control({
        waypoints: [
            L.latLng(userLat, userLon),
            L.latLng(lat, lon)
        ],
        routeWhileDragging: false
    }).addTo(map);
}


// fungsi untuk meload carnnya
const container = document.getElementById("produkContainer");

produk.forEach(item => {

    const today = new Date();
    const createdDate = new Date(item.created_at);
    const diffDays = (today - createdDate) / (1000 * 60 * 60 * 24);

    const labelBaru = diffDays <= 30
        ? `<div  class="bg-orange-400 px-2 md:px-3 text-right py-1 w-[130px] text-xs md:text-sm  absolute right-0 top-0 text-zinc-50   rounded-l-lg">
         Produk Terbaru
       </div>`
        : "";

    const card = `
  <div class="bg-zinc-50 border-[1px] hover:scale-110 cursor-pointer border-zinc-200 hover:bg-zinc-100 w-full lg:rounded-2xl rounded-xl duration-150 shadow-lg px-4 py-5">
      
      <div style="background-image: url('${item.img_url}'); background-position:center; background-size:cover;" 
           class="w-full h-[200px] gradasi1 rounded-lg relative">
           
          ${labelBaru}

      </div>
 

      <h3 class=" text-lg md:text-2xl font-bold line-clamp-1 mt-2">${item.judul}</h3>
      <p class=" text-xs md:text-sm line-clamp-2 lg:line-clamp-4">${item.deskripsi.substring(0, 80)}...</p>

      <div class="md:flex justify-between mt-4">
        <p class="text-sm text-gray-500">Stok ${item.stok}</p>
        <p class="text-green-700 font-bold">Rp ${item.harga_diskon.toLocaleString()}</p>
      </div>

        <a 
              href="https://wa.me/6288888888888?text=Halo,%20saya%20ingin%20tanya%20stok%20produk%20${encodeURIComponent(item.judul)}"
              target="_blank"
              class=" mt-3 text-center  gap-1   gradasi1 text-white py-2 rounded-lg text-xs md:text-sm font-semibold duration-150 flex items-center justify-center"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
              Tanya Stok 
            </a>

  </div>
  `;

    container.innerHTML += card;
});