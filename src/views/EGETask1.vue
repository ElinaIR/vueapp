<template>
    <div tabindex="-1" @keypress="handleclick">
    <div class="vh-100 position-relative" :class="{'d-flex': !start, 'flex-column': !start, 'justify-content-center': !start }">
        <div :class="{'fixed-top': !start}"><Navbar></Navbar></div>
        <div class="container">
            <h1 v-if="!counteddown" class="text-center text-danger"><strong>{{ countdown }}</strong></h1>
            <h1 v-if="counteddown && !start" class="text-center text-danger"><strong>Now we are ready to start</strong></h1>


            <div v-if="start" class="mt-2">
                 <p><strong>{{ APIData.task }}</strong></p>
                 <p>{{ APIData.text }}</p>
            </div>
        </div>
        <div class="position-absolute bottom-0 w-100 d-flex justify-content-around align-items-center mb-3" v-show="start">
            <div class="w-75">
                <div class="progress">
                    <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="pr_bar" ></div>
                </div>
            </div>
            <div>
                <router-link :to="{ name: 'ege-task2', params: { exam: this.$route.params.exam, id: this.$route.params.id } }" class="btn format_btn rounded-pill" v-if="ege">Далее</router-link>
                <router-link :to="{ name: 'ege-task3', params: { exam: this.$route.params.exam, id: this.$route.params.id } }" class="btn format_btn rounded-pill" v-else-if="oge">Далее</router-link>
                <router-link :to="{ name: 'ege-task4', params: { exam: this.$route.params.exam, id: this.$route.params.id } }" class="btn format_btn rounded-pill" v-else-if="vpr">Далее</router-link>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Task1',
    data() {
        return {
            counteddown: false,
            countdown: 3,
            start: false,
            APIData: '',
            BaseData: '',
            start_pl: new Audio(),
            task_pl: new Audio(),
            speak_pl: new Audio(),
            startTimeout: '',
            prepareTimeout: '',
            recordTimeout: '',
            timeouts: [],
        }
    },
    components: {
        Navbar
    },
    computed: {
        ege: function() {
            return this.$route.params.exam == 'ege'
        },
        oge: function () {
            return this.$route.params.exam == 'oge'
        },
        vpr: function () {
            return this.$route.params.exam == 'vpr'
        },
    },
    created() {
        API.get(`/${this.$route.params.exam}/variants/${this.$route.params.id}/tasks`,)
            .then(response => {
                console.log(response.data)
                this.APIData = response.data.tasks[0]
            })
            .catch(err => {
                console.log(err)
            })
        API.get(`/base-audio`,)
            .then(response => {
                console.log(response.data)
                this.BaseData = response.data.at(-1)
            })
            .catch(err => {
                console.log(err)
            })
    },
    mounted() {
        let start_interval = setInterval(() => {
            this.countdown--
        }, 1000)

        setTimeout(() => {
            clearInterval(start_interval)
            this.counteddown = true
            this.handleclick()
        }, 3000)

    },
    beforeRouteLeave() {
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i])
        }
        this.start_pl.pause()
        this.task_pl.pause()
        this.speak_pl.pause()
    },
    methods: {
        handleclick() {
            this.start_pl.src = this.BaseData.start
            this.start_pl.play()

            this.start_pl.addEventListener('ended',  () => {
                console.log(this.start, 'thisstatr')
                this.start = true
                console.log(this.start)
                var task_url = 'http://127.0.0.1:8000' + this.APIData.audio
                this.task_pl.src = task_url
                console.log(this.task_pl)
                this.task_pl.play()
            })

            this.task_pl.addEventListener('ended', () => {
                var bar = document.getElementById('pr_bar')
                var percent = 0
                bar.style.width = percent + '%'
                var timerid = setInterval(function () {
                    percent += 1
                    bar.style.width = percent + '%'

                    if (percent >= 100) {
                        bar.style.width = '100%'
                        clearInterval(timerid)
                    }
                }, this.APIData.prepare_time * 10)

                this.timeouts.push(setTimeout(() => {
                    this.speak_pl.src = this.BaseData.start_speaking
                    this.speak_pl.play()
                }, this.APIData.prepare_time * 1000))
            })

            this.speak_pl.addEventListener('ended', () => {
                var bar = document.getElementById('pr_bar')
                var percent = 0
                bar.style.width = percent + '%'
                var timerid = setInterval(function () {
                    percent += 1
                    bar.style.width = percent + '%'

                    if (percent >= 100) {
                        bar.style.width = '100%'
                        clearInterval(timerid)
                    }
                }, this.APIData.record_time * 10)

                this.timeouts.push(setTimeout(() => {
                    if (this.ege) {
                        this.$router.push({ name: 'ege-task2', params: { exam: this.$route.params.exam, id: this.$route.params.id } })
                    }
                    else if (this.oge) {
                        this.$router.push({ name: 'ege-task3', params: { exam: this.$route.params.exam, id: this.$route.params.id } })
                    }
                    else if (this.vpr) {
                        this.$router.push({ name: 'ege-task4', params: { exam: this.$route.params.exam, id: this.$route.params.id } })
                    }
                }, this.APIData.record_time * 1000))
            })
        },
    }
}
</script>

<style scoped>
    .format_btn {
        width: 100px;
        background: #FFB904;
    }
    .format_btn:hover {
        /* opacity: 1; */
        background: linear-gradient(to bottom right, #FFB904, #F2DB9F, #FFB904);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }
</style>