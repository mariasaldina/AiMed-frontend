import { Loader } from '@mantine/core'
import styles from './Sidebar.module.scss'
import { type ReactNode } from "react"

interface SidebarProps {
    folded: boolean,
    isLoading: boolean,
    children: ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({
    folded, isLoading, children
}) => {
    return (
        <div className={`${styles.sidebar} ${!isLoading && !folded && styles.open}`}>
            {isLoading
                ?
                <div className={styles.loader}>
                    <Loader />
                </div>
                :
                (!folded && children)
            }
        </div>
    )
}

export default Sidebar