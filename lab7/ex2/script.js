function addBlock() {
  const container = document.getElementById('container');
  const blockContent = prompt('Введіть текст для нового блоку:');
  if (blockContent) {
    const block = document.createElement('div');
    block.className = 'block';
    block.style.backgroundColor = getRandomColor();
    block.style.width = getRandomSize() + 'px';
    block.style.height = getRandomSize() + 'px';
    block.textContent = blockContent;
    container.appendChild(block);

    // Застосування анімації з'явлення блоку
    block.classList.add('fade-in');
    setTimeout(function() {
      block.classList.remove('fade-in');
    }, 300); // Затримка, щоб зберегти час анімації

    // Перевірка переповнення контейнера та анімація прокрутки
    if (container.scrollHeight > container.clientHeight) {
      container.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior: 'smooth'
      });
    }
  }
}

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function getRandomSize() {
  return Math.floor(Math.random() * 100) + 50; // Випадковий розмір від 50 до 150px
}

document.getElementById('container').addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('block')) {
    showPopupMenu(target);
  }
});

function showPopupMenu(block) {
  // Перевірка, чи вже існує попап-меню для цього блоку
  if (block.querySelector('.popup-menu')) {
    return; // Якщо так, виходимо із функції
  }

  const popupMenu = document.createElement('div');
  popupMenu.className = 'popup-menu';
  const rgbColor = block.style.backgroundColor.match(/\d+/g); // Отримання масиву чисел (r, g, b)
  const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]); // Перетворення RGB в HEX
  popupMenu.innerHTML = `
    <div>
      <div>
        <label for="color">Колір:</label>
        <input type="color" id="color" value="${hexColor}">
      </div>
      <div>
        <label for="text">Текст:</label>
        <input type="text" id="text" value="${block.textContent}">
      </div>
      <div>
        <label for="width">Ширина:</label>
        <input type="number" id="width" value="${block.offsetWidth}">
      </div>
      <div>
        <label for="height">Висота:</label>
        <input type="number" id="height" value="${block.offsetHeight}">
      </div>
      <button onclick="applyChanges(this.parentNode.parentNode)">Застосувати</button>

    </div>
  `;
  block.appendChild(popupMenu);
}


// Функція для перетворення RGB у HEX
function rgbToHex(r, g, b) {
  r = parseInt(r, 10).toString(16).padStart(2, '0');
  g = parseInt(g, 10).toString(16).padStart(2, '0');
  b = parseInt(b, 10).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}


function applyChanges(popupMenu) {
  const block = popupMenu.parentNode;

  const colorInput = popupMenu.querySelector('#color');
  const textInput = popupMenu.querySelector('#text');
  const widthInput = popupMenu.querySelector('#width');
  const heightInput = popupMenu.querySelector('#height');

  block.style.backgroundColor = colorInput.value;
  block.textContent = textInput.value;
  block.style.width = widthInput.value + 'px';
  block.style.height = heightInput.value + 'px';

  // Видалення випадаючого меню
  popupMenu.parentNode.removeChild(popupMenu);
}

// Додайте обробники подій на блок та вікно документу
document.getElementById('container').addEventListener('mouseover', function(event) {
  const target = event.target;
  if (target.classList.contains('block')) {
    // Перевірка, чи натиснута клавіша Shift
    document.addEventListener('keydown', function(e) {
      if (e.shiftKey) {
        // Видалення блока
        target.parentNode.removeChild(target);
      }
    });
  }
});