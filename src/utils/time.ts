import calendar from 'dayjs/plugin/calendar'
import dayjs from 'dayjs'

dayjs.extend(calendar)

export const displayTime = (time: string) => {
    return dayjs(time).calendar(null, {
        sameDay: '[Сегодня в] HH:mm',
        lastDay: '[Вчера в] HH:mm',
        sameElse: 'DD.MM.YYYY HH:mm'
    })
}

export const getAge = (birthdate: string | Date) => {
    return dayjs().diff(dayjs(birthdate), 'year')
}