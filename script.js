// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navLinks = document.getElementById('nav-links');
            const hamburger = document.getElementById('hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add fade-in animation on scroll
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

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe about section
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateY(20px)';
    aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(aboutContent);
}

// Email copy-to-clipboard button
const emailButton = document.getElementById('copy-email-button');
if (emailButton) {
    const label = document.getElementById('copy-email-label');
    const email = 'phktistakis@gmail.com';

    emailButton.addEventListener('click', async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = email;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            if (label) {
                label.textContent = 'Email copied ✓';
            }

            setTimeout(() => {
                if (label) {
                    label.textContent = 'Email';
                }
            }, 2000);
        } catch (e) {
            // If copy fails, fall back to mailto
            window.location.href = `mailto:${email}`;
        }
    });
}

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Typewriter effect for welcome name
const welcomeName = document.getElementById('welcome-name');
if (welcomeName) {
    const originalText = '6x7.gr';
    welcomeName.textContent = '';
    
    let charIndex = 0;
    const typeSpeed = 150;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            welcomeName.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 400);
}

// Floating prompt bar functionality
const floatingPromptBar = document.getElementById('floating-prompt-bar');
const floatingPromptInput = floatingPromptBar.querySelector('.floating-prompt-input');
const floatingPromptButton = floatingPromptBar.querySelector('.floating-prompt-button');

// Hide floating bar when at hero section, show otherwise
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.offsetHeight;
    
    if (window.pageYOffset > heroBottom - 100) {
        floatingPromptBar.classList.remove('hidden');
    } else {
        floatingPromptBar.classList.add('hidden');
    }
});

// Click on floating prompt bar redirects to Praiser
floatingPromptInput.addEventListener('click', () => {
    window.open('https://praiser.6x7.gr', '_blank');
});

floatingPromptButton.addEventListener('click', () => {
    window.open('https://praiser.6x7.gr', '_blank');
});

// Make chat send button in playground also link to Praiser
const chatSendButton = document.querySelector('.chat-send-button');
if (chatSendButton) {
    chatSendButton.addEventListener('click', () => {
        window.open('https://praiser.6x7.gr', '_blank');
    });
}

// Make chat input also clickable
const chatInputFaux = document.querySelector('.chat-input-faux');
if (chatInputFaux) {
    chatInputFaux.style.cursor = 'pointer';
    chatInputFaux.addEventListener('click', () => {
        window.open('https://praiser.6x7.gr', '_blank');
    });
}

// Mini Games Modal (id="mini-games-modal")
const openMiniGamesButton = document.getElementById('open-mini-games-modal');
const miniGamesModalFirst = document.getElementById('mini-games-modal');
const closeMiniGamesButton = document.getElementById('close-mini-games-modal');

if (openMiniGamesButton && miniGamesModalFirst) {
    openMiniGamesButton.addEventListener('click', () => {
        miniGamesModalFirst.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMiniGamesButton && miniGamesModalFirst) {
    closeMiniGamesButton.addEventListener('click', () => {
        miniGamesModalFirst.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (miniGamesModalFirst) {
    miniGamesModalFirst.addEventListener('click', (e) => {
        if (e.target === miniGamesModalFirst) {
            miniGamesModalFirst.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && miniGamesModalFirst.classList.contains('active')) {
            miniGamesModalFirst.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
