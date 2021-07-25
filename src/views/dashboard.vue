<template>
    <v-container>
        <v-row>
        <v-col>
            <show-expenses :expenses="expenses" :categories="categories" />
        </v-col>
        <v-col>
            <doughnut-chart :chartData="chartData" ></doughnut-chart>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import showExpenses from '@/components/showExpenses.vue'
import doughnutChart from '@/components/chartDon.js'
import { mapActions } from 'vuex'

export default {
    name: "Dashboard",
    data() {
        return {
            colors: []
        }
    },
    computed: {
        expenses() {
            return this.$store.getters.expenses
        },
        categories() {
            return this.$store.getters.categories
        },
        chartData() {
            return {
                labels: this.categories.labels,
                datasets: [{
                    label: 'My personal costs',
                    data: this.getLabelsCost() || [],
                    backgroundColor: this.categories.colors,
                    hoverBackgroundColor: 'red',
                    hoverOffset: 4
                }],
            }
        },      
    },
    components: {
        showExpenses,
        doughnutChart,
    },
    methods: {
        ...mapActions([
            'storeData',
        ]),
        fetchData(url) {
            return fetch(url)
                    .then(result => result.json())
        },
        getLabelsCost() {
            const costs = []
            this.categories.labels.forEach((item) => {
                let itemsCat = this.expenses.filter(el => item === el.category)
                costs.push(itemsCat.reduce((sum, el) => sum += el.cost, 0))
            })
            return costs
        },
        getRandomColor(items) {
            const colors = []
            items.forEach( () => {
                colors.push(
                    `rgb(${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)})`)
            })      
            return colors
        },        
    },
    created() {
        const obj = {}
        this.fetchData('https://raw.githubusercontent.com/Aleksandr62/GB_804_758/les7/src/store/categories.json')
            .then(data => {
                obj.labels = data
                obj.colors = this.getRandomColor(data)
                this.storeData(obj)
            })
        this.fetchData('https://raw.githubusercontent.com/Aleksandr62/GB_804_758/les7/src/store/expenses.json')
            .then(data => {
                obj.expenses = data
                this.storeData(obj)
            })  
    },
}
</script>
<style scoped>

</style>