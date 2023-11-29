/*seconds 
const easy=3;
const medium=5;
const hard=8;*/
//will change based on user input
const numOfImg=8;
//maximum time for each numOfImg 
const maxTime=0;
const maxTimeEasy=120; //8 images
const maxTimeMed=150; //10 images
const maxTimeHard=180; //12 images
//track game
let images=[];
let matched=[];
let revealed=[];
var timer;
var timeLeft;
var level;

//to get max time and images
function getDifficulty(){
    var easy=document.getElementById("easy");
    var medium=document.getElementById("medium");
    var hard=document.getElementById("hard");
    if(easy.checked==true){
        startGame(easy);
    } else if(medium.checked==true){
        startGame(medium);
    } else startGame(hard);
}
function startGame(difficulty){
    level=difficulty;
    timeLeft=getTime(difficulty);
    images=generateCards(getNumOfImages(difficulty));
    matched=[];
    revealed=[];
    clearInterval(timer);
    document.getElementById('winMessage').textContent = 'HAVE FUN!!!';
    document.getElementById('timer').style.visibility = 'visible';
    document.getElementById('gameContainer').innerHTML='';
    displayGame();
    updateTimerDisplay();
    timer=setInterval(updateTimer, 1000);
    console.log("startgame");
}
function generateCards(numOfImg){
    const imagesName=[];
    for(var i=1; i<=numOfImg; i++){
        imagesName.push("img"+i+".png")
    }
    /*const imagesName=[
        "img1.png",
        "img2.png",
        "img3.png",
        "img4.png",
        "img5.png",
        "img6.png", 
        "img7.png", 
        "img8.png", 
        "img9.png", 
        "img10.png", 
        "img11.png", 
        "img12.png",
    ]; */
    const pairs=imagesName.concat(imagesName);
    shuffle(pairs);
    return pairs;
}
function shuffle(arr){
    for(let i=arr.length-1; i>0; i--){
        const j= Math.floor(Math.random() *(i + 1));
        [arr[i], arr[j]]=[arr[j], arr[i]];
    }
}
function displayGame(){
    const gameContainer=document.getElementById('gameContainer');
    for(let i=0; i<images.length;i++){
        const card=document.createElement('div');
        card.className='card';
        card.dataset.index=i;
        card.addEventListener('click', cardClick);
        gameContainer.appendChild(card);
    }
   console.log("displaygame");
}
function cardClick(event){
    const card=event.target;
    if(!revealed.includes(card) && revealed.length<2){
        card.style.backgroundImage=`url(${images[card.dataset.index]})`;
        revealed.push(card);
        if(revealed.length===2)
            setTimeout(match, 1000);
    }
}
function match(){
    if(images[revealed[0].dataset.index]===images[revealed[1].dataset.index]){
        matched.push(revealed[0]);
        matched.push(revealed[1]);
        if(matched.length===images.length){
            document.getElementById('winMessage').textContent='CONGRATS YOU WON!!!';
            clearInterval(timer);
        }
    } else {
        revealed[0].style.backgroundImage='none';
        revealed[1].style.backgroundImage='none';
    }
    revealed=[];
}
function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('winMessage').textContent = 'Game over';
    }
    updateTimerDisplay();
}
function updateTimerDisplay() {
    const timeDisplay = document.getElementById('timeLeft');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function getTime(difficulty){
    switch(difficulty){
        case easy:
            return maxTimeEasy;
        case medium:
            return maxTimeMed;
        case hard: 
            return maxTimeHard;
        default: 
            return maxTimeEasy;
    }
}function getNumOfImages(difficulty){
    switch(difficulty){
        case easy:
            return '8';
        case medium:
            return '10';
        case hard:
            return '12';
        default:
            return '8';
    }
}
document.getElementById('start').addEventListener('click', ()=>startGame(easy));

startGame(easy);