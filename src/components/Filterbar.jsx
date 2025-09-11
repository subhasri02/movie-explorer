

import { useEffect, useState } from "react";

const FilterBar = ({ filters, setFilters }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch genres from TMDb
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="flex gap-4 p-4 bg-gray-100">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 flex-1"
        value={filters.query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
      />

      <select
        value={filters.genre}
        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        className="border p-2"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        value={filters.rating}
        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        className="border p-2"
      >
        <option value="">All Ratings</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
      </select>
    </div>
  );
};

export default FilterBar;

