// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* --- Data Storage --- */
    let allPosts = [];
    const services = [
        { title: "Depilação a Laser", category: "Tratamento", link: "index.html#servicos", icon: "fa-wand-magic-sparkles" },
        { title: "Criolipólise", category: "Corpo", link: "index.html#servicos", icon: "fa-snowflake" },
        { title: "Laser Lavieem", category: "Rosto", link: "index.html#servicos", icon: "fa-masks-theater" },
        { title: "Laser Íntimo", category: "Saúde Feminina", link: "index.html#servicos", icon: "fa-heart" }
    ];
    const courses = [
        { title: "Especialização em Depilação a Laser", category: "Cursos", link: "cursos.html" },
        { title: "Master em Criolipólise", category: "Cursos", link: "cursos.html" },
        { title: "Expert em Laser Lavieem", category: "Cursos", link: "cursos.html" },
        { title: "Estética Íntima Feminina", category: "Cursos", link: "cursos.html" }
    ];

    /* --- Sidebar Navigation Toggle --- */
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    const toggleSidebar = (state) => {
        if(state) {
            sidebarNav.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sidebarNav.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if(navToggle) navToggle.addEventListener('click', () => toggleSidebar(true));
    if(navClose) navClose.addEventListener('click', () => toggleSidebar(false));
    if(navOverlay) navOverlay.addEventListener('click', () => toggleSidebar(false));

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => toggleSidebar(false));
    });

    /* --- Header Scroll Effect --- */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
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
            fadeEffect: { crossFade: true },
            grabCursor: true,
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }

    /* --- Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealOptions = { 
        threshold: 0.05, // Lower threshold for mobile reliability
        rootMargin: "0px 0px -20px 0px" 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
        // Fallback: If element is already in viewport on load, show it
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });

    // Final fallback: Ensure everything is visible after 2 seconds even if observer fails
    setTimeout(() => {
        revealElements.forEach(el => el.classList.add('active'));
    }, 2500);

    /* --- Form Submission (WhatsApp Redirect) --- */
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const serviceSelect = document.getElementById('service');
                const service = serviceSelect.options[serviceSelect.selectedIndex].text;
                
                const message = `Olá! Gostaria de agendar uma consulta.\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*E-mail:* ${email}\n*Serviço de interesse:* ${service}`;
                const whatsappUrl = `https://wa.me/5562996547768?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappUrl, '_blank');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Redirecionando...';
                btn.style.background = '#22c55e';
                bookingForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 800);
        });
    }

    /* --- Search Functionality --- */
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
            document.body.style.overflow = 'hidden';
        });

        const closeSearch = () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
            searchResults.innerHTML = '<div class="search-placeholder"><i class="fa-solid fa-sparkles"></i><p>Digite algo para pesquisar...</p></div>';
        };

        searchClose.addEventListener('click', closeSearch);
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.innerHTML = '<div class="search-placeholder"><i class="fa-solid fa-sparkles"></i><p>Pesquise tratamentos ou artigos...</p></div>';
                return;
            }

            const filteredServices = services.filter(s => s.title.toLowerCase().includes(query) || s.category.toLowerCase().includes(query));
            const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(query));
            const filteredPosts = allPosts.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query));

            renderSearchResults(filteredServices, filteredCourses, filteredPosts);
        });
    }

    function renderSearchResults(svcs, crs, posts) {
        if (svcs.length === 0 && crs.length === 0 && posts.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results"><p>Nenhum resultado encontrado para sua busca.</p></div>';
            return;
        }

        let html = '';
        if (svcs.length > 0) {
            html += `<div class="search-section"><h4>Tratamentos</h4>`;
            svcs.forEach(s => {
                html += `<a href="${s.link}" class="search-result-item"><i class="fa-solid ${s.icon}"></i> <div><span>${s.title}</span><small>${s.category}</small></div></a>`;
            });
            html += `</div>`;
        }
        if (crs.length > 0) {
            html += `<div class="search-section"><h4>Cursos Academy</h4>`;
            crs.forEach(c => {
                html += `<a href="${c.link}" class="search-result-item"><i class="fa-solid fa-graduation-cap"></i> <div><span>${c.title}</span><small>${c.category}</small></div></a>`;
            });
            html += `</div>`;
        }
        if (posts.length > 0) {
            html += `<div class="search-section"><h4>Blog</h4>`;
            posts.forEach(p => {
                html += `<a href="blog.html" class="search-result-item"><i class="fa-solid fa-newspaper"></i> <div><span>${p.title}</span><small>Dica/Artigo</small></div></a>`;
            });
            html += `</div>`;
        }
        searchResults.innerHTML = html;
    }

    /* --- Data Loading (Posts) --- */
    fetch('posts.json')
        .then(res => res.json())
        .then(posts => {
            allPosts = posts;
            
            // Home Blog Grid
            const homeBlogGrid = document.getElementById('home-blog-grid');
            if(homeBlogGrid) {
                const latest = posts.slice(0, 3);
                homeBlogGrid.innerHTML = latest.map(post => `
                    <div class="blog-card reveal-up">
                        <img src="${post.image}" alt="${post.title}" class="blog-preview-img">
                        <div class="blog-card-body">
                            <span class="blog-category-tag">${post.category}</span>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <a href="blog.html" class="btn btn-secondary">Ler mais</a>
                        </div>
                    </div>
                `).join('');
                homeBlogGrid.querySelectorAll('.reveal-up').forEach(el => revealOnScroll.observe(el));
            }

            // Blog Page Grid
            const blogGrid = document.getElementById('blog-grid');
            if(blogGrid) {
                blogGrid.innerHTML = posts.map(post => `
                    <div class="blog-card">
                        <img src="${post.image}" alt="${post.title}" class="blog-card-img">
                        <div class="blog-card-body">
                            <span class="blog-card-category">${post.category}</span>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <div class="blog-card-footer">
                                <span><i class="fa-solid fa-calendar-days"></i> ${post.date}</span>
                                <button class="btn btn-secondary read-more" data-id="${post.id}">Ler tudo <i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('');

                document.querySelectorAll('.read-more').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const post = allPosts.find(p => p.id == btn.dataset.id);
                        showPostModal(post);
                    });
                });
            }
        });

    function showPostModal(post) {
        const modal = document.getElementById('postModal');
        const content = document.getElementById('postDescription');
        if(!modal || !content) return;

        content.innerHTML = `
            <span class="blog-card-category">${post.category}</span>
            <h2 class="modal-title">${post.title}</h2>
            <div class="modal-date">Publicado em ${post.date}</div>
            <img src="${post.image}" class="modal-image">
            <div class="post-text-content">${post.content}</div>
            <div class="modal-footer">
                <a href="https://wa.me/5562996547768?text=Vi a postagem sobre ${post.title} no blog." target="_blank" class="btn btn-whatsapp">
                    <i class="fa-brands fa-whatsapp"></i> Tirar dúvidas no WhatsApp
                </a>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Modal Close logic
    const postModal = document.getElementById('postModal');
    if(postModal) {
        const closeBtn = postModal.querySelector('.close-modal');
        const closeModal = () => { postModal.classList.remove('active'); document.body.style.overflow = ''; };
        if(closeBtn) closeBtn.addEventListener('click', closeModal);
        postModal.addEventListener('click', (e) => { if(e.target === postModal) closeModal(); });
    }

    /* --- Scroll to Top & Header Visibility --- */
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                const headerOffset = 100;
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
