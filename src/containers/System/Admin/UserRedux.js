import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import { lang } from 'moment/moment';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
        }
    }

    async componentDidMount() {
        //gọi api trong hàm redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }



    //lifecycle update react:  update state components
    componentDidUpdate(prevProps, prevState, snapshot) {
        //được gọi didupdate sau khi hàm render chạy
        //so sánh quá khứ (previous) hiện tại (this)
        // [] [3]
        // [3] [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
    }


    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let position = this.state.positionArr;

        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender
        return (
            <div className='user-redux-container'>
                <div className="title" >CRUD Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>{isGetGender === true ? 'Loading gender' : ''}</div>
                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.email" /></lable>
                                <input className='form-control' type='email' />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.password" /></lable>
                                <input className='form-control' type='password' />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.first-name" /></lable>
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.last-name" /></lable>
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.phone-number" /></lable>
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-9'>
                                <lable><FormattedMessage id="manage-user.address" /></lable>
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.gender" /></lable>
                                <select className='form-control' >
                                    {/*Điều kiện*/}
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {/* Check language để đổi EN-VI */}
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.position" /></lable>
                                <select className='form-control'>
                                    {position && position.length > 0 && position.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.role" /></lable>
                                <select className='form-control' >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            < option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                            </option>
                                        )
                                    })}


                                </select>
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.image" /></lable>
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-3 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


//state của REDUX
const mapStateToProps = state => { //lôi data redux vào react   
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender

    };

};

const mapDispatchToProps = dispatch => { //fire 1 action(event) của redux
    return {
        //key                  // value
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
