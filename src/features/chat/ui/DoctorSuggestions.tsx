import type React from 'react'
import type { Doctor } from '../types/chat'
import { Badge, Flex, Paper, Stack, Text } from '@mantine/core'
import { getExperience } from '../utils/experienceFormatter'
import InviteDoctorModal from '@/features/chat/components/InviteDoctorModal'

interface DoctorSuggestionsProps {
    doctors: Doctor[]
}

const DoctorSuggestions: React.FC<DoctorSuggestionsProps> = ({ doctors }) => {
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
                                <Text c="blue" size='sm'>{getExperience(new Date(d.practiceStartDate))}</Text>

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
                            
                            <InviteDoctorModal doctorId={parseInt(d.userId)} />
                        </Flex>
                    </Paper>
                ))}
            </Stack>
        </Stack>
    )
}

export default DoctorSuggestions