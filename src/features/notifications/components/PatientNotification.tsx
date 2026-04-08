import { Accordion, Stack, Text } from "@mantine/core"
import type { PatientNotificationType } from "../types/notifications"
import DoctorCard from "../ui/DoctorCard"
import ApprovedMessage from "../ui/ApprovedMessage"
import RejectedMessage from "../ui/RejectedMessage"
import ContactsCard from "../ui/ContactsCard"
import { IconClipboardHeart } from "@tabler/icons-react"
import NotificationCard from "../ui/NotificationCard"
import { useInvitationStatusColor } from "../hooks/useInvitationStatusColor"

interface PatientNotificationProps {
    notification: PatientNotificationType
}

const PatientNotification: React.FC<PatientNotificationProps> = ({ notification }) => {
    const color = useInvitationStatusColor(notification.invitationStatus)

    return (
        <NotificationCard
            status={notification.invitationStatus}
            createdAt={notification.createdAt}
        >
            <Stack>
                {notification.invitationStatus === 'APPROVED' &&
                    <>
                        <ApprovedMessage text="Специалист поделился с вами контактами" />
                        <ContactsCard contacts={notification.doctor.contacts!} />
                    </>}

                {notification.invitationStatus === 'REJECTED' &&
                    <RejectedMessage text="Специалист отклонил ваше приглашение" />}

                {notification.doctor && <Accordion>
                    <Accordion.Item value={'Детали'}>
                        <Accordion.Control
                            icon={<IconClipboardHeart color={color[6]} />}
                        >
                            <Text size='sm'>О специалисте</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <DoctorCard doctor={notification.doctor} />
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>}
            </Stack>
        </NotificationCard>
    )
}

export default PatientNotification