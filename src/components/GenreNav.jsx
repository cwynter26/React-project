import { useNavigate } from "react-router-dom";

function GenreNav() {
    const navigate = useNavigate();

    const genres = [
        "All",
        "Action",
        "Comedy",
        "Horror",
        "Sci-Fi",
        "Animation",
    ];

    function handleGenreClick(genre) {
        if (genre === "All") {
            navigate("/discover");
        } else {
            navigate(`/genres?genre=${encodeURIComponent(genre)}`);
        }
    }

    return (
        <section
            id="genres" className="genre__section">
                <h2>
                    Explore Genres
                </h2>
                <div className="genres">
                    {genres.map((genre) => (
                        <button key={genre} onClick={() => handleGenreClick(genre)}>
                            {genre}
                        </button>
                    ))}
                </div>
        </section>
    )
}

export default GenreNav;