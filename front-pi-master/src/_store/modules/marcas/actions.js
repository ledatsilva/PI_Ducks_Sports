import { marcaService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    marcaService.getAll()
      .then(
        marcas => commit('getAllSuccess', marcas),
        error => commit('getAllFailure', error)
      )
  },
  register ({ dispatch, commit }, marca) {
    commit('registerRequest', marca)
    marcaService.register(marca)
      .then(
        marca => {
          commit('registerSuccess', marca)
          router.push('/')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            marcaService.getAll()
              .then(
                marcas => commit('getAllSuccess', marcas),
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
  update ({ dispatch, commit }, marca) {
    commit('registerRequest', marca)
    marcaService.update(marca)
      .then(
        marca => {
          commit('registerSuccess', marca)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            marcaService.getAll()
              .then(
                marcas => commit('getAllSuccess', marcas),
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
    marcaService.delete(id)
      .then(
        marca => {
          commit('deleteSuccess', marca)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            marcaService.getAll()
              .then(
                marcas => commit('getAllSuccess', marcas),
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
