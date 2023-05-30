<template>
    <Navbar></Navbar>
    <form class="w-25 mx-auto my-5" v-on:submit.prevent="login">
        <p v-if="incorrectAuth" class="text-danger">Неверные логин или пароль</p>
        <div class="mb-3">
            <label for="InputUsername" class="form-label">Логин</label>
            <input type="text" class="form-control" id="InputUsername" v-model="username">
        </div>
        <div class="mb-3">
            <label for="InputPassword1" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="InputPassword1" v-model="password">
        </div>
        <button type="submit" @click="login()" class="btn btn-primary">Войти</button>
        <p class="mt-2"> Нет аккаунта? 
            <router-link :to = "{ name: 'register' }" exact class=""> Зарегистрируйтесь </router-link>
        </p>
    </form>
</template>

<script>
// import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            incorrectAuth: false
        }
    },
    components: {
        Navbar,
    },
    methods: {
        login() {
            this.$store.dispatch('userLogin', {
                username: this.username, 
                password: this.password
            })
            .then(() => {
                console.log(this.$store.state.user)
                this.$router.go(-1)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style scoped>
    
</style>