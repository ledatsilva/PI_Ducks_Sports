<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>{{ dadosGrafico() }}
      <v-flex
        xl12
        lg12
        md12
        sm12
        xs12
      >
        <div class="content-title-graphic">
          <span class="title-graphic">Resultado</span>
        </div>

        <chartist
          :data="grafico.data"
          :options="grafico.options"
          :responsive-options="grafico.responsiveOptions"
          :plugins="grafico.plugins"
          style="height: 400px"
          type="Bar"
        />

        <div class="content-graphic-description">
          <div
            class="circulo"
            style="background: green;"></div>
          <p class="graphic-description">Vendas realizadas com sucesso</p>

          <div class="circulo"
            style="background: red;"></div>
          <p class="graphic-description">Vendas não realizadas</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
  .content-graphic-description { display: flex; align-items: center; justify-content: center; margin-top: 30px; }
  .circulo { width: 15px; height: 15px; border-radius: 50%; overflow: hidden; float: left; margin: 15px; transition: 0.3s ease; }
  .graphic-description { margin: 15px 15px 0 0; }
</style>

<script>
import { mapState, mapActions } from 'vuex'
// import Legend from 'chartist-plugin-legend'
import Tooltip from 'chartist-plugin-tooltip'

export default {
  data () {
    return {
      grafico: {
        data: {
          labels: '',
          series: [
            [], []
          ]
        },
        options: {
          plugins: [
            // Legend(),
            Tooltip()
          ],
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 10,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      }
    }
  },
  computed: {
    ...mapState({
      dados: state => state.movimentos.all.items
    })
  },
  created () {
    this.getAll()
  },
  methods: {
    ...mapActions('movimentos', {
      getAll: 'getAllGrafico'
    }),
    dadosGrafico () {
      try {
        this.grafico.data.labels = this.dados[0].labels
        this.grafico.data.series[0] = this.dados[0].series1
        this.grafico.data.series[1] = this.dados[0].series2
      } catch (e) {}
    }
  }
}
</script>
