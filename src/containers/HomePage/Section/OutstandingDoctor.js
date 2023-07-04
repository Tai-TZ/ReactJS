import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import css files react-slick, slick-carousel
import Slider from 'react-slick';



class OutStandingDoctor extends Component {

    render() {


        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section">Bác sĩ nỗi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-img section-outstanding-doctor" />
                                    </div>

                                    <div className="position text-center">
                                        <div>Giáo sư, tiến sĩ Thành Tài</div>
                                        <div>CƠ Full Stack</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-img section-outstanding-doctor" />
                                    </div>

                                    <div className="position text-center">
                                        <div>Giáo sư, tiến sĩ Thành Tài</div>
                                        <div>CƠ Full Stack</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-img section-outstanding-doctor" />
                                    </div>

                                    <div className="position text-center">
                                        <div>Giáo sư, tiến sĩ Thành Tài</div>
                                        <div>CƠ Full Stack</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-img section-outstanding-doctor" />
                                    </div>

                                    <div className="position text-center">
                                        <div>Giáo sư, tiến sĩ Thành Tài</div>
                                        <div>CƠ Full Stack</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-img section-outstanding-doctor" />
                                    </div>

                                    <div className="position text-center">
                                        <div>Giáo sư, tiến sĩ Thành Tài</div>
                                        <div>CƠ Full Stack</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-img section-outstanding-doctor" />
                                    </div>

                                    <div className="position text-center">
                                        <div>Giáo sư, tiến sĩ Thành Tài</div>
                                        <div>CƠ Full Stack</div>
                                    </div>
                                </div>
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
