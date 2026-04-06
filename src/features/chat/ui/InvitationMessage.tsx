import type React from "react"
import { Paper, Text } from "@mantine/core"

const InvitationMessage: React.FC<{ content: string }> = ({ content }) => {
    return (
        <Paper
            px={12}
            py={6}
            bg="gray.1"
            style={{
                alignSelf: 'center',
                borderRadius: 12,
                maxWidth: '70%'
            }}
        >
            <Text>
                Вы отправили уведомление специалисту:
            </Text>
            <Text>

            </Text>
            <Text>
                {content}
            </Text>
        </Paper>
    )
}

export default InvitationMessage