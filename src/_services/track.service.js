import axios from "axios";
import {authHeader} from "@/_helpers";
import {API_URL} from "@/_services/config";

export const trackService = {
    getAll,
    getTracksNations
}



function getAll() {
    return axios
        .get(`${API_URL}/track/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch(error => Promise.reject(error.response ? error.response : error));
}

function getTracksNations() {
    return axios
        .get(`${API_URL}/nation/track/all`, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => Promise.reject(error.response ? error.response : error));
}