import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2000/api',
    // baseURL: 'https://krakatausportcentrejombang.cloud/api',
});

export default axiosInstance;