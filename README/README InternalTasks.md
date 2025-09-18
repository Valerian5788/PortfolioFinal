# InternalTasks - WPF Calendar & Task Management Application

A modern desktop calendar application built with WPF and .NET 8, featuring an intuitive weekly view for task scheduling and management.

![Calendar Application](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet)
![WPF](https://img.shields.io/badge/UI-WPF-blue?style=flat-square)
![MVVM](https://img.shields.io/badge/Pattern-MVVM-green?style=flat-square)
![C#](https://img.shields.io/badge/Language-C%23-239120?style=flat-square&logo=c-sharp)

## 🎯 Overview

InternalTasks is a desktop calendar application designed for efficient task management and scheduling. It provides a clean, visual interface for creating, viewing, and managing tasks across a weekly calendar view.

## ✨ Features

### Core Functionality
- **Interactive Weekly Calendar**: Visual calendar showing Monday through Friday, 7 AM to 6 PM
- **Click-to-Create Tasks**: Simply click on any time slot to create a new task
- **Task Management**:
  - Custom titles and descriptions
  - Flexible start and end times (30-minute increments)
  - Color-coded task visualization
- **Intuitive UI**: Clean, modern interface with proper time grid and visual indicators

### Technical Features
- **MVVM Architecture**: Clean separation of concerns with proper data binding
- **Responsive Design**: Dynamic grid layout that adapts to window sizing
- **Real-time Validation**: Input validation for task creation with immediate feedback
- **Event-driven Architecture**: Proper event handling for user interactions

## 🛠️ Technology Stack

- **Framework**: .NET 8.0 (Windows)
- **UI Technology**: Windows Presentation Foundation (WPF)
- **Architecture Pattern**: Model-View-ViewModel (MVVM)
- **Language**: C# 11+ with nullable reference types enabled
- **Package Dependencies**:
  - `CommunityToolkit.Mvvm` (8.4.0) - Modern MVVM helpers and commands
  - `Extended.Wpf.Toolkit` (4.7.25103.5738) - Enhanced WPF controls

## 🏗️ Project Structure

```
InternalTasks/
├── Models/
│   ├── CalendarTask.cs          # Task data model with INotifyPropertyChanged
│   └── TimeSlot.cs              # Time slot representation
├── ViewModels/
│   ├── CalendarViewModel.cs     # Main calendar logic and task collection
│   ├── TaskCreationViewModel.cs # Task creation dialog logic
│   └── MainViewModel.cs         # Application-level view model
├── Views/
│   ├── CalendarView.xaml        # Main calendar interface
│   ├── TaskCreationWindow.xaml  # Task creation dialog
│   └── Controls/                # Custom WPF controls
│       ├── TaskItemControl.xaml
│       └── TimeScaleControl.xaml
├── Services/
│   └── CalendarService.cs       # Business logic layer (extensible)
├── Helpers/
│   ├── TimeHelper.cs            # Time calculation utilities
│   └── RelayCommand.cs          # Command pattern implementation
├── Converters/
│   └── CalendarConverters.cs    # Data binding converters
└── Styles/
    └── CalendarStyles.xaml      # Application styling and themes
```

## 🚀 Getting Started

### Prerequisites
- Windows 10/11
- .NET 8.0 SDK or later
- Visual Studio 2022 (recommended) or Visual Studio Code

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd InternalTasks
   ```

2. **Restore NuGet packages**:
   ```bash
   dotnet restore
   ```

3. **Build the application**:
   ```bash
   dotnet build
   ```

4. **Run the application**:
   ```bash
   dotnet run
   ```

   Or open `InternalTasks.sln` in Visual Studio and press F5.

## 💡 Usage

1. **Creating Tasks**: Click on any time slot in the calendar grid to open the task creation dialog
2. **Setting Task Details**:
   - Enter a meaningful title (required)
   - Add an optional description
   - Select start and end times from available 30-minute slots
   - Choose the specific date for the task
3. **Viewing Tasks**: All created tasks appear as colored blocks on the calendar at their scheduled times
4. **Time Navigation**: The calendar shows a full business week (Monday-Friday) with hourly time markers

## 🔧 Architecture Highlights

### MVVM Implementation
- **Models**: Plain C# classes implementing `INotifyPropertyChanged` for data binding
- **ViewModels**: Business logic and data manipulation, isolated from UI concerns
- **Views**: Pure XAML with minimal code-behind, maximizing testability

### Key Design Patterns
- **Command Pattern**: Using `RelayCommand` for user actions
- **Observer Pattern**: Extensive use of `INotifyPropertyChanged` and `ObservableCollection`
- **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers

### Code Quality Features
- **Nullable Reference Types**: Enabled for better null safety
- **ImplicitUsings**: Reduced boilerplate with global using statements
- **Modern C# Features**: Pattern matching, expression-bodied members, and more

## 🔮 Future Enhancements

The application is designed with extensibility in mind. Potential improvements include:

- **Data Persistence**: Add database integration (Entity Framework Core, SQLite)
- **Task Categories**: Color-coded task categories and filtering
- **Recurring Tasks**: Support for repeating tasks and schedules
- **Import/Export**: Calendar integration (Outlook, Google Calendar)
- **Multi-week View**: Navigate between different weeks/months
- **Task Search**: Full-text search across task titles and descriptions
- **Notifications**: Reminder system for upcoming tasks
- **Drag & Drop**: Visual task rescheduling
- **Print Support**: Calendar printing functionality

## 👨‍💻 Development Notes

This project demonstrates proficiency in:
- Modern .NET/C# development practices
- WPF application development with custom controls
- MVVM architecture implementation
- Data binding and UI event handling
- Object-oriented design principles
- Clean code organization and project structure

## 📄 License

This project is developed for portfolio demonstration purposes.

---

*Built with ❤️ using .NET 8 and WPF*