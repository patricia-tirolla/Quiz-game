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
        if (this.json === null) {
            this.json = await this.fetchApi();
        }
        return this.json;
    }
}