import { SERVER_URL } from '@config/index';
import axios from 'axios';

const authAPI = axios.create({
  baseURL: SERVER_URL,
});

// api 요청하기 전 수행
authAPI.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  // 액세스 토큰이 존재할 때만 탑재
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
  }

  return config;
});

export default authAPI;
