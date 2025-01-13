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
    nextQuestion() {
        if (this.i < quizStructure.quiz.length - 1) {
            this.i++;
            this.enablePlayerToChose();
            this.display();
        } else if (this.i == quizStructure.quiz.length - 1) {
            this.QuizEnd()
        }

    },
    display() {
        this.questionText.style.display = "block";
        this.answerscontainer.style.display = "block";
        this.questionText.innerHTML = quizStructure.quiz[this.i][0];
        for (let index = 0; index < this.answersButtonList.length; index++) {
            const item = this.answersButtonList[index];
            const answers = quizStructure.quiz[this.i][1];
            item.innerHTML = answers[index];
        }
    },
    handlePlayerChoice() {
        for (const button of this.answersButtonList) {
            button.addEventListener("click", (e) => {
                const answer = button.textContent;
                quizLogic.checkIfChoiceIsCorrect(answer, this.i);
                this.disablePlayerToChose();
                e.stopImmediatePropagation();
            })
        }
    },
    disablePlayerToChose() {
        for (const item of this.answersButtonList) {
            item.setAttribute("disabled", true);
        }
    },
    enablePlayerToChose() {
        for (const button of this.answersButtonList) {
            button.removeAttribute("disabled");
        }
    },
    hideDisplay() {
        this.questionText.style.display = "none";
        this.answerscontainer.style.display = "none";
    },
    QuizEnd() {
        alert("End of the quiz!")
        score.showScore();
        this.disablePlayerToChose();
        this.hideDisplay();
    }
}

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
}
