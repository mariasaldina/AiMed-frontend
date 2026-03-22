import Loader from "@/ui/loader/Loader"
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
                    <Loader size={30} />
                </div>
                :
                (!folded && children)
            }
        </div>
    )
}

export default Sidebar