# Expo + CodeRabbit Demo

<strong>Example application demonstrating how to use Expo with CodeRabbit for automated pull request reviews.</strong>

## 🚀 How to use

- Install packages with `npm install`.
- Run `npx expo start --web` to start the bundler in web mode.
- Open the app in your browser at [http://localhost:8081](http://localhost:8081).

Optionally:
- Open the project in Expo Go app:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  

## 🤖 CodeRabbit Integration

This project demonstrates integration with [CodeRabbit](https://coderabbit.ai/), an AI-powered code review platform that automatically reviews pull requests.

### Features

- **Automated Code Reviews**: CodeRabbit analyzes your pull requests and provides intelligent feedback
- **Expo-Specific Insights**: Optimized for React Native and Expo projects
- **Continuous Learning**: Improves suggestions based on your codebase patterns

### How It Works

1. Create a pull request in this GitHub repository
2. CodeRabbit automatically analyzes the changes
3. Receive detailed feedback and suggestions as PR comments
4. Iterate on the feedback and improve your code

For more information, visit the [CodeRabbit documentation](https://docs.coderabbit.ai/).

## 🎯 Demo Pull Requests

This repository includes several demonstration pull requests showcasing different CodeRabbit review scenarios:

### [PR #2: Clean Implementation](https://github.com/HadesArchitect/ExpoPlusCodeRabbit/pull/2)
**Status**: Open | **Type**: Good PR with Minor Issues

A well-implemented "Clear Sticker" button feature that demonstrates CodeRabbit's ability to:
- Provide helpful nitpicks for code improvements
- Identify accessibility concerns (e.g., touch target sizes for mobile)
- Give constructive feedback on clean code

**What CodeRabbit Catches**: Style improvements, accessibility warnings, and best practices based on project guidelines.

### [PR #4: Memory Leak Bug](https://github.com/HadesArchitect/ExpoPlusCodeRabbit/pull/4)
**Status**: Open | **Type**: Intentional Bug Demonstration

The same feature as PR #2, but includes a subtle memory leak bug:
- Adds `clearedStickersHistory` ref that stores cleared stickers
- Array grows unbounded without cleanup mechanism
- Appears intentional (prepared for "future undo feature")

**What CodeRabbit Cought**: Memory leak from unbounded array growth, missing cleanup strategy, potential memory exhaustion.

### [PR #5: Blocking Review Workflow](https://github.com/HadesArchitect/ExpoPlusCodeRabbit/pull/5)
**Status**: Blocked | **Type**: Blocked PR Demonstration

Same changes as PR #4, but with `request_changes_workflow: true` enabled:
- CodeRabbit will request changes and block merging
- Demonstrates enforcement of code quality standards
- PR cannot be merged until issues are resolved

**Purpose**: Shows CodeRabbit's ability to act as a gatekeeper, preventing problematic code from being merged.

## 📝 Notes

This app is based on the **StickerSmash** example from the [Expo tutorial](https://docs.expo.dev/tutorial/introduction/).
