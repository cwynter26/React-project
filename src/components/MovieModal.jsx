function MovieModal({ movie, onClose }) {

    if (!movie) {
        return null;
    }

    const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "";

    return (
        <div className="modal__show" onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className="movie__modal">
                <button className="close__button" onClick={onClose}
                aria-label="Close movie details">
                    X
                </button>

                <div className="movie__backdrop"
                    style={{ backgroundImage: poster ? `url(${poster})` : "none" }}>
                </div>
                <div className="movie__details">
                    <div className="detail__poster">
                        {poster ? (
                            <img src={poster} alt={`${movie.Title} poster`}
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                                event.currentTarget.nextElementSibling.style.display = "flex";
                            }}
                             />
                        ) : null} 
                            <div className="no__poster" style={{
                                display: poster ? "none" : "flex",
                            }}>
                                <span>🎬</span>
                                <p>No Poster Available</p>
                            </div>
                        
                    </div>
                    <div className="detail__content">
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
                        <div className="detail__buttons">
                            <button className="trailer__button">▶ Watch Trailer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;    