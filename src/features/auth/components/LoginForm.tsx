import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Form from "@/ui/Form";
import { useState } from "react";
import { getUser, login } from "@/features/auth/api/auth";
import { setUser } from "@/features/userSlice/userSlice";
import { stopLoading } from "@/features/settingsSlice/settingsSlice";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useAppDispatch } from "@/hooks/redux";

const loginSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(1, 'Обязательное поле'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    })

    const dispatch = useAppDispatch()
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

            <Button type="submit">
                Войти
            </Button>

            <Button type="button" onClick={onSwitch}>
                Впервые здесь? Регистрация
            </Button>
        </Form>
    )
}

export default LoginForm