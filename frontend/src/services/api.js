import axios from 'axios';

const api = axios.create({
    baseURL: 'localhost:5134/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;