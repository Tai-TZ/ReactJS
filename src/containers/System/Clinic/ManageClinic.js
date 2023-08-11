import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService'
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {


    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }

    }


    //xử lý lấy thông tin trong field
    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value  //id = name
        this.setState({
            ...stateCopy
        })

    }


    // lấy text và textHtml trong editor 
    handleEditorChange = ({ html, text }) => { //thư viện MdEditor
        this.setState({
            descriptionHTML: html, // gám text dạng html vào state
            descriptionMarkdown: text, //gán text vào state
        })
    }


    //đổi định dạng Base64 cho img
    handleOnchangeImage = async (event) => {
        let data = event.target.files; //lấy files

        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file) //đổi qua chuỗi Base64 
            this.setState({
                imageBase64: base64
            })
        }
    }


    //save data from state
    handleSaveNewClinic = async () => {

        let res = await createClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new clinic success!!')
            this.setState({
                name: '',
                address: '',
                imageBase64: ' ',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }
        else {
            toast.error('Something wrongs!!')
            console.log('check error:', res)
        }

    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>


                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.name} onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.address} onChange={(event) => this.handleOnchangeInput(event, 'address')}
                        />
                    </div>

                    <div className='col-12'>
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>


                    <div className='col-12'>
                        <button className='btn-save-specialty' onClick={() => this.handleSaveNewClinic()}>
                            Save
                        </button>
                    </div>
                </div>


            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
