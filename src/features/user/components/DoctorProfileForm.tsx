import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Button, Group, Radio, Stack, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useForm } from "@mantine/form"
import type { DoctorProfile } from "../types/user"
import { useEffect } from "react"
import { editDoctorProfile } from "../api/user"
import * as z from "zod"
import { zod4Resolver } from "mantine-form-zod-resolver"
import { updateDoctorProfile } from "../lib/userSlice"
import FormTemplate from "./FormTemplate"

interface DoctorProfileFormProps {
    isEditing: boolean,
    onCancel: () => void
}

const formSchema = z.object({
    address: z.string(),
    education: z.string(),
    description: z.string(),
    practiceStartDate: z.coerce.date(),
    license: z.string(),
    licenseIssueDate: z.coerce.date(),
    licenseExpiryDate: z.coerce.date(),
    specializationIds: z.array(z.number())
})

type FormValues = z.infer<typeof formSchema>

const DoctorProfileForm: React.FC<DoctorProfileFormProps> = ({ isEditing, onCancel }) => {
    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    if (user?.role !== 'DOCTOR') return null
    const doctorProfile = user.profile as DoctorProfile

    const form = useForm<FormValues>({
        initialValues: {
            address: '',
            education: '',
            description: '',
            practiceStartDate: new Date(),
            license: '',
            licenseIssueDate: new Date(),
            licenseExpiryDate: new Date(),
            specializationIds: []
        },
        validate: zod4Resolver(formSchema)
    })

    const resetForm = () => {
        form.setValues({
            address: doctorProfile.address || '',
            education: doctorProfile.education || '',
            description: doctorProfile.description || '',
            practiceStartDate: doctorProfile.practiceStartDate || new Date(),
            license: doctorProfile.license || '',
            licenseIssueDate: doctorProfile.licenseIssueDate || new Date(),
            licenseExpiryDate: doctorProfile.licenseExpiryDate || new Date(),
            specializationIds: doctorProfile.specializationIds || []
        })
    }

    const onSubmit = async (profile: FormValues) => {
        try {
            const updatedProfile = await editDoctorProfile(profile)
            dispatch(updateDoctorProfile(updatedProfile))
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
            <TextInput
                placeholder="учебное заведение, специальность"
                label="Профильное образование"
                readOnly={!isEditing}
                {...form.getInputProps('education')}
            />
            <TextInput
                placeholder="навыки, компетенции и т.п."
                label="Описание"
                readOnly={!isEditing}
                {...form.getInputProps('address')}
            />
            <DateInput
                placeholder="дата"
                label="Дата начала практики"
                readOnly={!isEditing}
                {...form.getInputProps('practiceStartDate')}
            />
        </FormTemplate>
    )
}

export default DoctorProfileForm