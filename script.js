const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isClicking = false;

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            isClicking = true;
            setTimeout(() => (isClicking = false), 1000);

            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');

            updateActiveLink(link);

            const targetSection = document.querySelector(link.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const setActiveLink = () => {
        if (isClicking) return;

        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const updateActiveLink = (clickedLink) => {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});

if (!isMobile) {
    document.addEventListener('DOMContentLoaded', function() {
        const img = document.querySelector('.image-container img');
        
        if (!img) return;

        let lastScrollTop = 0;
        let ticking = false;
        const MIN_TRANSLATE = -99;
        const MAX_TRANSLATE = 99;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollDirection = scrolled > lastScrollTop ? 1 : -1;
                    const scrollDistance = Math.abs(scrolled - lastScrollTop);
                    let parallaxValue = scrolled * 0.1;

                    parallaxValue = Math.max(MIN_TRANSLATE, Math.min(MAX_TRANSLATE, parallaxValue));
                    const smoothValue = Math.min(scrollDistance * 0.1, 15) * scrollDirection;

                    img.style.transform = `translateY(${parallaxValue}px) scale(${1 + Math.abs(smoothValue) * 0.001})`;

                    lastScrollTop = scrolled;
                    ticking = false;
                });

                ticking = true;
            }
        });
    });
}

if (!isMobile) {
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.partner-logo-item');
        
        if (cards.length === 0) return;

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        cards.forEach(card => {
            const update = () => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const deltaX = mouseX - cardCenterX;
                const deltaY = mouseY - cardCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = 400;

                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = (deltaX / distance) * strength * 15;
                    const moveY = (deltaY / distance) * strength * 15;

                    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    card.style.transform = 'translate(0, 0)';
                }

                requestAnimationFrame(update);
            };

            update();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = isMobile ? 1000 : 1500; 
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + (target > 10 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target > 10 ? '+' : '');
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: isMobile ? 0.3 : 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (counter.textContent === '0') {
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.trust-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

if (!isMobile) {
    document.addEventListener('DOMContentLoaded', function() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const moveX = (x - centerX) / centerX * 10;
                const moveY = (y - centerY) / centerY * 10;

                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = 'translate(0, 0)';
            });
        });
    });
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = './img/Achille_Zouaoui_DevJavaBackend.pdf';
    link.download = 'CV_ACHILLEZOUAOUI_DEV_JAVA.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

if (isMobile) {
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: transparent;
            }
            .partner-logo-item,
            .project-card {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    });
}