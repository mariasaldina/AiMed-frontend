import { ActionIcon, Flex, Group, Paper, Text } from "@mantine/core";
import { useState } from "react";
import type { Chat } from "../../types/chat";
import ChatModal from "../ChatModal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useAppSelector } from "@/hooks/redux";

interface ChatItemProps {
    chat: Chat
    selected: number | null
    renamed: number | null
    deleted: number | null
    handleSelect: (chatId: number) => void
    handleRename: (title: string, chatId: number) => void
    handleDelete: (chatId: number) => void
}

function ChatItem({ chat, selected, renamed, deleted, handleSelect, handleRename, handleDelete }: ChatItemProps) {
    const { loading } = useAppSelector(state => state.settingsReducer)
    const [renameOpened, setRenameOpened] = useState(false)

    return (
        <Paper
            onClick={e => { e.stopPropagation(); handleSelect(chat.id) }}
            withBorder
            shadow="xs"
            radius="md"
            style={{ cursor: 'pointer' }}
            p={{ base: 'xs', sm: 'md' }}
            bg={selected === chat.id ? 'indigo.2' : 'white'}
        >
            <Group justify="space-between">
                <Text truncate size="md">
                    {chat.title}
                </Text>

                <ChatModal
                    defaultTitle={chat.title}
                    opened={renameOpened}
                    onClose={() => setRenameOpened(false)}
                    handleSubmit={(title) => handleRename(title, chat.id)}
                    formTitle="Введите новое название чата"
                    loading={loading['chats/addChat']}
                />

                <Flex>
                    <ActionIcon
                        variant="subtle"
                        onClick={e => { e.stopPropagation(); setRenameOpened(true) }}
                        loading={renamed === chat.id && loading['chats/renameChat']}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>

                    <ActionIcon
                        variant="subtle"
                        onClick={e => { e.stopPropagation(); handleDelete(chat.id) }}
                        loading={deleted === chat.id && loading['chats/deleteChat']}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Flex>
            </Group>
        </Paper>
    )
}

export default ChatItem