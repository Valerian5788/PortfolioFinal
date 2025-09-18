# Twitter Analyzer

A full-stack application that automatically collects tweets from X (formerly Twitter) using a Chrome browser extension and analyzes them using a .NET Web API backend for sentiment classification.

## 🚀 Overview

Twitter Analyzer demonstrates full-stack development capabilities by combining:
- **Chrome Browser Extension** for real-time tweet collection
- **ASP.NET Core Web API** for tweet classification and analysis
- **Automatic data pipeline** from browser to backend service

## 🛠️ Tech Stack

### Backend
- **.NET 8** - Latest .NET framework
- **ASP.NET Core** - Web API framework
- **Swagger/OpenAPI** - API documentation
- **HttpClient** - External service integration

### Frontend/Extension
- **JavaScript (ES6+)** - Browser extension logic
- **Chrome Extension Manifest v3** - Latest extension standard
- **Chrome Storage API** - Local data persistence
- **MutationObserver API** - DOM change detection

## 📋 Features

### Chrome Extension
- 🔍 **Automatic Tweet Detection** - Monitors X.com for new tweets using DOM observation
- 💾 **Local Storage** - Saves tweets in browser storage with duplicate prevention
- 🎯 **Real-time Collection** - Captures tweets as users scroll through their timeline
- 🧹 **Storage Management** - Clear stored tweets functionality

### Backend API
- 📊 **Tweet Classification** - RESTful endpoint for analyzing tweet sentiment
- 🔗 **External Service Integration** - Connects to ML classification service
- 📖 **API Documentation** - Swagger UI for endpoint testing
- ⚡ **Async Processing** - Non-blocking request handling

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   X.com Page    │    │  Chrome Extension │    │  .NET Web API   │
│                 │    │                  │    │                 │
│  Tweet Content  │───▶│  Content Script   │───▶│ /api/tweets/    │
│                 │    │  Background.js    │    │  classify       │
│                 │    │  Popup UI         │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │ Chrome Storage   │    │ ML Classification│
                       │ Local Tweets     │    │ Service         │
                       └──────────────────┘    │ (localhost:5001)│
                                               └─────────────────┘
```

## 📁 Project Structure

```
TwitterAnalyzer/
├── Controllers/
│   └── TweetsController.cs      # API endpoints for tweet classification
├── Models/
│   └── TweetRequest.cs          # Data transfer objects
├── twitter-analyzer-extension/
│   ├── manifest.json            # Extension configuration
│   ├── background.js            # Service worker for tweet processing
│   ├── content.js               # DOM monitoring and tweet extraction
│   ├── popup.html               # Extension popup interface
│   ├── popup.js                 # Popup functionality
│   └── styles.css               # Extension styling
├── Program.cs                   # Application entry point
└── TwitterAnalyzer.csproj       # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Google Chrome** browser
- **ML Classification Service** running on localhost:5001 (see Configuration)

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TwitterAnalyzer
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the application**
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:7295`

4. **Access Swagger UI**
   Navigate to `https://localhost:7295/swagger` for API documentation

### Chrome Extension Setup
1. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"

2. **Load the extension**
   - Click "Load unpacked"
   - Select the `twitter-analyzer-extension` folder

3. **Verify installation**
   - Extension icon should appear in Chrome toolbar
   - Click icon to open popup interface

## 🎯 Usage

1. **Start the backend API** (`dotnet run`)
2. **Install the Chrome extension** (see setup above)
3. **Browse X.com** - Extension automatically collects tweets
4. **View collected tweets** - Click extension icon → "View Tweets"
5. **Analyze tweets** - Click "Analyze Tweets" to send to API for classification

## 🔧 Configuration

### ML Classification Service
The application expects a classification service running on `localhost:5001` with endpoint:
- **POST** `/classify`
- **Body**: `{ "tweets": ["tweet1", "tweet2"] }`
- **Response**: Array of classification results

### API Endpoints

#### POST /api/tweets/classify
Classifies a collection of tweets using external ML service.

**Request Body:**
```json
{
  "tweets": [
    "This is a sample tweet",
    "Another tweet to analyze"
  ]
}
```

**Response:**
```json
[
  "positive",
  "negative"
]
```

## 🔒 Security Considerations

- No hardcoded credentials or API keys
- HTTPS used for production API calls
- Chrome extension permissions limited to necessary scope
- Input sanitization recommended for production use

## 🚧 Future Enhancements

- [ ] Database persistence for tweet storage
- [ ] User authentication and authorization
- [ ] Advanced sentiment analysis with confidence scores
- [ ] Tweet export functionality (CSV, JSON)
- [ ] Real-time analytics dashboard
- [ ] Rate limiting and API throttling
- [ ] Advanced filtering and search capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

This project demonstrates proficiency in:
- **Full-stack development** with .NET and JavaScript
- **Browser extension development** with modern APIs
- **RESTful API design** and implementation
- **Asynchronous programming** patterns
- **Chrome Extensions Manifest v3** compliance
- **Modern development practices** and clean architecture

---

*Built with ❤️ for learning and demonstration purposes*