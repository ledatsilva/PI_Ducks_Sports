import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import LoginPage from '../views/login/LoginPage'
import NotFound from '../views/home/404'
import Vendedores from '../views/vendedores/Vendedores'
import CadastrarVendedor from '../views/vendedores/CadastrarVendedor'
import EditarVendedor from '../views/vendedores/EditarVendedor'
import MovimentosTipoVenda from '../views/movimentos/MovimentosTipoVenda'
import MovimentosTipoAusencia from '../views/movimentos/MovimentosTipoAusencia'
import DetalharMovimentoTipoVenda from '../views/movimentos/DetalharMovimentoTipoVenda'
import DetalharMovimentoTipoAusencia from '../views/movimentos/DetalharMovimentoTipoAusencia'
import GraficoGeral from '../views/graficos/GraficoGeral'
import GraficoEspecifico from '../views/graficos/GraficoEspecifico'
import Fila from '../views/fila/Fila'
import Usuarios from '../views/usuarios/Usuarios'
import CadastrarUsuario from '../views/usuarios/CadastrarUsuario'
import EditarUsuario from '../views/usuarios/EditarUsuario'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home Page', component: Home },
    { path: '/404', name: '404', component: NotFound },
    { path: '/login', component: LoginPage },
    { path: '/fila', component: Fila },
    { path: '/vendedores', name: 'Vendedores', component: Vendedores },
    { path: '/cadastrarVendedor', name: 'Cadastrar Vendedor', component: CadastrarVendedor },
    { path: '/editarVendedor', name: 'Editar Vendedor', component: EditarVendedor },
    { path: '/movimentosTipoVenda', name: 'Vendas', component: MovimentosTipoVenda },
    { path: '/detalharMovimentoTipoVenda', name: 'Detalhar Venda', component: DetalharMovimentoTipoVenda },
    { path: '/movimentosTipoAusencia', name: 'Saídas', component: MovimentosTipoAusencia },
    { path: '/detalharMovimentoTipoAusencia', name: 'Detalhar Ausência', component: DetalharMovimentoTipoAusencia },
    { path: '/usuarios', name: 'Usuários', component: Usuarios },
    { path: '/cadastrarUsuario', name: 'Cadastrar Usuário', component: CadastrarUsuario },
    { path: '/editarUsuario', name: 'Editar Usuário', component: EditarUsuario },
    { path: '/graficoGeral', name: 'Gráfico Geral', component: GraficoGeral },
    { path: '/graficoEspecifico', name: 'Gráfico Especifico', component: GraficoEspecifico },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/fila']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('usuario')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})
