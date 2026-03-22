import Button from "@/ui/btn/Button"
import Input from "@/ui/input/Input"
import styles from './MessageInput.module.scss'

interface MessageInputProps {
    value: string,
    onChange: (newValue: string) => void,
    onSend: () => void,
    findDoctors: () => void,
    disabled: boolean
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend, findDoctors, disabled }) => {
    return (
        <form onSubmit={e => { e.preventDefault(); onSend(); }} className={styles.wrapper}>
            <Input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Опишите свои симптомы"
                height={70}
                borderRadius={20}
                className={styles.input}
                disabled={disabled}
            />
            <div className={styles.buttonWrapper}>
                <Button type="submit" variant="input" className={styles.button} disabled={disabled}>
                    Отправить
                </Button>
                <Button
                    type="button"
                    variant="input"
                    className={styles.button}
                    onClick={findDoctors}
                    disabled={disabled}
                >
                    Найти специалиста
                </Button>
            </div>
        </form>
    )
}

export default MessageInput