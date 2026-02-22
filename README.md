# MoviesApp

React Native app that consumes [The Movie Database (TMDB)](https://www.themoviedb.org/) API to browse movies.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native 0.84 |
| Language | TypeScript |
| Navigation | React Navigation 7 — Stack Navigator |
| Screens | react-native-screens |
| Gestures | react-native-gesture-handler |
| Safe Area | react-native-safe-area-context |

---

## Prerequisites

Before you start, make sure your machine has the full React Native environment configured:

- [React Native — Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)
- **Node** >= 22.11.0
- **JDK** >= 17 (for Android)
- **Android Studio** with an emulator configured (or a physical device with USB debugging enabled)
- **Xcode** 15+ (macOS only, for iOS)

---

## Getting Started

### 1. Clone the repository

```sh
git clone <repo-url>
cd 06-moviesapp
```

### 2. Install JS dependencies

```sh
npm install
```

### 3. Configure environment variables

Copy the template and fill in your TMDB API key:

```sh
cp ".env template" .env
```

Edit `.env`:

```env
# Get your key at https://www.themoviedb.org/settings/api
THE_MOVIE_DB_KEY=your_api_key_here
```

### 4. Install iOS pods (macOS only)

Run this on first clone and any time native dependencies change:

```sh
bundle install          # only needed once to install CocoaPods itself
bundle exec pod install
```

---

## Running the App

> Metro and the app build are started in two separate terminals.

### Terminal 1 — Start Metro bundler

```sh
npm start
```

### Terminal 2 — Launch on device/emulator

**Android**
```sh
npm run android
```

**iOS** (macOS only)
```sh
npm run ios
```

If everything is set up correctly the app will open automatically in the emulator or connected device.

---

## Project Structure

```
src/
├── App.tsx                          # Root component — mounts NavigationContainer
├── config/
│   ├── adapters/                    # HTTP / external service adapters
│   └── helpers/                     # Utility helpers
├── core/                            # Domain entities & use-cases
├── infrastructure/                  # Repository implementations
└── presentation/
    ├── components/                  # Shared UI components
    ├── hooks/                       # Custom React hooks
    ├── navigation/
    │   └── Navigation.tsx           # Stack navigator (Home → Details)
    └── screens/
        ├── home/
        │   └── HomeScreen.tsx
        └── details/
            └── DetailsScreen.tsx
```

---

## Developer Tips

### Fast Refresh

Changes to JS/TS files are reflected instantly without losing component state — no action needed.

### Force reload

| Platform | Shortcut |
|---|---|
| Android emulator | `R` `R` or `Ctrl+M` → Reload |
| Android device | Shake → Reload |
| iOS Simulator | `Cmd+R` |
| iOS device | Shake → Reload |

### Clear Metro cache

If you run into stale bundle issues:

```sh
npm start -- --reset-cache
```

### Reset Android build

```sh
cd android && ./gradlew clean && cd ..
npm run android
```

---

## Troubleshooting

- General issues → [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)
- Metro not starting → make sure no other process is running on port 8081
- Android build failing → verify `ANDROID_HOME` and `JAVA_HOME` environment variables are set correctly
