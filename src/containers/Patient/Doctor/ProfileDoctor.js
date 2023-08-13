import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId) //lấy thông tin doctor thông qua props
        this.setState({ //bỏ data vào state react
            dataProfile: data
        })

    }


    //check thông tin doctor 
    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }



    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }


        //có sự thay đổi về doctorId thì gọi hàm getInforDoctor
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.props.doctorId)
        }

    }

    //viet hoa chu cai dau
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //render time trong schedule ra modal
    renderTimeBooking = (dataTime) => {

        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            //show time booking schedule
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            // show date: convert từ string trong db sang date của js (VI - EN)
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let Date = this.capitalizeFirstLetter(date)
            return (
                <>
                    <div> {time} - {Date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>

                </>
            )
        }
        return <></>
    }



    render() {

        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props

        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-right'>

                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>  {dataProfile.Markdown.description} </span>
                                    }
                                </>
                                :
                                <>{this.renderTimeBooking(dataTime)}</>
                            }

                        </div>
                    </div>
                </div>


                {/* show link detail doctor */}
                {/* bản chất single page của page nhấn sang page khác ko reload lại trang  */}
                {isShowLinkDetail === true &&
                    <Link className="nav-link" to={`/detail-doctor/${doctorId}`}> Xem thêm thông tin bác sĩ</Link>
                }


                {/* show giá */}
                {isShowPrice === true &&
                    <div className='price'>

                        <FormattedMessage id="patient.booking-modal.price" />
                        {/* language VI */}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                            &&
                            // format money VI
                            <NumberFormat className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType='text'
                                thousandSeparator={true} suffix=' VNĐ' />
                        }
                        {/* language EN */}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                            &&
                            // format money EN
                            < NumberFormat className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType='text'
                                thousandSeparator={true} suffix=' $' />
                        }
                    </div>
                }
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
