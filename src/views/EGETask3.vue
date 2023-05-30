<template>
    <div tabindex="-1" @keypress="handleclick">
        <div class="vh-100">
            <Navbar></Navbar>
            <div class="container">
                <div class="mt-2">
                     <p><strong>{{ APIData.task }}</strong></p>
                </div>
            </div>
            <div class="position-absolute bottom-0 w-100 d-flex justify-content-around align-items-center mb-3">
                <div class="w-75">
                    <div class="progress">
                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="pr_bar" ></div>
                    </div>
                </div>
                <div>
                    <router-link :to="{ name: 'ege-task4', params: { exam: this.$route.params.exam, id: this.$route.params.id } }" class="btn format_btn rounded-pill">Далее</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'EGETask3',
    data() {
        return {
            APIData: '',
            BaseData: '',
            task_pl: new Audio(),
            start_pl: new Audio(),
            q_pl: new Audio(),
            q: 1,
            end_pl: new Audio(),
            timeouts: [],
        }
    },
    components: {
        Navbar
    },
    computed: {
        ege: function () {
            return this.$route.params.exam == 'ege'
        },
        oge: function () {
            return this.$route.params.exam == 'oge'
        },
        q_max: function () {
            if (this.$route.params.exam == 'oge') {
                return 6
            }
            return 5
        },
    },
    created() {
        API.get(`/${this.$route.params.exam}/variants/${this.$route.params.id}/tasks`,)
            .then(response => {
                console.log(response.data)
                if (this.ege) {
                    this.APIData = response.data.tasks[2]   
                }
                else if (this.oge) {
                    this.APIData = response.data.tasks[1]
                }
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
        setTimeout(() => {
            this.handleclick()
        }, 1000)

        this.q_pl.addEventListener('ended', () => {
            if (this.q == this.q_max) {
                this.getBar(this.APIData.record_time * 10)

                this.timeouts.push(setTimeout(() => {
                    var end_url = 'http://127.0.0.1:8000' + this.APIData.end_audio
                    this.end_pl.src = end_url
                    this.end_pl.play()

                    this.end_pl.addEventListener('ended', () => {
                        this.$router.push({ name: 'ege-task4', params: { exam: this.$route.params.exam, id: this.$route.params.id } })
                    })
                }, this.APIData.record_time * 1000))
            }
            else {
                this.getBar(this.APIData.record_time * 10)

                this.q = this.q + 1
                console.log(this.q)
                this.timeouts.push(setTimeout(() => {
                    var q_url = 'http://127.0.0.1:8000' + eval(`this.APIData.question${this.q}`)
                    console.log('q url', q_url, `this.APIData.question${this.q}`)
                    this.q_pl.src = q_url
                    this.q_pl.play()
                }, this.APIData.record_time * 1000))
            }
        })
    },
    beforeRouteLeave() {
        console.log(this.timouts)
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i])
        }
        this.task_pl.pause()
        this.start_pl.pause()
        this.q_pl.pause()
        this.end_pl.pause()
    },
    methods: {
        handleclick() {
            var task_url = 'http://127.0.0.1:8000' + this.APIData.audio
            this.task_pl.src = task_url
            this.task_pl.play()

            this.task_pl.addEventListener('ended', () => {
                this.getBar(this.APIData.prepare_time * 10)

                this.timeouts.push(setTimeout(() => {
                    var start_url = 'http://127.0.0.1:8000' + this.APIData.start_audio
                    this.start_pl.src = start_url
                    this.start_pl.play()
                }, this.APIData.prepare_time * 1000))
            })

            this.start_pl.addEventListener('ended', () => {
                this.timeouts.push(setTimeout(() => {
                    var q_url = 'http://127.0.0.1:8000' + this.APIData.question1
                    this.q_pl.src = q_url
                    this.q_pl.play()
                }, this.APIData.timer * 1000))
            })
        },
        getBar(time) {
            let bar = document.getElementById('pr_bar')
            let percent = 0
            bar.style.width = percent + '%'
            let timerid = setInterval(function () {
                percent += 1
                bar.style.width = percent + '%'

                if (percent >= 100) {
                    bar.style.width = '100%'
                    clearInterval(timerid)
                }
            }, time)
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
        background: linear-gradient(to bottom right, #FFB904, #F2DB9F, #FFB904);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }
</style>