const initialBoxes = [
  { text: '1x0', className: 'box teal' },
  { text: '1x1', className: 'box teal' },
  { text: '1x2', className: 'box teal' },
  { text: '1x3', className: 'box teal' },
  { text: '2x0', className: 'box green' },
  { text: '2x1', className: 'box green' },
  { text: '2x2', className: 'box green' },
  { text: '2x3', className: 'box green' },
  { text: '3x0', className: 'box yellow' },
  { text: '3x1', className: 'box yellow' },
  { text: '3x2', className: 'box yellow' },
  { text: '3x3', className: 'box yellow' },
  { text: '4x0', className: 'box crimson' },
  { text: '4x1', className: 'box crimson' },
  { text: '4x2', className: 'box crimson' },
  { text: '4x3', className: 'box crimson' }
];

function shuffleCells() {
  const container = document.querySelector('.container');
  let boxes = Array.from(container.querySelectorAll('.box'));

  if (boxes.length === 1) {
      alert(`Winner is ${boxes[0].textContent}`);
      resetBoxes();
      return;
  }

  for (let i = boxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
  }

  function isInvalid(arr, index) {
      return (index > 0 && arr[index].className === arr[index - 1].className) ||
             (index > 1 && arr[index].className === arr[index - 2].className);
  }

  let valid = false;
  while (!valid) {
      valid = true;
      for (let i = 0; i < boxes.length; i++) {
          if (isInvalid(boxes, i)) {
              valid = false;
              const j = Math.floor(Math.random() * boxes.length);
              [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
          }
      }
  }

  const halfLength = Math.ceil(boxes.length / 2);
  const remainingBoxes = boxes.slice(0, halfLength);

  for (let i = halfLength; i < boxes.length; i++) {
    boxes[i].style.transform = 'scale(0)';
    boxes[i].style.opacity = '0';
}

setTimeout(() => {
    const rows = container.querySelectorAll('.row');
    rows.forEach(row => row.innerHTML = '');

    for (let i = 0; i < remainingBoxes.length; i++) {
        rows[Math.floor(i / 4)].appendChild(remainingBoxes[i]);
        remainingBoxes[i].style.transform = 'scale(1)';
        remainingBoxes[i].style.opacity = '1';
    }
}, 500);
}

function resetBoxes() {
  const container = document.querySelector('.container');
  const rows = container.querySelectorAll('.row');
  rows.forEach(row => row.innerHTML = '');

  initialBoxes.forEach((box, index) => {
      const div = document.createElement('div');
      div.className = box.className;
      div.textContent = box.text;
      div.style.transform = 'scale(1)';
      div.style.opacity = '1';
      rows[Math.floor(index / 4)].appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', resetBoxes);