export const adminLoginApi='/v1/admin/loginAdmin'
export const signUpDoctor='/v1/doctor/createDoctor'
export const loginDoctor='v1/doctor/loginDoctor'

export const getAllDocter='/v1/doctor/getAllDoctors'
export const getDocterByID=(id)=>`/v1/doctor/getDoctorsById/${id}`


export const Consultation='/v1/consultation/createConsultation'
export const getConsultationByDrId=(id)=>`/v1/consultation/getConsultationByDrId/${id}`
export const addPriscription='/v1/consultation/addPriscription'
