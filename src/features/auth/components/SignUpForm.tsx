import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import Form from '@/ui/Form';
import { useState } from 'react';
import { signUp } from '@/features/auth/api/auth';
import { setUser } from '@/features/user/lib/userSlice';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useAppDispatch } from '@/hooks/redux';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

const signUpSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(8, { message: 'Обязательное поле, не менее 8 символов' })
})

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUpForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: zod4Resolver(signUpSchema)
    })

    const [formError, setFormError] = useState<string | null>(null)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            const user = await signUp({ ...data, role: 'PATIENT' })
            dispatch(setUser(user))
            navigate('/chats')
        } catch (err: any) {
            setFormError(err.message)
        }
    }

    return (
        <Form onSubmit={form.onSubmit(onSubmit)} title="Зарегистрироваться">
            <TextInput
                label="Username"
                onFocus={() => setFormError(null)}
                {...form.getInputProps('username')}
            />
            <PasswordInput
                label="Пароль"
                {...form.getInputProps('password')}
            />

            <Button type="submit">Зарегистрироваться</Button>

            <Button type="button" onClick={onSwitch} variant='outline'>
                Уже есть аккаунт? Войти
            </Button>
        </Form>
    )
}

export default SignUpForm