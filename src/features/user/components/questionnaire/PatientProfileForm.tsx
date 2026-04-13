import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Select, Textarea, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useForm } from "@mantine/form"
import * as z from "zod"
import { zod4Resolver } from "mantine-form-zod-resolver"
import type { PatientProfile } from "../../types/user"
import FormTemplate from "../FormTemplate"
import { editPatientProfileThunk } from "../../lib/userSlice"

interface PatientProfileFormProps {
    isEditing: boolean,
    onCancel: () => void
}

const formSchema = z.object({
    fullName: z.string().min(1, 'Обязательное поле'),
    address: z.string(),
    birthdate: z.coerce.date().max(new Date(), 'Невалидная дата рождения').nullable(),
    gender: z.enum(['MALE', 'FEMALE']).nullable(),
    medicalHistory: z.string()
})

type FormValues = z.infer<typeof formSchema>

function PatientProfileForm({ isEditing, onCancel }: PatientProfileFormProps) {
    const { loading } = useAppSelector(state => state.settingsReducer)
    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    if (user?.role !== 'PATIENT') return null
    const patientProfile = user.profile as PatientProfile

    const form = useForm<FormValues>({
        initialValues: {
            fullName: '',
            address: '',
            birthdate: new Date(),
            gender: null,
            medicalHistory: ''
        },
        validate: zod4Resolver(formSchema)
    })

    const resetForm = () => {
        form.setValues({
            fullName: user.fullName || '',
            address: patientProfile.address || '',
            birthdate: patientProfile.birthdate || null,
            gender: patientProfile.gender || null,
            medicalHistory: patientProfile.medicalHistory || ''
        })
    }

    const onSubmit = async (formData: FormValues) => {
        await dispatch(editPatientProfileThunk({ fullName: formData.fullName, profile: formData })).unwrap()
        onCancel()
    }

    return (
        <FormTemplate
            onSubmit={form.onSubmit(onSubmit)}
            isEditing={isEditing}
            onCancel={onCancel}
            resetForm={resetForm}
            loadingIndicator={loading['user/editPatientProfile']}
        >
            <TextInput
                placeholder="ФИО"
                label="ФИО"
                readOnly={!isEditing}
                {...form.getInputProps('fullName')}
            />
            <TextInput
                placeholder="адрес"
                label="Адрес проживания"
                readOnly={!isEditing}
                {...form.getInputProps('address')}
            />
            <DateInput
                placeholder="дата рождения"
                label="Дата рождения"
                readOnly={!isEditing}
                {...form.getInputProps('birthdate')}
            />
            <Select
                label="Пол"
                data={[
                    { value: null, label: 'Не указан' },
                    { value: 'MALE', label: 'Мужской' },
                    { value: 'FEMALE', label: 'Женский' },
                ]}
                readOnly={!isEditing}
                {...form.getInputProps('gender')}
            />
            <Textarea
                placeholder="описание"
                label="Медицинская история"
                readOnly={!isEditing}
                {...form.getInputProps('medicalHistory')}
                minRows={2}
                maxRows={10}
                autosize
            />
        </FormTemplate>
    )
}

export default PatientProfileForm