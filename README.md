# 🍅 Pymoro

A minimal Pomodoro timer desktop application built with Electron and Tailwind CSS.

## ✨ Features

- **Pomodoro Timer**: Focus sessions (25 min), short breaks (5 min), and long breaks (15 min)
- **Smart Cycling**: Automatically cycles through 4 focus sessions before triggering a long break
- **Desktop Notifications**: System notifications with audio alerts when sessions change
- **Cross-Platform**: Builds for Windows, macOS, and Linux

## 📦 Installation

You can download the installer for Windows from [latest release](https://codeberg.org/cherrblyria/pymoro/releases/latest).

*MacOS & Linux soon.*

### From source

1. Clone the repository:
   ```bash
   git clone https://codeberg.org/cherrblyria/pymoro.git
   cd pymoro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the Tailwind CSS:
   ```bash
   npx @tailwindcss/cli -i ./src/styles.css -o ./src/app.css --watch
   ```
   (Omit `--watch` for a one-time build)

4. Build the application:
   ```bash
   npm run build
   ```

The built executable will be in the `dist` folder.

## ⚒️ Development

Run the app in development mode:
```bash
npm run start
```

## 📜 License

```
MIT License

Copyright (c) 2026 cherrblyria
```
