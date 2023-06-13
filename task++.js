let leftLimit = 0;
let topLimit = 0;
let rightLimit;
let botLimit;
let pX = -1;
let pY = -1;
let pBox = '';
let timeFast = 100;
let timeSlow = 400;
let powerUp = {isPowerFast: 0, isPowerSlow: 0}
let pCoords = [];
let t2;
let isPaused = 0;
let powerUpActive = false;
let powerUpTimer = 7;
//let powUp = document.getElementById('power-up');

let randPowerUpNumber = 0;

let timePerSec = 1000;
let gameStarted = false;

let foodSound = document.querySelector('.eat-sound');

//Variables for save game feature
let saveStatus = 0;
let lEaten;
let wEaten;
let snakeCoords;
let lCoords;



jed = setInterval(createPowerUp, 14000);
/*
let coords = {head: {x: Math.floor(Number(gridSize)/2)*20 + 20, y: Math.ceil(Number(gridSize)/2)*20 + 20},
              body: {x: Math.floor(Number(gridSize)/2)*20, y: Math.ceil(Number(gridSize)/2)*20 + 20},
              tail: {x: Math.floor(Number(gridSize)/2)*20, y: Math.ceil(Number(gridSize)/2)*20 + 20}
};
*/

let coords = {head: {x: Math.floor(Number(rightLimit)/2/20)*20, y: Math.ceil(Number(rightLimit)/2/20)*20},
              body: {x: Math.floor(Number(rightLimit)/2/20)*20 - 20, y: Math.ceil(Number(rightLimit)/2/20)*20 + 20},
              tail: {x: Math.floor(Number(rightLimit)/2/20)*20 - 40, y: Math.ceil(Number(rightLimit)/2/20)*20 + 20}
};

let porCoords = {p1: {x: 0, y: 0}, p2: {x: 0, y: 0}};
porCoords.p1.x = 100;
porCoords.p1.y = 100;
porCoords.p2.x = rightLimit - 100;
porCoords.p2.y = botLimit - 100;
document.querySelector('.portal-1').style.left = porCoords.p1.x + 'px';
document.querySelector('.portal-1').style.top = porCoords.p1.y + 'px';
document.querySelector('.portal-2').style.left = porCoords.p2.x + 'px';
document.querySelector('.portal-2').style.top = porCoords.p2.y + 'px';


let gridSize;

let coordsOb = {x: 0, y: 0};
console.log(coordsOb);
let bomb = document.querySelector('.obstacle');
let obTime = 70;
let obDir = '';
bomb.style.left = coordsOb['x'] + 'px';
bomb.style.top = coordsOb['y'] + 'px';

let moveOb;

function moveObstacleUp() {
    //clearInterval(moveOb);
    if(coordsOb['y'] > 20) {
        coordsOb['y'] = coordsOb['y'] - 20;
        bomb.style.top = coordsOb['y'] + 'px';
        obDir = 'up';
    } else {
        clearInterval(moveOb);
        moveOb = setInterval(moveObstacleDown, obTime);
    }
}

function moveObstacleDown() {
    
    //clearInterval(moveOb);
    if(coordsOb['y'] < gridSize*20-40) {
        coordsOb['y'] = coordsOb['y'] + 20;
        bomb.style.top = coordsOb['y'] + 'px';
        obDir = 'down';
    } else {
        clearInterval(moveOb);
        moveOb = setInterval(moveObstacleUp, obTime);
    }
}




function setGridSize() {
    //document.querySelector('.popup-container').style.display = 'none';
    console.log(gridSize);
    rightLimit = Number(gridSize)*20;
    botLimit = Number(gridSize)*20;
    document.querySelector('.grid').style.width = rightLimit + 'px';
    document.querySelector('.grid').style.height = botLimit + 'px';
    coordsOb.x = gridSize*20-100;
    coordsOb.y = 20;
    bomb.style.left = coordsOb['x'] + 'px';
    bomb.style.top = coordsOb['y'] + 'px';
    moveOb = setInterval(moveObstacleDown, 50);
    porCoords.p1.x = 100;
    porCoords.p1.y = 100;
    porCoords.p2.x = rightLimit - 100;
    porCoords.p2.y = botLimit - 100;
    document.querySelector('.portal-1').style.left = porCoords.p1.x + 'px';
    document.querySelector('.portal-1').style.top = porCoords.p1.y - 35 + 'px';
    document.querySelector('.portal-2').style.left = porCoords.p2.x + 'px';
    document.querySelector('.portal-2').style.top = porCoords.p2.y - 35 + 'px';
    document.querySelector('.portal-1').style.display = 'block';
    document.querySelector('.portal-2').style.display = 'block';
    //console.log(rightLimit, botLimit, 'infun');
    resetSnakePos();
}

document.addEventListener('keydown', (event)=> {    
    if(event.code === 'KeyW' || event.code === 'ArrowUp') {
        moveToUp();
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        moveToDown();
    } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        moveToLeft();
    } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        moveToRight();
    }

});

/*
function createRemFood() {
    gridSize = localStorage.getItem('grid-size')
    lettersEaten = localStorage.getItem('letsEaten');
    foodEaten = localStorage.getItem('fooEaten');
    wordCoords = JSON.parse(localStorage.getItem('letsCoords'));
    for(let i=lettersEaten; i<wordList[foodEaten].length; i++) {
        let fod = document.querySelector('.foods');
        let letter = document.createElement("div");
        letter.innerHTML = `${wordList[foodEaten][i]}`;
        letter.classList.add('uneaten-food');
        x = wordCoords[i][0];
        y = wordCoords[i][1];
        letter.setAttribute('id', `L${foodEaten}${i}`);
        letter.style.left = x + 'px';
        letter.style.top = y + 'px';
        fod.appendChild(letter);
        //wordCoords.push([x, y]);
    }
    document.querySelector('.target-word').innerHTML = `${wordList[foodEaten]}`;
    
}

function setSavedSnakePos() {
    //gridSize = localStorage.getItem('grid-size')
    foodEaten = localStorage.getItem('fooEaten');
    //lettersEaten = localStorage.getItem('letsEaten');

    coords = JSON.parse(localStorage.getItem('snakeCoords'));
    console.log(coords);
    for(let i=1; i<=foodEaten; i++) {
        document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x']+ 'px';
        document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`]['y']+ 'px';
    }
    snakeHead.style.left = coords.head.x + 'px';        
    snakeBody.style.left = coords.body.x + 'px';
    snakeTail.style.left = coords.tail.x + 'px';
    snakeHead.style.top = coords.head.y + 'px';
    snakeBody.style.top = coords.body.y + 'px';
    snakeTail.style.top = coords.tail.y + 'px';
}

function setSavedGrid() {
    gridSize = localStorage.getItem('grid-width');
    coordsOb = localStorage.getItem('bCoords');
    obDir = localStorage.getItem('bomb-dir');
    document.querySelector('.grid').style.width = gridSize*20 + 'px';
    document.querySelector('.grid').style.height = gridSize*20 + 'px';
    bomb.style.left = coordsOb.x + 'px';
    bomb.style.top = coordsOb.y + 'px';
    console.log(obDir, 'obDir');
    if(obDir === 'up') {
        moveOb = setInterval(moveObstacleUp, obTime);
    } else if(obDir === 'down') {
        moveOb = setInterval(moveObstacleDown, obTime);
    }
}

function saveGame() {
    console.log(wordCoords, 'before save');
    lEaten = lettersEaten;
    wEaten = foodEaten;
    snakeCoords = JSON.stringify(coords);
    lCoords = JSON.stringify(wordCoords);
    isSaved = localStorage.setItem('status-save', saveStatus);
    localStorage.setItem('letsEaten', lEaten);
    localStorage.setItem('fooEaten', wEaten);
    localStorage.setItem('snakeCoords', snakeCoords);
    localStorage.setItem('letsCoords', lCoords);
    localStorage.setItem('grid-width', gridSize);
    localStorage.setItem('bomb-dir', obDir);
    localStorage.setItem('bCoords', JSON.stringify(coordsOb));
}
*/

let currentScore = 0;                               //Keeping track of the current score
let livesLeft = 3;                                  //Starting the game with 3 lives
scoreElem = document.querySelector('.score');       //Accessing the score element to update the score
scoreElem.innerHTML = `Score: ${currentScore}`;     

let maxScore = localStorage.getItem('highscore') || 0;      //Acessing the previous highscore if exists
document.querySelector('.highScore').innerHTML = `High-Score: ${maxScore}`;        //Displaying the max score to the screen

let livesElem = document.querySelector('.lives');
livesElem.innerHTML = `<p>Lives: <span class = "life-left-1">&hearts;</span><span class = "life-left-2">&hearts;</span><span class = "life-left-3">&hearts;</span></p>`;

let life1 = document.querySelector('.life-left-1');
let life2 = document.querySelector('.life-left-2');
let life3 = document.querySelector('.life-left-3');

let moveBy = 20;
let intervalTime = 200;
iTime = intervalTime;

let t=60;                                       //Starting with 60 seconds
//let x = setInterval(decTime, 1000);             //Decreasing the time by 1 second every second
document.querySelector('.remTime').innerHTML = `Time: ${t}`;

function decTime () {
    clearInterval(x);
    /*
    A function to display amount of the time remaining, and displays with an appropriate
    message when the time runs out.
    */
    if(t>0) {
        
        t--;
        if(t%10 === 0) {
            iTime -= Number(10);
        }
        
        document.querySelector('.remTime').innerHTML = `Time: ${t}`;           //Displaying the time on screen
        x=setInterval(decTime, timePerSec);
    } else {
        clearInterval(z);
        clearInterval(x);
        document.querySelector('.remTime').innerHTML = 'Time Up';           //Stopping the function call when time runs out
        endGame();
    }    
        
}

let foodEaten = 0;          //A counter to know how many foods have been eaten out of 5
let lettersEaten = 0;

let wordList = ['BUSH', 'MAZE', 'SNAKE', 'EARTH', 'PRANK', 'ORANGE', 'ZEPHYR', 'SQUEAK', 'WAVES', 'NETWORK', 'NATURAL', 'TUNE', 'CALIBER', 'GELATO', ];
let wordCoords = [];
let target = wordList[foodEaten];

function createFood() {
    /*
    A function to create 5 colour blocks at random positions within the grid and storing them.
    */
    
    for(let i=0; i<wordList[foodEaten].length; i++) {
        let fod = document.querySelector('.foods');
        let letter = document.createElement("div");
        letter.innerHTML = `${wordList[foodEaten][i]}`;
        letter.classList.add('uneaten-food');
        let x = 20*(Math.floor(Math.random()*(gridSize-2))+1);
        let y = 20*(Math.floor(Math.random()*(gridSize-2))+1);
        letter.setAttribute('id', `L${foodEaten}${i}`);
        letter.style.left = x + 'px';
        letter.style.top = y + 'px';
        fod.appendChild(letter);
        wordCoords.push([x, y]);
    }
    document.querySelector('.target-word').innerHTML = `${wordList[foodEaten]}`;
    if(!gameStarted) {
        gameStarted = true;
        x = setInterval(decTime, timePerSec);
    }
    
}

let z = '';             //Initializing the id for our setInterval functions

//Accessing the snake element in js
let snakeHead = document.querySelector('.snake-head'); 
let snakeBody = document.querySelector('.snake-body');
let snakeTail = document.querySelector('.snake-tail');

//Keeping track of the snake's position
//Initializing the position to the middle of the grid
//console.log(Number(gridSize), 1);
/*
let coords = {head: {x: Math.floor(Number(gridSize)/2)*20 + 20, y: Math.ceil(Number(gridSize)/2)*20 + 20},
              body: {x: Math.floor(Number(gridSize)/2)*20, y: Math.ceil(Number(gridSize)/2)*20 + 20},
              tail: {x: Math.floor(Number(gridSize)/2)*20, y: Math.ceil(Number(gridSize)/2)*20 + 20}
};
*/

//Assigning the position of the snake to the above coordinates
snakeHead.style.left = coords.head.x + 'px';        
snakeBody.style.left = coords.body.x + 'px';
snakeTail.style.left = coords.tail.x + 'px';
snakeHead.style.top = coords.head.y + 'px';
snakeBody.style.top = coords.body.y + 'px';
snakeTail.style.top = coords.tail.y + 'px';

//createFood();       //Creating the food

//Functions to move the snake
function moveToRight() {
    clearInterval(z);                 //Clears the movement of the snake in the direction it was just moving in
    
    if (lettersEaten === wordList[foodEaten].length) {              //Checking if all 5 foods have been eaten
        lettersEaten = 0;                  //Reseting the number of foods eaten
        foodEaten++;
        currentScore += 5;              //Giving 5 points to the user
        scoreElem.innerHTML = `Score: ${currentScore}`;
        wordCoords = [];
        //foodCoords = [];
        t+=6;                           //Awarding the user an extra 6 seconds of time
        createSnakeBlock();
        createFood();                   //Randomising and creating food after all foods have been eaten
        //z = setInterval(moveToRight, intervalTime);
        console.log(-2, z);
        
    }
    
    if(coords.head.x <= (rightLimit-30)) {          //Making sure the snake does not go outside the grid
        console.log(-1, z);
        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                //coords[`np-${foodEaten}`]['x'] = coords[`np-${foodEaten-1}`].x;
                coords[`np-${i}`]['y'] = coords[`np-${i-1}`]['y'];
                //document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
                document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`]['y'] + 'px';
            }
            coords[`np-1`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
        }
        
        //Waiting till all parts of the snake are in the same horizontal line
        coords.tail.y = coords.body.y;              
        snakeTail.style.top = coords.tail.y + 'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y + 'px';

        /*
            if(foodEaten === 1) {
            /*
            console.log('piece 1 created');
            console.log(coords);
            //coords[`np-${foodEaten}`]['x'] = coords.tail.x - Number(20);
            coords[`np-${foodEaten}`]['x'] = coords.tail.x;
            coords[`np-${foodEaten}`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`].x + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`].y + 'px';
            */
        if(foodEaten >= 1) {
            console.log(0, z);
            for(let i = foodEaten; i>1; i--) {
                
                coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x'];
                    //coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`].y;
                document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x'] + 'px';
                    //document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`].y + 'px';
                
                //Np-1 follows tail
                
                //document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
            }
    
            coords[`np-1`]['x'] = coords.tail.x;
                //coords[`np-1`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-1`).style.left = coords[`np-1`]['x'] + 'px';
            //Np-1 follows tail
            //coords[`np-1`]['x'] = coords.tail.x;
            //coords[`np-1`]['y'] = coords.tail.y;
            //document.getElementById(`new-piece-1`).style.left = coords[`np-1`]['x'] + 'px';
            //document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
        }            
            
        console.log(1, z);
        

        //Moving the snake's head to the right
        //And making the body and tail follow the head
        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x+'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x+'px';
        coords.head.x = coords.head.x + moveBy;
        snakeHead.style.left = coords.head.x + 'px';

        //z = setInterval(moveToRight, intervalTime);
        console.log(2, z);
        
        console.log(t2, t, 'times');
        if(t2-t <= 7) {
            console.log(powerUp);
            if(powerUp.isPowerFast && !powerUp.isPowerSlow) {
                console.log('fa')
                intervalTime = timeFast;
            } else if (powerUp.isPowerSlow && !powerUp.isPowerFast) {
                console.log('sl')
                intervalTime = timeSlow;
            }
        } else {
            console.log('norm')
            intervalTime = iTime;
            powerUp.isPowerFast = 0;
            powerUp.isPowerSlow = 0;
            //powerUp.isPowerFast = 0;
            //powerUp.isPowerSlow = 0;
        }

        z = setInterval(moveToRight, intervalTime);

        console.log(3, z);
        
        //z=setInterval(moveToRight, intervalTime);
        //if(coords.head.x === foodCoords[foodEaten][0] && coords.head.y === foodCoords[foodEaten][1]) {

        let headX = coords.head.x;
        let headY = coords.head.y;
        for(let i = foodEaten; i>=1; i--) {
            if(headX === coords[`np-${i}`]['x'] && headY === coords[`np-${i}`]['y']) {
                endGame();
            }
        }
        console.log(4, z);
        if(headX === coords.body.x && headY === coords.body.y || headX === coords.tail.x && headY === coords.tail.y) {
            endGame();
        }
        console.log(5, z);
        if(coords.head.x === pX && coords.head.y === pY) {
            getPowerUp();
        }
         
        console.log(6, z);
        console.log(coords.head.x, coords.head.y, porCoords.p1.x, porCoords.p1.y, porCoords.p2.x, porCoords.p2.y);
        if(coords.head.x === porCoords.p1.x && coords.head.y === porCoords.p1.y) {
            coords.head.x = porCoords.p2.x + 20;
            coords.head.y = porCoords.p2.y;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        } else if (coords.head.x === porCoords.p2.x && coords.head.y === porCoords.p2.y) {
            coords.head.x = porCoords.p1.x + 20;
            coords.head.y = porCoords.p1.y;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        }


        if (coords.head.x === wordCoords[lettersEaten][0] && coords.head.y === wordCoords[lettersEaten][1]) {
            console.log('eaten', z);

            document.getElementById(`L${foodEaten}${lettersEaten}`).style.display = 'none';
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.add('eaten-food');
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.remove('uneaten-food');
            //console.log(document.getElementById(`L${foodEaten}${lettersEaten}`).innerHTML, 243);
            lettersEaten++;
            //console.log(document.getElementById(`L${foodEaten}${lettersEaten}`).innerHTML, 245); 
            playSound();                                                                                     //Incremeneting the number of foods eaten
            currentScore += 2;                                                                                  //Awarding 2 points to the user
            scoreElem.innerHTML = `Score: ${currentScore}`;
            console.log(`z = ${z}`);       
        }
        
        prevDir = 'right';

        if(coords.head.x === coordsOb.x && coords.head.y === coordsOb.y) {
            clearInterval(z);
            livesLeft--;
            document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
            if(livesLeft === 0) {
                document.querySelector('.life-left-1').classList.add('life-lost');
                endGame();
            } else {
                hitWall();                      //Calls a function if the snake hits a wall
            }
        }
    } else {
        clearInterval(z);
        livesLeft--;
        document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
        if(livesLeft === 0) {
            document.querySelector('.life-left-1').classList.add('life-lost');
            endGame();
        } else {
            hitWall();                      //Calls a function if the snake hits a wall
        }
        
        //clearInterval(z);       
    }
    //z=setInterval(moveToRight, 200);    //Continues to call this function till a different direction has been chosen
}

function moveToLeft() {
    clearInterval(z);
    if (lettersEaten === wordList[foodEaten].length) {
        lettersEaten = 0;                  //Reseting the number of foods eaten
        foodEaten++;
        currentScore += 5;              //Giving 5 points to the user
        scoreElem.innerHTML = `Score: ${currentScore}`;
        wordCoords = [];
        foodCoords = [];
        t+=6;                           //Awarding the user an extra 6 seconds of time
        createSnakeBlock();
        createFood(); 

        /*

        if(t2 - t <= 7) {
            if(isPowerFast && !isPowerSlow) {
                console.log('fast');
                z = setInterval(moveToLeft, timeFast);
            } else if (isPowerSlow && !isPowerFast) {
                console.log('slow');
                z = setInterval(moveToLeft, timeSlow)
            }
        } else {
            console.log('normal');
            isPowerFast = 0;
            isPowerSlow = 0;
            z=setInterval(moveToLeft, intervalTime);
        }
        */
    }
    if(coords.head.x >= 20) {
        //console.log(foodEaten);
        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                //coords[`np-${foodEaten}`]['x'] = coords[`np-${foodEaten-1}`].x;
                coords[`np-${i}`]['y'] = coords[`np-${i-1}`]['y'];
                //document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
                document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`]['y'] + 'px';
            }
            coords[`np-1`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
        }

        coords.tail.y = coords.body.y;
        snakeTail.style.top = coords.tail.y + 'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y + 'px';

        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                
                coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x'];
                    //coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`].y;
                document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x'] + 'px';
                    //document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`].y + 'px';
                                
            }
            //Np-1 follows tail
            coords[`np-1`]['x'] = coords.tail.x;
            //coords[`np-1`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-1`).style.left = coords[`np-1`]['x'] + 'px';
            //document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
        }

        
        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x+'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x+'px';
        coords.head.x =coords.head.x - moveBy;
        snakeHead.style.left = coords.head.x + 'px';
        //z=setInterval(moveToLeft, intervalTime);
        prevDir = 'left';

        /*
        if(t2 - t <= 7) {
            if(isPowerFast && !isPowerSlow) {
                console.log('fast');
                z = setInterval(moveToLeft, timeFast);
            } else if (isPowerSlow && !isPowerFast) {
                console.log('slow');
                z = setInterval(moveToLeft, timeSlow)
            }
        } else {
            console.log('normal');
            isPowerFast = 0;
            isPowerSlow = 0;
            z=setInterval(moveToLeft, intervalTime);
        }
        */

        if(t2-t <= 7) {
            console.log(t2, 'power up time');
            if(powerUp.isPowerFast && !powerUp.isPowerSlow) {
                console.log('fa')
                intervalTime = timeFast;
            } else if (powerUp.isPowerSlow && !powerUp.isPowerFast) {
                console.log('sl')
                intervalTime = timeSlow;
            }
        } else {
            console.log('norm')
            intervalTime = iTime;
            powerUp.isPowerFast = 0;
            powerUp.isPowerSlow = 0;
        }

        z = setInterval(moveToLeft, intervalTime);

        //z=setInterval(moveToLeft, intervalTime);

        let headX = coords.head.x;
        let headY = coords.head.y;
        for(let i = foodEaten; i>=1; i--) {
            if(headX === coords[`np-${i}`]['x'] && headY === coords[`np-${i}`]['y']) {
                endGame();
            }
        }
        if(headX === coords.body.x && headY === coords.body.y || headX === coords.tail.x && headY === coords.tail.y) {
            endGame();
        }

        if(coords.head.x === porCoords.p1.x && coords.head.y === porCoords.p1.y) {
            coords.head.x = porCoords.p2.x - 20;
            coords.head.y = porCoords.p2.y;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        } else if (coords.head.x === porCoords.p2.x && coords.head.y === porCoords.p2.y) {
            coords.head.x = porCoords.p1.x - 20;
            coords.head.y = porCoords.p1.y;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        }


        if(coords.head.x === wordCoords[lettersEaten][0] && coords.head.y === wordCoords[lettersEaten][1]) {
            document.getElementById(`L${foodEaten}${lettersEaten}`).style.display = 'none';
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.add('eaten-food');
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.remove('uneaten-food');
            lettersEaten++;
            //console.log(document.getElementById(`L${foodEaten}${lettersEaten}`).innerHTML, 245); 
            playSound();                                                                                     //Incremeneting the number of foods eaten
            currentScore += 2;                                                                                  //Awarding 2 points to the user
            scoreElem.innerHTML = `Score: ${currentScore}`;
        }

        if(coords.head.x === coordsOb.x && coords.head.y === coordsOb.y) {
            clearInterval(z);
            livesLeft--;
            document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
            if(livesLeft === 0) {
                document.querySelector('.life-left-1').classList.add('life-lost');
                endGame();
            } else {
                hitWall();                      //Calls a function if the snake hits a wall
            }
        }


        if(coords.head.x === pX && coords.head.y === pY) {
            getPowerUp();
        }

    } else {
        clearInterval(z);
        livesLeft--;
        document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
        if(livesLeft === 0) {
            document.querySelector('.life-left-1').classList.add('life-lost');
            endGame();
        } else {
            hitWall();                      //Calls a function if the snake hits a wall
        }
        
        //clearInterval(z);       
    }
    
}

function moveToDown() {
    clearInterval(z);
    if (lettersEaten === wordList[foodEaten].length) {
        lettersEaten = 0;                  //Reseting the number of foods eaten
        foodEaten++;
        currentScore += 5;              //Giving 5 points to the user
        scoreElem.innerHTML = `Score: ${currentScore}`;
        wordCoords = [];
        foodCoords = [];
        t+=6;                           //Awarding the user an extra 6 seconds of time
        createSnakeBlock();
        createFood();
    }
    if(coords.head.y <= (botLimit-30)) {

        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x'];
                //coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`].y;
                document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x'] + 'px';
                //document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
            }
            coords[`np-1`]['x'] = coords.tail.x;
            document.getElementById(`new-piece-1`).style.left = coords[`np-1`]['x'] + 'px';
        }
        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x + 'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x + 'px';

        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                
                //coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x'];
                coords[`np-${i}`]['y'] = coords[`np-${i-1}`].y;
                //document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`].x + 'px';
                document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`].y + 'px';
                                
            }
            //Np-1 follows tail
            coords[`np-1`]['y'] = coords.tail.y;
            //coords[`np-1`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
            //document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
        }


        coords.tail.y = coords.body.y;
        snakeTail.style.top = coords.tail.y+'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y+'px';
        coords.head.y = coords.head.y + moveBy;
        snakeHead.style.top = coords.head.y + 'px';
        prevDir = 'down';
        
        if(t2-t <= 7) {
            console.log(t2, 'power up time');
            if(powerUp.isPowerFast && !powerUp.isPowerSlow) {
                console.log('fa')
                intervalTime = timeFast;
            } else if (powerUp.isPowerSlow && !powerUp.isPowerFast) {
                console.log('sl')
                intervalTime = timeSlow;
            }
        } else {
            console.log('norm')
            intervalTime = iTime;
            powerUp.isPowerFast = 0;
            powerUp.isPowerSlow = 0;
        }

        z = setInterval(moveToDown, intervalTime);


        //z=setInterval(moveToDown, intervalTime);

        let headX = coords.head.x;
        let headY = coords.head.y;
        for(let i = foodEaten; i>=1; i--) {
            if(headX === coords[`np-${i}`]['x'] && headY === coords[`np-${i}`]['y']) {
                endGame();
            }
        }
        if(headX === coords.body.x && headY === coords.body.y || headX === coords.tail.x && headY === coords.tail.y) {
            endGame();
        }

        if(coords.head.x === porCoords.p1.x && coords.head.y === porCoords.p1.y) {
            coords.head.x = porCoords.p2.x;
            coords.head.y = porCoords.p2.y + 20;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        } else if (coords.head.x === porCoords.p2.x && coords.head.y === porCoords.p2.y) {
            coords.head.x = porCoords.p1.x;
            coords.head.y = porCoords.p1.y + 20;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        }
        
        if(coords.head.x === wordCoords[lettersEaten][0] && coords.head.y === wordCoords[lettersEaten][1]) {
            document.getElementById(`L${foodEaten}${lettersEaten}`).style.display = 'none';
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.add('eaten-food');
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.remove('uneaten-food');
            lettersEaten++;
            //console.log(document.getElementById(`L${foodEaten}${lettersEaten}`).innerHTML, 245); 
            playSound();                                                                                     //Incremeneting the number of foods eaten
            currentScore += 2;                                                                                  //Awarding 2 points to the user
            scoreElem.innerHTML = `Score: ${currentScore}`;
        }

        if(coords.head.x === coordsOb.x && coords.head.y <= coordsOb.y + 20 && coords.head.y >= coordsOb.y - 20) {
            clearInterval(z);
            livesLeft--;
            document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
            if(livesLeft === 0) {
                document.querySelector('.life-left-1').classList.add('life-lost');
                endGame();
            } else {
                hitWall();                      //Calls a function if the snake hits a wall
            }
        }


        if(coords.head.x === pX && coords.head.y === pY) {
            getPowerUp();
        }

    } else {
        clearInterval(z);
        livesLeft--;
        document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
        if(livesLeft === 0) {
            document.querySelector('.life-left-1').classList.add('life-lost');
            endGame();
        } else {
            hitWall();                      //Calls a function if the snake hits a wall
        }
        
        //clearInterval(z);       
    }
    
}

function moveToUp() {
    clearInterval(z);
    if (lettersEaten === wordList[foodEaten].length) {
        lettersEaten = 0;                  //Reseting the number of foods eaten
        foodEaten++;
        currentScore += 5;              //Giving 5 points to the user
        scoreElem.innerHTML = `Score: ${currentScore}`;
        wordCoords = [];
        foodCoords = [];
        t+=6;                           //Awarding the user an extra 6 seconds of time
        createSnakeBlock();
        createFood(); 
    }
    if(coords.head.y >= 20) {

        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x'];
                //coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`].y;
                document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x'] + 'px';
                //document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
            }
            coords[`np-1`]['x'] = coords.tail.x;
            document.getElementById(`new-piece-1`).style.left = coords[`np-1`]['x'] + 'px';
        }

        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x + 'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x + 'px';

        if(foodEaten >= 1) {
            for(let i = foodEaten; i>1; i--) {
                
                //coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x'];
                coords[`np-${i}`]['y'] = coords[`np-${i-1}`].y;
                //document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`].x + 'px';
                document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`].y + 'px';
                                
            }
            //Np-1 follows tail
            coords[`np-1`]['y'] = coords.tail.y;
            //coords[`np-1`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
            //document.getElementById(`new-piece-1`).style.top = coords[`np-1`]['y'] + 'px';
        }

        coords.tail.y = coords.body.y;
        snakeTail.style.top = coords.tail.y+'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y+'px';
        coords.head.y = coords.head.y - moveBy;
        snakeHead.style.top = coords.head.y + 'px';
        prevDir = 'up';
        //z=setInterval(moveToUp, intervalTime);

        /*
        if(t2 - t <= 7) {
            if(isPowerFast && !isPowerSlow) {
                console.log('fast');
                z = setInterval(moveToUp, timeFast);
            } else if (isPowerSlow && !isPowerFast) {
                console.log('slow');
                z = setInterval(moveToUp, timeSlow)
            }
        } else {
            console.log('normal');
            isPowerFast = 0;
            isPowerSlow = 0;
            z=setInterval(moveToUp, intervalTime);
        }
        */
        console.log('power up?');
        if(t2-t <= 7) {
            console.log(t2, 'power up time');
            if(powerUp.isPowerFast && !powerUp.isPowerSlow) {
                console.log('fa')
                intervalTime = timeFast;
            } else if (powerUp.isPowerSlow && !powerUp.isPowerFast) {
                console.log('sl')
                intervalTime = timeSlow;
            }
        } else {
            console.log('norm')
            intervalTime = iTime;
            powerUp.isPowerFast = 0;
            powerUp.isPowerSlow = 0;
        }

        z = setInterval(moveToUp, intervalTime);


        //z=setInterval(moveToUp, intervalTime);

        let headX = coords.head.x;
        let headY = coords.head.y;
        for(let i = foodEaten; i>=1; i--) {
            if(headX === coords[`np-${i}`]['x'] && headY === coords[`np-${i}`]['y']) {
                endGame();
            }
        }
        if(headX === coords.body.x && headY === coords.body.y || headX === coords.tail.x && headY === coords.tail.y) {
            endGame();
        }

        if(coords.head.x === pX && coords.head.y === pY) {
            getPowerUp();
        }

        if(coords.head.x === porCoords.p1.x && coords.head.y === porCoords.p1.y) {
            coords.head.x = porCoords.p2.x;
            coords.head.y = porCoords.p2.y - 20;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        } else if (coords.head.x === porCoords.p2.x && coords.head.y === porCoords.p2.y) {
            coords.head.x = porCoords.p1.x;
            coords.head.y = porCoords.p1.y - 20;
            snakeHead.style.left = coords.head.x + 'px';
            snakeHead.style.top = coords.head.y + 'px';
        }


        if(coords.head.x === wordCoords[lettersEaten][0] && coords.head.y === wordCoords[lettersEaten][1]) {

            document.getElementById(`L${foodEaten}${lettersEaten}`).style.display = 'none';
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.add('eaten-food');
            document.getElementById(`L${foodEaten}${lettersEaten}`).classList.remove('uneaten-food');
            lettersEaten++;
            playSound();                                                                                     //Incremeneting the number of foods eaten
            currentScore += 2;                                                                                  //Awarding 2 points to the user
            scoreElem.innerHTML = `Score: ${currentScore}`;
            /*
            document.querySelector(`.${colorList[foodEaten]}-food`).style['background-color'] = 'black';
            document.querySelector(`.${colorList[foodEaten]}-food`).style['z-index'] = 0;
            foodEaten++;
            playSound();
            currentScore += 2;
            scoreElem.innerHTML = `Score: ${currentScore}`;
            */
        }

        
        if(coords.head.x === coordsOb.x && coords.head.y <= coordsOb.y + 20 && coords.head.y >= coordsOb.y - 20) {
            clearInterval(z);
            livesLeft--;
            document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
            if(livesLeft === 0) {
                document.querySelector('.life-left-1').classList.add('life-lost');
                endGame();
            } else {
                hitWall();                      //Calls a function if the snake hits a wall
            }
        }
        
    } else {
        clearInterval(z);
        livesLeft--;
        document.querySelector(`.life-left-${livesLeft+1}`).classList.add('life-lost');
        if(livesLeft === 0) {
            document.querySelector('.life-left-1').classList.add('life-lost');
            endGame();
        } else {
            hitWall();                      //Calls a function if the snake hits a wall
        }
        
        //clearInterval(z);       
    }
    
}

function endGame() {
    clearInterval(jed);
    clearInterval(z);
    clearInterval(x);
    
    if (t === 0) {
        if (currentScore > maxScore) {
            localStorage.setItem('highscore', currentScore);
            alert(`You beat the highscore!\nYour score is ${currentScore}!\nClick Ok to play again.`);
            location.reload();         
        } else {
           alert(`Thanks for playing!\nYour score is ${currentScore}!\nClick Ok to play again.`);
           location.reload();
        }
    } else if (livesLeft === 0) {
        livesElem.innerHTML = 'No Lives Left';
        if (currentScore > maxScore) {
            localStorage.setItem('highscore', currentScore);
            alert(`You ran out of lives. Game Over!\nBut you beat the highscore!\nYour score is ${currentScore}!\nClick Ok to play again.`);
            location.reload();         
        } else {
           alert(`You ran out of lives. Game Over!\nThanks for playing!\nYour score is ${currentScore}!\nClick Ok to play again.`);
           location.reload();
        }
        //alert(`You ran out of lives. Game Over!\nYour score is ${currentScore}!\nClick Ok to play again.`);
    } else {
        if (currentScore > maxScore) {
            localStorage.setItem('highscore', currentScore);
            alert(`You ate yourself. Game Over!\nBut you beat the highscore!\nYour score is ${currentScore}!\nClick Ok to play again.`);
            location.reload();         
        } else {
           alert(`You ate yourself Game Over!\nThanks for playing!\nYour score is ${currentScore}!\nClick Ok to play again.`);
           location.reload();
        }
    }
}


function hitWall() {
    /*
    A function which is called when the snake has hit a wall
     */
    clearInterval(z);
    intervalTime = 200;
    moveBy = 20;
    resetSnakePos();
}

function resetSnakePos() {
    if(gameStarted) {
        clearInterval(z);
    }
    coords = {head: {x: Math.floor(Number(rightLimit)/2/20)*20, y: Math.ceil(Number(rightLimit)/2/20)*20},
                  body: {x: Math.floor(Number(rightLimit)/2/20)*20 - 20, y: Math.ceil(Number(rightLimit)/2/20)*20},
                  tail: {x: Math.floor(Number(rightLimit)/2/20)*20 - 40, y: Math.ceil(Number(rightLimit)/2/20)*20}
    };
    for(let i = 1; i<=foodEaten; i++) {
        coords[`np-${i}`] = {x: 0, y: 0};
    }

    if(foodEaten >= 1) {
        for(let i = 1; i<=foodEaten; i++) {
            coords[`np-${i}`]['y'] = coords.head.y;
            if (i===1) {
                coords[`np-${i}`]['x'] = coords.tail.x-20;
                coords[`np-${i}`]['y'] = coords.head.y;
                document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x']+ 'px';
                document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`]['y']+ 'px';
            } else {
                coords[`np-${i}`]['x'] = coords[`np-${i-1}`]['x']-20;
                coords[`np-${i}`]['y'] = coords.head.y;
                document.getElementById(`new-piece-${i}`).style.left = coords[`np-${i}`]['x']+ 'px';
                document.getElementById(`new-piece-${i}`).style.top = coords[`np-${i}`]['y']+ 'px';
            }            
        }
    }
    
    snakeHead.style.left = coords.head.x + 'px';        
    snakeBody.style.left = coords.body.x + 'px';
    snakeTail.style.left = coords.tail.x + 'px';
    snakeHead.style.top = coords.head.y + 'px';
    snakeBody.style.top = coords.body.y + 'px';
    snakeTail.style.top = coords.tail.y + 'px';
    if(!gameStarted) {
        //gameStarted = true;
        createFood();
    }
}

function pauseGame() {
    isPaused = 1;
    clearInterval(moveOb);
    clearInterval(jed);
    clearInterval(x);
    clearInterval(z);
    document.querySelector('.overlay').style.display = 'block';
}

function resumeGame() {
    isPaused = 0;
    if (prevDir === 'right') {
        z = setInterval(moveToRight, intervalTime);
        x = setInterval(decTime, 1000);
    } else if (prevDir === 'left') {
        z = setInterval(moveToLeft, intervalTime);
        x = setInterval(decTime, 1000);
    } else if (prevDir === 'down') {
        z = setInterval(moveToDown, intervalTime);
        x = setInterval(decTime, 1000);
    } else if (prevDir === 'up') {
        z = setInterval(moveToUp, intervalTime);
        x = setInterval(decTime, 1000);
    }

    if(obDir === 'up') {
        moveOb = setInterval(moveObstacleUp, obTime);
    } else if (obDir === 'down') {
        moveOb = setInterval(moveObstacleDown, obTime);
    }
    document.querySelector('.overlay').style.display = 'none';
}

function playSound() {
    foodSound.play();
}

function createSnakeBlock() {
    const snakePs = document.querySelector('.snake-pieces');
    const newPiece = document.createElement("div");
    newPiece.classList.add('added-piece');
    newPiece.setAttribute('id', `new-piece-${foodEaten}`);
    coords[`np-${foodEaten}`] = {x: 0, y: 0};
    coords[`np-${foodEaten}`]['x'] = coords.tail.x;
    coords[`np-${foodEaten}`]['y'] = coords.tail.y;
    //document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`].x + 'px';
    //document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`].y + 'px';
    snakePs.appendChild(newPiece);

    addSnakeBlock();
}

function addSnakeBlock() {
    coords[`np-${foodEaten}`] = {x: 0, y: 0};
    if(prevDir === 'right') {
        if(foodEaten === 1) {
            coords[`np-${foodEaten}`]['x'] = coords.tail.x - Number(20);
            coords[`np-${foodEaten}`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        } else if (foodEaten > 1) {
            coords[`np-${foodEaten}`]['x'] = coords[`np-${foodEaten-1}`]['x'] - Number(20);
            coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`]['y'];
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        }

    } else if (prevDir === 'left') {
        if(foodEaten === 1) {
            coords[`np-${foodEaten}`]['x'] = coords.tail.x + Number(20);
            coords[`np-${foodEaten}`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        } else if (foodEaten > 1) {
            coords[`np-${foodEaten}`]['x'] = coords[`np-${foodEaten-1}`]['x'] + Number(20);
            coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`]['y'];
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        }

    } else if (prevDir === 'up') {
        if(foodEaten === 1) {
            coords[`np-${foodEaten}`]['x'] = coords.tail.x;
            coords[`np-${foodEaten}`]['y'] = coords.tail.y + Number(20);
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        } else if (foodEaten > 1) {
            coords[`np-${foodEaten}`]['x'] = coords[`np-${foodEaten-1}`]['x'];
            coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`]['y'] + Number(20);
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        }
    } else if (prevDir === 'down') {
        if(foodEaten === 1) {
            coords[`np-${foodEaten}`]['x'] = coords.tail.x - Number(20);
            coords[`np-${foodEaten}`]['y'] = coords.tail.y;
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        } else if (foodEaten > 1) {
            coords[`np-${foodEaten}`]['x'] = coords[`np-${foodEaten-1}`]['x'];
            coords[`np-${foodEaten}`]['y'] = coords[`np-${foodEaten-1}`]['y'] - Number(20);
            document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
            document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
        }
    }
    //coords[`np-${foodEaten}`]['x'] = coords.tail.x;
    //coords[`np-${foodEaten}`]['y'] = coords.tail.y;
    //console.log(coords, 618);
    document.getElementById(`new-piece-${foodEaten}`).style.left = coords[`np-${foodEaten}`]['x'] + 'px';
    document.getElementById(`new-piece-${foodEaten}`).style.top = coords[`np-${foodEaten}`]['y'] + 'px';
}

function createPowerUp() {
    //clearInterval(jed);
    pCoords = [];
    const gBox = document.querySelector('.grid');
    const pBox = document.createElement("div");
    pBox.setAttribute('id', 'power-up');
    gBox.appendChild(pBox);
    addPowerUp();
    
}

function addPowerUp() {
    //t2 = t;
    let pUp = document.getElementById('power-up');
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    pUp.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    pUp.style.display = 'block';
    while(true) {
        pX = Math.floor(Math.random()*(gridSize-2)+1)*20;
        pY = Math.floor(Math.random()*(gridSize-2)+1)*20;
        if(!wordCoords.includes([pX, pY]) && pX!==coords.head.x && pY !== coords.head.y) {
            pUp.style.left = pX + 'px';
            pUp.style.top = pY + 'px';
            break;
        }
    }
}

function getPowerUp() {
    powerUpActive = true;
    document.getElementById('power-up').style.display = 'none';
    t2 = t;
    let rand = Math.random();
    if(rand >= 0.5) {
        powerUp.isPowerFast = 1;
        powerUp.isPowerSlow = 0;
    } else {
        powerUp.isPowerSlow = 1;
        powerUp.isPowerFast = 0;
    }
    console.log(powerUp, 'power up vals');
}

//document.getElementById('one-player-button').addEventListener('click', setGridSize());