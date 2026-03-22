import Button from "@/ui/btn/Button"
import Input from "@/ui/input/Input"
import ModalForm from "@/ui/modal/ModalForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, type SetStateAction } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as z from 'zod'
import { createChat } from "../api/chatApi"
import type { Chat } from "../types/chat"
import { useNavigate } from "react-router-dom"

interface CreateChatFormProps {
    setChats: React.Dispatch<SetStateAction<Chat[]>>
}

const createChatSchema = z.object({
    title: z.string().min(1, 'Введите название чата')
})

type CreateChatFormValues = z.infer<typeof createChatSchema>

const CreateChatForm: React.FC<CreateChatFormProps> = ({ setChats }) => {
    const [isOpen, setOpen] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateChatFormValues>({
        resolver: zodResolver(createChatSchema)
    })
    
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<CreateChatFormValues> = async (properties) => {
        try {
            const chat = await createChat(properties)
            setChats(prev => [chat, ...prev])

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
            <ModalForm
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                title={"Начать чат"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label={"Название чата"}
                    {...register('title')}
                    error={errors.title ? errors.title.message : formError}
                    onFocus={() => setFormError(null)}
                />
                <Button variant="standard">Создать чат</Button>
            </ModalForm>

            <Button type="button" variant="input" onClick={() => setOpen(true)}>
                Начать новый чат
            </Button>
        </div>
    )
}

export default CreateChatForm