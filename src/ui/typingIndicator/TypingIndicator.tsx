import styles from './TypingIndicator.module.scss'

const TypingIndicator: React.FC = () => {
    return (
        <li className={styles.wrapper}>
            <div className={styles.bubble}>
                <span />
                <span />
                <span />
            </div>
        </li>
    )
}

export default TypingIndicator