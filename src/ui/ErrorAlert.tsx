import { Button, Flex, Modal, Stack, Text } from "@mantine/core"
import { IconMoodSadFilled } from "@tabler/icons-react";

const ErrorAlert: React.FC<{ errorMessage: string | null; onClose: () => void }> = ({ errorMessage, onClose }) => {
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