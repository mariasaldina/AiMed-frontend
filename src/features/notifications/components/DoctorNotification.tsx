import { Accordion, Blockquote, Button, Group, Text } from "@mantine/core"
import type { DoctorNotificationType } from "../types/notifications"
import PatientCard from "../ui/PatientCard"
import { useAppDispatch } from "@/hooks/redux"
import { notifyPatientThunk } from "../lib/notificationSlice"
import ApprovedMessage from "../ui/ApprovedMessage"
import RejectedMessage from "../ui/RejectedMessage"
import NotificationCard from "../ui/NotificationCard"
import PendingMessage from "../ui/PendingMessage"

interface DoctorNotificationProps {
    notification: DoctorNotificationType
}

const DoctorNotification: React.FC<DoctorNotificationProps> = ({ notification }) => {
    const dispatch = useAppDispatch()

    const handleApprove = async () => {
        dispatch(notifyPatientThunk({ status: 'APPROVED', notificationId: notification.id }))
    }

    const handleReject = async () => {
        dispatch(notifyPatientThunk({ status: 'REJECTED', notificationId: notification.id }))
    }

    let color;
    switch (notification.invitationStatus) {
        case 'APPROVED': color = 'green'; break
        case 'REJECTED': color = 'pink'; break
        case 'PENDING': color = 'blue'
    }

    return (
        <NotificationCard status={notification.invitationStatus} createdAt={notification.createdAt}>
            {notification.invitationStatus === 'APPROVED' &&
                <ApprovedMessage text="Вы дали пациенту свои контакты" />}

            {notification.invitationStatus === 'REJECTED' &&
                <RejectedMessage text="Вы отклонили приглашение" />}

            {notification.invitationStatus === 'PENDING' &&
                <PendingMessage text="Вы получили заявку" />}

            <Blockquote p={{ base: 'sm' }} color={color}>{notification.content}</Blockquote>

            <Accordion>
                <Accordion.Item value={'Детали'}>
                    <Accordion.Control>
                        <Text size='sm'>О пациенте</Text>
                    </Accordion.Control>
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
        </NotificationCard>
    )
}

export default DoctorNotification