import { useAppSelector } from "@/hooks/redux"
import { Box, Button, Center, Paper, ScrollArea, Stack, Text } from "@mantine/core"
import PatientProfileForm from "./PatientProfileForm"
import DoctorProfileForm from "./DoctorProfileForm"
import { useDisclosure } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"

const UserProfile = () => {
    const { user } = useAppSelector(state => state.userReducer)
    const [isEditing, { open, close }] = useDisclosure(false)

    const handleCancel = () => {
        
        close()
    }

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
                    <ScrollArea
                        h={"100%"}
                        type="auto"
                        offsetScrollbars
                    >
                        {user?.role === 'PATIENT' && <PatientProfileForm isEditing />}
                        {user?.role === 'DOCTOR' && <DoctorProfileForm />}
                    </ScrollArea>
                </Box>

                {isEditing ?
                    <Stack>
                        <Button>
                            Сохранить
                        </Button>
                        <Button variant='light' onClick={handleCancel}>
                            Отменить
                        </Button>
                    </Stack>
                    : null}
            </Stack>
        </Center>
    )
}

export default UserProfile