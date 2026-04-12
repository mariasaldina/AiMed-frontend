import { Blockquote, Paper, Stack, Text } from "@mantine/core"
import { IconQuoteFilled } from "@tabler/icons-react"

interface InvitationMessage {
    content: string,
    fullName: string
}

function InvitationMessage({ content, fullName }: InvitationMessage) {
    return (
        <Paper
            p='lg'
            bg="indigo.1"
            style={{
                alignSelf: 'center',
                borderRadius: 12,
                maxWidth: '70%'
            }}
        >
            <Stack p={'md'}>
                <Text>
                    Вы отправили уведомление специалисту:
                </Text>
                
                <Text style={{ alignSelf: 'center'}}>
                    {fullName}
                </Text>

                <Blockquote icon={<IconQuoteFilled />} p={'md'}>
                    <Text>
                        {content}
                    </Text>
                </Blockquote>
            </Stack>
        </Paper>
    )
}

export default InvitationMessage