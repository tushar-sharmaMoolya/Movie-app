# 📱 Progressive Web App (PWA) Guide

## Turn Your App into a Native-Like Experience

Your app is now a PWA! Users can install it on their home screen like a native app.

## What is a PWA?

Progressive Web Apps combine the best of web and mobile apps:

✅ **Works Offline** - Service Worker caching  
✅ **Installable** - Add to home screen  
✅ **Fast** - Instant loading  
✅ **Reliable** - Works even on poor networks  
✅ **Responsive** - Mobile, tablet, desktop  

## Installation Guide

### On Mobile (iOS)

1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Enter app name
5. Tap "Add"

### On Mobile (Android)

1. Open app in Chrome
2. Tap menu (⋮)
3. Select "Install app" or "Add to Home Screen"
4. Confirm installation

### On Desktop (Chrome)

1. Open app in Chrome
2. Click install icon (top-right corner)
3. Confirm to install
4. App launches in separate window

## How PWA Features Work

### 1. Web App Manifest (`public/manifest.json`)

Tells browser how to display your app:

```json
{
  "name": "CineHub",
  "short_name": "CineHub",
  "display": "standalone",
  "start_url": "/",
  "background_color": "#0f0f0f",
  "theme_color": "#e50914",
  "icons": [...]
}
```

**Key Settings:**
- `display: "standalone"` - Show as native app (no browser UI)
- `start_url` - Page to load on launch
- `theme_color` - Browser address bar color
- `icons` - App icons for home screen

### 2. Service Worker (`public/service-worker.js`)

Runs in background, handles:

```javascript
// Cache files for offline access
// Sync data when back online
// Show notifications
```

**Key Features:**
- Caches app shell and assets
- Serves from cache when offline
- Updates cache when online
- Handles fetch events

### 3. HTTPS Requirement

PWAs only work on HTTPS:

- ✅ Production: Automatic with Netlify, Vercel
- ✅ localhost: Works for testing
- ❌ HTTP: Won't work for PWA features

## Features Included

### Offline Support

Files are cached automatically:

```javascript
// On first visit:
1. Download files
2. Store in cache
3. Users can access offline

// On revisit:
1. Serve from cache
2. Update cache in background
3. No network needed
```

### Installation

Users can install like native apps:
- Home screen icon
- App shortcuts
- Standalone window
- Works offline

### Splash Screen

Custom splash shown during loading:
- Uses icon and theme color
- Shows while app launches
- Professional appearance

### Responsive Design

Already included:
- Mobile-first design
- Touch-friendly interface
- Scales to all screen sizes

## Checking PWA Status

### Chrome DevTools

1. Open DevTools (F12)
2. Go to "Application" tab
3. Check:
   - ✅ Manifest loads
   - ✅ Service Worker registered
   - ✅ Cache populated
   - ✅ HTTPS enabled

### Lighthouse Audit

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Check PWA score

Target score: **90+**

## Customization

### Change App Name

Edit `public/manifest.json`:

```json
{
  "name": "My App Name",
  "short_name": "MyApp"
}
```

### Change Colors

Edit `public/manifest.json`:

```json
{
  "background_color": "#ffffff",
  "theme_color": "#0066cc"
}
```

Also update `public/index.html`:

```html
<meta name="theme-color" content="#0066cc">
```

### Add Custom Icons

Replace in `public/manifest.json`:

```json
{
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Add icon files to `public/` folder.

### Add App Shortcuts

In `manifest.json`:

```json
{
  "shortcuts": [
    {
      "name": "Search Movies",
      "short_name": "Search",
      "description": "Search for movies",
      "url": "/search",
      "icons": [...]
    }
  ]
}
```

## Cache Strategy

### Current Strategy: Cache First

```
User visits:
1. Check cache
2. If found → serve from cache
3. If not → fetch from network
4. Save to cache for next time
```

### Update Strategy

To cache bust (force update):

```javascript
// Increment cache version
const CACHE_NAME = 'cinehub-v2'; // Changed from v1
```

This clears old cache and downloads new files.

## API Requests

### API calls always use network

These bypass cache (intentional):
- TMDB API calls
- Firebase requests
- Real-time data

```javascript
// In service-worker.js
if (event.request.url.includes('themoviedb.org')) {
  return; // Skip caching
}
```

## Testing PWA Features

### Test Offline

1. Open DevTools (F12)
2. Go to Application → Service Workers
3. Check "Offline" checkbox
4. Try navigating app
5. Most features still work!

### Test on Device

1. Deploy to Netlify/Vercel
2. Open on phone
3. Install app
4. Test offline mode
5. Check performance

## Performance Metrics

### Bundle Sizes

- Main JS: ~50KB
- CSS: ~30KB
- Total: ~80KB

### Load Times

- First load: ~2-3 seconds
- Cached load: <1 second
- Offline: Instant

## Deployment Checklist

- [ ] HTTPS enabled
- [ ] manifest.json complete
- [ ] Service Worker registered
- [ ] Icons included
- [ ] App name set
- [ ] Theme color matches
- [ ] Works offline
- [ ] Installable
- [ ] Fast (Lighthouse 90+)
- [ ] Responsive (mobile tested)

## Troubleshooting

### Issue: "Add to Home Screen" not showing

**Solution:**
- Check HTTPS is enabled
- Verify manifest.json is valid
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check manifest has icons

### Issue: Service Worker not updating

**Solution:**
1. Clear browser cache
2. Increment CACHE_NAME
3. Hard refresh
4. Uninstall and reinstall app

### Issue: Offline mode not working

**Solution:**
1. Check Service Worker is registered
2. Verify files are in cache
3. Check Network tab in DevTools
4. Look for errors in console

### Issue: App crashes offline

**Solution:**
1. Handle API errors gracefully
2. Show offline message
3. Cache important data
4. Provide offline alternatives

## Advanced Features

### Background Sync

Sync data when back online:

```javascript
// In service-worker.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavoritesWithServer());
  }
});
```

### Push Notifications

Send notifications to users:

```javascript
self.registration.showNotification('Movie Released!', {
  body: 'New movie added to your watchlist',
  icon: '/icon.png'
});
```

### App Updates

Notify users when app updates:

```javascript
// Check for updates
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});
```

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Service Workers](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps)
- [Workbox (Advanced)](https://developers.google.com/web/tools/workbox)

## Next Steps

1. Test on device ✅
2. Install app ✅
3. Test offline mode ✅
4. Check Lighthouse score ✅
5. Deploy to production ✅

---

**Your app is now a Progressive Web App! 🚀**

Users can install and use it like a native app!
