import { useNavigate } from "react-router-dom"
import { Button, Stack, Title } from "@mantine/core"

function NotFoundLayout() {
    const navigate = useNavigate()

    return (
        <Stack justify={'center'} align={'center'} h={'100dvh'} gap={20}>
            <Title size="96px" c={'#333'} fw={600}>404</Title>
            <Title size="20px" c={'#666'}>Страница не найдена</Title>
            <Button
                onClick={() => navigate("/chats")}
                type="button"
            >
                Вернуться на главную
            </Button>
        </Stack>
    )
}

export default NotFoundLayout