import { Flex, Text, useMantineTheme } from "@mantine/core"
import { IconCheckFilled } from "@tabler/icons-react"

function ApprovedMessage({ text }: { text: string }) {
    const theme = useMantineTheme()

    return (
        <Flex gap={'md'} bg='green.1' p={'sm'} bdrs={0} align={'center'}>
            <IconCheckFilled color={theme.colors['green'][8]} />
            <Text fz={{ base: 'sm', sm: 'md' }}>
                {text}
            </Text>
        </Flex>
    )
}

export default ApprovedMessage