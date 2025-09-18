# BlogPictures - AI-Powered Blog Content Assistant

An intelligent web application that analyzes blog content and suggests strategic image placements using OpenAI's GPT models. Built with modern .NET technologies to help content creators enhance their articles with well-positioned visual elements.

## 🚀 Features

- **AI-Powered Analysis**: Uses OpenAI GPT-3.5-turbo to analyze blog text content
- **Smart Image Suggestions**: Provides detailed descriptions and context for suggested image placements
- **Strategic Positioning**: Identifies optimal locations within your content for maximum engagement
- **Modern UI**: Clean, responsive interface built with MudBlazor components
- **Real-time Processing**: Fast analysis with loading indicators
- **Preview Mode**: Visual preview of your content with suggested image positions
- **Export Ready**: Foundation for HTML export functionality (development in progress)

## 🏗️ Architecture

### Frontend (BlogPicturesFront)
- **Framework**: Blazor WebAssembly (.NET 9)
- **UI Components**: MudBlazor
- **Architecture**: Component-based with service layer
- **Hosting**: Client-side rendering

### Backend (BlogPicturesBack)
- **Framework**: ASP.NET Core Web API (.NET 8)
- **AI Integration**: OpenAI API with Betalgo.OpenAI client
- **Architecture**: Clean architecture with Controllers, Services, DTOs
- **Features**: CORS support, error handling middleware, Swagger documentation

## 🛠️ Technology Stack

### Backend Dependencies
- **.NET 8**: Modern C# features and performance
- **OpenAI API Integration**:
  - `Betalgo.OpenAI` (v8.7.2)
  - `OpenAI` (v2.1.0)
- **API Documentation**: Swashbuckle.AspNetCore (v7.2.0)

### Frontend Dependencies
- **.NET 9**: Latest framework features
- **Blazor WebAssembly**: Client-side web assembly execution
- **MudBlazor**: Material Design components for Blazor

## 📋 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [OpenAI API Key](https://platform.openai.com/api-keys)
- Visual Studio 2022 or VS Code

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BlogPictures
```

### 2. Configure API Key
1. Navigate to `src/BlogPicturesBack/`
2. Copy `appsettings.example.json` to `appsettings.json`
3. Add your OpenAI API key:
```json
{
  "AIService": {
    "OpenAIApiKey": "your-openai-api-key-here",
    "Model": "gpt-3.5-turbo",
    "MaxTokens": 1000
  }
}
```

### 3. Restore Dependencies
```bash
cd src/BlogPicturesBack
dotnet restore

cd ../BlogPicturesFront
dotnet restore
```

### 4. Run the Application

**Backend (Terminal 1):**
```bash
cd src/BlogPicturesBack
dotnet run
```
- API will be available at: `https://localhost:7285`
- Swagger documentation: `https://localhost:7285/swagger`

**Frontend (Terminal 2):**
```bash
cd src/BlogPicturesFront
dotnet run
```
- Frontend will be available at: `https://localhost:7225`

## 🎯 How to Use

1. **Open the Application**: Navigate to `https://localhost:7225`
2. **Enter Blog Content**: Paste or type your blog text in the text area
3. **Analyze**: Click "Analyser le texte" to process your content
4. **Review Suggestions**: View AI-generated image suggestions with descriptions
5. **Preview**: See your content with marked image placement positions
6. **Export** (Coming Soon): Export your content with image suggestions as HTML

## 📁 Project Structure

```
BlogPictures/
├── src/
│   ├── BlogPicturesBack/          # ASP.NET Core Web API
│   │   ├── Controllers/           # API endpoints
│   │   ├── Services/              # Business logic
│   │   ├── Models/                # DTOs and configurations
│   │   ├── Middleware/            # Error handling
│   │   ├── appsettings.json       # Configuration
│   │   └── Program.cs             # Application startup
│   │
│   └── BlogPicturesFront/         # Blazor WebAssembly
│       ├── Pages/                 # Razor pages
│       ├── Layout/                # Layout components
│       ├── Services/              # HTTP client services
│       ├── Models/                # Client-side models
│       └── Program.cs             # Client startup
│
├── BlogPictures.sln               # Solution file
└── README.md                      # This file
```

## 🔌 API Endpoints

### POST `/api/textanalysis/analyze`
Analyzes blog text and returns image placement suggestions.

**Request:**
```json
{
  "content": "Your blog content here",
  "maxImages": 3,
  "preferredStyle": "natural and professional"
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "description": "Image description",
      "position": 150,
      "context": "Why this image fits here"
    }
  ],
  "processedText": "Original text with [IMAGE-1] markers"
}
```

### GET `/api/textanalysis/health`
Health check endpoint for monitoring.

## 🚦 Development Status

### ✅ Completed Features
- AI text analysis with OpenAI integration
- Image placement suggestions with context
- Modern responsive UI with MudBlazor
- Real-time content processing
- Error handling and middleware
- CORS configuration for frontend-backend communication

### 🔄 In Progress
- HTML export functionality
- Enhanced error handling
- Performance optimizations

### 📋 Planned Features
- Multiple AI model support (GPT-4, etc.)
- Image generation integration
- Batch processing
- User authentication
- Content history
- Advanced styling options

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure backend is running on `https://localhost:7285`
- Verify CORS policy in `Program.cs` matches frontend URL

**OpenAI API Issues:**
- Check API key configuration
- Verify sufficient API credits
- Review rate limiting

**Build Errors:**
- Ensure both .NET 8 and .NET 9 SDKs are installed
- Run `dotnet restore` in both project directories

## 🔒 Security Notes

⚠️ **Important**: Never commit API keys to version control. Always use:
- Environment variables for production
- `appsettings.json` for local development (excluded from git)
- Azure Key Vault or similar services for cloud deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♀️ Support

For questions or support:
- Open an issue on GitHub
- Check the Swagger documentation at `/swagger`
- Review the troubleshooting section above

---

**Built with ❤️ using .NET, Blazor, and OpenAI**