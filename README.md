# 🚀 Fullstack Code Test - TypeScript

A modern React application built with TypeScript that demonstrates best practices for user management with infinite scroll functionality.

## ✨ Features

- **🎨 Modern UI/UX**: Clean, responsive design with smooth animations
- **♾️ Infinite Scroll**: Efficiently loads users as you scroll
- **⚡ Performance Optimized**: React.memo, useCallback, and lazy loading
- **♿ Accessible**: ARIA labels, semantic HTML, and screen reader support
- **🛡️ Error Handling**: Comprehensive error boundaries and user feedback
- **📱 Mobile-First**: Responsive design that works on all devices
- **🎯 TypeScript**: Full type safety throughout the application

## 🏗️ Architecture

### **Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx    # Error boundary for graceful error handling
│   ├── LoadingScreen.tsx    # Initial loading screen with pulse animation
│   ├── UserCard.tsx         # Individual user card component
│   └── UserList.tsx         # Main user list with infinite scroll
├── constants/           # Application constants and configuration
│   └── index.ts             # Centralized constants
├── services/            # API and external service integrations
│   └── api.ts              # User API service with error handling
└── App.tsx              # Main application component
```

### **Key Technologies**
- **React 18** with TypeScript
- **React Hooks** (useState, useEffect, useCallback, useRef)
- **React Intersection Observer** for infinite scroll
- **Axios** for HTTP requests
- **CSS3** with modern animations
- **ESLint + Prettier** for code quality

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