import Axios from 'axios'

const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})


export { api }