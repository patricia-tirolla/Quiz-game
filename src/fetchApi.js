export const api = {
  apiUrl:
    "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple&category=12",
  json: null,
  async fetchApi(url = this.apiUrl) {
    try {
      const response = await fetch(url);
      // can be consolidated into one line
      if (!response.ok)
        throw new Error("Unable to fetch data" + response.status);
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      // try and stay away from alerts for user experience, and display a message on the page instead
      alert("an error occured while fetching data. Please, try again later.");
      return null;
    }
  },
  async getData() {
    // this can be one line
    return await this.fetchApi();
  },
};
