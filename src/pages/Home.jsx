 // Home Page with Movie Grid, Search, Filter, Sort, and Booking Modal
 // movies are fetched , filtered , dispalyed and booked

import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import BookingModal from "../components/BookingModal";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const MOVIES_PER_PAGE = 20;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filters, setFilters] = useState({
    query: "",
    genre: "",
    language: "",
    rating: "",
  });
  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Fetch movies
  useEffect(() => {
    const fetchAllMovies = async () => {
      let allMovies = [];
      const totalPages = 5; 
      for (let p = 1; p <= totalPages; p++) {
        const data = await fetchMovies(p);
        allMovies = [...allMovies, ...data];
      }
      setMovies(allMovies);
    };
    fetchAllMovies();
  }, []);

  // Fetch genres and languages
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const genreRes = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          { params: { api_key: API_KEY, language: "en-US" } }
        );
        setGenres(genreRes.data.genres);

        const langRes = await axios.get(
          `https://api.themoviedb.org/3/configuration/languages`,
          { params: { api_key: API_KEY } }
        );
        setLanguages(langRes.data);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, [API_KEY]);

  // Filter movies whenever filters or movies change
  useEffect(() => {
    const result = movies.filter((movie) => {
      const matchesQuery = movie.title
        .toLowerCase()
        .includes(filters.query.toLowerCase());

      const matchesGenre = filters.genre
        ? movie.genre_ids.includes(parseInt(filters.genre))
        : true;

      const matchesLanguage = filters.language
        ? movie.original_language === filters.language
        : true;

      const matchesRating = filters.rating
        ? movie.vote_average >= Number(filters.rating)
        : true;

      return matchesQuery && matchesGenre && matchesLanguage && matchesRating;
    });

    setFilteredMovies(result);
    setPage(1); // reset page when filters change
  }, [filters, movies]);

  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const currentMovies = filteredMovies.slice(
    (page - 1) * MOVIES_PER_PAGE,
    page * MOVIES_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 w-full">
        {/* Search */}
        <div className="flex-1 w-full">
          <SearchBar
            onSearch={(query) =>
              setFilters((prev) => ({ ...prev, query }))
            }
          />
        </div>

        {/* Genre */}
        <select
          value={filters.genre}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, genre: e.target.value }))
          }
          className="px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white w-full sm:w-auto"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Language */}
        <select
          value={filters.language}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, language: e.target.value }))
          }
          className="px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white w-full sm:w-auto"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l.iso_639_1} value={l.iso_639_1}>
              {l.english_name}
            </option>
          ))}
        </select>

        {/* Rating */}
        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, rating: e.target.value }))
          }
          className="px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white w-full sm:w-auto"
        >
          <option value="">All Ratings</option>
          <option value="8">⭐ 8 & above</option>
          <option value="7">⭐ 7 & above</option>
          <option value="6">⭐ 6 & above</option>
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative group bg-gray-900 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-2xl group-hover:brightness-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-4">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-yellow-400">⭐ {movie.vote_average}</p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setSelectedMovie(movie)}
                  className="flex-1 bg-blue-600 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl shadow-lg transform transition hover:scale-105"
                >
                  Book Now
                </button>
                <a
                  href={`/movie/${movie.id}`}
                  className="flex-1 bg-gray-700 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl shadow-lg text-center transform transition hover:scale-105"
                >
                  Info
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMovie && (
        <BookingModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 rounded bg-gray-700 hover:bg-purple-600 disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="px-3">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 rounded bg-gray-700 hover:bg-purple-600 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Home;
