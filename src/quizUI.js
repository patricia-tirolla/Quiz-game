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
    answerscontainer: document.getElementById("answers-container"),
    answersButtonList: document.getElementsByClassName("answers-text"),
    questionText: document.getElementById("question-text"),
    buttonsContainer: document.getElementById("buttons-container"),

    quizStart() {
        quizStructure.score = 0;
        this.i = 0;
        score.hideScore();

        quizStructure.quiz = [];
        quizStructure.quizAllQuestionsAndAnswers();

        this.hideDisplay();
        this.enablePlayerToChose();
        this.display();
        this.handlePlayerChoice();
    },
    display() {
        this.showDisplay();

        this.questionText.innerHTML = quizStructure.quiz[this.i][0];
        for (let index = 0; index < this.answersButtonList.length; index++) {
            const item = this.answersButtonList[index];
            const answers = quizStructure.quiz[this.i][1];
            item.innerHTML = answers[index];
        };
    },
    nextQuestion() {
        if (this.i < quizStructure.quiz.length - 1) {
            this.i++;

            this.enablePlayerToChose();
            this.display();
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
                this.disablePlayerToChose();
                e.stopImmediatePropagation();
            });
        };
    },
    QuizEnd() {
        score.showScore();
        this.disablePlayerToChose();
        this.hideDisplay();
    },
    enablePlayerToChose() {
        for (const button of this.answersButtonList) {
            button.removeAttribute("disabled");
            button.classList.remove("correct-answer");
            button.classList.remove("wrong-answer");
            button.classList.add("default-style");
        };
    },
    disablePlayerToChose() {
        for (const item of this.answersButtonList) {
            item.setAttribute("disabled", true);
        };
    },
    showDisplay() {
        this.questionText.style.display = "flex";
        this.answerscontainer.style.display = "flex";
        this.buttonsContainer.style.display = "flex";
    },
    hideDisplay() {
        this.questionText.style.display = "none";
        this.answerscontainer.style.display = "none";
        this.buttonsContainer.style.display = "none";
    }
};

const displayDOM = {
    // Would it be better to separate the display DOM here?
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