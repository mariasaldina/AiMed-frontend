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

export interface ContactDto {
    id: number
    type: 'EMAIL' | 'PHONE' | 'MESSENGER' | 'OTHER'
    value: string
    isPrimary: boolean
}

export interface Contact {
    id: string
    type: 'EMAIL' | 'PHONE' | 'MESSENGER' | 'OTHER'
    value: string
    isPrimary: boolean
}

export interface MessageDto {
    id: number,
    type: 'USER' | 'ASSISTANT' | 'CONTACTS' | 'DOCTOR_SUGGESTIONS'
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
    contactsPayload?: {
        content: ContactDto[]
        doctorId: number
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
        kind: 'contacts'
        id: string
        createdAt: Date
        content: Contact[]
        doctorId: number
    }
    | {
        kind: 'doctorSuggestions'
        id: string
        createdAt: Date
        doctors: Doctor[]
    }