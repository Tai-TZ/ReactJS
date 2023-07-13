import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'
import { getDetailInforDoctor } from "../../../services/userService";




const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
    }


    //hàm build data vào select option
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }


    // nhận thấy sự thay đổi state và props thì chạy hàm này
    componentDidUpdate(prevProps, prevState) {

        //đẩy các doctor vào list option select
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }


        //check select VI vs EN
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

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
        let { hasOldData } = this.state //  kiểm tra nếu có thông tin ? edit : create
        this.props.saveDetailDoctorAction({

            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE, //check theo action
        })

    }


    //select doctor
    handleChangeSelect = async (selectedOption) => { //thư viện react-select
        this.setState({ selectedOption }) //selectedOption có value(là id của doctor)

        let res = await getDetailInforDoctor(selectedOption.value) //selectedOption.value = id doctor
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true // phụ thuộc có thông tin ? class save : class create
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }

    };


    //desc
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"> tạo thông tin doctor   </div>

                <div className="more-infor">
                    <div className="content-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>

                <button className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                    onClick={() => { this.handleSaveContentMarkdown() }} >
                    {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div>


        );
    }
}
//map state của REDUX vào react
const mapStateToProps = (state) => { //lôi data redux vào react  
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

//map dispatch vào props của react
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorAction: (data) => dispatch(actions.saveDetailDoctorAction(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);