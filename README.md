# Dictionary Search - Firefox Extension

![Version](https://img.shields.io/badge/version-1.0-blue)
![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange)
![License](https://img.shields.io/badge/license-MIT-green)

A powerful Firefox extension that adds context menu items for instant dictionary lookups and translations. Right-click any selected text to search dictionaries or translate with multiple services.

## ✨ Features

### 📖 Dictionary Search
- **SpanishDict**: Complete Spanish-English dictionary with examples and conjugations
- **Oxford Learner's Dictionaries**: Comprehensive English language dictionary
- **Thesaurus.com**: Find synonyms, antonyms, and related words

### 🌐 Translation Services
- **DeepL**: High-quality AI-powered translations
- **Reverso Context**: Contextual translations with real-world examples
- **Google Translate**: Fast translations with broad language support

### 🔧 Smart Configuration
- **Bidirectional Language Pairs**: Select once, translate in both directions
- **Native Language Names**: Authentic language names in their native scripts
- **Unified Selection**: Configure all translation services simultaneously
- **Search & Filter**: Quickly find language pairs in settings

### 🌍 Supported Languages
The extension supports 16 languages with authentic native names:

|thesaurus.com Language | Native Name | Code |
|----------|-------------|------|
| Arabic | العربية | ar |
| Chinese | 中文 | zh |
| Dutch | Nederlands | nl |
| English | English | en |
| French | Français | fr |
| German | Deutsch | de |
| Hebrew | עברית | he |
| Italian | Italiano | it |
| Japanese | 日本語 | ja |
| Korean | 한국어 | ko |
| Polish | Polski | pl |
| Portuguese | Português | pt |
| Romanian | Română | ro |
| Russian | Русский | ru |
| Spanish | Español | es |
| Turkish | Türkçe | tr |

## 📥 Installation

### From Firefox Add-ons (Recommended)
*Coming soon - extension will be published to Mozilla Add-ons store*

### Manual Installation (Development)
1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension directory

## 🚀 Usage

### Dictionary Search
1. Select any text on a webpage
2. Right-click to open the context menu
3. Choose from:
   - **Search in SpanishDict**
   - **Search in Oxford Learner's Dictionaries**
   - **Search in Thesaurus.com**

### Translation
1. Select text you want to translate
2. Right-click to open the context menu
3. Choose your preferred service:
   - **Translate with DeepL** → Select language pair
   - **Translate with Reverso Context** → Select language pair
   - **Translate with Google Translate** → Select language pair
4. The translation opens in a new tab with your text pre-filled

## ⚙️ Configuration

### Accessing Settings
- **Method 1**: Right-click the extension icon → "Options"
- **Method 2**: Go to `about:addons` → Find "Dictionary Search" → "Options"
- **Method 3**: Firefox Menu → Add-ons and Themes → Extensions → Dictionary Search → Options

### Setting Up Language Pairs
1. Open the extension options
2. Browse available language pairs (displayed with native names)
3. Check the boxes for pairs you want to enable
4. Use the search box to quickly find specific languages
5. Click "Save" to apply changes

**Example**: Checking "English ↔ Español" enables:
- English → Spanish translation
- Spanish → English translation  
- Available in all three services (DeepL, Reverso, Google)

### Default Configuration
The extension comes pre-configured with these bidirectional pairs:
- English ↔ Español
- English ↔ Русский  
- Español ↔ Русский

## 🎯 How It Works

### Context Menu Integration
The extension automatically adds relevant menu items when you select text:
- Dictionary searches are always available
- Translation options appear only for configured language pairs
- Menus are organized hierarchically for easy navigation

### Smart URL Generation
Each service uses optimized URL patterns:
```
SpanishDict: https://www.spanishdict.com/translate/{text}
Oxford: https://www.oxfordlearnersdictionaries.com/definition/english/{text}
Thesaurus: https://www.thesaurus.com/browse/{text}
DeepL: https://www.deepl.com/translator#{from}/{to}/{text}
Reverso: https://context.reverso.net/translation/{from}-{to}/{text}
Google: https://translate.google.com/?sl={from}&tl={to}&text={text}
```

## 🛠️ Development

### Project Structure
```
firefox-spanishdict/
├── manifest.json      # Extension manifest
├── background.js      # Context menu logic & URL handling
├── options.html       # Settings page UI
├── options.js         # Settings page logic
└── README.md         # This file
```

### Key Files
- **manifest.json**: Extension metadata and permissions
- **background.js**: Context menu creation and click handling
- **options.js**: Language configuration and storage management
- **options.html**: User interface for settings

### Technologies Used
- **Manifest V2**: Firefox extension framework
- **WebExtensions API**: Cross-browser extension standard
- **JavaScript ES6+**: Modern JavaScript features
- **Browser Storage API**: Persistent settings storage
- **Context Menus API**: Right-click menu integration

### Building & Testing
1. Make changes to the source files
2. Test in Firefox using temporary add-on installation
3. Verify all translation services work correctly
4. Test configuration changes persist across browser restarts

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Adding New Languages
1. Add language entry to `languages` array in `options.js`
2. Include native name (autonym) and service-specific codes
3. Test with all three translation services

### Adding New Services
1. Update `background.js` with new URL pattern
2. Add menu creation logic
3. Extend language codes if needed
4. Update options UI accordingly

### Bug Reports
Please include:
- Firefox version
- Extension version
- Steps to reproduce
- Expected vs actual behavior

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SpanishDict**: Comprehensive Spanish-English dictionary
- **Oxford University Press**: Oxford Learner's Dictionaries
- **Thesaurus.com**: Synonym and antonym database
- **DeepL**: Advanced AI translation technology
- **Reverso**: Contextual translation examples
- **Google Translate**: Universal translation service

---

**Made with ❤️ for language learners and international communication**
