// === BRANCHES REVEAL ANIMATION ===
const branchItems = document.querySelectorAll(".branch-item");

const branchObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150); // Efek muncul berurutan
      }
    });
  },
  { threshold: 0.2 }
);

branchItems.forEach((item) => branchObserver.observe(item));

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