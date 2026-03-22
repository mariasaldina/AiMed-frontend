import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

const refreshApi = axios.create({
    ...api.defaults
})

api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get("csrf");

    if (csrfToken) {
        config.headers.set("X-XSRF-Token", csrfToken);
    }

    return config;
});

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
    (res: AxiosResponse<unknown, unknown>) => res,
    async (err: AxiosError<unknown, unknown>) => {
        const originalRequest = err.config as InternalAxiosRequestConfig<unknown> & {
            _retry?: boolean;
        };

        const isAuthRoute = originalRequest.url?.includes('/auth/')

        if (err.response?.status !== 401 || originalRequest?._retry || isAuthRoute) {
            throw err;
        }

        originalRequest._retry = true;

        if (!refreshPromise) {
            console.log('try refresh')
            refreshPromise = refreshApi.post('auth/refresh');
        }

        try {
            await refreshPromise;
            return api(originalRequest);
        } catch (e) {
            throw err;  
        } finally {
            refreshPromise = null;
        }
    }
)

export default api