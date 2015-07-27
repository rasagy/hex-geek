// Basic Hex color guessing game
// Made by @rasagy using p5.js
// Check it on http://rasagy.in/hex-run

var guessCount = 0, gRound=0;

var rColor, rRed, rGreen, rBlue;
var pTotal, pRed, pGreen, pBlue;

var uiLeftMargin = 300, tinyMargin=20;

function preload() {
  WebFontConfig = {
    google: { families: [ 'Share+Tech::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
}

function setup() {
  // uncomment this line to make the canvas the full size of the window
  var myCanvas = createCanvas(windowWidth-uiLeftMargin, windowHeight);
  myCanvas.position(uiLeftMargin,0);

  noStroke();
  textAlign(CENTER);
  
  textSize(16);
  textFont("Share Tech");


  labelGuess = createElement('h3', 'Guess the color!');
  // labelGuess.position(20,0);
  labelGuess.id('labelGuess');
  labelGuess.parent('main-ui');

  inputHex = createInput('#');
  // inputHex.position(20, 65);
  inputHex.id('inputHex');
  inputHex.parent('main-ui');
  // inputHex.focus();

  buttonGuess = createButton('Make a guess');
  // buttonGuess.position(20, 90);
  buttonGuess.mousePressed(guessHex);
  buttonGuess.id('buttonGuess');
  buttonGuess.class('btn-lg');
  buttonGuess.parent('main-ui');

  pTotal = 0;

  generateColor();

  noLoop();
}

function draw() {
  // draw stuff here
  // ellipse(width/2, height/2, 50, 50);
}

function guessHex() {
  if(guessCount<3)
  {
  guessCount++;
  var gColor = color(inputHex.value());

  var gRed = red(gColor);
  var gGreen = green(gColor);
  var gBlue = blue(gColor);

  pRed = int((255 - abs(gRed-rRed))/10);
  pGreen = int((255 - abs(gGreen-rGreen))/10);
  pBlue = int((255 - abs(gBlue-rBlue))/10);

  pTotal = pTotal + pRed + pGreen + pBlue;

  print("G"+guessCount+": "+inputHex.value()+"/ "+gColor+"| Points: "+pRed+", "+pGreen+", "+pBlue+" ["+pTotal+"]");
  fill(gColor);
  rect(tinyMargin,guessCount*height/4,width-2*tinyMargin,height/4-tinyMargin);

  textAlign(CENTER);
  textSize(30);
  fill(0,100);
  text(inputHex.value()+" [+"+(pRed + pGreen + pBlue)+" points]", width/2+1,(guessCount+1)*height/4-tinyMargin*2+1);
  fill(200,100);
  text(inputHex.value()+" [+"+(pRed + pGreen + pBlue)+" points]", width/2,(guessCount+1)*height/4-tinyMargin*2);
  }

  if(guessCount==3) {
    guessCount = 0;
    setTimeout(function(){generateColor();}, 3000);
  }
  document.getElementById("inputHex").focus();
  inputHex.value('#');
  updateScore();
}

function generateColor() {
  gRound++;
  rRed = int(random(255));
  rGreen = int(random(255));
  rBlue = int(random(255));
  rColor = color(rRed, rGreen, rBlue);
  print("R: #"+hex(rRed,2)+hex(rGreen,2)+hex(rBlue,2)+"/ "+rColor+" Current Score: ["+pTotal+"]");

  fill(rColor);
  rect(0,0,width,height);

  pRed = 0;
  pGreen = 0;
  pBlue = 0;
  document.getElementById("inputHex").focus();
  updateScore();
}

function updateScore() {
  fill(50);
  rect(0,0,width,tinyMargin*2);
  fill(200,200);
  textAlign(RIGHT);
  textSize(16);
  text("Round: "+gRound+" | Score: "+pTotal, width-tinyMargin, tinyMargin*1.25);
}