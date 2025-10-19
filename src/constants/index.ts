// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://reqres.in/api',
  TIMEOUT: 10000,
  HEADERS: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  LOADING_SCREEN_DURATION: 3000, // 3 seconds
  INFINITE_SCROLL_DELAY: 500, // 500ms delay for smooth UX
  INTERSECTION_OBSERVER_ROOT_MARGIN: '50px',
  INTERSECTION_OBSERVER_THRESHOLD: 0,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error: Please check your internet connection',
  TIMEOUT_ERROR: 'Request timeout: The server is taking too long to respond',
  GENERIC_ERROR: 'Failed to fetch users',
  LOAD_MORE_ERROR: 'Failed to load more users',
} as const;
