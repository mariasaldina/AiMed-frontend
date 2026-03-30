import Navbar from "@/features/navbar/Navbar"
import { AppShell, Burger, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Outlet } from "react-router-dom"

interface MainLayoutProps {
    withNavbar: boolean
}

const AppLayout: React.FC<MainLayoutProps> = ({ withNavbar }) => {
    const [opened, { toggle, close }] = useDisclosure()

    return (
        <AppShell
            navbar={withNavbar ? {
                width: {
                    sm: 320
                },
                breakpoint: 'sm',
                collapsed: {
                    desktop: !opened,
                    mobile: !opened
                }
            } : undefined}

            header={{ height: 50 }}
        >

            <AppShell.Header>
                <Flex h={'100%'} w={'100%'} align={'center'} p={{ base: 'xs', sm: 'md' }}>
                    {withNavbar &&
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            size="sm"
                        />}
                    <div id="header-actions" style={{ marginLeft: 'auto' }}></div>
                </Flex>
            </AppShell.Header>

            {withNavbar && <AppShell.Navbar w={{ base: '75%', sm: 320 }}>
                <Navbar onChatSelect={close} />
            </AppShell.Navbar>}

            <AppShell.Main
                h="100dvh"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
                <Outlet />
            </AppShell.Main>

        </AppShell>
    )
}

export default AppLayout