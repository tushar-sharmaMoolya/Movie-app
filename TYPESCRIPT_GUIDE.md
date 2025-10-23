# 📘 TypeScript Guide

## TypeScript Implementation

This app now includes full TypeScript support! Here's how to work with it.

## What is TypeScript?

TypeScript is JavaScript with type checking. It helps catch errors before runtime and provides better IDE support.

### Benefits
- ✅ Catch bugs early
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Production-ready

## File Structure

TypeScript files use `.ts` and `.tsx` extensions:

```
src/
├── *.ts       # TypeScript (logic)
├── *.tsx      # TypeScript + React (components)
├── *.js       # Plain JavaScript (legacy)
└── *.jsx      # JavaScript + React (legacy)
```

## Key Files with TypeScript

### Configuration (`tsconfig.json`)
Already configured! Main settings:
- `target`: ES2020 (modern JavaScript)
- `jsx`: "react-jsx" (React 18)
- `strict`: true (strict type checking)

### Component with Types

**Before (JavaScript):**
```javascript
export const Button = ({ variant, size, onClick, children }) => {
  return <button className={`btn btn-${variant} btn-${size}`}>{children}</button>;
};
```

**After (TypeScript):**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

## Common Type Patterns

### Function Types

```typescript
// Function that takes a string and returns a number
type StringToNumber = (str: string) => number;

// Function that takes an event and returns void
type EventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
```

### Component Types

```typescript
// Props interface for a component
interface MovieCardProps {
  movie: Movie;
  imageUrl: string;
  onFavoriteClick?: (movieId: number) => void;
}

// React Functional Component type
const MovieCard: React.FC<MovieCardProps> = ({ movie, imageUrl }) => {
  return <div>{movie.title}</div>;
};
```

### Context Types

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

### Hook Types

```typescript
// Hook that returns a value and setter
function useCounter(initial: number): [number, (n: number) => void] {
  const [count, setCount] = useState(initial);
  return [count, setCount];
}
```

## API Integration with Types

```typescript
// Define API response types
interface TMDBResponse<T> {
  results: T[];
  total_results: number;
  total_pages: number;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

// Typed API call
async function getMovies(): Promise<TMDBResponse<Movie>> {
  const response = await axios.get('/movie/popular');
  return response.data;
}
```

## Using Existing JavaScript Files

Old `.js` files still work! They're not type-checked but they work fine alongside TypeScript.

To gradually migrate:

1. **Rename** `.js` to `.ts`
2. **Add types** gradually
3. **Use `any` type** if unsure (temporary)
4. **Enable strict checks** when ready

## IDEs and TypeScript

### VS Code (Recommended)
- Press Cmd+Click to see type definitions
- Hover over variables to see types
- Get autocomplete for all properties

### WebStorm
- Built-in TypeScript support
- Better refactoring tools
- Advanced inspections

## Debugging TypeScript

### Source Maps
TypeScript is compiled to JavaScript. Source maps help debug:

1. Open DevTools (F12)
2. Go to Sources tab
3. Find your `.ts` file
4. Set breakpoints and debug

### Type Errors in IDE

Red squiggles indicate type errors:

```typescript
const name: string = 123; // Error: Type 'number' is not assignable to type 'string'
```

Fix by:
- Changing the value type
- Changing the declared type
- Using a different operator

## Testing with TypeScript

Jest tests work with TypeScript:

```typescript
describe('Button', () => {
  test('renders with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
```

Run tests:
```bash
npm test
npm run test:coverage
```

## TypeScript + Firebase

Firebase types are included:

```typescript
import { User } from 'firebase/auth';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

interface UserData extends DocumentData {
  displayName: string;
  email: string;
}
```

## Performance with TypeScript

TypeScript compilation adds minimal overhead:
- Build time: +2-3 seconds (minimal)
- Runtime: No difference (compiled to JS)
- Bundle size: No difference

## Best Practices

### 1. Use Specific Types

```typescript
// ❌ Avoid
const value: any = getData();

// ✅ Prefer
interface UserData {
  id: string;
  name: string;
}
const value: UserData = getData();
```

### 2. Use Union Types

```typescript
type Status = 'loading' | 'success' | 'error';
const [status, setStatus] = useState<Status>('loading');
```

### 3. Use Generics

```typescript
// Reusable type-safe function
function useState<T>(initial: T): [T, (value: T) => void] {
  // ...
}

const [count, setCount] = useState<number>(0);
```

### 4. Avoid Type Assertion

```typescript
// ❌ Avoid
const movie = data as Movie;

// ✅ Better - use type guards
if (isMovie(data)) {
  // data is Movie here
}
```

## Migration Checklist

- [ ] TypeScript installed and configured
- [ ] tsconfig.json setup
- [ ] Firebase types working
- [ ] Components converted to `.tsx`
- [ ] Props interfaces defined
- [ ] Context types defined
- [ ] Tests written
- [ ] No red squiggles in IDE
- [ ] Build passes without errors

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## Next Steps

1. Install dependencies: `npm install`
2. Start development: `npm start`
3. Fix any type errors shown in IDE
4. Convert more components to TypeScript
5. Add types to all functions

---

**TypeScript is ready to use! Your code is now type-safe!** ✅
