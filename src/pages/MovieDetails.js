// pages/MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import tmdbService from '../services/tmdbService';
import Button from '../components/common/Button';
import { FiArrowLeft, FiPlay, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import './MovieDetails.css';
import { useTranslation } from 'react-i18next';

/**
 * Movie Details page component
 */
export const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { t } = useTranslation();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const [movieData, creditsData, videosData, similarData] = await Promise.all([
        tmdbService.getMovieDetails(movieId),
        tmdbService.getMovieCredits(movieId),
        tmdbService.getMovieVideos(movieId),
        tmdbService.getSimilarMovies(movieId),
      ]);

      setMovie(movieData);
      setCredits(creditsData);
      setVideos(videosData);
      setSimilar(similarData);

      // Find trailer video
      const trailer = videosData.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    } catch (err) {
      setError('Failed to load movie details');
      console.error('Error loading movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite(parseInt(movieId))) {
      removeFavorite(parseInt(movieId));
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="movie-details">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (!movie || error) {
    return (
      <div className="movie-details">
        <div className="error-container">
          <h2>{error || 'Movie not found'}</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(parseInt(movieId));
  const backdropUrl = movie.backdrop_path ? tmdbService.getImageUrl(movie.backdrop_path, 'w1280') : null;
  const posterUrl = movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null;
  const cast = credits?.cast?.slice(0, 8) || [];
  const director = credits?.crew?.find((p) => p.job === 'Director');
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

  return (
    <div className="movie-details">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      {/* Backdrop */}
      {backdropUrl && (
        <div
          className="movie-backdrop"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${backdropUrl})`,
          }}
        />
      )}

      {/* Content */}
      <div className="movie-content">
        <div className="movie-card-container">
          {posterUrl && (
            <div className="movie-poster">
              <img src={posterUrl} alt={movie.title} />
            </div>
          )}

          <div className="movie-info">
            <h1 className="movie-title">
              {movie.title}
              {movie.release_date && (
                <span className="movie-year">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </h1>

            <div className="movie-meta">
              {movie.vote_average && (
                <span className="meta-item">
                  <span className="label">{t('movie.rating')}:</span>
                  <strong className="rating">⭐ {movie.vote_average.toFixed(1)}/10</strong>
                </span>
              )}
              {movie.release_date && (
                <span className="meta-item">
                  <span className="label">{t('movie.released')}:</span>
                  <strong>{new Date(movie.release_date).toLocaleDateString()}</strong>
                </span>
              )}
              {movie.runtime && (
                <span className="meta-item">
                  <span className="label">{t('movie.runtime')}:</span>
                  <strong>
                    {Math.floor(movie.runtime / 60)}{t('movie.hours')} {movie.runtime % 60}{t('movie.minutes')}
                  </strong>
                </span>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {movie.overview && (
              <div className="synopsis">
                <h3>{t('movie.synopsis')}</h3>
                <p>{movie.overview}</p>
              </div>
            )}

            {director && (
              <div className="director">
                <strong>{t('movie.director')}:</strong> {director.name}
              </div>
            )}

            <div className="movie-actions">
              {trailerUrl && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowTrailer(true)}
                  className="trailer-btn"
                >
                  <FiPlay /> {t('movie.watchTrailer')}
                </Button>
              )}
              <Button
                variant={favorited ? 'primary' : 'secondary'}
                size="lg"
                onClick={handleFavoriteClick}
              >
                {favorited ? <FaHeart /> : <FiHeart />}
                {favorited ? t('movie.removeFromFavorites') : t('movie.addToFavorites')}
              </Button>
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <section className="cast-section">
            <h3>{t('movie.cast')}</h3>
            <div className="cast-grid">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-member">
                  {actor.profile_path && (
                    <img src={tmdbService.getImageUrl(actor.profile_path)} alt={actor.name} />
                  )}
                  <div className="cast-info">
                    <p className="actor-name">{actor.name}</p>
                    <p className="character-name">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
