import { Accordion, Stack, Text } from "@mantine/core"
import ApprovedMessage from "../../../ui/indicatorMessages/ApprovedMessage"
import RejectedMessage from "../../../ui/indicatorMessages/RejectedMessage"
import { IconClipboardHeart } from "@tabler/icons-react"
import { useInvitationStatusColor } from "@/features/invitations/hooks/useInvitationStatusColor"
import type { Invitation } from "../type/invitations"
import ContactsCard from "@/features/invitations/ui/ContactsCard"
import DoctorCard from "../ui/DoctorCard"

interface PatientInvitationCardProps {
    invitation: Invitation
}

function PatientInvitationCard({ invitation }: PatientInvitationCardProps) {
    const color = useInvitationStatusColor(invitation.status)
    console.log('Username: ', invitation.doctor.username)

    return (
        <Stack>
            {invitation.status === 'APPROVED' &&
                <>
                    <ApprovedMessage text="Специалист поделился с вами контактами" />
                    <ContactsCard contacts={invitation.doctor.contacts!} />
                </>}

            {invitation.status === 'REJECTED' &&
                <RejectedMessage text="Специалист отклонил ваше приглашение" />}

            {invitation.doctor && <Accordion>
                <Accordion.Item value={'Детали'}>
                    <Accordion.Control
                        icon={<IconClipboardHeart color={color[6]} />}
                    >
                        <Text size='sm'>О специалисте</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <DoctorCard doctor={invitation.doctor} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>}
        </Stack>
    )
}

export default PatientInvitationCard