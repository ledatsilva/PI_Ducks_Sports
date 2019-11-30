<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    floating
    persistent
    mobile-break-point="991"
    color="grey darken-2"
    width="260"
  >
    <v-layout
      class="fill-height"
      tag="v-list"
      column
    >
      <template>
        <div class="text-center">
          <img
            :src="logo"
            style="margin: 15px; height : 70px;"
          >
        </div>
      </template>
      <v-list
        nav
        dark
      >
        <v-list
          id="inspire"
          class="subtitle-1"
          style="text-align:center"
        >
          CONTROLE DE ATENDIMENTO
        </v-list>
        <v-list-item-group color="deep-orange accent-2">
          <div
            v-for="(item, i) in links"
            :key="i"
          >
            <v-list-item
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"/>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="subtitle-2"
                  v-text="item.text"
                />
              </v-list-item-content>
            </v-list-item>
            <div v-show="item.divider == true">
              <v-divider/>
            </div>
          </div>
        </v-list-item-group>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    perfil: '',
    logo: './img/logo.png',
    links: [
      {
        to: '/',
        icon: 'mdi-monitor',
        text: 'Home',
        divider: true
      },
      {
        to: '/vendedores',
        icon: 'mdi-account-group',
        text: 'Vendedores'
      },
      {
        to: '/movimentosTipoVenda',
        icon: 'mdi-shopping',
        text: 'Vendas'
      },
      {
        to: '/movimentosTipoAusencia',
        icon: 'mdi-exit-run mdi-flip-h',
        text: 'Saídas'
      },
      {
        to: '/graficoGeral',
        icon: 'mdi-chart-bar',
        text: 'Gráfico Geral'
      },
      {
        to: '/graficoEspecifico',
        icon: 'mdi-chart-bar',
        text: 'Gráfico Especifíco'
      },
      {
        to: '/fila',
        icon: 'mdi-comment-arrow-right-outline',
        text: 'Fila de atendimentos'
      },
      {
        to: '/usuarios',
        icon: 'mdi-account-key',
        text: 'Usuários'
      }
    ],
    responsive: false
  }),
  computed: {
    ...mapState({
      account: state => state.account
    }),
    ...mapState('app', ['color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  created () {
    this.getUsuarioStorage()
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    getUsuarioStorage () {
      let usuario = JSON.parse(localStorage.getItem('usuario'))
      this.usuario = usuario.value
    }
  }
}
</script>
