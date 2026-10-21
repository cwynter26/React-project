import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetails() {
  const { imdbID } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovieDetails() {
      setLoading(true);
      setError("");
      setMovie(null);
      setPosterError(false);

      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;

        const detailsUrl =
          `https://www.omdbapi.com/?apikey=${apiKey}` +
          `&i=${encodeURIComponent(imdbID)}&plot=full`;

        const response = await fetch(detailsUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Unable to fetch movie details.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          setError(data.Error || "Movie not found.");
          return;
        }

        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Movie details error:", err);
          setError("Something went wrong loading the movie.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getMovieDetails();

    return () => controller.abort();
  }, [imdbID]);

  function handleTrailer() {
    if (!movie) return;

    const trailerSearch = encodeURIComponent(
      `${movie.Title} ${movie.Year} official trailer`
    );

    window.open(
      `https://www.youtube.com/results?search_query=${trailerSearch}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (loading) {
    return (
      <main className="details__status" role="status">
        <div className="loading__spinner"></div>
        <h2>Loading movie details...</h2>
        <p>Preparing your cinematic experience.</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="details__status" role="alert">
        <h2>Unable to load movie</h2>
        <p>{error || "Movie details are unavailable."}</p>

        <button
          className="back__button"
          onClick={() => navigate("/discover")}
        >
          ← Back to Discover
        </button>
      </main>
    );
  }

  if (loading) {
  return (
    <main className="movie__section">
      <p className="loading">Loading movie details...</p>
    </main>
  );
}

if (error || !movie) {
  return (
    <main className="movie__section">
      <p className="no__results">
        {error || "Movie not found."}
      </p>

      <button
        className="back__button"
        onClick={() => navigate("/discover")}
      >
        ← Back to Discover
      </button>
    </main>
  );
}

  const hasPoster =
    movie.Poster &&
    movie.Poster !== "N/A" &&
    !posterError;

  const genres =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre.split(",").map(genre => genre.trim())
      : [];

  const displayValue = (value) =>
    value && value !== "N/A" ? value : "Unknown";

  return (
    <main
      className="movie__details__page"
      style={{
        "--movie-backdrop": hasPoster
          ? `url("${movie.Poster}")`
          : "none"
      }}
    >
      <div
        className="movie__page__backdrop"
        aria-hidden="true"
      ></div>

      <div className="details__container">
        <button
          className="back__button"
          onClick={() => navigate("/discover")}
        >
          ← Back to Discover
        </button>

        <section className="movie__details__content">
          <div className="movie__details__poster">
            {hasPoster ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} movie poster`}
                onError={() => setPosterError(true)}
              />
            ) : (
              <div className="no__poster">
                <span aria-hidden="true">🎬</span>
                <p>No Poster Available</p>
              </div>
            )}
          </div>

          <div className="movie__details__info">
            <p className="small__title">
              NOW EXPLORING
            </p>

            <h1>{movie.Title}</h1>

            <div className="movie__meta">
              <span className="details__rating">
                ★ {displayValue(movie.imdbRating)}
              </span>

              <span>{displayValue(movie.Year)}</span>
              <span>{displayValue(movie.Runtime)}</span>
              <span>{displayValue(movie.Rated)}</span>
            </div>

            <div className="movie__tags">
              {genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>

            <div className="details__story">
              <h2>The Story</h2>
              <p className="detail__plot">
                {displayValue(movie.Plot)}
              </p>
            </div>

            <div className="extra__details">
              <div>
                <span>Director</span>
                <p>{displayValue(movie.Director)}</p>
              </div>

              <div>
                <span>Cast</span>
                <p>{displayValue(movie.Actors)}</p>
              </div>

              <div>
                <span>Release Date</span>
                <p>{displayValue(movie.Released)}</p>
              </div>
            </div>

            <div className="details__actions">
              <button
                className="trailer__button"
                onClick={handleTrailer}
              >
                ▶ Watch Trailer
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MovieDetails;