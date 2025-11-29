document.addEventListener('DOMContentLoaded', () => {
  // Select all elements to animate
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.scroll-animate');
  elements.forEach(el => observer.observe(el));
});

// Fungsi Tabs Package
function openTab(evt, tabName) {
  // 1. Sembunyikan semua konten tab
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // 2. Hapus class 'active' dari semua tombol
  tablinks = document.getElementsByClassName("btn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // 3. Munculkan tab yang dipilih & set tombol jadi active
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

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

// Menambahkan focus effect untuk aksesibilitas
document.querySelectorAll('.card').forEach(card => {
  card.setAttribute('tabindex', '0');

  card.addEventListener('focus', () => {
    card.style.boxShadow = '0 14px 40px rgba(0,0,0,0.6)';
  });

  card.addEventListener('blur', () => {
    card.style.boxShadow = '0 6px 18px rgba(0,0,0,0.45)';
  });
});
