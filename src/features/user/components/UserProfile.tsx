import { useAppSelector } from "@/hooks/redux"
import { Box, Button, Center, ScrollArea, Stack } from "@mantine/core"
import PatientProfileForm from "./PatientProfileForm"
import DoctorProfileForm from "./DoctorProfileForm"
import { useDisclosure } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"

const UserProfile = () => {
    const { user } = useAppSelector(state => state.userReducer)
    const [isEditing, { open, close }] = useDisclosure(false)

    return (
        <Center py={{ base: 'lg', sm: 'xl' }} h={'100%'}>
            <Stack h={'100%'}>
                <Button
                    style={{ alignSelf: 'flex-end' }}
                    leftSection={<IconEdit />}
                    onClick={() => open()}
                    disabled={isEditing}
                >
                    Редактировать
                </Button>

                <Box flex={1} mih={0}>
                    {user?.role === 'PATIENT' && <PatientProfileForm isEditing={isEditing} onCancel={close} />}
                    {user?.role === 'DOCTOR' && <DoctorProfileForm isEditing={isEditing} onCancel={close} />}
                </Box>
            </Stack>
        </Center>
    )
}

export default UserProfile