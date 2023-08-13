import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    //get list dataPatient từ api
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state

        //lấy ngày hôm nay trả ra các patient đặt lịch hôm nay
        let formatedDate = new Date(currentDate).getTime();

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
        }, async () => {
            this.getDataPatient()
        })
    }



    //btn confirm 
    handleBtnConfirm = (item) => {
        console.log('item', item)

        //lấy các trường này vào state
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }


    //đóng modal
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }


    //gửi mail, update status S3
    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true, //hiện loading đợi gửi mail
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language, //đẩy qa BE để gửi mail đổi vi/en
            patientName: dataModal.patientName
        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false, //ẩn loading đợi gửi mail,
                isOpenRemedyModal: false,
            })
            toast.success('Send Remedy Success !!')
            await this.getDataPatient() //load lại list patient

        } else {
            this.setState({
                isShowLoading: false, //ẩn loading đợi gửi mail,
                isOpenRemedyModal: false,
            })
            toast.error('Something went wrong !!')
        }


    }



    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let { language } = this.props
        // console.log('check state', this.state)
        return (
            <>
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
                                                        <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm(item)}>
                                                            Xác nhận
                                                        </button>
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

                <RemedyModal
                    isOpenRemedyModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />

                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >

                </LoadingOverlay>

            </>
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
