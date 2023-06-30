import axios from '../axios'



//gọi api server nodejs
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword})
}


const getAllUsers = (inputId) => {
    // template string ES6
    return axios.get(`/api/get-all-users?id=${inputId}`)
}


export {
    handleLoginApi,
    getAllUsers
}
 