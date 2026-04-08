import { useMantineTheme } from "@mantine/core"
import type { InvitationStatus } from "../types/notifications"

export const useInvitationStatusColor = (status: InvitationStatus) => {
    const theme = useMantineTheme()

    const colorMap: Record<InvitationStatus, string> = {
        APPROVED: 'green',
        REJECTED: 'pink',
        PENDING: 'blue'
    }

    return theme.colors[colorMap[status]]
}