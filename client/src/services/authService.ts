import { api } from './api';
import type { LoginCredentials, RegisterData, UpdateProfileData, User } from '../types';

export const authService = {
    async login(credentials: LoginCredentials) {
        const response = await api.post('/accounts/login/', credentials);
        return response.data;
    },

    async register(data: RegisterData) {
        const response = await api.post('/accounts/register/', data);
        return response.data;
    },

    async logout() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            await api.post('/accounts/logout/', { refresh: refreshToken });
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    async getProfile(): Promise<User> {
        const response = await api.get('/accounts/profile/');
        return response.data;
    },

    async updateProfile(data: UpdateProfileData): Promise<User> {
        const response = await api.put('/accounts/profile/', data);
        return response.data;
    },
};