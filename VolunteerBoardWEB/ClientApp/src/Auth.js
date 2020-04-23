﻿import auth0 from 'auth0-js';
import axios from 'axios';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            // the following three lines MUST be updated
            domain: 'volunteer-board.auth0.com',
            audience: 'https://volunteer-board.auth0.com/userinfo',
            clientID: 'Nd0aV9k9Md5LKdInogWjn7Oym6Dou0eK',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'id_token',
            scope: 'openid profile'
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    signIn() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.setSession(authResult);
                resolve();
            });
        })
    }

    setSession(authResult) {
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        axios.get(`https://localhost:44316/api/users/byemail/${this.profile.name}`).then(response => {
            window.$currentUserId = response.data.userId
        }).catch(err => {
            axios.post('https://localhost:44316/api/users', {
                Name: this.profile.name,
                Email: this.profile.name
            }, {
                headers: { 'Authorization': `Bearer ${this.idToken}` }
            }).then(usr => {
                window.$currentUserId = usr.data.userId
            });
        });
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    signOut() {
        this.auth0.logout({
            returnTo: 'http://localhost:3000',
            clientID: 'Nd0aV9k9Md5LKdInogWjn7Oym6Dou0eK',
        });
    }

    silentAuth() {
        return new Promise((resolve, reject) => {
            this.auth0.checkSession({}, (err, authResult) => {
                if (err) return reject(err);
                this.setSession(authResult);
                resolve();
            });
        });
    }
}

const auth0Client = new Auth();

export default auth0Client;