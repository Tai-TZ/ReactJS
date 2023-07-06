import actionTypes from '../actions/actionTypes';

const initialState = { //khai báo biến khởi tạo
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.data //lưu data vào redux
            // console.log(copyState)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;