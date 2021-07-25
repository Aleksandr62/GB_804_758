import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    }   
  },
  data: () => ({
        options: {
            tooltips: {
              titleMarginBottom: 0
            },        
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Costs by categories',
              padding: 0
            },           
        },                        
  }),  
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
