import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./NotFoundPage.module.scss"
import Button from "@/ui/btn/Button"

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>Страница не найдена</p>
            <Button
                onClick={() => navigate("/chats")}
                type="button"
                variant="standard"
            >
                Вернуться на главную
            </Button>
        </div>
    )
}

export default NotFoundPage