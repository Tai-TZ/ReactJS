import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from '../../../store/actions'


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        };
    }


    componentDidMount() {
        this.props.fetchUserRedux()
    }


    // nhận thấy sự thay đổi state và props thì chạy hàm này
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }


    //delete user 
    handleDelete(user) {
        this.props.deleteAUserRedux(user.id)
    }

    //edit user
    handleEditUser(user) {
        // console.log(user)
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        // console.log('check all user:', this.props.listUsers)
        // console.log('check userRedux:', this.state.userRedux)
        let arrUsers = this.state.userRedux
        return (
            <table id="TableManageUser">

                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Fist name</th>
                        <th>Last name</th>
                        <th>Adress</th>
                        <th >Action</th>
                    </tr>


                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit"
                                        onClick={() => this.handleEditUser(item)}
                                    ><i className="fas fa-pencil-alt"></i></button>
                                    <button className="btn-delete"
                                        onClick={() => this.handleDelete(item)}
                                    ><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>

            </table>
        );
    }
}
//map state của REDUX vào react
const mapStateToProps = (state) => { //lôi data redux vào react  
    return {
        listUsers: state.admin.users
    };
};

//map dispatch vào props của react
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);