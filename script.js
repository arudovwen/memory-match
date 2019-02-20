const cardsArray = [{
        name: '1',
        back: 'images/5.png',
        image: 'images/gaara.jpg'
    },
    {
        name: '2',
        back: 'images/5.png',
        image: 'images/hinata.jpg'
    },
    {
        name: '3',
        back: 'images/5.png',
        image: 'images/itachi.jpg'
    },
    {
        name: '4',
        back: 'images/5.png',
        image: 'images/obit.jpg'
    },
    {
        name: '5',
        back: 'images/5.png',
        image: 'images/kisame.jpg'
    },
    {
        name: '6',
        back: 'images/5.png',
        image: 'images/naruto.jpg'
    },
    {
        name: '7',
        back: 'images/5.png',
        image: 'images/sasuke2.jpg'
    },
    {
        name: '8',
        back: 'images/5.png',
        image: 'images/bignaruto.jpg'
    },
]
let firstGuess = '';
let secondGuess = '';
let count = 0;
let prevClick = null;
let delay = 1000;
let movesCount = 0;
let timer = {
    sec: 0,
    min: 0,
    clearTime: -1
}
let interval;
let num = 0;

const time = document.getElementById('time');
const move = document.getElementById('move');
const timeCount = document.getElementById('timer');
const winner = document.getElementById('winner');
const game = document.getElementById('game');
const resetGame = document.getElementById('reset-game');


// setting timer

timeCount.innerHTML = `Timer: ${timer.min} mins ${timer.sec} secs`;
const startTimer = () => {

    interval = setInterval(function () {
        timeCount.innerHTML = `Timer: ${timer.min} mins ${timer.sec} secs`;
        timer.sec++
        if (timer.sec === 60) {
            timer.min++;
            timer.sec = 0;
        }
        if (timer.min === 60) {
            hour++;
            timer.min = 0;
        }

    }, 1000);
}

// reset game
function resetTimer() {
    clearInterval(interval);
    timer.sec = 0;
    timer.min = 0;
    timeCount.innerHTML = `Timer: ${timer.min} mins ${timer.sec} secs`;


}

// pause game
function pauseTimer() {
    clearInterval(interval);

}

//number of move list
const moves = document.querySelector('#moves');
const moveList = () => {
    movesCount++;
    moves.innerHTML = `Your Moves: ${movesCount}`;
    if (movesCount == 1) {
        startTimer();
    }
}



// default number of moves made
moves.innerHTML = `Your Moves: ${movesCount}`;



// reset entire game

resetGame.addEventListener('click', () => {

    location.reload();
})

//to match cards
const match = () => {
    let selected = document.querySelectorAll('.is-flipped');
    selected.forEach(card => {
        card.classList.add('match');
    })
}

// reset clicked cards if they dont match
const reset = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    let selected = document.querySelectorAll('.is-flipped');
    selected.forEach(card => {
        card.classList.remove('is-flipped');
    })
}


const grid = document.createElement('section');
grid.classList.add('grid', 'board');
game.appendChild(grid);

// double cards count
doubleCards = cardsArray.concat(cardsArray)
// shuffle cards
doubleCards.sort(() => 0.5 - Math.random());


doubleCards.forEach(element => {
    const card = document.createElement('div');
    card.classList.add('card');


    cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    //cardFront.textContent = element.name;
    cardFront.style.backgroundImage = `url(${element.back})`;
    card.dataset.name = element.name;
    card.appendChild(cardFront);

    cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-back');
    cardBack.style.backgroundImage = `url(${element.image})`;
    card.appendChild(cardBack);
    grid.appendChild(card);



    const startGame = document.getElementById('start-game');
    startGame.addEventListener('click', () => {

        // 
        cardProps(card);
    })

    // when card is clicked
    const cardProps = (object) => {
        object.addEventListener('click', (event) => {
            const clicked = event.target;


            if (clicked.nodeName === 'SECTION' || object.classList.contains('is-flipped')) {
                return;

            }
            if (count < 2) {
                count++;


                if (count === 1) {
                    firstGuess = object.dataset.name;
                    object.classList.toggle('is-flipped')
                } else {
                    secondGuess = object.dataset.name;
                    object.classList.toggle('is-flipped')
                }


                if (firstGuess !== '' && secondGuess !== '') {
                    moveList();


                    if (firstGuess === secondGuess) {

                        setTimeout(match, delay);
                        setTimeout(reset, delay);

                        num++;
                        if (num === 8) {
                            pauseTimer();
                            const gameInfo = document.getElementById('game-info');
                            gameInfo.style.backgroundImage = `url(./images/trans-3.png)`;
                            gameInfo.classList.add('game-info');
                            winner.innerHTML = "YOU WIN";
                            time.innerHTML = `Your Time : ${timer.min} mins ${timer.sec} secs`
                            move.innerHTML = `Number of Moves Made : ${movesCount}`;


                        }


                    } else {
                        setTimeout(reset, delay);
                    }


                }

            }

        })


    }


})