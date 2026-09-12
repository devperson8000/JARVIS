# A.R.C. — Voice Command Center

A cinematic, voice-activated desktop assistant inspired by futuristic film interfaces. It includes an original identity and voice direction rather than copying a character or actor.

## Features

- Wake phrase: **“Jarvis”** (changeable in Settings)
- Continuous speech recognition and spoken replies
- Automatically prefers an installed British English voice
- Optional AI answers through a server-side OpenAI key
- Local commands for time, date, weather, calculations, timers, notes, memory, search, and website shortcuts
- Animated command-center HUD, live clock, activity log, audio visualizer, keyboard shortcuts, and persistent settings
- No API key is ever exposed to browser code

## Run on macOS

1. Install Node.js 18 or newer.
2. In Terminal, open this project folder.
3. Run `npm install`.
4. Optional: copy `.env.example` to `.env` and add an OpenAI API key.
5. Run `npm start`.
6. Open `http://localhost:3000` in Chrome and allow microphone access.

Without an API key, every built-in command still works. Voice recognition is best in Chrome or Edge. Browsers require the first microphone activation to come from a click.

## Example commands

- “Jarvis, what time is it?”
- “Jarvis, weather in Melbourne”
- “Jarvis, set a timer for five minutes”
- “Jarvis, remember my project is called Atlas”
- “Jarvis, what do you remember?”
- “Jarvis, calculate 24 times 18”
- “Jarvis, search for the latest space news”
- “Jarvis, open YouTube”

## Privacy

Built-in commands run locally. Notes, settings, and memory are stored only in the browser with `localStorage`. AI-mode messages are sent to the configured API through the local server. Microphone recognition uses the browser's speech-recognition service and depends on the browser/platform.
