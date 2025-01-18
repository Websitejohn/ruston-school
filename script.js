const screens = document.querySelectorAll('.screen');
const indicators = document.querySelectorAll('.indicator');
const circularButton = document.querySelectorAll('.circular-button');
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;


// Function to update the current screen and indicator
function updateScreen(index) {
  try {
    screens.forEach((screen, screenIndex) => {
      screen.classList.remove('active');
      screen.classList.add('inactive');
      indicators[screenIndex].classList.remove('active');
    });

    screens[index].classList.remove('inactive');
    screens[index].classList.add('active');
    indicators[index].classList.add('active');

    currentIndex = index;
  } catch (error) {
    console.error(error);
  }
}

// Add event listeners to the circular buttons
circularButton.forEach((button, index) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    updateScreen((currentIndex + 1) % screens.length);
  });
});

// Add event listeners to the indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', (event) => {
    event.preventDefault();
    updateScreen(index);
  });
});

// Add event listeners for swipe gestures
screens.forEach((screen) => {
  screen.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  });

  screen.addEventListener('touchmove', (event) => {
    event.preventDefault();
  });

  screen.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 100) {
      // Swipe right
      updateScreen((currentIndex - 1 + screens.length) % screens.length);
    } else if (swipeDistance < -100) {
      // Swipe left
      updateScreen((currentIndex + 1) % screens.length);
    }
  });
});

// Add event listeners for keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    updateScreen((currentIndex + 1) % screens.length);
  } else if (event.key === 'ArrowLeft') {
    updateScreen((currentIndex - 1 + screens.length) % screens.length);
  }
});
