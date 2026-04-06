import { Box, Button, Center, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { Outlet } from "react-router-dom"

const EditableTemplate = () => {
    const [isEditing, { open, close }] = useDisclosure(false)

    return (
        <Center px={{ base: 'lg', sm: '25%' }} py={{ base: 'lg', sm: 'xl' }} h={'100%'}>
            <Stack h={'100%'} w={'100%'}>
                <Button
                    style={{ alignSelf: 'flex-end' }}
                    leftSection={<IconEdit />}
                    onClick={() => open()}
                    disabled={isEditing}
                >
                    Редактировать
                </Button>

                <Box flex={1} mih={0}>
                    <Outlet context={{ isEditing, close }}/>
                </Box>
            </Stack>
        </Center>
    )
}

export default EditableTemplate