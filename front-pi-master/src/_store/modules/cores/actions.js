import { corService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    corService.getAll()
      .then(
        cores => commit('getAllSuccess', cores),
        error => commit('getAllFailure', error)
      )
  },
  register ({ dispatch, commit }, cor) {
    commit('registerRequest', cor)
    corService.register(cor)
      .then(
        cor => {
          commit('registerSuccess', cor)
          router.push('/')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            corService.getAll()
              .then(
                cores => commit('getAllSuccess', cores),
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
  update ({ dispatch, commit }, cor) {
    commit('registerRequest', cor)
    corService.update(cor)
      .then(
        cor => {
          commit('registerSuccess', cor)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            corService.getAll()
              .then(
                cors => commit('getAllSuccess', cors),
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
    corService.delete(id)
      .then(
        cor => {
          commit('deleteSuccess', cor)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            corService.getAll()
              .then(
                cores => commit('getAllSuccess', cores),
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
