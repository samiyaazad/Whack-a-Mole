let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30;
let timerInterval;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
 

window.onload = function() {
    setGame();
    startTimer();
    this.document.getElementById("highScore").innerText = "High Score: " + highScore ;
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile  = document.createElement("div");
        tile.id = i.toString();
        //document.getElementById("div");
        tile.id = i.toString();
        tile.addEventListener("click", selection);
        document.getElementById("board").appendChild(tile);
    }
}

setInterval(setMole, 1000);
setInterval(setPlant, 2000);

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src  = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selection() {
    if (gameOver) {
        return;
    }

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currPlantTile) {
        endGame("GAME OVER");
    }
}

function startTimer() {
    timerInterval = setInterval (() => {
        if (timeLeft <= 0) {
            endGame("TIME IP")
            return;
        }
        
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft;
    }, 1000);
}

function endGame(reason) {
    gameOver = true;
    clearInterval(timerInterval);

    if(score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    document.getElementById("score").innerText = reason + ": " + score;
    document.getElementById("highScore").innerText = "High Score: " + highScore;
}

