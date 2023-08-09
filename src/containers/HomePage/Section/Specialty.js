import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService'


class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }


    //hàm gọi 1 lần trc khi render
    async componentDidMount() {
        let res = await getAllSpecialty()
        console.log('check res: ', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    render() {
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section"><FormattedMessage id="homepage.specialty-popular" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index}>
                                            <div className="bg-img section-specialty"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="specialty-name">{item.name}</div>
                                        </div>
                                    )
                                })

                            }



                        </Slider>
                    </div>
                </div>
            </div >
        );
    }

}



//  ============================ REDUX ============================
//truyền props từ redux vào component react như component cha sang component con
const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};


// FIRE các event của redux
const mapDispatchToProps = dispatch => {
    return {

    };
};


//kết nối REACT - REDUX from 'react-redux'
export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
