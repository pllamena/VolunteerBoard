﻿import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../../Auth';
import axios from 'axios';

class NewJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            zip: '',
            description: '',
        };
    }

    updateDescription(value) {
        this.setState({
            description: value,
        });
    }

    updateZip(value) {
        this.setState({
            zip: value,
        });
    }

    async submit() {
        this.setState({
            disabled: true,
        });

        await axios.post('https://localhost:44316/api/jobs', {
            zip: this.state.zip,
            description: this.state.description,
        }, {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-primary">
                            <div className="card-header">New Job</div>
                            <div className="card-body text-left">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Description:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => { this.updateDescription(e.target.value) }}
                                        className="form-control"
                                        placeholder="Describe the job you need accomplished."
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Zip:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => { this.updateZip(e.target.value) }}
                                        className="form-control"
                                        placeholder="Please provide a zip code for the area the job is in."
                                    />
                                </div>
                                <button
                                    disabled={this.state.disabled}
                                    className="btn btn-primary"
                                    onClick={() => { this.submit() }}>
                                    Submit
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NewJob);