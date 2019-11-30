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
              title="Saídas"
            >
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
              />
              <v-data-table
                :headers="headers"
                :items="movimentos"
                :search="search"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                sort-desc
                hide-default-footer
                sort-by="horarioMovimento.horaFinalMovimento"
                class="elevation-1"
                @page-count="pageCount = $event"
              >
                <template v-slot:item.horarioMovimento.saida="{ item }">
                  {{ mostrarHora(item.horarioMovimento.horaInicioMovimento) + ' ' + moment(item.horarioMovimento.dataInicioMovimento).parseZone().format('DD/MM/YYYY') }}
                </template>
                <template v-slot:item.horarioMovimento.chegada="{ item }">
                  {{ mostrarHora(item.horarioMovimento.horaFinalMovimento) + ' ' + moment(item.horarioMovimento.dataFinalMovimento).parseZone().format('DD/MM/YYYY') }}
                </template>
                <template v-slot:item.view="{ item }">
                  <v-btn
                    color="grey darken-2"
                    tile
                    large
                    icon
                    @click="getMovimentoView(item)">
                    <v-icon>mdi-magnify-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:no-data>
                  <v-alert
                    :value="true"
                    color="error"
                    icon="mdi-alert"
                  >Não existem movimentos cadastrados!</v-alert>
                </template>
              </v-data-table>
              <v-pagination
                v-model="page"
                :length="pageCount"
                color="grey darken-2"
                circle
              />
            </material-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: 'Vendedor', align: 'left', value: 'vendedor.nomeVendedor' },
        { text: 'Saiu', align: 'left', value: 'horarioMovimento.saida' },
        { text: 'Chegou', align: 'left', value: 'horarioMovimento.chegada' },
        { text: 'Detalhar', align: 'center', value: 'view', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      movimentos: state => state.movimentos.all.items
      // mensagem: state => state.movimentos.status
    })
  },
  created () {
    this.getAll()
    moment.locale('pt')
  },
  methods: {
    moment,
    ...mapActions('movimentos', {
      getAll: 'getAllTipoAusencia'
    }),
    ...mapActions('editMovimento', {
      getMovimentoView: 'getMovimentoView'
    }),
    mostrarHora (hora) {
      let novaHora = hora.slice(11, hora.length - 4)
      return novaHora
    }
  }
}
</script>
