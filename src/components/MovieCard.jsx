import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
    const navigate = useNavigate();
    const hasPoster = movie.Poster && movie.Poster !== "N/A";
    const rating = movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A";

    function handleClick() {
        navigate(`/movie/${movie.imdbID}`);
    }

    return (
        <div className="movie__card" onClick={handleClick}>
        
        <div className="poster">
            {hasPoster ? (
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                />
            ) : null} <div className="no__poster" style={{
                display: hasPoster ? "none" : "flex",
            }}><span>🎬</span>
            <p>No Poster Available</p>
            </div>
        <div className="play__button">
            ▶</div>
        </div>
        <div className="movie__info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}
                {"·"} 
                {movie.Genre || "Unknown Genre"}
            </p>
            <span className="rating">⭐ {rating}</span>
        </div>
        </div>
    );
}

export default MovieCard;