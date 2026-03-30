import { Loader, Paper } from '@mantine/core'

const TypingIndicator: React.FC = () => {
    return (
        <Paper
            bg="gray.1"
            py={8}
            px={12}
            radius="xl"
            style={{ alignSelf: 'flex-start' }}
        >
            <Loader color="gray.5" size="md" type="dots" />
        </Paper>
    )
}

export default TypingIndicator