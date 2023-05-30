<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-start">
            <!-- <a class="navbar-brand" href="/">English Online</a> -->
            <a class="navbar-brand" href="/"><img src="../assets/Union.svg" height="40" /></a>

            <ul class="nav col-auto me-auto">
                <li><router-link :to = "{ name: 'home' }" exact class="nav-link link-dark"> Главная </router-link></li>
                <li><router-link :to = "{ name: 'decks' }" exact class="nav-link link-dark"> Карточки </router-link></li>
                <li><router-link :to = "{ name: 'stats' }" exact class="nav-link link-dark"> Статистика </router-link></li>
            </ul>
            <router-link :to = "{ name: 'login' }" exact class="btn btn-outline-dark text-end" v-if="accessToken == null"> Войти </router-link>

            <div class="dropdown text-end" v-if="(accessToken != null) && !cardsApp && loaded">
                <a href="#" class="dropdown-toggle text-decoration-none link-dark btn" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ user.last_name }} {{ user.first_name }}</a>
                <ul class="dropdown-menu text-small dropdown-menu-end text-end" style="min-width: 5rem">
                    <li><router-link :to = "{ name: 'logout' }" exact class="dropdown-item"> Выйти </router-link></li>
                </ul>
            </div>

            <div class="dropdown text-end" v-if="(accessToken != null) && cardsApp && loaded">
                <a href="#" class="link-dark text-decoration-none dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">{{ user.username }}</a>
                <ul class="dropdown-menu text-small text-end dropdown-menu-end w-auto" style="min-width: 9rem">
                    <li><router-link :to = "{ name: 'my-decks' }" exact class="dropdown-item"> Мои стопки </router-link></li>
                    <li><router-link :to = "{ name: 'tests' }" exact class="dropdown-item"> Тесты </router-link></li>
                    <li v-if="(accessToken != null) && (profile.role == 1)"><router-link :to = "{ name: 'my-tests' }" exact class="dropdown-item"> Результаты тестов </router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><router-link :to = "{ name: 'logout' }" exact class="dropdown-item"> Выйти </router-link></li>
                </ul>
            </div>
        </div>
    </div>
    </nav>
</template>

<script>
    import { mapState } from 'vuex'
    import { API } from '../axios-api'
    export default {
        name: 'Navbar',
        data() {
            return {
                profile: '',
                loaded: false,
            }
        },
        computed: {
            ...mapState(['accessToken', 'user']),
            cardsApp() {
                const url = this.$route.path
                const regex = /^(.*)\/cards.*/
                const match = regex.exec(url)
                if (match) return true
                else return false
            }
        },
        created() {
            API.get('/get-csrf/').then(response => {
                console.log(response.data)
                localStorage.setItem('csrfToken', response.data.csrf_token)
            }).catch(err => {
                console.log(err)
            })

            API.get('/cards/profiles').then(response => {
                console.log(response.data)
                let profiles = response.data
                profiles.forEach(p => {
                    if (p.user.id == this.user.id) {
                        this.profile = p
                    }
                })

                this.loaded = true
            }).catch(err => {
                console.log(err)
            })
        },
    }
</script>

<style scoped>
    
</style>