import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from "react-intl";


class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props); //kế thừa các props
        this.state = {
            isShowDetailInfor: false,
        }
    }

    async componentDidMount() {


    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }

    //chuyển trạng thái show detail
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'> ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Bệnh viện Đa khoa Bảo Sơn 2</div>
                    <div className='detail-address'>Số 52 Nguyễn Chí Thanh - Đống Đa - Hà Nội</div>

                </div>

                <div className='content-down'>

                    {isShowDetailInfor === false ?
                        // ẩn
                        <div className='short-infor'>
                            GIÁ KHÁM: 300.000đ.
                            <span onClick={() => this.showHideDetailInfor(!isShowDetailInfor)}>Xem chi tiết</span>
                        </div>
                        :


                        //hiện detail
                        <>
                            <div className='title-price'>GIÁ KHÁM:  </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250.000Dđ</span>
                                </div>
                                <div className='note'>
                                    Giá khám đã bao gồm phí đặt lịch hẹn trước (Giá niêm yết của phòng khám)
                                    Giá khám cho người nước ngoài 30 USD
                                </div>

                            </div>
                            <div className='payment'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(!isShowDetailInfor)} >
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>

                    }


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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
