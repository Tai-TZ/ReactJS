import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService"
import HomeHeader from '../HomePage/Header/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        }
    }

    async componentDidMount() {
        //lấy token và doctorId trên thanh url qua URLSearchParams
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            // console.log('check token veri', token)
            // console.log('check doctorId veri', doctorId)

            //truyền token  và doctorId qua nodejs để verify
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                })
            }
        }

    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }



    render() {

        let { statusVerify, errCode } = this.state
        console.log('check state', this.state)
        return (

            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>Loading data ...</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công!</div> :
                                <div className='infor-booking'>Lịch hẹn này đã được xác nhận hoặc không tồn tại</div>
                            }
                        </div>
                    }
                </div>

            </>


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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
