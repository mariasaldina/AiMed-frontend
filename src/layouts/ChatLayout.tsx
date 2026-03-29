import Chat from "@/features/chat/components/Chat"
import Navbar from "@/features/navbar/Navbar"
import { AppShell, Burger, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

interface ChatLayoutProps {
    chatId: number | null
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ chatId }) => {
    const [opened, { toggle, close }] = useDisclosure()

    return (
        <AppShell
            navbar={{
                width: {
                    sm: 320
                },
                breakpoint: 'sm',
                collapsed: {
                    desktop: !opened,
                    mobile: !opened
                }
            }}

            header={{ height: 40 }}
        >

            <AppShell.Header>
                <Flex h={'100%'} align={'center'} p={{ base: 'xs', sm: 'md' }}>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                    />
                </Flex>
            </AppShell.Header>

            <AppShell.Navbar w={{ base: '75%', sm: 320 }}>
                <Navbar displayedChat={chatId} onChatSelect={close} />
            </AppShell.Navbar>

            <AppShell.Main
                h="100dvh"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
                {chatId && <Chat chatId={chatId} />}
            </AppShell.Main>

        </AppShell>
    )
}

export default ChatLayout