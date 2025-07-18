import PropTypes from 'prop-types';

const MovieCard = ({ poster, title, year, genres, actors, director, rating, website }) => {
    return (
        <div className='mt-5'>
            <div className="card h-100" style={{ width: '300px', height: '400px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className="badge rounded-pill bg-primary">{rating ? `⭐ ${rating.toFixed(2)}` : 'NR'}</span>
                </div>
                <img
                    src={poster || ""}
                    className="card-img-top"
                    alt="Movie Poster"
                    style={{ height: '310px', objectFit: 'cover' }}
                />

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title} ({year})</h5>
                    <p className="card-text mb-1"><strong>Genres:</strong> {genres?.join(', ') || 'N/A'}</p>
                    <p className="card-text mb-1"><strong>Actors:</strong> {actors || 'Unknown'}</p>
                    <p className="card-text mb-1"><strong>Director:</strong> {director || 'Unknown'}</p>
                    <a href={website} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark mt-auto">View Details</a>
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    genres: PropTypes.array,
    year: PropTypes.number,
    director: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default MovieCard;