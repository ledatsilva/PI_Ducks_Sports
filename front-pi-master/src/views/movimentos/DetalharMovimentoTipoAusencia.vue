<template>
  <div
    id="app"
    class="fundo">
    <v-app id="pacific">
      <v-container
        fill-height
        fluid
        grid-list-xl
      >
        <v-layout wrap>
          <v-flex
            xl12
            lg12
            md12
            sm12
            xs12
          >
            <material-card
              color="grey darken-2"
              title="Vendas"
            >
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>VENDEDOR: {{ movimento.vendedor.nomeVendedor }}, CÓDIGO: {{ movimento.vendedor.codigoVendedor }}</td>
                    </tr>
                    <tr>
                      <td>DATA ATENDIMENTO: {{ moment(movimento.horarioMovimento.dataInicioMovimento).parseZone().format('DD/MM/YYYY') }}</td>
                    </tr>
                    <tr>
                      <td>INÍCIO ATENDIMENTO: {{ mostrarHora(movimento.horarioMovimento.horaInicioMovimento) }}, FIM ATENDIMENTO: {{ mostrarHora(movimento.horarioMovimento.horaFinalMovimento) }} </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </material-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      movimento: state => state.editMovimento.movimentoEdit
    })
  },
  created () {
    moment.locale('pt')
  },
  methods: {
    moment,
    mostrarHora (hora) {
      let novaHora = hora.slice(11, hora.length - 4)
      return novaHora
    }
  }
}
</script>
