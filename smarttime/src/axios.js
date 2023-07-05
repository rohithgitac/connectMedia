import axios from 'axios';

const instance = axios.create({
    baseURL:'https://connect-media.onrender.com/'
})

export default instance