import { type AppShellNavbarProps } from "@mantine/core";
import { ActionIcon, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import CreateChatModal from "../chat/components/CreateChatModal";
import { useAppSelector } from "@/hooks/redux";
import useChatList from "../chat/hooks/useChatList";

interface NavbarProps extends AppShellNavbarProps {
    displayedChat: number | null,
    onChatSelect: () => void
}

const Navbar: React.FC<NavbarProps> = ({ displayedChat, onChatSelect }) => {
    const chats = useAppSelector(state => state.chats)

    const { handleDelete, handleSelect } = useChatList(displayedChat, onChatSelect)

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

export default Navbar