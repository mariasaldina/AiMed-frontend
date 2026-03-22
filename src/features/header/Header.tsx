import Button from '@/ui/btn/Button'
import styles from './Header.module.scss'

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <header className={styles.header}>
        <Button onClick={onLogout} type="submit" variant="secondary">Выйти</Button>
    </header>
)

export default Header