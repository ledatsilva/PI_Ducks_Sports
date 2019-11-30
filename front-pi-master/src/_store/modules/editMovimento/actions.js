import { movimentoService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getMovimentoEdit ({ commit }, movimento) {
    commit('getMovimento', movimento)
  },
  getMovimentoView ({ commit }, movimento) {
    commit('getMovimentoView', movimento)
  },
  update ({ dispatch, commit }, movimento) {
    commit('updateRequest', movimento)
    movimentoService.update(movimento).then(
      movimento => {
        commit('updateSuccess', movimento)
        router.push('/movimentos')
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
