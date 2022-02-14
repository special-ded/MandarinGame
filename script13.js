// 1. Добавить возможность рестарта до перезагрузки страницы.

// 2. Добавить возможность выбрать сложность.

// 5. Сохранять результаты (до перезагрузки страницы), 
// отображать их пользователю и 
// сортировать от больших к меньшим (Highest scores).

const icon = document.querySelector('#icon');
const grinch = document.querySelector('.grinch');
let mandarin = document.querySelector('.mandarin');
let mandarinsAmmount = 0;
let mandarinsAmmountElement = document.querySelector('.mandarin-amount')
let startButton = document.querySelector('#startButton');
let gameDuration = 10;
let timerElement = document.querySelector('.timer')
let gameInterval;
let mandarinInterval;
let grinchIntervalDelay;
let easyButton = document.querySelector('#easyButton')
let normalButton = document.querySelector('#normalButton')
let nightmareButton = document.querySelector('#nightmareButton')
let difficultyButtons = document.querySelector('.difficulty_btn');
let body = document.querySelector('body')
let interval = 500;
let score;
let scoreArr = [];
let scoreArrForFilter = [];
let orderedList = document.getElementById('ol'); 

startButton.style.display = 'none';


easyButton.addEventListener('click',(event)=>{
  redyToStart()
  interval = 1500;
  resetGame()
})
normalButton.addEventListener('click',(event)=>{
  redyToStart()
  interval = 1000;
  resetGame()
})
nightmareButton.addEventListener('click',(event)=>{
  redyToStart()
  interval = 500;
  resetGame()
  body.style.backgroundColor = 'red'
})

function redyToStart(){
  body.style.backgroundColor = 'aquamarine'
  difficultyButtons.style.display = 'none'
  startButton.style.display = 'block'
}

mandarin.addEventListener('click',(event) =>{
  mandarinsAmmount++
  mandarinsAmmountElement.textContent = `You caught  ${mandarinsAmmount}   mandarins `
  scoreArr.push(mandarinsAmmount)

  // addToList(scoreArr)
  setMandarinPosition();
  clearInterval(mandarinInterval)
  mandarinInterval = setInterval(setMandarinPosition, interval)
  return scoreArr
});

function resetGame(){
  gameDuration = 10
  mandarinsAmmount = 0;
  timerElement.textContent = `${gameDuration} seconds left`
  mandarinsAmmountElement.textContent = `You caught  ${mandarinsAmmount}   mandarins `;
}

function setMandarinPosition(){
  icon.style.left = Math.round(Math.random()*274)+ 'px' ;
  icon.style.top = Math.round(Math.random()*274)+ 'px' ;
    if(gameDuration === grinchIntervalDelay){
      mandarin.style.display = 'none';
      grinch.style.display = 'block';
      grinchIntervalDelay = Math.round(Math.random()*gameDuration);
    }else{
      mandarin.style.display = 'block';
      grinch.style.display = 'none';
    }
}

function startGame(){
  if(gameDuration === 1){
    difficultyButtons.style.display = 'block'
    icon.style.display = 'none';
    clearInterval(gameInterval)
    clearInterval(mandarinInterval)
    timerElement.textContent = `Game over`
    scoreArrForFilter.push(mandarinsAmmount)
    scoreArrForFilter.sort(function(a,b){ 
      return  b - a 
      })
      deleteChild()
      addToList(scoreArrForFilter);
    return;
  }
  gameDuration--
  timerElement.textContent = `${gameDuration} seconds left`  

}

startButton.addEventListener('click', event=>{
  setMandarinPosition()
  startButton.style.display = 'none'
  icon.style.display = 'block';
  
  resetGame()
  grinchIntervalDelay = Math.round(Math.random()*gameDuration); 
  mandarinInterval = setInterval(setMandarinPosition, interval);
  gameInterval = setInterval(startGame, 1000);
});

grinch.addEventListener('click',()=>{
  gameDuration = 10;
  // mandarinsAmmount--
  timerElement.textContent = `Game over`
  scoreArrForFilter.push(mandarinsAmmount)
  scoreArrForFilter.sort(function(a,b){ 
  return  b - a
  });
  deleteChild();
  addToList(scoreArrForFilter);
  icon.style.display = 'none';
  difficultyButtons.style.display = 'block'
  clearInterval(grinchIntervalDelay)
  clearInterval(gameInterval)
  clearInterval(mandarinInterval)
})

function addToList(scoreArrForFilter){
  for(let index=0; index <scoreArrForFilter.length; index++ ){
    score = document.createElement('li');
    score.innerHTML = `You caught ${scoreArrForFilter[index]} Mandarins in Round`;
    ol.append(score);
  }
}

function deleteChild(){ 
  let e = orderedList.lastElementChild
  while(e){
    orderedList.removeChild(e)
    e = ol.lastElementChild;
  }
}








