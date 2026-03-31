import { useAppSelector } from "@/hooks/redux"
import { Group, Radio, Stack, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useForm } from "@mantine/form"
import type { PatientProfile } from "../types/user"
import { useEffect } from "react"

interface PatientProfileFormSchema {

}

const PatientProfileForm: React.FC<{ isEditing: boolean }> = ({ isEditing }) => {
    const { user } = useAppSelector(state => state.userReducer)

    if (user?.role !== 'PATIENT') return null
    const patientProfile = user.profile as PatientProfile

    const form = useForm({
        initialValues: {
            address: '',
            birthdate: new Date(),
            gender: 'MALE',
            medicalHistory: ''
        }
    })

    useEffect(() => {
        form.setValues({
            address: patientProfile.address,
            birthdate: new Date(patientProfile.birthdate),
            gender: patientProfile.gender,
            medicalHistory: patientProfile.medicalHistory
        })
    }, [])

    return (
        <form>
            <Stack miw={{ base: 280, sm: 500 }}>
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
                    label="Медицинский профиль"
                    readOnly={!isEditing}
                    {...form.getInputProps('medicalHistory')}
                />
            </Stack>
        </form>
    )
}

export default PatientProfileForm