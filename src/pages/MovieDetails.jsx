import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MovieDetails() {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovieDetails() {
        try {
            const apiKey = process.env.REACT_APP_OMDB_API_KEY;
            const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}` + `&i=${imdbID}` + `&plot=full`;
            const response = await fetch(detailsUrl);
            const data = await response.json();
            if (data.Response === "False") {
                setError(data.Error || "Movie not found."

            );    return;
            }
            setMovie(data);
        } catch (err) {
            console.error("Movie details error:", err);
            setError("Something went wrong loading the movie."                
            );
        } finally {
            setLoading(false);
        }
    }
    getMovieDetails();
    }, [imdbID]);
    if (loading) {
        return (
            <main>
                <section className="movie__section">
                    <p className="no__results">{error}</p>
                    <button onClick={() => navigate("/discover")}>Back to Discover</button>
                </section>
            </main>
        );
    }
    const hasPoster = movie.Poster && movie.Poster !== "N/A";
    return (
        <main className="movie__details__page"
        style={{"--movie-backdrop": hasPoster ? `url(
            "${movie.Poster}")` : "none"}}>
                <div className="movie__page__backdrop">
                </div>
            <button className="back__button" onClick={() => navigate("/discover")}>
               ← Back to Discover
            </button>
            <section className="movie__details__content">
                <div className="movie__details__poster">
                    {hasPoster ? (
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    ) : (
                        <div className="no__poster">
                            <span>🎬</span>
                            <p>No Poster Available</p>
                        </div>
                    )}
                </div>
                <div className="movie__details__info">
                    <p className="small__title">MOVIE DETAILS</p>
                    <h2>{movie.Title}</h2>
                    <div className="movie__meta">
                        <span>⭐ {movie.imdbRating || "N/A"}</span>
                        <span>{movie.Year || "N/A"}</span>
                        <span>{movie.Runtime || "N/A"}</span>
                        <span>{movie.Rated || "N/A"}</span>
                    </div>
                    <div className="movie__tags">
                        <span>{movie.Genre || "Unknown Genre"}</span>
                    </div>
                    <p className="detail__plot">{movie.Plot || "No description available."}</p>
                    <div className="extra__details">
                        <p><strong>Director:</strong>{" "} {movie.Director || "Unknown"}</p>
                        <p><strong>Actors:</strong>{" "} {movie.Actors || "Unknown"}</p>
                        <p><strong>Released:</strong>{" "} {movie.Released || "Unknown"}</p>
                    </div>
                    <button className="trailer__button" onClick={() => {
                        const trailerSearch = encodeURIComponent(
                            `${movie.Title} ${movie.Year} official trailer`
                        );
                        window.open(`https://www.youtube.com/results?search_query=${trailerSearch}`, "_blank", "noopener,noreferrer");
                    }}>► Watch Trailer</button>
                </div>
            </section>
        </main>
    );
}

export default MovieDetails;