import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import TableManageUser from './TableManageUser';
//thự viện preview img
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',
            isOpen: false,

            //user infor
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''

        }
    }

    async componentDidMount() {
        //gọi api trong hàm redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }


    //lifecycle update react:  update state components
    //khi có sự thay đổi của prop hay state thì hàm này sẽ chạy
    componentDidUpdate(prevProps, prevState, snapshot) {
        //được gọi didupdate sau khi hàm render chạy
        //so sánh quá khứ (previous) hiện tại (this)
        // [] [3]
        // [3] [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '', //set default value
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''//set default value
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositons = this.props.positionRedux
            this.setState({
                positionArr: arrPositons,
                position: arrPositons && arrPositons.length > 0 ? arrPositons[0].key : ''//set default value
            })
        }

        //clear fields input
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositons = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '', //set default value
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',//set default value
                position: arrPositons && arrPositons.length > 0 ? arrPositons[0].key : '',//set default value
                avatar: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }


    //xử lý xem trước Image
    handleOnchangeImage = (event) => {
        let data = event.target.files; //
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file) //tạo ra đường link url 
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }

    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return //check nếu k có previewImgURL thì ko phóng to, tránh bug

        this.setState({
            isOpen: true
        })
    }


    //xử lý btn lưu user 
    onchangeInput = (event, id) => { //lấy giá trị của input
        let copyState = { ...this.state }

        copyState[id] = event.target.value //lấy giá trị của các input
        this.setState({
            ...copyState
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        let { action } = this.state
        console.log(action)

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux action event create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux action event edit user
            this.props.EditAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                // avatar:''
            })
        }
    }

    //xử lý validates check trường hợp không có value 
    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"]

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("This input is required: " + arrCheck[i])
                break;
            }
        }

        return isValid;
    }



    //xử lý edit user lấy data từ child table
    handleEditUserFromParent = (user) => {
        // console.log('handleEditUserFromParent', user)
        this.setState({
            email: user.email,
            password: 'hard code',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

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
                                <input className='form-control' type='email'
                                    value={email} onChange={(event) => { this.onchangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.password" /></lable>
                                <input className='form-control' type='password'
                                    value={password} onChange={(event) => { this.onchangeInput(event, "password") }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.first-name" /></lable>
                                <input className='form-control' type='text' value={firstName}
                                    onChange={(event) => { this.onchangeInput(event, "firstName") }} />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.last-name" /></lable>
                                <input className='form-control' type='text' value={lastName}
                                    onChange={(event) => { this.onchangeInput(event, "lastName") }} />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.phone-number" /></lable>
                                <input className='form-control' type='text' value={phoneNumber}
                                    onChange={(event) => { this.onchangeInput(event, "phoneNumber") }} />
                            </div>

                            <div className='col-9'>
                                <lable><FormattedMessage id="manage-user.address" /></lable>
                                <input className='form-control' type='text' value={address}
                                    onChange={(event) => { this.onchangeInput(event, "address") }} />
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.gender" /></lable>
                                <select className='form-control' value={gender}
                                    onChange={(event) => { this.onchangeInput(event, 'gender') }}>
                                    {/*Điều kiện*/}
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {/* Check language để đổi EN-VI */}
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.position" /></lable>
                                <select className='form-control' value={position}
                                    onChange={(event) => { this.onchangeInput(event, 'position') }}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.role" /></lable>
                                <select className='form-control' value={role}
                                    onChange={(event) => { this.onchangeInput(event, 'role') }}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            < option key={index} value={item.key} >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}


                                </select>
                            </div>

                            <div className='col-3'>
                                <lable><FormattedMessage id="manage-user.image" /></lable>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor='previewImg'> Tải ảnh <i className="fas fa-upload"></i> </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()} >


                                    </div>
                                </div>
                            </div>

                            <div className='col-3 mt-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}>

                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}

                                </button>

                            </div>


                            <div className='col-12 mb-5 mt-3'>
                                {/* TABLE MANAGE USER */}
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent} //truyền qua component con
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thư viện preview img */}
                {
                    this.state.isOpen == true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })} />
                }
            </div >
        )
    }

}


//map state của REDUX vào react
const mapStateToProps = state => { //lôi data redux vào react   
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,


        //clear field input
        listUsers: state.admin.users

    };

};


//map dispatch vào props của react
const mapDispatchToProps = dispatch => { //fire 1 action(event) của redux
    return {
        //key                  // value
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),


        //create new user 
        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        //get all user
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

        //edit user
        EditAUserRedux: (data) => dispatch(actions.EditAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
