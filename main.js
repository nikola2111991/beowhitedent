/* ═══════════════════════════════════════════════════════════════
   BeoWhiteDent - Main JavaScript
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initMagneticButtons();
  initFAQ();
  initParallax();
  initContactForm();
  initCookieBanner();
});

/* ═══════════════════════════════════════════════════════════════
   Navigation
   ═══════════════════════════════════════════════════════════════ */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Scroll effect for nav
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   Scroll Animations
   ═══════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════════════
   Magnetic Buttons
   ═══════════════════════════════════════════════════════════════ */
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.magnetic-btn');

  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   FAQ Accordion
   ═══════════════════════════════════════════════════════════════ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   Parallax Effect
   ═══════════════════════════════════════════════════════════════ */
function initParallax() {
  const heroImage = document.querySelector('.hero-image');

  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;

      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   Contact Form
   ═══════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.phone) {
        alert('Molimo popunite obavezna polja (ime i telefon).');
        return;
      }

      // In a real implementation, this would send data to a server
      // For now, show a success message
      alert('Hvala na poruci! Kontaktiraćemo Vas u najkraćem roku.');
      form.reset();
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   Cookie Banner
   ═══════════════════════════════════════════════════════════════ */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-btn-accept');
  const declineBtn = document.querySelector('.cookie-btn-decline');

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');

  if (!cookieChoice && banner) {
    // Show banner after a short delay
    setTimeout(() => {
      banner.classList.add('show');
    }, 2000);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.classList.remove('show');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      banner.classList.remove('show');
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   Smooth Scroll for Anchor Links
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Skip if it's just "#"
    if (href === '#') return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ═══════════════════════════════════════════════════════════════
   Counter Animation
   ═══════════════════════════════════════════════════════════════ */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number[data-count]');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

/* ═══════════════════════════════════════════════════════════════
   Lazy Loading Images
   ═══════════════════════════════════════════════════════════════ */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ═══════════════════════════════════════════════════════════════
   Phone Number Click Tracking (for analytics)
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    // In a real implementation, this would send an event to analytics
    console.log('Phone click tracked');
  });
});
