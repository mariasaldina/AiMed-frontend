import { type AppShellNavbarProps } from "@mantine/core";
import { ActionIcon, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { useAppSelector } from "@/hooks/redux";
import { useParams } from "react-router-dom";
import CreateChatModal from "./CreateChatModal";
import useChatList from "../hooks/useChatList";

interface ChatNavbarProps extends AppShellNavbarProps {
    onSelect: () => void
}

const ChatNavbar: React.FC<ChatNavbarProps> = ({ onSelect }) => {
    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const { chats } = useAppSelector(state => state.chatsReducer)

    const { handleDelete, handleSelect } = useChatList(parsedChatId, onSelect)

    return (
        <Stack p={{ base: 'md', sm: 'lg' }}>
            <Group>
                <CreateChatModal />
            </Group>

            <ScrollArea>
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
                        >
                            <Group justify="space-between">
                                <Text truncate size="md">
                                    {chat.title}
                                </Text>

                                <ActionIcon
                                    variant="subtle"
                                    onClick={e => { e.stopPropagation(); handleDelete(chat.id) }}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Group>
                        </Paper>
                    ))}
                </Stack>
            </ScrollArea>
        </Stack>
    )
}

export default ChatNavbar