import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import './MedicalFacility.scss'
class MedicalFacility extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }



    async componentDidMount() {
        let res = await getAllClinic()
        console.log('check clinic', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []

            })
        }

    }


    //view details clinic
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }


    render() {
        let { dataClinics } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child' key={index} onClick={() => { this.handleViewDetailClinic(item) }} >
                                            <div className="bg-img section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='clinic-name'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


//kết nối REDUX
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
