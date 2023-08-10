import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/Header/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvinces: [],
        }
    }

    async componentDidMount() {
        //lấy id trên url
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailSpecialtyById({//gọi api
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE') //lôi allcode PROVINCE lên làm select
            console.log('PROVINCE: ', resProvince.data)
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty //bác sĩ tại khoa đó
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId); //đẩy doctorId vào mảng arrDoctorId để load động ra cli
                        })

                    }

                }

                this.setState({ //đẩy data từ api vào state
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvinces: resProvince.data
                })
            }
        }

    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }


    handleOnChangeSelect = (event) => {
        console.log('check onchange select', event.target.value)
    }


    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvinces } = this.state
        let { language } = this.props
        console.log('check state', this.state)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />


                <div className='detail-specialt-body'>
                    <div className='desciption-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) //tồn tại và ko rỗng
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                {/* sử dụng  dangerouslySetInnerHTML fix lỗi ko nhận html mà chỉ nhận text *{detailDoctor.Markdown.contentHTML}*/}
                            </div>
                        }
                    </div>

                    <div className='search-sp-doctor'>
                        <select onChange={(event) => { this.handleOnChangeSelect(event) }}>
                            {listProvinces && listProvinces.length > 0 &&
                                listProvinces.map((item, index) => {
                                    return (
                                        // keyMap = id của province
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {
                        arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
