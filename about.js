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
