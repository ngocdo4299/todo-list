import axios from 'axios'
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 400) {
      // const navigation = useNavigation();
      await SecureStore.deleteItemAsync('token');
      router.navigate('/');
    }
    return error;
  }
);

export default axiosInstance;