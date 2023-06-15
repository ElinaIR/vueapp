import { createStore } from 'vuex'
import { API } from './axios-api'

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        accessToken: localStorage.getItem('access') || null,
        refreshToken: localStorage.getItem('refresh') || null,
    },
    mutations: {
        updateStorage (state, { access, refresh }) {
            state.accessToken = access
            state.refreshToken = refresh
            console.log('access', state.accessToken)
            console.log('refresh', state.refreshToken)
        },
        refreshToken (state, { newAccess }) {
            state.accessToken = newAccess
            console.log('newAccess', state.accessToken)
        },
        destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
            state.user = null
        },
        getUser (state, user) {
            state.user = user
            console.log(state.user)
        }
    },
    getters: {
        loggedIn (state) {
            return state.accessToken != null
        }
    },
    actions: {
        userLogin (context, usercredentials) {
            API.post('/token/', {
                username: usercredentials.username,
                password: usercredentials.password
            }).then(response => {
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh',response.data.refresh)
                context.commit('updateStorage', { 
                    access: response.data.access, 
                    refresh: response.data.refresh 
                })
                console.log(usercredentials.username)
                API.get('/users').then(response => {
                    console.log(response.data)
                    let users = response.data
                    users.forEach(u => {
                        if (u.username == usercredentials.username) {
                            localStorage.setItem('user', JSON.stringify(u))
                            context.commit('getUser', {
                                user: u
                            })
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        },
        async tokenRefresh (context, refreshToken) {
            await API.post('/token/refresh/', {
                refresh: refreshToken,
            }).then(response => {
                localStorage.setItem('access', response.data.access)
                context.commit('refreshToken', { newAccess: response.data.access })
            }).catch(err => {
                console.log(err)
            })
        },
        userLogout (context) {
            if (context.getters.loggedIn) {
                localStorage.removeItem('user')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                context.commit('destroyToken')
            }
        }
    }
})

export default store