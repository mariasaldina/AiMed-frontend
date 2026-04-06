import { Button, useMatches } from '@mantine/core'
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

    return (
        <Button
            component={NavLink}
            to={to}
            variant={!isActive ? 'subtle' : 'filled'}
            leftSection={!isMobile ? icon : null}
            h='100%'
            bdrs={0}
        >
            {!isMobile ? label : icon}
        </Button>
    )
}

export default HeaderItem