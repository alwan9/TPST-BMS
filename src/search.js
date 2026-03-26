import { produk } from "../data_list/produk.js";

const container = document.getElementById("produkContainer");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filterBtn");

let kategoriAktif = "all";
function renderProduk() {
    container.innerHTML = "";

    const keyword = searchInput.value.toLowerCase();

    const hasil = produk.filter(item => {
        const cocokKategori =
            kategoriAktif === "all" || item.kategori === kategoriAktif;

        const cocokSearch =
            item.judul.toLowerCase().includes(keyword);

        return cocokKategori && cocokSearch;
    });

    if (hasil.length === 0) {
        container.innerHTML = `
            <p class="col-span-full text-center text-gray-500">
                Produk tidak ditemukan
            </p>
        `;
        return;
    }

    hasil.forEach(item => {
        container.innerHTML += `
        <div class="bg-white p-4 rounded-xl hover:scale-110 cursor-pointer shadow-lg transition h-[380px] md:h-[390px]">
            <img src="./${item.img_url}" class="w-full h-40 object-cover rounded-lg">

            <div class="flex items-center gap-3 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-zinc-400" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c3.31 0 6 2.66 6 5.95C18 12.41 12 19 12 19S6 12.41 6 7.95C6 4.66 8.69 2 12 2m0 4a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m8 13c0 2.21-3.58 4-8 4s-8-1.79-8-4c0-1.29 1.22-2.44 3.11-3.17l.64.91C6.67 17.19 6 17.81 6 18.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5c0-.69-.67-1.31-1.75-1.76l.64-.91C18.78 16.56 20 17.71 20 19"/></svg>
            <p class="text-sm text-gray-500">${item.lokasi}</p>
            </div>

            <h2 class="mt-2 font-semibold text-sm md:text-lg line-clamp-2 h-[50px] md:h-[55px] lg:h-[60px]">${item.judul}</h2>

            <div class="mt-2">
                ${item.harga_diskon
                ? `
                        <span class="text-red-600 font-bold">
                            Rp${item.harga_diskon.toLocaleString()}
                        </span>
                        <span class="line-through text-gray-400 ml-2 text-sm">
                            Rp${item.harga_normal.toLocaleString()}
                        </span>
                    `
                : `
                        <span class="font-bold">
                            Rp${item.harga_normal.toLocaleString()}
                        </span>
                    `
            }
            </div>

            <p class="text-xs text-green-600 mt-1 capitalize">
                ${item.kategori}
            </p>

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
    });
}

searchInput.addEventListener("input", renderProduk);

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        kategoriAktif = btn.dataset.kategori;

        filterBtns.forEach(b => {
            b.classList.remove("bg-green-600", "text-white");
            b.classList.add("bg-gray-200");
        });

        btn.classList.add("bg-green-600", "text-white");
        btn.classList.remove("bg-gray-200");

        renderProduk();
    });
});

renderProduk();