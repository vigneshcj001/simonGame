/*--------------------------------------Preloader--------------------------------------*/
$(document).ready(function() {
    window.onload = function() {
        $('#preloader ').fadeOut(5000, function() {
            $('#preloader').remove();
        });
    }
});
/*----------------------------------------Instruction---------------------------------------- */

$(document).ready(function(){
    $("button").click(function(){
        popup.classList.add("open-popup");

    })
    $("button1").click(function(){
        popup.classList.remove("open-popup");

    })
})




/*----------------------------------------Simon Game---------------------------------------------------- */

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#heading").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);//calling the function for play the sound
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
// Call nextSequence() after a 1000 millisecond delay
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#heading").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();//Call function startOver() if the user gets the sequence wrong
    }
}


function nextSequence() {
  userClickedPattern = [];// To create an empty array ready for the next level
  level++;//Increase Level
  $("#heading").text("Level " + level); // To Display level
  var randomNumber = Math.floor(Math.random() * 4);/* Generate numbers between 0 and 3  */
  var randomChosenColor = buttonColors[randomNumber];/* Choose the color from "buttonColors"  */
  gamePattern.push(randomChosenColor);/*Add the element to "gamePattern" */

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);/* To animate a flash to the button selected  */
  playSound(randomChosenColor);//calling function for play the sound
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
// To reset the values
  level = 0;
  gamePattern = [];
  started = false;
}