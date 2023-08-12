import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)


    }


    //get dataPatient từ api
    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            })
        }
    }



    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }

    }


    //date picker
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }



    //btn confirm 

    handleBtnConfirm = () => {
        alert('123')
    }


    //btn remedy 
    handleBtnRemedy = () => {
        alert('123')
    }


    render() {
        let { dataPatient } = this.state
        let { language } = this.props
        console.log('check state', this.state)
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}

                        />
                    </div>

                    <div className='col-12 table-manage-patient'>
                        <table  >
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời Gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Action</th>

                                </tr>

                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}
                                                </td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>
                                                    {language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}
                                                </td>


                                                <td>
                                                    <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm()}> Xác nhận</button>

                                                    <button className='mp-btn-remedy' onClick={() => this.handleBtnRemedy()} > Gửi hoá đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })

                                    :
                                    <tr className="no-data">
                                        <td colSpan="6">Không có lịch đặt trong ngày này</td>
                                    </tr>

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
