// Home Page with Movie Grid, Search, Filter, Sort, and Booking Modal
// movies are fetched , filtered , dispalyed and booked



import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api"; // API fetches movie data from TMDB
import BookingModal from "../components/BookingModal";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filters, setFilters] = useState({
    query: "",
    genre: "",
    sort: "",
  });

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  // Filter and sort movies
  // Filters movie by SearchText
  let filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(filters.query.toLowerCase());
  // Filters movie by Genre
    const matchesGenre = filters.genre
      ? movie.genre_ids.includes(Number(filters.genre))
      : true;
      // movie is included if it matches both
    return matchesQuery && matchesGenre;
  });

  if (filters.sort === "high") {
    filteredMovies = [...filteredMovies].sort(
      (a, b) => b.vote_average - a.vote_average
    );
  } else if (filters.sort === "low") {
    filteredMovies = [...filteredMovies].sort(
      (a, b) => a.vote_average - b.vote_average
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {/* Search + Genre + Sort by Rating */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <SearchBar
          onSearch={(query) => setFilters({ ...filters, query })}
        />

        {/* Genre */}
        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-900 text-white shadow focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
          <option value="878">Sci-Fi</option>
        </select>

        {/* Sort by Rating */}
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-900 text-white shadow focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by Rating</option>
          <option value="high">High → Low</option>
          <option value="low">Low → High</option>
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="
              relative group bg-gray-900 rounded-2xl overflow-hidden shadow-lg 
              transform transition duration-500 ease-in-out 
              hover:scale-105 hover:shadow-2xl hover:-translate-y-1
            "
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="
                w-full h-72 object-cover rounded-2xl 
                group-hover:brightness-110 transition duration-500
              "
            />

            {/* Overlay */}
            <div
              className="
                absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 
                transition duration-500 flex flex-col justify-end p-4
              "
            >
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-yellow-400">⭐ {movie.vote_average}</p>
              <button
                onClick={() => setSelectedMovie(movie)}
                className="
                  mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                  py-2 rounded-lg shadow-md transition duration-300
                "
              >
                Book Now
              </button>
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
    </div>
  );
};

export default Home;
