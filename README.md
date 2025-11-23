# HeartReply ❤️

![HeartReply Logo](assets/images/logo.png)

**HeartReply** is a React Native mobile application that helps you craft perfect replies for your romantic relationships. Whether you need a sweet response, a flirty starter, or a heartfelt apology, HeartReply has you covered!

## 🌟 Features

### Core Features
- **AI-Powered Reply Generation**: Get 3 smart, contextual reply suggestions based on your situation
- **Context-Aware Responses**: Customize replies based on:
  - Relationship stage (New, Dating, Long-term, Long-distance)
  - Tone (Sweet, Playful, Bold, Romantic, Apology, Repair)
  - Language preference
  - Message length (Short, Medium, Long)
  - Emoji inclusion

### Quick Actions
- **Flirty Starters**: Pre-written conversation starters for different moods
- **Apology Guide**: Heartfelt apologies with tips on making things right
- **Chat History**: Keep track of your recent conversations

### Additional Features
- **Multi-language Support**: Generate replies in English, Arabic, Urdu, Hindi, Spanish, French, and more
- **Voice Input**: (Coming soon) Speak your message instead of typing
- **Privacy First**: Your chats are not stored on servers - everything stays on your device
- **Beautiful UI**: Clean, modern interface with a lovely pink/coral theme

## 📱 Screenshots

| Onboarding | Home Screen | Reply Generator |
|------------|-------------|-----------------|
| ![Onboarding](assets/images/screenshots/onboarding.png) | ![Home](assets/images/screenshots/home.png) | ![Generator](assets/images/screenshots/generator.png) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- React Native development environment
  - For iOS: Xcode
  - For Android: Android Studio

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

3. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

4. Run the app:

For iOS:
```bash
npm run ios
# or
yarn ios
```

For Android:
```bash
npm run android
# or
yarn android
```

## 🏗️ Project Structure

```
lovechatreply/
├── src/
│   ├── screens/
│   │   ├── Onboarding/
│   │   │   ├── OnboardingScreen1.js
│   │   │   ├── OnboardingScreen2.js
│   │   │   └── OnboardingScreen3.js
│   │   ├── Home/
│   │   │   └── HomeScreen.js
│   │   ├── NewChat/
│   │   │   └── NewChatScreen.js
│   │   ├── ReplyOptions/
│   │   │   └── ReplyOptionsScreen.js
│   │   ├── FlirtyStarters/
│   │   │   └── FlirtyStartersScreen.js
│   │   └── ApologyGuide/
│   │       └── ApologyGuideScreen.js
│   ├── services/
│   │   ├── StorageService.js
│   │   └── ReplyService.js
│   ├── utils/
│   │   ├── languages.js
│   │   └── voice.js
│   ├── theme/
│   │   └── colors.js
│   └── App.js
├── assets/
│   └── images/
├── package.json
└── README.md
```

## 🎨 Tech Stack

- **Framework**: React Native 0.73
- **Navigation**: React Navigation v6
- **Storage**: AsyncStorage
- **UI Components**: Custom components with React Native core
- **State Management**: React Hooks

## 🔮 Upcoming Features

- [ ] AI Integration (OpenAI/Anthropic API)
- [ ] Voice input support
- [ ] Text-to-speech for replies
- [ ] Advanced language translation
- [ ] Relationship advice tips
- [ ] Daily conversation prompts
- [ ] Share replies to social apps
- [ ] Dark mode
- [ ] Custom tone creation
- [ ] Save favorite replies

## 🔧 Configuration

### Adding AI Integration

To integrate with an AI service (OpenAI, Anthropic, etc.):

1. Get your API key from the provider
2. Create a `.env` file in the root:
```env
AI_API_KEY=your_api_key_here
AI_API_URL=https://api.openai.com/v1
```

3. Update `src/services/ReplyService.js` to use the API instead of mock data

### Language Support

Add new languages in `src/utils/languages.js`:
```javascript
{ id: 'japanese', label: '日本語', code: 'ja' }
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Design inspiration from modern dating and messaging apps
- Icons and illustrations from various open-source resources
- Community feedback and feature suggestions

## 📞 Support

For support, email support@heartreply.app or open an issue on GitHub.

---

Made with ❤️ for better conversations
