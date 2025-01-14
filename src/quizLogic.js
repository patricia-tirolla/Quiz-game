import { api } from "./fetchApi.js"

export const quizStructure = {
    quiz: [],
    score: 0,

    createQuizSection({question, correct_answer, incorrect_answers}) {
        return {
            question: question,
            answers: this.shuffleAnswers([correct_answer, ...incorrect_answers]),
        };
    },

    setUpQuiz() {
        for (let i = 0; i < api.json.results.length; i++) {
            const quizSection = this.createQuizSection(api.json.results[i]);
            this.quiz[i] = { quizSection };
        }
    },

    getRandom: function (max) {
        let index = Math.floor(Math.random() * max);
        return index;
    },

    shuffleAnswers(answers) {
        for (let i = 0; i < answers.length; i++) {
            const randomIndex = this.getRandom((answers.length - i));
            let randomItem = answers[randomIndex];
            answers.splice(randomIndex, 1);
            answers.push(randomItem);
        }
        return answers;
    }
}

export const quizLogic = {
    checkIfChoiceIsCorrect(answer, index) {
        if (answer === api.json.results[index].correct_answer) {
            this.increaseScore();
            return true;
        } else {
            return false;
        }
    },
    increaseScore() {
        quizStructure.score++;
    },
}

