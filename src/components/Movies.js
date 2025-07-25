import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import Spinner from './Spinner';

const Movies = ({ setProgress, searchQuery = "" }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        setProgress(10);
        setLoading(true);
        setError(null);

        try {
            // The original API is not working, using TMDB API as an alternative
            // You'll need to sign up for an API key at https://www.themoviedb.org/
            // Replace YOUR_API_KEY with your actual API key
            const apiKey = process.env.REACT_APP_TMDB_API_KEY;
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery || "popular"}`;
            
            // If no search query, show popular movies instead
            if (!searchQuery) {
                url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
            }

            const response = await fetch(url);
            setProgress(30);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            setProgress(70);

            // Transform the data to match your existing movie card structure
            const transformedData = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                year: new Date(movie.release_date).getFullYear(),
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                rating: movie.vote_average,
                genre: movie.genre_ids, // Note: You'll need to map these IDs to genre names
                plot: movie.overview,
                actors: "Various", // TMDB doesn't include this in basic results
                director: "Various", // TMDB doesn't include this in basic results
                website: `https://www.themoviedb.org/movie/${movie.id}`
            }));

            setMovies(transformedData);
            setLoading(false);
            setProgress(100);
        } catch (err) {
            console.error("Error fetching movies:", err);
            setError("Failed to load movies. Please try again later.");
            setLoading(false);
            setProgress(100);
        }
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
            
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

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