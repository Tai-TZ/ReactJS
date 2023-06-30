import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import { getAllUsers } from "../../services/userService";



class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arrUsers: [],
    };
  }

 
  async componentDidMount() { //gọi api lấy giá trị vào và setStart cho các component trước khi render ra màn hình
    let response = await getAllUsers('ALL') 
    if (response && response.errCode === 0) {
        this.setState({
            arrUsers: response.users
        })
    }
    // console.log('get data from BE',response);   
  } 

  render() {
    let arrUsers = this.state.arrUsers
    return (
      <div className="users-container">
        <div className="title text-center">Manage users</div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>Fist name</th>
              <th>Last name</th>
              <th>Adress</th>
              <th >Action</th> 
            </tr> 
                {arrUsers && arrUsers.map((item,index) =>{ //vòng lặp map
                    // console.log('check map',item,index );
                    return(
                        // <> fragment
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td>
                                <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                <button className="btn-delete"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    )
                })}
               
            
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
