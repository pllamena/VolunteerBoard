import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../../Auth';

class AcceptJob extends Component {
    constructor(props) {
        super(props);
    }

    submit() {
        this.props.acceptJob();
    }

    render() {
        if (!auth0Client.isAuthenticated() || this.props.accepted) return null;
        return (
            <Fragment>
                <button
                    className="btn btn-primary"
                    onClick={() => { this.submit() }}>
                    Volunteer
                </button>
                <hr className="my-4" />
            </Fragment>
        )
    }
}

export default withRouter(AcceptJob);