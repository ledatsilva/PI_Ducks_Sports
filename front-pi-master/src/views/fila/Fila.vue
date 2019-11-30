<template>
  <div
    id="app"
    class="fundoFila">
    <v-app id="inspire">
      <v-btn
        icon
        color="orange"
        to="/login"
        absolute
        right
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-container
        fill-height
        fluid
        grid-list-xl
      >
        <v-flex xs3>
          <template>
            <v-container
              id="scroll-target"
              style="max-height: 400px; max-width: 200px"
              class="overflow-y-auto"
            >
              <v-row
                v-scroll:#scroll-target="onScroll"
                align="center"
                justify="center"
                style="height: 100%"
              >
                <div
                  v-for="(ausencia) in vendedoresAusencia"
                  :key="ausencia.idVendedorEmAusencia"
                >
                  <material-card
                    v-bind="$attrs"
                    class="v-card--material-stats"
                    style="background-color: #FFFFFF; width: 130px; top: 0 !important;"
                    v-on="$listeners"
                  >
                    <v-card
                      color="orange"
                      class="cardFila"
                    >
                      <div v-if="ausencia.imagemVendedor === ''">
                        <v-avatar
                          size="70"
                          class="cardAvatar"
                        >
                          <img
                            :src="iconImage"
                            width="auto"
                          >
                        </v-avatar>
                      </div>
                      <div v-else>
                        <v-avatar
                          size="70"
                          class="cardAvatar"
                        >
                          <img
                            :src="ausencia.imagemVendedor"
                            width="auto"
                          >
                        </v-avatar>
                      </div>
                    </v-card>
                    <p class="cardText">{{ ausencia.nomeVendedor }}</p>
                    <v-btn
                      small
                      color="orange"
                      style="margin: auto; display: block;"
                      @click="fimAusencia(ausencia)"
                    >
                      Voltar
                    </v-btn>
                  </material-card>
                  <br>
                </div>
              </v-row>
            </v-container>
          </template>
        </v-flex>
        <v-flex xs9>
          <v-layout wrap>
            <v-flex xs12>
              <v-sheet
                class="mx-auto"
                max-width="100%"
                color="grey darken-2"
              >
                <v-slide-group
                  multiple
                  show-arrows>
                  <v-slide-item
                    v-for="(espera, i) in vendedoresEspera"
                    :key="espera.idVendedor"
                  >
                    <v-flex
                      sm6
                      xs12
                      md6
                      lg3
                    >
                      <div v-if="i === 0">
                        <material-card
                          v-bind="$attrs"
                          class="v-card--material-stats"
                          style="background-color: #BBDEFB; width: 130px"
                          v-on="$listeners"
                        >
                          <v-card
                            color="primary"
                            class="cardFila"
                          >
                            <div v-if="espera.imagemVendedor === ''">
                              <v-avatar
                                size="70"
                                class="cardAvatar"
                              >
                                <img
                                  :src="iconImage"
                                  width="auto"
                                >
                              </v-avatar>
                            </div>
                            <div v-else>
                              <v-avatar
                                size="70"
                                class="cardAvatar"
                              >
                                <img
                                  :src="espera.imagemVendedor"
                                  width="auto"
                                >
                              </v-avatar>
                            </div>
                          </v-card>
                          <p class="cardText">{{ espera.nomeVendedor }}</p>
                          <v-btn
                            small
                            color="grey darken-2"
                            style="margin: auto; display: block;"
                            @click="openModalAcoes(espera, i)"
                          >
                            Ações
                          </v-btn>
                        </material-card>
                      </div>
                      <div v-else>
                        <material-card
                          v-bind="$attrs"
                          class="v-card--material-stats"
                          style="background-color: #FFFFFF; width: 130px"
                          v-on="$listeners"
                        >
                          <v-card
                            color="primary"
                            class="cardFila"
                          >
                            <div v-if="espera.imagemVendedor === ''">
                              <v-avatar
                                size="70"
                                class="cardAvatar"
                              >
                                <img
                                  :src="iconImage"
                                  width="auto"
                                >
                              </v-avatar>
                            </div>
                            <div v-else>
                              <v-avatar
                                size="70"
                                class="cardAvatar"
                              >
                                <img
                                  :src="espera.imagemVendedor"
                                  width="auto"
                                >
                              </v-avatar>
                            </div>
                          </v-card>
                          <p class="cardText">{{ espera.nomeVendedor }}</p>
                          <v-btn
                            small
                            color="grey darken-2"
                            style="margin: auto; display: block;"
                            @click="openModalAcoes(espera)"
                          >
                            Ações
                          </v-btn>
                        </material-card>
                      </div>
                    </v-flex>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-flex>
            <v-flex xs12>
              <v-sheet
                class="mx-auto"
                max-width="100%"
                color="grey darken-2"
              >
                <v-slide-group
                  multiple
                  show-arrows>
                  <v-slide-item
                    v-for="atendimento in vendedoresAtendimento"
                    :key="atendimento.idVendedor"
                  >
                    <v-flex
                      sm6
                      xs12
                      md6
                      lg3
                    >
                      <material-card
                        v-bind="$attrs"
                        class="v-card--material-stats"
                        style="width: 130px"
                        v-on="$listeners"
                      >
                        <v-card
                          color="success"
                          class="cardFila"
                        >
                          <div v-if="atendimento.imagemVendedor === ''">
                            <v-avatar
                              size="70"
                              class="cardAvatar"
                            >
                              <img
                                :src="iconImage"
                                width="auto"
                              >
                            </v-avatar>
                          </div>
                          <div v-else>
                            <v-avatar
                              size="70"
                              class="cardAvatar"
                            >
                              <img
                                :src="atendimento.imagemVendedor"
                                width="auto"
                              >
                            </v-avatar>
                          </div>
                        </v-card>
                        <p class="cardText">{{ atendimento.nomeVendedor }}</p>
                        <v-btn
                          small
                          color="success"
                          style="margin: auto; display: block;"
                          @click="openModalAtendimento(atendimento)"
                        >
                          Finalizar
                        </v-btn>
                      </material-card>
                    </v-flex>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-dialog
          v-model="modalAcoes"
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline">Escolher ação:</v-card-title>
            <v-card-actions>
              <div v-if="contador === 0">
                <v-btn
                  color="success"
                  @click="inicioAtendimento(vendedor)"
                >
                  Iniciar atendimento
                </v-btn>
                <v-btn
                  color="warning"
                  @click="inicioAusencia(vendedor)"
                >
                  Sair
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  color="success"
                  @click="inicioAtendimento(vendedor)"
                >
                  Priorizar atendimento
                </v-btn>
                <v-btn
                  color="warning"
                  @click="inicioAusencia(vendedor)"
                >
                  Sair
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="modalAtendimento"
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline">Venda realizada com sucesso?</v-card-title>
            <v-card-actions>
              <v-btn
                color="success"
                @click="fimAtentimendoVendaRealizada(vendedor)"
              >
                Sim
              </v-btn>
              <v-btn
                color="warning"
                @click="fimAtendimentoVendaNaoRealizada(vendedor)"
              >
                Não
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="modalVendaNaoRealizada"
          max-width="600"
          persistent
        >
          <v-card>
            <v-card-title class="headline">Registrar venda não sucedida</v-card-title>
            <v-card-actions>
              <v-form
                ref="formVendaNaoSucedida"
                v-model="valid"
                lazy-validation
              >
                <v-layout wrap>
                  <v-flex
                    xl12
                    lg12
                    md12
                    sm12
                    xs12
                  >
                    <v-select
                      v-model="vendaNaoSucedida.tipoProduto"
                      :items="tipos"
                      :rules="tipoProdutoRules"
                      item-text="descricaoTipo"
                      item-value="descricaoTipo"
                      outlined
                      label="Tipo de produto"
                    />
                  </v-flex>
                  <v-flex
                    xl12
                    lg12
                    md12
                    sm12
                    xs12
                  >
                    <v-select
                      v-model="vendaNaoSucedida.marcaProduto"
                      :items="marcas"
                      :rules="marcaProdutoRules"
                      item-text="descricaoMarca"
                      item-value="descricaoMarca"
                      outlined
                      label="Marca"
                    />
                  </v-flex>
                  <v-flex
                    xl6
                    lg6
                    md6
                    sm6
                    xs6
                  >
                    <v-select
                      v-model="vendaNaoSucedida.corProduto"
                      :items="cores"
                      :rules="corProdutoRules"
                      item-text="descricaoCor"
                      item-value="descricaoCor"
                      style="padding-right:4px;"
                      outlined
                      label="Cor"
                    />
                  </v-flex>
                  <v-flex
                    xl6
                    lg6
                    md6
                    sm6
                    xs6
                  >
                    <v-select
                      v-model="vendaNaoSucedida.tamanhoProduto"
                      :items="tamanhos"
                      :rules="tamanhoProdutoRules"
                      item-text="descricaoTamanho"
                      item-value="descricaoTamanho"
                      style="padding-right:4px;"
                      outlined
                      label="Tamanho"
                    />
                  </v-flex>
                  <v-flex
                    xl12
                    lg12
                    md12
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="vendaNaoSucedida.descricaoProduto"
                      label="Descrição produto"
                      outlined
                    />
                  </v-flex>
                  <v-flex
                    xl12
                    lg12
                    md12
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="vendaNaoSucedida.nomeCliente"
                      label="Nome cliente"
                      outlined
                    />
                  </v-flex>
                  <v-flex
                    xl12
                    lg12
                    md12
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="vendaNaoSucedida.telefoneCliente"
                      label="Número cliente"
                      outlined
                    />
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="registrarVendaNaoRealizada(vendedor)"
                    >
                      Registrar
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      idVendedor: '',
      nomeVendedor: '',
      codigoVendedor: '',
      imagemVendedor: '',
      iconImage: './img/icon.png',
      contador: '',
      vendedor: {
        nomeVendedor: '',
        codigoVendedor: '',
        filaVendedor: '',
        imagemVendedor: ''
      },
      movimento: {
        idVendedor: '',
        tipoMovimento: '',
        statusVenda: false,
        justificativaVenda: '',
        horarioMovimento: {
          horaInicioMovimento: Date,
          horaFinalMovimento: Date,
          dataInicioMovimento: Date,
          dataFinalMovimento: Date
        }
      },
      vendaNaoSucedida: {
        idVendedor: '',
        idMovimento: '',
        tipoProduto: '',
        marcaProduto: '',
        corProduto: '',
        tamanhoProduto: '',
        descricaoProduto: '',
        nomeCliente: '',
        telefoneCliente: ''
      },
      logo: './img/icon.jpg',
      modalAcoes: false,
      modalAtendimento: false,
      modalVendaNaoRealizada: false,
      valid: true,
      tipoProdutoRules: [ v => !!v || 'O campo tipo é obrigatório' ],
      marcaProdutoRules: [ v => !!v || 'O campo marca é obrigatório' ],
      corProdutoRules: [ v => !!v || 'O campo cor é obrigatório' ],
      tamanhoProdutoRules: [ v => !!v || 'O campo tamanho é obrigatório' ],
      inheritAttrs: false,
      offsetTop: 0
    }
  },
  computed: {
    ...mapState({
      vendedoresEspera: state => state.vendedores.espera.items,
      vendedoresAtendimento: state => state.vendedores.atendimento.items,
      vendedoresAusencia: state => state.vendedores.ausencia.items
    }),
    ...mapState({
      movimentos: state => state.movimentos.all.items
    }),
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
    this.logout()
    this.getEspera()
    this.getAtendimento()
    this.getAusencia()
    this.getAllTipos()
    this.getAllMarcas()
    this.getAllCores()
    this.getAllTamanhos()
  },
  methods: {
    ...mapActions('account', ['logout']),
    ...mapActions('vendedores', {
      getEspera: 'getEspera',
      getAtendimento: 'getAtendimento',
      getAusencia: 'getAusencia',
      updateAtendimento: 'updateEsperaAtendimento',
      updateAusencia: 'updateEsperaAusencia'
    }),
    ...mapActions('movimentos', {
      registerMovimento: 'register',
      end: 'end'
    }),
    ...mapActions('vendasNaoSucedidas', {
      registerVendaNaoSucedida: 'register'
    }),
    ...mapActions('tipos', {
      getAllTipos: 'getAll'
    }),
    ...mapActions('cores', {
      getAllCores: 'getAll'
    }),
    ...mapActions('marcas', {
      getAllMarcas: 'getAll'
    }),
    ...mapActions('tamanhos', {
      getAllTamanhos: 'getAll'
    }),
    openModalAcoes (espera, i) {
      this.vendedor = espera
      this.contador = i
      this.modalAcoes = true
    },
    openModalAtendimento (vendedor) {
      this.vendedor = vendedor
      this.modalAtendimento = true
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    inicioAtendimento (vendedor) {
      if (vendedor !== null) {
        this.vendedor = vendedor
        this.vendedor.filaVendedor = 'Atendimento'
        this.updateAtendimento(this.vendedor)
        this.modalAcoes = false
        this.movimento.idVendedor = vendedor.idVendedor

        const options = {
          timeZone: 'America/Sao_Paulo',
          hour: 'numeric',
          minute: 'numeric'
        }
        const zeroFill = n => {
          return ('0' + n).slice(-2)
        }
        const now = new Date()

        let hora = new Intl.DateTimeFormat([], options)
        let data = now.getFullYear() + '-' + zeroFill((now.getMonth() + 1)) + '-' + zeroFill(now.getUTCDate()) + 'T' + hora.format(new Date()) + ':00.00Z'

        this.movimento.horarioMovimento.horaInicioMovimento = data
        this.movimento.horarioMovimento.dataInicioMovimento = data
        this.movimento.statusVenda = false
        this.movimento.tipoMovimento = 'Venda'
        this.registerMovimento(this.movimento)
      }
    },
    fimAtentimendoVendaRealizada (vendedor) {
      if (vendedor !== null) {
        this.vendedor = vendedor
        this.vendedor.filaVendedor = 'Espera'
        this.updateAtendimento(this.vendedor)
        this.modalAtendimento = false
        this.movimento.idVendedor = vendedor.idVendedor

        const options = {
          timeZone: 'America/Sao_Paulo',
          hour: 'numeric',
          minute: 'numeric'
        }
        const zeroFill = n => {
          return ('0' + n).slice(-2)
        }
        const now = new Date()

        let hora = new Intl.DateTimeFormat([], options)
        let data = now.getFullYear() + '-' + zeroFill((now.getMonth() + 1)) + '-' + zeroFill(now.getUTCDate()) + 'T' + hora.format(new Date()) + ':00.00Z'

        this.movimento.horarioMovimento.horaFinalMovimento = data
        this.movimento.horarioMovimento.dataFinalMovimento = data
        this.movimento.statusVenda = true
        this.end(this.movimento)
      }
    },
    fimAtendimentoVendaNaoRealizada (vendedor) {
      if (vendedor !== null) {
        this.vendedor = vendedor
        this.modalAtendimento = false
        this.movimento.idVendedor = vendedor.idVendedor

        const options = {
          timeZone: 'America/Sao_Paulo',
          hour: 'numeric',
          minute: 'numeric'
        }
        const zeroFill = n => {
          return ('0' + n).slice(-2)
        }
        const now = new Date()

        let hora = new Intl.DateTimeFormat([], options)
        let data = now.getFullYear() + '-' + zeroFill((now.getMonth() + 1)) + '-' + zeroFill(now.getUTCDate()) + 'T' + hora.format(new Date()) + ':00.00Z'

        this.movimento.horarioMovimento.horaFinalMovimento = data
        this.movimento.horarioMovimento.dataFinalMovimento = data
        this.movimento.statusVenda = false

        this.vendaNaoSucedida.idVendedor = vendedor.idVendedor
        this.modalVendaNaoRealizada = true
      }
    },
    registrarVendaNaoRealizada () {
      if (this.$refs.formVendaNaoSucedida.validate()) {
        this.vendedor.filaVendedor = 'Espera'
        this.updateAtendimento(this.vendedor)
        this.end(this.movimento)
        this.registerVendaNaoSucedida(this.vendaNaoSucedida)
        this.modalVendaNaoRealizada = false
        this.$refs.formVendaNaoSucedida.reset()
      }
    },
    inicioAusencia (vendedor) {
      if (vendedor !== null) {
        this.vendedor = vendedor
        this.vendedor.filaVendedor = 'Ausencia'
        this.updateAusencia(this.vendedor)
        this.modalAcoes = false
        this.movimento.idVendedor = vendedor.idVendedor

        const options = {
          timeZone: 'America/Sao_Paulo',
          hour: 'numeric',
          minute: 'numeric'
        }
        const zeroFill = n => {
          return ('0' + n).slice(-2)
        }
        const now = new Date()

        let hora = new Intl.DateTimeFormat([], options)
        let data = now.getFullYear() + '-' + zeroFill((now.getMonth() + 1)) + '-' + zeroFill(now.getUTCDate()) + 'T' + hora.format(new Date()) + ':00.00Z'

        this.movimento.horarioMovimento.horaInicioMovimento = data
        this.movimento.horarioMovimento.dataInicioMovimento = data
        this.movimento.statusVenda = false
        this.movimento.tipoMovimento = 'Ausencia'

        this.registerMovimento(this.movimento)
      }
    },
    fimAusencia (vendedor) {
      if (vendedor !== null) {
        this.vendedor = vendedor
        this.vendedor.filaVendedor = 'Espera'
        this.updateAusencia(this.vendedor)
        this.movimento.idVendedor = vendedor.idVendedor

        const options = {
          timeZone: 'America/Sao_Paulo',
          hour: 'numeric',
          minute: 'numeric'
        }
        const zeroFill = n => {
          return ('0' + n).slice(-2)
        }
        const now = new Date()

        let hora = new Intl.DateTimeFormat([], options)
        let data = now.getFullYear() + '-' + zeroFill((now.getMonth() + 1)) + '-' + zeroFill(now.getUTCDate()) + 'T' + hora.format(new Date()) + ':00.00Z'

        this.movimento.horarioMovimento.horaFinalMovimento = data
        this.movimento.horarioMovimento.dataFinalMovimento = data
        this.movimento.statusVenda = false

        this.end(this.movimento)
      }
    }
  }
}
</script>
