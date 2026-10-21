import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const [posterError, setPosterError] = useState(false);

  const hasPoster =
    movie.Poster &&
    movie.Poster !== "N/A" &&
    !posterError;

  const rating =
    movie.imdbRating && movie.imdbRating !== "N/A"
      ? movie.imdbRating
      : null;

  const genre =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre.split(",")[0]
      : "Movie";

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="movie__card"
      aria-label={`View details for ${movie.Title}`}
    >
      <div className="poster">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} movie poster`}
            loading="lazy"
            onError={() => setPosterError(true)}
          />
        ) : (
          <div className="no__poster">
            <span aria-hidden="true">🎬</span>
            <p>No Poster Available</p>
          </div>
        )}

        <div className="poster__overlay">
          <span className="play__button" aria-hidden="true">
            ▶
          </span>
          <span className="poster__action">
            View Details
          </span>
        </div>

        {rating && (
          <span className="poster__rating">
            <span aria-hidden="true">★</span> {rating}
          </span>
        )}
      </div>

      <div className="movie__info">
        <h3 title={movie.Title}>{movie.Title}</h3>

        <div className="movie__info__meta">
          <span>{movie.Year || "Unknown Year"}</span>
          <span className="meta__dot">•</span>
          <span>{genre}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
