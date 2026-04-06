import { Button, Modal, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { addMessage } from "@/features/chat/lib/chatMessagesSlice"
import { useParams } from "react-router-dom"
import { inviteDoctor } from "../api/chatApi"

interface InviteDoctorModalProps {
    doctorId: number
}

const InviteDoctorModal: React.FC<InviteDoctorModalProps> = ({ doctorId }) => {
    const [opened, setOpened] = useState(false)
    const dispatch = useAppDispatch()

    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const form = useForm({
        initialValues: {
            content: ''
        }
    })

    const onSubmit = async ({ content }: { content: string }) => {
        if (!parsedChatId) return
        try {
            const message = await inviteDoctor(parsedChatId, doctorId, content)
            dispatch(addMessage(message))
            setOpened(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Modal
                title="Запросить контакты"
                opened={opened}
                onClose={() => setOpened(false)}
                centered
                closeOnClickOutside
            >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            label="Сообщение для специалиста"
                            {...form.getInputProps('content')}
                        />
                        <Button type="submit">Отправить</Button>
                    </Stack>
                </form>
            </Modal>

            <Button
                type="button"
                onClick={() => setOpened(true)}
                variant='gradient'
            >
                Связаться
            </Button>
        </>
    )
}

export default InviteDoctorModal