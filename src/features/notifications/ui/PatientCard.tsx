import { Paper, Stack, Text } from "@mantine/core"
import type { PatientCardType } from "../types/notifications"
import { getAge } from "@/utils/time"
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react"
import FieldBlock from "./FieldBlock"

const PatientCard: React.FC<{ patient: PatientCardType }> = ({ patient }) => {
    return (
        <Paper p={{ base: 'md', sm: 'lg' }} bg="blue.0" radius="md">

            <Stack gap={4}>
                <Text fw={500}>
                    {patient.fullName}
                </Text>

                <FieldBlock label={'Возраст'}>
                    {getAge(patient.birthdate)}
                </FieldBlock>

                <FieldBlock label={'Пол'}>
                    {patient.gender === 'FEMALE' && <IconGenderFemale />}
                    {patient.gender === 'MALE' && <IconGenderMale />}
                </FieldBlock>

                <FieldBlock label={'История болезни'}>
                    {patient.medicalHistory}
                </FieldBlock>

                <FieldBlock label={'Адрес'}>
                    {patient.address}
                </FieldBlock>
            </Stack>

        </Paper>
    )
}

export default PatientCard