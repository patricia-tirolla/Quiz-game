
import { quizLogic, quizStructure } from "../src/quizLogic.js";
import { api } from "../src/fetchApi.js"
describe("Quiz Logic", () => {
    // beforeEach(async function() {
    //     await api.getData();
    // })
    it("should increase the score when the winCondition is met", () => {
        expect(quizStructure.score).toBe(0);
        quizLogic.increaseScore();
        expect(quizStructure.score).toBe(1);
    })
    // it("should return 'true' if the answer matches the correct answer", () => {
    //     expect(quizLogic.winCondition("The Prodigy", 1)).toBe(true);
    // })
})