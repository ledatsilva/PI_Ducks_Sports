<template>
  <v-app>
    <core-toolbar v-if="$route.path !== '/login' && $route.path !== '/404' && $route.path !== '/fila'"/>
    <core-drawer v-if="$route.path !== '/login' && $route.path !== '/404' && $route.path !== '/fila'"/>
    <core-view />
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  watch: {
    $route (to, from) {
      this.clearAlert()
    }
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
@import url('https://fonts.googleapis.com/css?family=Exo+2:700i&display=swap');

.v-toolbar {
  contain: layout;
  flex: 0;
  margin-bottom: 0px;
  max-width: 100%;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
}
.v-card .v-offset .v-card--material__header.v-card{
  color: white !important;
}
.v-navigation-drawer .v-list .v-divider {
  border-color: rgba(180, 180, 180, 0.3);
  margin: -1px auto 0px;
  width: calc(100% - 30px);
}
.v-list-item {
  margin: 5px 15px 5px !important;
}
.v-list__group__header {
  margin-left: 20px !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
.caixaLogin {
  margin-top: 100px;
  font-size: 16px;
}
.v-card--material-stats .v-card {
  border-radius: 50%;
  width: 70px;
  flex: 0 1 auto;
}
.fundo {
  background-color: #FBE9E7;
  background-size: cover;
}
.fundoMenu {
  background-color: #FFFFFF;
  background-size: cover;
}
.fundoLogin {
  background-color: #F16422;
  background-size: cover;
}
.fundoFila {
  background-color: #616161;
  background-size: cover;
}
#inspire {
  font-family: 'Exo 2', sans-serif;
  background: none;
}
#pacific {
  background: none;
}
.row {
  display: block;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-right: -12px;
  margin-left: -12px;
}
.cardFila{
  margin: auto;
  display: block;
  width: 80px !important;
  height: 80px !important;
  margin-top:-40px;
}
.cardAvatar{
  margin: auto;
  display: block;
  padding-top: 5px;
}
.cardAvatarVendedor{
  margin: auto;
  display: block;
}
.cardText{
  text-align: center;
  margin: 0px;
  padding-top: 10px;
}
.ct-tooltip {
  position: absolute;
  display: inline-block;
  min-width: 5em;
  padding: 8px 10px;
  background: #383838;
  color: #fff;
  text-align: center;
  pointer-events: none;
  z-index: 100;
  transition: opacity .2s linear;
}
.ct-tooltip:before {
  position: absolute;
  bottom: -14px;
  left: 50%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  pointer-events: none;
  border-color: rgba(251, 249, 228, 0);
  border-top-color: #383838;
  border-width: 7px;
  margin-left: -8px;
}
.ct-tooltip.hide {
  display: block;
  opacity: 0;
  visibility: hidden;
}
.ct-area, .ct-line {
  pointer-events: none;
}
.ct-square {
  margin-top: 30px;
  display: block;
  position: relative;
  width: 95% !important;
}
.ct-chart {
  position: relative;
}
.ct-legend {
  position: relative;
  z-index: 10;
  list-style: none;
  text-align: left;
}
.ct-legend li {
  position: relative;
  padding-left: 23px;
  margin-right: 10px;
  margin-bottom: 3px;
  cursor: pointer;
  display: inline-block;
}
.ct-legend li:before {
  margin-top: 5px;
  width: 12px;
  height: 12px;
  position: absolute;
  left: 0;
  content: '';
  border: 3px solid transparent;
  border-radius: 2px;
}
.ct-legend li.inactive:before {
  background: transparent;
}
.ct-legend.ct-legend-inside {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 23px;
}
.ct-legend.ct-legend-inside li{
  display: block;
  margin: 0;
}
.ct-legend .ct-series-0:before {
  background-color: green;
  border-color: green;
}
.ct-legend .ct-series-1:before {
  background-color: red;
  border-color: red;
}

.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut {
stroke: green !important
}
.ct-series-b .ct-bar, .ct-series-b .ct-line, .ct-series-b .ct-point, .ct-series-b .ct-slice-donut {
stroke: red !important
}

</style>
