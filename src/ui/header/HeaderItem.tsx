import { ActionIcon, Button, useMatches } from '@mantine/core'
import type React from 'react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface HeaderItemProps {
    to: string,
    icon: ReactNode,
    label: string
}

const HeaderItem: React.FC<HeaderItemProps> = ({ to, icon, label }) => {
    const isMobile = useMatches({ base: true, sm: false })
    const { pathname } = useLocation()
    const isActive = pathname === to

    if (!isMobile) return (
        <Button
            component={NavLink}
            to={to}
            variant={!isActive ? 'subtle' : 'filled'}
            leftSection={icon}
            h='100%'
            bdrs={0}
        >
            {label}
        </Button>
    )

    return (
        <ActionIcon
            component={NavLink}
            to={to}
            variant={!isActive ? 'subtle' : 'filled'}
            h='100%'
            w={60}
            bdrs={0}
        >
            {icon}
        </ActionIcon>
    )
}

export default HeaderItem