
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          { params: { api_key: apiKey, language: "en-US", append_to_response: "videos,credits" } }
        );
        setMovie(res.data);

        const trailer = res.data.videos?.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie)
    return <p className="text-white text-center mt-10 text-lg">Loading...</p>;

  const topCast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg border border-purple-600/40 overflow-y-auto max-h-[95vh]">
        
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-3 text-3xl font-bold text-gray-400 hover:text-purple-500 transition"
        >
          &times;
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-5 p-5">
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg border border-purple-600/30 shadow-md"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3 flex flex-col">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>

            <div className="flex gap-2 mt-2 flex-wrap">
              {movie.release_date && (
                <span className="px-2 py-0.5 rounded bg-purple-600/30 text-purple-300 text-xs">
                  {movie.release_date}
                </span>
              )}
              {movie.vote_average && (
                <span className="px-2 py-0.5 rounded bg-yellow-600/30 text-yellow-400 text-xs">
                  ⭐ {movie.vote_average.toFixed(1)} / 10
                </span>
              )}
              {movie.runtime && (
                <span className="px-2 py-0.5 rounded bg-green-600/30 text-green-400 text-xs">
                  ⏱ {movie.runtime} mins
                </span>
              )}
            </div>

            {movie.overview && (
              <>
                <h2 className="text-lg font-semibold text-purple-400 mt-4">Overview</h2>
                <p className="text-gray-300 text-sm leading-relaxed">{movie.overview}</p>
              </>
            )}

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300 border border-purple-500/20"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trailer */}
        {trailerUrl && (
          <div className="px-5 pb-5">
            <h2 className="text-lg font-semibold text-purple-400 mb-2">Trailer</h2>
            <div className="w-full rounded-md overflow-hidden border border-purple-600/40 shadow-md">
              <iframe
                src={trailerUrl}
                title="Movie Trailer"
                allowFullScreen
                className="w-full h-64 md:h-96"
              ></iframe>
            </div>
          </div>
        )}

        {/* Top Cast */}
        {topCast.length > 0 && (
          <div className="px-5 pb-5">
            <h2 className="text-lg font-semibold text-purple-400 mb-2">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {topCast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded-md w-full mb-2"
                  />
                  <p className="text-sm font-semibold text-white">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
