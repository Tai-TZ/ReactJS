import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/Header/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import { getDetailClinicById } from '../../../services/userService';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    // chạy hàm này trc ghi render lần đầu
    async componentDidMount() {
        //lấy id trên url
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailClinicById({ id: id, })

            console.log('res', res)
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic //bác sĩ tại phòng khám đó
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId); //đẩy doctorId vào mảng arrDoctorId để load động ra cli
                        })
                    }
                }


                this.setState({ //đẩy data từ api vào state
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,

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
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        // console.log(this.state)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />

                <div className='desciption'>

                    <div className='desciption-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) //tồn tại và ko rỗng
                            &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                    {/* sử dụng  dangerouslySetInnerHTML fix lỗi ko nhận html mà chỉ nhận text *{detailDoctor.Markdown.contentHTML}*/}
                                </div>
                            </>
                        }
                    </div>

                </div>

                <div className='detail-specialt-body'>
                    {
                        arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>

                                            <DoctorSchedule // render ra các lịch khám của các bác sĩ
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item} //truyền qua component con
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
