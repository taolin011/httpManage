import { config } from '@vue/test-utils'
import axios from 'axios'

const request = axios.create({
    baseURL: "",
    timeout: 3000,
})
request.interceptors.request.use(
    (config) => {

    }
)
request.interceptors.response.use((response) => {

})