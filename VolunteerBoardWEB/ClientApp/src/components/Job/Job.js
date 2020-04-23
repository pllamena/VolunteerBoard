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
        const job = (await axios.get(`https://localhost:44316/api/jobs/${params.jobId}`)).data;
        this.setState({
            job,
        });
    }

    async acceptJob() {
        await axios.put(`https://localhost:44316/api/jobs/${this.state.job.jobId}`, {
            JobId: this.state.job.jobId,
            AcceptedById: window.$currentUserId,
            PostedById: this.state.job.postedById,
            Description: this.state.job.description,
            Zip: this.state.job.zip,
            CreatedOn: this.state.job.createdOn,
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
                        <p>Description: {job.description}</p>
                        <p>Area Zip: {job.zip}</p>
                        <p>Accepted: {job.acceptedBy !== null ? 'Yes' : 'No'}</p>
                        <AcceptJob jobID={job.jobId} acceptJob={this.acceptJob} accepted={job.acceptedBy !== null} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Job);