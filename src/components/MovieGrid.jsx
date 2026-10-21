import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  loading,
  error,
  hasSearched
}) {
  if (loading) {
    return (
      <div className="movie__status" role="status">
        <div className="loading__spinner"></div>
        <h3>Searching the cinematic universe...</h3>
        <p>Finding movies for you.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie__status" role="alert">
        <span className="status__icon" aria-hidden="true">
          !
        </span>
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="movie__status">
        <span className="status__icon" aria-hidden="true">
          ⌕
        </span>
        <h3>Your next favorite movie awaits</h3>
        <p>
          Search for a movie on the homepage
          to begin exploring.
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="movie__status">
        <span className="status__icon" aria-hidden="true">
          🎬
        </span>
        <h3>No movies found</h3>
        <p>Try searching for a different movie title.</p>
      </div>
    );
  }

  return (
    <div className="movie__grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </div>
  );
}

export default MovieGrid;