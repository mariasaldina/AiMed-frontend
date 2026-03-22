import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/ui/btn/Button";
import { useNavigate } from "react-router-dom";
import Form from "@/ui/form/Form";
import GhostButton from '@/ui/btn/Button'
import Input from "@/ui/input/Input";
import Loader from "@/ui/loader/Loader";
import { useState } from "react";
import { getUser, login } from "@/features/auth/api/auth";
import { setUser } from "@/features/user/userSlice";
import { stopLoading } from "@/features/settings/settingsSlice";
import { useDispatch } from "react-redux";

const loginSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(1, 'Обязательное поле'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formError, setFormError] = useState<string | null>(null)

    const onSubmit: SubmitHandler<LoginFormValues> = async (credentials) => {
        try {
            await login(credentials)
            const user = await getUser()
            dispatch(setUser(user))
            navigate('/chats')
        } catch (e: any) {
            setFormError(e.message)
        } finally {
            dispatch(stopLoading())
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} title="Войти">
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

            <SubmitButton type="submit" variant='submit'>
                "Войти"
            </SubmitButton>

            <GhostButton type="button" variant='ghost' onClick={onSwitch}>
                Впервые здесь? Регистрация
            </GhostButton>
        </Form>
    )
}

export default LoginForm