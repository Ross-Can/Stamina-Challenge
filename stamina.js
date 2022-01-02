var countDownAudio = []
var introMusic;
var failedMusic;
var tickTickMusic;
var level;
var goal;
var difficulty;
var current;
var gameActive;


//game round select
function startRound() {
  if (gameActive)
    return;
  
  introMusic.play();
  gameActive = true;
  setStatusText("LEVEL: " + level + " BEGIN!")
  updateBar();

  if (level == 1) {
    changeStartBtnTextTo("Goal: " + goal, gameActive);
    startTimer(25);
    singleGreenRound();
  }
  else if (level == 2) {
    changeStartBtnTextTo("Goal: " + goal, gameActive);
    startTimer(25);
    singleGreenRedRound();
  }
  else if (level == 3) {
    changeStartBtnTextTo("Goal: " + goal, gameActive);
    startTimer(25);
    rainbowcolorRound();
  }
  else {
    changeStartBtnTextTo("Goal: " + goal, gameActive);
    startTimer(25);
    getRandomScene();
  }
}

//game rounds
// one single green
function singleGreenRound() {
  if (!gameActive) return; 
  colorGrid("white");
  changeRandomBtnTo("green");
  if (current < goal && gameActive)
    setTimeout(singleGreenRound, difficulty);
  else if (gameActive)
    winnerChickenDinner();
}

//green surriunded by red
function singleGreenRedRound() {
  if (!gameActive) { return; }
  colorGrid("red");
  changeRandomBtnTo("green");
  if (current < goal && gameActive)
    setTimeout(singleGreenRedRound, difficulty);
  else if (gameActive) 
    winnerChickenDinner();
}

//multifunctional buttons
function rainbowcolorRound() {
  if (!gameActive) return; 
  if (current == 0) { drop(); drop(); drop(); drop(); }
  drop();
  changeRandomBtnTo("green");
  if (current < goal && gameActive)
    setTimeout(rainbowcolorRound, difficulty);
  else if (gameActive)
    winnerChickenDinner();
}

//when player wins
function winnerChickenDinner() {
  current = 0;
  colorGrid("white");
  setStatusText("YOU BEAT LEVEL: " + level + "! On to round " + (level + 1));
  windowBorderStyle("success");
  gameActive = false;
  increaseLevel();
  changeStartBtnTextTo("Start Level: " + level, gameActive);
  var audio = new Audio('audio/coin.mp3');
  audio.play();
}

//when player looses
function GameOver() {
  failedMusic.play();
  current = 0;
  colorGrid("white");
  setStatusText("Times up! Game over. Level Reached: " + level);
  gameActive = false;
  level = 1;
  changeStartBtnTextTo("Play Again? Go to Level 1?", true);
}

function startTimer(seconds) {
  
  var time = seconds;
  var i = 4;

  var repeat = setInterval(function () {
    if (!gameActive) {
      clearInterval(repeat);
      return;
    }

    // countDown from five
    if (time <= 5 && time > 0) {
      introMusic.pause();
      countDownAudio[i].play();
      i = i - 1;
      }

    setStatusText(time);
    if (time == 25){
      tickTickMusic.play(); 
      }

    //gameover
    if (time == 0 && current < goal && gameActive) {
      tickTickMusic.pause();
      GameOver();
      clearInterval(repeat);
      return;
    }
    else if (current >= goal && gameActive) {
      time = 0;
      tickTickMusic.pause();
      winnerChickenDinner();
      clearInterval(repeat);
      return;
    }
    time = time - 1;
  }, 1000);

}

//helper functions
function fillAudio() {
  countDownAudio[0] = new Audio('audio/one.mp3');
  countDownAudio[1] = new Audio('audio/two.mp3');
  countDownAudio[2] = new Audio('audio/three.mp3');
  countDownAudio[3] = new Audio('audio/four.mp3');
  countDownAudio[4] = new Audio('audio/five.mp3');
  tickTickMusic = new Audio('audio/clock.mp3');
  failedMusic = new Audio('audio/fail.mp3');
  introMusic = new Audio('audio/eyetiger.mp3');
  introMusic.loop = true;
}

function chooseLocation() {
  var num = getRandomNumber(1, 5);
  if (num == 1)
    return "justify-content-md-start";
  else if (num == 2)
    return "justify-content-md-center";
  else if (num == 3)
    return "justify-content-md-around";
  else if (num == 4)
    return "justify-content-md-end";
  else
    return "row justify-content-between"
}

function getRandomScene() {
  var num = getRandomNumber(1, 3);
  if (num == 1)
    singleGreenRound();
  else if (num == 2)
    singleGreenRedRound();
  else if (num == 3)
    rainbowcolorRound();
}

function changeRandomBtnTo(color) {
  var i = getRandomNumber(0, 7);
  var j = getRandomNumber(0, 7);
  setButtonColor(i, j, color);
}

//this is what's triggered when any button in the matrix is pressed

function buttonClicked(i, j) { //this is where you should start
  if (getButtonColor(i, j) == "green" && gameActive)
    clickedGreen();
  else if (getButtonColor(i, j) == "red" && gameActive)
    clickedRed();
  else if (getButtonColor(i, j) == "yellow" && gameActive)
    clickedYellow();
  else if (getButtonColor(i, j) == "turquoise" && gameActive)
    clickedTurquiose();
  else if (getButtonColor(i, j) == "black" && gameActive)
    clickedBlack();

}

function clickedGreen() {
  current = current + 1;
  changeStartBtnTextTo("You can do it! Left to go: " + (goal - current), gameActive);
  updateBar();
}

function clickedRed() {
  changeStartBtnTextTo("Tis I, killer of progess, The RED BUTTON. Subtracting one level at a time. Hehe...", gameActive);
  current = current - level;
  windowBorderStyle("danger");
  updateBar();
}

function clickedYellow() {
  changeStartBtnTextTo("I, The YELLOW BUTTON have sped up the game. NYAH-HA!", gameActive);
  startBtnColorTo("warning");
  windowBorderStyle("warning");
  difficulty = (difficulty * 0.5);
}

function clickedTurquiose() {
  if (level == 3) {
    changeStartBtnTextTo("Oops! Level decreased to: " + level + ". difficulty raised. Sorry", gameActive);
    setStatusText("Wait, what are you doing?!");
    level = level - 1;
  } else if (level == 2) {
    changeStartBtnTextTo("Oops! Level decreased to: " + level + ". difficulty raised. Sorry", gameActive);
    setStatusText("Stop!!! YOU'LL BE SORRY....");
    level = level - 1;
  } else if (level <= 1) {
    setStatusText("Game over! You asked for it");
    level = 0;
    current = goal;
  } else {
    increaseLevel();
    level = level - 2;
    changeStartBtnTextTo("Oops! Level decreased to: " + level + ". difficulty raised. Sorry", gameActive);
    setStatusText("Muwahha!! I the TURQOISE BUTTON GOD have lowered your level!")
  }

}

function clickedBlack() {
  level = 0;
  changeStartBtnTextTo("I just killed the game.", gameActive);
  setStatusText("Pretend like nothing happened ");
  startBtnColorTo("dark");
  windowBorderStyle("dark");
}

function updateBar() {
  if (current >= goal) {
    setProgressBar("bar", "bg-success", 100);
  } else {
    progress = (Math.floor((current / goal) * 100));
    setProgressBar("bar", "bg-danger", progress);
  }
}

function windowBorderStyle(style) {
  var headDiv = document.getElementById("head");
  headDiv.className = "container bg-white border border-" + style;
  var grid = document.getElementById("grid");
  grid.className = "container bg-white border border-" + style;
}

function increaseLevel() {
  level = level + 1;
  goal = level * 5;
  difficulty = 10000 - (goal * 100);

}

function resetStats(){
  level = 1;
  goal = level*5;
  difficulty = 10000 - (goal*100);
  gameActive = false;
  current = 0;
}