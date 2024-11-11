import type { User } from '@/models/user.interface';
import axios from 'axios';

/**
 * Fetches user data from the Random User API and returns it
 * @returns {Promise<User[]>} - A promise that resolves to an array of users.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://randomuser.me/api/', {
      params: {
        results: 20,
        inc: 'name,picture,email',
      },
    });
    return response.data.results as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
