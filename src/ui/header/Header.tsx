import { Burger, Flex } from "@mantine/core"
import { IconBell, IconHome, IconLogin, IconMessage2 } from "@tabler/icons-react"
import HeaderItem from "./HeaderItem"
import ProfileMenu from "@/ui/ProfileMenu"
import { useAppSelector } from "@/hooks/redux"

interface HeaderProps {
    navbarOpened: boolean,
    showNavbar: boolean,
    toggleNavbar: () => void
}

const Header: React.FC<HeaderProps> = ({ navbarOpened, showNavbar, toggleNavbar }) => {
    const { user } = useAppSelector(state => state.userReducer)

    return (
        <Flex h={'100%'} w={'100%'} align={'center'} px={{ base: 'xs', sm: 'md' }}>
            {showNavbar &&
                <Burger
                    opened={navbarOpened}
                    onClick={toggleNavbar}
                    size="sm"
                    pos={'absolute'}
                />}
            <Flex justify={'center'} gap={{ base: 5, sm: 40 }} w='100%' h='100%'>
                <HeaderItem
                    to="/home"
                    label="Главная"
                    icon={<IconHome />}
                />
                {user && <HeaderItem
                    to="/chats"
                    label="Чаты"
                    icon={<IconMessage2 />}
                />}
                {user && <HeaderItem
                    to="/notifications"
                    label="Уведомления"
                    icon={<IconBell />}
                />}
                {user && <ProfileMenu />}
                {!user && <HeaderItem 
                    to="/auth"
                    label="Вход"
                    icon={<IconLogin />}
                />}
            </Flex>
        </Flex>
    )
}

export default Header