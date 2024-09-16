import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './HomePage.css'; 
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = '841a4ea9e517ff49c280b59287f5647b';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching the latest movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="homepage">
      <h1>Latest Movies</h1>

      <div className="movie-list">

        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
