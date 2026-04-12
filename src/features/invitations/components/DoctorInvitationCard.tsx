import { Accordion, Blockquote, Button, Group, Stack, Text } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import ApprovedMessage from "../../../ui/indicatorMessages/ApprovedMessage"
import RejectedMessage from "../../../ui/indicatorMessages/RejectedMessage"
import PendingMessage from "../../../ui/indicatorMessages/PendingMessage"
import { useState } from "react"
import type { Invitation } from "../type/invitations"
import { sendDoctorsResponseThunk } from "../lib/invitationSlice"
import PatientCard from "../ui/PatientCard"

interface DoctorInvitationCardProps {
    invitation: Invitation
}

function DoctorInvitationCard({ invitation }: DoctorInvitationCardProps) {
    const { loading } = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()
    const [clicked, setClicked] = useState<'APPROVED' | 'REJECTED' | null>(null)

    const handleApprove = async () => {
        setClicked('APPROVED')
        dispatch(sendDoctorsResponseThunk({ status: 'APPROVED', invitationId: invitation.id }))
    }

    const handleReject = async () => {
        setClicked('REJECTED')
        dispatch(sendDoctorsResponseThunk({ status: 'REJECTED', invitationId: invitation.id }))
    }

    let color;
    switch (invitation.status) {
        case 'APPROVED': color = 'green'; break
        case 'REJECTED': color = 'pink'; break
        case 'PENDING': color = 'blue'
    }

    return (
        <Stack>
            {invitation.status === 'APPROVED' &&
                <ApprovedMessage text="Вы дали пациенту свои контакты" />}

            {invitation.status === 'REJECTED' &&
                <RejectedMessage text="Вы отклонили приглашение" />}

            {invitation.status === 'PENDING' &&
                <PendingMessage text="Вы получили заявку" />}

            <Blockquote p={{ base: 'sm' }} color={color}>{invitation.content}</Blockquote>

            <Accordion>
                <Accordion.Item value={'Детали'}>
                    <Accordion.Control>
                        <Text size='sm'>О пациенте</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <PatientCard patient={invitation.patient} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            {invitation.status === 'PENDING' &&
                <Group justify="flex-start" mt="xs">
                    <Button
                        variant="filled"
                        onClick={handleApprove}
                        loading={clicked === 'APPROVED' && loading['invitations/sendDoctorsResponse']}
                        disabled={clicked !== null}
                    >
                        Дать контакты
                    </Button>

                    <Button
                        variant='light'
                        onClick={handleReject}
                        loading={clicked === 'REJECTED' && loading['invitations/sendDoctorsResponse']}
                        disabled={clicked !== null}
                    >
                        Отклонить
                    </Button>
                </Group>}
        </Stack>
    )
}

export default DoctorInvitationCard