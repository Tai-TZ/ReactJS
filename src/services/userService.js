import axios from '../axios'



//gọi api server nodejs
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}


const getAllUsers = (inputId) => {
    // template string ES6
    return axios.get(`/api/get-all-users?id=${inputId}`)
}


const createNewUserService = (data) => {
    console.log('check data from service BE:', data);
    return axios.post('/api/create-new-user', data)
}


export {
    handleLoginApi,
    getAllUsers,
    createNewUserService
}
