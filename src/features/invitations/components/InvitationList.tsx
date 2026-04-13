import CardContainer from "@/ui/cards/CardContainer"
import { useEffect } from "react"
import { Stack } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { loadInvitationsThunk } from "../lib/invitationSlice"
import type { Invitation } from "../type/invitations"
import PatientInvitationCard from "./PatientInvitationCard"
import DoctorInvitationCard from "./DoctorInvitationCard"

const InvitationList = () => {
    const { invitations } = useAppSelector(state => state.invitationReducer)
    const { user } = useAppSelector(state => state.userReducer)
    const { loading } = useAppSelector(state => state.settingsReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadInvitationsThunk())
    }, [])

    const elementHandler = (i: Invitation) => {
        if (user?.role === 'PATIENT') {
            return <PatientInvitationCard invitation={i} />
        }
        if (user?.role === 'DOCTOR') {
            return <DoctorInvitationCard invitation={i} />
        }
        return null
    }

    return (
        <Stack
            py={{ base: 'md', sm: 'xl' }}
            h={'100%'}
        >
            <CardContainer
                data={invitations}
                loading={loading['invitations/loadInvitations']}
                elementHandler={elementHandler}
            />
        </Stack>
    )
}

export default InvitationList