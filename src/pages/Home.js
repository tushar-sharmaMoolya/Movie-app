import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
import tmdbService from '../services/tmdbService';
import MovieCard from '../components/common/MovieCard';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';
import { FiLogOut, FiSearch, FiHeart } from 'react-icons/fi';
import './Home.css';

/**
 * Home page component with movie discovery
 */
export const Home = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const [popular, nowPlaying, upcoming, topRated] = await Promise.all([
        tmdbService.getPopularMovies(),
        tmdbService.getNowPlayingMovies(),
        tmdbService.getUpcomingMovies(),
        tmdbService.getTopRatedMovies(),
      ]);

      setPopularMovies(popular.results || []);
      setNowPlayingMovies(nowPlaying.results || []);
      setUpcomingMovies(upcoming.results || []);
      setTopRatedMovies(topRated.results || []);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <div className="header-container">
          <h1 className="app-logo">🎬 CineHub</h1>

          <div className="header-search">
            <form onSubmit={handleSearch}>
              <div className="search-input-group">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
          </div>

          <div className="header-actions">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/favorites')}
              title="View favorites"
            >
              <FiHeart /> Favorites
            </Button>

            <div className="user-menu">
              <span className="user-name">Hi, {currentUser?.displayName || currentUser?.email}</span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <FiLogOut /> Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Error message */}
      {error && <div className="error-banner">{error}</div>}

      {/* Main content */}
      <main className="home-main">
        {/* Popular Movies */}
        <section className="movie-section">
          <h2 className="section-title">Popular</h2>
          <div className="movies-grid">
            {popularMovies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                imageUrl={
                  movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null
                }
              />
            ))}
          </div>
        </section>

        {/* Now Playing */}
        <section className="movie-section">
          <h2 className="section-title">Now Playing</h2>
          <div className="movies-grid">
            {nowPlayingMovies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                imageUrl={
                  movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null
                }
              />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section className="movie-section">
          <h2 className="section-title">Upcoming</h2>
          <div className="movies-grid">
            {upcomingMovies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                imageUrl={
                  movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null
                }
              />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section className="movie-section">
          <h2 className="section-title">Top Rated</h2>
          <div className="movies-grid">
            {topRatedMovies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                imageUrl={
                  movie.poster_path ? tmdbService.getImageUrl(movie.poster_path) : null
                }
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;