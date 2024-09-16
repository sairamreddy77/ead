// MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = '841a4ea9e517ff49c280b59287f5647b';

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the route
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={180}
        height={320}
        
      />
      <div>
        <h2>{movie.title}</h2>
        <br />
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
      
    </div>
  );
}

export default MovieDetail;
