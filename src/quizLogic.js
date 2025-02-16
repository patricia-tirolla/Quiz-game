import { api } from "./fetchApi.js";

export const quizStructure = {
  quiz: [],
  score: 0,

  createQuizSection({ question, correct_answer, incorrect_answers }) {
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
    // can be simplified to one line
    return Math.floor(Math.random() * max);
  },

  shuffleAnswers(answers) {
    // this could be done with sort
    return answers.sort(() => Math.random() - 0.5);
  },
};

export const quizLogic = {
  checkIfChoiceIsCorrect(answer, index) {
    // this can be simplified with a ternary operator
    answer === api.json.results[index].correct_answer
      ? this.increaseScore()
      : null;
    return answer === api.json.results[index].correct_answer;
  },
  increaseScore() {
    quizStructure.score++;
  },
};
