import ChatFetcher from "@/features/chat/components/ChatFetcher"
import { Navigate, Route, Routes } from "react-router-dom"
import NotFoundPage from "@/layouts/NotFoundLayout"
import ReverseAuthGuard from "./ProtectedAuthRoute"
import AppLayout from "@/layouts/AppLayout"
import LandingLayout from "@/layouts/LandingLayout"
import LoginLayout from "@/layouts/LoginLayout"
import UserProfileLayout from "@/layouts/UserProfileLayout"
import ChatLayout from "@/layouts/ChatLayout"

const AppRouter = () => {
    return (
        <Routes>

            <Route element={<AppLayout />}>
                <Route element={<ReverseAuthGuard />}>
                    <Route path="/auth" element={<LoginLayout />} />
                </Route>

                <Route path="/" element={<LandingLayout />} />

                <Route path="/chats" element={<ChatFetcher />}>
                    <Route path=":chatId?" element={<ChatLayout />} />
                </Route>

                <Route path='/profile' element={<UserProfileLayout />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRouter