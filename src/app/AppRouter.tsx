import ChatPage from "@/pages/ChatPage"
import LoginPage from "@/pages/login/LoginPage"
import { Navigate, Route, Routes } from "react-router-dom"
import AuthWrapper from "./AuthWrapper"
import NotFoundPage from "@/pages/notFound/NotFoundPage"
import ReverseAuthGuard from "./ProtectedAuthRoute"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/chats" />} />

            <Route element={<ReverseAuthGuard />}>
                <Route path="/auth" element={<LoginPage />} />
            </Route>

            <Route element={<AuthWrapper />}>
                <Route path="/chats/:chatId?" element={<ChatPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter