import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import Spinner from './Spinner';

const Movies = ({ setProgress, searchQuery = "" }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMovies = async () => {
        setProgress(10);
        setLoading(true);

        let url = `https://www.freetestapi.com/api/v1/movies?search=${searchQuery}`;

        const response = await fetch(url);
        setProgress(30);

        const data = await response.json();
        setProgress(70);

        setMovies(data);
        setLoading(false);
        setProgress(100);
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [searchQuery]);

    return (
        <>
            <h1 className="text-center" style={{ marginTop: '90px' }}>
                🎬 MovieZone - Browse Trending Movies
            </h1>

            {loading && <Spinner />}

            <div className="container">
                <div className="row justify-content-center">
                    {
                        movies && movies.length > 0
                            ?
                            (
                                movies.map(movie => (
                                    <div className="col-md-3 mb-4 d-flex" key={movie.id}>
                                        <MovieCard
                                            poster={movie.poster}
                                            rating={movie.rating}
                                            title={movie.title}
                                            year={movie.year}
                                            genres={movie.genre}
                                            plot={movie.plot}
                                            actors={movie.actors}
                                            director={movie.director}
                                            website={movie.website}
                                        />
                                    </div>
                                ))
                            ) :
                            (
                                <div className="text-center mt-5">
                                    <h5>No movies found for this search.</h5>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    );
};



Movies.propTypes = {
    setProgress: PropTypes.func,
    searchQuery: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number
};

export default Movies;