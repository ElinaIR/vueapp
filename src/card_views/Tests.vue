<template>
    <Navbar></Navbar>
    <div class="container">
        <h1 class="my-3"> Мои тесты </h1>
        <div class="d-flex flex-wrap mt-2" v-if="loaded">
            <div class="card m-2 col-5" v-for="deck in decks" :key="deck.id">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="card-title"><router-link :to="{ name: 'deck', params: { slug: deck.slug } }"
                                    class="text-reset text-decoration-none">{{ deck.title }}</router-link></h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ deck.creator.username }}, {{ deck.creation_date }}
                            </h6>
                            <p class="card-text">{{ deck.desc }}</p>
                        </div>
                        <div class="col-5 d-flex flex-column justify-content-around">
                            <button class="btn btn-primary" @click="attempt(deck.id)">Пройти тест</button>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">{{ last_mark(deck.id) }}</small>
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
    name: 'Tests',
    components: {
        Navbar
    },
    data() {
        return {
            profile: '',
            decks: [],
            attempts: [],
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
                    if (this.profile.decks.includes(d.id)) {
                        this.decks.push(d)
                    }
                })
                console.log(this.decks)

                API.get('/cards/attempts').then(response => {
                    console.log(response.data)
                    let all_attempts = response.data
                    all_attempts.forEach(a => {
                        if (this.profile.user.id == a.user) {
                            this.attempts.push(a)
                        }
                    })
                    this.loaded = true
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        last_mark(id) {
            var closest = new Date('NaN');
            var last_attempt
            let attempts = this.attempts

            if (attempts.length == 0) {
                return 'Еще не пройден'
            }
            attempts.forEach(a => {
                if (a.deck == id) {
                    if (!isNaN(closest)) {
                        let next = new Date(a.date)
                        if (next.getTime() > closest.getTime()) {
                            closest = next
                            last_attempt = a
                        }
                    }
                    else {
                        closest = new Date(a.date)
                    }
                }
            })

            API.get(`/cards/attempts/${last_attempt.id}/marks`).then(response => {
                console.log(response.data)
                let marks = response.data
                let total = 0
                marks.forEach(m => {
                    total += m.mark
                })
                return total
            }).catch(err => {
                console.log(err)
            })
        },
        attempt(id) {
            API.post(`/cards/attempts/`, {
                deck: id
            }, {
                headers: {
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                this.$router.push({ name: 'test', params: { id: response.data.id}})
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped></style>