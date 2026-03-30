import { Button, Flex, Portal } from "@mantine/core"
import { IconLogin } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const LandingLayout = () => {
    const navigate = useNavigate()

    return (
        <Portal target='#header-actions'>
            <Button onClick={() => navigate('/auth')}>
                <Flex gap={10} align={'center'}>
                    Войти
                    <IconLogin />
                </Flex>
            </Button>
        </Portal>
    )
}

export default LandingLayout