<template>
    <Line :data="data" :options="options" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

export default {
    name: 'LineChart',
    components: { Line },
    props: {
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
}
</script>