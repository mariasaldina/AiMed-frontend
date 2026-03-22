import type React from "react"
import styles from './UserMessage.module.scss'

const UserMessage: React.FC<{ content: string }> = ({ content }) => {
    return (
        <li className={styles.userMessage}>
            {content}
        </li>
    )
}

export default UserMessage