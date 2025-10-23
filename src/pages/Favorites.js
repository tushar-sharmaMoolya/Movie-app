// pages/Favorites.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import tmdbService from '../services/tmdbService';
import MovieCard from '../components/common/MovieCard';
import Button from '../components/common/Button';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import './Favorites.css';

/**
 * Favorites page component
 */
export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className="favorites-page">
      {/* Header */}
      <div className="favorites-header">
        <Button variant="ghost" onClick={() => navigate('/')} className="back-btn">
          <FiArrowLeft /> Back to Home
        </Button>

        <h1 className="favorites-title">My Favorites</h1>

        {favorites.length > 0 && (
          <Button
            variant="danger"
            onClick={handleClearAll}
            className="clear-all-btn"
          >
            <FiTrash2 /> Clear All
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="favorites-container">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♡</div>
            <h2>No Favorites Yet</h2>
            <p>Start adding movies to your favorites to see them here!</p>
            <Button onClick={() => navigate('/')} variant="primary">
              Explore Movies
            </Button>
          </div>
        ) : (
          <>
            <div className="favorites-info">
              You have {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your favorites
            </div>

            <div className="movies-grid">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  imageUrl={
                    movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
