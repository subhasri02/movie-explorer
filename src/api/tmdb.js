
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, language: "en-US", page },
    });
    return { movies: res.data.results, totalPages: res.data.total_pages };
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    return { movies: [], totalPages: 0 };
  }
};

