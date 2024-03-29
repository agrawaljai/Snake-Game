//game constants and variables
let inputDir = {x: 0, y: 0};
let speed = 10;
let lastPaintTime = 0; 
let score = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y:7};
let record = 0;


//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    // bump to yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
        //wall case
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0) {
        return true;
    }
    return false;
        
    
}


function gameEngine() {
    //snake updation array
    if(isCollide(snakeArr)){
        inputDir= {x: 0, y: 0};
        alert("Game Over. Press any key to play again");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // if food eaten - inr score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score+=1;
        if(record<score) {
            record = score;
            highScoreBox.innerHTML = "Record: " + record;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 1;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i+1] = {...snakeArr[i]}; //destructuring  - all togather new object
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //render snake and food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
         
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
     

}


//main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1} //start the game
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowUp");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowUp");
            inputDir.x = 1;
            inputDir.y = 0;
            break;    
    }
})

