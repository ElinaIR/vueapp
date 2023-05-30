<template>
    <Navbar></Navbar>
    <div class="container">
        <form class="p-2 bg-light border border-3 rounded-3 row w-75 mx-auto mt-2" id="form">
            <div class="col-auto d-flex align-items-center">
                <span>Фильтр</span>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Название стопки" aria-label="InputTitle" v-model="filter.title">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Создатель стопки" aria-label="InputCreator" v-model="filter.creator">
            </div>
            <div class="col-auto"><button class="btn btn-outline-secondary" @click="reset">Сбросить</button></div>
        </form>
        <div class="d-flex flex-wrap justify-content-center">
        <div class="card m-2 col-5" v-for="deck in filtered" :key="deck.id">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title"><router-link :to="{ name: 'deck', params: { slug: deck.slug }}" class="link-dark">{{ deck.title }}</router-link></h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ deck.creator.username }}, {{ deck.creation_date }}</h6>
                        <p class="card-text">{{ deck.desc }}</p>
                    </div>
                    <div class="col-5 d-flex flex-column justify-content-around" v-if="accessToken != null">
                        <button v-if="!has_deck(deck.id)" class="btn btn-primary align-self-end" @click="add(deck.id)">Добавить</button>
                        <router-link :to="{ name: 'create-card', params: { slug: deck.slug }}" v-if="user.id == deck.creator" class="btn btn-outline-secondary btn-sm">Создать карточку</router-link>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div class="text-center">

            <!-- {% if page_obj.has_previous %}
                <a href="?page={{ page_obj.previous_page_number }}">пред.</a>
            {% endif %}

            <p class="mt-2">
                {{ page_obj.number }} из {{ page_obj.paginator.num_pages }}
            </p>

            {% if page_obj.has_next %}
                <a href="?page={{ page_obj.next_page_number }}">след.</a>
            {% endif %} -->
        </div>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'DeckList',
    components: {
        Navbar
    },
    data() {
        return {
            filter: {
                title: '',
                creator: '',
            },
            APIData: [],
            profile: '',
        }
    },
    computed: {
        ...mapState(['accessToken', 'user']),
        has_deck: function() {
            return (id) => this.profile.decks.includes(id)
        },
        filtered() {
            let title = this.filter.title
            let creator = this.filter.creator

            let title_filter = this.APIData.filter(deck => (title.trim() == '') || (deck.title.toLowerCase().includes(title.toLowerCase())))

            let creator_filter = title_filter.filter(deck => (creator.trim() == '') || deck.creator.username.toLowerCase().includes(creator.toLowerCase()))

            return creator_filter
        },
    },
    created() {
        API.get('/cards/decks').then(response => {
            console.log(response.data)
            this.APIData = response.data
            this.filter.filtered = response.data
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
        reset() {
            this.filter.title = ''
            this.filter.creator = ''
        }
    }
}
</script>

<style scoped>
</style>