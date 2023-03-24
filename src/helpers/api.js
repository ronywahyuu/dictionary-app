import axios from "axios";

class searchAPI {
  static async search(searchTerm) {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
    return res;
  }
}

export default searchAPI;