import Chat from "@/features/chat/components/Chat"
import { Button, Portal } from "@mantine/core"
import { IconUserSquare } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const ChatLayout = () => {
    const navigate = useNavigate()

    return (
        <>
            <Portal target='#header-actions'>
                <Button variant='subtle' onClick={() => navigate('/profile')}>
                    <IconUserSquare />
                </Button>
            </Portal>

            <Chat />
        </>
    )
}

export default ChatLayout