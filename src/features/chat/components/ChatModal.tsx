import * as z from 'zod'
import { Button, Flex, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { zod4Resolver } from "mantine-form-zod-resolver"

const chatSchema = z.object({
    title: z.string().min(1, 'Введите название чата')
})

type ChatModalValues = z.infer<typeof chatSchema>

interface ChatModalProps {
    defaultTitle?: string | null | undefined
    opened: boolean
    onClose: () => void
    handleSubmit: (title: string) => void | Promise<void>
    formTitle: string
    loading: boolean
}

function ChatModal({ defaultTitle, opened, onClose, handleSubmit, formTitle, loading }: ChatModalProps) {
    const form = useForm({
        initialValues: { title: defaultTitle || '' },
        validate: zod4Resolver(chatSchema)
    })

    const onSubmit = async ({ title }: ChatModalValues) => {
        await handleSubmit(title)
        form.reset()
        onClose()
    }

    return (
        <Modal
            opened={opened}
            onClose={() => { form.reset(); onClose() }}
            title={formTitle}
            centered
            closeOnClickOutside
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Flex direction={'column'} gap={{ base: 'md', sm: 'lg' }}>
                    <TextInput
                        label={"Название чата"}
                        {...form.getInputProps('title')}
                    />
                    <Button type="submit" loading={loading}>
                        Отправить
                    </Button>
                </Flex>
            </form>
        </Modal>
    )
}

export default ChatModal