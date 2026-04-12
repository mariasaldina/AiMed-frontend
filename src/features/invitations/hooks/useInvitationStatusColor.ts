import type { InvitationStatus } from "@/features/invitations/type/invitations"
import { useMantineTheme } from "@mantine/core"

export const useInvitationStatusColor = (status: InvitationStatus) => {
    const theme = useMantineTheme()

    const colorMap: Record<InvitationStatus, string> = {
        APPROVED: 'green',
        REJECTED: 'pink',
        PENDING: 'blue',
        CANCELLED: 'grey'
    }

    return theme.colors[colorMap[status]]
}