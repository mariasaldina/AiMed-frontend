import ChatFetcher from "@/features/chat/components/ChatFetcher"
import { Route, Routes } from "react-router-dom"
import NotFoundPage from "@/layouts/NotFoundLayout"
import ReverseAuthGuard from "./ProtectedAuthRoute"
import AppLayout from "@/layouts/AppLayout"
import LandingLayout from "@/layouts/LandingLayout"
import LoginLayout from "@/layouts/LoginLayout"
import ProfileLayout from "@/layouts/ProfileLayout"
import ChatLayout from "@/layouts/ChatLayout"
import EditableTemplate from "@/ui/EditableTemplate"
import Contacts from "@/features/user/components/Contacts"
import Questionnaire from "@/features/user/components/questionnaire/Questionnaire"

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

                <Route path="/profile" element={<ProfileLayout />}>
                    <Route element={<EditableTemplate />}>
                        <Route path='questionnaire' element={<Questionnaire />} />
                        <Route path='contacts' element={<Contacts />} />
                    </Route>
                    
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRouter