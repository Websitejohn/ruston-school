  // Improved JavaScript organization
  class OnboardingCarousel {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.indicators = document.querySelectorAll('.indicator');
        this.circularButtons = document.querySelectorAll('.circular-button');
        this.backButtons = document.querySelectorAll('.back-button');
        this.currentIndex = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handlePreloader();
    }

    handlePreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    updateScreen(index) {
        if (index < 0 || index >= this.screens.length) return;
        
        this.screens.forEach((screen, i) => {
            screen.classList.toggle('active', i === index);
            screen.classList.toggle('inactive', i !== index);
            this.indicators[i].classList.toggle('active', i === index);
            this.indicators[i].setAttribute('aria-selected', i === index);
        });

        this.currentIndex = index;
    }

    setupEventListeners() {
        // Touch events
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Button clicks
        this.circularButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateScreen((this.currentIndex + 1) % this.screens.length);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.updateScreen(index));
        });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (Math.abs(swipeDistance) > 100) {
            const newIndex = swipeDistance > 0 
                ? (this.currentIndex - 1 + this.screens.length) % this.screens.length
                : (this.currentIndex + 1) % this.screens.length;
            this.updateScreen(newIndex);
        }
    }

    handleKeydown(e) {
        if (e.key === 'ArrowRight') {
            this.updateScreen((this.currentIndex + 1) % this.screens.length);
        } else if (e.key === 'ArrowLeft') {
            this.updateScreen((this.currentIndex - 1 + this.screens.length) % this.screens.length);
        }
    }
}

// Initialize the carousel
document.addEventListener('DOMContentLoaded', () => {
    new OnboardingCarousel();
});