import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './RemedyModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; //tạo modal
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) { //lấy email
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }


    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.dataModal !== prevProps.dataModal) {//lấy email
            this.setState({
                email: this.props.dataModal.email,
            })
        }

    }


    //xử lý value email
    handleOnchangeEmail = (e) => {
        this.setState({
            email: e.target.value, //trường hợp patient đổi email thì lấy value email mới gán vào state

        })
    }


    //xử lý Image hoá đơn
    handleOnchangeImage = async (event) => {
        let data = event.target.files; //lấy files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file) //đổi qua chuỗi Base64 

            // console.log('check base64:', base64)
            this.setState({
                imgBase64: base64,
            })
        }

    }


    handleSendRemedy = async () => {
        this.props.sendRemedy(this.state) //truyền qua component cha, nhận đc email/imgbase64
    }

    render() {
        let { isOpenRemedyModal, dataModal, closeRemedyModal, sendRemedy } = this.props

        return (
            <Modal
                isOpen={isOpenRemedyModal}
                centered
                className={"modal-modal-container"}
                size="md" >

                <div className="modal-header">
                    <h5 className="modal-title">Gửi hoá đơn khám bệnh</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input type='email' value={this.state.email}
                                onChange={(e) => this.handleOnchangeEmail(e)}
                            />

                        </div>

                        <div className='col-6 form-group'>

                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file'
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>

            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
