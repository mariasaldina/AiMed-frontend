import * as z from 'zod';
import { useNavigate } from "react-router-dom";
import Form from "@/ui/Form";
import { loginThunk } from "@/features/user/lib/userSlice";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useAppDispatch } from "@/hooks/redux";
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

const loginSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(1, 'Обязательное поле'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: zod4Resolver(loginSchema)
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = async (credentials: LoginFormValues) => {
        try {
            await dispatch(loginThunk({ credentials })).unwrap()
            navigate('/home')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form onSubmit={form.onSubmit(onSubmit)} title="Войти">
            <TextInput
                label="Username"
                {...form.getInputProps('username')}
            />
            <PasswordInput
                label="Пароль"
                {...form.getInputProps('password')}
            />

            <Button type="submit">
                Войти
            </Button>

            <Button type="button" onClick={onSwitch} variant='outline'>
                Впервые здесь? Регистрация
            </Button>
        </Form>
    )
}

export default LoginForm