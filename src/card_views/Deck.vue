<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="card mt-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div class="ms-2">
                        <h5 class="card-title">{{ deck.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ deck.creator.username }}, {{ deck.creation_date }}</h6>
                        <p class="card-text">{{ deck.desc }}</p>
                    </div>
                    <div class="col-5 d-flex flex-column justify-content-around" v-if="accessToken != null">
                        <button v-if="!has_deck(deck.id)" class="btn btn-primary align-self-end" @click="add(deck.id)">Добавить</button>
                        <button v-if="has_deck(deck.id)" class="btn btn-primary align-self-end" @click="update">Обновить</button>
                        <div class="text-end">
                            <router-link :to="{ name: 'edit-deck', params: { slug: deck.slug} }" v-if="user.id == deck.creator.id" class="btn btn-outline-secondary btn-sm mx-3">Редактировать стопку</router-link>
                            <router-link :to="{ name: 'create-card', params: { slug: deck.slug } }" v-if="user.id == deck.creator.id" class="btn btn-outline-secondary btn-sm">Создать карточку</router-link>
                        </div>
                    </div>
                </div>
                <div class="my-3 list-group list-group-flush">
                    <div class="card list-group-item" v-for="card in cards" :key="card.id">
                        <div class="row">
                            <div class="col-2">
                                <img :src="base_url + card.front_pic" class="img-fluid" alt="" v-if="card.front_pic">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <h5 class="card-title" v-if="card.front_word">{{ card.front_word }}</h5>
                                    <p class="card-text" style="white-space: pre-wrap;">{{ card.back }}</p>
                                </div>
                            </div>
                            <div class="col-3 my-auto">
                                <router-link :to="{ name: 'edit-card', params: { slug: deck.slug, id: card.id } }" v-if="user.id == deck.creator.id" class="btn btn-outline-secondary btn-sm align-self-end">Редактировать карточку</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Deck',
    components: {
        Navbar
    },
    data() {
        return {
            base_url: 'http://127.0.0.1:8000',
            deck: '',
            cards: [],
            profile: '',
        }
    },
    computed: {
        ...mapState(['accessToken', 'user']),
        has_deck: function () {
            return (id) => this.profile.decks.includes(id)
        },
    },
    created() {
        API.get(`/cards/decks/${this.$route.params.slug}`).then(response => {
            console.log(response.data)
            this.deck = response.data
        }).catch(err => {
            console.log(err)
        })
        API.get(`/cards/decks/${this.$route.params.slug}/cards`).then(response => {
            console.log(response.data)
            this.cards = response.data
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
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        add(id) {
            API.patch(`/cards/profiles/${this.profile.id}/`, {
                decks: [id]
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }).then(response => {
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })
        },
        update() {
            API.get(`/cards/profiles/${this.profile.id}/cards`).then(response => {
                let has_cards = response.data
                console.log(has_cards)
                
                let arr = this.cards
                console.log('arr', arr)
                arr.forEach(card => {
                    let has = false
                    console.log('has_cards', has_cards)
                    has_cards.forEach(c => {
                        console.log('if', c.original_card, card, c.original_card.id == card.id)
                        if (c.original_card.id == card.id) {
                            console.log('if', c.original_card, card, c.original_card==card)
                            console.log('has', has)
                            has = true
                        }
                    })

                    if (!has) {
                        API.post('/cards/cards/', {
                            user: this.user.id,
                            or_card_id: card.id,
                        }, {
                            headers: {
                                'Authorization': `Bearer ${this.accessToken}`,
                            },
                        }).then(response => {
                            console.log(response)
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped></style>