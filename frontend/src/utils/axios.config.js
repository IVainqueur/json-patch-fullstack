import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})


export { api }