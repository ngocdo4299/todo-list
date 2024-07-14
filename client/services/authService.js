import axios from './axiosConfig'
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export const signIn = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', {
      username,
      password,
    });
    if (response.status === 200) {
      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      await SecureStore.setItemAsync('token', token);
      return {
        id: decodedToken.id,
        username: decodedToken.username,
        role: decodedToken.role
      }
    } else {
      throw new Error(response)
    }
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
};

export const signOut = async () => {
  await SecureStore.deleteItemAsync('token');
}

export const getCurrentUser = async () => {
  let result = await SecureStore.getItemAsync('token');
  if (result) {
    const decodedToken = jwtDecode(result);
    if (decodedToken.exp * 1000 > Date.now()) {
      return {
        id: decodedToken.id,
        username: decodedToken.username,
        role: decodedToken.role
      }
    }
    await SecureStore.deleteItemAsync('token');
  }
  return null;
}