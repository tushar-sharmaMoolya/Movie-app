// pages/Favorites.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import tmdbService from '../services/tmdbService';
import MovieCard from '../components/common/MovieCard';
import Button from '../components/common/Button';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import './Favorites.css';
import { useTranslation } from 'react-i18next';

/**
 * Favorites page component
 */
export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites } = useFavorites();
  const { t } = useTranslation();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearFavorites();
    }
  };

   return (
    <div className="favorites-page">
      <div className="favorites-header">
        <Button variant="ghost" onClick={() => navigate('/')} className="back-btn">
          <FiArrowLeft /> {t('button.back')}
        </Button>

        <h1 className="favorites-title">{t('favorites.title')}</h1>

        {favorites.length > 0 && (
          <Button
            variant="danger"
            onClick={handleClearAll}
            className="clear-all-btn"
          >
            <FiTrash2 /> {t('favorites.clearAll')}
          </Button>
        )}
      </div>

      <div className="favorites-container">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♡</div>
            <h2>{t('favorites.empty')}</h2>
            <p>{t('favorites.emptyMessage')}</p>
            <Button onClick={() => navigate('/')} variant="primary">
              {t('favorites.explorMovies')}
            </Button>
          </div>
        ) : (
          <>
            <div className="favorites-info">
              {t('favorites.count', { count: favorites.length })}
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
