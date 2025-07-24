// Global state management
console.log('🎯 Script.js is loading...');
let currentLang = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';
console.log('🌍 Language:', currentLang, '🎨 Theme:', currentTheme);

// Make functions globally available
window.toggleLanguage = function () {
    console.log('🌍 Language toggle clicked!');
    currentLang = currentLang === 'en' ? 'he' : 'en';
    console.log('🌍 Switching to:', currentLang);
    setLanguage(currentLang);
    localStorage.setItem('language', currentLang);
};

window.toggleTheme = function () {
    console.log('🎨 Theme toggle clicked!');
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    console.log('🎨 Switching to:', currentTheme);
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
};

console.log('✅ Toggle functions loaded globally!');

// Wallet addresses for payment page
const wallets = {
    'solana': 'FaQeyS5VCox1H12NjdobUHva4VoRuKpVYhZAr4MRbH39',
    'btc-taproot': 'bc1p0qm4c5st2857ayd5s3n30af3n6d4w68tjq8mcxn7vcr3h3h0ef6s5lzrjd',
    'btc-segwit': 'bc1qkuy9x4k4909qem9kzpesefl5l7hgguxydaeqzk',
    'eth': '0xc43FcDa68f6bBD60195d226dC614B77Ce678E88F'
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Script loaded successfully!');

    try {
        initBackground();
        initNavigation();
        initScrollProgress();
        initSmoothScrolling();
        setLanguage(currentLang);
        setTheme(currentTheme);

        // Debug: Check if navigation links are working
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('📍 Found navigation links:', navLinks.length);

        navLinks.forEach((link, index) => {
            console.log(`🔗 Link ${index}:`, link.href, link.textContent);

            // Test if link is clickable
            const computedStyle = window.getComputedStyle(link);
            console.log(`🎯 Link ${index} clickable:`, {
                pointerEvents: computedStyle.pointerEvents,
                zIndex: computedStyle.zIndex,
                position: computedStyle.position
            });

            link.addEventListener('click', (e) => {
                console.log(`✅ Navigation link ${index} clicked:`, link.href);
                console.log('🎯 Click event:', e);

                // Special handling for home link
                if (link.href.includes('./') || link.textContent.trim() === 'Home') {
                    console.log('🏠 Home link clicked - navigating...');
                }

                // Don't prevent default - let the link work normally
            });
        });
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }

    // Add entrance animation to card
    const card = document.querySelector('.card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Language and theme management functions are now defined globally above

function setLanguage(lang) {
    const html = document.documentElement;
    const elements = document.querySelectorAll('[data-en][data-he]');

    html.lang = lang;
    html.dir = lang === 'he' ? 'rtl' : 'ltr';

    elements.forEach(el => {
        el.innerHTML = el.getAttribute('data-' + lang);
    });

    const langIndicator = document.getElementById('lang-indicator');
    if (langIndicator) {
        langIndicator.textContent = lang === 'en' ? '🇮🇱' : '🇺🇸';
    }
}

// Theme toggle function is now defined globally above

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Navigation management
function initNavigation() {
    let navLinks = [];

    try {
        // Set active page
        const currentPage = getCurrentPage();
        navLinks = document.querySelectorAll('.nav-link');

        console.log('🔍 Current page:', currentPage);
        console.log('🔗 Navigation links found:', navLinks.length);

        // Check if language and theme buttons exist
        const langButton = document.querySelector('.language-switch');
        const themeButton = document.querySelector('.theme-switch');
        const navControls = document.querySelector('.nav-controls');

        console.log('🌍 Language button found:', !!langButton);
        console.log('🎨 Theme button found:', !!themeButton);
        console.log('🎛️ Nav controls found:', !!navControls);

        if (langButton) {
            const styles = window.getComputedStyle(langButton);
            console.log('🌍 Language button styles:', {
                display: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                zIndex: styles.zIndex
            });
            // Force show the button
            langButton.style.display = 'flex';
            langButton.style.visibility = 'visible';
            langButton.style.opacity = '1';
        }

        if (themeButton) {
            const styles = window.getComputedStyle(themeButton);
            console.log('🎨 Theme button styles:', {
                display: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                zIndex: styles.zIndex
            });
            // Force show the button
            themeButton.style.display = 'flex';
            themeButton.style.visibility = 'visible';
            themeButton.style.opacity = '1';
        }

        if (navControls) {
            navControls.style.display = 'flex';
            navControls.style.visibility = 'visible';
            navControls.style.opacity = '1';
        }

        navLinks.forEach((link, index) => {
            const href = link.getAttribute('href');
            console.log(`📋 Link ${index}: href="${href}", text="${link.textContent}"`);

            // Remove any existing active class first
            link.classList.remove('active');

            if (href === currentPage ||
                (currentPage === 'index.html' && (href === './' || href === 'index.html')) ||
                (href === './' && (currentPage === '' || currentPage === 'index.html')) ||
                (href === 'index.html' && (currentPage === '' || currentPage === 'index.html'))) {
                link.classList.add('active');
                console.log(`✅ Set active: ${link.textContent}`);
            }

            // Ensure the link is clickable
            link.style.pointerEvents = 'auto';
            link.style.zIndex = '1001';
        });
    } catch (error) {
        console.error('❌ Error in initNavigation:', error);
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu && navLinks.length > 0) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

function getCurrentPage() {
    try {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        console.log('🌐 Full path:', path);
        console.log('📄 Current page:', page);
        return page;
    } catch (error) {
        console.error('❌ Error in getCurrentPage:', error);
        return 'index.html';
    }
}

// Background animation
function initBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 69, 255, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(139, 69, 255, ${0.1 * (1 - distance / 80)})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Copy address functionality (for payment page)
function copyAddress(addressId, button) {
    const addressElement = document.getElementById(addressId);
    const address = addressElement.textContent;

    navigator.clipboard.writeText(address).then(() => {
        showCopySuccess(button);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess(button);
    });
}

function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = '<i class="fas fa-check"></i><span data-en="Copied!" data-he="הועתק!">Copied!</span>';

    // Update the text based on current language
    const span = button.querySelector('span');
    if (span) {
        span.textContent = currentLang === 'en' ? 'Copied!' : 'הועתק!';
    }

    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalText;
    }, 2000);
}

// Mouse interaction effects - DISABLED to prevent dizziness
// document.addEventListener('mousemove', (e) => {
//     const card = document.querySelector('.card');
//     if (!card) return;
//     
//     const rect = card.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     
//     const deltaX = (e.clientX - centerX) / 30;
//     const deltaY = (e.clientY - centerY) / 30;
//     
//     card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
// });

// Reset card transform when mouse leaves - DISABLED
// document.addEventListener('mouseleave', () => {
//     const card = document.querySelector('.card');
//     if (card) {
//         card.style.transform = '';
//     }
// });

// Show notification (for copy actions)
function showNotification(message = 'Address copied!') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Additional debugging for navigation issues
window.addEventListener('load', () => {
    console.log('🌐 Page fully loaded');

    // Check all navigation links
    const allLinks = document.querySelectorAll('a[href]');
    console.log('🔗 All links on page:', allLinks.length);

    allLinks.forEach((link, index) => {
        if (link.classList.contains('nav-link')) {
            console.log(`📍 Nav link ${index}:`, {
                href: link.href,
                text: link.textContent.trim(),
                classes: link.className,
                clickable: !link.style.pointerEvents || link.style.pointerEvents !== 'none'
            });
        }
    });
});

// Test function to manually trigger navigation
function testHomeNavigation() {
    console.log('🧪 Testing home navigation...');
    const homeLink = document.querySelector('a[href="./"]');
    if (homeLink) {
        console.log('✅ Home link found:', homeLink);
        homeLink.click();
    } else {
        console.log('❌ Home link not found');
    }
}

// Make test function available globally
window.testHomeNavigation = testHomeNavigation;

// Force reset any transforms on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transform = '';
        card.style.perspective = '';
    });
});

// Also reset on window load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transform = '';
        card.style.perspective = '';
    });
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add intersection observer for fade-in animations
function initScrollAnimations() {
    // Only run on desktop to avoid mobile issues
    if (window.innerWidth <= 768) {
        return; // Skip animations on mobile
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Only observe specific elements that exist and are safe to animate
    const animatableElements = document.querySelectorAll('.service-item, .tech-item');
    animatableElements.forEach(item => {
        // Double check the element exists and is not a critical layout element
        if (item && !item.closest('.navbar') && !item.closest('.hero-section')) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        }
    });
}

// Enhanced copy functionality with better feedback
function enhancedCopyAddress(addressId, button) {
    const addressElement = document.getElementById(addressId);
    const address = addressElement.textContent;

    navigator.clipboard.writeText(address).then(() => {
        showEnhancedCopySuccess(button, address);
        // Add haptic feedback on supported devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showEnhancedCopySuccess(button, address);
    });
}

function showEnhancedCopySuccess(button, address) {
    const originalText = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';

    // Show floating notification
    showFloatingNotification(`Address copied: ${address.substring(0, 12)}...`);

    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalText;
    }, 2000);
}

function showFloatingNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00d4aa, #00b894);
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 212, 170, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all critical elements are visible on mobile
    if (window.innerWidth <= 768) {
        ensureMobileVisibility();
    } else {
        setTimeout(initScrollAnimations, 500);
    }
});

// Ensure all important elements are visible on mobile
function ensureMobileVisibility() {
    const criticalElements = document.querySelectorAll('.card, .hero-section, .main-content, .subtitle, .services-section, .tech-section, .contact-header, .payment-header');
    criticalElements.forEach(element => {
        if (element) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.visibility = 'visible';
        }
    });
}