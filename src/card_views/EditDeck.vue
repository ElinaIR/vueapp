<template>
    <Navbar></Navbar>
    <div class="container p-5">
        <form class="p-3 bg-light border border-3 rounded-3" @submit.prevent="add" id="form">
            <div class="mb-3">
                <label for="InputTitle" class="form-label">Название стопки</label>
                <input type="text" class="form-control" id="InputTitle" v-model="title">
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Описание</h5>
                <div class="mb-3">
                    <textarea class="form-control" id="desc" v-model="desc"></textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'

export default {
    name: 'EditDeck',
    components: {
        Navbar,
    },
    data() {
        return {
            title: "",
            desc: "",
        }
    },
    computed: mapState(['accessToken', 'user']),
    mounted() {
        API.get(`/cards/decks/${this.$route.params.slug}`).then(response => {
            console.log(response.data)
            this.title = response.data.title
            this.desc = response.data.desc
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        add() {
            API.put(`/cards/decks/${this.$route.params.slug}/`, {
                title: this.title,
                desc: this.desc,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }).then(response => {
                console.log(response)
                this.$router.push({ name: 'deck', params: { slug: this.$route.params.slug } })
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped></style>