import axios from 'axios'

export const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/'

const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err)
    }
)

export {
    axiosInstance
}