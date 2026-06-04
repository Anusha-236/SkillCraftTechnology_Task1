/* ============================================
   LANDING PAGE - JAVASCRIPT FUNCTIONALITY
   ============================================ */

/**
 * ==== NAVBAR SCROLL EFFECT ====
 * Changes navbar background when user scrolls down
 */
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
});

/**
 * ==== HAMBURGER MENU TOGGLE ====
 * Toggles mobile navigation menu on hamburger click
 */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

/**
 * ==== CLOSE MOBILE MENU ON LINK CLICK ====
 * Closes the mobile menu when a navigation link is clicked
 */
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/**
 * ==== SMOOTH SCROLLING FOR ANCHOR LINKS ====
 * Implements smooth scroll behavior for navigation links
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only prevent default for anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * ==== CALL-TO-ACTION BUTTON SMOOTH SCROLL ====
 * Smooth scroll to services section when CTA button is clicked
 */
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

/**
 * ==== SCROLL TO TOP BUTTON ====
 * Shows/hides and manages scroll-to-top button functionality
 */
const scrollTopButton = document.getElementById('scrollTop');

if (scrollTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    // Scroll to top on button click
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ==== SCROLL REVEAL ANIMATIONS ====
 * Reveals elements as they come into viewport using Intersection Observer
 */
const revealElements = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay from data attribute if present
                const delay = entry.target.getAttribute('data-aos-delay') || '0';
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize scroll reveal animations
revealElements();

/**
 * ==== CONTACT FORM HANDLING ====
 * Handles form submission with validation and feedback
 */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call with timeout
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
        }, 1500);
    });
}

/**
 * ==== NOTIFICATION SYSTEM ====
 * Displays temporary notifications for user feedback
 */
const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles via inline CSS
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px'
    });

    // Set colors based on type
    const colors = {
        success: { bg: '#10b981', color: '#fff' },
        error: { bg: '#ef4444', color: '#fff' },
        info: { bg: '#3b82f6', color: '#fff' }
    };

    const colorScheme = colors[type] || colors.info;
    notification.style.backgroundColor = colorScheme.bg;
    notification.style.color = colorScheme.color;

    // Add to document
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
};

/**
 * ==== KEYBOARD NAVIGATION ====
 * Allows keyboard shortcuts for better accessibility
 */
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Ctrl/Cmd + K opens search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Can be expanded for search functionality
    }
});

/**
 * ==== SERVICE CARD CLICK ANIMATION ====
 * Adds ripple effect on service card clicks
 */
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;

        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/**
 * ==== ACTIVE NAV LINK HIGHLIGHT ====
 * Highlights the current section in the navigation menu
 */
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.style.color = '';
        const href = link.getAttribute('href').substring(1);
        
        if (href === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

/**
 * ==== PARALLAX EFFECT (OPTIONAL) ====
 * Creates a subtle parallax effect for hero background
 */
const parallaxBackground = () => {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.5;
        heroBackground.style.transform = `translateY(${offset}px)`;
    }
};

window.addEventListener('scroll', parallaxBackground);

/**
 * ==== PERFORMANCE: DEBOUNCE FUNCTION ====
 * Prevents excessive function calls during scroll events
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * ==== CSS KEYFRAME ANIMATIONS ====
 * Inject necessary animations that weren't in CSS
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes rippleEffect {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

/**
 * ==== INITIALIZATION COMPLETE ====
 * Log that JavaScript has been successfully loaded
 */
console.log('Landing Page JavaScript initialized successfully!');

/**
 * ==== DARK MODE TOGGLE (OPTIONAL) ====
 * Can be extended to include dark mode functionality
 */
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

const handleDarkModeChange = (e) => {
    // This can be used to implement system dark mode support
    if (e.matches) {
        // Apply dark mode
        console.log('Dark mode preferred');
    } else {
        // Apply light mode
        console.log('Light mode preferred');
    }
};

// Listen for changes in color scheme preference
prefersDarkMode.addEventListener('change', handleDarkModeChange);

/**
 * ==== LAZY LOADING (FUTURE ENHANCEMENT) ====
 * Can be extended to lazy load images as they come into view
 */
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Uncomment to enable lazy loading
// lazyLoadImages();
