function getDimensions() {
  const container = document.getElementById('container');
  const blocks = container.getElementsByClassName('block');
  const blockInfoContainer = document.getElementById('blockInfoContainer');
  
  blockInfoContainer.innerHTML = ''; // Очистити контейнер перед виведенням нової інформації
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const rect = block.getBoundingClientRect();
    const scrollTop = container.scrollTop;
    
    const dimensions = {
      width: block.offsetWidth,
      height: block.offsetHeight,
      windowCoordinates: {
        top: rect.top + scrollTop,
        left: rect.left,
      },
      containerCoordinates: {
        top: rect.top,
        left: rect.left,
      },
      containerScrollTop: scrollTop,
    };
    
    const blockInfo = document.createElement('div');
    blockInfo.classList.add('block-info');
    blockInfo.innerHTML = `
      <p>Block ${i + 1} dimensions:</p>
      <p>Width: ${dimensions.width}px</p>
      <p>Height: ${dimensions.height}px</p>
      <p>Window Coordinates (Top): ${dimensions.windowCoordinates.top}px</p>
      <p>Window Coordinates (Left): ${dimensions.windowCoordinates.left}px</p>
      <p>Container Coordinates (Top): ${dimensions.containerCoordinates.top}px</p>
      <p>Container Coordinates (Left): ${dimensions.containerCoordinates.left}px</p>
      <p>Container Scroll Top: ${dimensions.containerScrollTop}px</p>
    `;
    
    blockInfoContainer.appendChild(blockInfo);
  }
}

function changeSize() {
  const newSize = prompt('Введіть новий розмір блоку (px):');
  const blocks = document.getElementsByClassName('block');
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    block.style.width = newSize + 'px';
    block.style.height = newSize + 'px';
  }
}

function toggleElement() {
  const additionalContent1 = document.getElementById('additionalContent1');
  const additionalContent2 = document.getElementById('additionalContent2');
  
  const displayValue1 = additionalContent1.style.display === 'none' ? 'block' : 'none';
  const displayValue2 = additionalContent2.style.display === 'none' ? 'block' : 'none';

  additionalContent1.style.display = displayValue1;
  additionalContent2.style.display = displayValue2;
}

document.addEventListener("DOMContentLoaded", function() {
  const togglerElements = document.querySelectorAll("[data-toggle-id]");
  togglerElements.forEach(toggler => {
      toggler.addEventListener("click", function() {
          const targetId = this.getAttribute("data-toggle-id");
          const targetElement = document.getElementById(targetId); // Отримуємо елемент за id
          const toggleElement = document.getElementById(`toggle${targetId.substring(6)}`); // Отримуємо елемент для тоглу
          if (toggleElement.style.display === "none") {
              toggleElement.style.display = "block";
          } else {
              toggleElement.style.display = "none";
          }
          
      });
  });

  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => {
      block.addEventListener("click", function() {
          const width = this.offsetWidth;
          const height = this.offsetHeight;
          const toggleId = this.getAttribute("data-toggle-id");
          const widthSpan = document.getElementById(`${toggleId}Width`);
          const heightSpan = document.getElementById(`${toggleId}Height`);
          widthSpan.textContent = width + "px";
          heightSpan.textContent = height + "px";
      });
  });

  const additionalContent1 = document.getElementById('additionalContent1');
  const additionalContent2 = document.getElementById('additionalContent2');

  additionalContent1.addEventListener("click", function() {
      const targetId = this.getAttribute("data-toggle-id");
      const targetBlock = document.getElementById(targetId);
      if (targetBlock.style.display === 'none') {
          targetBlock.style.display = 'block';
      } else {
          targetBlock.style.display = 'none';
      }
  });

  additionalContent2.addEventListener("click", function() {
      const targetId = this.getAttribute("data-toggle-id");
      const targetBlock = document.getElementById(targetId);
      if (targetBlock.style.display === 'none') {
          targetBlock.style.display = 'block';
      } else {
          targetBlock.style.display = 'none';
      }
  });
});
