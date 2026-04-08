import api from "@/lib/axios"
import type { Contacts, DoctorProfile, PatientProfile, Specialization, User } from "../types/user"

export const getUser = async () => {
    const { data } = await api.get<User>('/user/me')
    return data
}

export const editPatientProfile = async (fullName: string, profile: PatientProfile) => {
    const { data } = await api.put<User>('/user/patient-questionnaire', { fullName, ...profile })
    return data
}

export const editDoctorProfile = async (fullName: string, profile: DoctorProfile) => {
    const { data } = await api.put<User>('/user/doctor-questionnaire', { fullName, ...profile })
    return data
}

export const getSpecializationsList = async () => {
    const { data } = await api.get<Specialization[]>('/specialization')
    return data
}

export const updateContacts = async (contacts: Contacts) => {
    await api.put('/contacts', contacts)
}