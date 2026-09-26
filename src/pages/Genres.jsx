import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GenreNav from "../components/GenreNav";
import MovieGrid from "../components/MovieGrid";

function Genres() {
    const [searchParams] = useSearchParams();
    const selectedGenre = searchParams.get("genre") || "All";
    const genreSearchTerms = {
        Action: "Avengers",
        Comedy: "Home Alone",
        Horror: "Halloween",
        "Sci-Fi": "Star Wars",
        Animation: "Toy Story"
    };
    const searchTerm = genreSearchTerms[selectedGenre];
    const [movies, setMovies] = useState ([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchGenreMovies() {
            setLoading(true);
            setError("");
            setMovies([]);

            try {
                const apiKey = process.env.REACT_APP_OMDB_API_KEY;
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}&type=movie`);
                    const data = await response.json();
                    if (data.Response === "False") {
                        throw new Error(data.Error);
                    }
                    const movieDetails = await Promise.all(
                        data.Search.map(async (movie) =>{
                            const detailsResponse = await fetch(
                                `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`);

                                return detailsResponse.json();
                        })
                    );
                    const filteredMovies = movieDetails.filter((movie) => 
                    movie.Response === "True" && movie.Genre && movie.Genre.toLowerCase().includes(
                        selectedGenre.toLowerCase()
                    ));
                    setMovies(filteredMovies);
                } catch (err) {
                    setError("Unable to load movies. Please try again.");
                    console.error("Genre search error", err);
                } finally {
                    setLoading(false);
                }
            }
            if (selectedGenre !== "All") {
                fetchGenreMovies();
            } else {
                setMovies([]);
            }
        }, [selectedGenre, searchTerm]);

    return (
        <main className="genres__page">
            <h1>{selectedGenre} Movies</h1>

            <GenreNav />
            {loading && <p>Loading movies...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && movies.length > 0 && (
                <MovieGrid movies={movies}
                hasSearched={true} />
            )}
            {!loading && !error && movies.length === 0 && (
                <p>No movies found for this genre yet.</p>
            )}
        </main>
    )
}

export default Genres;