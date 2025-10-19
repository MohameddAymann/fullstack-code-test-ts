import axios from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '../constants';

/**
 * User interface representing a user from the API
 */
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

/**
 * API response interface for users endpoint
 */
export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

/**
 * Fetches users from the API with pagination support
 * @param page - Page number to fetch (default: 1)
 * @returns Promise that resolves to UsersResponse
 * @throws Error if the request fails
 */
export const fetchUsers = async (page: number = 1): Promise<UsersResponse> => {
  try {
    const response = await axios.get<UsersResponse>(
      `${API_CONFIG.BASE_URL}/users?page=${page}`,
      {
        timeout: API_CONFIG.TIMEOUT,
        headers: API_CONFIG.HEADERS,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
      } else if (error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      }
    }
    throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
  }
};
