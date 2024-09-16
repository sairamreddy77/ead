import React from "react";
import { Link,useNavigate } from "react-router-dom";

import { useState } from "react";

const API_KEY = '841a4ea9e517ff49c280b59287f5647b';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
      };

      const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        navigate(`/search?query=${searchQuery}`);  // Redirect to the search results page
      };


  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="nav">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favourites" className="nav-link">
                  Favourites
                </Link>
              </li>
              <li>
                <Link to="/watch-list" className="nav-link">
                  Watch List
                </Link>
              </li>
            </ul>
        </div>

        <form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleInputChange}  // Handle input change
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
