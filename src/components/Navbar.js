import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onSearch }) {
    let location = useLocation();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.searchQuery.value;
        onSearch(searchQuery);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={() => onSearch("")}>🎬 MovieZone</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={() => onSearch("")}>Home</Link>
                        </li>
                    </ul>

                    <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            name="searchQuery"
                            placeholder="Search Movies"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};