# 🚀 Setup Guide - CineHub Movie Streaming App

This guide will walk you through setting up and running the CineHub application step by step.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **A TMDB API Key** - [Get one free here](https://www.themoviedb.org/settings/api)

### How to Get TMDB API Key

1. Visit [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Create a free account or log in
3. Go to Settings → API
4. Accept the terms and conditions
5. Request an API key
6. Choose "Developer" when asked what type of API you need
7. Fill out the form with your information
8. Your API key will be displayed

**Keep this API key safe!** You'll need it in Step 4.

## Installation Steps

### Step 1: Extract or Clone the Project

Navigate to where you want to store the project:

```bash
# If you have a ZIP file, extract it
unzip movie-streaming-app.zip
cd movie-streaming-app

# Or if you cloned from GitHub
git clone <repository-url>
cd movie-streaming-app
```

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This may take a few minutes. You should see a lot of packages being installed. Wait until you see a message like:
```
added 1234 packages in 5m
```

### Step 3: Create Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

On Windows (if you don't have `cp` command):
```bash
copy .env.example .env.local
```

### Step 4: Add Your TMDB API Key

Open the `.env.local` file in your favorite text editor and replace:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

With your actual TMDB API key you got earlier:

```
REACT_APP_TMDB_API_KEY=abc123xyz789...
```

Save the file.

### Step 5: Start the Development Server

```bash
npm start
```

You should see output like:
```
Compiled successfully!

You can now view movie-streaming-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

The app will automatically open in your browser at `http://localhost:3000`

## First Time Use

### Creating an Account

1. On the login page, click "**Sign up here**"
2. Choose your registration method:
   - **Email Method**: Fill in email and password
   - **Social Method**: Click any social button (Facebook, Google, Apple)
3. Click "**Create Account**"
4. You'll be redirected to login - enter your credentials
5. Click "**Log In**"

### Test Account (Optional)
You can use these test credentials:
- Email: `test@example.com`
- Password: `password123`

### Exploring the App

1. **Home Page** - Shows 4 categories of movies:
   - Popular
   - Now Playing
   - Upcoming
   - Top Rated

2. **Search** - Use the search bar to find specific movies

3. **Movie Details** - Click on any movie card to see:
   - Full synopsis
   - Cast and crew
   - Release year and rating
   - Movie trailer
   - Add to favorites button

4. **Favorites** - Click the heart icon or "Favorites" button to see your saved movies

## Troubleshooting

### Issue: "API Key Error" or Movies Not Loading

**Solution:**
1. Check that `.env.local` file exists in project root
2. Verify the TMDB API key is correct
3. Restart the development server (Ctrl+C and `npm start`)

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# On macOS/Linux
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm start
```

### Issue: "Module not found" Errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Changes Not Reflecting in Browser

**Solution:**
1. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check the terminal for compile errors

## Project Structure Overview

```
movie-streaming-app/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── common/             # Reusable components
│   │   │   ├── Button.js
│   │   │   ├── InputField.js
│   │   │   ├── MovieCard.js
│   │   │   └── *.css
│   │   └── ProtectedRoute.js   # Auth protection
│   ├── context/                # Global state
│   │   ├── AuthContext.js      # User auth
│   │   └── FavoritesContext.js # Favorites
│   ├── hooks/                  # Custom hooks
│   │   ├── useFormInput.js
│   │   └── useLocalStorage.js
│   ├── services/               # API services
│   │   └── tmdbService.js
│   ├── pages/                  # Page components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Home.js
│   │   ├── Search.js
│   │   ├── MovieDetails.js
│   │   ├── Favorites.js
│   │   └── *.css
│   ├── App.js                  # Main app
│   ├── App.css                 # Global styles
│   └── index.js                # Entry point
├── .env.example                # Example env vars
├── .gitignore                  # Git ignore
├── package.json                # Dependencies
├── README.md                   # Documentation
└── SETUP_GUIDE.md              # This file
```

## Available Commands

### Development
```bash
# Start development server
npm start

# Run tests
npm test

# Eject configuration (⚠️ irreversible!)
npm run eject
```

### Production
```bash
# Build for production
npm run build

# Build creates optimized files in /build folder
```

## Key Features You Can Use

### Authentication
- Email/Password registration and login
- Social login simulation (Facebook, Google, Apple)
- Session persistence
- Logout functionality

### Movie Discovery
- Browse popular, now playing, upcoming, and top-rated movies
- Real-time search with pagination
- Comprehensive movie details page
- Cast and crew information
- Movie trailers (when available)

### Favorites Management
- Add/remove movies from favorites
- View all favorites
- Clear all favorites at once
- Persistent across sessions

## Data Storage

All user data is stored locally in your browser:
- User accounts and credentials
- Favorite movies
- Current user session

**No data is sent to any server** (except TMDB API requests for movie data)

## Customization Tips

### Change App Colors
Edit `src/App.css` and look for color values:
```css
--primary: #e50914;    /* Netflix red */
--dark: #0f0f0f;       /* Dark background */
```

### Change App Name
Search for "CineHub" in:
- `public/index.html` - Page title
- `src/pages/Home.js` - App logo
- Update to your preferred name

### Add More Movie Categories
Edit `src/pages/Home.js` and add new API calls using `tmdbService`

## Deployment

### Deploy to Netlify (Easiest)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set environment variable:
   - Name: `REACT_APP_TMDB_API_KEY`
   - Value: Your TMDB API key
6. Click Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable `REACT_APP_TMDB_API_KEY`
5. Deploy!

### Deploy to Firebase

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase init`
3. Build: `npm run build`
4. Deploy: `firebase deploy`

## Getting Help

If you encounter issues:

1. **Check the console** - Open browser DevTools (F12) → Console for error messages
2. **Read the error message** - It usually tells you exactly what's wrong
3. **Check TMDB API** - Make sure your API key is valid and not rate-limited
4. **Restart everything** - Stop the server, delete `node_modules`, reinstall, restart

## Next Steps

Once you have the app running:

1. **Explore the Code** - Read through components to understand the structure
2. **Try Customizing** - Change colors, fonts, layouts
3. **Add Features** - Consider adding the "nice-to-haves" from the PRD
4. **Deploy** - Share your app with the world!

## Additional Resources

- [React Documentation](https://react.dev) - Learn React
- [TMDB API Docs](https://www.themoviedb.org/settings/api) - Movie data source
- [React Router Docs](https://reactrouter.com) - Navigation
- [MDN Web Docs](https://developer.mozilla.org) - Web development reference

---

**Congratulations! 🎉 You now have a fully functional movie streaming app!**

Enjoy exploring movies and customizing your application!
