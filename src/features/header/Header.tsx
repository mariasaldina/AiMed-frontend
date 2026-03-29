import { Button } from '@mantine/core'
import styles from './Header.module.scss'

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <header className={styles.header}>
        <Button onClick={onLogout} type="submit">Выйти</Button>
    </header>
)

export default Header