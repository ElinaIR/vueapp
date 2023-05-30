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
    name: 'editEGEVariant',
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
                this.task3 = tasks[1].task
                this.tasks.push(tasks[1].id)
                this.task4 = tasks[2].task
                this.tasks.push(tasks[2].id)
            })
            .catch(err => {
                console.log(err)
            })
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

            let fileName = ''
            
            if (this.task1audio) {
                fileName = uuidv4() + '.mp3';
                fd.append('audio', this.task1audio, fileName)
            }

            fd.append('text', this.text)
            API.patch(`/oge/task1/${this.tasks[0]}/`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$store.state.accessToken}`,
                },
            }).then(response => {
                console.log('task1', response.data)
                this.tasks.push(response.data.id)

                fd = new FormData()

                fd.append('task', this.task3)
               
                 if (this.task3audio) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('audio', this.task3audio, fileName)
                }
                if (this.task3start) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('start_audio', this.task3start, fileName)
                }
                if (this.task3q1) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('question1', this.task3q1, fileName)
                }
                if (this.task3q2) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('question2', this.task3q2, fileName)
                }
                if (this.task3q3) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('question3', this.task3q3, fileName)
                }
                if (this.task3q4) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('question4', this.task3q4, fileName)
                }
                if (this.task3q5) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('question5', this.task3q5, fileName)
                }
                if (this.task3q6) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('question6', this.task3q6, fileName)
                }
                if (this.task3end) {
                    fileName = uuidv4() + '.mp3';
                    fd.append('end_audio', this.task3end, fileName)
                }
        
                API.patch(`/oge/task2/${this.tasks[1]}/`, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.$store.state.accessToken}`,
                    },
                }).then(response => {
                    console.log('task2', response.data)
                    this.tasks.push(response.data.id)

                    fd = new FormData()

                    fd.append('task', this.task4)

                    if (this.task4audio) {
                        fileName = uuidv4() + '.mp3';
                        fd.append('audio', this.task4audio, fileName)
                    }
               
                    API.patch(`/oge/task3/${this.tasks[2]}/`, fd, {
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

                        if (this.pdf) {
                            fileName = uuidv4() + '.pdf';
                            fd.append('pdf', this.pdf, fileName)
                        }

                        API.patch(`/oge/variants/${this.$route.params.id}/`, fd, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${this.$store.state.accessToken}`,
                            },
                        }).then(response => {
                            console.log('oge variant changed', response.data)
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
                console.log('oge variant deleted', response.data)
                this.$router.push({ name: 'exam', params: { exam: this.$route.params.exam } })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped></style>