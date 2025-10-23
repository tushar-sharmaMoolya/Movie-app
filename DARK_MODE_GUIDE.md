# 🌙 Dark & Light Mode Guide

## Theme Switching

Your app now supports both dark and light themes! Users can switch anytime.

## How Theme Mode Works

### Theme Context

Manages theme state across entire app:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

### Theme Detection

1. **First Visit**: Checks system preference
2. **Saved Preference**: Uses localStorage if available
3. **System Dark Mode**: If enabled in OS

### Theme Persistence

Theme preference saved to localStorage:

```typescript
// User selects dark mode
// → Saved to localStorage
// → Restored on next visit
```

## Using Themes in Components

### Get Current Theme

```typescript
import { useTheme } from '../context/ThemeContext';

export const Component = () => {
  const { theme } = useTheme();
  
  return (
    <div>
      Current theme: {theme}
    </div>
  );
};
```

### Toggle Theme

```typescript
import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from 'react-icons/fa';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
```

## CSS Theming

### Using Data Attribute

CSS uses `data-theme` attribute:

```css
/* Light mode (default) */
body[data-theme="light"] {
  background: white;
  color: #333;
}

/* Dark mode */
body[data-theme="dark"] {
  background: #0f0f0f;
  color: white;
}
```

### Component Styling

```css
/* Automatically adapts to theme */
.card {
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: background-color 0.3s;
}
```

### CSS Variables

Define theme colors once:

```css
:root[data-theme="light"] {
  --bg-primary: white;
  --bg-secondary: #f5f5f5;
  --text-primary: #333;
  --text-secondary: #666;
  --border: #ddd;
}

:root[data-theme="dark"] {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --text-primary: white;
  --text-secondary: #aaa;
  --border: #333;
}
```

Use in components:

```css
.component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

## System Preference

### Respect User's OS Setting

```typescript
// In ThemeContext.tsx
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = prefersDark ? 'dark' : 'light';
```

### Listen for Changes

```typescript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  setTheme(newTheme);
});
```

## CSS Media Query

Auto-detect system preference in CSS:

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #0f0f0f;
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: white;
    color: #333;
  }
}
```

## Customizing Themes

### Add New Theme

1. Create theme object:

```typescript
const themes = {
  light: {
    primary: '#e50914',
    background: 'white',
    text: '#333',
  },
  dark: {
    primary: '#e50914',
    background: '#0f0f0f',
    text: 'white',
  },
  // Add more themes...
};
```

2. Extend ThemeContext:

```typescript
type Theme = 'light' | 'dark' | 'auto' | 'custom';
```

3. Add toggle options

### Create Themed Component

```typescript
interface ThemedProps {
  light?: React.CSSProperties;
  dark?: React.CSSProperties;
}

export const Themed: React.FC<ThemedProps> = ({ light, dark, ...props }) => {
  const { theme } = useTheme();
  const style = theme === 'light' ? light : dark;
  
  return <div style={style} {...props} />;
};
```

## Best Practices

### 1. Use CSS Variables

```css
/* ✅ Good */
.button {
  background: var(--primary-color);
  color: var(--text-color);
}

/* ❌ Avoid */
.button {
  background: #e50914;
  color: white;
}
```

### 2. Sufficient Contrast

Ensure text is readable in both modes:

- Light mode: Dark text on light background
- Dark mode: Light text on dark background

Use tools: [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 3. Test Both Modes

- [ ] Test with light theme
- [ ] Test with dark theme
- [ ] Test with system preference
- [ ] Test switching between themes

### 4. Smooth Transitions

```css
.element {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.3s, color 0.3s;
}
```

### 5. Icons and Images

Ensure visibility in both modes:

```typescript
// Use theme-aware colors
<Icon color={theme === 'dark' ? 'white' : 'black'} />

// Or use CSS
svg {
  fill: var(--text-primary);
}
```

## Theme Colors

### Light Mode

```
Background: White (#ffffff)
Secondary: Light Gray (#f5f5f5)
Text: Dark (#333333)
Text Secondary: Gray (#666666)
Border: Light Gray (#dddddd)
Primary: Red (#e50914)
```

### Dark Mode

```
Background: Very Dark (#0f0f0f)
Secondary: Dark (#1a1a1a)
Text: White (#ffffff)
Text Secondary: Light Gray (#aaaaaa)
Border: Dark Gray (#333333)
Primary: Red (#e50914) - same
```

## Accessibility

### Color Blindness

- Don't rely only on color
- Use patterns, shapes, labels too

### Contrast Ratio

Minimum ratios:
- Text: 4.5:1 (AA)
- Large text: 3:1 (AA)

### Respect Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Performance

### No Performance Impact

- Theme switching: <100ms
- localStorage access: instant
- CSS variables: native support
- No re-renders unless needed

### Reduce Flickering

Use data attribute over classes:

```typescript
// Set on <html> element immediately
document.documentElement.setAttribute('data-theme', theme);
```

## Testing

### Test Dark Mode

```typescript
test('renders correctly in dark mode', () => {
  const { container } = render(
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
  
  // Component is set to dark by default
  expect(container.firstChild).toHaveStyle('background: #0f0f0f');
});

test('switches to light mode', () => {
  // Test theme toggle...
});
```

## Deployment

### Supported Browsers

Theme mode works in all modern browsers:
- ✅ Chrome 94+
- ✅ Firefox 93+
- ✅ Safari 14.1+
- ✅ Edge 94+

### Fallback

For older browsers, defaults to light mode

## Resources

- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Prefers Color Scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Theme Implementation](https://web.dev/prefers-color-scheme/)

## Checklist

- [ ] ThemeContext set up
- [ ] Theme toggle button added
- [ ] CSS variables defined
- [ ] Light theme looks good
- [ ] Dark theme looks good
- [ ] Transitions smooth
- [ ] Contrast adequate
- [ ] Tested on different devices
- [ ] localStorage persisting
- [ ] System preference detected

---

**Your app now has beautiful dark and light modes! 🌙☀️**

Users will love the personalization!
