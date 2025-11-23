# LoveChatReply 💕

A React Native mobile application for crafting romantic messages, pickup lines, and managing your love story. Get relationship advice, tips, and AI-powered message suggestions to strengthen your bonds.

## Features

- **Settings Screen**: Customize your experience with language, tone, and message length preferences
- **Tips & Advice**: Browse curated articles on communication, date ideas, and relationship guidance
- **Welcome Dialog**: Personalized daily love message prompts
- **Message Crafting**: AI-powered romantic message generation (coming soon)
- **Notification Reminders**: Stay connected with reply reminders

## Tech Stack

- React Native 0.72.0
- React Navigation 6.x
- React Native Vector Icons
- React Native Gesture Handler

## Project Structure

```
lovechatreply/
├── src/
│   ├── screens/
│   │   ├── SettingsScreen.js
│   │   └── TipsAdviceScreen.js
│   ├── components/
│   │   ├── WelcomeDialog.js
│   │   └── SettingItem.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── constants/
│       └── colors.js
├── App.js
├── index.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lovechatreply.git
cd lovechatreply
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npm run ios
# or
react-native run-ios
```

#### Android
```bash
npm run android
# or
react-native run-android
```

## Screens

### Settings Screen
Customize your app experience with:
- Default language selection
- Message tone (Romantic, Friendly, Playful)
- Default message length
- Notification preferences
- Privacy controls

### Tips & Advice Screen
Browse relationship advice articles:
- Communication tips
- Date ideas
- Conflict resolution guides
- App usage guides

### Welcome Dialog
Daily personalized prompts to help you craft meaningful messages to your loved ones.

## Color Scheme

The app uses a romantic pink/red color palette:
- Primary: `#FF1744` (Red/Pink)
- Primary Light: `#FFB3C1`
- Primary Ultra Light: `#FCE4EC`
- Background: `#F5F5F5`

## Future Features

- [ ] AI-powered message generation
- [ ] Custom pickup line database
- [ ] Relationship milestone tracker
- [ ] Message scheduling
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Message history and favorites

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Made with ❤️ for love 
