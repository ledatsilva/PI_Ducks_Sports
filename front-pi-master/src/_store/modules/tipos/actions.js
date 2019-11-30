import { tipoService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    tipoService.getAll()
      .then(
        tipos => commit('getAllSuccess', tipos),
        error => commit('getAllFailure', error)
      )
  },
  register ({ dispatch, commit }, tipo) {
    commit('registerRequest', tipo)
    tipoService.register(tipo)
      .then(
        tipo => {
          commit('registerSuccess', tipo)
          router.push('/')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            tipoService.getAll()
              .then(
                tipos => commit('getAllSuccess', tipos),
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
  update ({ dispatch, commit }, tipo) {
    commit('registerRequest', tipo)
    tipoService.update(tipo)
      .then(
        tipo => {
          commit('registerSuccess', tipo)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            tipoService.getAll()
              .then(
                tipos => commit('getAllSuccess', tipos),
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
    tipoService.delete(id)
      .then(
        tipo => {
          commit('deleteSuccess', tipo)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            tipoService.getAll()
              .then(
                tipos => commit('getAllSuccess', tipos),
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
