import actionTypes from '../actions/actionTypes';

const initialState = { //khai báo biến khởi tạo
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],

    topDoctor: [],
    allDoctors: [],
}



const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data //lưu data từ action genders vào redux
            state.isLoadingGender = false;

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data //lưu data vào redux 

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:

            // console.log(state)
            state.roles = action.data //lưu data vào redux  
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }


        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users//lưu data vào redux   
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.dataDoctors
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctor = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state
            }




        default:
            return state;
    }
}

export default adminReducer;