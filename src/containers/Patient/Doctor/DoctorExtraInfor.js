import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props); //kế thừa các props
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }

    async componentDidMount() {


    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }


        //khi có sự thay đổi về id của bác sĩ thì gọi api để lấy thông tin
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent) //lấy doctor id
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }

    //chuyển trạng thái show detail
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>

                </div>

                <div className='content-down'>


                    {isShowDetailInfor === false ?
                        // ẩn
                        <div className='short-infor'>
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                // format money VI
                                <NumberFormat className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType='text'
                                    thousandSeparator={true} suffix='VNĐ' />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                // format money EN
                                <NumberFormat className='currency'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType='text'
                                    thousandSeparator={true} suffix='$' />
                            }



                            <span className='detail' onClick={() => this.showHideDetailInfor(!isShowDetailInfor)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                        :


                        //hiện detail
                        <>
                            <div className='title-price'>
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    </span>
                                    <span className='right'>

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            // format money VI
                                            <NumberFormat className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType='text'
                                                thousandSeparator={true} suffix='VNĐ' />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            // format money EN
                                            <NumberFormat className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType='text'
                                                thousandSeparator={true} suffix='$' />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>

                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {/* check language VI -EN */}
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi : ''}

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn : ''}

                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(!isShowDetailInfor)} >
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
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
