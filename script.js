window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.querySelector(".nav-links")?.classList.remove("show");
  });
});

const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(link => {
  const linkPage = link.getAttribute("href");
  link.classList.toggle("active", linkPage === currentPage);
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const section = document.querySelector(".customer-section");

  if (counters.length && section) {
    const animateCounters = () => {
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const increment = target / 100;

        const update = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(update, 20);
          } else {
            counter.innerText =
              target >= 1000000
                ? (target / 1000000).toFixed(1) + "M+"
                : target + "+";
          }
        };
        update();
      });
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(section);
      }
    }, { threshold: 0.5 });

    observer.observe(section);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    '#about, .service-section, .header-service, .customer-section, .sponsor-section, .gallery-section, .testimonial-section, .footer'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".testimonial-wrapper");
  const cards = Array.from(document.querySelectorAll(".testimonial-card"));
  const prevBtn = document.querySelector(".prev-button");
  const nextBtn = document.querySelector(".next-button");

  if (!wrapper || cards.length === 0) return;

  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  wrapper.appendChild(firstClone);
  wrapper.insertBefore(lastClone, cards[0]);

  const allCards = wrapper.querySelectorAll(".testimonial-card");
  let index = 1;
  let autoSlide;

  function getCardWidth() {
    const card = cards[0];
    const gap = parseInt(getComputedStyle(wrapper).gap) || 0;
    return card.offsetWidth + gap;
  }

  function move(animate = true) {
    wrapper.style.transition = animate ? "transform 0.6s ease" : "none";
    wrapper.style.transform = `translateX(-${index * getCardWidth()}px)`;
  }

  function next() {
    index++;
    move();
    if (index === allCards.length - 1) {
      setTimeout(() => {
        index = 1;
        move(false);
      }, 600);
    }
  }

  function prev() {
    index--;
    move();
    if (index === 0) {
      setTimeout(() => {
        index = allCards.length - 2;
        move(false);
      }, 600);
    }
  }

  function start() {
    autoSlide = setInterval(next, 3000);
  }

  function stop() {
    clearInterval(autoSlide);
  }

  nextBtn?.addEventListener("click", () => {
    next();
    stop();
    start();
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    stop();
    start();
  });

  wrapper.addEventListener("mouseenter", stop);
  wrapper.addEventListener("mouseleave", start);
  window.addEventListener("resize", () => move(false));

  move(false);
  start();
});
