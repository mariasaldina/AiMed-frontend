import { Paper, Stack, Text } from "@mantine/core"
import type { ReactNode } from "react"
import type { InvitationStatus } from "../types/notifications"
import { displayTime } from "@/utils/time"
import { useInvitationStatusColor } from "../hooks/useInvitationStatusColor"

interface NotificationCardProps {
    status: InvitationStatus,
    createdAt: string,
    children: ReactNode
}

const NotificationCard: React.FC<NotificationCardProps> = ({ status, createdAt, children }) => {
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

export default NotificationCard