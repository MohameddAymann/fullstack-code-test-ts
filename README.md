# Ombori Fullstack Code Test - React Users Directory

A responsive React application that displays users from the Reqres API with infinite scroll functionality and a custom loading screen.

## ✅ Requirements Completed

- **✅ Custom Loading Component**: 3-second animated loading screen with pulse effect
- **✅ User Data Fetching**: Fetches users from https://reqres.in/ API
- **✅ Infinite Scroll**: Automatically loads more users as you scroll to the bottom
- **✅ End of List Indicator**: Shows message when no more users are available
- **✅ Responsive Design**: Optimized for desktop and mobile devices
- **✅ Code Quality**: ESLint and Prettier configured for consistent formatting

## 🚀 Features

- **Custom Loading Screen**: Beautiful pulse animation with gradient background
- **User Directory**: Clean, card-based layout displaying user avatars, names, and emails
- **Infinite Scroll**: Seamless loading of additional users using Intersection Observer API
- **Error Handling**: Graceful error handling with retry functionality
- **TypeScript**: Full TypeScript support for better development experience
- **Mobile-First Design**: Responsive layout that works great on all screen sizes

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Axios** for API calls
- **react-intersection-observer** for infinite scroll detection
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **ESLint & Prettier** for code quality

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📜 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run lint` - Runs ESLint to check for code issues
- `npm run lint:fix` - Automatically fixes ESLint issues
- `npm run format` - Formats code with Prettier
- `npm run format:check` - Checks if code is properly formatted

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.tsx    # Custom loading component
│   ├── LoadingScreen.css
│   ├── UserCard.tsx         # Individual user card component
│   ├── UserCard.css
│   ├── UserList.tsx         # Main user list with infinite scroll
│   └── UserList.css
├── services/
│   └── api.ts              # API service for fetching users
├── App.tsx                 # Main application component
├── App.css                 # Global styles
└── index.tsx              # Application entry point
```

## 🔌 API Integration

The application fetches user data from the [Reqres API](https://reqres.in/):
- Endpoint: `https://reqres.in/api/users`
- Supports pagination with `page` parameter
- Returns user data including avatar, name, and email

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Large screens with spacious card layouts
- **Tablet**: Medium screens with adjusted spacing
- **Mobile**: Small screens with compact, touch-friendly interfaces

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💡 Development Choices & Motivations

### **TypeScript**
- Provides type safety and better developer experience
- Catches potential errors at compile time
- Improves code maintainability and refactoring

### **Axios**
- Reliable HTTP client with excellent TypeScript support
- Built-in request/response interceptors
- Better error handling compared to fetch API

### **react-intersection-observer**
- Modern, performant way to detect when elements enter viewport
- Better than scroll event listeners for performance
- Built-in TypeScript support

### **CSS Modules Approach**
- Each component has its own CSS file for better organization
- Avoids global CSS conflicts
- Easier to maintain and debug styles

### **Component Architecture**
- Small, focused components with single responsibilities
- Reusable UserCard component
- Clear separation of concerns (API, UI, state management)

### **Error Handling**
- Comprehensive error handling for API failures
- User-friendly error messages
- Retry functionality for failed requests

### **Performance Optimizations**
- useCallback for preventing unnecessary re-renders
- Intersection Observer for efficient scroll detection
- Lazy loading to reduce initial bundle size

## 🎨 Design Philosophy

- **Mobile-First**: Designed for mobile devices first, then enhanced for larger screens
- **Accessibility**: Semantic HTML and proper contrast ratios
- **Performance**: Optimized animations and efficient rendering
- **User Experience**: Smooth interactions and clear feedback