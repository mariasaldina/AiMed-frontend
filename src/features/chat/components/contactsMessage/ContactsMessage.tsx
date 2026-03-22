import type { Contact } from '../../types/message'
import styles from './ContactsMessage.module.scss'

interface ContactsMessageProps {
    contacts: Contact[]
}

const getContactTypeLabel = (type: Contact['type']): string => {
    switch (type) {
        case 'EMAIL':
            return 'Email'
        case 'PHONE':
            return 'Телефон'
        case 'MESSENGER':
            return 'Мессенджер'
        case 'OTHER':
            return 'Другое'
        default:
            return 'Контакт'
    }
}

const ContactsMessage: React.FC<ContactsMessageProps> = ({ contacts }) => {
    return (
        <li className={styles.contactsMessage}>
            <div className={styles.card}>
                <div className={styles.title}>Контакты врача</div>

                <ul className={styles.list}>
                    {contacts.map((c) => (
                        <li key={c.id} className={styles.item}>
                            <div className={styles.row}>
                                <span className={styles.type}>
                                    {getContactTypeLabel(c.type)}
                                </span>

                                {c.isPrimary && (
                                    <span className={styles.primary}>Основной</span>
                                )}
                            </div>

                            <div className={styles.value}>{c.value}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

export default ContactsMessage