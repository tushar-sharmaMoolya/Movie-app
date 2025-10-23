// components/common/MovieCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import './MovieCard.css';

/**
 * Reusable MovieCard component for displaying movie information
 * @param {object} movie - Movie object with title, poster_path, vote_average, etc.
 * @param {string} imageUrl - Full image URL
 */
export const MovieCard = ({ movie, imageUrl }) => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={movie.title || movie.name} loading="lazy" />
        ) : (
          <div className="movie-card-placeholder">No Image</div>
        )}
        <div className="movie-card-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorite ? <FaHeart /> : <FiHeart />}
          </button>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title || movie.name}</h3>
        <div className="movie-card-meta">
          <span className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
          <span className="movie-year">{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
        </div>
        <p className="movie-card-overview">{movie.overview?.substring(0, 80)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;
