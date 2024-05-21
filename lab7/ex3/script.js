document.addEventListener('click', function(event) {
    const clickedElement = event.target;
  
    // Перевіряємо, чи клікнули на заголовок вузла
    if (clickedElement.classList.contains('node-header')) {
      // Знаходимо батьківський вузол (li) для заголовка
      const parentNode = clickedElement.parentNode;
  
      // Знаходимо елемент node-content для батьківського вузла
      const contentNode = parentNode.querySelector('.node-content');
  
      // Перевіряємо, чи вузол має дочірні вузли
      if (contentNode) {
        // Переключаємо видимість дочірніх вузлів
        contentNode.style.display = contentNode.style.display === 'none' ? 'block' : 'none';
      }
    }
  });
  