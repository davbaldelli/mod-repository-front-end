import axios from "axios";
import {authHeader} from "@/_helpers";
import {API_URL} from "@/_services/config";

export const carService = {
    getAll,
    findByModel,
    getCarTypes,
    getCarBrandsGroupedByNation,
}



function getAll() {
    return axios
        .get(`${API_URL}/car/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function findByModel(model) {
    return axios
        .get(`${API_URL}/car/find/model/${model}`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function getCarTypes() {
    return axios
        .get(`${API_URL}/car/type/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function getCarBrandsGroupedByNation() {
    return axios
        .get(`${API_URL}/brand/all/grouped/nation`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}