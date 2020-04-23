import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AcceptJob from './AcceptJob';
import auth0Client from '../../Auth';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: null,
        };

        this.acceptJob = this.acceptJob.bind(this);
    }

    async componentDidMount() {
        await this.refreshJob();
    }

    async refreshJob() {
        const { match: { params } } = this.props;
        const job = (await axios.get(`https://localhost:44316/api/jobs/${params.jobId}`), {
            params: {}, 
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }).data;
        this.setState({
            job,
        });
    }

    async acceptJob(accepted) {
        await axios.put(`https://localhost:44316/api/jobs/${this.state.job.jobId}`, {
            accepted,
        }, {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });
        await this.refreshJob();
    }

    render() {
        const { job } = this.state;
        if (job === null) return <p>Loading ...</p>;
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <p className="lead">{job.description}</p>
                        <p className="lead">{job.zip}</p>
                        <hr className="my-4" />
                        <AcceptJob jobID={job.jobId} acceptJob={this.acceptJob} />
                        <p>Accepted: {job.acceptedBy !== null ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Job);