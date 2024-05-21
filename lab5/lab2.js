// Оголошення змінних
let lampState = false; 
let lampType = "звичайна"; 
let brightness = 100; 
let idleTimeout; 

// Функція для зміни стану лампочки
function toggleLamp() {
  lampState = !lampState; 
  renderLamp(); 
}

// Функція для оновлення зображення лампочки
function renderLamp() {
    const lampImage = document.getElementById("lamp-image");
    lampImage.src = lampState ? "4-2.png" : "4-1.png"; 
  }

// Функція для зміни типу лампочки
function setLampType(type) {
    lampType = type; 
    renderLamp(); 
  }
  
  // Оновлена функція для оновлення зображення лампочки з урахуванням типу
  function renderLamp() {
    const lampImage = document.getElementById("lamp-image");
    let imageName;
    
    // Визначення назви файлу зображення в залежності від типу лампочки та стану
    if (lampState) {
      imageName = lampType === "звичайна" ? "nak 1.png" : (lampType === "світлодіодна" ? "4-2.png" : "4-2.png");
    } else {
      imageName = lampType === "звичайна" ? "nak2.png" : (lampType === "світлодіодна" ? "4-1.png" : "4-1.png");
    }
    
    lampImage.src = imageName; 
  }
  
  document.getElementById("lamp-type-select").addEventListener("change", function() {
    const selectedType = this.value; 
    setLampType(selectedType); 
  });
  

// Функція для зміни яскравості лампочки
function changeBrightness() {
    if (lampType !== "світлодіодна" || !lampState) {
        alert("Ця опція доступна лише для включеної світлодіодної лампочки.");
        return;
    }

    let inputBrightness = prompt("Введіть новий відсоток яскравості (від 0 до 100):");
    inputBrightness = parseInt(inputBrightness);
    if (!isNaN(inputBrightness) && inputBrightness >= 0 && inputBrightness <= 100) {
        brightness = inputBrightness; 
        renderLamp(); 
    } else {
        alert("Будь ласка, введіть коректне значення відсотка яскравості (від 0 до 100)!");
    }
}
// Оновлена функція для оновлення зображення лампочки з урахуванням типу та яскравості
function renderLamp() {
    const lampImage = document.getElementById("lamp-image");
    let imageName;

    // Визначення назви файлу зображення в залежності від типу лампочки та стану
    if (lampState) {
        imageName = lampType === "звичайна" ? "nak 1.png" : (lampType === "світлодіодна" ? "4-2.png" : "4-2.png");
    } else {
        imageName = lampType === "звичайна" ? "nak2.png" : (lampType === "світлодіодна" ? "4-1.png" : "4-1.png");
    }

    lampImage.src = imageName; // Встановлення відповідного зображення

    
    if (lampType === "світлодіодна") {
        lampImage.style.filter = `brightness(${brightness}%)`; 
    } else {
        lampImage.style.filter = "brightness(100%)"; 
    }
}
  

// Функція для вимкнення лампочки через певний час бездіяльності
function setAutoTurnOff() {
    if (!lampState) {
      alert("Включіть лампочку");
      return; 
    }
  
    clearTimeout(idleTimeout); 
    idleTimeout = setTimeout(function() {
      lampState = false; 
      renderLamp(); 
      alert("Лампочка була вимкнена через бездіяльність!");
    }, 15000); 
  }
// Додавання обробників подій для кнопок та виклик функції renderLamp при завантаженні сторінки
window.onload = function() {
  renderLamp(); 
  document.getElementById("toggle-button").addEventListener("click", toggleLamp);
  document.getElementById("brightness-button").addEventListener("click", changeBrightness);
  document.getElementById("auto-turn-off").addEventListener("click", setAutoTurnOff);
};
