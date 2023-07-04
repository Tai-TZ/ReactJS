import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};


//tạo biến lưu vào redux đẩy lên local storage
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'admin',//tạo key
    whitelist: ['isLoggedIn', 'userInfo']// giá trị
};

//tạo biến lưu vào redux đẩy lên local storage
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app', //tạo key
    whitelist: ['language']  // giá trị
}


export default (history) => combineReducers({
    router: connectRouter(history),

    user: persistReducer(userPersistConfig, userReducer),

    app: persistReducer(appPersistConfig, appReducer)
})