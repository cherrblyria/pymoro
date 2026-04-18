# 🍅 Pymoro

A minimal Pomodoro timer desktop application built with Electron and Tailwind CSS.

## ✨ Features

- **Pomodoro Timer**: Focus sessions (25 min), short breaks (5 min), and long breaks (15 min)
- **Smart Cycling**: Automatically cycles through 4 focus sessions before triggering a long break
- **Desktop Notifications**: System notifications with audio alerts when sessions change
- **Cross-Platform**: Builds for Windows, macOS, and Linux

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cherrblyria/pymoro.git
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
npm start
```

## 📜 License

MIT
