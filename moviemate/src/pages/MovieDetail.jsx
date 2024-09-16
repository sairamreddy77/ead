// MovieDetail.js
import React, { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = '841a4ea9e517ff49c280b59287f5647b';

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the route
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast , setCast]=useState(null)

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

    const fetchMovieTrailer = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
          const data = await response.json();
        //   console.log(data)
          
          // Filter to get YouTube trailers
          const youtubeTrailer = data.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer");
          
          // Set the trailer state with the YouTube key
          if (youtubeTrailer) {
            setTrailer(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
          }
        } catch (error) {
          console.error("Error fetching movie trailers:", error);
        }
      };

      const fetchMovieCast = async () => {
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
            const data = await response.json();
            // setCast(data.cast.slice(0, 5));  // Get top 5 cast members
            // console.log(data.cast)
            // for (let i = 0; i < 5; i++) {
            //     console.log(data.cast[i].name);
            //   }

            const actorNames = data.cast.slice(0, 5).map(actor => actor.name)
            setCast(actorNames)
        }catch (error){
            console.error("Error fetching movie trailers:", error)
        }
        
      };
  
      fetchMovieDetails();
      fetchMovieTrailer();
      fetchMovieCast();
    }, [id]);

    if (!movie) return <div>Loading...</div>;  
    if (!movie) return <div>Loading...</div>;

    return (

        <div className="movie-detail">
      {/* Trailer Section */}
      {trailer && (
        <div className="trailer-container">
          <iframe
            className="trailer-video"
            width="100%"
            height="500px"
            src={trailer}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Movie Information Section */}
      <div className="movie-info">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details">
          <h2>{movie.title}</h2>
          <p><strong>IMDB Rating:</strong> {movie.vote_average}</p>
          <p><strong>Released:</strong> {movie.release_date}</p>
          <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Duration:</strong> {movie.runtime} min</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Cast:</strong> {
              cast ? cast.map((actor, index) => <span key={index}> <br/>{actor} </span>) : 'No cast available'
              
          }</p>

        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
