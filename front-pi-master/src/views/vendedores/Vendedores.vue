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
              title="Vendedores"
            >
              <v-btn
                color="grey darken-2"
                to="/cadastrarVendedor"
              >
                <v-icon
                  left
                  color="light-green accent-4"
                >mdi-plus-circle</v-icon>
                Cadastrar
              </v-btn>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
              />
              <v-data-table
                :headers="headers"
                :items="vendedores"
                :search="search"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                sort-by="nomeVendedor"
                class="elevation-1"
                @page-count="pageCount = $event"
              >
                <template v-slot:item.filaVendedor="{ item }">
                  <div v-if="item.filaVendedor === 'Espera'">
                    Em espera
                  </div>
                  <div v-if="item.filaVendedor === 'Atendimento'">
                    Em atendimento
                  </div>
                  <div v-if="item.filaVendedor === 'Ausencia'">
                    Ausente
                  </div>
                </template>
                <template v-slot:item.imagemVendedor="{ item }">
                  <div v-if="item.imagemVendedor === ''">
                    <v-avatar
                      size="50"
                      class="cardAvatarVendedor"
                    >
                      <img
                        :src="iconImage"
                        width="auto"
                      >
                    </v-avatar>
                  </div>
                  <div v-else>
                    <v-avatar
                      size="50"
                      class="cardAvatarVendedor"
                    >
                      <img
                        :src="item.imagemVendedor"
                        width="auto"
                      >
                    </v-avatar>
                  </div>
                </template>
                <template v-slot:item.edit="{ item }">
                  <v-btn
                    color="grey darken-2"
                    @click="getVendedorEdit(item)"
                  >
                    <v-icon
                      left
                      color="cyan accent-4"
                    >mdi-pencil-circle</v-icon>
                    Editar
                  </v-btn>
                </template>
                <template v-slot:item.delete="{ item }">
                  <v-btn
                    color="grey darken-2"
                    @click="openModalDelete(item.nomeVendedor, item.idVendedor)"
                  >
                    <v-icon
                      left
                      color="red accent-2"
                    >mdi-delete-circle</v-icon>
                    Excluir
                  </v-btn>
                </template>
                <template v-slot:no-data>
                  <v-alert
                    :value="true"
                    color="error"
                    icon="mdi-alert"
                  >Não existem vendedores cadastrados!</v-alert>
                </template>
              </v-data-table>
              <v-pagination
                v-model="page"
                :length="pageCount"
                color="grey darken-2"
                circle
              />
            </material-card>
            <v-dialog
              v-model="modalDelete"
              max-width="500"
            >
              <v-card>
                <v-card-title class="headline">Deseja realmente excluir o vendedor?</v-card-title>
                <v-card-text>
                  O vendedor {{ nomeVendedor }} será excluido permanentemente do sistema!
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"/>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="deletarVendedor(idVendedor)"
                  >
                    Confirmar
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="modalDelete = false"
                  >
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      nomeVendedor: '',
      codigoVendedor: '',
      filaVendedor: '',
      imagemVendedor: '',
      iconImage: './img/icon.png',
      modalDelete: false,
      headers: [
        { text: 'Nome', align: 'left', value: 'nomeVendedor' },
        { text: 'Código', align: 'left', value: 'codigoVendedor' },
        { text: 'Status', align: 'left', value: 'filaVendedor' },
        { text: 'Imagem', align: 'center', value: 'imagemVendedor', sortable: false },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false },
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      vendedores: state => state.vendedores.all.items,
      mensagem: state => state.vendedores.status
    })
  },
  created () {
    this.getAll()
  },
  methods: {
    ...mapActions('vendedores', {
      getAll: 'getAll',
      delete: 'delete',
      register: 'register',
      update: 'update'
    }),
    ...mapActions('editVendedor', {
      getVendedorEdit: 'getVendedorEdit'
    }),
    openModalDelete (nome, id) {
      console.log('Vendedor => ' + nome)
      this.nomeVendedor = nome
      this.idVendedor = id
      this.modalDelete = true
    },
    deletarVendedor (id) {
      this.delete(id)
      this.modalDelete = false
    }
  }
}
</script>
