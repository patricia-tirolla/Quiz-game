import { api } from "./fetchApi.js"

export const quizStructure = {
    answers: [],
    quizSection: [],
    quiz: [],
    score: 0,

    separateEachQuizSection(index) {
        const data = api.json;

        const question = data.results[index].question;
        const correctAnswer = data.results[index].correct_answer;
        const incorrectAnswer = data.results[index].incorrect_answers;

        this.answers = [correctAnswer, ...incorrectAnswer];
        this.shuffleAnswers()
        
        this.quizSection = [question, this.answers];
        return this.quizSection;
    },

    quizAllQuestionsAndAnswers() {
        for (let i = 0; i < api.json.results.length; i++) {
            this.separateEachQuizSection(i);
            const quizSection = this.quizSection;
            this.quiz.push(quizSection);
        }
        return this.quiz;
    },

    getRandom: function (max) {
        let index = Math.floor(Math.random() * max);
        return index;
    },

    shuffleAnswers() {
        for (let i = 0; i < this.answers.length; i++) {
            const randomIndex = this.getRandom((this.answers.length - i));
            let randomItem = this.answers[randomIndex];
            this.answers.splice(randomIndex, 1);
            this.answers.push(randomItem);
        }
        return this.answers;
    }
}

export const quizLogic = {
    increaseScoreCondition(answer, index) {
        if (!api.json || !api.json.results[index]) {
            throw new Error("Invalid question index or API data not loaded.");
        }
        if (answer === api.json.results[index].correct_answer) {
            this.increaseScore();
            return true;
        }
    },
    increaseScore() {
        quizStructure.score++;
    },
}

