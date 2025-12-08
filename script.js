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

// === Counter Animation saat Scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 100; // Semakin kecil semakin cepat

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText =
            target >= 1000000
              ? (target / 1000000).toFixed(1) + "M+"
              : target + "+";
        }
      };
      updateCount();
    });
  };

  // Jalankan animasi hanya saat section terlihat
  const section = document.querySelector(".customer-section");
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(section);
    }
  }, { threshold: 0.5 });

  observer.observe(section);
});

// 1. Ambil elemen-elemen penting dari HTML
const wrapper = document.querySelector('.testimonial-wrapper');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Variabel untuk menyimpan lebar pergeseran (lebar satu kartu + margin)
let cardWidth;

// Fungsi untuk menghitung lebar kartu yang benar (harus dipanggil setelah DOM selesai dimuat)
function calculateCardWidth() {
  // Ambil kartu pertama untuk mendapatkan dimensinya
  const firstCard = wrapper.querySelector('.testimonial-card');
  if (firstCard) {
    // Ambil lebar kartu (offsetWidth) dan tambahkan margin horizontal (20px total margin: 10px kiri, 10px kanan)
    cardWidth = firstCard.offsetWidth + 20;
  }
}

// Panggil sekali saat halaman dimuat dan saat jendela diubah ukurannya
window.addEventListener('load', calculateCardWidth);
window.addEventListener('resize', calculateCardWidth);


// 2. Fungsionalitas Tombol Panah
// Geser ke kartu berikutnya (kanan)
nextButton.addEventListener('click', () => {
  // Menggunakan scrollBy untuk menggeser sejauh lebar satu kartu
  wrapper.scrollBy({
    left: cardWidth,
    behavior: 'smooth' // Membuat animasi geser lebih halus
  });
});

// Geser ke kartu sebelumnya (kiri)
prevButton.addEventListener('click', () => {
  // Menggunakan scrollBy untuk menggeser mundur
  wrapper.scrollBy({
    left: -cardWidth,
    behavior: 'smooth'
  });
});


// 3. Fungsionalitas Geser Otomatis (Opsional)

const intervalTime = 5000; // Geser setiap 5 detik (5000 milidetik)
let scrollInterval = setInterval(autoScroll, intervalTime);

function autoScroll() {
  // Periksa apakah sudah mencapai akhir konten
  if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth) {
    // Jika sudah di akhir, geser kembali ke awal secara instan (tanpa animasi)
    wrapper.scrollTo({
      left: 0,
      behavior: 'instant'
    });
  } else {
    // Jika belum di akhir, geser ke kartu berikutnya
    wrapper.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  }
}

// Tambahan: Hentikan geser otomatis saat pengguna berinteraksi (hover)
wrapper.addEventListener('mouseenter', () => {
  clearInterval(scrollInterval);
});

// Lanjutkan geser otomatis saat pengguna menjauhkan kursor
wrapper.addEventListener('mouseleave', () => {
  scrollInterval = setInterval(autoScroll, intervalTime);
});

const margin = 30; // <--- Nilai margin HARUS SESUAI dengan margin-right di CSS (30px)

function calculateCardWidth() {
  const firstCard = wrapper.querySelector('.testimonial-card');
  if (firstCard) {
    // Lebar pergeseran adalah lebar kartu penuh ditambah margin kanan
    cardWidth = firstCard.offsetWidth + margin;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // 1. Target semua section yang ingin dianimasikan (gunakan kelas di CSS)
  const sections = document.querySelectorAll(
    '#about, .service-section, .header-service, .customer-section, .sponsor-section, .gallery-section, .testimonial-section, .footer'
  );

  // 2. Opsi untuk Intersection Observer
  const observerOptions = {
    root: null, // Mengamati relatif terhadap viewport
    rootMargin: '0px',
    // Tentukan persentase elemen yang harus terlihat sebelum memicu. 
    // 0.2 = 20% elemen terlihat.
    threshold: 0.2
  };

  // 3. Buat Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Saat elemen terlihat (intersecting), tambahkan kelas .is-visible
        entry.target.classList.add('is-visible');
        // Hentikan pengamatan (unobserve) agar animasi hanya diputar sekali
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 4. Mulai mengamati setiap section
  sections.forEach(section => {
    observer.observe(section);
  });

  /* --- Tambahan: Fungsionalitas Testimonial Carousel Sederhana --- */
  const wrapper = document.querySelector('.testimonial-wrapper');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  let currentIndex = 0;

  if (cards.length > 0) {
    // Fungsi untuk menggerakkan carousel
    const updateCarousel = () => {
      const cardWidth = cards[0].offsetWidth + 30; // Lebar kartu + margin
      wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    // Event listener untuk tombol Next
    nextButton.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Kembali ke awal (Loop)
      }
      updateCarousel();
    });

    // Event listener untuk tombol Previous
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = cards.length - 1; // Kembali ke akhir (Loop)
      }
      updateCarousel();
    });

    // Memastikan carousel diinisialisasi dengan benar saat window di-resize
    window.addEventListener('resize', updateCarousel);
  }
});

