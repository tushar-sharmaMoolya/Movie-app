# 🌍 Internationalization (i18n) Guide

## Multi-Language Support

Your app now supports English and Bahasa Indonesia! Users can switch languages anytime.

## How It Works

### Files Structure

```
src/i18n/
├── config.ts           # i18n configuration
└── locales/
    ├── en.json        # English translations
    └── id.json        # Indonesian translations
```

### Translation Format

Each language has a JSON file with key-value pairs:

```json
{
  "auth": {
    "login": "Login",
    "email": "Email"
  },
  "home": {
    "welcome": "Welcome, {{name}}"
  }
}
```

## Using Translations in Components

### Basic Usage

```typescript
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('auth.login')}</h1>
      <button>{t('auth.loginHere')}</button>
    </div>
  );
};
```

### With Variables

```typescript
const { t } = useTranslation();

// Translation: "Welcome, {{name}}"
const greeting = t('home.welcome', { name: 'John' });
// Output: "Welcome, John"
```

### Plural Handling

```typescript
// Translation with pluralization
// "count": "You have {{count}} movie",
// "count_plural": "You have {{count}} movies"

const text = t('favorites.count', { count: movies.length });
// Output depends on count
```

## Changing Languages

### Using Language Switcher

```typescript
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
      <button onClick={() => changeLanguage('id')}>
        Bahasa Indonesia
      </button>
    </div>
  );
};
```

### Get Current Language

```typescript
const { i18n } = useTranslation();
console.log(i18n.language); // 'en' or 'id'
```

## Adding New Languages

### Step 1: Create Translation File

Create `src/i18n/locales/es.json`:

```json
{
  "app": {
    "name": "CineHub",
    "slogan": "Descubre películas, crea tu lista"
  },
  "auth": {
    "login": "Iniciar sesión",
    "email": "Correo electrónico"
  }
  // ... rest of translations
}
```

### Step 2: Add to i18n Config

Edit `src/i18n/config.ts`:

```typescript
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  id: { translation: id },
  es: { translation: es }, // Add this
};
```

### Step 3: Update Language Switcher

Add button for new language in UI

## Translation Keys Structure

Organized by feature:

```
auth.*          - Authentication
home.*          - Home page
movie.*         - Movie details
search.*        - Search
favorites.*     - Favorites
button.*        - Button texts
error.*         - Error messages
validation.*    - Form validation
common.*        - Common texts
```

## Namespaces (Optional)

For large apps, use namespaces:

```typescript
// Use default namespace
const { t } = useTranslation();

// Use specific namespace
const { t } = useTranslation('movies');
const title = t('title'); // From movies namespace
```

## Lazy Loading Translations

For large apps, load languages on demand:

```typescript
i18n.loadNamespace('heavy').then(() => {
  // Namespace loaded
});
```

## Date/Time Formatting

Format dates based on language:

```typescript
const date = new Date();
const formatted = new Intl.DateTimeFormat('en-US').format(date);
```

## Number Formatting

Format numbers based on language:

```typescript
const number = 1234.56;
const formatted = new Intl.NumberFormat('en-US').format(number);
// en-US: "1,234.56"
// de-DE: "1.234,56"
```

## Persistence

Language preference is saved to localStorage:

```typescript
// User selects language
// → Saved to localStorage as 'language': 'id'
// → Loaded automatically on next visit
```

To clear preference:
```typescript
localStorage.removeItem('language');
```

## Translation Management Tools

### For Teams

Consider using translation management services:

1. **Crowdin** - Collaborative translation platform
2. **Phrase** - Translation management
3. **OneSky** - Localization platform
4. **Lokalise** - Translation tool

### Workflow

1. Extract translation keys from code
2. Upload to service
3. Translators translate
4. Download translated files
5. Commit to repository

## Best Practices

### 1. Use Descriptive Keys

```javascript
// ❌ Avoid
t('msg1')
t('txt')

// ✅ Good
t('auth.login')
t('error.emailRequired')
```

### 2. Avoid Hardcoded Strings

```javascript
// ❌ Avoid
<button>Login</button>

// ✅ Good
<button>{t('auth.login')}</button>
```

### 3. Keep Translations Consistent

Use same term for same concept across app

### 4. Test All Languages

- [ ] Test text length (German is longer)
- [ ] Test date formats
- [ ] Test number formats
- [ ] Test right-to-left text (Arabic)

## Troubleshooting

### Issue: Translations Not Loading
**Solution**: Check JSON syntax, restart dev server

### Issue: Missing Key Shows Key Name
**Solution**: Add key to translation files

### Issue: Language Not Changing
**Solution**: Check i18n.changeLanguage() is called

### Issue: Layout Breaking with Long Text
**Solution**: Make text containers flexible

## Testing i18n

```typescript
test('renders text in English', () => {
  i18n.changeLanguage('en');
  render(<Home />);
  expect(screen.getByText('Popular')).toBeInTheDocument();
});

test('renders text in Indonesian', () => {
  i18n.changeLanguage('id');
  render(<Home />);
  expect(screen.getByText('Populer')).toBeInTheDocument();
});
```

## Performance

- **Bundle size**: ~10KB additional
- **Runtime cost**: Negligible
- **Load time**: Same as single language

## Deployment Considerations

1. **Browser Language Detection** - Works automatically
2. **Supported Languages** - Only en and id included
3. **SEO** - Consider language-specific URLs for SEO
4. **Analytics** - Track language preferences

## Resources

- [i18next Documentation](https://www.i18next.com/overview/getting-started)
- [react-i18next](https://react.i18next.com/)
- [Unicode CLDR](http://cldr.unicode.org/)

## Checklist

- [ ] i18n configured
- [ ] English translations added
- [ ] Indonesian translations added
- [ ] Language switcher working
- [ ] Preferences saved to localStorage
- [ ] All text uses translation keys
- [ ] Tested with both languages
- [ ] Special characters display correctly

---

**Your app now supports multiple languages! 🌍**

Add more languages anytime by following the steps above!
