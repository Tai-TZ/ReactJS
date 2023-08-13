import axios from '../axios'

// =========================== CALL API

//gọi api Login BE
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

//gọi api get ALL users
const getAllUsers = (inputId) => {
    // template string ES6
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

//gọi api CREATE a new user
const createNewUserService = (data) => {
    // console.log('check data from service BE:', data);
    return axios.post('/api/create-new-user', data)
}

//gọi api DELETE a user
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}


//gọi api Edit a user
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}


//gọi api get all Code 
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)

}

//api show top doctor
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

//api get all doctor
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

//api save doctor
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

//api get detail doctor by id
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

//lưu nhiều bản ghi bằng 1 lệnh
const saveBulkScheduleDoctor = (data) => {
    console.log(data)
    return axios.post(`/api/bulk-create-schedule`, data)
}


//lấy lịch qua date
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

//lấy infor extra qua id
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}


//lấy profile qua id
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}



//api save info patien
const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}


//api verify email
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}


//api add new specialty
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}


//api GET all Specialty
const getAllSpecialty = (data) => {
    return axios.get(`/api/get-specialty`, data)
}


//api get detail Specialty theo id
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}



//api add new Clinic
const createClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

//api get ALL Clinic
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

//api get Clinic by id
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}


//api get list patients đặt lịch
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}


//api update status of patient (appointment)
const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookingAppointment,
    postVerifyBookAppointment, createNewSpecialty, getAllSpecialty, getDetailSpecialtyById, createClinic, getAllClinic,
    getDetailClinicById, getAllPatientForDoctor, postSendRemedy
}  
