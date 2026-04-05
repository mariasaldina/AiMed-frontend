import { Stack } from "@mantine/core"
import { IconClipboardTextFilled, IconPhone } from "@tabler/icons-react"
import ProfileNavbarItem from "./ProfileNavbarItem"

const ProfileNavbar: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
    return (
        <Stack p={{ base: 'lg', sm: 'xl' }}>
            <ProfileNavbarItem
                onSelect={onSelect}
                icon={<IconClipboardTextFilled />}
                text={"Анкета"}
                navigateTo="/profile/questionnaire"
            />
            <ProfileNavbarItem
                onSelect={onSelect}
                icon={<IconPhone />}
                text={"Контакты"}
                navigateTo="/profile/contacts"
            />
        </Stack>
    )
}

export default ProfileNavbar