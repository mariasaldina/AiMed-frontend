import LoginForm from "@/features/auth/components/LoginForm"
import SignUpForm from "@/features/auth/components/SignUpForm"
import { useState } from "react"
import { Center, Paper, Transition } from "@mantine/core"

const LoginLayout = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
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

    )
}

export default LoginLayout