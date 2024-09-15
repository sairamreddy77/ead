import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import './SeachResults.css';


const API_KEY = '841a4ea9e517ff49c280b59287f5647b';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function SearchResults() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  // Extract the search query from the URL
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
            <div key={movie.id}>
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div >
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                  {/* <p className="card-text">{movie.overview.substring(0, 100)}...</p> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
