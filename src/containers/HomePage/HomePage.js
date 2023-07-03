import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';


class HomePage extends Component {

    render() {


        return (
            <div>
                <HomeHeader />
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
