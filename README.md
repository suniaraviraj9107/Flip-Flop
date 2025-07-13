# Memory Matrix 🧠

A modern, responsive memory card matching game built with React and TypeScript. Test your memory skills across three difficulty levels with a beautiful, accessible interface.

![Memory Matrix Game](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-green)

## 🎮 Live Demo

[Play Memory Matrix](your-deployed-url-here) *(Add your deployment URL)*

## ✨ Features

- **Three Difficulty Levels**: Easy (4 pairs), Medium (8 pairs), Hard (12 pairs)
- **Real-time Statistics**: Track moves, time, and personal best records
- **Persistent Progress**: Best times saved locally for each difficulty
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern UI**: Clean, animated interface with smooth card flip effects
- **Performance Optimized**: Built with React hooks and TypeScript for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/memory-matrix.git
cd memory-matrix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

1. **Choose Difficulty**: Select Easy, Medium, or Hard difficulty level
2. **Flip Cards**: Click on cards to reveal the symbols underneath
3. **Find Matches**: Match pairs of identical symbols
4. **Track Progress**: Monitor your moves and time as you play
5. **Beat Your Record**: Try to complete the game in fewer moves and less time

## 🛠️ Technical Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 5.7.2
- **Build Tool**: Vite 6.3.5
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Hooks (useState, useEffect, useCallback, useMemo)
- **Local Storage**: For persistent best time tracking
- **Accessibility**: ARIA labels and semantic HTML

## 📁 Project Structure

```
memory-matrix/
├── src/
│   └── index.tsx          # Main game component and logic
├── public/
│   └── index.html         # HTML template with embedded CSS
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md             # Project documentation
```

## 🎨 Key Features Implementation

### Game Logic
- **Card Shuffling**: Fisher-Yates algorithm for random card placement
- **Match Detection**: Efficient pair matching with visual feedback
- **Timer System**: Accurate time tracking with pause/resume functionality
- **Move Counting**: Precise move tracking for performance metrics

### User Experience
- **Flip Animations**: Smooth CSS transitions for card interactions
- **Visual Feedback**: Clear indication of matched, flipped, and selectable cards
- **Responsive Grid**: Dynamic grid layout adapting to screen size
- **Loading States**: Proper handling of game state transitions

### Performance Optimizations
- **React.memo**: Optimized re-renders for card components
- **useCallback**: Memoized event handlers
- **useMemo**: Computed values for difficulty configurations
- **Efficient State Updates**: Batched state changes for smooth gameplay

## 🌟 Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Comprehensive ARIA labels and roles
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Colors optimized for visual accessibility
- **Semantic HTML**: Proper HTML structure for assistive technologies

## 📊 Game Statistics

The game tracks and displays:
- **Move Count**: Number of card flips made
- **Timer**: Real-time game duration
- **Best Time**: Personal record for each difficulty level
- **Completion Status**: Win condition detection and celebration

## 🎯 Future Enhancements

- [ ] Multiplayer mode with real-time synchronization
- [ ] Additional themes and card symbol sets
- [ ] Global leaderboards and achievements
- [ ] Sound effects and background music
- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced statistics and analytics
- [ ] Custom difficulty settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

## 🙏 Acknowledgments

- Inspired by classic memory card games
- Emoji symbols provided by Unicode Consortium
- Built with modern React and TypeScript best practices
- UI design influenced by contemporary game interfaces

---

⭐ **If you found this project helpful, please consider giving it a star!** ⭐
