import { logoutThunk } from "@/features/user/lib/userSlice"
import { useAppDispatch } from "@/hooks/redux"
import { Button, Menu, useMatches } from "@mantine/core"
import { IconLogout, IconUser } from "@tabler/icons-react"
import { useState } from "react"
import { matchPath, NavLink, useLocation } from "react-router-dom"

const ProfileMenu = () => {
    const isMobile = useMatches({ base: true, sm: false })
    const { pathname } = useLocation()
    const isActive = !!matchPath({ path: 'profile/*', end: true }, pathname)

    const [opened, setOpened] = useState(false)

    const dispatch = useAppDispatch()

    return (
        <Menu
            shadow="md"
            width={200}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
        >
            <Menu.Target>
                <Button
                    variant={isActive ? "filled" : opened ? "light" : "subtle"}
                    leftSection={!isMobile ? <IconUser /> : null}
                    h='100%'
                    bdrs={0}
                >
                    {!isMobile ? "Профиль" : <IconUser />}
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item component={NavLink} to="/profile/questionnaire">
                    Профиль
                </Menu.Item>
                <Menu.Item component={NavLink} to="/profile/contacts">
                    Контакты
                </Menu.Item>
                <Menu.Item
                    rightSection={<IconLogout />}
                    onClick={() => dispatch(logoutThunk())}
                >
                    Выйти
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ProfileMenu