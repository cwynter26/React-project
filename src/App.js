import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import GenreNav from './components/GenreNav';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './pages/MovieDetails';
import Genres from "./pages/Genres";

import './App.css';

function App() {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    const search = searchTerms.trim();
    if (!search) {
      setError("Please enter a movie title.");
      setMovies([]);
      setHasSearched(true);
      navigate("/discover");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);
    navigate("/discover");

    try {
      const apiKey = process.env.REACT_APP_OMDB_API_KEY;
      const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}` + `&s=${encodeURIComponent(search)}` + `&type=movie`;
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "No movies found."
        );
        return;
      }

      const movieResults = await Promise.all(
        data.Search.map(async (movie) => {
          const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}` + `&i=${movie.imdbID}` + `&plot=short`;
          const detailsResponse = await fetch(detailsUrl);
          return detailsResponse.json();
        })
      );
      setMovies(movieResults);
    } catch (err) {
      console.error("Search error:", err);
      setMovies([]);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Routes>

        {/*Home */}
        <Route
          path="/" element={<Home
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            onSearch={handleSearch}
          />
        }
        />

        {/*Discover */}
        <Route
          path="/discover" element={
            <main>
              <section className="movie__section">
                <div className="section__heading">
                  <p className="small__title">DISCOVER</p>
                  <h2>Discover Movies</h2>
                </div>
                <MovieGrid
                  movies={movies}
                  loading={loading}
                  error={error}
                  hasSearched={hasSearched}
                />
              </section>
            </main>
          }
        />

        {/*Movie Details */}
        <Route
          path="/movie/:imdbID" element={<MovieDetails />}
        />

        {/*Genres */}
        <Route
          path="/genres" element={
              <Genres />
          }
        />
        {/*About */}
        <Route
          path="/about" element={
            <main>
              <section className="movie__section">
                <div className="section__heading">
                  <p className="small__title">ABOUT CINEVERSE</p>
                  <h2>Welcome to CineVerse</h2>
                  <p>Discover movies, explore different genres and find your next favorite film.</p>
                </div>
              </section>
            </main>
          }
        />
      </Routes>

      {/* Footer */}
      <footer>
        <div className="logo">
          Cine<span>Verse</span>
        </div>
        <p>Discover. Search. Watch. Repeat.</p>
      </footer>
    </>
  );
}

export default App;
