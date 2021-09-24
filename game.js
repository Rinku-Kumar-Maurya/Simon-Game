var btnColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var startGame = false;
var level = 0;

$(document).keypress(function(){
    if(!startGame){
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = true;
    }
});

$(".btn").click(function() {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = btnColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    animatePress(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audioElement = new Audio("/sounds/" + name + ".mp3");
    audioElement.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    startGame = false;
    level = 0;
    gamePattern = [];
}