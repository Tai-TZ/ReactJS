import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props); //kế thừa các props
        this.state = {
            allDays: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        // console.log('momnet vi: ', moment(new Date()).format('dddd - DD/MM'))
        // console.log('momnet en: ', moment(new Date()).locale('en').format('dddd - DD/MM'))

        this.setArrDays(language)
    }

    // có sự thay đổi về prop thì sẽ update component
    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) { //lấy ngày hiện tại và 6 ngày sau
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'day').format('dddd - DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'day').locale('en').format('ddd - DD/MM')

            }
            object.value = moment(new Date()).add(i, 'day').startOf('day').valueOf()// startof đầu ngày 00:00AM
            allDays.push(object)
        }


        this.setState({
            allDays: allDays
        })
    }


    //api data schedule
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {  //lấy id doctor từ parent
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log("check res schedule: ", res)
        }
    }




    render() {
        let { allDays } = this.state
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>{item.label}</option>
                            )
                        })}

                    </select>
                </div>
                <div className='all-available-time'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
