const questions = [
    {
        question: "The World Largest desert is ?",
        answers:[
            {Text: "Thar", correct: false},
            {Text: "Kalahari", correct: false},
            {Text: "Sahara", correct: true},
            {Text: "Sonoran", correct: false},
            
        ]
    },

    {
        question: "Which one of the following river flows between Vindhyan and Satpura ranges?",
        answers:[
            {Text: "Mahandi", correct: false},
            {Text: "Son", correct: false},
            {Text: "Narmada", correct: true},
            {Text: "Netravati", correct: false},
            
        ]
    },

    {
        question: "Who among the following wrote Sanskrit grammar?",
        answers:[
            {Text: "Panini", correct: true},
            {Text: "Kalidasa", correct: false},
            {Text: "charak", correct: false},
            {Text: "Aryabhatt", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." +currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}
function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    let no_of_q = questions.length ;
    questionElement.innerHTML = `You scored ${score} out of ${no_of_q}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "Block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
    
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

