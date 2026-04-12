import ChatNavbar from "@/features/chat/components/ChatNavbar"
import Header from "@/features/header/Header"
import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { matchPath, Outlet, useLocation } from "react-router-dom"

const AppLayout = () => {
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false)

    const { pathname } = useLocation()
    const withNavbar = !!matchPath({ path: 'chats/*', end: true }, pathname)

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
                <Header
                    navbarOpened={desktopOpened}
                    showNavbar={withNavbar}
                    toggleNavbar={() => {
                        toggleDesktop()
                        toggleMobile()
                    }}
                />
            </AppShell.Header>

            {withNavbar &&
                <AppShell.Navbar w={{ base: '75%', sm: 320 }}>
                    <ChatNavbar onSelect={closeMobile} />
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