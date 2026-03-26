const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const navbar = document.getElementById('mainNavbar');

// 1. Toggle Menu Full Screen
menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open'); // Mencegah scrolling
    
    // Animasi Ikon & Warna Teks Tombol (agar terlihat saat BG putih)
    menuIcon.style.transition = "transform 0.4s ease, color 0.3s";
    
    if (isOpen) {
        menuIcon.style.transform = "rotate(90deg)";
        menuIcon.classList.add('text-gray-800'); // Supaya kelihatan di BG putih
        setTimeout(() => { menuIcon.innerText = '✕'; }, 100);
    } else {
        menuIcon.style.transform = "rotate(0deg)";
        menuIcon.classList.remove('text-gray-800');
        setTimeout(() => { menuIcon.innerText = '☰'; }, 100);
    }
});

// 2. Efek Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('backdrop-blur-md', 'bg-opacity-90');
    } else {
        navbar.classList.remove('backdrop-blur-md', 'bg-opacity-90');
    }
});

// 3. Tutup menu saat link diklik
document.querySelectorAll('.menu-item a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuIcon.innerText = '☰';
        menuIcon.style.transform = "rotate(0deg)";
        menuIcon.classList.remove('text-gray-800');
    });
});