// Game Constants & Variables
let inputDir ={x:0,y:0};
const board = document.getElementById("board");
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
let points = document.getElementById("num");
let hScore = document.getElementById("hScore");
let speed = 5;
let score = 0;
hScore.innerHTML=localStorage.getItem("score")||0;
let highScore = localStorage.getItem("score")||0;
console.log(highScore);
let lastPaintTime = 0;
let snakeArr =[
    {x:13,y:15}
]
food = {x:6,y:7}



//Game Functions
function main(ctime){
    // musicSound.play();
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
 
function isCollide(sArr){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y)
        return true;
        
    }
    if(snakeArr[0].x<=0 || snakeArr[0].x>=21|| snakeArr[0].y<=0 || snakeArr[0].y>=21)
   return true;
return false;
}

function gameEngine(){
    //Part 1': Updating the snake array & Food
       if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        // musicSound.play();
        score=0;
        speed=5;
        points.innerHTML=score;
       }

    //  If you have eaten the food,increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score++;
        if(score>highScore){
            localStorage.setItem("score",score);
            console.log(highScore);
            hScore.innerHTML=localStorage.getItem("score");
        }
        if(score>10&&score<=11)
            speed+=2;
        if(score>30&&score<=31)
            speed+=2;
        points.innerHTML=score;
        console.log(score);
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }
  
      //Moving the snake
      for(let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        console.log(snakeArr[i+1]);
      }
      snakeArr[0].x+=inputDir.x;
      snakeArr[0].y+=inputDir.y;
      
    //Part 2':Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x; 
        if(index===0)
        snakeElement.classList.add('head');
         else
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; 
    foodElement.style.gridColumnStart = food.x; 
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
 
// Main logic starts here

window.addEventListener('keydown',(e)=>{
    inputDir={x:0,y:1}//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x =0 ;
            inputDir.y = 1;
            break;

            case "ArrowLeft":
                inputDir.x =-1 ;
                inputDir.y = 0;
                break;

        case "ArrowRight":
            inputDir.x =1 ;
            inputDir.y =0 ;
            break;

            
            default:
            break;
    }
});














// Main logic starts here
window.requestAnimationFrame(main)