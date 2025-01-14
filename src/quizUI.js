import { quizLogic, quizStructure } from "./quizLogic";

// buttons handlers
const startButton = document.getElementById("start-quiz");
startButton.addEventListener("click", () => {
    gameFlow.quizStart();
});

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
    gameFlow.nextQuestion();
});

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", () => {
    gameFlow.QuizEnd();
})

// Game flow
export const gameFlow = {
    i: 0,
    
    answersButtonList: document.getElementsByClassName("answers-text"),
    questionText: document.getElementById("question-text"),
    

    quizStart() {
        quizStructure.score = 0;
        this.i = 0;
        score.hideScore();

        quizStructure.quiz = [];
        quizStructure.quizAllQuestionsAndAnswers();

        displayDOM.hideDisplay();
        displayDOM.enablePlayerToChose();
        displayDOM.display();
        this.handlePlayerChoice();
    },
    nextQuestion() {
        if (this.i < quizStructure.quiz.length - 1) {
            this.i++;

            displayDOM.enablePlayerToChose();
            displayDOM.display();
        } else if (this.i == quizStructure.quiz.length - 1) {
            this.QuizEnd();
        }

    },
    handlePlayerChoice() {
        for (const button of this.answersButtonList) {
            button.addEventListener("click", (e) => {
                const answer = button.textContent;
                quizLogic.checkIfChoiceIsCorrect(answer, this.i);
                button.classList.remove("default-style");
                styles.stylePlayerChoice(button, answer, this.i);
                displayDOM.disablePlayerToChose();
                e.stopImmediatePropagation();
            });
        };
    },
    QuizEnd() {
        score.showScore();
        displayDOM.disablePlayerToChose();
        displayDOM.hideDisplay();
    },
};

const displayDOM = {
    // Would it be better to separate the display DOM here?
    answerscontainer: document.getElementById("answers-container"),
    buttonsContainer: document.getElementById("buttons-container"),
    display() {
        this.showDisplay();

        gameFlow.questionText.innerHTML = quizStructure.quiz[gameFlow.i][0];
        for (let index = 0; index < gameFlow.answersButtonList.length; index++) {
            const item = gameFlow.answersButtonList[index];
            const answers = quizStructure.quiz[gameFlow.i][1];
            item.innerHTML = answers[index];
        };
    },
    enablePlayerToChose() {
        for (const button of gameFlow.answersButtonList) {
            button.removeAttribute("disabled");
            button.classList.remove("correct-answer");
            button.classList.remove("wrong-answer");
            button.classList.add("default-style");
        };
    },
    disablePlayerToChose() {
        for (const item of gameFlow.answersButtonList) {
            item.setAttribute("disabled", true);
        };
    },
    showDisplay() {
        gameFlow.questionText.style.display = "flex";
        this.answerscontainer.style.display = "flex";
        this.buttonsContainer.style.display = "flex";
    },
    hideDisplay() {
        gameFlow.questionText.style.display = "none";
        this.answerscontainer.style.display = "none";
        this.buttonsContainer.style.display = "none";
    }
};

const score = {
    displayScoreContainer: document.getElementById("display-score-container"),

    defineScore() {
        this.displayScoreContainer.textContent = "You scored: " + quizStructure.score + "/10";
    },
    showScore() {
        this.defineScore();
        this.displayScoreContainer.style.display = "block";
    },
    hideScore() {
        this.defineScore();
        this.displayScoreContainer.style.display = "none";
    }
};

const styles = {
    stylePlayerChoice(choice, answer, index) {
        if (quizLogic.checkIfChoiceIsCorrect(answer, index)) {
            choice.classList.add("correct-answer");
        } else {
            choice.classList.add("wrong-answer");
        }
    },
};