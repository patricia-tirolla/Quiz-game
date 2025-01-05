import { api } from "./fetchApi.js"

export const quizLogic = {
    questions: [],
    answers: [],
    quiz: [],

    questionsAndAnswersList: function (index) {
        const data = api.json;

        const question = data.results[index].question;
        const correctAnswer = data.results[index].correct_answer;
        const incorrectAnswer = data.results[index].incorrect_answers;

        this.answers.push(correctAnswer, ...incorrectAnswer);
        this.quiz = [question, this.answers];
        return this.quiz;
    },

    winCondition: function (answer, index) {
        return answer === api.json.results[index].correct_answer;
    },

    getRandom: function (max) {
        let index =  Math.floor(Math.random() * max);
        return index;
    },

    transformAnswersIntoRandomList: function () {
        for (let i = 0; i < this.answers.length; i++) {
            
            const randomIndex = this.getRandom((this.answers.length - i));
            let randomItem = this.answers[randomIndex];
            this.answers.splice(randomIndex, 1);
            this.answers.push(randomItem);
        }
    }
}

