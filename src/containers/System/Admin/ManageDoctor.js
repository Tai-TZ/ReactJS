import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];





const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: ''


        };
    }
    componentDidMount() {

    }
    // nhận thấy sự thay đổi state và props thì chạy hàm này
    componentDidUpdate(prevProps, prevState) {

    }


    //editor 
    handleEditorChange = ({ html, text }) => { //thư viện MdEditor
        this.setState({
            contentMarkdown: text, //gán text vào state
            contentHTML: html, // gám text dạng html vào state
        })
    }


    //btn save infor
    handleSaveContentMarkdown = () => {
        console.log('check state', this.state)
    }


    //select doctor
    handleChange = (selectedOption) => { //thư viện react-select
        this.setState({ selectedOption })
    };


    //desc
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"> tạo thông tin doctor   </div>

                <div className="more-infor">
                    <div className="content-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>

                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu:</label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)} value={this.state.description}>
                            asdasd
                        </textarea>
                    </div>

                </div>

                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>


                <button className="save-content-doctor"
                    onClick={() => { this.handleSaveContentMarkdown() }}
                >
                    Lưu thông tin
                </button>
            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);