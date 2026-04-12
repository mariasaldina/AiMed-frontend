import { Accordion, Button, Text } from "@mantine/core"
import ApprovedMessage from "../../../ui/indicatorMessages/ApprovedMessage"
import RejectedMessage from "../../../ui/indicatorMessages/RejectedMessage"
import { IconClipboardHeart } from "@tabler/icons-react"
import { useInvitationStatusColor } from "@/features/invitations/hooks/useInvitationStatusColor"
import type { Invitation } from "../type/invitations"
import ContactsCard from "@/features/invitations/ui/ContactsCard"
import DoctorCard from "../ui/DoctorCard"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { cancelInvitationThunk } from "../lib/invitationSlice"
import { useState } from "react"
import PendingMessage from "@/ui/indicatorMessages/PendingMessage"
import CancelMessage from "@/ui/indicatorMessages/CancelMessage"

interface PatientInvitationCardProps {
    invitation: Invitation
}

function PatientInvitationCard({ invitation }: PatientInvitationCardProps) {
    const color = useInvitationStatusColor(invitation.status)
    console.log('Username: ', invitation.doctor.username)

    const { loading } = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const [clicked, setClicked] = useState(false)

    const handleCancel = () => {
        setClicked(true)
        dispatch(cancelInvitationThunk({ invitationId: invitation.id }))
    }

    return (
        <>
            {invitation.status === 'PENDING' &&
                <PendingMessage text="Вы отправили приглашение к диалогу" />}

            {invitation.status === 'APPROVED' &&
                <>
                    <ApprovedMessage text="Специалист поделился с вами контактами" />
                    <ContactsCard contacts={invitation.doctor.contacts!} />
                </>}

            {invitation.status === 'REJECTED' &&
                <RejectedMessage text="Специалист отклонил ваше приглашение" />}

            {invitation.status === 'CANCELLED' &&
                <CancelMessage text="Вы отменили приглашение" />}

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

            {invitation.status === 'PENDING' &&
                <Button
                    variant='light'
                    onClick={handleCancel}
                    loading={loading['invitations/cancelInvitation']}
                    disabled={clicked}
                >
                    Отменить
                </Button>}
        </>
    )
}

export default PatientInvitationCard