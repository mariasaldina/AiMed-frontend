import { Flex, Text, useMantineTheme } from "@mantine/core"
import { IconClockFilled } from "@tabler/icons-react"

const PendingMessage: React.FC<{ text: string }> = ({ text }) => {
    const theme = useMantineTheme()

    return (
        <Flex gap={'md'} bg='blue.1' p={'sm'} bdrs={0} align={'center'}>
            <IconClockFilled color={theme.colors['blue'][6]} />
            <Text fz={{ base: 'sm', sm: 'md' }}>
                {text}
            </Text>
        </Flex>
    )
}

export default PendingMessage