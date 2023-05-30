<template>
    <Navbar></Navbar>
    <div class="container-sm">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <p>{{ APIData[0].task }}</p>
            </li>
             <li class="list-group-item">
                <p>{{ APIData[1].task }}</p>
            </li>
             <li class="list-group-item">
                <p>{{ APIData[2].task }}</p>
            </li>
             <li class="list-group-item">
                <p>{{ APIData[3].task }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Variant',
    // props: ['id'],
    data() {
        return {
            APIData: []
        }
    },
    components: {
        Navbar
    },
    created() {
        API.get(`/variants/${this.$route.params.id}/tasks`,)
            .then(response => {
                console.log('Post API has received data')
                this.APIData = response.data.tasks
            })
            .catch(err => {
                console.log(err)
            })
    },
}
</script>

<style scoped></style>