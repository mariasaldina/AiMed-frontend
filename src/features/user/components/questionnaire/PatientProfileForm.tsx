import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Group, Radio, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useForm } from "@mantine/form"
import * as z from "zod"
import { zod4Resolver } from "mantine-form-zod-resolver"
import type { PatientProfile } from "../../types/user"
import { editPatientProfile } from "../../api/user"
import { updatePatientProfile } from "../../lib/userSlice"
import FormTemplate from "../FormTemplate"

interface PatientProfileFormProps {
    isEditing: boolean,
    onCancel: () => void
}

const formSchema = z.object({
    address: z.string(),
    birthdate: z.coerce.date().max(new Date(), 'Невалидная дата рождения'),
    gender: z.enum(['MALE', 'FEMALE']),
    medicalHistory: z.string()
})

type FormValues = z.infer<typeof formSchema>

const PatientProfileForm: React.FC<PatientProfileFormProps> = ({ isEditing, onCancel }) => {
    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    if (user?.role !== 'PATIENT') return null
    const patientProfile = user.profile as PatientProfile

    const form = useForm<FormValues>({
        initialValues: {
            address: '',
            birthdate: new Date(),
            gender: 'MALE',
            medicalHistory: ''
        },
        validate: zod4Resolver(formSchema)
    })

    const resetForm = () => {
        form.setValues({
            address: patientProfile.address || '',
            birthdate: new Date(patientProfile.birthdate) || new Date(),
            gender: patientProfile.gender || 'MALE',
            medicalHistory: patientProfile.medicalHistory || ''
        })
    }

    const onSubmit = async (profile: FormValues) => {
        try {
            const updatedProfile = await editPatientProfile(profile)
            dispatch(updatePatientProfile(updatedProfile))
            onCancel()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <FormTemplate
            onSubmit={form.onSubmit(onSubmit)}
            isEditing={isEditing}
            onCancel={onCancel}
            resetForm={resetForm}
        >
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
            <Radio.Group
                label="Пол"
                readOnly={!isEditing}
                {...form.getInputProps('gender')}
            >
                <Group>
                    <Radio label="мужской" value="MALE" />
                    <Radio label="женский" value="FEMALE" />
                </Group>
            </Radio.Group>
            <TextInput
                placeholder="описание"
                label="Медицинская история"
                readOnly={!isEditing}
                {...form.getInputProps('medicalHistory')}
            />
        </FormTemplate>
    )
}

export default PatientProfileForm