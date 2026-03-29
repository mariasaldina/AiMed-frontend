import type React from 'react'
import type { Doctor } from '../../types/message'
import styles from './DoctorSuggestions.module.scss'
import { Badge, Button, Flex, Paper, Stack, Text } from '@mantine/core'

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
        <Stack gap={5} style={{ alignSelf: 'flex-start' }} maw={{ base: 500, sm: 700 }}>
            <Text fw={800}>Подходящие специалисты</Text>
            <Stack gap={5}>
                {doctors.map((d) => (
                    <Paper
                        key={d.userId}
                        withBorder
                        bdrs={30}
                        px={{ base: 'md', sm: 'lg' }}
                        py={{ base: 'xs', sm: 'md' }}
                    >
                        <Flex justify={'space-between'}>
                            <Stack gap={7} flex={1}>
                                <Text fw={700}>
                                    {d.fullName}
                                </Text>
                                <Text c="blue" size='sm'>{getExperience(d.practiceStartDate)}</Text>

                                {d.specializations.length > 0 && (
                                    <Stack>
                                        {d.specializations.map((s, i) => (
                                            <Badge key={`${d.userId}-${i}`} variant='light' color='blue'>
                                                {s}
                                            </Badge>
                                        ))}
                                    </Stack>
                                )}

                                <Stack gap={10}>
                                    <Stack gap={2}>
                                        <Text size='sm' fw={600}>Адрес:</Text>
                                        <Text size='sm'>{d.address}</Text>
                                    </Stack>

                                    <Stack gap={2}>
                                        <Text size='sm' fw={600}>Образование:</Text>
                                        <Text size='sm'>{d.education}</Text>
                                    </Stack>
                                </Stack>

                                {d.description && (
                                    <Text size='md'>{d.description}</Text>
                                )}
                            </Stack>
                            <Button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); getContacts(Number(d.userId)); }}
                                variant='gradient'
                            >
                                Связаться
                            </Button>
                        </Flex>
                    </Paper>
                ))}
            </Stack>
        </Stack>
    )
}

export default DoctorSuggestions