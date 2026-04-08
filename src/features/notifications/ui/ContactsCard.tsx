import { Stack } from "@mantine/core"
import FieldBlock from "./FieldBlock"
import type { Contacts } from "@/features/user/types/user"

const ContactsCard: React.FC<{ contacts: Contacts }> = ({ contacts }) => {
    console.log(contacts)
    return (
        <Stack
            gap={15}
            p={'sm'}
        >
            <FieldBlock label="Почта" value={contacts.email} />
            <FieldBlock label="Телефон" value={contacts.phone} />
            <FieldBlock label="Мессенджер" value={contacts.messenger} />
        </Stack>
    )
}

export default ContactsCard