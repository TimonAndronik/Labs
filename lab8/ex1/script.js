const GAME_NODE = document.querySelector("#game-board");
const WINNING_TEXT = document.querySelector("#victory-message");
const RESTART_GAME_BUTTON = document.querySelector("#new-game-button");
const FIELD_SIZE_SELECT = document.querySelector("#field-size");
const DIFFICULTY_SELECT = document.querySelector("#difficulty");
const START_GAME_BUTTON = document.querySelector("#start-game-button");
const VISIBLE_CARD_CLASSNAME = "visible";
const CARD_FLIP_TIMEOUT_MS = 500;

const CARD_ELEMENTS = {
  4: ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇", "🥥", "🍍"],
  6: ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇", "🥥", "🍍", "🍑", "🫐","🥭","🍈","🍋","🍊","🥑","🌶️","🥨","🍗"],
};

let CARDS_AMOUNT = getFieldSize() * getFieldSize(); // Default value for cards amount
let GAME_TIMER;
let VISIBLE_CARDS = [];
let score = 0;
let startTime; // Змінна для зберігання часу початку гри

START_GAME_BUTTON.addEventListener("click", startGame);
RESTART_GAME_BUTTON.addEventListener("click", startGame);
FIELD_SIZE_SELECT.addEventListener("change", updateCardAmount);

function getFieldSize() {
  return parseInt(FIELD_SIZE_SELECT.value);
}

function updateScoreDisplay() {
  const scoreDisplay = document.querySelector("#score-display");
  scoreDisplay.textContent = `Рахунок: ${score}`;
}

function startGame() {
  // Очищення поля та ініціалізація гри
  [GAME_NODE, WINNING_TEXT].forEach((element) => (element.innerHTML = ""));
  GAME_NODE.innerHTML = "";

  const fieldSize = getFieldSize();
  const CARD_VALUES = generateArrayWithPairs(
    CARD_ELEMENTS[fieldSize],
    CARDS_AMOUNT
  );

  if (CARD_VALUES === null) return;

  CARD_VALUES.forEach(renderCard);

  VISIBLE_CARDS = [];
  score = 0; // Скидання рахунку гравця при початку нової гри
  updateScoreDisplay(); // Оновлення відображення рахунку гравця

  clearInterval(GAME_TIMER);

  const renderedCards = document.querySelectorAll(".card");
  renderedCards.forEach((card) => card.classList.add(VISIBLE_CARD_CLASSNAME));

  setTimeout(() => {
    renderedCards.forEach((card) =>
      card.classList.remove(VISIBLE_CARD_CLASSNAME)
    );
    startTimer();
  }, CARD_FLIP_TIMEOUT_MS * 2);

  startTime = Date.now(); // Зберігання часу початку гри
}

function handleCardClick(card) {
  if (card.classList.contains(VISIBLE_CARD_CLASSNAME)) {
    return;
  }

  const checkVictory = () => {
    const visibleCardsNodes = document.querySelectorAll(
      `.${VISIBLE_CARD_CLASSNAME}`
    );

    const isVictory = visibleCardsNodes.length === CARDS_AMOUNT;
    const victoryMessage = `Вітаємо, ви перемогли! Зайняло часу: ${formatTime(
      Date.now() - startTime
    )}`;

    if (isVictory) {
      clearInterval(GAME_TIMER);
      WINNING_TEXT.textContent = victoryMessage;
    }
  };

  card
    .querySelector(".card-inner")
    .addEventListener("transitionend", checkVictory);

  card.classList.add(VISIBLE_CARD_CLASSNAME);

  VISIBLE_CARDS.push(card);

  if (VISIBLE_CARDS.length % 2 !== 0) {
    return;
  }

  const [prelastCard, lastCard] = VISIBLE_CARDS.slice(-2);

  if (lastCard.textContent !== prelastCard.textContent) {
    VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);

    setTimeout(() => {
      [lastCard, prelastCard].forEach((card) =>
        card.classList.remove(VISIBLE_CARD_CLASSNAME)
      );
    }, CARD_FLIP_TIMEOUT_MS);
  } else {
    incrementScore(); // Збільшення рахунку гравця при успішному підборі пари
    updateScoreDisplay(); // Оновлення відображення рахунку гравця
  }
}

function incrementScore() {
  score += 1;
}

function updateGridColumns(fieldSize) {
  const gameBoard = document.querySelector("#game-board");
  
  // Встановлюємо кількість стовпців у сітці гри відповідно до розміру поля
  gameBoard.style.gridTemplateColumns = `repeat(${fieldSize}, 1fr)`;
}

// При оновленні розміру поля викликаємо функцію updateGridColumns
function updateCardAmount() {
  const selectedSize = parseInt(FIELD_SIZE_SELECT.value);
  CARDS_AMOUNT = selectedSize * selectedSize;
  
  // Оновлюємо сітку гри
  updateGridColumns(selectedSize);
  
  startGame(); // Рестарт гри з новим розміром поля
}

function startTimer() {
  clearInterval(GAME_TIMER); // Clear previous timer

  const selectedDifficulty = DIFFICULTY_SELECT.value;
  let timerDuration;

  switch (selectedDifficulty) {
    case "easy":
      timerDuration = 180; // 3 minutes in seconds
      break;
    case "normal":
      timerDuration = 120; // 2 minutes in seconds
      break;
    case "hard":
      timerDuration = 60; // 1 minute in seconds
      break;
    default:
      timerDuration = 180; // Default to easy
      break;
  }

  let timeLeft = timerDuration;

  GAME_TIMER = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft < 0) {
      clearInterval(GAME_TIMER);
      WINNING_TEXT.textContent = "Час вийшов! Спробуйте ще раз.";
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      WINNING_TEXT.textContent = `Час: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }, 1000);
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function generateArrayWithPairs(arr, fieldSize) {
  if (!arr || arr.length * 2 !== fieldSize) { // Add null check
    const errorMessage =
      "Неможливо створити массив з парами із вказаним массивом і розміром.";

    console.error(errorMessage);
    return null;
  }

  const randomArray = [];
  const elementCounts = {};

  for (const item of arr) {
    elementCounts[item] = 0;
  }

  while (randomArray.length < fieldSize) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];

    if (elementCounts[randomElement] < 2) {
      randomArray.push(randomElement);
      elementCounts[randomElement]++;
    }
  }

  return randomArray;
}

function renderCard(cardText = "") {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  cardFront.textContent = "?";
  cardBack.textContent = cardText;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);

  card.addEventListener("click", handleCardClick.bind(this, card));

  GAME_NODE.appendChild(card);
}

startGame(); // Почати гру одразу при завантаженні сторінки
