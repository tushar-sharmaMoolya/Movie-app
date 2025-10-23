# 🎬 CineHub - Movie Streaming Application

A full-featured Netflix-like movie streaming web application built with ReactJS. Browse, search, and manage your favorite movies with an intuitive interface and real-time data from The Movie Database (TMDB).

## ✨ Features

### Core Features
- **User Authentication**
  - Email/Password registration and login
  - Social login (Facebook, Google, Apple) - simulated for demo
  - Persistent session management using localStorage
  - Secure credential storage

- **Movie Discovery**
  - Popular movies
  - Now playing movies
  - Upcoming movies
  - Top-rated movies
  - Real-time search functionality

- **Movie Information**
  - Comprehensive movie details
  - Release date, runtime, rating, and genres
  - Full synopsis and cast information
  - Director and crew details
  - Movie trailers (YouTube integration)

- **Favorites Management**
  - Add/remove movies from favorites
  - Persistent favorites per user
  - View and edit favorite list
  - Clear all favorites option

- **Responsive Design**
  - Mobile-first approach
  - Works on all device sizes
  - Touch-friendly interface
  - Fast loading times

### Technical Features
- Custom React hooks for state management
- Context API for global state
- Reusable components architecture
- Clean and maintainable code
- Performance optimized
- Accessibility compliant

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- A TMDB API key (free from https://www.themoviedb.org/settings/api)

### Installation

1. **Clone or extract the project**
```bash
cd movie-streaming-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your TMDB API key
REACT_APP_TMDB_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

### Test Credentials
For demo purposes, you can use these credentials:
- **Email**: test@example.com
- **Password**: password123

Or sign up with a new account using email/password or social login (all saved locally).

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.js              # Reusable button component
│   │   ├── InputField.js          # Form input component
│   │   ├── MovieCard.js           # Movie card component
│   │   └── *.css                  # Component styles
│   └── ProtectedRoute.js          # Authentication wrapper
├── context/
│   ├── AuthContext.js             # Authentication context
│   └── FavoritesContext.js        # Favorites management
├── hooks/
│   ├── useFormInput.js            # Custom form input hook
│   └── useLocalStorage.js         # LocalStorage hook
├── services/
│   └── tmdbService.js             # TMDB API service
├── pages/
│   ├── Login.js                   # Login page
│   ├── Register.js                # Registration page
│   ├── Home.js                    # Movie discovery page
│   ├── Search.js                  # Search results page
│   ├── MovieDetails.js            # Movie details page
│   ├── Favorites.js               # Favorites page
│   └── *.css                      # Page styles
├── App.js                         # Main app component
├── App.css                        # Global styles
└── index.js                       # Entry point

public/
└── index.html                     # HTML template
```

## 🎯 Usage Guide

### Authentication
1. **First Time Users**
   - Click "Sign up here" on login page
   - Choose email/password or social login method
   - Fill in required information
   - Click "Create Account"

2. **Returning Users**
   - Enter your email and password
   - Or use same social login method as registration
   - Your session will be saved

### Discovering Movies
1. **Browse Categories** - Home page shows different movie categories
2. **Search** - Use search bar to find specific movies
3. **View Details** - Click any movie card for full details
4. **Watch Trailer** - Click "Watch Trailer" button (if available)
5. **Add to Favorites** - Click heart icon to save to favorites

### Managing Favorites
1. Click "Favorites" in header
2. View all your saved movies
3. Click heart to remove from favorites
4. Use "Clear All" to remove all at once

## 🛠️ Customization

### Theming
Edit `App.css` to customize colors:
- Primary color: `#e50914` (Netflix Red)
- Background: `#0f0f0f` (Dark)
- Accent colors in individual component files

### API Configuration
All TMDB API calls are in `src/services/tmdbService.js`. Modify to add more endpoints.

### Component Styling
Each component has its own CSS file for easy customization. Modify to match your design.

## 📦 Building for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## 🚀 Deployment

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set `REACT_APP_TMDB_API_KEY` environment variable
3. Build command: `npm run build`
4. Publish directory: `build`

### Deploy to Vercel
1. Connect GitHub repository
2. Add `REACT_APP_TMDB_API_KEY` environment variable
3. Deploy!

### Deploy to Firebase
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase init`
3. Build: `npm run build`
4. Deploy: `firebase deploy`

## 🧪 Testing

```bash
npm test
```

Runs tests in interactive watch mode.

## 🎨 Design Features

- **Modern UI** - Clean, Netflix-inspired design
- **Smooth Animations** - Transitions and hover effects
- **Dark Theme** - Reduces eye strain
- **Responsive Layout** - Adapts to all screen sizes
- **Accessibility** - WCAG compliant, keyboard navigation

## 🔐 Security & Data Storage

- **Local Storage** - User data stored in browser's localStorage
- **No Backend** - No server-side data storage
- **Secure Headers** - Content Security Policy headers
- **HTTPS Ready** - Works with HTTPS deployment

### Data Stored
- User registration information (email, password if email/password login)
- Current user session
- User's favorite movies list
- Search history (not implemented, optional)

## 📚 API Reference

### TMDB Service Functions
```javascript
// Get movies by category
tmdbService.getPopularMovies(page)
tmdbService.getNowPlayingMovies(page)
tmdbService.getUpcomingMovies(page)
tmdbService.getTopRatedMovies(page)

// Search and details
tmdbService.searchMovies(query, page)
tmdbService.getMovieDetails(movieId)
tmdbService.getMovieCredits(movieId)
tmdbService.getMovieVideos(movieId)
tmdbService.getSimilarMovies(movieId)

// Utilities
tmdbService.getImageUrl(path, size)
```

## 🐛 Known Limitations

- Social logins are simulated (not connected to real providers)
- Movie data is read-only (no user-generated reviews)
- Trailer play is only available for movies with YouTube trailers
- Search results limited to TMDB API rate limits
- No offline functionality

## 🚀 Future Enhancements

- [ ] Firebase social authentication integration
- [ ] Firebase Firestore for persistent backend storage
- [ ] Firebase Analytics for user tracking
- [ ] TypeScript implementation
- [ ] Unit tests with Jest
- [ ] Internationalization (i18n)
- [ ] Dark/Light mode toggle
- [ ] Electron desktop app
- [ ] Progressive Web App (PWA)
- [ ] User ratings and reviews
- [ ] Watch history tracking
- [ ] Movie recommendations

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [TMDB API Docs](https://www.themoviedb.org/settings/api)
- [Netlify Deployment Guide](https://docs.netlify.com)

## 📝 Notes for Developers

### Code Organization
- Components are organized by type (common, pages)
- One component per file (with exceptions for closely related components)
- CSS files colocated with components
- Utility functions in services folder

### Naming Conventions
- Components: PascalCase (e.g., `MovieCard.js`)
- Utils/Hooks: camelCase with `use` prefix (e.g., `useFormInput`)
- CSS classes: kebab-case (e.g., `movie-card`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_KEY`)

### Best Practices
- Use functional components with hooks
- Memoize expensive computations
- Lazy load images
- Use semantic HTML
- Proper error handling
- Console logging for debugging

---

**Happy coding! 🎬✨**

For the latest updates and information, visit the project repository.
