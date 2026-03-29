import type React from "react"
import { Paper, Text } from "@mantine/core"

const UserMessage: React.FC<{ content: string }> = ({ content }) => {
    return (
        <Paper
            c="white"
            bg="blue"
            px={15}
            py={10}
            style={{ alignSelf: 'flex-end', borderRadius: '16px 16px 4px 16px' }}
        >
            <Text>
                {content}
            </Text>
        </Paper>
    )
}

export default UserMessage