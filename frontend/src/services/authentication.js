import {jwtDecode} from 'jwt-decode';
import api from '../constants/api_links.js';
import Cookies from 'js-cookie';

// signin http request
export async function signin(credentials) {
    return fetch('http://localhost:8080/Signin', {
        method : 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(credentials)
    }).then(function(ress){
        return(Cookies.get('token'))
    }).catch(function(ress){
        console.log("error", ress);
        return "Server is unreachable";
    })
}

// signup http request
export async function signup(credentials) {
    return fetch(api + '/Signup', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(function(ress){
        return(ress.json())
    }).catch(function(ress){
        console.log("error", ress);
        return "Server is unreachable";
    })
}

// save given token on the local storage
export function saveToken(token){
    try {
        const decodedToken = jwtDecode(token, {complete: true});
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('email', decodedToken.email);
    } catch (err) {
        return false;
    }
    console.log('Token saved!')
    return true;
}

// obtain the token from the local storage
export function getToken() {
    try {
        const token = localStorage.getItem('accessToken')
        if (!token)
            return false;
        if (!checkTokenValidity(token))
            return false;
    } catch(err) {
        console.log(err);
        return false;
    }
    return true;
}

// check if the token given is valid or expired
function checkTokenValidity(token) {
    var decodedToken = jwtDecode(token, {complete: true});
    var timeNow = new Date();
    if (decodedToken.exp * 1000 < timeNow.getTime())
        return false; // Invalid token

    return true; // Valid token
}

// logout by clearing local storage
export function logout() {
    try {
        localStorage.clear();
    } catch(err) {
        console.log(err);
        return false;
    }
    return true; // logged out successfully
}