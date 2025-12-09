document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer untuk Animasi Saat Scroll
    const animateElements = document.querySelectorAll(
        '.navbar, .hero-split, .promo-text, header, .grid, .tabs, .package-grid, .special-grid, .footer, .icon-grid-container'
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

                // Logika Animasi Berurutan (Grid Card, Package Card, Footer Column)
                
                // Animasi Icon Grid Quadrant
                if (entry.target.classList.contains('icon-grid-container')) {
                    const quadrants = entry.target.querySelectorAll('.grid-quadrant');
                    quadrants.forEach((quadrant, index) => {
                        setTimeout(() => {
                            quadrant.classList.add('animate-in');
                        }, index * 150); 
                    });
                }
                
                // Animasi Card (Discount Grid)
                if (entry.target.classList.contains('grid')) {
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100); 
                    });
                }

                // Animasi Package Card
                if (entry.target.classList.contains('package-grid')) {
                    const cards = entry.target.querySelectorAll('.pkg-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100); 
                    });
                }

                // Animasi Special Card (Slide In Left/Right)
                if (entry.target.classList.contains('special-grid')) {
                    const specialCards = entry.target.querySelectorAll('.special-card');
                    specialCards.forEach((card, index) => {
                         setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 150); 
                    });
                }

                // Animasi Footer Column
                if (entry.target.classList.contains('footer')) {
                    const columns = entry.target.querySelectorAll('.footer-column');
                    columns.forEach((column, index) => {
                         setTimeout(() => {
                            column.classList.add('animate-in');
                        }, index * 150); 
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Mulai mengamati elemen
    animateElements.forEach(el => {
        el.classList.remove('animate-in'); 
        observer.observe(el);
    });
    
    // Amati elemen 'grid-quadrant' secara terpisah
    document.querySelectorAll('.grid-quadrant').forEach(el => {
         el.classList.remove('animate-in'); 
         // Tidak perlu di observe karena sudah di-handle oleh parent .icon-grid-container
    });


    // 2. Efek Scroll Navbar
    const navbar = document.querySelector('.navbar');
    // Tambahkan animate-in saat DOM dimuat agar navbar muncul sekali di awal
    navbar.classList.add('animate-in'); 
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Toggle Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
});