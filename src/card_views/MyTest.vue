<template>
    <Navbar></Navbar>
    <div class="container">
        <table class="table table-light my-4 table-bordered" v-if="loaded">
            <thead>
                <tr>
                    <th>Пользователь</th>
                    <th>Результат</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a in attempts" :key="a.id">
                    <td>
                        <span v-if="a.user.last_name || a.user.first_name">
                            {{ a.user.last_name }} {{ a.user.first_name }}
                        </span>
                        <span v-else>
                            {{ a.user.username }}
                        </span>
                    </td>
                    <td>{{ mark(a.id) }}</td>
                    <td>{{ a.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Results',
    components: {
        Navbar
    },
    data() {
        return {
            attempts: [],
            marks: [],
            loaded: false,
        }
    },
    created() {
        API.get(`/cards/decks/${this.$route.params.slug}`).then(response => {
            console.log(response.data)
            let deck = response.data
            API.get(`/cards/attempts`).then(response => {
                console.log(response.data)
                let attempts = response.data
                attempts.forEach(a => {
                    if (a.deck == deck.id) {
                        this.attempts.push(a)
                    }
                })
                
                API.get(`/cards/marks`).then(response => {
                    console.log(response.data)
                    let marks = response.data
                    marks.forEach(m => {
                        if (m.card.deck.id == deck.id) {
                            this.marks.push(m)
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
        mark(id) {
            let total_mark = 0
            let marks = this.marks
            marks.forEach(m => {
                if (m.attempt == id) {
                    total_mark += m.mark
                }
            })

            return total_mark
        }
    }
}
</script>

<style scoped></style>