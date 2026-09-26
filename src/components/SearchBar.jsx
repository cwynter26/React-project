function SearchBar({ searchTerms, setSearchTerms, onSearch }) {

  function handleKeyDown(event) {
    if (event.key === "Enter") {
        onSearch();
    }
  }

    return (
        <div className="search__box">
            <input type="text"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for movies..."
            autoComplete="off"
        />
        <button onClick={onSearch}>Search</button>
        </div>
    );
}

export default SearchBar;