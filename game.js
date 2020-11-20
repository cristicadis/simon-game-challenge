var buttonColours = new Array("red","blue","green","yellow");
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level=0;

$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function(event) {

  var userChosenColour=event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length-1);


});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber=(Math.floor(Math.random()*4));
  level=level+1;
  $("h1").html("Level "+level);
  var randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(name){
  var crash=new Audio("sounds/"+name+".mp3");
  crash.play();
}


function animatePress(currentColour){

$("#"+currentColour).addClass("pressed").delay(100).queue(function(next){
    $(this).removeClass("pressed");
    next();
});

}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");


      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}
