import axios from 'axios';

export const customFetch = axios.create({
    baseURL: 'http://localhost:5000/api/tasks',
});

// creating custom hook using axios request parameter
customFetch.interceptors.request.use((request) => {
    request.headers['Accept'] = 'application/json';

    return request;
}, (error) => {
    console.log(error.response);

    return Promise.reject(error)
  })

// creating custom hook using axios response parameter
customFetch.interceptors.response.use((response) => {
    console.log('Got response');

    return response;
}, (error) => {
    console.log(error.response);

    if (error.response.status === 404) {
        console.log('Page not found');
    }

    return Promise.reject(error)
})