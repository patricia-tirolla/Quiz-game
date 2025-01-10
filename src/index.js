import { api } from "./fetchApi";
import { quizStructure, quizLogic } from "./quizLogic";
import { gameFlow } from "./quizUI";

console.log(await api.getData());
quizStructure.quizAllQuestionsAndAnswers();
console.log(quizStructure.answers);
console.log(quizStructure.quiz);

gameFlow.gameStart();

// console.log(quizStructure.answers)
// quizStructure.transformAnswersIntoRandomList();
// console.log(quizStructure.answers)
// console.log(quizStructure.quizSection);

// console.log(quizLogic.increaseScoreCondition("The Prodigy", "1"))
// quizLogic.increaseScoreCondition("The Prodigy", 1);


