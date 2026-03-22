import type React from 'react'
import type { Doctor } from '../../types/message'
import styles from './DoctorSuggestions.module.scss'
import Button from '@/ui/btn/Button'

interface DoctorSuggestionsProps {
    doctors: Doctor[],
    getContacts: (doctorId: number) => void
}

const getExperience = (practiceStartDate: Date): string => {
    const now = new Date()
    let years = now.getFullYear() - practiceStartDate.getFullYear()

    const hasNotHadAnniversaryYet =
        now.getMonth() < practiceStartDate.getMonth() ||
        (
            now.getMonth() === practiceStartDate.getMonth() &&
            now.getDate() < practiceStartDate.getDate()
        )

    if (hasNotHadAnniversaryYet) {
        years -= 1
    }

    if (years <= 0) {
        return 'Стаж менее 1 года'
    }

    if (years % 10 === 1 && years % 100 !== 11) {
        return `Стаж ${years} год`
    }

    if (
        years % 10 >= 2 &&
        years % 10 <= 4 &&
        !(years % 100 >= 12 && years % 100 <= 14)
    ) {
        return `Стаж ${years} года`
    }

    return `Стаж ${years} лет`
}

const DoctorSuggestions: React.FC<DoctorSuggestionsProps> = ({ doctors, getContacts }) => {
    return (
        <li className={styles.wrapper}>
            <div className={styles.group}>
                <div className={styles.title}>Подходящие специалисты</div>

                <ul className={styles.list}>
                    {doctors.map((d) => (
                        <li key={d.userId} className={styles.item}>
                            <article className={styles.card}>

                                <div className={styles.header}>
                                    <div className={styles.name}>{d.fullName}</div>
                                    <div className={styles.experience}>
                                        {getExperience(d.practiceStartDate)}
                                    </div>
                                </div>

                                {d.specializations.length > 0 && (
                                    <ul className={styles.tags}>
                                        {d.specializations.map((s, i) => (
                                            <li key={`${d.userId}-${i}`} className={styles.tag}>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className={styles.meta}>
                                    <div className={styles.row}>
                                        <span className={styles.label}>Адрес:</span>
                                        <span>{d.address}</span>
                                    </div>

                                    <div className={styles.row}>
                                        <span className={styles.label}>Образование:</span>
                                        <span>{d.education}</span>
                                    </div>
                                </div>

                                {d.description && (
                                    <p className={styles.description}>{d.description}</p>
                                )}

                                <Button
                                    type="button"
                                    variant="doctors"
                                    onClick={(e) => { e.stopPropagation(); getContacts(Number(d.userId)); }}
                                >
                                    Связаться
                                </Button>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

export default DoctorSuggestions