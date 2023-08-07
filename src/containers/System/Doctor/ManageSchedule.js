import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'; //format date
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }


    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }


    // nhận thấy sự thay đổi state và props thì chạy hàm này
    componentDidUpdate(prevProps, prevState) {

        //đẩy các doctor vào list option select
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {//thêm trường mới isSelected để tạo nút active
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }


        //check select VI vs EN
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }

    }

    //hàm build data vào select option
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    //select doctor
    handleChangeSelect = async (selectedOption) => { //thư viện react-select
        this.setState({ selectedDoctor: selectedOption }) //selectedOption có value(là id của doctor)
    };



    //date picker
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    // active btn time, chọn ra khung giờ để lưu 
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state //mảng lưu tất cả khoảng tgian
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                //lặp phần tử nào trong mảng rangeTime có id = id.time (khoảng tgian click vào) thì cho isSelected =true
                return item;
            })


            this.setState({
                rangeTime: rangeTime
            })
        }
    }



    // save infor
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = [];

        if (!currentDate) { //không chọn tgian
            toast.error('Invalid date!')
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) { //check object selected rỗng 
            toast.error('Invalid selected Doctor!')
            return
        }

        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            //lọc những item nào trong rangeTime có isSelected = true 
            let selectedTime = rangeTime.filter(item => item.isSelected === true);

            //tạo object để lưu các thông tin schedule
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            } else {
                toast.error('Invalid selected time!')
                return
            }
        }


        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })

        console.log('res saveBulkScheduleDoctor ', res)

        if (res && res.errCode === 0) {
            toast.success('Save  Info success!!')
        } else {
            toast.error('error save !!')
            console.log('error saveBulkScheduleDoctor: ', res)
        }

    }



    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className='manage-schedule-container'>

                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label > <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6'>
                            <label ><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index} onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })

                            }
                        </div>
                        <div className='col-12'

                            onClick={() => this.handleSaveSchedule()}>
                            <button className='btn btn-primary btn-save-schedule'><FormattedMessage id="manage-schedule.save" /></button>
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
