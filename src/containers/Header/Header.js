import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changLanguageAppRedux(language)
    }

    componentDidMount() { //check ROLE để phân quyền header
        let { userInfo } = this.props;
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) { //R1 === "R1"
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }

        }
        this.setState({
            menuApp: menu
        })

        // console.log('check user infor:', this.props.userInfo)
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="languages">
                    {/* Welcome, {user} ! */}
                    <span className='welcome'><FormattedMessage id='homeheader.welcome' />, {userInfo && userInfo.firstName ? userInfo.firstName : ''} !</span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VI</span>

                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out' >
                        <i className="fas fa-sign-out-alt"></i>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};
// FIRE các event của redux
const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),

        //fire action của redux 
        changLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};
//kết nối REACT - REDUX from 'react-redux'
export default connect(mapStateToProps, mapDispatchToProps)(Header);
