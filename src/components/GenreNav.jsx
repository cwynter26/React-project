import { useNavigate, useSearchParams } from "react-router-dom";

function GenreNav() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const genres = [
        "All",
        "Action",
        "Comedy",
        "Horror",
        "Sci-Fi",
        "Animation",
    ];

    const selectedGenre = searchParams.get("genre") || "All";

    function handleGenreClick(genre) {
        if (genre === "All") {
            navigate("/genres");
        } else {
            navigate(`/genres?genre=${encodeURIComponent(genre)}`);
        }
    }

    return (
        <section id="genres" className="genre__section">
            <div className="genres">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        type="button"
                        className={
                            selectedGenre === genre ? "active" : ""
                        }
                        aria-pressed={selectedGenre === genre}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default GenreNav;
