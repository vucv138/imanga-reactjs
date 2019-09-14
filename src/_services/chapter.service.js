import config from '../config';
import { authDefault } from '../_helpers';
export const chapterService = {
	getAll,
	getById
}

function getAll(limit) {
    const options = {
	    method: 'GET',
	    headers: authDefault()
    };

    let reqUrl = config.apiUrl + '/chapters';

    if (limit != null) {
        reqUrl = config.apiUrl + '/chapters?_limit='+limit;
    }

    return fetch(reqUrl, options).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authDefault()
    };

    let reqUrl = config.apiUrl + '/chapters/' + id

    return fetch(reqUrl, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            /*if (response.status === 400) {
                // auto logout if 400 response returned from api
                logout();
                // this.location.reload(true);
            }*/

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}