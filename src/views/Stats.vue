<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="row m-3">
            <div class="col">
                <LineChart v-if="users_loaded" :options="chartOptions" :data="lineChartData"/>
            </div>
            <div v-if="users_loaded" class="col-3 d-flex align-items-center">
                <label for="selectYear" class="form-label me-2">Год</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="year" id="selectYear">
                    <option :value="y" v-for="y in years" :key="y">{{ y }}</option>
                </select>
            </div>
        </div>
        <div class="row m-5">
            <div class="col-4" style="overflow-x: scroll">
                <BarChart v-if="ege_loaded" :options="chartOptions" :data="egeBarChartData" />
            </div>
            <div class="col-4" style="overflow-x: scroll">
                <BarChart v-if="oge_loaded" :options="chartOptions" :data="ogeBarChartData" />
            </div>
            <div class="col-4" style="overflow-x: scroll">
                <BarChart v-if="vpr_loaded" :options="chartOptions" :data="vprBarChartData" />
            </div>
        </div>
        <div class="m-5" style="overflow-x: scroll">
            <BarChart v-if="decks_loaded" :options="chartOptions" :data="deckBarChartData" />
        </div>
    </div>
</template>
<script>
import { API } from '../axios-api'
import Navbar from '../components/Navbar.vue'
import BarChart from '../components/BarChart.vue'
import LineChart from '../components/LineChart.vue'

export default {
    name: 'Stats',
    components: {
        Navbar, BarChart, LineChart
    },
    data() {
        return {
            users_loaded: false,
            users: [],
            ege_loaded: false,
            ege: [],
            oge_loaded: false,
            oge: [],
            vpr_loaded: false,
            vpr: [],
            decks_loaded: false,
            years: [],
            year: 2023,
            egeBarChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'ЕГЭ',
                        backgroundColor: '#FF7043',
                        data: null,
                    }
                ]
            },
            ogeBarChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'ОГЭ',
                        backgroundColor: '#FFA726',
                        data: null,
                    }
                ]
            },
            vprBarChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'ВПР',
                        backgroundColor: '#FFEE58',
                        data: null,
                    }
                ]
            },
            deckBarChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Стопки',
                        backgroundColor: '#69F0AE',
                        data: null,
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                scales: {
                    y: {
                        suggestedMin: 0,
                    }
                }
            }
        }
    },
    mounted() {
        API.get('/users').then(response => {
            console.log(response.data)
            this.users = response.data
            let users = response.data
            users.forEach(u => {
                let reg = new Date(u.date_joined)
                if (!this.years.includes(reg.getFullYear())) {
                    this.years.push(reg.getFullYear())
                }
            })
            this.users_loaded = true
        }).catch(err => {
            console.log(err)
        })
        API.get('/ege/popularity').then(response => {
            this.ege = response.data
            let popularity = response.data
            let variants = []
            let data = []
            let labels = []
            popularity.forEach(p => {
                if (variants.includes(p.variant.id)) {
                    data[variants.findIndex((elem) => elem == p.variant.id)] += 1
                }
                else {
                    variants.push(p.variant.id)
                    data.push(1)
                    labels.push(p.variant.name)
                }
            })
            this.egeBarChartData.labels = labels
            this.egeBarChartData.datasets[0].data = data
            this.ege_loaded = true
        }).catch(err => {
            console.log(err)
        })
        API.get('/oge/popularity').then(response => {
            this.oge = response.data
            let popularity = response.data
            let variants = []
            let data = []
            let labels = []
            popularity.forEach(p => {
                if (variants.includes(p.variant.id)) {
                    data[variants.findIndex((elem) => elem == p.variant.id)] += 1
                }
                else {
                    variants.push(p.variant.id)
                    data.push(1)
                    labels.push(p.variant.name)
                }
            })
            this.ogeBarChartData.labels = labels
            this.ogeBarChartData.datasets[0].data = data
            this.oge_loaded = true
        }).catch(err => {
            console.log(err)
        })
        
        API.get('/vpr/popularity').then(response => {
            this.vpr = response.data
            let popularity = response.data
            let variants = []
            let data = []
            let labels = []
            popularity.forEach(p => {
                if (variants.includes(p.variant.id)) {
                    data[variants.findIndex((elem) => elem == p.variant.id)] += 1
                }
                else {
                    variants.push(p.variant.id)
                    data.push(1)
                    labels.push(p.variant.name)
                }
            })
            this.vprBarChartData.labels = labels
            this.vprBarChartData.datasets[0].data = data
            this.vpr_loaded = true
        }).catch(err => {
            console.log(err)
        })


        API.get('/cards/popularity').then(response => {
            let popularity = response.data
            console.log(response.data)
            let decks = []
            let data = []
            let labels = []
            popularity.forEach(p => {
                console.log(p, decks, p.deck.id)
                if (decks.includes(p.deck.id)) {
                    data[decks.findIndex((elem) => elem == p.deck.id)] += 1
                }
                else {
                    decks.push(p.deck.id)
                    data.push(1)
                    labels.push(p.deck.title)
                    console.log('push', decks, data, labels)
                }
            })

            let objArr = labels.map(function(d, i) {
                return {
                    label: d,
                    data: data[i]
                }
            })

            let sortedObjArr = objArr.sort(function(a, b) {
                return b.data > a.data
            })

            let sortedLabels = []
            let sortedData = []

            sortedObjArr.forEach(d => {
                sortedLabels.push(d.label)
                sortedData.push(d.data)
            })


            
            this.deckBarChartData.labels = sortedLabels
            this.deckBarChartData.datasets[0].data = sortedData
            this.decks_loaded = true
            console.log(labels, data)
        }).catch(err => {
            console.log(err)
        })
    },
    computed: {
        lineChartData() {
            let chartData = {
                labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                datasets: [
                    {
                        label: 'Пользователи',
                        backgroundColor: '#29B6F6',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        label: 'ЕГЭ',
                        backgroundColor: '#FF7043',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        label: 'ОГЭ',
                        backgroundColor: '#FFA726',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        label: 'ВПР',
                        backgroundColor: '#FFEE58',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    }
                ],
            }

            let users = this.users
            users.forEach(u => {
                let reg = new Date(u.date_joined)
                if (reg.getFullYear() == this.year) {
                    chartData.datasets[0].data[reg.getMonth()] += 1
                }
            })
            let ege = this.ege
            ege.forEach(e => {
                let date = new Date(e.date)
                if (date.getFullYear() == this.year) {
                    chartData.datasets[1].data[date.getMonth()] += 1
                }
            })
            let oge = this.oge
            oge.forEach(o => {
                let date = new Date(o.date)
                if (date.getFullYear() == this.year) {
                    chartData.datasets[2].data[date.getMonth()] += 1
                }
            })
            let vpr = this.vpr
            vpr.forEach(v => {
                let date = new Date(v.date)
                if (date.getFullYear() == this.year) {
                    chartData.datasets[3].data[date.getMonth()] += 1
                }
            })

            return chartData
        }
    }
}
</script>
<style scoped>
    
</style>