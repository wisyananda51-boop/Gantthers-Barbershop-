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
        document.querySelector(".nav-links").classList.remove("active");
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
menuToggle.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
});

