import { useAppSelector } from "@/hooks/redux"
import { Button, Center, Flex, Stack, Title, useMatches } from "@mantine/core"
import { IconFocus2, IconSparklesFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const LandingLayout = () => {
    const isMobile = useMatches({ base: true, sm: false })
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.userReducer)

    return (
        <Center
            h={'100dvh'}
            style={{
                background: 'linear-gradient(0deg, var(--mantine-color-indigo-5) 0%, var(--mantine-color-indigo-9) 100%)'
            }}
        >
            <Stack>
                <Flex align={'center'} gap={25}>
                    <IconFocus2 size={isMobile ? 60 : 72} color="white" />
                    <Title fz={{ base: 60, sm: 72 }} fw={700} c={'white'} ff={'monospace'}>AiMed</Title>
                </Flex>
                <Button
                    bg={'white'}
                    style={{ color: 'var(--mantine-color-indigo-9)' }}
                    size="xl"
                    bdrs={20}
                    rightSection={<IconSparklesFilled size={35}/>}
                    onClick={() => user ? navigate('/chats') : navigate('/login')}
                >
                    Начать работу
                </Button>
            </Stack>
        </Center>
    )
}

export default LandingLayout