import { Button, Flex, Modal, Stack, Text } from "@mantine/core"
import { IconMoodSadFilled } from "@tabler/icons-react";

interface ErrorAlertProps {
    errorMessage: string | null
    onClose: () => void
}

function ErrorAlert({ errorMessage, onClose }: ErrorAlertProps) {
    return (
        <Modal
            opened={!!errorMessage}
            onClose={onClose}
            title={
                <Flex gap={10}>
                    <Text fw="600">
                        Ошибка
                    </Text>
                    <IconMoodSadFilled />
                </Flex>
            }
            centered
        >
            <Stack>
                <Text>{errorMessage}</Text>
                <Button onClick={onClose} bg={'gray'}>Закрыть</Button>
            </Stack>
        </Modal>
    )
}

export default ErrorAlert