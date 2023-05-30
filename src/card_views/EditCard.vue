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
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button class="btn btn-outline-danger" @click="del()">Удалить карточку</button>
            </div>
        </form>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { v4 as uuidv4 } from "uuid"
import Navbar from '../components/Navbar.vue'

export default {
    name: 'EditCard',
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

            API.get(`/cards/or_cards/${this.$route.params.id}`).then(response => {
                console.log(response.data)
                let card = response.data
                this.word = card.word
                this.front_word = card.front_word
                this.back = card.back
                let img = document.getElementById('img')
                img.src = 'http://127.0.0.1:8000' + card.front_pic
            }).catch(err => {
                console.log(err)
            })
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

            API.patch(`/cards/or_cards/${this.$route.params.id}/`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }).then(response => {
                console.log(response)
                this.$router.push({ name: 'deck', params: { slug: this.$route.params.slug } })
            }).catch(err => {
                console.log(err)
            })
        },
        del() {
            API.delete(`/cards/or_cards/${this.$route.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                console.log('card deleted', response.data)
                this.$router.push({ name: 'deck', params: { slug: this.$route.params.slug } })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped></style>