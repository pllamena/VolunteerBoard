import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Jobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: null,
        };
    }

    async componentDidMount() {
        const jobs = (await axios.get('https://localhost:44316/api/jobs')).data;
        this.setState({
            jobs: jobs
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.jobs === null && <p>Loading jobs...</p>}
                    {
                        this.state.jobs && this.state.jobs.map(job => (
                            <div key={job.jobId} className="col-sm-12 col-md-4 col-lg-3">
                                <div className="card mb-3">
                                    <div>
                                        <p>Description: {job.description}</p>
                                        <p>Area Zip: {job.zip}</p>
                                        <p>Accepted: {job.acceptedBy !== null ? 'Yes' : 'No'}</p>
                                        <Link to={`/job/${job.jobId}`}>
                                            <div className="btn btn-dark">
                                                Details
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Jobs;