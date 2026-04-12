import { Loader, Paper } from '@mantine/core'

function TypingIndicator() {
    return (
        <Paper
            bg="gray.3"
            py={8}
            px={12}
            radius="xl"
            style={{ justifySelf: 'center' }}
            w={90}
        >
            <Loader color="gray.5" size="md" type="dots" style={{ justifySelf: 'center' }} />
        </Paper>
    )
}

export default TypingIndicator