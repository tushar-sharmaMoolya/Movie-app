# 🧪 Testing Guide (Jest + React Testing Library)

## Writing Tests for Your App

Complete testing setup with Jest and React Testing Library!

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run all tests once
npm test -- --watchAll=false

# Run with coverage report
npm run test:coverage
```

## Test File Structure

Test files go next to components:

```
src/
├── components/
│   ├── Button.tsx
│   ├── Button.test.tsx    ← Test file
│   └── Button.css
```

## Basic Test Template

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
```

## Common Testing Patterns

### 1. Rendering Tests

```typescript
test('renders component', () => {
  render(<Button>Click</Button>);
  expect(screen.getByText('Click')).toBeInTheDocument();
});
```

### 2. Props Tests

```typescript
test('applies variant class', () => {
  render(<Button variant="primary">Click</Button>);
  const button = screen.getByText('Click');
  expect(button).toHaveClass('btn-primary');
});
```

### 3. Event Tests

```typescript
test('calls onClick handler', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 4. State Tests

```typescript
test('state updates correctly', () => {
  render(<Counter initial={0} />);
  const button = screen.getByRole('button');
  
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### 5. Async Tests

```typescript
test('loads data', async () => {
  render(<MovieList />);
  
  const movies = await screen.findAllByRole('img');
  expect(movies.length).toBeGreaterThan(0);
});
```

## Queries

### Query Variants

```typescript
// Preferred (most accessible)
screen.getByRole('button', { name: /click/i })
screen.getByLabelText(/username/i)
screen.getByPlaceholderText(/search/i)
screen.getByText(/submit/i)

// Acceptable
screen.getByAltText(/avatar/i)
screen.getByTitle(/close/i)

// Last resort
screen.getByTestId('custom-element')
```

### Query Functions

```typescript
screen.getByText()      // Throws if not found
screen.queryByText()    // Returns null if not found
screen.findByText()     // Async, waits for element
```

## User Interactions

```typescript
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// fireEvent (immediate, unrealistic)
fireEvent.click(button);

// userEvent (realistic user behavior) - PREFERRED
await userEvent.click(button);
await userEvent.type(input, 'hello');
```

## Mocking

### Mock Functions

```typescript
const mockFn = jest.fn();
mockFn('arg1', 'arg2');

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(1);
```

### Mock Modules

```typescript
jest.mock('../services/tmdbService', () => ({
  getPopularMovies: jest.fn().mockResolvedValue({
    results: [{ id: 1, title: 'Movie' }]
  })
}));
```

### Mock Firebase

```typescript
jest.mock('../config/firebase', () => ({
  auth: {
    currentUser: { uid: '123', email: 'test@example.com' }
  }
}));
```

## Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('hook increments counter', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Testing Context

```typescript
test('context provides value', () => {
  render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>
  );
  
  expect(screen.getByText('light')).toBeInTheDocument();
});
```

## Test Coverage

```bash
npm run test:coverage
```

Coverage report shows:
- **Statements**: % of statements executed
- **Branches**: % of if/else branches executed
- **Functions**: % of functions called
- **Lines**: % of lines executed

### Coverage Goals

- **Statements**: > 70%
- **Branches**: > 60%
- **Functions**: > 70%
- **Lines**: > 70%

## Example: Complete Component Test

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/path.jpg',
    vote_average: 8.5,
  };

  test('renders movie information', () => {
    render(
      <MovieCard 
        movie={mockMovie} 
        imageUrl="https://image.com/poster.jpg" 
      />
    );
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('⭐ 8.5')).toBeInTheDocument();
  });

  test('displays image', () => {
    render(
      <MovieCard 
        movie={mockMovie} 
        imageUrl="https://image.com/poster.jpg" 
      />
    );
    
    const img = screen.getByAltText('Test Movie');
    expect(img).toHaveAttribute('src', 'https://image.com/poster.jpg');
  });

  test('favorite button works', async () => {
    const { container } = render(
      <MovieCard 
        movie={mockMovie} 
        imageUrl="https://image.com/poster.jpg" 
      />
    );
    
    const favoriteBtn = container.querySelector('.favorite-btn');
    fireEvent.click(favoriteBtn);
    
    await waitFor(() => {
      expect(favoriteBtn).toHaveClass('active');
    });
  });

  test('navigates to details on click', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    
    render(
      <MovieCard 
        movie={mockMovie} 
        imageUrl="https://image.com/poster.jpg" 
      />
    );
    
    fireEvent.click(screen.getByText('Test Movie'));
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });
});
```

## Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Avoid
expect(component.state.isOpen).toBe(true);

// ✅ Good
expect(screen.getByRole('dialog')).toBeInTheDocument();
```

### 2. Use Semantic Queries

```typescript
// ❌ Avoid
screen.getByTestId('button')

// ✅ Good
screen.getByRole('button')
```

### 3. Keep Tests Focused

```typescript
// ❌ Too many tests
test('everything works', () => { ... })

// ✅ One test per behavior
test('renders title', () => { ... })
test('calls onClick', () => { ... })
```

### 4. Mock External Dependencies

```typescript
jest.mock('../services/api');
jest.mock('../config/firebase');
```

### 5. Use Descriptive Names

```typescript
// ❌ Unclear
test('it works', () => { ... })

// ✅ Clear
test('displays error message when email is invalid', () => { ... })
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v2
```

## Debugging Tests

### See What's Rendered

```typescript
import { screen } from '@testing-library/react';

test('debug', () => {
  render(<MyComponent />);
  screen.debug(); // Prints DOM to console
});
```

### Use Breakpoints

```typescript
test('with breakpoint', () => {
  render(<MyComponent />);
  debugger; // Stops here in debugger
  expect(screen.getByText('test')).toBeInTheDocument();
});
```

### Verbose Output

```bash
npm test -- --verbose
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Test Checklist

- [ ] Tests for all components
- [ ] Tests for all hooks
- [ ] Coverage > 70%
- [ ] CI/CD configured
- [ ] Mocks for external services
- [ ] Async tests handled correctly
- [ ] No console warnings

---

**Your app has a solid testing foundation! 🧪**

Now go write some tests!
