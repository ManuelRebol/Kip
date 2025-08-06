// import { Footer } from "./components/Footer"
// import { Main } from "./components/Main"
// import { Nav } from "./components/Nav"
import { useEffect } from 'react'
import { NotesPage } from './pages/NotesPage/NotesPage'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ProtectedRoute } from './components/ui/ProtectedRoute/ProtectedRoute'
import { useAuthStore } from './store/authStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
    const loadUser = useAuthStore((state) => state.loadUser)

    useEffect(() => {
        loadUser()
    }, [loadUser])
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute requireAuth={false}>
                                <LandingPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute requireAuth={true}>
                                <NotesPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
