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
              title="Usuários"
            >
              <v-btn
                color="grey darken-2"
                to="/cadastrarUsuario"
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
                :items="usuarios"
                :search="search"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                sort-by="nome"
                class="elevation-1"
                @page-count="pageCount = $event"
              >
                <template v-slot:item.edit="{ item }">
                  <v-btn
                    color="grey darken-2"
                    @click="getUsuarioEditar(item)"
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
                    @click="openModalDelete(item.nome, item.id)"
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
                  >Não existem usuários cadastrados!</v-alert>
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
              max-width="350"
            >
              <v-card>
                <v-card-title class="headline">Deseja realmente excluir o usuário?</v-card-title>
                <v-card-text>
                  O Usuário {{ nomeUsuario }} será excluido permanentemente do sistema!
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"/>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="modalDelete = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="deletarUsuario(idUsuario)"
                  >
                    Confirmar
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
      nomeUsuario: '',
      idUsuario: '',
      modalDelete: false,
      headers: [
        { text: 'Nome', align: 'left', value: 'nome' },
        { text: 'Login', align: 'left', value: 'login' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false },
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      usuarios: state => state.usuarios.all.items
    })
  },
  created () {
    this.getAllUsuarios()
  },
  methods: {
    ...mapActions('usuarios', {
      getAllUsuarios: 'getAll',
      deleteUsuario: 'delete'
    }),
    ...mapActions('editUsuario', {
      getUsuarioEditar: 'getUsuarioEdit'
    }),
    openModalDelete (nome, id) {
      this.nomeUsuario = nome
      this.idUsuario = id
      this.modalDelete = true
    },
    deletarUsuario (id) {
      this.deleteUsuario(id)
      this.modalDelete = false
    }
  }
}
</script>
