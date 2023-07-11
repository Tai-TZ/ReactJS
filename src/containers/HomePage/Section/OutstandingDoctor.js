import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import css files react-slick, slick-carousel
import Slider from 'react-slick';

import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],

        }
    }


    componentDidMount() {
        this.props.loadTopDoctor()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    render() {
        let arrDoctors = this.state.arrDoctors
        let { language } = this.props
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section">< FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-information" /></button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        //convert ảnh từ db lên chuyển buffer -> base64
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                                    return (
                                        <div className='section-customize' key={index}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className="bg-img section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>

                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>CƠ Full Stack</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div >
        );
    }

}


//  ============================ REDUX ============================
//truyền pros từ redux sang react như component cha sang component con
const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())

    };
};


//kết nối REDUX
export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
