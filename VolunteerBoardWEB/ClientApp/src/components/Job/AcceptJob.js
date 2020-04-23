import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../../Auth';

class AcceptJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted: false,
        };
    }

    updateAccepted(value) {
        this.setState({
            accepted: value,
        });
    }

    submit() {
        this.setState({
            accepted: true,
        });
        this.props.acceptJob(this.state.accepted);
    }

    render() {
        if (!auth0Client.isAuthenticated()) return null;
        return (
            <Fragment>
                <button
                    className="btn btn-primary"
                    onClick={() => { this.submit() }}>
                    Accept
                </button>
                <hr className="my-4" />
            </Fragment>
        )
    }
}

export default withRouter(AcceptJob);