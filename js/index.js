// Функція для самодруку тексту
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Девіз компанії
const motto = "Інновації сьогодні - майбутнє завтра!";

// Отримуємо елементи
const startupName = document.querySelector('.startup-name');
const mottoText = document.getElementById('motto-text');

// Встановлюємо стилі для девізу
if (mottoText && startupName) {
  // Отримуємо computed стилі назви для розрахунку товщини
  const nameStyles = window.getComputedStyle(startupName);
  const nameFontWeight = parseFloat(nameStyles.fontWeight) || 400;
  const nameFontSize = parseFloat(nameStyles.fontSize) || 24;
  
  mottoText.style.color = '#8B0000'; // Темно-червоний колір
  mottoText.style.fontWeight = (nameFontWeight * 1.2).toString();
  mottoText.style.fontSize = nameFontSize + 'px';
  mottoText.style.marginTop = '10px';
  mottoText.style.textAlign = 'center';
  
  // Запускаємо самодрук після завантаження сторінки
  window.addEventListener('load', () => {
    setTimeout(() => {
      typeWriter(mottoText, motto, 80);
    }, 500);
  });
}

// Функція для темнішого фону в нічний час (21:00 - 6:00)
function applyNightMode() {
  const currentHour = new Date().getHours();
  const isNightTime = currentHour >= 21 || currentHour < 6;
  
  if (isNightTime) {
    // Додаємо клас для нічного режиму
    document.body.classList.add('night-mode');
    
    // Затемнюємо основні елементи
    const elementsToDarken = [
      'body',
      '.main-content',
      '.main-section',
      '#aside-block',
      '.founders-info',
      '.contacts-info',
      '.navigation',
      '.logo-block',
      '.project-item',
      'header',
      'main',
      'footer'
    ];
    
    elementsToDarken.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const bgColor = styles.backgroundColor;
        
        // Перевіряємо, чи є колір фону (не transparent)
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          // Конвертуємо RGB в темніший відтінок (зменшуємо на 40%)
          const rgbMatch = bgColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = Math.max(0, Math.floor(parseInt(rgbMatch[0]) * 0.6));
            const g = Math.max(0, Math.floor(parseInt(rgbMatch[1]) * 0.6));
            const b = Math.max(0, Math.floor(parseInt(rgbMatch[2]) * 0.6));
            
            // Застосовуємо темніший колір
            element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        }
      });
    });
    
    // Затемнюємо body якщо не має фону
    if (!document.body.style.backgroundColor || document.body.style.backgroundColor === 'transparent') {
      document.body.style.backgroundColor = 'rgb(145, 173, 186)'; // 60% від початкового #ecf0f1
    }
  }
}

// Застосовуємо нічний режим при завантаженні
window.addEventListener('load', applyNightMode);

// Модальне вікно з загадкою
const founderImage = document.getElementById('founder-image');
const riddleModal = document.getElementById('riddle-modal');
const closeModal = document.querySelector('.close-modal');
const checkAnswerBtn = document.getElementById('check-answer-btn');
const riddleAnswer = document.getElementById('riddle-answer');
const riddleResult = document.getElementById('riddle-result');

// Правильна відповідь на загадку
const correctAnswer = 'час';

// Відкриття модального вікна при наведенні на зображення засновника
if (founderImage && riddleModal) {
  founderImage.addEventListener('mouseenter', () => {
    riddleModal.style.display = 'block';
    riddleAnswer.value = '';
    riddleResult.textContent = '';
  });
  
  // Закриття модального вікна
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      riddleModal.style.display = 'none';
    });
  }
  
  // Закриття при кліку поза модальним вікном
  window.addEventListener('click', (event) => {
    if (event.target === riddleModal) {
      riddleModal.style.display = 'none';
    }
  });
  
  // Перевірка відповіді
  if (checkAnswerBtn) {
    checkAnswerBtn.addEventListener('click', () => {
      const userAnswer = riddleAnswer.value.trim().toLowerCase();
      
      if (userAnswer === correctAnswer) {
        riddleResult.textContent = '✅ Правильно! Секрет успіху - це правильно використовувати час!';
        riddleResult.style.color = 'green';
      } else {
        riddleResult.textContent = '❌ Неправильно. Спробуйте ще раз!';
        riddleResult.style.color = 'red';
      }
    });
    
    // Перевірка при натисканні Enter
    riddleAnswer.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checkAnswerBtn.click();
      }
    });
  }
}

