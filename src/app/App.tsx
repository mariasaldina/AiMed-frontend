import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "@/pages/home/HomePage"
import PrivateRoute from "./PrivateRoute"
import LoginPage from "@/pages/login/LoginPage"
import ProtectedAuthRoute from "./ProtectedAuthRoute"
import NotFoundPage from "@/pages/notFound/NotFoundPage"
import AuthWrapper from "./AuthWrapper"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

const App = () => {
    return (
        <Provider store={store}>
            <AuthWrapper>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/chats" />} />
                        <Route path="/auth" element={
                            // <ProtectedAuthRoute>
                                <LoginPage />
                            // </ProtectedAuthRoute>
                        } />
                        <Route path="/chats/:chatId?" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthWrapper>
        </Provider>
    )
}

export default App