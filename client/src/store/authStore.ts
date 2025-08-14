import { create } from 'zustand'
import type { User, LoginCredentials, RegisterData, UpdateProfileData } from '../types'
import { authService } from '../services/authService'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => Promise<void>
    loadUser: () => Promise<void>
    updateProfile: (data: UpdateProfileData) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (credentials) => {
        set({ isLoading: true })
        try {
            const response = await authService.login(credentials)
            localStorage.setItem('access_token', response.tokens.access)
            localStorage.setItem('refresh_token', response.tokens.refresh)
            set({ user: response.user, isAuthenticated: true })
        } catch (error) {
            console.error('Login failed:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    register: async (data) => {
        set({ isLoading: true })
        try {
            const response = await authService.register(data)
            localStorage.setItem('access_token', response.tokens.access)
            localStorage.setItem('refresh_token', response.tokens.refresh)
            set({ user: response.user, isAuthenticated: true })
        } catch (error) {
            console.error('Registration failed:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        try {
            await authService.logout()
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            set({ user: null, isAuthenticated: false })
        }
    },

    loadUser: async () => {
        const token = localStorage.getItem('access_token')
        if (!token) return

        set({ isLoading: true })
        try {
            const user = await authService.getProfile()
            set({ user, isAuthenticated: true })
        } catch {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            set({ user: null, isAuthenticated: false })
        } finally {
            set({ isLoading: false })
        }
    },

    updateProfile: async (data) => {
        try {
            const updatedProfile = await authService.updateProfile(data)
            set({ user: updatedProfile })
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    },
}))
