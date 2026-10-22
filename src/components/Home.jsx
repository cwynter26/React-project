import SearchBar from './SearchBar';

function Home({ searchTerms, setSearchTerms, onSearch }) {
  return (
    <>
    <main className="home__page">
      <section id="home" className="title">
        <div className="title__content">
          <div className="home__badge">
            <span className="home__badge__dot"></span>
            YOUR CINEMATIC JOURNEY STARTS HERE
          </div>

          <p className="small__title">WELCOME TO CINEVERSE</p>

          <h1>
            Discover Your Next
            <br />
            <span>Favorite Movie.</span>
          </h1>

          <p className="title__text">
            From unforgettable classics to hidden gems,
            explore the world of cinema and discover
            something worth watching.
          </p>

          <SearchBar
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            onSearch={onSearch}
          />

          <div className="home__features">
            <span>✦ Discover Movies</span>
            <span>✦ Explore Genres</span>
            <span>✦ Watch Trailers</span>
          </div>
        </div>

        <div className="home__visual" aria-hidden="true">
          <div className="home__glow"></div>
          <div className="home__film">
            <span className="film__icon">▶</span>
            <span className="film__label">CINEVERSE</span>
            <span className="film__caption">
              A WORLD OF STORIES
            </span>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

export default Home;