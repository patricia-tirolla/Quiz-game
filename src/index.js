import { api } from "./fetchApi";
import { quizLogic } from "./quizLogic";

console.log(await api.getData());
quizLogic.questionsAndAnswersList("1");
console.log(quizLogic.answers)
quizLogic.transformAnswersIntoRandomList();
console.log(quizLogic.answers)
console.log(quizLogic.quiz);

console.log(quizLogic.winCondition("The Prodigy", "1"))

