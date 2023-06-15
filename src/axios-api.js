import axios from "axios";
import store from './store';

const API = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/v1',
})

API.interceptors.response.use(response => response, async err => {
    console.log(err)
    if (err.response.status == 401 && err.config.url != '/token/') {
        await store.dispatch('tokenRefresh', store.state.refreshToken
        ).then(() => {
            let old_request = err.config
            const new_access = store.state.accessToken
            old_request.headers.Authorization = `Bearer ${new_access}`
            return API(old_request)
        }).catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    }
    else return Promise.reject(err)
})

export { API }
