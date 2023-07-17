import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { // 
            // username: 'abc', // giá trị khởi tạo ban đầu
            username: '',// giá trị khởi tạo ban đầu
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }


    //xử lý input không thay đổi giá trị khi đặt khởi tạo là 'abc'
    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value, //xử lý cập nhật ô input có thể thay đổi giá trị 
        });
    }
    handleOnChangePassWord = (event) => {
        this.setState({
            password: event.target.value, //xử lý cập nhật ô input có thể thay đổi giá trị 
        });
    }


    //xữ lý login
    handleLogin = async () => {
        this.setState({ // mỗi lần nhấn resquet, phải clear mã lỗi đi để hiện mã lỗi khác
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            console.log(data);
            if (data && data.errCode !== 0) { // case check remaining error: các lỗi còn lại
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode == 0) { //log in success
                this.props.userLoginSuccess(data.user) //redux lưu thông tin user
            }


        } catch (error) { //case check error không có user && pass
            if (error.response) {
                if (error.response.data) {
                    this.setState({ //gán errMessage = text error bên server
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response);
        }
    }

    //ẩn hiện passwords
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword, //khi click vào isShowPassword == true
        })

    }


    //press enter  
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) { //or keycode = 13 
            this.handleLogin()
        }
    }
    render() { //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>

                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => {
                                    this.handleOnChangeUserName(event);
                                }} />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input className='form-control' placeholder='Enter your password'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    onChange={(event) => { this.handleOnChangePassWord(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />

                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? "far fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => {
                                    this.handleLogin()
                                }}> Login

                            </button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>
                                Forgot your password?
                            </span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with </span>
                        </div>


                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //    userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
