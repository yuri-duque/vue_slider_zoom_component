import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID b99d71b8036f689bdd4479cfb33d7a253379dd485a20b2ed7d2fc150e67c0c73'
    },
});