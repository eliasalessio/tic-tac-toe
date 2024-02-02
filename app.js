const cross = `<div class="cross bouncy"></div>`
const circle = `<div class="circle bouncy"></div>`

let isCross = true
let isWin = false

function bootstrap(){
	const board = document.querySelector('.board');
	const cells = board.children;
  const restartBtn = document.querySelector('.restart');
  restartBtn.addEventListener('mousedown', () => restartGame(cells, restartBtn))
  for(const cell of cells){
  	cell.addEventListener('mousedown', () => onCellClick(cell, cells, restartBtn))
  }
}

function restartGame(cells, restartBtn){
  for (const _cell of cells) {
  	if(_cell.children.length > 0){
      _cell.children[0].classList.remove('bouncy');
      _cell.children[0].classList.add('bouncy-out');
    }
  }
	restartBtn.classList.remove('fade-in-rotate');
  restartBtn.classList.add('fade-out-rotate');
  setTimeout(() => {
    for (const _cell of cells) {
      _cell.innerHTML = '';
      restartBtn.classList.remove('fade-out-rotate');
      isCross = true;
      isWin = false;
    }
  }, 700);
}

function onCellClick(cell, cells, restartBtn){
	 if(cell.innerHTML.trim().length > 0 || isWin) return;
	 cell.innerHTML = isCross ? cross : circle;
   isCross = !isCross;
   
   if(checkWinner(cells)){
   	isWin	= true;
    restartBtn.classList.add('fade-in-rotate');	
   } else
     for (const _cell of cells) {
      if(_cell.innerHTML.trim().length === 0)
        return;
     }
    isWin	= true;
    restartBtn.classList.add('fade-in-rotate');
}

function checkWinner(cells) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

   for (const combo of winningCombos) {
    const [a, b, c] = combo;
    const aChild = cells[a].children[0];
    const bChild = cells[b].children[0];
    const cChild = cells[c].children[0];
    
    if (aChild && bChild && cChild &&
      aChild.classList.contains('cross') &&
      bChild.classList.contains('cross') &&
      cChild.classList.contains('cross')
    ) {
      return 'X'; // "X" has won
    } else if (aChild && bChild && cChild &&
      aChild.classList.contains('circle') &&
      bChild.classList.contains('circle') &&
      cChild.classList.contains('circle')
    ) {
      return 'O'; // "O" has won
    }
  }

  return false; // No winner yet
}


bootstrap();