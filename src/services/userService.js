import axios from '../axios'



//gọi api server nodejs
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword})
}


export {handleLoginApi}
 