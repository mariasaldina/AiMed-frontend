import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import SubmitButton from '@/ui/btn/Button';
import { useNavigate } from 'react-router-dom';
import Form from '@/ui/form/Form';
import GhostButton from '@/ui/btn/Button'
import Input from '@/ui/input/Input';
import { useState } from 'react';
import { signUp } from '@/features/auth/api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';

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
    
    const dispatch = useDispatch()
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
            <Input
                {...register('username')}
                label="Username"
                error={errors.username ? errors.username.message : formError}
                onFocus={() => setFormError(null)}
            />
            <Input
                {...register('password')}
                label="Пароль"
                type="password"
                error={errors.password?.message}
            />

            <SubmitButton type="submit" variant="submit">Зарегистрироваться</SubmitButton>

            <GhostButton type="button" variant="ghost" onClick={onSwitch}>
                Уже есть аккаунт? Войти
            </GhostButton>
        </Form>
    )
}

export default SignUpForm