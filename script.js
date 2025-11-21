// Video Controls
const video = document.getElementById('productVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const videoWrapper = document.querySelector('.video-wrapper');
const playIcon = playPauseBtn.querySelector('.icon-play');
const pauseIcon = playPauseBtn.querySelector('.icon-pause');

// Toggle play/pause
function togglePlayPause() {
    if (video.paused) {
        video.play();
        videoWrapper.classList.remove('paused');
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        video.pause();
        videoWrapper.classList.add('paused');
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent bubbling to video wrapper if we add click there
    togglePlayPause();
});

// Allow clicking on the video itself to toggle
video.addEventListener('click', togglePlayPause);

// Update button state when video plays/pauses (in case triggered by other means)
video.addEventListener('play', () => {
    videoWrapper.classList.remove('paused');
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
});

video.addEventListener('pause', () => {
    videoWrapper.classList.add('paused');
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
});

// CTA Button Click Handler
const ctaBtn = document.getElementById('ctaBtn');
ctaBtn.addEventListener('click', () => {
    // Customize this for your needs
    alert('Thank you for your interest in Folio Stand! 🎉\n\nThis button can be customized to:\n• Redirect to a purchase page\n• Open WhatsApp chat\n• Show a contact form\n• Add to cart');

    // Example WhatsApp integration:
    // const phoneNumber = '1234567890'; // Replace with your number
    // const message = encodeURIComponent('Hi! I\'m interested in the Folio Stand');
    // window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
});

// Smooth scroll for anchor links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe benefit cards and spec items for fade-in effects
document.querySelectorAll('.benefit-card, .spec-item').forEach(el => {
    fadeInObserver.observe(el);
});

// Pause video when out of viewport (performance optimization)
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && !video.paused) {
            video.pause();
        }
    });
}, { threshold: 0.25 });

videoObserver.observe(video);

// Touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.benefit-card, .description-block, .specs-block').forEach(card => {
        card.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', function () {
            this.style.transform = '';
        }, { passive: true });
    });
}

// Log page load for analytics (optional)
console.log('Folio Stand landing page loaded successfully! 🚀');
