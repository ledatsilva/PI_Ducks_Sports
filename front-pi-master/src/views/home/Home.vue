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
            <v-layout>
              <v-flex
                xl6
                lg6
                md6
                sm12
                xs12
              >
                <material-card
                  color="grey darken-2"
                  title="Tipo"
                >
                  <v-form
                    ref="formTipo"
                    v-model="validTipo"
                    lazy-validation
                  >
                    <v-layout>
                      <v-flex
                        xl10
                        lg10
                        md10
                        sm12
                        xs12
                      >
                        <v-text-field
                          v-model="tipo.descricaoTipo"
                          :rules="[v => !!v || 'O campo tipo é obrigatório!']"
                          label="CADASTRAR TIPO"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xl2
                        lg2
                        md2
                        sm12
                        xs12
                      >
                        <v-btn
                          :disabled="!validTipo"
                          color="success"
                          tile
                          x-large
                          icon
                          @click="cadastrarTipo">
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                  <v-text-field
                    v-model="searchTipo"
                    append-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    hide-details
                  />
                  <v-data-table
                    :headers="headersTipo"
                    :items="tipos"
                    :search="searchTipo"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    sort-by="descricaoTipo"
                    class="elevation-1"
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.edit="{ item }">
                      <v-btn
                        color="cyan accent-4"
                        tile
                        x-large
                        icon
                        @click="openModalEditTipo(item.descricaoTipo, item.idTipo)">
                        <v-icon>mdi-pencil-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-btn
                        color="red accent-2"
                        x-large
                        tile
                        icon
                        @click="openModalDeleteTipo(item.descricaoTipo, item.idTipo)">
                        <v-icon>mdi-delete-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não existem tipos cadastrados!</v-alert>
                    </template>
                    <template v-slot:no-results>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não foi encontradro nunhum resultado!</v-alert>
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
                  v-model="modalEditTipo"
                  persistent
                  max-width="500"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Editar tipo</span>
                    </v-card-title>
                    <v-container grid-list-md>
                      <v-form
                        ref="formTipo"
                        v-model="validTipo"
                        lazy-validation
                      >
                        <v-text-field
                          :rules="[v => !!v || 'O campo tipo é obrigatório!']"
                          v-model="tipoEdit.descricaoTipo"
                          label="Descrição"
                          required
                        />
                      </v-form>
                    </v-container>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="editarTipo()"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalEditTipo = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="modalDeleteTipo"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title class="headline">Deseja realmente excluir esse tipo?</v-card-title>
                    <v-card-text>
                      O tipo {{ descricaoTipo }} será excluido permanentemente do sistema!
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="deletarTipo(idTipo)"
                      >
                        Excluir
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalDeleteTipo = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-snackbar
                  v-model="snackbarTipoSuccess"
                  :timeout="timeout"
                  top
                >
                  Tipo cadastrado com sucesso!
                  <v-btn
                    color="success"
                    text
                    @click="snackbarTipoSuccess = false"
                  >
                    FECHAR
                  </v-btn>
                </v-snackbar>
                <v-snackbar
                  v-model="snackbarTipoError"
                  :timeout="timeout"
                  top>
                  Já existe um tipo cadastrado com essa descrição!
                  <v-btn
                    color="error"
                    text
                    @click="snackbarTipoError = false">
                    FECHAR
                  </v-btn>
                </v-snackbar>
              </v-flex>
              <v-flex
                xl6
                lg6
                md6
                sm12
                xs12
              >
                <material-card
                  color="grey darken-2"
                  title="Marcas"
                >
                  <v-form
                    ref="formMarca"
                    v-model="validMarca"
                    lazy-validation
                  >
                    <v-layout>
                      <v-flex
                        xl10
                        lg10
                        md10
                        sm12
                        xs12
                      >
                        <v-text-field
                          v-model="marca.descricaoMarca"
                          :rules="[v => !!v || 'O campo marca é obrigatório!']"
                          label="CADASTRAR MARCA"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xl2
                        lg2
                        md2
                        sm12
                        xs12
                      >
                        <v-btn
                          :disabled="!validMarca"
                          color="success"
                          tile
                          x-large
                          icon
                          @click="cadastrarMarca">
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                  <v-text-field
                    v-model="searchMarca"
                    append-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    hide-details
                  />
                  <v-data-table
                    :headers="headersMarca"
                    :items="marcas"
                    :search="searchMarca"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    sort-by="descricaoMarca"
                    class="elevation-1"
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.edit="{ item }">
                      <v-btn
                        color="cyan accent-4"
                        tile
                        x-large
                        icon
                        @click="openModalEditMarca(item.descricaoMarca, item.idMarca)">
                        <v-icon>mdi-pencil-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-btn
                        color="red accent-2"
                        x-large
                        tile
                        icon
                        @click="openModalDeleteMarca(item.descricaoMarca, item.idMarca)">
                        <v-icon>mdi-delete-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não existem marcas cadastradas!</v-alert>
                    </template>
                    <template v-slot:no-results>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não foi encontradro nunhum resultado!</v-alert>
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
                  v-model="modalEditMarca"
                  persistent
                  max-width="500"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Editar marca</span>
                    </v-card-title>
                    <v-container grid-list-md>
                      <v-form
                        ref="formMarca"
                        v-model="validMarca"
                        lazy-validation
                      >
                        <v-text-field
                          :rules="[v => !!v || 'O campo cor é obrigatório!']"
                          v-model="marcaEdit.descricaoMarca"
                          label="Descrição"
                          required
                        />
                      </v-form>
                    </v-container>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="editarMarca()"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalEditMarca = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="modalDeleteMarca"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title class="headline">Deseja realmente excluir essa marca?</v-card-title>
                    <v-card-text>
                      A marca {{ descricaoMarca }} será excluido permanentemente do sistema!
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="deletarMarca(idMarca)"
                      >
                        Excluir
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalDeleteMarca = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-snackbar
                  v-model="snackbarMarcaSuccess"
                  :timeout="timeout"
                  top
                >
                  Marca cadastrada com sucesso!
                  <v-btn
                    color="success"
                    text
                    @click="snackbarMarcaSuccess = false"
                  >
                    FECHAR
                  </v-btn>
                </v-snackbar>
                <v-snackbar
                  v-model="snackbarMarcaError"
                  :timeout="timeout"
                  top>
                  Já existe uma marca cadastrada com essa descrição!
                  <v-btn
                    color="error"
                    text
                    @click="snackbarMarcaError = false">
                    FECHAR
                  </v-btn>
                </v-snackbar>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex
            xl12
            lg12
            md12
            sm12
            xs12
          >
            <v-layout>
              <v-flex
                xl6
                lg6
                md6
                sm12
                xs12
              >
                <material-card
                  color="grey darken-2"
                  title="Cores"
                >
                  <v-form
                    ref="formCor"
                    v-model="validCor"
                    lazy-validation
                  >
                    <v-layout>
                      <v-flex
                        xl10
                        lg10
                        md10
                        sm12
                        xs12
                      >
                        <v-text-field
                          v-model="cor.descricaoCor"
                          :rules="[v => !!v || 'O campo cor é obrigatório!']"
                          label="CADASTRAR COR"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xl2
                        lg2
                        md2
                        sm12
                        xs12
                      >
                        <v-btn
                          :disabled="!validCor"
                          color="success"
                          tile
                          x-large
                          icon
                          @click="cadastrarCor">
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                  <v-text-field
                    v-model="searchCor"
                    append-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    hide-details
                  />
                  <v-data-table
                    :headers="headersCor"
                    :items="cores"
                    :search="searchCor"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    sort-by="descricaoCor"
                    class="elevation-1"
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.edit="{ item }">
                      <v-btn
                        color="cyan accent-4"
                        tile
                        x-large
                        icon
                        @click="openModalEditCor(item.descricaoCor, item.idCor)">
                        <v-icon>mdi-pencil-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-btn
                        color="red accent-2"
                        x-large
                        tile
                        icon
                        @click="openModalDeleteCor(item.descricaoCor, item.idCor)">
                        <v-icon>mdi-delete-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não existem cores cadastradas!</v-alert>
                    </template>
                    <template v-slot:no-results>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não foi encontradro nunhum resultado!</v-alert>
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
                  v-model="modalEditCor"
                  persistent
                  max-width="500"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Editar cor</span>
                    </v-card-title>
                    <v-container grid-list-md>
                      <v-form
                        ref="formCor"
                        v-model="validCor"
                        lazy-validation
                      >
                        <v-text-field
                          :rules="[v => !!v || 'O campo cor é obrigatório!']"
                          v-model="corEdit.descricaoCor"
                          label="Descrição"
                          required
                        />
                      </v-form>
                    </v-container>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="editarCor()"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalEditCor = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="modalDeleteCor"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title class="headline">Deseja realmente excluir a cor?</v-card-title>
                    <v-card-text>
                      A cor {{ descricaoCor }} será excluida permanentemente do sistema!
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="deletarCor(idCor)"
                      >
                        Excluir
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalDeleteCor = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-snackbar
                  v-model="snackbarCorSuccess"
                  :timeout="timeout"
                  top
                >
                  Cor cadastrada com sucesso!
                  <v-btn
                    color="success"
                    text
                    @click="snackbarCorSuccess = false"
                  >
                    FECHAR
                  </v-btn>
                </v-snackbar>
                <v-snackbar
                  v-model="snackbarCorError"
                  :timeout="timeout"
                  top>
                  Já existe uma cor cadastrada com essa descrição!
                  <v-btn
                    color="error"
                    text
                    @click="snackbarCorError = false">
                    FECHAR
                  </v-btn>
                </v-snackbar>
              </v-flex>
              <v-flex
                xl6
                lg6
                md6
                sm12
                xs12
              >
                <material-card
                  color="grey darken-2"
                  title="Tamanhos"
                >
                  <v-form
                    ref="formTamanho"
                    v-model="validTamanho"
                    lazy-validation
                  >
                    <v-layout>
                      <v-flex
                        xl10
                        lg10
                        md10
                        sm12
                        xs12
                      >
                        <v-text-field
                          v-model="tamanho.descricaoTamanho"
                          :rules="[v => !!v || 'O campo tamanho é obrigatório!']"
                          label="CADASTRAR TAMANHO"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xl2
                        lg2
                        md2
                        sm12
                        xs12
                      >
                        <v-btn
                          :disabled="!validTamanho"
                          color="success"
                          tile
                          x-large
                          icon
                          @click="cadastrarTamanho">
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                  <v-text-field
                    v-model="searchTamanho"
                    append-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    hide-details
                  />
                  <v-data-table
                    :headers="headersTamanho"
                    :items="tamanhos"
                    :search="searchTamanho"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    sort-by="descricaoTamanho"
                    class="elevation-1"
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.edit="{ item }">
                      <v-btn
                        color="cyan accent-4"
                        tile
                        x-large
                        icon
                        @click="openModalEditTamanho(item.descricaoTamanho, item.idTamanho)">
                        <v-icon>mdi-pencil-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-btn
                        color="red accent-2"
                        x-large
                        tile
                        icon
                        @click="openModalDeleteTamanho(item.descricaoTamanho, item.idTamanho)">
                        <v-icon>mdi-delete-circle</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não existem tamanhos cadastrados!</v-alert>
                    </template>
                    <template v-slot:no-results>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="mdi-alert"
                      >Não foi encontradro nunhum resultado!</v-alert>
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
                  v-model="modalEditTamanho"
                  persistent
                  max-width="500"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Editar tamanho</span>
                    </v-card-title>
                    <v-container grid-list-md>
                      <v-form
                        ref="formTamanho"
                        v-model="validTamanho"
                        lazy-validation
                      >
                        <v-text-field
                          :rules="[v => !!v || 'O campo tamanho é obrigatório!']"
                          v-model="tamanhoEdit.descricaoTamanho"
                          label="Descrição"
                          required
                        />
                      </v-form>
                    </v-container>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="editarTamanho()"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalEditTamanho = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="modalDeleteTamanho"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title class="headline">Deseja realmente excluir esse tamanho?</v-card-title>
                    <v-card-text>
                      O tamanho {{ descricaoTamanho }} será excluido permanentemente do sistema!
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"/>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="deletarTamanho(idTamanho)"
                      >
                        Excluir
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modalDeleteTamanho = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-snackbar
                  v-model="snackbarTamanhoSuccess"
                  :timeout="timeout"
                  top
                >
                  Tamanho cadastrado com sucesso!
                  <v-btn
                    color="success"
                    text
                    @click="snackbarTamanhoSuccess = false"
                  >
                    FECHAR
                  </v-btn>
                </v-snackbar>
                <v-snackbar
                  v-model="snackbarTamanhoError"
                  :timeout="timeout"
                  top>
                  Já existe um tamanho cadastrado com essa descrição!
                  <v-btn
                    color="error"
                    text
                    @click="snackbarCorError = false">
                    FECHAR
                  </v-btn>
                </v-snackbar>
              </v-flex>
            </v-layout>
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
      show: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 4,
      timeout: 4000,
      searchTipo: '',
      searchMarca: '',
      searchCor: '',
      searchTamanho: '',
      validTipo: true,
      validMarca: true,
      validCor: true,
      validTamanho: true,
      snackbarTipoSuccess: false,
      snackbarTipoError: false,
      snackbarMarcaSuccess: false,
      snackbarMarcaError: false,
      snackbarCorSuccess: false,
      snackbarCorError: false,
      snackbarTamanhoSuccess: false,
      snackbarTamanhoError: false,
      idTipo: '',
      descricaoTipo: '',
      idMarca: '',
      descricaoMarca: '',
      idCor: '',
      descricaoCor: '',
      idTamanho: '',
      descricaoTamanho: '',
      tipo: {
        descricaoTipo: ''
      },
      tipoEdit: {
        idTipo: '',
        descricaoTipo: ''
      },
      marca: {
        descricaoMarca: ''
      },
      marcaEdit: {
        idMarca: '',
        descricaoMarca: ''
      },
      cor: {
        descricaoCor: ''
      },
      corEdit: {
        idCor: '',
        descricaoCor: ''
      },
      tamanho: {
        descricaoTamanho: ''
      },
      tamanhoEdit: {
        idTamanho: '',
        descricaoTamanho: ''
      },
      modalEditTipo: false,
      modalDeleteTipo: false,
      modalEditMarca: false,
      modalDeleteMarca: false,
      modalEditCor: false,
      modalDeleteCor: false,
      modalEditTamanho: false,
      modalDeleteTamanho: false,
      headersTipo: [
        { text: 'Descrição', align: 'left', value: 'descricaoTipo' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false },
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ],
      headersMarca: [
        { text: 'Descrição', align: 'left', value: 'descricaoMarca' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false },
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ],
      headersCor: [
        { text: 'Descrição', align: 'left', value: 'descricaoCor' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false },
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ],
      headersTamanho: [
        { text: 'Descrição', align: 'left', value: 'descricaoTamanho' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false },
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      tipos: state => state.tipos.all.items
    }),
    ...mapState({
      marcas: state => state.marcas.all.items
    }),
    ...mapState({
      cores: state => state.cores.all.items
    }),
    ...mapState({
      tamanhos: state => state.tamanhos.all.items
    })
  },
  created () {
    this.getAllTipos()
    this.getAllMarcas()
    this.getAllCores()
    this.getAllTamanhos()
  },
  methods: {
    ...mapActions('tipos', {
      getAllTipos: 'getAll',
      registerTipo: 'register',
      updateTipo: 'update',
      deleteTipo: 'delete'
    }),
    ...mapActions('cores', {
      getAllCores: 'getAll',
      registerCor: 'register',
      updateCor: 'update',
      deleteCor: 'delete'
    }),
    ...mapActions('marcas', {
      getAllMarcas: 'getAll',
      registerMarca: 'register',
      updateMarca: 'update',
      deleteMarca: 'delete'
    }),
    ...mapActions('tamanhos', {
      getAllTamanhos: 'getAll',
      registerTamanho: 'register',
      updateTamanho: 'update',
      deleteTamanho: 'delete'
    }),
    cadastrarTipo () {
      if (this.$refs.formTipo.validate()) {
        const resultadoTipo = this.validaTipoExistente()
        if (resultadoTipo === true) {
          this.registerTipo(this.tipo)
          this.$refs.formTipo.reset()
          this.snackbarTipoSuccess = true
        }
        if (resultadoTipo === false) {
          this.snackbarTipoError = true
        }
      }
    },
    validaTipoExistente () {
      let tiposExistentes = this.tipos
      for (let i = 0; i < tiposExistentes.length; i++) {
        if (this.tipo.descricaoTipo.trim().toUpperCase() === tiposExistentes[i].descricaoTipo) {
          return false
        }
      }
      return true
    },
    openModalEditTipo (descricao, id) {
      this.tipoEdit.descricaoTipo = descricao
      this.tipoEdit.idTipo = id
      this.modalEditTipo = true
    },
    editarTipo () {
      this.updateTipo(this.tipoEdit)
      this.modalEditTipo = false
      this.$refs.formTipo.reset()
    },
    openModalDeleteTipo (descricao, id) {
      this.descricaoTipo = descricao
      this.idTipo = id
      this.modalDeleteTipo = true
    },
    deletarTipo (id) {
      this.deleteTipo(id)
      this.modalDeleteTipo = false
    },
    cadastrarMarca () {
      if (this.$refs.formMarca.validate()) {
        const resultadoMarca = this.validaMarcaExistente()
        if (resultadoMarca === true) {
          this.registerMarca(this.marca)
          this.$refs.formMarca.reset()
          this.snackbarMarcaSuccess = true
        }
        if (resultadoMarca === false) {
          this.snackbarMarcaError = true
        }
      }
    },
    validaMarcaExistente () {
      let marcasExistentes = this.marcas
      for (let i = 0; i < marcasExistentes.length; i++) {
        if (this.marca.descricaoMarca.trim().toUpperCase() === marcasExistentes[i].descricaoMarca) {
          return false
        }
      }
      return true
    },
    openModalEditMarca (descricao, id) {
      this.marcaEdit.descricaoMarca = descricao
      this.marcaEdit.idMarca = id
      this.modalEditMarca = true
    },
    editarMarca () {
      this.updateMarca(this.marcaEdit)
      this.modalEditMarca = false
      this.$refs.formMarca.reset()
    },
    openModalDeleteMarca (descricao, id) {
      this.descricaoMarca = descricao
      this.idMarca = id
      this.modalDeleteMarca = true
    },
    deletarMarca (id) {
      this.deleteMarca(id)
      this.modalDeleteMarca = false
    },
    cadastrarCor () {
      if (this.$refs.formCor.validate()) {
        const resultadoCor = this.validaCorExistente()
        if (resultadoCor === true) {
          this.registerCor(this.cor)
          this.$refs.formCor.reset()
          this.snackbarCorSuccess = true
        }
        if (resultadoCor === false) {
          this.snackbarCorError = true
        }
      }
    },
    validaCorExistente () {
      let coresExistentes = this.cores
      for (let i = 0; i < coresExistentes.length; i++) {
        if (this.cor.descricaoCor.trim().toUpperCase() === coresExistentes[i].descricaoCor) {
          return false
        }
      }
      return true
    },
    openModalEditCor (descricao, id) {
      this.corEdit.descricaoCor = descricao
      this.corEdit.idCor = id
      this.modalEditCor = true
    },
    editarCor () {
      this.updateCor(this.corEdit)
      this.modalEditCor = false
      this.$refs.formCor.reset()
    },
    openModalDeleteCor (descricao, id) {
      this.descricaoCor = descricao
      this.idCor = id
      this.modalDeleteCor = true
    },
    deletarCor (id) {
      this.deleteCor(id)
      this.modalDeleteCor = false
    },
    cadastrarTamanho () {
      if (this.$refs.formTamanho.validate()) {
        const resultadoTamanho = this.validaTamanhoExistente()
        if (resultadoTamanho === true) {
          this.registerTamanho(this.tamanho)
          this.$refs.formTamanho.reset()
          this.snackbarTamanhoSuccess = true
        }
        if (resultadoTamanho === false) {
          this.snackbarTamanhoError = true
        }
      }
    },
    validaTamanhoExistente () {
      let tamanhosExistentes = this.tamanhos
      for (let i = 0; i < tamanhosExistentes.length; i++) {
        if (this.tamanho.descricaoTamanho.trim().toUpperCase() === tamanhosExistentes[i].descricaoTamanho) {
          return false
        }
      }
      return true
    },
    openModalEditTamanho (descricao, id) {
      this.tamanhoEdit.descricaoTamanho = descricao
      this.tamanhoEdit.idTamanho = id
      this.modalEditTamanho = true
    },
    editarTamanho () {
      this.updateTamanho(this.tamanhoEdit)
      this.modalEditTamanho = false
      this.$refs.formTamanho.reset()
    },
    openModalDeleteTamanho (descricao, id) {
      this.descricaoTamanho = descricao
      this.idTamanho = id
      this.modalDeleteTamanho = true
    },
    deletarTamanho (id) {
      this.deleteTamanho(id)
      this.modalDeleteTamanho = false
    }
  }
}
</script>
