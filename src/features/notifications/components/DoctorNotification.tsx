import { Accordion, Blockquote, Button, Group, Paper, Stack, Text } from "@mantine/core"
import type { DoctorNotificationType } from "../types/notifications"
import { displayTime } from "@/utils/time"
import PatientCard from "../ui/PatientCard"
import { useAppDispatch } from "@/hooks/redux"
import { notifyPatientThunk } from "../lib/notificationSlice"

interface DoctorNotificationProps {
    notification: DoctorNotificationType
}

const DoctorNotification: React.FC<DoctorNotificationProps> = ({ notification }) => {
    const dispatch = useAppDispatch()

    const handleReject = async () => {
        dispatch(notifyPatientThunk({ status: 'APPROVED', notificationId: notification.id }))
    }

    const handleApprove = async () => {
        dispatch(notifyPatientThunk({ status: 'REJECTED', notificationId: notification.id }))
    }

    return (
        <Paper
            withBorder
            p={{ base: 'sm', sm: 'md' }}
        >
            <Stack>
                <Text>Вы получили приглашение к диалогу:</Text>
                <Blockquote p={{ base: 'sm' }}>{notification.content}</Blockquote>

                <Accordion>
                    <Accordion.Item value={'Детали'}>
                        <Accordion.Control>Детали</Accordion.Control>
                        <Accordion.Panel>
                            <PatientCard patient={notification.patient} />
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>

                {notification.invitationStatus === 'PENDING' &&
                    <Group justify="flex-start" mt="xs">
                        <Button
                            variant="filled"
                            onClick={handleApprove}
                        >
                            Дать контакты
                        </Button>

                        <Button
                            variant='light'
                            onClick={handleReject}
                        >
                            Отклонить
                        </Button>
                    </Group>}

                <Text size="xs" c="dimmed" ta="right" mt={4}>
                    {displayTime(notification.createdAt)}
                </Text>
            </Stack>
        </Paper>
    )
}

export default DoctorNotification