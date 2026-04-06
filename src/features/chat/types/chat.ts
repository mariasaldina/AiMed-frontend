export type UrgencyStatus = 'SAFE' | 'CONCERNING' | 'CRITICAL'

export interface Chat {
    id: number,
    title: string
}

export interface DoctorDto {
    userId: number,
    fullName: string,
    specializations: string[],
    address: string,
    education: string,
    description: string,
    practiceStartDate: string
}

export interface Doctor {
    userId: string
    fullName: string
    specializations: string[]
    address: string
    education: string
    description: string
    practiceStartDate: string
}

export interface DoctorDataDto {
    fullName: string
}

export interface MessageDto {
    id: number,
    type: 'USER' | 'ASSISTANT' | 'DOCTOR_SUGGESTIONS'
    createdAt: string
    userPayload?: {
        content: string
    },
    assistantPayload?: {
        possibleCauses: string[]
        recommendations: string[]
        urgency: UrgencyStatus
        doctors: string[]
    },
    doctorSuggestionsPayload?: {
        doctors: DoctorDto[]
    },
    invitationPayload?: {
        doctorData: DoctorDataDto,
        content: string
    }
}

export type Message =
    | {
        kind: 'user'
        id: string
        createdAt: string
        content: string
    }
    | {
        kind: 'assistant'
        id: string
        createdAt: string
        possibleCauses: string[]
        recommendations: string[]
        urgency: UrgencyStatus
        doctors: string[]
    }
    | {
        kind: 'doctorSuggestions'
        id: string
        createdAt: string
        doctors: Doctor[]
    }
    | {
        kind: 'invitation',
        id: string,
        createdAt: string,
        doctorsFullName: string,
        content: string
    }