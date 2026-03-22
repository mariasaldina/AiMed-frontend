import type { Contact, Doctor, Message, MessageDto } from "@/features/chat/types/message"

export function mapMessage(dto: MessageDto): Message {
    if (dto.type === 'USER') {
        return {
            kind: 'user',
            id: String(dto.id),
            createdAt: new Date(dto.createdAt),
            content: dto.userPayload!.content,
        }
    }

    if (dto.type === 'ASSISTANT') {
        return {
            kind: 'assistant',
            id: String(dto.id),
            createdAt: new Date(dto.createdAt),
            possibleCauses: dto.assistantPayload!.possibleCauses,
            recommendations: dto.assistantPayload!.recommendations,
            urgency: dto.assistantPayload!.urgency,
            doctors: dto.assistantPayload!.doctors,
        }
    }

    if (dto.type === 'CONTACTS') {
        return {
            kind: 'contacts',
            id: String(dto.id),
            createdAt: new Date(dto.createdAt),
            content: dto.contactsPayload!.content.map((contact): Contact => ({
                id: String(contact.id),
                type: contact.type,
                value: contact.value,
                isPrimary: contact.isPrimary
            })),
            doctorId: dto.contactsPayload!.doctorId,
        }
    }

    if (dto.type === 'DOCTOR_SUGGESTIONS') {
        return {
            kind: 'doctorSuggestions',
            id: String(dto.id),
            createdAt: new Date(dto.createdAt),
            doctors: dto.doctorSuggestionsPayload!.doctors.map((doctor): Doctor => ({
                userId: String(doctor.userId),
                fullName: doctor.fullName,
                specializations: doctor.specializations,
                address: doctor.address,
                education: doctor.education,
                description: doctor.description,
                practiceStartDate: new Date(doctor.practiceStartDate),
            })),
        }
    }

    throw new Error(`Unsupported message type: ${(dto as MessageDto).type}`)
}