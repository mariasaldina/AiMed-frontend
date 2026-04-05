import { Button, Flex, Portal } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { logout as logoutApi } from '@/features/auth/api/auth'
import { useAppDispatch } from "@/hooks/redux"
import { resetUser } from "@/features/user/lib/userSlice"
import { Outlet, useNavigate } from "react-router-dom"

const ProfileLayout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const logout = async () => {
        try {
            await logoutApi()
            dispatch(resetUser())
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Portal target='#header-actions'>
                <Flex gap={20}>
                    <Button onClick={() => navigate('/chats')}>
                        Чаты
                    </Button>

                    <Button onClick={logout} variant='light' leftSection={<IconLogout />}>
                        Выйти
                    </Button>
                </Flex>
            </Portal>

            <Outlet />
        </>
    )
}

export default ProfileLayout