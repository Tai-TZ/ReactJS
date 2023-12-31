import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/Header/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';


class DetailDoctor extends Component {
    constructor(props) {
        super(props); //kế thừa các props
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        //lấy id trên url
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            this.setState({
                currentDoctorId: id,
            })
            let res = await getDetailInforDoctor(id) //gọi api
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }
    componentDidUpdate(prevProps) {

    }


    render() {
        let { detailDoctor } = this.state
        let { language } = this.props
        let nameVi = '', nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className='doctor-detail-container'>

                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>

                            <div className='up'>
                                {
                                    language === LANGUAGES.VI ? nameVi : nameEn
                                }
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>

                                }

                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId} //truyền qua để lấy id doctor
                            />
                        </div>

                        <div className='content-right'>
                            <DoctorExtraInfor
                                doctorIdFromParent={this.state.currentDoctorId} //truyền qua để lấy id doctor
                            />
                        </div>
                    </div>

                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                                {/* sử dụng  dangerouslySetInnerHTML fix lỗi ko nhận html mà chỉ nhận text *{detailDoctor.Markdown.contentHTML}*/}


                            </div>
                        }
                    </div>

                    <div className='comment-doctor'>

                    </div>
                </div >
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
