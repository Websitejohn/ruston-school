const screens = document.querySelectorAll('.screen');
const indicators = document.querySelectorAll('.indicator');
const circularButton = document.querySelectorAll('.circular-button');
let currentIndex = 0;

// Function to update the current screen and indicator
function updateScreen(index) {
  screens.forEach((screen, screenIndex) => {
    screen.classList.remove('active');
    screen.classList.add('inactive');
    indicators[screenIndex].classList.remove('active');
  });

  screens[index].classList.remove('inactive');
  screens[index].classList.add('active');
  indicators[index].classList.add('active');

  currentIndex = index;
}

// Add event listeners to the circular buttons
circularButton.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateScreen((currentIndex + 1) % screens.length);
  });
});

// Add event listeners to the indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    updateScreen(index);
  });
});