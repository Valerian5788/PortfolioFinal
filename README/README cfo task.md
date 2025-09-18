# CFO Tasks - Task Management Application

> **A desktop task management application designed for CFO and accounting teams**

A modern WPF application built with .NET 8, featuring task scheduling, client management, and timeline visualization with drag-and-drop functionality.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![.NET](https://img.shields.io/badge/.NET-8.0-blue)
![C#](https://img.shields.io/badge/C%23-12.0-purple)
![WPF](https://img.shields.io/badge/WPF-Windows-lightblue)

## 🚀 Features

### Core Functionality
- ✅ **Task Management** - Create, edit, and track accounting tasks (TVA, Bilan, Accounting, Administrative)
- ✅ **Client Management** - Organize tasks by client with VAT number tracking
- ✅ **Timeline View** - Visual weekly timeline with drag-and-drop task scheduling
- ✅ **Time Tracking** - Track planned vs actual time spent on tasks
- ✅ **Status Management** - Track task progress (ToDo, InProgress, Done)
- ✅ **Hierarchical Tasks** - Support for parent/subtask relationships

### User Interface
- 🎨 **Modern UI** - Clean, professional interface suitable for business use
- 📱 **Responsive Layout** - Three-panel layout (Navigation, Main Content, Sidebar)
- 🖱️ **Interactive Timeline** - Drag-and-drop task scheduling with visual feedback
- 📊 **Today's Tasks** - Quick sidebar view of current day tasks

## 🛠️ Technology Stack

### Core Technologies
- **C# 12.0** - Primary programming language
- **.NET 8.0** - Latest framework with performance improvements
- **WPF** - Windows Presentation Foundation for rich desktop UI
- **XAML** - Declarative markup for UI design

### Architecture & Patterns
- **MVVM Pattern** - Model-View-ViewModel architecture for separation of concerns
- **CommunityToolkit.Mvvm** - Source generators for boilerplate reduction
- **Command Pattern** - RelayCommand for UI interaction handling
- **Dependency Injection** - Service-based architecture

### Data Layer
- **Entity Framework Core 9.0** - Modern ORM with LINQ support
- **SQLite** - Lightweight database for local data storage
- **Code-First Migrations** - Database schema management
- **Repository Pattern** - Data access abstraction

### Development Features
- **Nullable Reference Types** - Enhanced null safety
- **Source Generators** - Compile-time code generation
- **Data Binding** - Two-way binding for reactive UI
- **Custom Controls** - Specialized timeline control

## 📁 Project Structure

```
CfoTasks/
├── Models/                 # Domain entities and enums
│   ├── Task.cs            # Core task entity with relationships
│   ├── Client.cs          # Client management
│   ├── User.cs            # User authentication
│   └── Enums.cs           # Task types and statuses
├── ViewModels/            # MVVM presentation layer
│   ├── MainViewModel.cs   # Primary application controller
│   ├── TaskListViewModel.cs
│   └── TimelineViewModel.cs
├── Views/                 # WPF user interface
│   ├── TaskListView.xaml  # Task management interface
│   └── TimelineView.xaml  # Interactive timeline
├── Data/                  # Entity Framework context
├── Services/              # Business logic layer
├── Controls/              # Custom WPF controls
├── Converters/           # XAML value converters
└── Migrations/           # EF Core database migrations
```

## 🚦 Getting Started

### Prerequisites
- **Windows 10/11** - WPF requires Windows
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Visual Studio 2022** (recommended) or VS Code

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Valerian5788/CfoTasks.git
   cd CfoTasks
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Build the application**
   ```bash
   dotnet build
   ```

4. **Run the application**
   ```bash
   dotnet run
   ```

The application will create a local SQLite database (`accounting_tasks.db`) on first run.

## 💡 Usage

### Task Management
- Use the **"+ New Task"** button to create tasks
- Assign tasks to clients and users
- Set deadlines and estimated time
- Track progress with status updates

### Timeline View
- Switch to **Timeline** view for visual scheduling
- **Drag and drop** tasks to reschedule
- Navigate between weeks using arrow buttons
- Add dummy tasks for testing with **"+ Add Task"**

### Search & Filtering
- Use the search bar to find tasks by title, description, client, or assignee
- Filter tasks by client or status (UI ready for implementation)

## 🏗️ Architecture Highlights

### MVVM Implementation
```csharp
[ObservableProperty]
private ObservableCollection<TaskItemViewModel> _tasks;

[RelayCommand]
private async Task LoadTasks()
{
    // Async task loading with Entity Framework
}
```

### Entity Relationships
- **Task ↔ Client** (Many-to-One)
- **Task ↔ User** (Many-to-One for assignment)
- **Task ↔ Task** (Parent/Child hierarchy)
- **Task ↔ TimeSlot** (One-to-Many for time tracking)

### Database Design
- **Code-First** approach with automatic migrations
- **Cascade delete** policies for data integrity
- **Index optimization** for time-based queries

## 🚧 Development Status

This is a **portfolio project** demonstrating:
- Modern C#/.NET development practices
- Clean architecture patterns
- Professional UI/UX design
- Database design and ORM usage
- Test-driven development readiness

**Current State**: Core functionality implemented, ready for enhancement

## 🔧 Technical Decisions

- **SQLite over SQL Server**: Simpler deployment for demo purposes
- **Local-first**: No cloud dependencies for standalone operation
- **MVVM over MVVM-Light**: Community toolkit provides better performance
- **Entity Framework**: Rapid development with strong typing

## 📈 Future Enhancements

- [ ] Authentication system integration
- [ ] Export functionality (Excel, PDF)
- [ ] Email notifications for deadlines
- [ ] Multi-user collaboration features
- [ ] Dark theme support
- [ ] Unit test coverage

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Star the repository if you find it useful

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for modern desktop application development**

*This project demonstrates proficiency in C#/.NET, WPF, Entity Framework, MVVM architecture, and modern development practices.*