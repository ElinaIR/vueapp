<template>
    <div tabindex="-1" @keypress="handleclick">
        <div class="vh-100">
            <Navbar></Navbar>
            <div class="container">
                <div class="mt-3">
                    <p style="white-space: pre-wrap;"><strong>{{ APIData.task }}</strong></p>
                </div>
                <div class="d-flex flex-column mt-3" v-if="!oge">
                    <div class="d-flex justify-content-around">
                        <span :class="{ 'col-5': ege, 'col-3': vpr }">Photo 1</span>
                        <span :class="{ 'col-5': ege, 'col-3': vpr }">Photo 2</span>
                        <span class="col-3" v-if="vpr">Photo 3</span>
                    </div>
                    <div class="d-flex justify-content-around">
                        <img class="image-fluid" :class="{ 'col-5': ege, 'col-3': vpr }" id="image1" src="" alt="">
                        <img class="image-fluid" :class="{ 'col-5': ege, 'col-3': vpr }" id="image2" src="" alt="">
                        <img class="image-fluid col-3" id="image3" src="" alt="" v-show="vpr">
                    </div>
                </div>
            </div>

            <!-- <button class="btn btn-outline-secondary position-absolute bottom-0 end-0 m-5" @click="handleSkip">Пропустить</button> -->
            <div class="position-absolute bottom-0 w-100 d-flex justify-content-around align-items-center mb-3">
                <div class="w-75">
                    <div class="progress">
                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="pr_bar" ></div>
                    </div>
                </div>
                <div>
                    <router-link :to="{ name: 'exam', params: { exam: this.$route.params.exam } }" class="btn format_btn rounded-pill">Далее</router-link>
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
    name: 'EGETask4',
    data() {
        return {
            APIData: '',
            img1_url: '',
            img2_url: '',
            img3_url: '',
            BaseData: '',
            task_pl: new Audio(),
            speak_pl: new Audio(),
            end_pl: new Audio(),
            prepareTimeout: '',
            recordTimeout: '',
            endTimeout: '',
            timeouts: [],
        }
    },
    components: {
        Navbar
    },
    computed: {
        ...mapState(['user']),
        ege: function () {
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
                console.log('ogeee', !this.oge)
                if (this.ege) {
                    this.APIData = response.data.tasks[3]
                    this.img1_url = 'http://127.0.0.1:8000' + this.APIData.pic1
                    document.getElementById('image1').src = this.img1_url
                    this.img2_url = 'http://127.0.0.1:8000' + this.APIData.pic2
                    document.getElementById('image2').src = this.img2_url
                }
                else if (this.oge) {
                    this.APIData = response.data.tasks[2]
                }
                else if (this.vpr) {
                    this.APIData = response.data.tasks[1]
                    this.img1_url = 'http://127.0.0.1:8000' + this.APIData.pic1
                    document.getElementById('image1').src = this.img1_url
                    this.img2_url = 'http://127.0.0.1:8000' + this.APIData.pic2
                    document.getElementById('image2').src = this.img2_url
                    this.img3_url = 'http://127.0.0.1:8000' + this.APIData.pic3
                    document.getElementById('image3').src = this.img3_url
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
    },
    beforeRouteLeave() {
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i])
        }
        this.task_pl.pause()
        this.speak_pl.pause()
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
                    this.speak_pl.src = this.BaseData.start_speaking
                    this.speak_pl.play()
                }, this.APIData.prepare_time * 1000))
            })

            this.speak_pl.addEventListener('ended', () => {
                this.getBar(this.APIData.record_time * 10)

                this.timeouts.push(setTimeout(() => {
                    this.end_pl.src = this.BaseData.end
                    this.end_pl.play()
                }, this.APIData.record_time * 1000))
            })

            this.end_pl.addEventListener('ended', () => {
                if (this.user) {
                    API.post(`/${this.$route.params.exam}/popularity/`, {
                        variant_id: parseInt(`${this.$route.params.id}`),
                    }, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.accessToken}`,
                        },
                    }).then(response => {
                        console.log(response)
                        this.$router.push({ name: 'exam', params: { exam: this.$route.params.exam } })
                    }).catch(err => {
                        console.log(err)
                        if (err.response.status == 401) {
                            this.$router.push({ name: 'exam', params: { exam: this.$route.params.exam } })
                        }
                    })
                }
                else {
                    this.$router.push({ name: 'exam', params: { exam: this.$route.params.exam } })
                }
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