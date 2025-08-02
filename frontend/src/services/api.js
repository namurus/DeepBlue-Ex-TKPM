import axios from 'axios';

const api = axios.create({
    baseURL: 'https://deepblue-ex-tkpm.onrender.com/',
    // baseURL: 'http://localhost:5134',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;