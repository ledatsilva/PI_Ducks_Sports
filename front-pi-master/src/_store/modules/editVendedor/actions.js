import { vendedorService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getVendedorEdit ({ commit }, vendedor) {
    commit('getVendedor', vendedor)
  },

  update ({ dispatch, commit }, vendedor) {
    commit('updateRequest', vendedor)
    vendedorService.update(vendedor).then(
      vendedor => {
        commit('updateSuccess', vendedor)
        router.push('/vendedores')
        setTimeout(() => {
          dispatch('alert/success', 'Registration successful', { root: true })
        })
      },
      error => {
        commit('updateFailure', error)
        dispatch('alert/error', error, { root: true })
      }
    )
  }
}
