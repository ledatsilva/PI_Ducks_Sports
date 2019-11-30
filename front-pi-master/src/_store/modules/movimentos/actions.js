import { movimentoService } from '../../../_services'
// import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    movimentoService.getAll()
      .then(
        movimentos => commit('getAllSuccess', movimentos),
        error => commit('getAllFailure', error)
      )
  },
  getAllGrafico ({ commit }) {
    commit('getAllGraficoRequest')
    movimentoService.getAllGrafico()
      .then(
        movimentos => commit('getAllGraficoSuccess', movimentos),
        error => commit('getAllGraficoFailure', error)
      )
  },
  getGraficoPorID ({ dispatch, commit }, idVendedor) {
    console.log('testee')
    commit('getGraficoPorIdRequest')
    movimentoService.getGraficoPorId(idVendedor)
      .then(
        movimentos => commit('getGraficoPorIdSuccess', movimentos),
        error => commit('getGraficoPorIdFailure', error)
      )
  },
  getPorVendedor ({ dispatch, commit }, idVendedor) {
    commit('getPorVendedorRequest')
    movimentoService.getPorVendedor(idVendedor)
      .then(
        movimentos => {
          commit('getPorVendedorSuccess', movimentos)
          setTimeout(() => {
            dispatch('alert/success', 'Get successful', { root: true })
          })
        },
        error => {
          commit('getPorVendedorFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  getAllTipoVenda ({ commit }) {
    commit('getAllTipoVendaRequest')
    movimentoService.getAllTipoVenda()
      .then(
        movimentos => commit('getAllTipoVendaSuccess', movimentos),
        error => commit('getAllTipoVendaFailure', error)
      )
  },
  getAllTipoAusencia ({ commit }) {
    commit('getAllTipoAusenciaRequest')
    movimentoService.getAllTipoAusencia()
      .then(
        movimentos => commit('getAllTipoAusenciaSuccess', movimentos),
        error => commit('getAllTipoAusenciaFailure', error)
      )
  },
  register ({ dispatch, commit }, movimento) {
    commit('registerRequest', movimento)
    movimentoService.register(movimento)
      .then(
        movimento => {
          commit('registerSuccess', movimento)
          // router.push('/movimentos')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            movimentoService.getAll()
              .then(
                movimentos => commit('getAllSuccess', movimentos),
                error => commit('getAllFailure', error)
              )
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  end ({ dispatch, commit }, movimento) {
    commit('endRequest', movimento)
    movimentoService.end(movimento)
      .then(
        movimento => {
          commit('endSuccess', movimento)
          // router.push('/movimentos')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            movimentoService.getAll()
              .then(
                movimentos => commit('getAllSuccess', movimentos),
                error => commit('getAllFailure', error)
              )
          })
        },
        error => {
          commit('endFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  delete ({ dispatch, commit }, id) {
    commit('deleteRequest', id)
    movimentoService.delete(id)
      .then(
        movimento => {
          commit('deleteSuccess', movimento)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            commit('getAllRequest')
            movimentoService.getAll()
              .then(
                movimentos => commit('getAllSuccess', movimentos),
                error => commit('getAllFailure', error)
              )
          })
        },
        error => {
          commit('deleteFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  }
}
