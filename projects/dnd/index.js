/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import { randomNumber } from '../../scripts/helper';
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousedown', (e) => {
  if (!e.target.classList.contains('draggable-div')) return;
  const block = e.target;
  block.style.position = 'absolute';
  block.style.zIndex = 1000;
  document.body.append(block);
  moveAt(e.pageX, e.pageY);

  function moveAt(pageX, pageY) {
    block.style.left = pageX - block.offsetWidth / 2 + 'px';
    block.style.top = pageY - block.offsetHeight / 2 + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  block.addEventListener('mouseup', (e) => {
    document.removeEventListener('mousemove', onMouseMove);
    block.onmouseup = null;
  });
  document.addEventListener('mousemove', onMouseMove);
});

export function createDiv() {
  const div = document.createElement('div');
  setNewDivStyles(div);
  div.classList.add('draggable-div');
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

function setNewDivStyles(div) {
  div.style.top = `${randomNumber(100, 1000)}px`;
  div.style.left = `${randomNumber(0, 1000)}px`;
  div.style.width = `${randomNumber(0, 500)}px`;
  div.style.height = `${randomNumber(0, 500)}px`;
  div.style.backgroundColor =
    '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
}
