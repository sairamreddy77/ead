// MovieCard.js
import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card" >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      <div >
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        {/* <p>{movie.overview.substring(0, 100)}...</p> */}
        <Link to={`/movie/${movie.id}`} className="btn btn-primary">
          View
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
