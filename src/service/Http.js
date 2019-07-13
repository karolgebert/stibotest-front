export class Http {
    static BASE_URL = 'http://localhost:8080';
    static doGet = (url) => {
        return fetch(`${Http.BASE_URL}${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    };

    static doPost = (url, object) => {
        return fetch(`${Http.BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
    };

    static doPut = (url, object) => {
        return fetch(`${Http.BASE_URL}${url}/${object.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
    };

    static doDelete = (url, id) => {
        return fetch(`${Http.BASE_URL}${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
}

export default Http;
