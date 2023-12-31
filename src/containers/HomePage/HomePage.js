import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader';
import './HomePage.scss';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Footer/HomeFooter';


// Import css files react-slick, slick-carousel 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {

    // handleAfterChange = (index, dontAnimate) => {
    //     console.log('checl slide:', index)
    // }

    render() {
        let settings = { //cấu hình slide
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4, //4 slide hiện 
            slidesToScroll: 1, // 1 slide khi trượt 
            // slickGoTo: this.handleAfterChange
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />   {/*truyền props để ẩn banner bên trang detail  */}
                <Specialty settings={settings} />{/* truyền biến settings sang compo con  */}
                <MedicalFacility settings={settings} />{/* truyền biến settings sang compo con  */}
                < OutstandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}


//  ============================ REDUX ============================
//truyền pros từ redux sang react như component cha sang component con
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


//kết nối REDUX
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
