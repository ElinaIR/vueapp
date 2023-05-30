<template>
    <div class="container p-5">
        <form class="p-3 bg-light border border-3 rounded-3" @submit.prevent="add" id="form">
            <div class="mb-3">
                <label for="InputName" class="form-label">Название варианта ОГЭ</label>
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
                <div class="mb-3 col-6">
                    <label for="InputTask3Task" class="form-label">Задание</label>
                    <textarea rows="5" class="form-control" id="InputTask3Task" v-model="task3"></textarea>
                </div>
                <div class="mb-3 col-6">
                    <div class="mb-3">
                        <label for="InputTask3audio" class="form-label">Загрузите аудио задания</label>
                        <input class="form-control form-control-sm" id="InputTask3audio" type="file"
                            @change="handleTask3audio">
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
                    <label for="InputTask3q6" class="form-label">Загрузите 6 вопрос</label>
                    <input class="form-control form-control-sm" id="InputTask3q6" type="file" @change="handleTask3q6">
                </div>
                <div class="mb-3 col-6">
                    <label for="InputTask3end" class="form-label">Загрузите конечное аудио</label>
                    <input class="form-control form-control-sm" id="InputTask3end" type="file" @change="handleTask3end">
                </div>
            </div>
            <div class="border-top border-3 row">
                <h5 class="mt-2">Задание 3</h5>
                <div class="mb-3">
                    <label for="InputTask4Task" class="form-label">Задание</label>
                    <textarea rows="9" class="form-control" id="InputTask4Task" v-model="task4"></textarea>
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
            task3: "",
            task3audio: null,
            task3start: null,
            task3q1: null,
            task3q2: null,
            task3q3: null,
            task3q4: null,
            task3q5: null,
            task3q6: null,
            task3end: null,
            task4: "",
            task4audio: null,
            pdf: null,
            tasks: [],
        }
    },
    methods: {
        handleTask1audio(e) {
            this.task1audio = e.target.files[0];
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
        handleTask3q6(e) {
            this.task3q6 = e.target.files[0];
        },
        handleTask3end(e) {
            this.task3end = e.target.files[0];
        },
        handleTask4audio(e) {
            this.task4audio = e.target.files[0];
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
            fd.append('record_time', 120)
            API.post('/oge/task1/', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                console.log('task1', response.data)
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
                fd.append('question6', this.task3q6, fileName)
                fileName = uuidv4() + '.mp3';
                fd.append('end_audio', this.task3end, fileName)
                API.post('/oge/task2/', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.$store.state.accessToken}`,
                    },
                }).then(response => {
                    console.log('task2', response.data)
                    this.tasks.push(response.data.id)

                    fd = new FormData()

                    fd.append('task', this.task4)
                    fileName = uuidv4() + '.mp3';
                    fd.append('audio', this.task4audio, fileName)
                    fd.append('prepare_time', 90)
                    fd.append('record_time', 120)
                    API.post('/oge/task3/', fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.state.accessToken}`,
                        },
                    }).then(response => {
                        console.log('task3', response.data, response.data.id)
                        this.tasks.push(response.data.id)

                        console.log(this.tasks)

                        fd = new FormData()

                        fd.append('name', this.name)
                        fd.append('task1', this.tasks[0])
                        fd.append('task2', this.tasks[1])
                        fd.append('task3', this.tasks[2])

                        if (this.pdf) {
                            fileName = uuidv4() + '.pdf';
                            fd.append('pdf', this.pdf, fileName)
                        }

                        API.post('/oge/variants/', fd, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${this.$store.state.accessToken}`,
                            },
                        }).then(response => {
                            console.log('oge variant created', response.data)
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

        },
        clearData() {
            this.tasks = []
        },
    }
}
</script>

<style scoped></style>