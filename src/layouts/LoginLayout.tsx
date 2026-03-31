import LoginForm from "@/features/auth/components/LoginForm"
import SignUpForm from "@/features/auth/components/SignUpForm"
import { useState } from "react"
import { Button, Center, Paper, Portal, Transition } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const LoginLayout = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)

    return (
        <>
            <Portal target='#header-actions'>
                <Button onClick={() => navigate('/')}>На главную</Button>
            </Portal>

            <Center pos={'relative'} h="100dvh" w="100dvw">
                <Transition
                    mounted={isLogin}
                    transition='fade'
                >
                    {(styles) =>
                        <Paper style={styles} pos={'absolute'}>
                            <LoginForm onSwitch={() => setIsLogin(false)} />
                        </Paper>
                    }
                </Transition>

                <Transition
                    mounted={!isLogin}
                    transition='fade'
                >
                    {(styles) =>
                        <Paper style={styles} pos='absolute'>
                            <SignUpForm onSwitch={() => setIsLogin(true)} />
                        </Paper>
                    }
                </Transition>
            </Center>
        </>
    )
}

export default LoginLayout