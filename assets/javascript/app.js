

$(document).ready(function() {
// **********  variables ***********//

var counter = 0;
var time = 30;
var userGuess;
var interValId;
var wins = 0;
var losses =0;
var unAns = 0;
var questionIndex = 0;

// create a questions & answers array //


var questions = [ "what is the color of the sky ?", "what is the color of the car ?", "what is the color of the sea ?"
                , "which year was Terminator 1" , "which year was homealone"];

var Answers = [ ["blue", "black", "yellow"], ["yellow", "green", "red"], ["blue", "red", "white"] , 
                ["1985", "1988", "1990"], ["1989", "1990", "1991"]];

var correctAnswers = ["blue", "green", "white", "1988", "1990"];


// *********** Time functions  ************* //

function time1 () {
interValId = setInterval(time2,1000);
}

function time2 () {
    if (time>0) {
        time--;
    }
    if (time === 0) {
        timeUp();
        clearInterval(interValId);
    }
    $("#time").text("Time Remaining: " + time + "seconds");
}

function timeUp() {
    $("#questions, #answer1, #answer2, #answer3").empty();
    $("#questions").append("<h2> TIME OUT </h2> <h4> correct answer is <h/4>" + correctAnswers[questionIndex]);
    setTimeout(order,5000);
}

// define the questions function //

function question () {
    $("#questions").text(questions[questionIndex]);
    $("#answer1").text(Answers[questionIndex][0]);
    $("#answer2").text(Answers[questionIndex][1]);
    $("#answer3").text(Answers[questionIndex][2]);
}

// define the next questions function //

 function order () {
  if (questionIndex<4) {
      questionIndex ++;
      question();
      time=30;
      time1();
  }  else if (questionIndex === 4) {
      finalScreen();
  }
 }

$("#start").click(function(){
    startQuestions();
});

// ****** start function ******* //
function startQuestions () {
    console.log("startquestion function is called");
    $("#start").hide();
    time1();
    question();
}

$(".answers").on('click', function() {
    userGuess = $(this).text();
    if (userGuess === correctAnswers[questionIndex]) {
        win();
        wins++;
        console.log("wins is =" + wins);
        clearInterval(interValId);
        setTimeout(order,1000);
    } else {
        lose();
        losses++;
        console.log("losses is =" + losses);
        clearInterval(interValId);
        setTimeout(order,1000);
    }
});

 function win () {
    $(".answers, #questions, #answer1, #answer2, #answer3").empty();
    $("#questions").append("correct");
 }

 function lose () {
    $(".answers,#questions, #answer1, #answer2, #answer3").empty();
    $("#questions").append("wrong");
 }

 function finalScreen () {
    $(".answers, #questions,#answer1, #answer2, #answer3").empty(); 
    $("#correct").text("Correct Answer: " + wins);
    $("#incorrect").text("Incorrect Answer: " + losses);
    $("#unanswered").text("Unanswered: " + unAns);
    $("#play-again").text("Start Over?");
 }
 
 $("#play-again").on("click", function () {
    questionIndex =0;
     time1();
     question();
     wins= 0;
     losses = 0;
     unAns = 0;

     $("#correct,#incorrect,#unanswered,#play-again").empty();
 }); 
   

}); 