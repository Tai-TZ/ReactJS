import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import css files react-slick, slick-carousel
import Slider from 'react-slick';


class Specialty extends Component {
    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section">Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className="bg-img section-specialty" />
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className="bg-img section-specialty" />
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className="bg-img section-specialty" />
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className="bg-img section-specialty" />
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className="bg-img section-specialty" />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className="bg-img section-specialty" />
                                <div>Cơ xương khớp 6</div>
                            </div>

                        </Slider>
                    </div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
