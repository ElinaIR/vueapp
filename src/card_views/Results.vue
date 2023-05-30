<template>
    <Navbar></Navbar>
    <div class="container">
        <table class="table table-light my-4 table-bordered" v-if="loaded">
            <thead>
                <tr>
                    <th>Вопрос</th>
                    <th>Правильный ответ</th>
                    <th>Балл</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="m in marks" :key="m.id">
                    <td class="w-25">
                        <div v-if="m.card.front_word">
                            {{ m.card.front_word }}
                        </div>
                        <img :src="base_url + m.card.front_pic" class="img-fluid" alt="" v-if="m.card.front_pic">
                    </td>
                    <td><div class="my-auto">{{ word(m.card.back) }}</div></td>
                    <td>{{ m.mark }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2" class="text-end">Итого:</th>
                    <th>{{ total }}</th>
                </tr>
            </tfoot>
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
            base_url: 'http://127.0.0.1:8000',
            marks: [],
            loaded: false,
        }
    },
    created() {
        API.get(`/cards/attempts/${this.$route.params.id}/marks`).then(response => {
            console.log(response.data)
            this.marks = response.data
            this.loaded = true
        }).catch(err => {
            console.log(err)
        })
    },
    computed: {
        total() {
            let marks = this.marks
            let total_mark = 0
            marks.forEach(m => {
                total_mark += m.mark
            })
            return total_mark
        }
    },
    methods: {
        word(back) {
            let back_words = back.split(/\r?\n/)
            let word = back_words[0]
            return word
        }
    }
}
</script>

<style scoped></style>