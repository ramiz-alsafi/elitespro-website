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
    const navToggle = document.querySelector('.nav-toggle'); // Your class
    const navMenu = document.querySelector('.nav-menu');     // Your class

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile nav when a menu item is clicked (except dropdown parent)
        navMenu.querySelectorAll('.nav-link:not(.dropbtn)').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // Dropdown Toggle (for "Services" on desktop, click on mobile)
    const dropdownBtn = document.querySelector('.dropbtn');
    if (dropdownBtn) {
        // Prevent dropdown from acting as a link on click on mobile
        dropdownBtn.addEventListener('click', (e) => {
            // Check if it's a mobile screen size based on CSS breakpoint (767px)
            if (window.innerWidth <= 767) {
                e.preventDefault(); // Prevent default link behavior
                // Toggle 'active' class on the parent <li> of the dropdown
                dropdownBtn.parentNode.classList.toggle('active');

                // If another dropdown is open, close it
                document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                    if (openDropdown !== dropdownBtn.parentNode) {
                        openDropdown.classList.remove('active');
                    }
                });
            }
            // For desktop, the CSS :hover will handle it.
        });
    }

    // Close dropdowns if clicking outside (for mobile/tablet only)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 767 && dropdownBtn) {
            const isClickInsideDropdown = dropdownBtn.parentNode.contains(e.target) || navToggle.contains(e.target);
            const isNavMenuOpen = navMenu.classList.contains('active');

            if (!isClickInsideDropdown && isNavMenuOpen) {
                // If clicked outside and nav menu is open, close nav menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            } else if (!isClickInsideDropdown && dropdownBtn.parentNode.classList.contains('active')) {
                // If clicked outside and only dropdown is open (e.g., on tablet without nav menu active)
                dropdownBtn.parentNode.classList.remove('active');
            }
        }
    });


    // Scroll-based animation for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible to trigger
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Apply initial hidden state only if not already in viewport on load
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight) { // Check if section is below the current viewport
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sectionObserver.observe(section);
        } else {
            // If already in viewport on load, make it visible immediately
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });

    // You can add more complex JS features here later, like:
    // - Dynamic content loading (e.g., fetch service details)
    // - Simple form validation for contact.html
    // - Testimonial carousels etc.
});
