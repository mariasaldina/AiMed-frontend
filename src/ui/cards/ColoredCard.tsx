import { Paper, Stack, Text } from "@mantine/core"
import type { ReactNode } from "react"
import { displayTime } from "@/utils/time"
import { useInvitationStatusColor } from "../../features/invitations/hooks/useInvitationStatusColor"

interface ColoredCardProps {
    status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED'
    createdAt: string,
    children: ReactNode
}

function ColoredCard({ status, createdAt, children }: ColoredCardProps) {
    const color = useInvitationStatusColor(status)

    return (
        <Paper
            withBorder
            p={{ base: 'md', sm: 'lg' }}
            style={{
                borderLeft: `20px solid ${color[4]}`,
                borderRadius: '0 20px 20px 0'
            }}
        >
            <Stack>
                {children}
                <Text size="xs" c="dimmed" ta="right" mt={4}>
                    {displayTime(createdAt)}
                </Text>
            </Stack>
        </Paper>
    )
}

export default ColoredCard