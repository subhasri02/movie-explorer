
import axios from "axios";

const API_KEY = "REACT_APP_TMDB_API_KEY"; // replace with TMDb key
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: "en-US" },
});

export default tmdb;
//YOUR_TMDB_API_KEY 

