import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './BookingModal.scss'
import { Modal } from "reactstrap"; //tạo modal
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders()

    }

    //build data để phù hợp với react select gắn vào state và show ra dữ liệu // key value
    buildDataGender = (data) => {
        let result = []
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            console.log('check data time', this.props.dataTime)
            let doctorId = this.props.dataTime && !_.isEmpty(this.props.dataTime) ? this.props.dataTime.doctorId : ''
            let timeType = this.props.dataTime.timeType
            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }

    }


    // xử lý onchange Input: set các input vào state
    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }


    //xử lý onchange DatePicker:
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }


    // xử lý select gender
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    //viet hoa chu cai dau
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //config dạng time cho Vi - En
    buildTimeBooking = (dataTime) => {
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
            return `${time} - ${Date}`

        }
        return ''
    }

    //hiển thị tên theo ngôn ngữ
    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {

            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name

        }
        return ''
    }



    // xử lý btn confirm lưu các thông tin trong input vào db
    handleConfirmBooking = async () => {
        //valid input
        let date = new Date(this.state.birthday).getTime() // convert chuỗi string dưới dạng timestamp unix để lưu vào db
        let timeString = this.buildTimeBooking(this.props.dataTime) // lấy để lưu về nodejs để gửi mail
        let doctorName = this.buildDoctorName(this.props.dataTime)// lấy để lưu về nodejs để gửi mail



        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully !!!')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error !!!')
        }
    }

    render() {
        let { isOpendModal, closeBookingModal, dataTime } = this.props; //lấy dữ liệu đc truyền từ DoctorSchedule qua props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''



        return (
            <Modal
                isOpen={isOpendModal}
                // toggle={}
                // backdrop={true}
                centered
                className={"modal-modal-container"}
                size="lg" >


                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left' >

                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className='right' onClick={closeBookingModal}><i className="fas fa-times"></i></span>

                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}

                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>

                                <DatePicker className="form-control"
                                    value={this.state.birthday}
                                    onChange={this.handleOnChangeDatePicker}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.genders" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                        <button className='btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.btnCancel" /></button>

                    </div>
                </div>



            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
