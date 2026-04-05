import ChatNavbar from "@/features/chat/components/ChatNavbar"
import ProfileNavbar from "@/features/user/components/navbar/ProfileNavbar"
import { AppShell, Burger, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { matchPath, Outlet, useLocation } from "react-router-dom"

type NavbarType = 'chat' | 'profile'

const AppLayout = () => {
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false)

    const { pathname } = useLocation()

    const navbars: Record<NavbarType, { component: React.FC<{ onSelect: () => void }>; paths: string[] }> = {
        chat: { component: ChatNavbar, paths: ['/chats/*'] },
        profile: { component: ProfileNavbar, paths: ['/profile/*'] }
    };

    const NavbarContent =
        Object
            .values(navbars)
            .find(nav => nav.paths.some(p => matchPath({ path: p, end: true }, pathname)))
            ?.component

    return (
        <AppShell
            navbar={NavbarContent ? {
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
                    {NavbarContent &&
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

            {NavbarContent &&
                <AppShell.Navbar w={{ base: '75%', sm: 320 }}>
                    <NavbarContent onSelect={closeMobile} />
                </AppShell.Navbar>
            }

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