import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_KEY = '841a4ea9e517ff49c280b59287f5647b';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function SearchResults() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  console.log(location)

  // Extract the search query from the URL (from navbar page)   
  // this is the url- `/search?query=${searchQuery}`
  // '/search' is the 'pathname' and '?query=${searchQuery}' is the 'search'

  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Fetch search results when the component mounts or when the query changes
    const fetchMovies = async () => {
      if (!searchQuery) return;
      
      try {
        const response = await fetch(`${BASE_URL}?query=${searchQuery}&api_key=${API_KEY}`);
        const data = await response.json();
        setMovies(data.results.slice(0, 18));  // Show top results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="home-page" >
      <h2>Search results for "{searchQuery}"</h2>

      <div className="movie-list">

        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
          ))
        ) : (
          <p>No results found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
