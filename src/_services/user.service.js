import axios from "axios";

export const userService = {
    login,
    logout,
};


const API_URL = "https://api.mod.davidebaldelli.it";
//const API_URL = "http://localhost:6316";

function login(username, password) {

    return axios.post(`${API_URL}/login`, {username, password}).then(r => handleResponse(r))
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                console.log("no token amigo")
            }
            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
        const data = response.data
        if (!(response.status === 202)) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
}