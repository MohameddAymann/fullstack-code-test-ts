import axios from 'axios';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const API_BASE_URL = 'https://reqres.in/api';

export const fetchUsers = async (page: number = 1): Promise<UsersResponse> => {
  try {
    const response = await axios.get<UsersResponse>(
      `${API_BASE_URL}/users?page=${page}`,
      {
        timeout: 10000, // 10 second timeout
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Please check your internet connection');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error(
          'Request timeout: The server is taking too long to respond'
        );
      } else if (error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      }
    }
    throw new Error('Failed to fetch users');
  }
};
