let questionCard = document.querySelector(".question");
let choice = document.querySelector(".choices");
let timerElement = document.querySelector(".timer");
let correctAnswers = 0;
let currentQuestion = 0;
let secondsLeft = 30;

//confirm start
window.alert("You have 30 seconds. Start the quiz?")
setTime();

//timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft + " seconds left.";

        if (secondsLeft <= 0) {
            // Stops game and triggers gameover function
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1100);
}

//array of questions
let questions = [
    {
        question: "How do you declare a variable in JavaScript?",
        choices: ["a. v myVar = value;", "b. var myVar = value;", "c. variable myVar = value;", "d. let myVar = value;"],
        correct: 3
    },
    {
        question: "What is the purpose of the console.log() function in JavaScript?",
        choices: ["a. To log errors to the console", "b. To print output to the console", "c. To execute a function", "d. To declare a variable"],
        correct: 1
    },
    {
        question: "Which of the following is used to comment out multiple lines of code in JavaScript?",
        choices: ["a. // comment", "b. /* comment */", "c. <!-- comment -->", "d. # comment #"],
        correct: 1
    },
    {
        question: "How do you write an if statement in JavaScript?",
        choices: ["a. if (condition) { }", "b. condition { }", "c. check condition if { }", "d. if condition then { }"],
        correct: 0
    },
    {
        question: "What is the purpose of the for loop in JavaScript?",
        choices: ["a. To declare a variable", "b. To create an object", "c. To iterate over a sequence of values", "d. To define a function"],
        correct: 2
    },
    {
        question: "What is the purpose of the typeof operator in JavaScript?",
        choices: ["a. To check the type of a variable", "b. To compare two variables", "c. To declare a new variable", "d. To create a new object"],
        correct: 0
    },
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        choices: ["a. The current object", "b. The global object", "c. The parent object", "d. The next object"],
        correct: 0
    },
    {
        question: "How do you include an external JavaScript file in an HTML document?",
        choices: ["a. <script src=\"script.js\"></script>", "b. <link href=\"script.js\">", "c. <js src=\"script.js\"></js>", "d. <include src=\"script.js\">"],
        correct: 0
    },
];


//generate the questions being shown
function showQuestion() {
    let questionText = document.getElementById("question");
    questionText.textContent = questions[currentQuestion].question;

    let currentChoices = document.querySelectorAll(".choice");
    currentChoices.forEach((choice, index) => {
        choice.textContent = questions[currentQuestion].choices[index];
        let feedback = document.getElementById("feedback");
        //hide the feedback 
        feedback.textContent = "";
    });
}

showQuestion();

//to check the answers and generate next question
function checkAnswer(selected) {
    let feedback = document.getElementById("feedback");
    if (selected === questions[currentQuestion].correct) {
        feedback.textContent = "That's right!";
        correctAnswers++;
    } else {
        feedback.textContent = "That's incorrect!";
        //deducts time when answer is wrong
        secondsLeft -= 4;
    }

    //add a delay
    setTimeout(() => {
        currentQuestion++;
        //if there are no more questions, trigger gameover function
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            gameOver();
        }
    }, 900);

}

//when game is over, set initials and score to local storage and display on screen
function gameOver() {
    let quizContainer = document.querySelector(".wrapper");

    //let user enter initials and save info in localStorage
    let userInitials = window.prompt("Enter your initials:")
    localStorage.setItem("userScore", correctAnswers);
    localStorage.setItem("initials", userInitials);
    let quizResultInitial = localStorage.getItem("initials");
    let quizResultScore = localStorage.getItem("userScore");

    window.alert("Save score?");

    quizContainer.innerHTML = `<b><p>You got ${correctAnswers} out of ${questions.length} questions correct.</p></b><b></b><p>Player: ${quizResultInitial}</p><br><p>Score: ${quizResultScore}</p>`
}

