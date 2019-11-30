import { vendaNaoSucedidaService } from '../../../_services'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    vendaNaoSucedidaService.getAll()
      .then(
        vendasNaoSucedidas => commit('getAllSuccess', vendasNaoSucedidas),
        error => commit('getAllFailure', error)
      )
  },
  register ({ dispatch, commit }, vendaNaoSucedida) {
    commit('registerRequest', vendaNaoSucedida)
    vendaNaoSucedidaService.register(vendaNaoSucedida)
      .then(
        vendaNaoSucedida => {
          commit('registerSuccess', vendaNaoSucedida)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            vendaNaoSucedidaService.getAll()
              .then(
                vendasNaoSucedidas => commit('getAllSuccess', vendasNaoSucedidas),
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
  delete ({ dispatch, commit }, id) {
    commit('deleteRequest', id)
    vendaNaoSucedidaService.delete(id)
      .then(
        vendaNaoSucedida => {
          commit('deleteSuccess', vendaNaoSucedida)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            commit('getAllRequest')
            vendaNaoSucedidaService.getAll()
              .then(
                vendasNaoSucedidas => commit('getAllSuccess', vendasNaoSucedidas),
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
