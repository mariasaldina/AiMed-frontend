import calendar from 'dayjs/plugin/calendar'
import dayjs from 'dayjs'

dayjs.extend(calendar)
dayjs.locale('ru')

export const displayTime = (time: string) => {
    const now = dayjs()
    const date = dayjs(time)

    if (date.isSame(now, 'day')) return `Сегодня в ${date.format('HH:mm')}`
    if (date.isSame(now.subtract(1, 'day'), 'day')) return `Вчера в ${date.format('HH:mm')}`
    if (date.isSame(now, 'week')) return `${date.format('dddd')} в ${date.format('HH:mm')}`
    return date.format('DD.MM.YYYY HH:mm')
}

export const getYears = (birthdate: string | Date) => {
    return dayjs().diff(dayjs(birthdate), 'year')
}