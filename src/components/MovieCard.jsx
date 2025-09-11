
/*

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onBook }) => (
  <div
    className="relative group bg-gray-900 bg-opacity-50 rounded-2xl 
               shadow-lg overflow-hidden border border-gray-700 
               hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/50
               transition-transform duration-300 transform hover:scale-105
               cursor-pointer backdrop-blur-md"
  >
    {/* Poster }
    <img
      src={`${IMG_BASE_URL}${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-80 object-cover transition duration-300 group-hover:scale-105"
    />

    {/* Overlay }
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
      <h3 className="text-lg font-bold">{movie.title}</h3>
      <p className="text-sm text-gray-300">⭐ {movie.vote_average.toFixed(1)}</p>
      <button
        onClick={() => onBook(movie)}
        className="mt-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-500 hover:to-purple-500 transition"
      >
        Book Now
      </button>
    </div>
  </div>
);

export default MovieCard;
*/

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onBook }) => (
  <div
    className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden 
               border border-gray-200 dark:border-gray-700 
               hover:shadow-xl hover:scale-105 transition transform duration-300"
  >
    {/* Poster */}
    <img
      src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : "/fallback.png"}
      alt={movie.title}
      className="w-full h-72 object-cover"
    />

    {/* Details */}
    <div className="p-4 flex flex-col justify-between h-40">
      <div>
        <h3 className="text-lg font-bold truncate">{movie.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
        </p>
      </div>

      <button
        onClick={() => onBook(movie)}
        className="mt-3 w-full bg-gradient-to-r from-purple-600 to-blue-500 
                   text-white font-semibold py-2 rounded-lg shadow 
                   hover:from-blue-500 hover:to-purple-600 transition"
      >
        🎟️ Book Now
      </button>
    </div>
  </div>
);

export default MovieCard;
