// services/tmdbService.js
import axios from 'axios';

// Replace with your TMDB API key from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'e5c7683dd4ac23c1a315f6d7824fd813';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

/**
 * TMDB Service for movie data
 */
export const tmdbService = {
  /**
   * Get popular movies
   */
  getPopularMovies: (page = 1) =>
    tmdbApi.get('/movie/popular', { params: { page } }).then((res) => res.data),

  /**
   * Get now playing movies
   */
  getNowPlayingMovies: (page = 1) =>
    tmdbApi.get('/movie/now_playing', { params: { page } }).then((res) => res.data),

  /**
   * Get upcoming movies
   */
  getUpcomingMovies: (page = 1) =>
    tmdbApi.get('/movie/upcoming', { params: { page } }).then((res) => res.data),

  /**
   * Get top rated movies
   */
  getTopRatedMovies: (page = 1) =>
    tmdbApi.get('/movie/top_rated', { params: { page } }).then((res) => res.data),

  /**
   * Search movies by keyword
   */
  searchMovies: (query, page = 1) =>
    tmdbApi
      .get('/search/movie', { params: { query, page } })
      .then((res) => res.data)
      .catch((error) => {
        console.error('Search error:', error);
        return { results: [], total_results: 0 };
      }),

  /**
   * Get movie details
   */
  getMovieDetails: (movieId) =>
    tmdbApi.get(`/movie/${movieId}`).then((res) => res.data),

  /**
   * Get movie credits (cast and crew)
   */
  getMovieCredits: (movieId) =>
    tmdbApi.get(`/movie/${movieId}/credits`).then((res) => res.data),

  /**
   * Get movie videos (trailers, teasers)
   */
  getMovieVideos: (movieId) =>
    tmdbApi.get(`/movie/${movieId}/videos`).then((res) => res.data),

  /**
   * Get movie reviews
   */
  getMovieReviews: (movieId) =>
    tmdbApi.get(`/movie/${movieId}/reviews`).then((res) => res.data),

  /**
   * Get similar movies
   */
  getSimilarMovies: (movieId) =>
    tmdbApi.get(`/movie/${movieId}/similar`).then((res) => res.data),

  /**
   * Get image URL
   */
  getImageUrl: (path, size = 'w500') => `${IMAGE_BASE_URL}${path}`,
};

export default tmdbService;
