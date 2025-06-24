document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links (if you add any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Navigation Toggle (Hamburger Menu)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            // Close any open dropdown when opening/closing main nav
            document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                if (openDropdown !== navMenu) { // Ensure we don't close the navMenu itself if it's also a dropdown (unlikely)
                    openDropdown.classList.remove('active');
                }
            });
        });

        // Close mobile nav when a non-dropdown link is clicked
        navMenu.querySelectorAll('.nav-link:not(.dropbtn)').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // Dropdown Toggle (for "Services" on mobile, click behavior)
    const dropdownBtn = document.querySelector('.dropbtn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            // Only activate this behavior on mobile screen size (<= 767px based on CSS)
            if (window.innerWidth <= 767) {
                e.preventDefault(); // Prevent default link behavior for the dropdown parent
                const parentLi = dropdownBtn.parentNode;
                parentLi.classList.toggle('active'); // Toggle 'active' on the parent <li>

                // Close other open dropdowns if multiple exist (unlikely for this simple nav)
                document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                    if (openDropdown !== parentLi) {
                        openDropdown.classList.remove('active');
                    }
                });
            }
        });
    }

    // Close mobile nav or dropdown if clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 767) {
            // Check if click is outside nav menu
            if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
            // Check if click is outside any dropdown (if dropdowns are separate from main nav close)
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown.classList.contains('active') && !dropdown.contains(e.target) && e.target !== dropdownBtn) {
                     dropdown.classList.remove('active');
                }
            });
        }
    });


    // Scroll-based animation for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            section.style.opacity = 0;
            section.style.transform = 'translateY(30px)'; /* Slightly more movement */
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; /* Longer, smoother transition */
            sectionObserver.observe(section);
        } else {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });

});
