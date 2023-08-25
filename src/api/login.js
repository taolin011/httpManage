import request from '../utils/request.js'

export const loginapi = (data) => {
    return request.post('/login', data)
}