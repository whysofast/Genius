var buttonColour = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);

}

$(".btn").on("click",handleClick);

function handleClick(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    
}

function playAudio(name){
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.volume = 0.1;
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

$(document).on("keypress",function(){
    if (level===0){
        $("h1").text("Initializing...")
        setTimeout(nextSequence,500);
    }
})

$("#level-title").on("click",function(){
    if (level===0){
        $("h1").text("Initializing...")
        setTimeout(nextSequence,500);
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else{
        playAudio("wrong");
        $("body").addClass("game-over");
        text= "Level "+ (level-1) +" - Game Over, Press Any Key to Restart";
        $("h1").text(text);
        reset();
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    }
}

function reset(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}