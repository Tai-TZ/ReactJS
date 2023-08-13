import React, { Component } from 'react';
import { connect } from 'react-redux';




class HomeFooter extends Component {

    render() {


        return (
            <div className='home-footer'>
                <p>&copy; 2023 N.T.T HealthCare. More infomation, please visit my website.
                    <a href='#' target='_black'> &#8594; Click here &#8592; </a>
                </p>


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
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
