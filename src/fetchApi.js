export const api = {
    apiUrl: "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple&category=12",
    json: null,
    async fetchApi(url = this.apiUrl) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch data" + response.status);
            }
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
            alert("an error occured while fetching data. Please, try again later.");
            return null;
        }
    },
    async getData() {
        const localData = localStorage.getItem("apiData")
        if (localData) {
            this.json = JSON.parse(localData);
        } else {
            this.json = await this.fetchApi();
            this.saveDataInLocalStorage();
        }
        return this.json;
    },

    saveDataInLocalStorage() {
        if (this.json) {
            localStorage.setItem("apiData", JSON.stringify(this.json));
        }
    }
}