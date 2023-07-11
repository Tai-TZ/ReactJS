import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils'





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

        this.props.saveDetailDoctorAction({

            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
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