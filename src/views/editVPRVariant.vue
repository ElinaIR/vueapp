<template>
    <div class="container p-5">
        <form class="p-3 bg-light border border-3 rounded-3" @submit.prevent="add" id="form">
            <div class="mb-3">
                <label for="InputName" class="form-label">Название варианта ВПР</label>
                <input type="text" class="form-control" id="InputName" v-model="name">
            </div>
            <div class="border-top border-3">
                <h5 class="mt-2">Задание 1</h5>
                <div class="row g-3">
                    <div class="mb-3 col">
                        <label for="InputTask1Task" class="form-label">Задание</label>
                        <textarea rows="7" class="form-control" id="InputTask1Task" v-model="task1"></textarea>
                    </div>
                    <div class="mb-3 col-9">
                        <label for="InputText" class="form-label">Текст</label>
                        <textarea rows="7" class="form-control" id="InputText" v-model="text"></textarea>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="InputTask1audio" class="form-label">Загрузите аудио</label>
                    <input class="form-control form-control-sm" id="InputTask1audio" type="file" @change="handleTask1audio">
                </div>
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Задание 2</h5>
                <div class="mb-3">
                    <label for="InputTask4Task" class="form-label">Задание</label>
                    <textarea rows="9" class="form-control" id="InputTask4Task" v-model="task4"></textarea>
                </div>
                <div class="mb-3">
                    <label for="InputTask4photo" class="form-label">Загрузите 3 фото</label>
                    <input class="form-control form-control-sm" id="InputTask4photo" type="file" multiple
                        @change="handleTask4photos">
                </div>
                <div class="mb-3 col">
                    <img id="photo1" src="" class="img-fluid">
                </div>
                <div class="mb-3 col">
                    <img id="photo2" src="" class="img-fluid">
                </div>
                <div class="mb-3 col">
                    <img id="photo3" src="" class="img-fluid">
                </div>
                <div class="mb-3">
                    <label for="InputTask4audio" class="form-label">Загрузите аудио</label>
                    <input class="form-control form-control-sm" id="InputTask4audio" type="file" @change="handleTask4audio">
                </div>
            </div>
            <div class="mb-3 border-top border-3">
                <label for="InputPDF" class="form-label">Загрузите PDF</label>
                <input class="form-control form-control-sm" id="InputPDF" type="file" @change="handlePDF">
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button class="btn btn-outline-danger" @click="del()">Удалить вариант</button>
            </div>
        </form>
    </div>
</template>

<script>
import { API } from '../axios-api'
import { v4 as uuidv4 } from "uuid"

export default {
    name: 'addEGEVariant',
    data() {
        return {
            name: "",
            task1: "",
            text: "",
            task1audio: null,
            task4: "",
            task4audio: null,
            task4pic1: null,
            task4pic2: null,
            task4pic3: null,
            pdf: null,
            tasks: [],
        }
    },
    created() {
        API.get(`/${this.$route.params.exam}/variants/${this.$route.params.id}`,)
            .then(response => {
                console.log(response.data)
                this.name = response.data.name
            })
            .catch(err => {
                console.log(err)
            })
        API.get(`/${this.$route.params.exam}/variants/${this.$route.params.id}/tasks`,)
            .then(response => {
                console.log(response.data)
                let tasks = response.data.tasks
                this.task1 = tasks[0].task
                this.text = tasks[0].text
                this.tasks.push(tasks[0].id)
                this.task4 = tasks[1].task
                this.tasks.push(tasks[1].id)
                let img1 = document.getElementById('photo1')
                let img2 = document.getElementById('photo2')
                let img3 = document.getElementById('photo3')
                img1.src = 'http://127.0.0.1:8000' + tasks[1].pic1
                img2.src = 'http://127.0.0.1:8000' + tasks[1].pic2
                img3.src = 'http://127.0.0.1:8000' + tasks[1].pic3
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        handleTask1audio(e) {
            this.task1audio = e.target.files[0];
        },
        handleTask4audio(e) {
            this.task4audio = e.target.files[0];
        },
        handleTask4photos(e) {
            this.task4pic1 = e.target.files[0];
            this.task4pic2 = e.target.files[1];
            this.task4pic3 = e.target.files[2];
            let img1 = document.getElementById('photo1')
            let img2 = document.getElementById('photo2')
            let img3 = document.getElementById('photo3')
            img1.src = URL.createObjectURL(e.target.files[0])
            img2.src = URL.createObjectURL(e.target.files[1])
            img3.src = URL.createObjectURL(e.target.files[2])
        },
        handlePDF(e) {
            this.pdf = e.target.files[0];
        },
        add() {
            let fd = new FormData();

            fd.append('task', this.task1)

            let fileName = ''
            
            if (this.task1audio) {
                fileName = uuidv4() + '.mp3';
                fd.append('audio', this.task1audio, fileName)
            }

            fd.append('text', this.text)
            API.patch(`/vpr/task1/${this.tasks[0]}/`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                console.log('task1', response.data)
                this.tasks.push(response.data.id)

                fd = new FormData()

                fd.append('task', this.task4)
                
                if (this.task4audio) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('audio', this.task4audio, fileName)
                }
                if (this.task4pic1) {
                    fileName = uuidv4() + '.png';
                    fd.append('pic1', this.task4pic1, fileName)
                }
                if (this.task4pic2) {
                    fileName = uuidv4() + '.png';
                    fd.append('pic2', this.task4pic2, fileName)
                }
                if (this.task4pic3) {
                    fileName = uuidv4() + '.png';
                    fd.append('pic3', this.task4pic3, fileName)
                }

                API.patch(`/vpr/task2/${this.tasks[1]}/`, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.$store.state.accessToken}`,
                    },
                }).then(response => {
                    console.log('task2', response.data, response.data.id)
                    this.tasks.push(response.data.id)

                    console.log(this.tasks)

                    fd = new FormData()

                    fd.append('name', this.name)

                    if (this.pdf) {
                        fileName = uuidv4() + '.pdf';
                        fd.append('pdf', this.pdf, fileName)
                    }

                    API.patch(`/vpr/variants/${this.$route.params.id}/`, fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.state.accessToken}`,
                        },
                    }).then(response => {
                        console.log('vpr variant changed', response.data)
                        this.$router.push({ name: 'exam', params: { exam: this.$route.params.exam } })
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
        del() {
            API.delete(`/${this.$route.params.exam}/variants/${this.$route.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                console.log('vpr variant deleted', response.data)
                this.$router.push({ name: 'exam', params: { exam: this.$route.params.exam } })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped></style>