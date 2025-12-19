# DevToolbox - Developer Utilities

A beautiful, modern collection of essential developer tools built with Next.js 14. Features JSON beautification, character counting, and more utilities - all running locally in your browser.

## ✨ Features

### Current Tools

- **JSON Beautifier & Validator**
  - ✓ Format JSON with proper indentation
  - ✓ Minify JSON for production
  - ✓ Validate JSON syntax with detailed error messages
  - ✓ Copy, download, and share formatted JSON

- **Character Counter**
  - ✓ Count total characters
  - ✓ Count characters without spaces
  - ✓ Word counter
  - ✓ Comma-separated items counter
  - ✓ Real-time statistics updates

### Design Features

- 🌓 Dark/Light mode with localStorage persistence
- 🎨 Modern, minimal UI with smooth animations
- 📱 Fully responsive design
- ⚡ Fast, client-side processing
- 🔒 Privacy-focused - all tools run locally

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- yarn package manager

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Run the development server:
   ```bash
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── page.js              # Main application with all tools
│   ├── layout.js            # Root layout with theme provider
│   ├── api/[[...path]]/     # API routes (health check)
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.jsx   # Theme context provider
└── lib/
    └── utils/               # Utility functions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**: Tailwind CSS + shadcn/ui components
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React

## 🎨 Features in Detail

### JSON Beautifier

Perfect for developers working with JSON data:
- Paste messy JSON and get perfectly formatted output
- Validate JSON structure before using in your code
- Minify JSON to reduce file size
- Export formatted JSON as a file

### Character Counter

Essential for content creators and developers:
- Get real-time character counts
- Count words in your text
- Perfect for comma-separated lists (tags, keywords, etc.)
- Export statistics as a text file

### Theme System

- Automatic system preference detection
- Manual toggle between light/dark modes
- Smooth transitions between themes
- Theme preference saved in localStorage

## 🔮 Coming Soon

- Base64 Encoder/Decoder
- URL Encoder/Decoder
- Hash Generator (MD5, SHA-256)
- Timestamp Converter
- Color Picker/Converter
- Regex Tester

## 📝 Usage Examples

### JSON Beautifier

```json
// Input (minified)
{"name":"John","age":30,"city":"New York"}

// Output (beautified)
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

### Character Counter

```
Input: apple, banana, orange, grape, mango

Results:
- Total Characters: 35
- Without Spaces: 31
- Words: 5
- Comma-Separated Items: 5
```

## 🚀 Deployment

Build for production:

```bash
yarn build
yarn start
```

The app is optimized for deployment on Vercel, Netlify, or any Node.js hosting platform.

## 📄 License

MIT

## 🤝 Contributing

This is a growing collection of developer tools. More utilities will be added regularly to help developers be more productive.

