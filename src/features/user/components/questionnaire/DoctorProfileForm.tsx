import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { MultiSelect, Textarea, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"
import * as z from "zod"
import { zod4Resolver } from "mantine-form-zod-resolver"
import type { DoctorProfile, Specialization } from "../../types/user"
import { getSpecializationsList } from "../../api/user"
import { editDoctorProfileThunk } from "../../lib/userSlice"
import FormTemplate from "../FormTemplate"

interface DoctorProfileFormProps {
    isEditing: boolean,
    onCancel: () => void
}

const formSchema = z.object({
    fullName: z.string().min(1, 'Обязательное поле'),
    address: z.string().min(1, 'Обязательное поле'),
    education: z.string().min(1, 'Обязательное поле'),
    description: z.string().min(1, 'Обязательное поле'),
    practiceStartDate: z.coerce.date(),
    license: z.string().min(1, 'Обязательное поле'),
    licenseIssueDate: z.coerce.date(),
    licenseExpiryDate: z.coerce.date(),
    specializationIds: z.array(z.number()).min(1, 'Укажите хотя бы 1 специальность')
})

type FormValues = z.infer<typeof formSchema>

const DoctorProfileForm: React.FC<DoctorProfileFormProps> = ({ isEditing, onCancel }) => {
    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    if (user?.role !== 'DOCTOR') return null
    const doctorProfile = user.profile as DoctorProfile

    const [specializations, setSpecializations] = useState<Specialization[]>([])

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getSpecializationsList()
                setSpecializations(data)
            } catch (e) {
                setSpecializations([])
                console.log(e)
            } finally {
            }
        }

        load()
    }, [])

    const form = useForm<FormValues>({
        initialValues: {
            fullName: '',
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
            fullName: user.fullName || '',
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

    const onSubmit = async (formData: FormValues) => {
        dispatch(editDoctorProfileThunk({ fullName: formData.fullName, profile: formData }))
        onCancel()
    }

    return (
        <FormTemplate
            onSubmit={form.onSubmit(onSubmit)}
            isEditing={isEditing}
            onCancel={onCancel}
            resetForm={resetForm}
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
            <Textarea
                placeholder="учебное заведение, специальность"
                label="Профильное образование"
                readOnly={!isEditing}
                {...form.getInputProps('education')}
                maxRows={4}
                autosize
            />
            <Textarea
                placeholder="навыки, компетенции и т.п."
                label="Описание"
                readOnly={!isEditing}
                {...form.getInputProps('description')}
                minRows={2}
                maxRows={10}
                autosize
            />
            <DateInput
                placeholder=""
                label="Дата начала практики"
                readOnly={!isEditing}
                {...form.getInputProps('practiceStartDate')}
            />
            <TextInput
                placeholder=""
                label="Лицензия"
                readOnly={!isEditing}
                {...form.getInputProps('license')}
            />
            <DateInput
                placeholder=""
                label="Дата выдачи лицензии"
                readOnly={!isEditing}
                {...form.getInputProps('licenseIssueDate')}
            />
            <DateInput
                placeholder=""
                label="Дата окончания действия лицензии"
                readOnly={!isEditing}
                {...form.getInputProps('licenseExpiryDate')}
            />
            <MultiSelect
                label="Медицинские специализации"
                placeholder="Выберите специализацию"
                searchable
                clearable
                nothingFoundMessage="Специализация не найдена"
                readOnly={!isEditing}
                data={specializations.map(s => ({
                    value: s.id,
                    label: s.name
                }))}
                {...form.getInputProps('specializationIds')}
            />
        </FormTemplate>
    )
}

export default DoctorProfileForm