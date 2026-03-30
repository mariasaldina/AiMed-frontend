import ChatFetcher from "@/features/chat/components/ChatFetcher"
import { Navigate, Route, Routes } from "react-router-dom"
import AuthWrapper from "./AuthWrapper"
import NotFoundPage from "@/layouts/NotFoundLayout"
import ReverseAuthGuard from "./ProtectedAuthRoute"
import AppLayout from "@/layouts/AppLayout"
import Chat from "@/features/chat/components/Chat"
import LandingLayout from "@/layouts/LandingLayout"
import LoginLayout from "@/layouts/LoginLayout"

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AppLayout withNavbar={false} />}>
                <Route path="/" element={<LandingLayout />} />

                {/* <Route element={<ReverseAuthGuard />}> */}
                    <Route path="/auth" element={<LoginLayout />} />
                {/* </Route> */}
            </Route>

            <Route element={<AppLayout withNavbar={true} />}>
                <Route element={<AuthWrapper />}>
                    <Route path="/chats" element={<ChatFetcher />}>
                        <Route path=":chatId?" element={<Chat />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter