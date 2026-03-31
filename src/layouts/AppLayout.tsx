import Navbar from "@/features/navbar/Navbar"
import { AppShell, Burger, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { matchPath, Outlet, useLocation } from "react-router-dom"

const AppLayout = () => {
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false)

    const { pathname } = useLocation()
    const showNavbarPaths = ['/chats', '/chats/:chatId']
    const withNavbar = showNavbarPaths.some(pattern => 
        matchPath(pattern, pathname)
    )

    return (
        <AppShell
            navbar={withNavbar ? {
                width: {
                    sm: 320
                },
                breakpoint: 'sm',
                collapsed: {
                    desktop: !desktopOpened,
                    mobile: !mobileOpened
                }
            } : undefined}

            header={{ height: 50 }}
        >

            <AppShell.Header>
                <Flex h={'100%'} w={'100%'} align={'center'} p={{ base: 'xs', sm: 'md' }}>
                    {withNavbar &&
                        <Burger
                            opened={desktopOpened || mobileOpened}
                            onClick={() => {
                                toggleDesktop()
                                toggleMobile()
                            }}
                            size="sm"
                        />}
                    <div id="header-actions" style={{ marginLeft: 'auto' }}></div>
                </Flex>
            </AppShell.Header>

            {withNavbar && <AppShell.Navbar w={{ base: '75%', sm: 320 }}>
                <Navbar onChatSelect={closeMobile} />
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