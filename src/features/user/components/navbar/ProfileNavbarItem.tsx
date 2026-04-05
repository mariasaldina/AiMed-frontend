import { Flex, Paper, Text } from "@mantine/core"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface ProfileNavbarItemProps {
    icon: ReactNode
    text: string
    navigateTo: string,
    onSelect: () => void
}

const ProfileNavbarItem: React.FC<ProfileNavbarItemProps> = ({ icon, text, navigateTo, onSelect }) => {
    const navigate = useNavigate()

    return (
        <Paper
            onClick={() => { onSelect(); navigate(navigateTo) }}
            withBorder
            shadow="xs"
            radius="md"
            style={{ cursor: 'pointer' }}
            p={{ base: 'xs', sm: 'md' }}
        >
            <Flex gap={10}>
                {icon}
                <Text>{text}</Text>
            </Flex>
        </Paper>
    )
}

export default ProfileNavbarItem