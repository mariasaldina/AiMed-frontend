import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import Form from '@/ui/Form';
import { useState } from 'react';
import { signUp } from '@/features/auth/api/auth';
import { setUser } from '@/features/userSlice/userSlice';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useAppDispatch } from '@/hooks/redux';

const signUpSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(8, { message: 'Обязательное поле, не менее 8 символов' })
})

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUpForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema)
    })

    const [formError, setFormError] = useState<string | null>(null)
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
        try {
            const user = await signUp({ ...data, role: 'PATIENT' })
            dispatch(setUser(user))
            navigate('/chats')
        } catch (err: any) {
            setFormError(err.message)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} title="Зарегистрироваться">
            <TextInput
                {...register('username')}
                label="Username"
                error={errors.username ? errors.username.message : formError}
                onFocus={() => setFormError(null)}
            />
            <PasswordInput
                {...register('password')}
                label="Пароль"
                error={errors.password?.message}
            />

            <Button type="submit">Зарегистрироваться</Button>

            <Button type="button" onClick={onSwitch}>
                Уже есть аккаунт? Войти
            </Button>
        </Form>
    )
}

export default SignUpForm