// Fetching movies from TMDB API

import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (pages = 5) => {
  try {
    if (!API_KEY) throw new Error("TMDB API key missing!");

    let allMovies = []; // store movies from tmdb

    for (let page = 1; page <= pages; page++) {
      const res = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      allMovies = [...allMovies, ...res.data.results];
    }

    return allMovies;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return [];
  }
};

