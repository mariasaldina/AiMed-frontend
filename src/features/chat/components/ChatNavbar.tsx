import { Center, Loader, type AppShellNavbarProps } from "@mantine/core";
import { ActionIcon, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { useAppSelector } from "@/hooks/redux";
import { useParams } from "react-router-dom";
import CreateChatModal from "./CreateChatModal";
import useChatList from "../hooks/useChatList";

interface ChatNavbarProps extends AppShellNavbarProps {
    onSelect: () => void
}

function ChatNavbar({ onSelect }: ChatNavbarProps) {
    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const { chats } = useAppSelector(state => state.chatsReducer)
    const { loading } = useAppSelector(state => state.settingsReducer)

    const { deleted, handleDelete, handleSelect } = useChatList(parsedChatId, onSelect)

    return (
        <Stack p={{ base: 'md', sm: 'lg' }} h='100%'>

            <Group>
                <CreateChatModal />
            </Group>

            {loading['chats/loadChats']
                ? <Center h={'100%'}><Loader /></Center>
                : <ScrollArea>
                    <Stack>
                        {chats.map(chat => (
                            <Paper
                                key={chat.id}
                                onClick={e => { e.stopPropagation(); handleSelect(chat.id) }}
                                withBorder
                                shadow="xs"
                                radius="md"
                                style={{ cursor: 'pointer' }}
                                p={{ base: 'xs', sm: 'md' }}
                                bg={chat.id === parsedChatId ? 'indigo.2' : 'white'}
                            >
                                <Group justify="space-between">
                                    <Text truncate size="md">
                                        {chat.title}
                                    </Text>

                                    <ActionIcon
                                        variant="subtle"
                                        onClick={e => { e.stopPropagation(); handleDelete(chat.id) }}
                                        loading={deleted === chat.id && loading['chats/deleteChat']}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </ScrollArea>}

        </Stack>
    )
}

export default ChatNavbar