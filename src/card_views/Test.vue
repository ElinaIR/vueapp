<template>
    <Navbar></Navbar>
    <div class="container">
        <div v-if="loaded">
            <form class="p-2 bg-light border border-3 rounded-3 row w-75 mx-auto mt-2" @submit="check()">
                <div v-for="c in cards" :key="c.id" class="row my-2 border-bottom border-1 pb-3">
                    <div class="col-3">
                        <div v-if="c.front_word">{{ c.front_word }}</div>
                        <img :src="c.front_pic" class="img-fluid" alt="" v-if="c.front_pic">
                    </div>
                    <div class="col-5 my-auto">
                        <input type="text" class="form-control" :id="c.id">
                    </div>
                </div>

                <button type="submit" class="btn btn-outline-success">Закончить тест</button>
            </form>
        </div>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'

export default {
    name: 'Test',
    components: {
        Navbar
    },
    data() {
        return {
            loaded: false,
            base_url: 'http://127.0.0.1:8000',
            cards: [],
            attempt: '',
        }
    },
    computed: {
        ...mapState(['accessToken', 'user']),
    },
    created() {
        API.get(`/cards/attempts/${this.$route.params.id}`).then(response => {
            console.log(response.data)
            this.attempt = response.data
            API.get('/cards/or_cards').then(response => {
                console.log(response.data)
                let all_cards = response.data
                all_cards.forEach(c => {
                    if (c.deck.id == this.attempt.deck) {
                        this.cards.push(c)
                    }
                })
                this.loaded = true
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        check() {
            let cards = this.cards
            cards.forEach(c => {
                let answer = document.getElementById(c.id).value
                let mark = 0
                let back = c.back.split(/\r?\n/)
                let word = back[0]
                if (answer.toLowerCase() == word.toLowerCase()) {
                    mark = 1
                }
                API.post(`/cards/marks/`, {
                    card_id: c.id,
                    mark: mark,
                    attempt: this.$route.params.id
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                    },
                }).then(response => {
                    console.log(response.data)
                }).catch(err => {
                    console.log(err)
                })
            })

            this.$router.push({ name: 'results', params: { id: this.$route.params.id }})
        }
    }

}
</script>
<style lang="">
    
</style>