import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import { getAllUsers, createNewUserService, deleteUserService } from "../../services/userService";
import ModalUser from "./ModalUser";

import { emitter } from "../../utils/emitter"

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false
    };
  }

  //did mount : born (life cycle)
  async componentDidMount() { //gọi api lấy giá trị vào và setState cho các component trước khi render ra màn hình
    await this.getAllUsersFormReact()
  }


  getAllUsersFormReact = async () => {
    let response = await getAllUsers('ALL')
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users
      })
    }
    // console.log('get data from BE',response);   
  }

  //set state isOpenModalUser
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true
    })
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser
    })
  }



  // hứng data từ phía child ModalUser và hiển thị
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data)

      if (response && response.errCode !== 0) { // alert email exists
        alert(response.errMessage)
      }
      else {//  gọi lại hàm để update data mới ra FE
        await this.getAllUsersFormReact()
        this.setState({
          isOpenModalUser: false
        })


        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }
      // console.log('respone create user', response);
    } catch (e) {
      console.log(e);
    }
    // console.log('check data form child', data);
  }


  // xử lý xóa user
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id)
      if (res && res.errCode === 0) {
        await this.getAllUsersFormReact()

      }
      else {
        alert(res.errMessage)
      }
    } catch (e) {
      console.log(e);
    }
  }


  /** Life cycle
   * run component:
   * 1. run constructor -> init state'
   * 2. did mount (set state)
   * 3. render (re-render)
   */


  render() {
    let arrUsers = this.state.arrUsers
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal} //truyền qua child ModelUser
          createNewUser={this.createNewUser}

        />
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          ><i className="fas fa-plus"></i>   Add new users
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Fist name</th>
                <th>Last name</th>
                <th>Adress</th>
                <th >Action</th>
              </tr>
              {arrUsers && arrUsers.map((item, index) => { //vòng lặp map
                // console.log('check map',item,index );
                return (
                  // <> fragment
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                      <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
