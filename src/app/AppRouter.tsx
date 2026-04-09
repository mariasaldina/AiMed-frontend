import ChatFetcher from "@/features/chat/components/ChatFetcher"
import { Route, Routes } from "react-router-dom"
import NotFoundPage from "@/layouts/NotFoundLayout"
import ReverseAuthGuard from "../components/ProtectedAuthRoute"
import AppLayout from "@/layouts/AppLayout"
import LandingLayout from "@/layouts/LandingLayout"
import LoginLayout from "@/layouts/LoginLayout"
import EditableTemplate from "@/ui/EditableTemplate"
import Contacts from "@/features/user/components/Contacts"
import Questionnaire from "@/features/user/components/questionnaire/Questionnaire"
import NotificationList from "@/features/notifications/components/NotificationList"
import Chat from "@/features/chat/components/Chat"
import RoleGuard from "../components/RoleGuard"

const AppRouter = () => {
    return (
        <Routes>

            <Route element={<AppLayout />}>
                <Route element={<ReverseAuthGuard />}>
                    <Route path="/auth" element={<LoginLayout />} />
                </Route>

                <Route path="/home" element={<LandingLayout />} />

                <Route element={<RoleGuard role='PATIENT' />}>
                    <Route path="/chats" element={<ChatFetcher />}>
                        <Route path=":chatId?" element={<Chat />} />
                    </Route>
                </Route>

                <Route path='/profile'>
                    <Route element={<EditableTemplate />}>
                        <Route index element={<Questionnaire />} />
                        <Route path='questionnaire' element={<Questionnaire />} />
                        <Route path='contacts' element={<Contacts />} />
                    </Route>
                </Route>

                <Route path="/notifications" element={<NotificationList />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRouter