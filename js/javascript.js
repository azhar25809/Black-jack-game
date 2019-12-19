//alert('hi');
function ageInDays() {
  var birthyear = prompt('what is your age?');
  var ageInDayss = (2018 - birthyear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);

}
function reset() {
  document.getElementById('ageInDays').remove();
}
function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('cat-gen-btn');
  image.src = "images/cat.gif";
  div.appendChild(image);
}


//challenge 3
let rpsGameData1 = {
  'try': true,
}
function reload1() {
  var aab = document.querySelector('#flex-box-rps-div');
  aab.add();
}
function rpsGame(yourChoice) {

  var humanChoice, batChoice;
  humanChoice = yourChoice.id;
  batChoice = numberToChoice(randToRpsInt());
  result = decideWiner(humanChoice, batChoice);
  message = finalMessage(result);
  rpsFrontEnd(yourChoice.id, batChoice, message);

}
function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ['rock', 'paper', 'scissor'][number];
}
function decideWiner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
    'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
    'scissor': { 'paper': 1, 'scissor': 0.5, 'rock': 0 }
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { 'message': 'You Lost', 'color': 'red' };
  }
  else if (yourScore === 0.5) {
    return { 'message': 'You Tied', 'color': 'yellow' };
  }
  else {
    return { 'message': 'YOU Won', 'color': 'green' };
  }
}
function rpsFrontEnd(humanImageChoice, batImageChoice, finalMessage) {
  var imageDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissor': document.getElementById('scissor').src

  }
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissor').remove();

  //creatre element for result
  var humanDiv = document.createElement('div');
  var batDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style=' box-shadow: 0 0 10px 2px #051dca;' >";
  messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + ";'>" + finalMessage['message'] + "</h1>"
  batDiv.innerHTML = "<img src='" + imageDatabase[batImageChoice] + "' height=150 width=150 style=' box-shadow: 0 0 10px 2px red;' >";


  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(batDiv);

}

//Challenge 4

var all_buttons = document.getElementsByTagName('button');


let copy_all_buttons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copy_all_buttons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red') {
    buttonRed();
  }
  else if (buttonThingy.value === 'green') {
    buttonGreen();
  }
  else if (buttonThingy.value === 'reset') {
    buttonReset();
  }
  else if (buttonThingy.value === 'random') {
    buttonRandom();
  }
}

function buttonRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}
function buttonGreen() {
  for (i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}
function buttonReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copy_all_buttons[i])
  }
}
function buttonRandom() {
  let choice = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
  for (i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choice[randomNumber]);
  }
}

//challenge 5 blackjack

let blackjackGame = {
  "you": { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
  "dealer": { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
  "cards": ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'k', 'j', 'q', 'a'],
  "cardsMap": { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'k': 10, 'j': 10, 'q': 10, 'a': [1, 11] },
  "wins": 0,
  "losses": 0,
  "draws": 0,
  "isStand": false,
  "turnsOver": false,
}
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const NONE = 'none'

const hitSound = new Audio('sounds/swish.m4a')
const winSound = new Audio('sounds/cash.mp3')
const loseSound = new Audio('sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackdeal);

function blackjackhit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCards();
    showcard(card, YOU);
    updateScore(card, YOU);
  } showScore(YOU);
}

function randomCards() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function showcard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackdeal() {
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;
    let aa1 = "Let's play";
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = "white";
    document.querySelector('#dealer-blackjack-result').style.color = "white";
    letsplay();
  }
}

function updateScore(card, activePlayer) {
  if (card === "a") {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    }
    else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }
  else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}
function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

  } else {
    document.querySelector(activePlayer['scoreSpan']).style.color = 'white';
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
  blackjackGame['isStand'] = true;
  while (DEALER['score'] < 15 && blackjackGame['isStand'] === true) {
    let card = randomCards();
    showcard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame['turnsOver'] = true;
  let winner = computeWiner();
  showResult(winner);
}

//compute winer and return who just Won
// update the wins draws losses
function computeWiner() {
  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackjackGame['wins']++;
      winner = YOU;
    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER;
    }
    else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
      winner = NONE;
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER;
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
    winner = NONE;
  };
  console.log(blackjackGame['wins']);
  console.log(blackjackGame['losses']);
  console.log(blackjackGame['draws']);



  console.log(winner);
  return winner;



}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame['turnsOver']) {


    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won';
      messageColor = '#bddebd';
      winSound.play();
    }
    else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost';
      messageColor = 'red';
      loseSound.play();
    }
    else if (winner === NONE) {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You Tide';
      messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}
function letsplay() {
  let ll = "Let's play";
  let messageColor = 'white';
  document.querySelector('#blackjack-result').textContent = ll;
  document.querySelector('#blackjack-result').style.color = messageColor;

}










document.getElementById('demo').innerHTML = Math.floor(Math.random() * 7); 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
