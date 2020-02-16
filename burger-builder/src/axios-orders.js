import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-beec3.firebaseio.com/'
});

export default instance;