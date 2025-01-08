import { api } from "./fetchApi";
import { quizStructure, quizLogic } from "./quizLogic";

console.log(await api.getData());
quizStructure.separateEachQuestion("1");
console.log(quizStructure.answers)
quizStructure.transformAnswersIntoRandomList();
console.log(quizStructure.answers)
console.log(quizStructure.quiz);

console.log(quizLogic.winCondition("The Prodigy", "1"))
console.log (quizStructure.score);
quizLogic.winCondition("The Prodigy", "1");
quizLogic.increaseScore()
console.log(quizStructure.score);

