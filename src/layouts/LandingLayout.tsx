import { Button, Center, Portal, Title } from "@mantine/core"
import { IconLogin } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const LandingLayout = () => {
    const navigate = useNavigate()

    return (
        <>
            <Portal target='#header-actions'>
                <Button onClick={() => navigate('/auth')} leftSection={<IconLogin />}>
                    Войти
                </Button>
            </Portal>

            <Center h={'100dvh'}>
                <Title size='xl' fw={700}>Добро пожаловать!</Title>
            </Center>
        </>
    )
}

export default LandingLayout