export const getExperience = (practiceStartDate: Date): string => {
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