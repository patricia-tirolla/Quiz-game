export const api = {
    apiUrl: "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple&category=12",
    json: null,
    fetchApi: async function(url = this.apiUrl) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch data" + response.status);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    getData: async function() {
        const localData = localStorage.getItem("apiData")
        if (localData) {
            this.json = JSON.parse(localData);
        } else {
            this.json = await this.fetchApi();
            this.saveDataInLocalStorage();
        }
        return this.json;
    },

    saveDataInLocalStorage: function() {
        if (this.json) {
            localStorage.setItem("apiData", JSON.stringify(this.json));
        }
    }
}