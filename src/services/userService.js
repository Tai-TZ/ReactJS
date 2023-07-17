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

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInforDoctor, saveBulkScheduleDoctor
}  
