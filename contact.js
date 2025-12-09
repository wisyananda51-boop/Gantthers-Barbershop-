document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.querySelector("button, #nextBtn, .next");

    if (!nextBtn) {
        console.error("Tombol Next tidak ditemukan!");
        return;
    }

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const name = document.querySelector("input[placeholder='Name']");
        const email = document.querySelector("input[placeholder='Email']");
        const phone = document.querySelector("input[placeholder='Phone']");
        const date = document.querySelector("input[placeholder='Date (D / M)']");
        const addr = document.querySelector("textarea");

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !phone.value.trim() ||
            !date.value.trim() ||
            !addr.value.trim()
        ) {
            alert("⚠️ Mohon lengkapi semua form terlebih dahulu!");
            return;
        }

        alert(`🎉 Terima kasih sudah mengisi form, ${name.value.trim()}!`);
    });
});

// === Navbar scroll effect ===
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// === Smooth scroll navigation ===
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Close mobile menu when link clicked
        document.querySelector(".nav-links").classList.remove("show");
    });
});

// === ACTIVE NAV FOR MULTIPLE PAGES ===
const currentPage = window.location.pathname.split("/").pop(); // nama file saat ini
const navLinks2 = document.querySelectorAll(".nav-links a");

navLinks2.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

// === Mobile menu toggle ===
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // 1. Tampilkan Navbar sekali di awal
    // Diberi sedikit delay agar terlihat profesional
    setTimeout(() => {
        navbar.classList.add('animate-in');
    }, 200);

    // 2. Efek Scroll Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Toggle Menu Mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        // Bonus: Animasi X pada icon menu toggle
        menuToggle.style.transform = navLinks.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)';
    });


    // 4. Intersection Observer untuk Animasi Fade-In saat elemen muncul
    const animateElements = document.querySelectorAll(
        '.hero-content, .divider, .form-box, .footer'
    );

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Pemicu saat 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi
            }
        });
    }, observerOptions);

    // Mulai mengamati elemen
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Tambahkan observasi untuk sub-elemen divider (line)
    document.querySelectorAll('.divider').forEach(el => {
        observer.observe(el);
    });
});