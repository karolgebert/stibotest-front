export class Http {
    static BASE_URL = 'http://localhost:8080';
    static doPost = (url, object) => {
        fetch(`${Http.BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
    }
}

export default Http.doPost;
