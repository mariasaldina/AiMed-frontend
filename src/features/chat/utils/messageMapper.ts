import type { Doctor, Message, MessageDto } from "@/features/chat/types/chat"

export function mapMessage(dto: MessageDto): Message {
    if (dto.type === 'USER') {
        return {
            kind: 'user',
            id: String(dto.id),
            createdAt: dto.createdAt,
            content: dto.userPayload!.content,
        }
    }

    if (dto.type === 'ASSISTANT') {
        return {
            kind: 'assistant',
            id: String(dto.id),
            createdAt: dto.createdAt,
            possibleCauses: dto.assistantPayload!.possibleCauses,
            recommendations: dto.assistantPayload!.recommendations,
            urgency: dto.assistantPayload!.urgency,
            doctors: dto.assistantPayload!.doctors,
        }
    }

    if (dto.type === 'DOCTOR_SUGGESTIONS') {
        return {
            kind: 'doctorSuggestions',
            id: String(dto.id),
            createdAt: dto.createdAt,
            doctors: dto.doctorSuggestionsPayload!.map((doctor): Doctor => ({
                userId: String(doctor.userId),
                fullName: doctor.fullName,
                specializations: doctor.specializations,
                address: doctor.address,
                education: doctor.education,
                description: doctor.description,
                practiceStartDate: doctor.practiceStartDate,
            })),
        }
    }

    if (dto.type === 'INVITATION') {
        return {
            kind: 'invitation',
            id: String(dto.id),
            createdAt: dto.createdAt,
            doctorsFullName: dto.invitationPayload!.fullName,
            content: dto.invitationPayload!.content
        }
    }

    throw new Error(`Unsupported message type: ${(dto as MessageDto).type}`)
}