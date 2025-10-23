# 📘 Implementation Guide - CineHub Architecture

## Overview

CineHub is a React-based movie streaming application that demonstrates modern web development practices including:
- Component-based architecture
- State management with Context API
- Custom React hooks
- Responsive design
- API integration

## Architecture Pattern

```
App (Router + Providers)
├── AuthProvider (Authentication)
├── FavoritesProvider (User Favorites)
└── Routes
    ├── Public Routes (Login, Register)
    ├── Protected Routes (wrapped with ProtectedRoute)
    │   ├── Home
    │   ├── Search
    │   ├── MovieDetails
    │   └── Favorites
```

## Core Concepts

### 1. Authentication Flow

**Files Involved:**
- `src/context/AuthContext.js` - Auth state management
- `src/pages/Login.js` - Login page
- `src/pages/Register.js` - Registration page
- `src/components/ProtectedRoute.js` - Route protection

**How It Works:**
1. Users can register via email/password or social login (simulated)
2. Credentials stored in localStorage under `users` key
3. On login, user data (without password) stored in `currentUser` key
4. ProtectedRoute checks `isAuthenticated` before allowing page access
5. Logout clears session and redirects to login

**Key Functions:**
```javascript
// Register new user
register(userData) → newUser

// Login user
login(email, password, socialLogin) → null (sets state)

// Logout user
logout() → null (clears state)

// Check if email exists
emailExists(email) → boolean
```

### 2. Favorites Management

**Files Involved:**
- `src/context/FavoritesContext.js` - Favorites state
- `src/components/common/MovieCard.js` - Add/remove UI
- `src/pages/Favorites.js` - Favorites page

**How It Works:**
1. Favorites stored per user in localStorage as `{userId: [movies]}`
2. MovieCard component shows heart icon
3. Clicking heart adds/removes movie from user's favorites
4. Favorites page displays all user's saved movies

**Key Functions:**
```javascript
// Get current user's favorites
getUserFavorites() → [movies]

// Add movie to favorites
addFavorite(movie) → null

// Remove movie from favorites
removeFavorite(movieId) → null

// Check if movie is favorited
isFavorite(movieId) → boolean
```

### 3. Movie Data Flow

**Files Involved:**
- `src/services/tmdbService.js` - API integration
- `src/pages/Home.js` - Browse movies
- `src/pages/Search.js` - Search movies
- `src/pages/MovieDetails.js` - Movie details

**How It Works:**
```
1. Page component mounts
2. Call tmdbService.getMovies*() or searchMovies()
3. API returns movie data
4. Component stores in local state
5. Render MovieCard components
6. User clicks card → Navigate to MovieDetails
7. MovieDetails page fetches more data
8. Display comprehensive info + trailer
```

### 4. Custom Hooks

#### useFormInput Hook
```javascript
const { value, error, touched, bind, reset } = useFormInput(
  initialValue,
  validatorFunction
);

// Use with input:
<input {...bind} />

// Access values:
value          // Current value
error          // Validation error message
touched        // Whether field has been focused
reset()        // Clear field
```

**Example:**
```javascript
const email = useFormInput('', (val) => {
  if (!val) return 'Email required';
  if (!/^.*@.*\..*$/.test(val)) return 'Invalid email';
  return '';
});
```

#### useLocalStorage Hook
```javascript
const [value, setValue] = useLocalStorage(
  storageKey,
  initialValue
);

// Use like useState but syncs with localStorage
setValue(newValue);  // Updates both state and localStorage
```

## Component Hierarchy

### Common Components (Reusable)

#### Button Component
```javascript
<Button
  variant="primary|secondary|danger|ghost"
  size="sm|md|lg"
  loading={boolean}
  disabled={boolean}
  onClick={handler}
>
  Content
</Button>
```

#### InputField Component
```javascript
<InputField
  label="Label Text"
  type="text|email|password"
  placeholder="..."
  value={value}
  onChange={handler}
  onBlur={handler}
  error={errorMsg}
  touched={boolean}
  required={boolean}
/>
```

#### MovieCard Component
```javascript
<MovieCard
  movie={movieObject}
  imageUrl={imageUrl}
/>

// Features:
// - Click to navigate to details
// - Heart icon to add/remove favorites
// - Shows rating and year
// - Responsive grid layout
```

### Page Components

#### Login/Register Pages
- Email/password form with validation
- Social login buttons (simulated)
- Toggle between methods
- Form state management with useFormInput
- Error handling and feedback

#### Home Page
- Loads 4 movie categories on mount
- Displays movies in responsive grid
- Search functionality
- User menu with logout
- Header with navigation

#### Search Page
- Takes query from URL params
- Displays results in grid
- Pagination support
- Result count display
- Empty state handling

#### MovieDetails Page
- Fetches movie + credits + videos + similar movies
- Displays comprehensive movie info
- Shows cast grid
- Trailer modal player
- Add/remove favorites

#### Favorites Page
- Shows user's favorite movies
- Clear all option
- Empty state with CTA
- Responsive grid layout

## Data Models

### User Object
```javascript
{
  id: string,              // Timestamp
  email: string,          // User email
  password?: string,      // If email/password method
  socialProvider?: string, // "Facebook", "Google", "Apple"
  socialId?: string,      // Social provider ID
  displayName: string,    // User display name
  createdAt: string,      // ISO timestamp
}
```

### Movie Object (TMDB)
```javascript
{
  id: number,
  title: string,
  overview: string,
  poster_path: string,    // Image path
  backdrop_path: string,
  release_date: string,   // YYYY-MM-DD
  vote_average: number,   // 0-10
  genres: Array<{id, name}>,
  runtime: number,        // Minutes
  revenue: number,
  budget: number,
  // ... many more fields
}
```

### Credits Object
```javascript
{
  id: number,
  cast: Array<{
    id: number,
    name: string,
    character: string,
    profile_path: string,
    order: number
  }>,
  crew: Array<{
    id: number,
    name: string,
    job: string,
    department: string,
    profile_path: string
  }>
}
```

## State Management Pattern

### Global State (Context)
- **AuthContext**: User authentication and session
- **FavoritesContext**: User's favorite movies

### Local State (useState)
- **Home**: Movie arrays, loading, error states
- **Search**: Results, pagination, loading states
- **MovieDetails**: Movie data, credits, videos, loading states

### Form State (useFormInput)
- **Login/Register**: Email, password validation

### Persistent State (useLocalStorage)
- User data
- Favorites
- Current session

## API Integration Pattern

### TMDB Service
```javascript
// Pattern for all API calls
async function callAPI() {
  try {
    const response = await tmdbApi.get(endpoint, params);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return fallbackValue;
  }
}

// Usage in components
useEffect(() => {
  setLoading(true);
  tmdbService.getPopularMovies()
    .then(data => setMovies(data.results))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);
```

## Error Handling

### Types of Errors Handled
1. **API Errors** - Network issues, invalid API key
2. **Authentication Errors** - Invalid credentials
3. **Form Errors** - Validation errors
4. **Not Found** - Movie not found

### Error Display
```javascript
// Banner error
{error && <div className="error-banner">{error}</div>}

// Field error
{touched && error && <div className="error-message">{error}</div>}

// Page error
{error && <div className="error-container"><h2>{error}</h2></div>}
```

## Performance Optimizations

### 1. Image Optimization
- Lazy loading with `loading="lazy"`
- Responsive image sizing
- Placeholder for missing images

### 2. Code Splitting
- React Router enables route-based code splitting
- Each page loads only when needed

### 3. State Optimization
- useCallback for event handlers
- Memoization of expensive computations
- Proper dependency arrays in useEffect

### 4. Rendering Optimization
- Functional components with hooks
- Avoid inline object/function creation
- Separate concerns into components

## Styling Strategy

### CSS Architecture
- **Global Styles** → `App.css`
- **Component Styles** → `Component.css`
- **Page Styles** → `Page.css`

### Design Tokens
- Primary Color: `#e50914` (Red)
- Dark Background: `#0f0f0f`
- Text Color: `white` / `#aaa`
- Border Radius: `8-12px`
- Transitions: `0.3s ease`

### Responsive Breakpoints
- Desktop: `1024px+`
- Tablet: `768px - 1023px`
- Mobile: `< 768px`

### Dark Mode Support
- Uses `@media (prefers-color-scheme: dark)`
- All components include dark mode CSS

## Common Workflows

### Adding a New Page

1. Create page component in `src/pages/`
```javascript
// src/pages/NewPage.js
export const NewPage = () => {
  return <div>New Page</div>;
};
export default NewPage;
```

2. Create CSS file
```css
/* src/pages/NewPage.css */
.new-page { /* styles */ }
```

3. Add route in `App.js`
```javascript
<Route path="/newpage" element={<ProtectedRoute><NewPage/></ProtectedRoute>} />
```

4. Add navigation link in relevant components

### Adding a New Component

1. Create component in `src/components/common/`
```javascript
// src/components/common/NewComponent.js
export const NewComponent = ({ props }) => {
  return <div>Component</div>;
};
```

2. Create CSS file
3. Use in other components
```javascript
import NewComponent from '../common/NewComponent';
<NewComponent props={value} />
```

### Adding API Endpoint

1. Add to `src/services/tmdbService.js`
```javascript
export const tmdbService = {
  newEndpoint: (params) =>
    tmdbApi.get('/path', { params })
      .then(res => res.data)
};
```

2. Use in components
```javascript
const data = await tmdbService.newEndpoint(params);
```

## Security Considerations

### Implemented
- Password stored in localStorage (not ideal but for demo)
- No sensitive data sent to unsecured endpoints
- Input validation on forms
- Protected routes prevent unauthorized access

### Not Implemented (For Demo)
- SSL/TLS encryption for localStorage
- Backend verification of credentials
- Refresh tokens
- CSRF protection

### Recommendations for Production
- Use Firebase Authentication
- Implement proper backend
- Use environment variables for secrets
- Add HTTPS
- Implement proper session management

## Testing Strategy (Optional)

### Unit Tests
```javascript
// Example: Button component
test('Button renders with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

### Integration Tests
```javascript
// Example: Login flow
test('User can login', async () => {
  render(<App />);
  // ... fill form and submit
  // ... verify redirect to home
});
```

## Deployment Considerations

### Netlify
- Set `REACT_APP_TMDB_API_KEY` environment variable
- Build command: `npm run build`
- Publish directory: `build`

### Vercel
- Similar to Netlify
- Automatic deployments on push

### Firebase
- Use Firebase Hosting
- Deploy with `firebase deploy`

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Movies not loading | Check TMDB API key, check rate limits |
| Favorites not persisting | Check localStorage is enabled |
| Page not found | Check route path, verify component import |
| Styling issues | Clear browser cache, check CSS file import |
| Form not validating | Check validator function, verify bind attribute |

## Performance Metrics

### Target Metrics
- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 3s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 4s

### How to Check
Use Chrome DevTools → Lighthouse → Run Audit

## Future Architecture Changes

### To Consider
- Move to TypeScript for type safety
- Add Redux for complex state
- Implement Service Workers for PWA
- Add unit tests with Jest
- Setup CI/CD pipeline
- Add analytics tracking

---

**This guide covers the core architecture. For specific implementation details, refer to individual component comments in the code!**
