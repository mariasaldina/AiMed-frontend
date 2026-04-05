import { useAppSelector } from "@/hooks/redux"
import PatientProfileForm from "./PatientProfileForm"
import DoctorProfileForm from "./DoctorProfileForm"
import { useOutletContext } from "react-router-dom"

const Questionnaire = () => {
    const { isEditing, close } = useOutletContext<{
        isEditing: boolean
        close: () => void
    }>()
    const { user } = useAppSelector(state => state.userReducer)
    
    if (user?.role === 'PATIENT') {
        return <PatientProfileForm isEditing={isEditing} onCancel={close} />
    }

    if (user?.role === 'DOCTOR') {
        return <DoctorProfileForm isEditing={isEditing} onCancel={close} />
    }
}

export default Questionnaire