<template>
    <Navbar></Navbar>
    <div class="container">
        <div v-if="loaded">
        <div class="card mt-3 w-50 mx-auto" v-for="c in paginatedCard" :key="c.id">
            <div class="card-body" @click="look">
                <div class="text-center">
                    <img :src="c.original_card.front_pic" class="img-fluid" alt="" v-if="c.original_card.front_pic">
                </div>
                <h5 class="card-title text-center" v-if="c.original_card.front_word">{{ c.original_card.front_word }}</h5>
                <div v-if="back">
                    <br>
                    <p id="back" class="card-text text-center">{{ c.original_card.back }}</p>
                </div>
            </div>
        </div>
        </div>
        <div class="text-center my-4 fixed-bottom" v-if="areCards">
            <button class="btn btn-outline-danger mx-5" @click="no_card">Не помню</button>
            <router-link :to="{ path: this.$route.path, query: { page: `${this.currentPage + 1}`}}" class="btn btn-outline-warning mx-5" v-if="isNext">Помню</router-link>
            <router-link :to="{ path: this.$route.path, query: { page: `1` } }" class="btn btn-outline-warning mx-5" v-else>Помню</router-link>
            <button class="btn btn-outline-success mx-5" @click="yes_card">Помню отлично</button>
        </div>

        <h2 v-else-if="loaded" class="text-center m-5">Повторение закончено!</h2>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'

export default {
    name: 'MyDecks',
    components: {
        Navbar
    },
    data() {
        return {
            loaded: false,
            // base_url: 'http://127.0.0.1:8000',
            cards: [],
            back: false,
        }
    },
    computed: {
        ...mapState(['accessToken', 'user']),
        paginatedCard() {
            let start = this.currentPage - 1
            let end = start + 1
            let cards = this.cards
            return cards.slice(start, end)
        },
        currentPage() {
            return Number(this.$route.query.page || '1')
        },
        isNext() {
            return this.currentPage + 1 <= this.cards.length
        },
        areCards() {
            return this.cards.length > 0
        }
    },
    created() {
        API.get('/cards/cards').then(response => {
            console.log(response.data)
            let all_cards = response.data
            let today = new Date()
            all_cards.forEach(c => {
                let next = new Date(c.next_review)
                if ((this.user.id == c.user) && (c.original_card.deck.slug == this.$route.params.slug) && (next.getTime() < today.getTime())) {
                    this.cards.push(c)
                }
            })
            console.log(this.cards, today)
            this.loaded = true
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        look() {
            this.back = !this.back
        },
        no_card() {
            let card = this.paginatedCard[0]
            let last = new Date()
            let last_wrong = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
            API.patch(`/cards/cards/${card.id}/`, {
                last_wrong: last_wrong
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }).then(response => {
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })

            if (this.isNext) {
                this.$router.push({ path: this.$route.path, query: { page: `${this.currentPage + 1}` } })
            }
            else {
                this.$router.push({ path: this.$route.path, query: { page: `1` } })
            }
        },
        yes_card() {
            let card = this.paginatedCard[0]
            let today = new Date()
            let last_wrong = new Date(card.last_wrong)
            let deltaDays = Math.ceil((today.getTime() - last_wrong.getTime()) / (1000 * 60 * 60 * 24)) 
            deltaDays = deltaDays * 2 + 1
            let delta = deltaDays * (1000 * 60 * 60 * 24)
            let next = new Date(last_wrong.getTime() + delta)
            let next_review = `${next.getFullYear()}-${next.getMonth() + 1}-${next.getDate()}`
            this.cards.splice(this.cards.findIndex((c) => c.id == card.id), 1)
            API.patch(`/cards/cards/${card.id}/`, {
                next_review: next_review
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }).then(response => {
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
    
}
</script>
<style lang="">
    
</style>