var progress;
var startButton;


function setup() { //initialize everything
  resetStats();
  fillFunctionButtons();
  fillStatusText();
  fillProgressBar();
  fillMatrix();
  fillAudio();
  setStatusText("Welcome to the 25 Stamina Challenge!", "text-bold" );
  introMusic.play();
}

function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  startButton = createButton("Start Game!", "btn btn btn-outline-success btn-sm mt-3 mx-auto", "startRound()");
  startButton.id = "startBtn";
  funcBtnRow.appendChild(startButton);
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText() {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("ml-3 text-uppercase text-success");
  infoTextRow.id = "infoText"; //set id of this element so we can change it later
  headDiv.appendChild(infoTextRow);
}

function setStatusText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  textDiv.appendChild(newText);
}

function fillProgressBar() {
  var headDiv = document.getElementById("head");
  var progessRow = createRow("progress");
  progress = 0;
  //a green colored bar
  var bar = createProgressBar("bar", "bg-danger", progress);
  progessRow.appendChild(bar);
  headDiv.appendChild(progessRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  for (i = 0; i < 8; i++) {
    var newRow = createRow(chooseLocation());
    for (j = 0; j < 8; j++) {
      newRow.appendChild(createDefaultButton(i, j));
    }
    matrix.appendChild(newRow);
  }
}

function colorGrid(style){
   for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, style);
    }
  }
}

function drop() { //sample function 2
  for (i = 7; i > 0; i--) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getButtonColor(i-1, j));
    }
  }
  //for row 0
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getRandomColor());
    }
}

function startBtnColorTo(style){
  var roundBtn = document.getElementById("startBtn");
  roundBtn.className = "btn btn btn-outline-"+style+" btn-sm mt-3 mx-auto";
}

function changeStartBtnTextTo(text,active){
  var roundBtn = document.getElementById("startBtn");
  roundBtn.removeChild(roundBtn.firstChild);
  roundBtn.appendChild(document.createTextNode(text));
  if(active == true){
    windowBorderStyle("danger");
    roundBtn.className = "btn btn btn-outline-danger btn-sm mt-3 mx-auto";
  }else{
     windowBorderStyle("success");
     roundBtn.className = "btn btn btn-outline-success btn-sm mt-3 mx-auto";
  }
}

// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createProgressBar(bar_id, color, value) {
  var bar = document.createElement("div");
  bar.id = bar_id;
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  return bar;
}

function setProgressBar(bar_id, color, value) {
  var bar = document.getElementById(bar_id);
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  bar.innerHTML = value + "%";
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
  button.setAttribute("onclick", "buttonClicked("+i+","+j+")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/white.jpg");
  img.setAttribute("alt", "white");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  return button;
}

function setButtonColor(i, j, color) {
  var button = document.getElementById("img_" + i + "_" + j);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  return img.getAttribute("alt");
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return text.innerHTML;
}

function getRandomColor() {
  //you might want to change this to get more colors
  var random = Math.floor(Math.random() * 4);
  if (random < 1) {
    return "red";
  } else if (random < 2) {
    return "black";
  } else if (random < 3) {
    return "turquoise";
  }
  return "yellow";
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}



