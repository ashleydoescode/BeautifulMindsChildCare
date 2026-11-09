// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuButton = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    if (menuButton) {
        menuButton.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    }
}

// Add a Rates link to the homepage navigation and footer quick links.
const primaryNav = document.querySelector('.nav-menu ul');
if (primaryNav && !primaryNav.querySelector('a[href="rates.html"]')) {
    const ratesItem = document.createElement('li');
    ratesItem.innerHTML = '<a href="rates.html">Rates</a>';
    primaryNav.appendChild(ratesItem);
}

const quickLinks = document.querySelector('.footer-section ul');
if (quickLinks && !quickLinks.querySelector('a[href="rates.html"]')) {
    const ratesQuickLink = document.createElement('li');
    ratesQuickLink.innerHTML = '<a href="rates.html">Rates</a>';
    quickLinks.appendChild(ratesQuickLink);
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
        const menuButton = document.querySelector('.hamburger');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scroll only for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add active state to homepage navigation links based on scroll position
if (document.querySelector('section')) {
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').startsWith('#') && link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Form submission validation and handler
const contactForm = document.querySelector('form[action^="mailto:"]');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        if (!email || !name || !message) {
            e.preventDefault();
            alert('Please fill in all required fields (Name, Email, and Message).');
            return false;
        }

        setTimeout(() => alert('Thank you for your message! We will get back to you soon.'), 500);
    });
}

// Intersection Observer for fade-in animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.stage-card, .staff-card, .cta-card, .info-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}
