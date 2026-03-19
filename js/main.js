document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------
       1. Smooth Scroll to Anchor on Page Load
    ------------------------------------------------------------------ */
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); // Small delay to ensure layout is ready
        }
    }



    /* ------------------------------------------------------------------
       2. AOS Init
    ------------------------------------------------------------------ */
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });
    }


    /* ------------------------------------------------------------------
       3. Navbar Scroll & Active Link
    ------------------------------------------------------------------ */
    const navbar   = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        navbar && (window.scrollY > 60
            ? navbar.classList.add('scrolled')
            : navbar.classList.remove('scrolled'));

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });

        const btt = document.getElementById('backToTop');
        if (btt) {
            window.scrollY > 400 ? btt.classList.add('visible') : btt.classList.remove('visible');
        }

        // Subtle parallax on hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && window.scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${window.scrollY * 0.2}px)`;
            heroContent.style.opacity = 1 - window.scrollY / (window.innerHeight * 0.8);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ------------------------------------------------------------------
       4. Mobile Menu
    ------------------------------------------------------------------ */
    const menuBtn    = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu  = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openNav  = () => { mobileMenu && mobileMenu.classList.add('active'); document.body.style.overflow = 'hidden'; };
    const closeNav = () => { mobileMenu && mobileMenu.classList.remove('active'); document.body.style.overflow = ''; };

    if (menuBtn)   menuBtn.addEventListener('click', openNav);
    if (closeMenu) closeMenu.addEventListener('click', closeNav);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.startsWith('#')) {
                e.preventDefault();
                closeNav();
                const target = document.querySelector(id);
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        history.pushState(null, null, id);
                    }, 400); // Wait for menu close transition
                }
            } else {
                closeNav();
            }
        });
    });

    /* ------------------------------------------------------------------
       5. Back to Top
    ------------------------------------------------------------------ */
    const btt = document.getElementById('backToTop');
    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ------------------------------------------------------------------
       6. Animated Stats Counter
    ------------------------------------------------------------------ */
    const animateCount = (el, target, duration = 2000) => {
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const tick = () => {
            start = Math.min(start + step, target);
            el.textContent = start;
            if (start < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                if (!isNaN(target) && el.textContent === '0') animateCount(el, target);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));



    /* ------------------------------------------------------------------
       8. Smooth Scroll (Navigation Fix)
    ------------------------------------------------------------------ */
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            // If same page anchor
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) { 
                    e.preventDefault(); 
                    history.pushState(null, null, href);
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                }
            } 
            // If cross-page anchor to index.html (when on index.html)
            else if (href.includes('index.html#') && window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('SRAV/')) {
                const id = href.split('#')[1];
                const target = document.querySelector('#' + id);
                if (target) {
                    e.preventDefault();
                    history.pushState(null, null, '#' + id);
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* ------------------------------------------------------------------
       9. Contact Form
    ------------------------------------------------------------------ */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const origText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
                btn.style.background = '#28A745';
                setTimeout(() => {
                    btn.innerHTML = origText;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }

    /* ------------------------------------------------------------------
       10. Testimonial Auto Slider
    ------------------------------------------------------------------ */
    const track = document.getElementById('testimonialsTrack');
    const dots  = document.querySelectorAll('.tdot');

    if (track && dots.length) {
        let currentIdx  = 0;
        let perSlide    = window.innerWidth <= 991 ? 1 : 2;
        let totalSlides = Math.ceil(track.children.length / perSlide);
        let autoTimer;

        const goTo = (idx) => {
            currentIdx = (idx + totalSlides) % totalSlides;
            const cardWidth = track.children[0].offsetWidth + 28; // gap
            track.style.transform = `translateX(-${currentIdx * perSlide * cardWidth}px)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
        };

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(autoTimer);
                goTo(parseInt(dot.dataset.idx));
                startAuto();
            });
        });

        const startAuto = () => {
            autoTimer = setInterval(() => goTo(currentIdx + 1), 4500);
        };

        window.addEventListener('resize', () => {
            perSlide    = window.innerWidth <= 991 ? 1 : 2;
            totalSlides = Math.ceil(track.children.length / perSlide);
            goTo(0);
        });

        startAuto();
    }

    /* ------------------------------------------------------------------
       11. Lazy Load Images
    ------------------------------------------------------------------ */
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    /* ------------------------------------------------------------------
       12. Timeline Step Reveal
    ------------------------------------------------------------------ */
    const timelineSteps = document.querySelectorAll('.timeline-step');
    if (timelineSteps.length) {
        const tlObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, i * 100);
                    tlObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tlObserver.observe(step);
        });
    }

});
