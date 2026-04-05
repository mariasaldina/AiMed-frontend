import api from "@/lib/axios"
import type { Contacts, DoctorProfile, PatientProfile, Specialization, User } from "../types/user"

export const getUser = async () => {
    const { data } = await api.get<User>('/user/me')
    return data
}

export const editPatientProfile = async (profile: PatientProfile) => {
    const { data } = await api.put<{ profile: PatientProfile }>('/user/patient-questionnaire', profile)
    return data.profile
}

export const editDoctorProfile = async (profile: DoctorProfile) => {
    const { data } = await api.put<{ profile: DoctorProfile }>('/user/doctor-questionnaire', profile)
    return data.profile
}

export const getSpecializationsList = async () => {
    const { data } = await api.get<Specialization[]>('/specialization')
    return data
}

export const updateContacts = async (contacts: Contacts) => {
    await api.put('/contacts', contacts)
}