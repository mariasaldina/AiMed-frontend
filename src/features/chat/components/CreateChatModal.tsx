import { useState } from "react"
import * as z from 'zod'
import { createChat } from "../api/chatApi"
import { useNavigate } from "react-router-dom"
import { Button, Flex, Modal, TextInput } from "@mantine/core"
import { useAppDispatch } from "@/hooks/redux"
import { addChat } from "@/features/chat/lib/chatSlice"
import { useForm } from "@mantine/form"
import { zod4Resolver } from "mantine-form-zod-resolver"

const createChatSchema = z.object({
    title: z.string().min(1, 'Введите название чата')
})

type CreateChatModalValues = z.infer<typeof createChatSchema>

const CreateChatModal = () => {
    const [isOpen, setOpen] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const form = useForm({
        initialValues: { title: '' },
        validate: zod4Resolver(createChatSchema)
    })
    
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const onSubmit = async (properties: CreateChatModalValues) => {
        try {
            const chat = await createChat(properties)
            dispatch(addChat(chat))
            navigate(`/chats/${chat.id}`)
            form.reset()
            setOpen(false)
        } catch (e) {
            setFormError('Не удалось создать чат')
            console.log(e)
        }
    }

    return (
        <div>
            <Modal
                opened={isOpen}
                onClose={() => setOpen(false)}
                title={"Начать чат"}
                centered
                closeOnClickOutside
            >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Flex direction={'column'} gap={{ base: 'md', sm: 'lg' }}>
                        <TextInput
                            label={"Название чата"}
                            onFocus={() => setFormError(null)}
                            {...form.getInputProps('title')}
                        />
                        <Button type="submit">Создать чат</Button>
                    </Flex>
                </form>
            </Modal>

            <Button type="button" onClick={() => setOpen(true)}>
                Начать новый чат
            </Button>
        </div>
    )
}

export default CreateChatModal