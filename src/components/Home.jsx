import SearchBar from './SearchBar';

function Home({ searchTerms, setSearchTerms, onSearch }) {
  return (
    <section id="home" className="title">
        <div className="title__content">
            <p className="small__title">WELCOME TO CINEVERSE</p>
            <h1>Find Your Next<br /><span>Favorite Movie</span></h1>
            <p className="title__text">Search movies, discover new favorites and explore the world of cinema.</p>
            <SearchBar searchTerms={searchTerms} setSearchTerms={setSearchTerms} onSearch={onSearch}
             />
        </div>
    </section>
  );
}

export default Home;