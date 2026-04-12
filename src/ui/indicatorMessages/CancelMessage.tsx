import { Flex, Text, useMantineTheme } from "@mantine/core"
import { IconClipboardXFilled } from "@tabler/icons-react"

function CancelMessage({ text }: { text: string }) {
    const theme = useMantineTheme()

    return (
        <Flex gap={'md'} bg='gray.1' p={'sm'} bdrs={0} align={'center'}>
            <IconClipboardXFilled color={theme.colors['gray'][8]} />
            <Text fz={{ base: 'sm', sm: 'md' }}>
                {text}
            </Text>
        </Flex>
    )
}

export default CancelMessage