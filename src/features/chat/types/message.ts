export type UrgencyStatus = 'SAFE' | 'CONCERNING' | 'CRITICAL'

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
    practiceStartDate: Date
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
    }
}

export type Message =
    | {
        kind: 'user'
        id: string
        createdAt: Date
        content: string
    }
    | {
        kind: 'assistant'
        id: string
        createdAt: Date
        possibleCauses: string[]
        recommendations: string[]
        urgency: UrgencyStatus
        doctors: string[]
    }
    | {
        kind: 'doctorSuggestions'
        id: string
        createdAt: Date
        doctors: Doctor[]
    }