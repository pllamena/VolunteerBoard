import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import './NavMenu.css';

function NavMenu(props) {
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    };

    return (
        <header>
            < Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light >
                <Container>
                    <NavbarBrand tag={Link} to="/">Volunteer Board</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Jobs</NavLink>
                            </NavItem>
                            {
                                auth0Client.isAuthenticated() &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/new-job">New Job</NavLink>
                                </NavItem>
                            }
                            {
                                !auth0Client.isAuthenticated() &&
                                <NavItem><button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button></NavItem>
                            }
                            {
                                auth0Client.isAuthenticated() &&
                                <NavItem><button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button></NavItem>
                            }

                        </ul>
                    </Collapse>
                </Container>

            </Navbar >
        </header >
    );
}

export default withRouter(NavMenu);

/*export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthentivated: useAuth0(),
            loginWithRedirect: useAuth0(),
            logout: useAuth0()
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Volunteer Board</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    {!isAuthenticated && (
                                        <button onClick={() => loginWithRedirect({})}>Log in</button>
                                    )}

                                    {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}*/