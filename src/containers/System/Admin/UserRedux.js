import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [], // viết theo kiểu crud REDUX
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();

        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     // console.log('check gender', res)
        // } catch (e) {
        //     console.log(e)
        // }
    }



    //lifecycle update react:  update state components
    componentDidUpdate(prevProps, prevState, snapshot) {
        //được gọi didupdate sau khi hàm render chạy
        //hiện tại (this) quá khứ (previous)
        //[] [3]
        // [3] [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {

        let genders = this.state.genderArr;
        let language = this.props.language;

        console.log(this.props.genderRedux)
        return (
            <div className='user-redux-container'>
                <div className="title" >CRUD Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id="manage-user.add" /></div>
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
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.role" /></lable>
                                <select className='form-control' >
                                    <option selected>Choose...</option>
                                    <option >...</option>
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

const mapStateToProps = state => { //lôi data redux vào react  
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,


    };

};

const mapDispatchToProps = dispatch => { //fire 1 action(event) của redux
    return {
        //key                  // value
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
