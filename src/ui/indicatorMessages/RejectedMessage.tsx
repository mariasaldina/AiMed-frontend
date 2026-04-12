import { Flex, Text, useMantineTheme } from "@mantine/core"
import { IconCircleXFilled } from "@tabler/icons-react"

function RejectedMessage({ text }: { text: string }) {
    const theme = useMantineTheme()

    return (
        <Flex gap={'md'} bg='pink.1' p={'sm'} bdrs={0} align={'center'}>
            <IconCircleXFilled color={theme.colors['red'][6]} />
            <Text fz={{ base: 'sm', sm: 'md' }}>
                {text}
            </Text>
        </Flex>
    )
}

export default RejectedMessage