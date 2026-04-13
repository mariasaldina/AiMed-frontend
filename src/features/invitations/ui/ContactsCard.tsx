import { Stack } from "@mantine/core"
import FieldBlock from "./FieldBlock"
import type { Contacts } from "@/features/user/types/user"

function ContactsCard({ contacts }: { contacts: Contacts | null | undefined }) {
    return (
        <Stack
            gap={15}
            p={'sm'}
        >
            <FieldBlock label="Почта" value={contacts?.email} />
            <FieldBlock label="Телефон" value={contacts?.phone} />
            <FieldBlock label="Мессенджер" value={contacts?.messenger} />
        </Stack>
    )
}

export default ContactsCard