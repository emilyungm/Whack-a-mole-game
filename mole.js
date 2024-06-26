// globals
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // set up the grid for board in html
    // 3x3 grid
    for (let i=0; i<9; i++) {
        // divs get assigned div tag 0-8
        // use these IDs to figure which tile was clicked on
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000); 
    setInterval(setPlant, 2000); 

}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerHTML = score.toString();
    } else if (this === currPlantTile) {
        document.getElementById("score").innerHTML = "Game Over! Score: " + score.toString();
        gameOver = true;
    }
}

function getRandomTile() {
    // random is 0-1, multiply by 9 to get 0-8, round down
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    // clear all curr tags within this div tag
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    
    let mole = document.createElement("img");
    mole.src = "monty-mole.png";
    
    // randomly place mole on one of game tiles
    let num = getRandomTile();

    if (currPlantTile && currPlantTile.id === num) {
        // if mole and plant are on same tile, don't place mole
        return; 
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole)
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}