# FitFlow Frontend — Flutter App

Cross-platform client for iOS, Android, and Web.

## Structure

```
lib/
├── app/             # Router (GoRouter), theme
├── features/
│   ├── auth/        # Login, signup (Amplify Cognito)
│   ├── dashboard/   # Home with rings, charts, today's plan
│   ├── workouts/    # Plan list, detail, session tracking
│   ├── nutrition/   # Macro tracker, meal log, food search
│   └── social/      # Feed, challenges, leaderboard
└── shared/          # Shell navigation, common widgets
```

## Running Locally

```bash
# Install dependencies
flutter pub get

# Run on connected device / Chrome
flutter run -d chrome          # Web
flutter run -d <device-id>    # iOS / Android

# Analyze
flutter analyze

# Test
flutter test
```

## Code generation

```bash
# After editing annotated classes (freezed, riverpod_generator, retrofit)
dart run build_runner build --delete-conflicting-outputs
```

## Environment / Configuration

Configure Amplify in `lib/app/amplify_config.dart` (gitignored).
See `amplifyconfiguration.dart` generated after `amplify pull`.
