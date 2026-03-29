import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as z from 'zod'
import { createChat } from "../api/chatApi"
import { useNavigate } from "react-router-dom"
import { Button, Flex, Modal, TextInput } from "@mantine/core"
import { useAppDispatch } from "@/hooks/redux"
import { addChat } from "@/features/chatSlice/chatSlice"

const createChatSchema = z.object({
    title: z.string().min(1, 'Введите название чата')
})

type CreateChatModalValues = z.infer<typeof createChatSchema>

const CreateChatModal = () => {
    const [isOpen, setOpen] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateChatModalValues>({
        resolver: zodResolver(createChatSchema)
    })
    
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<CreateChatModalValues> = async (properties) => {
        try {
            const chat = await createChat(properties)
            dispatch(addChat(chat))
            navigate(`/chats/${chat.id}`)
            reset()
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction={'column'} gap={{ base: 'md', sm: 'lg' }}>
                        <TextInput
                            label={"Название чата"}
                            {...register('title')}
                            error={errors.title ? errors.title.message : formError}
                            onFocus={() => setFormError(null)}
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