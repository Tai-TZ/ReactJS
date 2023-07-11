import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService } from '../../services/userService';
import { toast } from 'react-toastify';

// ======================================================= ACTION GENDER
//cách 1
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
//cach 2
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START }) //dispatch cái này để hiện loading
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

// ======================================================= ACTION Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")

            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error: ', e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

// ======================================================= ACTION Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))

            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error: ', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

// ======================================================= CREATE NEW USER
export const createNewUser = (data) => {
    console.log('check data create:', data)
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            // console.log("check res created: ", res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user successfully")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart()) //create xong gọi hàm này để load all users
            }
            else {
                toast.success(res.errMessage)
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('createNewUser error: ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})


export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


// ======================================================= GET ALL USERS  
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL")

            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.success("Fetch all user Error !!!")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.success("Fetch all user Error !!!")
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error: ', e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


// ======================================================= DELETE USER
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            // console.log("check res created: ", res)
            if (res && res.errCode === 0) {
                toast.success(res.message)
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart()) //delete xong gọi hàm này để load all users
            }
            else {
                toast.success("Delete a user Failed !!!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            toast.success("Delete a user Failed !!!")
            console.log('Delete user error: ', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USERS_SUCCESS
})


export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USERS_FAILED
})


// ======================================================= EDIT USER
export const EditAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            // console.log("check res created: ", res)
            if (res && res.errCode === 0) {
                toast.success(res.message)
                dispatch(EditUserSuccess())
                dispatch(fetchAllUsersStart()) //delete xong gọi hàm này để load all users
            }
            else {
                toast.success("Update a user Failed !!!")
                dispatch(EditUserFailed())
            }
        } catch (e) {
            dispatch(EditUserFailed())
            toast.success("Update a user Failed !!!")
            console.log('Update user error: ', e)
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USERS_SUCCESS
})


export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USERS_FAILED
})



// ======================================================= SHOW TOP DOCTOR
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('') // lấy danh sách top doctor
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data, //lưu biến data từ api vào redux 
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}


