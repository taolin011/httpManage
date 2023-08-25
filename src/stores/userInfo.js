
import { loginapi } from '../api/login.js'
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'



export const userStore = defineStore('userInfo', () => {
    const userIds = ref([
        {
            name: "管理员",
            id: "64db0ba28066ab44398fe284"
        },
        {
            name: "用户1",
            id: "64db06f68066ab44398fe278"
        },
        {
            name: "用户2",
            id: "64db06fe8066ab44398fe27a"
        },
        {
            name: "用户3",
            id: "64db07018066ab44398fe27c",
        }
    ])
    const userInfo = ref(

    )
    const is = ref(false)
    const ischange = (values) => {
        is.value = values
    }
    const token = ref()
    const Login = async (data) => {
        try {
            const res = await loginapi(data)
            token.value = res.token
            userInfo.value = res.user
            router.push('/')
        } catch (error) {

        }

    }

    return { token, userInfo, Login, userIds, is, ischange }
})