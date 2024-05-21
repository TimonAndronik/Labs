document.addEventListener('DOMContentLoaded', function() {
    const prevBtns = document.querySelectorAll('.prev');
    const nextBtns = document.querySelectorAll('.next');
    const slides = document.querySelector('.slides');
    const pagination = document.querySelector('.pagination');
    const config = {
        duration: 500, // Час анімації в мілісекундах
        autoplay: true, // Автоматичне прокручування
        autoplayInterval: 3000, // Інтервал між автоматичними прокручуваннями в мілісекундах
        showArrows: true, // Відображення стрілок
        showPagination: true, // Відображення пагінації
    };
    let counter = 0;
    let slideWidth = slides.querySelector('.slide').clientWidth;
    let autoplayInterval;

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            counter--;
            if (counter < 0) {
                counter = slides.querySelectorAll('.slide').length - 1;
            }
            updateSlidePosition();
            updatePagination();
        } else if (event.key === 'ArrowRight') {
            counter++;
            if (counter >= slides.querySelectorAll('.slide').length) {
                counter = 0;
            }
            updateSlidePosition();
            updatePagination();
        }
    });
    
    let isAutoplayRunning = false;
    function updateSlideSize() {
        let currentPosition = -counter * slideWidth; // Оголошуємо змінну currentPosition
    
        slideWidth = slides.querySelector('.slide').clientWidth;
    
        slides.style.transition = `transform ${config.duration}ms ease`;
        slides.style.transform = `translateX(${currentPosition}px)`;
    }
    

    // Оновлення розмірів слайдів після завантаження сторінки
    updateSlideSize();

    window.addEventListener('resize', () => {
        updateSlideSize();
    });
// Функція для запуску автоматичного прокручування
function startAutoplay() {
    if (!isAutoplayRunning) {
        isAutoplayRunning = true;
        autoplayInterval = setInterval(() => {
            counter++;
            if (counter >= slides.querySelectorAll('.slide').length) {
                counter = 0;
            }
            updateSlidePosition();
            updatePagination();
        }, config.autoplayInterval);
    }
}

// Функція для зупинки автоматичного прокручування
function stopAutoplay() {
    clearInterval(autoplayInterval);
    isAutoplayRunning = false;
}


    // Запускаємо автоматичне прокручування при завантаженні сторінки
    if (config.autoplay) {
        startAutoplay();
    }

    // Обробники подій для стрілок "prev" та "next"
    prevBtns.forEach(prevBtn => {
        prevBtn.addEventListener('click', () => {
            counter--;
            if (counter < 0) {
                counter = slides.querySelectorAll('.slide').length - 1;
            }
            updateSlidePosition();
            updatePagination();
            if (config.autoplay) {
                stopAutoplay();
                startAutoplay(); // Перезапускаємо автоматичне прокручування після кожного кліку на стрілки
            }
        });
    });

    nextBtns.forEach(nextBtn => {
        nextBtn.addEventListener('click', () => {
            counter++;
            if (counter >= slides.querySelectorAll('.slide').length) {
                counter = 0;
            }
            updateSlidePosition();
            updatePagination();
            if (config.autoplay) {
                stopAutoplay();
                startAutoplay(); // Перезапускаємо автоматичне прокручування після кожного кліку на стрілки
            }
        });
    });

    // Оновлений метод оновлення положення слайду з врахуванням конфігурації
    function updateSlidePosition() {
        const currentPosition = -counter * slideWidth;
        slides.style.transition = `transform ${config.duration}ms ease`; // Встановлюємо швидкість анімації
        slides.style.transform = `translateX(${currentPosition}px)`;

        // Оновлення затемнення слайдів
        slides.querySelectorAll('.slide').forEach((slide, index) => {
            if (index === counter) {
                slide.style.transition = `opacity ${config.duration}ms ease`;
                slide.style.opacity = 1;
            } else {
                slide.style.transition = `opacity ${config.duration}ms ease`;
                slide.style.opacity = 0.1;
            }
        });
    }

    // Оновлений метод оновлення пагінації з врахуванням конфігурації
    function updatePagination() {
        if (config.showPagination) {
            pagination.innerHTML = '';
            slides.querySelectorAll('.slide').forEach((slide, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === counter) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    counter = index;
                    updateSlidePosition();
                    updatePagination();
                });
                pagination.appendChild(dot);
            });
        } else {
            pagination.innerHTML = ''; // Видаляємо пагінацію, якщо вона вимкнена
        }
    }

    // Перевірка наявності і відображення стрілок
    if (!config.showArrows) {
        prevBtns.forEach(btn => btn.style.display = 'none');
        nextBtns.forEach(btn => btn.style.display = 'none');
    }

    // Перевірка автоматичного прокручування і його запуск
    if (config.autoplay) {
        slides.addEventListener('mouseenter', stopAutoplay); // Зупинка автопрокрутки при наведенні
        slides.addEventListener('mouseleave', startAutoplay); // Перезапуск автопрокрутки при відведенні
    }

    // Виклик функцій оновлення після завантаження документу
    updateSlidePosition();
    updatePagination();
});
