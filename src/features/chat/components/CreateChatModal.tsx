import { useState } from "react"
import * as z from 'zod'
import { createChat } from "../api/chatApi"
import { useNavigate } from "react-router-dom"
import { Button, Flex, Modal, TextInput } from "@mantine/core"
import { useAppDispatch } from "@/hooks/redux"
import { addChat } from "@/features/chat/lib/chatSlice"
import { useForm } from "@mantine/form"
import { zod4Resolver } from "mantine-form-zod-resolver"
import { IconSparkles } from "@tabler/icons-react"

const createChatSchema = z.object({
    title: z.string().min(1, 'Введите название чата')
})

type CreateChatModalValues = z.infer<typeof createChatSchema>

const CreateChatModal = () => {
    const [isOpen, setOpen] = useState(false)
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
            console.log(e)
        }
    }

    return (
        <>
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
                            {...form.getInputProps('title')}
                        />
                        <Button type="submit">Создать чат</Button>
                    </Flex>
                </form>
            </Modal>

            <Button type="button" onClick={() => setOpen(true)} rightSection={<IconSparkles />} variant="gradient">
                Начать новый чат
            </Button>
        </>
    )
}

export default CreateChatModal