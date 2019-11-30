<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    class="wrapper-content"
  >
    <v-row align="center" class="container-select-menu">
      <v-flex
          xl12
          lg12
          md12
          sm12
          xs12
        >
         <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            style="display: flex; padding: 10px 10px 0;"
          >
            <span 
              style="margin: 18px 20px 0 0;">Selecione um vendedor:</span>

            <v-select
              v-model="selected"
              :items="vendedores"
              item-text="nomeVendedor"
              item-value="idVendedor"
              outlined
              :rules="[v => !!v || 'O campo vendedor é obrigatório!']"
              required
              label="Vendedor"
            />

            <v-btn
              color="warning"
              :disabled="!valid"
              @click="buscarMovimentosVendedor()"
              style="margin-left: 30px;"
            >
              Buscar
          </v-btn>
         </v-form>

      </v-flex>
    </v-row>

    <v-layout wrap class="container-graphic">{{ dadosGrafico() }}
      <v-flex
        xl12
        lg12
        md12
        sm12
        xs12
      >
        <div class="content-title-graphic">
          <span 
            class="title-graphic">Resultado</span>
        </div>

        <chartist
          :data="grafico.data"
          :options="grafico.options"
          :responsive-options="grafico.responsiveOptions"
          :plugins="grafico.plugins"
          style="height: 400px"
          type="Bar"
        />
      </v-flex>
    </v-layout>

    <div class="content-graphic-description">
      <div class="circulo" style="background: green;"></div>
      <p class="graphic-description">Vendas realizadas com sucesso</p>

      <div class="circulo" style="background: red;"></div>
      <p class="graphic-description">Vendas não realizadas</p>
    </div>
  </v-container>
</template>

<style lang="scss">
  .wrapper-content { display: flex; flex-direction: column; }
  .container-select-menu { display:block; width: 100%; }
  .container-graphic { display: block; width: 100%; max-height: 517px; }
  #core-view > div > div.row.container-select-menu.align-center > div > form { width: 100%; height: 57px; }
  .content-title-graphic { display: flex; border-bottom: 1px solid #808080; align-items: center; justify-content: center;
    .title-graphic { margin: 18px 20px 0 0; font-size: 18px; font-weight: bold; }
  }
  .content-graphic-description { display: flex; align-items: center; justify-content: center; margin: 0; }
  .circulo { width: 15px; height: 15px; border-radius: 50%; overflow: hidden; float: left; margin: 15px; transition: 0.3s ease; }
  .graphic-description { margin-right: 15px; }
</style>

<script>
import { mapState, mapActions } from 'vuex'
// import Legend from 'chartist-plugin-legend'
import Tooltip from 'chartist-plugin-tooltip'

export default {
  data () {
    return {
      items: [],
      selected: '',
      valid: true,
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
    }),
    ...mapState({
    vendedores: state => state.vendedores.all.items
    })
  },
  created () {
   this.getAll()
  },
  methods: {
    ...mapActions('movimentos', {
      getPorId: 'getGraficoPorID'
    }),

     ...mapActions('vendedores', {
      getAll: 'getAll'
    }),
    buscarMovimentosVendedor () {
      if (this.$refs.form.validate()) {
        console.log('teste', this.selected)
        this.getPorId(this.selected)
      }
    },
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
