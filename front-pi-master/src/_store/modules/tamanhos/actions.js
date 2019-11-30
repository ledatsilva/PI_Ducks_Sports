import { tamanhoService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    tamanhoService.getAll()
      .then(
        tamanhos => commit('getAllSuccess', tamanhos),
        error => commit('getAllFailure', error)
      )
  },
  register ({ dispatch, commit }, tamanho) {
    commit('registerRequest', tamanho)
    tamanhoService.register(tamanho)
      .then(
        tamanho => {
          commit('registerSuccess', tamanho)
          router.push('/')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            tamanhoService.getAll()
              .then(
                tamanhos => commit('getAllSuccess', tamanhos),
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
  update ({ dispatch, commit }, tamanho) {
    commit('registerRequest', tamanho)
    tamanhoService.update(tamanho)
      .then(
        tamanho => {
          commit('registerSuccess', tamanho)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            tamanhoService.getAll()
              .then(
                tamanhos => commit('getAllSuccess', tamanhos),
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
    tamanhoService.delete(id)
      .then(
        tamanho => {
          commit('deleteSuccess', tamanho)
          setTimeout(() => {
            dispatch('alert/success', 'Deleting successful', { root: true })
            tamanhoService.getAll()
              .then(
                tamanhos => commit('getAllSuccess', tamanhos),
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
