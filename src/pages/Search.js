// pages/Search.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import tmdbService from '../services/tmdbService';
import MovieCard from '../components/common/MovieCard';
import Button from '../components/common/Button';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import './Search.css';
import { useTranslation } from 'react-i18next';

/**
 * Search page component
 */
export const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
   const { t } = useTranslation();
  const query = searchParams.get('q') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(query);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) {
      searchMovies(1);
    }
  }, [query]);

  const searchMovies = async (pageNum) => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const results = await tmdbService.searchMovies(query, pageNum);
      setMovies(results.results || []);
      setTotalResults(results.total_results || 0);
      setTotalPages(results.total_pages || 0);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      searchMovies(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      searchMovies(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <Button variant="ghost" onClick={() => navigate('/')} className="back-btn">
          <FiArrowLeft /> {t('button.back')}
        </Button>

        <h1 className="search-title">{t('search.title')}</h1>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder={t('search.title')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {t('button.search')}
          </Button>
        </form>
      </div>

      <div className="search-results-container">
        {error && <div className="search-error">{error}</div>}

        {loading && (
          <div className="search-loading">
            <div className="spinner" />
            {t('common.loading')}
          </div>
        )}

        {!loading && query && movies.length === 0 && !error && (
          <div className="search-empty">
            <FiSearch className="empty-icon" />
            <p>{t('search.noResults', { query })}</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="search-results">
            <div className="results-info">
              {t('search.results', { count: totalResults })}
            </div>

            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  imageUrl={
                    movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null
                  }
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  onClick={handlePreviousPage}
                  disabled={page <= 1 || loading}
                >
                  {t('search.previous')}
                </Button>

                <span className="pagination-info">
                  {t('search.page', { current: page, total: totalPages })}
                </span>

                <Button
                  variant="secondary"
                  onClick={handleNextPage}
                  disabled={page >= totalPages || loading}
                >
                  {t('search.next')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
