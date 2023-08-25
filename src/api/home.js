import request from '../utils/request.js'

//新增
export const addProjects = (data) => {
    return request.post('/project', data)
}

//获取
export const getProjects = (data) => {
    return request.get('/project', data)
}

export const deleteProjects = (id) => {
    return request.delete(`project/${id}`)
}


export const updateProject = (id, data) => {
    return request.patch(`project/${id}`, data)
}
