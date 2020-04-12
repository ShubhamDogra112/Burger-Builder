import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://burger-builder-3d73e.firebaseio.com/'
    // baseURL : 'https://test-6f087.firebaseio.com/'
})


export default instance;