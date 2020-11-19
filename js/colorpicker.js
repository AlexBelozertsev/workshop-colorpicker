const colors = [
  { hex: '#f44336', rgb: '244,67,54' },
  { hex: '#e91e63', rgb: '233,30,99' },
  { hex: '#9c27b0', rgb: '156,39,176' },
  { hex: '#673ab7', rgb: '103,58,183' },
  { hex: '#3f51b5', rgb: '63,81,181' },
  { hex: '#2196f3', rgb: '33,150,243' },
  { hex: '#00bcd4', rgb: '0,188,212' },
  { hex: '#009688', rgb: '0,150,136' },
  { hex: '#4caf50', rgb: '76,175,80' },
  { hex: '#ffeb3b', rgb: '255,235,59' },
  { hex: '#ff9800', rgb: '255,152,0' },
  { hex: '#795548', rgb: '121,85,72' },
  { hex: '#607d8b', rgb: '96,125,139' },
];

// 1 step - create markup (in 1 long srting)
function createColorCardsMarkup(colors) {
    return colors.map(({hex, rgb}) => {
        return `
        <div class='color-card'>
            <div class='color-swatch'
                 data-hex='${hex}'
                 data-rgb='${rgb}'
                 style="background-color: ${hex}">
            </div>
            <div class='color-meta'>
                 <p>HEX: ${hex}</p>
                 <p>RGB: ${rgb}</p>
            </div>
        </div>`;
    }).join('');
};
// console.log(createColorCardsMarkup(colors));;


// 2 step - подстановка разметки в HTML
const palette = document.querySelector('.js-palette');
const cardMarkup = createColorCardsMarkup(colors);
palette.insertAdjacentHTML('beforeend', cardMarkup);


// 3 step - выбор цвета боди кликом в цвет карточки
palette.addEventListener('click', onPaletteClick);

function onPaletteClick(evt) {
// проверка на клик в палитру
    const colorSwatch = evt.target.classList.contains('color-swatch');
    if (!colorSwatch) {
        return;
    };
// body painting
    setBodyBgColor(evt.target.dataset.hex);
    animatedActiveCard(evt);
};

function setBodyBgColor(color) {
    document.body.style.backgroundColor = color
};

// 4 step - анимирование карточки
function animatedActiveCard(evt) {
    removeActiveCardClass();
    // вызов родителя (1 вложенность)
    // const parentColorCard = evt.target.parentNode;
// вызов ближайшего предка с заданными параметрами (closest - поиск вверх; querySelector - вглубь)
    const ancestorColorCard = evt.target.closest('.color-card');
    ancestorColorCard.classList.add('is-active');
};

function removeActiveCardClass() {
// делаю активной только 1 карточку
    const currentActiveCard = document.querySelector('.color-card.is-active');
        if (currentActiveCard) {
            currentActiveCard.classList.remove('is-active')
        }
};