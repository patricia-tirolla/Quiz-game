
import { quizLogic, quizStructure } from "../src/quizLogic.js";
import { api } from "../src/fetchApi.js"
 
describe("Quiz Logic", () => {
    beforeEach(() => {
        api.json = {
            results: [
                {
                    question: "Which band released the album 'The Fat of the Land'?",
                    correct_answer: "The Prodigy",
                    incorrect_answers: ["The Chemical Brothers", "Fatboy Slim", "Orbital"]
                },
        ]}
    })
    it("should increase the score when the winCondition is met", () => {
        expect(quizStructure.score).toBe(1);
        quizLogic.increaseScore();
        expect(quizStructure.score).toBe(2);
    })
    it("should return 'true' if the answer matches the correct answer", () => {
        expect(quizLogic.increaseScoreCondition("The Prodigy", 0)).toBe(true);
    })
})
