<template>
    <div class="container p-5">
        <form class="p-3 bg-light border border-3 rounded-3" @submit.prevent="add" id="form">
            <div class="mb-3">
                <label for="InputName" class="form-label">Название варианта ЕГЭ</label>
                <input type="text" class="form-control" id="InputName" v-model="name">
            </div>
            <div class="border-top border-3">
                <h5 class="mt-2">Задание 1</h5>
                <div class="row g-3">
                    <div class="mb-3 col">
                        <label for="InputTask1Task" class="form-label">Задание</label>
                        <textarea rows="10" class="form-control" id="InputTask1Task" v-model="task1"></textarea>
                    </div>
                    <div class="mb-3 col-9">
                        <label for="InputText" class="form-label">Текст</label>
                        <textarea rows="10" class="form-control" id="InputText" v-model="text"></textarea>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="InputTask1audio" class="form-label">Загрузите аудио</label>
                    <input class="form-control form-control-sm" id="InputTask1audio" type="file" @change="handleTask1audio">
                </div>
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Задание 2</h5>
                <div class="mb-3 col">
                    <label for="InputTask2pic" class="form-label">Загрузите фото</label>
                    <input class="form-control form-control-sm" id="InputTask2pic" type="file" @change="handleTask2photo">
                    <img id="photo1" src="" class="img-fluid">
                </div>
                <div class="col-8">
                    <div class="mb-3">
                        <label for="InputName" class="form-label">Подпись к фото</label>
                        <input type="text" class="form-control" id="InputName" v-model="picCap">
                    </div>
                    <div class="mb-3">
                        <label for="InputTask2Task" class="form-label">Задание</label>
                        <textarea rows="10" class="form-control" id="InputTask2Task" v-model="task2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="InputTask2audio" class="form-label">Загрузите аудио задания</label>
                        <input class="form-control form-control-sm" id="InputTask2audio" type="file" @change="handleTask2audio">
                    </div>
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask2question1" class="form-label">Загрузите 1 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask2question1" type="file" @change="handleTask2q1">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask2question2" class="form-label">Загрузите 2 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask2question2" type="file" @change="handleTask2q2">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask2question3" class="form-label">Загрузите 3 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask2question3" type="file" @change="handleTask2q3">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask2question4" class="form-label">Загрузите 4 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask2question4" type="file" @change="handleTask2q4">
                </div>
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Задание 3</h5>
                <div class="mb-3 col-6">
                    <label for="InputTask3Task" class="form-label">Задание</label>
                    <textarea rows="5" class="form-control" id="InputTask3Task" v-model="task3"></textarea>
                </div>
                <div class="mb-3 col-6">
                    <div class="mb-3">
                        <label for="InputTask3audio" class="form-label">Загрузите аудио задания</label>
                        <input class="form-control form-control-sm" id="InputTask3audio" type="file" @change="handleTask3audio">
                    </div>
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3start" class="form-label">Загрузите начальное аудио</label>
                    <input class="form-control form-control-sm" id="InputTask3start" type="file" @change="handleTask3start">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3q1" class="form-label">Загрузите 1 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask3q1" type="file" @change="handleTask3q1">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3q2" class="form-label">Загрузите 2 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask3q2" type="file" @change="handleTask3q2">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3q3" class="form-label">Загрузите 3 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask3q3" type="file" @change="handleTask3q3">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3q4" class="form-label">Загрузите 4 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask3q4" type="file" @change="handleTask3q4">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3q5" class="form-label">Загрузите 5 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask3q5" type="file" @change="handleTask3q5">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3end" class="form-label">Загрузите конечное аудио</label>
                    <input class="form-control form-control-sm" id="InputTask3end" type="file" @change="handleTask3end">
                </div>
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Задание 4</h5>
                <div class="mb-3">
                    <label for="InputTask4Task" class="form-label">Задание</label>
                    <textarea rows="9" class="form-control" id="InputTask4Task" v-model="task4"></textarea>
                </div>
                <div class="mb-3">
                    <label for="InputTask4photo" class="form-label">Загрузите 2 фото</label>
                    <input class="form-control form-control-sm" id="InputTask4photo" type="file" multiple @change="handleTask4photos">
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
            <button type="submit" class="btn btn-primary">Добавить</button>
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
            task2: "",
            task2audio: null,
            picCap: "",
            task2pic: null,
            task2q1: null,
            task2q2: null,
            task2q3: null,
            task2q4: null,
            task3: "",
            task3audio: null,
            task3start: null,
            task3q1: null,
            task3q2: null,
            task3q3: null,
            task3q4: null,
            task3q5: null,
            task3end: null,
            task4: "",
            task4audio: null,
            task4pic1: null,
            task4pic2: null,
            pdf: null,
            tasks: [],
        }
    },
    methods: {
        handleTask1audio(e) {
            this.task1audio = e.target.files[0];
        },
        handleTask2photo(e) {
            this.task2pic = e.target.files[0];
            let img = document.getElementById('photo1')
            img.src = URL.createObjectURL(e.target.files[0])
        },
        handleTask2audio(e) {
            this.task2audio = e.target.files[0];
        },
        handleTask2q1(e) {
            this.task2q1 = e.target.files[0];
        },
        handleTask2q2(e) {
            this.task2q2 = e.target.files[0];
        },
        handleTask2q3(e) {
            this.task2q3 = e.target.files[0];
        },
        handleTask2q4(e) {
            this.task2q4 = e.target.files[0];
        },
        handleTask3audio(e) {
            this.task3audio = e.target.files[0];
        },
        handleTask3start(e) {
            this.task3start = e.target.files[0];
        },
        handleTask3q1(e) {
            this.task3q1 = e.target.files[0];
        },
        handleTask3q2(e) {
            this.task3q2 = e.target.files[0];
        },
        handleTask3q3(e) {
            this.task3q3 = e.target.files[0];
        },
        handleTask3q4(e) {
            this.task3q4 = e.target.files[0];
        },
        handleTask3q5(e) {
            this.task3q5 = e.target.files[0];
        },
        handleTask3end(e) {
            this.task3end = e.target.files[0];
        },
        handleTask4audio(e) {
            this.task4audio = e.target.files[0];
        },
        handleTask4photos(e) {
            this.task4pic1 = e.target.files[0];
            this.task4pic2 = e.target.files[1];
            let img1 = document.getElementById('photo2')
            let img2 = document.getElementById('photo3')
            img1.src = URL.createObjectURL(e.target.files[0])
            img2.src = URL.createObjectURL(e.target.files[1])
        },
        handlePDF(e) {
            this.pdf = e.target.files[0];
        },
        add() {
            let fd = new FormData();

            fd.append('task', this.task1)
            let fileName = uuidv4() + '.mp3';
            fd.append('audio', this.task1audio, fileName)
            fd.append('text', this.text)
            API.post('/ege/task1/', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                console.log('task1', response.data)
                this.tasks.push(response.data.id)

                fd = new FormData()

                fd.append('task', this.task2)
                fd.append('pic_caption', this.picCap)
                fileName = uuidv4() + '.png';
                fd.append('pic', this.task2pic, fileName)
                fileName = uuidv4() + '.mp3';
                fd.append('audio', this.task2audio, fileName)
                fileName = uuidv4() + '.mp3';
                fd.append('question1', this.task2q1, fileName)
                fileName = uuidv4() + '.mp3';
                fd.append('question2', this.task2q2, fileName)
                fileName = uuidv4() + '.mp3';
                fd.append('question3', this.task2q3, fileName)
                fileName = uuidv4() + '.mp3';
                fd.append('question4', this.task2q4, fileName)
                API.post('/ege/task2/', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.$store.state.accessToken}`,
                    },
                }).then(response => {
                    console.log('task2', response.data)
                    this.tasks.push(response.data.id)
       
                    fd = new FormData()

                    fd.append('task', this.task3)
                    fileName = uuidv4() + '.mp3';
                    fd.append('audio', this.task3audio, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('start_audio', this.task3start, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('question1', this.task3q1, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('question2', this.task3q2, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('question3', this.task3q3, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('question4', this.task3q4, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('question5', this.task3q5, fileName)
                    fileName = uuidv4() + '.mp3';
                    fd.append('end_audio', this.task3end, fileName)
                    API.post('/ege/task3/', fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.state.accessToken}`,
                        },
                    }).then(response => {
                        console.log('task3', response.data)
                        this.tasks.push(response.data.id)

                        fd = new FormData()

                        fd.append('task', this.task4)
                        fileName = uuidv4() + '.mp3';
                        fd.append('audio', this.task4audio, fileName)
                        fileName = uuidv4() + '.png';
                        fd.append('pic1', this.task4pic1, fileName)
                        fileName = uuidv4() + '.png';
                        fd.append('pic2', this.task4pic2, fileName)
                        API.post('/ege/task4/', fd, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${this.$store.state.accessToken}`,
                            },
                        }).then(response => {
                            console.log('task4', response.data, response.data.id)
                            this.tasks.push(response.data.id)

                            console.log(this.tasks)

                            fd = new FormData()

                            fd.append('name', this.name)
                            fd.append('task1', this.tasks[0])
                            fd.append('task2', this.tasks[1])
                            fd.append('task3', this.tasks[2])
                            fd.append('task4', this.tasks[3])

                            if (this.pdf) {
                                fileName = uuidv4() + '.pdf';
                                fd.append('pdf', this.pdf, fileName)
                            }

                            API.post('/ege/variants/', fd, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                                },
                            }).then(response => {
                                console.log('variant created', response.data)
                                this.clearData()
                                let form = document.getElementById('form')
                                form.reset()
                            }).catch(err => {
                                console.log(err)
                                if (err.response.status == 401) {
                                    this.clearData()
                                    let form = document.getElementById('form')
                                    form.reset()
                                }
                            })
                        }).catch(err => {
                            console.log(err)
                        })

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
        clearData() {
            this.tasks = []

            let img = document.getElementById('photo1')
            img.setAttribute('src', '')
            let img1 = document.getElementById('photo2')
            let img2 = document.getElementById('photo3')
            img1.setAttribute('src', '')
            img2.setAttribute('src', '')
        },
    }
}
</script>

<style scoped></style>