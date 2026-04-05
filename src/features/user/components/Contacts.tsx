import { useOutletContext } from "react-router-dom"
import FormTemplate from "./FormTemplate"
import { useForm } from "@mantine/form"
import z from "zod"
import { zod4Resolver } from "mantine-form-zod-resolver"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { updateContacts } from "../api/user"
import { setContacts } from "../lib/userSlice"
import { TextInput } from "@mantine/core"

const formSchema = z.object({
    email: z.string().email('Невалидный email'),
    phone: z.string().regex(/^\+?\d{10,15}$/, 'Невалидный номер телефона'),
    messenger: z.string()
})

type FormValues = z.infer<typeof formSchema>

const Contacts = () => {
    const { isEditing, close } = useOutletContext<{
        isEditing: boolean,
        close: () => void
    }>()

    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            phone: '',
            messenger: ''
        },
        validate: zod4Resolver(formSchema)
    })

    const resetForm = () => {
        form.setValues({
            email: user?.contacts.email || '',
            phone: user?.contacts.phone || '',
            messenger: user?.contacts.messenger || ''
        })
    }

    const onSubmit = async (contacts: FormValues) => {
        try {
            await updateContacts(contacts)
            dispatch(setContacts(contacts))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <FormTemplate
            isEditing={isEditing}
            onCancel={close}
            resetForm={resetForm}
            onSubmit={form.onSubmit(onSubmit)}
        >
            <TextInput
                label="Email"
                placeholder="example@mail.com"
                readOnly={!isEditing}
                {...form.getInputProps('email')}
            />
            <TextInput
                label="Телефон"
                placeholder="+7 (000) 000-00-00"
                readOnly={!isEditing}
                {...form.getInputProps('phone')}
            />
            <TextInput
                label="Мессенджеры"
                placeholder="например, tg: @user"
                readOnly={!isEditing}
                {...form.getInputProps('messenger')}
            />
        </FormTemplate>
    )
}

export default Contacts