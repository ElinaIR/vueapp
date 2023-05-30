<template>
    <Navbar></Navbar>
    <div class="container p-5">
        <form class="p-3 bg-light border border-3 rounded-3" @submit.prevent="add" id="form">
            <div class="mb-3">
                <label for="InputWord" class="form-label">Слово</label>
                <input type="text" class="form-control" id="InputWord" v-model="word">
            </div>
            <div class="border-top border-3">
                <h5 class="mt-2">Передняя сторона</h5>
                <div class="row">
                    <div class="mb-3 col">
                        <label for="InputFrontWord" class="form-label">Слово</label>
                        <input class="form-control" id="InputFrontWord" v-model="front_word">
                    </div>
                    <div class="mb-3">
                        <label for="InputImg" class="form-label">Фото</label>
                        <input class="form-control form-control-sm" id="InputImg" type="file" @change="handleImg">
                    </div>
                    <div class="mb-3" style="height: 200px">
                        <img id="img" src="" class="h-100">
                    </div>
                </div>
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Задняя сторона</h5>
                <div class="mb-3">
                    <textarea class="form-control" id="back" v-model="back"></textarea>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Добавить</button>
                <router-link :to="{ name: 'deck', params: { slug: this.$route.params.slug } }" class="btn btn-outline-dark">Перейти к стопке</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { v4 as uuidv4 } from "uuid"
import Navbar from '../components/Navbar.vue'

export default {
    name: 'CreateCard',
    components: {
        Navbar,
    },
    data() {
        return {
            word: "",
            front_word: "",
            front_pic: null,
            back: "",
            deck: '',
        }
    },
    created() {
        API.get(`/cards/decks/${this.$route.params.slug}`).then(response => {
            console.log(response.data)
            this.deck = response.data.id
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        handleImg(e) {
            this.front_pic = e.target.files[0];
            let img = document.getElementById('img')
            img.src = URL.createObjectURL(e.target.files[0])
        },
        add() {
            let fd = new FormData();

            fd.append('word', this.word)

            if (this.front_word != '') {
                fd.append('front_word', this.front_word)
            }
            if (this.front_pic != null) {
                let fileName = uuidv4() + '.png';
                fd.append('front_pic', this.front_pic, fileName)
            }

            fd.append('back', this.back)
            fd.append('deck_id', this.deck)

            API.post('/cards/or_cards/', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }).then(response => {
                console.log(response.data)
                this.clearData()
                let form = document.getElementById('form')
                form.reset()
            }).catch(err => {
                console.log(err)
            })
        },
        clearData() {
            let img = document.getElementById('img')
            img.setAttribute('src', '')
        },
    }
}
</script>

<style scoped></style>