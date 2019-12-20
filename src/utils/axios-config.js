import ENV from '../ENV';
let axiosConfig = {
    baseURL: ENV.BASE_URL,
    timeout: 6000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    maxContentLength: 5000
}
export default axiosConfig;
