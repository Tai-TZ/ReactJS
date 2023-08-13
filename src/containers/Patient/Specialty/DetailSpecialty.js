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
            showMore: false,
        }
    }

    // chạy hàm này trc ghi render lần đầu
    async componentDidMount() {
        //lấy id trên url
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailSpecialtyById({//gọi api
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE') //lôi allcode PROVINCE lên làm select

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

                //thêm trường dữ liệu vào resProvince.data để hiện chữ "Toàn quốc" trên ô select
                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc',
                    })
                }

                this.setState({ //đẩy data từ api vào state
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvinces: dataProvince ? dataProvince : []
                })
            }
        }

    }


    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }


    //hàm xử lý chọn province để hiển thị các phòng khám tại province đó
    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id // lấy id doctor trên url
            let location = event.target.value// lấy id của province

            let res = await getDetailSpecialtyById({//gọi api
                id: id,
                location: location
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty //bác sĩ tại khoa đó
                    if (arr && arr.length > 0) {
                        arr.map(item => {

                            //đẩy doctorId vào mảng arrDoctorId để load động ra cli
                            arrDoctorId.push(item.doctorId);
                        })

                    }

                }

                this.setState({ //đẩy data từ api vào state
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,

                })
            }
        }
    }


    //ẩn-hiện
    handleShowMore = (status) => {
        this.setState({
            showMore: status
        })
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvinces, showMore } = this.state
        let { language } = this.props

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />


                <div className='desciption'>

                    {showMore === false ?
                        <div className='desciption-specialty'>
                            <h1 class="title1">Cơ Xương Khớp</h1>
                            <p class="subtitle">Bác sĩ Cơ Xương Khớp giỏi</p>
                            <ul class="doctor-list">
                                <li class="doctor-list-item">Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:</li>
                                <li class="doctor-list-item">Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm</li>
                                <li class="doctor-list-item">Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội</li>
                                <li class="doctor-list-item">Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức, Bệnh Viện E.</li>
                                <li class="doctor-list-item">Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...</li>
                                <li class="doctor-list-item">Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...</li>
                            </ul>
                            <span className='moreInfor' onClick={() => { this.handleShowMore(!showMore) }}>
                                Đọc thêm...
                            </span>
                        </div>
                        :
                        <div className='desciption-specialty'>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) //tồn tại và ko rỗng
                                &&
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                        {/* sử dụng  dangerouslySetInnerHTML fix lỗi ko nhận html mà chỉ nhận text *{detailDoctor.Markdown.contentHTML}*/}
                                    </div>
                                    <span className='moreInfor' onClick={() => { this.handleShowMore(!showMore) }}>
                                        Ẩn bớt
                                    </span>
                                </>
                            }
                        </div>
                    }
                </div>

                <div className='detail-specialt-body'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
