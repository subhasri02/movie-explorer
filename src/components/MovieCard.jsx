

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookingModal from "./BookingModal"; // import modal

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false); // modal state

  const fetchTrailer = async () => {
    try {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {movie.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          ⭐ {movie.vote_average}
        </p>

        {/* Book Now button */}
        <button
          onClick={() => setIsBookingOpen(true)}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Book Now
        </button>

        {/* Trailer toggle */}
        <button
          onClick={() => {
            fetchTrailer();
            setShowTrailer(!showTrailer);
          }}
          className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          {showTrailer ? "Hide Trailer" : "Watch Trailer"}
        </button>

        {showTrailer && trailerUrl && (
          <iframe
            width="100%"
            height="200"
            src={trailerUrl}
            title="Trailer"
            className="mt-2 rounded-lg"
            allowFullScreen
          />
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        movie={movie}
      />
    </div>
  );
};

export default MovieCard;
