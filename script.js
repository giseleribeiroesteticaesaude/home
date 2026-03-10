// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Menu Toggle --- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    /* --- Header Scroll Effect --- */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '0';
        }
    });

    /* --- Swiper Initialization --- */
    if(typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            grabCursor: true,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    /* --- Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* --- Form Submission Simulation --- */
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Simulating API Call
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            setTimeout(() => {
                // Formatting WhatsApp Message
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const serviceSelect = document.getElementById('service');
                const service = serviceSelect.options[serviceSelect.selectedIndex].text;
                
                const message = `Olá! Gostaria de agendar uma consulta.\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*E-mail:* ${email}\n*Serviço de interesse:* ${service}`;
                const whatsappUrl = `https://wa.me/5562996547768?text=${encodeURIComponent(message)}`;
                
                // Open WhatsApp in new tab
                window.open(whatsappUrl, '_blank');

                // Success UI State
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Redirecionando...';
                btn.style.background = '#22c55e'; // green success color
                bookingForm.reset();
                
                // Revert back after 3s
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 800);
        });
    }

    /* --- Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
