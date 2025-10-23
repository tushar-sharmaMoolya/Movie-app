# 🔥 Firebase Integration Guide

## Setup Firebase for Your App

This guide explains how to integrate Firebase for authentication, Firestore database, and analytics.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `CineHub`
4. Accept terms and create project
5. Wait for project to be created

## Step 2: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" to create a web app
4. Register app with nickname `CineHub`
5. Copy the config object

Your config looks like:
```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
}
```

## Step 3: Add Environment Variables

Create `.env.local` file and add:

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
REACT_APP_TMDB_API_KEY=YOUR_TMDB_KEY
```

## Step 4: Enable Authentication Methods

1. In Firebase Console, go to Authentication
2. Click "Get started"
3. Enable "Email/Password" provider
4. Enable "Google" provider
5. Enable "Facebook" provider

### For Facebook Login:
1. Create Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Get App ID and App Secret
3. In Firebase, add Facebook credentials

## Step 5: Setup Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select location (closest to you)
5. Create database

### Create User Collection Rules

In Firestore Rules, replace with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    match /favorites/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

## Step 6: Enable Analytics

1. In Firebase Console, go to Analytics
2. Enable Google Analytics
3. Create new Google Analytics property
4. Accept terms and create

## Step 7: Update Your App

The app now uses Firebase! Key files:

- `src/config/firebase.ts` - Firebase configuration
- `src/context/FirebaseAuthContext.tsx` - Authentication
- `src/i18n/config.ts` - Internationalization

## Usage in Components

### Login with Firebase

```typescript
import { useFirebaseAuth } from '../context/FirebaseAuthContext';

export const LoginComponent = () => {
  const { loginWithGoogle, loginWithEmail } = useFirebaseAuth();
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // User logged in!
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};
```

### Track Events with Analytics

```typescript
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

// Track custom event
logEvent(analytics, 'movie_viewed', {
  movie_id: 12345,
  rating: 8.5
});
```

### Access User Data

```typescript
import { useFirebaseAuth } from '../context/FirebaseAuthContext';

export const UserProfile = () => {
  const { currentUser } = useFirebaseAuth();
  
  return <div>Welcome, {currentUser?.displayName}</div>;
};
```

## Firebase Security Rules

### For Users Collection

```firestore
allow create: if request.auth != null;
allow read, update, delete: if request.auth.uid == resource.data.uid;
```

### For Favorites Collection

```firestore
allow create: if request.auth != null;
allow read, update, delete: if request.auth.uid == userId;
allow list: if request.auth != null;
```

## Troubleshooting

### Issue: CORS Error
**Solution**: Check Firebase origin is allowed in Console

### Issue: Auth not working
**Solution**: Verify provider is enabled in Firebase Console

### Issue: Firestore rules blocking access
**Solution**: Check rules match your user ID

### Issue: Analytics not tracking
**Solution**: Wait a few minutes for data to appear in console

## Next Steps

1. Test authentication flows locally
2. Create test users
3. Verify Firestore data structure
4. Monitor analytics dashboard
5. Deploy to production

## Cost Considerations

Firebase Free Tier includes:
- ✅ Authentication (unlimited)
- ✅ Firestore (1 GB storage)
- ✅ Analytics (unlimited)
- ✅ Hosting (1 GB/month)

For production, consider:
- Payment method for scaling
- Firestore indexes for queries
- Security rules optimization

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Database](https://firebase.google.com/docs/firestore)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)

---

**Firebase is now integrated! Your app is ready for production!** 🎉
