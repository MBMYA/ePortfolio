import api from '../constants/api_links.js';

export async function getData(username) {
    return fetch(api + '/data/' + username, {
        method : 'GET',
        headers: {
            'Content-Type': 'text/plain'
        },
    }).then(function(ress){
        return(ress.json())
    }).catch(function(ress){
        console.log("error", ress);
        return "Server is unreachable";
    })
}