import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService'
import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }


    //hàm gọi 1 lần trc khi render
    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) { // thư viện withRouter
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }



    //view detail specialty
    //bản chất single page của react nhấn sang page khác ko reload lại trang 
    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) { //

            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }
    render() {
        console.log('check state: ', this.state)
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section"><FormattedMessage id="homepage.specialty-popular" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index} onClick={() => this.handleViewDetailSpecialty(item)} >
                                            <div className="bg-img section-specialty"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="specialty-name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div >
            </div >
        );
    }

}



//  ============================ REDUX ============================
//truyền props từ redux vào component react như component cha sang component con
const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};


// FIRE các event của redux
const mapDispatchToProps = dispatch => {
    return {

    };
};


//kết nối REACT - REDUX from 'react-redux'
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
