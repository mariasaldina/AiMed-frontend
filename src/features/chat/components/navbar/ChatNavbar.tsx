import { Box, Button, Center, Loader, type AppShellNavbarProps } from "@mantine/core";
import { ScrollArea, Stack } from "@mantine/core"
import { IconSparkles } from "@tabler/icons-react"
import { useAppSelector } from "@/hooks/redux";
import { useParams } from "react-router-dom";
import useChatList from "../../hooks/useChatList";
import ChatModal from "../ChatModal";
import { useState } from "react";
import ChatItem from "./ChatItem";

interface ChatNavbarProps extends AppShellNavbarProps {
    onSelect: () => void
}

function ChatNavbar({ onSelect }: ChatNavbarProps) {
    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const { chats } = useAppSelector(state => state.chatsReducer)
    const { loading } = useAppSelector(state => state.settingsReducer)

    const {
        deleted,
        renamed,
        handleAdd,
        handleRename,
        handleDelete,
        handleSelect
    } = useChatList(parsedChatId, onSelect)

    const [createOpened, setCreateOpened] = useState(false)

    return (
        <Stack h='100%'>
            <Box p={{ base: 'md', sm: 'lg' }} flex={1} mih={0} w='100%'>
                <ChatModal
                    opened={createOpened}
                    onClose={() => setCreateOpened(false)}
                    handleSubmit={handleAdd}
                    formTitle="Новый чат"
                    loading={loading['chats/addChat']}
                />

                <Button
                    type="button"
                    onClick={() => setCreateOpened(true)}
                    rightSection={<IconSparkles />}
                    variant="gradient"
                    gradient={{ from: 'indigo.7', to: 'indigo.4' }}
                >
                    Начать новый чат
                </Button>
            </Box>

            {loading['chats/loadChats']
                ? <Center h={'100%'}><Loader /></Center>
                : <ScrollArea
                    h={"100%"}
                    type="auto"
                    offsetScrollbars
                >
                    <Stack flex={1} mih={0} w='100%' p={{ base: 'md', sm: 'lg' }}>
                        {chats.map(chat => (
                            <ChatItem
                                key={chat.id}
                                chat={chat}
                                selected={parsedChatId}
                                renamed={renamed}
                                deleted={deleted}
                                handleSelect={handleSelect}
                                handleRename={handleRename}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </Stack>
                </ScrollArea>}
        </Stack>
    )
}

export default ChatNavbar