import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter"
import _ from 'lodash' //giúp thao tác với array/object dễ dàng hơn 

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };

    }




    componentDidMount() { //setState cho các component trước khi render ra màn hình
        let user = this.props.currentUser;

        //fill các data user lên input
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode', //không trả vè password 
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    // true or false to disable the modal
    toggle = () => {
        this.props.toggleFromParent(); //nhận từ UserMange
    };


    //xử lý lấy in4 từ các input 
    handleOnChangeInput = (event, id) => {

        /** ======== bad code: modify trực tiếp
        *   this.state[id] = event.target.value; //id chỉ tới input và lấy giá trị của input đó
        * this.setState({
        *     ...this.state, //copy
        * }, () => {
        *     console.log('check bad state: ', this.state);
        * });
        */


        // ======== good code: Copy lại state trước rồi modify 
        let copyState = { ...this.state }
        copyState[id] = event.target.value; //id chỉ tới input và lấy giá trị của input đó
        this.setState({
            ...copyState
        }, () => {
            // console.log('check good state: ', this.state);
        })

        // console.log('event', event.target.value, id);
    }

    //validate input NULL
    checkValidInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']

        for (let i = 0; i < arrInput.length; i++) {
            // console.log('check valid:', this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]]) { //this.state[arr['email']] *1
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid
    }


    //xử lý lưu thông tin sửa 
    handleSaveUser = () => {
        let isValid = this.checkValidInput(); //validate input NULL
        if (isValid === true) {
            //call api edit user modal 
            this.props.editUser(this.state)
        }
    }



    render() {
        // console.log('check pros', this.props);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle(); }}
                className={"modal-user-container"}
                size="lg">

                <ModalHeader toggle={() => { this.toggle(); }} >  Edit a user </ModalHeader>

                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" value={this.state.email}
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }} disabled />
                        </div>

                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" value={this.state.password}
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }} disabled />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text" value={this.state.firstName}
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} />
                        </div>

                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text" value={this.state.lastName}
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" value={this.state.address}
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3" color="primary"
                        onClick={() => { this.handleSaveUser(); }}> Save changes </Button>{" "}
                    <Button className="px-3" color="secondary" onClick={() => { this.toggle(); }}> Close </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
