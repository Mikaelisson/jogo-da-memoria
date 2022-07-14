const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

let techs = [
  "bootstrap",
  "css",
  "electron",
  "firebase",
  "html",
  "javascript",
  "jquery",
  "mongo",
  "node",
  "react",
];

let cards = null;

startGame();

function startGame() {
  cards = createCardsFromTechs(techs);
  shuflleCards(cards);
  initializeCards(cards);
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");

  cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.classList.add(CARD);
    cardElement.id = card.id;
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let elementIcon = document.createElement("div");
  elementIcon.classList.add(face);
  if (face === FRONT) {
    let img = document.createElement("img");
    img.classList.add(ICON);
    img.src = "./assets/img/" + card.icon + ".png";
    elementIcon.appendChild(img);
  } else {
    elementIcon.innerHTML = "&lt/&gt";
  }

  element.appendChild(elementIcon);
}

function shuflleCards(cards) {
  let currentIndex = cards.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      cards[randomIndex],
    ];
  }
}

createCardsFromTechs(techs);
function createCardsFromTechs(techs) {
  let cards = [];

  techs.forEach((tech) => {
    cards.push(createPairFromTechs(tech));
  });
  return cards.flatMap((pair) => pair);
}

function createPairFromTechs(tech) {
  return [
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false,
    },
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false,
    },
  ];
}

function createIdWithTech(tech) {
  return tech + parseInt(Math.random() * 1000);
}

function flipCard() {
  this.classList.add("flip");
}
