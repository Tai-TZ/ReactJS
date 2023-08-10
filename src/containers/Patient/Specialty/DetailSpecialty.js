import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/Header/HomeHeader';




class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {


    }

    // có sự thay đổi về prop thì sẽ update component
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }



    render() {
        return (
            <>
                <HomeHeader />
                <div>DetailSpecialty</div>

            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
