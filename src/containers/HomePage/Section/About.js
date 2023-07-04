import React, { Component } from 'react';
import { connect } from 'react-redux';




class About extends Component {

    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về N.T.T Health Care
                </div>

                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/jh5U5BnpGN8" title="The Future of Healthcare" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            <b>The future of healthcare will bring far-reaching changes, but what will it look like? We believe that medicine will become more precise, value will shape care delivery, patients will become empowered consumers, and digitalization will transform every facet of healthcare.</b>
                        </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(About);
