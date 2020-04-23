import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import Jobs from './components/Jobs/Jobs';
import Job from './components/Job/Job';
import NewJob from './components/NewJob/NewJob';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';
import NavMenu from './components/NavMenu';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingSession: true,
        }
    }

    async componentDidMount() {
        if (this.props.location.pathname === '/callback') {
            this.setState({ checkingSession: false });
            return;
        }
        try {
            console.log("checking session: " + this.state.checkingSession);
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error);
        }
        this.setState({ checkingSession: false });
    }

    render() {
        return (
            <div>
                <NavMenu />
                <Route exact path='/callback' component={Callback} />
                <SecuredRoute path='/new-job' component={NewJob} checkingSession={this.state.checkingSession} />
                <Route exact path='/' component={Jobs} />
                <SecuredRoute exact path='/job/:jobId' component={Job} checkingSession={this.state.checkingSession}  />
            </div>
        );
    }
}

export default withRouter(App);

/*import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}*/
