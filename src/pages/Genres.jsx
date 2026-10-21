import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GenreNav from "../components/GenreNav";
import MovieGrid from "../components/MovieGrid";

const genreSearchTerms = {
  Action: "Avengers",
  Comedy: "Home Alone",
  Horror: "Halloween",
  "Sci-Fi": "Star Wars",
  Animation: "Toy Story"
};

function Genres() {
  const [searchParams] = useSearchParams();
  const requestedGenre = searchParams.get("genre") || "All";

  const selectedGenre =
    Object.keys(genreSearchTerms).includes(requestedGenre)
      ? requestedGenre
      : "All";

  const searchTerm = genreSearchTerms[selectedGenre];

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGenreMovies() {
      setLoading(true);
      setError("");
      setMovies([]);

      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}` +
          `&s=${encodeURIComponent(searchTerm)}&type=movie`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch movies.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "No movies found.");
        }

        const movieDetails = await Promise.all(
          data.Search.map(async (movie) => {
            const detailsResponse = await fetch(
              `https://www.omdbapi.com/?apikey=${apiKey}` +
              `&i=${movie.imdbID}&plot=short`,
              { signal: controller.signal }
            );

            if (!detailsResponse.ok) {
              throw new Error("Unable to load movie details.");
            }

            return detailsResponse.json();
          })
        );

        const filteredMovies = movieDetails.filter(
          (movie) =>
            movie.Response === "True" &&
            movie.Genre &&
            movie.Genre
              .toLowerCase()
              .split(",")
              .map((genre) => genre.trim())
              .includes(selectedGenre.toLowerCase())
        );

        if (!controller.signal.aborted) {
          setMovies(filteredMovies);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Genre search error:", err);
          setError("Unable to load movies. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (selectedGenre !== "All") {
      fetchGenreMovies();
    } else {
      setMovies([]);
      setLoading(false);
      setError("");
    }

    return () => controller.abort();
  }, [selectedGenre, searchTerm]);

  return (
    <main className="genres__page">
      <section className="genres__hero">
        <div className="genres__hero__content">
          <p className="small__title">
            EXPLORE CINEVERSE
          </p>

          <h1>
            Explore Movies by <span>Genre.</span>
          </h1>

          <p className="genres__description">
            From action-packed adventures to unforgettable
            animated stories, discover movies that match
            your mood.
          </p>
        </div>
      </section>

      <section className="genres__content">
        <div className="genres__navigation">
          <h2>Choose Your Genre</h2>
          <GenreNav />
        </div>

        <div className="genres__results">
          <div className="genres__results__heading">
            <div>
              <p className="small__title">
                MOVIE COLLECTION
              </p>

              <h2>
                {selectedGenre === "All"
                  ? "Explore a Genre"
                  : `${selectedGenre} Movies`}
              </h2>
            </div>

            {!loading &&
              !error &&
              selectedGenre !== "All" && (
                <span className="genres__count">
                  {movies.length} Movies
                </span>
              )}
          </div>

          {selectedGenre === "All" ? (
            <div className="movie__status">
              <span className="status__icon" aria-hidden="true">
                🎬
              </span>
              <h3>Every great story starts somewhere</h3>
              <p>
                Choose a genre above to discover
                your next movie.
              </p>
            </div>
          ) : (
            <MovieGrid
              movies={movies}
              loading={loading}
              error={error}
              hasSearched={true}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default Genres;
