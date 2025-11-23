// Карусель зображень проєктів
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Створюємо індикатори
const indicatorsContainer = document.getElementById('carouselIndicators');
if (indicatorsContainer) {
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
  }
}

// Функція для переходу до конкретного слайду
function goToSlide(slideIndex) {
  if (slideIndex < 0) {
    currentSlide = totalSlides - 1;
  } else if (slideIndex >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = slideIndex;
  }
  
  const slidesContainer = document.getElementById('carouselSlides');
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Оновлюємо індикатори
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Обробники кнопок
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });
}

// Автоматична зміна слайдів (опціонально)
let autoSlideInterval;
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000); // Зміна кожні 5 секунд
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
}

// Запускаємо автоматичну зміну при завантаженні
window.addEventListener('load', () => {
  startAutoSlide();
  
  // Зупиняємо при наведенні миші
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }
});

// Обмеження висоти елементів каруселі до 20% від ширини вікна
function updateCarouselHeight() {
  const viewportWidth = window.innerWidth;
  const maxHeight = viewportWidth * 0.2; // 20% від ширини вікна
  
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  carouselImages.forEach(img => {
    img.style.maxHeight = `${maxHeight}px`;
  });
}

// Оновлюємо висоту при завантаженні та зміні розміру вікна
window.addEventListener('load', updateCarouselHeight);
window.addEventListener('resize', updateCarouselHeight);

