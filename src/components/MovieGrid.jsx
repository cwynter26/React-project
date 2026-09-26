import MovieCard from './MovieCard';

function MovieGrid({ 
     movies,
     loading,
     error,
     hasSearched 
    }) {
    
        if (loading) {
        return (
            <div className="movie__grid">
                <p className="loading">Searching for movies...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="movie__grid">
                <p className="no__results">{error}</p>
            </div>
        );
    }

    if (!hasSearched) {
        return (
            <div className="movie__grid">
                <p className="no__results">Search for a movie to get started.</p>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="movie__grid">
                <p className="no__results">No movies found.</p>
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