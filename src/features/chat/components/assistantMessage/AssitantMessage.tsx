import type React from "react"
import type { UrgencyStatus } from "../../types/message"
import styles from './AssistantMessage.module.scss'
import DangerIcon from "@/ui/icons/dangerIcon/DangerIcon"
import MagnifierIcon from "@/ui/icons/magnifierIcon/MagnifierIcon"
import ClipboardIcon from "@/ui/icons/clipboardIcon/ClipboardIcon"
import StethoscopeIcon from "@/ui/icons/stethoscopeIcon/StethoscopeIcon"

interface AssistantMessageProps {
    possibleCauses: string[],
    recommendations: string[],
    doctors: string[],
    urgency: UrgencyStatus
}

const AssistantMessage: React.FC<AssistantMessageProps>
    = ({ possibleCauses, recommendations, doctors, urgency }) => {
        return (
            <li className={styles.assistantMessage}>
                <div className={`${styles.card} ${styles[urgency]}`}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <DangerIcon />
                            <span>Уровень риска</span>
                        </div>
                        <div
                            className={`${styles.urgency}
                            ${urgency === 'SAFE' ?
                                styles.safe :
                                urgency === 'CONCERNING' ?
                                styles.concerning :
                                styles.critical}`}
                        >
                            {urgency === 'SAFE' && 'Безопасный'}
                            {urgency === 'CONCERNING' && 'Тревожный'}
                            {urgency === 'CRITICAL' && 'Критический'}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <MagnifierIcon />
                            <span>Возможные причины</span>
                        </div>
                        <ul>
                            {possibleCauses.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <ClipboardIcon />
                            <span>Рекомендации</span>
                        </div>
                        <ul>
                            {recommendations.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <StethoscopeIcon />
                            <span>К каким специалистам обратиться</span>
                        </div>
                        <ul>
                            {doctors.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                </div>
            </li>
        )
    }

export default AssistantMessage