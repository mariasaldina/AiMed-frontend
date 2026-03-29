import LoginForm from "@/features/auth/components/LoginForm"
import SignUpForm from "@/features/auth/components/SignUpForm"
import { useState } from "react"
import styles from './LoginPage.module.scss'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <div className={`${styles.panel} ${isLogin ? styles.active : ''}`}>
                    <LoginForm onSwitch={() => setIsLogin(false)} />
                </div>

                <div className={`${styles.panel} ${!isLogin ? styles.active : ''}`}>
                    <SignUpForm onSwitch={() => setIsLogin(true)} />
                </div>
            </div>
        </div>
    )
}

export default LoginPage