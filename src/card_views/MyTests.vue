<template>
    <Navbar></Navbar>
    <div class="container">
        <h1 class="my-3"> Результаты тестов </h1>
        <div class="d-flex flex-wrap mt-2" v-if="loaded">
            <div class="card m-2 col-5" v-for="deck in decks" :key="deck.id">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="card-title"><router-link :to="{ name: 'deck', params: { slug: deck.slug } }"
                                    class="text-reset text-decoration-none">{{ deck.title }}</router-link></h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ deck.creation_date }}
                            </h6>
                            <p class="card-text">{{ deck.desc }}</p>
                        </div>
                        <div class="col-5 d-flex flex-column justify-content-around">
                            <router-link :to="{ name: 'my-test', params: { slug: deck.slug } }" class="btn btn-primary">Посмотреть</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center">
        </div>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'MyTests',
    components: {
        Navbar
    },
    data() {
        return {
            profile: '',
            decks: [],
            loaded: false,
        }
    },
    computed: {
        ...mapState(['accessToken', 'user']),
    },
    created() {
        API.get('/cards/profiles').then(response => {
            console.log(response.data)
            let profiles = response.data
            profiles.forEach(p => {
                if (p.user.id == this.user.id) {
                    this.profile = p
                }
            })
            console.log(this.profile)

            API.get('/cards/decks').then(response => {
                console.log(response.data)
                let decks = response.data
                decks.forEach(d => {
                    if (d.creator.id == this.user.id) {
                        this.decks.push(d)
                    }
                })
                console.log(this.decks)
                this.loaded = true
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        closest_date(id) {
            var closest = new Date('NaN');
            let cards = this.cards
            cards.forEach(card => {
                if (card.original_card.deck.id == id) {
                    if (!isNaN(closest)) {
                        let next = new Date(card.next_review)
                        if (next.getTime() < closest.getTime()) {
                            closest = next
                        }
                    }
                    else {
                        closest = new Date(card.next_review)
                    }
                }
            })
            if (isNaN(closest)) {
                return ''
            }
            else return `Следующее повторение: ${closest.getDate()}.${closest.getMonth() + 1}.${closest.getFullYear()}`
        },
        cards_to_review(id) {
            let today = new Date()
            let k = 0
            let cards = this.cards
            cards.forEach(card => {
                if (card.original_card.deck.id == id) {
                    let next = new Date(card.next_review)
                    if (next.getTime() <= today.getTime()) {
                        k++
                    }
                }
            })
            return k
        }
    }
}
</script>

<style scoped></style>