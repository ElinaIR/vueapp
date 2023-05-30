<template>
    <Navbar></Navbar>
    <form class="w-50 mx-auto my-5 row needs-validation" @submit.prevent="validate()">
        <div class="mb-3 col-6">
            <label for="InputSurname" class="form-label">Фамилия</label>
            <input type="text" class="form-control" id="InputSurname" v-model="last_name">
        </div>
        <div class="mb-3 col-6">
            <label for="InputName" class="form-label">Имя</label>
            <input type="text" class="form-control" id="InputName" v-model="first_name">
        </div>
        <div class="mb-3 col-6">
            <label for="InputUsername" class="form-label">Логин</label>
            <input type="text" class="form-control" id="InputUsername" v-model="username">
            <div class="text-danger" v-if="v$.username.$error">
                <small>Это обязательное поле</small>
            </div>
        </div>
        <div class="mb-3 col-6">
            <label for="InputEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="InputEmail" v-model="email">
            <div class="text-danger" v-if="v$.email.$error">
                <small>Введите действительный e-mail</small>
            </div>
        </div>
        <div class="mb-3 col-6">
            <label for="InputPassword1" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="InputPassword1" v-model="password1">
            <div class="text-danger" v-if="v$.password1.$error">
                <small>Это обязательное поле</small>
            </div>
        </div>
        <div class="mb-3 col-6">
            <label for="InputPassword2" class="form-label">Повторите пароль</label>
            <input type="password" class="form-control" id="InputPassword2" v-model="password2">
            <div class="text-danger" v-if="v$.password2.$error">
                <small>Пароли должны совпадать</small>
            </div>
        </div>
        <button type="submit" class="btn btn-primary w-75 mx-auto">Зарегистрироваться</button>
    </form>
</template>

<script>
import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

export default {
    name: 'Register',
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            last_name: "",
            first_name: "",
            username: "",
            email: "",
            password1: "",
            password2: "",
        }
    },
    validations() {
        return {
            username: { required },
            email: { required, email },
            password1: { required },
            password2: { required, sameAsPassword: sameAs(this.password1)}
        }
    },
    components: {
        Navbar,
    },
    methods: {
        validate() {
            const isFormCorrect = this.v$.$validate()
            if (!isFormCorrect) {
                this.reg()
            }
        },
        reg() {
            API.post('/register/', { 
                last_name: this.last_name, 
                first_name: this.first_name, 
                username: this.username, 
                email: this.email, 
                password: this.password1
            }).then(response => {
                console.log('Registration successful')
                console.log(response.data)

                this.$store.dispatch('userLogin', {
                    username: this.username,
                    password: this.password1
                }).then(() => {
                    this.$router.go(-2)
                })
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped></style>