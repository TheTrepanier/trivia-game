// game elements
var questions = [
    {
    question: "What creature is depicted in the emblem for Gryffindor house?",
    answers: [
        "an eagle",
        "a lion",
        "a badger",
        "a serpent"
    ],
    correctAnswers: "a lion"
    },
    {
    question: "Among the wizarding community, the term \"Muggle\" refers to what kind of person?",
    answers: [
        "a magical person with only one magical parent",
        "a non-magical person from a magical family",
        "a non-magical person from a non-magical family",
        "a magical person who is really bad at magic"
    ],
    correctAnswers: "a non-magical person from a non-magical family"
    },
    {
    question: "True or false: Professor Dumbledore's spectacles are rectangular?",
    answers: [
        "True",
        "False"
    ],
    correctAnswers: "False"
    },
    {
    question: "Which Hogwarts student says, \"I don't go looking for trouble. Trouble usually finds me\"?",
    answers: [
        "Draco Malfoy",
        "Ron Weasley",
        "Fred Weasley",
        "Harry Potter"
    ],
    correctAnswers: "Harry Potter"
    },
    {
    question: "Members of Ravenclaw house are known for possessing which of the following traits?",
    answers: [
        "Intelligence",
        "Cunning",
        "Loyalty",
        "Bravery"
    ],
    correctAnswers: "Intelligence"
    }
];
var questionNumber = 0;
var points = 0;

// visual elements
var masthead = $("<h1>").addClass("center-align");
var displayQuestion = $("<h3>").addClass("center-align");
var buttonDiv = $("<div>").addClass("container center-align");
var timerWrapper = $("<h5>").addClass("center-align");
var nextButton = $("<button>").attr("id", "next-button").addClass("btn waves-effect waves-light").text("Next Question");

// logic elements
var intervalId;
var timer = 30;

function count() {
    if (timer > 0) {
        timer--;
        timerWrapper.text(timer + " Seconds");    
    } else {
        timerOut();
    }
}

function startTimer() {
    intervalId = setInterval(count, 1000);
    timerWrapper.text(timer + " Seconds");
}

function stopTimer() {
    clearInterval(intervalId);
    timer = 30;
}

function askQuestion() {
    if (questionNumber < questions.length) {
        $("#root").empty();
        buttonDiv.empty();
        displayQuestion.text(questions[questionNumber].question);
    
        for (let index = 0; index < questions[questionNumber].answers.length; index++) {
            const element = questions[questionNumber].answers[index];
            var answerButton = $("<button>").attr("data-answer", element).addClass("btn waves-effect waves-light answer-btn").css({"display" : "block", "margin-left" : "auto", "margin-right" : "auto", "margin-top" : "2rem"}).text(element);
            
            buttonDiv.append(answerButton);
        }
        startTimer();
        $("#root").append(displayQuestion, timerWrapper, buttonDiv);
    
        $(".answer-btn").on("click", function() {
            var answerSelected = $(this).attr("data-answer");
            checkAnswer(answerSelected);        
        });
    } else {
        var pointsText = $("<h5>").text("You've recived : " + points + " points");
        var startOverButton = $("<button>").attr("id", "start-over").addClass("btn waves-effect waves-light").text("Take Exam Again");
        $("#root").empty();
        buttonDiv.empty();
        masthead.text("You've reached the end of your exam");
        buttonDiv.append(pointsText, startOverButton);
        $("#root").append(masthead, buttonDiv);
        $("#start-over").on("click", startGame);
    }

}

function startGame() {
    $("#root").empty();
    questionNumber = 0;
    points = 0;
    var buttonDiv = $("<div>").attr("id", "start-game-button").addClass("center-align").css("margin-top", "4rem");
    var startGameButton = $("<button>").addClass("btn waves-effect waves-light").text("Start My Exam");
    masthead.text("Welcome To Your End Of Year Exams At Hogwarts!");
    $(buttonDiv).append(startGameButton);
    $("#root").append(masthead, buttonDiv);
    $("#start-game-button").on("click", askQuestion);
}

function sendToSuccessScreen() {
    $("#root").empty();
    buttonDiv.empty();
    masthead.text("Correct! Five points to your house!");
    buttonDiv.append(nextButton);
    $("#root").append(masthead, buttonDiv);
    $("#next-button").on("click", askQuestion);
}

function sendToFailureScreen() {
    $("#root").empty();
    buttonDiv.empty();
    masthead.text("I'm sorry but that is incorrect...");
    buttonDiv.append(nextButton);
    $("#root").append(masthead, buttonDiv);
    $("#next-button").on("click", askQuestion);
}

function timerOut() {
    $("#root").empty();
    buttonDiv.empty();
    masthead.text("I'm sorry but we have to move on to the next question...");
    buttonDiv.append(nextButton);
    $("#root").append(masthead, buttonDiv);
    $("#next-button").on("click", askQuestion);
}

function checkAnswer(passedAnswer) {
    if (passedAnswer === questions[questionNumber].correctAnswers) {
        questionNumber++;
        points += 5;
        stopTimer();
        sendToSuccessScreen();
    } else {
        questionNumber++;
        stopTimer();
        sendToFailureScreen();
    }
}

$(document).ready(function () {
    startGame();
});